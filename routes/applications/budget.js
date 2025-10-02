import { Router } from 'express'
import { BudgetController } from '../../controllers/applications/budget.js'

export const createBudgetRouter = ({ budgetModel }) => {
  const budgetRouter = new Router()

  const budgetController = new BudgetController({ budgetModel })

  budgetRouter.get('/', budgetController.getBudgets)
  budgetRouter.get('/:idBudget', budgetController.getBudgetById)
  budgetRouter.get('/application/:idApplication', budgetController.getBudgetByApplication)
  budgetRouter.get('/user/:idUser', budgetController.getBudgetByUser)
  budgetRouter.get('/founder/:idFounder', budgetController.getUsersByFounder)
  budgetRouter.post('/', budgetController.createBudget)
  budgetRouter.put('/:idBudget', budgetController.updateBudget)
  budgetRouter.delete('/:idBudget', budgetController.deleteBudget)

  return budgetRouter
}
