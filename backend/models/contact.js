const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  number: {
    type: Number,
    minlength: 5,
    required: true,
  },
})

contactsSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Contact', contactsSchema)
