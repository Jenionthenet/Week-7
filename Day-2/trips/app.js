const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const path = require('path')

const VIEWS_PATH = path.join(__dirname, '/views')

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

app.use('/css',express.static("css"))

app.use(express.urlencoded())
app.use(session({
    secret: 'THISISSECRETKEY',
    saveUninitialized: true
}))

let users = [ 
    {userName: "jenscott", password: "password"}, 
    {userName: "happperson", password: "1234"}
]

let trips = []

app.get('/register', (req, res) => {
    res.render('register', {message: "Enter a username and password to register."})
})

app.post('/register',(req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    let user = {userName: userName, password: password}
    users.push(user)

    if(req.session) {
        req.session.userName = userName
        req.session.password = password
    }
    res.redirect('/confirm')
})

app.get('/confirm', (req,res) => {
    const userName = req.session.userName
    const password = req.session.password

    res.render('confirm', {userName: userName, password: password})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {

    const userName = req.body.userName
    const password = req.body.password

    const confirmedUser = users.find((user) => {
        return user.userName == userName && user.password == password 
    })
    if(confirmedUser){
        if(req.session) {
            req.session.userName = userName
        }
        res.redirect('/add-trip')
    } else {
        res.render('login', {message: "Username and/or password is incorrect"})
    }
})

app.get('/profile', (req, res) => {
    const userName = req.session.userName
    res.render('profile', {userName: userName})
})



app.post('/add-trip', (req, res) => {
    
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

app.get('/home', (req, res) => {
    
    res.render('glogeTrippinHome', {message: "Until next time!"})
})

app.get('/add-trip', (req, res) => {
    let userName = req.session.userName
    trips = trips.filter((trip) => {
        return trip.userName == userName
    })
    res.render('add-trip', {userName: userName, allTrips: trips, totalTrips: trips.length })
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