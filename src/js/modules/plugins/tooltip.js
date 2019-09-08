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
    },
  };
})(jQuery, window.APP);
