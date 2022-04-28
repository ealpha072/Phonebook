import express from 'express'
const userRouter = express.Router()
import {signup, signin} from '../controllers/users.js'


userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

export default userRouter