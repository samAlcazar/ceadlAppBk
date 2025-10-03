import { validateReport } from '../../schemas/reports/report.js'

export class ReportController {
  constructor ({ reportModel }) {
    this.reportModel = reportModel
  }

  getAllReports = async (req, res) => {
    try {
      const result = await this.reportModel.getAllReports()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getReportById = async (req, res) => {
    const { idReport } = req.params
    try {
      const result = await this.reportModel.getReportById({ idReport })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getReportsByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.reportModel.getReportsByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getReportsByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.reportModel.getReportsByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createReport = async (req, res) => {
    const result = validateReport(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdReport = await this.reportModel.createReport({ input: result.data })
      res.status(201).json(createdReport)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateReport = async (req, res) => {
    const { idReport } = req.params
    const result = validateReport(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedReport = await this.reportModel.updateReport({ idReport, input: result.data })
      res.status(200).json(updatedReport)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteReport = async (req, res) => {
    const { idReport } = req.params
    try {
      const deletedReport = await this.reportModel.deleteReport({ idReport })
      res.status(200).json(deletedReport)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
