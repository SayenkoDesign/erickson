(function () {
'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["/js/scrollreveal-config"],{

/***/"./assets/js/scrollreveal-config.js":
/*!******************************************!*\
  !*** ./assets/js/scrollreveal-config.js ***!
  \******************************************/
/*! no static exports found */
/***/function assetsJsScrollrevealConfigJs(module,exports){

// AOS
(function(document,window,$){

var ID=function ID(){
// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
return '_'+Math.random().toString(36).substr(2,9);
};

$('.load-hidden').each(function(){
if(!$(this).attr('id')){
$(this).attr('id',ID);
}
});
ScrollReveal({});
/*
  ScrollReveal().reveal('section.scroll-reveal', {
      origin: 'bottom',
      
      afterReveal: function() {
          ScrollReveal().reveal('.animate-left', { 
              delay: 200,
              origin: 'left',
              distance: '100%',
          });
          
          ScrollReveal().reveal('.animate-right', { 
              delay: 400,
              origin: 'right',
              distance: '100%',
          });
      }
  });
  */

/*
      HOME
  */
// Hero

ScrollReveal().reveal('.section-hero');
ScrollReveal().reveal('.section-hero:not(.has-background) h1:not(.no-reveal)',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.section-hero.has-background h1',{
delay:400,
origin:'left',
distance:'100%'});

ScrollReveal().reveal('.section-hero.has-background h4',{
delay:800,
origin:'right',
distance:'100%'});

ScrollReveal().reveal('.section-hero.has-background h3',{
delay:1200,
origin:'right',
distance:'100%'});

ScrollReveal().reveal('.section-hero.has-background .button',{
delay:1600,
distance:'100%'});

ScrollReveal().reveal('.section-hero.has-background .play-video',{
delay:2000,
scale:0.1,
afterReveal:function afterReveal(el){
el.classList.add('revealed');
}});
// Section Services

ScrollReveal().reveal('.home .section-services');
ScrollReveal().reveal('.home .section-services .grid-item',{
delay:400,
distance:'100%',
interval:200});
//ScrollReveal().reveal( '.section-advantage' );

ScrollReveal().reveal('.section-advantage header',{
delay:200,
distance:'100%'});

ScrollReveal().reveal('.section-advantage .slider',{
delay:400,
distance:'100%'});
// Case studies
//ScrollReveal().reveal( '.section-case-studies' );

ScrollReveal().reveal('.section-case-studies header',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.section-case-studies article',{
delay:800,
interval:250,
distance:'100%'});
// Related Posts

ScrollReveal().reveal('.section-related-posts');
ScrollReveal().reveal('.section-related-posts header',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.section-related-posts article',{
delay:800,
interval:250,
distance:'100%'});
// Posts

ScrollReveal().reveal('.section-posts');
ScrollReveal().reveal('.section-posts header',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.section-posts article',{
delay:800,
interval:250,
distance:'100%'});
// Featured Post

ScrollReveal().reveal('.section-featured-post');
ScrollReveal().reveal('.section-featured-post header',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.section-featured-post .grid .cell',{
delay:800,
interval:250,
distance:'100%'});
// Customers

ScrollReveal().reveal('.section-customers');
ScrollReveal().reveal('.section-customers header',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.section-customers .logos li',{
easing:"ease-out",
delay:800,
interval:200,
origin:'bottom',
distance:'100%'});
// Services
// Approach

ScrollReveal().reveal('.section-approach header',{
distance:'100%'});

$('.section-approach .grid-margin-bottom .cell').each(function(){
if(!$(this).attr('id')){
$(this).attr('id',ID);
}
});
$('.section-approach .grid-margin-bottom .cell').each(function(index,element){
console.log(element.id);
ScrollReveal().reveal('#'+element.id,{
delay:400,
origin:index%2?'left':'right',
distance:'100%',
interval:400});

});// Results

ScrollReveal().reveal('.section-results header',{
distance:'100%'});

ScrollReveal().reveal('.section-results .cell',{
delay:400,
distance:'100%',
interval:200});
// Clients

ScrollReveal().reveal('.section-clients',{
distance:'100%'});

ScrollReveal().reveal('.section-clients header',{
delay:400,
distance:'100%',
interval:200});
// Service Gallery

ScrollReveal().reveal('.section-service-gallery header',{
distance:'100%'});

ScrollReveal().reveal('.section-service-gallery .slick',{
delay:400,
distance:'100%',
interval:200});
// Fleet

ScrollReveal().reveal('.post-type-archive-fleet #secondary h2',{
distance:'100%'});

ScrollReveal().reveal('.post-type-archive-fleet #secondary li',{
delay:400,
distance:'100%',
interval:200});

