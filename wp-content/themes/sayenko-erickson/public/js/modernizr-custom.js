(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/modernizr-custom"],{

/***/ "./assets/js/modernizr-custom.js":
/*!***************************************!*\
  !*** ./assets/js/modernizr-custom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssgrid_cssgridlegacy-inlinesvg-objectfit-touchevents-hasevent-mq-setclasses !*/
!function (e, t, n) {
  function r(e, t) {
    return _typeof(e) === t;
  }

  function o() {
    var e, t, n, o, i, s, a;

    for (var u in S) {
      if (S.hasOwnProperty(u)) {
        if (e = [], t = S[u], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
          e.push(t.options.aliases[n].toLowerCase());
        }

        for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), C.push((o ? "" : "no-") + a.join("-"));
        }
      }
    }
  }

  function i(e) {
    var t = b.className,
        n = Modernizr._config.classPrefix || "";

    if (_ && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2");
    }

    Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), _ ? b.className.baseVal = t : b.className = t);
  }

  function s() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : _ ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
  }

  function a() {
    var e = t.body;
    return e || (e = s(_ ? "svg" : "body"), e.fake = !0), e;
  }

  function u(e, n, r, o) {
    var i,
        u,
        l,
        f,
        c = "modernizr",
        d = s("div"),
        p = a();
    if (parseInt(r, 10)) for (; r--;) {
      l = s("div"), l.id = o ? o[r] : c + (r + 1), d.appendChild(l);
    }
    return i = s("style"), i.type = "text/css", i.id = "s" + c, (p.fake ? p : d).appendChild(i), p.appendChild(d), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = b.style.overflow, b.style.overflow = "hidden", b.appendChild(p)), u = n(d, e), p.fake ? (p.parentNode.removeChild(p), b.style.overflow = f, b.offsetHeight) : d.parentNode.removeChild(d), !!u;
  }

  function l(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase();
    }).replace(/^-/, "");
  }

  function f(e, t) {
    return !!~("" + e).indexOf(t);
  }

  function c(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }

  function d(e, t, n) {
    var o;

    for (var i in e) {
      if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? c(o, n || t) : o);
    }

    return !1;
  }

  function p(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }

  function m(t, n, r) {
    var o;

    if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, t, n);
      var i = e.console;
      if (null !== o) r && (o = o.getPropertyValue(r));else if (i) {
        var s = i.error ? "error" : "log";
        i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !n && t.currentStyle && t.currentStyle[r];

    return o;
  }

  function v(t, r) {
    var o = t.length;

    if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(p(t[o]), r)) return !0;
      }

      return !1;
    }

    if ("CSSSupportsRule" in e) {
      for (var i = []; o--;) {
        i.push("(" + p(t[o]) + ":" + r + ")");
      }

      return i = i.join(" or "), u("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == m(e, null, "position");
      });
    }

    return n;
  }

  function g(e, t, o, i) {
    function a() {
      c && (delete L.style, delete L.modElem);
    }

    if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
      var u = v(e, o);
      if (!r(u, "undefined")) return u;
    }

    for (var c, d, p, m, g, h = ["modernizr", "tspan", "samp"]; !L.style && h.length;) {
      c = !0, L.modElem = s(h.shift()), L.style = L.modElem.style;
    }

    for (p = e.length, d = 0; p > d; d++) {
      if (m = e[d], g = L.style[m], f(m, "-") && (m = l(m)), L.style[m] !== n) {
        if (i || r(o, "undefined")) return a(), "pfx" == t ? m : !0;

        try {
          L.style[m] = o;
        } catch (y) {}

        if (L.style[m] != g) return a(), "pfx" == t ? m : !0;
      }
    }

    return a(), !1;
  }

  function h(e, t, n, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + j.join(s + " ") + s).split(" ");
    return r(t, "string") || r(t, "undefined") ? g(a, t, o, i) : (a = (e + " " + A.join(s + " ") + s).split(" "), d(a, t, n));
  }

  function y(e, t, r) {
    return h(e, n, n, t, r);
  }

  var C = [],
      S = [],
      w = {
    _version: "3.6.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, t) {
      var n = this;
      setTimeout(function () {
        t(n[e]);
      }, 0);
    },
    addTest: function addTest(e, t, n) {
      S.push({
        name: e,
        fn: t,
        options: n
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      S.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = w, Modernizr = new Modernizr();

  var b = t.documentElement,
      _ = "svg" === b.nodeName.toLowerCase(),
      x = w._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];

  w._prefixes = x, Modernizr.addTest("inlinesvg", function () {
    var e = s("div");
    return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI);
  });

  var T = function () {
    var t = e.matchMedia || e.msMatchMedia;
    return t ? function (e) {
      var n = t(e);
      return n && n.matches || !1;
    } : function (t) {
      var n = !1;
      return u("@media " + t + " { #modernizr { position: absolute; } }", function (t) {
        n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position;
      }), n;
    };
  }();

  w.mq = T;
  var z = w.testStyles = u;
  Modernizr.addTest("touchevents", function () {
    var n;
    if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;else {
      var r = ["@media (", x.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      z(r, function (e) {
        n = 9 === e.offsetTop;
      });
    }
    return n;
  });
  var E = "Moz O ms Webkit",
      j = w._config.usePrefixes ? E.split(" ") : [];
  w._cssomPrefixes = j;

  var P = function P(t) {
    var r,
        o = x.length,
        i = e.CSSRule;
    if ("undefined" == typeof i) return n;
    if (!t) return !1;
    if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;

    for (var s = 0; o > s; s++) {
      var a = x[s],
          u = a.toUpperCase() + "_" + r;
      if (u in i) return "@-" + a.toLowerCase() + "-" + t;
    }

    return !1;
  };

  w.atRule = P;
  var A = w._config.usePrefixes ? E.toLowerCase().split(" ") : [];
  w._domPrefixes = A;
  var N = {
    elem: s("modernizr")
  };

  Modernizr._q.push(function () {
    delete N.elem;
  });

  var L = {
    style: N.elem.style
  };
  Modernizr._q.unshift(function () {
    delete L.style;
  }), w.testAllProps = h, w.testAllProps = y, Modernizr.addTest("cssgridlegacy", y("grid-columns", "10px", !0)), Modernizr.addTest("cssgrid", y("grid-template-rows", "none", !0));

  var R = w.prefixed = function (e, t, n) {
    return 0 === e.indexOf("@") ? P(e) : (-1 != e.indexOf("-") && (e = l(e)), t ? h(e, t, n) : h(e, "pfx"));
  };

  Modernizr.addTest("objectfit", !!R("objectFit"), {
    aliases: ["object-fit"]
  });

  var k = function () {
    function e(e, t) {
      var o;
      return e ? (t && "string" != typeof t || (t = s(t || "div")), e = "on" + e, o = e in t, !o && r && (t.setAttribute || (t = s("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o) : !1;
    }

    var r = !("onblur" in t.documentElement);
    return e;
  }();

  w.hasEvent = k, o(), i(C), delete w.addTest, delete w.addAsyncTest;

  for (var q = 0; q < Modernizr._q.length; q++) {
    Modernizr._q[q]();
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