// ============================================
// СТРАНИЦА ДОБАВЛЕНИЯ РЕЦЕПТА
// ============================================

// Только для авторизованных
if (!requireAuth()) {
  // requireAuth сам сделает редирект
} else {
  initPage();
}

function initPage() {
  const form = document.getElementById('addRecipeForm');
  const errorBox = document.getElementById('errorBox');
  const ingredientsList = document.getElementById('ingredientsList');
  const stepsList = document.getElementById('stepsList');

  // === ДИНАМИЧЕСКИЕ ИНГРЕДИЕНТЫ ===
  function createIngredientRow(value = '') {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';
    row.innerHTML = `
      <input type="text" class="ingredient-input" placeholder="Например: 200 г муки" value="${value}" required>
      <button type="button" class="btn btn--danger" style="padding: 8px 12px;">✕</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      if (ingredientsList.children.length > 1) row.remove();
    });
    return row;
  }

  // Стартовые поля
  ingredientsList.appendChild(createIngredientRow());

  document.getElementById('addIngredient').addEventListener('click', () => {
    ingredientsList.appendChild(createIngredientRow());
  });

  // === ДИНАМИЧЕСКИЕ ШАГИ ===
  function createStepRow(value = '') {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';
    row.innerHTML = `
      <textarea class="step-input" placeholder="Опишите шаг..." required style="min-height: 60px;">${value}</textarea>
      <button type="button" class="btn btn--danger" style="padding: 8px 12px; align-self: flex-start;">✕</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      if (stepsList.children.length > 1) row.remove();
    });
    return row;
  }

  stepsList.appendChild(createStepRow());

  document.getElementById('addStep').addEventListener('click', () => {
    stepsList.appendChild(createStepRow());
  });

  // === ОТПРАВКА ФОРМЫ ===
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorBox.classList.remove('show');

    // Собираем ингредиенты
    const ingredients = [...ingredientsList.querySelectorAll('.ingredient-input')]
      .map(inp => inp.value.trim())
      .filter(v => v);

    // Собираем шаги
    const steps = [...stepsList.querySelectorAll('.step-input')]
      .map(inp => inp.value.trim())
      .filter(v => v);

    // Валидация
    if (ingredients.length === 0) {
      return showError('Добавьте хотя бы один ингредиент');
    }
    if (steps.length === 0) {
      return showError('Добавьте хотя бы один шаг приготовления');
    }

    // Формируем рецепт
    const newRecipe = {
      id: Date.now(), // уникальный id
      title: document.getElementById('title').value.trim(),
      image: document.getElementById('image').value.trim() ||
             'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600',
      category: document.getElementById('category').value,
      difficulty: document.getElementById('difficulty').value,
      time: Number(document.getElementById('time').value),
      servings: Number(document.getElementById('servings').value),
      rating: 5.0, // новым рецептам даём 5 звёзд
      ingredients: ingredients,
      steps: steps,
      author: getCurrentUser().name,
      createdAt: new Date().toISOString()
    };

    // Сохраняем в localStorage
    const custom = JSON.parse(localStorage.getItem('customRecipes') || '[]');
    custom.push(newRecipe);
    localStorage.setItem('customRecipes', JSON.stringify(custom));

    // Редирект на страницу нового рецепта
    window.location.href = `recipe.html?id=${newRecipe.id}`;
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}