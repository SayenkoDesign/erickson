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

  ScrollReveal({
    mobile: true,
    viewFactor: 1.0
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

  function addActiveClass(el) {
    el.querySelector('a').classList.remove('is-animating');
    el.querySelector('a').classList.add('revealed');
  }

  ScrollReveal().reveal('.home .section-hero .play-video', {
    delay: 1600,
    scale: 0.1,
    afterReveal: addActiveClass
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