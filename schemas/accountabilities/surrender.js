import z from 'zod'

const surrenderSchema = z.object({
  dateInvoice: z.string().min(1),
  invoiceNumber: z.string().min(1).max(100),
  code: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  importUSD: z.number().min(1),
  importBOB: z.number().min(1),
  idAccountability: z.string().min(1),
  idUser: z.string().min(1)
})

export function validateSurrender (object) {
  return surrenderSchema.safeParse(object)
}
