const socket = io('https://b2e529ae-5628-47ae-a985-8204ca646573-00-1j3pd5d9aincm.janeway.replit.dev/')
const usernameBox = document.querySelector('.usernameInput')
const loginForm = document.querySelector('.loginForm')




var myUsername = 'hi'



    
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if(usernameBox.value == ""){return}

    if(usernameBox.value.length === 0 || usernameBox.value.length > 20){return alert("Username must be between 1 to 20 characters")}
    
    socket.emit("userCheck", usernameBox.value)
    myUsername = usernameBox.value
    usernameBox.value = ""
})

socket.on('usernameNotAlowed', () => {
    alert("username is already taken");
    usernameBox.classList.add('wrongUsername');
    usernameBox.value = ""; 
    usernameBox.focus();
});


socket.on('userLogin', () => {
    localStorage.setItem("user", myUsername)
    window.location.href ='http://127.0.0.1:3000/client/html/chat.html?'
})
