import { Router } from 'express'
import { UserController } from '../../controllers/users/user.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = new Router()

  const userController = new UserController({ userModel })

  userRouter.get('/', userController.getAllUsers)
  userRouter.get('/:idUser', userController.getUserById)
  userRouter.post('/', userController.createUser)
  userRouter.put('/:idUser', userController.updateUser)
  userRouter.delete('/:idUser', userController.deleteUser)
}
