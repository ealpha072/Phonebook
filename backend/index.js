const { response } = require('express')
const express = require('express')
const app = express()

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

app.get('/', (req, resp) => {
    resp.send('<h1>Hello world</h1>')
})

app.get('/info', (req,resp) =>{
    console.log(req.headers)
    resp.send(`<p>Phone book has ${contacts.length} people</p>`)
})

app.get('/contacts', (req, resp) => {
    resp.json(contacts)
})

//logic for when the id parameter is not found.
app.get('/contacts/:id', (req, resp)=>{
    const id = Number(req.params.id)
    const contact = contacts.filter(x => x.id === id)
    console.log(contact)
    resp.json(contact)
})

const PORT = 3001
app.listen(PORT)

console.log(`Server is running on port ${PORT}`)