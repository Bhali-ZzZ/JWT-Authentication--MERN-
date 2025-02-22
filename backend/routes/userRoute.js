import express from 'express'
import { login, logout, register } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', upload.single('image'), register);
userRouter.post('/login',login)
userRouter.post('/logout',logout)

export default userRouter