const socket = io('https://b2e529ae-5628-47ae-a985-8204ca646573-00-1j3pd5d9aincm.janeway.replit.dev/')
const messageContainer = document.querySelector('.messageContainer')
const sendBtn = document.querySelector('.sendMessage')
const messageBox = document.querySelector('.MessageBox')
const userInfo = document.querySelector('.userInfo')
const contactList = document.querySelector('.contactList')
const opendChat = document.querySelector('.opendChat')
const messageCount = document.querySelector('.messageCount')
const contacts = document.querySelectorAll('.contactName')






const me = localStorage.getItem("user")
userInfo.innerHTML = me
var recipient = ''
var curUserChat = ''


socket.emit('newJoin', me)


const sendMessage = (message, username) => {
    if(!message){return}
    messageContainer.innerHTML += `<div class="myMessage">
                <div class="messageText">${message}</div>
                <div class="messageSender">You</div>
            </div>`

            console.log(recipient)
    
    socket.emit('sendMessage', message, username, recipient)

    messageBox.value = ''
}

socket.on('userJoin', (users) => {
    contactList.innerHTML = ''

    users.map(user => {
        if(user != userInfo.innerHTML){
            contactList.innerHTML += `<div onclick="setReceiver('${user}')" class="contactName">${user}
                <div id="${user}" class=""></div>
            </div>`

        }
    })
})

const setReceiver = (user) => {
    if(user == recipient){return}
    const contactName = document.querySelectorAll('.contactName')
    const curContact = document.querySelector(`#${user}`)

    curContact.classList.remove('messageCount')
    console.log()
    messageContainer.innerHTML = ''    
    recipient = user
    curUserChat = user

    contactName.forEach((ele) => {
        if(ele.innerText == recipient){
            ele.classList.add('opendChat')
        }else{
            ele.classList.remove('opendChat')
        }
    })
}


const receiveMessage = (message, sender) => {
    if(!message){return}
    if(!sender){return}

    if(curUserChat == sender){
         messageContainer.innerHTML += `<div class="receivedMessage">
                <div class="messageText">${message}</div>
                <div class="messageSender">${sender}</div>  
            </div>`
    }else{
        const newMessageCounter = document.querySelector(`#${sender}`)
        newMessageCounter.classList.add('messageCount')
    }

    
}

sendBtn.addEventListener('click', e => {
    e.preventDefault()
    if(!messageBox.value){return}
    var message = messageBox.value
    var username = userInfo.innerHTML
    sendMessage(message, username)
})

messageBox.addEventListener('keydown', e => {
    if(e.key == 'Enter'){
        
        e.preventDefault()
        if(!messageBox.value){return}
        var message = messageBox.value
        var username = userInfo.innerHTML
        sendMessage(message, username)
    
    }
})

socket.on('receiveMessage', (message, username) => {
    receiveMessage(message, username)
})


