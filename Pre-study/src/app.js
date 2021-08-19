const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

//setting up body parser to parse JSON
app.use(bodyParser.json())


app.get('/movies', (req,res) => {
    res.send("Movies")
})

// {title: "Boomerang", year: 1992}
app.post('/movies',(req,res) => {
    
   let title = req.body.title
   let year = req.body.year
   let revenue = req.body.revenue
   console.log(title)
   console.log(year)
   console.log(revenue)
   res.send("OK")
   

    
})

app.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT)
})