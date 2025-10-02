import { pool } from '../../config/dataBaseConect.js'

export class EspecificModel {
  static async getAllEspecifics () {
    try {
      const result = await pool.query('SELECT list_especifics()')
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching specifics: ${error.message}`)
    }
  }

  static async getEspecificById ({ idEspecific }) {
    try {
      const result = await pool.query('SELECT read_especific($1)', [idEspecific])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error fetching especific by ID: ${error.message}`)
    }
  }

  static async getEspecificsByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_especifics_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching specifics by project ID: ${error.message}`)
    }
  }

  static async getEspecificsByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_especifics_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching specifics by user ID: ${error.message}`)
    }
  }

  static async createEspecific ({ input }) {
    const {
      numEspecific,
      especific,
      idUser,
      idProject
    } = input

    try {
      const result = await pool.query('SELECT create_especific($1, $2, $3, $4)', [numEspecific, especific, idUser, idProject])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating especific: ${error.message}`)
    }
  }

  static async updateEspecific ({ idEspecific, input }) {
    const {
      numEspecific,
      especific,
      idUser,
      idProject
    } = input

    try {
      const result = await pool.query('SELECT update_especific($1, $2, $3, $4, $5)', [idEspecific, numEspecific, especific, idUser, idProject])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error updating especific: ${error.message}`)
    }
  }

  static async deleteEspecific ({ idEspecific }) {
    try {
      const result = await pool.query('SELECT delete_especific($1)', [idEspecific])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error deleting especific: ${error.message}`)
    }
  }
}
