import { pool } from '../../config/dataBaseConect.js'

export class QuantitativeReportModel {
  static async getAllQuantitatives () {
    try {
      const result = await pool.query('SELECT list_quantitatives()')
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching quantitatives: ${error.message}`)
    }
  }

  static async getQuantitativeById ({ idQuantitative }) {
    try {
      const result = await pool.query('SELECT read_quantitative($1)', [idQuantitative])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error fetching quantitative by ID: ${error.message}`)
    }
  }

  static async getQuantitativesByActivity ({ idActivity }) {
    try {
      const result = await pool.query('SELECT list_quantitatives_by_activity($1)', [idActivity])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching quantitatives by Activity ID: ${error.message}`)
    }
  }

  static async getQuantitativesByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_quantitatives_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching quantitatives by user ID: ${error.message}`)
    }
  }

  static async createQuantitative ({ input }) {
    const {
      achieved,
      day,
      spFemale,
      spMale,
      fFemale,
      fMale,
      naFemale,
      naMale,
      pFemale,
      pMale,
      idActivity,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_quantitative($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [achieved, day, spFemale, spMale, fFemale, fMale, naFemale, naMale, pFemale, pMale, idActivity, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating quantitative: ${error.message}`)
    }
  }

  static async createMultipleQuantitatives ({ input }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const results = []
      for (const item of input) {
        const {
          achieved,
          day,
          spFemale,
          spMale,
          fFemale,
          fMale,
          naFemale,
          naMale,
          pFemale,
          pMale,
          idActivity,
          idUser
        } = item
        const result = await client.query('SELECT create_quantitative($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [achieved, day, spFemale, spMale, fFemale, fMale, naFemale, naMale, pFemale, pMale, idActivity, idUser])
        results.push(result.rows[0])
      }
      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      throw new Error(`Error creating multiple quantitatives: ${error.message}`)
    } finally {
      client.release()
    }
  }

  static async updateQuantitative ({ idQuantitative, input }) {
    const {
      achieved,
      day,
      spFemale,
      spMale,
      fFemale,
      fMale,
      naFemale,
      naMale,
      pFemale,
      pMale,
      idActivity,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT update_quantitative($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [idQuantitative, achieved, day, spFemale, spMale, fFemale, fMale, naFemale, naMale, pFemale, pMale, idActivity, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error updating quantitative: ${error.message}`)
    }
  }

  static async deleteQuantitative ({ idQuantitative }) {
    try {
      const result = await pool.query('SELECT delete_quantitative($1)', [idQuantitative])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error deleting quantitative: ${error.message}`)
    }
  }
}
