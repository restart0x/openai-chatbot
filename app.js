import {sendMessageToAPI} from './api.js';
import {loadChatHistory, saveChatHistory} from './storage.js';
import {renderMessage, renderNotification} from './ui.js';

function initChat() {
  const history = loadChatHistory();
  history.forEach((msg) => {
    renderMessage(msg.sender, msg.message);
  });
  renderNotification('Chatbot activated. How can I assist you today?');
}

function sendMessage() {
  const inputField = document.getElementById('chat-input');
  const userMessage = inputField.value.trim();

  if (userMessage) {
    renderMessage('user', userMessage);
    sendMessageToAPI(userMessage).then(botResponse => {
      renderMessage('bot', botResponse);
      saveChatHistory({sender: 'user', message: userMessage});
      saveChatHistory({sender: 'bot', message: botResponse});
    }).catch(error => {
      console.error('Chatbot error: ', error);
      renderNotification('Sorry, an error occurred while sending your message.');
    });
  }

  inputField.value = '';
}

document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('chat-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

window.addEventListener('load', initChat);