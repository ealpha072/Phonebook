const express = require('express')
const cors = require('cors')
const app = express()
const mongoose  = require('mongoose')

app.use(express.json())
app.use(cors())

const password = process.argv[2]
const url = `mongodb+srv://alpha:${password}@cluster0.rypdi.mongodb.net/Contacts?retryWrites=true&w=majority`

mongoose.connect(url)

const contactsSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Contact = mongoose.model('Contact', contactsSchema)

let contacts = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random) * 1000
}

app.get('/', (req, resp) => {
    resp.send('<h1>Hello world</h1>')
})

app.get('/contacts', (req, response) => {
    Contact.find({}).then(results=>{
        response.json(results)
    })
})

app.get('/contacts/:id', (req, resp)=>{
    const id = Number(req.params.id)
    const contact = contacts.find(x => x.id === id)

    if(contact){
        resp.json(contact)
    }else{
        resp.status(404).end()
    }
    
})

app.post('/contacts', (request, response) => {
    
    const body = request.body

    if(!body.name || !body.number || contacts.find(x => x.name === body.name)){
        return response.status(400).json({
            error: 'Missing either name or number or name alreay exists'
        })
    }

    const contact = {
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

app.delete('/contacts/:id', (request, response)=>{
    const id = Number(request.params.id)
    contacts = contacts.filter(x => x.id !== id)
    response.status(204).end()
})

const unKnownEndpoint = (request, response) => {
    response.status(404).send({error:'Unknown request'})
}

app.use(unKnownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)

console.log(`Server is running on port ${PORT}`)