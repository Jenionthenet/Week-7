const { POINT_CONVERSION_COMPRESSED } = require("constants")
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const userRoutes = require('./routes/users')
const mustacheExpress = require('mustache-express')
const session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }))

const VIEWS_PATH = path.join(__dirname, '/views')
app.use(bodyParser.urlencoded({extended:false}))

app.use('/users', userRoutes)

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache' )











app.listen(3000,() => {
    console.log("Server is running...")
})