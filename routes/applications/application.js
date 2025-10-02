import { Router } from 'express'
import { ApplicationController } from '../../controllers/applications/application.js'

export const createApplicationRouter = ({ applicationModel }) => {
  const applicationRouter = new Router()

  const applicationController = new ApplicationController({ applicationModel })

  applicationRouter.get('/', applicationController.getApplications)
  applicationRouter.get('/:idApplication', applicationController.getApplicationById)
  applicationRouter.get('/project/:idProject', applicationController.getApplicationByProject)
  applicationRouter.get('/user/:idUser', applicationController.getApplicationByUser)
  applicationRouter.get('/activity/:idActivity', applicationController.getApplicationByActivity)
  applicationRouter.post('/', applicationController.createApplication)
  applicationRouter.put('/:idApplication', applicationController.updateApplication)
  applicationRouter.delete('/:idApplication', applicationController.deleteApplication)

  return applicationRouter
}
