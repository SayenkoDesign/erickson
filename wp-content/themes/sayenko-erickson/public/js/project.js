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

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
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

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
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

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
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

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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
	f: f$2
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

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

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
  hiddenKeys[STATE] = true;
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

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
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

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
	f: f$5
};

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var f$6 = wellKnownSymbol;

var wellKnownSymbolWrapped = {
	f: f$6
};

var defineProperty = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

var defineProperty$1 = objectDefineProperty.f;



var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var $forEach = arrayIteration.forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore$1 = shared('wks');
var QObject = global_1.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty$1(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
  defineWellKnownSymbol(name);
});

_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

var defineProperty$2 = objectDefineProperty.f;


var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$2(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  _export({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var defineProperty$3 = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var $find = arrayIteration.find;



var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH$1 = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$1 }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $forEach$1 = arrayIteration.forEach;



var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH$2) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$3 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype$1 : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
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
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
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

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

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

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$2 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$2] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var SPECIES$3 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var arrayPush = [].push;
var min$2 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min$2(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}

var ITERATOR$2 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
  if (CollectionPrototype$1) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype$1[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype$1[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
    }
    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["/js/project"],{

/***/"./assets/js/loader/ModuleLoader.js":
/*!******************************************!*\
  !*** ./assets/js/loader/ModuleLoader.js ***!
  \******************************************/
/*! exports provided: default */
/***/function assetsJsLoaderModuleLoaderJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}

function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}

var ModuleLoader=
/*#__PURE__*/
function(){
function ModuleLoader(modules){
_classCallCheck(this,ModuleLoader);

this.modules=modules;
}

_createClass(ModuleLoader,[{
key:"init",
value:function init(){
var modules=this.modules;
Object.keys(modules).forEach(function(key){
modules[key].init();
});
}}]);


return ModuleLoader;
}();

/* harmony default export */__webpack_exports__["default"]=ModuleLoader;

/***/},

/***/"./assets/js/modules/accordion-fix.js":
/*!********************************************!*\
  !*** ./assets/js/modules/accordion-fix.js ***!
  \********************************************/
/*! exports provided: default */
/***/function assetsJsModulesAccordionFixJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! foundation-sites/js/foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");


/* harmony default export */__webpack_exports__["default"]={
init:function init(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery',function(event,newSize,oldSize){
if(foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast('xlarge'));
});
}};


/***/},

/***/"./assets/js/modules/acf-map.js":
/*!**************************************!*\
  !*** ./assets/js/modules/acf-map.js ***!
  \**************************************/
