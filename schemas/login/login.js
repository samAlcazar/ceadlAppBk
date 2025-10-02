import z from 'zod'

const loginSchema = z.object({
  nickUser: z.string().min(1, 'El nick de usuario es requerido'),
  passwordUser: z.string().min(1, 'La contraseña es requerida')
})

export function validateLogin (object) {
  return loginSchema.safeParse(object)
}
