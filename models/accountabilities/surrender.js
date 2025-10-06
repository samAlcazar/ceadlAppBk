import { pool } from '../../config/dataBaseConect.js'

export class SurrenderModel {
  static async getSurrenders () {
    try {
      const result = await pool.query('SELECT list_surrenders()')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching surrenders: ' + error.message)
    }
  }

  static async getSurrenderById ({ idSurrender }) {
    try {
      const result = await pool.query('SELECT read_surrender($1)', [idSurrender])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching surrender by ID: ' + error.message)
    }
  }

  static async getSurrenderByAccountability ({ idAccountability }) {
    try {
      const result = await pool.query('SELECT list_surrenders_by_accountability($1)', [idAccountability])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching surrenders by accountability: ' + error.message)
    }
  }

  static async getSurrenderByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_surrenders_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching surrenders by user: ' + error.message)
    }
  }

  static async createSurrender ({ input }) {
    const {
      dateInvoice,
      invoiceNumber,
      code,
      description,
      importUSD,
      importBOB,
      idAccountability,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_surrender($1, $2, $3, $4, $5, $6, $7, $8)', [dateInvoice, invoiceNumber, code, description, importUSD, importBOB, idAccountability, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating surrender: ' + error.message)
    }
  }

  static async createMultipleSurrenders ({ input }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const results = []
      for (const item of input) {
        const {
          dateInvoice,
          invoiceNumber,
          code,
          description,
          importUSD,
          importBOB,
          idAccountability,
          idUser
        } = item
        const result = await client.query('SELECT create_surrender($1, $2, $3, $4, $5, $6, $7, $8)', [dateInvoice, invoiceNumber, code, description, importUSD, importBOB, idAccountability, idUser])
        results.push(result.rows[0])
      }
      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      throw new Error('Error creating multiple surrenders: ' + error.message)
    } finally {
      client.release()
    }
  }

  static async updateSurrender ({ idSurrender, input }) {
    const {
      dateInvoice,
      invoiceNumber,
      code,
      description,
      importUSD,
      importBOB,
      idAccountability,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT update_surrender($1, $2, $3, $4, $5, $6, $7, $8, $9)', [idSurrender, dateInvoice, invoiceNumber, code, description, importUSD, importBOB, idAccountability, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating surrender: ' + error.message)
    }
  }

  static async deleteSurrender ({ idSurrender }) {
    try {
      const result = await pool.query('SELECT delete_surrender($1)', [idSurrender])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting surrender: ' + error.message)
    }
  }
}
