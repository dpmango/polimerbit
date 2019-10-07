'use strict';

(function($) {
  var win = $(window);

  $.fn.stick_in_parent = function(opts) {
    var doc,
      elm,
      enable_bottoming,
      fn,
      i,
      inner_scrolling,
      len,
      manual_spacer,
      offset_top,
      parent_selector,
      recalc_every,
      sticky_class;

    if (opts == null) {
      opts = {};
    }

    (sticky_class = opts.sticky_class),
      (inner_scrolling = opts.inner_scrolling),
      (recalc_every = opts.recalc_every),
      (parent_selector = opts.parent),
      (offset_top = opts.offset_top),
      (manual_spacer = opts.spacer),
      (enable_bottoming = opts.bottoming);

    if (offset_top == null) {
      offset_top = 0;
    }

    if (parent_selector == null) {
      parent_selector = void 0;
    }

    if (inner_scrolling == null) {
      inner_scrolling = true;
    }

    if (sticky_class == null) {
      sticky_class = 'is_stuck';
    }

    doc = $(document);

    if (enable_bottoming == null) {
      enable_bottoming = true;
    }

    fn = function fn(
      elm,
      padding_bottom,
      parent_top,
      parent_height,
      top,
      height,
      el_float,
      detached
    ) {
      var bottomed,
        _detach,
        fixed,
        last_pos,
        last_scroll_height,
        offset,
        parent,
        recalc,
        recalc_and_tick,
        recalc_counter,
        spacer,
        tick;

      if (elm.data('sticky_kit')) {
        return;
      }

      elm.data('sticky_kit', true);
      last_scroll_height = doc.height();
      parent = elm.parent();

      if (parent_selector != null) {
        parent = parent.closest(parent_selector);
      }

      if (!parent.length) {
        throw 'failed to find stick parent';
      }

      fixed = false;
      bottomed = false;
      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $('<div />');

      if (spacer) {
        spacer.css('position', elm.css('position'));
      }

      recalc = function recalc() {
        var border_top, padding_top, restore;

        if (detached) {
          return;
        }

        last_scroll_height = doc.height();
        border_top = parseInt(parent.css('border-top-width'), 10);
        padding_top = parseInt(parent.css('padding-top'), 10);
        padding_bottom = parseInt(parent.css('padding-bottom'), 10);
        parent_top = parent.offset().top + border_top + padding_top;
        parent_height = parent.height();

        if (fixed) {
          fixed = false;
          bottomed = false;

          if (manual_spacer == null) {
            elm.insertAfter(spacer);
            spacer.detach();
          }

          elm
            .css({
              position: '',
              top: '',
              width: '',
              bottom: '',
            })
            .removeClass(sticky_class);
          restore = true;
        }

        top = elm.offset().top - (parseInt(elm.css('margin-top'), 10) || 0) - offset_top;
        height = elm.outerHeight(true);
        el_float = elm.css('float');

        if (spacer) {
          spacer.css({
            width: elm.outerWidth(true),
            height: height,
            display: elm.css('display'),
            'vertical-align': elm.css('vertical-align'),
            float: el_float,
          });
        }

        if (restore) {
          return tick();
        }
      };

      recalc();

      if (height === parent_height) {
        return;
      }

      last_pos = void 0;
      offset = offset_top;
      recalc_counter = recalc_every;

      tick = function tick() {
        var css, delta, recalced, scroll, will_bottom, win_height;

        if (detached) {
          return;
        }

        recalced = false;

        if (recalc_counter != null) {
          recalc_counter -= 1;

          if (recalc_counter <= 0) {
            recalc_counter = recalc_every;
            recalc();
            recalced = true;
          }
        }

        if (!recalced && doc.height() !== last_scroll_height) {
          recalc();
          recalced = true;
        }

        scroll = win.scrollTop();

        if (last_pos != null) {
          delta = scroll - last_pos;
        }

        last_pos = scroll;

        if (fixed) {
          if (enable_bottoming) {
            will_bottom = scroll + height + offset > parent_height + parent_top;

            if (bottomed && !will_bottom) {
              bottomed = false;
              elm
                .css({
                  position: 'fixed',
                  bottom: '',
                  top: offset,
                })
                .trigger('sticky_kit:unbottom');
            }
          }

          if (scroll < top) {
            fixed = false;
            offset = offset_top;

            if (manual_spacer == null) {
              if (el_float === 'left' || el_float === 'right') {
                elm.insertAfter(spacer);
              }

              spacer.detach();
            }

            css = {
              position: '',
              width: '',
              top: '',
            };
            elm
              .css(css)
              .removeClass(sticky_class)
              .trigger('sticky_kit:unstick');
          }

          if (inner_scrolling) {
            win_height = win.height();

            if (height + offset_top > win_height) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(win_height - height, offset);
                offset = Math.min(offset_top, offset);

                if (fixed) {
                  elm.css({
                    top: offset + 'px',
                  });
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;
            css = {
              position: 'fixed',
              top: offset,
            };
            css.width =
              elm.css('box-sizing') === 'border-box' ? elm.outerWidth() + 'px' : elm.width() + 'px';
            elm.css(css).addClass(sticky_class);

            if (manual_spacer == null) {
              elm.after(spacer);

              if (el_float === 'left' || el_float === 'right') {
                spacer.append(elm);
              }
            }

            elm.trigger('sticky_kit:stick');
          }
        }

        if (fixed && enable_bottoming) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }

          if (!bottomed && will_bottom) {
            bottomed = true;

            if (parent.css('position') === 'static') {
              parent.css({
                position: 'relative',
              });
            }

            return elm
              .css({
                position: 'absolute',
                bottom: padding_bottom,
                top: 'auto',
              })
              .trigger('sticky_kit:bottom');
          }
        }
      };

      recalc_and_tick = function recalc_and_tick() {
        recalc();
        return tick();
      };

      _detach = function detach() {
        detached = true;
        win.off('touchmove', tick);
        win.off('scroll', tick);
        win.off('resize', recalc_and_tick);
        $(document.body).off('sticky_kit:recalc', recalc_and_tick);
        elm.off('sticky_kit:detach', _detach);
        elm.removeData('sticky_kit');
        elm.css({
          position: '',
          bottom: '',
          top: '',
          width: '',
        });
        parent.position('position', '');

        if (fixed) {
          if (manual_spacer == null) {
            if (el_float === 'left' || el_float === 'right') {
              elm.insertAfter(spacer);
            }

            spacer.remove();
          }

          return elm.removeClass(sticky_class);
        }
      };

      win.on('touchmove', tick);
      win.on('scroll', tick);
      win.on('resize', recalc_and_tick);
      $(document.body).on('sticky_kit:recalc', recalc_and_tick);
      elm.on('sticky_kit:detach', _detach);
      return setTimeout(tick, 0);
    };

    for (i = 0, len = this.length; i < len; i++) {
      elm = this[i];
      fn($(elm));
    }

    return this;
  };
})(jQuery); // PRE-initialization

