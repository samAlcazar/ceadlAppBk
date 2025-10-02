import { validateParticipant } from '../../schemas/participants/participant.js'

export class ParticipantController {
  constructor ({ participantModel }) {
    this.participantModel = participantModel
  }

  getParticipants = async (req, res) => {
    try {
      const result = await this.participantModel.getParticipants()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getParticipantById = async (req, res) => {
    const { idParticipant } = req.params
    try {
      const result = await this.participantModel.getParticipantById({ idParticipant })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getParticipanstsByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.participantModel.getParticipanstsByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getParticipantsByFounder = async (req, res) => {
    const { idFounder } = req.params
    try {
      const result = await this.participantModel.getParticipantsByFounder({ idFounder })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getParticipantsByActivity = async (req, res) => {
    const { idActivity } = req.params
    try {
      const result = await this.participantModel.getParticipantsByActivity({ idActivity })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getParticipantsByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.participantModel.getParticipantsByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createParticipant = async (req, res) => {
    const result = validateParticipant(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdParticipant = await this.participantModel.createParticipant({ input: result.data })
      res.status(201).json(createdParticipant)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateParticipant = async (req, res) => {
    const { idParticipant } = req.params
    const result = validateParticipant(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedParticipant = await this.participantModel.updateParticipant({ idParticipant, input: result.data })
      res.status(200).json(updatedParticipant)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteParticipant = async (req, res) => {
    const { idParticipant } = req.params
    try {
      const result = await this.participantModel.deleteParticipant({ idParticipant })
      if (result === false) {
        return res.status(404).json({ error: 'Participant not found' })
      }
      res.status(200).json({ message: 'Participant deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
