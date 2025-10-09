import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'https://app.ceadl.org.bo',
  'https://www.app.ceadl.org.bo',
  'https://ceadl.org.bo',
  'https://www.ceadl.org.bo',
  'https://ceadlappbk-production.up.railway.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (como desde aplicaciones móviles o Postman)
    if (!origin) {
      return callback(null, true)
    }

    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
})
