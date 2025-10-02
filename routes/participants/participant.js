import { Router } from 'express'
import { ParticipantController } from '../../controllers/participants/participant.js'

export const createParticipantRouter = ({ participantModel }) => {
  const participantRouter = new Router()

  const participantController = new ParticipantController({ participantModel })

  participantRouter.get('/', participantController.getParticipants)
  participantRouter.get('/:idParticipant', participantController.getParticipantById)
  participantRouter.post('/', participantController.createParticipant)
  participantRouter.put('/:idParticipant', participantController.updateParticipant)
  participantRouter.delete('/:idParticipant', participantController.deleteParticipant)

  return participantRouter
}
