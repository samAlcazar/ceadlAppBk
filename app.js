import cookieParser from 'cookie-parser'
import express from 'express'

export const createApp = () => {
  const PORT = process.env.PORT ?? 4984
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(cookieParser())

  app.use((req, res) => {
    res.status(404).send('404 Not Found')
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
