import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://192.168.40.110:5173',
  'http://192.168.40.110:5174',
  'http://192.168.40.110:1234'
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
