require('dotenv').config()
const express = require ('express')
const UserController = require('./app/controllers/UserController')

const app = express()
app.use(express.json())

app.post('/users', UserController.store)

app.listen(process.env.APP_PORT, () => {
    console.log('server running on ' + process.env.APP_PORT)
})