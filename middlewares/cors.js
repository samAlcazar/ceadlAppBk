import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'https://app.ceadl.org.bo',
  'https://www.app.ceadl.org.bo',
  'https://ceadl.org.bo',
  'https://www.ceadl.org.bo',
  'https://ceadlappbk-production.up.railway.app'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true
})
