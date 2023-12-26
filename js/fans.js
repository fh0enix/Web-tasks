function isOnline() {
  return window.navigator.onLine;
}

$(function(){

  let currentTime = new Date($.now());
  let formattedTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

  if (isOnline() && 'appeal_text' in localStorage){

    let appealtxt = localStorage.getItem('appeal_text');
    let name = localStorage.getItem('name');

    let appeal = `<section>
      <p>${appealtxt}</p>
      <br>
      <div style="display: flex; justify-content: space-around">
        <span>Time: ${formattedTime}</span>
        <span>Name: ${name}</span>
      </div>
      <hr style="margin: 0 5%;">`;

    $("#article1").prepend(appeal);

    localStorage.clear();
  }

  $("#btn").click(function () {
    let appealtxt = $("#fans_input").val();
    let name = $("#name").val();

    if (!(appealtxt.trim())){
      alert("Input valid data");
      $("#fans_input").addClass("redBorder");
    }
    else if (isOnline()){
      $("#fans_input").removeClass("redBorder");

      let appeal = `<section>
        <p>${appealtxt}</p>
        <br>
        <div style="display: flex; justify-content: space-around">
          <span>Time: ${formattedTime}</span>
          <span>Name: ${name}</span>
        </div>
        <hr style="margin: 0 5%;">`;

      $("#article1").prepend(appeal);
    }
    else {
      localStorage.setItem('appeal_text', appealtxt);
      localStorage.setItem('name', name);

      alert("Saved LOCALY successfully!");
    }

    $("#fans_input").val('');
    $("#name").val('');
  });
});