/*! exports provided: default */
/***/function assetsJsModulesAcfMapJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */__webpack_exports__["default"]={
init:function init(){
function InfoBox(t){
t=t||{},google.maps.OverlayView.apply(this,arguments),this.content_=t.content||"",this.disableAutoPan_=t.disableAutoPan||!1,this.maxWidth_=t.maxWidth||0,this.pixelOffset_=t.pixelOffset||new google.maps.Size(0,0),this.position_=t.position||new google.maps.LatLng(0,0),this.zIndex_=t.zIndex||null,this.boxClass_=t.boxClass||"infoBox",this.boxStyle_=t.boxStyle||{},this.closeBoxMargin_=t.closeBoxMargin||"2px",this.closeBoxURL_=t.closeBoxURL||"//www.google.com/intl/en_us/mapfiles/close.gif",""===t.closeBoxURL&&(this.closeBoxURL_=""),this.closeBoxTitle_=t.closeBoxTitle||" Close ",this.infoBoxClearance_=t.infoBoxClearance||new google.maps.Size(1,1),void 0===t.visible&&(void 0===t.isHidden?t.visible=!0:t.visible=!t.isHidden),this.isHidden_=!t.visible,this.alignBottom_=t.alignBottom||!1,this.pane_=t.pane||"floatPane",this.enableEventPropagation_=t.enableEventPropagation||!1,this.div_=null,this.closeListener_=null,this.moveListener_=null,this.contextListener_=null,this.eventListeners_=null,this.fixedWidthSet_=null;
}

InfoBox.prototype=new google.maps.OverlayView(),InfoBox.prototype.createInfoBoxDiv_=function(){
var t,
i,
e,
o=this,
s=function s(t){
t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation();
};

if(!this.div_){
if(this.div_=document.createElement("div"),this.setBoxStyle_(),void 0===this.content_.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+this.content_:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(this.content_)),this.getPanes()[this.pane_].appendChild(this.div_),this.addClickHandler_(),this.div_.style.width?this.fixedWidthSet_=!0:0!==this.maxWidth_&&this.div_.offsetWidth>this.maxWidth_?(this.div_.style.width=this.maxWidth_,this.div_.style.overflow="auto",this.fixedWidthSet_=!0):(e=this.getBoxWidths_(),this.div_.style.width=this.div_.offsetWidth-e.left-e.right+"px",this.fixedWidthSet_=!1),this.panBox_(this.disableAutoPan_),!this.enableEventPropagation_){
for(this.eventListeners_=[],i=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"],t=0;t<i.length;t++){
this.eventListeners_.push(google.maps.event.addDomListener(this.div_,i[t],s));
}

this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(t){
this.style.cursor="default";
}));
}

this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",function(t){
t.returnValue=!1,t.preventDefault&&t.preventDefault(),o.enableEventPropagation_||s(t);
}),google.maps.event.trigger(this,"domready");
}
},InfoBox.prototype.getCloseBoxImg_=function(){
var t="";
return ""!==this.closeBoxURL_&&(t="<img",t+=" src='"+this.closeBoxURL_+"'",t+=" align=right",t+=" title='"+this.closeBoxTitle_+"'",t+=" style='",t+=" position: relative;",t+=" cursor: pointer;",t+=" margin: "+this.closeBoxMargin_+";",t+="'>"),t;
},InfoBox.prototype.addClickHandler_=function(){
var t;
""!==this.closeBoxURL_?(t=this.div_.firstChild,this.closeListener_=google.maps.event.addDomListener(t,"click",this.getCloseClickHandler_())):this.closeListener_=null;
},InfoBox.prototype.getCloseClickHandler_=function(){
var t=this;
return function(i){
i.cancelBubble=!0,i.stopPropagation&&i.stopPropagation(),google.maps.event.trigger(t,"closeclick"),t.close();
};
},InfoBox.prototype.panBox_=function(t){
var i,
e=0,
o=0;

if(!t&&(i=this.getMap())instanceof google.maps.Map){
i.getBounds().contains(this.position_)||i.setCenter(this.position_);
var s=this.pixelOffset_.width,
n=this.pixelOffset_.height,
h=this.div_.offsetWidth,
l=this.div_.offsetHeight,
d=this.infoBoxClearance_.width,
r=this.infoBoxClearance_.height;

if(2==i.panToBounds.length){
var a={
left:0,
right:0,
top:0,
bottom:0};

a.left=-s+d,a.right=s+h+d,this.alignBottom_?(a.top=-n+r+l,a.bottom=n+r):(a.top=-n+r,a.bottom=n+l+r),i.panToBounds(new google.maps.LatLngBounds(this.position_),a);
}else {
var _=i.getDiv(),
p=_.offsetWidth,
v=_.offsetHeight,
f=this.getProjection().fromLatLngToContainerPixel(this.position_);

if(f.x<-s+d?e=f.x+s-d:f.x+h+s+d>p&&(e=f.x+h+s+d-p),this.alignBottom_?f.y<-n+r+l?o=f.y+n-r-l:f.y+n+r>v&&(o=f.y+n+r-v):f.y<-n+r?o=f.y+n-r:f.y+l+n+r>v&&(o=f.y+l+n+r-v),0!==e||0!==o){
i.getCenter();
i.panBy(e,o);
}
}
}
},InfoBox.prototype.setBoxStyle_=function(){
var t,i;

if(this.div_){
for(t in this.div_.className=this.boxClass_,this.div_.style.cssText="",i=this.boxStyle_){
i.hasOwnProperty(t)&&(this.div_.style[t]=i[t]);
}

(void 0===this.div_.style.WebkitTransform||-1===this.div_.style.WebkitTransform.indexOf("translateZ")&&-1===this.div_.style.WebkitTransform.indexOf("matrix"))&&(this.div_.style.WebkitTransform="translateZ(0)"),void 0!==this.div_.style.opacity&&""!==this.div_.style.opacity&&(this.div_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(Opacity='+100*this.div_.style.opacity+')"',this.div_.style.filter="alpha(opacity="+100*this.div_.style.opacity+")"),this.div_.style.position="absolute",this.div_.style.visibility="hidden",null!==this.zIndex_&&(this.div_.style.zIndex=this.zIndex_);
}
},InfoBox.prototype.getBoxWidths_=function(){
var t,
i={
top:0,
bottom:0,
left:0,
right:0},

e=this.div_;
return document.defaultView&&document.defaultView.getComputedStyle?(t=e.ownerDocument.defaultView.getComputedStyle(e,""))&&(i.top=parseInt(t.borderTopWidth,10)||0,i.bottom=parseInt(t.borderBottomWidth,10)||0,i.left=parseInt(t.borderLeftWidth,10)||0,i.right=parseInt(t.borderRightWidth,10)||0):document.documentElement.currentStyle&&e.currentStyle&&(i.top=parseInt(e.currentStyle.borderTopWidth,10)||0,i.bottom=parseInt(e.currentStyle.borderBottomWidth,10)||0,i.left=parseInt(e.currentStyle.borderLeftWidth,10)||0,i.right=parseInt(e.currentStyle.borderRightWidth,10)||0),i;
},InfoBox.prototype.onRemove=function(){
this.div_&&(this.div_.parentNode.removeChild(this.div_),this.div_=null);
},InfoBox.prototype.draw=function(){
this.createInfoBoxDiv_();
var t=this.getProjection().fromLatLngToDivPixel(this.position_);
this.div_.style.left=t.x+this.pixelOffset_.width+"px",this.alignBottom_?this.div_.style.bottom=-(t.y+this.pixelOffset_.height)+"px":this.div_.style.top=t.y+this.pixelOffset_.height+"px",this.isHidden_?this.div_.style.visibility="hidden":this.div_.style.visibility="visible";
},InfoBox.prototype.setOptions=function(t){
void 0!==t.boxClass&&(this.boxClass_=t.boxClass,this.setBoxStyle_()),void 0!==t.boxStyle&&(this.boxStyle_=t.boxStyle,this.setBoxStyle_()),void 0!==t.content&&this.setContent(t.content),void 0!==t.disableAutoPan&&(this.disableAutoPan_=t.disableAutoPan),void 0!==t.maxWidth&&(this.maxWidth_=t.maxWidth),void 0!==t.pixelOffset&&(this.pixelOffset_=t.pixelOffset),void 0!==t.alignBottom&&(this.alignBottom_=t.alignBottom),void 0!==t.position&&this.setPosition(t.position),void 0!==t.zIndex&&this.setZIndex(t.zIndex),void 0!==t.closeBoxMargin&&(this.closeBoxMargin_=t.closeBoxMargin),void 0!==t.closeBoxURL&&(this.closeBoxURL_=t.closeBoxURL),void 0!==t.closeBoxTitle&&(this.closeBoxTitle_=t.closeBoxTitle),void 0!==t.infoBoxClearance&&(this.infoBoxClearance_=t.infoBoxClearance),void 0!==t.isHidden&&(this.isHidden_=t.isHidden),void 0!==t.visible&&(this.isHidden_=!t.visible),void 0!==t.enableEventPropagation&&(this.enableEventPropagation_=t.enableEventPropagation),this.div_&&this.draw();
},InfoBox.prototype.setContent=function(t){
this.content_=t,this.div_&&(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.fixedWidthSet_||(this.div_.style.width=""),void 0===t.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+t:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(t)),this.fixedWidthSet_||(this.div_.style.width=this.div_.offsetWidth+"px",void 0===t.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+t:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(t))),this.addClickHandler_()),google.maps.event.trigger(this,"content_changed");
},InfoBox.prototype.setPosition=function(t){
this.position_=t,this.div_&&this.draw(),google.maps.event.trigger(this,"position_changed");
},InfoBox.prototype.setZIndex=function(t){
this.zIndex_=t,this.div_&&(this.div_.style.zIndex=t),google.maps.event.trigger(this,"zindex_changed");
},InfoBox.prototype.setVisible=function(t){
this.isHidden_=!t,this.div_&&(this.div_.style.visibility=this.isHidden_?"hidden":"visible");
},InfoBox.prototype.getContent=function(){
return this.content_;
},InfoBox.prototype.getPosition=function(){
return this.position_;
},InfoBox.prototype.getZIndex=function(){
return this.zIndex_;
},InfoBox.prototype.getVisible=function(){
return void 0!==this.getMap()&&null!==this.getMap()&&!this.isHidden_;
},InfoBox.prototype.getWidth=function(){
var t=null;
return this.div_&&(t=this.div_.offsetWidth),t;
},InfoBox.prototype.getHeight=function(){
var t=null;
return this.div_&&(t=this.div_.offsetHeight),t;
},InfoBox.prototype.show=function(){
this.isHidden_=!1,this.div_&&(this.div_.style.visibility="visible");
},InfoBox.prototype.hide=function(){
this.isHidden_=!0,this.div_&&(this.div_.style.visibility="hidden");
},InfoBox.prototype.open=function(t,i){
var e=this;
i&&(this.setPosition(i.getPosition()),this.moveListener_=google.maps.event.addListener(i,"position_changed",function(){
e.setPosition(this.getPosition());
})),this.setMap(t),this.div_&&this.panBox_(this.disableAutoPan_);
},InfoBox.prototype.close=function(){
var t;

if(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.eventListeners_){
for(t=0;t<this.eventListeners_.length;t++){
google.maps.event.removeListener(this.eventListeners_[t]);
}

this.eventListeners_=null;
}

this.moveListener_&&(google.maps.event.removeListener(this.moveListener_),this.moveListener_=null),this.contextListener_&&(google.maps.event.removeListener(this.contextListener_),this.contextListener_=null),this.setMap(null);
};
var map_zoom_level=10;
/*
    *  render_map
    *   Do we want to center map on a specific marker?
    *
    */

