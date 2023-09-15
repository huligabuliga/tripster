import express from 'express'
import { jsonParser, urlEncodedParser } from './middleware/bodyParser.js'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import groupRouter from './routes/groupRoutes.js'
import expenseRouter from './routes/expenseRoutes.js'
import transactionRouter from './routes/transactionRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const PORT = process.env.PORT || 3001
const app = express()

// Middlewares
app.use(cors())
app.use(jsonParser)
app.use(urlEncodedParser)

// Database connection
connectDB()

// middleware
//express to accept x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }))
//express to accept json
app.use(express.json())
//cookies
app.use(cookieParser())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/groups', groupRouter)
app.use('/api/expenses', expenseRouter)
app.use('/api/transactions', transactionRouter)

//error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong'

    return res.status(errorStatus).send(errorMessage);
})
// Start server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})