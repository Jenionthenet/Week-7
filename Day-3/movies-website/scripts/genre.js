const genreDropDown = document.getElementById("genreDropDown")

genreDropDown.addEventListener("change", function() {
    window.location = `/movies/genre/${this.value}`
})