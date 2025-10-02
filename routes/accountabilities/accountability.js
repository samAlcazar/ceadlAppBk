import { Router } from 'express'
import { AccountabilityController } from '../../controllers/accountabilities/accountability.js'

export const createAccountabilityRouter = ({ accountabilityModel }) => {
  const accountabilityRouter = new Router()

  const accountabilityController = new AccountabilityController({ accountabilityModel })

  accountabilityRouter.get('/', accountabilityController.getAccountabilities)
  accountabilityRouter.get('/:idAccountability', accountabilityController.getAccountabilityById)
  accountabilityRouter.get('/project/:idProject', accountabilityController.getAccountabilityByProject)
  accountabilityRouter.get('/user/:idUser', accountabilityController.getAccountabilityByUser)
  accountabilityRouter.get('/activity/:idActivity', accountabilityController.getAccountabilitiesbyActivity)
  accountabilityRouter.post('/', accountabilityController.createAccountability)
  accountabilityRouter.put('/:idAccountability', accountabilityController.updateAccountability)
  accountabilityRouter.delete('/:idAccountability', accountabilityController.deleteAccountability)

  return accountabilityRouter
}
