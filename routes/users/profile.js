import { Router } from 'express'
import { ProfileController } from '../../controllers/users/profile.js'

export const createProfileRouter = ({ profileModel }) => {
  const profileRouter = new Router()

  const profileController = new ProfileController({ profileModel })

  profileRouter.get('/', profileController.getAllProfiles)
  profileRouter.get('/:idProfile', profileController.getProfileById)
  profileRouter.post('/', profileController.createProfile)
  profileRouter.put('/:idProfile', profileController.updateProfile)
  profileRouter.delete('/:idProfile', profileController.deleteProfile)

  return profileRouter
}
