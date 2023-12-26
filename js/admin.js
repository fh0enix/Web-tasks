const image = document.getElementById('output');
const image_input = document.querySelector("#image-input");

const defaultImagePath = "images/default_image.jpg";

image.src = defaultImagePath;

let loadFile = function(event) {
  image.src = URL.createObjectURL(event.target.files[0]);
};

function isOnline() {
  return window.navigator.onLine;
}

$(function(){
  $("#btn").click(function () {
    let news_text = $("#news_text").val();
    let news_title = $("#news_title").val();

    if (!(news_title.trim())) {
      alert("News title cannot be empty or contain only spaces");
      $("#news_title").addClass("redBorder");
      return;
    }

    let imageInputValue = image_input.value;

    if (!(news_text.trim() && imageInputValue)) {
      alert("Input valid data");
      $("#news_text").addClass("redBorder");
    } else if (isOnline()) {
      $("#news_text").removeClass("redBorder");
      $("#news_title").removeClass("redBorder");

      $("#news_text").val('');
      $("#news_title").val('');
      image.src = defaultImagePath;

      alert("Saved successfully!");
    } else {
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

image_input.addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    localStorage.setItem("recent_image" , uploaded_image);
  });

  reader.readAsDataURL(this.files[0]);
});
