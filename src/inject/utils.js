function bkit_renderTemplate (root, template, state) {
  root.html(template.render(state));

  componentHandler.upgradeDom();
}

function bkit_init (root) {
  var wrapper = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
                '<div id="bkit"></div>';
  $('body').append(wrapper);

  return $('#bkit');
}
