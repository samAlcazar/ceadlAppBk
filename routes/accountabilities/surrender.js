import { Router } from 'express'
import { SurrenderController } from '../../controllers/accountabilities/surrender.js'

export const createSurrenderRouter = ({ surrenderModel }) => {
  const surrenderRouter = new Router()

  const surrenderController = new SurrenderController({ surrenderModel })

  surrenderRouter.get('/', surrenderController.getSurrenders)
  surrenderRouter.get('/:idSurrender', surrenderController.getSurrenderById)
  surrenderRouter.get('/accountability/:idAccountability', surrenderController.getSurrenderByAccountability)
  surrenderRouter.get('/user/:idUser', surrenderController.getSurrenderByUser)
  surrenderRouter.post('/', surrenderController.createSurrender)
  surrenderRouter.put('/:idSurrender', surrenderController.updateSurrender)
  surrenderRouter.delete('/:idSurrender', surrenderController.deleteSurrender)

  return surrenderRouter
}
