const express = require('express')
const cors = require('cors')

require('./db')
const app = express()

// Configuration and middlewares
app.set('port', process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
// app.use('/') /* This will be the students dashboard */
// app.use('/dashboard') /* This will be the admin dashboard */

// app.use('/api') /* This will be the API for both dashboards */  

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server runing on port ${app.get('port')}`)
})