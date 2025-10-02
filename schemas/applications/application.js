import z from 'zod'

const applicationSchema = z.object({
  amount: z.number().min(1),
  approved: z.boolean(),
  idProject: z.string().min(1),
  idUser: z.string().min(1),
  idActivity: z.string().min(1)
})

export function validateApplication (object) {
  return applicationSchema.safeParse(object)
}
