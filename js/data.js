// ============================================
// ДАННЫЕ: 12 рецептов
// ============================================
const DEFAULT_RECIPES = [
  {
    id: 1,
    title: "Омлет с сыром и помидорами",
    category: "breakfast",
    time: 15,
    difficulty: "easy",
    rating: 4.5,
    servings: 2,
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600",
    ingredients: [
      "3 яйца",
      "50 г твёрдого сыра",
      "1 помидор",
      "2 ст. л. молока",
      "Соль, перец по вкусу",
      "1 ст. л. растительного масла"
    ],
    steps: [
      "Взбейте яйца с молоком, солью и перцем.",
      "Натрите сыр на крупной тёрке, помидор нарежьте кружочками.",
      "Разогрейте масло на сковороде, вылейте яйца.",
      "Когда низ схватится, выложите сыр и помидоры на половину.",
      "Сложите омлет пополам, накройте крышкой на 2 минуты."
    ]
  },
  {
    id: 2,
    title: "Сырники со сгущёнкой",
    category: "breakfast",
    time: 25,
    difficulty: "easy",
    rating: 4.8,
    servings: 3,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
    ingredients: [
      "400 г творога",
      "1 яйцо",
      "3 ст. л. муки",
      "2 ст. л. сахара",
      "Щепотка соли",
      "Сгущёнка для подачи"
    ],
    steps: [
      "Смешайте творог, яйцо, сахар и соль.",
      "Добавьте муку, замесите мягкое тесто.",
      "Сформируйте шайбочки, обваляйте в муке.",
      "Обжарьте на среднем огне по 3 минуты с каждой стороны.",
      "Подавайте со сгущёнкой или сметаной."
    ]
  },
  {
    id: 3,
    title: "Овсянка с ягодами",
    category: "breakfast",
    time: 10,
    difficulty: "easy",
    rating: 4.2,
    servings: 1,
    image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=600",
    ingredients: [
      "50 г овсяных хлопьев",
      "200 мл молока",
      "1 ст. л. мёда",
      "Горсть ягод",
      "Щепотка корицы"
    ],
    steps: [
      "Залейте хлопья молоком.",
      "Варите 5–7 минут на медленном огне, помешивая.",
      "Добавьте мёд и корицу.",
      "Сверху выложите ягоды."
    ]
  },
  {
    id: 4,
    title: "Борщ с говядиной",
    category: "dinner",
    time: 120,
    difficulty: "medium",
    rating: 4.9,
    servings: 6,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    ingredients: [
      "500 г говядины",
      "2 свёклы",
      "3 картофелины",
      "1 морковь",
      "1 луковица",
      "200 г капусты",
      "2 ст. л. томатной пасты",
      "Соль, лавровый лист"
    ],
    steps: [
      "Сварите бульон из говядины (около 1 часа).",
      "Натрите свёклу и морковь, нарежьте лук.",
      "Обжарьте лук с морковью, добавьте свёклу и томатную пасту.",
      "Добавьте в бульон нарезанный картофель и капусту.",
      "Через 10 минут добавьте зажарку, варите 15 минут.",
      "Дайте настояться под крышкой."
    ]
  },
  {
    id: 5,
    title: "Паста карбонара",
    category: "dinner",
    time: 30,
    difficulty: "medium",
    rating: 4.7,
    servings: 2,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600",
    ingredients: [
      "200 г спагетти",
      "100 г бекона",
      "2 яйца",
      "50 г пармезана",
      "2 зубчика чеснока",
      "Соль, перец"
    ],
    steps: [
      "Отварите спагетти до аль денте.",
      "Обжарьте бекон с чесноком.",
      "Взбейте яйца с тёртым пармезаном.",
      "Смешайте горячую пасту с беконом, снимите с огня.",
      "Быстро вмешайте яичную смесь, постоянно помешивая.",
      "Поперчите и подавайте сразу."
    ]
  },
  {
    id: 6,
    title: "Куриный суп с лапшой",
    category: "dinner",
    time: 60,
    difficulty: "easy",
    rating: 4.4,
    servings: 4,
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=600",
    ingredients: [
      "400 г курицы",
      "1 морковь",
      "1 луковица",
      "2 картофелины",
      "100 г лапши",
      "Зелень, соль"
    ],
    steps: [
      "Сварите куриный бульон.",
      "Достаньте курицу, нарежьте кусочками.",
      "Добавьте в бульон картофель, морковь, лук.",
      "Через 10 минут добавьте лапшу.",
      "Варите 5 минут, верните курицу, посолите, добавьте зелень."
    ]
  },
  {
    id: 7,
    title: "Стейк из лосося",
    category: "dinner",
    time: 20,
    difficulty: "medium",
    rating: 4.6,
    servings: 2,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600",
    ingredients: [
      "2 стейка лосося",
      "1 лимон",
      "2 ст. л. оливкового масла",
      "Соль, перец, розмарин"
    ],
    steps: [
      "Обсушите рыбу, посолите и поперчите.",
      "Разогрейте масло на сковороде.",
      "Обжаривайте кожей вниз 4 минуты.",
      "Переверните, добавьте розмарин и лимон.",
      "Готовьте ещё 3 минуты, полейте соком лимона."
    ]
  },
  {
    id: 8,
    title: "Шоколадный брауни",
    category: "dessert",
    time: 45,
    difficulty: "medium",
    rating: 4.9,
    servings: 8,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
    ingredients: [
      "200 г тёмного шоколада",
      "150 г сливочного масла",
      "200 г сахара",
      "3 яйца",
      "100 г муки",
      "Щепотка соли"
    ],
    steps: [
      "Растопите шоколад с маслом.",
      "Взбейте яйца с сахаром до пышности.",
      "Аккуратно смешайте с шоколадной массой.",
      "Добавьте муку и соль, перемешайте.",
      "Вылейте в форму и выпекайте 25 минут при 180°C."
    ]
  },
  {
    id: 9,
    title: "Тирамису",
    category: "dessert",
    time: 60,
    difficulty: "hard",
    rating: 4.8,
    servings: 6,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
    ingredients: [
      "500 г маскарпоне",
      "4 яйца",
      "100 г сахара",
      "200 г печенья савоярди",
      "300 мл кофе",
      "Какао для посыпки"
    ],
    steps: [
      "Отделите желтки, взбейте с сахаром.",
      "Добавьте маскарпоне, перемешайте.",
      "Взбейте белки до пиков, аккуратно вмешайте.",
      "Обмакните печенье в кофе, выложите слоем.",
      "Чередуйте слои с кремом.",
      "Поставьте в холодильник на 4 часа, посыпьте какао."
    ]
  },
  {
    id: 10,
    title: "Панкейки с бананом",
    category: "dessert",
    time: 20,
    difficulty: "easy",
    rating: 4.5,
    servings: 3,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
    ingredients: [
      "1 банан",
      "2 яйца",
      "100 г муки",
      "150 мл молока",
      "1 ст. л. сахара",
      "1 ч. л. разрыхлителя"
    ],
    steps: [
      "Разомните банан вилкой.",
      "Добавьте яйца, молоко, сахар — перемешайте.",
      "Всыпьте муку и разрыхлитель, замешайте тесто.",
      "Жарьте на сухой сковороде по 2 минуты с каждой стороны."
    ]
  },
  {
    id: 11,
    title: "Капучино",
    category: "drinks",
    time: 5,
    difficulty: "easy",
    rating: 4.3,
    servings: 1,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600",
    ingredients: [
      "1 порция эспрессо",
      "150 мл молока",
      "Корица по желанию"
    ],
    steps: [
      "Сварите эспрессо.",
      "Взбейте молоко до пены.",
      "Аккуратно влейте молоко в кофе.",
      "Посыпьте корицей."
    ]
  },
  {
    id: 12,
    title: "Лимонад с мятой",
    category: "drinks",
    time: 10,
    difficulty: "easy",
    rating: 4.6,
    servings: 4,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600",
    ingredients: [
      "2 лимона",
      "Пучок мяты",
      "3 ст. л. сахара",
      "1 л воды",
      "Лёд"
    ],
    steps: [
      "Выжмите сок из лимонов.",
      "Смешайте с водой и сахаром.",
      "Добавьте мяту и лёд.",
      "Дайте настояться 10 минут."
    ]
  }
];

