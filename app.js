import cookieParser from 'cookie-parser'
import express from 'express'
import { createUserRouter } from './routes/users/user.js'
import { createProfileRouter } from './routes/users/profile.js'
import { createFounderRouter } from './routes/users/founder.js'
import { createProjectRouter } from './routes/projects/project.js'
import { createEspecificRouter } from './routes/projects/especific.js'
import { createProjectActivityRouter } from './routes/projects/projectActivity.js'
import { createProjectResultRouter } from './routes/projects/projectResult.js'
import { createActivityRouter } from './routes/activities/activity.js'
import { createApplicationRouter } from './routes/applications/application.js'
import { createBudgetRouter } from './routes/applications/budget.js'
import { createAccountabilityRouter } from './routes/accountabilities/accountability.js'
import { createSurrenderRouter } from './routes/accountabilities/surrender.js'
import { createParticipantRouter } from './routes/participants/participant.js'
import { createLoginRouter } from './routes/login/login.js'
import { corsMiddleware } from './middlewares/cors.js'
import { pool } from './config/dataBaseConect.js'

const founders = await pool.query('SELECT id_super_user FROM super_user')
console.log(founders.rows[0].id_super_user)

export const createApp = ({
  userModel,
  profileModel,
  founderModel,
  projectModel,
  especificModel,
  projectActivityModel,
  projectResultModel,
  activityModel,
  applicationModel,
  budgetModel,
  accountabilityModel,
  surrenderModel,
  participantModel,
  loginModel
}) => {
  const PORT = process.env.PORT ?? 4984
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(cookieParser())
  app.use(corsMiddleware())

  app.all('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.sendStatus(204)
  })

  app.use('/users', createUserRouter({ userModel }))
  app.use('/profiles', createProfileRouter({ profileModel }))
  app.use('/founders', createFounderRouter({ founderModel }))
  app.use('/projects', createProjectRouter({ projectModel }))
  app.use('/especifics', createEspecificRouter({ especificModel }))
  app.use('/project-activities', createProjectActivityRouter({ projectActivityModel }))
  app.use('/project-results', createProjectResultRouter({ projectResultModel }))
  app.use('/activities', createActivityRouter({ activityModel }))
  app.use('/applications', createApplicationRouter({ applicationModel }))
  app.use('/budgets', createBudgetRouter({ budgetModel }))
  app.use('/accountabilities', createAccountabilityRouter({ accountabilityModel }))
  app.use('/surrenders', createSurrenderRouter({ surrenderModel }))
  app.use('/participants', createParticipantRouter({ participantModel }))
  app.use('/login', createLoginRouter({ loginModel }))

  app.use((req, res) => {
    res.status(404).send('404 Not Found')
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
