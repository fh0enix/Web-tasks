function isOnline() {
  return window.navigator.onLine;
}

$(function(){
  if (isOnline() && 'title' in localStorage && 'text' in localStorage){
    let news_title = localStorage.getItem('title')
    let news_text = localStorage.getItem('text')
    let image = localStorage.getItem('recent_image')
    let new_card = `<div class="card">
      <img src=${image} style="width:100%">
      <div class="card-container">
        <h4><b>${news_title}</b></h4>
        <p>${news_text}</p>
      </div>
    </div>`
    $(".cards_with_news").prepend(new_card)
    localStorage.clear()
  }
})
