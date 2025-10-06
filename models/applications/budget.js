import { pool } from '../../config/dataBaseConect.js'

export class BudgetModel {
  static async getBudgets () {
    try {
      const result = await pool.query('SELECT list_budgets()')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching budgets: ' + error.message)
    }
  }

  static async getBudgetById ({ idBudget }) {
    try {
      const result = await pool.query('SELECT read_budget($1)', [idBudget])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching budget by ID: ' + error.message)
    }
  }

  static async getBudgetByApplication ({ idApplication }) {
    try {
      const result = await pool.query('SELECT list_budgets_by_application($1)', [idApplication])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching budgets by project: ' + error.message)
    }
  }

  static async getBudgetByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_budgets_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching budgets by user: ' + error.message)
    }
  }

  static async getUsersByFounder ({ idFounder }) {
    try {
      const result = await pool.query('SELECT list_budgets_by_founder($1)', [idFounder])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching users by founder: ' + error.message)
    }
  }

  static async createBudget ({ input }) {
    const {
      quantity,
      code,
      description,
      importUSD,
      importBOB,
      idApplication,
      idFounder,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_budget($1, $2, $3, $4, $5, $6, $7, $8)', [quantity, code, description, importUSD, importBOB, idApplication, idFounder, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating budget: ' + error.message)
    }
  }

  static async createMultipleBudgets ({ input }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const results = []
      for (const item of input) {
        const {
          quantity,
          code,
          description,
          importUSD,
          importBOB,
          idApplication,
          idFounder,
          idUser
        } = item
        const result = await client.query('SELECT create_budget($1, $2, $3, $4, $5, $6, $7, $8)', [quantity, code, description, importUSD, importBOB, idApplication, idFounder, idUser])
        results.push(result.rows[0])
      }
      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      throw new Error('Error creating multiple budgets: ' + error.message)
    } finally {
      client.release()
    }
  }

  static async updateBudget ({ idBudget, input }) {
    const {
      quantity,
      code,
      description,
      importUSD,
      importBOB,
      idApplication,
      idFounder,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT update_budget($1, $2, $3, $4, $5, $6, $7, $8, $9)', [idBudget, quantity, code, description, importUSD, importBOB, idApplication, idFounder, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating budget: ' + error.message)
    }
  }

  static async deleteBudget ({ idBudget }) {
    try {
      const result = await pool.query('SELECT delete_budget($1)', [idBudget])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting budget: ' + error.message)
    }
  }
}
