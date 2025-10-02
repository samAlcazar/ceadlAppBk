import { validateBudget } from '../../schemas/applications/budgets.js'

export class BudgetController {
  constructor ({ budgetModel }) {
    this.budgetModel = budgetModel
  }

  getBudgets = async (req, res) => {
    try {
      const result = await this.budgetModel.getBudgets()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getBudgetById = async (req, res) => {
    const { idBudget } = req.params
    try {
      const result = await this.budgetModel.getBudgetById({ idBudget })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getBudgetByApplication = async (req, res) => {
    const { idApplication } = req.params
    try {
      const result = await this.budgetModel.getBudgetByApplication({ idApplication })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getBudgetByUser = async (req, res) => {
    const { idUser } = req.params
    try {
      const result = await this.budgetModel.getBudgetByUser({ idUser })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getUsersByFounder = async (req, res) => {
    const { idFounder } = req.params
    try {
      const result = await this.budgetModel.getUsersByFounder({ idFounder })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createBudget = async (req, res) => {
    const result = validateBudget(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const createdBudget = await this.budgetModel.createBudget({ input: result.data })
      res.status(201).json(createdBudget)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateBudget = async (req, res) => {
    const { idBudget } = req.params
    const result = validateBudget(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
    }
    try {
      const updatedBudget = await this.budgetModel.updateBudget({ idBudget, input: result.data })
      res.status(200).json(updatedBudget)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteBudget = async (req, res) => {
    const { idBudget } = req.params
    try {
      const result = await this.budgetModel.deleteBudget({ idBudget })
      if (result === false) {
        return res.status(404).json({ error: 'Budget not found' })
      }
      res.status(200).json({ message: 'Budget deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
