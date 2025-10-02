import z from 'zod'

const projectResultSchema = z.object({
  numProjectResult: z.number().min(1),
  projectResult: z.string(),
  idProject: z.string().min(2).max(100),
  idUser: z.string().min(2).max(100)
})

export function validateProjectResult (object) {
  return projectResultSchema.safeParse(object)
}
