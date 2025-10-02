import z from 'zod'

const projectActivitySchema = z.object({
  numProjectActivity: z.number().min(1),
  projectActivity: z.string(),
  category: z.string().min(2).max(100),
  idProject: z.string().min(2).max(100),
  idUser: z.string().min(2).max(100)
})

export function validateProjectActivity (object) {
  return projectActivitySchema.safeParse(object)
}
