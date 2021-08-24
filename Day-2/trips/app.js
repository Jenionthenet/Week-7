const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const path = require('path')
const tripsRouter = require('./routes/add-trip')

const app = express()
const pgp = require('pg-promise')()
const connectionString = 'postgres://sbidvauh:JCPQV131cCM69LblBHPDoKegZ34jD3aJ@chunee.db.elephantsql.com/sbidvauh'
const db = pgp(connectionString)
console.log(db)
const VIEWS_PATH = path.join(__dirname, '/views')
// const authenticate = require('./authentication/auth.js')
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/css',express.static("css"))
app.use(express.static('images'))
app.use('/js',express.static('js'))
app.use(express.urlencoded())

app.use(session({
    secret: 'THISISSECRETKEY',
    saveUninitialized: true,
    resave: true
}))


app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

app.use('/add-trip', tripsRouter)
let users = [ 
    {userName: "jenscott", password: "password"}, 
    {userName: "happyperson", password: "1234"}
]


//  global.trips = [
//          {title: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG5ldyUyMHlvcmslMjBjaXR5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", departureDate: "8-12-2021" , returnDate: "8-19-2021", userName: "jenscott"},
//          {title: "Philadelphia", image: "https://images.unsplash.com/photo-1618312776768-c5926372a2f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBoaWxhZGVscGhpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", departureDate: "9-12-2021" , returnDate: "9-19-2021", userName:"happyperson"}

//  ]

 app.get('/chat', (req,res) => {
    res.sendFile(__dirname + '/chat.html')
})

let chatMessage = []
io.on('connection', (socket) => {
    console.log('User connected....')

    socket.on('GlobeTrippin', (chat) => {
        io.emit('GlobeTrippin', chat)
    })
})

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


app.get('/sign-out', (req, res) => {
    req.session.destroy(error => {
        
        res.clearCookie('connect.sid')
        res.redirect('/home')
    }) 
    console.log(trips)
})

app.get('/home', (req, res) => {
    
    res.render('globeTrippinHome')
})




http.listen(3000, () => {
    console.log('Server is running today...')
})