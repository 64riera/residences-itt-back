const express = require('express')
const serveStatic = require('serve-static')
const cors = require('cors')
const path = require('path')

require('./db')
const app = express()

// Importing routes
const userRoutes = require('./routes/user.routes')

// Configuration and middlewares
app.set('port', process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/', serveStatic(path.join(__dirname, '/dist'))) /* This will be the students dashboard */
// app.use('/dashboard') /* This will be the admin dashboard */

app.use('/api', userRoutes) /* This will be the API for both dashboards */

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server runing on port ${app.get('port')}`)
})
