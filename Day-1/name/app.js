const express = require('express')
const app = express()

app.get('/name', (req, res) => {
    let person = {firstName: 'John', lastName: 'Doe'}
    res.json(person)
})

app.listen(3000, () => {
    console.log('Server is running...')
})