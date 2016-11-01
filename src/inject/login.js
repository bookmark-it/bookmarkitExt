var template = '',
    state = {
      loading: false,
      username: '',
      password: ''
    },
    root = null;

function render() {
  bkit_renderTemplate(root, template, state);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.logged) {
    state['loading'] =  false;
  }
});

chrome.runtime.sendMessage(null, null, null, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      root = bkit_init();

      $.ajax({
          url: chrome.extension.getURL('/templates/login.html'),
          dataType: 'html'
        })
        .done(function(html) {
          template = Hogan.compile(html);

          render();

          loginMain();
        });
      // ----------------------------------------------------------

    }
  }, 10);
});

function loginMain() {
  $('#bk-it form').submit(function(e) {
    e.preventDefault();

    state.username = $(this).find('[name=username]').val();
    state.password = $(this).find('[name=password]').val();

    var data = {
      username: state.username,
      password: state.password,
    }

    state['loading'] =  true;
    render();

    chrome.runtime.sendMessage({ login: true, data: data });
  });
}
