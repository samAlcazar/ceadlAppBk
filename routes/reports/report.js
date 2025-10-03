import { Router } from 'express'
import { ReportController } from '../../controllers/reports/report.js'

export const createReportRouter = ({ reportModel }) => {
  const reportRouter = new Router()
  const reportController = new ReportController({ reportModel })

  reportRouter.get('/', reportController.getAllReports)
  reportRouter.get('/:idReport', reportController.getReportById)
  reportRouter.get('/project/:idProject', reportController.getReportsByProject)
  reportRouter.get('/user/:idUser', reportController.getReportsByUser)
  reportRouter.post('/', reportController.createReport)
  reportRouter.put('/:idReport', reportController.updateReport)
  reportRouter.delete('/:idReport', reportController.deleteReport)

  return reportRouter
}
