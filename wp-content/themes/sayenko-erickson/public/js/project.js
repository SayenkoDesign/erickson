(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/project"],{

/***/ "./assets/js/loader/ModuleLoader.js":
/*!******************************************!*\
  !*** ./assets/js/loader/ModuleLoader.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModuleLoader =
/*#__PURE__*/
function () {
  function ModuleLoader(modules) {
    _classCallCheck(this, ModuleLoader);

    this.modules = modules;
  }

  _createClass(ModuleLoader, [{
    key: "init",
    value: function init() {
      var modules = this.modules;
      Object.keys(modules).forEach(function (key) {
        modules[key].init();
      });
    }
  }]);

  return ModuleLoader;
}();

/* harmony default export */ __webpack_exports__["default"] = (ModuleLoader);

/***/ }),

/***/ "./assets/js/modules/accordion-fix.js":
/*!********************************************!*\
  !*** ./assets/js/modules/accordion-fix.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function (event, newSize, oldSize) {
      if (foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast('xlarge')) {// new Foundation.Accordion('.accordion');
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/modules/acf-map.js":
/*!**************************************!*\
  !*** ./assets/js/modules/acf-map.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    function InfoBox(t) {
      t = t || {}, google.maps.OverlayView.apply(this, arguments), this.content_ = t.content || "", this.disableAutoPan_ = t.disableAutoPan || !1, this.maxWidth_ = t.maxWidth || 0, this.pixelOffset_ = t.pixelOffset || new google.maps.Size(0, 0), this.position_ = t.position || new google.maps.LatLng(0, 0), this.zIndex_ = t.zIndex || null, this.boxClass_ = t.boxClass || "infoBox", this.boxStyle_ = t.boxStyle || {}, this.closeBoxMargin_ = t.closeBoxMargin || "2px", this.closeBoxURL_ = t.closeBoxURL || "//www.google.com/intl/en_us/mapfiles/close.gif", "" === t.closeBoxURL && (this.closeBoxURL_ = ""), this.closeBoxTitle_ = t.closeBoxTitle || " Close ", this.infoBoxClearance_ = t.infoBoxClearance || new google.maps.Size(1, 1), void 0 === t.visible && (void 0 === t.isHidden ? t.visible = !0 : t.visible = !t.isHidden), this.isHidden_ = !t.visible, this.alignBottom_ = t.alignBottom || !1, this.pane_ = t.pane || "floatPane", this.enableEventPropagation_ = t.enableEventPropagation || !1, this.div_ = null, this.closeListener_ = null, this.moveListener_ = null, this.contextListener_ = null, this.eventListeners_ = null, this.fixedWidthSet_ = null;
    }

    InfoBox.prototype = new google.maps.OverlayView(), InfoBox.prototype.createInfoBoxDiv_ = function () {
      var t,
          i,
          e,
          o = this,
          s = function s(t) {
        t.cancelBubble = !0, t.stopPropagation && t.stopPropagation();
      };

      if (!this.div_) {
        if (this.div_ = document.createElement("div"), this.setBoxStyle_(), void 0 === this.content_.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + this.content_ : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(this.content_)), this.getPanes()[this.pane_].appendChild(this.div_), this.addClickHandler_(), this.div_.style.width ? this.fixedWidthSet_ = !0 : 0 !== this.maxWidth_ && this.div_.offsetWidth > this.maxWidth_ ? (this.div_.style.width = this.maxWidth_, this.div_.style.overflow = "auto", this.fixedWidthSet_ = !0) : (e = this.getBoxWidths_(), this.div_.style.width = this.div_.offsetWidth - e.left - e.right + "px", this.fixedWidthSet_ = !1), this.panBox_(this.disableAutoPan_), !this.enableEventPropagation_) {
          for (this.eventListeners_ = [], i = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"], t = 0; t < i.length; t++) {
            this.eventListeners_.push(google.maps.event.addDomListener(this.div_, i[t], s));
          }

          this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (t) {
            this.style.cursor = "default";
          }));
        }

        this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", function (t) {
          t.returnValue = !1, t.preventDefault && t.preventDefault(), o.enableEventPropagation_ || s(t);
        }), google.maps.event.trigger(this, "domready");
      }
    }, InfoBox.prototype.getCloseBoxImg_ = function () {
      var t = "";
      return "" !== this.closeBoxURL_ && (t = "<img", t += " src='" + this.closeBoxURL_ + "'", t += " align=right", t += " title='" + this.closeBoxTitle_ + "'", t += " style='", t += " position: relative;", t += " cursor: pointer;", t += " margin: " + this.closeBoxMargin_ + ";", t += "'>"), t;
    }, InfoBox.prototype.addClickHandler_ = function () {
      var t;
      "" !== this.closeBoxURL_ ? (t = this.div_.firstChild, this.closeListener_ = google.maps.event.addDomListener(t, "click", this.getCloseClickHandler_())) : this.closeListener_ = null;
    }, InfoBox.prototype.getCloseClickHandler_ = function () {
      var t = this;
      return function (i) {
        i.cancelBubble = !0, i.stopPropagation && i.stopPropagation(), google.maps.event.trigger(t, "closeclick"), t.close();
      };
    }, InfoBox.prototype.panBox_ = function (t) {
      var i,
          e = 0,
          o = 0;

      if (!t && (i = this.getMap()) instanceof google.maps.Map) {
        i.getBounds().contains(this.position_) || i.setCenter(this.position_);
        var s = this.pixelOffset_.width,
            n = this.pixelOffset_.height,
            h = this.div_.offsetWidth,
            l = this.div_.offsetHeight,
            d = this.infoBoxClearance_.width,
            r = this.infoBoxClearance_.height;

        if (2 == i.panToBounds.length) {
          var a = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          };
          a.left = -s + d, a.right = s + h + d, this.alignBottom_ ? (a.top = -n + r + l, a.bottom = n + r) : (a.top = -n + r, a.bottom = n + l + r), i.panToBounds(new google.maps.LatLngBounds(this.position_), a);
        } else {
          var _ = i.getDiv(),
              p = _.offsetWidth,
              v = _.offsetHeight,
              f = this.getProjection().fromLatLngToContainerPixel(this.position_);

          if (f.x < -s + d ? e = f.x + s - d : f.x + h + s + d > p && (e = f.x + h + s + d - p), this.alignBottom_ ? f.y < -n + r + l ? o = f.y + n - r - l : f.y + n + r > v && (o = f.y + n + r - v) : f.y < -n + r ? o = f.y + n - r : f.y + l + n + r > v && (o = f.y + l + n + r - v), 0 !== e || 0 !== o) {
            i.getCenter();
            i.panBy(e, o);
          }
        }
      }
    }, InfoBox.prototype.setBoxStyle_ = function () {
      var t, i;

      if (this.div_) {
        for (t in this.div_.className = this.boxClass_, this.div_.style.cssText = "", i = this.boxStyle_) {
          i.hasOwnProperty(t) && (this.div_.style[t] = i[t]);
        }

        (void 0 === this.div_.style.WebkitTransform || -1 === this.div_.style.WebkitTransform.indexOf("translateZ") && -1 === this.div_.style.WebkitTransform.indexOf("matrix")) && (this.div_.style.WebkitTransform = "translateZ(0)"), void 0 !== this.div_.style.opacity && "" !== this.div_.style.opacity && (this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 100 * this.div_.style.opacity + ')"', this.div_.style.filter = "alpha(opacity=" + 100 * this.div_.style.opacity + ")"), this.div_.style.position = "absolute", this.div_.style.visibility = "hidden", null !== this.zIndex_ && (this.div_.style.zIndex = this.zIndex_);
      }
    }, InfoBox.prototype.getBoxWidths_ = function () {
      var t,
          i = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
          e = this.div_;
      return document.defaultView && document.defaultView.getComputedStyle ? (t = e.ownerDocument.defaultView.getComputedStyle(e, "")) && (i.top = parseInt(t.borderTopWidth, 10) || 0, i.bottom = parseInt(t.borderBottomWidth, 10) || 0, i.left = parseInt(t.borderLeftWidth, 10) || 0, i.right = parseInt(t.borderRightWidth, 10) || 0) : document.documentElement.currentStyle && e.currentStyle && (i.top = parseInt(e.currentStyle.borderTopWidth, 10) || 0, i.bottom = parseInt(e.currentStyle.borderBottomWidth, 10) || 0, i.left = parseInt(e.currentStyle.borderLeftWidth, 10) || 0, i.right = parseInt(e.currentStyle.borderRightWidth, 10) || 0), i;
    }, InfoBox.prototype.onRemove = function () {
      this.div_ && (this.div_.parentNode.removeChild(this.div_), this.div_ = null);
    }, InfoBox.prototype.draw = function () {
      this.createInfoBoxDiv_();
      var t = this.getProjection().fromLatLngToDivPixel(this.position_);
      this.div_.style.left = t.x + this.pixelOffset_.width + "px", this.alignBottom_ ? this.div_.style.bottom = -(t.y + this.pixelOffset_.height) + "px" : this.div_.style.top = t.y + this.pixelOffset_.height + "px", this.isHidden_ ? this.div_.style.visibility = "hidden" : this.div_.style.visibility = "visible";
    }, InfoBox.prototype.setOptions = function (t) {
      void 0 !== t.boxClass && (this.boxClass_ = t.boxClass, this.setBoxStyle_()), void 0 !== t.boxStyle && (this.boxStyle_ = t.boxStyle, this.setBoxStyle_()), void 0 !== t.content && this.setContent(t.content), void 0 !== t.disableAutoPan && (this.disableAutoPan_ = t.disableAutoPan), void 0 !== t.maxWidth && (this.maxWidth_ = t.maxWidth), void 0 !== t.pixelOffset && (this.pixelOffset_ = t.pixelOffset), void 0 !== t.alignBottom && (this.alignBottom_ = t.alignBottom), void 0 !== t.position && this.setPosition(t.position), void 0 !== t.zIndex && this.setZIndex(t.zIndex), void 0 !== t.closeBoxMargin && (this.closeBoxMargin_ = t.closeBoxMargin), void 0 !== t.closeBoxURL && (this.closeBoxURL_ = t.closeBoxURL), void 0 !== t.closeBoxTitle && (this.closeBoxTitle_ = t.closeBoxTitle), void 0 !== t.infoBoxClearance && (this.infoBoxClearance_ = t.infoBoxClearance), void 0 !== t.isHidden && (this.isHidden_ = t.isHidden), void 0 !== t.visible && (this.isHidden_ = !t.visible), void 0 !== t.enableEventPropagation && (this.enableEventPropagation_ = t.enableEventPropagation), this.div_ && this.draw();
    }, InfoBox.prototype.setContent = function (t) {
      this.content_ = t, this.div_ && (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.fixedWidthSet_ || (this.div_.style.width = ""), void 0 === t.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + t : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(t)), this.fixedWidthSet_ || (this.div_.style.width = this.div_.offsetWidth + "px", void 0 === t.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + t : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(t))), this.addClickHandler_()), google.maps.event.trigger(this, "content_changed");
    }, InfoBox.prototype.setPosition = function (t) {
      this.position_ = t, this.div_ && this.draw(), google.maps.event.trigger(this, "position_changed");
    }, InfoBox.prototype.setZIndex = function (t) {
      this.zIndex_ = t, this.div_ && (this.div_.style.zIndex = t), google.maps.event.trigger(this, "zindex_changed");
    }, InfoBox.prototype.setVisible = function (t) {
      this.isHidden_ = !t, this.div_ && (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible");
    }, InfoBox.prototype.getContent = function () {
      return this.content_;
    }, InfoBox.prototype.getPosition = function () {
      return this.position_;
    }, InfoBox.prototype.getZIndex = function () {
      return this.zIndex_;
    }, InfoBox.prototype.getVisible = function () {
      return void 0 !== this.getMap() && null !== this.getMap() && !this.isHidden_;
    }, InfoBox.prototype.getWidth = function () {
      var t = null;
      return this.div_ && (t = this.div_.offsetWidth), t;
    }, InfoBox.prototype.getHeight = function () {
      var t = null;
      return this.div_ && (t = this.div_.offsetHeight), t;
    }, InfoBox.prototype.show = function () {
      this.isHidden_ = !1, this.div_ && (this.div_.style.visibility = "visible");
    }, InfoBox.prototype.hide = function () {
      this.isHidden_ = !0, this.div_ && (this.div_.style.visibility = "hidden");
    }, InfoBox.prototype.open = function (t, i) {
      var e = this;
      i && (this.setPosition(i.getPosition()), this.moveListener_ = google.maps.event.addListener(i, "position_changed", function () {
        e.setPosition(this.getPosition());
      })), this.setMap(t), this.div_ && this.panBox_(this.disableAutoPan_);
    }, InfoBox.prototype.close = function () {
      var t;

      if (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.eventListeners_) {
        for (t = 0; t < this.eventListeners_.length; t++) {
          google.maps.event.removeListener(this.eventListeners_[t]);
        }

        this.eventListeners_ = null;
      }

      this.moveListener_ && (google.maps.event.removeListener(this.moveListener_), this.moveListener_ = null), this.contextListener_ && (google.maps.event.removeListener(this.contextListener_), this.contextListener_ = null), this.setMap(null);
    };
    var map_zoom_level = 6;
    /*
    *  render_map
    *   Do we want to center map on a specific marker?
    *
    */

    function render_map($el) {
      var center_lat = $el.find('.marker[data-active="true"]').data('lat');
      var center_lng = $el.find('.marker[data-active="true"]').data('lng'); // variables

      var $markers = $el.find('.marker');
      var args = {
        zoom: map_zoom_level,
        center: new google.maps.LatLng(center_lat, center_lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        //disableDefaultUI: false,
        zoomControl: true,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [{
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "on"
          }, {
            "color": "#8e8e8e"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#7f7f7f"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#bebebe"
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "visibility": "on"
          }, {
            "color": "#cbcbcb"
          }, {
            "weight": "0.69"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{
            "color": "#e4e4e4"
          }]
        }, {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{
            "saturation": -100
          }, {
            "lightness": 45
          }, {
            "visibility": "simplified"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{
            "visibility": "simplified"
          }, {
            "color": "#dadada"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [{
            "visibility": "on"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{
            "color": "#cbcbcb"
          }, {
            "visibility": "on"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#d9d9d9"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry.stroke",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "simplified"
          }]
        }]
      }; // create map

      var map = new google.maps.Map($el[0], args); // add a markers reference

      map.markers = [];
      map.infoBoxes = []; // add markers

      $markers.each(function () {
        add_marker(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), map);
      }); // let's open the first map marker

      google.maps.event.trigger(map.markers[0], 'click'); // return

      return map;
    }
    /*
    *  add_marker
    *
    *  This function will add a marker to the selected Google Map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	$marker (jQuery element)
    *  @param	map (Google Map object)
    *  @return	n/a
    */


    function add_marker($marker, map) {
      // var
      var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
      var image = {
        url: map_params.icon,
        scaledSize: new google.maps.Size(33, 48) // IE hack

      }; // create marker
      // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.optimized

      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: image,
        optimized: false,
        // IE hack
        // Custom values
        _region: $marker.attr('data-region'),
        _id: $marker.attr('data-id')
      }); // add to array

      map.markers.push(marker); // if marker contains HTML, add it to an infoWindow

      if ($marker.html()) {
        var infobox = new InfoBox({
          content: $marker.html(),
          disableAutoPan: false,
          zIndex: null,
          pixelOffset: new google.maps.Size(-140, -70),
          alignBottom: true,
          boxStyle: {
            //background: "none",
            width: '276px'
          },
          closeBoxMargin: 0,
          closeBoxURL: map_params.cross,
          infoBoxClearance: new google.maps.Size(1, 1),
          isHidden: false,
          pane: "floatPane",
          enableEventPropagation: false,
          id: $marker.attr('data-id')
        });
        map.infoBoxes.push(infobox); // show info window when marker is clicked

        google.maps.event.addListener(marker, 'click', function () {
          // close not working
          for (var i = 0; i < map.infoBoxes.length; i++) {
            map.infoBoxes[i].close();
          } // center marker on click


          var latLng = marker.getPosition();
          map.setCenter(latLng);
          map.panBy(0, -150); // open infowindow

          infobox.open(map, marker); // marker._id

          var $current = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").find('span.active');
          var current_id = $current.data('marker-id');
          var current_parent_id = $current.parents('.is-accordion-submenu-parent').attr('id');
          var $clicked;

          if (current_id != marker._id) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").find('span').removeClass('active');
            $clicked = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-marker-id="' + marker._id + '"]', "#map-legend");
            $clicked.addClass('active');

            if ($clicked.parents('.is-accordion-submenu-parent').attr('id') != current_parent_id) {
              $clicked.parents('.is-accordion-submenu-parent').find('a').trigger('click');
            }
          }
        }); // close info window when map is clicked

        google.maps.event.addListener(map, 'click', function (event) {
          if (infobox) {
            infobox.close();
          }
        }); // let's open the first map marker, moved this to "render_map" function
        //google.maps.event.trigger(map.markers[0], 'click');
      }
    }
    /*
    *  center_map
    *
    *  This function will center the map, showing all markers attached to this map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	map (Google Map object)
    *  @return	n/a
    */


    function center_map(map) {} //var bounds = new google.maps.LatLngBounds();
    //map.setCenter( bounds.getCenter() );
    //map.setZoom( 3 );
    // vars

    /*
    var bounds = new google.maps.LatLngBounds();
              // loop through all markers and create bounds
    $.each( map.markers, function( i, marker ){
        var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
        bounds.extend( latlng );
    });
              // only 1 marker?
    if( map.markers.length == 1 ){
        // set center of map
        map.setCenter( bounds.getCenter() );
        map.setZoom( 11 );
    }
    else{
        // fit to bounds
        //map.fitBounds( bounds );
        map.setCenter( bounds.getCenter() );
    }
    */

    /*
    *  document ready
    *
    *  This function will render each map when the document is ready (page has loaded)
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	5.0.0
    *
    *  @param	n/a
    *  @return	n/a
    */
    // global var


    var map = null; // Loop all instances, though we're only going to use one this time.

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.acf-map').each(function () {
      // create map
      map = render_map(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").addClass('show');
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").on('click', '.marker-anchor', function () {
      // Do nothing if active marker
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('active')) {
        return;
      }

      var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('marker-id');

      for (var i = 0; i < map.markers.length; i++) {
        if (map.markers[i]._id == id) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").find('span').removeClass('active');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active');
          google.maps.event.trigger(map.markers[i], 'click');
          break;
        }
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/modules/animate-numbers.js":
/*!**********************************************!*\
  !*** ./assets/js/modules/animate-numbers.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scroll(animateNumbers);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("load scroll", function (e) {
      animateNumbers();
    });
    var viewed = false;

    function isScrolledIntoView(elem) {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).length) {
        return false;
      }

      var docViewTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();
      var docViewBottom = docViewTop + jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height();
      var elemTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).offset().top;
      var elemBottom = elemTop + jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).height();
      return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }

    function animateNumbers() {
      if (isScrolledIntoView(jquery__WEBPACK_IMPORTED_MODULE_0___default()(".numbers")) && !viewed) {
        viewed = true;
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.number').each(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('opacity', 1);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('Counter', 0).animate({
            Counter: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text().replace(/,/g, '')
          }, {
            duration: 4000,
            easing: 'swing',
            step: function step(now) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text(Math.ceil(now).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            }
          });
        });
      }
    }
  }
});

/***/ }),

