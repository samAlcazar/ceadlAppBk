import { pool } from '../../config/dataBaseConect.js'

export class ProjectResultModel {
  static async getAllProjectResults () {
    try {
      const result = await pool.query('SELECT list_project_results()')
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching project results: ${error.message}`)
    }
  }

  static async getProjectResultById ({ idProjectResult }) {
    try {
      const result = await pool.query('SELECT read_project_result($1)', [idProjectResult])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error fetching project result by ID: ${error.message}`)
    }
  }

  static async getProjectResultsByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_project_results_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching project results by project ID: ${error.message}`)
    }
  }

  static async getProjectResultsByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_project_results_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching project results by user ID: ${error.message}`)
    }
  }

  static async createProjectResult ({ input }) {
    const {
      numProjectResult,
      projectResult,
      idProject,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_project_result($1, $2, $3, $4)', [numProjectResult, projectResult, idProject, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating project result: ${error.message}`)
    }
  }

  static async createMultipleProjectResults ({ input }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const results = []
      for (const item of input) {
        const {
          numProjectResult,
          projectResult,
          idProject,
          idUser
        } = item
        const result = await client.query('SELECT create_project_result($1, $2, $3, $4)', [numProjectResult, projectResult, idProject, idUser])
        results.push(result.rows[0])
      }
      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      throw new Error(`Error creating multiple project results: ${error.message}`)
    } finally {
      client.release()
    }
  }

  static async updateProjectResult ({ idProjectResult, input }) {
    const {
      numProjectResult,
      projectResult,
      idProject,
      idUser
    } = input
    try {
      const result = await pool.query('SELECT update_project_result($1, $2, $3, $4, $5)', [idProjectResult, numProjectResult, projectResult, idProject, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error updating project result: ${error.message}`)
    }
  }

  static async deleteProjectResult ({ idProjectResult }) {
    try {
      const result = await pool.query('SELECT delete_project_result($1)', [idProjectResult])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error deleting project result: ${error.message}`)
    }
  }
}