ScrollReveal().reveal('.post-type-archive-fleet #primary .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

ScrollReveal().reveal('.post-type-archive-fleet #primary .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Case Studies Archive

ScrollReveal().reveal('.post-type-archive-case_study header',{
distance:'100%'});

ScrollReveal().reveal('.post-type-archive-case_study .facetwp-filters',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.post-type-archive-case_study .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

ScrollReveal().reveal('.post-type-archive-case_study .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Photo gallery

ScrollReveal().reveal('.template-photo-gallery .facetwp-filters',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.template-photo-gallery .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

ScrollReveal().reveal('.template-photo-gallery .facetwp-type-pager',{
delay:200,
distance:'100%'});
// video Gallery

ScrollReveal().reveal('.post-type-archive-video_gallery .facetwp-filters',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.post-type-archive-video_gallery .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

ScrollReveal().reveal('.post-type-archive-video_gallery .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Archive

ScrollReveal().reveal('.archive .section-hero',{
delay:200,
distance:'100%'});

ScrollReveal().reveal('.archive .facetwp-filters',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.archive .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

ScrollReveal().reveal('.archive .facetwp-pager',{
delay:200,
distance:'100%'});
// About

ScrollReveal().reveal('.page-template-about .section-hero .hero-content p',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.page-template-about .mission-vision',{
distance:'100%'});

ScrollReveal().reveal('.page-template-about .section-core-values header',{
distance:'100%'});

ScrollReveal().reveal('.page-template-about .section-core-values .grid .cell',{
delay:400,
distance:'100%',
interval:200});

ScrollReveal().reveal('.page-template-about .section-commitment',{
distance:'100%'});

ScrollReveal().reveal('.page-template-about .section-commitment header',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.page-template-about .section-commitment .grid .cell',{
delay:400,
distance:'100%',
interval:200});

ScrollReveal().reveal('.page-template-about .section-awards header',{
distance:'100%'});

ScrollReveal().reveal('.page-template-about .section-awards .grid .cell',{
delay:400,
distance:'100%',
interval:200});
// Careers

ScrollReveal().reveal('.template-careers .section-hero .button',{
delay:2000,
distance:'100%'});

ScrollReveal().reveal('.template-careers .section-hero .play-video',{
delay:1600,
scale:0.1,
afterReveal:function afterReveal(el){
el.classList.add('revealed');
}});

ScrollReveal().reveal('.page-template-careers .section-benefits header',{
distance:'100%',
afterReveal:function afterReveal(el){
$('.page-template-careers .section-benefits .slider').show();
}});

ScrollReveal().reveal('.page-template-careers .section-benefits .grid .cell',{
delay:400,
distance:'100%',
interval:200});

ScrollReveal().reveal('.page-template-careers .section-testimonials',{
distance:'100%'});

ScrollReveal().reveal('.page-template-careers .section-testimonials .slider',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.page-template-careers .section-values');
$('.page-template-careers .section-values .cell').each(function(){
if(!$(this).attr('id')){
$(this).attr('id',ID);
}
});
$('.page-template-careers .section-values .cell').each(function(index,element){
console.log(element.id);
ScrollReveal().reveal('#'+element.id,{
delay:400,
origin:index%2?'left':'right',
distance:'100%',
interval:400});

});
ScrollReveal().reveal('.page-template-careers .section-jobs header',{
distance:'100%'});

ScrollReveal().reveal('.page-template-careers .section-jobs .entry-content',{
delay:400,
distance:'100%'});
// History

ScrollReveal().reveal('.page-template-history .section-hero .hero-content img',{
delay:400,
distance:'100%'});

ScrollReveal().reveal('.page-template-history .section-hero .hero-content h1',{
delay:800,
origin:'bottom',
distance:'100%'});

ScrollReveal().reveal('.page-template-history .section-introduction',{
delay:800,
origin:'bottom',
distance:'100%'});

ScrollReveal().reveal('.page-template-history .section-timeline .facetwp-facet',{
delay:800,
origin:'bottom',
distance:'100%'});

ScrollReveal().reveal('.page-template-history .section-timeline .facetwp-template',{
delay:800,
origin:'bottom',
distance:'100%'});

$('.section-timeline .facetwp-template article').each(function(index,element){
//var id = $(element).attr('id'); 
ScrollReveal().reveal('.event',{
delay:1200,
distance:'100%',
interval:400});

});
ScrollReveal().reveal('.post-type-archive-video_gallery .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Team

ScrollReveal().reveal('.page-template-team .facetwp-facet',{
delay:800,
origin:'bottom',
distance:'100%'});

ScrollReveal().reveal('.page-template-team .facetwp-template .cell',{
delay:800,
origin:'bottom',
distance:'100%',
interval:400});

ScrollReveal().reveal('.page-template-team .facetwp-type-pager',{
delay:200,
distance:'100%'});
// ----------------------
// Multipurpose page

ScrollReveal().reveal('.template-multi-purpose .section-block',{
delay:400,
origin:'bottom',
distance:'100%'});

ScrollReveal().reveal('.template-multi-purpose .section-block .cell',{
delay:800,
origin:'bottom',
distance:'100%',
interval:400,
afterReveal:function afterReveal(el){
$('.template-multi-purpose .section-block .cell .play-video').addClass('revealed');
}});
// Contact

ScrollReveal().reveal('.section-form-directory .cell',{
delay:400,
origin:'bottom',
distance:'100%',
interval:400});

ScrollReveal().reveal('.section-offices',{
distance:'100%'});

ScrollReveal().reveal('.section-offices header',{
delay:400,
distance:'100%'});

})(document,window,jQuery);

/***/},

/***/3:
/*!************************************************!*\
  !*** multi ./assets/js/scrollreveal-config.js ***!
  \************************************************/
/*! no static exports found */
/***/function _(module,exports,__webpack_require__){

module.exports=__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/js/scrollreveal-config.js */"./assets/js/scrollreveal-config.js");


/***/}},

[[3,"/js/manifest"]]]);

}());

//# sourceMappingURL=scrollreveal-config.js.map