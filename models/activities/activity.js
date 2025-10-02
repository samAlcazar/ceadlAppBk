import { pool } from '../../config/dataBaseConect.js'

export class ActivityModel {
  static async getActivities () {
    try {
      const result = await pool.query('SELECT list_activities()')
      return result.rows
    } catch (error) {
      throw new Error('Error fetching activities: ' + error.message)
    }
  }

  static async getActivityById ({ idActivity }) {
    try {
      const result = await pool.query('SELECT read_activity($1)', [idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error fetching activity by ID: ' + error.message)
    }
  }

  static async getActivityByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_activities_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching activities by project: ' + error.message)
    }
  }

  static async getActivityByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_activities_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error('Error fetching activities by user: ' + error.message)
    }
  }

  static async createActivity ({ input }) {
    const {
      activity,
      dateStart,
      dateEnd,
      place,
      participantsExpected,
      objetive,
      resultExpected,
      descriptionActivity,
      idProject,
      idEspecific,
      idUser,
      idProjectResult,
      idProjectActivity
    } = input

    try {
      const result = await pool.query('SELECT create_activity($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [activity, dateStart, dateEnd, place, participantsExpected, objetive, resultExpected, descriptionActivity, idProject, idEspecific, idUser, idProjectResult, idProjectActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error creating activity: ' + error.message)
    }
  }

  static async updateActivity ({ idActivity, input }) {
    const {
      activity,
      dateStart,
      dateEnd,
      place,
      participantsExpected,
      objetive,
      resultExpected,
      descriptionActivity,
      idProject,
      idEspecific,
      idUser,
      idProjectResult,
      idProjectActivity
    } = input

    try {
      const result = await pool.query('SELECT update_activity($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [idActivity, activity, dateStart, dateEnd, place, participantsExpected, objetive, resultExpected, descriptionActivity, idProject, idEspecific, idUser, idProjectResult, idProjectActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating activity: ' + error.message)
    }
  }

  static async deleteActivity ({ idActivity }) {
    try {
      const result = await pool.query('SELECT delete_activity($1)', [idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error('Error deleting activity: ' + error.message)
    }
  }
}
