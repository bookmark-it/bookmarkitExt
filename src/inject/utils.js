window.bkit_renderTemplate = function(root, template, state) {
  root.html(template.render(state));

  componentHandler.upgradeDom();
}

window.bkit_init = function (root) {
  var wrapper = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
                '<div id="bkit"></div>';
  $('body').append(wrapper);

  return $('#bkit');
}
