import z from 'zod'

const founderSchema = z.object({
  codFounder: z.string().min(2).max(100),
  nameFounder: z.string().min(2).max(100),
  idUser: z.string().min(2).max(100)
})

export function validateFounder (object) {
  return founderSchema.safeParse(object)
}
