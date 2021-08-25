const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()
const connectionString = 'postgres://sbidvauh:JCPQV131cCM69LblBHPDoKegZ34jD3aJ@chunee.db.elephantsql.com/sbidvauh'
const db = pgp(connectionString)
console.log(db)

router.get('/', (req, res) => {
    const userId = req.session.user.userId
    // const userName = req.session.user.userName

    db.any('SELECT trip_id, title, departure_date, return_date, image_url FROM trips WHERE user_id = $1', [userId])
    .then(trips => {
     console.log(trips) 
     res.render('add-trip', {trips:trips})  
    })
})


router.post('/',(req, res) => {
    
    
    const title = req.body.title
    const departureDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const image = req.body.image 
    const userId = req.session.user.userId
    

    db.none('INSERT INTO trips(title, departure_date, return_date, image_url, user_id, username)VALUES($1, $2, $3, $4, $5, $6)', [title, departureDate, returnDate, image, userId, userName])
    .then(() => {
        res.redirect('/add-trip')
    })

    // let trip = {tripId: trips.length + 1, title: title, image: image, departureDate: departureDate, returnDate: returnDate, userName: userName}

    // trips.push(trip)
    // console.log(trips)
    // res.redirect('/add-trip')
})

// app.get('/home', (req, res) => {
    
//     res.render('globeTrippinHome', {message: "Until next time!"})
// })

// router.get('/',(req, res) => {
//     let userName = req.session.userName
//      let usersTrips = trips.filter((trip) => {
//         return trip.userName == userName
//     })
//     res.render('add-trip', {userName: userName, allTrips: usersTrips, totalTrips: usersTrips.length })
// })




router.post('/delete-trip', (req, res) => {
    const tripId = parseInt(req.body.tripId)

    // trips = trips.filter((trip) => {
    //     return trip.tripId != tripId
   
// })
    db.none('DELETE FROM trips WHERE trip_id = $1;', [tripId])
    .then(() => {
        res.redirect('/add-trip')
    })
    
})







module.exports = router