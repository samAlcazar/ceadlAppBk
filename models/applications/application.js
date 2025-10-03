import { pool } from '../../config/dataBaseConect.js'

export class ApplicationModel {
  static async getApplications () {
    try {
      const result = await pool.query('SELECT list_applications()')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching applications: ' + error.message)
    }
  }

  static async getApplicationById ({ idApplication }) {
    try {
      const result = await pool.query('SELECT read_application($1)', [idApplication])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching application by ID: ' + error.message)
    }
  }

  static async getApplicationByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_applications_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching applications by project: ' + error.message)
    }
  }

  static async getApplicationByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_applications_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching applications by user: ' + error.message)
    }
  }

  static async getApplicationByActivity ({ idActivity }) {
    try {
      const result = await pool.query('SELECT list_applications_by_activity($1)', [idActivity])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching applications by activity: ' + error.message)
    }
  }

  static async createApplication ({ input }) {
    const {
      amount,
      approved,
      idProject,
      idUser,
      idActivity
    } = input

    try {
      const result = await pool.query('SELECT create_application($1, $2, $3, $4, $5)', [amount, approved, idProject, idUser, idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating application: ' + error.message)
    }
  }

  static async updateApplication ({ idApplication, input }) {
    const {
      amount,
      approved,
      idProject,
      idUser,
      idActivity
    } = input

    try {
      const result = await pool.query('SELECT update_application($1, $2, $3, $4, $5, $6)', [idApplication, amount, approved, idProject, idUser, idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating application: ' + error.message)
    }
  }

  static async deleteApplication ({ idApplication }) {
    try {
      const result = await pool.query('SELECT delete_application($1)', [idApplication])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting application: ' + error.message)
    }
  }
}
