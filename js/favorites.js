// ============================================
// СТРАНИЦА ИЗБРАННОГО
// ============================================

// Только для авторизованных
if (requireAuth()) {
  initFavorites();
}

function initFavorites() {
  const grid = document.getElementById('favoritesGrid');

  function renderFavorites() {
    const favIds = getFavorites();
    const allRecipes = getAllRecipes();
    const favoriteRecipes = allRecipes.filter(r => favIds.includes(r.id));

    // Пусто?
    if (favoriteRecipes.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state__icon">💔</div>
          <h2>В избранном пока пусто</h2>
          <p>Добавляйте рецепты, нажимая на сердечко ❤️</p>
          <a href="index.html" class="btn btn--primary">← Перейти к рецептам</a>
        </div>
      `;
      return;
    }

    // Рисуем карточки
    grid.innerHTML = favoriteRecipes.map(recipe => `
      <article class="recipe-card" data-id="${recipe.id}">
        <div class="recipe-card__image">
          <img src="${recipe.image}" alt="${recipe.title}">
          <span class="recipe-card__badge">${getCategoryName(recipe.category)}</span>
          <button class="recipe-card__fav active" data-fav="${recipe.id}">❤️</button>
        </div>
        <div class="recipe-card__body">
          <h3 class="recipe-card__title">${recipe.title}</h3>
          <div class="recipe-card__meta">
            <span class="recipe-card__rating">★ ${recipe.rating}</span>
            <span class="recipe-card__time">⏱ ${recipe.time} мин</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Клики по карточкам и сердечкам
  grid.addEventListener('click', (e) => {
    // Клик по сердечку — удаляем из избранного
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      e.stopPropagation();
      toggleFavorite(favBtn.dataset.fav);
      renderFavorites(); // перерисовываем список
      return;
    }

    // Клик по карточке — переход на рецепт
    const card = e.target.closest('.recipe-card');
    if (card) {
      window.location.href = `recipe.html?id=${card.dataset.id}`;
    }
  });

  // Первый рендер
  renderFavorites();
}