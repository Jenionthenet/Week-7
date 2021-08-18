const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const moviesRouter = require('./routes/movies')

app.use("/css",express.static("css"))
app.use(express.urlencoded())
app.use("/movies", moviesRouter)
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')


const PORT = 3000

global.movies = []



app.listen(PORT, () => {
    console.log('Server is running...')
})