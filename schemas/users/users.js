import z from 'zod'

const userSchema = z.object({
  nameUser: z.string().min(2).max(100),
  nickUser: z.string().min(2).max(100),
  passwordUser: z.string().min(6).max(100),
  chargeUser: z.string().min(2).max(100),
  signatureUser: z.string().min(2).max(100),
  idProfile: z.string().min(2).max(100)
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}
