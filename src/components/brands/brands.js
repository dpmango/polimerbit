//////////
// BRANDS HOVERS
//////////
(function($, APP) {
  APP.Components.Brands = {
    init: function() {
      $(document).on('mouseenter', '[js-hover-polimer]', function() {
        $('.brands__bg--polimer').fadeIn();
        $('.brands').addClass('brands--hover');
      });
      $(document).on('mouseleave', '[js-hover-polimer]', function() {
        $('.brands__bg--polimer').fadeOut();
        $('.brands').removeClass('brands--hover');
      });

      $(document).on('mouseenter', '[js-hover-forma]', function() {
        $('.brands__bg--forma').fadeIn();
        $('.brands').addClass('brands--hover');
      });
      $(document).on('mouseleave', '[js-hover-forma]', function() {
        $('.brands__bg--forma').fadeOut();
        $('.brands').removeClass('brands--hover');
      });
    },
  };
})(jQuery, window.APP);
