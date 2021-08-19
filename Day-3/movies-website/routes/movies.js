const express = require('express')
const router = express.Router()


//localhost:3000/movies
router.get("/", (req, res) => {
    res.render('add-show-all-movies', {allMovies: movies, totalMovies: movies.length})

})

router.post('/create',(req, res) => {
    const title = req.body.title
    const description = req.body.description
    const genre = req.body.genre
    const posterUrl = req.body.posterUrl

    let movie = {movieId: movies.length + 1, title: title, description: description, genre: genre, posterUrl: posterUrl}
    
    movies.push(movie)
    res.redirect('/movies')

})


router.get('/:movieId', (req, res) => {
    const movieId = req.params.movieId

    let movie = movies.find((movie) => movie.movieId == movieId)
    console.log(movie)
    res.render("details", movie)
})


router.post('/delete', (req, res) => {
    const movieId = parseInt(req.body.movieId)

    movies = movies.filter((movie) => {
        return movie.movieId != movieId
    })
    res.redirect('/movies')
})


router.get('/genre/:genre', (req, res) => {
    const genre = req.params.genre

    movies = moives.filter((movie) => {
        return movie.genre = genre
    })
    res.render('add-show-all-movies', {allMovies: movies})
})


module.exports = router