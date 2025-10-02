import { Router } from 'express'
import { EspecificController } from '../../controllers/projects/especific.js'

export const createEspecificRouter = ({ especificModel }) => {
  const especificRouter = new Router()

  const especificController = new EspecificController({ especificModel })

  especificRouter.get('/', especificController.getAllEspecifics)
  especificRouter.get('/:idEspecific', especificController.getEspecificById)
  especificRouter.get('/project/:idProject', especificController.getEspecificsByProject)
  especificRouter.get('/user/:idUser', especificController.getEspecificsByUser)
  especificRouter.post('/', especificController.createEspecific)
  especificRouter.put('/:idEspecific', especificController.updateEspecific)
  especificRouter.delete('/:idEspecific', especificController.deleteEspecific)

  return especificRouter
}
