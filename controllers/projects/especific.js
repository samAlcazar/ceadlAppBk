import { validateEspecific } from '../../schemas/projects/especific.js'

export class EspecificController {
  constructor ({ especificModel }) {
    this.especificModel = especificModel
  }

  getAllEspecifics = async (req, res) => {
    try {
      const result = await this.especificModel.getAllEspecifics()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getEspecificById = async (req, res) => {
    const { idEspecific } = req.params
    try {
      const result = await this.especificModel.getEspecificById({ idEspecific })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getEspecificsByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.especificModel.getEspecificsByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getEspecificsByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.especificModel.getEspecificsByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createEspecific = async (req, res) => {
    const result = validateEspecific(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdEspecific = await this.especificModel.createEspecific({ input: result.data })
      res.status(201).json(createdEspecific)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateEspecific = async (req, res) => {
    const { idEspecific } = req.params
    const result = validateEspecific(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedEspecific = await this.especificModel.updateEspecific({ idEspecific, input: result.data })
      res.status(200).json(updatedEspecific)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteEspecific = async (req, res) => {
    const { idEspecific } = req.params
    try {
      const result = await this.especificModel.deleteEspecific({ idEspecific })
      if (result === false) {
        return res.status(404).json({ error: 'Especific not found' })
      }
      res.status(200).json({ message: 'Especific deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
