import { Router } from 'express'
import { FounderController } from '../../controllers/users/founder.js'

export const createFounderRouter = ({ founderModel }) => {
  const founderRouter = new Router()

  const founderController = new FounderController({ founderModel })

  founderRouter.get('/', founderController.getAllFounders)
  founderRouter.get('/:idFounder', founderController.getFounderById)
  founderRouter.post('/', founderController.createFounder)
  founderRouter.put('/:idFounder', founderController.updateFounder)
  founderRouter.delete('/:idFounder', founderController.deleteFounder)

  return founderRouter
}
