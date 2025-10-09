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
    const data = req.body
    // Verificar si es un array o un objeto individual
    const isArray = Array.isArray(data)
    const itemsToValidate = isArray ? data : [data]
    // Validar cada elemento
    const validationResults = itemsToValidate.map(item => validateSurrender(item))
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
        const createdSurrenders = await this.surrenderModel.createMultipleSurrenders({ input: validatedData })
        res.status(201).json(createdSurrenders)
      } else {
        // Crear un solo registro (comportamiento original)
        const createdSurrender = await this.surrenderModel.createSurrender({ input: validatedData[0] })
        res.status(201).json(createdSurrender)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createMultipleSurrenders = async (req, res) => {
    const data = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Expected an array of objects' })
    }
    // Validar cada elemento del array
    const validationResults = data.map(item => validateSurrender(item))
    const hasErrors = validationResults.some(result => !result.success)
    if (hasErrors) {
      console.log(validationResults)
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
      const createdSurrenders = await this.surrenderModel.createMultipleSurrenders({ input: validatedData })
      res.status(201).json(createdSurrenders)
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
