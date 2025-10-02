import { pool } from '../../config/dataBaseConect.js'

export class ProjectActivityModel {
  static async getAllProjectActivities () {
    try {
      const result = await pool.query('SELECT list_project_activities()')
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching project activities: ${error.message}`)
    }
  }

  static async getProjectActivityById ({ idProjectActivity }) {
    try {
      const result = await pool.query('SELECT read_project_activity($1)', [idProjectActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error fetching project activity by ID: ${error.message}`)
    }
  }

  static async getProjectActivitiesByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_project_activities_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching project activities by project ID: ${error.message}`)
    }
  }

  static async getProjectActivitiesByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_project_activities_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching project activities by user ID: ${error.message}`)
    }
  }

  static async createProjectActivity ({ input }) {
    const {
      numProjectActivity,
      projectActivity,
      category,
      idProject,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_project_activity($1, $2, $3, $4, $5)', [numProjectActivity, projectActivity, category, idProject, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating project activity: ${error.message}`)
    }
  }

  static async updateProjectActivity ({ idProjectActivity, input }) {
    const {
      numProjectActivity,
      projectActivity,
      category,
      idProject,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT update_project_activity($1, $2, $3, $4, $5, $6)', [idProjectActivity, numProjectActivity, projectActivity, category, idProject, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error updating project activity: ${error.message}`)
    }
  }

  static async deleteProjectActivity ({ idProjectActivity }) {
    try {
      const result = await pool.query('SELECT delete_project_activity($1)', [idProjectActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error deleting project activity: ${error.message}`)
    }
  }
}
