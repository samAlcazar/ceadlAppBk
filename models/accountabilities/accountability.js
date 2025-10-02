import { pool } from '../../config/dataBaseConect.js'

export class AccountabilityModel {
  static async getAccountabilities () {
    try {
      const result = await pool.query('SELECT list_accountabilities()')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching accountabilities: ' + error.message)
    }
  }

  static async getAccountabilityById ({ idAccountability }) {
    try {
      const result = await pool.query('SELECT read_accountability($1)', [idAccountability])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching accountability by ID: ' + error.message)
    }
  }

  static async getAccountabilityByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_accountabilities_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching accountabilities by project: ' + error.message)
    }
  }

  static async getAccountabilityByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_accountabilities_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching accountabilities by user: ' + error.message)
    }
  }

  static async getAccountabilitiesbyActivity ({ idActivity }) {
    try {
      const result = await pool.query('SELECT list_accountabilities_by_activity($1)', [idActivity])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching accountabilities by activity: ' + error.message)
    }
  }

  static async createAccountability ({ input }) {
    const {
      amount,
      reception,
      approved,
      idProject,
      idUser,
      idActivity
    } = input

    try {
      const result = await pool.query('SELECT create_accountability($1, $2, $3, $4, $5, $6)', [amount, reception, approved, idProject, idUser, idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating accountability: ' + error.message)
    }
  }

  static async updateAccountability ({ idAccountability, input }) {
    const {
      amount,
      reception,
      approved,
      idProject,
      idUser,
      idActivity
    } = input

    try {
      const result = await pool.query('SELECT update_accountability($1, $2, $3, $4, $5, $6, $7)', [idAccountability, amount, reception, approved, idProject, idUser, idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating accountability: ' + error.message)
    }
  }

  static async deleteAccountability ({ idAccountability }) {
    try {
      const result = await pool.query('SELECT delete_accountability($1)', [idAccountability])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting accountability: ' + error.message)
    }
  }
}
