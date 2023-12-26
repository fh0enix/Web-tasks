// Отримання посилання на елемент зображення та інпут для вибору файлу
const image = document.getElementById('output');
const image_input = document.querySelector("#image-input");

// Задання шляху до зображення за замовчуванням
const defaultImagePath = "images/default_image.jpg";

// Встановлення зображення за замовчуванням при завантаженні сторінки
image.src = defaultImagePath;

// Функція для завантаження вибраного користувачем зображення
let loadFile = function(event) {
  image.src = URL.createObjectURL(event.target.files[0]);
};

// Перевірка доступності Інтернет-з'єднання
function isOnline() {
  return window.navigator.onLine;
}

// Чекаємо завершення завантаження сторінки та виконуємо код
$(function(){
  // Визначаємо дію при натисканні на кнопку збереження
  $("#btn").click(function () {
    // Отримуємо значення тексту новини та заголовку
    let news_text = $("#news_text").val();
    let news_title = $("#news_title").val();

    // Додаємо перевірку на news_title
    if (!(news_title.trim())) {
      alert("News title cannot be empty or contain only spaces");
      $("#news_title").addClass("redBorder");
      return; // Припиняємо виконання коду, якщо умова не виконується
    }

    // Отримуємо значення вибраного зображення
    let imageInputValue = image_input.value;

    // Перевірка на введення валідних даних
    if (!(news_text.trim() && imageInputValue)) {
      alert("Input valid data");
      $("#news_text").addClass("redBorder");
    } else if (isOnline()) {
      // Видаляємо червоний бордюр, якщо він був доданий
      $("#news_text").removeClass("redBorder");
      $("#news_title").removeClass("redBorder");

      // Очищення полів та зображення за замовчуванням
      $("#news_text").val('');
      $("#news_title").val('');
      image.src = defaultImagePath;

      alert("Saved successfully!");
    } else {
      // Якщо немає доступу до Інтернету, зберігаємо дані локально
      localStorage.setItem('title', news_title);
      localStorage.setItem('text', news_text);
      localStorage.setItem('recent_image', imageInputValue);

      $("#news_text").val('');
      $("#news_title").val('');
      image.src = defaultImagePath;

      alert("Saved LOCALY successfully!");
    }
  });
});

// Встановлення слухача подій для інпуту вибору зображення
image_input.addEventListener("change", function () {
  // Створення об'єкта FileReader для зчитування вибраного зображення
  const reader = new FileReader();

  // Визначення дій при завантаженні зображення
  reader.addEventListener("load", () => {
    // Збереження закодованого у Base64 зображення в локальне сховище
    const uploaded_image = reader.result;
    localStorage.setItem("recent_image" , uploaded_image);
  });

  // Зчитування вибраного файлу
  reader.readAsDataURL(this.files[0]);
});
