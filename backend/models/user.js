import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
  },
  email:{
    type:String,
    unique:true,
    required:[true, "Cannot be blank"]
  },
  passwordHash:String,
  contacts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('users', userSchema)

export default User