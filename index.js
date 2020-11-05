require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

// Use middlewares
app.use(cors())
app.use(express.json()) // json-parser
app.use(express.static('build'))

// Use morgan middleware
morgan.token('data', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        time = new Date()
        responseText = `
            <p>Phonebook has info of ${persons.length} people</p>
            <p>${time}</p>
            `
        response.send(responseText)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(404).json({
            error: 'name is missing'
        })
    } else if (!body.number) {
        return response.status(404).json({
            error: 'number is missing'
        })
    }

    // Person.find({}).then(persons => {
    //     if (persons.find(person => person.name === body.name)) {
    //         return response.status(409).json({
    //             error: 'name already exists'
    //         })
    //     }

    // })

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
       name: body.name,
       number: body.number 
    }

    const options = {
        new: true, 
        runValidators: true,
        context: 'query'
    }

    Person.findByIdAndUpdate(request.params.id, person, options)
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