var APP = window.APP || {};
APP.Dev = APP.Dev || {};
APP.Browser = APP.Browser || {};
APP.Plugins = APP.Plugins || {};
APP.Components = APP.Components || {}; // force scroll to top on initial load

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
}; // shorthand operators

var _window = $(window);

var _document = $(document);

var easingSwing = [0.02, 0.01, 0.47, 1]; // default jQuery easing

(function($, APP) {
  APP.Initilizer = function() {
    var app = {};

    app.init = function() {
      app.initGlobalPlugins();
      app.initPlugins();
      app.initComponents();
    };

    app.onLoadTrigger = function() {
      // APP.Plugins.Preloader.loaded();
      APP.Plugins.LazyLoadImages.init();
    };

    app.refresh = function() {
      APP.Components.Header.closeMobileMenu(true);
      APP.Plugins.Sharer.refresh();
      APP.Plugins.Sliders.reinit();
      app.initPlugins(true);
      app.initComponents(true);
    };

    app.destroy = function() {}; // pjax triggers

    app.newPageReady = function() {
      app.refresh();
    };

    app.transitionCompleted = function() {
      APP.Plugins.AOS.refresh();
      app.onLoadTrigger();
    }; // Global plugins which must be initialized once

    app.initGlobalPlugins = function() {
      APP.Dev.Credentials.logCredentials();
      APP.Dev.Breakpoint.listenResize();
      APP.Browser().methods.setBodyTags();
      APP.Plugins.LegacySupport.init();
      APP.Plugins.ScrollBlock.listenScroll();
      APP.Plugins.Clicks.init();
      APP.Plugins.AOS.init();
      APP.Plugins.Barba.init();
    }; // Plugins which depends on DOM and page content

    app.initPlugins = function(fromPjax) {
      APP.Plugins.Teleport.init();

      if (!fromPjax) {
        APP.Plugins.Sliders.init();
      }

      APP.Plugins.Modals.init();
      APP.Plugins.Masks.init();
      APP.Plugins.Selectric.init();
      APP.Plugins.ScrollReveal.init();
      APP.Plugins.TextareaAutoExpand.init();
      APP.Plugins.Validations.init();
      APP.Plugins.Tooltip.init();
      APP.Plugins.Sticky.init();
      APP.Plugins.Ymaps.init();
    }; // All components from `src/componenets`

    app.initComponents = function(fromPjax) {
      APP.Components.Header.init(fromPjax);
      APP.Components.Brands.init();
      APP.Components.Nav.init();
    };

    return app;
  }; // a.k.a. ready

  $(function() {
    APP.Initilizer().init();
  });
  $(window).on('load', function() {
    $.ready.then(function() {
      APP.Initilizer().onLoadTrigger();
    });
  });
})(jQuery, window.APP);

(function($, APP) {
  APP.Dev.Breakpoint = {
    setBreakpoint: function setBreakpoint() {
      var wHost = window.location.host.toLowerCase();
      var displayCondition = wHost.indexOf('localhost') >= 0 || wHost.indexOf('surge') >= 0;

      if (displayCondition) {
        var wWidth = window.innerWidth;

        var wHeight = _window.height();

        var content = "<div class='dev-bp-debug'>" + wWidth + ' x ' + wHeight + '</div>';
        $('.page').append(content);
        setTimeout(function() {
          $('.dev-bp-debug').fadeOut();
        }, 1000);
        setTimeout(function() {
          $('.dev-bp-debug').remove();
        }, 1500);
      }
    },
    listenResize: function listenResize() {
      $(window).on('resize', debounce(this.setBreakpoint, 200));
    },
  };
})(jQuery, window.APP);

(function($, APP) {
  APP.Dev.Credentials = {
    logCredentials: function logCredentials() {
      // eslint-disable-next-line
      console.log('👨‍💻 MADE WITH LOVE BY <> KHMELEVSKOY & ASSOCIATES </> https://khmelevskoy.co');
    },
  };
})(jQuery, window.APP); //////////
// AOS
//////////

(function($, APP) {
  APP.Plugins.AOS = {
    init: function init() {
      AOS.init({
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120,
        // offset (in px) from the original trigger point
        delay: 0,
        // values from 0 to 3000, with step 50ms
        duration: 400,
        // values from 0 to 3000, with step 50ms
        easing: 'ease-in',
        // default easing for AOS animations
        once: true,
        // whether animation should happen only once - while scrolling down
        mirror: false,
        // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      });
    },
    refresh: function refresh() {
      AOS.refreshHard();
    },
  };
})(jQuery, window.APP); ////////////////////
// LAZY LOAD
////////////////////

(function($, APP) {
  APP.Plugins.LazyLoadImages = {
    init: function init() {
      var _this = this;

      var $lazy = _document.find('[js-lazy]');

      if ($lazy.length === 0) {
        APP.Plugins.LegacySupport.fixImages();
        AOS.refresh();
        return;
      }

      $lazy.Lazy({
        threshold: 300,
        enableThrottle: true,
        throttle: 100,
        scrollDirection: 'vertical',
        // effect: 'fadeIn',
        // effectTime: 350,
        // visibleOnly: true,
        // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
        onError: function onError(element) {
          // eslint-disable-next-line no-console
          console.log('error loading ' + element.data('src'));

          try {
            element.attr('src', element.data('src'));
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('eroor appending src', e);
          }
        },
        beforeLoad: function beforeLoad(element) {
          // element.attr('style', '')
        },
        afterLoad: function afterLoad(element) {
          _this.animateLazy(element);
        },
        onFinishedAll: function onFinishedAll() {
          APP.Plugins.LegacySupport.fixImages();
          AOS.refresh();
        },
      });
    },
    animateLazy: function animateLazy(element) {
      var fadeTimeout = 250;
      var $scaler = element.closest('.scaler');
      $scaler.addClass('is-loaded');

      if ($scaler.length === 0) {
        $(element).addClass('is-loaded');
      }

      if ($scaler.is('.no-bg-onload')) {
        setTimeout(function() {
          $scaler.addClass('is-bg-hidden');
        }, fadeTimeout);
      }
    },
  };
})(jQuery, window.APP); //////////
// MODALS
//////////

(function($, APP) {
  APP.Plugins.Modals = {
    init: function init() {
      var startWindowScroll = 0;
      $('[js-popup]').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble',
        callbacks: {
          beforeOpen: function beforeOpen() {
            startWindowScroll = _window.scrollTop(); // $('html').addClass('mfp-helper');
          },
          close: function close() {
            // $('html').removeClass('mfp-helper');
            _window.scrollTop(startWindowScroll);
          },
        },
      });
      $('[js-popup-gallery]').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'popup-buble',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        },
      });
    },
    destroy: function destroy() {
      // ... code ...
    },
  };
})(jQuery, window.APP); //////////
// SLIDERS
//////////

