import dotenv from "dotenv"
dotenv.config({path:'./.env'})
import express  from "express";
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./Routes/users.js";

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/users', userRouter)


const URI = process.env.MONGODB_URI
const PORT =  process.env.PORT || 5000
const SECRET = process.env.SECRET

mongoose.connect(URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(PORT, ()=>console.log(`Server listening in port ${PORT}`)))
.catch(err => console.log(err.message))

