import { pool } from '../../config/dataBaseConect.js'

export class UserModel {
  static async getAllUsers () {
    try {
      const result = await pool.query('SELECT id_user, name_user, nick_user, charge_user, signature_user FROM users')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message)
    }
  }
}
