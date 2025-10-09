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
    const data = req.body
    // Verificar si es un array o un objeto individual
    const isArray = Array.isArray(data)
    const itemsToValidate = isArray ? data : [data]
    // Validar cada elemento
    const validationResults = itemsToValidate.map(item => validateBudget(item))
    const hasErrors = validationResults.some(result => !result.success)
    if (hasErrors) {
      console.log(validationResults)
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
        const createdBudgets = await this.budgetModel.createMultipleBudgets({ input: validatedData })
        res.status(201).json(createdBudgets)
      } else {
        // Crear un solo registro (comportamiento original)
        const createdBudget = await this.budgetModel.createBudget({ input: validatedData[0] })
        res.status(201).json(createdBudget)
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  createMultipleBudgets = async (req, res) => {
    const data = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Expected an array of objects' })
    }
    // Validar cada elemento del array
    const validationResults = data.map(item => validateBudget(item))
    const hasErrors = validationResults.some(result => !result.success)
    if (hasErrors) {
      console.log(validationResults)
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
      const createdBudgets = await this.budgetModel.createMultipleBudgets({ input: validatedData })
      res.status(201).json(createdBudgets)
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
