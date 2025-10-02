import { validateActivity } from '../../schemas/activities/activity.js'

export class ActivityController {
  constructor ({ activityModel }) {
    this.activityModel = activityModel
  }

  getActivities = async (req, res) => {
    try {
      const result = await this.activityModel.getActivities()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getActivityById = async (req, res) => {
    const { idActivity } = req.params
    try {
      const result = await this.activityModel.getActivityById({ idActivity })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getActivityByProject = async (req, res) => {
    const { idProject } = req.params
    try {
      const result = await this.activityModel.getActivityByProject({ idProject })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getActivityByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.activityModel.getActivityByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createActivity = async (req, res) => {
    const result = validateActivity(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdActivity = await this.activityModel.createActivity({ input: result.data })
      res.status(201).json(createdActivity)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateActivity = async (req, res) => {
    const { idActivity } = req.params
    const result = validateActivity(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedActivity = await this.activityModel.updateActivity({ idActivity, input: result.data })
      res.status(200).json(updatedActivity)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteActivity = async (req, res) => {
    const { idActivity } = req.params
    try {
      const result = await this.activityModel.deleteActivity({ idActivity })
      if (result === false) {
        return res.status(404).json({ error: 'Activity not found' })
      }
      res.status(200).json({ message: 'Activity deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
