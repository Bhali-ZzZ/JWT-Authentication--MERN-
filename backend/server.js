import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js'
import dataRouter from './routes/dataRoute.js'
import connectCloudinary from './config/cloudinary.js'

const app = express()
const port = process.env.PORT

const allowedOrigins = ['http://localhost:5173']

app.use(express.json())
app.use(cors({
    origin : allowedOrigins,
    credentials : true
}))

connectDB()
connectCloudinary()


app.use(cookieParser())
app.use('/api/user',userRouter)
app.use('/api/user-data',dataRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING!!!")
})

app.listen(port , ()=>{
    console.log(`Server started on http://localhost:${port}`);
})