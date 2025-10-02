import z from 'zod'

const profileSchema = z.object({
  nameProfile: z.string().min(2).max(100)
})

export function validateProfile (object) {
  return profileSchema.safeParse(object)
}
