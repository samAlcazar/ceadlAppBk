import { validateProfile } from '../../schemas/users/profile.js'

export class ProfileController {
  constructor ({ profileModel }) {
    this.profileModel = profileModel
  }

  getAllProfiles = async (req, res) => {
    try {
      const result = await this.profileModel.getAllProfiles()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProfileById = async (req, res) => {
    const { idProfile } = req.params
    try {
      const result = await this.profileModel.getProfileById({ idProfile })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createProfile = async (req, res) => {
    const result = validateProfile(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdProfile = await this.profileModel.createProfile({ input: result.data })
      res.status(201).json(createdProfile)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateProfile = async (req, res) => {
    const { idProfile } = req.params
    const result = validateProfile(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedProfile = await this.profileModel.updateProfile({ idProfile, input: result.data })
      res.status(200).json(updatedProfile)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteProfile = async (req, res) => {
    const { idProfile } = req.params
    const result = await this.profileModel.deleteProfile({ idProfile })
    if (result === false) {
      return res.status(404).json({ error: 'Profile not found' })
    }
    res.status(200).json({ message: 'Profile deleted successfully' })
  }
}