(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: [],
      responsiveSwipers: {
        featuredProducts: {
          instance: undefined,
          disableOn: 1201,
        },
      },
    },
    init: function init() {
      this.initSwipers();
      this.initResponsiveSwipers();
      this.listenResize();
    },
    reinit: function reinit() {
      // without resize listeners double check
      this.initSwipers();
      this.initResponsiveSwipers(true);
    },
    listenResize: function listenResize() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function initSwipers() {
      // EXAMPLE SWIPER
      new Swiper('[js-slider]', {
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        direction: 'horizontal',
        loop: true,
        // watchOverflow: true,
        // setWrapperSize: false,
        spaceBetween: 0,
        slidesPerView: 1,
        // loop: true,
        // normalizeSlideIndex: true,
        centeredSlides: true,
        // freeMode: true,
        // effect: 'fade',
        // autoplay: {
        //   delay: 5000,
        // },
        navigation: {
          nextEl: '.slider-next',
          prevEl: '.slider-prev',
        },
        breakpoints: {
          // when window width is <= 992px
          992: {
            autoHeight: true,
          },
        },
      });
    },
    initResponsiveSwipers: function initResponsiveSwipers(isHardReset) {
      var featuredProducts = '[js-featured-products-swiper]';

      if ($(featuredProducts).length > 0) {
        this.initFeaturedProductsSwiper(featuredProducts);
      }
    },
    initFeaturedProductsSwiper: function initFeaturedProductsSwiper(selector) {
      var dataObj = this.data.responsiveSwipers.featuredProducts;

      if ($(selector).length > 0) {
        if (window.innerWidth >= dataObj.disableOn) {
          if (dataObj.instance !== undefined) {
            dataObj.instance.destroy(true, true);
            dataObj.instance = undefined;
          }
        } else {
          if (dataObj.instance === undefined) {
            dataObj.instance = new Swiper(selector, {
              slidesPerView: 'auto',
              breakpoints: {
                992: {
                  spaceBetween: 0,
                },
              },
            });
          }
        }
      }
    },
    destroy: function destroy() {
      // ... code ...
    },
  };
})(jQuery, window.APP); //////////
// STICKY KIT
//////////

(function($, APP) {
  APP.Plugins.Sticky = {
    init: function init() {
      var $elements = $('.page')
        .last()
        .find('[js-sticky]');
      if ($elements.length === 0) return;
      $elements.each(function(i, sticky) {
        var $sticky = $(sticky);
        var dataOffsetTop = $sticky.data('offset-top')
          ? parseInt($sticky.data('offset-top'), 10)
          : 0;
        $sticky.stick_in_parent({
          // eslint-disable-next-line camelcase
          offset_top: dataOffsetTop,
        });
      });
    },
  };
})(jQuery, window.APP); //////////
// TOOLTIPS
//////////

(function($, APP) {
  APP.Plugins.Tooltip = {
    init: function init() {
      $('.tooltipstered').tooltipster({
        side: 'top',
      });

      _window.on(
        'scroll',
        throttle(function() {
          $('.tooltipstered').tooltipster('reposition');
        }, 50)
      );
    },
  };
})(jQuery, window.APP); ////////////////
// FORM VALIDATIONS
// jQuery validate plugin https://jqueryvalidation.org
////////////////

