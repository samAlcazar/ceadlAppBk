import { pool } from '../../config/dataBaseConect.js'

export class UserModel {
  static async getAllUsers () {
    try {
      const result = await pool.query('SELECT id_user, name_user, nick_user, charge_user, signature_user, id_profile, id_project, active FROM users')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message)
    }
  }

  static async getUserById ({ idUser }) {
    try {
      const result = await pool.query('SELECT id_user, name_user, nick_user, charge_user, signature_user, id_profile, id_project, active  FROM users WHERE id_user = $1', [idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message)
    }
  }

  static async createUser ({ input }) {
    const {
      nameUser,
      nickUser,
      passwordUser,
      chargeUser,
      signatureUser,
      idProfile,
      idProject
    } = input

    const uuidResult = await pool.query('SELECT id_super_user FROM super_user')
    const idSuperUser = uuidResult.rows[0]

    try {
      const result = await pool.query('SELECT create_user($1, $2, $3, $4, $5, $6, $7, $8) AS id_user', [nameUser, nickUser, passwordUser, chargeUser, signatureUser, idProfile, idSuperUser, idProject])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating user: ' + error.message)
    }
  }

  static async updateUser ({ idUser, input }) {
    const {
      nameUser,
      nickUser,
      passwordUser,
      chargeUser,
      signatureUser,
      idProfile,
      idProject
    } = input

    const uuidResult = await pool.query('SELECT id_super_user FROM super_user')
    const idSuperUser = uuidResult.rows[0]

    try {
      const result = await pool.query('SELECT update_user($1, $2, $3, $4, $5, $6, $7, $8, $9)', [idUser, nameUser, nickUser, passwordUser, chargeUser, signatureUser, idProfile, idSuperUser, idProject])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating user: ' + error.message)
    }
  }

  static async deleteUser ({ id }) {
    try {
      const result = await pool.query('SELECT delete_user($1)', [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message)
    }
  }
}
