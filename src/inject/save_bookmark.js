function getTemplate(url) {
  return new Promise(function(resolve, reject) {
      $.ajax({
          type: "GET",
          url: chrome.extension.getURL(url),
          success: resolve
      });
  })
}

getTemplate('templates/save_bookmark.html')
  .then(function(html) {
    var el = $(html);
    $('body').append(el);
    main();
  });

function main() {
  var bookmark = null,
      sending = false,
      timeOut = setTimeout(destroyPopup, 3000);

  function destroyPopup() {
    clearTimeout(timeOut);
    $('#bkit').remove();
  }

  function showCategories(categories) {
    var categoryList = "";
    $.each(categories, function(index, category) {
      categoryList += '<li>' +
      category.name +
      '<button id="'+ category.id + '" type="button">x</button>' +
      '</li>';
    })
    $('#bkit #categories').html(categoryList);
  }

  $('#bkit #category').submit(function(e) {
    e.preventDefault();
    var newCat = $('input[name=category]').val();
    if (newCat){
      bookmark.categories.push({
        name: newCat
      })
    }
    sending = true;
    chrome.runtime.sendMessage({
      'update': bookmark
    });
  })

  $("#bkit #categories").on('click', 'li button', function(e) {
    var $elt = $(e.currentTarget),
    id = +$elt.attr('id'),
    indexToDel = null;
    $.each(bookmark.categories, function(index, category) {
      if (category.id === id) {
        indexToDel = index;
      }
    })
    if (indexToDel !== null) {
      bookmark.categories.splice(indexToDel, 1);
      chrome.runtime.sendMessage({
        'update': bookmark
      });
    }
  })

  $("#bkit #close").click(function() {
    destroyPopup();
  });

  $("#bkit").mouseenter(function(){
    clearTimeout(timeOut);
  })

  $("#bkit").mouseleave(function(){
    timeOut = setTimeout(destroyPopup, 3000);
  })

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.bookmark) {
      sending = false;
      bookmark = request.bookmark;
      showCategories(bookmark.categories);
    }
  });
}
