const contactsRouter = require('express').Router()
const Contact  = require('../models/contact')

contactsRouter.get('/', (req, response) => {
  Contact.find({}).then((results) => {
    response.json(results)
  })
})

contactsRouter.get('/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

contactsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing either name or number',
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact
    .save()
    .then((savedContact) => {
      response.json(savedContact)
    })
    .catch((error) => next(error))
})

contactsRouter.delete('/:id', (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => {
      console.log(error)
      response.status(404).send({ error: 'Id doeest exist' })
    })
})

contactsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((updatedContacts) => {
      response.json(updatedContacts)
    })
    .catch((error) => next(error))
})

module.exports = contactsRouter