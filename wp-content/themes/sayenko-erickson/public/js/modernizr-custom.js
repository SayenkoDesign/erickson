(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/modernizr-custom"],{

/***/ "./assets/js/modernizr-custom.js":
/*!***************************************!*\
  !*** ./assets/js/modernizr-custom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-mq-setclasses !*/
!function (e, n, t) {
  function o(e, n) {
    return _typeof(e) === n;
  }

  function s() {
    var e, n, t, s, a, i, r;

    for (var l in c) {
      if (c.hasOwnProperty(l)) {
        if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }

        for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) {
          i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), f.push((s ? "" : "no-") + r.join("-"));
        }
      }
    }
  }

  function a(e) {
    var n = d.className,
        t = Modernizr._config.classPrefix || "";

    if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(o, "$1" + t + "js$2");
    }

    Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? d.className.baseVal = n : d.className = n);
  }

  function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }

  function r() {
    var e = n.body;
    return e || (e = i(p ? "svg" : "body"), e.fake = !0), e;
  }

  function l(e, t, o, s) {
    var a,
        l,
        f,
        c,
        u = "modernizr",
        p = i("div"),
        m = r();
    if (parseInt(o, 10)) for (; o--;) {
      f = i("div"), f.id = s ? s[o] : u + (o + 1), p.appendChild(f);
    }
    return a = i("style"), a.type = "text/css", a.id = "s" + u, (m.fake ? m : p).appendChild(a), m.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = u, m.fake && (m.style.background = "", m.style.overflow = "hidden", c = d.style.overflow, d.style.overflow = "hidden", d.appendChild(m)), l = t(p, e), m.fake ? (m.parentNode.removeChild(m), d.style.overflow = c, d.offsetHeight) : p.parentNode.removeChild(p), !!l;
  }

  var f = [],
      c = [],
      u = {
    _version: "3.6.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, n) {
      var t = this;
      setTimeout(function () {
        n(t[e]);
      }, 0);
    },
    addTest: function addTest(e, n, t) {
      c.push({
        name: e,
        fn: n,
        options: t
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      c.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = u, Modernizr = new Modernizr();

  var d = n.documentElement,
      p = "svg" === d.nodeName.toLowerCase(),
      m = function () {
    var n = e.matchMedia || e.msMatchMedia;
    return n ? function (e) {
      var t = n(e);
      return t && t.matches || !1;
    } : function (n) {
      var t = !1;
      return l("@media " + n + " { #modernizr { position: absolute; } }", function (n) {
        t = "absolute" == (e.getComputedStyle ? e.getComputedStyle(n, null) : n.currentStyle).position;
      }), t;
    };
  }();

  u.mq = m;
  var h = u._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  u._prefixes = h;
  var v = u.testStyles = l;
  Modernizr.addTest("touchevents", function () {
    var t;
    if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      v(o, function (e) {
        t = 9 === e.offsetTop;
      });
    }
    return t;
  }), s(), a(f), delete u.addTest, delete u.addAsyncTest;

  for (var g = 0; g < Modernizr._q.length; g++) {
    Modernizr._q[g]();
  }

  e.Modernizr = Modernizr;
}(window, document);

/***/ }),

/***/ 1:
/*!*********************************************!*\
  !*** multi ./assets/js/modernizr-custom.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/js/modernizr-custom.js */"./assets/js/modernizr-custom.js");


/***/ })

},[[1,"/js/manifest"]]]);
//# sourceMappingURL=modernizr-custom.js.map