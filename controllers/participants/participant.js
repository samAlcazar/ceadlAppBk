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

  getParticipantsByProject = async (req, res) => {
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
    const data = req.body
    // Verificar si es un array o un objeto individual
    const isArray = Array.isArray(data)
    const itemsToValidate = isArray ? data : [data]
    // Validar cada elemento
    const validationResults = itemsToValidate.map(item => validateParticipant(item))
    const hasErrors = validationResults.some(result => !result.success)
    if (hasErrors) {
      const errors = validationResults
        .filter(result => !result.success)
        .map((result, index) => ({
          index,
          errors: result.error.errors
        }))
      return res.status(400).json({ error: 'Validation errors', details: errors })
    }
    try {
      const validatedData = validationResults.map(result => result.data)
      if (isArray) {
        // Crear múltiples registros
        const createdParticipants = await this.participantModel.createMultipleParticipants({ input: validatedData })
        res.status(201).json(createdParticipants)
      } else {
        // Crear un solo registro (comportamiento original)
        const createdParticipant = await this.participantModel.createParticipant({ input: validatedData[0] })
        res.status(201).json(createdParticipant)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createMultipleParticipants = async (req, res) => {
    const data = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Expected an array of objects' })
    }
    // Validar cada elemento del array
    const validationResults = data.map(item => validateParticipant(item))
    const hasErrors = validationResults.some(result => !result.success)
    if (hasErrors) {
      const errors = validationResults
        .filter(result => !result.success)
        .map((result, index) => ({
          index,
          errors: result.error.errors
        }))
      return res.status(400).json({ error: 'Validation errors', details: errors })
    }
    try {
      const validatedData = validationResults.map(result => result.data)
      const createdParticipants = await this.participantModel.createMultipleParticipants({ input: validatedData })
      res.status(201).json(createdParticipants)
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
