import { Router } from 'express'

import { LoginController } from '../../controllers/login/login.js'

export const createLoginRouter = ({ loginModel }) => {
  const loginRouter = new Router()

  const loginController = new LoginController({ loginModel })

  loginRouter.post('/', loginController.login)
  loginRouter.get('/authorized', loginController.authorized)
  loginRouter.post('/logout', loginController.logOut)

  return loginRouter
}
