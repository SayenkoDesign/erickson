(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/modernizr-custom"],{

/***/ "./assets/js/modernizr-custom.js":
/*!***************************************!*\
  !*** ./assets/js/modernizr-custom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-inlinesvg-objectfit-touchevents-setclasses !*/
!function (e, n, t) {
  function r(e, n) {
    return _typeof(e) === n;
  }

  function o() {
    var e, n, t, o, i, s, a;

    for (var l in C) {
      if (C.hasOwnProperty(l)) {
        if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }

        for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), y.push((o ? "" : "no-") + a.join("-"));
        }
      }
    }
  }

  function i(e) {
    var n = S.className,
        t = Modernizr._config.classPrefix || "";

    if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(r, "$1" + t + "js$2");
    }

    Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? S.className.baseVal = n : S.className = n);
  }

  function s(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase();
    }).replace(/^-/, "");
  }

  function a() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }

  function l() {
    var e = n.body;
    return e || (e = a(_ ? "svg" : "body"), e.fake = !0), e;
  }

  function f(e, t, r, o) {
    var i,
        s,
        f,
        u,
        c = "modernizr",
        d = a("div"),
        p = l();
    if (parseInt(r, 10)) for (; r--;) {
      f = a("div"), f.id = o ? o[r] : c + (r + 1), d.appendChild(f);
    }
    return i = a("style"), i.type = "text/css", i.id = "s" + c, (p.fake ? p : d).appendChild(i), p.appendChild(d), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", u = S.style.overflow, S.style.overflow = "hidden", S.appendChild(p)), s = t(d, e), p.fake ? (p.parentNode.removeChild(p), S.style.overflow = u, S.offsetHeight) : d.parentNode.removeChild(d), !!s;
  }

  function u(e, n) {
    return !!~("" + e).indexOf(n);
  }

  function c(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }

  function d(e, n, t) {
    var o;

    for (var i in e) {
      if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? c(o, t || n) : o);
    }

    return !1;
  }

  function p(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return "-" + n.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }

  function m(n, t, r) {
    var o;

    if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, n, t);
      var i = e.console;
      if (null !== o) r && (o = o.getPropertyValue(r));else if (i) {
        var s = i.error ? "error" : "log";
        i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !t && n.currentStyle && n.currentStyle[r];

    return o;
  }

  function v(n, r) {
    var o = n.length;

    if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(p(n[o]), r)) return !0;
      }

      return !1;
    }

    if ("CSSSupportsRule" in e) {
      for (var i = []; o--;) {
        i.push("(" + p(n[o]) + ":" + r + ")");
      }

      return i = i.join(" or "), f("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == m(e, null, "position");
      });
    }

    return t;
  }

  function h(e, n, o, i) {
    function l() {
      c && (delete N.style, delete N.modElem);
    }

    if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
      var f = v(e, o);
      if (!r(f, "undefined")) return f;
    }

    for (var c, d, p, m, h, g = ["modernizr", "tspan", "samp"]; !N.style && g.length;) {
      c = !0, N.modElem = a(g.shift()), N.style = N.modElem.style;
    }

    for (p = e.length, d = 0; p > d; d++) {
      if (m = e[d], h = N.style[m], u(m, "-") && (m = s(m)), N.style[m] !== t) {
        if (i || r(o, "undefined")) return l(), "pfx" == n ? m : !0;

        try {
          N.style[m] = o;
        } catch (y) {}

        if (N.style[m] != h) return l(), "pfx" == n ? m : !0;
      }
    }

    return l(), !1;
  }

  function g(e, n, t, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + z.join(s + " ") + s).split(" ");
    return r(n, "string") || r(n, "undefined") ? h(a, n, o, i) : (a = (e + " " + E.join(s + " ") + s).split(" "), d(a, n, t));
  }

  var y = [],
      C = [],
      w = {
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
      C.push({
        name: e,
        fn: n,
        options: t
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      C.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = w, Modernizr = new Modernizr();

  var S = n.documentElement,
      _ = "svg" === S.nodeName.toLowerCase(),
      x = w._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];

  w._prefixes = x;
  var b = w.testStyles = f;
  Modernizr.addTest("touchevents", function () {
    var t;
    if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var r = ["@media (", x.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      b(r, function (e) {
        t = 9 === e.offsetTop;
      });
    }
    return t;
  });
  var T = "Moz O ms Webkit",
      z = w._config.usePrefixes ? T.split(" ") : [];
  w._cssomPrefixes = z;

  var j = function j(n) {
    var r,
        o = x.length,
        i = e.CSSRule;
    if ("undefined" == typeof i) return t;
    if (!n) return !1;
    if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;

    for (var s = 0; o > s; s++) {
      var a = x[s],
          l = a.toUpperCase() + "_" + r;
      if (l in i) return "@-" + a.toLowerCase() + "-" + n;
    }

    return !1;
  };

  w.atRule = j;
  var E = w._config.usePrefixes ? T.toLowerCase().split(" ") : [];
  w._domPrefixes = E;
  var P = {
    elem: a("modernizr")
  };

  Modernizr._q.push(function () {
    delete P.elem;
  });

  var N = {
    style: P.elem.style
  };
  Modernizr._q.unshift(function () {
    delete N.style;
  }), w.testAllProps = g;

  var L = w.prefixed = function (e, n, t) {
    return 0 === e.indexOf("@") ? j(e) : (-1 != e.indexOf("-") && (e = s(e)), n ? g(e, n, t) : g(e, "pfx"));
  };

  Modernizr.addTest("objectfit", !!L("objectFit"), {
    aliases: ["object-fit"]
  }), Modernizr.addTest("inlinesvg", function () {
    var e = a("div");
    return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI);
  }), o(), i(y), delete w.addTest, delete w.addAsyncTest;

  for (var R = 0; R < Modernizr._q.length; R++) {
    Modernizr._q[R]();
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