import { Router } from 'express'
import { ProjectActivityController } from '../../controllers/projects/projectActivity.js'

export const createProjectActivityRouter = ({ projectActivityModel }) => {
  const projectActivityRouter = new Router()

  const projectActivityController = new ProjectActivityController({ projectActivityModel })

  projectActivityRouter.get('/', projectActivityController.getAllProjectActivities)
  projectActivityRouter.get('/:idProjectActivity', projectActivityController.getProjectActivityById)
  projectActivityRouter.get('/project/:idProject', projectActivityController.getProjectActivitiesByProject)
  projectActivityRouter.get('/user/:idUser', projectActivityController.getProjectActivitiesByUser)
  projectActivityRouter.post('/', projectActivityController.createProjectActivity)
  projectActivityRouter.post('/bulk', projectActivityController.createMultipleProjectActivities)
  projectActivityRouter.put('/:idProjectActivity', projectActivityController.updateProjectActivity)
  projectActivityRouter.delete('/:idProjectActivity', projectActivityController.deleteProjectActivity)

  return projectActivityRouter
}