(function($, APP) {
  APP.Plugins.Validations = {
    init: function init() {
      this.localize();
      this.validateFormsConstructor();
      this.validateFormsCustom();
    },
    data: {
      // GENERIC FUNCTIONS
      validateErrorPlacement: function validateErrorPlacement(error, element) {
        error.addClass('ui-input__validation');

        if (element.is('select')) {
          error.appendTo(element.closest('.selectric-wrapper'));
        } else if (element.is('input[type="radio"]') || element.is('input[type="checkbox"]')) {
          error.appendTo(element.closest('.ui-group'));
        } else {
          error.appendTo(element.parent('div'));
        }
      },
      validateHighlight: function validateHighlight(element) {
        var $element = $(element);

        if ($element.is('select')) {
          $element.closest('.selectric-wrapper').addClass('has-error');
        } else {
          $(element).addClass('has-error');
        }
      },
      validateUnhighlight: function validateUnhighlight(element) {
        var $element = $(element);

        if ($element.is('select')) {
          $element.closest('.selectric-wrapper').removeClass('has-error');
        } else {
          $(element).removeClass('has-error');
        }
      },
      validateSubmitHandler: function validateSubmitHandler(form) {
        $(form).addClass('loading');
        $.ajax({
          type: 'POST',
          url: $(form).attr('action'),
          data: $(form).serialize(),
          success: function success(response) {
            $(form).removeClass('loading');
            var data = $.parseJSON(response);

            if (data.status === 'success') {
              // do something I can't test
            } else {
              $(form)
                .find('[data-error]')
                .html(data.message)
                .show();
            }
          },
        });
      },
      masks: {
        phone: {
          required: true,
          normalizer: function normalizer(value) {
            var PHONE_MASK = '+X (XXX) XXX-XXXX';

            if (!value || value === PHONE_MASK) {
              return value;
            } else {
              return value.replace(/[^\d]/g, '');
            }
          },
          minlength: 11,
          digits: true,
        },
      },
    },
    localize: function localize() {
      /*
       * Translated default messages for the jQuery validation plugin.
       * Locale: RU (Russian; русский язык)
       */
      $.extend($.validator.messages, {
        required: 'Это поле необходимо заполнить.',
        remote: 'Пожалуйста, введите правильное значение.',
        email: 'Пожалуйста, введите корректный адрес электронной почты.',
        url: 'Пожалуйста, введите корректный URL.',
        date: 'Пожалуйста, введите корректную дату.',
        dateISO: 'Пожалуйста, введите корректную дату в формате ISO.',
        number: 'Пожалуйста, введите число.',
        digits: 'Пожалуйста, вводите только цифры.',
        creditcard: 'Пожалуйста, введите правильный номер кредитной карты.',
        equalTo: 'Пожалуйста, введите такое же значение ещё раз.',
        extension: 'Пожалуйста, выберите файл с правильным расширением.',
        maxlength: $.validator.format('Пожалуйста, введите не больше {0} символов.'),
        minlength: $.validator.format('Пожалуйста, введите не меньше {0} символов.'),
        rangelength: $.validator.format(
          'Пожалуйста, введите значение длиной от {0} до {1} символов.'
        ),
        range: $.validator.format('Пожалуйста, введите число от {0} до {1}.'),
        max: $.validator.format('Пожалуйста, введите число, меньшее или равное {0}.'),
        min: $.validator.format('Пожалуйста, введите число, большее или равное {0}.'),
      });
    },
    validateFormsConstructor: function validateFormsConstructor() {
      var _this = this;

      var $forms = $('[js-validate-form]:not(.is-validation-attached)');
      if ($forms.length === 0) return; // CONSTRUCTOR LIKE FIRST

      $forms.each(function(i, form) {
        var $form = $(form);
        var validationOptions = {
          errorPlacement: _this.data.validateErrorPlacement,
          highlight: _this.data.validateHighlight,
          unhighlight: _this.data.validateUnhighlight,
          submitHandler: _this.data.validateSubmitHandler,
          // rules to be set in html as well (merged props)
          rules: {
            name: {
              required: true,
            },
            email: {
              required: true,
              email: true,
            },
            phone: _this.data.masks.phone,
          },
          messages: {
            name: {
              required: 'Заполните это поле',
            },
            email: {
              required: 'Заполните это поле',
              email: 'Формат email неверен',
            },
            phone: {
              required: 'Заполните это поле',
              minlength: 'Введите корректный телефон',
            },
          },
        };
        $form.validate(validationOptions);
        $form.addClass('is-validation-attached');
      });
    },
    validateFormsCustom: function validateFormsCustom() {
      var _this = this;

      var requestValidationObject = {
        errorPlacement: _this.data.validateErrorPlacement,
        highlight: _this.data.validateHighlight,
        unhighlight: _this.data.validateUnhighlight,
        submitHandler: _this.data.validateSubmitHandler,
        rules: {
          phone: _this.data.masks.phone,
        },
        messages: {
          phone: {
            required: 'Заполните это поле',
            minlength: 'Введите корректный телефон',
          },
        },
      }; // call/init

      $('[js-validate-request]').validate(requestValidationObject); // $("[js-subscription-validation-footer]").validate(subscriptionValidationObject);
      // $("[js-subscription-validation-menu]").validate(subscriptionValidationObject);
    },
  };
})(jQuery, window.APP); // - Допступные варианты валидации через html теги (`type`)
// required: 'Это поле необходимо заполнить.', // тег required
// remote: 'Пожалуйста, введите правильное значение.', // валидация через запрос к API
// email: 'Пожалуйста, введите корректный адрес электронной почты.', // type="email"
// url: 'Пожалуйста, введите корректный URL.', // type="url"
// date: 'Пожалуйста, введите корректную дату.', // type="date"
// dateISO: 'Пожалуйста, введите корректную дату в формате ISO.', // type="dateISO"
// number: 'Пожалуйста, введите число.', // type="number"
// digits: 'Пожалуйста, вводите только цифры.', // type="digits"
// // creditcard: 'Пожалуйста, введите правильный номер кредитной карты.', // тег creditcard - нужно подключение отдельного плагина
// equalTo: 'Пожалуйста, введите такое же значение ещё раз.', // equalTo="xxx"
// // extension: 'Пожалуйста, выберите файл с правильным расширением.', // extension="zip" - нужно подключение отдельного плагина
// maxlength: $.validator.format('Пожалуйста, введите не больше {0} символов.'), // maxlength="10"
// minlength: $.validator.format('Пожалуйста, введите не меньше {0} символов.'), // minlength="2"
// rangelength: $.validator.format(
// 	'Пожалуйста, введите значение длиной от {0} до {1} символов.',
// ), // rangelength="[2, 6]"
// range: $.validator.format('Пожалуйста, введите число от {0} до {1}.'), // range="[2,6]"
// max: $.validator.format('Пожалуйста, введите число, меньшее или равное {0}.'), // max="10"
// min: $.validator.format('Пожалуйста, введите число, большее или равное {0}.'), // min="2
//////////
// MASKS
//////////

(function($, APP) {
  APP.Plugins.Masks = {
    init: function init() {
      $('[js-dateMask]').mask('99.99.99', {
        placeholder: 'ДД.ММ.ГГ',
      });
      $("input[type='tel']").mask('+7 (000) 000-0000', {
        placeholder: '+7 (___) ___-____',
      });
    },
  };
})(jQuery, window.APP); ////////////////////
// SELECTRIC PLUGIN
////////////////////

(function($, APP) {
  APP.Plugins.Selectric = {
    init: function init() {
      var $select = $('[js-select]');
      if ($select.length === 0) return;
      $select.selectric({
        maxHeight: 300,
        disableOnMobile: false,
        nativeOnMobile: true,
        onInit: function onInit(element, data) {
          var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);
          $wrapper.find('.label').html($elm.attr('placeholder'));
        },
        onBeforeOpen: function onBeforeOpen(element, data) {
          var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);
          $wrapper
            .find('.label')
            .data('value', $wrapper.find('.label').html())
            .html($elm.attr('placeholder'));
        },
        onBeforeClose: function onBeforeClose(element, data) {
          var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);
          $wrapper.find('.label').html($wrapper.find('.label').data('value'));
        },
      });
    },
  };
})(jQuery, window.APP);

