const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Contact = require('./models/note')
const { response } = require('express')
const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('------')
    next()
}

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(requestLogger)

app.get('/', (req, resp) => {
    resp.send('<h1>Hello world</h1>')
})

app.get('/contacts', (req, response) => {
    Contact.find({}).then(results=>{
        response.json(results)
    })
})

app.get('/contacts/:id', (request, response, next)=>{
    Contact.findById(request.params.id)
    .then(contact =>{
        if(contact){
            response.json(contact)
        }else{
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.post('/contacts', (request, response, next) => {
    
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'Missing either name or number'
        })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    }).catch(error=> next(error))
})

app.delete('/contacts/:id', (request, response)=>{
    Contact.findByIdAndRemove(request.params.id)
        .then(result=>{
            response.status(204).end()
        })
        .catch(error=>{
            console.log(error)
            response.status(404).send({error:"Id doeest exist"})
        })
})

app.put('/contacts/:id', (request, response, next) =>{
    const body = request.body

    const contact = {
        name:body.name,
        number:body.number
    }

    Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
        .then(updatedContacts =>{
            response.json(updatedContacts)
        })
        .catch(error => next(error))
})

const unKnownEndpoint = (request, response) => {
    response.status(404).send({error:'Unknown request'})
}

app.use(unKnownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)
    if(error.name === "CastError"){
        return response.status(400).send({error:'Malfrmatted id'})
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({error:error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

