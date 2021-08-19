const URL = "https://ghibliapi.herokuapp.com/people"
const main = document.getElementById("main")

main.innerHTML ="<p>Loading..."

fetch(URL)

.then(response => {
    return response.json()
}).then(people => {
    
    main.innerHTML = listOfNames(people)
})

function listOfNames(people) {
    const names = people.map(person => `<li>${person.name}</li>`).join("")
    return `<ul>${names}</ul>`
}