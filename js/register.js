// ============================================
// СТРАНИЦА РЕГИСТРАЦИИ
// ============================================

const form = document.getElementById('registerForm');
const errorBox = document.getElementById('errorBox');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  // Проверки
  if (name.length < 2) {
    showError('Имя должно быть минимум 2 символа');
    return;
  }
  if (password !== password2) {
    showError('Пароли не совпадают');
    return;
  }

  // Регистрация
  const result = register(name, email, password);

  if (!result.success) {
    showError(result.error);
    return;
  }

  // Успех — на главную
  window.location.href = 'index.html';
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.add('show');
}