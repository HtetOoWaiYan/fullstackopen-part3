const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = 3001

// Use json-parser middleware
app.use(express.json())

// Use morgan middleware
morgan.token('data', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    time = new Date()
    responseText = `
        <p>Phonebook has info of ${persons.length} people</p>
        <p>${time}</p>
    `
    response.send(responseText)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.find(person => person.id === id)

    response.status(204).end()
})

const getRandomInt = max => Math.floor(Math.random() * Math.floor(10000))

app.post('/api/persons', (request, response) => {
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

    if (persons.find(person => person.name === body.name)) {
        return response.status(409).json({
            error: 'name already exists'
        })
    }

    const person = {
        id: getRandomInt(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
