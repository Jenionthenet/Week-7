const express = require("express")
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const app = express()

app.use(express.urlencoded)
app.use(session({
    secret:'THISISSECRETKEY',
    seveUninitialized: true,
    resave: true
}))


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engin', 'mustache')




app.get('/counter', (req, res) => {

    if(req.session) {
        req.session.number = 0
    }
    res.render('counter')
})



app.post('/counter', (req,res) => {

    if(req.session) {
        number = req.session.number += 1
    }
    res.render('counter', {number:req.session.number})
})

//need to run sever