function render_map($el){
var center_lat=$el.find('.marker[data-active="true"]').data('lat');
var center_lng=$el.find('.marker[data-active="true"]').data('lng');// variables

var $markers=$el.find('.marker');
var args={
zoom:map_zoom_level,
center:new google.maps.LatLng(center_lat,center_lng),
mapTypeId:google.maps.MapTypeId.ROADMAP,
scrollwheel:false,
//disableDefaultUI: false,
zoomControl:true,
scaleControl:false,
mapTypeControl:false,
streetViewControl:false,
fullscreenControl:false,
styles:[{
"featureType":"administrative",
"elementType":"labels",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"administrative.country",
"elementType":"geometry.stroke",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"administrative.province",
"elementType":"geometry.stroke",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"landscape",
"elementType":"geometry",
"stylers":[{
"visibility":"on"},
{
"color":"#e3e3e3"}]},

{
"featureType":"landscape.natural",
"elementType":"labels",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"poi",
"elementType":"all",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"road",
"elementType":"all",
"stylers":[{
"color":"#cccccc"}]},

{
"featureType":"road",
"elementType":"labels",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"transit",
"elementType":"labels.icon",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"transit.line",
"elementType":"geometry",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"transit.line",
"elementType":"labels.text",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"transit.station.airport",
"elementType":"geometry",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"transit.station.airport",
"elementType":"labels",
"stylers":[{
"visibility":"off"}]},

{
"featureType":"water",
"elementType":"geometry",
"stylers":[{
"color":"#FFFFFF"}]},

{
"featureType":"water",
"elementType":"labels",
"stylers":[{
"visibility":"off"}]}]};


// create map

var map=new google.maps.Map($el[0],args);
map.setOptions({
minZoom:5,
maxZoom:15});
// add a markers reference

map.markers=[];
map.infoBoxes=[];// add markers

$markers.each(function(){
add_marker(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),map);
});// let's open the first map marker

google.maps.event.trigger(map.markers[0],'click');// return

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


function add_marker($marker,map){
// var
var latlng=new google.maps.LatLng($marker.attr('data-lat'),$marker.attr('data-lng'));
var image={
url:map_params.icon,
scaledSize:new google.maps.Size(33,48)// IE hack
};
// create marker
// https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.optimized

var marker=new google.maps.Marker({
position:latlng,
map:map,
icon:image,
optimized:false,
// IE hack
// Custom values
_region:$marker.attr('data-region'),
_id:$marker.attr('data-id')});
// add to array

map.markers.push(marker);// if marker contains HTML, add it to an infoWindow

if($marker.html()){
var infobox=new InfoBox({
content:$marker.html(),
disableAutoPan:false,
zIndex:null,
pixelOffset:new google.maps.Size(-140,-70),
alignBottom:true,
boxStyle:{
//background: "none",
width:'276px'},

closeBoxMargin:0,
closeBoxURL:map_params.cross,
infoBoxClearance:new google.maps.Size(1,1),
isHidden:false,
pane:"floatPane",
enableEventPropagation:false,
id:$marker.attr('data-id')});

map.infoBoxes.push(infobox);// show info window when marker is clicked

google.maps.event.addListener(marker,'click',function(){
// close not working
for(var i=0;i<map.infoBoxes.length;i++){
map.infoBoxes[i].close();
}// center marker on click


var latLng=marker.getPosition();
map.setCenter(latLng);
map.panBy(0,-150);// open infowindow

infobox.open(map,marker);// marker._id

var $current=jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").find('span.active');
var current_id=$current.data('marker-id');
var current_parent_id=$current.parents('.is-accordion-submenu-parent').attr('id');
var $clicked;

if(current_id!=marker._id){
jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").find('span').removeClass('active');
$clicked=jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-marker-id="'+marker._id+'"]',"#map-legend");
$clicked.addClass('active');

if($clicked.parents('.is-accordion-submenu-parent').attr('id')!=current_parent_id){
$clicked.parents('.is-accordion-submenu-parent').find('a').trigger('click');
}
}
});// close info window when map is clicked

google.maps.event.addListener(map,'click',function(event){
if(infobox){
infobox.close();
}
});// let's open the first map marker, moved this to "render_map" function
//google.maps.event.trigger(map.markers[0], 'click');
}
}
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


var map=null;// Loop all instances, though we're only going to use one this time.

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.acf-map').each(function(){
// create map
map=render_map(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
google.maps.event.addDomListener(window,"resize",function(){
var center=map.getCenter();
google.maps.event.trigger(map,"resize");
map.setCenter(center);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").addClass('show');
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").on('click','.marker-anchor',function(){
// Do nothing if active marker
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('active')){
return;
}

var id=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('marker-id');

for(var i=0;i<map.markers.length;i++){
if(map.markers[i]._id==id){
jquery__WEBPACK_IMPORTED_MODULE_0___default()("#map-legend").find('span').removeClass('active');
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active');
google.maps.event.trigger(map.markers[i],'click');
break;
}
}
});
}};


/***/},

/***/"./assets/js/modules/animate-numbers.js":
/*!**********************************************!*\
  !*** ./assets/js/modules/animate-numbers.js ***!
  \**********************************************/
/*! exports provided: default */
/***/function assetsJsModulesAnimateNumbersJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var countup_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! countup.js */"./node_modules/countup.js/dist/countUp.min.js");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_1___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj;}

function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest();}

function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance");}

function _iterableToArrayLimit(arr,i){if(!(Symbol.iterator in Object(arr)||Object.prototype.toString.call(arr)==="[object Arguments]")){return;}var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}

function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}



/* harmony default export */__webpack_exports__["default"]={
init:function init(){
jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).on('load.animateNumbers scroll.animateNumbers',function(){
if(jquery__WEBPACK_IMPORTED_MODULE_1___default()('.block-results').length&&isInViewport(jquery__WEBPACK_IMPORTED_MODULE_1___default()('.block-results')[0])){
animateNumbers();
jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).off('load.animateNumbers scroll.animateNumbers');
}
});// var viewed = false;
// count decimals

function countDecimals(num){
var text=num.toString();

if(text.indexOf('e-')>-1){
var _text$split=text.split('e-'),
_text$split2=_slicedToArray(_text$split,2),
base=_text$split2[0],
trail=_text$split2[1];

var elen=parseInt(trail,10);
var idx=base.indexOf(".");
return idx==-1?0+elen:base.length-idx-1+elen;
}

var index=text.indexOf(".");
return index==-1?0:text.length-index-1;
}

var isInViewport=function isInViewport(elem){
var bounding=elem.getBoundingClientRect();
return bounding.top>=0&&bounding.left>=0&&bounding.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&bounding.right<=(window.innerWidth||document.documentElement.clientWidth);
};

