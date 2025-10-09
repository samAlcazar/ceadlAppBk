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
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 8
        })
        .send({ user, token })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  authorized = async (req, res) => {
    const token = req.cookies.acces_token
    if (!token) {
      console.log(token)
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const user = jwt.verify(token, SECRET_JWT_TOKEN)
      res.status(200).send({ user })
    } catch (e) {
      res.status(401).json({ error: 'Unauthorized' })
    }
  }

  logOut = async (req, res) => {
    res
      .clearCookie('acces_token')
      .send({ message: 'LogOut' })
  }
}
