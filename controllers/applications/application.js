import { validateApplication } from '../../schemas/applications/application.js'

export class ApplicationController {
  constructor ({ applicationModel }) {
    this.applicationModel = applicationModel
  }

  getApplications = async (req, res) => {
    try {
      const result = await this.applicationModel.getApplications()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getApplicationById = async (req, res) => {
    const { idApplication } = req.params
    try {
      const result = await this.applicationModel.getApplicationById({ idApplication })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getApplicationByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.applicationModel.getApplicationByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getApplicationByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.applicationModel.getApplicationByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getApplicationByActivity = async (req, res) => {
    const { idActivity } = req.params
    try {
      const result = await this.applicationModel.getApplicationByActivity({ idActivity })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createApplication = async (req, res) => {
    const result = validateApplication(req.body)
    if (!result.success) {
      console.log(result)
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdApplication = await this.applicationModel.createApplication({ input: result.data })
      res.status(201).json(createdApplication)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateApplication = async (req, res) => {
    const { idApplication } = req.params
    const result = validateApplication(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedApplication = await this.applicationModel.updateApplication({ idApplication, input: result.data })
      res.status(200).json(updatedApplication)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteApplication = async (req, res) => {
    const { idApplication } = req.params
    try {
      const result = await this.applicationModel.deleteApplication({ idApplication })
      if (result === false) {
        return res.status(404).json({ error: 'Application not found' })
      }
      res.status(200).json({ message: 'Application deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
