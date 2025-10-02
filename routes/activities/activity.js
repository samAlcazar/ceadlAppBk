import { Router } from 'express'
import { ActivityController } from '../../controllers/activities/activity.js'

export const createActivityRouter = ({ activityModel }) => {
  const activityRouter = new Router()

  const activityController = new ActivityController({ activityModel })

  activityRouter.get('/', activityController.getActivities)
  activityRouter.get('/:idActivity', activityController.getActivityById)
  activityRouter.get('/project/:idProject', activityController.getActivityByProject)
  activityRouter.get('/user/:idUser', activityController.getActivityByUser)
  activityRouter.post('/', activityController.createActivity)
  activityRouter.put('/:idActivity', activityController.updateActivity)
  activityRouter.delete('/:idActivity', activityController.deleteActivity)

  return activityRouter
}
