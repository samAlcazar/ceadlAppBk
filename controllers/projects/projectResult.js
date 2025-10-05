import { validateProjectResult } from '../../schemas/projects/projectResult.js'

export class ProjectResultController {
  constructor ({ projectResultModel }) {
    this.projectResultModel = projectResultModel
  }

  getAllProjectResults = async (req, res) => {
    try {
      const result = await this.projectResultModel.getAllProjectResults()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectResultById = async (req, res) => {
    const { idProjectResult } = req.params
    try {
      const result = await this.projectResultModel.getProjectResultById({ idProjectResult })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectResultsByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.projectResultModel.getProjectResultsByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProjectResultsByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.projectResultModel.getProjectResultsByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createProjectResult = async (req, res) => {
    const data = req.body
    // Verificar si es un array o un objeto individual
    const isArray = Array.isArray(data)
    const itemsToValidate = isArray ? data : [data]
    // Validar cada elemento
    const validationResults = itemsToValidate.map(item => validateProjectResult(item))
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
        const createdProjectResults = await this.projectResultModel.createMultipleProjectResults({ input: validatedData })
        res.status(201).json(createdProjectResults)
      } else {
        // Crear un solo registro (comportamiento original)
        const createdProjectResult = await this.projectResultModel.createProjectResult({ input: validatedData[0] })
        res.status(201).json(createdProjectResult)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createMultipleProjectResults = async (req, res) => {
    const data = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Expected an array of objects' })
    }
    // Validar cada elemento del array
    const validationResults = data.map(item => validateProjectResult(item))
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
      const createdProjectResults = await this.projectResultModel.createMultipleProjectResults({ input: validatedData })
      res.status(201).json(createdProjectResults)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateProjectResult = async (req, res) => {
    const { idProjectResult } = req.params
    const result = validateProjectResult(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedProjectResult = await this.projectResultModel.updateProjectResult({ idProjectResult, input: result.data })
      res.status(200).json(updatedProjectResult)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteProjectResult = async (req, res) => {
    const { idProjectResult } = req.params
    try {
      const result = await this.projectResultModel.deleteProjectResult({ idProjectResult })
      if (result === false) {
        return res.status(404).json({ error: 'Project result not found' })
      }
      res.status(200).json({ message: 'Project result deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
