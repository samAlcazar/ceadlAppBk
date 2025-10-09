import { Router } from 'express'
import { ParticipantController } from '../../controllers/participants/participant.js'

export const createParticipantRouter = ({ participantModel }) => {
  const participantRouter = new Router()

  const participantController = new ParticipantController({ participantModel })

  participantRouter.get('/', participantController.getParticipants)
  participantRouter.get('/:idParticipant', participantController.getParticipantById)
  participantRouter.get('/project/:idProject', participantController.getParticipantsByProject)
  participantRouter.get('/founder/:idFounder', participantController.getParticipantsByFounder)
  participantRouter.get('/activity/:idActivity', participantController.getParticipantsByActivity)
  participantRouter.get('/user/:idUser', participantController.getParticipantsByUser)
  participantRouter.post('/', participantController.createParticipant)
  participantRouter.post('/bulk', participantController.createMultipleParticipants)
  participantRouter.put('/:idParticipant', participantController.updateParticipant)
  participantRouter.delete('/:idParticipant', participantController.deleteParticipant)

  return participantRouter
}
