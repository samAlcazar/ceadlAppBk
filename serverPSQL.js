import { UserModel } from './models/users/user.js'
import { ProfileModel } from './models/users/profile.js'
import { FounderModel } from './models/users/founder.js'
import { ProjectModel } from './models/projects/project.js'
import { EspecificModel } from './models/projects/especific.js'
import { ProjectActivityModel } from './models/projects/projectActivity.js'
import { ProjectResultModel } from './models/projects/projectResult.js'
import { ActivityModel } from './models/activities/activity.js'
import { ApplicationModel } from './models/applications/application.js'
import { BudgetModel } from './models/applications/budget.js'
import { AccountabilityModel } from './models/accountabilities/accountability.js'
import { SurrenderModel } from './models/accountabilities/surrender.js'
import { ParticipantModel } from './models/participants/participant.js'
import { createApp } from './app.js'
import { LoginModel } from './models/login/login.js'
import { ReportModel } from './models/reports/report.js'
import { QuantitativeReportModel } from './models/reports/quantitative.js'

createApp({
  userModel: UserModel,
  profileModel: ProfileModel,
  founderModel: FounderModel,
  projectModel: ProjectModel,
  especificModel: EspecificModel,
  projectActivityModel: ProjectActivityModel,
  projectResultModel: ProjectResultModel,
  activityModel: ActivityModel,
  reportModel: ReportModel,
  quantitativeReportModel: QuantitativeReportModel,
  applicationModel: ApplicationModel,
  budgetModel: BudgetModel,
  accountabilityModel: AccountabilityModel,
  surrenderModel: SurrenderModel,
  participantModel: ParticipantModel,
  loginModel: LoginModel
})