(function($, APP) {
  APP.Plugins.TextareaAutoExpand = {
    init: function init() {
      // textarea autoExpand
      _document
        .one('focus.autoExpand', '.ui-group textarea', function() {
          var savedValue = this.value;
          this.value = '';
          this.baseScrollHeight = this.scrollHeight;
          this.value = savedValue;
        })
        .on('input.autoExpand', '.ui-group textarea', function() {
          var minRows = this.getAttribute('data-min-rows') | 0,
            rows;
          this.rows = minRows;
          rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
          this.rows = minRows + rows;
        });
    },
  };
})(jQuery, window.APP); //////////
// DETECTORS
//////////

(function($, APP) {
  APP.Browser = function() {
    var methods = {};

    methods.isRetinaDisplay = function() {
      if (window.matchMedia) {
        var mq = window.matchMedia(
          'only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)'
        );
        return (mq && mq.matches) || window.devicePixelRatio > 1;
      }
    };

    methods.isMobile = function() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        return true;
      } else {
        return false;
      }
    };

    methods.msieversion = function() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
        return true;
      } else {
        return false;
      }
    };

    methods.isMac = function() {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        return true;
      } else {
        return false;
      }
    };

    methods.isIOS = function() {
      if (/(iPhone|iPod|iPad)/i.test(navigator.platform)) {
        return true;
      } else {
        return false;
      }
    };

    methods.setBodyTags = function() {
      if (methods.msieversion()) {
        $('body').addClass('is-ie');
      }

      if (methods.isMobile()) {
        $('body').addClass('is-mobile');
      }

      if (methods.isMac()) {
        $('body').addClass('is-maclike');
      }
    };

    var data = {
      isIe: methods.msieversion(),
      isMobile: methods.isMobile(),
      isIOS: methods.isIOS(),
      isRetinaDisplay: methods.isRetinaDisplay(),
    };
    return {
      data: data,
      methods: methods,
    };
  };
})(jQuery, window.APP); //////////
// CICKS
//////////

(function($, APP) {
  APP.Plugins.Clicks = {
    init: function init() {
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
        }) // prevent going the same link (if barba is connected)
        .on('click', 'a, [js-link]', function(e) {
          var href = $(this).data('href') || $(this).attr('href');
          var path = window.location.pathname;

          if (href === path.slice(1, path.length)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }) // adding filter button class on materials page
        .on('click', '[js-materials-btn]', function(e) {
          $('.materials__filter-btn').removeClass('is-active');
          $(this).addClass('is-active');
        }) // scroll to section
        .on('click', 'a[href^="#section"]', function() {
          // section scroll
          var el = $(this).attr('href');
          var topTarget = $(el).offset().top; // $('body, html').animate({scrollTop: topTarget}, 1000);

          TweenLite.to(window, 1, {
            scrollTo: {
              y: topTarget,
              autoKill: false,
            },
            ease: easingSwing,
          });
          return false;
        })
        .on('change', '.ui-checkbox', function() {
          var _valueCheckbox = $(this)
            .find("input[type='radio']")
            .val();

          var $select = $('.contacts__select');
          var $consultant = $('.contacts__person');
          var $consultantUnknown = $('.contacts__person-unknown');

          if ($('.ui-checkbox').find("input[type='radio']:checked").length) {
            $select.removeClass('is-visible');
            $consultant.removeClass('is-visible');
            $consultantUnknown.addClass('is-visible');
            $("[data-select='" + _valueCheckbox + "']").addClass('is-visible');
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
        }) // pagination
        .on('click', '[js-pagination]', function() {
          var paginationPage = parseInt($('.cdp').attr('actpage'), 10); // $('.cdp_i').on('click', function() {

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
        })
        .on('touchstart', '.product__plus', function() {
          if (APP.Browser().data.isMobile) {
            var toggle = $(this);
            var dropdown = $(this)
              .parent()
              .find('.product__dropdown');

            toggle.toggleClass('is-active');
            dropdown.toggleClass('is-active');
          }
        })
        // .on('click', function(e) {
        //   var $target = $(e.target);
        //   var closingCondition = $target.closest('.product__content').length === 0;

        //   if (closingCondition) {
        //     $('.product__plus').removeClass('is-active');
        //     $('.product__dropdown').removeClass('is-active');
        //   }
        // });
    },
    destroy: function destroy() {
      // ... code ...
    },
  };
})(jQuery, window.APP); //////////////////////////////////
// HELPERS and PROTOTYPE FUNCTIONS
//////////////////////////////////
// LINEAR NORMALIZATION

function normalize(value, fromMin, fromMax, toMin, toMax) {
  var pct = (value - fromMin) / (fromMax - fromMin);
  var normalized = pct * (toMax - toMin) + toMin; //Cap output to min/max

  if (normalized > toMax) return toMax;
  if (normalized < toMin) return toMin;
  return normalized;
} // get window width (not to forget about ie, win, scrollbars, etc)

function getWindowWidth() {
  return window.innerWidth;
} // manually trigger events to start certain plugins

function triggerBody() {
  $(window).scroll();
  $(window).resize();
} // Format with spaces

function formatNumberWithSpaces(num) {
  return num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
} // Add padding to numbers (a.k.a format by mask 00)
// use (9).pad(2) // output - 09

Number.prototype.pad = function(size) {
  var s = String(this);

  while (s.length < (size || 2)) {
    s = '0' + s;
  }

  return s;
}; // check if certain breakpoint was went through

function hasCrossedBreakpoint(prevResize, curWidth, targetBp) {
  if (
    (curWidth >= targetBp && prevResize <= targetBp) ||
    (curWidth <= targetBp && prevResize >= targetBp)
  ) {
    return true;
  }

  return false;
} // Plurize (russian)
// использование Plurize(number, 'пешеход', 'пешехода', 'пешеходов')
// автоматическая генерация как в английском не работает из-за склонений
// например "1 пешеход", "2 пешехода", "5 пешеходов"
// или "1 человек", "2 человека", "5 человек"  {1 и 5} - одиникавые

function Plurize(number, one, two, five) {
  var n = Math.abs(number);
  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
} // convert hex to rgba

function rgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
} // MEDIA Condition helper function

