window.bkit_renderTemplate = function(root, template, state) {
  root.html(template.render(state));

  componentHandler.upgradeDom();
}

window.bkit_init = function (root) {
  var wrapper = '<div id="bkit" class="mdl-card mdl-shadow--2dp">';
  $('body').append(wrapper);

  return $('#bkit');
}
