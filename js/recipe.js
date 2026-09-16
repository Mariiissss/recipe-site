// ============================================
// СТРАНИЦА ОДНОГО РЕЦЕПТА
// ============================================

// 1. Достаём id из URL (?id=3)
const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

const container = document.getElementById('recipeContent');

// 2. Если id нет или рецепт не найден
const recipe = recipeId ? getRecipeById(recipeId) : null;

if (!recipe) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon">🤔</div>
      <h2>Рецепт не найден</h2>
      <p>Возможно, он был удалён или ссылка неверная</p>
      <a href="index.html" class="btn btn--primary">← Вернуться на главную</a>
    </div>
  `;
} else {
  renderRecipe(recipe);
  document.title = `${recipe.title} — Что приготовить?`;
}

// ============================================
// ОТРИСОВКА РЕЦЕПТА
// ============================================
function renderRecipe(r) {
  const fav = isFavorite(r.id);

  container.innerHTML = `
    <a href="index.html" class="back-link">← Все рецепты</a>

    <div class="recipe-hero">
      <img src="${r.image}" alt="${r.title}">
    </div>

    <div class="recipe-header">
      <div>
        <h1>${r.title}</h1>
        <div class="recipe-card__rating">★ ${r.rating} · ${getCategoryName(r.category)}</div>
      </div>
      <div class="recipe-header__actions">
        <button class="btn ${fav ? 'btn--primary' : 'btn--ghost'}" id="favBtn">
          ${fav ? '❤️ В избранном' : '🤍 В избранное'}
        </button>
      </div>
    </div>

    <div class="recipe-stats">
      <div class="recipe-stat">
        <span class="recipe-stat__label">Время</span>
        <span class="recipe-stat__value">⏱ ${r.time} мин</span>
      </div>
      <div class="recipe-stat">
        <span class="recipe-stat__label">Сложность</span>
        <span class="recipe-stat__value">${getDifficultyName(r.difficulty)}</span>
      </div>
      <div class="recipe-stat">
        <span class="recipe-stat__label">Порции</span>
        <span class="recipe-stat__value">🍽 ${r.servings}</span>
      </div>
      <div class="recipe-stat">
        <span class="recipe-stat__label">Категория</span>
        <span class="recipe-stat__value">${getCategoryName(r.category)}</span>
      </div>
    </div>

    <section class="recipe-section">
      <h2>🛒 Ингредиенты</h2>
      <ul class="ingredients-list">
        ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </section>

    <section class="recipe-section">
      <h2>👨‍🍳 Приготовление</h2>
      <ol class="steps-list">
        ${r.steps.map(s => `<li>${s}</li>`).join('')}
      </ol>
    </section>
  `;

  // Кнопка избранного
  const favBtn = document.getElementById('favBtn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (!isLoggedIn()) {
        if (confirm('Чтобы добавить в избранное, нужно войти. Перейти на страницу входа?')) {
          window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname.split('/').pop() + window.location.search);
        }
        return;
      }
      const added = toggleFavorite(r.id);
      favBtn.textContent = added ? '❤️ В избранном' : '🤍 В избранное';
      favBtn.classList.toggle('btn--primary', added);
      favBtn.classList.toggle('btn--ghost', !added);
    });
  }
}