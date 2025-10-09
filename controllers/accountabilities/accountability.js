import { validateAccountability } from '../../schemas/accountabilities/accountability.js'

export class AccountabilityController {
  constructor ({ accountabilityModel }) {
    this.accountabilityModel = accountabilityModel
  }

  getAccountabilities = async (req, res) => {
    try {
      const result = await this.accountabilityModel.getAccountabilities()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getAccountabilityById = async (req, res) => {
    const { idAccountability } = req.params
    try {
      const result = await this.accountabilityModel.getAccountabilityById({ idAccountability })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getAccountabilityByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.accountabilityModel.getAccountabilityByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getAccountabilityByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.accountabilityModel.getAccountabilityByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getAccountabilitiesbyActivity = async (req, res) => {
    const { idActivity } = req.params
    try {
      const result = await this.accountabilityModel.getAccountabilitiesbyActivity({ idActivity })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createAccountability = async (req, res) => {
    const result = validateAccountability(req.body)
    if (!result.success) {
      console.log(result)
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdAccountability = await this.accountabilityModel.createAccountability({ input: result.data })
      res.status(201).json(createdAccountability)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateAccountability = async (req, res) => {
    const { idAccountability } = req.params
    const result = validateAccountability(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedAccountability = await this.accountabilityModel.updateAccountability({ idAccountability, input: result.data })
      res.status(200).json(updatedAccountability)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteAccountability = async (req, res) => {
    const { idAccountability } = req.params
    try {
      const result = await this.accountabilityModel.deleteAccountability({ idAccountability })
      if (result === false) {
        return res.status(404).json({ error: 'Accountability not found' })
      }
      res.status(200).json({ message: 'Accountability deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
