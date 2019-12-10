//////////
// CICKS
//////////
(function($, APP) {
  APP.Components.Nav = {
    data: {
      offsetHeight: undefined,
      navList: undefined,
      paginationAnchors: [],
      historySections: [],
    },
    init: function() {
      this.getHistorySections();
      this.clickListeners();
      this.listenScroll();
    },
    getHistorySections: function() {
      var $page = $('.page').last();
      this.data.offsetHeight = $('.header').outerHeight() + $('.history-nav').outerHeight();
      this.data.navList = $page.find('.history-nav__list');
      this.data.paginationAnchors = $page.find('.history-nav__list a');
      this.data.historySections = $page.find('[data-section]');
    },
    clickListeners: function() {
      var _this = this;

      $(document).on('click', '.history-nav__list a', function() {
        var dataSectionFor = $(this).data('for-section');
        var el = $('[data-section="' + dataSectionFor + '"]');

        var topTarget = $(el).offset().top;
        TweenLite.to(window, 1, {
          scrollTo: { y: topTarget - _this.data.offsetHeight, autoKill: false },
          ease: easingSwing,
        });

        $('.history-nav__list a').removeClass('is-active');
        $(this).addClass('is-active');

        return false;
      });
    },
    listenScroll: function() {
      _window.on('scroll', throttle(this.scrollHistoryNav.bind(this), 25));
    },
    scrollHistoryNav: function() {
      var _this = this;

      // get scroll params from blocker function
      var scroll = APP.Plugins.ScrollBlock.getData();
      if (scroll.blocked) return;

      // clear all active if no sections found
      if (_this.data.historySections.length === 0) {
        _this.data.paginationAnchors.removeClass('is-active');
        return false;
      }

      // Get id of current scroll item
      var cur = _this.data.historySections.map(function() {
        if ($(this).offset().top <= scroll.y + _this.data.offsetHeight / 0.99) return this;
      });

      // Get current element
      cur = $(cur[cur.length - 1]);
      var id = cur && cur.length ? cur.data('section') : '0';

      // Set/remove active class
      _this.data.paginationAnchors
        .removeClass('is-active')
        .filter("[data-for-section='" + id + "']")
        .addClass('is-active');

      // scroller
      var $active = _this.data.paginationAnchors.filter("[data-for-section='" + id + "']");
      var activeWidth = $active.outerWidth();
      var activePos = $active.offset().left;

      if (activePos + activeWidth > window.innerWidth) {
        this.data.navList.scrollLeft(this.data.navList.scrollLeft() + activeWidth);
      } else if (activePos - activeWidth < 0) {
        this.data.navList.scrollLeft(this.data.navList.scrollLeft() - activeWidth);
      }
    },
  };
})(jQuery, window.APP);
