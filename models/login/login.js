import pool from '../../config/database.js'

export class LoginModel {
  static async login ({ input }) {
    const { nickUser, passwordUser } = input

    try {
      const result = await pool.query('SELECT * FROM validate_user($1, $2)', [nickUser, passwordUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error authenticating user: ' + error.message)
    }
  }
}
