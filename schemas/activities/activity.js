import z from 'zod'

const activitySchema = z.object({
  activity: z.string().min(1).max(100),
  dateStart: z.string(),
  dateEnd: z.string(),
  place: z.string().min(1).max(100),
  participantsExpeted: z.number().min(1),
  objetive: z.string(),
  resultExpected: z.string(),
  descriptionActivity: z.string(),
  idProject: z.string().min(1),
  idEspecific: z.string().min(1),
  idUser: z.string().min(1),
  idProjectResult: z.string().min(1),
  idProjectActivity: z.string().min(1)
})

export function validateActivity (object) {
  return activitySchema.safeParse(object)
}
