//////////
// BRANDS HOVERS
//////////
(function($, APP) {
  APP.Components.Brands = {
    init: function() {
      $(document).on('mouseenter', '[js-hover-polimer]', function() {
        $('.brands__bg--polimer').addClass('is-active');
        $('.brands').addClass('brands--hover');
      });
      $(document).on('mouseleave', '[js-hover-polimer]', function() {
        $('.brands__bg--polimer').removeClass('is-active');
        $('.brands').removeClass('brands--hover');
      });

      $(document).on('mouseenter', '[js-hover-forma]', function() {
        $('.brands__bg--forma').addClass('is-active');
        $('.brands').addClass('brands--hover');
      });
      $(document).on('mouseleave', '[js-hover-forma]', function() {
        $('.brands__bg--forma').removeClass('is-active');
        $('.brands').removeClass('brands--hover');
      });
    },
  };
})(jQuery, window.APP);
