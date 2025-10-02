import { validateSurrender } from '../../schemas/accountabilities/surrender.js'

export class SurrenderController {
  constructor ({ surrenderModel }) {
    this.surrenderModel = surrenderModel
  }

  getSurrenders = async (req, res) => {
    try {
      const result = await this.surrenderModel.getSurrenders()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getSurrenderById = async (req, res) => {
    const { idSurrender } = req.params
    try {
      const result = await this.surrenderModel.getSurrenderById({ idSurrender })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getSurrenderByAccountability = async (req, res) => {
    const { idAccountability } = req.params
    try {
      const result = await this.surrenderModel.getSurrenderByAccountability({ idAccountability })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getSurrenderByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.surrenderModel.getSurrenderByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createSurrender = async (req, res) => {
    const result = validateSurrender(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdSurrender = await this.surrenderModel.createSurrender({ input: result.data })
      res.status(201).json(createdSurrender)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateSurrender = async (req, res) => {
    const { idSurrender } = req.params
    const result = validateSurrender(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedSurrender = await this.surrenderModel.updateSurrender({ idSurrender, input: result.data })
      res.status(200).json(updatedSurrender)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteSurrender = async (req, res) => {
    const { idSurrender } = req.params
    try {
      const result = await this.surrenderModel.deleteSurrender({ idSurrender })
      if (result === false) {
        return res.status(404).json({ error: 'Surrender not found' })
      }
      res.status(200).json({ message: 'Surrender deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
