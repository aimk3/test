const CHAT_KEY = 'maeumgyeol_messages';

const messagesEl = document.getElementById('messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const statusEl = document.getElementById('chat-status');

function addMessage(role, content) {
  const message = document.createElement('div');
  message.className = `message message-${role}`;
  message.textContent = content;
  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function saveMessages(messages) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
}

function getMessages() {
  try { return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]'); } catch { return []; }
}

function renderMessages() {
  const saved = getMessages();
  messagesEl.innerHTML = '';
  if (!saved.length) {
    addMessage('assistant', '안녕하세요. 저는 마음결이에요.\n오늘 마음에 가장 크게 남아 있는 이야기는 무엇인가요?');
    return;
  }
  saved.forEach(message => addMessage(message.role, message.content));
}

async function sendMessage(content) {
  const text = content.trim();
  if (!text || form.dataset.loading === 'true') return;

  const history = getMessages();
  history.push({ role: 'user', content: text });
  saveMessages(history);
  addMessage('user', text);
  input.value = '';
  form.dataset.loading = 'true';
  input.disabled = true;
  statusEl.textContent = '마음결이 답변을 준비하고 있어요...';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || '상담 연결에 실패했습니다.');
    history.push({ role: 'assistant', content: data.message });
    saveMessages(history);
    addMessage('assistant', data.message);
    statusEl.textContent = '마음결은 비난 없이 듣고, 함께 정리해드려요.';
  } catch (error) {
    statusEl.textContent = error.message;
    addMessage('assistant', '지금은 연결이 잠시 어려워요. 잠시 후 다시 이야기해 주세요.');
  } finally {
    form.dataset.loading = 'false';
    input.disabled = false;
    input.focus();
  }
}

renderNavbar(document.getElementById('nav'));
renderMessages();

form.addEventListener('submit', event => {
  event.preventDefault();
  sendMessage(input.value);
});

input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => sendMessage(button.dataset.prompt));
});

document.getElementById('clear-chat').addEventListener('click', () => {
  localStorage.removeItem(CHAT_KEY);
  renderMessages();
  statusEl.textContent = '새로운 대화를 시작할 준비가 됐어요.';
});