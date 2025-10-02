import { validateUser } from '../../schemas/users/users.js'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  getAllUsers = async (req, res) => {
    try {
      const result = await this.userModel.getAllUsers()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getUserById = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.userModel.getUserById({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createUser = async (req, res) => {
    const result = validateUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdUser = await this.userModel.createUser({ input: result.data })
      res.status(201).json(createdUser)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateUser = async (req, res) => {
    const { idUser } = req.params
    const result = validateUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedUser = await this.userModel.updateUser({ idUser, input: result.data })
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteUser = async (req, res) => {
    const { idUser } = req.params
    const result = await this.userModel.deleteUser({ idUser })
    if (result === false) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  }
}
