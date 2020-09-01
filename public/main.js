/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// /* eslint-disable prefer-const */
const socker = io();
let userName = '';
const userList = [];

const loginPage = document.querySelector('#loginPage');
const chatPage = document.querySelector('#chatPage');

const loginInput = document.querySelector('#loginNameInput');
const textInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

loginInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const name = loginInput.value.trim();
    if (name !== '') {
      userName = name;
      document.title = `Chat (${userName})`;
    }
  }
});