/***/ "./assets/js/modules/external-links.js":
/*!*********************************************!*\
  !*** ./assets/js/modules/external-links.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('a').not('svg a, [href*="mailto:"], [href*="tel:"], [class*="foobox"]').each(function () {
      var isInternalLink = new RegExp('/' + window.location.host + '/');

      if (!isInternalLink.test(this.href)) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('target', '_blank');
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('a[href*=".pdf"]').attr('target', '_blank');
  }
});

/***/ }),

/***/ "./assets/js/modules/facetwp.js":
/*!**************************************!*\
  !*** ./assets/js/modules/facetwp.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('facetwp-loaded', function () {
      var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.facetwp-template');
      var offset = -150;

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.facetwp-filters').length) {
        var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.facetwp-filters');
      } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.facetwp-custom-filters').length) {
        var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.facetwp-custom-filters');
        offset = -60;
      }

      Foundation.SmoothScroll.scrollToLoc(target, {
        offset: offset
      }); //Foundation.reInit( 'equalizer' );
      // remove the old group

      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-type-archive-case_study .grid article').matchHeight({
        remove: true
      }); // apply matchHeight on the new selection, which includes the new element

      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-type-archive-case_study .grid article').matchHeight(); // Fleet Add labels

      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.filters .facetwp-facet').each(function () {
        var $facet = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
        var facet_name = $facet.attr('data-name');
        var facet_label = FWP.settings.labels[facet_name];

        if ($facet.closest('.facet-wrap').length < 1 && $facet.closest('.facetwp-flyout').length < 1) {
          $facet.wrap('<div class="facet-wrap"></div>');
          $facet.before('<h5 class="facet-label">' + facet_label + '</h5>');
        }
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('facetwp-refresh', function () {
      // remove the old group
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-type-archive-case_study .grid article').matchHeight({
        remove: true
      }); // apply matchHeight on the new selection, which includes the new element

      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-type-archive-case_study .grid article').matchHeight();
    });
  }
});

/***/ }),

