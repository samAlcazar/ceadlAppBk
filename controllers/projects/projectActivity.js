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
    const data = req.body
    // Verificar si es un array o un objeto individual
    const isArray = Array.isArray(data)
    const itemsToValidate = isArray ? data : [data]
    // Validar cada elemento
    const validationResults = itemsToValidate.map(item => validateProjectActivity(item))
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
        const createdProjectActivities = await this.projectActivityModel.createMultipleProjectActivities({ input: validatedData })
        res.status(201).json(createdProjectActivities)
      } else {
        // Crear un solo registro (comportamiento original)
        const createdProjectActivity = await this.projectActivityModel.createProjectActivity({ input: validatedData[0] })
        res.status(201).json(createdProjectActivity)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createMultipleProjectActivities = async (req, res) => {
    const data = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Expected an array of objects' })
    }
    // Validar cada elemento del array
    const validationResults = data.map(item => validateProjectActivity(item))
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
      const createdProjectActivities = await this.projectActivityModel.createMultipleProjectActivities({ input: validatedData })
      res.status(201).json(createdProjectActivities)
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
