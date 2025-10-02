import { pool } from '../../config/dataBaseConect.js'

export class ProfileModel {
  static async getAllProfiles () {
    try {
      const result = await pool.query('SELECT id_profile, name_profile FROM profiles')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching profiles: ' + error.message)
    }
  }

  static async getProfileById ({ idProfile }) {
    try {
      const result = await pool.query('SELECT id_profile, name_profile FROM profiles WHERE id_profile = $1', [idProfile])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching profile by ID: ' + error.message)
    }
  }

  static async createProfile ({ input }) {
    const {
      nameProfile
    } = input

    const uuidResult = await pool.query('SELECT id_super_user FROM super_user')
    const idSuperUser = uuidResult.rows[0]

    try {
      const result = await pool.query('SELECT create_profile($1, $2)', [nameProfile, idSuperUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating profile: ' + error.message)
    }
  }

  static async updateProfile ({ idProfile, input }) {
    const {
      nameProfile
    } = input

    try {
      const result = await pool.query('SELECT update_profile($1, $2)', [idProfile, nameProfile])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating profile: ' + error.message)
    }
  }

  static async deleteProfile ({ idProfile }) {
    try {
      const result = await pool.query('SELECT delete_profile($1)', [idProfile])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting profile: ' + error.message)
    }
  }
}
