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
          var el = $(html);
          $('body').append(el);
          main();
        });
      // ----------------------------------------------------------

    }
  }, 10);
});

function main() {
  var login_url = "//bk-it.herokuapp.com/api/auth/login/";

  function destroyPopup() {
    $('#bkit').remove();
  }

  $('#bkit form').submit(function(e) {
    e.preventDefault();
    var data = {
      username: $(this).find('[name=username]').val(),
      password: $(this).find('[name=password]').val(),
    }
    $.post(login_url, data, function(response) {
      chrome.runtime.sendMessage({
        'bk-it_token': response.auth_token
      }, function(response) {
        if (response.done === true) {
          destroyPopup();
        }
      });
    });
  })
}
