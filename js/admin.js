const image = document.getElementById('output');
const image_input = document.querySelector("#image-input");

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

    // Declare image_input variable before using it
    let imageInputValue = image_input.value;

    if (!(news_text.trim() && news_title.trim() && imageInputValue)){
      alert("Input valid data");
      $("#news_text").addClass("redBorder");
    } else if (isOnline()){
      $("#news_text").removeClass("redBorder");
      $("#news_text").val('');
      $("#news_title").val('');
      alert("Saved successfully!");

      // Clear the image after saving
      image.src = '';
    } else {
      localStorage.setItem('title', news_title);
      localStorage.setItem('text', news_text);
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
