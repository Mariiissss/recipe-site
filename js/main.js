// ============================================
// ГЛАВНАЯ СТРАНИЦА
// ============================================

let currentCategory = 'all';
let currentSearch = '';

const grid = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// ============================================
// ОТРИСОВКА КАРТОЧЕК
// ============================================
function renderRecipes() {
  let list = getAllRecipes();

  // Фильтр по категории
  if (currentCategory !== 'all') {
    list = list.filter(r => r.category === currentCategory);
  }

  // Поиск по названию
  if (currentSearch.trim()) {
    const q = currentSearch.trim().toLowerCase();
    list = list.filter(r => r.title.toLowerCase().includes(q));
  }

  // Пусто?
  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state__icon">😔</div>
        <h2>Ничего не найдено</h2>
        <p>Попробуй другой запрос или категорию</p>
      </div>
    `;
    return;
  }

  // Рисуем карточки
  grid.innerHTML = list.map(recipe => {
    const fav = isFavorite(recipe.id);
    return `
      <article class="recipe-card" data-id="${recipe.id}">
        <div class="recipe-card__image">
          <img src="${recipe.image}" alt="${recipe.title}">
          <span class="recipe-card__badge">${getCategoryName(recipe.category)}</span>
          <button class="recipe-card__fav ${fav ? 'active' : ''}" data-fav="${recipe.id}">
            ${fav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="recipe-card__body">
          <h3 class="recipe-card__title">${recipe.title}</h3>
          <div class="recipe-card__meta">
            <span class="recipe-card__rating">★ ${recipe.rating}</span>
            <span class="recipe-card__time">⏱ ${recipe.time} мин</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ============================================
// КЛИКИ ПО КАРТОЧКАМ И ИЗБРАННОМУ
// ============================================
grid.addEventListener('click', (e) => {
  // Клик по сердечку
  const favBtn = e.target.closest('[data-fav]');
  if (favBtn) {
    e.stopPropagation();

    if (!isLoggedIn()) {
      if (confirm('Чтобы добавить в избранное, нужно войти. Перейти на страницу входа?')) {
        window.location.href = 'login.html';
      }
      return;
    }

    toggleFavorite(favBtn.dataset.fav);
    renderRecipes();
    return;
  }

  // Клик по карточке — переход на рецепт
  const card = e.target.closest('.recipe-card');
  if (card) {
    window.location.href = `recipe.html?id=${card.dataset.id}`;
  }
});

// ============================================
// ФИЛЬТРЫ
// ============================================
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderRecipes();
  });
});

// ============================================
// ПОИСК
// ============================================
searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderRecipes();
});

// ============================================
// СТАРТ
// ============================================
renderRecipes();