function animateNumbers(){
// Find all Statistics on page, put them inside a variable
var number=jquery__WEBPACK_IMPORTED_MODULE_1___default()(".block-results .number");// For each Statistic we find, animate it

number.each(function(index){
var _$$data,_$$data2,_$$data3,_options;

// Find the value we want to animate (what lives inside the p tags)
var value=jquery__WEBPACK_IMPORTED_MODULE_1___default()(number[index]).data('value');
var decimalPlaces=countDecimals(value);
var prefix=(_$$data=jquery__WEBPACK_IMPORTED_MODULE_1___default()(number[index]).data('prefix'))!==null&&_$$data!==void 0?_$$data:'';
var suffix=(_$$data2=jquery__WEBPACK_IMPORTED_MODULE_1___default()(number[index]).data('suffix'))!==null&&_$$data2!==void 0?_$$data2:'';
var format=(_$$data3=jquery__WEBPACK_IMPORTED_MODULE_1___default()(number[index]).data('format'))!==null&&_$$data3!==void 0?_$$data3:false;
var options=(_options={
useEasing:true,
useGrouping:true,
decimalPlaces:decimalPlaces,
prefix:prefix,
suffix:suffix},
_defineProperty(_options,"useGrouping",format),_defineProperty(_options,"decimal","."),_options);
setTimeout(function(){
var numberAnimation=new countup_js__WEBPACK_IMPORTED_MODULE_0__["CountUp"](number[index],value,options);

if(!numberAnimation.error){
numberAnimation.start();
}else {
console.error(numberAnimation.error);
}
},1000);
jquery__WEBPACK_IMPORTED_MODULE_1___default()(number[index]).removeClass('animate');
});
}
}};


/***/},

/***/"./assets/js/modules/external-links.js":
/*!*********************************************!*\
  !*** ./assets/js/modules/external-links.js ***!
  \*********************************************/
/*! exports provided: default */
/***/function assetsJsModulesExternalLinksJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");

/* harmony default export */__webpack_exports__["default"]={
init:function init(){
/*
    $( 'a' ).not( 'svg a, [href*="mailto:"], [href*="tel:"], [class*="foobox"]' ).each( function() {
    var isInternalLink = new RegExp( '/' + window.location.host + '/' );
    if ( ! isInternalLink.test( this.href ) ) {
    $( this ).attr( 'target', '_blank' );
    }
    } );
    $( 'a[href*=".pdf"]' ).attr( 'target', '_blank' );
    */
}};


/***/},

/***/"./assets/js/modules/facetwp.js":
/*!**************************************!*\
  !*** ./assets/js/modules/facetwp.js ***!
  \**************************************/
/*! exports provided: default */
/***/function assetsJsModulesFacetwpJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */__webpack_exports__["default"]={
init:function init(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('facetwp-loaded',function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).find('.facetwp-facet-years').append('<div class="facetwp-reset"><span onclick="FWP.reset()">All</span></div>');

if('undefined'!==typeof FWP_HTTP.get.fwp_paged){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('is-paged');
}else {
jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass('is-paged');
}// facetwp-facet-categories


if('undefined'!==typeof FWP_HTTP.get.fwp_categories){
var selected=jquery__WEBPACK_IMPORTED_MODULE_0___default()(".facetwp-facet-categories option[value='"+FWP_HTTP.get.fwp_categories+"']").text();

if(''!==selected){
selected=selected.split('(')[0];
}else {
selected=erickson_options.blog_title;
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.blog .section-hero header h1').text(selected);
}else {
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.blog .section-hero header h1').text(erickson_options.blog_title);
}

if(FWP.loaded){
var target=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.blog .facetwp-template');
Foundation.SmoothScroll.scrollToLoc(target,{
offset:-100});

}
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('facetwp-refresh',function(){
if(FWP.loaded){
console.log('page loaded');
}
});
/*
    $(document).on('click', '.section-people .facetwp-facet .checked', function() { 
        FWP.facets['departments'] = ['all']; 
        delete FWP.facets['paged']; // remove "paged" from URL
        FWP.refresh(); 
        console.log('refresh');   
    });*/

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('facetwp-refresh',function(){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-people').length&&''==FWP.build_query_string()){
FWP.facets['departments']=['all'];
delete FWP.facets['paged'];// remove "paged" from URL
}
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('facetwp-refresh',function(){
if(FWP.loaded);
});
}};


/***/},

/***/"./assets/js/modules/fancybox.js":
/*!***************************************!*\
  !*** ./assets/js/modules/fancybox.js ***!
  \***************************************/
/*! exports provided: default */
/***/function assetsJsModulesFancyboxJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! @fancyapps/fancybox */"./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js");


/* harmony default export */__webpack_exports__["default"]={
init:function init(){
/*$('a.fancybox').fancybox({
        caption : function(instance,item) {
          return $(this).closest('figure').find('figcaption').html();
        }
    });
    
    
    $('a[data-fancybox]').fancybox({
        
        afterShow: function (instance, current) {
            $.fn.matchHeight._update();
        }
     });
    */

jquery__WEBPACK_IMPORTED_MODULE_0___default()().fancybox({
smallBtn:false});

/*
    $('.modal-form').fancybox({
        //selector : '.modal-form',
        baseClass: "full-screen",
        modal: true,
        closeExisting: true,
        touch: false,
        hash: false,
        arrows: false,
        infobar: false
    });
    */
// Image galleries, we need this to disable the Group hash which interferes with FacetWP

jquery__WEBPACK_IMPORTED_MODULE_0___default()().fancybox({
baseClass:"fancybox-images",
selector:'[data-fancybox="images"]',
hash:false});

/*
    $().fancybox({
      selector : '.fleet-column a.post-link',
      baseClass: "single-fleet",
    });
    */

jquery__WEBPACK_IMPORTED_MODULE_0___default()().fancybox({
baseClass:"fancybox-gallery",
selector:'[data-fancybox="gallery"]',
buttons:[//'share',
'fullScreen','close']});

}};


/***/},

/***/"./assets/js/modules/fixed-header.js":
/*!*******************************************!*\
  !*** ./assets/js/modules/fixed-header.js ***!
  \*******************************************/
/*! exports provided: default */
/***/function assetsJsModulesFixedHeaderJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var js_cookie__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! js-cookie */"./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */var js_cookie__WEBPACK_IMPORTED_MODULE_1___default=/*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */__webpack_exports__["default"]={
init:function init(){
(function(a){
if(typeof define==="function"&&__webpack_require__(/*! !webpack amd options */"./node_modules/webpack/buildin/amd-options.js")){
define(["jquery"],a);
}else {
a(jQuery);
}
})(function(a){
a.fn.addBack=a.fn.addBack||a.fn.andSelf;
a.fn.extend({
actual:function actual(b,l){
if(!this[b]){
throw '$.actual => The jQuery method "'+b+'" you called does not exist';
}

var f={
absolute:false,
clone:false,
includeMargin:false,
display:"block"};

var i=a.extend(f,l);
var e=this.eq(0);
var h,j;

if(i.clone===true){
h=function h(){
var m="position: absolute !important; top: -1000 !important; ";
e=e.clone().attr("style",m).appendTo("body");
};

j=function j(){
e.remove();
};
}else {
var g=[];
var d="";
var c;

h=function h(){
c=e.parents().addBack().filter(":hidden");
d+="visibility: hidden !important; display: "+i.display+" !important; ";

if(i.absolute===true){
d+="position: absolute !important; ";
}

c.each(function(){
var m=a(this);
var n=m.attr("style");
g.push(n);
m.attr("style",n?n+";"+d:d);
});
};

j=function j(){
c.each(function(m){
var o=a(this);
var n=g[m];

if(n===undefined){
o.removeAttr("style");
}else {
o.attr("style",n);
}
});
};
}

h();
var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();
j();
return k;
}});

});

var $stickyHeader=jquery__WEBPACK_IMPORTED_MODULE_0___default()(".sticky-header .site-header");
var $body=jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
var $wpAdminBar=0;
var height=0;
var showNotificationBar=js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('show-notification-bar');
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("load",function(){
if('no'===showNotificationBar){
return;
}

var $notificationBar=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-notification-bar');
$notificationBar.removeClass('hide');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass('logged-in')){
return;// ignore
}//height = $notificationBar.height() + $wpAdminBar;


height=$notificationBar.actual('height')+$wpAdminBar;
setTimeout(function(){
if(Foundation.MediaQuery.atLeast('xlarge')){
$body.css('top',height);
}else {
$body.css('top','auto');
$body.removeAttr('style');
}//$notificationBar.show();   

},3000);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("resize",function(){
var $notificationBar=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-notification-bar');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass('logged-in')){
return;// ignore
}

height=$notificationBar.height()+$wpAdminBar;

if(Foundation.MediaQuery.atLeast('xlarge')){
$body.css('top',height);
}else {
$body.removeAttr('style');
}
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("scroll",function(){
var $notificationBar=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-notification-bar');

if(!$notificationBar.length&&$notificationBar.not(":visible")){
$body.removeAttr('style');
$stickyHeader.removeAttr('style');
return;
}

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass('logged-in')){
return;// ignore
}

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop()>=height){
$stickyHeader.addClass("fixed");
$body.removeAttr('style');
}else {
$stickyHeader.removeClass("fixed");

if(Foundation.MediaQuery.atLeast('xlarge')){
$body.css('top',height);
}else {
$body.removeAttr('style');
}
}
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('close.zf.trigger','.section-notification-bar[data-closable]',function(e){
$body.css('top','auto');
$body.removeAttr('style');
$stickyHeader.removeAttr('style');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-notification-bar').remove();
js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('show-notification-bar','no',{
expires:1});

});
}};


/***/},

