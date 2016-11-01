function bkit_renderTemplate (root, template, state) {
  root.html(template.render(state));

  componentHandler.upgradeDom();
}

function bkit_init (root) {
  var wrapper = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
                '<div id="bk-it"></div>';
  $('body').append(wrapper);

  return $('#bk-it');
}
