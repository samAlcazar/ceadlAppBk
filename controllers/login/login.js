import jwt from 'jsonwebtoken'
import { validateLogin } from '../../schemas/login/login.js'
import { SECRET_JWT_TOKEN } from '../../config/secretToken.js'

export class LoginController {
  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const result = validateLogin(req.body)
    if (!result.success) {
      console.log(result)
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const user = await this.loginModel.login({ input: result.data })
      const token = jwt.sign(
        {
          idUser: user[0].validate_user.id_user,
          nameUser: user[0].validate_user.name_user,
          nickUser: user[0].validate_user.nick_user,
          chargeUser: user[0].validate_user.charge_user,
          signatureUser: user[0].validate_user.signature_user,
          idProfile: user[0].validate_user.id_profile,
          idProject: user[0].validate_user.id_project
        },
        SECRET_JWT_TOKEN,
        { expiresIn: '8h' }
      )
      res
        .status(200)
        .cookie('acces_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 1000 * 60 * 60 * 8,
          domain: process.env.NODE_ENV === 'production' ? undefined : undefined
        })
        .send({ user, token })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  authorized = async (req, res) => {
    // Intentar obtener el token de las cookies primero
    let token = req.cookies.acces_token
    // Si no hay token en las cookies, intentar obtenerlo del header Authorization
    if (!token) {
      const authHeader = req.headers.authorization
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      console.log('No token found in cookies or headers')
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    try {
      const user = jwt.verify(token, SECRET_JWT_TOKEN)
      res.status(200).send({ user })
    } catch (e) {
      console.log('Token verification failed:', e.message)
      res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }
  }

  logOut = async (req, res) => {
    res
      .clearCookie('acces_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      })
      .send({ message: 'LogOut' })
  }

  // Ruta de prueba para verificar cookies y headers
  checkAuth = async (req, res) => {
    const token = req.cookies.acces_token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null)
    res.status(200).json({
      hasCookies: !!req.cookies.acces_token,
      hasAuthHeader: !!req.headers.authorization,
      token: token ? 'Present' : 'Missing',
      environment: process.env.NODE_ENV,
      origin: req.headers.origin,
      userAgent: req.headers['user-agent']
    })
  }
}
