
const messageTextBox = document.getElementById("messageTextBox")
const sendBtn = document.getElementById("sendBtn")
const userName = document.getElementById("userName")
const messagesUl = document.getElementById("messagesUl")


sendBtn.addEventListener('click', () => {
    const username = userName.value
    const chatMessage = messageTextBox.value
    socket.emit('GlobeTrippin', {message: chatMessage, userName: username})
})

socket.on('GlobeTrippin', (chat) => {
    // console.log(chatMessage)
    const messageItem = `
    <li><strong>${chat.userName}:</strong> ${chat.message}</li>`
    messagesUl.insertAdjacentHTML("beforeend", messageItem)
})