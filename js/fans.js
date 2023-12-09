$(function(){
  // Функція для перевірки доступності Інтернет-з'єднання
  function isOnline() {
    return window.navigator.onLine;
  }

  // Отримання поточного часу
  let currentTime = new Date($.now());
  let formattedTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

  // Перевірка наявності підключення до Інтернету та наявності даних в локальному сховищі
  if (isOnline() && 'appeal_text' in localStorage){
    // Отримання збережених даних
    let appealtxt = localStorage.getItem('appeal_text');
    let name = localStorage.getItem('name');

    // Формування HTML-коду для відображення збережених даних
    let appeal = `<section>
      <p>${appealtxt}</p>
      <br>
      <div style="display: flex; justify-content: space-around">
        <span>Time: ${formattedTime}</span>
        <span>Name: ${name}</span>
      </div>
      <hr style="margin: 0 5%;">`;

    // Додавання вмісту до елементу з ідентифікатором "article1"
    $("#article1").prepend(appeal);

    // Очищення локального сховища після виведення даних
    localStorage.clear();
  }

  // Обробник події для кнопки з ідентифікатором "btn"
  $("#btn").click(function () {
    // Отримання значень з полів введення
    let appealtxt = $("#fans_input").val();
    let name = $("#name").val();

    // Перевірка на коректність введених даних
    if (!(appealtxt.trim())){
      alert("Input valid data");
      $("#fans_input").addClass("redBorder"); // Відзначення помилкового поля червоним
    }
    // Якщо є Інтернет-з'єднання, вивести дані на сторінку
    else if (isOnline()){
      $("#fans_input").removeClass("redBorder"); // Зняття позначення помилкового поля
      // Формування HTML-коду для відображення введених даних
      let appeal = `<section>
        <p>${appealtxt}</p>
        <br>
        <div style="display: flex; justify-content: space-around">
          <span>Time: ${formattedTime}</span>
          <span>Name: ${name}</span>
        </div>
        <hr style="margin: 0 5%;">`;

      // Додавання вмісту до елементу з ідентифікатором "article1"
      $("#article1").prepend(appeal);
    }
    // Якщо немає Інтернет-з'єднання, зберегти дані в локальному сховищі
    else {
      localStorage.setItem('appeal_text', appealtxt);
      localStorage.setItem('name', name);
    }

    // Очищення полів введення
    $("#fans_input").val('');
    $("#name").val('');
  });
});
