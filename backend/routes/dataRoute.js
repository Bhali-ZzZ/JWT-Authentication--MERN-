import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import getUserData from '../controllers/dataController.js'

const dataRouter = express.Router()

dataRouter.get('/data' , userAuth , getUserData)

export default dataRouter