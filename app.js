import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import connectDb from './config/dbConnection.js'
dotenv.config()
const app = express()

connectDb()
app.use(express.json())
app.use("/api/users",userRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>console.log('🚀 Server started'))