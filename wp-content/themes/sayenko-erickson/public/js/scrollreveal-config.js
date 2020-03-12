(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/scrollreveal-config"],{

/***/ "./assets/js/scrollreveal-config.js":
/*!******************************************!*\
  !*** ./assets/js/scrollreveal-config.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// AOS
(function (document, window, $) {
  'use strict'; // https://scrollrevealjs.org/api/defaults.html

  var ID = function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  $('.load-hidden').each(function () {
    if (!$(this).attr('id')) {
      $(this).attr('id', ID);
    }
  });
  ScrollReveal({
    mobile: true,
    viewFactor: .5
  });
  ScrollReveal().reveal('main section.load-hidden', {
    afterReveal: function afterReveal() {
      ScrollReveal().reveal('.animate-left', {
        delay: 200,
        origin: 'left',
        distance: '100%'
      });
      ScrollReveal().reveal('.animate-right', {
        delay: 400,
        origin: 'right',
        distance: '100%'
      });
    }
  });
  /*
      HOME
  */
  // Hero

  ScrollReveal().reveal('.home .section-hero h1', {
    delay: 400,
    origin: 'left',
    distance: '100%'
  });
  ScrollReveal().reveal('.home .section-hero h4', {
    delay: 800,
    origin: 'right',
    distance: '100%'
  });
  ScrollReveal().reveal('.home .section-hero .button', {
    delay: 1200,
    origin: 'bottom',
    distance: '100%'
  });
  ScrollReveal().reveal('.home .section-hero .play-video', {
    delay: 1600,
    scale: 0.1,
    afterReveal: function afterReveal(el) {
      el.classList.add('revealed');
    }
  });
  /*
       About
   */
  // History

  $('.section-history .timeline').children('article').each(function (index, element) {
    //var id = $(element).attr('id'); 
    ScrollReveal().reveal('#' + element.id + ' .event', {
      delay: 100,
      origin: index % 2 ? 'right' : 'left',
      distance: '100%',
      interval: 1000,
      viewFactor: 0.5
    });
  });
  /*
      CAREERS
  */
  // Hero

  ScrollReveal().reveal('.template-careers .section-hero h1', {
    delay: 400,
    origin: 'left',
    distance: '100%'
  });
  ScrollReveal().reveal('.template-careers .section-hero h4', {
    delay: 800,
    origin: 'right',
    distance: '100%'
  });

  function addActiveClass(el) {
    el.querySelector('a').classList.remove('is-animating');
    el.querySelector('a').classList.add('revealed');
  }

  ScrollReveal().reveal('.template-careers .section-hero .play-video', {
    delay: 1200,
    scale: 0.1,
    afterReveal: addActiveClass
  });
  ScrollReveal().reveal('.template-careers .section-hero .button', {
    delay: 1600,
    origin: 'bottom',
    distance: '100%'
  }); // ----------------------

  ScrollReveal().reveal('.fifty-fifty-block-section img', {
    delay: 400,
    origin: 'bottom',
    distance: '25%',
    viewFactor: .5
  });
  /*
  ScrollReveal().reveal('.section-details', {
      afterReveal: function() {
          ScrollReveal().reveal('.section-details .grid .cell', { 
              delay: 400,
              interval: 500,
              origin: 'bottom',
              distance: '100%'
          });
      }
  });
  */

  /*
  $('.section-columns .grid-x .cell').each(function (index, element) {
      console.log(element.id);
      ScrollReveal().reveal( '#' + element.id, { 
          delay: 200,
          origin: index % 2 ? 'right' : 'left',
          distance: '100%',
          interval: 800
      });
  });
  */
})(document, window, jQuery);

/***/ }),

/***/ 3:
/*!************************************************!*\
  !*** multi ./assets/js/scrollreveal-config.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/js/scrollreveal-config.js */"./assets/js/scrollreveal-config.js");


/***/ })

},[[3,"/js/manifest"]]]);
//# sourceMappingURL=scrollreveal-config.js.map