//////////
// CICKS
//////////
(function($, APP) {
  APP.Plugins.Clicks = {
    init: function() {
      $(document)
        .on('click', '[href="#"]', function(e) {
          e.preventDefault();
        })
        .on('click', '[js-link]', function(e) {
          var dataHref = $(this).data('href');
          if (dataHref && dataHref !== '#') {
            e.preventDefault();
            e.stopPropagation();
            Barba.Pjax.goTo(dataHref);
          }
        })
        // prevent going the same link (if barba is connected)
        .on('click', 'a, [js-link]', function(e) {
          var href = $(this).data('href') || $(this).attr('href');
          var path = window.location.pathname;

          if (href === path.slice(1, path.length)) {
            e.preventDefault();
            e.stopPropagation();
          }
        })

        // adding filter button class on materials page
        .on('click', '[js-materials-btn]', function(e) {
          $('.materials__filter-btn').removeClass('is-active');
          $(this).addClass('is-active');
        })

        // scroll to section
        .on('click', 'a[href^="#section"]', function() {
          // section scroll
          var el = $(this).attr('href');
          var topTarget = $(el).offset().top;

          // $('body, html').animate({scrollTop: topTarget}, 1000);
          TweenLite.to(window, 1, {
            scrollTo: { y: topTarget, autoKill: false },
            ease: easingSwing,
          });

          return false;
        })

        .on('change', '.ui-checkbox', function() {
          var _valueCheckbox = $(this).find("input[type='radio']").val();
          var $select = $('.contacts__select');

          var $consultant = $('.contacts__person');
          var $consultantUnknown = $('.contacts__person-unknown');

          if ($('.ui-checkbox').find("input[type='radio']:checked").length) {

            $select.removeClass('is-visible');
            $consultant.removeClass('is-visible');
            $consultantUnknown.addClass('is-visible');
            $("[data-select='" + _valueCheckbox + "']").addClass('is-visible');

            $('[js-select]').selectric('destroy');

            $('[js-select] option').prop('selected', function() {
              return this.defaultSelected;
            });

            $('[js-select]').selectric('init');

          } else {

            $select.removeClass('is-visible');

          }
        })

        .on('change', '.contacts__select select[js-select]', function() {
          var _value = $(this).val();

          var $consultantUnknown = $('.contacts__person-unknown');
          var $consultant = $('.contacts__person');

          if (_value !== 'val0') {

            $consultantUnknown.removeClass('is-visible');
            $consultant.removeClass('is-visible');
            $("[data-person='" + _value + "']").addClass('is-visible');

          } else {

            $consultant.removeClass('is-visible');
            $consultantUnknown.addClass('is-visible');

          }

        })

        // pagination
        .on('click', '[js-pagination]', function() {
          var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
          // $('.cdp_i').on('click', function() {
          var go = $(this)
            .attr('href')
            .replace('#!', '');
          if (go === '+1') {
            paginationPage++;
          } else if (go === '-1') {
            paginationPage--;
          } else {
            paginationPage = parseInt(go, 10);
          }
          $('.cdp').attr('actpage', paginationPage);
        });
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