function mediaCondition(cond) {
  var disabledBp;
  var conditionMedia = cond.substring(1);
  var conditionPosition = cond.substring(0, 1);

  if (conditionPosition === '<') {
    disabledBp = getWindowWidth() < conditionMedia;
  } else if (conditionPosition === '>') {
    disabledBp = getWindowWidth() > conditionMedia;
  }

  return disabledBp;
} //////////
// LEGACY
//////////

(function($, APP) {
  APP.Plugins.LegacySupport = {
    init: function init() {
      // svg support for laggy browsers
      svg4everybody();

      if (!APP.Browser().data.isIe) {
        // Viewport units buggyfill
        window.viewportUnitsBuggyfill.init({
          force: false,
          refreshDebounceWait: 150,
          appendToBody: true,
        });
      }
    },
    fixImages: function fixImages() {
      if (APP.Browser().data.isIe) {
        // if LAZY LOAD is used, move initialization to afterFinishAll
        picturefill();
        objectFitImages();
      }
    },
  };
})(jQuery, window.APP); //////////
// BARBA PJAX
//////////

(function($, APP) {
  APP.Plugins.Barba = {
    getData: function getData() {
      return this.data;
    },
    init: function init() {
      // config
      Barba.Pjax.Dom.containerClass = 'page';
      this.data = this.data || {};
      this.data.transitionInitElement = ''; // initilization path

      this.getTransition();
      Barba.Prefetch.init();
      Barba.Pjax.start();
      this.listenEvents();
    },
    getTransition: function getTransition() {
      // set barba transition
      var _this = this;

      Barba.Pjax.getTransition = function() {
        return _this.transitions.FadeTransition; // return _this.transitions.HideShowTransition;
        // when there are multiple transitions on project
        // if ( transitionInitElement ){
        //   if ( transitionInitElement.attr('data-transition') ){
        //     var transition = transitionInitElement.data('transition');
        //     // console.log(transition)
        //     // if ( transition === "project" ){
        //     //   return ProjectTransition
        //     // }
        //   }
        //   return FadeTransition;
        // } else {
        //   // first visit + back button (history is blank)
        //   window.location.href = Barba.HistoryManager.history[1].url
        // }
      };
    },
    transitions: {
      HideShowTransition: Barba.BaseTransition.extend({
        start: function start() {
          this.newContainerLoading.then(this.finish.bind(this));
        },
        finish: function finish() {
          document.body.scrollTop = 0;
          this.done();
        },
      }),
      FadeTransition: Barba.BaseTransition.extend({
        start: function start() {
          Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
        },
        fadeOut: function fadeOut() {
          var _this = this;

          var $oldPage = $(this.oldContainer);
          var $newPage = $(this.newContainer);
          var deferred = Barba.Utils.deferred();
          TweenLite.to($oldPage, 0.5, {
            opacity: 0,
            ease: Power1.easeIn,
            onComplete: function onComplete() {
              deferred.resolve();
            },
          });
          return deferred.promise;
        },
        fadeIn: function fadeIn() {
          var _this = this;

          var $oldPage = $(this.oldContainer);
          var $newPage = $(this.newContainer);
          $(this.oldContainer).hide();
          $newPage.css({
            visibility: 'visible',
            opacity: 0,
          });
          TweenLite.to(window, 0.15, {
            scrollTo: {
              y: 0,
              autoKill: false,
            },
            ease: easingSwing,
          });
          TweenLite.to($newPage, 0.5, {
            opacity: 1,
            ease: Power1.easeOut,
            onComplete: function onComplete() {
              _this.done();
            },
          });
        },
      }),
    },
    listenEvents: function listenEvents() {
      // initialized transition
      var _this = this;

      Barba.Dispatcher.on('linkClicked', function(el) {
        _this.data.transitionInitElement = el instanceof jQuery ? el : $(el);
      }); // The new container has been loaded and injected in the wrapper.

      Barba.Dispatcher.on('newPageReady', function(
        currentStatus,
        oldStatus,
        container,
        newPageRawHTML
      ) {
        APP.Initilizer().newPageReady();
      }); // The transition has just finished and the old Container has been removed from the DOM.

      Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus) {
        APP.Initilizer().transitionCompleted();
      });
    },
  };
})(jQuery, window.APP); //////////
// LEGACY
//////////

(function($, APP) {
  APP.Plugins.Preloader = {
    loaded: function loaded() {
      $('#barba-wrapper').addClass('is-preloaded');
    },
  };
})(jQuery, window.APP); //////////
// SCROLLREVEAL
//////////

(function($, APP) {
  APP.Plugins.ScrollReveal = {
    init: function init(fromPjax) {
      // REVEAL animations
      var $reveals = $('[js-reveal]');
      if ($reveals.length === 0) return;
      var animatedClass = 'is-animated';
      var pageTransitionTimeout = 500;
      $('[js-reveal]').each(function(i, el) {
        var type = $(el).data('type') || 'enterViewport'; // onload type

        if (type === 'onload') {
          var interval = setInterval(function() {
            // if (!preloaderActive){
            if (fromPjax) {
              // wait till transition overlay is fullyanimated
              setTimeout(function() {
                $(el).addClass(animatedClass);
                clearInterval(interval);
              }, pageTransitionTimeout);
            } else {
              $(el).addClass(animatedClass);
              clearInterval(interval);
            } // }
          }, 100);
          return;
        } // halfy enter

        if (type === 'halflyEnterViewport') {
          var scrollListener = throttle(function() {
            var vScrollBottom = _window.scrollTop() + _window.height();

            var elTop = $(el).offset().top;
            var triggerPoint = elTop + $(el).height() / 2;

            if (vScrollBottom > triggerPoint) {
              $(el).addClass(animatedClass);
              window.removeEventListener('scroll', scrollListener, false); // clear debounce func
            }
          }, 100);
          window.addEventListener('scroll', scrollListener, false);
          return;
        } // regular (default) type

        var elWatcher = scrollMonitor.create($(el));
        elWatcher.enterViewport(
          throttle(
            function() {
              $(el).addClass(animatedClass);
            },
            100,
            {
              leading: true,
            }
          )
        );
      });
    },
  };
})(jQuery, window.APP); //////////
// HEADER
//////////
// disable / enable scroll by setting negative margin to page-content eq. to prev. scroll
// this methods helps to prevent page-jumping on setting body height to 100%

