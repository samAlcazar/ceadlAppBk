import z from 'zod'

const participantSchema = z.object({
  namePArticiapant: z.string().min(1).max(100),
  gender: z.string().min(1).max(20),
  age: z.number().min(1),
  organization: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  typeParticipant: z.string().min(1).max(100),
  municipality: z.string().min(1).max(100),
  typeOrganization: z.string().min(1).max(100),
  idProject: z.string().min(1),
  idFounder: z.string().min(1),
  idActivity: z.string().min(1),
  idUser: z.string().min(1)
})

export function validateParticipant (object) {
  return participantSchema.safeParse(object)
}
