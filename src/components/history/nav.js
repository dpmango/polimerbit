//////////
// CICKS
//////////
(function($, APP) {
  APP.Components.Nav = {
    init: function() {

      $(document).on('click', '.history-nav__list a', function() {
          // section scroll
          var el = $(this).attr('href');

          var topTarget = $(el).offset().top;
          var height = $(".header").outerHeight() +  $(".history-nav").outerHeight();

          // $('body, html').animate({scrollTop: topTarget}, 1000);
          TweenLite.to(window, 1, {
            scrollTo: { y: topTarget - height, autoKill: false },
            ease: easingSwing,
          });

          $('.history-nav__list a').removeClass('is-active');
          $(this).addClass('is-active');

          return false;
        });

        // getPaginationSections();
        // pagination();

        // //////////
        // // PAGINATION
        // //////////
        // var paginationAnchors, sections;

        // function getPaginationSections() {
        //   paginationAnchors = $(".history-nav__list a");
        //   sections = $(".page__content [data-section]");
        // }

        // function pagination() {
        //   // Cache selectors
        //   var headerHeight = $(".header").outerHeight() +  $(".history-nav").outerHeight();
        //   var vScroll = _window.scrollTop();

        //   if (sections.length === 0) {
        //     paginationAnchors.removeClass("is-active");
        //     return false;
        //   }

        //   // Get id of current scroll item
        //   var cur = sections.map(function() {
        //     if ($(this).offset().top <= vScroll + headerHeight / 0.99) return this;
        //   });
        //   // Get current element
        //   cur = $(cur[cur.length - 1]);
        //   var id = cur && cur.length ? cur.data("section") : "1";

        //   // Set/remove active class
        //   paginationAnchors
        //     .removeClass("is-active")
        //     .filter("[data-section='" + id + "']")
        //     .addClass("is-active");
        // }
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
