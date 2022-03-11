const mongoose  = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://alpha:${password}@cluster0.rypdi.mongodb.net/Contacts?retryWrites=true&w=majority`

mongoose.connect(url)

const contactsSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

contactsSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
const Contact = mongoose.model('Contact', contactsSchema)

/*const contact = new Contact({
    name: "Ada Lovelace", 
    number: '39-44-5323523'
})

contact.save().then(result => {
    console.log('Saved new note')
    mongoose.connection.close()
})*/

Contact.find({}).then(result=>{
    result.forEach(contact =>{
        console.log(contact)
    })
})