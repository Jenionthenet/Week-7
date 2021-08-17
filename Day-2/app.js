const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', (req,res) => {
    res.render('index')
})



app.get('/customers/:name', (req,res) => {

    let fullName = req.params.name
    res.render('index', {name: fullName})

})

app.listen(3000, () => {
    console.log('Server is running...')
})
