//////////
// TOOLTIPS
//////////
(function($, APP) {
  APP.Plugins.Tooltip = {
    init: function() {
      var schemeOptions = {
        side: 'top',
      };

      $('.tooltipstered').tooltipster(schemeOptions);

      _window.on(
        'scroll',
        throttle(function() {
          $('.tooltipstered').tooltipster('reposition');
        }, 50)
      );
    },
  };
})(jQuery, window.APP);
