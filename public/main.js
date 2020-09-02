// /* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// /* eslint-disable prefer-const */
const socket = io();
let userName = '';
let userList = [];

const loginPage = document.querySelector('#loginPage');
const chatPage = document.querySelector('#chatPage');

const loginInput = document.querySelector('#loginNameInput');
const textInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

function addMessage(type, user, msg) {
  const ul = document.querySelector('.chatList');
  // console.log(ul);

  switch (type) {
    case 'status':
      ul.innerHTML += `<li class='m-status'> ${msg} </li>`;
      break;
    case 'msg':
      ul.innerHtML += `<li class='m-txt'><span>${user}</span> ${msg} </li>`;
      break;
    default:
  }
}

function renderUserList() {
  const ul = document.querySelector('.userList');
  ul.innerHTML = '';

  userList.forEach(i => {
    ul.innerHTML += `<li>${i}</li>`;
  });
}

loginInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const name = loginInput.value.trim();
    if (name !== '') {
      userName = name;
      document.title = `Chat (${userName})`;

      socket.emit('join-request', userName);
    }
  }
});

socket.on('user-ok', (list) => {
  loginPage.style.display = 'none';
  chatPage.style.display = 'flex';
  textInput.focus();

  addMessage('status', null, 'Conectou');

  userList = list;
  renderUserList();
});

socket.on('list-update', (data) => {
  if (data.joined) {
    addMessage('status', null, `${data.joined} entrou`);
  }

  if (data.left) {
    addMessage('status', null, `${data.left} saiu`);
  }
  userList = data.list;
  renderUserList();
});
