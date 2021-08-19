const express = require('express')
const app = express()

//http://localhost:3000/hello
app.get('/hello', function(req, res){
    res.send("Hello World!")
})

app.listen(3000, function() {
    console.log("Server is running on PORT 3000")
})