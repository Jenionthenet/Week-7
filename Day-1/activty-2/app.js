const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Server is running...")
})

app.get('/digital-crafts/cohort/:year', (req, res) => {
    const year = req.params.year
    res.send(`I studied at DigitalCrafts ${year} Cohort`)
})