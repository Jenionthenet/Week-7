const express = require("express")
const router = express.Router()

//localhost:3000/users  is the root route
router.get('/',(req, res) => {
    let user = {
            name: req.session.name,
            age: req.session.age,
            address: {
                street: "3459 Grist Mill ct",
                city: "Peachtree Corners",
                state: "GA"
            }

        }
    res.render('index', user)
})

router.get('/add-user', (req,res) => {
    res.render('add-user')
})

router.post('/add-user',(req,res) => {
    let name = req.body.name
    let age = req.body.age
    if(req.session) {
        req.session.name = name
        req.session.age = age

        // req.session.user = {name: name, age: age}
    }

    console.log(name)
    console.log(age)
    res.status(200).send()
})

router.get('/users', (req, res) => {

    let users = [

        {name: "John Doe", age: 43},
        {name: "Jane Doe", age: 33},
        {name: "Davis Doe", age: 37}

    ]
    users = []
    res.render('users',{users:users})
})

module.exports = router