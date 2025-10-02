import z from 'zod'

const especificSchema = z.object({
  numEspecific: z.number().min(1),
  especific: z.string(),
  idUser: z.string().min(2).max(100),
  idProject: z.string().min(2).max(100)
})

export function validateEspecific (object) {
  return especificSchema.safeParse(object)
}
