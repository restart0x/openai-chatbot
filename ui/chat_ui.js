const chatModule = (() => {
  const chatContainer = document.getElementById('chatContainer');
  const chatServiceURL = process.env.CHAT_SERVICE_URL;
  const reconnectAttempts = parseInt(process.env.RECONNECT_ATTEMPTS, 10) || 3;
  const clearChat = () => {
    chatContainer.innerHTML = '';
  };
  const appendMessage = (message, sender = 'user') => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; 
  };
  const showNotification = (message) => {
    alert(message);
  };
  const handleError = (error) => {
    console.error('Chat error:', error);
    showNotification('Connection error, please try again later.');
  };
  const connectToChatService = async () => {
    try {
      await fetch(chatServiceURL);
      console.log('Connected to chat service successfully.');
    } catch (error) {
      handleError(error);
    }
  };
  const init = () => {
    connectToChatService()
      .then(() => console.log('Chat module initialized.'))
      .catch(handleError);
  };
  return {
    init,
    clearChat,
    appendMessage,
  };
})();

chatModule.init();
chatModule.appendMessage('Hello, how can I help you?', 'bot');