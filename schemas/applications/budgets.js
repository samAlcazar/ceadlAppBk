import z from 'zod'

const budgetSchema = z.object({
  quantity: z.number().min(1),
  code: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  importUSD: z.number().min(1),
  importBOB: z.number().min(1),
  idApplication: z.string().min(1),
  idFounder: z.string().min(1),
  idUser: z.string().min(1)
})

export function validateBudget (object) {
  return budgetSchema.safeParse(object)
}
