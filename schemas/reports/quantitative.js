import z from 'zod'

const quantitativeReportSchema = z.object({
  achieved: z.number().min(0),
  spFemale: z.number().min(0),
  spMale: z.number().min(0),
  fFemale: z.number().min(0),
  fMale: z.number().min(0),
  naFemale: z.number().min(0),
  naMale: z.number().min(0),
  pFemale: z.number().min(0),
  pMale: z.number().min(0),
  idActivity: z.string().min(1),
  idUser: z.string().min(1)
})

export function validateQuantitativeReport (object) {
  return quantitativeReportSchema.safeParse(object)
}
