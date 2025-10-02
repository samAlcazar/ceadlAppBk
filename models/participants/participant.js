import { pool } from '../../config/dataBaseConect.js'

export class ParticipantModel {
  static async getParticipants () {
    try {
      const result = await pool.query('SELECT list_participants()')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching participants: ' + error.message)
    }
  }

  static async getParticipantById ({ idParticipant }) {
    try {
      const result = await pool.query('SELECT read_participant($1)', [idParticipant])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching participant by ID: ' + error.message)
    }
  }

  static async getParticipanstsByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_participants_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching participants by project: ' + error.message)
    }
  }

  static async getParticipantsByFounder ({ idFounder }) {
    try {
      const result = await pool.query('SELECT list_participants_by_founder($1)', [idFounder])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching participants by founder: ' + error.message)
    }
  }

  static async getParticipantsByActivity ({ idActivity }) {
    try {
      const result = await pool.query('SELECT list_participants_by_activity($1)', [idActivity])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching participants by activity: ' + error.message)
    }
  }

  static async getParticipantsByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_participants_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching participants by user: ' + error.message)
    }
  }

  static async createParticipant ({ input }) {
    const {
      nameParticipant,
      gender,
      age,
      organization,
      phone,
      typeParticipant,
      municipality,
      typeOrganization,
      idProject,
      idFounder,
      idActivity,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT create_participant($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [nameParticipant, gender, age, organization, phone, typeParticipant, municipality, typeOrganization, idProject, idFounder, idActivity, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating participant: ' + error.message)
    }
  }

  static async updateParticipant ({ idParticipant, input }) {
    const {
      nameParticipant,
      gender,
      age,
      organization,
      phone,
      typeParticipant,
      municipality,
      typeOrganization,
      idProject,
      idFounder,
      idActivity,
      idUser
    } = input

    try {
      const result = await pool.query('SELECT update_participant($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [idParticipant, nameParticipant, gender, age, organization, phone, typeParticipant, municipality, typeOrganization, idProject, idFounder, idActivity, idUser])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating participant: ' + error.message)
    }
  }

  static async deleteParticipant ({ idParticipant }) {
    try {
      const result = await pool.query('SELECT delete_participant($1)', [idParticipant])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting participant: ' + error.message)
    }
  }
}