// ============================================
// РАБОТА С localStorage
// ============================================

// Получить все рецепты (дефолтные + добавленные пользователем)
function getAllRecipes() {
  const custom = JSON.parse(localStorage.getItem('customRecipes') || '[]');
  return [...DEFAULT_RECIPES, ...custom];
}

// Получить один рецепт по id
function getRecipeById(id) {
  return getAllRecipes().find(r => r.id === Number(id));
}

// ============================================
// ИЗБРАННОЕ
// ============================================
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function toggleFavorite(recipeId) {
  const favs = getFavorites();
  const id = Number(recipeId);
  const index = favs.indexOf(id);
  if (index === -1) {
    favs.push(id);
  } else {
    favs.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
  return index === -1; // true если добавили, false если убрали
}

function isFavorite(recipeId) {
  return getFavorites().includes(Number(recipeId));
}

// ============================================
// ХЕЛПЕРЫ
// ============================================
const CATEGORY_NAMES = {
  breakfast: "Завтрак",
  dinner: "Обед",
  dessert: "Десерт",
  drinks: "Напитки"
};

const DIFFICULTY_NAMES = {
  easy: "Легко",
  medium: "Средне",
  hard: "Сложно"
};

function getCategoryName(cat) {
  return CATEGORY_NAMES[cat] || cat;
}

function getDifficultyName(diff) {
  return DIFFICULTY_NAMES[diff] || diff;
}

// Отрисовка звёзд рейтинга
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '★'.repeat(full);
  if (half) stars += '⯨';
  stars += '☆'.repeat(5 - full - (half ? 1 : 0));
  return stars;
}