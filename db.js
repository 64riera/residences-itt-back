const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://64riera9985:t3JJwMYYyLN2Oxjn@itt-residences-bv0ak.mongodb.net/itt-residences?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('DB is connected')
})

module.exports = db
