const chatLog=document.querySelector('#chat-log')
const roomName = JSON.parse(document.getElementById('room-name').textContent);


if(chatLog.hasChildNodes().length<=1){
    const emptyText=document.createElement('h3')
    emptyText.id='emptyText'
    emptyText.innerText='No Messages'
    emptyText.className='emptyText'
    chatLog.appendChild(emptyText)
}

        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/chat/'
            + roomName
            + '/'
        );

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data)
            const messageElement= document.createElement('div')
            const userId=data['user_id'] 
            const loggedInUserId=JSON.parse(document.getElementById('user_id').textContent)
            // messageElement.innerText=data.message
            console.log(loggedInUserId)
            messageElement.className='message'
            if (userId===loggedInUserId){
                messageElement.classList.add('message','sender')
            }else{
                messageElement.classList.add('message','receiver')
                const name=document.createElement('h6')
                name.className='username'
                name.innerText=data['username']
                messageElement.appendChild(name)

            }
            const text=document.createElement('p')
            text.className='text'
            text.innerText=data.message
            messageElement.appendChild(text)
            chatLog.appendChild(messageElement)

            if(document.querySelector('#emptyText')){
                document.querySelector('#emptyText').remove()
            }
            
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#chat-message-submit').click();
            }
        };

        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            console.log(message);
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
        };