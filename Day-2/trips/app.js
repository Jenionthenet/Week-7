const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/css',express.static("css"))

app.use(express.urlencoded())

let trips = []

app.post('/add-trip', (req, res) => {
    
    const title = req.body.title
    const image = req.body.image
    const departureDate = req.body.departureDate
    const returnDate = req.body.returnDate

    let trip = {tripId: trips.length + 1, title: title, image: image, departureDate: departureDate, returnDate: returnDate}

    trips.push(trip)
    console.log(trips)
    res.redirect('/add-trip')
})


app.get('/add-trip', (req, res) => {
    res.render('add-trip', {allTrips: trips, totalTrips: trips.length })
})


app.post('/delete-trip', (req, res) => {
    const tripId = parseInt(req.body.tripId)

    trips = trips.filter((trip) => {
        return trip.tripId != tripId
})
    res.redirect('/add-trip')
})


app.listen(3000, () => {
    console.log('Server is running...')
})