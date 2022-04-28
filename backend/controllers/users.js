import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  console.log(req.body)
  const {username, email, password} = req.body
  try {
    const findUser = await User.findOne({email:email})

    if(findUser === null){
      const saltRounds = 10
      const hashedPass = await bcrypt.hash(password, saltRounds)
      const newUser = new User({
        username: username, 
        email: email, 
        passwordHash: hashedPass
      })
  
      await newUser.save()
      return res.json({message:'New user saved successfully'})
    }else{
      return res.json({message:'Email or username already taken'})
    }
    
  } catch (error) {
    res.json({message:error.message})
  }
}

export const signin = async (req, res) =>{
  console.log(req.body)
  const {email, password} = req.body;
  try {
    const findUser = await User.findOne({email:email})
    console.log(findUser)
    const comparePass = findUser === null ? false : await bcrypt.compare(password, findUser.passwordHash)

    if(!(findUser && comparePass)){
      return res.json({message:'Invalid username or password, try again'})
    }

    const userForToken = {
      id:findUser._id
    }

    const userToken =  jwt.sign(userForToken, process.env.SECRET)
    res.json({token:userToken, email:findUser.email})
  } catch (error) {
    res.json({message:error.message})
  }
}



