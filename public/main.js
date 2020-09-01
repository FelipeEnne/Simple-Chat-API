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

  userList = list;
  renderUserList();
});