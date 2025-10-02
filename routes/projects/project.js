import { Router } from 'express'
import { ProjectController } from '../../controllers/projects/project.js'

export const createProjectRouter = ({ projectModel }) => {
  const projectRouter = new Router()

  const projectController = new ProjectController({ projectModel })

  projectRouter.get('/', projectController.getAllProjects)
  projectRouter.get('/:idProject', projectController.getProjectById)
  projectRouter.get('/founder/:idFounder', projectController.getProjectsByFounder)
  projectRouter.get('/user/:idUser', projectController.getProjectsByUser)
  projectRouter.post('/', projectController.createProject)
  projectRouter.put('/:idProject', projectController.updateProject)
  projectRouter.delete('/:idProject', projectController.deleteProject)

  return projectRouter
}