/***/ "./assets/js/modules/fancybox.js":
/*!***************************************!*\
  !*** ./assets/js/modules/fancybox.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fancyapps/fancybox */ "./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js");
/* harmony import */ var _fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    'use strict';
    /*$('a.fancybox').fancybox({
        caption : function(instance,item) {
          return $(this).closest('figure').find('figcaption').html();
        }
    });
    
    $('a[data-fancybox]').fancybox({
        
        afterShow: function (instance, current) {
            let $a = current.opts.$orig;
            let url = $a.data('url');
            if( url ) {
                $(".fancybox-image").wrap($("<a />", {
                    // set anchor attributes
                    href: url, //or your target link
                    target: "_blank" // optional
                }));
            }
            
        }
     });
    */

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.modal-form').fancybox({
      baseClass: "full-screen",
      touch: "false",
      hash: false
    }); // Image galleries, we need this to disable the Group hash which interferes with FacetWP

    jquery__WEBPACK_IMPORTED_MODULE_0___default()().fancybox({
      baseClass: "fancybox-images",
      selector: '[data-fancybox="images"]',
      hash: false
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()().fancybox({
      baseClass: "fancybox-gallery",
      selector: '[data-fancybox="gallery"]',
      buttons: ['share', 'fullScreen', 'close'],
      share: {
        url: function url(instance, item) {
          return (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location;
        },
        tpl: '<div class="fancybox-share">' + "<p>" + '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' + "<span>Facebook</span>" + "</a>" + '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' + "<span>Twitter</span>" + "</a>" + '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' + "<span>Pinterest</span>" + "</a>" + "</p>" + "</div>"
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/modules/fixed-header.js":
/*!*******************************************!*\
  !*** ./assets/js/modules/fixed-header.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("scroll", function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop() > 100) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".sticky-header .site-header").addClass("fixed");
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".sticky-header .site-header").removeClass("fixed");
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/modules/foundation.js":
/*!*****************************************!*\
  !*** ./assets/js/modules/foundation.js ***!
  \*****************************************/
/*! exports provided: Foundation, CoreUtils, Box, onImagesLoaded, Keyboard, MediaQuery, Motion, Nest, Timer, Touch, Triggers, Accordion, AccordionMenu, DropdownMenu, Equalizer, ResponsiveMenu, ResponsiveToggle, Reveal, SmoothScroll, Tabs, Toggler, ResponsiveAccordionTabs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation.core */ "./node_modules/foundation-sites/js/foundation.core.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Foundation", function() { return foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"]; });

/* harmony import */ var foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! foundation-sites/js/foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "CoreUtils", function() { return foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! foundation-sites/js/foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_3__["Box"]; });

/* harmony import */ var foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! foundation-sites/js/foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onImagesLoaded", function() { return foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"]; });

/* harmony import */ var foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! foundation-sites/js/foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keyboard", function() { return foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__["Keyboard"]; });

/* harmony import */ var foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! foundation-sites/js/foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MediaQuery", function() { return foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"]; });

