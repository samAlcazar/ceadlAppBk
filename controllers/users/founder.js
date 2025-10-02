import { validateFounder } from '../../schemas/users/founders.js'

export class FounderController {
  constructor ({ founderModel }) {
    this.founderModel = founderModel
  }

  getAllFounders = async (req, res) => {
    try {
      const result = await this.founderModel.getAllFounders()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getFounderById = async (req, res) => {
    const { idFounder } = req.params
    try {
      const result = await this.founderModel.getFounderById({ idFounder })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createFounder = async (req, res) => {
    const result = validateFounder(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdFounder = await this.founderModel.createFounder({ input: result.data })
      res.status(201).json(createdFounder)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateFounder = async (req, res) => {
    const { idFounder } = req.params
    const result = validateFounder(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedFounder = await this.founderModel.updateFounder({ idFounder, input: result.data })
      res.status(200).json(updatedFounder)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteFounder = async (req, res) => {
    const { idFounder } = req.params
    try {
      const result = await this.founderModel.deleteFounder({ idFounder })
      if (result === false) {
        return res.status(404).json({ error: 'Founder not found' })
      }
      res.status(200).json({ message: 'Founder deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
