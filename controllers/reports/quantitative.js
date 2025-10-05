import { validateQuantitativeReport } from '../../schemas/reports/quantitative.js'

export class QuantitativeReportController {
  constructor ({ quantitativeReportModel }) {
    this.quantitativeReportModel = quantitativeReportModel
  }

  getAllQuantitative = async (req, res) => {
    try {
      const result = await this.quantitativeReportModel.getAllQuantitatives()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getQuantitativeById = async (req, res) => {
    const { idQuantitative } = req.params
    try {
      const result = await this.quantitativeReportModel.getQuantitativeById({ idQuantitative })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getQuantitativesByActivity = async (req, res) => {
    const { idActivity } = req.params
    try {
      const result = await this.quantitativeReportModel.getQuantitativesByActivity({ idActivity })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getQuantitativesByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.quantitativeReportModel.getQuantitativesByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createQuantitative = async (req, res) => {
    const data = req.body
    // Verificar si es un array o un objeto individual
    const isArray = Array.isArray(data)
    const itemsToValidate = isArray ? data : [data]
    // Validar cada elemento
    const validationResults = itemsToValidate.map(item => validateQuantitativeReport(item))
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
        const createdQuantitatives = await this.quantitativeReportModel.createMultipleQuantitatives({ input: validatedData })
        res.status(201).json(createdQuantitatives)
      } else {
        // Crear un solo registro (comportamiento original)
        const createdQuantitative = await this.quantitativeReportModel.createQuantitative({ input: validatedData[0] })
        res.status(201).json(createdQuantitative)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createMultipleQuantitatives = async (req, res) => {
    const data = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Expected an array of objects' })
    }
    // Validar cada elemento del array
    const validationResults = data.map(item => validateQuantitativeReport(item))
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
      const createdQuantitatives = await this.quantitativeReportModel.createMultipleQuantitatives({ input: validatedData })
      res.status(201).json(createdQuantitatives)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateQuantitative = async (req, res) => {
    const { idQuantitative } = req.params
    const result = validateQuantitativeReport(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedQuantitative = await this.quantitativeReportModel.updateQuantitative({ idQuantitative, input: result.data })
      res.status(200).json(updatedQuantitative)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteQuantitative = async (req, res) => {
    const { idQuantitative } = req.params
    try {
      await this.quantitativeReportModel.deleteQuantitative({ idQuantitative })
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
