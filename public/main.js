const socket = io.connect();

// signup elements
const userFormArea = document.getElementById('userFormArea');
const username = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');

// message elements
const messageArea = document.getElementById('messageArea');
const chat = document.getElementById('chat');
const message = document.getElementById('message');
const sendMsgBtn = document.getElementById('send-msg-btn');

// sidenav (users) element
const users = document.getElementById('users');

// errors
const ul = document.getElementById('errors');

// signin a new user
loginBtn.addEventListener('click', () => {
  if (username.value.length) {
    socket.emit('new user', username.value, (data) => {
      if (data) {
        userFormArea.style.display = 'none';
        messageArea.className = 'visible';
      }
      username.value = '';
    });
  }
  else {
    showError("username can't be empty", 2);
  }
});

//send a message 
sendMsgBtn.addEventListener('click', () => {
  if (message.value.length) {
    socket.emit('send message', message.value);
    message.value = '';
  }
  else {
    showError("can't send an empty message", 2);
  }
});

// add a new message to the chatbox
socket.on('new message', (data) => {
  chat.innerHTML += `<div class="well"><strong>${data.user}</strong> : ${data.msg}`;
});

// display connected users
socket.on('get users', (data) => {
  let html = '';
  data.forEach((element) => {
    html += `<li class="list-group-item">${element}</li>`;
  });
  users.innerHTML = html;
});

const showError = ((msg, timeout) => {
  let error = document.createElement('li');
  error.appendChild(document.createTextNode(msg));
  error.classList.add('error');
  ul.appendChild(error);
  window.setTimeout(() => {
    error.style.display = 'none';
  }, timeout * 1000);
});
