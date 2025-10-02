import { validateProject } from '../../schemas/projects/project.js'

export class ProjectController {
  constructor ({ projectModel }) {
    this.projectModel = projectModel
  }

  getAllProjects = async (req, res) => {
    try {
      const result = await this.projectModel.getAllProjects()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectById = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.projectModel.getProjectById({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectsByFounder = async (req, res) => {
    const { idFounder } = req.params
    try {
      const result = await this.projectModel.getProjectsByFounder({ idFounder })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectsByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.projectModel.getProjectsByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createProject = async (req, res) => {
    const result = validateProject(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdProject = await this.projectModel.createProject({ input: result.data })
      res.status(201).json(createdProject)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateProject = async (req, res) => {
    const { idProject } = req.params
    const result = validateProject(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedProject = await this.projectModel.updateProject({ idProject, input: result.data })
      res.status(200).json(updatedProject)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.projectModel.deleteProject({ idProject })
      if (result === false) {
        return res.status(404).json({ error: 'Project not found' })
      }
      res.status(200).json({ message: 'Project deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
