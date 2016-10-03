var template = '',
    state = {
      loading: false,
      username: '',
      password: ''
    },
    root = $('#bkit');

function renderTemplate() {
  console.log('root.length', root.length);
  if (root.length) {
    root.replaceWith(template.render(state));
  } else {
    $('body').append(template.render(state));
    root = $('#bkit');
  }

  componentHandler.upgradeDom();
}

function updateState(key, value) {
  if (state.hasOwnProperty(key)) {
    state[key] = value;

    renderTemplate();
  }
}

chrome.runtime.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      $.ajax({
          url: chrome.extension.getURL('templates/login.html'),
          dataType: 'html'
        })
        .done(function(html) {
          template = Hogan.compile(html);

          renderTemplate();

          loginMain();
        });
      // ----------------------------------------------------------

    }
  }, 10);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.logged) {
    console.log('request.bookmark', request.bookmark);
  }
});

function loginMain() {
  $('#bkit form').submit(function(e) {
    e.preventDefault();

    state.username = $(this).find('[name=username]').val();
    state.password = $(this).find('[name=password]').val();

    var data = {
      username: state.username,
      password: state.password,
    }

    updateState('loading', true);
    chrome.runtime.sendMessage({ login: true, data: data });
  });
}
