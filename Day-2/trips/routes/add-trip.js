const express = require('express')
const router = express.Router()

router.post('/',(req, res) => {
    
    const title = req.body.title
    const image = req.body.image
    const departureDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const userName = req.session.userName

    let trip = {tripId: trips.length + 1, title: title, image: image, departureDate: departureDate, returnDate: returnDate, userName: userName}

    trips.push(trip)
    console.log(trips)
    res.redirect('/add-trip')
})

// app.get('/home', (req, res) => {
    
//     res.render('globeTrippinHome', {message: "Until next time!"})
// })

router.get('/',(req, res) => {
    let userName = req.session.userName
     let usersTrips = trips.filter((trip) => {
        return trip.userName == userName
    })
    res.render('add-trip', {userName: userName, allTrips: usersTrips, totalTrips: usersTrips.length })
})




router.post('/delete-trip', (req, res) => {
    const tripId = parseInt(req.body.tripId)

    trips = trips.filter((trip) => {
        return trip.tripId != tripId
})
    res.redirect('/add-trip')
})







module.exports = router