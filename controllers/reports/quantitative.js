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
    const result = validateQuantitativeReport(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdQuantitative = await this.quantitativeReportModel.createQuantitative({ input: result.data })
      res.status(201).json(createdQuantitative)
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