/***/"./assets/js/modules/foundation.js":
/*!*****************************************!*\
  !*** ./assets/js/modules/foundation.js ***!
  \*****************************************/
/*! exports provided: Foundation, CoreUtils, Box, onImagesLoaded, Keyboard, MediaQuery, Motion, Nest, Timer, Touch, Triggers, Accordion, AccordionMenu, DropdownMenu, Equalizer, ResponsiveMenu, ResponsiveToggle, Reveal, SmoothScroll, Tabs, Toggler, ResponsiveAccordionTabs, default */
/***/function assetsJsModulesFoundationJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! foundation-sites/js/foundation.core */"./node_modules/foundation-sites/js/foundation.core.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Foundation",function(){return foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"];});

/* harmony import */var foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! foundation-sites/js/foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony reexport (module object) */__webpack_require__.d(__webpack_exports__,"CoreUtils",function(){return foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__;});
/* harmony import */var foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! foundation-sites/js/foundation.util.box */"./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Box",function(){return foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_3__["Box"];});

/* harmony import */var foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! foundation-sites/js/foundation.util.imageLoader */"./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"onImagesLoaded",function(){return foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"];});

/* harmony import */var foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! foundation-sites/js/foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Keyboard",function(){return foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__["Keyboard"];});

/* harmony import */var foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! foundation-sites/js/foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MediaQuery",function(){return foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"];});

/* harmony import */var foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! foundation-sites/js/foundation.util.motion */"./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Motion",function(){return foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Motion"];});

/* harmony import */var foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! foundation-sites/js/foundation.util.nest */"./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Nest",function(){return foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__["Nest"];});

/* harmony import */var foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! foundation-sites/js/foundation.util.timer */"./node_modules/foundation-sites/js/foundation.util.timer.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Timer",function(){return foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__["Timer"];});

/* harmony import */var foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! foundation-sites/js/foundation.util.touch */"./node_modules/foundation-sites/js/foundation.util.touch.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Touch",function(){return foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__["Touch"];});

/* harmony import */var foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! foundation-sites/js/foundation.util.triggers */"./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Triggers",function(){return foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__["Triggers"];});

/* harmony import */var foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! foundation-sites/js/foundation.accordion */"./node_modules/foundation-sites/js/foundation.accordion.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Accordion",function(){return foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_12__["Accordion"];});

/* harmony import */var foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(/*! foundation-sites/js/foundation.accordionMenu */"./node_modules/foundation-sites/js/foundation.accordionMenu.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AccordionMenu",function(){return foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_13__["AccordionMenu"];});

/* harmony import */var foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(/*! foundation-sites/js/foundation.dropdownMenu */"./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DropdownMenu",function(){return foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_14__["DropdownMenu"];});

/* harmony import */var foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(/*! foundation-sites/js/foundation.equalizer */"./node_modules/foundation-sites/js/foundation.equalizer.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Equalizer",function(){return foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_15__["Equalizer"];});

/* harmony import */var foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(/*! foundation-sites/js/foundation.responsiveMenu */"./node_modules/foundation-sites/js/foundation.responsiveMenu.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ResponsiveMenu",function(){return foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__["ResponsiveMenu"];});

/* harmony import */var foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(/*! foundation-sites/js/foundation.responsiveToggle */"./node_modules/foundation-sites/js/foundation.responsiveToggle.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ResponsiveToggle",function(){return foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_17__["ResponsiveToggle"];});

/* harmony import */var foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(/*! foundation-sites/js/foundation.reveal */"./node_modules/foundation-sites/js/foundation.reveal.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Reveal",function(){return foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_18__["Reveal"];});

/* harmony import */var foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(/*! foundation-sites/js/foundation.smoothScroll */"./node_modules/foundation-sites/js/foundation.smoothScroll.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SmoothScroll",function(){return foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_19__["SmoothScroll"];});

/* harmony import */var foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(/*! foundation-sites/js/foundation.tabs */"./node_modules/foundation-sites/js/foundation.tabs.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Tabs",function(){return foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__["Tabs"];});

/* harmony import */var foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(/*! foundation-sites/js/foundation.toggler */"./node_modules/foundation-sites/js/foundation.toggler.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Toggler",function(){return foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__["Toggler"];});

/* harmony import */var foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(/*! foundation-sites/js/foundation.responsiveAccordionTabs */"./node_modules/foundation-sites/js/foundation.responsiveAccordionTabs.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ResponsiveAccordionTabs",function(){return foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_22__["ResponsiveAccordionTabs"];});












// import { Abide } from 'foundation-sites/js/foundation.abide';


// import { Drilldown } from 'foundation-sites/js/foundation.drilldown';
// import { Dropdown } from 'foundation-sites/js/foundation.dropdown';


// import { Interchange } from 'foundation-sites/js/foundation.interchange';
// import { Magellan } from 'foundation-sites/js/foundation.magellan';
// import { OffCanvas } from 'foundation-sites/js/foundation.offcanvas';
// import { Orbit } from 'foundation-sites/js/foundation.orbit';



// import { Slider } from 'foundation-sites/js/foundation.slider';

// import { Sticky } from 'foundation-sites/js/foundation.sticky';


//import { Tooltip } from 'foundation-sites/js/foundation.tooltip';


foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].addToJquery(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].rtl=foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].GetYoDigits=foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].transitionend=foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["transitionend"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].RegExpEscape=foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["RegExpEscape"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].onLoad=foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLoad"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Box=foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_3__["Box"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].onImagesLoaded=foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Keyboard=foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__["Keyboard"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].MediaQuery=foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Motion=foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Motion"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Move=foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Move"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Nest=foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__["Nest"];
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Timer=foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__["Timer"];// Touch and Triggers previously were almost purely sede effect driven,
// so no need to add it to Foundation, just init them.

foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);
foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a,foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"]);

foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"]._init();// Foundation.plugin(Abide, 'Abide');


foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_12__["Accordion"],'Accordion');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_13__["AccordionMenu"],'AccordionMenu');// Foundation.plugin(Drilldown, 'Drilldown');
// Foundation.plugin(Dropdown, 'Dropdown');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_14__["DropdownMenu"],'DropdownMenu');// Foundation.plugin(Equalizer, 'Equalizer');
// Foundation.plugin(Interchange, 'Interchange');
// Foundation.plugin(Magellan, 'Magellan');
// Foundation.plugin(OffCanvas, 'OffCanvas');
// Foundation.plugin(Orbit, 'Orbit');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__["ResponsiveMenu"],'ResponsiveMenu');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_17__["ResponsiveToggle"],'ResponsiveToggle');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_18__["Reveal"],'Reveal');// Foundation.plugin(Slider, 'Slider');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_19__["SmoothScroll"],'SmoothScroll');// Foundation.plugin(Sticky, 'Sticky');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__["Tabs"],'Tabs');
foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__["Toggler"],'Toggler');//Foundation.plugin(Tooltip, 'Tooltip');

foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_22__["ResponsiveAccordionTabs"],'ResponsiveAccordionTabs');

/* harmony default export */__webpack_exports__["default"]=foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"];

/***/},

/***/"./assets/js/modules/general.js":
/*!**************************************!*\
  !*** ./assets/js/modules/general.js ***!
  \**************************************/
/*! exports provided: default */
/***/function assetsJsModulesGeneralJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var clip_path__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! clip-path */"./node_modules/clip-path/dist/clippath.min.js");


/* harmony default export */__webpack_exports__["default"]={
init:function init(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass('window-loaded');// mega menu image hover

var hoverTimeout;
var $img=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-primary .menu-item-image .image img'),
dsrc=$img.attr('src');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-primary .menu-item a[data-image]').hover(function(){
//if( $img.attr('src') !== $(this).data('image')) {
$img.attr('src',jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('image'));
clearTimeout(hoverTimeout);//}
},function(){
hoverTimeout=setTimeout(function(){
$img.attr('src',dsrc);
},1000);
});// Fleet details

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.fleet-ajax footer h4').matchHeight({
row:true});
// $('.section-commitment .panel .text').matchHeight({row:true});
}};


/***/},

/***/"./assets/js/modules/object-fit.js":
/*!*****************************************!*\
  !*** ./assets/js/modules/object-fit.js ***!
  \*****************************************/
/*! exports provided: default */
/***/function assetsJsModulesObjectFitJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */__webpack_exports__["default"]={
init:function init(){
if(!Modernizr.objectfit){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.object-fit-parent').each(function(){
var $container=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
imgUrl=$container.find('img').prop('src');

if(imgUrl){
$container.css('backgroundImage','url('+imgUrl+')').addClass('compat-object-fit');
}
});
}
}};


/***/},

/***/"./assets/js/modules/scrollreveal.js":
/*!*******************************************!*\
  !*** ./assets/js/modules/scrollreveal.js ***!
  \*******************************************/
/*! exports provided: default */
/***/function assetsJsModulesScrollrevealJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var scrollreveal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! scrollreveal */"./node_modules/scrollreveal/dist/scrollreveal.es.js");


/* harmony default export */__webpack_exports__["default"]={
init:function init(){

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.is-mobile .block-hero .play-video').addClass('revealed');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.is-mobile .section-hero .play-video').addClass('revealed');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.is-mobile .block-content .cell .play-video').addClass('revealed');// https://scrollrevealjs.org/api/defaults.html

var ID=function ID(){
// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
return '_'+Math.random().toString(36).substr(2,9);
};

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.load-hidden').each(function(){
if(!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id')){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id',ID);
}
});// ScrollReveal({ mobile: false });

/*
        Blocks
    */

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-hero',{
delay:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-hero h1',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-hero p',{
delay:800,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-hero h3',{
delay:1200,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-hero .button',{
delay:1600,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-hero .play-video',{
delay:2000,
scale:0.1,
afterReveal:function afterReveal(el){
el.classList.add('revealed');
}});
// Services

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-services');
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-services .grid-item',{
delay:400,
distance:'100%',
interval:200});
//ScrollReveal().reveal( '.is-desktop .block-erickson-advantage' );

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-erickson-advantage header',{
delay:200,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-erickson-advantage .slider',{
delay:400,
distance:'100%'});
// Featured Post

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-featured-post');
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.block-featured-post header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.block-featured-post .grid .cell',{
delay:800,
interval:250,
distance:'100%'});
// Customers

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-customers');
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-customers header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-customers .logos li',{
easing:"ease-out",
delay:800,
interval:200,
origin:'bottom',
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-approach header',{
distance:'100%'});

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-approach .grid-margin-bottom .cell').each(function(){
if(!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id')){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id',ID);
}
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-approach .grid-margin-bottom .cell').each(function(index,element){
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop #'+element.id,{
delay:400,
origin:index%2?'left':'right',
distance:'100%',
interval:400});

});
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-results header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-clients',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-clients header',{
delay:400,
distance:'100%',
interval:200});
// Service Gallery

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-service-gallery header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-service-gallery .slick',{
delay:400,
distance:'100%',
interval:200});
//ScrollReveal().reveal( '.is-desktop .section-case-studies' );

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-case-studies header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-case-studies article',{
delay:800,
interval:250,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-mission-vision',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-benefits header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-benefits .grid .cell',{
delay:400,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-columns header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-columns .grid .cell',{
delay:400,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-columns.background-color-gray',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-columns.background-color-gray header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-columns.background-color-gray.grid .cell',{
delay:800,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-commitment',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-commitment header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-commitment .grid .cell',{
delay:400,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-awards header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-awards .grid .cell',{
delay:400,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-core-values header',{
distance:'100%',
afterReveal:function afterReveal(el){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-core-values .slider').show();
}});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-core-values .grid .cell',{
delay:400,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-testimonials',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-testimonials .slider',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-values');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-values .cell').each(function(){
if(!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id')){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id',ID);
}
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.is-desktop .block-values .cell').each(function(index,element){
console.log(element.id);
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('#'+element.id,{
delay:400,
origin:index%2?'left':'right',
distance:'100%',
interval:400});

});
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-jobs header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-jobs .entry-content',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-content',{
delay:400,
origin:'bottom',
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .block-content .cell',{
delay:800,
origin:'bottom',
distance:'100%',
interval:400,
afterReveal:function afterReveal(el){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-content .cell .play-video').addClass('revealed');
}});

