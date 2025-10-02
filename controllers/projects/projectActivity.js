import { validateProjectActivity } from '../../schemas/projects/projectActivity.js'

export class ProjectActivityController {
  constructor ({ projectActivityModel }) {
    this.projectActivityModel = projectActivityModel
  }

  getAllProjectActivities = async (req, res) => {
    try {
      const result = await this.projectActivityModel.getAllProjectActivities()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectActivityById = async (req, res) => {
    const { idProjectActivity } = req.params
    try {
      const result = await this.projectActivityModel.getProjectActivityById({ idProjectActivity })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectActivitiesByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.projectActivityModel.getProjectActivitiesByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectActivitiesByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.projectActivityModel.getProjectActivitiesByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createProjectActivity = async (req, res) => {
    const result = validateProjectActivity(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdProjectActivity = await this.projectActivityModel.createProjectActivity({ input: result.data })
      res.status(201).json(createdProjectActivity)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateProjectActivity = async (req, res) => {
    const { idProjectActivity } = req.params
    const result = validateProjectActivity(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedProjectActivity = await this.projectActivityModel.updateProjectActivity({ idProjectActivity, input: result.data })
      res.status(200).json(updatedProjectActivity)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteProjectActivity = async (req, res) => {
    const { idProjectActivity } = req.params
    try {
      const result = await this.projectActivityModel.deleteProjectActivity({ idProjectActivity })
      if (result === false) {
        return res.status(404).json({ error: 'Project activity not found' })
      }
      res.status(200).json({ message: 'Project activity deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
