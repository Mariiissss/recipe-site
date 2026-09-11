// ============================================
// СТРАНИЦА ВХОДА
// ============================================

const form = document.getElementById('loginForm');
const errorBox = document.getElementById('errorBox');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const result = login(email, password);

  if (!result.success) {
    errorBox.textContent = result.error;
    errorBox.classList.add('show');
    return;
  }

  // Успех — редирект
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect') || 'index.html';
  window.location.href = redirect;
});