/*
        Pages
    */

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero',{
delay:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero:not(.has-background-image) h1:not(.no-reveal)',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero.has-background-image h1',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero p',{
delay:800,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero h3',{
delay:1200,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero .button',{
delay:1600,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-hero .play-video',{
delay:2000,
scale:0.1,
afterReveal:function afterReveal(el){
el.classList.add('revealed');
}});
// History

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-history .section-hero .hero-content img',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-history .section-hero .hero-content h1',{
delay:800,
origin:'bottom',
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-history .section-introduction',{
delay:800,
origin:'bottom',
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-history .section-timeline .facetwp-facet',{
delay:800,
origin:'bottom',
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-history .section-timeline .facetwp-template',{
delay:800,
origin:'bottom',
distance:'100%'});

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.is-desktop .page-template-history .section-timeline .facetwp-template').each(function(index,element){
//var id = $(element).attr('id'); 
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.event',{
delay:1200,
distance:'100%',
interval:400});

});
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-history .facetwp-type-pager',{
delay:200,
distance:'100%'});


(function($){
$(document).on('facetwp-loaded',function(){
$('.page-template-history .facetwp-template article, .page-template-history .facetwp-type-pager').css({
opacity:1,
visibility:'visible'});

});
})(jQuery);// Team


Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-team .facetwp-facet',{
delay:800,
origin:'bottom',
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-team .facetwp-template .cell',{
delay:800,
origin:'bottom',
distance:'100%',
interval:400});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .page-template-team .facetwp-type-pager',{
delay:200,
distance:'100%'});


(function($){
$(document).on('facetwp-loaded',function(){
$('.page-template-team .facetwp-template .cell, .page-template-team .facetwp-pager').css({
opacity:1,
visibility:'visible'});

});
})(jQuery);// Contact


Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-form-directory .cell',{
delay:400,
origin:'bottom',
distance:'100%',
interval:400});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-offices',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-offices header',{
delay:400,
distance:'100%'});
// Related Posts

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-related-posts');
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-related-posts header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-related-posts article',{
delay:800,
interval:250,
distance:'100%'});
// Posts

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-posts');
Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-posts header',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop .section-posts article',{
delay:800,
interval:250,
distance:'100%'});
// Fleet

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-fleet #secondary h2',{
distance:'100%'});

/*
    
    ScrollReveal().reveal( '.is-desktop.post-type-archive-fleet #secondary li', { 
        delay: 400,
        distance: '100%',
        interval: 200
    });
    */

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-fleet #primary .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-fleet #primary .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Case Studies Archive

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-case_study header',{
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-case_study .facetwp-filters',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-case_study .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-case_study .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Photo gallery

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.template-photo-gallery .facetwp-filters',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.template-photo-gallery .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});


(function($){
$(document).on('facetwp-loaded',function(){
$('.template-photo-gallery .facetwp-template article').css({
opacity:1,
visibility:'visible'});

});
})(jQuery);

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.template-photo-gallery .facetwp-type-pager',{
delay:200,
distance:'100%'});
// video Gallery

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-video_gallery .facetwp-filters',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-video_gallery .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.post-type-archive-video_gallery .facetwp-type-pager',{
delay:200,
distance:'100%'});
// Archive

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.archive .section-hero',{
delay:200});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.archive .facetwp-filters',{
delay:400,
distance:'100%'});

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.archive .facetwp-template article',{
delay:800,
distance:'100%',
interval:200});


(function($){
$(document).on('facetwp-loaded',function(){
$('.archive .facetwp-template article').css({
opacity:1,
visibility:'visible'});

});
})(jQuery);

Object(scrollreveal__WEBPACK_IMPORTED_MODULE_1__["default"])().reveal('.is-desktop.archive .facetwp-pager',{
delay:200,
distance:'100%'});

}};


/***/},

/***/"./assets/js/modules/slick.js":
/*!************************************!*\
  !*** ./assets/js/modules/slick.js ***!
  \************************************/
/*! exports provided: default */
/***/function assetsJsModulesSlickJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! slick-carousel/slick/slick */"./node_modules/slick-carousel/slick/slick.js");
/* harmony import */var imagesloaded__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! imagesloaded */"./node_modules/imagesloaded/imagesloaded.js");



/* harmony default export */__webpack_exports__["default"]={
init:function init(){
var $heroSlider=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-hero .slider, .block-hero .slider');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$heroSlider).length){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$heroSlider).on('init',function(){
$heroSlider.css({
opacity:1,
visibility:'visible'});

});
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$heroSlider).slick({
fade:true,
autoplay:true,
infinite:true,
adaptiveHeight:false,
dots:false,
speed:2000,
autoplaySpeed:4000,
arrows:false,
rows:0,
lazyLoad:'progressive'//nextArrow: $('.slick-next', $heroSlider),
//prevArrow: $('.slick-prev', $heroSlider),
});

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$heroSlider).on("lazyLoaded",function(e,slick,image,imageSource){
var parentSlide=jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).parent(".slick-slide",$heroSlider);
parentSlide.css("background-image",'url("'+imageSource+'")').addClass("loaded");//replace with background instead

image.remove();// remove source
});
}// About - history


var $tabsSlider=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-advantage .slider, .block-erickson-advantage .slider');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$tabsSlider).length){
$tabsSlider.imagesLoaded({
background:true}).
done(function(instance){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$tabsSlider).slick({
fade:true,
autoplay:false,
infinite:true,
adaptiveHeight:false,
arrows:true,
dots:false,
rows:0,

/*customPaging : function(slider, i) {
              let title = $(slider.$slides[i]).find('h3').text();
              return title;
          },*/
speed:300,
nextArrow:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-next',$tabsSlider),
prevArrow:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-prev',$tabsSlider),
responsive:[{
breakpoint:991,
settings:{
adaptiveHeight:true,
dots:true}}]});



$tabsSlider.prepend(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$tabsSlider).find('.slick-dots'));
$tabsSlider.addClass('images-loaded');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-advantage .slick-tabs, .block-erickson-advantage .slick-tabs').on('click','li',function(){
var index=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).index();
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings().removeClass('active');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$tabsSlider).slick('slickGoTo',index);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active');
});
$tabsSlider.on('afterChange',function(event,slick,currentSlide){
console.log(currentSlide);
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-erickson-advantage .slick-tabs').find('li').removeClass('active').eq(currentSlide).addClass('active');
});
});
}

var $coreValues=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-core-values .slider');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$coreValues).length){
$coreValues.imagesLoaded().done(function(instance){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="slick-arrows"></div>').insertAfter('.block-core-values .slick');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$coreValues).slick({
fade:true,
autoplay:false,
infinite:true,
adaptiveHeight:true,
arrows:true,
dots:true,
rows:0,
speed:300,
appendArrows:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-core-values .slick-arrows')});

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-core-values').addClass('images-loaded');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.block-core-values .grid').on('click','.grid-item',function(e){
//e.preventDefault();
var slideIndex=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().index();
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$coreValues).slick('slickGoTo',parseInt(slideIndex));
});
});
}// Careers - Testimonials


var $testimonialsSlider=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-testimonials .slider, .block-testimonials .slider');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$testimonialsSlider).length){
$testimonialsSlider.imagesLoaded().done(function(instance){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$testimonialsSlider).slick({
fade:true,
autoplay:false,
infinite:true,
adaptiveHeight:true,
arrows:true,
dots:false,
rows:0,

/*
          customPaging : function(slider, i) {
              let number = i+1;
              number = number.toString().padStart(2, '0');
              return '<a class="dot">'+number+'</a>';
          },
          */
speed:300,
nextArrow:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-next',$testimonialsSlider),
prevArrow:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-prev',$testimonialsSlider)});

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wrap',$testimonialsSlider).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$testimonialsSlider).find('.slick-dots'));
$testimonialsSlider.addClass('images-loaded');
});
}