/* harmony import */ var foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! foundation-sites/js/foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Motion", function() { return foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Motion"]; });

/* harmony import */ var foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! foundation-sites/js/foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Nest", function() { return foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__["Nest"]; });

/* harmony import */ var foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! foundation-sites/js/foundation.util.timer */ "./node_modules/foundation-sites/js/foundation.util.timer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__["Timer"]; });

/* harmony import */ var foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! foundation-sites/js/foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__["Touch"]; });

/* harmony import */ var foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! foundation-sites/js/foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triggers", function() { return foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__["Triggers"]; });

/* harmony import */ var foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! foundation-sites/js/foundation.accordion */ "./node_modules/foundation-sites/js/foundation.accordion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_12__["Accordion"]; });

/* harmony import */ var foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! foundation-sites/js/foundation.accordionMenu */ "./node_modules/foundation-sites/js/foundation.accordionMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionMenu", function() { return foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_13__["AccordionMenu"]; });

/* harmony import */ var foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! foundation-sites/js/foundation.dropdownMenu */ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownMenu", function() { return foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_14__["DropdownMenu"]; });

/* harmony import */ var foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! foundation-sites/js/foundation.equalizer */ "./node_modules/foundation-sites/js/foundation.equalizer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Equalizer", function() { return foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_15__["Equalizer"]; });

