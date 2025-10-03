import { pool } from '../../config/dataBaseConect.js'

export class ReportModel {
  static async getAllReports () {
    try {
      const result = await pool.query('SELECT list_reports()')
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching reports: ${error.message}`)
    }
  }

  static async getReportById ({ idReport }) {
    try {
      const result = await pool.query('SELECT read_report($1)', [idReport])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error fetching report by ID: ${error.message}`)
    }
  }

  static async getReportsByProject ({ idProject }) {
    try {
      const result = await pool.query('SELECT list_reports_by_project($1)', [idProject])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching reports by project ID: ${error.message}`)
    }
  }

  static async getReportsByUser ({ idUser }) {
    try {
      const result = await pool.query('SELECT list_reports_by_user($1)', [idUser])
      return result.rows
    } catch (error) {
      throw new Error(`Error fetching reports by user ID: ${error.message}`)
    }
  }

  static async createReport ({ input }) {
    const {
      issues,
      results,
      obstacle,
      conclusions,
      anexos,
      approved,
      idUser,
      idProject,
      idActivity
    } = input

    try {
      const result = await pool.query('SELECT create_report($1, $2, $3, $4, $5, $6, $7, $8, $9)', [issues, results, obstacle, conclusions, anexos, approved, idUser, idProject, idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating report: ${error.message}`)
    }
  }

  static async updateReport ({ idReport, input }) {
    const {
      issues,
      results,
      obstacle,
      conclusions,
      anexos,
      approved,
      idUser,
      idProject,
      idActivity
    } = input

    try {
      const result = await pool.query('SELECT update_report($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [idReport, issues, results, obstacle, conclusions, anexos, approved, idUser, idProject, idActivity])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error updating report: ${error.message}`)
    }
  }

  static async deleteReport ({ idReport }) {
    try {
      const result = await pool.query('SELECT delete_report($1)', [idReport])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error deleting report: ${error.message}`)
    }
  }
}