var $serviceGallerySlider=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.section-service-gallery .slider, .block-photo-gallery .slider');

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$serviceGallerySlider).length){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$serviceGallerySlider).on('init',function(){
$serviceGallerySlider.css({
opacity:1,
visibility:'visible'});

});
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$serviceGallerySlider).slick({
autoplay:false,
infinite:true,
adaptiveHeight:false,
dots:false,
//speed: 2000,
//autoplaySpeed: 4000,
arrows:true,
rows:0,
slidesToShow:1,
centerMode:true,
variableWidth:true,
lazyLoad:'progressive',
nextArrow:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-next',$serviceGallerySlider),
prevArrow:jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-prev',$serviceGallerySlider),
responsive:[{
breakpoint:991,
settings:{
arrows:false,
dots:true,
centerMode:false}}]});



jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick',$serviceGallerySlider).on("lazyLoaded",function(e,slick,image,imageSource){
var parentSlide=jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).parents(".slick-slide",$serviceGallerySlider);
parentSlide.find('.background-image').css("background-image",'url("'+imageSource+'")').addClass("loaded");//replace with background instead

image.remove();// remove source
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-slider',$serviceGallerySlider).on('click','.slick-slide',function(e){
e.stopPropagation();
var index=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("slick-index");

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-slider').slick('slickCurrentSlide')!==index){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-slider').slick('slickGoTo',index);
}
});
}
}};


/***/},

/***/"./assets/js/modules/smooth-scroll.js":
/*!********************************************!*\
  !*** ./assets/js/modules/smooth-scroll.js ***!
  \********************************************/
/*! exports provided: default */
/***/function assetsJsModulesSmoothScrollJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var foundation_sites_js_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! foundation-sites/js/foundation.smoothScroll */"./node_modules/foundation-sites/js/foundation.smoothScroll.js");


/* harmony default export */__webpack_exports__["default"]={
init:function init(){
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
}};


/***/},

/***/"./assets/js/project.js":
/*!******************************!*\
  !*** ./assets/js/project.js ***!
  \******************************/
/*! no exports provided */
/***/function assetsJsProjectJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _loader_ModuleLoader__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./loader/ModuleLoader */"./assets/js/loader/ModuleLoader.js");
/* harmony import */var _modules_foundation__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./modules/foundation */"./assets/js/modules/foundation.js");
/* harmony import */var _modules_acf_map__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./modules/acf-map */"./assets/js/modules/acf-map.js");
/* harmony import */var _modules_animate_numbers__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./modules/animate-numbers */"./assets/js/modules/animate-numbers.js");
/* harmony import */var what_input__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! what-input */"./node_modules/what-input/dist/what-input.js");
/* harmony import */var jquery_match_height__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! jquery-match-height */"./node_modules/jquery-match-height/dist/jquery.matchHeight.js");
/* harmony import */var _modules_external_links__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./modules/external-links */"./assets/js/modules/external-links.js");
/* harmony import */var _modules_facetwp__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ./modules/facetwp */"./assets/js/modules/facetwp.js");
/* harmony import */var _modules_fixed_header__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ./modules/fixed-header */"./assets/js/modules/fixed-header.js");
/* harmony import */var _modules_general__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ./modules/general */"./assets/js/modules/general.js");
/* harmony import */var _modules_object_fit__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ./modules/object-fit */"./assets/js/modules/object-fit.js");
/* harmony import */var _modules_slick__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! ./modules/slick */"./assets/js/modules/slick.js");
/* harmony import */var _modules_smooth_scroll__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(/*! ./modules/smooth-scroll */"./assets/js/modules/smooth-scroll.js");
/* harmony import */var _modules_accordion_fix__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(/*! ./modules/accordion-fix */"./assets/js/modules/accordion-fix.js");
/* harmony import */var _modules_fancybox__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(/*! ./modules/fancybox */"./assets/js/modules/fancybox.js");
/* harmony import */var _modules_scrollreveal__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(/*! ./modules/scrollreveal */"./assets/js/modules/scrollreveal.js");

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


var modules=new _loader_ModuleLoader__WEBPACK_IMPORTED_MODULE_1__["default"]({
acfMap:_modules_acf_map__WEBPACK_IMPORTED_MODULE_3__["default"],
animateNumbers:_modules_animate_numbers__WEBPACK_IMPORTED_MODULE_4__["default"],
externalLinks:_modules_external_links__WEBPACK_IMPORTED_MODULE_7__["default"],
facetWp:_modules_facetwp__WEBPACK_IMPORTED_MODULE_8__["default"],
fancyBox:_modules_fancybox__WEBPACK_IMPORTED_MODULE_15__["default"],
fixedHeader:_modules_fixed_header__WEBPACK_IMPORTED_MODULE_9__["default"],
general:_modules_general__WEBPACK_IMPORTED_MODULE_10__["default"],
// inlineSvg,
// modalVideo,
objectFit:_modules_object_fit__WEBPACK_IMPORTED_MODULE_11__["default"],
// responsiveVideoEmbed,
// search,
slick:_modules_slick__WEBPACK_IMPORTED_MODULE_12__["default"],
smoothScroll:_modules_smooth_scroll__WEBPACK_IMPORTED_MODULE_13__["default"],
// superfish
//backgroundVideo,
//menuToggle,
accordionFix:_modules_accordion_fix__WEBPACK_IMPORTED_MODULE_14__["default"],
scrollReveal:_modules_scrollreveal__WEBPACK_IMPORTED_MODULE_16__["default"]});

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).foundation();
modules.init();
});

/***/},

/***/"./assets/scss/editor.scss":
/*!*********************************!*\
  !*** ./assets/scss/editor.scss ***!
  \*********************************/
/*! no static exports found */
/***/function assetsScssEditorScss(module,exports){

// removed by extract-text-webpack-plugin

/***/},

/***/"./assets/scss/login.scss":
/*!********************************!*\
  !*** ./assets/scss/login.scss ***!
  \********************************/
/*! no static exports found */
/***/function assetsScssLoginScss(module,exports){

// removed by extract-text-webpack-plugin

/***/},

/***/"./assets/scss/style.scss":
/*!********************************!*\
  !*** ./assets/scss/style.scss ***!
  \********************************/
/*! no static exports found */
/***/function assetsScssStyleScss(module,exports){

// removed by extract-text-webpack-plugin

/***/},

/***/0:
/*!****************************************************************************************************************!*\
  !*** multi ./assets/js/project.js ./assets/scss/style.scss ./assets/scss/login.scss ./assets/scss/editor.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/function _(module,exports,__webpack_require__){

__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/js/project.js */"./assets/js/project.js");
__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/scss/style.scss */"./assets/scss/style.scss");
__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/scss/login.scss */"./assets/scss/login.scss");
module.exports=__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/scss/editor.scss */"./assets/scss/editor.scss");


/***/},

/***/"jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/function jquery(module,exports){

module.exports=jQuery;

/***/}},

[[0,"/js/manifest","/js/vendor"]]]);

}());

//# sourceMappingURL=project.js.map