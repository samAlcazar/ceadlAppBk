import { Router } from 'express'
import { ProjectResultController } from '../../controllers/projects/projectResult.js'

export const createProjectResultRouter = ({ projectResultModel }) => {
  const projectResultRouter = new Router()

  const projectResultController = new ProjectResultController({ projectResultModel })

  projectResultRouter.get('/', projectResultController.getAllProjectResults)
  projectResultRouter.get('/:idProjectResult', projectResultController.getProjectResultById)
  projectResultRouter.get('/project/:idProject', projectResultController.getProjectResultsByProject)
  projectResultRouter.get('/user/:idUser', projectResultController.getProjectResultsByUser)
  projectResultRouter.post('/', projectResultController.createProjectResult)
  projectResultRouter.put('/:idProjectResult', projectResultController.updateProjectResult)
  projectResultRouter.delete('/:idProjectResult', projectResultController.deleteProjectResult)

  return projectResultRouter
}
