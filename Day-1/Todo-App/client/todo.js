const textBox = document.getElementById("textBox")
const addButton = document.getElementById("addButton")
const pendingUl = document.getElementById("pendingUl")
const doneUl = document.getElementById("doneUl")
const dropDown= document.getElementById("priorityChoice")
const dateSelector = document.getElementById("date")


addButton.addEventListener("click", function() {
const taskTitle = textBox.value
const priority = dropDown.value 
const date = dateSelector.value



    const tasksURL = "http://localhost:3000/todos"
    fetch(tasksURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: taskTitle,
            priority: priority,
            date: date
        })
    }).then(response => response.json())
        .then(result => {
            getAllTasks()
        })

}) 

function deleteTask(task) {
    console.log(task)
    const taskTitle = textBox.value
    const priority = dropDown.value 
    const date = dateSelector.value
    const tasksURL = "http://localhost:3000/todos"

    fetch(tasksURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: task.taskTitle,
            priority: task.priority,
            date: task.date 
        })
    }).then(response => response.json())
        .then(data => {
            getAllTasks()
        })

}


function getAllTasks() {
    const tasksURL = "http://localhost:3000/todos"
    
    fetch(tasksURL)
    .then(response => response.json())
    .then(tasks => {
        const taskItems = tasks.map(function(task) {
        
                                
            return `<li class= text-center><strong>  ${task.title}</strong>  priority:  <strong>  ${task.priority}</strong>- Date added:  <strong>  ${task.date}</strong> <button onClick= deleteTask(${task}) id="removeBtn">Remove</button></li>`
                        
                })
                pendingUl.innerHTML = taskItems.join("")
    })
}



getAllTasks()