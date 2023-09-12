import express from 'express'
import { jsonParser, urlEncodedParser } from './middleware/bodyParser.js'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3001
const app = express()

// Middlewares
app.use(cors())
app.use(jsonParser)
app.use(urlEncodedParser)

// Database connection
// connectDB()

// Routes
// ...

// Start server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})