(function($, APP) {
  APP.Plugins.ScrollBlock = {
    data: {
      y: _window.scrollTop(),
      blocked: false,
      direction: undefined,
      lastForScrollDir: 0,
      lastForBodyLock: 0,
    },
    getData: function getData() {
      return this.data;
    },
    disableScroll: function disableScroll() {
      this.data.lastForBodyLock = _window.scrollTop();
      this.data.blocked = true;
      $('.page__content').css({
        'margin-top': '-' + this.data.lastForBodyLock + 'px',
      });
      $('body').addClass('body-lock');
    },
    enableScroll: function enableScroll(isOnload) {
      this.data.blocked = false;
      this.data.direction = 'up'; // keeps header

      $('.page__content').css({
        'margin-top': '-' + 0 + 'px',
      });
      $('body').removeClass('body-lock');

      if (!isOnload) {
        _window.scrollTop(this.data.lastForBodyLock);

        this.data.lastForBodyLock = 0;
      }
    },
    blockScroll: function blockScroll(isOnload) {
      if (isOnload) {
        this.enableScroll(isOnload);
        return;
      }

      if ($('[js-hamburger]').is('.is-active')) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
    getWindowScroll: function getWindowScroll() {
      if (this.data.blocked) return;

      var wScroll = _window.scrollTop();

      this.data.y = wScroll;
      this.data.direction = wScroll > this.data.lastForScrollDir ? 'down' : 'up';
      this.data.lastForScrollDir = wScroll <= 0 ? 0 : wScroll;
    },
    listenScroll: function listenScroll() {
      _window.on('scroll', this.getWindowScroll.bind(this));
    },
  };
})(jQuery, window.APP); //////////
// SHARER.js
//////////

(function($, APP) {
  APP.Plugins.Sharer = {
    refresh: function refresh() {
      // it's automatically inits for initial load
      // not need to initialize
      // $('[data-sharer]').sharer();
      window.Sharer.init();
    },
  };
})(jQuery, window.APP); //////////
// TELEPORT
//////////

(function($, APP) {
  APP.Plugins.Teleport = {
    data: {
      teleports: [],
    },
    init: function init() {
      this.getElements();
      this.teleport();
      this.listenResize();
    },
    getElements: function getElements() {
      var _this = this;

      var $teleports = $('.page')
        .last()
        .find('[js-teleport]');
      _this.data.teleports = [];

      if ($teleports.length === 0) {
        return;
      }

      $teleports.each(function(i, tp) {
        var $el = $(tp);
        var $target = $('[data-teleport-target=' + $el.data('teleport-to') + ']');
        var conditionMedia = $el.data('teleport-condition').substring(1);
        var conditionPosition = $el.data('teleport-condition').substring(0, 1);

        _this.data.teleports.push({
          el: $el,
          html: $el.html(),
          target: $target,
          conditionMedia: conditionMedia,
          conditionPosition: conditionPosition,
        });
      });
    },
    listenResize: function listenResize() {
      _window.on('resize', debounce(this.teleport.bind(this), 100));
    },
    teleport: function teleport() {
      if (this.data.teleports.length === 0) {
        return;
      }

      $.each(this.data.teleports, function(i, obj) {
        if (obj.target && obj.html && obj.conditionPosition) {
          var condition;

          if (obj.conditionPosition === '<') {
            condition = window.innerWidth < obj.conditionMedia;
          } else if (obj.conditionPosition === '>') {
            condition = window.innerWidth > obj.conditionMedia;
          }

          if (condition) {
            obj.target.html(obj.html);
            obj.el.html('');
          } else {
            obj.el.html(obj.html);
            obj.target.html('');
          }
        }
      }); // re-init sliders and other components

      APP.Plugins.Sliders.reinit();
    },
  };
})(jQuery, window.APP); //////////
// YMAPS
//////////

(function($, APP) {
  APP.Plugins.Ymaps = {
    data: {
      scriptsCreated: false,
      ymapsLoaded: false,
    },
    init: function init() {
      if ($('.js-ymap').length > 0) {
        if (this.data.ymapsLoaded) {
          ymaps.ready(this.initMaps.bind(this));
        } else {
          this.tryLoadScripts();
        }
      }
    },
    createScripts: function createScripts() {
      var ymapsK = '9ba9a278-66f0-47c6-8197-0d404ee0def5';
      var ymapsScript = document.createElement('script');
      ymapsScript.type = 'text/javascript';
      ymapsScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + ymapsK + '&lang=ru_RU';
      $('head').append(ymapsScript);
      this.data.scriptsCreated = true;
    },
    tryLoadScripts: function tryLoadScripts() {
      var _this = this;

      if (!_this.data.scriptsCreated) {
        _this.createScripts();
      }

      var ticker = setInterval(readyChecker, 250);

      function readyChecker() {
        if (!_this.data.ymapsLoaded) {
          try {
            if (ymaps.ready()) {
              _this.data.ymapsLoaded = true;

              _this.init(); // reinit

              clearInterval(ticker);
            }
          } catch (e) {
            // console.log('maps not ready yeat, another try');
          }
        }
      }
    },
    initMaps: function initMaps() {
      var _this = this;

      $('.js-ymap').each(function(i, domElement) {
        _this.drawMap(domElement);
      });
    },
    drawMap: function drawMap(domElement) {
      var _this = this;

      var $domElement = $(domElement);
      if ($domElement.length === 0) return;
      var myMap;
      var params = {
        center: _this.geoStringToArr($domElement.data('center')),
        zoom: $domElement.data('zoom') || 10,
        placeholder: {
          geodata: _this.geoStringToArr($domElement.data('placeholder')),
          caption: $domElement.data('placeholder-caption'),
          balloon: $domElement.data('placeholder-balloon'),
        },
      };
      if (!params.center) return; // CREATE MAP INSTANCE

      myMap = new ymaps.Map(domElement, {
        center: params.center,
        zoom: params.zoom,
      }); // CONTROLS

      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('geolocationControl');
      myMap.controls.remove('routeEditor');
      myMap.controls.remove('typeSelector'); // myMap.controls.remove('zoomControl');
      // PLACEHOLDER

      if (params.placeholder.geodata) {
        var placeholder = new ymaps.Placemark(
          params.placeholder.geodata,
          {
            balloonContent: params.placeholder.balloon,
            iconCaption: params.placeholder.caption,
          },
          {
            preset: 'islands#redIcon',
          }
        );
        myMap.geoObjects.add(placeholder);
      }
    },
    geoStringToArr: function geoStringToArr(str) {
      var split = str.split(',');

      if (split.length === 2) {
        return [parseFloat(split[0]), parseFloat(split[1])];
      }

      return false;
    },
  };
})(jQuery, window.APP); //////////
// BRANDS HOVERS
//////////

(function($, APP) {
  APP.Components.Brands = {
    init: function init() {
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
})(jQuery, window.APP); //////////
// HEADER
//////////

(function($, APP) {
  APP.Components.Header = {
    data: {
      header: {
        container: undefined,
        bottomPoint: undefined,
      },
    },
    init: function init(fromPjax) {
      if (!fromPjax) {
        this.getHeaderParams();
        this.hamburgerClickListener();
        this.mobileNaviClickListener();
        this.listenScroll();
        this.listenResize();
      }

      this.setMenuClass();
      this.controlHeaderClass();
    },
    getHeaderParams: function getHeaderParams() {
      var $header = $('.header');
      var headerOffsetTop = 0;
      var headerHeight = $header.outerHeight() + headerOffsetTop;
      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
      };
    },
    closeMobileMenu: function closeMobileMenu(isOnload) {
      $('[js-hamburger]').removeClass('is-active');
      $('.mobile-navi').removeClass('is-active');
      $('.header').removeClass('is-active');
      APP.Plugins.ScrollBlock.blockScroll(isOnload);
    },
    hamburgerClickListener: function hamburgerClickListener() {
      _document.on('click', '[js-hamburger]', function() {
        $(this).toggleClass('is-active');
        $('.mobile-navi').toggleClass('is-active');
        $('.header').toggleClass('is-active');
        APP.Plugins.ScrollBlock.blockScroll();
      });
    },
    mobileNaviClickListener: function mobileNaviClickListener() {
      var _this = this; // will close navi on tablet on outside clicks

      _document.on('click touchstart', '.mobile-navi', function(e) {
        // close on outside clicks
        if (window.innerWidth <= 1024) {
          var $target = $(e.target);
          var closingCondition = $target.is('.mobile-navi.is-active');

          if (closingCondition) {
            _this.closeMobileMenu();
          }
        }
      });
    },
    listenScroll: function listenScroll() {
      _window.on('scroll', this.scrollHeader.bind(this));
    },
    listenResize: function listenResize() {
      _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    },
    scrollHeader: function scrollHeader() {
      if (this.data.header.container !== undefined) {
        var fixedClass = 'is-fixed'; // get scroll params from blocker function

        var scroll = APP.Plugins.ScrollBlock.getData();
        if (scroll.blocked) return;

        if (scroll.y > 0) {
          this.data.header.container.addClass(fixedClass);
          $('.scroll-top').addClass('is-visible');
        } else {
          this.data.header.container.removeClass(fixedClass);
          $('.scroll-top').removeClass('is-visible');
        }
      }
    },
    setMenuClass: function setMenuClass() {
      // SET ACTIVE CLASS IN HEADER
      var headerMenuList = $('.header__menu li');
      if (headerMenuList.length === 0) return;
      headerMenuList.each(function(i, val) {
        if (
          $(val)
            .find('a')
            .attr('href') === window.location.pathname.split('/').pop()
        ) {
          $(val).addClass('is-active');
        } else {
          $(val).removeClass('is-active');
        }
      });
    },
    controlHeaderClass: function controlHeaderClass() {
      this.data.header.container.attr('data-modifier', false);
      var $modifierElement = $('.page')
        .last()
        .find('[js-header-class]');

      if ($modifierElement.length > 0) {
        this.data.header.container.attr('data-modifier', $modifierElement.data('class'));
      }
    },
  };
})(jQuery, window.APP); //////////
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
    init: function init() {
      this.getHistorySections();
      this.clickListeners();
      this.listenScroll();
    },
    getHistorySections: function getHistorySections() {
      var $page = $('.page').last();
      this.data.offsetHeight = $('.header').outerHeight() + $('.history-nav').outerHeight();
      this.data.navList = $page.find('.history-nav__list');
      this.data.paginationAnchors = $page.find('.history-nav__list a');
      this.data.historySections = $page.find('[data-section]');
    },
    clickListeners: function clickListeners() {
      var _this = this;

      $(document).on('click', '.history-nav__list a', function() {
        var dataSectionFor = $(this).data('for-section');
        var el = $('[data-section="' + dataSectionFor + '"]');
        var topTarget = $(el).offset().top;
        TweenLite.to(window, 1, {
          scrollTo: {
            y: topTarget - _this.data.offsetHeight,
            autoKill: false,
          },
          ease: easingSwing,
        });
        $('.history-nav__list a').removeClass('is-active');
        $(this).addClass('is-active');
        return false;
      });
    },
    listenScroll: function listenScroll() {
      _window.on('scroll', throttle(this.scrollHistoryNav.bind(this), 25));
    },
    scrollHistoryNav: function scrollHistoryNav() {
      var _this = this; // get scroll params from blocker function

      var scroll = APP.Plugins.ScrollBlock.getData();
      if (scroll.blocked) return; // clear all active if no sections found

      if (_this.data.historySections.length === 0) {
        _this.data.paginationAnchors.removeClass('is-active');

        return false;
      } // Get id of current scroll item

      var cur = _this.data.historySections.map(function() {
        if ($(this).offset().top <= scroll.y + _this.data.offsetHeight / 0.99) return this;
      }); // Get current element

      cur = $(cur[cur.length - 1]);
      var id = cur && cur.length ? cur.data('section') : '0'; // Set/remove active class

      _this.data.paginationAnchors
        .removeClass('is-active')
        .filter("[data-for-section='" + id + "']")
        .addClass('is-active');

      // scroller
      var $active = _this.data.paginationAnchors.filter("[data-for-section='" + id + "']");
      var activeWidth = $active.outerWidth();
      var activePos = $active.offset().left;


      if (activePos + activeWidth > window.innerWidth){
        this.data.navList.scrollLeft(this.data.navList.scrollLeft() + activeWidth)
      } else if ((activePos - activeWidth) < 0){
        this.data.navList.scrollLeft(this.data.navList.scrollLeft() - activeWidth)
      }
    },
  };
})(jQuery, window.APP);