/* harmony import */ var foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! foundation-sites/js/foundation.responsiveMenu */ "./node_modules/foundation-sites/js/foundation.responsiveMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveMenu", function() { return foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__["ResponsiveMenu"]; });

/* harmony import */ var foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! foundation-sites/js/foundation.responsiveToggle */ "./node_modules/foundation-sites/js/foundation.responsiveToggle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveToggle", function() { return foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_17__["ResponsiveToggle"]; });

/* harmony import */ var foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! foundation-sites/js/foundation.reveal */ "./node_modules/foundation-sites/js/foundation.reveal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reveal", function() { return foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_18__["Reveal"]; });

/* harmony import */ var foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! foundation-sites/js/foundation.smoothScroll */ "./node_modules/foundation-sites/js/foundation.smoothScroll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothScroll", function() { return foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_19__["SmoothScroll"]; });

/* harmony import */ var foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! foundation-sites/js/foundation.tabs */ "./node_modules/foundation-sites/js/foundation.tabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__["Tabs"]; });

/* harmony import */ var foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! foundation-sites/js/foundation.toggler */ "./node_modules/foundation-sites/js/foundation.toggler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toggler", function() { return foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__["Toggler"]; });

/* harmony import */ var foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! foundation-sites/js/foundation.responsiveAccordionTabs */ "./node_modules/foundation-sites/js/foundation.responsiveAccordionTabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveAccordionTabs", function() { return foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_22__["ResponsiveAccordionTabs"]; });












 // import { Abide } from 'foundation-sites/js/foundation.abide';


 // import { Drilldown } from 'foundation-sites/js/foundation.drilldown';
