import z from 'zod'

const reportSchema = z.object({
  issues: z.string().min(1),
  results: z.string().min(1),
  obstacle: z.string().min(1),
  conclusions: z.string().min(1),
  anexos: z.string().min(1),
  approved: z.boolean(),
  idUser: z.string().min(1),
  idProject: z.string().min(1),
  idActivity: z.string().min(1)
})

export function validateReport (object) {
  return reportSchema.safeParse(object)
}
