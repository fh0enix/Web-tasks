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
      <p>${news_title}</p>
      <h4><b>${news_text}</b></h4>
      </div>
    </div>`
    $(".cards_with_news").prepend(new_card)
    localStorage.clear()
  }
})