// import { Dropdown } from 'foundation-sites/js/foundation.dropdown';


 // import { Interchange } from 'foundation-sites/js/foundation.interchange';
// import { Magellan } from 'foundation-sites/js/foundation.magellan';
// import { OffCanvas } from 'foundation-sites/js/foundation.offcanvas';
// import { Orbit } from 'foundation-sites/js/foundation.orbit';



 // import { Slider } from 'foundation-sites/js/foundation.slider';

 // import { Sticky } from 'foundation-sites/js/foundation.sticky';


 // import { Tooltip } from 'foundation-sites/js/foundation.tooltip';


foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].addToJquery(jquery__WEBPACK_IMPORTED_MODULE_0___default.a); // Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].rtl = foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].GetYoDigits = foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].transitionend = foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["transitionend"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].RegExpEscape = foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["RegExpEscape"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].onLoad = foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLoad"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Box = foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_3__["Box"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].onImagesLoaded = foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Keyboard = foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__["Keyboard"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].MediaQuery = foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Motion = foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Motion"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Move = foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Move"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Nest = foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__["Nest"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Timer = foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__["Timer"]; // Touch and Triggers previously were almost purely sede effect driven,
// so no need to add it to Foundation, just init them.

foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);
foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a, foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"]);

foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"]._init(); // Foundation.plugin(Abide, 'Abide');


foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_12__["Accordion"], 'Accordion');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_13__["AccordionMenu"], 'AccordionMenu'); // Foundation.plugin(Drilldown, 'Drilldown');
// Foundation.plugin(Dropdown, 'Dropdown');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_14__["DropdownMenu"], 'DropdownMenu'); // Foundation.plugin(Equalizer, 'Equalizer');
// Foundation.plugin(Interchange, 'Interchange');
// Foundation.plugin(Magellan, 'Magellan');
// Foundation.plugin(OffCanvas, 'OffCanvas');
// Foundation.plugin(Orbit, 'Orbit');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__["ResponsiveMenu"], 'ResponsiveMenu');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_17__["ResponsiveToggle"], 'ResponsiveToggle');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_18__["Reveal"], 'Reveal'); // Foundation.plugin(Slider, 'Slider');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_19__["SmoothScroll"], 'SmoothScroll'); // Foundation.plugin(Sticky, 'Sticky');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__["Tabs"], 'Tabs');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__["Toggler"], 'Toggler'); // Foundation.plugin(Tooltip, 'Tooltip');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_22__["ResponsiveAccordionTabs"], 'ResponsiveAccordionTabs');

