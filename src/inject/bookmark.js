var template = '',
    state = {
      loading: true,
      bookmark: null
    },
    root = null;

function render() {
  bkit_renderTemplate(root, template, state);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.bookmark) {
    state['loading'] =  false;
    state['bookmark'] = request.data;
    render();
  }
});

chrome.runtime.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      root = bkit_init();

      $.ajax({
          url: chrome.extension.getURL('/templates/bookmark.html'),
          dataType: 'html'
        })
        .done(function(html) {
          template = Hogan.compile(html);

          render();

          bookmarkMain();
        });
      // ----------------------------------------------------------

    }
  }, 10);
});

function bookmarkMain() {
  console.log('bookmark here is your bookmark')
}
