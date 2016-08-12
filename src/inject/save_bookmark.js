var template = '<div id="bkit">' +
      '<h1>Bookmark Saved !</h1>' +
    '</div>';

function destroyPopup() {
  $('#bkit').remove();
}

$('body').append(template);

setTimeout(destroyPopup, 2000);
