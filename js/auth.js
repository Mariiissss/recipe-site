// ============================================
// АВТОРИЗАЦИЯ (через localStorage)
// ============================================

// Получить список всех зарегистрированных пользователей
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

// Сохранить пользователей
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Получить текущего залогиненного пользователя
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Проверка: авторизован ли
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Регистрация
function register(name, email, password) {
  const users = getUsers();

  // Проверка: email уже занят
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Пользователь с таким email уже существует' };
  }

  // Проверка: длина пароля
  if (password.length < 6) {
    return { success: false, error: 'Пароль должен быть минимум 6 символов' };
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password, // В реальном проекте — хеш!
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Сразу логиним
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  return { success: true };
}

// Вход
function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email.trim().toLowerCase());

  if (!user) {
    return { success: false, error: 'Пользователь не найден' };
  }
  if (user.password !== password) {
    return { success: false, error: 'Неверный пароль' };
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  return { success: true };
}

// Выход
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// ============================================
// ОТРИСОВКА ШАПКИ (зависит от авторизации)
// ============================================

// Эта функция вызывается на каждой странице.
// Она находит контейнер #authBlock и заполняет его.
function renderAuthBlock() {
  const block = document.getElementById('authBlock');
  if (!block) return;

  const user = getCurrentUser();

  if (user) {
    // Авторизован: имя + выпадающее меню
    block.innerHTML = `
      <div class="user-menu">
        <button class="user-menu__toggle" id="userToggle">
          <span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>
          <span class="user-name">${user.name}</span>
          <span class="user-caret">▾</span>
        </button>
        <div class="user-menu__dropdown" id="userDropdown">
          <a href="profile.html">👤 Профиль</a>
          <a href="favorites.html">❤️ Избранное</a>
          <a href="add-recipe.html">➕ Добавить рецепт</a>
          <hr>
          <a href="#" id="logoutBtn">🚪 Выйти</a>
        </div>
      </div>
    `;

    // Открыть/закрыть меню
    document.getElementById('userToggle').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('userDropdown').classList.toggle('open');
    });

    // Закрыть при клике вне меню
    document.addEventListener('click', () => {
      document.getElementById('userDropdown')?.classList.remove('open');
    });

    // Выход
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });

  } else {
    // Гость: кнопки войти/регистрация
    block.innerHTML = `
      <a href="login.html" class="btn btn--ghost">Войти</a>
      <a href="register.html" class="btn btn--primary">Регистрация</a>
    `;
  }
}

// ============================================
// ЗАЩИТА СТРАНИЦ (только для авторизованных)
// ============================================
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname.split('/').pop());
    return false;
  }
  return true;
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', renderAuthBlock);