import { pool } from '../../config/dataBaseConect.js'

export class ProjectModel {
  static async getAllProjects () {
    try {
      const result = await pool.query('SELECT list_projects()')
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`)
    }
  }

  static async getProjectById ({ idProject }) {
    try {
      const result = await pool.query('SELECT read_project($1)', [idProject])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error fetching project by ID: ${error.message}`)
    }
  }

  static async getProjectsByFounder ({ idFounder }) {
    try {
      const result = await pool.query('SELECT list_projects_by_founder($1)', [idFounder])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching projects by founder ID: ${error.message}`)
    }
  }

  static async getProjectsByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_projects_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching projects by user ID: ${error.message}`)
    }
  }

  static async createProject ({ input }) {
    const {
      codProject,
      nameProject,
      objetiveProject,
      idFounder,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_project($1, $2, $3, $4, $5)', [codProject, nameProject, objetiveProject, idFounder, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`)
    }
  }

  static async updateProject ({ idProject, input }) {
    const {
      codProject,
      nameProject,
      objetiveProject,
      idFounder,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT update_project($1, $2, $3, $4, $5, $6)', [idProject, codProject, nameProject, objetiveProject, idFounder, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`)
    }
  }

  static async deleteProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT delete_project($1)', [idProject])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error deleting project: ${error.message}`)
    }
  }
}
