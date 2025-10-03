import { pool } from '../../config/dataBaseConect.js'

export class FounderModel {
  static async getAllFounders () {
    try {
      const result = await pool.query('SELECT cod_founder, name_founder FROM founders')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching founders: ' + error.message)
    }
  }

  static async getFounderById ({ idFounder }) {
    try {
      const result = await pool.query('SELECT cod_founder, name_founder FROM founders WHERE id_founder = $1', [idFounder])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching founder by ID: ' + error.message)
    }
  }

  static async createFounder ({ input }) {
    const {
      codFounder,
      nameFounder,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_founder($1, $2, $3)', [codFounder, nameFounder, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating founder: ' + error.message)
    }
  }

  static async updateFounder ({ idFounder, input }) {
    const {
      codFounder,
      nameFounder,
      idUser
    } = input
    try {
      const result = await pool.query('SELECT update_founder($1, $2, $3, $4)', [idFounder, codFounder, nameFounder, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating founder: ' + error.message)
    }
  }

  static async deleteFounder ({ idFounder }) {
    try {
      const result = await pool.query('SELECT delete_founder($1)', [idFounder])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting founder: ' + error.message)
    }
  }
}
