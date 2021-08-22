function authenticate(req, res, next) {

    console.log("AUTHENTICATE MIDDLEWARE")
    if(req.session) {
        if(req.session.userName) {
            next()
        }else {
            res.redirect('/login')
        }
    }else {
        res.redirect('/login')
    }
}

module.exports = authenticate