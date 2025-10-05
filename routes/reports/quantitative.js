import { Router } from 'express'
import { QuantitativeReportController } from '../../controllers/reports/quantitative.js'

export const createQuantitativeReportRouter = ({ quantitativeReportModel }) => {
  const quantitativeReportRouter = new Router()
  const quantitativeReportController = new QuantitativeReportController({ quantitativeReportModel })
  quantitativeReportRouter.get('/', quantitativeReportController.getAllQuantitative)
  quantitativeReportRouter.get('/:idQuantitative', quantitativeReportController.getQuantitativeById)
  quantitativeReportRouter.get('/activity/:idActivity', quantitativeReportController.getQuantitativesByActivity)
  quantitativeReportRouter.get('/user/:idUser', quantitativeReportController.getQuantitativesByUser)
  quantitativeReportRouter.post('/', quantitativeReportController.createQuantitative)
  quantitativeReportRouter.post('/bulk', quantitativeReportController.createMultipleQuantitatives)
  quantitativeReportRouter.put('/:idQuantitative', quantitativeReportController.updateQuantitative)
  quantitativeReportRouter.delete('/:idQuantitative', quantitativeReportController.deleteQuantitative)

  return quantitativeReportRouter
}
