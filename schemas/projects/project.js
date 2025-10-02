import z from 'zod'

const projectSchema = z.object({
  codProject: z.string().min(2).max(100),
  nameProject: z.string().min(2).max(100),
  objetiveProject: z.string(),
  idFounder: z.string().min(2).max(100),
  idUser: z.string().min(2).max(100)
})

export function validateProject (object) {
  return projectSchema.safeParse(object)
}