/* harmony default export */ __webpack_exports__["default"] = (foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"]);

/***/ }),

/***/ "./assets/js/modules/general.js":
/*!**************************************!*\
  !*** ./assets/js/modules/general.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass('window-loaded'); // mega menu image hover

    var hoverTimeout;
    var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-primary .menu-item-image .image img'),
        dsrc = $img.attr('src');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-primary .menu-item a[data-image]').hover(function () {
      //if( $img.attr('src') !== $(this).data('image')) {
      $img.attr('src', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('image'));
      clearTimeout(hoverTimeout); //}
    }, function () {
      hoverTimeout = setTimeout(function () {
        $img.attr('src', dsrc);
      }, 1000);
    }); // what
    //$('.section-what .grid .grid-item').matchHeight({row:true});

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-type-archive-case_study .grid article').matchHeight({
      row: true
    }); // Blog filters

    /*
    var detectWrap = function(element) {
     var wrappedItems = [];
    var prevItem = {};
    var currItem = {};
    var items = $(element).children();
    
    for (var i = 0; i < items.length; i++) {
    currItem = items[i].getBoundingClientRect();
    if (prevItem && prevItem.top < currItem.top) {
      wrappedItems.push(items[i]);
    }
    prevItem = currItem;
    }
    
    return wrappedItems;
    
    };
    
    
    $(window).on("load resize", function() {
        var wrappedItems = detectWrap('.category-filters .menu');
        if(wrappedItems.length) {
          $('.category-filters .categories').addClass('mobile');
        }
        if(! wrappedItems.length) {
          $('.category-filters .categories').removeClass('mobile');
        }
        
        $('.category-filters').css('visibility', 'visible');
    });
    */
  }
});

/***/ }),

/***/ "./assets/js/modules/object-fit.js":
/*!*****************************************!*\
  !*** ./assets/js/modules/object-fit.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    if (!Modernizr.objectfit) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.object-fit-parent').each(function () {
        var $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
            imgUrl = $container.find('img').prop('src');

        if (imgUrl) {
          $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('compat-object-fit');
        }
      });
    }
  }
});

/***/ }),

/***/ "./assets/js/modules/slick.js":
/*!************************************!*\
  !*** ./assets/js/modules/slick.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel/slick/slick */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    var $heroSlider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-hero .slider');

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $heroSlider).length) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $heroSlider).on('init', function () {
        $heroSlider.css({
          opacity: 1,
          visibility: 'visible'
        });
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $heroSlider).slick({
        fade: true,
        autoplay: true,
        infinite: true,
        adaptiveHeight: false,
        dots: false,
        speed: 2000,
        autoplaySpeed: 4000,
        arrows: false,
        rows: 0,
        lazyLoad: 'progressive' //nextArrow: $('.slick-next', $heroSlider),
        //prevArrow: $('.slick-prev', $heroSlider),

      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $heroSlider).on("lazyLoaded", function (e, slick, image, imageSource) {
        var parentSlide = jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).parent(".slick-slide", $heroSlider);
        parentSlide.css("background-image", 'url("' + imageSource + '")').addClass("loaded"); //replace with background instead

        image.remove(); // remove source
      });
    } // About - history


    var $tabsSlider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-advantage .slider');

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $tabsSlider).length) {
      $tabsSlider.imagesLoaded({
        background: true
      }).done(function (instance) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $tabsSlider).slick({
          fade: true,
          autoplay: false,
          infinite: true,
          adaptiveHeight: false,
          arrows: true,
          dots: true,
          rows: 0,
          customPaging: function customPaging(slider, i) {
            var title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(slider.$slides[i]).find('h3').text();
            return title;
          },
          speed: 300,
          nextArrow: jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-next', $tabsSlider),
          prevArrow: jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-prev', $tabsSlider)
        });
        $tabsSlider.prepend(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $tabsSlider).find('.slick-dots'));
        $tabsSlider.addClass('images-loaded');
      });
    } // Careers - Testimonials


    var $testimonialsSlider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-testimonials .slider');

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $testimonialsSlider).length) {
      $testimonialsSlider.imagesLoaded().done(function (instance) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $testimonialsSlider).slick({
          fade: true,
          autoplay: false,
          infinite: true,
          adaptiveHeight: true,
          arrows: true,
          dots: false,
          rows: 0,

          /*
          customPaging : function(slider, i) {
              let number = i+1;
              number = number.toString().padStart(2, '0');
              return '<a class="dot">'+number+'</a>';
          },
          */
          speed: 300,
          nextArrow: jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-next', $testimonialsSlider),
          prevArrow: jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-prev', $testimonialsSlider)
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wrap', $testimonialsSlider).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick', $testimonialsSlider).find('.slick-dots'));
        $testimonialsSlider.addClass('images-loaded');
      });
    }
  }
});

