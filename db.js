const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost:27017/itt-residences'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('DB is connected')
})

module.exports = db

