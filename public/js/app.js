$(document).ready(function() {
  const $form = $('#xhr-search-form');
  const $searchField = $('#search-keyword');
  const $responseContainer = $('#response-container');
  let searchForText;
  
  $form.submit(function(event) {
    event.preventDefault();
    $responseContainer.html('');
    searchForText = $searchField.val();
    getNews();
  });

  function getNews() {
    $.ajax({
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=dcfdda7272024e589cf84641aa85c739`
    }).done(addNews)
      .fail(handleError);
  };

  function addNews(data) {
    console.log(data);
    let output = '';
    for (i = 0; i < data.response.docs.length; i++) {
      console.log(data.response.docs[i]);
      let title = data.response.docs[i].headline.main;
      console.log(title);
      let link = data.response.docs[i].web_url;
      let snippet = data.response.docs[i].snippet;
      output += `
        <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${snippet}</p>
          <a href="${link}" class="card-link">Noticia Completa</a>
        </div>
      </div>
        `;
      $responseContainer.html(output);
    }
  };

  function handleError() {
    console.log('se ha presentado un error');
    let $paragraph = ('<p>Lo sentimos, ha ocurrido un error</p>');
    $responseContainer.append($paragraph);
  }
});