/***/ }),

/***/ "./assets/js/modules/smooth-scroll.js":
/*!********************************************!*\
  !*** ./assets/js/modules/smooth-scroll.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation.smoothScroll */ "./node_modules/foundation-sites/js/foundation.smoothScroll.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    /* window.addEventListener('load', function () {
         
         
         // if page has a #hash
         if ( location.hash ) {
             
             let element = location.hash + '-anchor';
             
             if( $(element).length ) {
                 setTimeout(function(){ 
                     Foundation.SmoothScroll.scrollToLoc( element, {offset: 100} );
                  }, 3000);
                 
             }
             
             console.log('scrolled');
             
         }
     }, false);
     
     */
  }
});

/***/ }),

/***/ "./assets/js/project.js":
/*!******************************!*\
  !*** ./assets/js/project.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loader_ModuleLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader/ModuleLoader */ "./assets/js/loader/ModuleLoader.js");
/* harmony import */ var _modules_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/foundation */ "./assets/js/modules/foundation.js");
/* harmony import */ var _modules_acf_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/acf-map */ "./assets/js/modules/acf-map.js");
/* harmony import */ var _modules_animate_numbers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/animate-numbers */ "./assets/js/modules/animate-numbers.js");
/* harmony import */ var what_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! what-input */ "./node_modules/what-input/dist/what-input.js");
/* harmony import */ var what_input__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(what_input__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jquery-match-height */ "./node_modules/jquery-match-height/dist/jquery.matchHeight.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery_match_height__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_external_links__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/external-links */ "./assets/js/modules/external-links.js");
/* harmony import */ var _modules_facetwp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/facetwp */ "./assets/js/modules/facetwp.js");
/* harmony import */ var _modules_fixed_header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/fixed-header */ "./assets/js/modules/fixed-header.js");
/* harmony import */ var _modules_general__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/general */ "./assets/js/modules/general.js");
/* harmony import */ var _modules_object_fit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/object-fit */ "./assets/js/modules/object-fit.js");
/* harmony import */ var _modules_slick__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/slick */ "./assets/js/modules/slick.js");
/* harmony import */ var _modules_smooth_scroll__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/smooth-scroll */ "./assets/js/modules/smooth-scroll.js");
/* harmony import */ var _modules_accordion_fix__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/accordion-fix */ "./assets/js/modules/accordion-fix.js");
/* harmony import */ var _modules_fancybox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/fancybox */ "./assets/js/modules/fancybox.js");

 // Foundation


/* eslint-disable-line */


 // what Input NPM

 // jquery match height NMP

 // Custom Modules




 // import inlineSvg from './modules/inline-svg';
// import modalVideo from './modules/modal-video';
// import responsiveVideoEmbed from './modules/responsive-video-embeds';

 // import search from './modules/search';


 // import superfish from './modules/superfish';
//import backgroundVideo from './modules/background-video';
// import menuToggle from './modules/menu-toggle';

 //import isotope from './modules/isotope';

 //import infiniteScroll from './modules/infinite-scroll';

var modules = new _loader_ModuleLoader__WEBPACK_IMPORTED_MODULE_1__["default"]({
  acfMap: _modules_acf_map__WEBPACK_IMPORTED_MODULE_3__["default"],
  animateNumbers: _modules_animate_numbers__WEBPACK_IMPORTED_MODULE_4__["default"],
  externalLinks: _modules_external_links__WEBPACK_IMPORTED_MODULE_7__["default"],
  facetWp: _modules_facetwp__WEBPACK_IMPORTED_MODULE_8__["default"],
  fancyBox: _modules_fancybox__WEBPACK_IMPORTED_MODULE_15__["default"],
  //fixedHeader,
  general: _modules_general__WEBPACK_IMPORTED_MODULE_10__["default"],
  // inlineSvg,
  // modalVideo,
  objectFit: _modules_object_fit__WEBPACK_IMPORTED_MODULE_11__["default"],
  // responsiveVideoEmbed,
  // search,
  slick: _modules_slick__WEBPACK_IMPORTED_MODULE_12__["default"],
  smoothScroll: _modules_smooth_scroll__WEBPACK_IMPORTED_MODULE_13__["default"],
  // superfish
  //backgroundVideo,
  //menuToggle,
  accordionFix: _modules_accordion_fix__WEBPACK_IMPORTED_MODULE_14__["default"]
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).foundation();
  modules.init();
});

/***/ }),

/***/ "./assets/scss/login.scss":
/*!********************************!*\
  !*** ./assets/scss/login.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/style.scss":
/*!********************************!*\
  !*** ./assets/scss/style.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**************************************************************************************!*\
  !*** multi ./assets/js/project.js ./assets/scss/style.scss ./assets/scss/login.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/js/project.js */"./assets/js/project.js");
__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/scss/style.scss */"./assets/scss/style.scss");
module.exports = __webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/scss/login.scss */"./assets/scss/login.scss");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=project.js.map