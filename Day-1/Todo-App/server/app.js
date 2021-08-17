const express = require('express')
const app =express()
const bodyParser = require('body-parser')
const cors = require('cors')
let tasks = []

app.use(bodyParser.json())
app.use(cors())



app.get('/todos', (req, res) => {
   console.log(tasks)
    res.json(tasks)
    
})


app.post('/todos', (req, res) => {
    const title = req.body.title
    const priority = req.body.priority
    const date = req.body.date
    const task = {title: title, priority: priority, date: date}
    tasks.push(task)
    console.log(tasks)
    res.json({message: "Your task has been added."})
})


app.listen(3000, () => {
    console.log("Server is running...")
})