const mongoose = require('mongoose')

if (process.argv.length < 3  || process.argv.length > 5) {
	console.log('Add      : node mongo.js [password] [name] [number]')
	console.log('Retrieve : node mongo.js [password]')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://htetoowaiyan:${password}@cluster0.5qmkz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
	const person = new Person({
		name: name,
		number: number
	})

	person.save().then(() => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connction.close()
	})
} else {
	Person.find({}).then(result => {
		console.log('phonebook:')

		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}
