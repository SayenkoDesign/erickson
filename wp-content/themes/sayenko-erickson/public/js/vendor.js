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

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

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

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

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

var $findIndex = arrayIteration.findIndex;



var FIND_INDEX = 'findIndex';
var SKIPS_HOLES$1 = true;

var USES_TO_LENGTH$2 = arrayMethodUsesToLength(FIND_INDEX);

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$2 }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $forEach$1 = arrayIteration.forEach;



var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH$3) ? function forEach(callbackfn /* , thisArg */) {
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
var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$4 }, {
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

var nativeJoin = [].join;

var ES3_STRINGS = indexedObject != Object;
var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

var $map = arrayIteration.map;



var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$5 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$2 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$2(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$2(true)
};

var $reduce = arrayReduce.left;



var STRICT_METHOD$3 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$6 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$7 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$2 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$7 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$2];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var $some = arrayIteration.some;



var STRICT_METHOD$4 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$8 = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$8 }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD$5 = arrayMethodIsStrict('sort');

var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$5;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction$1(comparefn));
  }
});

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$9 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max$2 = Math.max;
var min$2 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$9 }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var defineProperty$4 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$4(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

// `Math.sign` method implementation
// https://tc39.github.io/ecma262/#sec-math.sign
var mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

// `Math.sign` method
// https://tc39.github.io/ecma262/#sec-math.sign
_export({ target: 'Math', stat: true }, {
  sign: mathSign
});

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$3 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};

var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var defineProperty$5 = objectDefineProperty.f;
var trim = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys$1.length > j; j++) {
    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
var thisNumberValue = function (value) {
  if (typeof value != 'number' && classofRaw(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
var stringRepeat = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

var nativeToFixed = 1.0.toFixed;
var floor$1 = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED$2 = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
_export({ target: 'Number', proto: true, forced: FORCED$2 }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor$1(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor$1(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + stringRepeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + stringRepeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

var nativeAssign = Object.assign;
var defineProperty$6 = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$6({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$6(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

var FAILS_ON_PRIMITIVES = fails(function () { objectGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
_export({ target: 'Object', stat: true }, {
  setPrototypeOf: objectSetPrototypeOf
});

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

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

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

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

var SPECIES$3 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var defineProperty$7 = objectDefineProperty.f;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;





var setInternalState$2 = internalState.set;



var MATCH$1 = wellKnownSymbol('match');
var NativeRegExp = global_1.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

var FORCED$3 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
  re2[MATCH$1] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED$3) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y$1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y$1 && sticky) setInternalState$2(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$7(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys$2 = getOwnPropertyNames$1(NativeRegExp);
  var index = 0;
  while (keys$2.length > index) proxy(keys$2[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global_1, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

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

var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
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
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

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
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$4 = function (CONVERT_TO_STRING) {
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
  codeAt: createMethod$4(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$4(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$3 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$3(this, {
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







var SPECIES$4 = wellKnownSymbol('species');

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
      re.constructor[SPECIES$4] = function () { return re; };
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

// @@match logic
fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regexpExecAbstract(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

var max$3 = Math.max;
var min$3 = Math.min;
var floor$2 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$3(min$3(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$2(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// @@search logic
fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regexpExecAbstract(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var SPECIES$5 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
};

var arrayPush = [].push;
var min$4 = Math.min;
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
          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim;


// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

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

function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr,i){if(!(Symbol.iterator in Object(arr)||Object.prototype.toString.call(arr)==="[object Arguments]")){return;}var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(typeof call==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["/js/vendor"],{

/***/"./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js":
/*!******************************************************************!*\
  !*** ./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js ***!
  \******************************************************************/
/*! no static exports found */
/***/function node_modulesFancyappsFancyboxDistJqueryFancyboxJs(module,exports){

// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
(function(window,document,$,undefined$1){

window.console=window.console||{
info:function info(stuff){}};


// If there's no jQuery, fancyBox can't work
// =========================================

if(!$){
return;
}

// Check if fancyBox is already initialized
// ========================================

if($.fn.fancybox){
console.info("fancyBox already initialized");

return;
}

// Private default settings
// ========================

var defaults={
// Close existing modals
// Set this to false if you do not need to stack multiple instances
closeExisting:false,

// Enable infinite gallery navigation
loop:false,

// Horizontal space between slides
gutter:50,

// Enable keyboard navigation
keyboard:true,

// Should allow caption to overlap the content
preventCaptionOverlap:true,

// Should display navigation arrows at the screen edges
arrows:true,

// Should display counter at the top left corner
infobar:true,

// Should display close button (using `btnTpl.smallBtn` template) over the content
// Can be true, false, "auto"
// If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
smallBtn:"auto",

// Should display toolbar (buttons at the top)
// Can be true, false, "auto"
// If "auto" - will be automatically hidden if "smallBtn" is enabled
toolbar:"auto",

// What buttons should appear in the top right corner.
// Buttons will be created using templates from `btnTpl` option
// and they will be placed into toolbar (class="fancybox-toolbar"` element)
buttons:[
"zoom",
//"share",
"slideShow",
//"fullScreen",
//"download",
"thumbs",
"close"],


// Detect "idle" time in seconds
idleTime:3,

// Disable right-click and use simple image protection for images
protect:false,

// Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
modal:false,

image:{
// Wait for images to load before displaying
//   true  - wait for image to load and then display;
//   false - display thumbnail and load the full-sized image over top,
//           requires predefined image dimensions (`data-width` and `data-height` attributes)
preload:false},


ajax:{
// Object containing settings for ajax request
settings:{
// This helps to indicate that request comes from the modal
// Feel free to change naming
data:{
fancybox:true}}},




iframe:{
// Iframe template
tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',

// Preload iframe before displaying it
// This allows to calculate iframe content width and height
// (note: Due to "Same Origin Policy", you can't get cross domain data).
preload:true,

// Custom CSS styling for iframe wrapping element
// You can use this to set custom iframe dimensions
css:{},

// Iframe tag attributes
attr:{
scrolling:"auto"}},



// For HTML5 video only
video:{
tpl:'<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">'+
'<source src="{{src}}" type="{{format}}" />'+
'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!'+
"</video>",
format:"",// custom video format
autoStart:true},


// Default content type if cannot be detected automatically
defaultType:"image",

// Open/close animation type
// Possible values:
//   false            - disable
//   "zoom"           - zoom images from/to thumbnail
//   "fade"
//   "zoom-in-out"
//
animationEffect:"zoom",

// Duration in ms for open/close animation
animationDuration:366,

// Should image change opacity while zooming
// If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
zoomOpacity:"auto",

// Transition effect between slides
//
// Possible values:
//   false            - disable
//   "fade'
//   "slide'
//   "circular'
//   "tube'
//   "zoom-in-out'
//   "rotate'
//
transitionEffect:"fade",

// Duration in ms for transition animation
transitionDuration:366,

// Custom CSS class for slide element
slideClass:"",

// Custom CSS class for layout
baseClass:"",

// Base template for layout
baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1">'+
'<div class="fancybox-bg"></div>'+
'<div class="fancybox-inner">'+
'<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>'+
'<div class="fancybox-toolbar">{{buttons}}</div>'+
'<div class="fancybox-navigation">{{arrows}}</div>'+
'<div class="fancybox-stage"></div>'+
'<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>'+
"</div>"+
"</div>",

// Loading indicator template
spinnerTpl:'<div class="fancybox-loading"></div>',

// Error message template
errorTpl:'<div class="fancybox-error"><p>{{ERROR}}</p></div>',

btnTpl:{
download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>'+
"</a>",

zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>'+
"</button>",

close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>'+
"</button>",

// Arrows
arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">'+
'<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>'+
"</button>",

arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">'+
'<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>'+
"</button>",

// This small close button will be appended to your html/inline/ajax content by default,
// if "smallBtn" option is not set to false
smallBtn:'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>'+
"</button>"},


// Container is injected into this element
parentEl:"body",

// Hide browser vertical scrollbars; use at your own risk
hideScrollbar:true,

// Focus handling
// ==============

// Try to focus on the first focusable element after opening
autoFocus:true,

// Put focus back to active element after closing
backFocus:true,

// Do not let user to focus on element outside modal content
trapFocus:true,

// Module specific options
// =======================

fullScreen:{
autoStart:false},


// Set `touch: false` to disable panning/swiping
touch:{
vertical:true,// Allow to drag content vertically
momentum:true// Continue movement after releasing mouse/touch when panning
},

// Hash value when initializing manually,
// set `false` to disable hash change
hash:null,

// Customize or add new media types
// Example:
/*
      media : {
        youtube : {
          params : {
            autoplay : 0
          }
        }
      }
    */
media:{},

slideShow:{
autoStart:false,
speed:3000},


thumbs:{
autoStart:false,// Display thumbnails on opening
hideOnClose:true,// Hide thumbnail grid when closing animation starts
parentEl:".fancybox-container",// Container is injected into this element
axis:"y"// Vertical (y) or horizontal (x) scrolling
},

// Use mousewheel to navigate gallery
// If 'auto' - enabled for images only
wheel:"auto",

// Callbacks
//==========

// See Documentation/API/Events for more information
// Example:
/*
      afterShow: function( instance, current ) {
        console.info( 'Clicked element:' );
        console.info( current.opts.$orig );
      }
    */

onInit:$.noop,// When instance has been initialized

beforeLoad:$.noop,// Before the content of a slide is being loaded
afterLoad:$.noop,// When the content of a slide is done loading

beforeShow:$.noop,// Before open animation starts
afterShow:$.noop,// When content is done loading and animating

beforeClose:$.noop,// Before the instance attempts to close. Return false to cancel the close.
afterClose:$.noop,// After instance has been closed

onActivate:$.noop,// When instance is brought to front
onDeactivate:$.noop,// When other instance has been activated

// Interaction
// ===========

// Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
// each option can be string or method that returns value.
//
// Possible values:
//   "close"           - close instance
//   "next"            - move to next gallery item
//   "nextOrClose"     - move to next gallery item or close if gallery has only one item
//   "toggleControls"  - show/hide controls
//   "zoom"            - zoom image (if loaded)
//   false             - do nothing

// Clicked on the content
clickContent:function clickContent(current,event){
return current.type==="image"?"zoom":false;
},

// Clicked on the slide
clickSlide:"close",

// Clicked on the background (backdrop) element;
// if you have not changed the layout, then most likely you need to use `clickSlide` option
clickOutside:"close",

// Same as previous two, but for double click
dblclickContent:false,
dblclickSlide:false,
dblclickOutside:false,

// Custom options when mobile device is detected
// =============================================

mobile:{
preventCaptionOverlap:false,
idleTime:false,
clickContent:function clickContent(current,event){
return current.type==="image"?"toggleControls":false;
},
clickSlide:function clickSlide(current,event){
return current.type==="image"?"toggleControls":"close";
},
dblclickContent:function dblclickContent(current,event){
return current.type==="image"?"zoom":false;
},
dblclickSlide:function dblclickSlide(current,event){
return current.type==="image"?"zoom":false;
}},


// Internationalization
// ====================

lang:"en",
i18n:{
en:{
CLOSE:"Close",
NEXT:"Next",
PREV:"Previous",
ERROR:"The requested content cannot be loaded. <br/> Please try again later.",
PLAY_START:"Start slideshow",
PLAY_STOP:"Pause slideshow",
FULL_SCREEN:"Full screen",
THUMBS:"Thumbnails",
DOWNLOAD:"Download",
SHARE:"Share",
ZOOM:"Zoom"},

de:{
CLOSE:"Schlie&szlig;en",
NEXT:"Weiter",
PREV:"Zur&uuml;ck",
ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
PLAY_START:"Diaschau starten",
PLAY_STOP:"Diaschau beenden",
FULL_SCREEN:"Vollbild",
THUMBS:"Vorschaubilder",
DOWNLOAD:"Herunterladen",
SHARE:"Teilen",
ZOOM:"Vergr&ouml;&szlig;ern"}}};




// Few useful variables and methods
// ================================

var $W=$(window);
var $D=$(document);

var called=0;

// Check if an object is a jQuery object and not a native JavaScript object
// ========================================================================
var isQuery=function isQuery(obj){
return obj&&obj.hasOwnProperty&&obj instanceof $;
};

// Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
// ===============================================================================
var requestAFrame=function(){
return(
window.requestAnimationFrame||
window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||
window.oRequestAnimationFrame||
// if all else fails, use setTimeout
function(callback){
return window.setTimeout(callback,1000/60);
});

}();

var cancelAFrame=function(){
return(
window.cancelAnimationFrame||
window.webkitCancelAnimationFrame||
window.mozCancelAnimationFrame||
window.oCancelAnimationFrame||
function(id){
window.clearTimeout(id);
});

}();

// Detect the supported transition-end event property name
// =======================================================
var transitionEnd=function(){
var el=document.createElement("fakeelement"),
t;

var transitions={
transition:"transitionend",
OTransition:"oTransitionEnd",
MozTransition:"transitionend",
WebkitTransition:"webkitTransitionEnd"};


for(t in transitions){
if(el.style[t]!==undefined$1){
return transitions[t];
}
}

return "transitionend";
}();

// Force redraw on an element.
// This helps in cases where the browser doesn't redraw an updated element properly
// ================================================================================
var forceRedraw=function forceRedraw($el){
return $el&&$el.length&&$el[0].offsetHeight;
};

// Exclude array (`buttons`) options from deep merging
// ===================================================
var mergeOpts=function mergeOpts(opts1,opts2){
var rez=$.extend(true,{},opts1,opts2);

$.each(opts2,function(key,value){
if($.isArray(value)){
rez[key]=value;
}
});

return rez;
};

// How much of an element is visible in viewport
// =============================================

var inViewport=function inViewport(elem){
var elemCenter,rez;

if(!elem||elem.ownerDocument!==document){
return false;
}

$(".fancybox-container").css("pointer-events","none");

elemCenter={
x:elem.getBoundingClientRect().left+elem.offsetWidth/2,
y:elem.getBoundingClientRect().top+elem.offsetHeight/2};


rez=document.elementFromPoint(elemCenter.x,elemCenter.y)===elem;

$(".fancybox-container").css("pointer-events","");

return rez;
};

// Class definition
// ================

var FancyBox=function FancyBox(content,opts,index){
var self=this;

self.opts=mergeOpts({
index:index},
$.fancybox.defaults);

if($.isPlainObject(opts)){
self.opts=mergeOpts(self.opts,opts);
}

if($.fancybox.isMobile){
self.opts=mergeOpts(self.opts,self.opts.mobile);
}

self.id=self.opts.id||++called;

self.currIndex=parseInt(self.opts.index,10)||0;
self.prevIndex=null;

self.prevPos=null;
self.currPos=0;

self.firstRun=true;

// All group items
self.group=[];

// Existing slides (for current, next and previous gallery items)
self.slides={};

// Create group elements
self.addContent(content);

if(!self.group.length){
return;
}

self.init();
};

$.extend(FancyBox.prototype,{
// Create DOM structure
// ====================

init:function init(){
var self=this,
firstItem=self.group[self.currIndex],
firstItemOpts=firstItem.opts,
$container,
buttonStr;

if(firstItemOpts.closeExisting){
$.fancybox.close(true);
}

// Hide scrollbars
// ===============

$("body").addClass("fancybox-active");

if(
!$.fancybox.getInstance()&&
firstItemOpts.hideScrollbar!==false&&
!$.fancybox.isMobile&&
document.body.scrollHeight>window.innerHeight)
{
$("head").append(
'<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:'+(
window.innerWidth-document.documentElement.clientWidth)+
"px;}</style>");


$("body").addClass("compensate-for-scrollbar");
}

// Build html markup and set references
// ====================================

// Build html code for buttons and insert into main template
buttonStr="";

$.each(firstItemOpts.buttons,function(index,value){
buttonStr+=firstItemOpts.btnTpl[value]||"";
});

// Create markup from base template, it will be initially hidden to
// avoid unnecessary work like painting while initializing is not complete
$container=$(
self.translate(
self,
firstItemOpts.baseTpl.
replace("{{buttons}}",buttonStr).
replace("{{arrows}}",firstItemOpts.btnTpl.arrowLeft+firstItemOpts.btnTpl.arrowRight))).


attr("id","fancybox-container-"+self.id).
addClass(firstItemOpts.baseClass).
data("FancyBox",self).
appendTo(firstItemOpts.parentEl);

// Create object holding references to jQuery wrapped nodes
self.$refs={
container:$container};


["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(item){
self.$refs[item]=$container.find(".fancybox-"+item);
});

self.trigger("onInit");

// Enable events, deactive previous instances
self.activate();

// Build slides, load and reveal content
self.jumpTo(self.currIndex);
},

// Simple i18n support - replaces object keys found in template
// with corresponding values
// ============================================================

translate:function translate(obj,str){
var arr=obj.opts.i18n[obj.opts.lang]||obj.opts.i18n.en;

return str.replace(/\{\{(\w+)\}\}/g,function(match,n){
return arr[n]===undefined$1?match:arr[n];
});
},

// Populate current group with fresh content
// Check if each object has valid type and content
// ===============================================

addContent:function addContent(content){
var self=this,
items=$.makeArray(content),
thumbs;

$.each(items,function(i,item){
var obj={},
opts={},
$item,
type,
found,
src,
srcParts;

// Step 1 - Make sure we have an object
// ====================================

if($.isPlainObject(item)){
// We probably have manual usage here, something like
// $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

obj=item;
opts=item.opts||item;
}else if($.type(item)==="object"&&$(item).length){
// Here we probably have jQuery collection returned by some selector
$item=$(item);

// Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
opts=$item.data()||{};
opts=$.extend(true,{},opts,opts.options);

// Here we store clicked element
opts.$orig=$item;

obj.src=self.opts.src||opts.src||$item.attr("href");

// Assume that simple syntax is used, for example:
//   `$.fancybox.open( $("#test"), {} );`
if(!obj.type&&!obj.src){
obj.type="inline";
obj.src=item;
}
}else {
// Assume we have a simple html code, for example:
//   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
obj={
type:"html",
src:item+""};

}

// Each gallery object has full collection of options
obj.opts=$.extend(true,{},self.opts,opts);

// Do not merge buttons array
if($.isArray(opts.buttons)){
obj.opts.buttons=opts.buttons;
}

if($.fancybox.isMobile&&obj.opts.mobile){
obj.opts=mergeOpts(obj.opts,obj.opts.mobile);
}

// Step 2 - Make sure we have content type, if not - try to guess
// ==============================================================

type=obj.type||obj.opts.type;
src=obj.src||"";

if(!type&&src){
if(found=src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)){
type="video";

if(!obj.opts.video.format){
obj.opts.video.format="video/"+(found[1]==="ogv"?"ogg":found[1]);
}
}else if(src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)){
type="image";
}else if(src.match(/\.(pdf)((\?|#).*)?$/i)){
type="iframe";
obj=$.extend(true,obj,{
contentType:"pdf",
opts:{
iframe:{
preload:false}}});



}else if(src.charAt(0)==="#"){
type="inline";
}
}

if(type){
obj.type=type;
}else {
self.trigger("objectNeedsType",obj);
}

if(!obj.contentType){
obj.contentType=$.inArray(obj.type,["html","inline","ajax"])>-1?"html":obj.type;
}

// Step 3 - Some adjustments
// =========================

obj.index=self.group.length;

if(obj.opts.smallBtn=="auto"){
obj.opts.smallBtn=$.inArray(obj.type,["html","inline","ajax"])>-1;
}

if(obj.opts.toolbar==="auto"){
obj.opts.toolbar=!obj.opts.smallBtn;
}

// Find thumbnail image, check if exists and if is in the viewport
obj.$thumb=obj.opts.$thumb||null;

if(obj.opts.$trigger&&obj.index===self.opts.index){
obj.$thumb=obj.opts.$trigger.find("img:first");

if(obj.$thumb.length){
obj.opts.$orig=obj.opts.$trigger;
}
}

if(!(obj.$thumb&&obj.$thumb.length)&&obj.opts.$orig){
obj.$thumb=obj.opts.$orig.find("img:first");
}

if(obj.$thumb&&!obj.$thumb.length){
obj.$thumb=null;
}

obj.thumb=obj.opts.thumb||(obj.$thumb?obj.$thumb[0].src:null);

// "caption" is a "special" option, it can be used to customize caption per gallery item
if($.type(obj.opts.caption)==="function"){
obj.opts.caption=obj.opts.caption.apply(item,[self,obj]);
}

if($.type(self.opts.caption)==="function"){
obj.opts.caption=self.opts.caption.apply(item,[self,obj]);
}

// Make sure we have caption as a string or jQuery object
if(!(obj.opts.caption instanceof $)){
obj.opts.caption=obj.opts.caption===undefined$1?"":obj.opts.caption+"";
}

// Check if url contains "filter" used to filter the content
// Example: "ajax.html #something"
if(obj.type==="ajax"){
srcParts=src.split(/\s+/,2);

if(srcParts.length>1){
obj.src=srcParts.shift();

obj.opts.filter=srcParts.shift();
}
}

// Hide all buttons and disable interactivity for modal items
if(obj.opts.modal){
obj.opts=$.extend(true,obj.opts,{
trapFocus:true,
// Remove buttons
infobar:0,
toolbar:0,

smallBtn:0,

// Disable keyboard navigation
keyboard:0,

// Disable some modules
slideShow:0,
fullScreen:0,
thumbs:0,
touch:0,

// Disable click event handlers
clickContent:false,
clickSlide:false,
clickOutside:false,
dblclickContent:false,
dblclickSlide:false,
dblclickOutside:false});

}

// Step 4 - Add processed object to group
// ======================================

self.group.push(obj);
});

// Update controls if gallery is already opened
if(Object.keys(self.slides).length){
self.updateControls();

// Update thumbnails, if needed
thumbs=self.Thumbs;

if(thumbs&&thumbs.isActive){
thumbs.create();

thumbs.focus();
}
}
},

// Attach an event handler functions for:
//   - navigation buttons
//   - browser scrolling, resizing;
//   - focusing
//   - keyboard
//   - detecting inactivity
// ======================================

addEvents:function addEvents(){
var self=this;

self.removeEvents();

// Make navigation elements clickable
// ==================================

self.$refs.container.
on("click.fb-close","[data-fancybox-close]",function(e){
e.stopPropagation();
e.preventDefault();

self.close(e);
}).
on("touchstart.fb-prev click.fb-prev","[data-fancybox-prev]",function(e){
e.stopPropagation();
e.preventDefault();

self.previous();
}).
on("touchstart.fb-next click.fb-next","[data-fancybox-next]",function(e){
e.stopPropagation();
e.preventDefault();

self.next();
}).
on("click.fb","[data-fancybox-zoom]",function(e){
// Click handler for zoom button
self[self.isScaledDown()?"scaleToActual":"scaleToFit"]();
});

// Handle page scrolling and browser resizing
// ==========================================

$W.on("orientationchange.fb resize.fb",function(e){
if(e&&e.originalEvent&&e.originalEvent.type==="resize"){
if(self.requestId){
cancelAFrame(self.requestId);
}

self.requestId=requestAFrame(function(){
self.update(e);
});
}else {
if(self.current&&self.current.type==="iframe"){
self.$refs.stage.hide();
}

setTimeout(
function(){
self.$refs.stage.show();

self.update(e);
},
$.fancybox.isMobile?600:250);

}
});

$D.on("keydown.fb",function(e){
var instance=$.fancybox?$.fancybox.getInstance():null,
current=instance.current,
keycode=e.keyCode||e.which;

// Trap keyboard focus inside of the modal
// =======================================

if(keycode==9){
if(current.opts.trapFocus){
self.focus(e);
}

return;
}

// Enable keyboard navigation
// ==========================

if(!current.opts.keyboard||e.ctrlKey||e.altKey||e.shiftKey||$(e.target).is("input,textarea,video,audio,select")){
return;
}

// Backspace and Esc keys
if(keycode===8||keycode===27){
e.preventDefault();

self.close(e);

return;
}

// Left arrow and Up arrow
if(keycode===37||keycode===38){
e.preventDefault();

self.previous();

return;
}

// Righ arrow and Down arrow
if(keycode===39||keycode===40){
e.preventDefault();

self.next();

return;
}

self.trigger("afterKeydown",e,keycode);
});

// Hide controls after some inactivity period
if(self.group[self.currIndex].opts.idleTime){
self.idleSecondsCounter=0;

$D.on(
"mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
function(e){
self.idleSecondsCounter=0;

if(self.isIdle){
self.showControls();
}

self.isIdle=false;
});


self.idleInterval=window.setInterval(function(){
self.idleSecondsCounter++;

if(self.idleSecondsCounter>=self.group[self.currIndex].opts.idleTime&&!self.isDragging){
self.isIdle=true;
self.idleSecondsCounter=0;

self.hideControls();
}
},1000);
}
},

// Remove events added by the core
// ===============================

removeEvents:function removeEvents(){
var self=this;

$W.off("orientationchange.fb resize.fb");
$D.off("keydown.fb .fb-idle");

this.$refs.container.off(".fb-close .fb-prev .fb-next");

if(self.idleInterval){
window.clearInterval(self.idleInterval);

self.idleInterval=null;
}
},

// Change to previous gallery item
// ===============================

previous:function previous(duration){
return this.jumpTo(this.currPos-1,duration);
},

// Change to next gallery item
// ===========================

next:function next(duration){
return this.jumpTo(this.currPos+1,duration);
},

// Switch to selected gallery item
// ===============================

jumpTo:function jumpTo(pos,duration){
var self=this,
groupLen=self.group.length,
firstRun,
isMoved,
loop,
current,
previous,
slidePos,
stagePos,
prop,
diff;

if(self.isDragging||self.isClosing||self.isAnimating&&self.firstRun){
return;
}

// Should loop?
pos=parseInt(pos,10);
loop=self.current?self.current.opts.loop:self.opts.loop;

if(!loop&&(pos<0||pos>=groupLen)){
return false;
}

// Check if opening for the first time; this helps to speed things up
firstRun=self.firstRun=!Object.keys(self.slides).length;

// Create slides
previous=self.current;

self.prevIndex=self.currIndex;
self.prevPos=self.currPos;

current=self.createSlide(pos);

if(groupLen>1){
if(loop||current.index<groupLen-1){
self.createSlide(pos+1);
}

if(loop||current.index>0){
self.createSlide(pos-1);
}
}

self.current=current;
self.currIndex=current.index;
self.currPos=current.pos;

self.trigger("beforeShow",firstRun);

self.updateControls();

// Validate duration length
current.forcedDuration=undefined$1;

if($.isNumeric(duration)){
current.forcedDuration=duration;
}else {
duration=current.opts[firstRun?"animationDuration":"transitionDuration"];
}

duration=parseInt(duration,10);

// Check if user has swiped the slides or if still animating
isMoved=self.isMoved(current);

// Make sure current slide is visible
current.$slide.addClass("fancybox-slide--current");

// Fresh start - reveal container, current slide and start loading content
if(firstRun){
if(current.opts.animationEffect&&duration){
self.$refs.container.css("transition-duration",duration+"ms");
}

self.$refs.container.addClass("fancybox-is-open").trigger("focus");

// Attempt to load content into slide
// This will later call `afterLoad` -> `revealContent`
self.loadSlide(current);

self.preload("image");

return;
}

// Get actual slide/stage positions (before cleaning up)
slidePos=$.fancybox.getTranslate(previous.$slide);
stagePos=$.fancybox.getTranslate(self.$refs.stage);

// Clean up all slides
$.each(self.slides,function(index,slide){
$.fancybox.stop(slide.$slide,true);
});

if(previous.pos!==current.pos){
previous.isComplete=false;
}

previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current");

// If slides are out of place, then animate them to correct position
if(isMoved){
// Calculate horizontal swipe distance
diff=slidePos.left-(previous.pos*slidePos.width+previous.pos*previous.opts.gutter);

$.each(self.slides,function(index,slide){
slide.$slide.removeClass("fancybox-animated").removeClass(function(index,className){
return (className.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ");
});

// Make sure that each slide is in equal distance
// This is mostly needed for freshly added slides, because they are not yet positioned
var leftPos=slide.pos*slidePos.width+slide.pos*slide.opts.gutter;

$.fancybox.setTranslate(slide.$slide,{
top:0,
left:leftPos-stagePos.left+diff});


if(slide.pos!==current.pos){
slide.$slide.addClass("fancybox-slide--"+(slide.pos>current.pos?"next":"previous"));
}

// Redraw to make sure that transition will start
forceRedraw(slide.$slide);

// Animate the slide
$.fancybox.animate(
slide.$slide,{
top:0,
left:(slide.pos-current.pos)*slidePos.width+(slide.pos-current.pos)*slide.opts.gutter},

duration,
function(){
slide.$slide.
css({
transform:"",
opacity:""}).

removeClass("fancybox-slide--next fancybox-slide--previous");

if(slide.pos===self.currPos){
self.complete();
}
});

});
}else if(duration&&current.opts.transitionEffect){
// Set transition effect for previously active slide
prop="fancybox-animated fancybox-fx-"+current.opts.transitionEffect;

previous.$slide.addClass("fancybox-slide--"+(previous.pos>current.pos?"next":"previous"));

$.fancybox.animate(
previous.$slide,
prop,
duration,
function(){
previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous");
},
false);

}

if(current.isLoaded){
self.revealContent(current);
}else {
self.loadSlide(current);
}

self.preload("image");
},

// Create new "slide" element
// These are gallery items  that are actually added to DOM
// =======================================================

createSlide:function createSlide(pos){
var self=this,
$slide,
index;

index=pos%self.group.length;
index=index<0?self.group.length+index:index;

if(!self.slides[pos]&&self.group[index]){
$slide=$('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

self.slides[pos]=$.extend(true,{},self.group[index],{
pos:pos,
$slide:$slide,
isLoaded:false});


self.updateSlide(self.slides[pos]);
}

return self.slides[pos];
},

// Scale image to the actual size of the image;
// x and y values should be relative to the slide
// ==============================================

scaleToActual:function scaleToActual(x,y,duration){
var self=this,
current=self.current,
$content=current.$content,
canvasWidth=$.fancybox.getTranslate(current.$slide).width,
canvasHeight=$.fancybox.getTranslate(current.$slide).height,
newImgWidth=current.width,
newImgHeight=current.height,
imgPos,
posX,
posY,
scaleX,
scaleY;

if(self.isAnimating||self.isMoved()||!$content||!(current.type=="image"&&current.isLoaded&&!current.hasError)){
return;
}

self.isAnimating=true;

$.fancybox.stop($content);

x=x===undefined$1?canvasWidth*0.5:x;
y=y===undefined$1?canvasHeight*0.5:y;

imgPos=$.fancybox.getTranslate($content);

imgPos.top-=$.fancybox.getTranslate(current.$slide).top;
imgPos.left-=$.fancybox.getTranslate(current.$slide).left;

scaleX=newImgWidth/imgPos.width;
scaleY=newImgHeight/imgPos.height;

// Get center position for original image
posX=canvasWidth*0.5-newImgWidth*0.5;
posY=canvasHeight*0.5-newImgHeight*0.5;

// Make sure image does not move away from edges
if(newImgWidth>canvasWidth){
posX=imgPos.left*scaleX-(x*scaleX-x);

if(posX>0){
posX=0;
}

if(posX<canvasWidth-newImgWidth){
posX=canvasWidth-newImgWidth;
}
}

if(newImgHeight>canvasHeight){
posY=imgPos.top*scaleY-(y*scaleY-y);

if(posY>0){
posY=0;
}

if(posY<canvasHeight-newImgHeight){
posY=canvasHeight-newImgHeight;
}
}

self.updateCursor(newImgWidth,newImgHeight);

$.fancybox.animate(
$content,{
top:posY,
left:posX,
scaleX:scaleX,
scaleY:scaleY},

duration||366,
function(){
self.isAnimating=false;
});


// Stop slideshow
if(self.SlideShow&&self.SlideShow.isActive){
self.SlideShow.stop();
}
},

// Scale image to fit inside parent element
// ========================================

scaleToFit:function scaleToFit(duration){
var self=this,
current=self.current,
$content=current.$content,
end;

if(self.isAnimating||self.isMoved()||!$content||!(current.type=="image"&&current.isLoaded&&!current.hasError)){
return;
}

self.isAnimating=true;

$.fancybox.stop($content);

end=self.getFitPos(current);

self.updateCursor(end.width,end.height);

$.fancybox.animate(
$content,{
top:end.top,
left:end.left,
scaleX:end.width/$content.width(),
scaleY:end.height/$content.height()},

duration||366,
function(){
self.isAnimating=false;
});

},

// Calculate image size to fit inside viewport
// ===========================================

getFitPos:function getFitPos(slide){
var self=this,
$content=slide.$content,
$slide=slide.$slide,
width=slide.width||slide.opts.width,
height=slide.height||slide.opts.height,
maxWidth,
maxHeight,
minRatio,
aspectRatio,
rez={};

if(!slide.isLoaded||!$content||!$content.length){
return false;
}

maxWidth=$.fancybox.getTranslate(self.$refs.stage).width;
maxHeight=$.fancybox.getTranslate(self.$refs.stage).height;

maxWidth-=
parseFloat($slide.css("paddingLeft"))+
parseFloat($slide.css("paddingRight"))+
parseFloat($content.css("marginLeft"))+
parseFloat($content.css("marginRight"));

maxHeight-=
parseFloat($slide.css("paddingTop"))+
parseFloat($slide.css("paddingBottom"))+
parseFloat($content.css("marginTop"))+
parseFloat($content.css("marginBottom"));

if(!width||!height){
width=maxWidth;
height=maxHeight;
}

minRatio=Math.min(1,maxWidth/width,maxHeight/height);

width=minRatio*width;
height=minRatio*height;

// Adjust width/height to precisely fit into container
if(width>maxWidth-0.5){
width=maxWidth;
}

if(height>maxHeight-0.5){
height=maxHeight;
}

if(slide.type==="image"){
rez.top=Math.floor((maxHeight-height)*0.5)+parseFloat($slide.css("paddingTop"));
rez.left=Math.floor((maxWidth-width)*0.5)+parseFloat($slide.css("paddingLeft"));
}else if(slide.contentType==="video"){
// Force aspect ratio for the video
// "I say the whole world must learn of our peaceful ways… by force!"
aspectRatio=slide.opts.width&&slide.opts.height?width/height:slide.opts.ratio||16/9;

if(height>width/aspectRatio){
height=width/aspectRatio;
}else if(width>height*aspectRatio){
width=height*aspectRatio;
}
}

rez.width=width;
rez.height=height;

return rez;
},

// Update content size and position for all slides
// ==============================================

update:function update(e){
var self=this;

$.each(self.slides,function(key,slide){
self.updateSlide(slide,e);
});
},

// Update slide content position and size
// ======================================

updateSlide:function updateSlide(slide,e){
var self=this,
$content=slide&&slide.$content,
width=slide.width||slide.opts.width,
height=slide.height||slide.opts.height,
$slide=slide.$slide;

// First, prevent caption overlap, if needed
self.adjustCaption(slide);

// Then resize content to fit inside the slide
if($content&&(width||height||slide.contentType==="video")&&!slide.hasError){
$.fancybox.stop($content);

$.fancybox.setTranslate($content,self.getFitPos(slide));

if(slide.pos===self.currPos){
self.isAnimating=false;

self.updateCursor();
}
}

// Then some adjustments
self.adjustLayout(slide);

if($slide.length){
$slide.trigger("refresh");

if(slide.pos===self.currPos){
self.$refs.toolbar.
add(self.$refs.navigation.find(".fancybox-button--arrow_right")).
toggleClass("compensate-for-scrollbar",$slide.get(0).scrollHeight>$slide.get(0).clientHeight);
}
}

self.trigger("onUpdate",slide,e);
},

// Horizontally center slide
// =========================

centerSlide:function centerSlide(duration){
var self=this,
current=self.current,
$slide=current.$slide;

if(self.isClosing||!current){
return;
}

$slide.siblings().css({
transform:"",
opacity:""});


$slide.
parent().
children().
removeClass("fancybox-slide--previous fancybox-slide--next");

$.fancybox.animate(
$slide,{
top:0,
left:0,
opacity:1},

duration===undefined$1?0:duration,
function(){
// Clean up
$slide.css({
transform:"",
opacity:""});


if(!current.isComplete){
self.complete();
}
},
false);

},

// Check if current slide is moved (swiped)
// ========================================

isMoved:function isMoved(slide){
var current=slide||this.current,
slidePos,
stagePos;

if(!current){
return false;
}

stagePos=$.fancybox.getTranslate(this.$refs.stage);
slidePos=$.fancybox.getTranslate(current.$slide);

return(
!current.$slide.hasClass("fancybox-animated")&&(
Math.abs(slidePos.top-stagePos.top)>0.5||Math.abs(slidePos.left-stagePos.left)>0.5));

},

// Update cursor style depending if content can be zoomed
// ======================================================

updateCursor:function updateCursor(nextWidth,nextHeight){
var self=this,
current=self.current,
$container=self.$refs.container,
canPan,
isZoomable;

if(!current||self.isClosing||!self.Guestures){
return;
}

$container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan");

canPan=self.canPan(nextWidth,nextHeight);

isZoomable=canPan?true:self.isZoomable();

$container.toggleClass("fancybox-is-zoomable",isZoomable);

$("[data-fancybox-zoom]").prop("disabled",!isZoomable);

if(canPan){
$container.addClass("fancybox-can-pan");
}else if(
isZoomable&&(
current.opts.clickContent==="zoom"||$.isFunction(current.opts.clickContent)&&current.opts.clickContent(current)=="zoom"))
{
$container.addClass("fancybox-can-zoomIn");
}else if(current.opts.touch&&(current.opts.touch.vertical||self.group.length>1)&&current.contentType!=="video"){
$container.addClass("fancybox-can-swipe");
}
},

// Check if current slide is zoomable
// ==================================

isZoomable:function isZoomable(){
var self=this,
current=self.current,
fitPos;

// Assume that slide is zoomable if:
//   - image is still loading
//   - actual size of the image is smaller than available area
if(current&&!self.isClosing&&current.type==="image"&&!current.hasError){
if(!current.isLoaded){
return true;
}

fitPos=self.getFitPos(current);

if(fitPos&&(current.width>fitPos.width||current.height>fitPos.height)){
return true;
}
}

return false;
},

// Check if current image dimensions are smaller than actual
// =========================================================

isScaledDown:function isScaledDown(nextWidth,nextHeight){
var self=this,
rez=false,
current=self.current,
$content=current.$content;

if(nextWidth!==undefined$1&&nextHeight!==undefined$1){
rez=nextWidth<current.width&&nextHeight<current.height;
}else if($content){
rez=$.fancybox.getTranslate($content);
rez=rez.width<current.width&&rez.height<current.height;
}

return rez;
},

// Check if image dimensions exceed parent element
// ===============================================

canPan:function canPan(nextWidth,nextHeight){
var self=this,
current=self.current,
pos=null,
rez=false;

if(current.type==="image"&&(current.isComplete||nextWidth&&nextHeight)&&!current.hasError){
rez=self.getFitPos(current);

if(nextWidth!==undefined$1&&nextHeight!==undefined$1){
pos={
width:nextWidth,
height:nextHeight};

}else if(current.isComplete){
pos=$.fancybox.getTranslate(current.$content);
}

if(pos&&rez){
rez=Math.abs(pos.width-rez.width)>1.5||Math.abs(pos.height-rez.height)>1.5;
}
}

return rez;
},

// Load content into the slide
// ===========================

loadSlide:function loadSlide(slide){
var self=this,
type,
$slide,
ajaxLoad;

if(slide.isLoading||slide.isLoaded){
return;
}

slide.isLoading=true;

if(self.trigger("beforeLoad",slide)===false){
slide.isLoading=false;

return false;
}

type=slide.type;
$slide=slide.$slide;

$slide.
off("refresh").
trigger("onReset").
addClass(slide.opts.slideClass);

// Create content depending on the type
switch(type){
case"image":
self.setImage(slide);

break;

case"iframe":
self.setIframe(slide);

break;

case"html":
self.setContent(slide,slide.src||slide.content);

break;

case"video":
self.setContent(
slide,
slide.opts.video.tpl.
replace(/\{\{src\}\}/gi,slide.src).
replace("{{format}}",slide.opts.videoFormat||slide.opts.video.format||"").
replace("{{poster}}",slide.thumb||""));


break;

case"inline":
if($(slide.src).length){
self.setContent(slide,$(slide.src));
}else {
self.setError(slide);
}

break;

case"ajax":
self.showLoading(slide);

ajaxLoad=$.ajax(
$.extend({},slide.opts.ajax.settings,{
url:slide.src,
success:function success(data,textStatus){
if(textStatus==="success"){
self.setContent(slide,data);
}
},
error:function error(jqXHR,textStatus){
if(jqXHR&&textStatus!=="abort"){
self.setError(slide);
}
}}));



$slide.one("onReset",function(){
ajaxLoad.abort();
});

break;

default:
self.setError(slide);

break;}


return true;
},

// Use thumbnail image, if possible
// ================================

setImage:function setImage(slide){
var self=this,
ghost;

// Check if need to show loading icon
setTimeout(function(){
var $img=slide.$image;

if(!self.isClosing&&slide.isLoading&&(!$img||!$img.length||!$img[0].complete)&&!slide.hasError){
self.showLoading(slide);
}
},50);

//Check if image has srcset
self.checkSrcset(slide);

// This will be wrapper containing both ghost and actual image
slide.$content=$('<div class="fancybox-content"></div>').
addClass("fancybox-is-hidden").
appendTo(slide.$slide.addClass("fancybox-slide--image"));

// If we have a thumbnail, we can display it while actual image is loading
// Users will not stare at black screen and actual image will appear gradually
if(slide.opts.preload!==false&&slide.opts.width&&slide.opts.height&&slide.thumb){
slide.width=slide.opts.width;
slide.height=slide.opts.height;

ghost=document.createElement("img");

ghost.onerror=function(){
$(this).remove();

slide.$ghost=null;
};

ghost.onload=function(){
self.afterLoad(slide);
};

slide.$ghost=$(ghost).
addClass("fancybox-image").
appendTo(slide.$content).
attr("src",slide.thumb);
}

// Start loading actual image
self.setBigImage(slide);
},

// Check if image has srcset and get the source
// ============================================
checkSrcset:function checkSrcset(slide){
var srcset=slide.opts.srcset||slide.opts.image.srcset,
found,
temp,
pxRatio,
windowWidth;

// If we have "srcset", then we need to find first matching "src" value.
// This is necessary, because when you set an src attribute, the browser will preload the image
// before any javascript or even CSS is applied.
if(srcset){
pxRatio=window.devicePixelRatio||1;
windowWidth=window.innerWidth*pxRatio;

temp=srcset.split(",").map(function(el){
var ret={};

el.trim().
split(/\s+/).
forEach(function(el,i){
var value=parseInt(el.substring(0,el.length-1),10);

if(i===0){
return ret.url=el;
}

if(value){
ret.value=value;
ret.postfix=el[el.length-1];
}
});

return ret;
});

// Sort by value
temp.sort(function(a,b){
return a.value-b.value;
});

// Ok, now we have an array of all srcset values
for(var j=0;j<temp.length;j++){
var el=temp[j];

if(el.postfix==="w"&&el.value>=windowWidth||el.postfix==="x"&&el.value>=pxRatio){
found=el;
break;
}
}

// If not found, take the last one
if(!found&&temp.length){
found=temp[temp.length-1];
}

if(found){
slide.src=found.url;

// If we have default width/height values, we can calculate height for matching source
if(slide.width&&slide.height&&found.postfix=="w"){
slide.height=slide.width/slide.height*found.value;
slide.width=found.value;
}

slide.opts.srcset=srcset;
}
}
},

// Create full-size image
// ======================

setBigImage:function setBigImage(slide){
var self=this,
img=document.createElement("img"),
$img=$(img);

slide.$image=$img.
one("error",function(){
self.setError(slide);
}).
one("load",function(){
var sizes;

if(!slide.$ghost){
self.resolveImageSlideSize(slide,this.naturalWidth,this.naturalHeight);

self.afterLoad(slide);
}

if(self.isClosing){
return;
}

if(slide.opts.srcset){
sizes=slide.opts.sizes;

if(!sizes||sizes==="auto"){
sizes=
(slide.width/slide.height>1&&$W.width()/$W.height()>1?"100":Math.round(slide.width/slide.height*100))+
"vw";
}

$img.attr("sizes",sizes).attr("srcset",slide.opts.srcset);
}

// Hide temporary image after some delay
if(slide.$ghost){
setTimeout(function(){
if(slide.$ghost&&!self.isClosing){
slide.$ghost.hide();
}
},Math.min(300,Math.max(1000,slide.height/1600)));
}

self.hideLoading(slide);
}).
addClass("fancybox-image").
attr("src",slide.src).
appendTo(slide.$content);

if((img.complete||img.readyState=="complete")&&$img.naturalWidth&&$img.naturalHeight){
$img.trigger("load");
}else if(img.error){
$img.trigger("error");
}
},

// Computes the slide size from image size and maxWidth/maxHeight
// ==============================================================

resolveImageSlideSize:function resolveImageSlideSize(slide,imgWidth,imgHeight){
var maxWidth=parseInt(slide.opts.width,10),
maxHeight=parseInt(slide.opts.height,10);

// Sets the default values from the image
slide.width=imgWidth;
slide.height=imgHeight;

if(maxWidth>0){
slide.width=maxWidth;
slide.height=Math.floor(maxWidth*imgHeight/imgWidth);
}

if(maxHeight>0){
slide.width=Math.floor(maxHeight*imgWidth/imgHeight);
slide.height=maxHeight;
}
},

// Create iframe wrapper, iframe and bindings
// ==========================================

setIframe:function setIframe(slide){
var self=this,
opts=slide.opts.iframe,
$slide=slide.$slide,
$iframe;

slide.$content=$('<div class="fancybox-content'+(opts.preload?" fancybox-is-hidden":"")+'"></div>').
css(opts.css).
appendTo($slide);

$slide.addClass("fancybox-slide--"+slide.contentType);

slide.$iframe=$iframe=$(opts.tpl.replace(/\{rnd\}/g,new Date().getTime())).
attr(opts.attr).
appendTo(slide.$content);

if(opts.preload){
self.showLoading(slide);

// Unfortunately, it is not always possible to determine if iframe is successfully loaded
// (due to browser security policy)

$iframe.on("load.fb error.fb",function(e){
this.isReady=1;

slide.$slide.trigger("refresh");

self.afterLoad(slide);
});

// Recalculate iframe content size
// ===============================

$slide.on("refresh.fb",function(){
var $content=slide.$content,
frameWidth=opts.css.width,
frameHeight=opts.css.height,
$contents,
$body;

if($iframe[0].isReady!==1){
return;
}

try{
$contents=$iframe.contents();
$body=$contents.find("body");
}catch(ignore){}

// Calculate content dimensions, if it is accessible
if($body&&$body.length&&$body.children().length){
// Avoid scrolling to top (if multiple instances)
$slide.css("overflow","visible");

$content.css({
width:"100%",
"max-width":"100%",
height:"9999px"});


if(frameWidth===undefined$1){
frameWidth=Math.ceil(Math.max($body[0].clientWidth,$body.outerWidth(true)));
}

$content.css("width",frameWidth?frameWidth:"").css("max-width","");

if(frameHeight===undefined$1){
frameHeight=Math.ceil(Math.max($body[0].clientHeight,$body.outerHeight(true)));
}

$content.css("height",frameHeight?frameHeight:"");

$slide.css("overflow","auto");
}

$content.removeClass("fancybox-is-hidden");
});
}else {
self.afterLoad(slide);
}

$iframe.attr("src",slide.src);

// Remove iframe if closing or changing gallery item
$slide.one("onReset",function(){
// This helps IE not to throw errors when closing
try{
$(this).
find("iframe").
hide().
unbind().
attr("src","//about:blank");
}catch(ignore){}

$(this).
off("refresh.fb").
empty();

slide.isLoaded=false;
slide.isRevealed=false;
});
},

// Wrap and append content to the slide
// ======================================

setContent:function setContent(slide,content){
var self=this;

if(self.isClosing){
return;
}

self.hideLoading(slide);

if(slide.$content){
$.fancybox.stop(slide.$content);
}

slide.$slide.empty();

// If content is a jQuery object, then it will be moved to the slide.
// The placeholder is created so we will know where to put it back.
if(isQuery(content)&&content.parent().length){
// Make sure content is not already moved to fancyBox
if(content.hasClass("fancybox-content")||content.parent().hasClass("fancybox-content")){
content.parents(".fancybox-slide").trigger("onReset");
}

// Create temporary element marking original place of the content
slide.$placeholder=$("<div>").
hide().
insertAfter(content);

// Make sure content is visible
content.css("display","inline-block");
}else if(!slide.hasError){
// If content is just a plain text, try to convert it to html
if($.type(content)==="string"){
content=$("<div>").
append($.trim(content)).
contents();
}

// If "filter" option is provided, then filter content
if(slide.opts.filter){
content=$("<div>").
html(content).
find(slide.opts.filter);
}
}

slide.$slide.one("onReset",function(){
// Pause all html5 video/audio
$(this).
find("video,audio").
trigger("pause");

// Put content back
if(slide.$placeholder){
slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove();

slide.$placeholder=null;
}

// Remove custom close button
if(slide.$smallBtn){
slide.$smallBtn.remove();

slide.$smallBtn=null;
}

// Remove content and mark slide as not loaded
if(!slide.hasError){
$(this).empty();

slide.isLoaded=false;
slide.isRevealed=false;
}
});

$(content).appendTo(slide.$slide);

if($(content).is("video,audio")){
$(content).addClass("fancybox-video");

$(content).wrap("<div></div>");

slide.contentType="video";

slide.opts.width=slide.opts.width||$(content).attr("width");
slide.opts.height=slide.opts.height||$(content).attr("height");
}

slide.$content=slide.$slide.
children().
filter("div,form,main,video,audio,article,.fancybox-content").
first();

slide.$content.siblings().hide();

// Re-check if there is a valid content
// (in some cases, ajax response can contain various elements or plain text)
if(!slide.$content.length){
slide.$content=slide.$slide.
wrapInner("<div></div>").
children().
first();
}

slide.$content.addClass("fancybox-content");

slide.$slide.addClass("fancybox-slide--"+slide.contentType);

self.afterLoad(slide);
},

// Display error message
// =====================

setError:function setError(slide){
slide.hasError=true;

slide.$slide.
trigger("onReset").
removeClass("fancybox-slide--"+slide.contentType).
addClass("fancybox-slide--error");

slide.contentType="html";

this.setContent(slide,this.translate(slide,slide.opts.errorTpl));

if(slide.pos===this.currPos){
this.isAnimating=false;
}
},

// Show loading icon inside the slide
// ==================================

showLoading:function showLoading(slide){
var self=this;

slide=slide||self.current;

if(slide&&!slide.$spinner){
slide.$spinner=$(self.translate(self,self.opts.spinnerTpl)).
appendTo(slide.$slide).
hide().
fadeIn("fast");
}
},

// Remove loading icon from the slide
// ==================================

hideLoading:function hideLoading(slide){
var self=this;

slide=slide||self.current;

if(slide&&slide.$spinner){
slide.$spinner.stop().remove();

delete slide.$spinner;
}
},

// Adjustments after slide content has been loaded
// ===============================================

afterLoad:function afterLoad(slide){
var self=this;

if(self.isClosing){
return;
}

slide.isLoading=false;
slide.isLoaded=true;

self.trigger("afterLoad",slide);

self.hideLoading(slide);

// Add small close button
if(slide.opts.smallBtn&&(!slide.$smallBtn||!slide.$smallBtn.length)){
slide.$smallBtn=$(self.translate(slide,slide.opts.btnTpl.smallBtn)).appendTo(slide.$content);
}

// Disable right click
if(slide.opts.protect&&slide.$content&&!slide.hasError){
slide.$content.on("contextmenu.fb",function(e){
if(e.button==2){
e.preventDefault();
}

return true;
});

// Add fake element on top of the image
// This makes a bit harder for user to select image
if(slide.type==="image"){
$('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
}
}

self.adjustCaption(slide);

self.adjustLayout(slide);

if(slide.pos===self.currPos){
self.updateCursor();
}

self.revealContent(slide);
},

// Prevent caption overlap,
// fix css inconsistency across browsers
// =====================================

adjustCaption:function adjustCaption(slide){
var self=this,
current=slide||self.current,
caption=current.opts.caption,
preventOverlap=current.opts.preventCaptionOverlap,
$caption=self.$refs.caption,
$clone,
captionH=false;

$caption.toggleClass("fancybox-caption--separate",preventOverlap);

if(preventOverlap&&caption&&caption.length){
if(current.pos!==self.currPos){
$clone=$caption.clone().appendTo($caption.parent());

$clone.
children().
eq(0).
empty().
html(caption);

captionH=$clone.outerHeight(true);

$clone.empty().remove();
}else if(self.$caption){
captionH=self.$caption.outerHeight(true);
}

current.$slide.css("padding-bottom",captionH||"");
}
},

// Simple hack to fix inconsistency across browsers, described here (affects Edge, too):
// https://bugzilla.mozilla.org/show_bug.cgi?id=748518
// ====================================================================================

adjustLayout:function adjustLayout(slide){
var self=this,
current=slide||self.current,
scrollHeight,
marginBottom,
inlinePadding,
actualPadding;

if(current.isLoaded&&current.opts.disableLayoutFix!==true){
current.$content.css("margin-bottom","");

// If we would always set margin-bottom for the content,
// then it would potentially break vertical align
if(current.$content.outerHeight()>current.$slide.height()+0.5){
inlinePadding=current.$slide[0].style["padding-bottom"];
actualPadding=current.$slide.css("padding-bottom");

if(parseFloat(actualPadding)>0){
scrollHeight=current.$slide[0].scrollHeight;

current.$slide.css("padding-bottom",0);

if(Math.abs(scrollHeight-current.$slide[0].scrollHeight)<1){
marginBottom=actualPadding;
}

current.$slide.css("padding-bottom",inlinePadding);
}
}

current.$content.css("margin-bottom",marginBottom);
}
},

// Make content visible
// This method is called right after content has been loaded or
// user navigates gallery and transition should start
// ============================================================

revealContent:function revealContent(slide){
var self=this,
$slide=slide.$slide,
end=false,
start=false,
isMoved=self.isMoved(slide),
isRevealed=slide.isRevealed,
effect,
effectClassName,
duration,
opacity;

slide.isRevealed=true;

effect=slide.opts[self.firstRun?"animationEffect":"transitionEffect"];
duration=slide.opts[self.firstRun?"animationDuration":"transitionDuration"];

duration=parseInt(slide.forcedDuration===undefined$1?duration:slide.forcedDuration,10);

if(isMoved||slide.pos!==self.currPos||!duration){
effect=false;
}

// Check if can zoom
if(effect==="zoom"){
if(slide.pos===self.currPos&&duration&&slide.type==="image"&&!slide.hasError&&(start=self.getThumbPos(slide))){
end=self.getFitPos(slide);
}else {
effect="fade";
}
}

// Zoom animation
// ==============
if(effect==="zoom"){
self.isAnimating=true;

end.scaleX=end.width/start.width;
end.scaleY=end.height/start.height;

// Check if we need to animate opacity
opacity=slide.opts.zoomOpacity;

if(opacity=="auto"){
opacity=Math.abs(slide.width/slide.height-start.width/start.height)>0.1;
}

if(opacity){
start.opacity=0.1;
end.opacity=1;
}

// Draw image at start position
$.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"),start);

forceRedraw(slide.$content);

// Start animation
$.fancybox.animate(slide.$content,end,duration,function(){
self.isAnimating=false;

self.complete();
});

return;
}

self.updateSlide(slide);

// Simply show content if no effect
// ================================
if(!effect){
slide.$content.removeClass("fancybox-is-hidden");

if(!isRevealed&&isMoved&&slide.type==="image"&&!slide.hasError){
slide.$content.hide().fadeIn("fast");
}

if(slide.pos===self.currPos){
self.complete();
}

return;
}

// Prepare for CSS transiton
// =========================
$.fancybox.stop($slide);

//effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;
effectClassName="fancybox-slide--"+(slide.pos>=self.prevPos?"next":"previous")+" fancybox-animated fancybox-fx-"+effect;

$slide.addClass(effectClassName).removeClass("fancybox-slide--current");//.addClass(effectClassName);

slide.$content.removeClass("fancybox-is-hidden");

// Force reflow
forceRedraw($slide);

if(slide.type!=="image"){
slide.$content.hide().show(0);
}

$.fancybox.animate(
$slide,
"fancybox-slide--current",
duration,
function(){
$slide.removeClass(effectClassName).css({
transform:"",
opacity:""});


if(slide.pos===self.currPos){
self.complete();
}
},
true);

},

// Check if we can and have to zoom from thumbnail
//================================================

getThumbPos:function getThumbPos(slide){
var rez=false,
$thumb=slide.$thumb,
thumbPos,
btw,
brw,
bbw,
blw;

if(!$thumb||!inViewport($thumb[0])){
return false;
}

thumbPos=$.fancybox.getTranslate($thumb);

btw=parseFloat($thumb.css("border-top-width")||0);
brw=parseFloat($thumb.css("border-right-width")||0);
bbw=parseFloat($thumb.css("border-bottom-width")||0);
blw=parseFloat($thumb.css("border-left-width")||0);

rez={
top:thumbPos.top+btw,
left:thumbPos.left+blw,
width:thumbPos.width-brw-blw,
height:thumbPos.height-btw-bbw,
scaleX:1,
scaleY:1};


return thumbPos.width>0&&thumbPos.height>0?rez:false;
},

// Final adjustments after current gallery item is moved to position
// and it`s content is loaded
// ==================================================================

complete:function complete(){
var self=this,
current=self.current,
slides={},
$el;

if(self.isMoved()||!current.isLoaded){
return;
}

if(!current.isComplete){
current.isComplete=true;

current.$slide.siblings().trigger("onReset");

self.preload("inline");

// Trigger any CSS transiton inside the slide
forceRedraw(current.$slide);

current.$slide.addClass("fancybox-slide--complete");

// Remove unnecessary slides
$.each(self.slides,function(key,slide){
if(slide.pos>=self.currPos-1&&slide.pos<=self.currPos+1){
slides[slide.pos]=slide;
}else if(slide){
$.fancybox.stop(slide.$slide);

slide.$slide.off().remove();
}
});

self.slides=slides;
}

self.isAnimating=false;

self.updateCursor();

self.trigger("afterShow");

// Autoplay first html5 video/audio
if(!!current.opts.video.autoStart){
current.$slide.
find("video,audio").
filter(":visible:first").
trigger("play").
one("ended",function(){
if(Document.exitFullscreen){
Document.exitFullscreen();
}else if(this.webkitExitFullscreen){
this.webkitExitFullscreen();
}

self.next();
});
}

// Try to focus on the first focusable element
if(current.opts.autoFocus&&current.contentType==="html"){
// Look for the first input with autofocus attribute
$el=current.$content.find("input[autofocus]:enabled:visible:first");

if($el.length){
$el.trigger("focus");
}else {
self.focus(null,true);
}
}

// Avoid jumping
current.$slide.scrollTop(0).scrollLeft(0);
},

// Preload next and previous slides
// ================================

preload:function preload(type){
var self=this,
prev,
next;

if(self.group.length<2){
return;
}

next=self.slides[self.currPos+1];
prev=self.slides[self.currPos-1];

if(prev&&prev.type===type){
self.loadSlide(prev);
}

if(next&&next.type===type){
self.loadSlide(next);
}
},

// Try to find and focus on the first focusable element
// ====================================================

focus:function focus(e,firstRun){
var self=this,
focusableStr=[
"a[href]",
"area[href]",
'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
"select:not([disabled]):not([aria-hidden])",
"textarea:not([disabled]):not([aria-hidden])",
"button:not([disabled]):not([aria-hidden])",
"iframe",
"object",
"embed",
"video",
"audio",
"[contenteditable]",
'[tabindex]:not([tabindex^="-"])'].
join(","),
focusableItems,
focusedItemIndex;

if(self.isClosing){
return;
}

if(e||!self.current||!self.current.isComplete){
// Focus on any element inside fancybox
focusableItems=self.$refs.container.find("*:visible");
}else {
// Focus inside current slide
focusableItems=self.current.$slide.find("*:visible"+(firstRun?":not(.fancybox-close-small)":""));
}

focusableItems=focusableItems.filter(focusableStr).filter(function(){
return $(this).css("visibility")!=="hidden"&&!$(this).hasClass("disabled");
});

if(focusableItems.length){
focusedItemIndex=focusableItems.index(document.activeElement);

if(e&&e.shiftKey){
// Back tab
if(focusedItemIndex<0||focusedItemIndex==0){
e.preventDefault();

focusableItems.eq(focusableItems.length-1).trigger("focus");
}
}else {
// Outside or Forward tab
if(focusedItemIndex<0||focusedItemIndex==focusableItems.length-1){
if(e){
e.preventDefault();
}

focusableItems.eq(0).trigger("focus");
}
}
}else {
self.$refs.container.trigger("focus");
}
},

// Activates current instance - brings container to the front and enables keyboard,
// notifies other instances about deactivating
// =================================================================================

activate:function activate(){
var self=this;

// Deactivate all instances
$(".fancybox-container").each(function(){
var instance=$(this).data("FancyBox");

// Skip self and closing instances
if(instance&&instance.id!==self.id&&!instance.isClosing){
instance.trigger("onDeactivate");

instance.removeEvents();

instance.isVisible=false;
}
});

self.isVisible=true;

if(self.current||self.isIdle){
self.update();

self.updateControls();
}

self.trigger("onActivate");

self.addEvents();
},

// Start closing procedure
// This will start "zoom-out" animation if needed and clean everything up afterwards
// =================================================================================

close:function close(e,d){
var self=this,
current=self.current,
effect,
duration,
$content,
domRect,
opacity,
start,
end;

var done=function done(){
self.cleanUp(e);
};

if(self.isClosing){
return false;
}

self.isClosing=true;

// If beforeClose callback prevents closing, make sure content is centered
if(self.trigger("beforeClose",e)===false){
self.isClosing=false;

requestAFrame(function(){
self.update();
});

return false;
}

// Remove all events
// If there are multiple instances, they will be set again by "activate" method
self.removeEvents();

$content=current.$content;
effect=current.opts.animationEffect;
duration=$.isNumeric(d)?d:effect?current.opts.animationDuration:0;

current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

if(e!==true){
$.fancybox.stop(current.$slide);
}else {
effect=false;
}

// Remove other slides
current.$slide.
siblings().
trigger("onReset").
remove();

// Trigger animations
if(duration){
self.$refs.container.
removeClass("fancybox-is-open").
addClass("fancybox-is-closing").
css("transition-duration",duration+"ms");
}

// Clean up
self.hideLoading(current);

self.hideControls(true);

self.updateCursor();

// Check if possible to zoom-out
if(
effect==="zoom"&&
!($content&&duration&&current.type==="image"&&!self.isMoved()&&!current.hasError&&(end=self.getThumbPos(current))))
{
effect="fade";
}

if(effect==="zoom"){
$.fancybox.stop($content);

domRect=$.fancybox.getTranslate($content);

start={
top:domRect.top,
left:domRect.left,
scaleX:domRect.width/end.width,
scaleY:domRect.height/end.height,
width:end.width,
height:end.height};


// Check if we need to animate opacity
opacity=current.opts.zoomOpacity;

if(opacity=="auto"){
opacity=Math.abs(current.width/current.height-end.width/end.height)>0.1;
}

if(opacity){
end.opacity=0;
}

$.fancybox.setTranslate($content,start);

forceRedraw($content);

$.fancybox.animate($content,end,duration,done);

return true;
}

if(effect&&duration){
$.fancybox.animate(
current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),
"fancybox-animated fancybox-fx-"+effect,
duration,
done);

}else {
// If skip animation
if(e===true){
setTimeout(done,duration);
}else {
done();
}
}

return true;
},

// Final adjustments after removing the instance
// =============================================

cleanUp:function cleanUp(e){
var self=this,
instance,
$focus=self.current.opts.$orig,
x,
y;

self.current.$slide.trigger("onReset");

self.$refs.container.empty().remove();

self.trigger("afterClose",e);

// Place back focus
if(!!self.current.opts.backFocus){
if(!$focus||!$focus.length||!$focus.is(":visible")){
$focus=self.$trigger;
}

if($focus&&$focus.length){
x=window.scrollX;
y=window.scrollY;

$focus.trigger("focus");

$("html, body").
scrollTop(y).
scrollLeft(x);
}
}

self.current=null;

// Check if there are other instances
instance=$.fancybox.getInstance();

if(instance){
instance.activate();
}else {
$("body").removeClass("fancybox-active compensate-for-scrollbar");

$("#fancybox-style-noscroll").remove();
}
},

// Call callback and trigger an event
// ==================================

trigger:function trigger(name,slide){
var args=Array.prototype.slice.call(arguments,1),
self=this,
obj=slide&&slide.opts?slide:self.current,
rez;

if(obj){
args.unshift(obj);
}else {
obj=self;
}

args.unshift(self);

if($.isFunction(obj.opts[name])){
rez=obj.opts[name].apply(obj,args);
}

if(rez===false){
return rez;
}

if(name==="afterClose"||!self.$refs){
$D.trigger(name+".fb",args);
}else {
self.$refs.container.trigger(name+".fb",args);
}
},

// Update infobar values, navigation button states and reveal caption
// ==================================================================

updateControls:function updateControls(){
var self=this,
current=self.current,
index=current.index,
$container=self.$refs.container,
$caption=self.$refs.caption,
caption=current.opts.caption;

// Recalculate content dimensions
current.$slide.trigger("refresh");

// Set caption
if(caption&&caption.length){
self.$caption=$caption;

$caption.
children().
eq(0).
html(caption);
}else {
self.$caption=null;
}

if(!self.hasHiddenControls&&!self.isIdle){
self.showControls();
}

// Update info and navigation elements
$container.find("[data-fancybox-count]").html(self.group.length);
$container.find("[data-fancybox-index]").html(index+1);

$container.find("[data-fancybox-prev]").prop("disabled",!current.opts.loop&&index<=0);
$container.find("[data-fancybox-next]").prop("disabled",!current.opts.loop&&index>=self.group.length-1);

if(current.type==="image"){
// Re-enable buttons; update download button source
$container.
find("[data-fancybox-zoom]").
show().
end().
find("[data-fancybox-download]").
attr("href",current.opts.image.src||current.src).
show();
}else if(current.opts.toolbar){
$container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
}

// Make sure focus is not on disabled button/element
if($(document.activeElement).is(":hidden,[disabled]")){
self.$refs.container.trigger("focus");
}
},

// Hide toolbar and caption
// ========================

hideControls:function hideControls(andCaption){
var self=this,
arr=["infobar","toolbar","nav"];

if(andCaption||!self.current.opts.preventCaptionOverlap){
arr.push("caption");
}

this.$refs.container.removeClass(
arr.
map(function(i){
return "fancybox-show-"+i;
}).
join(" "));


this.hasHiddenControls=true;
},

showControls:function showControls(){
var self=this,
opts=self.current?self.current.opts:self.opts,
$container=self.$refs.container;

self.hasHiddenControls=false;
self.idleSecondsCounter=0;

$container.
toggleClass("fancybox-show-toolbar",!!(opts.toolbar&&opts.buttons)).
toggleClass("fancybox-show-infobar",!!(opts.infobar&&self.group.length>1)).
toggleClass("fancybox-show-caption",!!self.$caption).
toggleClass("fancybox-show-nav",!!(opts.arrows&&self.group.length>1)).
toggleClass("fancybox-is-modal",!!opts.modal);
},

// Toggle toolbar and caption
// ==========================

toggleControls:function toggleControls(){
if(this.hasHiddenControls){
this.showControls();
}else {
this.hideControls();
}
}});


$.fancybox={
version:"3.5.7",
defaults:defaults,

// Get current instance and execute a command.
//
// Examples of usage:
//
//   $instance = $.fancybox.getInstance();
//   $.fancybox.getInstance().jumpTo( 1 );
//   $.fancybox.getInstance( 'jumpTo', 1 );
//   $.fancybox.getInstance( function() {
//       console.info( this.currIndex );
//   });
// ======================================================

getInstance:function getInstance(command){
var instance=$('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
args=Array.prototype.slice.call(arguments,1);

if(instance instanceof FancyBox){
if($.type(command)==="string"){
instance[command].apply(instance,args);
}else if($.type(command)==="function"){
command.apply(instance,args);
}

return instance;
}

return false;
},

// Create new instance
// ===================

open:function open(items,opts,index){
return new FancyBox(items,opts,index);
},

// Close current or all instances
// ==============================

close:function close(all){
var instance=this.getInstance();

if(instance){
instance.close();

// Try to find and close next instance
if(all===true){
this.close(all);
}
}
},

// Close all instances and unbind all events
// =========================================

destroy:function destroy(){
this.close(true);

$D.add("body").off("click.fb-start","**");
},

// Try to detect mobile devices
// ============================

isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

// Detect if 'translate3d' support is available
// ============================================

use3d:function(){
var div=document.createElement("div");

return(
window.getComputedStyle&&
window.getComputedStyle(div)&&
window.getComputedStyle(div).getPropertyValue("transform")&&
!(document.documentMode&&document.documentMode<11));

}(),

// Helper function to get current visual state of an element
// returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
// =====================================================================

getTranslate:function getTranslate($el){
var domRect;

if(!$el||!$el.length){
return false;
}

domRect=$el[0].getBoundingClientRect();

return {
top:domRect.top||0,
left:domRect.left||0,
width:domRect.width,
height:domRect.height,
opacity:parseFloat($el.css("opacity"))};

},

// Shortcut for setting "translate3d" properties for element
// Can set be used to set opacity, too
// ========================================================

setTranslate:function setTranslate($el,props){
var str="",
css={};

if(!$el||!props){
return;
}

if(props.left!==undefined$1||props.top!==undefined$1){
str=
(props.left===undefined$1?$el.position().left:props.left)+
"px, "+(
props.top===undefined$1?$el.position().top:props.top)+
"px";

if(this.use3d){
str="translate3d("+str+", 0px)";
}else {
str="translate("+str+")";
}
}

if(props.scaleX!==undefined$1&&props.scaleY!==undefined$1){
str+=" scale("+props.scaleX+", "+props.scaleY+")";
}else if(props.scaleX!==undefined$1){
str+=" scaleX("+props.scaleX+")";
}

if(str.length){
css.transform=str;
}

if(props.opacity!==undefined$1){
css.opacity=props.opacity;
}

if(props.width!==undefined$1){
css.width=props.width;
}

if(props.height!==undefined$1){
css.height=props.height;
}

return $el.css(css);
},

// Simple CSS transition handler
// =============================

animate:function animate($el,to,duration,callback,leaveAnimationName){
var self=this,
from;

if($.isFunction(duration)){
callback=duration;
duration=null;
}

self.stop($el);

from=self.getTranslate($el);

$el.on(transitionEnd,function(e){
// Skip events from child elements and z-index change
if(e&&e.originalEvent&&(!$el.is(e.originalEvent.target)||e.originalEvent.propertyName=="z-index")){
return;
}

self.stop($el);

if($.isNumeric(duration)){
$el.css("transition-duration","");
}

if($.isPlainObject(to)){
if(to.scaleX!==undefined$1&&to.scaleY!==undefined$1){
self.setTranslate($el,{
top:to.top,
left:to.left,
width:from.width*to.scaleX,
height:from.height*to.scaleY,
scaleX:1,
scaleY:1});

}
}else if(leaveAnimationName!==true){
$el.removeClass(to);
}

if($.isFunction(callback)){
callback(e);
}
});

if($.isNumeric(duration)){
$el.css("transition-duration",duration+"ms");
}

// Start animation by changing CSS properties or class name
if($.isPlainObject(to)){
if(to.scaleX!==undefined$1&&to.scaleY!==undefined$1){
delete to.width;
delete to.height;

if($el.parent().hasClass("fancybox-slide--image")){
$el.parent().addClass("fancybox-is-scaling");
}
}

$.fancybox.setTranslate($el,to);
}else {
$el.addClass(to);
}

// Make sure that `transitionend` callback gets fired
$el.data(
"timer",
setTimeout(function(){
$el.trigger(transitionEnd);
},duration+33));

},

stop:function stop($el,callCallback){
if($el&&$el.length){
clearTimeout($el.data("timer"));

if(callCallback){
$el.trigger(transitionEnd);
}

$el.off(transitionEnd).css("transition-duration","");

$el.parent().removeClass("fancybox-is-scaling");
}
}};


// Default click handler for "fancyboxed" links
// ============================================

function _run(e,opts){
var items=[],
index=0,
$target,
value,
instance;

// Avoid opening multiple times
if(e&&e.isDefaultPrevented()){
return;
}

e.preventDefault();

opts=opts||{};

if(e&&e.data){
opts=mergeOpts(e.data.options,opts);
}

$target=opts.$target||$(e.currentTarget).trigger("blur");
instance=$.fancybox.getInstance();

if(instance&&instance.$trigger&&instance.$trigger.is($target)){
return;
}

if(opts.selector){
items=$(opts.selector);
}else {
// Get all related items and find index for clicked one
value=$target.attr("data-fancybox")||"";

if(value){
items=e.data?e.data.items:[];
items=items.length?items.filter('[data-fancybox="'+value+'"]'):$('[data-fancybox="'+value+'"]');
}else {
items=[$target];
}
}

index=$(items).index($target);

// Sometimes current item can not be found
if(index<0){
index=0;
}

instance=$.fancybox.open(items,opts,index);

// Save last active element
instance.$trigger=$target;
}

// Create a jQuery plugin
// ======================

$.fn.fancybox=function(options){
var selector;

options=options||{};
selector=options.selector||false;

if(selector){
// Use body element instead of document so it executes first
$("body").
off("click.fb-start",selector).
on("click.fb-start",selector,{
options:options},
_run);
}else {
this.off("click.fb-start").on(
"click.fb-start",{
items:this,
options:options},

_run);

}

return this;
};

// Self initializing plugin for all elements having `data-fancybox` attribute
// ==========================================================================

$D.on("click.fb-start","[data-fancybox]",_run);

// Enable "trigger elements"
// =========================

$D.on("click.fb-start","[data-fancybox-trigger]",function(e){
$('[data-fancybox="'+$(this).attr("data-fancybox-trigger")+'"]').
eq($(this).attr("data-fancybox-index")||0).
trigger("click.fb-start",{
$trigger:$(this)});

});

// Track focus event for better accessibility styling
// ==================================================
(function(){
var buttonStr=".fancybox-button",
focusStr="fancybox-focus",
$pressed=null;

$D.on("mousedown mouseup focus blur",buttonStr,function(e){
switch(e.type){
case"mousedown":
$pressed=$(this);
break;
case"mouseup":
$pressed=null;
break;
case"focusin":
$(buttonStr).removeClass(focusStr);

if(!$(this).is($pressed)&&!$(this).is("[disabled]")){
$(this).addClass(focusStr);
}
break;
case"focusout":
$(buttonStr).removeClass(focusStr);
break;}

});
})();
})(window,document,jQuery);
// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function($){

// Object containing properties for each media type
var defaults={
youtube:{
matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
params:{
autoplay:1,
autohide:1,
fs:1,
rel:0,
hd:1,
wmode:"transparent",
enablejsapi:1,
html5:1},

paramPlace:8,
type:"iframe",
url:"https://www.youtube-nocookie.com/embed/$4",
thumb:"https://img.youtube.com/vi/$4/hqdefault.jpg"},


vimeo:{
matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
params:{
autoplay:1,
hd:1,
show_title:1,
show_byline:1,
show_portrait:0,
fullscreen:1},

paramPlace:3,
type:"iframe",
url:"//player.vimeo.com/video/$2"},


instagram:{
matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
type:"image",
url:"//$1/p/$2/media/?size=l"},


// Examples:
// http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
// https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
// https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
// https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
gmap_place:{
matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
type:"iframe",
url:function url(rez){
return(
"//maps.google."+
rez[2]+
"/?ll="+
(rez[9]?rez[9]+"&z="+Math.floor(rez[10])+(rez[12]?rez[12].replace(/^\//,"&"):""):rez[12]+"").replace(/\?/,"&")+
"&output="+(
rez[12]&&rez[12].indexOf("layer=c")>0?"svembed":"embed"));

}},


// Examples:
// https://www.google.com/maps/search/Empire+State+Building/
// https://www.google.com/maps/search/?api=1&query=centurylink+field
// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
gmap_search:{
matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
type:"iframe",
url:function url(rez){
return "//maps.google."+rez[2]+"/maps?q="+rez[5].replace("query=","q=").replace("api=1","")+"&output=embed";
}}};



// Formats matching url to final form
var format=function format(url,rez,params){
if(!url){
return;
}

params=params||"";

if($.type(params)==="object"){
params=$.param(params,true);
}

$.each(rez,function(key,value){
url=url.replace("$"+key,value||"");
});

if(params.length){
url+=(url.indexOf("?")>0?"&":"?")+params;
}

return url;
};

$(document).on("objectNeedsType.fb",function(e,instance,item){
var url=item.src||"",
type=false,
media,
thumb,
rez,
params,
urlParams,
paramObj,
provider;

media=$.extend(true,{},defaults,item.opts.media);

// Look for any matching media type
$.each(media,function(providerName,providerOpts){
rez=url.match(providerOpts.matcher);

if(!rez){
return;
}

type=providerOpts.type;
provider=providerName;
paramObj={};

if(providerOpts.paramPlace&&rez[providerOpts.paramPlace]){
urlParams=rez[providerOpts.paramPlace];

if(urlParams[0]=="?"){
urlParams=urlParams.substring(1);
}

urlParams=urlParams.split("&");

for(var m=0;m<urlParams.length;++m){
var p=urlParams[m].split("=",2);

if(p.length==2){
paramObj[p[0]]=decodeURIComponent(p[1].replace(/\+/g," "));
}
}
}

params=$.extend(true,{},providerOpts.params,item.opts[providerName],paramObj);

url=
$.type(providerOpts.url)==="function"?providerOpts.url.call(this,rez,params,item):format(providerOpts.url,rez,params);

thumb=
$.type(providerOpts.thumb)==="function"?providerOpts.thumb.call(this,rez,params,item):format(providerOpts.thumb,rez);

if(providerName==="youtube"){
url=url.replace(/&t=((\d+)m)?(\d+)s/,function(match,p1,m,s){
return "&start="+((m?parseInt(m,10)*60:0)+parseInt(s,10));
});
}else if(providerName==="vimeo"){
url=url.replace("&%23","#");
}

return false;
});

// If it is found, then change content type and update the url

if(type){
if(!item.opts.thumb&&!(item.opts.$thumb&&item.opts.$thumb.length)){
item.opts.thumb=thumb;
}

if(type==="iframe"){
item.opts=$.extend(true,item.opts,{
iframe:{
preload:false,
attr:{
scrolling:"no"}}});



}

$.extend(item,{
type:type,
src:url,
origSrc:item.src,
contentSource:provider,
contentType:type==="image"?"image":provider=="gmap_place"||provider=="gmap_search"?"map":"video"});

}else if(url){
item.type=item.opts.defaultType;
}
});

// Load YouTube/Video API on request to detect when video finished playing
var VideoAPILoader={
youtube:{
src:"https://www.youtube.com/iframe_api",
class:"YT",
loading:false,
loaded:false},


vimeo:{
src:"https://player.vimeo.com/api/player.js",
class:"Vimeo",
loading:false,
loaded:false},


load:function load(vendor){
var _this=this,
script;

if(this[vendor].loaded){
setTimeout(function(){
_this.done(vendor);
});
return;
}

if(this[vendor].loading){
return;
}

this[vendor].loading=true;

script=document.createElement("script");
script.type="text/javascript";
script.src=this[vendor].src;

if(vendor==="youtube"){
window.onYouTubeIframeAPIReady=function(){
_this[vendor].loaded=true;
_this.done(vendor);
};
}else {
script.onload=function(){
_this[vendor].loaded=true;
_this.done(vendor);
};
}

document.body.appendChild(script);
},
done:function done(vendor){
var instance,$el,player;

if(vendor==="youtube"){
delete window.onYouTubeIframeAPIReady;
}

instance=$.fancybox.getInstance();

if(instance){
$el=instance.current.$content.find("iframe");

if(vendor==="youtube"&&YT!==undefined&&YT){
player=new YT.Player($el.attr("id"),{
events:{
onStateChange:function onStateChange(e){
if(e.data==0){
instance.next();
}
}}});


}else if(vendor==="vimeo"&&Vimeo!==undefined&&Vimeo){
player=new Vimeo.Player($el);

player.on("ended",function(){
instance.next();
});
}
}
}};


$(document).on({
"afterShow.fb":function afterShowFb(e,instance,current){
if(instance.group.length>1&&(current.contentSource==="youtube"||current.contentSource==="vimeo")){
VideoAPILoader.load(current.contentSource);
}
}});

})(jQuery);
// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function(window,document,$){

var requestAFrame=function(){
return(
window.requestAnimationFrame||
window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||
window.oRequestAnimationFrame||
// if all else fails, use setTimeout
function(callback){
return window.setTimeout(callback,1000/60);
});

}();

var cancelAFrame=function(){
return(
window.cancelAnimationFrame||
window.webkitCancelAnimationFrame||
window.mozCancelAnimationFrame||
window.oCancelAnimationFrame||
function(id){
window.clearTimeout(id);
});

}();

var getPointerXY=function getPointerXY(e){
var result=[];

e=e.originalEvent||e||window.e;
e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];

for(var key in e){
if(e[key].pageX){
result.push({
x:e[key].pageX,
y:e[key].pageY});

}else if(e[key].clientX){
result.push({
x:e[key].clientX,
y:e[key].clientY});

}
}

return result;
};

var distance=function distance(point2,point1,what){
if(!point1||!point2){
return 0;
}

if(what==="x"){
return point2.x-point1.x;
}else if(what==="y"){
return point2.y-point1.y;
}

return Math.sqrt(Math.pow(point2.x-point1.x,2)+Math.pow(point2.y-point1.y,2));
};

var isClickable=function isClickable($el){
if(
$el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe')||
$.isFunction($el.get(0).onclick)||
$el.data("selectable"))
{
return true;
}

// Check for attributes like data-fancybox-next or data-fancybox-close
for(var i=0,atts=$el[0].attributes,n=atts.length;i<n;i++){
if(atts[i].nodeName.substr(0,14)==="data-fancybox-"){
return true;
}
}

return false;
};

var hasScrollbars=function hasScrollbars(el){
var overflowY=window.getComputedStyle(el)["overflow-y"],
overflowX=window.getComputedStyle(el)["overflow-x"],
vertical=(overflowY==="scroll"||overflowY==="auto")&&el.scrollHeight>el.clientHeight,
horizontal=(overflowX==="scroll"||overflowX==="auto")&&el.scrollWidth>el.clientWidth;

return vertical||horizontal;
};

var isScrollable=function isScrollable($el){
var rez=false;

while(true){
rez=hasScrollbars($el.get(0));

if(rez){
break;
}

$el=$el.parent();

if(!$el.length||$el.hasClass("fancybox-stage")||$el.is("body")){
break;
}
}

return rez;
};

var Guestures=function Guestures(instance){
var self=this;

self.instance=instance;

self.$bg=instance.$refs.bg;
self.$stage=instance.$refs.stage;
self.$container=instance.$refs.container;

self.destroy();

self.$container.on("touchstart.fb.touch mousedown.fb.touch",$.proxy(self,"ontouchstart"));
};

Guestures.prototype.destroy=function(){
var self=this;

self.$container.off(".fb.touch");

$(document).off(".fb.touch");

if(self.requestId){
cancelAFrame(self.requestId);
self.requestId=null;
}

if(self.tapped){
clearTimeout(self.tapped);
self.tapped=null;
}
};

Guestures.prototype.ontouchstart=function(e){
var self=this,
$target=$(e.target),
instance=self.instance,
current=instance.current,
$slide=current.$slide,
$content=current.$content,
isTouchDevice=e.type=="touchstart";

// Do not respond to both (touch and mouse) events
if(isTouchDevice){
self.$container.off("mousedown.fb.touch");
}

// Ignore right click
if(e.originalEvent&&e.originalEvent.button==2){
return;
}

// Ignore taping on links, buttons, input elements
if(!$slide.length||!$target.length||isClickable($target)||isClickable($target.parent())){
return;
}
// Ignore clicks on the scrollbar
if(!$target.is("img")&&e.originalEvent.clientX>$target[0].clientWidth+$target.offset().left){
return;
}

// Ignore clicks while zooming or closing
if(!current||instance.isAnimating||current.$slide.hasClass("fancybox-animated")){
e.stopPropagation();
e.preventDefault();

return;
}

self.realPoints=self.startPoints=getPointerXY(e);

if(!self.startPoints.length){
return;
}

// Allow other scripts to catch touch event if "touch" is set to false
if(current.touch){
e.stopPropagation();
}

self.startEvent=e;

self.canTap=true;
self.$target=$target;
self.$content=$content;
self.opts=current.opts.touch;

self.isPanning=false;
self.isSwiping=false;
self.isZooming=false;
self.isScrolling=false;
self.canPan=instance.canPan();

self.startTime=new Date().getTime();
self.distanceX=self.distanceY=self.distance=0;

self.canvasWidth=Math.round($slide[0].clientWidth);
self.canvasHeight=Math.round($slide[0].clientHeight);

self.contentLastPos=null;
self.contentStartPos=$.fancybox.getTranslate(self.$content)||{
top:0,
left:0};

self.sliderStartPos=$.fancybox.getTranslate($slide);

// Since position will be absolute, but we need to make it relative to the stage
self.stagePos=$.fancybox.getTranslate(instance.$refs.stage);

self.sliderStartPos.top-=self.stagePos.top;
self.sliderStartPos.left-=self.stagePos.left;

self.contentStartPos.top-=self.stagePos.top;
self.contentStartPos.left-=self.stagePos.left;

$(document).
off(".fb.touch").
on(isTouchDevice?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",$.proxy(self,"ontouchend")).
on(isTouchDevice?"touchmove.fb.touch":"mousemove.fb.touch",$.proxy(self,"ontouchmove"));

if($.fancybox.isMobile){
document.addEventListener("scroll",self.onscroll,true);
}

// Skip if clicked outside the sliding area
if(!(self.opts||self.canPan)||!($target.is(self.$stage)||self.$stage.find($target).length)){
if($target.is(".fancybox-image")){
e.preventDefault();
}

if(!($.fancybox.isMobile&&$target.parents(".fancybox-caption").length)){
return;
}
}

self.isScrollable=isScrollable($target)||isScrollable($target.parent());

// Check if element is scrollable and try to prevent default behavior (scrolling)
if(!($.fancybox.isMobile&&self.isScrollable)){
e.preventDefault();
}

// One finger or mouse click - swipe or pan an image
if(self.startPoints.length===1||current.hasError){
if(self.canPan){
$.fancybox.stop(self.$content);

self.isPanning=true;
}else {
self.isSwiping=true;
}

self.$container.addClass("fancybox-is-grabbing");
}

// Two fingers - zoom image
if(self.startPoints.length===2&&current.type==="image"&&(current.isLoaded||current.$ghost)){
self.canTap=false;
self.isSwiping=false;
self.isPanning=false;

self.isZooming=true;

$.fancybox.stop(self.$content);

self.centerPointStartX=(self.startPoints[0].x+self.startPoints[1].x)*0.5-$(window).scrollLeft();
self.centerPointStartY=(self.startPoints[0].y+self.startPoints[1].y)*0.5-$(window).scrollTop();

self.percentageOfImageAtPinchPointX=(self.centerPointStartX-self.contentStartPos.left)/self.contentStartPos.width;
self.percentageOfImageAtPinchPointY=(self.centerPointStartY-self.contentStartPos.top)/self.contentStartPos.height;

self.startDistanceBetweenFingers=distance(self.startPoints[0],self.startPoints[1]);
}
};

Guestures.prototype.onscroll=function(e){
var self=this;

self.isScrolling=true;

document.removeEventListener("scroll",self.onscroll,true);
};

Guestures.prototype.ontouchmove=function(e){
var self=this;

// Make sure user has not released over iframe or disabled element
if(e.originalEvent.buttons!==undefined&&e.originalEvent.buttons===0){
self.ontouchend(e);
return;
}

if(self.isScrolling){
self.canTap=false;
return;
}

self.newPoints=getPointerXY(e);

if(!(self.opts||self.canPan)||!self.newPoints.length||!self.newPoints.length){
return;
}

if(!(self.isSwiping&&self.isSwiping===true)){
e.preventDefault();
}

self.distanceX=distance(self.newPoints[0],self.startPoints[0],"x");
self.distanceY=distance(self.newPoints[0],self.startPoints[0],"y");

self.distance=distance(self.newPoints[0],self.startPoints[0]);

// Skip false ontouchmove events (Chrome)
if(self.distance>0){
if(self.isSwiping){
self.onSwipe(e);
}else if(self.isPanning){
self.onPan();
}else if(self.isZooming){
self.onZoom();
}
}
};

Guestures.prototype.onSwipe=function(e){
var self=this,
instance=self.instance,
swiping=self.isSwiping,
left=self.sliderStartPos.left||0,
angle;

// If direction is not yet determined
if(swiping===true){
// We need at least 10px distance to correctly calculate an angle
if(Math.abs(self.distance)>10){
self.canTap=false;

if(instance.group.length<2&&self.opts.vertical){
self.isSwiping="y";
}else if(instance.isDragging||self.opts.vertical===false||self.opts.vertical==="auto"&&$(window).width()>800){
self.isSwiping="x";
}else {
angle=Math.abs(Math.atan2(self.distanceY,self.distanceX)*180/Math.PI);

self.isSwiping=angle>45&&angle<135?"y":"x";
}

if(self.isSwiping==="y"&&$.fancybox.isMobile&&self.isScrollable){
self.isScrolling=true;

return;
}

instance.isDragging=self.isSwiping;

// Reset points to avoid jumping, because we dropped first swipes to calculate the angle
self.startPoints=self.newPoints;

$.each(instance.slides,function(index,slide){
var slidePos,stagePos;

$.fancybox.stop(slide.$slide);

slidePos=$.fancybox.getTranslate(slide.$slide);
stagePos=$.fancybox.getTranslate(instance.$refs.stage);

slide.$slide.
css({
transform:"",
opacity:"",
"transition-duration":""}).

removeClass("fancybox-animated").
removeClass(function(index,className){
return (className.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ");
});

if(slide.pos===instance.current.pos){
self.sliderStartPos.top=slidePos.top-stagePos.top;
self.sliderStartPos.left=slidePos.left-stagePos.left;
}

$.fancybox.setTranslate(slide.$slide,{
top:slidePos.top-stagePos.top,
left:slidePos.left-stagePos.left});

});

// Stop slideshow
if(instance.SlideShow&&instance.SlideShow.isActive){
instance.SlideShow.stop();
}
}

return;
}

// Sticky edges
if(swiping=="x"){
if(
self.distanceX>0&&(
self.instance.group.length<2||self.instance.current.index===0&&!self.instance.current.opts.loop))
{
left=left+Math.pow(self.distanceX,0.8);
}else if(
self.distanceX<0&&(
self.instance.group.length<2||
self.instance.current.index===self.instance.group.length-1&&!self.instance.current.opts.loop))
{
left=left-Math.pow(-self.distanceX,0.8);
}else {
left=left+self.distanceX;
}
}

self.sliderLastPos={
top:swiping=="x"?0:self.sliderStartPos.top+self.distanceY,
left:left};


if(self.requestId){
cancelAFrame(self.requestId);

self.requestId=null;
}

self.requestId=requestAFrame(function(){
if(self.sliderLastPos){
$.each(self.instance.slides,function(index,slide){
var pos=slide.pos-self.instance.currPos;

$.fancybox.setTranslate(slide.$slide,{
top:self.sliderLastPos.top,
left:self.sliderLastPos.left+pos*self.canvasWidth+pos*slide.opts.gutter});

});

self.$container.addClass("fancybox-is-sliding");
}
});
};

Guestures.prototype.onPan=function(){
var self=this;

// Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
if(distance(self.newPoints[0],self.realPoints[0])<($.fancybox.isMobile?10:5)){
self.startPoints=self.newPoints;
return;
}

self.canTap=false;

self.contentLastPos=self.limitMovement();

if(self.requestId){
cancelAFrame(self.requestId);
}

self.requestId=requestAFrame(function(){
$.fancybox.setTranslate(self.$content,self.contentLastPos);
});
};

// Make panning sticky to the edges
Guestures.prototype.limitMovement=function(){
var self=this;

var canvasWidth=self.canvasWidth;
var canvasHeight=self.canvasHeight;

var distanceX=self.distanceX;
var distanceY=self.distanceY;

var contentStartPos=self.contentStartPos;

var currentOffsetX=contentStartPos.left;
var currentOffsetY=contentStartPos.top;

var currentWidth=contentStartPos.width;
var currentHeight=contentStartPos.height;

var minTranslateX,minTranslateY,maxTranslateX,maxTranslateY,newOffsetX,newOffsetY;

if(currentWidth>canvasWidth){
newOffsetX=currentOffsetX+distanceX;
}else {
newOffsetX=currentOffsetX;
}

newOffsetY=currentOffsetY+distanceY;

// Slow down proportionally to traveled distance
minTranslateX=Math.max(0,canvasWidth*0.5-currentWidth*0.5);
minTranslateY=Math.max(0,canvasHeight*0.5-currentHeight*0.5);

maxTranslateX=Math.min(canvasWidth-currentWidth,canvasWidth*0.5-currentWidth*0.5);
maxTranslateY=Math.min(canvasHeight-currentHeight,canvasHeight*0.5-currentHeight*0.5);

//   ->
if(distanceX>0&&newOffsetX>minTranslateX){
newOffsetX=minTranslateX-1+Math.pow(-minTranslateX+currentOffsetX+distanceX,0.8)||0;
}

//    <-
if(distanceX<0&&newOffsetX<maxTranslateX){
newOffsetX=maxTranslateX+1-Math.pow(maxTranslateX-currentOffsetX-distanceX,0.8)||0;
}

//   \/
if(distanceY>0&&newOffsetY>minTranslateY){
newOffsetY=minTranslateY-1+Math.pow(-minTranslateY+currentOffsetY+distanceY,0.8)||0;
}

//   /\
if(distanceY<0&&newOffsetY<maxTranslateY){
newOffsetY=maxTranslateY+1-Math.pow(maxTranslateY-currentOffsetY-distanceY,0.8)||0;
}

return {
top:newOffsetY,
left:newOffsetX};

};

Guestures.prototype.limitPosition=function(newOffsetX,newOffsetY,newWidth,newHeight){
var self=this;

var canvasWidth=self.canvasWidth;
var canvasHeight=self.canvasHeight;

if(newWidth>canvasWidth){
newOffsetX=newOffsetX>0?0:newOffsetX;
newOffsetX=newOffsetX<canvasWidth-newWidth?canvasWidth-newWidth:newOffsetX;
}else {
// Center horizontally
newOffsetX=Math.max(0,canvasWidth/2-newWidth/2);
}

if(newHeight>canvasHeight){
newOffsetY=newOffsetY>0?0:newOffsetY;
newOffsetY=newOffsetY<canvasHeight-newHeight?canvasHeight-newHeight:newOffsetY;
}else {
// Center vertically
newOffsetY=Math.max(0,canvasHeight/2-newHeight/2);
}

return {
top:newOffsetY,
left:newOffsetX};

};

Guestures.prototype.onZoom=function(){
var self=this;

// Calculate current distance between points to get pinch ratio and new width and height
var contentStartPos=self.contentStartPos;

var currentWidth=contentStartPos.width;
var currentHeight=contentStartPos.height;

var currentOffsetX=contentStartPos.left;
var currentOffsetY=contentStartPos.top;

var endDistanceBetweenFingers=distance(self.newPoints[0],self.newPoints[1]);

var pinchRatio=endDistanceBetweenFingers/self.startDistanceBetweenFingers;

var newWidth=Math.floor(currentWidth*pinchRatio);
var newHeight=Math.floor(currentHeight*pinchRatio);

// This is the translation due to pinch-zooming
var translateFromZoomingX=(currentWidth-newWidth)*self.percentageOfImageAtPinchPointX;
var translateFromZoomingY=(currentHeight-newHeight)*self.percentageOfImageAtPinchPointY;

// Point between the two touches
var centerPointEndX=(self.newPoints[0].x+self.newPoints[1].x)/2-$(window).scrollLeft();
var centerPointEndY=(self.newPoints[0].y+self.newPoints[1].y)/2-$(window).scrollTop();

// And this is the translation due to translation of the centerpoint
// between the two fingers
var translateFromTranslatingX=centerPointEndX-self.centerPointStartX;
var translateFromTranslatingY=centerPointEndY-self.centerPointStartY;

// The new offset is the old/current one plus the total translation
var newOffsetX=currentOffsetX+(translateFromZoomingX+translateFromTranslatingX);
var newOffsetY=currentOffsetY+(translateFromZoomingY+translateFromTranslatingY);

var newPos={
top:newOffsetY,
left:newOffsetX,
scaleX:pinchRatio,
scaleY:pinchRatio};


self.canTap=false;

self.newWidth=newWidth;
self.newHeight=newHeight;

self.contentLastPos=newPos;

if(self.requestId){
cancelAFrame(self.requestId);
}

self.requestId=requestAFrame(function(){
$.fancybox.setTranslate(self.$content,self.contentLastPos);
});
};

Guestures.prototype.ontouchend=function(e){
var self=this;

var swiping=self.isSwiping;
var panning=self.isPanning;
var zooming=self.isZooming;
var scrolling=self.isScrolling;

self.endPoints=getPointerXY(e);
self.dMs=Math.max(new Date().getTime()-self.startTime,1);

self.$container.removeClass("fancybox-is-grabbing");

$(document).off(".fb.touch");

document.removeEventListener("scroll",self.onscroll,true);

if(self.requestId){
cancelAFrame(self.requestId);

self.requestId=null;
}

self.isSwiping=false;
self.isPanning=false;
self.isZooming=false;
self.isScrolling=false;

self.instance.isDragging=false;

if(self.canTap){
return self.onTap(e);
}

self.speed=100;

// Speed in px/ms
self.velocityX=self.distanceX/self.dMs*0.5;
self.velocityY=self.distanceY/self.dMs*0.5;

if(panning){
self.endPanning();
}else if(zooming){
self.endZooming();
}else {
self.endSwiping(swiping,scrolling);
}

return;
};

Guestures.prototype.endSwiping=function(swiping,scrolling){
var self=this,
ret=false,
len=self.instance.group.length,
distanceX=Math.abs(self.distanceX),
canAdvance=swiping=="x"&&len>1&&(self.dMs>130&&distanceX>10||distanceX>50),
speedX=300;

self.sliderLastPos=null;

// Close if swiped vertically / navigate if horizontally
if(swiping=="y"&&!scrolling&&Math.abs(self.distanceY)>50){
// Continue vertical movement
$.fancybox.animate(
self.instance.current.$slide,{
top:self.sliderStartPos.top+self.distanceY+self.velocityY*150,
opacity:0},

200);

ret=self.instance.close(true,250);
}else if(canAdvance&&self.distanceX>0){
ret=self.instance.previous(speedX);
}else if(canAdvance&&self.distanceX<0){
ret=self.instance.next(speedX);
}

if(ret===false&&(swiping=="x"||swiping=="y")){
self.instance.centerSlide(200);
}

self.$container.removeClass("fancybox-is-sliding");
};

// Limit panning from edges
// ========================
Guestures.prototype.endPanning=function(){
var self=this,
newOffsetX,
newOffsetY,
newPos;

if(!self.contentLastPos){
return;
}

if(self.opts.momentum===false||self.dMs>350){
newOffsetX=self.contentLastPos.left;
newOffsetY=self.contentLastPos.top;
}else {
// Continue movement
newOffsetX=self.contentLastPos.left+self.velocityX*500;
newOffsetY=self.contentLastPos.top+self.velocityY*500;
}

newPos=self.limitPosition(newOffsetX,newOffsetY,self.contentStartPos.width,self.contentStartPos.height);

newPos.width=self.contentStartPos.width;
newPos.height=self.contentStartPos.height;

$.fancybox.animate(self.$content,newPos,366);
};

Guestures.prototype.endZooming=function(){
var self=this;

var current=self.instance.current;

var newOffsetX,newOffsetY,newPos,reset;

var newWidth=self.newWidth;
var newHeight=self.newHeight;

if(!self.contentLastPos){
return;
}

newOffsetX=self.contentLastPos.left;
newOffsetY=self.contentLastPos.top;

reset={
top:newOffsetY,
left:newOffsetX,
width:newWidth,
height:newHeight,
scaleX:1,
scaleY:1};


// Reset scalex/scaleY values; this helps for perfomance and does not break animation
$.fancybox.setTranslate(self.$content,reset);

if(newWidth<self.canvasWidth&&newHeight<self.canvasHeight){
self.instance.scaleToFit(150);
}else if(newWidth>current.width||newHeight>current.height){
self.instance.scaleToActual(self.centerPointStartX,self.centerPointStartY,150);
}else {
newPos=self.limitPosition(newOffsetX,newOffsetY,newWidth,newHeight);

$.fancybox.animate(self.$content,newPos,150);
}
};

Guestures.prototype.onTap=function(e){
var self=this;
var $target=$(e.target);

var instance=self.instance;
var current=instance.current;

var endPoints=e&&getPointerXY(e)||self.startPoints;

var tapX=endPoints[0]?endPoints[0].x-$(window).scrollLeft()-self.stagePos.left:0;
var tapY=endPoints[0]?endPoints[0].y-$(window).scrollTop()-self.stagePos.top:0;

var where;

var process=function process(prefix){
var action=current.opts[prefix];

if($.isFunction(action)){
action=action.apply(instance,[current,e]);
}

if(!action){
return;
}

switch(action){
case"close":
instance.close(self.startEvent);

break;

case"toggleControls":
instance.toggleControls();

break;

case"next":
instance.next();

break;

case"nextOrClose":
if(instance.group.length>1){
instance.next();
}else {
instance.close(self.startEvent);
}

break;

case"zoom":
if(current.type=="image"&&(current.isLoaded||current.$ghost)){
if(instance.canPan()){
instance.scaleToFit();
}else if(instance.isScaledDown()){
instance.scaleToActual(tapX,tapY);
}else if(instance.group.length<2){
instance.close(self.startEvent);
}
}

break;}

};

// Ignore right click
if(e.originalEvent&&e.originalEvent.button==2){
return;
}

// Skip if clicked on the scrollbar
if(!$target.is("img")&&tapX>$target[0].clientWidth+$target.offset().left){
return;
}

// Check where is clicked
if($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")){
where="Outside";
}else if($target.is(".fancybox-slide")){
where="Slide";
}else if(
instance.current.$content&&
instance.current.$content.
find($target).
addBack().
filter($target).length)
{
where="Content";
}else {
return;
}

// Check if this is a double tap
if(self.tapped){
// Stop previously created single tap
clearTimeout(self.tapped);
self.tapped=null;

// Skip if distance between taps is too big
if(Math.abs(tapX-self.tapX)>50||Math.abs(tapY-self.tapY)>50){
return this;
}

// OK, now we assume that this is a double-tap
process("dblclick"+where);
}else {
// Single tap will be processed if user has not clicked second time within 300ms
// or there is no need to wait for double-tap
self.tapX=tapX;
self.tapY=tapY;

if(current.opts["dblclick"+where]&&current.opts["dblclick"+where]!==current.opts["click"+where]){
self.tapped=setTimeout(function(){
self.tapped=null;

if(!instance.isAnimating){
process("click"+where);
}
},500);
}else {
process("click"+where);
}
}

return this;
};

$(document).
on("onActivate.fb",function(e,instance){
if(instance&&!instance.Guestures){
instance.Guestures=new Guestures(instance);
}
}).
on("beforeClose.fb",function(e,instance){
if(instance&&instance.Guestures){
instance.Guestures.destroy();
}
});
})(window,document,jQuery);
// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function(document,$){

$.extend(true,$.fancybox.defaults,{
btnTpl:{
slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>'+
"</button>"},

slideShow:{
autoStart:false,
speed:3000,
progress:true}});



var SlideShow=function SlideShow(instance){
this.instance=instance;
this.init();
};

$.extend(SlideShow.prototype,{
timer:null,
isActive:false,
$button:null,

init:function init(){
var self=this,
instance=self.instance,
opts=instance.group[instance.currIndex].opts.slideShow;

self.$button=instance.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){
self.toggle();
});

if(instance.group.length<2||!opts){
self.$button.hide();
}else if(opts.progress){
self.$progress=$('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner);
}
},

set:function set(force){
var self=this,
instance=self.instance,
current=instance.current;

// Check if reached last element
if(current&&(force===true||current.opts.loop||instance.currIndex<instance.group.length-1)){
if(self.isActive&&current.contentType!=="video"){
if(self.$progress){
$.fancybox.animate(self.$progress.show(),{
scaleX:1},
current.opts.slideShow.speed);
}

self.timer=setTimeout(function(){
if(!instance.current.opts.loop&&instance.current.index==instance.group.length-1){
instance.jumpTo(0);
}else {
instance.next();
}
},current.opts.slideShow.speed);
}
}else {
self.stop();
instance.idleSecondsCounter=0;
instance.showControls();
}
},

clear:function clear(){
var self=this;

clearTimeout(self.timer);

self.timer=null;

if(self.$progress){
self.$progress.removeAttr("style").hide();
}
},

start:function start(){
var self=this,
current=self.instance.current;

if(current){
self.$button.
attr("title",(current.opts.i18n[current.opts.lang]||current.opts.i18n.en).PLAY_STOP).
removeClass("fancybox-button--play").
addClass("fancybox-button--pause");

self.isActive=true;

if(current.isComplete){
self.set(true);
}

self.instance.trigger("onSlideShowChange",true);
}
},

stop:function stop(){
var self=this,
current=self.instance.current;

self.clear();

self.$button.
attr("title",(current.opts.i18n[current.opts.lang]||current.opts.i18n.en).PLAY_START).
removeClass("fancybox-button--pause").
addClass("fancybox-button--play");

self.isActive=false;

self.instance.trigger("onSlideShowChange",false);

if(self.$progress){
self.$progress.removeAttr("style").hide();
}
},

toggle:function toggle(){
var self=this;

if(self.isActive){
self.stop();
}else {
self.start();
}
}});


$(document).on({
"onInit.fb":function onInitFb(e,instance){
if(instance&&!instance.SlideShow){
instance.SlideShow=new SlideShow(instance);
}
},

"beforeShow.fb":function beforeShowFb(e,instance,current,firstRun){
var SlideShow=instance&&instance.SlideShow;

if(firstRun){
if(SlideShow&&current.opts.slideShow.autoStart){
SlideShow.start();
}
}else if(SlideShow&&SlideShow.isActive){
SlideShow.clear();
}
},

"afterShow.fb":function afterShowFb(e,instance,current){
var SlideShow=instance&&instance.SlideShow;

if(SlideShow&&SlideShow.isActive){
SlideShow.set();
}
},

"afterKeydown.fb":function afterKeydownFb(e,instance,current,keypress,keycode){
var SlideShow=instance&&instance.SlideShow;

// "P" or Spacebar
if(SlideShow&&current.opts.slideShow&&(keycode===80||keycode===32)&&!$(document.activeElement).is("button,a,input")){
keypress.preventDefault();

SlideShow.toggle();
}
},

"beforeClose.fb onDeactivate.fb":function beforeCloseFbOnDeactivateFb(e,instance){
var SlideShow=instance&&instance.SlideShow;

if(SlideShow){
SlideShow.stop();
}
}});


// Page Visibility API to pause slideshow when window is not active
$(document).on("visibilitychange",function(){
var instance=$.fancybox.getInstance(),
SlideShow=instance&&instance.SlideShow;

if(SlideShow&&SlideShow.isActive){
if(document.hidden){
SlideShow.clear();
}else {
SlideShow.set();
}
}
});
})(document,jQuery);
// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function(document,$){

// Collection of methods supported by user browser
var fn=function(){
var fnMap=[
["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],
// new WebKit
[
"webkitRequestFullscreen",
"webkitExitFullscreen",
"webkitFullscreenElement",
"webkitFullscreenEnabled",
"webkitfullscreenchange",
"webkitfullscreenerror"],

// old WebKit (Safari 5.1)
[
"webkitRequestFullScreen",
"webkitCancelFullScreen",
"webkitCurrentFullScreenElement",
"webkitCancelFullScreen",
"webkitfullscreenchange",
"webkitfullscreenerror"],

[
"mozRequestFullScreen",
"mozCancelFullScreen",
"mozFullScreenElement",
"mozFullScreenEnabled",
"mozfullscreenchange",
"mozfullscreenerror"],

["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]];


var ret={};

for(var i=0;i<fnMap.length;i++){
var val=fnMap[i];

if(val&&val[1]in document){
for(var j=0;j<val.length;j++){
ret[fnMap[0][j]]=val[j];
}

return ret;
}
}

return false;
}();

if(fn){
var FullScreen={
request:function request(elem){
elem=elem||document.documentElement;

elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
},
exit:function exit(){
document[fn.exitFullscreen]();
},
toggle:function toggle(elem){
elem=elem||document.documentElement;

if(this.isFullscreen()){
this.exit();
}else {
this.request(elem);
}
},
isFullscreen:function isFullscreen(){
return Boolean(document[fn.fullscreenElement]);
},
enabled:function enabled(){
return Boolean(document[fn.fullscreenEnabled]);
}};


$.extend(true,$.fancybox.defaults,{
btnTpl:{
fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>'+
"</button>"},

fullScreen:{
autoStart:false}});



$(document).on(fn.fullscreenchange,function(){
var isFullscreen=FullScreen.isFullscreen(),
instance=$.fancybox.getInstance();

if(instance){
// If image is zooming, then force to stop and reposition properly
if(instance.current&&instance.current.type==="image"&&instance.isAnimating){
instance.isAnimating=false;

instance.update(true,true,0);

if(!instance.isComplete){
instance.complete();
}
}

instance.trigger("onFullscreenChange",isFullscreen);

instance.$refs.container.toggleClass("fancybox-is-fullscreen",isFullscreen);

instance.$refs.toolbar.
find("[data-fancybox-fullscreen]").
toggleClass("fancybox-button--fsenter",!isFullscreen).
toggleClass("fancybox-button--fsexit",isFullscreen);
}
});
}

$(document).on({
"onInit.fb":function onInitFb(e,instance){
var $container;

if(!fn){
instance.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();

return;
}

if(instance&&instance.group[instance.currIndex].opts.fullScreen){
$container=instance.$refs.container;

$container.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(e){
e.stopPropagation();
e.preventDefault();

FullScreen.toggle();
});

if(instance.opts.fullScreen&&instance.opts.fullScreen.autoStart===true){
FullScreen.request();
}

// Expose API
instance.FullScreen=FullScreen;
}else if(instance){
instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
}
},

"afterKeydown.fb":function afterKeydownFb(e,instance,current,keypress,keycode){
// "F"
if(instance&&instance.FullScreen&&keycode===70){
keypress.preventDefault();

instance.FullScreen.toggle();
}
},

"beforeClose.fb":function beforeCloseFb(e,instance){
if(instance&&instance.FullScreen&&instance.$refs.container.hasClass("fancybox-is-fullscreen")){
FullScreen.exit();
}
}});

})(document,jQuery);
// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function(document,$){

var CLASS="fancybox-thumbs",
CLASS_ACTIVE=CLASS+"-active";

// Make sure there are default values
$.fancybox.defaults=$.extend(
true,{
btnTpl:{
thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>'+
"</button>"},

thumbs:{
autoStart:false,// Display thumbnails on opening
hideOnClose:true,// Hide thumbnail grid when closing animation starts
parentEl:".fancybox-container",// Container is injected into this element
axis:"y"// Vertical (y) or horizontal (x) scrolling
}},

$.fancybox.defaults);


var FancyThumbs=function FancyThumbs(instance){
this.init(instance);
};

$.extend(FancyThumbs.prototype,{
$button:null,
$grid:null,
$list:null,
isVisible:false,
isActive:false,

init:function init(instance){
var self=this,
group=instance.group,
enabled=0;

self.instance=instance;
self.opts=group[instance.currIndex].opts.thumbs;

instance.Thumbs=self;

self.$button=instance.$refs.toolbar.find("[data-fancybox-thumbs]");

// Enable thumbs if at least two group items have thumbnails
for(var i=0,len=group.length;i<len;i++){
if(group[i].thumb){
enabled++;
}

if(enabled>1){
break;
}
}

if(enabled>1&&!!self.opts){
self.$button.removeAttr("style").on("click",function(){
self.toggle();
});

self.isActive=true;
}else {
self.$button.hide();
}
},

create:function create(){
var self=this,
instance=self.instance,
parentEl=self.opts.parentEl,
list=[],
src;

if(!self.$grid){
// Create main element
self.$grid=$('<div class="'+CLASS+" "+CLASS+"-"+self.opts.axis+'"></div>').appendTo(
instance.$refs.container.
find(parentEl).
addBack().
filter(parentEl));


// Add "click" event that performs gallery navigation
self.$grid.on("click","a",function(){
instance.jumpTo($(this).attr("data-index"));
});
}

// Build the list
if(!self.$list){
self.$list=$('<div class="'+CLASS+'__list">').appendTo(self.$grid);
}

$.each(instance.group,function(i,item){
src=item.thumb;

if(!src&&item.type==="image"){
src=item.src;
}

list.push(
'<a href="javascript:;" tabindex="0" data-index="'+
i+
'"'+(
src&&src.length?' style="background-image:url('+src+')"':'class="fancybox-thumbs-missing"')+
"></a>");

});

self.$list[0].innerHTML=list.join("");

if(self.opts.axis==="x"){
// Set fixed width for list element to enable horizontal scrolling
self.$list.width(
parseInt(self.$grid.css("padding-right"),10)+
instance.group.length*
self.$list.
children().
eq(0).
outerWidth(true));

}
},

focus:function focus(duration){
var self=this,
$list=self.$list,
$grid=self.$grid,
thumb,
thumbPos;

if(!self.instance.current){
return;
}

thumb=$list.
children().
removeClass(CLASS_ACTIVE).
filter('[data-index="'+self.instance.current.index+'"]').
addClass(CLASS_ACTIVE);

thumbPos=thumb.position();

// Check if need to scroll to make current thumb visible
if(self.opts.axis==="y"&&(thumbPos.top<0||thumbPos.top>$list.height()-thumb.outerHeight())){
$list.stop().animate({
scrollTop:$list.scrollTop()+thumbPos.top},

duration);

}else if(
self.opts.axis==="x"&&(
thumbPos.left<$grid.scrollLeft()||thumbPos.left>$grid.scrollLeft()+($grid.width()-thumb.outerWidth())))
{
$list.
parent().
stop().
animate({
scrollLeft:thumbPos.left},

duration);

}
},

update:function update(){
var that=this;
that.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible);

if(that.isVisible){
if(!that.$grid){
that.create();
}

that.instance.trigger("onThumbsShow");

that.focus(0);
}else if(that.$grid){
that.instance.trigger("onThumbsHide");
}

// Update content position
that.instance.update();
},

hide:function hide(){
this.isVisible=false;
this.update();
},

show:function show(){
this.isVisible=true;
this.update();
},

toggle:function toggle(){
this.isVisible=!this.isVisible;
this.update();
}});


$(document).on({
"onInit.fb":function onInitFb(e,instance){
var Thumbs;

if(instance&&!instance.Thumbs){
Thumbs=new FancyThumbs(instance);

if(Thumbs.isActive&&Thumbs.opts.autoStart===true){
Thumbs.show();
}
}
},

"beforeShow.fb":function beforeShowFb(e,instance,item,firstRun){
var Thumbs=instance&&instance.Thumbs;

if(Thumbs&&Thumbs.isVisible){
Thumbs.focus(firstRun?0:250);
}
},

"afterKeydown.fb":function afterKeydownFb(e,instance,current,keypress,keycode){
var Thumbs=instance&&instance.Thumbs;

// "G"
if(Thumbs&&Thumbs.isActive&&keycode===71){
keypress.preventDefault();

Thumbs.toggle();
}
},

"beforeClose.fb":function beforeCloseFb(e,instance){
var Thumbs=instance&&instance.Thumbs;

if(Thumbs&&Thumbs.isVisible&&Thumbs.opts.hideOnClose!==false){
Thumbs.$grid.hide();
}
}});

})(document,jQuery);
//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function(document,$){

$.extend(true,$.fancybox.defaults,{
btnTpl:{
share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">'+
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>'+
"</button>"},

share:{
url:function url(instance,item){
return(
(!instance.currentHash&&!(item.type==="inline"||item.type==="html")?item.origSrc||item.src:false)||window.location);

},
tpl:'<div class="fancybox-share">'+
"<h1>{{SHARE}}</h1>"+
"<p>"+
'<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">'+
'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>'+
"<span>Facebook</span>"+
"</a>"+
'<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">'+
'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>'+
"<span>Twitter</span>"+
"</a>"+
'<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">'+
'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>'+
"<span>Pinterest</span>"+
"</a>"+
"</p>"+
'<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p>'+
"</div>"}});



function escapeHtml(string){
var entityMap={
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;",
"/":"&#x2F;",
"`":"&#x60;",
"=":"&#x3D;"};


return String(string).replace(/[&<>"'`=\/]/g,function(s){
return entityMap[s];
});
}

$(document).on("click","[data-fancybox-share]",function(){
var instance=$.fancybox.getInstance(),
current=instance.current||null,
url,
tpl;

if(!current){
return;
}

if($.type(current.opts.share.url)==="function"){
url=current.opts.share.url.apply(current,[instance,current]);
}

tpl=current.opts.share.tpl.
replace(/\{\{media\}\}/g,current.type==="image"?encodeURIComponent(current.src):"").
replace(/\{\{url\}\}/g,encodeURIComponent(url)).
replace(/\{\{url_raw\}\}/g,escapeHtml(url)).
replace(/\{\{descr\}\}/g,instance.$caption?encodeURIComponent(instance.$caption.text()):"");

$.fancybox.open({
src:instance.translate(instance,tpl),
type:"html",
opts:{
touch:false,
animationEffect:false,
afterLoad:function afterLoad(shareInstance,shareCurrent){
// Close self if parent instance is closing
instance.$refs.container.one("beforeClose.fb",function(){
shareInstance.close(null,0);
});

// Opening links in a popup window
shareCurrent.$content.find(".fancybox-share__button").click(function(){
window.open(this.href,"Share","width=550, height=450");
return false;
});
},
mobile:{
autoFocus:false}}});



});
})(document,jQuery);
// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function(window,document,$){

// Simple $.escapeSelector polyfill (for jQuery prior v3)
if(!$.escapeSelector){
$.escapeSelector=function(sel){
var rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
var fcssescape=function fcssescape(ch,asCodePoint){
if(asCodePoint){
// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if(ch==="\0"){
return "\uFFFD";
}

// Control characters and (dependent upon position) numbers get escaped as code points
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";
}

// Other potentially-special ASCII characters get backslash-escaped
return "\\"+ch;
};

return (sel+"").replace(rcssescape,fcssescape);
};
}

// Get info about gallery name and current index from url
function parseUrl(){
var hash=window.location.hash.substr(1),
rez=hash.split("-"),
index=rez.length>1&&/^\+?\d+$/.test(rez[rez.length-1])?parseInt(rez.pop(-1),10)||1:1,
gallery=rez.join("-");

return {
hash:hash,
/* Index is starting from 1 */
index:index<1?1:index,
gallery:gallery};

}

// Trigger click evnt on links to open new fancyBox instance
function triggerFromUrl(url){
if(url.gallery!==""){
// If we can find element matching 'data-fancybox' atribute,
// then triggering click event should start fancyBox
$("[data-fancybox='"+$.escapeSelector(url.gallery)+"']").
eq(url.index-1).
focus().
trigger("click.fb-start");
}
}

// Get gallery name from current instance
function getGalleryID(instance){
var opts,ret;

if(!instance){
return false;
}

opts=instance.current?instance.current.opts:instance.opts;
ret=opts.hash||(opts.$orig?opts.$orig.data("fancybox")||opts.$orig.data("fancybox-trigger"):"");

return ret===""?false:ret;
}

// Start when DOM becomes ready
$(function(){
// Check if user has disabled this module
if($.fancybox.defaults.hash===false){
return;
}

// Update hash when opening/closing fancyBox
$(document).on({
"onInit.fb":function onInitFb(e,instance){
var url,gallery;

if(instance.group[instance.currIndex].opts.hash===false){
return;
}

url=parseUrl();
gallery=getGalleryID(instance);

// Make sure gallery start index matches index from hash
if(gallery&&url.gallery&&gallery==url.gallery){
instance.currIndex=url.index-1;
}
},

"beforeShow.fb":function beforeShowFb(e,instance,current,firstRun){
var gallery;

if(!current||current.opts.hash===false){
return;
}

// Check if need to update window hash
gallery=getGalleryID(instance);

if(!gallery){
return;
}

// Variable containing last hash value set by fancyBox
// It will be used to determine if fancyBox needs to close after hash change is detected
instance.currentHash=gallery+(instance.group.length>1?"-"+(current.index+1):"");

// If current hash is the same (this instance most likely is opened by hashchange), then do nothing
if(window.location.hash==="#"+instance.currentHash){
return;
}

if(firstRun&&!instance.origHash){
instance.origHash=window.location.hash;
}

if(instance.hashTimer){
clearTimeout(instance.hashTimer);
}

// Update hash
instance.hashTimer=setTimeout(function(){
if("replaceState"in window.history){
window.history[firstRun?"pushState":"replaceState"]({},
document.title,
window.location.pathname+window.location.search+"#"+instance.currentHash);


if(firstRun){
instance.hasCreatedHistory=true;
}
}else {
window.location.hash=instance.currentHash;
}

instance.hashTimer=null;
},300);
},

"beforeClose.fb":function beforeCloseFb(e,instance,current){
if(!current||current.opts.hash===false){
return;
}

clearTimeout(instance.hashTimer);

// Goto previous history entry
if(instance.currentHash&&instance.hasCreatedHistory){
window.history.back();
}else if(instance.currentHash){
if("replaceState"in window.history){
window.history.replaceState({},document.title,window.location.pathname+window.location.search+(instance.origHash||""));
}else {
window.location.hash=instance.origHash;
}
}

instance.currentHash=null;
}});


// Check if need to start/close after url has changed
$(window).on("hashchange.fb",function(){
var url=parseUrl(),
fb=null;

// Find last fancyBox instance that has "hash"
$.each(
$(".fancybox-container").
get().
reverse(),
function(index,value){
var tmp=$(value).data("FancyBox");

if(tmp&&tmp.currentHash){
fb=tmp;
return false;
}
});


if(fb){
// Now, compare hash values
if(fb.currentHash!==url.gallery+"-"+url.index&&!(url.index===1&&fb.currentHash==url.gallery)){
fb.currentHash=null;

fb.close();
}
}else if(url.gallery!==""){
triggerFromUrl(url);
}
});

// Check current hash and trigger click event on matching element to start fancyBox, if needed
setTimeout(function(){
if(!$.fancybox.getInstance()){
triggerFromUrl(parseUrl());
}
},50);
});
})(window,document,jQuery);
// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function(document,$){

var prevTime=new Date().getTime();

$(document).on({
"onInit.fb":function onInitFb(e,instance,current){
instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",function(e){
var current=instance.current,
currTime=new Date().getTime();

if(instance.group.length<2||current.opts.wheel===false||current.opts.wheel==="auto"&&current.type!=="image"){
return;
}

e.preventDefault();
e.stopPropagation();

if(current.$slide.hasClass("fancybox-animated")){
return;
}

e=e.originalEvent||e;

if(currTime-prevTime<250){
return;
}

prevTime=currTime;

instance[(-e.deltaY||-e.deltaX||e.wheelDelta||-e.detail)<0?"next":"previous"]();
});
}});

})(document,jQuery);

/***/},

/***/"./node_modules/clip-path/dist/clippath.min.js":
/*!*****************************************************!*\
  !*** ./node_modules/clip-path/dist/clippath.min.js ***!
  \*****************************************************/
/*! no static exports found */
/***/function node_modulesClipPathDistClippathMinJs(module,exports,__webpack_require__){

var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(t,e){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=e,
__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?
__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,
__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}(this,function(t){var e,i,r,n,l=(e=document.createElement("div"),i="polygon(0 0, 0 0, 0 0, 0 0)",e.style.clipPath=i,e.style.clipPath===i);function a(t,e,i){console.log(t.tagName);var r="px",n="userSpaceOnUse";if(-1!==e.indexOf("%")&&(r="%",n="objectBoundingBox"),e=e.replace(/px|em|%/g,""),"px"!==r){for(var l="",a=e.split(", "),p=0;p<a.length;p++){var o=a[p].split(" "),s=Number(o[0]),c=Number(o[1]);0!==s&&(s/=100),0!==c&&(c/=100),l+=s+" "+c,p<a.length-1&&(l+=", ");}e=l;}var d=t.getAttribute("data-clip-path-id");if(d){document.getElementById(d).setAttribute("clipPathUnits",n),document.querySelector("#"+d+" > polygon").setAttribute("points",e);}else {var h="clip-path-"+Math.random().toString(36).substring(7),u=document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.setAttribute("width","0"),u.setAttribute("height","0"),u.setAttribute("data-clip-path-id",h),u.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),i){t.getAttribute("class")&&u.setAttribute("class",t.getAttribute("class")),t.setAttribute("class",""),t.style.width="100%",t.style.height="100%",u.style.width="100%",u.style.height="100%";var g=document.createElementNS("http://www.w3.org/2000/svg","defs");(b=document.createElementNS("http://www.w3.org/2000/svg","clipPath")).setAttribute("id",h),b.setAttribute("clipPathUnits",n),(m=document.createElementNS("http://www.w3.org/2000/svg","polygon")).setAttribute("points",e);var w=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");w.setAttribute("clip-path","url(#"+h+")"),w.setAttribute("width","100%"),w.setAttribute("height","100%"),w.appendChild(t.cloneNode(!0)),u.appendChild(w),b.appendChild(m),g.appendChild(b),u.appendChild(g),t.parentNode.replaceChild(u,t);}else {var b,m;(b=document.createElementNS("http://www.w3.org/2000/svg","clipPath")).setAttribute("id",h),b.setAttribute("clipPathUnits",n),(m=document.createElementNS("http://www.w3.org/2000/svg","polygon")).setAttribute("points",e),b.appendChild(m),u.appendChild(b),document.body.appendChild(u),t.setAttribute("data-clip-path-id",h),setTimeout(function(){t.style.clipPath="url(#"+h+")";},0);}}}function p(t,e,i){i=void 0!==i?i:l,void 0!==t.style.webkitClipPath?t.style.webkitClipPath="polygon("+e+")":i?t.style.clipPath="polygon("+e+")":-1<window.navigator.userAgent.indexOf("Edge")?a(t,e,!0):a(t,e);}function o(t,i,r){if(!t)return console.error("Missing selector"),!1;var e=document.querySelectorAll(t||"");Array.prototype.forEach.call(e,function(t){var e=t.getAttribute("data-clip")||i;e?p(t,e,r):console.error("Missing clip-path parameters. Please check ClipPath() arguments or data-clip attribute.",t);});}o.applyClipPath=p,"undefined"!=typeof jQuery&&(r=jQuery,n=o,r.fn.ClipPath=function(t){return t===Object(t)&&t.path&&(t=t.path),this.each(function(){n.applyClipPath(this,r(this).attr("data-clip")||t);});}),t.ClipPath=o;});

/***/},

/***/"./node_modules/countup.js/dist/countUp.min.js":
/*!*****************************************************!*\
  !*** ./node_modules/countup.js/dist/countUp.min.js ***!
  \*****************************************************/
/*! exports provided: CountUp */
/***/function node_modulesCountupJsDistCountUpMinJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CountUp",function(){return CountUp;});
var __assign=function(){return (__assign=Object.assign||function(t){for(var i,a=1,s=arguments.length;a<s;a++){for(var n in i=arguments[a]){Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);}}return t;}).apply(this,arguments);},CountUp=function(){function t(t,i,a){var s=this;this.target=t,this.endVal=i,this.options=a,this.version="2.0.4",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){s.startTime||(s.startTime=t);var i=t-s.startTime;s.remaining=s.duration-i,s.useEasing?s.countDown?s.frameVal=s.startVal-s.easingFn(i,0,s.startVal-s.endVal,s.duration):s.frameVal=s.easingFn(i,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(i/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(i/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Math.round(s.frameVal*s.decimalMult)/s.decimalMult,s.printValue(s.frameVal),i<s.duration?s.rAF=requestAnimationFrame(s.count):null!==s.finalEndVal?s.update(s.finalEndVal):s.callback&&s.callback();},this.formatNumber=function(t){var i,a,n,e,r,o=t<0?"-":"";if(i=Math.abs(t).toFixed(s.options.decimalPlaces),n=(a=(i+="").split("."))[0],e=a.length>1?s.options.decimal+a[1]:"",s.options.useGrouping){r="";for(var l=0,h=n.length;l<h;++l){0!==l&&l%3==0&&(r=s.options.separator+r),r=n[h-l-1]+r;}n=r;}return s.options.numerals&&s.options.numerals.length&&(n=n.replace(/[0-9]/g,function(t){return s.options.numerals[+t];}),e=e.replace(/[0-9]/g,function(t){return s.options.numerals[+t];})),o+s.options.prefix+n+e+s.options.suffix;},this.easeOutExpo=function(t,i,a,s){return a*(1-Math.pow(2,-10*t/s))*1024/1023+i;},this.options=__assign({},this.defaults,a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.decimalMult=Math.pow(10,this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined";}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2;}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing;},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal));},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused;},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal);},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count));},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i;},t.prototype.ensureNumber=function(t){return "number"==typeof t&&!isNaN(t);},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null);},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration;},t;}();

/***/},

/***/"./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/*! no static exports found */
/***/function node_modulesEvEmitterEvEmitterJs(module,exports,__webpack_require__){

var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function(global,factory){
// universal module definition
/* jshint strict: false */ /* globals define, module, window */
{
// AMD - RequireJS
!(__WEBPACK_AMD_DEFINE_FACTORY__=factory,
__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?
__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):
__WEBPACK_AMD_DEFINE_FACTORY__,
__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));
}

})(typeof window!='undefined'?window:this,function(){

function EvEmitter(){}

var proto=EvEmitter.prototype;

proto.on=function(eventName,listener){
if(!eventName||!listener){
return;
}
// set events hash
var events=this._events=this._events||{};
// set listeners array
var listeners=events[eventName]=events[eventName]||[];
// only add once
if(listeners.indexOf(listener)==-1){
listeners.push(listener);
}

return this;
};

proto.once=function(eventName,listener){
if(!eventName||!listener){
return;
}
// add event
this.on(eventName,listener);
// set once flag
// set onceEvents hash
var onceEvents=this._onceEvents=this._onceEvents||{};
// set onceListeners object
var onceListeners=onceEvents[eventName]=onceEvents[eventName]||{};
// set flag
onceListeners[listener]=true;

return this;
};

proto.off=function(eventName,listener){
var listeners=this._events&&this._events[eventName];
if(!listeners||!listeners.length){
return;
}
var index=listeners.indexOf(listener);
if(index!=-1){
listeners.splice(index,1);
}

return this;
};

proto.emitEvent=function(eventName,args){
var listeners=this._events&&this._events[eventName];
if(!listeners||!listeners.length){
return;
}
// copy over to avoid interference if .off() in listener
listeners=listeners.slice(0);
args=args||[];
// once stuff
var onceListeners=this._onceEvents&&this._onceEvents[eventName];

for(var i=0;i<listeners.length;i++){
var listener=listeners[i];
var isOnce=onceListeners&&onceListeners[listener];
if(isOnce){
// remove listener
// remove before trigger to prevent recursion
this.off(eventName,listener);
// unset once flag
delete onceListeners[listener];
}
// trigger listener
listener.apply(this,args);
}

return this;
};

proto.allOff=function(){
delete this._events;
delete this._onceEvents;
};

return EvEmitter;

});


/***/},

/***/"./node_modules/foundation-sites/js/foundation.accordion.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.accordion.js ***!
  \******************************************************************/
/*! exports provided: Accordion */
/***/function node_modulesFoundationSitesJsFoundationAccordionJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Accordion",function(){return Accordion;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");







/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */var

Accordion=/*#__PURE__*/function(_foundation_core_plug){_inherits(Accordion,_foundation_core_plug);function Accordion(){_classCallCheck(this,Accordion);return _possibleConstructorReturn(this,_getPrototypeOf(Accordion).apply(this,arguments));}_createClass(Accordion,[{key:"_setup",
/**
   * Creates a new instance of an accordion.
   * @class
   * @name Accordion
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   * @param {Object} options - a plain object with settings to override the default options.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},Accordion.defaults,this.$element.data(),options);

this.className='Accordion';// ie9 back compat
this._init();

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].register('Accordion',{
'ENTER':'toggle',
'SPACE':'toggle',
'ARROW_DOWN':'next',
'ARROW_UP':'previous'});

}

/**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */},{key:"_init",value:function _init()
{var _this2=this;
this._isInitializing=true;

this.$element.attr('role','tablist');
this.$tabs=this.$element.children('[data-accordion-item]');

this.$tabs.attr({'role':'presentation'});

this.$tabs.each(function(idx,el){
var $el=jquery__WEBPACK_IMPORTED_MODULE_0___default()(el),
$content=$el.children('[data-tab-content]'),
id=$content[0].id||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6,'accordion'),
linkId=el.id?"".concat(el.id,"-label"):"".concat(id,"-label");

$el.find('a:first').attr({
'aria-controls':id,
'role':'tab',
'id':linkId,
'aria-expanded':false,
'aria-selected':false});


$content.attr({'role':'tabpanel','aria-labelledby':linkId,'aria-hidden':true,'id':id});
});

var $initActive=this.$element.find('.is-active').children('[data-tab-content]');
if($initActive.length){
// Save up the initial hash to return to it later when going back in history
this._initialAnchor=$initActive.prev('a').attr('href');
this._openSingleTab($initActive);
}

this._checkDeepLink=function(){
var anchor=window.location.hash;

if(!anchor.length){
// If we are still initializing and there is no anchor, then there is nothing to do
if(_this2._isInitializing)return;
// Otherwise, move to the initial anchor
if(_this2._initialAnchor)anchor=_this2._initialAnchor;
}

var $anchor=anchor&&jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor);
var $link=anchor&&_this2.$element.find("[href$=\"".concat(anchor,"\"]"));
// Whether the anchor element that has been found is part of this element
var isOwnAnchor=!!($anchor.length&&$link.length);

if(isOwnAnchor){
// If there is an anchor for the hash, open it (if not already active)
if($anchor&&$link&&$link.length){
if(!$link.parent('[data-accordion-item]').hasClass('is-active')){
_this2._openSingleTab($anchor);
}}
// Otherwise, close everything
else {
_this2._closeAllTabs();
}

// Roll up a little to show the titles
if(_this2.options.deepLinkSmudge){
Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window),function(){
var offset=_this2.$element.offset();
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({scrollTop:offset.top},_this2.options.deepLinkSmudgeDelay);
});
}

/**
         * Fires when the plugin has deeplinked at pageload
         * @event Accordion#deeplink
         */
_this2.$element.trigger('deeplink.zf.accordion',[$link,$anchor]);
}
};

//use browser to open a tab, if it exists in this tabset
if(this.options.deepLink){
this._checkDeepLink();
}

this._events();

this._isInitializing=false;
}

/**
   * Adds event handlers for items within the accordion.
   * @private
   */},{key:"_events",value:function _events()
{
var _this=this;

this.$tabs.each(function(){
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
var $tabContent=$elem.children('[data-tab-content]');
if($tabContent.length){
$elem.children('a').off('click.zf.accordion keydown.zf.accordion').
on('click.zf.accordion',function(e){
e.preventDefault();
_this.toggle($tabContent);
}).on('keydown.zf.accordion',function(e){
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].handleKey(e,'Accordion',{
toggle:function toggle(){
_this.toggle($tabContent);
},
next:function next(){
var $a=$elem.next().find('a').focus();
if(!_this.options.multiExpand){
$a.trigger('click.zf.accordion');
}
},
previous:function previous(){
var $a=$elem.prev().find('a').focus();
if(!_this.options.multiExpand){
$a.trigger('click.zf.accordion');
}
},
handled:function handled(){
e.preventDefault();
}});

});
}
});
if(this.options.deepLink){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange',this._checkDeepLink);
}
}

/**
   * Toggles the selected content pane's open/close state.
   * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
   * @function
   */},{key:"toggle",value:function toggle(
$target){
if($target.closest('[data-accordion]').is('[disabled]')){
console.info('Cannot toggle an accordion that is disabled.');
return;
}
if($target.parent().hasClass('is-active')){
this.up($target);
}else {
this.down($target);
}
//either replace or update browser history
if(this.options.deepLink){
var anchor=$target.prev('a').attr('href');

if(this.options.updateHistory){
history.pushState({},'',anchor);
}else {
history.replaceState({},'',anchor);
}
}
}

/**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
   * @fires Accordion#down
   * @function
   */},{key:"down",value:function down(
$target){
if($target.closest('[data-accordion]').is('[disabled]')){
console.info('Cannot call down on an accordion that is disabled.');
return;
}

if(this.options.multiExpand)
this._openTab($target);else

this._openSingleTab($target);
}

/**
   * Closes the tab defined by `$target`.
   * It may be ignored if the Accordion options don't allow it.
   *
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   */},{key:"up",value:function up(
$target){
if(this.$element.is('[disabled]')){
console.info('Cannot call up on an accordion that is disabled.');
return;
}

// Don't close the item if it is already closed
var $targetItem=$target.parent();
if(!$targetItem.hasClass('is-active'))return;

// Don't close the item if there is no other active item (unless with `allowAllClosed`)
var $othersItems=$targetItem.siblings();
if(!this.options.allowAllClosed&&!$othersItems.hasClass('is-active'))return;

this._closeTab($target);
}

/**
   * Make the tab defined by `$target` the only opened tab, closing all others tabs.
   * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
   * @function
   * @private
   */},{key:"_openSingleTab",value:function _openSingleTab(
$target){
// Close all the others active tabs.
var $activeContents=this.$element.children('.is-active').children('[data-tab-content]');
if($activeContents.length){
this._closeTab($activeContents.not($target));
}

// Then open the target.
this._openTab($target);
}

/**
   * Opens the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
   * @fires Accordion#down
   * @function
   * @private
   */},{key:"_openTab",value:function _openTab(
$target){var _this3=this;
var $targetItem=$target.parent();
var targetContentId=$target.attr('aria-labelledby');

$target.attr('aria-hidden',false);
$targetItem.addClass('is-active');

jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(targetContentId)).attr({
'aria-expanded':true,
'aria-selected':true});


$target.slideDown(this.options.slideSpeed,function(){
/**
       * Fires when the tab is done opening.
       * @event Accordion#down
       */
_this3.$element.trigger('down.zf.accordion',[$target]);
});
}

/**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   * @private
   */},{key:"_closeTab",value:function _closeTab(
$target){var _this4=this;
var $targetItem=$target.parent();
var targetContentId=$target.attr('aria-labelledby');

$target.attr('aria-hidden',true);
$targetItem.removeClass('is-active');

jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(targetContentId)).attr({
'aria-expanded':false,
'aria-selected':false});


$target.slideUp(this.options.slideSpeed,function(){
/**
       * Fires when the tab is done collapsing up.
       * @event Accordion#up
       */
_this4.$element.trigger('up.zf.accordion',[$target]);
});
}

/**
   * Closes all active tabs
   * @fires Accordion#up
   * @function
   * @private
   */},{key:"_closeAllTabs",value:function _closeAllTabs()
{
var $activeTabs=this.$element.children('.is-active').children('[data-tab-content]');
if($activeTabs.length){
this._closeTab($activeTabs);
}
}

/**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   * @function
   */},{key:"_destroy",value:function _destroy()
{
this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display','');
this.$element.find('a').off('.zf.accordion');
if(this.options.deepLink){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange',this._checkDeepLink);
}

}}]);return Accordion;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);


Accordion.defaults={
/**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
slideSpeed:250,
/**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
multiExpand:false,
/**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
allowAllClosed:false,
/**
   * Link the location hash to the open pane.
   * Set the location hash when the opened pane changes, and open and scroll to the corresponding pane when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
deepLink:false,
/**
   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
deepLinkSmudge:false,
/**
   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
deepLinkSmudgeDelay:300,
/**
   * If `deepLink` is enabled, update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
updateHistory:false};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.accordionMenu.js":
/*!**********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.accordionMenu.js ***!
  \**********************************************************************/
/*! exports provided: AccordionMenu */
/***/function node_modulesFoundationSitesJsFoundationAccordionMenuJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AccordionMenu",function(){return AccordionMenu;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.util.nest */"./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");









/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 */var

AccordionMenu=/*#__PURE__*/function(_foundation_core_plug2){_inherits(AccordionMenu,_foundation_core_plug2);function AccordionMenu(){_classCallCheck(this,AccordionMenu);return _possibleConstructorReturn(this,_getPrototypeOf(AccordionMenu).apply(this,arguments));}_createClass(AccordionMenu,[{key:"_setup",
/**
   * Creates a new instance of an accordion menu.
   * @class
   * @name AccordionMenu
   * @fires AccordionMenu#init
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},AccordionMenu.defaults,this.$element.data(),options);
this.className='AccordionMenu';// ie9 back compat

this._init();

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('AccordionMenu',{
'ENTER':'toggle',
'SPACE':'toggle',
'ARROW_RIGHT':'open',
'ARROW_UP':'up',
'ARROW_DOWN':'down',
'ARROW_LEFT':'close',
'ESCAPE':'closeAll'});

}



/**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */},{key:"_init",value:function _init()
{
_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Feather(this.$element,'accordion');

var _this=this;

this.$element.find('[data-submenu]').not('.is-active').slideUp(0);//.find('a').css('padding-left', '1rem');
this.$element.attr({
'role':'tree',
'aria-multiselectable':this.options.multiOpen});


this.$menuLinks=this.$element.find('.is-accordion-submenu-parent');
this.$menuLinks.each(function(){
var linkId=this.id||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6,'acc-menu-link'),
$elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$sub=$elem.children('[data-submenu]'),
subId=$sub[0].id||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6,'acc-menu'),
isActive=$sub.hasClass('is-active');

if(_this.options.parentLink){
var $anchor=$elem.children('a');
$anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>');
}

if(_this.options.submenuToggle){
$elem.addClass('has-submenu-toggle');
$elem.children('a').after('<button id="'+linkId+'" class="submenu-toggle" aria-controls="'+subId+'" aria-expanded="'+isActive+'" title="'+_this.options.submenuToggleText+'"><span class="submenu-toggle-text">'+_this.options.submenuToggleText+'</span></button>');
}else {
$elem.attr({
'aria-controls':subId,
'aria-expanded':isActive,
'id':linkId});

}
$sub.attr({
'aria-labelledby':linkId,
'aria-hidden':!isActive,
'role':'group',
'id':subId});

});
this.$element.find('li').attr({
'role':'treeitem'});

var initPanes=this.$element.find('.is-active');
if(initPanes.length){
var _this=this;
initPanes.each(function(){
_this.down(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
});
}
this._events();
}

/**
   * Adds event handlers for items within the menu.
   * @private
   */},{key:"_events",value:function _events()
{
var _this=this;

this.$element.find('li').each(function(){
var $submenu=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]');

if($submenu.length){
if(_this.options.submenuToggle){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu',function(e){
_this.toggle($submenu);
});
}else {
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu',function(e){
e.preventDefault();
_this.toggle($submenu);
});
}
}
}).on('keydown.zf.accordionMenu',function(e){
var $element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$elements=$element.parent('ul').children('li'),
$prevElement,
$nextElement,
$target=$element.children('[data-submenu]');

$elements.each(function(i){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)){
$prevElement=$elements.eq(Math.max(0,i-1)).find('a').first();
$nextElement=$elements.eq(Math.min(i+1,$elements.length-1)).find('a').first();

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]:visible').length){// has open sub menu
$nextElement=$element.find('li:first-child').find('a').first();
}
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':first-child')){// is first element of sub menu
$prevElement=$element.parents('li').first().find('a').first();
}else if($prevElement.parents('li').first().children('[data-submenu]:visible').length){// if previous element has open sub menu
$prevElement=$prevElement.parents('li').find('li:last-child').find('a').first();
}
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':last-child')){// is last element of sub menu
$nextElement=$element.parents('li').first().next('li').find('a').first();
}

return;
}
});

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e,'AccordionMenu',{
open:function open(){
if($target.is(':hidden')){
_this.down($target);
$target.find('li').first().find('a').first().focus();
}
},
close:function close(){
if($target.length&&!$target.is(':hidden')){// close active sub of this item
_this.up($target);
}else if($element.parent('[data-submenu]').length){// close currently open sub
_this.up($element.parent('[data-submenu]'));
$element.parents('li').first().find('a').first().focus();
}
},
up:function up(){
$prevElement.focus();
return true;
},
down:function down(){
$nextElement.focus();
return true;
},
toggle:function toggle(){
if(_this.options.submenuToggle){
return false;
}
if($element.children('[data-submenu]').length){
_this.toggle($element.children('[data-submenu]'));
return true;
}
},
closeAll:function closeAll(){
_this.hideAll();
},
handled:function handled(preventDefault){
if(preventDefault){
e.preventDefault();
}
}});

});//.attr('tabindex', 0);
}

/**
   * Closes all panes of the menu.
   * @function
   */},{key:"hideAll",value:function hideAll()
{
this.up(this.$element.find('[data-submenu]'));
}

/**
   * Opens all panes of the menu.
   * @function
   */},{key:"showAll",value:function showAll()
{
this.down(this.$element.find('[data-submenu]'));
}

/**
   * Toggles the open/close state of a submenu.
   * @function
   * @param {jQuery} $target - the submenu to toggle
   */},{key:"toggle",value:function toggle(
$target){
if(!$target.is(':animated')){
if(!$target.is(':hidden')){
this.up($target);
}else
{
this.down($target);
}
}
}

/**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */},{key:"down",value:function down(
$target){var _this5=this;
// If having multiple submenus active is disabled, close all the submenus
// that are not parents or children of the targeted submenu.
if(!this.options.multiOpen){
// The "branch" of the targetted submenu, from the component root to
// the active submenus nested in it.
var $targetBranch=$target.parentsUntil(this.$element).
add($target).
add($target.find('.is-active'));
// All the active submenus that are not in the branch.
var $othersActiveSubmenus=this.$element.find('.is-active').not($targetBranch);

this.up($othersActiveSubmenus);
}

$target.
addClass('is-active').
attr({'aria-hidden':false});

if(this.options.submenuToggle){
$target.prev('.submenu-toggle').attr({'aria-expanded':true});
}else
{
$target.parent('.is-accordion-submenu-parent').attr({'aria-expanded':true});
}

$target.slideDown(this.options.slideSpeed,function(){
/**
       * Fires when the menu is done opening.
       * @event AccordionMenu#down
       */
_this5.$element.trigger('down.zf.accordionMenu',[$target]);
});
}

/**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */},{key:"up",value:function up(
$target){var _this6=this;
var $submenus=$target.find('[data-submenu]');
var $allmenus=$target.add($submenus);

$submenus.slideUp(0);
$allmenus.
removeClass('is-active').
attr('aria-hidden',true);

if(this.options.submenuToggle){
$allmenus.prev('.submenu-toggle').attr('aria-expanded',false);
}else
{
$allmenus.parent('.is-accordion-submenu-parent').attr('aria-expanded',false);
}

$target.slideUp(this.options.slideSpeed,function(){
/**
       * Fires when the menu is done collapsing up.
       * @event AccordionMenu#up
       */
_this6.$element.trigger('up.zf.accordionMenu',[$target]);
});
}

/**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */},{key:"_destroy",value:function _destroy()
{
this.$element.find('[data-submenu]').slideDown(0).css('display','');
this.$element.find('a').off('click.zf.accordionMenu');
this.$element.find('[data-is-parent-link]').detach();

if(this.options.submenuToggle){
this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
this.$element.find('.submenu-toggle').remove();
}

_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Burn(this.$element,'accordion');
}}]);return AccordionMenu;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);


AccordionMenu.defaults={
/**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
parentLink:false,
/**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @type {number}
   * @default 250
   */
slideSpeed:250,
/**
   * Adds a separate submenu toggle button. This allows the parent item to have a link.
   * @option
   * @example true
   */
submenuToggle:false,
/**
   * The text used for the submenu toggle if enabled. This is used for screen readers only.
   * @option
   * @example true
   */
submenuToggleText:'Toggle menu',
/**
   * Allow the menu to have multiple open panes.
   * @option
   * @type {boolean}
   * @default true
   */
multiOpen:true};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.core.js":
/*!*************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.core.js ***!
  \*************************************************************/
/*! exports provided: Foundation */
/***/function node_modulesFoundationSitesJsFoundationCoreJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Foundation",function(){return Foundation;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");






var FOUNDATION_VERSION='6.6.1';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation={
version:FOUNDATION_VERSION,

/**
   * Stores initialized plugins.
   */
_plugins:{},

/**
   * Stores generated unique ids for plugin instances
   */
_uuids:[],

/**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
plugin:function plugin(_plugin,name){
// Object key to use when adding to global Foundation object
// Examples: Foundation.Reveal, Foundation.OffCanvas
var className=name||functionName(_plugin);
// Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
// Examples: data-reveal, data-off-canvas
var attrName=hyphenate(className);

// Add to the Foundation object and the plugins list (for reflowing)
this._plugins[attrName]=this[className]=_plugin;
},
/**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
registerPlugin:function registerPlugin(plugin,name){
var pluginName=name?hyphenate(name):functionName(plugin.constructor).toLowerCase();
plugin.uuid=Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6,pluginName);

if(!plugin.$element.attr("data-".concat(pluginName))){plugin.$element.attr("data-".concat(pluginName),plugin.uuid);}
if(!plugin.$element.data('zfPlugin')){plugin.$element.data('zfPlugin',plugin);}
/**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */
plugin.$element.trigger("init.zf.".concat(pluginName));

this._uuids.push(plugin.uuid);

return;
},
/**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
unregisterPlugin:function unregisterPlugin(plugin){
var pluginName=hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

this._uuids.splice(this._uuids.indexOf(plugin.uuid),1);
plugin.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
/**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */.
trigger("destroyed.zf.".concat(pluginName));
for(var prop in plugin){
plugin[prop]=null;//clean up script to prep for garbage collection.
}
return;
},

/**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
reInit:function reInit(plugins){
var isJQ=plugins instanceof jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
try{
if(isJQ){
plugins.each(function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('zfPlugin')._init();
});
}else {
var type=typeof plugins,
_this=this,
fns={
'object':function object(plgs){
plgs.forEach(function(p){
p=hyphenate(p);
jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-'+p+']').foundation('_init');
});
},
'string':function string(){
plugins=hyphenate(plugins);
jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-'+plugins+']').foundation('_init');
},
'undefined':function undefined$1(){
this['object'](Object.keys(_this._plugins));
}};

fns[type](plugins);
}
}catch(err){
console.error(err);
}finally{
return plugins;
}
},

/**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
reflow:function reflow(elem,plugins){

// If plugins is undefined, just grab everything
if(typeof plugins==='undefined'){
plugins=Object.keys(this._plugins);
}
// If plugins is a string, convert it to an array with one item
else if(typeof plugins==='string'){
plugins=[plugins];
}

var _this=this;

// Iterate through each plugin
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(plugins,function(i,name){
// Get the current plugin
var plugin=_this._plugins[name];

// Localize the search to all elements inside elem, as well as elem itself, unless elem === document
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).find('[data-'+name+']').addBack('[data-'+name+']').filter(function(){
return typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("zfPlugin")==='undefined';
});

// For each plugin found, initialize it
$elem.each(function(){
var $el=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
opts={reflow:true};

if($el.attr('data-options')){
var thing=$el.attr('data-options').split(';').forEach(function(e,i){
var opt=e.split(':').map(function(el){return el.trim();});
if(opt[0])opts[opt[0]]=parseValue(opt[1]);
});
}
try{
$el.data('zfPlugin',new plugin(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),opts));
}catch(er){
console.error(er);
}finally{
return;
}
});
});
},
getFnName:functionName,

addToJquery:function addToJquery($){
// TODO: consider not making this a jQuery function
// TODO: need way to reflow vs. re-initialize
/**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
var foundation=function foundation(method){
var type=typeof method,
$noJS=$('.no-js');

if($noJS.length){
$noJS.removeClass('no-js');
}

if(type==='undefined'){//needs to initialize the Foundation object, or an individual plugin.
_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__["MediaQuery"]._init();
Foundation.reflow(this);
}else if(type==='string'){//an individual method to invoke on a plugin or group of plugins
var args=Array.prototype.slice.call(arguments,1);//collect all the arguments, if necessary
var plugClass=this.data('zfPlugin');//determine the class of plugin

if(typeof plugClass!=='undefined'&&typeof plugClass[method]!=='undefined'){//make sure both the class and method exist
if(this.length===1){//if there's only one, call it directly.
plugClass[method].apply(plugClass,args);
}else {
this.each(function(i,el){//otherwise loop through the jQuery collection and invoke the method on each
plugClass[method].apply($(el).data('zfPlugin'),args);
});
}
}else {//error for no class or no method
throw new ReferenceError("We're sorry, '"+method+"' is not an available method for "+(plugClass?functionName(plugClass):'this element')+'.');
}
}else {//error for invalid argument type
throw new TypeError("We're sorry, ".concat(type," is not a valid parameter. You must use a string representing the method you wish to invoke."));
}
return this;
};
$.fn.foundation=foundation;
return $;
}};


Foundation.util={
/**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
throttle:function throttle(func,delay){
var timer=null;

return function(){
var context=this,args=arguments;

if(timer===null){
timer=setTimeout(function(){
func.apply(context,args);
timer=null;
},delay);
}
};
}};


window.Foundation=Foundation;

// Polyfill for requestAnimationFrame
(function(){
if(!Date.now||!window.Date.now)
window.Date.now=Date.now=function(){return new Date().getTime();};

var vendors=['webkit','moz'];
for(var i=0;i<vendors.length&&!window.requestAnimationFrame;++i){
var vp=vendors[i];
window.requestAnimationFrame=window[vp+'RequestAnimationFrame'];
window.cancelAnimationFrame=window[vp+'CancelAnimationFrame']||
window[vp+'CancelRequestAnimationFrame'];
}
if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||
!window.requestAnimationFrame||!window.cancelAnimationFrame){
var lastTime=0;
window.requestAnimationFrame=function(callback){
var now=Date.now();
var nextTime=Math.max(lastTime+16,now);
return setTimeout(function(){callback(lastTime=nextTime);},
nextTime-now);
};
window.cancelAnimationFrame=clearTimeout;
}
/**
   * Polyfill for performance.now, required by rAF
   */
if(!window.performance||!window.performance.now){
window.performance={
start:Date.now(),
now:function now(){return Date.now()-this.start;}};

}
})();
if(!Function.prototype.bind){
Function.prototype.bind=function(oThis){
if(typeof this!=='function'){
// closest thing possible to the ECMAScript 5
// internal IsCallable function
throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
}

var aArgs=Array.prototype.slice.call(arguments,1),
fToBind=this,
fNOP=function fNOP(){},
fBound=function fBound(){
return fToBind.apply(this instanceof fNOP?
this:
oThis,
aArgs.concat(Array.prototype.slice.call(arguments)));
};

if(this.prototype){
// native functions don't have a prototype
fNOP.prototype=this.prototype;
}
fBound.prototype=new fNOP();

return fBound;
};
}
// Polyfill to get the name of a function in IE9
function functionName(fn){
if(typeof Function.prototype.name==='undefined'){
var funcNameRegex=/function\s([^(]{1,})\(/;
var results=funcNameRegex.exec(fn.toString());
return results&&results.length>1?results[1].trim():"";
}else
if(typeof fn.prototype==='undefined'){
return fn.constructor.name;
}else
{
return fn.prototype.constructor.name;
}
}
function parseValue(str){
if('true'===str)return true;else
if('false'===str)return false;else
if(!isNaN(str*1))return parseFloat(str);
return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str){
return str.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.core.plugin.js":
/*!********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.core.plugin.js ***!
  \********************************************************************/
/*! exports provided: Plugin */
/***/function node_modulesFoundationSitesJsFoundationCorePluginJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Plugin",function(){return Plugin;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");





// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
var Plugin=/*#__PURE__*/function(){

function Plugin(element,options){_classCallCheck(this,Plugin);
this._setup(element,options);
var pluginName=getPluginName(this);
this.uuid=Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6,pluginName);

if(!this.$element.attr("data-".concat(pluginName))){this.$element.attr("data-".concat(pluginName),this.uuid);}
if(!this.$element.data('zfPlugin')){this.$element.data('zfPlugin',this);}
/**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
this.$element.trigger("init.zf.".concat(pluginName));
}_createClass(Plugin,[{key:"destroy",value:function destroy()

{
this._destroy();
var pluginName=getPluginName(this);
this.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
/**
         * Fires when the plugin has been destroyed.
         * @event Plugin#destroyed
         */.
trigger("destroyed.zf.".concat(pluginName));
for(var prop in this){
this[prop]=null;//clean up script to prep for garbage collection.
}
}}]);return Plugin;}();


// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str){
return str.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();
}

function getPluginName(obj){
if(typeof obj.constructor.name!=='undefined'){
return hyphenate(obj.constructor.name);
}else {
return hyphenate(obj.className);
}
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.core.utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.core.utils.js ***!
  \*******************************************************************/
/*! exports provided: rtl, GetYoDigits, RegExpEscape, transitionend, onLoad, ignoreMousedisappear */
/***/function node_modulesFoundationSitesJsFoundationCoreUtilsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"rtl",function(){return rtl;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"GetYoDigits",function(){return GetYoDigits;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RegExpEscape",function(){return RegExpEscape;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"transitionend",function(){return transitionend;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"onLoad",function(){return onLoad;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ignoreMousedisappear",function(){return ignoreMousedisappear;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);




// Core Foundation Utilities, utilized in a number of places.

/**
   * Returns a boolean for RTL support
   */
function rtl(){
return jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir')==='rtl';
}

/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
function GetYoDigits(){var length=arguments.length>0&&arguments[0]!==undefined?arguments[0]:6;var namespace=arguments.length>1?arguments[1]:undefined;
var str='';
var chars='0123456789abcdefghijklmnopqrstuvwxyz';
var charsLength=chars.length;
for(var i=0;i<length;i++){
str+=chars[Math.floor(Math.random()*charsLength)];
}
return namespace?"".concat(str,"-").concat(namespace):str;
}

/**
 * Escape a string so it can be used as a regexp pattern
 * @function
 * @see https://stackoverflow.com/a/9310752/4317384
 *
 * @param {String} str - string to escape.
 * @returns {String} - escaped string
 */
function RegExpEscape(str){
return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&');
}

function transitionend($elem){
var transitions={
'transition':'transitionend',
'WebkitTransition':'webkitTransitionEnd',
'MozTransition':'transitionend',
'OTransition':'otransitionend'};

var elem=document.createElement('div'),
end;

for(var t in transitions){
if(typeof elem.style[t]!=='undefined'){
end=transitions[t];
}
}
if(end){
return end;
}else {
end=setTimeout(function(){
$elem.triggerHandler('transitionend',[$elem]);
},1);
return 'transitionend';
}
}

/**
 * Return an event type to listen for window load.
 *
 * If `$elem` is passed, an event will be triggered on `$elem`. If window is already loaded, the event will still be triggered.
 * If `handler` is passed, attach it to the event on `$elem`.
 * Calling `onLoad` without handler allows you to get the event type that will be triggered before attaching the handler by yourself.
 * @function
 *
 * @param {Object} [] $elem - jQuery element on which the event will be triggered if passed.
 * @param {Function} [] handler - function to attach to the event.
 * @returns {String} - event type that should or will be triggered.
 */
function onLoad($elem,handler){
var didLoad=document.readyState==='complete';
var eventType=(didLoad?'_didLoad':'load')+'.zf.util.onLoad';
var cb=function cb(){return $elem.triggerHandler(eventType);};

if($elem){
if(handler)$elem.one(eventType,handler);

if(didLoad)
setTimeout(cb);else

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load',cb);
}

return eventType;
}

/**
 * Retuns an handler for the `mouseleave` that ignore disappeared mouses.
 *
 * If the mouse "disappeared" from the document (like when going on a browser UI element, See https://git.io/zf-11410),
 * the event is ignored.
 * - If the `ignoreLeaveWindow` is `true`, the event is ignored when the user actually left the window
 *   (like by switching to an other window with [Alt]+[Tab]).
 * - If the `ignoreReappear` is `true`, the event will be ignored when the mouse will reappear later on the document
 *   outside of the element it left.
 *
 * @function
 *
 * @param {Function} [] handler - handler for the filtered `mouseleave` event to watch.
 * @param {Object} [] options - object of options:
 * - {Boolean} [false] ignoreLeaveWindow - also ignore when the user switched windows.
 * - {Boolean} [false] ignoreReappear - also ignore when the mouse reappeared outside of the element it left.
 * @returns {Function} - filtered handler to use to listen on the `mouseleave` event.
 */
function ignoreMousedisappear(handler){var _ref=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},_ref$ignoreLeaveWindo=_ref.ignoreLeaveWindow,ignoreLeaveWindow=_ref$ignoreLeaveWindo===void 0?false:_ref$ignoreLeaveWindo,_ref$ignoreReappear=_ref.ignoreReappear,ignoreReappear=_ref$ignoreReappear===void 0?false:_ref$ignoreReappear;
return function leaveEventHandler(eLeave){for(var _len=arguments.length,rest=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){rest[_key-1]=arguments[_key];}
var callback=handler.bind.apply(handler,[this,eLeave].concat(rest));

// The mouse left: call the given callback if the mouse entered elsewhere
if(eLeave.relatedTarget!==null){
return callback();
}

// Otherwise, check if the mouse actually left the window.
// In firefox if the user switched between windows, the window sill have the focus by the time
// the event is triggered. We have to debounce the event to test this case.
setTimeout(function leaveEventDebouncer(){
if(!ignoreLeaveWindow&&document.hasFocus&&!document.hasFocus()){
return callback();
}

// Otherwise, wait for the mouse to reeapear outside of the element,
if(!ignoreReappear){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('mouseenter',function reenterEventHandler(eReenter){
if(!jquery__WEBPACK_IMPORTED_MODULE_0___default()(eLeave.currentTarget).has(eReenter.target).length){
// Fill where the mouse finally entered.
eLeave.relatedTarget=eReenter.target;
callback();
}
});
}

},0);
};
}





/***/},

/***/"./node_modules/foundation-sites/js/foundation.drilldown.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.drilldown.js ***!
  \******************************************************************/
/*! exports provided: Drilldown */
/***/function node_modulesFoundationSitesJsFoundationDrilldownJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Drilldown",function(){return Drilldown;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.util.nest */"./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.util.box */"./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");









/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 * @requires foundation.util.box
 */var

Drilldown=/*#__PURE__*/function(_foundation_core_plug3){_inherits(Drilldown,_foundation_core_plug3);function Drilldown(){_classCallCheck(this,Drilldown);return _possibleConstructorReturn(this,_getPrototypeOf(Drilldown).apply(this,arguments));}_createClass(Drilldown,[{key:"_setup",
/**
   * Creates a new instance of a drilldown menu.
   * @class
   * @name Drilldown
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},Drilldown.defaults,this.$element.data(),options);
this.className='Drilldown';// ie9 back compat

this._init();

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('Drilldown',{
'ENTER':'open',
'SPACE':'open',
'ARROW_RIGHT':'next',
'ARROW_UP':'up',
'ARROW_DOWN':'down',
'ARROW_LEFT':'previous',
'ESCAPE':'close',
'TAB':'down',
'SHIFT_TAB':'up'});

}

/**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */},{key:"_init",value:function _init()
{
_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Feather(this.$element,'drilldown');

if(this.options.autoApplyClass){
this.$element.addClass('drilldown');
}

this.$element.attr({
'role':'tree',
'aria-multiselectable':false});

this.$submenuAnchors=this.$element.find('li.is-drilldown-submenu-parent').children('a');
this.$submenus=this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role','group');
this.$menuItems=this.$element.find('li').not('.js-drilldown-back').attr('role','treeitem').find('a');

// Set the main menu as current by default (unless a submenu is selected)
// Used to set the wrapper height when the drilldown is closed/reopened from any (sub)menu
this.$currentMenu=this.$element;

this.$element.attr('data-mutate',this.$element.attr('data-drilldown')||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6,'drilldown'));

this._prepareMenu();
this._registerEvents();

this._keyboardEvents();
}

/**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */},{key:"_prepareMenu",value:function _prepareMenu()
{
var _this=this;
// if(!this.options.holdOpen){
//   this._menuLinkEvents();
// }
this.$submenuAnchors.each(function(){
var $link=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
var $sub=$link.parent();
if(_this.options.parentLink){
$link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>');
}
$link.data('savedHref',$link.attr('href')).removeAttr('href').attr('tabindex',0);
$link.children('[data-submenu]').
attr({
'aria-hidden':true,
'tabindex':0,
'role':'group'});

_this._events($link);
});
this.$submenus.each(function(){
var $menu=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$back=$menu.find('.js-drilldown-back');
if(!$back.length){
switch(_this.options.backButtonPosition){
case"bottom":
$menu.append(_this.options.backButton);
break;
case"top":
$menu.prepend(_this.options.backButton);
break;
default:
console.error("Unsupported backButtonPosition value '"+_this.options.backButtonPosition+"'");}

}
_this._back($menu);
});

this.$submenus.addClass('invisible');
if(!this.options.autoHeight){
this.$submenus.addClass('drilldown-submenu-cover-previous');
}

// create a wrapper on element if it doesn't exist.
if(!this.$element.parent().hasClass('is-drilldown')){
this.$wrapper=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.wrapper).addClass('is-drilldown');
if(this.options.animateHeight)this.$wrapper.addClass('animate-height');
this.$element.wrap(this.$wrapper);
}
// set wrapper
this.$wrapper=this.$element.parent();
this.$wrapper.css(this._getMaxDims());
}},{key:"_resize",value:function _resize()

{
this.$wrapper.css({'max-width':'none','min-height':'none'});
// _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths
this.$wrapper.css(this._getMaxDims());
}

/**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */},{key:"_events",value:function _events(
$elem){
var _this=this;

$elem.off('click.zf.drilldown').
on('click.zf.drilldown',function(e){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul','li').hasClass('is-drilldown-submenu-parent')){
e.preventDefault();
}

// if(e.target !== e.currentTarget.firstElementChild){
//   return false;
// }
_this._show($elem.parent('li'));

if(_this.options.closeOnClick){
var $body=jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
$body.off('.zf.drilldown').on('click.zf.drilldown',function(e){
if(e.target===_this.$element[0]||jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0],e.target)){return;}
e.preventDefault();
_this._hideAll();
$body.off('.zf.drilldown');
});
}
});
}

/**
   * Adds event handlers to the menu element.
   * @function
   * @private
   */},{key:"_registerEvents",value:function _registerEvents()
{
if(this.options.scrollTop){
this._bindHandler=this._scrollTop.bind(this);
this.$element.on('open.zf.drilldown hide.zf.drilldown close.zf.drilldown closed.zf.drilldown',this._bindHandler);
}
this.$element.on('mutateme.zf.trigger',this._resize.bind(this));
}

/**
   * Scroll to Top of Element or data-scroll-top-element
   * @function
   * @fires Drilldown#scrollme
   */},{key:"_scrollTop",value:function _scrollTop()
{
var _this=this;
var $scrollTopElement=_this.options.scrollTopElement!=''?jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.options.scrollTopElement):_this.$element,
scrollPos=parseInt($scrollTopElement.offset().top+_this.options.scrollTopOffset,10);
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({scrollTop:scrollPos},_this.options.animationDuration,_this.options.animationEasing,function(){
/**
        * Fires after the menu has scrolled
        * @event Drilldown#scrollme
        */
if(this===jquery__WEBPACK_IMPORTED_MODULE_0___default()('html')[0])_this.$element.trigger('scrollme.zf.drilldown');
});
}

/**
   * Adds keydown event listener to `li`'s in the menu.
   * @private
   */},{key:"_keyboardEvents",value:function _keyboardEvents()
{
var _this=this;

this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown',function(e){
var $element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$elements=$element.parent('li').parent('ul').children('li').children('a'),
$prevElement,
$nextElement;

$elements.each(function(i){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)){
$prevElement=$elements.eq(Math.max(0,i-1));
$nextElement=$elements.eq(Math.min(i+1,$elements.length-1));
return;
}
});

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e,'Drilldown',{
next:function next(){
if($element.is(_this.$submenuAnchors)){
_this._show($element.parent('li'));
$element.parent('li').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element),function(){
$element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
});
return true;
}
},
previous:function previous(){
_this._hide($element.parent('li').parent('ul'));
$element.parent('li').parent('ul').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element),function(){
setTimeout(function(){
$element.parent('li').parent('ul').parent('li').children('a').first().focus();
},1);
});
return true;
},
up:function up(){
$prevElement.focus();
// Don't tap focus on first element in root ul
return !$element.is(_this.$element.find('> li:first-child > a'));
},
down:function down(){
$nextElement.focus();
// Don't tap focus on last element in root ul
return !$element.is(_this.$element.find('> li:last-child > a'));
},
close:function close(){
// Don't close on element in root ul
if(!$element.is(_this.$element.find('> li > a'))){
_this._hide($element.parent().parent());
$element.parent().parent().siblings('a').focus();
}
},
open:function open(){
if(_this.options.parentLink&&$element.attr('href')){// Link with href
return false;
}else if(!$element.is(_this.$menuItems)){// not menu item means back button
_this._hide($element.parent('li').parent('ul'));
$element.parent('li').parent('ul').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element),function(){
setTimeout(function(){
$element.parent('li').parent('ul').parent('li').children('a').first().focus();
},1);
});
return true;
}else if($element.is(_this.$submenuAnchors)){// Sub menu item
_this._show($element.parent('li'));
$element.parent('li').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element),function(){
$element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
});
return true;
}
},
handled:function handled(preventDefault){
if(preventDefault){
e.preventDefault();
}
}});

});// end keyboardAccess
}

/**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#close
   * @fires Drilldown#closed
   */},{key:"_hideAll",value:function _hideAll()
{var _this7=this;
var $elem=this.$element.find('.is-drilldown-submenu.is-active');
$elem.addClass('is-closing');

if(this.options.autoHeight){
var calcHeight=$elem.parent().closest('ul').data('calcHeight');
this.$wrapper.css({height:calcHeight});
}

/**
     * Fires when the menu is closing.
     * @event Drilldown#close
     */
this.$element.trigger('close.zf.drilldown');

$elem.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($elem),function(){
$elem.removeClass('is-active is-closing');

/**
       * Fires when the menu is fully closed.
       * @event Drilldown#closed
       */
_this7.$element.trigger('closed.zf.drilldown');
});
}

/**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */},{key:"_back",value:function _back(
$elem){
var _this=this;
$elem.off('click.zf.drilldown');
$elem.children('.js-drilldown-back').
on('click.zf.drilldown',function(e){
// console.log('mouseup on back');
_this._hide($elem);

// If there is a parent submenu, call show
var parentSubMenu=$elem.parent('li').parent('ul').parent('li');
if(parentSubMenu.length){
_this._show(parentSubMenu);
}
});
}

/**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */},{key:"_menuLinkEvents",value:function _menuLinkEvents()
{
var _this=this;
this.$menuItems.not('.is-drilldown-submenu-parent').
off('click.zf.drilldown').
on('click.zf.drilldown',function(e){
setTimeout(function(){
_this._hideAll();
},0);
});
}

/**
   * Sets the CSS classes for submenu to show it.
   * @function
   * @private
   * @param {jQuery} $elem - the target submenu (`ul` tag)
   * @param {boolean} trigger - trigger drilldown event
   */},{key:"_setShowSubMenuClasses",value:function _setShowSubMenuClasses(
$elem,trigger){
$elem.addClass('is-active').removeClass('invisible').attr('aria-hidden',false);
$elem.parent('li').attr('aria-expanded',true);
if(trigger===true){
this.$element.trigger('open.zf.drilldown',[$elem]);
}
}

/**
   * Sets the CSS classes for submenu to hide it.
   * @function
   * @private
   * @param {jQuery} $elem - the target submenu (`ul` tag)
   * @param {boolean} trigger - trigger drilldown event
   */},{key:"_setHideSubMenuClasses",value:function _setHideSubMenuClasses(
$elem,trigger){
$elem.removeClass('is-active').addClass('invisible').attr('aria-hidden',true);
$elem.parent('li').attr('aria-expanded',false);
if(trigger===true){
$elem.trigger('hide.zf.drilldown',[$elem]);
}
}

/**
   * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
   * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
   * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
   */},{key:"_showMenu",value:function _showMenu(
$elem,autoFocus){

var _this=this;

// Reset drilldown
var $expandedSubmenus=this.$element.find('li[aria-expanded="true"] > ul[data-submenu]');
$expandedSubmenus.each(function(index){
_this._setHideSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
});

// Save the menu as the currently displayed one.
this.$currentMenu=$elem;

// If target menu is root, focus first link & exit
if($elem.is('[data-drilldown]')){
if(autoFocus===true)$elem.find('li[role="treeitem"] > a').first().focus();
if(this.options.autoHeight)this.$wrapper.css('height',$elem.data('calcHeight'));
return;
}

// Find all submenus on way to root incl. the element itself
var $submenus=$elem.children().first().parentsUntil('[data-drilldown]','[data-submenu]');

// Open target menu and all submenus on its way to root
$submenus.each(function(index){

// Update height of first child (target menu) if autoHeight option true
if(index===0&&_this.options.autoHeight){
_this.$wrapper.css('height',jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight'));
}

var isLastChild=index==$submenus.length-1;

// Add transitionsend listener to last child (root due to reverse order) to open target menu's first link
// Last child makes sure the event gets always triggered even if going through several menus
if(isLastChild===true){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)),function(){
if(autoFocus===true){
$elem.find('li[role="treeitem"] > a').first().focus();
}
});
}

_this._setShowSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),isLastChild);
});
}

/**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
   */},{key:"_show",value:function _show(
$elem){
var $submenu=$elem.children('[data-submenu]');

$elem.attr('aria-expanded',true);

this.$currentMenu=$submenu;
$submenu.addClass('is-active').removeClass('invisible').attr('aria-hidden',false);
if(this.options.autoHeight){
this.$wrapper.css({height:$submenu.data('calcHeight')});
}

/**
     * Fires when the submenu has opened.
     * @event Drilldown#open
     */
this.$element.trigger('open.zf.drilldown',[$elem]);
}

/**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
   */},{key:"_hide",value:function _hide(
$elem){
if(this.options.autoHeight)this.$wrapper.css({height:$elem.parent().closest('ul').data('calcHeight')});
$elem.parent('li').attr('aria-expanded',false);
$elem.attr('aria-hidden',true);
$elem.addClass('is-closing').
one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($elem),function(){
$elem.removeClass('is-active is-closing');
$elem.blur().addClass('invisible');
});
/**
     * Fires when the submenu has closed.
     * @event Drilldown#hide
     */
$elem.trigger('hide.zf.drilldown',[$elem]);
}

/**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */},{key:"_getMaxDims",value:function _getMaxDims()
{
var maxHeight=0,result={},_this=this;

// Recalculate menu heights and total max height
this.$submenus.add(this.$element).each(function(){
var numOfElems=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('li').length;
var height=_foundation_util_box__WEBPACK_IMPORTED_MODULE_4__["Box"].GetDimensions(this).height;

maxHeight=height>maxHeight?height:maxHeight;

if(_this.options.autoHeight){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight',height);
}
});

if(this.options.autoHeight)
result['height']=this.$currentMenu.data('calcHeight');else

result['min-height']="".concat(maxHeight,"px");

result['max-width']="".concat(this.$element[0].getBoundingClientRect().width,"px");

return result;
}

/**
   * Destroys the Drilldown Menu
   * @function
   */},{key:"_destroy",value:function _destroy()
{
if(this.options.scrollTop)this.$element.off('.zf.drilldown',this._bindHandler);
this._hideAll();
this.$element.off('mutateme.zf.trigger');
_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Burn(this.$element,'drilldown');
this.$element.unwrap().
find('.js-drilldown-back, .is-submenu-parent-item').remove().
end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').
end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
this.$submenuAnchors.each(function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('.zf.drilldown');
});

this.$element.find('[data-is-parent-link]').detach();
this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');

this.$element.find('a').each(function(){
var $link=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
$link.removeAttr('tabindex');
if($link.data('savedHref')){
$link.attr('href',$link.data('savedHref')).removeData('savedHref');
}else {return;}
});
}}]);return Drilldown;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__["Plugin"]);


Drilldown.defaults={
/**
   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
   * @option
   * @type {boolean}
   * @default true
   */
autoApplyClass:true,
/**
   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
   */
backButton:'<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
/**
   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
   * @option
   * @type {string}
   * @default top
   */
backButtonPosition:'top',
/**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<div></div>'
   */
wrapper:'<div></div>',
/**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
parentLink:false,
/**
   * Allow the menu to return to root list on body click.
   * @option
   * @type {boolean}
   * @default false
   */
closeOnClick:false,
/**
   * Allow the menu to auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
autoHeight:false,
/**
   * Animate the auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
animateHeight:false,
/**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @type {boolean}
   * @default false
   */
scrollTop:false,
/**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @type {string}
   * @default ''
   */
scrollTopElement:'',
/**
   * ScrollTop offset
   * @option
   * @type {number}
   * @default 0
   */
scrollTopOffset:0,
/**
   * Scroll animation duration
   * @option
   * @type {number}
   * @default 500
   */
animationDuration:500,
/**
   * Scroll animation easing. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @see {@link https://api.jquery.com/animate|JQuery animate}
   * @default 'swing'
   */
animationEasing:'swing'
// holdOpen: false
};




/***/},

/***/"./node_modules/foundation-sites/js/foundation.dropdownMenu.js":
/*!*********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.dropdownMenu.js ***!
  \*********************************************************************/
/*! exports provided: DropdownMenu */
/***/function node_modulesFoundationSitesJsFoundationDropdownMenuJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DropdownMenu",function(){return DropdownMenu;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.util.nest */"./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */var _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./foundation.util.box */"./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony import */var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./foundation.util.touch */"./node_modules/foundation-sites/js/foundation.util.touch.js");











/**
 * DropdownMenu module.
 * @module foundation.dropdownMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 * @requires foundation.util.touch
 */var

DropdownMenu=/*#__PURE__*/function(_foundation_core_plug4){_inherits(DropdownMenu,_foundation_core_plug4);function DropdownMenu(){_classCallCheck(this,DropdownMenu);return _possibleConstructorReturn(this,_getPrototypeOf(DropdownMenu).apply(this,arguments));}_createClass(DropdownMenu,[{key:"_setup",
/**
   * Creates a new instance of DropdownMenu.
   * @class
   * @name DropdownMenu
   * @fires DropdownMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},DropdownMenu.defaults,this.$element.data(),options);
this.className='DropdownMenu';// ie9 back compat

_foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);// Touch init is idempotent, we just need to make sure it's initialied.

this._init();

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].register('DropdownMenu',{
'ENTER':'open',
'SPACE':'open',
'ARROW_RIGHT':'next',
'ARROW_UP':'up',
'ARROW_DOWN':'down',
'ARROW_LEFT':'previous',
'ESCAPE':'close'});

}

/**
   * Initializes the plugin, and calls _prepareMenu
   * @private
   * @function
   */},{key:"_init",value:function _init()
{
_foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__["Nest"].Feather(this.$element,'dropdown');

var subs=this.$element.find('li.is-dropdown-submenu-parent');
this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

this.$menuItems=this.$element.find('[role="menuitem"]');
this.$tabs=this.$element.children('[role="menuitem"]');
this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

if(this.options.alignment==='auto'){
if(this.$element.hasClass(this.options.rightClass)||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"])()||this.$element.parents('.top-bar-right').is('*')){
this.options.alignment='right';
subs.addClass('opens-left');
}else {
this.options.alignment='left';
subs.addClass('opens-right');
}
}else {
if(this.options.alignment==='right'){
subs.addClass('opens-left');
}else {
subs.addClass('opens-right');
}
}
this.changed=false;
this._events();
}},{key:"_isVertical",value:function _isVertical()

{
return this.$tabs.css('display')==='block'||this.$element.css('flex-direction')==='column';
}},{key:"_isRtl",value:function _isRtl()

{
return this.$element.hasClass('align-right')||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"])()&&!this.$element.hasClass('align-left');
}

/**
   * Adds event listeners to elements within the menu
   * @private
   * @function
   */},{key:"_events",value:function _events()
{
var _this=this,
hasTouch='ontouchstart'in window||typeof window.ontouchstart!=='undefined',
parClass='is-dropdown-submenu-parent';

// used for onClick and in the keyboard handlers
var handleClickFn=function handleClickFn(e){
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul',".".concat(parClass)),
hasSub=$elem.hasClass(parClass),
hasClicked=$elem.attr('data-is-click')==='true',
$sub=$elem.children('.is-dropdown-submenu');

if(hasSub){
if(hasClicked){
if(!_this.options.closeOnClick||
!_this.options.clickOpen&&!hasTouch||
_this.options.forceFollow&&hasTouch){
return;
}
e.preventDefault();
_this._hide($elem);
}else
{
e.preventDefault();
_this._show($sub);
$elem.add($elem.parentsUntil(_this.$element,".".concat(parClass))).attr('data-is-click',true);
}
}
};

if(this.options.clickOpen||hasTouch){
this.$menuItems.on('click.zf.dropdownMenu touchstart.zf.dropdownMenu',handleClickFn);
}

// Handle Leaf element Clicks
if(_this.options.closeOnClickInside){
this.$menuItems.on('click.zf.dropdownMenu',function(e){
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
hasSub=$elem.hasClass(parClass);
if(!hasSub){
_this._hide();
}
});
}

if(!this.options.disableHover){
this.$menuItems.on('mouseenter.zf.dropdownMenu',function(e){
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
hasSub=$elem.hasClass(parClass);

if(hasSub){
clearTimeout($elem.data('_delay'));
$elem.data('_delay',setTimeout(function(){
_this._show($elem.children('.is-dropdown-submenu'));
},_this.options.hoverDelay));
}
}).on('mouseleave.zf.dropdownMenu',Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["ignoreMousedisappear"])(function(e){
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
hasSub=$elem.hasClass(parClass);
if(hasSub&&_this.options.autoclose){
if($elem.attr('data-is-click')==='true'&&_this.options.clickOpen){return false;}

clearTimeout($elem.data('_delay'));
$elem.data('_delay',setTimeout(function(){
_this._hide($elem);
},_this.options.closingTime));
}
}));
}
this.$menuItems.on('keydown.zf.dropdownMenu',function(e){
var $element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul','[role="menuitem"]'),
isTab=_this.$tabs.index($element)>-1,
$elements=isTab?_this.$tabs:$element.siblings('li').add($element),
$prevElement,
$nextElement;

$elements.each(function(i){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)){
$prevElement=$elements.eq(i-1);
$nextElement=$elements.eq(i+1);
return;
}
});

var nextSibling=function nextSibling(){
$nextElement.children('a:first').focus();
e.preventDefault();
},prevSibling=function prevSibling(){
$prevElement.children('a:first').focus();
e.preventDefault();
},openSub=function openSub(){
var $sub=$element.children('ul.is-dropdown-submenu');
if($sub.length){
_this._show($sub);
$element.find('li > a:first').focus();
e.preventDefault();
}else {return;}
},closeSub=function closeSub(){
//if ($element.is(':first-child')) {
var close=$element.parent('ul').parent('li');
close.children('a:first').focus();
_this._hide(close);
e.preventDefault();
//}
};
var functions={
open:openSub,
close:function close(){
_this._hide(_this.$element);
_this.$menuItems.eq(0).children('a').focus();// focus to first element
e.preventDefault();
}};


if(isTab){
if(_this._isVertical()){// vertical menu
if(_this._isRtl()){// right aligned
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions,{
down:nextSibling,
up:prevSibling,
next:closeSub,
previous:openSub});

}else {// left aligned
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions,{
down:nextSibling,
up:prevSibling,
next:openSub,
previous:closeSub});

}
}else {// horizontal menu
if(_this._isRtl()){// right aligned
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions,{
next:prevSibling,
previous:nextSibling,
down:openSub,
up:closeSub});

}else {// left aligned
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions,{
next:nextSibling,
previous:prevSibling,
down:openSub,
up:closeSub});

}
}
}else {// not tabs -> one sub
if(_this._isRtl()){// right aligned
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions,{
next:closeSub,
previous:openSub,
down:nextSibling,
up:prevSibling});

}else {// left aligned
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions,{
next:openSub,
previous:closeSub,
down:nextSibling,
up:prevSibling});

}
}
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].handleKey(e,'DropdownMenu',functions);

});
}

/**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */},{key:"_addBodyHandler",value:function _addBodyHandler()
{var _this8=this;
var $body=jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
this._removeBodyHandler();
$body.on('click.zf.dropdownMenu tap.zf.dropdownMenu',function(e){
var isItself=!!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest(_this8.$element).length;
if(isItself)return;

_this8._hide();
_this8._removeBodyHandler();
});
}

/**
   * Remove the body event handler. See `_addBodyHandler`.
   * @function
   * @private
   */},{key:"_removeBodyHandler",value:function _removeBodyHandler()
{
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('click.zf.dropdownMenu tap.zf.dropdownMenu');
}

/**
   * Opens a dropdown pane, and checks for collisions first.
   * @param {jQuery} $sub - ul element that is a submenu to show
   * @function
   * @private
   * @fires DropdownMenu#show
   */},{key:"_show",value:function _show(
$sub){
var idx=this.$tabs.index(this.$tabs.filter(function(i,el){
return jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find($sub).length>0;
}));
var $sibs=$sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
this._hide($sibs,idx);
$sub.css('visibility','hidden').addClass('js-dropdown-active').
parent('li.is-dropdown-submenu-parent').addClass('is-active');
var clear=_foundation_util_box__WEBPACK_IMPORTED_MODULE_5__["Box"].ImNotTouchingYou($sub,null,true);
if(!clear){
var oldClass=this.options.alignment==='left'?'-right':'-left',
$parentLi=$sub.parent('.is-dropdown-submenu-parent');
$parentLi.removeClass("opens".concat(oldClass)).addClass("opens-".concat(this.options.alignment));
clear=_foundation_util_box__WEBPACK_IMPORTED_MODULE_5__["Box"].ImNotTouchingYou($sub,null,true);
if(!clear){
$parentLi.removeClass("opens-".concat(this.options.alignment)).addClass('opens-inner');
}
this.changed=true;
}
$sub.css('visibility','');
if(this.options.closeOnClick){this._addBodyHandler();}
/**
     * Fires when the new dropdown pane is visible.
     * @event DropdownMenu#show
     */
this.$element.trigger('show.zf.dropdownMenu',[$sub]);
}

/**
   * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
   * @function
   * @param {jQuery} $elem - element with a submenu to hide
   * @param {Number} idx - index of the $tabs collection to hide
   * @fires DropdownMenu#hide
   * @private
   */},{key:"_hide",value:function _hide(
$elem,idx){
var $toClose;
if($elem&&$elem.length){
$toClose=$elem;
}else if(typeof idx!=='undefined'){
$toClose=this.$tabs.not(function(i,el){
return i===idx;
});
}else
{
$toClose=this.$element;
}
var somethingToClose=$toClose.hasClass('is-active')||$toClose.find('.is-active').length>0;

if(somethingToClose){
var $activeItem=$toClose.find('li.is-active');
$activeItem.add($toClose).attr({
'data-is-click':false}).
removeClass('is-active');

$toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

if(this.changed||$toClose.find('opens-inner').length){
var oldClass=this.options.alignment==='left'?'right':'left';
$toClose.find('li.is-dropdown-submenu-parent').add($toClose).
removeClass("opens-inner opens-".concat(this.options.alignment)).
addClass("opens-".concat(oldClass));
this.changed=false;
}

clearTimeout($activeItem.data('_delay'));
this._removeBodyHandler();

/**
       * Fires when the open menus are closed.
       * @event DropdownMenu#hide
       */
this.$element.trigger('hide.zf.dropdownMenu',[$toClose]);
}
}

/**
   * Destroys the plugin.
   * @function
   */},{key:"_destroy",value:function _destroy()
{
this.$menuItems.off('.zf.dropdownMenu').removeAttr('data-is-click').
removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('.zf.dropdownMenu');
_foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__["Nest"].Burn(this.$element,'dropdown');
}}]);return DropdownMenu;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);


/**
 * Default settings for plugin
 */
DropdownMenu.defaults={
/**
   * Disallows hover events from opening submenus
   * @option
   * @type {boolean}
   * @default false
   */
disableHover:false,
/**
   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
   * @option
   * @type {boolean}
   * @default true
   */
autoclose:true,
/**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 50
   */
hoverDelay:50,
/**
   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
   * @option
   * @type {boolean}
   * @default false
   */
clickOpen:false,
/**
   * Amount of time to delay closing a submenu on a mouseleave event.
   * @option
   * @type {number}
   * @default 500
   */

closingTime:500,
/**
   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
   * @option
   * @type {string}
   * @default 'auto'
   */
alignment:'auto',
/**
   * Allow clicks on the body to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
closeOnClick:true,
/**
   * Allow clicks on leaf anchor links to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
closeOnClickInside:true,
/**
   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'vertical'
   */
verticalClass:'vertical',
/**
   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'align-right'
   */
rightClass:'align-right',
/**
   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
   * @option
   * @type {boolean}
   * @default true
   */
forceFollow:true};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.equalizer.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.equalizer.js ***!
  \******************************************************************/
/*! exports provided: Equalizer */
/***/function node_modulesFoundationSitesJsFoundationEqualizerJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Equalizer",function(){return Equalizer;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.util.imageLoader */"./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");








/**
 * Equalizer module.
 * @module foundation.equalizer
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.imageLoader if equalizer contains images
 */var

Equalizer=/*#__PURE__*/function(_foundation_core_plug5){_inherits(Equalizer,_foundation_core_plug5);function Equalizer(){_classCallCheck(this,Equalizer);return _possibleConstructorReturn(this,_getPrototypeOf(Equalizer).apply(this,arguments));}_createClass(Equalizer,[{key:"_setup",
/**
   * Creates a new instance of Equalizer.
   * @class
   * @name Equalizer
   * @fires Equalizer#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},Equalizer.defaults,this.$element.data(),options);
this.className='Equalizer';// ie9 back compat

this._init();
}

/**
   * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
   * @private
   */},{key:"_init",value:function _init()
{
var eqId=this.$element.attr('data-equalizer')||'';
var $watched=this.$element.find("[data-equalizer-watch=\"".concat(eqId,"\"]"));

_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();

this.$watched=$watched.length?$watched:this.$element.find('[data-equalizer-watch]');
this.$element.attr('data-resize',eqId||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6,'eq'));
this.$element.attr('data-mutate',eqId||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6,'eq'));

this.hasNested=this.$element.find('[data-equalizer]').length>0;
this.isNested=this.$element.parentsUntil(document.body,'[data-equalizer]').length>0;
this.isOn=false;
this._bindHandler={
onResizeMeBound:this._onResizeMe.bind(this),
onPostEqualizedBound:this._onPostEqualized.bind(this)};


var imgs=this.$element.find('img');
var tooSmall;
if(this.options.equalizeOn){
tooSmall=this._checkMQ();
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery',this._checkMQ.bind(this));
}else {
this._events();
}
if(typeof tooSmall!=='undefined'&&tooSmall===false||typeof tooSmall==='undefined'){
if(imgs.length){
Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__["onImagesLoaded"])(imgs,this._reflow.bind(this));
}else {
this._reflow();
}
}
}

/**
   * Removes event listeners if the breakpoint is too small.
   * @private
   */},{key:"_pauseEvents",value:function _pauseEvents()
{
this.isOn=false;
this.$element.off({
'.zf.equalizer':this._bindHandler.onPostEqualizedBound,
'resizeme.zf.trigger':this._bindHandler.onResizeMeBound,
'mutateme.zf.trigger':this._bindHandler.onResizeMeBound});

}

/**
   * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
   * @private
   */},{key:"_onResizeMe",value:function _onResizeMe(
e){
this._reflow();
}

/**
   * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
   * @private
   */},{key:"_onPostEqualized",value:function _onPostEqualized(
e){
if(e.target!==this.$element[0]){this._reflow();}
}

/**
   * Initializes events for Equalizer.
   * @private
   */},{key:"_events",value:function _events()
{
this._pauseEvents();
if(this.hasNested){
this.$element.on('postequalized.zf.equalizer',this._bindHandler.onPostEqualizedBound);
}else {
this.$element.on('resizeme.zf.trigger',this._bindHandler.onResizeMeBound);
this.$element.on('mutateme.zf.trigger',this._bindHandler.onResizeMeBound);
}
this.isOn=true;
}

/**
   * Checks the current breakpoint to the minimum required size.
   * @private
   */},{key:"_checkMQ",value:function _checkMQ()
{
var tooSmall=!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].is(this.options.equalizeOn);
if(tooSmall){
if(this.isOn){
this._pauseEvents();
this.$watched.css('height','auto');
}
}else {
if(!this.isOn){
this._events();
}
}
return tooSmall;
}

/**
   * A noop version for the plugin
   * @private
   */},{key:"_killswitch",value:function _killswitch()
{
return;
}

/**
   * Calls necessary functions to update Equalizer upon DOM change
   * @private
   */},{key:"_reflow",value:function _reflow()
{
if(!this.options.equalizeOnStack){
if(this._isStacked()){
this.$watched.css('height','auto');
return false;
}
}
if(this.options.equalizeByRow){
this.getHeightsByRow(this.applyHeightByRow.bind(this));
}else {
this.getHeights(this.applyHeight.bind(this));
}
}

/**
   * Manually determines if the first 2 elements are *NOT* stacked.
   * @private
   */},{key:"_isStacked",value:function _isStacked()
{
if(!this.$watched[0]||!this.$watched[1]){
return true;
}
return this.$watched[0].getBoundingClientRect().top!==this.$watched[1].getBoundingClientRect().top;
}

/**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} heights - An array of heights of children within Equalizer container
   */},{key:"getHeights",value:function getHeights(
cb){
var heights=[];
for(var i=0,len=this.$watched.length;i<len;i++){
this.$watched[i].style.height='auto';
heights.push(this.$watched[i].offsetHeight);
}
cb(heights);
}

/**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   */},{key:"getHeightsByRow",value:function getHeightsByRow(
cb){
var lastElTopOffset=this.$watched.length?this.$watched.first().offset().top:0,
groups=[],
group=0;
//group by Row
groups[group]=[];
for(var i=0,len=this.$watched.length;i<len;i++){
this.$watched[i].style.height='auto';
//maybe could use this.$watched[i].offsetTop
var elOffsetTop=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$watched[i]).offset().top;
if(elOffsetTop!=lastElTopOffset){
group++;
groups[group]=[];
lastElTopOffset=elOffsetTop;
}
groups[group].push([this.$watched[i],this.$watched[i].offsetHeight]);
}

for(var j=0,ln=groups.length;j<ln;j++){
var heights=jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[j]).map(function(){return this[1];}).get();
var max=Math.max.apply(null,heights);
groups[j].push(max);
}
cb(groups);
}

/**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @param {array} heights - An array of heights of children within Equalizer container
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */},{key:"applyHeight",value:function applyHeight(
heights){
var max=Math.max.apply(null,heights);
/**
     * Fires before the heights are applied
     * @event Equalizer#preequalized
     */
this.$element.trigger('preequalized.zf.equalizer');

this.$watched.css('height',max);

/**
     * Fires when the heights have been applied
     * @event Equalizer#postequalized
     */
this.$element.trigger('postequalized.zf.equalizer');
}

/**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
   * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   * @fires Equalizer#preequalized
   * @fires Equalizer#preequalizedrow
   * @fires Equalizer#postequalizedrow
   * @fires Equalizer#postequalized
   */},{key:"applyHeightByRow",value:function applyHeightByRow(
groups){
/**
     * Fires before the heights are applied
     */
this.$element.trigger('preequalized.zf.equalizer');
for(var i=0,len=groups.length;i<len;i++){
var groupsILength=groups[i].length,
max=groups[i][groupsILength-1];
if(groupsILength<=2){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][0][0]).css({'height':'auto'});
continue;
}
/**
        * Fires before the heights per row are applied
        * @event Equalizer#preequalizedrow
        */
this.$element.trigger('preequalizedrow.zf.equalizer');
for(var j=0,lenJ=groupsILength-1;j<lenJ;j++){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][j][0]).css({'height':max});
}
/**
        * Fires when the heights per row have been applied
        * @event Equalizer#postequalizedrow
        */
this.$element.trigger('postequalizedrow.zf.equalizer');
}
/**
     * Fires when the heights have been applied
     */
this.$element.trigger('postequalized.zf.equalizer');
}

/**
   * Destroys an instance of Equalizer.
   * @function
   */},{key:"_destroy",value:function _destroy()
{
this._pauseEvents();
this.$watched.css('height','auto');
}}]);return Equalizer;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);


/**
 * Default settings for plugin
 */
Equalizer.defaults={
/**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @type {boolean}
   * @default false
   */
equalizeOnStack:false,
/**
   * Enable height equalization row by row.
   * @option
   * @type {boolean}
   * @default false
   */
equalizeByRow:false,
/**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @type {string}
   * @default ''
   */
equalizeOn:''};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.responsiveAccordionTabs.js":
/*!********************************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.responsiveAccordionTabs.js ***!
  \********************************************************************************/
/*! exports provided: ResponsiveAccordionTabs */
/***/function node_modulesFoundationSitesJsFoundationResponsiveAccordionTabsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ResponsiveAccordionTabs",function(){return ResponsiveAccordionTabs;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_accordion__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.accordion */"./node_modules/foundation-sites/js/foundation.accordion.js");
/* harmony import */var _foundation_tabs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./foundation.tabs */"./node_modules/foundation-sites/js/foundation.tabs.js");










// The plugin matches the plugin classes with these plugin instances.
var MenuPlugins={
tabs:{
cssClass:'tabs',
plugin:_foundation_tabs__WEBPACK_IMPORTED_MODULE_5__["Tabs"],
open:function open(plugin,target){return plugin.selectTab(target);},
close:null/* not supported */,
toggle:null/* not supported */},

accordion:{
cssClass:'accordion',
plugin:_foundation_accordion__WEBPACK_IMPORTED_MODULE_4__["Accordion"],
open:function open(plugin,target){return plugin.down(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));},
close:function close(plugin,target){return plugin.up(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));},
toggle:function toggle(plugin,target){return plugin.toggle(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));}}};




/**
 * ResponsiveAccordionTabs module.
 * @module foundation.responsiveAccordionTabs
 * @requires foundation.util.motion
 * @requires foundation.accordion
 * @requires foundation.tabs
 */var

ResponsiveAccordionTabs=/*#__PURE__*/function(_foundation_core_plug6){_inherits(ResponsiveAccordionTabs,_foundation_core_plug6);
function ResponsiveAccordionTabs(element,options){var _this9;_classCallCheck(this,ResponsiveAccordionTabs);
_this9=_possibleConstructorReturn(this,_getPrototypeOf(ResponsiveAccordionTabs).call(this,element,options));
return _possibleConstructorReturn(_this9,_this9.options.reflow&&_this9.storezfData||_assertThisInitialized(_this9));
}

/**
   * Creates a new instance of a responsive accordion tabs.
   * @class
   * @name ResponsiveAccordionTabs
   * @fires ResponsiveAccordionTabs#init
   * @param {jQuery} element - jQuery object to make into Responsive Accordion Tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */_createClass(ResponsiveAccordionTabs,[{key:"_setup",value:function _setup(
element,options){
this.$element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
this.$element.data('zfPluginBase',this);
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},ResponsiveAccordionTabs.defaults,this.$element.data(),options);

this.rules=this.$element.data('responsive-accordion-tabs');
this.currentMq=null;
this.currentRule=null;
this.currentPlugin=null;
this.className='ResponsiveAccordionTabs';// ie9 back compat
if(!this.$element.attr('id')){
this.$element.attr('id',Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6,'responsiveaccordiontabs'));
}
this._init();
this._events();
}

/**
   * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.
   * @function
   * @private
   */},{key:"_init",value:function _init()
{
_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();

// The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
if(typeof this.rules==='string'){
var rulesTree={};

// Parse rules from "classes" pulled from data attribute
var rules=this.rules.split(' ');

// Iterate through every rule found
for(var i=0;i<rules.length;i++){
var rule=rules[i].split('-');
var ruleSize=rule.length>1?rule[0]:'small';
var rulePlugin=rule.length>1?rule[1]:rule[0];

if(MenuPlugins[rulePlugin]!==null){
rulesTree[ruleSize]=MenuPlugins[rulePlugin];
}
}

this.rules=rulesTree;
}

this._getAllOptions();

if(!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(this.rules)){
this._checkMediaQueries();
}
}},{key:"_getAllOptions",value:function _getAllOptions()

{
//get all defaults and options
var _this=this;
_this.allOptions={};
for(var key in MenuPlugins){
if(MenuPlugins.hasOwnProperty(key)){
var obj=MenuPlugins[key];
try{
var dummyPlugin=jquery__WEBPACK_IMPORTED_MODULE_0___default()('<ul></ul>');
var tmpPlugin=new obj.plugin(dummyPlugin,_this.options);
for(var keyKey in tmpPlugin.options){
if(tmpPlugin.options.hasOwnProperty(keyKey)&&keyKey!=='zfPlugin'){
var objObj=tmpPlugin.options[keyKey];
_this.allOptions[keyKey]=objObj;
}
}
tmpPlugin.destroy();
}
catch(e){
}
}
}
}

/**
   * Initializes events for the Menu.
   * @function
   * @private
   */},{key:"_events",value:function _events()
{
this._changedZfMediaQueryHandler=this._checkMediaQueries.bind(this);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery',this._changedZfMediaQueryHandler);
}

/**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */},{key:"_checkMediaQueries",value:function _checkMediaQueries()
{
var matchedMq,_this=this;
// Iterate through each rule and find the last matching rule
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.rules,function(key){
if(_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(key)){
matchedMq=key;
}
});

// No match? No dice
if(!matchedMq)return;

// Plugin already initialized? We good
if(this.currentPlugin instanceof this.rules[matchedMq].plugin)return;

// Remove existing plugin-specific CSS classes
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(MenuPlugins,function(key,value){
_this.$element.removeClass(value.cssClass);
});

// Add the CSS class for the new plugin
this.$element.addClass(this.rules[matchedMq].cssClass);

// Create an instance of the new plugin
if(this.currentPlugin){
//don't know why but on nested elements data zfPlugin get's lost
if(!this.currentPlugin.$element.data('zfPlugin')&&this.storezfData)this.currentPlugin.$element.data('zfPlugin',this.storezfData);
this.currentPlugin.destroy();
}
this._handleMarkup(this.rules[matchedMq].cssClass);
this.currentRule=this.rules[matchedMq];
this.currentPlugin=new this.currentRule.plugin(this.$element,this.options);
this.storezfData=this.currentPlugin.$element.data('zfPlugin');

}},{key:"_handleMarkup",value:function _handleMarkup(

toSet){
var _this=this,fromString='accordion';
var $panels=jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content='+this.$element.attr('id')+']');
if($panels.length)fromString='tabs';
if(fromString===toSet){
return;
}
var tabsTitle=_this.allOptions.linkClass?_this.allOptions.linkClass:'tabs-title';
var tabsPanel=_this.allOptions.panelClass?_this.allOptions.panelClass:'tabs-panel';

this.$element.removeAttr('role');
var $liHeads=this.$element.children('.'+tabsTitle+',[data-accordion-item]').removeClass(tabsTitle).removeClass('accordion-item').removeAttr('data-accordion-item');
var $liHeadsA=$liHeads.children('a').removeClass('accordion-title');

if(fromString==='tabs'){
$panels=$panels.children('.'+tabsPanel).removeClass(tabsPanel).removeAttr('role').removeAttr('aria-hidden').removeAttr('aria-labelledby');
$panels.children('a').removeAttr('role').removeAttr('aria-controls').removeAttr('aria-selected');
}else {
$panels=$liHeads.children('[data-tab-content]').removeClass('accordion-content');
}
$panels.css({display:'',visibility:''});
$liHeads.css({display:'',visibility:''});
if(toSet==='accordion'){
$panels.each(function(key,value){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).appendTo($liHeads.get(key)).addClass('accordion-content').attr('data-tab-content','').removeClass('is-active').css({height:''});
jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content='+_this.$element.attr('id')+']').after('<div id="tabs-placeholder-'+_this.$element.attr('id')+'"></div>').detach();
$liHeads.addClass('accordion-item').attr('data-accordion-item','');
$liHeadsA.addClass('accordion-title');
});
}else if(toSet==='tabs'){
var $tabsContent=jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content='+_this.$element.attr('id')+']');
var $placeholder=jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tabs-placeholder-'+_this.$element.attr('id'));
if($placeholder.length){
$tabsContent=jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="tabs-content"></div>').insertAfter($placeholder).attr('data-tabs-content',_this.$element.attr('id'));
$placeholder.remove();
}else {
$tabsContent=jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="tabs-content"></div>').insertAfter(_this.$element).attr('data-tabs-content',_this.$element.attr('id'));
}$panels.each(function(key,value){
var tempValue=jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).appendTo($tabsContent).addClass(tabsPanel);
var hash=$liHeadsA.get(key).hash.slice(1);
var id=jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id')||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6,'accordion');
if(hash!==id){
if(hash!==''){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id',hash);
}else {
hash=id;
jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id',hash);
jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeadsA.get(key)).attr('href',jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeadsA.get(key)).attr('href').replace('#','')+'#'+hash);
}}var isActive=jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeads.get(key)).hasClass('is-active');
if(isActive){
tempValue.addClass('is-active');
}});
$liHeads.addClass(tabsTitle);
}}

/**
   * Opens the plugin pane defined by `target`.
   * @param {jQuery | String} target - jQuery object or string of the id of the pane to open.
   * @see Accordion.down
   * @see Tabs.selectTab
   * @function
   */},{key:"open",value:function open(
target){
if(this.currentRule&&typeof this.currentRule.open==='function'){var _this$currentRule;
return (_this$currentRule=this.currentRule).open.apply(_this$currentRule,[this.currentPlugin].concat(Array.prototype.slice.call(arguments)));
}
}

/**
   * Closes the plugin pane defined by `target`. Not availaible for Tabs.
   * @param {jQuery | String} target - jQuery object or string of the id of the pane to close.
   * @see Accordion.up
   * @function
   */},{key:"close",value:function close(
target){
if(this.currentRule&&typeof this.currentRule.close==='function'){var _this$currentRule2;
return (_this$currentRule2=this.currentRule).close.apply(_this$currentRule2,[this.currentPlugin].concat(Array.prototype.slice.call(arguments)));
}
}

/**
   * Toggles the plugin pane defined by `target`. Not availaible for Tabs.
   * @param {jQuery | String} target - jQuery object or string of the id of the pane to toggle.
   * @see Accordion.toggle
   * @function
   */},{key:"toggle",value:function toggle(
target){
if(this.currentRule&&typeof this.currentRule.toggle==='function'){var _this$currentRule3;
return (_this$currentRule3=this.currentRule).toggle.apply(_this$currentRule3,[this.currentPlugin].concat(Array.prototype.slice.call(arguments)));
}
}

/**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */},{key:"_destroy",value:function _destroy()
{
if(this.currentPlugin)this.currentPlugin.destroy();
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery',this._changedZfMediaQueryHandler);
}}]);return ResponsiveAccordionTabs;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);


ResponsiveAccordionTabs.defaults={};




/***/},

/***/"./node_modules/foundation-sites/js/foundation.responsiveMenu.js":
/*!***********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.responsiveMenu.js ***!
  \***********************************************************************/
/*! exports provided: ResponsiveMenu */
/***/function node_modulesFoundationSitesJsFoundationResponsiveMenuJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ResponsiveMenu",function(){return ResponsiveMenu;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.dropdownMenu */"./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
/* harmony import */var _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./foundation.drilldown */"./node_modules/foundation-sites/js/foundation.drilldown.js");
/* harmony import */var _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./foundation.accordionMenu */"./node_modules/foundation-sites/js/foundation.accordionMenu.js");












var MenuPlugins={
dropdown:{
cssClass:'dropdown',
plugin:_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__["DropdownMenu"]},

drilldown:{
cssClass:'drilldown',
plugin:_foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__["Drilldown"]},

accordion:{
cssClass:'accordion-menu',
plugin:_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__["AccordionMenu"]}};



// import "foundation.util.triggers.js";


/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */var

ResponsiveMenu=/*#__PURE__*/function(_foundation_core_plug7){_inherits(ResponsiveMenu,_foundation_core_plug7);function ResponsiveMenu(){_classCallCheck(this,ResponsiveMenu);return _possibleConstructorReturn(this,_getPrototypeOf(ResponsiveMenu).apply(this,arguments));}_createClass(ResponsiveMenu,[{key:"_setup",
/**
   * Creates a new instance of a responsive menu.
   * @class
   * @name ResponsiveMenu
   * @fires ResponsiveMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
this.rules=this.$element.data('responsive-menu');
this.currentMq=null;
this.currentPlugin=null;
this.className='ResponsiveMenu';// ie9 back compat

this._init();
this._events();
}

/**
   * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
   * @function
   * @private
   */},{key:"_init",value:function _init()
{

_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();
// The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
if(typeof this.rules==='string'){
var rulesTree={};

// Parse rules from "classes" pulled from data attribute
var rules=this.rules.split(' ');

// Iterate through every rule found
for(var i=0;i<rules.length;i++){
var rule=rules[i].split('-');
var ruleSize=rule.length>1?rule[0]:'small';
var rulePlugin=rule.length>1?rule[1]:rule[0];

if(MenuPlugins[rulePlugin]!==null){
rulesTree[ruleSize]=MenuPlugins[rulePlugin];
}
}

this.rules=rulesTree;
}

if(!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(this.rules)){
this._checkMediaQueries();
}
// Add data-mutate since children may need it.
this.$element.attr('data-mutate',this.$element.attr('data-mutate')||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6,'responsive-menu'));
}

/**
   * Initializes events for the Menu.
   * @function
   * @private
   */},{key:"_events",value:function _events()
{
var _this=this;

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery',function(){
_this._checkMediaQueries();
});
// $(window).on('resize.zf.ResponsiveMenu', function() {
//   _this._checkMediaQueries();
// });
}

/**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */},{key:"_checkMediaQueries",value:function _checkMediaQueries()
{
var matchedMq,_this=this;
// Iterate through each rule and find the last matching rule
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.rules,function(key){
if(_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(key)){
matchedMq=key;
}
});

// No match? No dice
if(!matchedMq)return;

// Plugin already initialized? We good
if(this.currentPlugin instanceof this.rules[matchedMq].plugin)return;

// Remove existing plugin-specific CSS classes
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(MenuPlugins,function(key,value){
_this.$element.removeClass(value.cssClass);
});

// Add the CSS class for the new plugin
this.$element.addClass(this.rules[matchedMq].cssClass);

// Create an instance of the new plugin
if(this.currentPlugin)this.currentPlugin.destroy();
this.currentPlugin=new this.rules[matchedMq].plugin(this.$element,{});
}

/**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */},{key:"_destroy",value:function _destroy()
{
this.currentPlugin.destroy();
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('.zf.ResponsiveMenu');
}}]);return ResponsiveMenu;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);


ResponsiveMenu.defaults={};




/***/},

/***/"./node_modules/foundation-sites/js/foundation.responsiveToggle.js":
/*!*************************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.responsiveToggle.js ***!
  \*************************************************************************/
/*! exports provided: ResponsiveToggle */
/***/function node_modulesFoundationSitesJsFoundationResponsiveToggleJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ResponsiveToggle",function(){return ResponsiveToggle;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.util.motion */"./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");








/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */var

ResponsiveToggle=/*#__PURE__*/function(_foundation_core_plug8){_inherits(ResponsiveToggle,_foundation_core_plug8);function ResponsiveToggle(){_classCallCheck(this,ResponsiveToggle);return _possibleConstructorReturn(this,_getPrototypeOf(ResponsiveToggle).apply(this,arguments));}_createClass(ResponsiveToggle,[{key:"_setup",
/**
   * Creates a new instance of Tab Bar.
   * @class
   * @name ResponsiveToggle
   * @fires ResponsiveToggle#init
   * @param {jQuery} element - jQuery object to attach tab bar functionality to.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},ResponsiveToggle.defaults,this.$element.data(),options);
this.className='ResponsiveToggle';// ie9 back compat

this._init();
this._events();
}

/**
   * Initializes the tab bar by finding the target element, toggling element, and running update().
   * @function
   * @private
   */},{key:"_init",value:function _init()
{
_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();
var targetID=this.$element.data('responsive-toggle');
if(!targetID){
console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
}

this.$targetMenu=jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(targetID));
this.$toggler=this.$element.find('[data-toggle]').filter(function(){
var target=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');
return target===targetID||target==="";
});
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},this.options,this.$targetMenu.data());

// If they were set, parse the animation classes
if(this.options.animate){
var input=this.options.animate.split(' ');

this.animationIn=input[0];
this.animationOut=input[1]||null;
}

this._update();
}

/**
   * Adds necessary event handlers for the tab bar to work.
   * @function
   * @private
   */},{key:"_events",value:function _events()
{

this._updateMqHandler=this._update.bind(this);

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery',this._updateMqHandler);

this.$toggler.on('click.zf.responsiveToggle',this.toggleMenu.bind(this));
}

/**
   * Checks the current media query to determine if the tab bar should be visible or hidden.
   * @function
   * @private
   */},{key:"_update",value:function _update()
{
// Mobile
if(!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(this.options.hideFor)){
this.$element.show();
this.$targetMenu.hide();
}

// Desktop
else {
this.$element.hide();
this.$targetMenu.show();
}
}

/**
   * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
   * @function
   * @fires ResponsiveToggle#toggled
   */},{key:"toggleMenu",value:function toggleMenu()
{var _this10=this;
if(!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(this.options.hideFor)){
/**
       * Fires when the element attached to the tab bar toggles.
       * @event ResponsiveToggle#toggled
       */
if(this.options.animate){
if(this.$targetMenu.is(':hidden')){
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateIn(this.$targetMenu,this.animationIn,function(){
_this10.$element.trigger('toggled.zf.responsiveToggle');
_this10.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
});
}else
{
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateOut(this.$targetMenu,this.animationOut,function(){
_this10.$element.trigger('toggled.zf.responsiveToggle');
});
}
}else
{
this.$targetMenu.toggle(0);
this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
this.$element.trigger('toggled.zf.responsiveToggle');
}
}
}},{key:"_destroy",value:function _destroy()

{
this.$element.off('.zf.responsiveToggle');
this.$toggler.off('.zf.responsiveToggle');

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery',this._updateMqHandler);
}}]);return ResponsiveToggle;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);


ResponsiveToggle.defaults={
/**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
hideFor:'medium',

/**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
animate:false};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.reveal.js":
/*!***************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.reveal.js ***!
  \***************************************************************/
/*! exports provided: Reveal */
/***/function node_modulesFoundationSitesJsFoundationRevealJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Reveal",function(){return Reveal;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.util.mediaQuery */"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./foundation.util.motion */"./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony import */var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./foundation.util.triggers */"./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony import */var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./foundation.util.touch */"./node_modules/foundation-sites/js/foundation.util.touch.js");











/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */var

Reveal=/*#__PURE__*/function(_foundation_core_plug9){_inherits(Reveal,_foundation_core_plug9);function Reveal(){_classCallCheck(this,Reveal);return _possibleConstructorReturn(this,_getPrototypeOf(Reveal).apply(this,arguments));}_createClass(Reveal,[{key:"_setup",
/**
   * Creates a new instance of Reveal.
   * @class
   * @name Reveal
   * @param {jQuery} element - jQuery object to use for the modal.
   * @param {Object} options - optional parameters.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},Reveal.defaults,this.$element.data(),options);
this.className='Reveal';// ie9 back compat
this._init();

// Touch and Triggers init are idempotent, just need to make sure they are initialized
_foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);
_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].register('Reveal',{
'ESCAPE':'close'});

}

/**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */},{key:"_init",value:function _init()
{var _this11=this;
_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__["MediaQuery"]._init();
this.id=this.$element.attr('id');
this.isActive=false;
this.cached={mq:_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__["MediaQuery"].current};

this.$anchor=jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(this.id,"\"]")).length?jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(this.id,"\"]")):jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat(this.id,"\"]"));
this.$anchor.attr({
'aria-controls':this.id,
'aria-haspopup':true,
'tabindex':0});


if(this.options.fullScreen||this.$element.hasClass('full')){
this.options.fullScreen=true;
this.options.overlay=false;
}
if(this.options.overlay&&!this.$overlay){
this.$overlay=this._makeOverlay(this.id);
}

this.$element.attr({
'role':'dialog',
'aria-hidden':true,
'data-yeti-box':this.id,
'data-resize':this.id});


if(this.$overlay){
this.$element.detach().appendTo(this.$overlay);
}else {
this.$element.detach().appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo));
this.$element.addClass('without-overlay');
}
this._events();
if(this.options.deepLink&&window.location.hash==="#".concat(this.id)){
this.onLoadListener=Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window),function(){return _this11.open();});
}
}

/**
   * Creates an overlay div to display behind the modal.
   * @private
   */},{key:"_makeOverlay",value:function _makeOverlay()
{
var additionalOverlayClasses='';

if(this.options.additionalOverlayClasses){
additionalOverlayClasses=' '+this.options.additionalOverlayClasses;
}

return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').
addClass('reveal-overlay'+additionalOverlayClasses).
appendTo(this.options.appendTo);
}

/**
   * Updates position of modal
   * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
   * @private
   */},{key:"_updatePosition",value:function _updatePosition()
{
var width=this.$element.outerWidth();
var outerWidth=jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
var height=this.$element.outerHeight();
var outerHeight=jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height();
var left,top=null;
if(this.options.hOffset==='auto'){
left=parseInt((outerWidth-width)/2,10);
}else {
left=parseInt(this.options.hOffset,10);
}
if(this.options.vOffset==='auto'){
if(height>outerHeight){
top=parseInt(Math.min(100,outerHeight/10),10);
}else {
top=parseInt((outerHeight-height)/4,10);
}
}else if(this.options.vOffset!==null){
top=parseInt(this.options.vOffset,10);
}

if(top!==null){
this.$element.css({top:top+'px'});
}

// only worry about left if we don't have an overlay or we have a horizontal offset,
// otherwise we're perfectly in the middle
if(!this.$overlay||this.options.hOffset!=='auto'){
this.$element.css({left:left+'px'});
this.$element.css({margin:'0px'});
}

}

/**
   * Adds event handlers for the modal.
   * @private
   */},{key:"_events",value:function _events()
{var _this12=this;
var _this=this;

this.$element.on({
'open.zf.trigger':this.open.bind(this),
'close.zf.trigger':function closeZfTrigger(event,$element){
if(event.target===_this.$element[0]||
jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parents('[data-closable]')[0]===$element){// only close reveal when it's explicitly called
return _this12.close.apply(_this12);
}
},
'toggle.zf.trigger':this.toggle.bind(this),
'resizeme.zf.trigger':function resizemeZfTrigger(){
_this._updatePosition();
}});


if(this.options.closeOnClick&&this.options.overlay){
this.$overlay.off('.zf.reveal').on('click.zf.dropdown tap.zf.dropdown',function(e){
if(e.target===_this.$element[0]||
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0],e.target)||
!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(document,e.target)){
return;
}
_this.close();
});
}
if(this.options.deepLink){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("hashchange.zf.reveal:".concat(this.id),this._handleState.bind(this));
}
}

/**
   * Handles modal methods on back/forward button clicks or any other event that triggers hashchange.
   * @private
   */},{key:"_handleState",value:function _handleState(
e){
if(window.location.hash==='#'+this.id&&!this.isActive){this.open();}else
{this.close();}
}

/**
  * Disables the scroll when Reveal is shown to prevent the background from shifting
  * @param {number} scrollTop - Scroll to visually apply, window current scroll by default
  */},{key:"_disableScroll",value:function _disableScroll(
scrollTop){
scrollTop=scrollTop||jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()>jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()){
jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").
css("top",-scrollTop);
}
}

/**
  * Reenables the scroll when Reveal closes
  * @param {number} scrollTop - Scroll to restore, html "top" property by default (as set by `_disableScroll`)
  */},{key:"_enableScroll",value:function _enableScroll(
scrollTop){
scrollTop=scrollTop||parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top"));
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()>jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()){
jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").
css("top","");
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop(-scrollTop);
}
}


/**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @function
   * @fires Reveal#closeme
   * @fires Reveal#open
   */},{key:"open",value:function open()
{var _this13=this;
// either update or replace browser history
var hash="#".concat(this.id);
if(this.options.deepLink&&window.location.hash!==hash){

if(window.history.pushState){
if(this.options.updateHistory){
window.history.pushState({},'',hash);
}else {
window.history.replaceState({},'',hash);
}
}else {
window.location.hash=hash;
}
}

// Remember anchor that opened it to set focus back later, have general anchors as fallback
this.$activeAnchor=jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement).is(this.$anchor)?jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement):this.$anchor;

this.isActive=true;

// Make elements invisible, but remove display: none so we can get size and positioning
this.$element.
css({'visibility':'hidden'}).
show().
scrollTop(0);
if(this.options.overlay){
this.$overlay.css({'visibility':'hidden'}).show();
}

this._updatePosition();

this.$element.
hide().
css({'visibility':''});

if(this.$overlay){
this.$overlay.css({'visibility':''}).hide();
if(this.$element.hasClass('fast')){
this.$overlay.addClass('fast');
}else if(this.$element.hasClass('slow')){
this.$overlay.addClass('slow');
}
}


if(!this.options.multipleOpened){
/**
       * Fires immediately before the modal opens.
       * Closes any other modals that are currently open
       * @event Reveal#closeme
       */
this.$element.trigger('closeme.zf.reveal',this.id);
}

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length===0){
this._disableScroll();
}

var _this=this;

// Motion UI method of reveal
if(this.options.animationIn){var
afterAnimation=function afterAnimation(){
_this.$element.
attr({
'aria-hidden':false,
'tabindex':-1}).

focus();
_this._addGlobalClasses();
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].trapFocus(_this.$element);
};
if(this.options.overlay){
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__["Motion"].animateIn(this.$overlay,'fade-in');
}
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__["Motion"].animateIn(this.$element,this.options.animationIn,function(){
if(_this13.$element){// protect against object having been removed
_this13.focusableElements=_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].findFocusable(_this13.$element);
afterAnimation();
}
});
}
// jQuery method of reveal
else {
if(this.options.overlay){
this.$overlay.show(0);
}
this.$element.show(this.options.showDelay);
}

// handle accessibility
this.$element.
attr({
'aria-hidden':false,
'tabindex':-1}).

focus();
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].trapFocus(this.$element);

this._addGlobalClasses();

this._addGlobalListeners();

/**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */
this.$element.trigger('open.zf.reveal');
}

/**
   * Adds classes and listeners on document required by open modals.
   *
   * The following classes are added and updated:
   * - `.is-reveal-open` - Prevents the scroll on document
   * - `.zf-has-scroll`  - Displays a disabled scrollbar on document if required like if the
   *                       scroll was not disabled. This prevent a "shift" of the page content due
   *                       the scrollbar disappearing when the modal opens.
   *
   * @private
   */},{key:"_addGlobalClasses",value:function _addGlobalClasses()
{
var updateScrollbarClass=function updateScrollbarClass(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').toggleClass('zf-has-scroll',!!(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()>jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()));
};

this.$element.on('resizeme.zf.trigger.revealScrollbarListener',function(){return updateScrollbarClass();});
updateScrollbarClass();
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass('is-reveal-open');
}

/**
   * Removes classes and listeners on document that were required by open modals.
   * @private
   */},{key:"_removeGlobalClasses",value:function _removeGlobalClasses()
{
this.$element.off('resizeme.zf.trigger.revealScrollbarListener');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('is-reveal-open');
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('zf-has-scroll');
}

/**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */},{key:"_addGlobalListeners",value:function _addGlobalListeners()
{
var _this=this;
if(!this.$element){return;}// If we're in the middle of cleanup, don't freak out
this.focusableElements=_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].findFocusable(this.$element);

if(!this.options.overlay&&this.options.closeOnClick&&!this.options.fullScreen){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click.zf.dropdown tap.zf.dropdown',function(e){
if(e.target===_this.$element[0]||
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0],e.target)||
!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(document,e.target)){return;}
_this.close();
});
}

if(this.options.closeOnEsc){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('keydown.zf.reveal',function(e){
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].handleKey(e,'Reveal',{
close:function close(){
if(_this.options.closeOnEsc){
_this.close();
}
}});

});
}
}

/**
   * Closes the modal.
   * @function
   * @fires Reveal#closed
   */},{key:"close",value:function close()
{
if(!this.isActive||!this.$element.is(':visible')){
return false;
}
var _this=this;

// Motion UI method of hiding
if(this.options.animationOut){
if(this.options.overlay){
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__["Motion"].animateOut(this.$overlay,'fade-out');
}

_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__["Motion"].animateOut(this.$element,this.options.animationOut,finishUp);
}
// jQuery method of hiding
else {
this.$element.hide(this.options.hideDelay);

if(this.options.overlay){
this.$overlay.hide(0,finishUp);
}else
{
finishUp();
}
}

// Conditionals to remove extra event listeners added on open
if(this.options.closeOnEsc){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('keydown.zf.reveal');
}

if(!this.options.overlay&&this.options.closeOnClick){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click.zf.dropdown tap.zf.dropdown');
}

this.$element.off('keydown.zf.reveal');

function finishUp(){

// Get the current top before the modal is closed and restore the scroll after.
// TODO: use component properties instead of HTML properties
// See https://github.com/zurb/foundation-sites/pull/10786
var scrollTop=parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top"));

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length===0){
_this._removeGlobalClasses();// also remove .is-reveal-open from the html element when there is no opened reveal
}

_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].releaseFocus(_this.$element);

_this.$element.attr('aria-hidden',true);

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length===0){
_this._enableScroll(scrollTop);
}

/**
      * Fires when the modal is done closing.
      * @event Reveal#closed
      */
_this.$element.trigger('closed.zf.reveal');
}

/**
    * Resets the modal content
    * This prevents a running video to keep going in the background
    */
if(this.options.resetOnClose){
this.$element.html(this.$element.html());
}

this.isActive=false;
// If deepLink and we did not switched to an other modal...
if(_this.options.deepLink&&window.location.hash==="#".concat(this.id)){
// Remove the history hash
if(window.history.replaceState){
var urlWithoutHash=window.location.pathname+window.location.search;
if(this.options.updateHistory){
window.history.pushState({},'',urlWithoutHash);// remove the hash
}else {
window.history.replaceState('',document.title,urlWithoutHash);
}
}else {
window.location.hash='';
}
}

this.$activeAnchor.focus();
}

/**
   * Toggles the open/closed state of a modal.
   * @function
   */},{key:"toggle",value:function toggle()
{
if(this.isActive){
this.close();
}else {
this.open();
}
}},{key:"_destroy",

/**
   * Destroys an instance of a modal.
   * @function
   */value:function _destroy()
{
if(this.options.overlay){
this.$element.appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo));// move $element outside of $overlay to prevent error unregisterPlugin()
this.$overlay.hide().off().remove();
}
this.$element.hide().off();
this.$anchor.off('.zf');
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(".zf.reveal:".concat(this.id));
if(this.onLoadListener)jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);

if(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length===0){
this._removeGlobalClasses();// also remove .is-reveal-open from the html element when there is no opened reveal
}
}}]);return Reveal;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);


Reveal.defaults={
/**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
animationIn:'',
/**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
animationOut:'',
/**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
showDelay:0,
/**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
hideDelay:0,
/**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @type {boolean}
   * @default true
   */
closeOnClick:true,
/**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @type {boolean}
   * @default true
   */
closeOnEsc:true,
/**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @type {boolean}
   * @default false
   */
multipleOpened:false,
/**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
vOffset:'auto',
/**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
hOffset:'auto',
/**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @type {boolean}
   * @default false
   */
fullScreen:false,
/**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @type {boolean}
   * @default true
   */
overlay:true,
/**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @type {boolean}
   * @default false
   */
resetOnClose:false,
/**
   * Link the location hash to the modal.
   * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
deepLink:false,
/**
   * If `deepLink` is enabled, update the browser history with the open modal
   * @option
   * @default false
   */
updateHistory:false,
/**
   * Allows the modal to append to custom div.
   * @option
   * @type {string}
   * @default "body"
   */
appendTo:"body",
/**
   * Allows adding additional class names to the reveal overlay.
   * @option
   * @type {string}
   * @default ''
   */
additionalOverlayClasses:''};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.smoothScroll.js":
/*!*********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.smoothScroll.js ***!
  \*********************************************************************/
/*! exports provided: SmoothScroll */
/***/function node_modulesFoundationSitesJsFoundationSmoothScrollJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SmoothScroll",function(){return SmoothScroll;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");




/**
 * SmoothScroll module.
 * @module foundation.smoothScroll
 */var
SmoothScroll=/*#__PURE__*/function(_foundation_core_plug10){_inherits(SmoothScroll,_foundation_core_plug10);function SmoothScroll(){_classCallCheck(this,SmoothScroll);return _possibleConstructorReturn(this,_getPrototypeOf(SmoothScroll).apply(this,arguments));}_createClass(SmoothScroll,[{key:"_setup",
/**
   * Creates a new instance of SmoothScroll.
   * @class
   * @name SmoothScroll
   * @fires SmoothScroll#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},SmoothScroll.defaults,this.$element.data(),options);
this.className='SmoothScroll';// ie9 back compat

this._init();
}

/**
     * Initialize the SmoothScroll plugin
     * @private
     */},{key:"_init",value:function _init()
{
var id=this.$element[0].id||Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6,'smooth-scroll');
this.$element.attr({id:id});

this._events();
}

/**
     * Initializes events for SmoothScroll.
     * @private
     */},{key:"_events",value:function _events()
{
this._linkClickListener=this._handleLinkClick.bind(this);
this.$element.on('click.zf.smoothScroll',this._linkClickListener);
this.$element.on('click.zf.smoothScroll','a[href^="#"]',this._linkClickListener);
}

/**
     * Handle the given event to smoothly scroll to the anchor pointed by the event target.
     * @param {*} e - event
     * @function
     * @private
     */},{key:"_handleLinkClick",value:function _handleLinkClick(
e){var _this14=this;
// Follow the link if it does not point to an anchor.
if(!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).is('a[href^="#"]'))return;

var arrival=e.currentTarget.getAttribute('href');

this._inTransition=true;

SmoothScroll.scrollToLoc(arrival,this.options,function(){
_this14._inTransition=false;
});

e.preventDefault();
}},{key:"_destroy",





























/**
     * Destroys the SmoothScroll instance.
     * @function
     */value:function _destroy()
{
this.$element.off('click.zf.smoothScroll',this._linkClickListener);
this.$element.off('click.zf.smoothScroll','a[href^="#"]',this._linkClickListener);
}}],[{key:"scrollToLoc",/**
     * Function to scroll to a given location on the page.
     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
     * @param {Object} options - The options to use.
     * @param {Function} callback - The callback function.
     * @static
     * @function
     */value:function scrollToLoc(loc){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:SmoothScroll.defaults;var callback=arguments.length>2?arguments[2]:undefined;var $loc=jquery__WEBPACK_IMPORTED_MODULE_0___default()(loc);// Do nothing if target does not exist to prevent errors
if(!$loc.length)return false;var scrollPos=Math.round($loc.offset().top-options.threshold/2-options.offset);jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({scrollTop:scrollPos},options.animationDuration,options.animationEasing,function(){if(typeof callback==='function'){callback();}});}}]);return SmoothScroll;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__["Plugin"]);/**
 * Default settings for plugin.
 */SmoothScroll.defaults={/**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */animationDuration:500,/**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */animationEasing:'linear',
/**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
threshold:50,
/**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
offset:0};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.tabs.js":
/*!*************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.tabs.js ***!
  \*************************************************************/
/*! exports provided: Tabs */
/***/function node_modulesFoundationSitesJsFoundationTabsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Tabs",function(){return Tabs;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.util.keyboard */"./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.util.imageLoader */"./node_modules/foundation-sites/js/foundation.util.imageLoader.js");







/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */var

Tabs=/*#__PURE__*/function(_foundation_core_plug11){_inherits(Tabs,_foundation_core_plug11);function Tabs(){_classCallCheck(this,Tabs);return _possibleConstructorReturn(this,_getPrototypeOf(Tabs).apply(this,arguments));}_createClass(Tabs,[{key:"_setup",
/**
   * Creates a new instance of tabs.
   * @class
   * @name Tabs
   * @fires Tabs#init
   * @param {jQuery} element - jQuery object to make into tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},Tabs.defaults,this.$element.data(),options);
this.className='Tabs';// ie9 back compat

this._init();
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].register('Tabs',{
'ENTER':'open',
'SPACE':'open',
'ARROW_RIGHT':'next',
'ARROW_UP':'previous',
'ARROW_DOWN':'next',
'ARROW_LEFT':'previous'
// 'TAB': 'next',
// 'SHIFT_TAB': 'previous'
});
}

/**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */},{key:"_init",value:function _init()
{var _this15=this;
var _this=this;
this._isInitializing=true;

this.$element.attr({'role':'tablist'});
this.$tabTitles=this.$element.find(".".concat(this.options.linkClass));
this.$tabContent=jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-tabs-content=\"".concat(this.$element[0].id,"\"]"));

this.$tabTitles.each(function(){
var $elem=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$link=$elem.find('a'),
isActive=$elem.hasClass("".concat(_this.options.linkActiveClass)),
hash=$link.attr('data-tabs-target')||$link[0].hash.slice(1),
linkId=$link[0].id?$link[0].id:"".concat(hash,"-label"),
$tabContent=jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(hash));

$elem.attr({'role':'presentation'});

$link.attr({
'role':'tab',
'aria-controls':hash,
'aria-selected':isActive,
'id':linkId,
'tabindex':isActive?'0':'-1'});


$tabContent.attr({
'role':'tabpanel',
'aria-labelledby':linkId});


// Save up the initial hash to return to it later when going back in history
if(isActive){
_this._initialAnchor="#".concat(hash);
}

if(!isActive){
$tabContent.attr('aria-hidden','true');
}

if(isActive&&_this.options.autoFocus){
_this.onLoadListener=Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window),function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({scrollTop:$elem.offset().top},_this.options.deepLinkSmudgeDelay,function(){
$link.focus();
});
});
}
});

if(this.options.matchHeight){
var $images=this.$tabContent.find('img');

if($images.length){
Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"])($images,this._setHeight.bind(this));
}else {
this._setHeight();
}
}

// Current context-bound function to open tabs on page load or history hashchange
this._checkDeepLink=function(){
var anchor=window.location.hash;

if(!anchor.length){
// If we are still initializing and there is no anchor, then there is nothing to do
if(_this15._isInitializing)return;
// Otherwise, move to the initial anchor
if(_this15._initialAnchor)anchor=_this15._initialAnchor;
}

var anchorNoHash=anchor.indexOf('#')>=0?anchor.slice(1):anchor;
var $anchor=anchorNoHash&&jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(anchorNoHash));
var $link=anchor&&_this15.$element.find("[href$=\"".concat(anchor,"\"],[data-tabs-target=\"").concat(anchorNoHash,"\"]")).first();
// Whether the anchor element that has been found is part of this element
var isOwnAnchor=!!($anchor.length&&$link.length);

if(isOwnAnchor){
// If there is an anchor for the hash, select it
if($anchor&&$anchor.length&&$link&&$link.length){
_this15.selectTab($anchor,true);
}
// Otherwise, collapse everything
else {
_this15._collapse();
}

// Roll up a little to show the titles
if(_this15.options.deepLinkSmudge){
var offset=_this15.$element.offset();
jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({scrollTop:offset.top},_this15.options.deepLinkSmudgeDelay);
}

/**
         * Fires when the plugin has deeplinked at pageload
         * @event Tabs#deeplink
         */
_this15.$element.trigger('deeplink.zf.tabs',[$link,$anchor]);
}
};

//use browser to open a tab, if it exists in this tabset
if(this.options.deepLink){
this._checkDeepLink();
}

this._events();

this._isInitializing=false;
}

/**
   * Adds event handlers for items within the tabs.
   * @private
   */},{key:"_events",value:function _events()
{
this._addKeyHandler();
this._addClickHandler();
this._setHeightMqHandler=null;

if(this.options.matchHeight){
this._setHeightMqHandler=this._setHeight.bind(this);

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery',this._setHeightMqHandler);
}

if(this.options.deepLink){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange',this._checkDeepLink);
}
}

/**
   * Adds click handlers for items within the tabs.
   * @private
   */},{key:"_addClickHandler",value:function _addClickHandler()
{
var _this=this;

this.$element.
off('click.zf.tabs').
on('click.zf.tabs',".".concat(this.options.linkClass),function(e){
e.preventDefault();
_this._handleTabChange(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
});
}

/**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */},{key:"_addKeyHandler",value:function _addKeyHandler()
{
var _this=this;

this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs',function(e){
if(e.which===9)return;


var $element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$elements=$element.parent('ul').children('li'),
$prevElement,
$nextElement;

$elements.each(function(i){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)){
if(_this.options.wrapOnKeys){
$prevElement=i===0?$elements.last():$elements.eq(i-1);
$nextElement=i===$elements.length-1?$elements.first():$elements.eq(i+1);
}else {
$prevElement=$elements.eq(Math.max(0,i-1));
$nextElement=$elements.eq(Math.min(i+1,$elements.length-1));
}
return;
}
});

// handle keyboard event with keyboard util
_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].handleKey(e,'Tabs',{
open:function open(){
$element.find('[role="tab"]').focus();
_this._handleTabChange($element);
},
previous:function previous(){
$prevElement.find('[role="tab"]').focus();
_this._handleTabChange($prevElement);
},
next:function next(){
$nextElement.find('[role="tab"]').focus();
_this._handleTabChange($nextElement);
},
handled:function handled(){
e.preventDefault();
}});

});
}

/**
   * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
   * @param {jQuery} $target - Tab to open.
   * @param {boolean} historyHandled - browser has already handled a history update
   * @fires Tabs#change
   * @function
   */},{key:"_handleTabChange",value:function _handleTabChange(
$target,historyHandled){

// With `activeCollapse`, if the target is the active Tab, collapse it.
if($target.hasClass("".concat(this.options.linkActiveClass))){
if(this.options.activeCollapse){
this._collapse();
}
return;
}

var $oldTab=this.$element.
find(".".concat(this.options.linkClass,".").concat(this.options.linkActiveClass)),
$tabLink=$target.find('[role="tab"]'),
target=$tabLink.attr('data-tabs-target'),
anchor=target&&target.length?"#".concat(target):$tabLink[0].hash,
$targetContent=this.$tabContent.find(anchor);

//close old tab
this._collapseTab($oldTab);

//open new tab
this._openTab($target);

//either replace or update browser history
if(this.options.deepLink&&!historyHandled){
if(this.options.updateHistory){
history.pushState({},'',anchor);
}else {
history.replaceState({},'',anchor);
}
}

/**
     * Fires when the plugin has successfully changed tabs.
     * @event Tabs#change
     */
this.$element.trigger('change.zf.tabs',[$target,$targetContent]);

//fire to children a mutation event
$targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
}

/**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to open.
   * @function
   */},{key:"_openTab",value:function _openTab(
$target){
var $tabLink=$target.find('[role="tab"]'),
hash=$tabLink.attr('data-tabs-target')||$tabLink[0].hash.slice(1),
$targetContent=this.$tabContent.find("#".concat(hash));

$target.addClass("".concat(this.options.linkActiveClass));

$tabLink.attr({
'aria-selected':'true',
'tabindex':'0'});


$targetContent.
addClass("".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');
}

/**
   * Collapses `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to collapse.
   * @function
   */},{key:"_collapseTab",value:function _collapseTab(
$target){
var $target_anchor=$target.
removeClass("".concat(this.options.linkActiveClass)).
find('[role="tab"]').
attr({
'aria-selected':'false',
'tabindex':-1});


jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat($target_anchor.attr('aria-controls'))).
removeClass("".concat(this.options.panelActiveClass)).
attr({'aria-hidden':'true'});
}

/**
   * Collapses the active Tab.
   * @fires Tabs#collapse
   * @function
   */},{key:"_collapse",value:function _collapse()
{
var $activeTab=this.$element.find(".".concat(this.options.linkClass,".").concat(this.options.linkActiveClass));

if($activeTab.length){
this._collapseTab($activeTab);

/**
      * Fires when the plugin has successfully collapsed tabs.
      * @event Tabs#collapse
      */
this.$element.trigger('collapse.zf.tabs',[$activeTab]);
}
}

/**
   * Public method for selecting a content pane to display.
   * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
   * @param {boolean} historyHandled - browser has already handled a history update
   * @function
   */},{key:"selectTab",value:function selectTab(
elem,historyHandled){
var idStr,hashIdStr;

if(typeof elem==='object'){
idStr=elem[0].id;
}else {
idStr=elem;
}

if(idStr.indexOf('#')<0){
hashIdStr="#".concat(idStr);
}else {
hashIdStr=idStr;
idStr=idStr.slice(1);
}

var $target=this.$tabTitles.has("[href$=\"".concat(hashIdStr,"\"],[data-tabs-target=\"").concat(idStr,"\"]")).first();

this._handleTabChange($target,historyHandled);
}},{key:"_setHeight",

/**
   * Sets the height of each panel to the height of the tallest panel.
   * If enabled in options, gets called on media query change.
   * If loading content via external source, can be called directly or with _reflow.
   * If enabled with `data-match-height="true"`, tabs sets to equal height
   * @function
   * @private
   */value:function _setHeight()
{
var max=0,
_this=this;// Lock down the `this` value for the root tabs object

this.$tabContent.
find(".".concat(this.options.panelClass)).
css('height','').
each(function(){

var panel=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
isActive=panel.hasClass("".concat(_this.options.panelActiveClass));// get the options from the parent instead of trying to get them from the child

if(!isActive){
panel.css({'visibility':'hidden','display':'block'});
}

var temp=this.getBoundingClientRect().height;

if(!isActive){
panel.css({
'visibility':'',
'display':''});

}

max=temp>max?temp:max;
}).
css('height',"".concat(max,"px"));
}

/**
   * Destroys an instance of tabs.
   * @fires Tabs#destroyed
   */},{key:"_destroy",value:function _destroy()
{
this.$element.
find(".".concat(this.options.linkClass)).
off('.zf.tabs').hide().end().
find(".".concat(this.options.panelClass)).
hide();

if(this.options.matchHeight){
if(this._setHeightMqHandler!=null){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery',this._setHeightMqHandler);
}
}

if(this.options.deepLink){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange',this._checkDeepLink);
}

if(this.onLoadListener){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
}
}}]);return Tabs;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);


Tabs.defaults={
/**
   * Link the location hash to the active pane.
   * Set the location hash when the active pane changes, and open the corresponding pane when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
deepLink:false,

/**
   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
deepLinkSmudge:false,

/**
   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
deepLinkSmudgeDelay:300,

/**
   * If `deepLink` is enabled, update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
updateHistory:false,

/**
   * Allows the window to scroll to content of active pane on load.
   * Not recommended if more than one tab panel per page.
   * @option
   * @type {boolean}
   * @default false
   */
autoFocus:false,

/**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @type {boolean}
   * @default true
   */
wrapOnKeys:true,

/**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @type {boolean}
   * @default false
   */
matchHeight:false,

/**
   * Allows active tabs to collapse when clicked.
   * @option
   * @type {boolean}
   * @default false
   */
activeCollapse:false,

/**
   * Class applied to `li`'s in tab link list.
   * @option
   * @type {string}
   * @default 'tabs-title'
   */
linkClass:'tabs-title',

/**
   * Class applied to the active `li` in tab link list.
   * @option
   * @type {string}
   * @default 'is-active'
   */
linkActiveClass:'is-active',

/**
   * Class applied to the content containers.
   * @option
   * @type {string}
   * @default 'tabs-panel'
   */
panelClass:'tabs-panel',

/**
   * Class applied to the active content container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
panelActiveClass:'is-active'};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.toggler.js":
/*!****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.toggler.js ***!
  \****************************************************************/
/*! exports provided: Toggler */
/***/function node_modulesFoundationSitesJsFoundationTogglerJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Toggler",function(){return Toggler;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.util.motion */"./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony import */var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.core.plugin */"./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./foundation.util.triggers */"./node_modules/foundation-sites/js/foundation.util.triggers.js");








/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */var

Toggler=/*#__PURE__*/function(_foundation_core_plug12){_inherits(Toggler,_foundation_core_plug12);function Toggler(){_classCallCheck(this,Toggler);return _possibleConstructorReturn(this,_getPrototypeOf(Toggler).apply(this,arguments));}_createClass(Toggler,[{key:"_setup",
/**
   * Creates a new instance of Toggler.
   * @class
   * @name Toggler
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */value:function _setup(
element,options){
this.$element=element;
this.options=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},Toggler.defaults,element.data(),options);
this.className='';
this.className='Toggler';// ie9 back compat

// Triggers init is idempotent, just need to make sure it is initialized
_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

this._init();
this._events();
}

/**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */},{key:"_init",value:function _init()
{
// Collect triggers to set ARIA attributes to
var id=this.$element[0].id,
$triggers=jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open~=\"".concat(id,"\"], [data-close~=\"").concat(id,"\"], [data-toggle~=\"").concat(id,"\"]"));

var input;
// Parse animation classes if they were set
if(this.options.animate){
input=this.options.animate.split(' ');

this.animationIn=input[0];
this.animationOut=input[1]||null;

// - aria-expanded: according to the element visibility.
$triggers.attr('aria-expanded',!this.$element.is(':hidden'));
}
// Otherwise, parse toggle class
else {
input=this.options.toggler;
if(typeof input!=='string'||!input.length){
throw new Error("The 'toogler' option containing the target class is required, got \"".concat(input,"\""));
}
// Allow for a . at the beginning of the string
this.className=input[0]==='.'?input.slice(1):input;

// - aria-expanded: according to the elements class set.
$triggers.attr('aria-expanded',this.$element.hasClass(this.className));
}

// - aria-controls: adding the element id to it if not already in it.
$triggers.each(function(index,trigger){
var $trigger=jquery__WEBPACK_IMPORTED_MODULE_0___default()(trigger);
var controls=$trigger.attr('aria-controls')||'';

var containsId=new RegExp("\\b".concat(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["RegExpEscape"])(id),"\\b")).test(controls);
if(!containsId)$trigger.attr('aria-controls',controls?"".concat(controls," ").concat(id):id);
});
}

/**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */},{key:"_events",value:function _events()
{
this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger',this.toggle.bind(this));
}

/**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */},{key:"toggle",value:function toggle()
{
this[this.options.animate?'_toggleAnimate':'_toggleClass']();
}},{key:"_toggleClass",value:function _toggleClass()

{
this.$element.toggleClass(this.className);

var isOn=this.$element.hasClass(this.className);
if(isOn){
/**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */
this.$element.trigger('on.zf.toggler');
}else
{
/**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
this.$element.trigger('off.zf.toggler');
}

this._updateARIA(isOn);
this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
}},{key:"_toggleAnimate",value:function _toggleAnimate()

{
var _this=this;

if(this.$element.is(':hidden')){
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__["Motion"].animateIn(this.$element,this.animationIn,function(){
_this._updateARIA(true);
this.trigger('on.zf.toggler');
this.find('[data-mutate]').trigger('mutateme.zf.trigger');
});
}else
{
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__["Motion"].animateOut(this.$element,this.animationOut,function(){
_this._updateARIA(false);
this.trigger('off.zf.toggler');
this.find('[data-mutate]').trigger('mutateme.zf.trigger');
});
}
}},{key:"_updateARIA",value:function _updateARIA(

isOn){
var id=this.$element[0].id;
jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(id,"\"], [data-close=\"").concat(id,"\"], [data-toggle=\"").concat(id,"\"]")).
attr({
'aria-expanded':isOn?true:false});

}

/**
   * Destroys the instance of Toggler on the element.
   * @function
   */},{key:"_destroy",value:function _destroy()
{
this.$element.off('.zf.toggler');
}}]);return Toggler;}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__["Plugin"]);


Toggler.defaults={
/**
   * Class of the element to toggle. It can be provided with or without "."
   * @option
   * @type {string}
   */
toggler:undefined,
/**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @type {boolean}
   * @default false
   */
animate:false};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.box.js":
/*!*****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.box.js ***!
  \*****************************************************************/
/*! exports provided: Box */
/***/function node_modulesFoundationSitesJsFoundationUtilBoxJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Box",function(){return Box;});
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");





var Box={
ImNotTouchingYou:ImNotTouchingYou,
OverlapArea:OverlapArea,
GetDimensions:GetDimensions,
GetExplicitOffsets:GetExplicitOffsets};


/**
 * Compares the dimensions of an element to a container and determines collision events with container.
 * @function
 * @param {jQuery} element - jQuery object to test for collisions.
 * @param {jQuery} parent - jQuery object to use as bounding container.
 * @param {Boolean} lrOnly - set to true to check left and right values only.
 * @param {Boolean} tbOnly - set to true to check top and bottom values only.
 * @default if no parent object passed, detects collisions with `window`.
 * @returns {Boolean} - true if collision free, false if a collision in any direction.
 */
function ImNotTouchingYou(element,parent,lrOnly,tbOnly,ignoreBottom){
return OverlapArea(element,parent,lrOnly,tbOnly,ignoreBottom)===0;
}
function OverlapArea(element,parent,lrOnly,tbOnly,ignoreBottom){
var eleDims=GetDimensions(element),
topOver,bottomOver,leftOver,rightOver;
if(parent){
var parDims=GetDimensions(parent);

bottomOver=parDims.height+parDims.offset.top-(eleDims.offset.top+eleDims.height);
topOver=eleDims.offset.top-parDims.offset.top;
leftOver=eleDims.offset.left-parDims.offset.left;
rightOver=parDims.width+parDims.offset.left-(eleDims.offset.left+eleDims.width);
}else
{
bottomOver=eleDims.windowDims.height+eleDims.windowDims.offset.top-(eleDims.offset.top+eleDims.height);
topOver=eleDims.offset.top-eleDims.windowDims.offset.top;
leftOver=eleDims.offset.left-eleDims.windowDims.offset.left;
rightOver=eleDims.windowDims.width-(eleDims.offset.left+eleDims.width);
}

bottomOver=ignoreBottom?0:Math.min(bottomOver,0);
topOver=Math.min(topOver,0);
leftOver=Math.min(leftOver,0);
rightOver=Math.min(rightOver,0);

if(lrOnly){
return leftOver+rightOver;
}
if(tbOnly){
return topOver+bottomOver;
}

// use sum of squares b/c we care about overlap area.
return Math.sqrt(topOver*topOver+bottomOver*bottomOver+leftOver*leftOver+rightOver*rightOver);
}

/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */
function GetDimensions(elem){
elem=elem.length?elem[0]:elem;

if(elem===window||elem===document){
throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
}

var rect=elem.getBoundingClientRect(),
parRect=elem.parentNode.getBoundingClientRect(),
winRect=document.body.getBoundingClientRect(),
winY=window.pageYOffset,
winX=window.pageXOffset;

return {
width:rect.width,
height:rect.height,
offset:{
top:rect.top+winY,
left:rect.left+winX},

parentDims:{
width:parRect.width,
height:parRect.height,
offset:{
top:parRect.top+winY,
left:parRect.left+winX}},


windowDims:{
width:winRect.width,
height:winRect.height,
offset:{
top:winY,
left:winX}}};



}

/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
 * you don't know alignment, but generally from
 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */
function GetExplicitOffsets(element,anchor,position,alignment,vOffset,hOffset,isOverflow){
var $eleDims=GetDimensions(element),
$anchorDims=anchor?GetDimensions(anchor):null;

var topVal,leftVal;

// set position related attribute

switch(position){
case'top':
topVal=$anchorDims.offset.top-($eleDims.height+vOffset);
break;
case'bottom':
topVal=$anchorDims.offset.top+$anchorDims.height+vOffset;
break;
case'left':
leftVal=$anchorDims.offset.left-($eleDims.width+hOffset);
break;
case'right':
leftVal=$anchorDims.offset.left+$anchorDims.width+hOffset;
break;}



// set alignment related attribute
switch(position){
case'top':
case'bottom':
switch(alignment){
case'left':
leftVal=$anchorDims.offset.left+hOffset;
break;
case'right':
leftVal=$anchorDims.offset.left-$eleDims.width+$anchorDims.width-hOffset;
break;
case'center':
leftVal=isOverflow?hOffset:$anchorDims.offset.left+$anchorDims.width/2-$eleDims.width/2+hOffset;
break;}

break;
case'right':
case'left':
switch(alignment){
case'bottom':
topVal=$anchorDims.offset.top-vOffset+$anchorDims.height-$eleDims.height;
break;
case'top':
topVal=$anchorDims.offset.top+vOffset;
break;
case'center':
topVal=$anchorDims.offset.top+vOffset+$anchorDims.height/2-$eleDims.height/2;
break;}

break;}

return {top:topVal,left:leftVal};
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.imageLoader.js":
/*!*************************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.imageLoader.js ***!
  \*************************************************************************/
/*! exports provided: onImagesLoaded */
/***/function node_modulesFoundationSitesJsFoundationUtilImageLoaderJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"onImagesLoaded",function(){return onImagesLoaded;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);




/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */
function onImagesLoaded(images,callback){
var unloaded=images.length;

if(unloaded===0){
callback();
}

images.each(function(){
// Check if image is loaded
if(this.complete&&typeof this.naturalWidth!=='undefined'){
singleImageLoaded();
}else
{
// If the above check failed, simulate loading on detached element.
var image=new Image();
// Still count image as loaded if it finalizes with an error.
var events="load.zf.images error.zf.images";
jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).one(events,function me(event){
// Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off(events,me);
singleImageLoaded();
});
image.src=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('src');
}
});

function singleImageLoaded(){
unloaded--;
if(unloaded===0){
callback();
}
}
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.keyboard.js":
/*!**********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.keyboard.js ***!
  \**********************************************************************/
/*! exports provided: Keyboard */
/***/function node_modulesFoundationSitesJsFoundationUtilKeyboardJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Keyboard",function(){return Keyboard;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/






var keyCodes={
9:'TAB',
13:'ENTER',
27:'ESCAPE',
32:'SPACE',
35:'END',
36:'HOME',
37:'ARROW_LEFT',
38:'ARROW_UP',
39:'ARROW_RIGHT',
40:'ARROW_DOWN'};


var commands={};

// Functions pulled out to be referenceable from internals
function findFocusable($element){
if(!$element){return false;}
return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function(){
if(!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':visible')||jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('tabindex')<0){return false;}//only have visible elements and those that have a tabindex greater or equal 0
return true;
});
}

function parseKey(event){
var key=keyCodes[event.which||event.keyCode]||String.fromCharCode(event.which).toUpperCase();

// Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
key=key.replace(/\W+/,'');

if(event.shiftKey)key="SHIFT_".concat(key);
if(event.ctrlKey)key="CTRL_".concat(key);
if(event.altKey)key="ALT_".concat(key);

// Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
key=key.replace(/_$/,'');

return key;
}

var Keyboard={
keys:getKeyCodes(keyCodes),

/**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
parseKey:parseKey,

/**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
handleKey:function handleKey(event,component,functions){
var commandList=commands[component],
keyCode=this.parseKey(event),
cmds,
command,
fn;

if(!commandList)return console.warn('Component not defined!');

// Ignore the event if it was already handled
if(event.zfIsKeyHandled===true)return;

// This component does not differentiate between ltr and rtl
if(typeof commandList.ltr==='undefined'){
cmds=commandList;// use plain list
}else {// merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
if(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["rtl"])())cmds=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},commandList.ltr,commandList.rtl);else

cmds=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({},commandList.rtl,commandList.ltr);
}
command=cmds[keyCode];

fn=functions[command];
// Execute the handler if found
if(fn&&typeof fn==='function'){
var returnValue=fn.apply();

// Mark the event as "handled" to prevent future handlings
event.zfIsKeyHandled=true;

// Execute function when event was handled
if(functions.handled||typeof functions.handled==='function'){
functions.handled(returnValue);
}
}else {
// Execute function when event was not handled
if(functions.unhandled||typeof functions.unhandled==='function'){
functions.unhandled();
}
}
},

/**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */

findFocusable:findFocusable,

/**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */

register:function register(componentName,cmds){
commands[componentName]=cmds;
},


// TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
//
/**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
trapFocus:function trapFocus($element){
var $focusable=findFocusable($element),
$firstFocusable=$focusable.eq(0),
$lastFocusable=$focusable.eq(-1);

$element.on('keydown.zf.trapfocus',function(event){
if(event.target===$lastFocusable[0]&&parseKey(event)==='TAB'){
event.preventDefault();
$firstFocusable.focus();
}else
if(event.target===$firstFocusable[0]&&parseKey(event)==='SHIFT_TAB'){
event.preventDefault();
$lastFocusable.focus();
}
});
},
/**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
releaseFocus:function releaseFocus($element){
$element.off('keydown.zf.trapfocus');
}};


/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */
function getKeyCodes(kcs){
var k={};
for(var kc in kcs){k[kcs[kc]]=kcs[kc];}
return k;
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.mediaQuery.js":
/*!************************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.mediaQuery.js ***!
  \************************************************************************/
/*! exports provided: MediaQuery */
/***/function node_modulesFoundationSitesJsFoundationUtilMediaQueryJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MediaQuery",function(){return MediaQuery;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);



// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright © 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license
/* eslint-disable */
window.matchMedia||(window.matchMedia=function(){

// For browsers that support matchMedium api such as IE 9 and webkit
var styleMedia=window.styleMedia||window.media;

// For those that don't support matchMedium
if(!styleMedia){
var style=document.createElement('style'),
script=document.getElementsByTagName('script')[0],
info=null;

style.type='text/css';
style.id='matchmediajs-test';

if(!script){
document.head.appendChild(style);
}else {
script.parentNode.insertBefore(style,script);
}

// 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
info='getComputedStyle'in window&&window.getComputedStyle(style,null)||style.currentStyle;

styleMedia={
matchMedium:function matchMedium(media){
var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }';

// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
if(style.styleSheet){
style.styleSheet.cssText=text;
}else {
style.textContent=text;
}

// Test if media query is true or false
return info.width==='1px';
}};

}

return function(media){
return {
matches:styleMedia.matchMedium(media||'all'),
media:media||'all'};

};
}());
/* eslint-enable */

var MediaQuery={
queries:[],

current:'',

/**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
_init:function _init(){

// make sure the initialization is only done once when calling _init() several times
if(this.isInitialized===true){
return;
}else {
this.isInitialized=true;
}

var self=this;
var $meta=jquery__WEBPACK_IMPORTED_MODULE_0___default()('meta.foundation-mq');
if(!$meta.length){
jquery__WEBPACK_IMPORTED_MODULE_0___default()('<meta class="foundation-mq">').appendTo(document.head);
}

var extractedStyles=jquery__WEBPACK_IMPORTED_MODULE_0___default()('.foundation-mq').css('font-family');
var namedQueries;

namedQueries=parseStyleToObject(extractedStyles);

self.queries=[];// reset

for(var key in namedQueries){
if(namedQueries.hasOwnProperty(key)){
self.queries.push({
name:key,
value:"only screen and (min-width: ".concat(namedQueries[key],")")});

}
}

this.current=this._getCurrentSize();

this._watcher();
},

/**
   * Reinitializes the media query helper.
   * Useful if your CSS breakpoint configuration has just been loaded or has changed since the initialization.
   * @function
   * @private
   */
_reInit:function _reInit(){
this.isInitialized=false;
this._init();
},

/**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
atLeast:function atLeast(size){
var query=this.get(size);

if(query){
return window.matchMedia(query).matches;
}

return false;
},

/**
   * Checks if the screen is within the given breakpoint.
   * If smaller than the breakpoint of larger than its upper limit it returns false.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` otherwise.
   */
only:function only(size){
return size===this._getCurrentSize();
},

/**
   * Checks if the screen is within a breakpoint or smaller.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's larger.
   */
upTo:function upTo(size){
var nextSize=this.next(size);

// If the next breakpoint does not match, the screen is smaller than
// the upper limit of this breakpoint.
if(nextSize){
return !this.atLeast(nextSize);
}

// If there is no next breakpoint, the "size" breakpoint does not have
// an upper limit and the screen will always be within it or smaller.
return true;
},

/**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
is:function is(size){
var parts=size.trim().split(' ').filter(function(p){return !!p.length;});var _parts=_slicedToArray(
parts,2),bpSize=_parts[0],_parts$=_parts[1],bpModifier=_parts$===void 0?'':_parts$;

// Only the breakpont
if(bpModifier==='only'){
return this.only(bpSize);
}
// At least the breakpoint (included)
if(!bpModifier||bpModifier==='up'){
return this.atLeast(bpSize);
}
// Up to the breakpoint (included)
if(bpModifier==='down'){
return this.upTo(bpSize);
}

throw new Error("\n      Invalid breakpoint passed to MediaQuery.is().\n      Expected a breakpoint name formatted like \"<size> <modifier>\", got \"".concat(

size,"\".\n    "));

},

/**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
get:function get(size){
for(var i in this.queries){
if(this.queries.hasOwnProperty(i)){
var query=this.queries[i];
if(size===query.name)return query.value;
}
}

return null;
},

/**
   * Get the breakpoint following the given breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint.
   * @returns {String|null} - The name of the following breakpoint, or `null` if the passed breakpoint was the last one.
   */
next:function next(size){var _this16=this;
var queryIndex=this.queries.findIndex(function(q){return _this16._getQueryName(q)===size;});
if(queryIndex===-1){
throw new Error("\n        Unknown breakpoint \"".concat(
size,"\" passed to MediaQuery.next().\n        Ensure it is present in your Sass \"$breakpoints\" setting.\n      "));


}

var nextQuery=this.queries[queryIndex+1];
return nextQuery?nextQuery.name:null;
},

/**
   * Returns the name of the breakpoint related to the given value.
   * @function
   * @private
   * @param {String|Object} value - Breakpoint name or query object.
   * @returns {String} Name of the breakpoint.
   */
_getQueryName:function _getQueryName(value){
if(typeof value==='string')
return value;
if(typeof value==='object')
return value.name;
throw new TypeError("\n      Invalid value passed to MediaQuery._getQueryName().\n      Expected a breakpoint name (String) or a breakpoint query (Object), got \"".concat(

value,"\" (").concat(typeof value,")\n    "));

},

/**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
_getCurrentSize:function _getCurrentSize(){
var matched;

for(var i=0;i<this.queries.length;i++){
var query=this.queries[i];

if(window.matchMedia(query.value).matches){
matched=query;
}
}

return matched&&this._getQueryName(matched);
},

/**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
_watcher:function _watcher(){var _this17=this;
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery',function(){
var newSize=_this17._getCurrentSize(),currentSize=_this17.current;

if(newSize!==currentSize){
// Change the current media query
_this17.current=newSize;

// Broadcast the media query change on the window
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('changed.zf.mediaquery',[newSize,currentSize]);
}
});
}};




// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str){
var styleObject={};

if(typeof str!=='string'){
return styleObject;
}

str=str.trim().slice(1,-1);// browsers re-quote string style values

if(!str){
return styleObject;
}

styleObject=str.split('&').reduce(function(ret,param){
var parts=param.replace(/\+/g,' ').split('=');
var key=parts[0];
var val=parts[1];
key=decodeURIComponent(key);

// missing `=` should be `null`:
// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
val=typeof val==='undefined'?null:decodeURIComponent(val);

if(!ret.hasOwnProperty(key)){
ret[key]=val;
}else if(Array.isArray(ret[key])){
ret[key].push(val);
}else {
ret[key]=[ret[key],val];
}
return ret;
},{});

return styleObject;
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.motion.js":
/*!********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.motion.js ***!
  \********************************************************************/
/*! exports provided: Move, Motion */
/***/function node_modulesFoundationSitesJsFoundationUtilMotionJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Move",function(){return Move;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Motion",function(){return Motion;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");





/**
 * Motion module.
 * @module foundation.motion
 */

var initClasses=['mui-enter','mui-leave'];
var activeClasses=['mui-enter-active','mui-leave-active'];

var Motion={
animateIn:function animateIn(element,animation,cb){
animate(true,element,animation,cb);
},

animateOut:function animateOut(element,animation,cb){
animate(false,element,animation,cb);
}};


function Move(duration,elem,fn){
var anim,prog,start=null;
// console.log('called');

if(duration===0){
fn.apply(elem);
elem.trigger('finished.zf.animate',[elem]).triggerHandler('finished.zf.animate',[elem]);
return;
}

function move(ts){
if(!start)start=ts;
// console.log(start, ts);
prog=ts-start;
fn.apply(elem);

if(prog<duration){anim=window.requestAnimationFrame(move,elem);}else
{
window.cancelAnimationFrame(anim);
elem.trigger('finished.zf.animate',[elem]).triggerHandler('finished.zf.animate',[elem]);
}
}
anim=window.requestAnimationFrame(move);
}

/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */
function animate(isIn,element,animation,cb){
element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).eq(0);

if(!element.length)return;

var initClass=isIn?initClasses[0]:initClasses[1];
var activeClass=isIn?activeClasses[0]:activeClasses[1];

// Set up the animation
reset();

element.
addClass(animation).
css('transition','none');

requestAnimationFrame(function(){
element.addClass(initClass);
if(isIn)element.show();
});

// Start the animation
requestAnimationFrame(function(){
element.
css('transition','').
addClass(activeClass);
});

// Clean up the animation when it finishes
element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["transitionend"])(element),finish);

// Hides the element (for out animations), resets the element, and runs a callback
function finish(){
if(!isIn)element.hide();
reset();
if(cb)cb.apply(element);
}

// Resets transitions and removes motion-specific classes
function reset(){
element[0].style.transitionDuration=0;
element.removeClass("".concat(initClass," ").concat(activeClass," ").concat(animation));
}
}





/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.nest.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.nest.js ***!
  \******************************************************************/
/*! exports provided: Nest */
/***/function node_modulesFoundationSitesJsFoundationUtilNestJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Nest",function(){return Nest;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);




var Nest={
Feather:function Feather(menu){var type=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'zf';
menu.attr('role','menubar');

var items=menu.find('li').attr({'role':'menuitem'}),
subMenuClass="is-".concat(type,"-submenu"),
subItemClass="".concat(subMenuClass,"-item"),
hasSubClass="is-".concat(type,"-submenu-parent"),
applyAria=type!=='accordion';// Accordions handle their own ARIA attriutes.

items.each(function(){
var $item=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
$sub=$item.children('ul');

if($sub.length){
$item.addClass(hasSubClass);
if(applyAria){
$item.attr({
'aria-haspopup':true,
'aria-label':$item.children('a:first').text()});

// Note:  Drilldowns behave differently in how they hide, and so need
// additional attributes.  We should look if this possibly over-generalized
// utility (Nest) is appropriate when we rework menus in 6.4
if(type==='drilldown'){
$item.attr({'aria-expanded':false});
}
}
$sub.
addClass("submenu ".concat(subMenuClass)).
attr({
'data-submenu':'',
'role':'menubar'});

if(type==='drilldown'){
$sub.attr({'aria-hidden':true});
}
}

if($item.parent('[data-submenu]').length){
$item.addClass("is-submenu-item ".concat(subItemClass));
}
});

return;
},

Burn:function Burn(menu,type){
var//items = menu.find('li'),
subMenuClass="is-".concat(type,"-submenu"),
subItemClass="".concat(subMenuClass,"-item"),
hasSubClass="is-".concat(type,"-submenu-parent");

menu.
find('>li, > li > ul, .menu, .menu > li, [data-submenu] > li').
removeClass("".concat(subMenuClass," ").concat(subItemClass," ").concat(hasSubClass," is-submenu-item submenu is-active")).
removeAttr('data-submenu').css('display','');

}};





/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.timer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.timer.js ***!
  \*******************************************************************/
/*! exports provided: Timer */
/***/function node_modulesFoundationSitesJsFoundationUtilTimerJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Timer",function(){return Timer;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");




function Timer(elem,options,cb){
var _this=this,
duration=options.duration,//options is an object for easily adding features later.
nameSpace=Object.keys(elem.data())[0]||'timer',
remain=-1,
start,
timer;

this.isPaused=false;

this.restart=function(){
remain=-1;
clearTimeout(timer);
this.start();
};

this.start=function(){
this.isPaused=false;
// if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
clearTimeout(timer);
remain=remain<=0?duration:remain;
elem.data('paused',false);
start=Date.now();
timer=setTimeout(function(){
if(options.infinite){
_this.restart();//rerun the timer.
}
if(cb&&typeof cb==='function'){cb();}
},remain);
elem.trigger("timerstart.zf.".concat(nameSpace));
};

this.pause=function(){
this.isPaused=true;
//if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
clearTimeout(timer);
elem.data('paused',true);
var end=Date.now();
remain=remain-(end-start);
elem.trigger("timerpaused.zf.".concat(nameSpace));
};
}




/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.touch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.touch.js ***!
  \*******************************************************************/
/*! exports provided: Touch */
/***/function node_modulesFoundationSitesJsFoundationUtilTouchJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Touch",function(){return Touch;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
//**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************



var Touch={};

var startPosX,
startPosY,
startTime,
elapsedTime,
startEvent,
isMoving=false,
didMoved=false;

function onTouchEnd(e){
this.removeEventListener('touchmove',onTouchMove);
this.removeEventListener('touchend',onTouchEnd);

// If the touch did not move, consider it as a "tap"
if(!didMoved){
var tapEvent=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event('tap',startEvent||e);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(tapEvent);
}

startEvent=null;
isMoving=false;
didMoved=false;
}

function onTouchMove(e){
if(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.preventDefault){e.preventDefault();}

if(isMoving){
var x=e.touches[0].pageX;
var y=e.touches[0].pageY;
var dx=startPosX-x;
var dir;
didMoved=true;
elapsedTime=new Date().getTime()-startTime;
if(Math.abs(dx)>=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.moveThreshold&&elapsedTime<=jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.timeThreshold){
dir=dx>0?'left':'right';
}
// else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
//   dir = dy > 0 ? 'down' : 'up';
// }
if(dir){
e.preventDefault();
onTouchEnd.apply(this,arguments);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).
trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event('swipe',Object.assign({},e)),dir).
trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event("swipe".concat(dir),Object.assign({},e)));
}
}

}

function onTouchStart(e){

if(e.touches.length==1){
startPosX=e.touches[0].pageX;
startPosY=e.touches[0].pageY;
startEvent=e;
isMoving=true;
didMoved=false;
startTime=new Date().getTime();
this.addEventListener('touchmove',onTouchMove,false);
this.addEventListener('touchend',onTouchEnd,false);
}
}

function init(){
this.addEventListener&&this.addEventListener('touchstart',onTouchStart,false);
}
var

SpotSwipe=/*#__PURE__*/function(){
function SpotSwipe($){_classCallCheck(this,SpotSwipe);
this.version='1.0.0';
this.enabled='ontouchstart'in document.documentElement;
this.preventDefault=false;
this.moveThreshold=75;
this.timeThreshold=200;
this.$=$;
this._init();
}_createClass(SpotSwipe,[{key:"_init",value:function _init()

{
var $=this.$;
$.event.special.swipe={setup:init};
$.event.special.tap={setup:init};

$.each(['left','up','down','right'],function(){
$.event.special["swipe".concat(this)]={setup:function setup(){
$(this).on('swipe',$.noop);
}};
});
}}]);return SpotSwipe;}();


/****************************************************
 * As far as I can tell, both setupSpotSwipe and    *
 * setupTouchHandler should be idempotent,          *
 * because they directly replace functions &        *
 * values, and do not add event handlers directly.  *
 ****************************************************/

Touch.setupSpotSwipe=function($){
$.spotSwipe=new SpotSwipe($);
};

/****************************************************
 * Method for adding pseudo drag events to elements *
 ***************************************************/
Touch.setupTouchHandler=function($){
$.fn.addTouch=function(){
this.each(function(i,el){
$(el).bind('touchstart touchmove touchend touchcancel',function(event){
//we pass the original event object because the jQuery event
//object is normalized to w3c specs and does not provide the TouchList
handleTouch(event);
});
});

var handleTouch=function handleTouch(event){
var touches=event.changedTouches,
first=touches[0],
eventTypes={
touchstart:'mousedown',
touchmove:'mousemove',
touchend:'mouseup'},

type=eventTypes[event.type],
simulatedEvent;


if('MouseEvent'in window&&typeof window.MouseEvent==='function'){
simulatedEvent=new window.MouseEvent(type,{
'bubbles':true,
'cancelable':true,
'screenX':first.screenX,
'screenY':first.screenY,
'clientX':first.clientX,
'clientY':first.clientY});

}else {
simulatedEvent=document.createEvent('MouseEvent');
simulatedEvent.initMouseEvent(type,true,true,window,1,first.screenX,first.screenY,first.clientX,first.clientY,false,false,false,false,0/*left*/,null);
}
first.target.dispatchEvent(simulatedEvent);
};
};
};

Touch.init=function($){

if(typeof $.spotSwipe==='undefined'){
Touch.setupSpotSwipe($);
Touch.setupTouchHandler($);
}
};




/***/},

/***/"./node_modules/foundation-sites/js/foundation.util.triggers.js":
/*!**********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.triggers.js ***!
  \**********************************************************************/
/*! exports provided: Triggers */
/***/function node_modulesFoundationSitesJsFoundationUtilTriggersJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Triggers",function(){return Triggers;});
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! jquery */"jquery");
/* harmony import */var jquery__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./foundation.core.utils */"./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./foundation.util.motion */"./node_modules/foundation-sites/js/foundation.util.motion.js");






var MutationObserver=function(){
var prefixes=['WebKit','Moz','O','Ms',''];
for(var i=0;i<prefixes.length;i++){
if("".concat(prefixes[i],"MutationObserver")in window){
return window["".concat(prefixes[i],"MutationObserver")];
}
}
return false;
}();

var triggers=function triggers(el,type){
el.data(type).split(' ').forEach(function(id){
jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(id))[type==='close'?'trigger':'triggerHandler']("".concat(type,".zf.trigger"),[el]);
});
};

var Triggers={
Listeners:{
Basic:{},
Global:{}},

Initializers:{}};


Triggers.Listeners.Basic={
openListener:function openListener(){
triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),'open');
},
closeListener:function closeListener(){
var id=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('close');
if(id){
triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),'close');
}else
{
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('close.zf.trigger');
}
},
toggleListener:function toggleListener(){
var id=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');
if(id){
triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),'toggle');
}else {
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('toggle.zf.trigger');
}
},
closeableListener:function closeableListener(e){
var animation=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('closable');

// Only close the first closable element. See https://git.io/zf-7833
e.stopPropagation();

if(animation!==''){
_foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateOut(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),animation,function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('closed.zf');
});
}else {
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).fadeOut().trigger('closed.zf');
}
},
toggleFocusListener:function toggleFocusListener(){
var id=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle-focus');
jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(id)).triggerHandler('toggle.zf.trigger',[jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)]);
}};


// Elements with [data-open] will reveal a plugin that supports it when clicked.
Triggers.Initializers.addOpenListener=function($elem){
$elem.off('click.zf.trigger',Triggers.Listeners.Basic.openListener);
$elem.on('click.zf.trigger','[data-open]',Triggers.Listeners.Basic.openListener);
};

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
Triggers.Initializers.addCloseListener=function($elem){
$elem.off('click.zf.trigger',Triggers.Listeners.Basic.closeListener);
$elem.on('click.zf.trigger','[data-close]',Triggers.Listeners.Basic.closeListener);
};

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
Triggers.Initializers.addToggleListener=function($elem){
$elem.off('click.zf.trigger',Triggers.Listeners.Basic.toggleListener);
$elem.on('click.zf.trigger','[data-toggle]',Triggers.Listeners.Basic.toggleListener);
};

// Elements with [data-closable] will respond to close.zf.trigger events.
Triggers.Initializers.addCloseableListener=function($elem){
$elem.off('close.zf.trigger',Triggers.Listeners.Basic.closeableListener);
$elem.on('close.zf.trigger','[data-closeable], [data-closable]',Triggers.Listeners.Basic.closeableListener);
};

// Elements with [data-toggle-focus] will respond to coming in and out of focus
Triggers.Initializers.addToggleFocusListener=function($elem){
$elem.off('focus.zf.trigger blur.zf.trigger',Triggers.Listeners.Basic.toggleFocusListener);
$elem.on('focus.zf.trigger blur.zf.trigger','[data-toggle-focus]',Triggers.Listeners.Basic.toggleFocusListener);
};



// More Global/complex listeners and triggers
Triggers.Listeners.Global={
resizeListener:function resizeListener($nodes){
if(!MutationObserver){//fallback for IE 9
$nodes.each(function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('resizeme.zf.trigger');
});
}
//trigger all listening elements and signal a resize event
$nodes.attr('data-events',"resize");
},
scrollListener:function scrollListener($nodes){
if(!MutationObserver){//fallback for IE 9
$nodes.each(function(){
jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('scrollme.zf.trigger');
});
}
//trigger all listening elements and signal a scroll event
$nodes.attr('data-events',"scroll");
},
closeMeListener:function closeMeListener(e,pluginId){
var plugin=e.namespace.split('.')[0];
var plugins=jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-".concat(plugin,"]")).not("[data-yeti-box=\"".concat(pluginId,"\"]"));

plugins.each(function(){
var _this=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
_this.triggerHandler('close.zf.trigger',[_this]);
});
}};


// Global, parses whole document.
Triggers.Initializers.addClosemeListener=function(pluginName){
var yetiBoxes=jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-yeti-box]'),
plugNames=['dropdown','tooltip','reveal'];

if(pluginName){
if(typeof pluginName==='string'){
plugNames.push(pluginName);
}else if(typeof pluginName==='object'&&typeof pluginName[0]==='string'){
plugNames=plugNames.concat(pluginName);
}else {
console.error('Plugin names must be strings');
}
}
if(yetiBoxes.length){
var listeners=plugNames.map(function(name){
return "closeme.zf.".concat(name);
}).join(' ');

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(listeners).on(listeners,Triggers.Listeners.Global.closeMeListener);
}
};

function debounceGlobalListener(debounce,trigger,listener){
var timer,args=Array.prototype.slice.call(arguments,3);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(trigger).on(trigger,function(e){
if(timer){clearTimeout(timer);}
timer=setTimeout(function(){
listener.apply(null,args);
},debounce||10);//default time to emit scroll event
});
}

Triggers.Initializers.addResizeListener=function(debounce){
var $nodes=jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-resize]');
if($nodes.length){
debounceGlobalListener(debounce,'resize.zf.trigger',Triggers.Listeners.Global.resizeListener,$nodes);
}
};

Triggers.Initializers.addScrollListener=function(debounce){
var $nodes=jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scroll]');
if($nodes.length){
debounceGlobalListener(debounce,'scroll.zf.trigger',Triggers.Listeners.Global.scrollListener,$nodes);
}
};

Triggers.Initializers.addMutationEventsListener=function($elem){
if(!MutationObserver){return false;}
var $nodes=$elem.find('[data-resize], [data-scroll], [data-mutate]');

//element callback
var listeningElementsMutation=function listeningElementsMutation(mutationRecordsList){
var $target=jquery__WEBPACK_IMPORTED_MODULE_0___default()(mutationRecordsList[0].target);

//trigger the event handler for the element depending on type
switch(mutationRecordsList[0].type){
case"attributes":
if($target.attr("data-events")==="scroll"&&mutationRecordsList[0].attributeName==="data-events"){
$target.triggerHandler('scrollme.zf.trigger',[$target,window.pageYOffset]);
}
if($target.attr("data-events")==="resize"&&mutationRecordsList[0].attributeName==="data-events"){
$target.triggerHandler('resizeme.zf.trigger',[$target]);
}
if(mutationRecordsList[0].attributeName==="style"){
$target.closest("[data-mutate]").attr("data-events","mutate");
$target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger',[$target.closest("[data-mutate]")]);
}
break;

case"childList":
$target.closest("[data-mutate]").attr("data-events","mutate");
$target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger',[$target.closest("[data-mutate]")]);
break;

default:
return false;
//nothing
}
};

if($nodes.length){
//for each element that needs to listen for resizing, scrolling, or mutation add a single observer
for(var i=0;i<=$nodes.length-1;i++){
var elementObserver=new MutationObserver(listeningElementsMutation);
elementObserver.observe($nodes[i],{attributes:true,childList:true,characterData:false,subtree:true,attributeFilter:["data-events","style"]});
}
}
};

Triggers.Initializers.addSimpleListeners=function(){
var $document=jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);

Triggers.Initializers.addOpenListener($document);
Triggers.Initializers.addCloseListener($document);
Triggers.Initializers.addToggleListener($document);
Triggers.Initializers.addCloseableListener($document);
Triggers.Initializers.addToggleFocusListener($document);

};

Triggers.Initializers.addGlobalListeners=function(){
var $document=jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
Triggers.Initializers.addMutationEventsListener($document);
Triggers.Initializers.addResizeListener();
Triggers.Initializers.addScrollListener();
Triggers.Initializers.addClosemeListener();
};


Triggers.init=function($,Foundation){
Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])($(window),function(){
if($.triggersInitialized!==true){
Triggers.Initializers.addSimpleListeners();
Triggers.Initializers.addGlobalListeners();
$.triggersInitialized=true;
}
});

if(Foundation){
Foundation.Triggers=Triggers;
// Legacy included to be backwards compatible for now.
Foundation.IHearYou=Triggers.Initializers.addGlobalListeners;
}
};




/***/},

/***/"./node_modules/imagesloaded/imagesloaded.js":
/*!***************************************************!*\
  !*** ./node_modules/imagesloaded/imagesloaded.js ***!
  \***************************************************/
/*! no static exports found */
/***/function node_modulesImagesloadedImagesloadedJs(module,exports,__webpack_require__){

var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(window,factory){// universal module definition

/*global define: false, module: false, require: false */

{
// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[
__webpack_require__(/*! ev-emitter/ev-emitter */"./node_modules/ev-emitter/ev-emitter.js")],
__WEBPACK_AMD_DEFINE_RESULT__=function(EvEmitter){
return factory(window,EvEmitter);
}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),
__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));
}

})(typeof window!=='undefined'?window:this,

// --------------------------  factory -------------------------- //

function factory(window,EvEmitter){

var $=window.jQuery;
var console=window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend(a,b){
for(var prop in b){
a[prop]=b[prop];
}
return a;
}

var arraySlice=Array.prototype.slice;

// turn element or nodeList into an array
function makeArray(obj){
if(Array.isArray(obj)){
// use object if already an array
return obj;
}

var isArrayLike=typeof obj=='object'&&typeof obj.length=='number';
if(isArrayLike){
// convert nodeList to array
return arraySlice.call(obj);
}

// array of single index
return [obj];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded(elem,options,onAlways){
// coerce ImagesLoaded() without new, to be new ImagesLoaded()
if(!(this instanceof ImagesLoaded)){
return new ImagesLoaded(elem,options,onAlways);
}
// use elem as selector string
var queryElem=elem;
if(typeof elem=='string'){
queryElem=document.querySelectorAll(elem);
}
// bail if bad element
if(!queryElem){
console.error('Bad element for imagesLoaded '+(queryElem||elem));
return;
}

this.elements=makeArray(queryElem);
this.options=extend({},this.options);
// shift arguments if no options set
if(typeof options=='function'){
onAlways=options;
}else {
extend(this.options,options);
}

if(onAlways){
this.on('always',onAlways);
}

this.getImages();

if($){
// add jQuery Deferred object
this.jqDeferred=new $.Deferred();
}

// HACK check async to allow time to bind listeners
setTimeout(this.check.bind(this));
}

ImagesLoaded.prototype=Object.create(EvEmitter.prototype);

ImagesLoaded.prototype.options={};

ImagesLoaded.prototype.getImages=function(){
this.images=[];

// filter & find items if we have an item selector
this.elements.forEach(this.addElementImages,this);
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages=function(elem){
// filter siblings
if(elem.nodeName=='IMG'){
this.addImage(elem);
}
// get background image on element
if(this.options.background===true){
this.addElementBackgroundImages(elem);
}

// find children
// no non-element nodes, #143
var nodeType=elem.nodeType;
if(!nodeType||!elementNodeTypes[nodeType]){
return;
}
var childImgs=elem.querySelectorAll('img');
// concat childElems to filterFound array
for(var i=0;i<childImgs.length;i++){
var img=childImgs[i];
this.addImage(img);
}

// get child background images
if(typeof this.options.background=='string'){
var children=elem.querySelectorAll(this.options.background);
for(i=0;i<children.length;i++){
var child=children[i];
this.addElementBackgroundImages(child);
}
}
};

var elementNodeTypes={
1:true,
9:true,
11:true};


ImagesLoaded.prototype.addElementBackgroundImages=function(elem){
var style=getComputedStyle(elem);
if(!style){
// Firefox returns null if in a hidden iframe https://bugzil.la/548397
return;
}
// get url inside url("...")
var reURL=/url\((['"])?(.*?)\1\)/gi;
var matches=reURL.exec(style.backgroundImage);
while(matches!==null){
var url=matches&&matches[2];
if(url){
this.addBackground(url,elem);
}
matches=reURL.exec(style.backgroundImage);
}
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage=function(img){
var loadingImage=new LoadingImage(img);
this.images.push(loadingImage);
};

ImagesLoaded.prototype.addBackground=function(url,elem){
var background=new Background(url,elem);
this.images.push(background);
};

ImagesLoaded.prototype.check=function(){
var _this=this;
this.progressedCount=0;
this.hasAnyBroken=false;
// complete if no images
if(!this.images.length){
this.complete();
return;
}

function onProgress(image,elem,message){
// HACK - Chrome triggers event before object properties have changed. #83
setTimeout(function(){
_this.progress(image,elem,message);
});
}

this.images.forEach(function(loadingImage){
loadingImage.once('progress',onProgress);
loadingImage.check();
});
};

ImagesLoaded.prototype.progress=function(image,elem,message){
this.progressedCount++;
this.hasAnyBroken=this.hasAnyBroken||!image.isLoaded;
// progress event
this.emitEvent('progress',[this,image,elem]);
if(this.jqDeferred&&this.jqDeferred.notify){
this.jqDeferred.notify(this,image);
}
// check if completed
if(this.progressedCount==this.images.length){
this.complete();
}

if(this.options.debug&&console){
console.log('progress: '+message,image,elem);
}
};

ImagesLoaded.prototype.complete=function(){
var eventName=this.hasAnyBroken?'fail':'done';
this.isComplete=true;
this.emitEvent(eventName,[this]);
this.emitEvent('always',[this]);
if(this.jqDeferred){
var jqMethod=this.hasAnyBroken?'reject':'resolve';
this.jqDeferred[jqMethod](this);
}
};

// --------------------------  -------------------------- //

function LoadingImage(img){
this.img=img;
}

LoadingImage.prototype=Object.create(EvEmitter.prototype);

LoadingImage.prototype.check=function(){
// If complete is true and browser supports natural sizes,
// try to check for image status manually.
var isComplete=this.getIsImageComplete();
if(isComplete){
// report based on naturalWidth
this.confirm(this.img.naturalWidth!==0,'naturalWidth');
return;
}

// If none of the checks above matched, simulate loading on detached element.
this.proxyImage=new Image();
this.proxyImage.addEventListener('load',this);
this.proxyImage.addEventListener('error',this);
// bind to image as well for Firefox. #191
this.img.addEventListener('load',this);
this.img.addEventListener('error',this);
this.proxyImage.src=this.img.src;
};

LoadingImage.prototype.getIsImageComplete=function(){
// check for non-zero, non-undefined naturalWidth
// fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
return this.img.complete&&this.img.naturalWidth;
};

LoadingImage.prototype.confirm=function(isLoaded,message){
this.isLoaded=isLoaded;
this.emitEvent('progress',[this,this.img,message]);
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent=function(event){
var method='on'+event.type;
if(this[method]){
this[method](event);
}
};

LoadingImage.prototype.onload=function(){
this.confirm(true,'onload');
this.unbindEvents();
};

LoadingImage.prototype.onerror=function(){
this.confirm(false,'onerror');
this.unbindEvents();
};

LoadingImage.prototype.unbindEvents=function(){
this.proxyImage.removeEventListener('load',this);
this.proxyImage.removeEventListener('error',this);
this.img.removeEventListener('load',this);
this.img.removeEventListener('error',this);
};

// -------------------------- Background -------------------------- //

function Background(url,element){
this.url=url;
this.element=element;
this.img=new Image();
}

// inherit LoadingImage prototype
Background.prototype=Object.create(LoadingImage.prototype);

Background.prototype.check=function(){
this.img.addEventListener('load',this);
this.img.addEventListener('error',this);
this.img.src=this.url;
// check if image is already complete
var isComplete=this.getIsImageComplete();
if(isComplete){
this.confirm(this.img.naturalWidth!==0,'naturalWidth');
this.unbindEvents();
}
};

Background.prototype.unbindEvents=function(){
this.img.removeEventListener('load',this);
this.img.removeEventListener('error',this);
};

Background.prototype.confirm=function(isLoaded,message){
this.isLoaded=isLoaded;
this.emitEvent('progress',[this,this.element,message]);
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin=function(jQuery){
jQuery=jQuery||window.jQuery;
if(!jQuery){
return;
}
// set local variable
$=jQuery;
// $().imagesLoaded()
$.fn.imagesLoaded=function(options,callback){
var instance=new ImagesLoaded(this,options,callback);
return instance.jqDeferred.promise($(this));
};
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/},

/***/"./node_modules/is-dom-node-list/dist/is-dom-node-list.es.js":
/*!*******************************************************************!*\
  !*** ./node_modules/is-dom-node-list/dist/is-dom-node-list.es.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function node_modulesIsDomNodeListDistIsDomNodeListEsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var is_dom_node__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! is-dom-node */"./node_modules/is-dom-node/dist/is-dom-node.es.js");
/*! @license is-dom-node-list v1.2.1

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/


function isDomNodeList(x){
var prototypeToString=Object.prototype.toString.call(x);
var regex=/^\[object (HTMLCollection|NodeList|Object)\]$/;

return typeof window.NodeList==='object'?
x instanceof window.NodeList:
x!==null&&
typeof x==='object'&&
typeof x.length==='number'&&
regex.test(prototypeToString)&&(
x.length===0||Object(is_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"])(x[0]));
}

/* harmony default export */__webpack_exports__["default"]=isDomNodeList;


/***/},

/***/"./node_modules/is-dom-node/dist/is-dom-node.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/is-dom-node/dist/is-dom-node.es.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/function node_modulesIsDomNodeDistIsDomNodeEsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/*! @license is-dom-node v1.0.4

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function isDomNode(x){
return typeof window.Node==='object'?
x instanceof window.Node:
x!==null&&
typeof x==='object'&&
typeof x.nodeType==='number'&&
typeof x.nodeName==='string';
}

/* harmony default export */__webpack_exports__["default"]=isDomNode;


/***/},

/***/"./node_modules/jquery-match-height/dist/jquery.matchHeight.js":
/*!*********************************************************************!*\
  !*** ./node_modules/jquery-match-height/dist/jquery.matchHeight.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/function node_modulesJqueryMatchHeightDistJqueryMatchHeightJs(module,exports,__webpack_require__){

var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/**
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(factory){// eslint-disable-line no-extra-semi
{
// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(/*! jquery */"jquery")],__WEBPACK_AMD_DEFINE_FACTORY__=factory,
__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?
__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,
__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));
}
})(function($){
/*
    *  internal
    */

var _previousResizeWidth=-1,
_updateTimeout=-1;

/*
    *  _parse
    *  value parse utility function
    */

var _parse=function _parse(value){
// parse value and convert NaN to 0
return parseFloat(value)||0;
};

/*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

var _rows=function _rows(elements){
var tolerance=1,
$elements=$(elements),
lastTop=null,
rows=[];

// group elements by their top position
$elements.each(function(){
var $that=$(this),
top=$that.offset().top-_parse($that.css('margin-top')),
lastRow=rows.length>0?rows[rows.length-1]:null;

if(lastRow===null){
// first item on the row, so just push it
rows.push($that);
}else {
// if the row top is the same, add to the row group
if(Math.floor(Math.abs(lastTop-top))<=tolerance){
rows[rows.length-1]=lastRow.add($that);
}else {
// otherwise start a new row group
rows.push($that);
}
}

// keep track of the last row top
lastTop=top;
});

return rows;
};

/*
    *  _parseOptions
    *  handle plugin options
    */

var _parseOptions=function _parseOptions(options){
var opts={
byRow:true,
property:'height',
target:null,
remove:false};


if(typeof options==='object'){
return $.extend(opts,options);
}

if(typeof options==='boolean'){
opts.byRow=options;
}else if(options==='remove'){
opts.remove=true;
}

return opts;
};

/*
    *  matchHeight
    *  plugin definition
    */

var matchHeight=$.fn.matchHeight=function(options){
var opts=_parseOptions(options);

// handle remove
if(opts.remove){
var that=this;

// remove fixed height from all selected elements
this.css(opts.property,'');

// remove selected elements from all groups
$.each(matchHeight._groups,function(key,group){
group.elements=group.elements.not(that);
});

// TODO: cleanup empty groups

return this;
}

if(this.length<=1&&!opts.target){
return this;
}

// keep track of this group so we can re-apply later on load and resize events
matchHeight._groups.push({
elements:this,
options:opts});


// match each element's height to the tallest element in the selection
matchHeight._apply(this,opts);

return this;
};

/*
    *  plugin global options
    */

matchHeight.version='0.7.2';
matchHeight._groups=[];
matchHeight._throttle=80;
matchHeight._maintainScroll=false;
matchHeight._beforeUpdate=null;
matchHeight._afterUpdate=null;
matchHeight._rows=_rows;
matchHeight._parse=_parse;
matchHeight._parseOptions=_parseOptions;

/*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

matchHeight._apply=function(elements,options){
var opts=_parseOptions(options),
$elements=$(elements),
rows=[$elements];

// take note of scroll position
var scrollTop=$(window).scrollTop(),
htmlHeight=$('html').outerHeight(true);

// get hidden parents
var $hiddenParents=$elements.parents().filter(':hidden');

// cache the original inline style
$hiddenParents.each(function(){
var $that=$(this);
$that.data('style-cache',$that.attr('style'));
});

// temporarily must force hidden parents visible
$hiddenParents.css('display','block');

// get rows if using byRow, otherwise assume one row
if(opts.byRow&&!opts.target){

// must first force an arbitrary equal height so floating elements break evenly
$elements.each(function(){
var $that=$(this),
display=$that.css('display');

// temporarily force a usable display value
if(display!=='inline-block'&&display!=='flex'&&display!=='inline-flex'){
display='block';
}

// cache the original inline style
$that.data('style-cache',$that.attr('style'));

$that.css({
'display':display,
'padding-top':'0',
'padding-bottom':'0',
'margin-top':'0',
'margin-bottom':'0',
'border-top-width':'0',
'border-bottom-width':'0',
'height':'100px',
'overflow':'hidden'});

});

// get the array of rows (based on element top position)
rows=_rows($elements);

// revert original inline styles
$elements.each(function(){
var $that=$(this);
$that.attr('style',$that.data('style-cache')||'');
});
}

$.each(rows,function(key,row){
var $row=$(row),
targetHeight=0;

if(!opts.target){
// skip apply to rows with only one item
if(opts.byRow&&$row.length<=1){
$row.css(opts.property,'');
return;
}

// iterate the row and find the max height
$row.each(function(){
var $that=$(this),
style=$that.attr('style'),
display=$that.css('display');

// temporarily force a usable display value
if(display!=='inline-block'&&display!=='flex'&&display!=='inline-flex'){
display='block';
}

// ensure we get the correct actual height (and not a previously set height value)
var css={'display':display};
css[opts.property]='';
$that.css(css);

// find the max height (including padding, but not margin)
if($that.outerHeight(false)>targetHeight){
targetHeight=$that.outerHeight(false);
}

// revert styles
if(style){
$that.attr('style',style);
}else {
$that.css('display','');
}
});
}else {
// if target set, use the height of the target element
targetHeight=opts.target.outerHeight(false);
}

// iterate the row and apply the height to all elements
$row.each(function(){
var $that=$(this),
verticalPadding=0;

// don't apply to a target
if(opts.target&&$that.is(opts.target)){
return;
}

// handle padding and border correctly (required when not using border-box)
if($that.css('box-sizing')!=='border-box'){
verticalPadding+=_parse($that.css('border-top-width'))+_parse($that.css('border-bottom-width'));
verticalPadding+=_parse($that.css('padding-top'))+_parse($that.css('padding-bottom'));
}

// set the height (accounting for padding and border)
$that.css(opts.property,targetHeight-verticalPadding+'px');
});
});

// revert hidden parents
$hiddenParents.each(function(){
var $that=$(this);
$that.attr('style',$that.data('style-cache')||null);
});

// restore scroll position if enabled
if(matchHeight._maintainScroll){
$(window).scrollTop(scrollTop/htmlHeight*$('html').outerHeight(true));
}

return this;
};

/*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

matchHeight._applyDataApi=function(){
var groups={};

// generate groups by their groupId set by elements using data-match-height
$('[data-match-height], [data-mh]').each(function(){
var $this=$(this),
groupId=$this.attr('data-mh')||$this.attr('data-match-height');

if(groupId in groups){
groups[groupId]=groups[groupId].add($this);
}else {
groups[groupId]=$this;
}
});

// apply matchHeight to each group
$.each(groups,function(){
this.matchHeight(true);
});
};

/*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

var _update=function _update(event){
if(matchHeight._beforeUpdate){
matchHeight._beforeUpdate(event,matchHeight._groups);
}

$.each(matchHeight._groups,function(){
matchHeight._apply(this.elements,this.options);
});

if(matchHeight._afterUpdate){
matchHeight._afterUpdate(event,matchHeight._groups);
}
};

matchHeight._update=function(throttle,event){
// prevent update if fired from a resize event
// where the viewport width hasn't actually changed
// fixes an event looping bug in IE8
if(event&&event.type==='resize'){
var windowWidth=$(window).width();
if(windowWidth===_previousResizeWidth){
return;
}
_previousResizeWidth=windowWidth;
}

// throttle updates
if(!throttle){
_update(event);
}else if(_updateTimeout===-1){
_updateTimeout=setTimeout(function(){
_update(event);
_updateTimeout=-1;
},matchHeight._throttle);
}
};

/*
    *  bind events
    */

// apply on DOM ready event
$(matchHeight._applyDataApi);

// use on or bind where supported
var on=$.fn.on?'on':'bind';

// update heights on load and resize events
$(window)[on]('load',function(event){
matchHeight._update(false,event);
});

// throttled update heights on resize events
$(window)[on]('resize orientationchange',function(event){
matchHeight._update(true,event);
});

});


/***/},

/***/"./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/*! no static exports found */
/***/function node_modulesJsCookieSrcJsCookieJs(module,exports,__webpack_require__){

var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(factory){
var registeredInModuleLoader;
{
!(__WEBPACK_AMD_DEFINE_FACTORY__=factory,
__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?
__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):
__WEBPACK_AMD_DEFINE_FACTORY__,
__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));
registeredInModuleLoader=true;
}
{
module.exports=factory();
registeredInModuleLoader=true;
}
if(!registeredInModuleLoader){
var OldCookies=window.Cookies;
var api=window.Cookies=factory();
api.noConflict=function(){
window.Cookies=OldCookies;
return api;
};
}
})(function(){
function extend(){
var i=0;
var result={};
for(;i<arguments.length;i++){
var attributes=arguments[i];
for(var key in attributes){
result[key]=attributes[key];
}
}
return result;
}

function decode(s){
return s.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent);
}

function init(converter){
function api(){}

function set(key,value,attributes){
if(typeof document==='undefined'){
return;
}

attributes=extend({
path:'/'},
api.defaults,attributes);

if(typeof attributes.expires==='number'){
attributes.expires=new Date(new Date()*1+attributes.expires*864e+5);
}

// We're using "expires" because "max-age" is not supported by IE
attributes.expires=attributes.expires?attributes.expires.toUTCString():'';

try{
var result=JSON.stringify(value);
if(/^[\{\[]/.test(result)){
value=result;
}
}catch(e){}

value=converter.write?
converter.write(value,key):
encodeURIComponent(String(value)).
replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);

key=encodeURIComponent(String(key)).
replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).
replace(/[\(\)]/g,escape);

var stringifiedAttributes='';
for(var attributeName in attributes){
if(!attributes[attributeName]){
continue;
}
stringifiedAttributes+='; '+attributeName;
if(attributes[attributeName]===true){
continue;
}

// Considers RFC 6265 section 5.2:
// ...
// 3.  If the remaining unparsed-attributes contains a %x3B (";")
//     character:
// Consume the characters of the unparsed-attributes up to,
// not including, the first %x3B (";") character.
// ...
stringifiedAttributes+='='+attributes[attributeName].split(';')[0];
}

return document.cookie=key+'='+value+stringifiedAttributes;
}

function get(key,json){
if(typeof document==='undefined'){
return;
}

var jar={};
// To prevent the for loop in the first place assign an empty array
// in case there are no cookies at all.
var cookies=document.cookie?document.cookie.split('; '):[];
var i=0;

for(;i<cookies.length;i++){
var parts=cookies[i].split('=');
var cookie=parts.slice(1).join('=');

if(!json&&cookie.charAt(0)==='"'){
cookie=cookie.slice(1,-1);
}

try{
var name=decode(parts[0]);
cookie=(converter.read||converter)(cookie,name)||
decode(cookie);

if(json){
try{
cookie=JSON.parse(cookie);
}catch(e){}
}

jar[name]=cookie;

if(key===name){
break;
}
}catch(e){}
}

return key?jar[key]:jar;
}

api.set=set;
api.get=function(key){
return get(key,false/* read as raw */);
};
api.getJSON=function(key){
return get(key,true/* read as json */);
};
api.remove=function(key,attributes){
set(key,'',extend(attributes,{
expires:-1}));

};

api.defaults={};

api.withConverter=init;

return api;
}

return init(function(){});
});


/***/},

/***/"./node_modules/miniraf/dist/miniraf.es.js":
/*!*************************************************!*\
  !*** ./node_modules/miniraf/dist/miniraf.es.js ***!
  \*************************************************/
/*! exports provided: default */
/***/function node_modulesMinirafDistMinirafEsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/*! @license miniraf v1.0.0

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
var polyfill=function(){
var clock=Date.now();

return function(callback){
var currentTime=Date.now();
if(currentTime-clock>16){
clock=currentTime;
callback(currentTime);
}else {
setTimeout(function(){return polyfill(callback);},0);
}
};
}();

var index=window.requestAnimationFrame||
window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||
polyfill;

/* harmony default export */__webpack_exports__["default"]=index;


/***/},

/***/"./node_modules/rematrix/dist/rematrix.es.js":
/*!***************************************************!*\
  !*** ./node_modules/rematrix/dist/rematrix.es.js ***!
  \***************************************************/
/*! exports provided: format, identity, inverse, multiply, parse, rotate, rotateX, rotateY, rotateZ, scale, scaleX, scaleY, scaleZ, skew, skewX, skewY, toString, translate, translateX, translateY, translateZ */
/***/function node_modulesRematrixDistRematrixEsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"format",function(){return format;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"identity",function(){return identity;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"inverse",function(){return inverse;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"multiply",function(){return multiply;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"parse",function(){return parse;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"rotate",function(){return rotate;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"rotateX",function(){return rotateX;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"rotateY",function(){return rotateY;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"rotateZ",function(){return rotateZ;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"scale",function(){return scale;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"scaleX",function(){return scaleX;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"scaleY",function(){return scaleY;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"scaleZ",function(){return scaleZ;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"skew",function(){return skew;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"skewX",function(){return skewX;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"skewY",function(){return skewY;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"toString",function(){return toString;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"translate",function(){return translate;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"translateX",function(){return translateX;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"translateY",function(){return translateY;});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"translateZ",function(){return translateZ;});
/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source){
if(source.constructor!==Array){
throw new TypeError('Expected array.');
}
if(source.length===16){
return source;
}
if(source.length===6){
var matrix=identity();
matrix[0]=source[0];
matrix[1]=source[1];
matrix[4]=source[2];
matrix[5]=source[3];
matrix[12]=source[4];
matrix[13]=source[5];
return matrix;
}
throw new RangeError('Expected array with either 6 or 16 values.');
}

/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */
function identity(){
var matrix=[];
for(var i=0;i<16;i++){
i%5==0?matrix.push(1):matrix.push(0);
}
return matrix;
}

/**
 * Returns a matrix describing the inverse transformation of the source
 * matrix. The product of any matrix multiplied by its inverse will be the
 * identity matrix.
 *
 * > **Tip:** Similar to how `5 * (1/5) === 1`, where `1/5` is the inverse.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function inverse(source){
var m=format(source);

var s0=m[0]*m[5]-m[4]*m[1];
var s1=m[0]*m[6]-m[4]*m[2];
var s2=m[0]*m[7]-m[4]*m[3];
var s3=m[1]*m[6]-m[5]*m[2];
var s4=m[1]*m[7]-m[5]*m[3];
var s5=m[2]*m[7]-m[6]*m[3];

var c5=m[10]*m[15]-m[14]*m[11];
var c4=m[9]*m[15]-m[13]*m[11];
var c3=m[9]*m[14]-m[13]*m[10];
var c2=m[8]*m[15]-m[12]*m[11];
var c1=m[8]*m[14]-m[12]*m[10];
var c0=m[8]*m[13]-m[12]*m[9];

var determinant=1/(s0*c5-s1*c4+s2*c3+s3*c2-s4*c1+s5*c0);

if(isNaN(determinant)||determinant===Infinity){
throw new Error('Inverse determinant attempted to divide by zero.');
}

return [
(m[5]*c5-m[6]*c4+m[7]*c3)*determinant,
(-m[1]*c5+m[2]*c4-m[3]*c3)*determinant,
(m[13]*s5-m[14]*s4+m[15]*s3)*determinant,
(-m[9]*s5+m[10]*s4-m[11]*s3)*determinant,

(-m[4]*c5+m[6]*c2-m[7]*c1)*determinant,
(m[0]*c5-m[2]*c2+m[3]*c1)*determinant,
(-m[12]*s5+m[14]*s2-m[15]*s1)*determinant,
(m[8]*s5-m[10]*s2+m[11]*s1)*determinant,

(m[4]*c4-m[5]*c2+m[7]*c0)*determinant,
(-m[0]*c4+m[1]*c2-m[3]*c0)*determinant,
(m[12]*s4-m[13]*s2+m[15]*s0)*determinant,
(-m[8]*s4+m[9]*s2-m[11]*s0)*determinant,

(-m[4]*c3+m[5]*c1-m[6]*c0)*determinant,
(m[0]*c3-m[1]*c1+m[2]*c0)*determinant,
(-m[12]*s3+m[13]*s1-m[14]*s0)*determinant,
(m[8]*s3-m[9]*s1+m[10]*s0)*determinant];

}

/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */
function multiply(m,x){
var fm=format(m);
var fx=format(x);
var product=[];

for(var i=0;i<4;i++){
var row=[fm[i],fm[i+4],fm[i+8],fm[i+12]];
for(var j=0;j<4;j++){
var k=j*4;
var col=[fx[k],fx[k+1],fx[k+2],fx[k+3]];
var result=
row[0]*col[0]+row[1]*col[1]+row[2]*col[2]+row[3]*col[3];

product[i+k]=result;
}
}

return product;
}

/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * > **Tip:** This method is used to convert a CSS matrix (retrieved as a
 * `string` from computed styles) to its equivalent array format.
 *
 * @param  {string} source - `matrix` or `matrix3d` CSS Transform value.
 * @return {array}
 */
function parse(source){
if(typeof source==='string'){
var match=source.match(/matrix(3d)?\(([^)]+)\)/);
if(match){
var raw=match[2].split(', ').map(parseFloat);
return format(raw);
}
}
return identity();
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * > **Tip:** This is just an alias for `Rematrix.rotateZ` for parity with CSS
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotate(angle){
return rotateZ(angle);
}

/**
 * Returns a 4x4 matrix describing X-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateX(angle){
var theta=Math.PI/180*angle;
var matrix=identity();

matrix[5]=matrix[10]=Math.cos(theta);
matrix[6]=matrix[9]=Math.sin(theta);
matrix[9]*=-1;

return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateY(angle){
var theta=Math.PI/180*angle;
var matrix=identity();

matrix[0]=matrix[10]=Math.cos(theta);
matrix[2]=matrix[8]=Math.sin(theta);
matrix[2]*=-1;

return matrix;
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateZ(angle){
var theta=Math.PI/180*angle;
var matrix=identity();

matrix[0]=matrix[5]=Math.cos(theta);
matrix[1]=matrix[4]=Math.sin(theta);
matrix[4]*=-1;

return matrix;
}

/**
 * Returns a 4x4 matrix describing 2D scaling. The first argument
 * is used for both X and Y-axis scaling, unless an optional
 * second argument is provided to explicitly define Y-axis scaling.
 *
 * @param  {number} scalar    - Decimal multiplier.
 * @param  {number} [scalarY] - Decimal multiplier.
 * @return {array}
 */
function scale(scalar,scalarY){
var matrix=identity();

matrix[0]=scalar;
matrix[5]=typeof scalarY==='number'?scalarY:scalar;

return matrix;
}

/**
 * Returns a 4x4 matrix describing X-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleX(scalar){
var matrix=identity();
matrix[0]=scalar;
return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleY(scalar){
var matrix=identity();
matrix[5]=scalar;
return matrix;
}

/**
 * Returns a 4x4 matrix describing Z-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleZ(scalar){
var matrix=identity();
matrix[10]=scalar;
return matrix;
}

/**
 * Returns a 4x4 matrix describing shear. The first argument
 * defines X-axis shearing, and an optional second argument
 * defines Y-axis shearing.
 *
 * @param  {number} angleX   - Measured in degrees.
 * @param  {number} [angleY] - Measured in degrees.
 * @return {array}
 */
function skew(angleX,angleY){
var thetaX=Math.PI/180*angleX;
var matrix=identity();

matrix[4]=Math.tan(thetaX);

if(angleY){
var thetaY=Math.PI/180*angleY;
matrix[1]=Math.tan(thetaY);
}

return matrix;
}

/**
 * Returns a 4x4 matrix describing X-axis shear.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function skewX(angle){
var theta=Math.PI/180*angle;
var matrix=identity();

matrix[4]=Math.tan(theta);

return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis shear.
 *
 * @param  {number} angle - Measured in degrees
 * @return {array}
 */
function skewY(angle){
var theta=Math.PI/180*angle;
var matrix=identity();

matrix[1]=Math.tan(theta);

return matrix;
}

/**
 * Returns a CSS Transform property value equivalent to the source matrix.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {string}
 */
function toString(source){
return "matrix3d("+format(source).join(', ')+")";
}

/**
 * Returns a 4x4 matrix describing 2D translation. The first
 * argument defines X-axis translation, and an optional second
 * argument defines Y-axis translation.
 *
 * @param  {number} distanceX   - Measured in pixels.
 * @param  {number} [distanceY] - Measured in pixels.
 * @return {array}
 */
function translate(distanceX,distanceY){
var matrix=identity();
matrix[12]=distanceX;

if(distanceY){
matrix[13]=distanceY;
}

return matrix;
}

/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateX(distance){
var matrix=identity();
matrix[12]=distance;
return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateY(distance){
var matrix=identity();
matrix[13]=distance;
return matrix;
}

/**
 * Returns a 4x4 matrix describing Z-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateZ(distance){
var matrix=identity();
matrix[14]=distance;
return matrix;
}




/***/},

/***/"./node_modules/scrollreveal/dist/scrollreveal.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/scrollreveal/dist/scrollreveal.es.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/function node_modulesScrollrevealDistScrollrevealEsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var tealight__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! tealight */"./node_modules/tealight/dist/tealight.es.js");
/* harmony import */var rematrix__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! rematrix */"./node_modules/rematrix/dist/rematrix.es.js");
/* harmony import */var miniraf__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! miniraf */"./node_modules/miniraf/dist/miniraf.es.js");
/*! @license ScrollReveal v4.0.6

	Copyright 2020 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/




var defaults={
delay:0,
distance:'0',
duration:600,
easing:'cubic-bezier(0.5, 0, 0, 1)',
interval:0,
opacity:0,
origin:'bottom',
rotate:{
x:0,
y:0,
z:0},

scale:1,
cleanup:false,
container:document.documentElement,
desktop:true,
mobile:true,
reset:false,
useDelay:'always',
viewFactor:0.0,
viewOffset:{
top:0,
right:0,
bottom:0,
left:0},

afterReset:function afterReset(){},
afterReveal:function afterReveal(){},
beforeReset:function beforeReset(){},
beforeReveal:function beforeReveal(){}};


function failure(){
document.documentElement.classList.remove('sr');

return {
clean:function clean(){},
destroy:function destroy(){},
reveal:function reveal(){},
sync:function sync(){},
get noop(){
return true;
}};

}

function success(){
document.documentElement.classList.add('sr');

if(document.body){
document.body.style.height='100%';
}else {
document.addEventListener('DOMContentLoaded',function(){
document.body.style.height='100%';
});
}
}

var mount={success:success,failure:failure};

function isObject(x){
return(
x!==null&&
x instanceof Object&&(
x.constructor===Object||
Object.prototype.toString.call(x)==='[object Object]'));

}

function each(collection,callback){
if(isObject(collection)){
var keys=Object.keys(collection);
return keys.forEach(function(key){return callback(collection[key],key,collection);});
}
if(collection instanceof Array){
return collection.forEach(function(item,i){return callback(item,i,collection);});
}
throw new TypeError('Expected either an array or object literal.');
}

function logger(message){
var details=[],len=arguments.length-1;
while(len-->0){details[len]=arguments[len+1];}

if(this.constructor.debug&&console){
var report="%cScrollReveal: "+message;
details.forEach(function(detail){return report+="\n — "+detail;});
console.log(report,'color: #ea654b;');// eslint-disable-line no-console
}
}

function rinse(){
var this$1=this;

var struct=function struct(){return {
active:[],
stale:[]};
};

var elementIds=struct();
var sequenceIds=struct();
var containerIds=struct();

/**
	 * Take stock of active element IDs.
	 */
try{
each(Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-sr-id]'),function(node){
var id=parseInt(node.getAttribute('data-sr-id'));
elementIds.active.push(id);
});
}catch(e){
throw e;
}
/**
	 * Destroy stale elements.
	 */
each(this.store.elements,function(element){
if(elementIds.active.indexOf(element.id)===-1){
elementIds.stale.push(element.id);
}
});

each(elementIds.stale,function(staleId){return delete this$1.store.elements[staleId];});

/**
	 * Take stock of active container and sequence IDs.
	 */
each(this.store.elements,function(element){
if(containerIds.active.indexOf(element.containerId)===-1){
containerIds.active.push(element.containerId);
}
if(element.hasOwnProperty('sequence')){
if(sequenceIds.active.indexOf(element.sequence.id)===-1){
sequenceIds.active.push(element.sequence.id);
}
}
});

/**
	 * Destroy stale containers.
	 */
each(this.store.containers,function(container){
if(containerIds.active.indexOf(container.id)===-1){
containerIds.stale.push(container.id);
}
});

each(containerIds.stale,function(staleId){
var stale=this$1.store.containers[staleId].node;
stale.removeEventListener('scroll',this$1.delegate);
stale.removeEventListener('resize',this$1.delegate);
delete this$1.store.containers[staleId];
});

/**
	 * Destroy stale sequences.
	 */
each(this.store.sequences,function(sequence){
if(sequenceIds.active.indexOf(sequence.id)===-1){
sequenceIds.stale.push(sequence.id);
}
});

each(sequenceIds.stale,function(staleId){return delete this$1.store.sequences[staleId];});
}

function clean(target){
var this$1=this;

var dirty;
try{
each(Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(target),function(node){
var id=node.getAttribute('data-sr-id');
if(id!==null){
dirty=true;
var element=this$1.store.elements[id];
if(element.callbackTimer){
window.clearTimeout(element.callbackTimer.clock);
}
node.setAttribute('style',element.styles.inline.generated);
node.removeAttribute('data-sr-id');
delete this$1.store.elements[id];
}
});
}catch(e){
return logger.call(this,'Clean failed.',e.message);
}

if(dirty){
try{
rinse.call(this);
}catch(e){
return logger.call(this,'Clean failed.',e.message);
}
}
}

function destroy(){
var this$1=this;

/**
	 * Remove all generated styles and element ids
	 */
each(this.store.elements,function(element){
element.node.setAttribute('style',element.styles.inline.generated);
element.node.removeAttribute('data-sr-id');
});

/**
	 * Remove all event listeners.
	 */
each(this.store.containers,function(container){
var target=
container.node===document.documentElement?window:container.node;
target.removeEventListener('scroll',this$1.delegate);
target.removeEventListener('resize',this$1.delegate);
});

/**
	 * Clear all data from the store
	 */
this.store={
containers:{},
elements:{},
history:[],
sequences:{}};

}

var getPrefixedCssProp=function(){
var properties={};
var style=document.documentElement.style;

function getPrefixedCssProperty(name,source){
if(source===void 0)source=style;

if(name&&typeof name==='string'){
if(properties[name]){
return properties[name];
}
if(typeof source[name]==='string'){
return properties[name]=name;
}
if(typeof source["-webkit-"+name]==='string'){
return properties[name]="-webkit-"+name;
}
throw new RangeError("Unable to find \""+name+"\" style property.");
}
throw new TypeError('Expected a string.');
}

getPrefixedCssProperty.clearCache=function(){return properties={};};

return getPrefixedCssProperty;
}();

function style(element){
var computed=window.getComputedStyle(element.node);
var position=computed.position;
var config=element.config;

/**
	 * Generate inline styles
	 */
var inline={};
var inlineStyle=element.node.getAttribute('style')||'';
var inlineMatch=inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi)||[];

inline.computed=inlineMatch?inlineMatch.map(function(m){return m.trim();}).join('; ')+';':'';

inline.generated=inlineMatch.some(function(m){return m.match(/visibility\s?:\s?visible/i);})?
inline.computed:
inlineMatch.concat(['visibility: visible']).map(function(m){return m.trim();}).join('; ')+';';

/**
	 * Generate opacity styles
	 */
var computedOpacity=parseFloat(computed.opacity);
var configOpacity=!isNaN(parseFloat(config.opacity))?
parseFloat(config.opacity):
parseFloat(computed.opacity);

var opacity={
computed:computedOpacity!==configOpacity?"opacity: "+computedOpacity+";":'',
generated:computedOpacity!==configOpacity?"opacity: "+configOpacity+";":''};


/**
	 * Generate transformation styles
	 */
var transformations=[];

if(parseFloat(config.distance)){
var axis=config.origin==='top'||config.origin==='bottom'?'Y':'X';

/**
		 * Let’s make sure our our pixel distances are negative for top and left.
		 * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
		 */
var distance=config.distance;
if(config.origin==='top'||config.origin==='left'){
distance=/^-/.test(distance)?distance.substr(1):"-"+distance;
}

var ref=distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
var value=ref[0];
var unit=ref[1];

switch(unit){
case'em':
distance=parseInt(computed.fontSize)*value;
break;
case'px':
distance=value;
break;
case'%':
/**
				 * Here we use `getBoundingClientRect` instead of
				 * the existing data attached to `element.geometry`
				 * because only the former includes any transformations
				 * current applied to the element.
				 *
				 * If that behavior ends up being unintuitive, this
				 * logic could instead utilize `element.geometry.height`
				 * and `element.geoemetry.width` for the distance calculation
				 */
distance=
axis==='Y'?
element.node.getBoundingClientRect().height*value/100:
element.node.getBoundingClientRect().width*value/100;
break;
default:
throw new RangeError('Unrecognized or missing distance unit.');}


if(axis==='Y'){
transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["translateY"])(distance));
}else {
transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["translateX"])(distance));
}
}

if(config.rotate.x){transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["rotateX"])(config.rotate.x));}
if(config.rotate.y){transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["rotateY"])(config.rotate.y));}
if(config.rotate.z){transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["rotateZ"])(config.rotate.z));}
if(config.scale!==1){
if(config.scale===0){
/**
			 * The CSS Transforms matrix interpolation specification
			 * basically disallows transitions of non-invertible
			 * matrixes, which means browsers won't transition
			 * elements with zero scale.
			 *
			 * That’s inconvenient for the API and developer
			 * experience, so we simply nudge their value
			 * slightly above zero; this allows browsers
			 * to transition our element as expected.
			 *
			 * `0.0002` was the smallest number
			 * that performed across browsers.
			 */
transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["scale"])(0.0002));
}else {
transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["scale"])(config.scale));
}
}

var transform={};
if(transformations.length){
transform.property=getPrefixedCssProp('transform');
/**
		 * The default computed transform value should be one of:
		 * undefined || 'none' || 'matrix()' || 'matrix3d()'
		 */
transform.computed={
raw:computed[transform.property],
matrix:Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["parse"])(computed[transform.property])};


transformations.unshift(transform.computed.matrix);
var product=transformations.reduce(rematrix__WEBPACK_IMPORTED_MODULE_1__["multiply"]);

transform.generated={
initial:transform.property+": matrix3d("+product.join(', ')+");",
final:transform.property+": matrix3d("+transform.computed.matrix.join(', ')+");"};

}else {
transform.generated={
initial:'',
final:''};

}

/**
	 * Generate transition styles
	 */
var transition={};
if(opacity.generated||transform.generated.initial){
transition.property=getPrefixedCssProp('transition');
transition.computed=computed[transition.property];
transition.fragments=[];

var delay=config.delay;
var duration=config.duration;
var easing=config.easing;

if(opacity.generated){
transition.fragments.push({
delayed:"opacity "+duration/1000+"s "+easing+" "+delay/1000+"s",
instant:"opacity "+duration/1000+"s "+easing+" 0s"});

}

if(transform.generated.initial){
transition.fragments.push({
delayed:transform.property+" "+duration/1000+"s "+easing+" "+delay/1000+"s",
instant:transform.property+" "+duration/1000+"s "+easing+" 0s"});

}

/**
		 * The default computed transition property should be undefined, or one of:
		 * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
		 */
var hasCustomTransition=
transition.computed&&!transition.computed.match(/all 0s|none 0s/);

if(hasCustomTransition){
transition.fragments.unshift({
delayed:transition.computed,
instant:transition.computed});

}

var composed=transition.fragments.reduce(
function(composition,fragment,i){
composition.delayed+=i===0?fragment.delayed:", "+fragment.delayed;
composition.instant+=i===0?fragment.instant:", "+fragment.instant;
return composition;
},
{
delayed:'',
instant:''});



transition.generated={
delayed:transition.property+": "+composed.delayed+";",
instant:transition.property+": "+composed.instant+";"};

}else {
transition.generated={
delayed:'',
instant:''};

}

return {
inline:inline,
opacity:opacity,
position:position,
transform:transform,
transition:transition};

}

function animate(element,force){
if(force===void 0)force={};

var pristine=force.pristine||this.pristine;
var delayed=
element.config.useDelay==='always'||
element.config.useDelay==='onload'&&pristine||
element.config.useDelay==='once'&&!element.seen;

var shouldReveal=element.visible&&!element.revealed;
var shouldReset=!element.visible&&element.revealed&&element.config.reset;

if(force.reveal||shouldReveal){
return triggerReveal.call(this,element,delayed);
}

if(force.reset||shouldReset){
return triggerReset.call(this,element);
}
}

function triggerReveal(element,delayed){
var styles=[
element.styles.inline.generated,
element.styles.opacity.computed,
element.styles.transform.generated.final];

if(delayed){
styles.push(element.styles.transition.generated.delayed);
}else {
styles.push(element.styles.transition.generated.instant);
}
element.revealed=element.seen=true;
element.node.setAttribute('style',styles.filter(function(s){return s!=='';}).join(' '));
registerCallbacks.call(this,element,delayed);
}

function triggerReset(element){
var styles=[
element.styles.inline.generated,
element.styles.opacity.generated,
element.styles.transform.generated.initial,
element.styles.transition.generated.instant];

element.revealed=false;
element.node.setAttribute('style',styles.filter(function(s){return s!=='';}).join(' '));
registerCallbacks.call(this,element);
}

function registerCallbacks(element,isDelayed){
var this$1=this;

var duration=isDelayed?
element.config.duration+element.config.delay:
element.config.duration;

var beforeCallback=element.revealed?
element.config.beforeReveal:
element.config.beforeReset;

var afterCallback=element.revealed?
element.config.afterReveal:
element.config.afterReset;

var elapsed=0;
if(element.callbackTimer){
elapsed=Date.now()-element.callbackTimer.start;
window.clearTimeout(element.callbackTimer.clock);
}

beforeCallback(element.node);

element.callbackTimer={
start:Date.now(),
clock:window.setTimeout(function(){
afterCallback(element.node);
element.callbackTimer=null;
if(element.revealed&&!element.config.reset&&element.config.cleanup){
clean.call(this$1,element.node);
}
},duration-elapsed)};

}

var nextUniqueId=function(){
var uid=0;
return function(){return uid++;};
}();

function sequence(element,pristine){
if(pristine===void 0)pristine=this.pristine;

/**
	 * We first check if the element should reset.
	 */
if(!element.visible&&element.revealed&&element.config.reset){
return animate.call(this,element,{reset:true});
}

var seq=this.store.sequences[element.sequence.id];
var i=element.sequence.index;

if(seq){
var visible=new SequenceModel(seq,'visible',this.store);
var revealed=new SequenceModel(seq,'revealed',this.store);

seq.models={visible:visible,revealed:revealed};

/**
		 * If the sequence has no revealed members,
		 * then we reveal the first visible element
		 * within that sequence.
		 *
		 * The sequence then cues a recursive call
		 * in both directions.
		 */
if(!revealed.body.length){
var nextId=seq.members[visible.body[0]];
var nextElement=this.store.elements[nextId];

if(nextElement){
cue.call(this,seq,visible.body[0],-1,pristine);
cue.call(this,seq,visible.body[0],+1,pristine);
return animate.call(this,nextElement,{reveal:true,pristine:pristine});
}
}

/**
		 * If our element isn’t resetting, we check the
		 * element sequence index against the head, and
		 * then the foot of the sequence.
		 */
if(
!seq.blocked.head&&
i===[].concat(revealed.head).pop()&&
i>=[].concat(visible.body).shift())
{
cue.call(this,seq,i,-1,pristine);
return animate.call(this,element,{reveal:true,pristine:pristine});
}

if(
!seq.blocked.foot&&
i===[].concat(revealed.foot).shift()&&
i<=[].concat(visible.body).pop())
{
cue.call(this,seq,i,+1,pristine);
return animate.call(this,element,{reveal:true,pristine:pristine});
}
}
}

function Sequence(interval){
var i=Math.abs(interval);
if(!isNaN(i)){
this.id=nextUniqueId();
this.interval=Math.max(i,16);
this.members=[];
this.models={};
this.blocked={
head:false,
foot:false};

}else {
throw new RangeError('Invalid sequence interval.');
}
}

function SequenceModel(seq,prop,store){
var this$1=this;

this.head=[];
this.body=[];
this.foot=[];

each(seq.members,function(id,index){
var element=store.elements[id];
if(element&&element[prop]){
this$1.body.push(index);
}
});

if(this.body.length){
each(seq.members,function(id,index){
var element=store.elements[id];
if(element&&!element[prop]){
if(index<this$1.body[0]){
this$1.head.push(index);
}else {
this$1.foot.push(index);
}
}
});
}
}

function cue(seq,i,direction,pristine){
var this$1=this;

var blocked=['head',null,'foot'][1+direction];
var nextId=seq.members[i+direction];
var nextElement=this.store.elements[nextId];

seq.blocked[blocked]=true;

setTimeout(function(){
seq.blocked[blocked]=false;
if(nextElement){
sequence.call(this$1,nextElement,pristine);
}
},seq.interval);
}

function initialize(){
var this$1=this;

rinse.call(this);

each(this.store.elements,function(element){
var styles=[element.styles.inline.generated];

if(element.visible){
styles.push(element.styles.opacity.computed);
styles.push(element.styles.transform.generated.final);
element.revealed=true;
}else {
styles.push(element.styles.opacity.generated);
styles.push(element.styles.transform.generated.initial);
element.revealed=false;
}

element.node.setAttribute('style',styles.filter(function(s){return s!=='';}).join(' '));
});

each(this.store.containers,function(container){
var target=
container.node===document.documentElement?window:container.node;
target.addEventListener('scroll',this$1.delegate);
target.addEventListener('resize',this$1.delegate);
});

/**
	 * Manually invoke delegate once to capture
	 * element and container dimensions, container
	 * scroll position, and trigger any valid reveals
	 */
this.delegate();

/**
	 * Wipe any existing `setTimeout` now
	 * that initialization has completed.
	 */
this.initTimeout=null;
}

function isMobile(agent){
if(agent===void 0)agent=navigator.userAgent;

return /Android|iPhone|iPad|iPod/i.test(agent);
}

function deepAssign(target){
var sources=[],len=arguments.length-1;
while(len-->0){sources[len]=arguments[len+1];}

if(isObject(target)){
each(sources,function(source){
each(source,function(data,key){
if(isObject(data)){
if(!target[key]||!isObject(target[key])){
target[key]={};
}
deepAssign(target[key],data);
}else {
target[key]=data;
}
});
});
return target;
}else {
throw new TypeError('Target must be an object literal.');
}
}

function reveal(target,options,syncing){
var this$1=this;
if(options===void 0)options={};
if(syncing===void 0)syncing=false;

var containerBuffer=[];
var sequence$$1;
var interval=options.interval||defaults.interval;

try{
if(interval){
sequence$$1=new Sequence(interval);
}

var nodes=Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(target);
if(!nodes.length){
throw new Error('Invalid reveal target.');
}

var elements=nodes.reduce(function(elementBuffer,elementNode){
var element={};
var existingId=elementNode.getAttribute('data-sr-id');

if(existingId){
deepAssign(element,this$1.store.elements[existingId]);

/**
				 * In order to prevent previously generated styles
				 * from throwing off the new styles, the style tag
				 * has to be reverted to its pre-reveal state.
				 */
element.node.setAttribute('style',element.styles.inline.computed);
}else {
element.id=nextUniqueId();
element.node=elementNode;
element.seen=false;
element.revealed=false;
element.visible=false;
}

var config=deepAssign({},element.config||this$1.defaults,options);

if(!config.mobile&&isMobile()||!config.desktop&&!isMobile()){
if(existingId){
clean.call(this$1,element);
}
return elementBuffer;// skip elements that are disabled
}

var containerNode=Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(config.container)[0];
if(!containerNode){
throw new Error('Invalid container.');
}
if(!containerNode.contains(elementNode)){
return elementBuffer;// skip elements found outside the container
}

var containerId;
{
containerId=getContainerId(
containerNode,
containerBuffer,
this$1.store.containers);

if(containerId===null){
containerId=nextUniqueId();
containerBuffer.push({id:containerId,node:containerNode});
}
}

element.config=config;
element.containerId=containerId;
element.styles=style(element);

if(sequence$$1){
element.sequence={
id:sequence$$1.id,
index:sequence$$1.members.length};

sequence$$1.members.push(element.id);
}

elementBuffer.push(element);
return elementBuffer;
},[]);

/**
		 * Modifying the DOM via setAttribute needs to be handled
		 * separately from reading computed styles in the map above
		 * for the browser to batch DOM changes (limiting reflows)
		 */
each(elements,function(element){
this$1.store.elements[element.id]=element;
element.node.setAttribute('data-sr-id',element.id);
});
}catch(e){
return logger.call(this,'Reveal failed.',e.message);
}

/**
	 * Now that element set-up is complete...
	 * Let’s commit any container and sequence data we have to the store.
	 */
each(containerBuffer,function(container){
this$1.store.containers[container.id]={
id:container.id,
node:container.node};

});
if(sequence$$1){
this.store.sequences[sequence$$1.id]=sequence$$1;
}

/**
	 * If reveal wasn't invoked by sync, we want to
	 * make sure to add this call to the history.
	 */
if(syncing!==true){
this.store.history.push({target:target,options:options});

/**
		 * Push initialization to the event queue, giving
		 * multiple reveal calls time to be interpreted.
		 */
if(this.initTimeout){
window.clearTimeout(this.initTimeout);
}
this.initTimeout=window.setTimeout(initialize.bind(this),0);
}
}

function getContainerId(node){
var collections=[],len=arguments.length-1;
while(len-->0){collections[len]=arguments[len+1];}

var id=null;
each(collections,function(collection){
each(collection,function(container){
if(id===null&&container.node===node){
id=container.id;
}
});
});
return id;
}

/**
 * Re-runs the reveal method for each record stored in history,
 * for capturing new content asynchronously loaded into the DOM.
 */
function sync(){
var this$1=this;

each(this.store.history,function(record){
reveal.call(this$1,record.target,record.options,true);
});

initialize.call(this);
}

var polyfill=function polyfill(x){return (x>0)-(x<0)||+x;};
var mathSign=Math.sign||polyfill;

function getGeometry(target,isContainer){
/**
	 * We want to ignore padding and scrollbars for container elements.
	 * More information here: https://goo.gl/vOZpbz
	 */
var height=isContainer?target.node.clientHeight:target.node.offsetHeight;
var width=isContainer?target.node.clientWidth:target.node.offsetWidth;

var offsetTop=0;
var offsetLeft=0;
var node=target.node;

do{
if(!isNaN(node.offsetTop)){
offsetTop+=node.offsetTop;
}
if(!isNaN(node.offsetLeft)){
offsetLeft+=node.offsetLeft;
}
node=node.offsetParent;
}while(node);

return {
bounds:{
top:offsetTop,
right:offsetLeft+width,
bottom:offsetTop+height,
left:offsetLeft},

height:height,
width:width};

}

function getScrolled(container){
var top,left;
if(container.node===document.documentElement){
top=window.pageYOffset;
left=window.pageXOffset;
}else {
top=container.node.scrollTop;
left=container.node.scrollLeft;
}
return {top:top,left:left};
}

function isElementVisible(element){
if(element===void 0)element={};

var container=this.store.containers[element.containerId];
if(!container){return;}

var viewFactor=Math.max(0,Math.min(1,element.config.viewFactor));
var viewOffset=element.config.viewOffset;

var elementBounds={
top:element.geometry.bounds.top+element.geometry.height*viewFactor,
right:element.geometry.bounds.right-element.geometry.width*viewFactor,
bottom:element.geometry.bounds.bottom-element.geometry.height*viewFactor,
left:element.geometry.bounds.left+element.geometry.width*viewFactor};


var containerBounds={
top:container.geometry.bounds.top+container.scroll.top+viewOffset.top,
right:container.geometry.bounds.right+container.scroll.left-viewOffset.right,
bottom:
container.geometry.bounds.bottom+container.scroll.top-viewOffset.bottom,
left:container.geometry.bounds.left+container.scroll.left+viewOffset.left};


return(
elementBounds.top<containerBounds.bottom&&
elementBounds.right>containerBounds.left&&
elementBounds.bottom>containerBounds.top&&
elementBounds.left<containerBounds.right||
element.styles.position==='fixed');

}

function delegate(
event,
elements)
{
var this$1=this;
if(event===void 0)event={type:'init'};
if(elements===void 0)elements=this.store.elements;

Object(miniraf__WEBPACK_IMPORTED_MODULE_2__["default"])(function(){
var stale=event.type==='init'||event.type==='resize';

each(this$1.store.containers,function(container){
if(stale){
container.geometry=getGeometry.call(this$1,container,true);
}
var scroll=getScrolled.call(this$1,container);
if(container.scroll){
container.direction={
x:mathSign(scroll.left-container.scroll.left),
y:mathSign(scroll.top-container.scroll.top)};

}
container.scroll=scroll;
});

/**
		 * Due to how the sequencer is implemented, it’s
		 * important that we update the state of all
		 * elements, before any animation logic is
		 * evaluated (in the second loop below).
		 */
each(elements,function(element){
if(stale){
element.geometry=getGeometry.call(this$1,element);
}
element.visible=isElementVisible.call(this$1,element);
});

each(elements,function(element){
if(element.sequence){
sequence.call(this$1,element);
}else {
animate.call(this$1,element);
}
});

this$1.pristine=false;
});
}

function isTransformSupported(){
var style=document.documentElement.style;
return 'transform'in style||'WebkitTransform'in style;
}

function isTransitionSupported(){
var style=document.documentElement.style;
return 'transition'in style||'WebkitTransition'in style;
}

var version="4.0.6";

var boundDelegate;
var boundDestroy;
var boundReveal;
var boundClean;
var boundSync;
var config;
var debug;
var instance;

function ScrollReveal(options){
if(options===void 0)options={};

var invokedWithoutNew=
typeof this==='undefined'||
Object.getPrototypeOf(this)!==ScrollReveal.prototype;

if(invokedWithoutNew){
return new ScrollReveal(options);
}

if(!ScrollReveal.isSupported()){
logger.call(this,'Instantiation failed.','This browser is not supported.');
return mount.failure();
}

var buffer;
try{
buffer=config?
deepAssign({},config,options):
deepAssign({},defaults,options);
}catch(e){
logger.call(this,'Invalid configuration.',e.message);
return mount.failure();
}

try{
var container=Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(buffer.container)[0];
if(!container){
throw new Error('Invalid container.');
}
}catch(e){
logger.call(this,e.message);
return mount.failure();
}

config=buffer;

if(!config.mobile&&isMobile()||!config.desktop&&!isMobile()){
logger.call(
this,
'This device is disabled.',
"desktop: "+config.desktop,
"mobile: "+config.mobile);

return mount.failure();
}

mount.success();

this.store={
containers:{},
elements:{},
history:[],
sequences:{}};


this.pristine=true;

boundDelegate=boundDelegate||delegate.bind(this);
boundDestroy=boundDestroy||destroy.bind(this);
boundReveal=boundReveal||reveal.bind(this);
boundClean=boundClean||clean.bind(this);
boundSync=boundSync||sync.bind(this);

Object.defineProperty(this,'delegate',{get:function get(){return boundDelegate;}});
Object.defineProperty(this,'destroy',{get:function get(){return boundDestroy;}});
Object.defineProperty(this,'reveal',{get:function get(){return boundReveal;}});
Object.defineProperty(this,'clean',{get:function get(){return boundClean;}});
Object.defineProperty(this,'sync',{get:function get(){return boundSync;}});

Object.defineProperty(this,'defaults',{get:function get(){return config;}});
Object.defineProperty(this,'version',{get:function get(){return version;}});
Object.defineProperty(this,'noop',{get:function get(){return false;}});

return instance?instance:instance=this;
}

ScrollReveal.isSupported=function(){return isTransformSupported()&&isTransitionSupported();};

Object.defineProperty(ScrollReveal,'debug',{
get:function get(){return debug||false;},
set:function set(value){return debug=typeof value==='boolean'?value:debug;}});


ScrollReveal();

/* harmony default export */__webpack_exports__["default"]=ScrollReveal;


/***/},

/***/"./node_modules/slick-carousel/slick/slick.js":
/*!****************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick.js ***!
  \****************************************************/
/*! no static exports found */
/***/function node_modulesSlickCarouselSlickSlickJs(module,exports,__webpack_require__){

var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(factory){
{
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(/*! jquery */"jquery")],__WEBPACK_AMD_DEFINE_FACTORY__=factory,
__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?
__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,
__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));
}

})(function($){
var Slick=window.Slick||{};

Slick=function(){

var instanceUid=0;

function Slick(element,settings){

var _=this,dataSettings;

_.defaults={
accessibility:true,
adaptiveHeight:false,
appendArrows:$(element),
appendDots:$(element),
arrows:true,
asNavFor:null,
prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',
autoplay:false,
autoplaySpeed:3000,
centerMode:false,
centerPadding:'50px',
cssEase:'ease',
customPaging:function customPaging(slider,i){
return $('<button type="button" />').text(i+1);
},
dots:false,
dotsClass:'slick-dots',
draggable:true,
easing:'linear',
edgeFriction:0.35,
fade:false,
focusOnSelect:false,
focusOnChange:false,
infinite:true,
initialSlide:0,
lazyLoad:'ondemand',
mobileFirst:false,
pauseOnHover:true,
pauseOnFocus:true,
pauseOnDotsHover:false,
respondTo:'window',
responsive:null,
rows:1,
rtl:false,
slide:'',
slidesPerRow:1,
slidesToShow:1,
slidesToScroll:1,
speed:500,
swipe:true,
swipeToSlide:false,
touchMove:true,
touchThreshold:5,
useCSS:true,
useTransform:true,
variableWidth:false,
vertical:false,
verticalSwiping:false,
waitForAnimate:true,
zIndex:1000};


_.initials={
animating:false,
dragging:false,
autoPlayTimer:null,
currentDirection:0,
currentLeft:null,
currentSlide:0,
direction:1,
$dots:null,
listWidth:null,
listHeight:null,
loadIndex:0,
$nextArrow:null,
$prevArrow:null,
scrolling:false,
slideCount:null,
slideWidth:null,
$slideTrack:null,
$slides:null,
sliding:false,
slideOffset:0,
swipeLeft:null,
swiping:false,
$list:null,
touchObject:{},
transformsEnabled:false,
unslicked:false};


$.extend(_,_.initials);

_.activeBreakpoint=null;
_.animType=null;
_.animProp=null;
_.breakpoints=[];
_.breakpointSettings=[];
_.cssTransitions=false;
_.focussed=false;
_.interrupted=false;
_.hidden='hidden';
_.paused=true;
_.positionProp=null;
_.respondTo=null;
_.rowCount=1;
_.shouldClick=true;
_.$slider=$(element);
_.$slidesCache=null;
_.transformType=null;
_.transitionType=null;
_.visibilityChange='visibilitychange';
_.windowWidth=0;
_.windowTimer=null;

dataSettings=$(element).data('slick')||{};

_.options=$.extend({},_.defaults,settings,dataSettings);

_.currentSlide=_.options.initialSlide;

_.originalSettings=_.options;

if(typeof document.mozHidden!=='undefined'){
_.hidden='mozHidden';
_.visibilityChange='mozvisibilitychange';
}else if(typeof document.webkitHidden!=='undefined'){
_.hidden='webkitHidden';
_.visibilityChange='webkitvisibilitychange';
}

_.autoPlay=$.proxy(_.autoPlay,_);
_.autoPlayClear=$.proxy(_.autoPlayClear,_);
_.autoPlayIterator=$.proxy(_.autoPlayIterator,_);
_.changeSlide=$.proxy(_.changeSlide,_);
_.clickHandler=$.proxy(_.clickHandler,_);
_.selectHandler=$.proxy(_.selectHandler,_);
_.setPosition=$.proxy(_.setPosition,_);
_.swipeHandler=$.proxy(_.swipeHandler,_);
_.dragHandler=$.proxy(_.dragHandler,_);
_.keyHandler=$.proxy(_.keyHandler,_);

_.instanceUid=instanceUid++;

// A simple way to check for HTML strings
// Strict HTML recognition (must start with <)
// Extracted from jQuery v1.11 source
_.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/;


_.registerBreakpoints();
_.init(true);

}

return Slick;

}();

Slick.prototype.activateADA=function(){
var _=this;

_.$slideTrack.find('.slick-active').attr({
'aria-hidden':'false'}).
find('a, input, button, select').attr({
'tabindex':'0'});


};

Slick.prototype.addSlide=Slick.prototype.slickAdd=function(markup,index,addBefore){

var _=this;

if(typeof index==='boolean'){
addBefore=index;
index=null;
}else if(index<0||index>=_.slideCount){
return false;
}

_.unload();

if(typeof index==='number'){
if(index===0&&_.$slides.length===0){
$(markup).appendTo(_.$slideTrack);
}else if(addBefore){
$(markup).insertBefore(_.$slides.eq(index));
}else {
$(markup).insertAfter(_.$slides.eq(index));
}
}else {
if(addBefore===true){
$(markup).prependTo(_.$slideTrack);
}else {
$(markup).appendTo(_.$slideTrack);
}
}

_.$slides=_.$slideTrack.children(this.options.slide);

_.$slideTrack.children(this.options.slide).detach();

_.$slideTrack.append(_.$slides);

_.$slides.each(function(index,element){
$(element).attr('data-slick-index',index);
});

_.$slidesCache=_.$slides;

_.reinit();

};

Slick.prototype.animateHeight=function(){
var _=this;
if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){
var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);
_.$list.animate({
height:targetHeight},
_.options.speed);
}
};

Slick.prototype.animateSlide=function(targetLeft,callback){

var animProps={},
_=this;

_.animateHeight();

if(_.options.rtl===true&&_.options.vertical===false){
targetLeft=-targetLeft;
}
if(_.transformsEnabled===false){
if(_.options.vertical===false){
_.$slideTrack.animate({
left:targetLeft},
_.options.speed,_.options.easing,callback);
}else {
_.$slideTrack.animate({
top:targetLeft},
_.options.speed,_.options.easing,callback);
}

}else {

if(_.cssTransitions===false){
if(_.options.rtl===true){
_.currentLeft=-_.currentLeft;
}
$({
animStart:_.currentLeft}).
animate({
animStart:targetLeft},
{
duration:_.options.speed,
easing:_.options.easing,
step:function step(now){
now=Math.ceil(now);
if(_.options.vertical===false){
animProps[_.animType]='translate('+
now+'px, 0px)';
_.$slideTrack.css(animProps);
}else {
animProps[_.animType]='translate(0px,'+
now+'px)';
_.$slideTrack.css(animProps);
}
},
complete:function complete(){
if(callback){
callback.call();
}
}});


}else {

_.applyTransition();
targetLeft=Math.ceil(targetLeft);

if(_.options.vertical===false){
animProps[_.animType]='translate3d('+targetLeft+'px, 0px, 0px)';
}else {
animProps[_.animType]='translate3d(0px,'+targetLeft+'px, 0px)';
}
_.$slideTrack.css(animProps);

if(callback){
setTimeout(function(){

_.disableTransition();

callback.call();
},_.options.speed);
}

}

}

};

Slick.prototype.getNavTarget=function(){

var _=this,
asNavFor=_.options.asNavFor;

if(asNavFor&&asNavFor!==null){
asNavFor=$(asNavFor).not(_.$slider);
}

return asNavFor;

};

Slick.prototype.asNavFor=function(index){

var _=this,
asNavFor=_.getNavTarget();

if(asNavFor!==null&&typeof asNavFor==='object'){
asNavFor.each(function(){
var target=$(this).slick('getSlick');
if(!target.unslicked){
target.slideHandler(index,true);
}
});
}

};

Slick.prototype.applyTransition=function(slide){

var _=this,
transition={};

if(_.options.fade===false){
transition[_.transitionType]=_.transformType+' '+_.options.speed+'ms '+_.options.cssEase;
}else {
transition[_.transitionType]='opacity '+_.options.speed+'ms '+_.options.cssEase;
}

if(_.options.fade===false){
_.$slideTrack.css(transition);
}else {
_.$slides.eq(slide).css(transition);
}

};

Slick.prototype.autoPlay=function(){

var _=this;

_.autoPlayClear();

if(_.slideCount>_.options.slidesToShow){
_.autoPlayTimer=setInterval(_.autoPlayIterator,_.options.autoplaySpeed);
}

};

Slick.prototype.autoPlayClear=function(){

var _=this;

if(_.autoPlayTimer){
clearInterval(_.autoPlayTimer);
}

};

Slick.prototype.autoPlayIterator=function(){

var _=this,
slideTo=_.currentSlide+_.options.slidesToScroll;

if(!_.paused&&!_.interrupted&&!_.focussed){

if(_.options.infinite===false){

if(_.direction===1&&_.currentSlide+1===_.slideCount-1){
_.direction=0;
}else

if(_.direction===0){

slideTo=_.currentSlide-_.options.slidesToScroll;

if(_.currentSlide-1===0){
_.direction=1;
}

}

}

_.slideHandler(slideTo);

}

};

Slick.prototype.buildArrows=function(){

var _=this;

if(_.options.arrows===true){

_.$prevArrow=$(_.options.prevArrow).addClass('slick-arrow');
_.$nextArrow=$(_.options.nextArrow).addClass('slick-arrow');

if(_.slideCount>_.options.slidesToShow){

_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

if(_.htmlExpr.test(_.options.prevArrow)){
_.$prevArrow.prependTo(_.options.appendArrows);
}

if(_.htmlExpr.test(_.options.nextArrow)){
_.$nextArrow.appendTo(_.options.appendArrows);
}

if(_.options.infinite!==true){
_.$prevArrow.
addClass('slick-disabled').
attr('aria-disabled','true');
}

}else {

_.$prevArrow.add(_.$nextArrow).

addClass('slick-hidden').
attr({
'aria-disabled':'true',
'tabindex':'-1'});


}

}

};

Slick.prototype.buildDots=function(){

var _=this,
i,dot;

if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){

_.$slider.addClass('slick-dotted');

dot=$('<ul />').addClass(_.options.dotsClass);

for(i=0;i<=_.getDotCount();i+=1){
dot.append($('<li />').append(_.options.customPaging.call(this,_,i)));
}

_.$dots=dot.appendTo(_.options.appendDots);

_.$dots.find('li').first().addClass('slick-active');

}

};

Slick.prototype.buildOut=function(){

var _=this;

_.$slides=
_.$slider.
children(_.options.slide+':not(.slick-cloned)').
addClass('slick-slide');

_.slideCount=_.$slides.length;

_.$slides.each(function(index,element){
$(element).
attr('data-slick-index',index).
data('originalStyling',$(element).attr('style')||'');
});

_.$slider.addClass('slick-slider');

_.$slideTrack=_.slideCount===0?
$('<div class="slick-track"/>').appendTo(_.$slider):
_.$slides.wrapAll('<div class="slick-track"/>').parent();

_.$list=_.$slideTrack.wrap(
'<div class="slick-list"/>').parent();
_.$slideTrack.css('opacity',0);

if(_.options.centerMode===true||_.options.swipeToSlide===true){
_.options.slidesToScroll=1;
}

$('img[data-lazy]',_.$slider).not('[src]').addClass('slick-loading');

_.setupInfinite();

_.buildArrows();

_.buildDots();

_.updateDots();


_.setSlideClasses(typeof _.currentSlide==='number'?_.currentSlide:0);

if(_.options.draggable===true){
_.$list.addClass('draggable');
}

};

Slick.prototype.buildRows=function(){

var _=this,a,b,c,newSlides,numOfSlides,originalSlides,slidesPerSection;

newSlides=document.createDocumentFragment();
originalSlides=_.$slider.children();

if(_.options.rows>0){

slidesPerSection=_.options.slidesPerRow*_.options.rows;
numOfSlides=Math.ceil(
originalSlides.length/slidesPerSection);


for(a=0;a<numOfSlides;a++){
var slide=document.createElement('div');
for(b=0;b<_.options.rows;b++){
var row=document.createElement('div');
for(c=0;c<_.options.slidesPerRow;c++){
var target=a*slidesPerSection+(b*_.options.slidesPerRow+c);
if(originalSlides.get(target)){
row.appendChild(originalSlides.get(target));
}
}
slide.appendChild(row);
}
newSlides.appendChild(slide);
}

_.$slider.empty().append(newSlides);
_.$slider.children().children().children().
css({
'width':100/_.options.slidesPerRow+'%',
'display':'inline-block'});


}

};

Slick.prototype.checkResponsive=function(initial,forceUpdate){

var _=this,
breakpoint,targetBreakpoint,respondToWidth,triggerBreakpoint=false;
var sliderWidth=_.$slider.width();
var windowWidth=window.innerWidth||$(window).width();

if(_.respondTo==='window'){
respondToWidth=windowWidth;
}else if(_.respondTo==='slider'){
respondToWidth=sliderWidth;
}else if(_.respondTo==='min'){
respondToWidth=Math.min(windowWidth,sliderWidth);
}

if(_.options.responsive&&
_.options.responsive.length&&
_.options.responsive!==null){

targetBreakpoint=null;

for(breakpoint in _.breakpoints){
if(_.breakpoints.hasOwnProperty(breakpoint)){
if(_.originalSettings.mobileFirst===false){
if(respondToWidth<_.breakpoints[breakpoint]){
targetBreakpoint=_.breakpoints[breakpoint];
}
}else {
if(respondToWidth>_.breakpoints[breakpoint]){
targetBreakpoint=_.breakpoints[breakpoint];
}
}
}
}

if(targetBreakpoint!==null){
if(_.activeBreakpoint!==null){
if(targetBreakpoint!==_.activeBreakpoint||forceUpdate){
_.activeBreakpoint=
targetBreakpoint;
if(_.breakpointSettings[targetBreakpoint]==='unslick'){
_.unslick(targetBreakpoint);
}else {
_.options=$.extend({},_.originalSettings,
_.breakpointSettings[
targetBreakpoint]);
if(initial===true){
_.currentSlide=_.options.initialSlide;
}
_.refresh(initial);
}
triggerBreakpoint=targetBreakpoint;
}
}else {
_.activeBreakpoint=targetBreakpoint;
if(_.breakpointSettings[targetBreakpoint]==='unslick'){
_.unslick(targetBreakpoint);
}else {
_.options=$.extend({},_.originalSettings,
_.breakpointSettings[
targetBreakpoint]);
if(initial===true){
_.currentSlide=_.options.initialSlide;
}
_.refresh(initial);
}
triggerBreakpoint=targetBreakpoint;
}
}else {
if(_.activeBreakpoint!==null){
_.activeBreakpoint=null;
_.options=_.originalSettings;
if(initial===true){
_.currentSlide=_.options.initialSlide;
}
_.refresh(initial);
triggerBreakpoint=targetBreakpoint;
}
}

// only trigger breakpoints during an actual break. not on initialize.
if(!initial&&triggerBreakpoint!==false){
_.$slider.trigger('breakpoint',[_,triggerBreakpoint]);
}
}

};

Slick.prototype.changeSlide=function(event,dontAnimate){

var _=this,
$target=$(event.currentTarget),
indexOffset,slideOffset,unevenOffset;

// If target is a link, prevent default action.
if($target.is('a')){
event.preventDefault();
}

// If target is not the <li> element (ie: a child), find the <li>.
if(!$target.is('li')){
$target=$target.closest('li');
}

unevenOffset=_.slideCount%_.options.slidesToScroll!==0;
indexOffset=unevenOffset?0:(_.slideCount-_.currentSlide)%_.options.slidesToScroll;

switch(event.data.message){

case'previous':
slideOffset=indexOffset===0?_.options.slidesToScroll:_.options.slidesToShow-indexOffset;
if(_.slideCount>_.options.slidesToShow){
_.slideHandler(_.currentSlide-slideOffset,false,dontAnimate);
}
break;

case'next':
slideOffset=indexOffset===0?_.options.slidesToScroll:indexOffset;
if(_.slideCount>_.options.slidesToShow){
_.slideHandler(_.currentSlide+slideOffset,false,dontAnimate);
}
break;

case'index':
var index=event.data.index===0?0:
event.data.index||$target.index()*_.options.slidesToScroll;

_.slideHandler(_.checkNavigable(index),false,dontAnimate);
$target.children().trigger('focus');
break;

default:
return;}


};

Slick.prototype.checkNavigable=function(index){

var _=this,
navigables,prevNavigable;

navigables=_.getNavigableIndexes();
prevNavigable=0;
if(index>navigables[navigables.length-1]){
index=navigables[navigables.length-1];
}else {
for(var n in navigables){
if(index<navigables[n]){
index=prevNavigable;
break;
}
prevNavigable=navigables[n];
}
}

return index;
};

Slick.prototype.cleanUpEvents=function(){

var _=this;

if(_.options.dots&&_.$dots!==null){

$('li',_.$dots).
off('click.slick',_.changeSlide).
off('mouseenter.slick',$.proxy(_.interrupt,_,true)).
off('mouseleave.slick',$.proxy(_.interrupt,_,false));

if(_.options.accessibility===true){
_.$dots.off('keydown.slick',_.keyHandler);
}
}

_.$slider.off('focus.slick blur.slick');

if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){
_.$prevArrow&&_.$prevArrow.off('click.slick',_.changeSlide);
_.$nextArrow&&_.$nextArrow.off('click.slick',_.changeSlide);

if(_.options.accessibility===true){
_.$prevArrow&&_.$prevArrow.off('keydown.slick',_.keyHandler);
_.$nextArrow&&_.$nextArrow.off('keydown.slick',_.keyHandler);
}
}

_.$list.off('touchstart.slick mousedown.slick',_.swipeHandler);
_.$list.off('touchmove.slick mousemove.slick',_.swipeHandler);
_.$list.off('touchend.slick mouseup.slick',_.swipeHandler);
_.$list.off('touchcancel.slick mouseleave.slick',_.swipeHandler);

_.$list.off('click.slick',_.clickHandler);

$(document).off(_.visibilityChange,_.visibility);

_.cleanUpSlideEvents();

if(_.options.accessibility===true){
_.$list.off('keydown.slick',_.keyHandler);
}

if(_.options.focusOnSelect===true){
$(_.$slideTrack).children().off('click.slick',_.selectHandler);
}

$(window).off('orientationchange.slick.slick-'+_.instanceUid,_.orientationChange);

$(window).off('resize.slick.slick-'+_.instanceUid,_.resize);

$('[draggable!=true]',_.$slideTrack).off('dragstart',_.preventDefault);

$(window).off('load.slick.slick-'+_.instanceUid,_.setPosition);

};

Slick.prototype.cleanUpSlideEvents=function(){

var _=this;

_.$list.off('mouseenter.slick',$.proxy(_.interrupt,_,true));
_.$list.off('mouseleave.slick',$.proxy(_.interrupt,_,false));

};

Slick.prototype.cleanUpRows=function(){

var _=this,originalSlides;

if(_.options.rows>0){
originalSlides=_.$slides.children().children();
originalSlides.removeAttr('style');
_.$slider.empty().append(originalSlides);
}

};

Slick.prototype.clickHandler=function(event){

var _=this;

if(_.shouldClick===false){
event.stopImmediatePropagation();
event.stopPropagation();
event.preventDefault();
}

};

Slick.prototype.destroy=function(refresh){

var _=this;

_.autoPlayClear();

_.touchObject={};

_.cleanUpEvents();

$('.slick-cloned',_.$slider).detach();

if(_.$dots){
_.$dots.remove();
}

if(_.$prevArrow&&_.$prevArrow.length){

_.$prevArrow.
removeClass('slick-disabled slick-arrow slick-hidden').
removeAttr('aria-hidden aria-disabled tabindex').
css('display','');

if(_.htmlExpr.test(_.options.prevArrow)){
_.$prevArrow.remove();
}
}

if(_.$nextArrow&&_.$nextArrow.length){

_.$nextArrow.
removeClass('slick-disabled slick-arrow slick-hidden').
removeAttr('aria-hidden aria-disabled tabindex').
css('display','');

if(_.htmlExpr.test(_.options.nextArrow)){
_.$nextArrow.remove();
}
}


if(_.$slides){

_.$slides.
removeClass('slick-slide slick-active slick-center slick-visible slick-current').
removeAttr('aria-hidden').
removeAttr('data-slick-index').
each(function(){
$(this).attr('style',$(this).data('originalStyling'));
});

_.$slideTrack.children(this.options.slide).detach();

_.$slideTrack.detach();

_.$list.detach();

_.$slider.append(_.$slides);
}

_.cleanUpRows();

_.$slider.removeClass('slick-slider');
_.$slider.removeClass('slick-initialized');
_.$slider.removeClass('slick-dotted');

_.unslicked=true;

if(!refresh){
_.$slider.trigger('destroy',[_]);
}

};

Slick.prototype.disableTransition=function(slide){

var _=this,
transition={};

transition[_.transitionType]='';

if(_.options.fade===false){
_.$slideTrack.css(transition);
}else {
_.$slides.eq(slide).css(transition);
}

};

Slick.prototype.fadeSlide=function(slideIndex,callback){

var _=this;

if(_.cssTransitions===false){

_.$slides.eq(slideIndex).css({
zIndex:_.options.zIndex});


_.$slides.eq(slideIndex).animate({
opacity:1},
_.options.speed,_.options.easing,callback);

}else {

_.applyTransition(slideIndex);

_.$slides.eq(slideIndex).css({
opacity:1,
zIndex:_.options.zIndex});


if(callback){
setTimeout(function(){

_.disableTransition(slideIndex);

callback.call();
},_.options.speed);
}

}

};

Slick.prototype.fadeSlideOut=function(slideIndex){

var _=this;

if(_.cssTransitions===false){

_.$slides.eq(slideIndex).animate({
opacity:0,
zIndex:_.options.zIndex-2},
_.options.speed,_.options.easing);

}else {

_.applyTransition(slideIndex);

_.$slides.eq(slideIndex).css({
opacity:0,
zIndex:_.options.zIndex-2});


}

};

Slick.prototype.filterSlides=Slick.prototype.slickFilter=function(filter){

var _=this;

if(filter!==null){

_.$slidesCache=_.$slides;

_.unload();

_.$slideTrack.children(this.options.slide).detach();

_.$slidesCache.filter(filter).appendTo(_.$slideTrack);

_.reinit();

}

};

Slick.prototype.focusHandler=function(){

var _=this;

_.$slider.
off('focus.slick blur.slick').
on('focus.slick blur.slick','*',function(event){

event.stopImmediatePropagation();
var $sf=$(this);

setTimeout(function(){

if(_.options.pauseOnFocus){
_.focussed=$sf.is(':focus');
_.autoPlay();
}

},0);

});
};

Slick.prototype.getCurrent=Slick.prototype.slickCurrentSlide=function(){

var _=this;
return _.currentSlide;

};

Slick.prototype.getDotCount=function(){

var _=this;

var breakPoint=0;
var counter=0;
var pagerQty=0;

if(_.options.infinite===true){
if(_.slideCount<=_.options.slidesToShow){
++pagerQty;
}else {
while(breakPoint<_.slideCount){
++pagerQty;
breakPoint=counter+_.options.slidesToScroll;
counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow;
}
}
}else if(_.options.centerMode===true){
pagerQty=_.slideCount;
}else if(!_.options.asNavFor){
pagerQty=1+Math.ceil((_.slideCount-_.options.slidesToShow)/_.options.slidesToScroll);
}else {
while(breakPoint<_.slideCount){
++pagerQty;
breakPoint=counter+_.options.slidesToScroll;
counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow;
}
}

return pagerQty-1;

};

Slick.prototype.getLeft=function(slideIndex){

var _=this,
targetLeft,
verticalHeight,
verticalOffset=0,
targetSlide,
coef;

_.slideOffset=0;
verticalHeight=_.$slides.first().outerHeight(true);

if(_.options.infinite===true){
if(_.slideCount>_.options.slidesToShow){
_.slideOffset=_.slideWidth*_.options.slidesToShow*-1;
coef=-1;

if(_.options.vertical===true&&_.options.centerMode===true){
if(_.options.slidesToShow===2){
coef=-1.5;
}else if(_.options.slidesToShow===1){
coef=-2;
}
}
verticalOffset=verticalHeight*_.options.slidesToShow*coef;
}
if(_.slideCount%_.options.slidesToScroll!==0){
if(slideIndex+_.options.slidesToScroll>_.slideCount&&_.slideCount>_.options.slidesToShow){
if(slideIndex>_.slideCount){
_.slideOffset=(_.options.slidesToShow-(slideIndex-_.slideCount))*_.slideWidth*-1;
verticalOffset=(_.options.slidesToShow-(slideIndex-_.slideCount))*verticalHeight*-1;
}else {
_.slideOffset=_.slideCount%_.options.slidesToScroll*_.slideWidth*-1;
verticalOffset=_.slideCount%_.options.slidesToScroll*verticalHeight*-1;
}
}
}
}else {
if(slideIndex+_.options.slidesToShow>_.slideCount){
_.slideOffset=(slideIndex+_.options.slidesToShow-_.slideCount)*_.slideWidth;
verticalOffset=(slideIndex+_.options.slidesToShow-_.slideCount)*verticalHeight;
}
}

if(_.slideCount<=_.options.slidesToShow){
_.slideOffset=0;
verticalOffset=0;
}

if(_.options.centerMode===true&&_.slideCount<=_.options.slidesToShow){
_.slideOffset=_.slideWidth*Math.floor(_.options.slidesToShow)/2-_.slideWidth*_.slideCount/2;
}else if(_.options.centerMode===true&&_.options.infinite===true){
_.slideOffset+=_.slideWidth*Math.floor(_.options.slidesToShow/2)-_.slideWidth;
}else if(_.options.centerMode===true){
_.slideOffset=0;
_.slideOffset+=_.slideWidth*Math.floor(_.options.slidesToShow/2);
}

if(_.options.vertical===false){
targetLeft=slideIndex*_.slideWidth*-1+_.slideOffset;
}else {
targetLeft=slideIndex*verticalHeight*-1+verticalOffset;
}

if(_.options.variableWidth===true){

if(_.slideCount<=_.options.slidesToShow||_.options.infinite===false){
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex);
}else {
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex+_.options.slidesToShow);
}

if(_.options.rtl===true){
if(targetSlide[0]){
targetLeft=(_.$slideTrack.width()-targetSlide[0].offsetLeft-targetSlide.width())*-1;
}else {
targetLeft=0;
}
}else {
targetLeft=targetSlide[0]?targetSlide[0].offsetLeft*-1:0;
}

if(_.options.centerMode===true){
if(_.slideCount<=_.options.slidesToShow||_.options.infinite===false){
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex);
}else {
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex+_.options.slidesToShow+1);
}

if(_.options.rtl===true){
if(targetSlide[0]){
targetLeft=(_.$slideTrack.width()-targetSlide[0].offsetLeft-targetSlide.width())*-1;
}else {
targetLeft=0;
}
}else {
targetLeft=targetSlide[0]?targetSlide[0].offsetLeft*-1:0;
}

targetLeft+=(_.$list.width()-targetSlide.outerWidth())/2;
}
}

return targetLeft;

};

Slick.prototype.getOption=Slick.prototype.slickGetOption=function(option){

var _=this;

return _.options[option];

};

Slick.prototype.getNavigableIndexes=function(){

var _=this,
breakPoint=0,
counter=0,
indexes=[],
max;

if(_.options.infinite===false){
max=_.slideCount;
}else {
breakPoint=_.options.slidesToScroll*-1;
counter=_.options.slidesToScroll*-1;
max=_.slideCount*2;
}

while(breakPoint<max){
indexes.push(breakPoint);
breakPoint=counter+_.options.slidesToScroll;
counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow;
}

return indexes;

};

Slick.prototype.getSlick=function(){

return this;

};

Slick.prototype.getSlideCount=function(){

var _=this,
slidesTraversed,swipedSlide,centerOffset;

centerOffset=_.options.centerMode===true?_.slideWidth*Math.floor(_.options.slidesToShow/2):0;

if(_.options.swipeToSlide===true){
_.$slideTrack.find('.slick-slide').each(function(index,slide){
if(slide.offsetLeft-centerOffset+$(slide).outerWidth()/2>_.swipeLeft*-1){
swipedSlide=slide;
return false;
}
});

slidesTraversed=Math.abs($(swipedSlide).attr('data-slick-index')-_.currentSlide)||1;

return slidesTraversed;

}else {
return _.options.slidesToScroll;
}

};

Slick.prototype.goTo=Slick.prototype.slickGoTo=function(slide,dontAnimate){

var _=this;

_.changeSlide({
data:{
message:'index',
index:parseInt(slide)}},

dontAnimate);

};

Slick.prototype.init=function(creation){

var _=this;

if(!$(_.$slider).hasClass('slick-initialized')){

$(_.$slider).addClass('slick-initialized');

_.buildRows();
_.buildOut();
_.setProps();
_.startLoad();
_.loadSlider();
_.initializeEvents();
_.updateArrows();
_.updateDots();
_.checkResponsive(true);
_.focusHandler();

}

if(creation){
_.$slider.trigger('init',[_]);
}

if(_.options.accessibility===true){
_.initADA();
}

if(_.options.autoplay){

_.paused=false;
_.autoPlay();

}

};

Slick.prototype.initADA=function(){
var _=this,
numDotGroups=Math.ceil(_.slideCount/_.options.slidesToShow),
tabControlIndexes=_.getNavigableIndexes().filter(function(val){
return val>=0&&val<_.slideCount;
});

_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
'aria-hidden':'true',
'tabindex':'-1'}).
find('a, input, button, select').attr({
'tabindex':'-1'});


if(_.$dots!==null){
_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i){
var slideControlIndex=tabControlIndexes.indexOf(i);

$(this).attr({
'role':'tabpanel',
'id':'slick-slide'+_.instanceUid+i,
'tabindex':-1});


if(slideControlIndex!==-1){
var ariaButtonControl='slick-slide-control'+_.instanceUid+slideControlIndex;
if($('#'+ariaButtonControl).length){
$(this).attr({
'aria-describedby':ariaButtonControl});

}
}
});

_.$dots.attr('role','tablist').find('li').each(function(i){
var mappedSlideIndex=tabControlIndexes[i];

$(this).attr({
'role':'presentation'});


$(this).find('button').first().attr({
'role':'tab',
'id':'slick-slide-control'+_.instanceUid+i,
'aria-controls':'slick-slide'+_.instanceUid+mappedSlideIndex,
'aria-label':i+1+' of '+numDotGroups,
'aria-selected':null,
'tabindex':'-1'});


}).eq(_.currentSlide).find('button').attr({
'aria-selected':'true',
'tabindex':'0'}).
end();
}

for(var i=_.currentSlide,max=i+_.options.slidesToShow;i<max;i++){
if(_.options.focusOnChange){
_.$slides.eq(i).attr({'tabindex':'0'});
}else {
_.$slides.eq(i).removeAttr('tabindex');
}
}

_.activateADA();

};

Slick.prototype.initArrowEvents=function(){

var _=this;

if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){
_.$prevArrow.
off('click.slick').
on('click.slick',{
message:'previous'},
_.changeSlide);
_.$nextArrow.
off('click.slick').
on('click.slick',{
message:'next'},
_.changeSlide);

if(_.options.accessibility===true){
_.$prevArrow.on('keydown.slick',_.keyHandler);
_.$nextArrow.on('keydown.slick',_.keyHandler);
}
}

};

Slick.prototype.initDotEvents=function(){

var _=this;

if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){
$('li',_.$dots).on('click.slick',{
message:'index'},
_.changeSlide);

if(_.options.accessibility===true){
_.$dots.on('keydown.slick',_.keyHandler);
}
}

if(_.options.dots===true&&_.options.pauseOnDotsHover===true&&_.slideCount>_.options.slidesToShow){

$('li',_.$dots).
on('mouseenter.slick',$.proxy(_.interrupt,_,true)).
on('mouseleave.slick',$.proxy(_.interrupt,_,false));

}

};

Slick.prototype.initSlideEvents=function(){

var _=this;

if(_.options.pauseOnHover){

_.$list.on('mouseenter.slick',$.proxy(_.interrupt,_,true));
_.$list.on('mouseleave.slick',$.proxy(_.interrupt,_,false));

}

};

Slick.prototype.initializeEvents=function(){

var _=this;

_.initArrowEvents();

_.initDotEvents();
_.initSlideEvents();

_.$list.on('touchstart.slick mousedown.slick',{
action:'start'},
_.swipeHandler);
_.$list.on('touchmove.slick mousemove.slick',{
action:'move'},
_.swipeHandler);
_.$list.on('touchend.slick mouseup.slick',{
action:'end'},
_.swipeHandler);
_.$list.on('touchcancel.slick mouseleave.slick',{
action:'end'},
_.swipeHandler);

_.$list.on('click.slick',_.clickHandler);

$(document).on(_.visibilityChange,$.proxy(_.visibility,_));

if(_.options.accessibility===true){
_.$list.on('keydown.slick',_.keyHandler);
}

if(_.options.focusOnSelect===true){
$(_.$slideTrack).children().on('click.slick',_.selectHandler);
}

$(window).on('orientationchange.slick.slick-'+_.instanceUid,$.proxy(_.orientationChange,_));

$(window).on('resize.slick.slick-'+_.instanceUid,$.proxy(_.resize,_));

$('[draggable!=true]',_.$slideTrack).on('dragstart',_.preventDefault);

$(window).on('load.slick.slick-'+_.instanceUid,_.setPosition);
$(_.setPosition);

};

Slick.prototype.initUI=function(){

var _=this;

if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){

_.$prevArrow.show();
_.$nextArrow.show();

}

if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){

_.$dots.show();

}

};

Slick.prototype.keyHandler=function(event){

var _=this;
//Dont slide if the cursor is inside the form fields and arrow keys are pressed
if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')){
if(event.keyCode===37&&_.options.accessibility===true){
_.changeSlide({
data:{
message:_.options.rtl===true?'next':'previous'}});


}else if(event.keyCode===39&&_.options.accessibility===true){
_.changeSlide({
data:{
message:_.options.rtl===true?'previous':'next'}});


}
}

};

Slick.prototype.lazyLoad=function(){

var _=this,
loadRange,cloneRange,rangeStart,rangeEnd;

function loadImages(imagesScope){

$('img[data-lazy]',imagesScope).each(function(){

var image=$(this),
imageSource=$(this).attr('data-lazy'),
imageSrcSet=$(this).attr('data-srcset'),
imageSizes=$(this).attr('data-sizes')||_.$slider.attr('data-sizes'),
imageToLoad=document.createElement('img');

imageToLoad.onload=function(){

image.
animate({opacity:0},100,function(){

if(imageSrcSet){
image.
attr('srcset',imageSrcSet);

if(imageSizes){
image.
attr('sizes',imageSizes);
}
}

image.
attr('src',imageSource).
animate({opacity:1},200,function(){
image.
removeAttr('data-lazy data-srcset data-sizes').
removeClass('slick-loading');
});
_.$slider.trigger('lazyLoaded',[_,image,imageSource]);
});

};

imageToLoad.onerror=function(){

image.
removeAttr('data-lazy').
removeClass('slick-loading').
addClass('slick-lazyload-error');

_.$slider.trigger('lazyLoadError',[_,image,imageSource]);

};

imageToLoad.src=imageSource;

});

}

if(_.options.centerMode===true){
if(_.options.infinite===true){
rangeStart=_.currentSlide+(_.options.slidesToShow/2+1);
rangeEnd=rangeStart+_.options.slidesToShow+2;
}else {
rangeStart=Math.max(0,_.currentSlide-(_.options.slidesToShow/2+1));
rangeEnd=2+(_.options.slidesToShow/2+1)+_.currentSlide;
}
}else {
rangeStart=_.options.infinite?_.options.slidesToShow+_.currentSlide:_.currentSlide;
rangeEnd=Math.ceil(rangeStart+_.options.slidesToShow);
if(_.options.fade===true){
if(rangeStart>0)rangeStart--;
if(rangeEnd<=_.slideCount)rangeEnd++;
}
}

loadRange=_.$slider.find('.slick-slide').slice(rangeStart,rangeEnd);

if(_.options.lazyLoad==='anticipated'){
var prevSlide=rangeStart-1,
nextSlide=rangeEnd,
$slides=_.$slider.find('.slick-slide');

for(var i=0;i<_.options.slidesToScroll;i++){
if(prevSlide<0)prevSlide=_.slideCount-1;
loadRange=loadRange.add($slides.eq(prevSlide));
loadRange=loadRange.add($slides.eq(nextSlide));
prevSlide--;
nextSlide++;
}
}

loadImages(loadRange);

if(_.slideCount<=_.options.slidesToShow){
cloneRange=_.$slider.find('.slick-slide');
loadImages(cloneRange);
}else
if(_.currentSlide>=_.slideCount-_.options.slidesToShow){
cloneRange=_.$slider.find('.slick-cloned').slice(0,_.options.slidesToShow);
loadImages(cloneRange);
}else if(_.currentSlide===0){
cloneRange=_.$slider.find('.slick-cloned').slice(_.options.slidesToShow*-1);
loadImages(cloneRange);
}

};

Slick.prototype.loadSlider=function(){

var _=this;

_.setPosition();

_.$slideTrack.css({
opacity:1});


_.$slider.removeClass('slick-loading');

_.initUI();

if(_.options.lazyLoad==='progressive'){
_.progressiveLazyLoad();
}

};

Slick.prototype.next=Slick.prototype.slickNext=function(){

var _=this;

_.changeSlide({
data:{
message:'next'}});



};

Slick.prototype.orientationChange=function(){

var _=this;

_.checkResponsive();
_.setPosition();

};

Slick.prototype.pause=Slick.prototype.slickPause=function(){

var _=this;

_.autoPlayClear();
_.paused=true;

};

Slick.prototype.play=Slick.prototype.slickPlay=function(){

var _=this;

_.autoPlay();
_.options.autoplay=true;
_.paused=false;
_.focussed=false;
_.interrupted=false;

};

Slick.prototype.postSlide=function(index){

var _=this;

if(!_.unslicked){

_.$slider.trigger('afterChange',[_,index]);

_.animating=false;

if(_.slideCount>_.options.slidesToShow){
_.setPosition();
}

_.swipeLeft=null;

if(_.options.autoplay){
_.autoPlay();
}

if(_.options.accessibility===true){
_.initADA();

if(_.options.focusOnChange){
var $currentSlide=$(_.$slides.get(_.currentSlide));
$currentSlide.attr('tabindex',0).focus();
}
}

}

};

Slick.prototype.prev=Slick.prototype.slickPrev=function(){

var _=this;

_.changeSlide({
data:{
message:'previous'}});



};

Slick.prototype.preventDefault=function(event){

event.preventDefault();

};

Slick.prototype.progressiveLazyLoad=function(tryCount){

tryCount=tryCount||1;

var _=this,
$imgsToLoad=$('img[data-lazy]',_.$slider),
image,
imageSource,
imageSrcSet,
imageSizes,
imageToLoad;

if($imgsToLoad.length){

image=$imgsToLoad.first();
imageSource=image.attr('data-lazy');
imageSrcSet=image.attr('data-srcset');
imageSizes=image.attr('data-sizes')||_.$slider.attr('data-sizes');
imageToLoad=document.createElement('img');

imageToLoad.onload=function(){

if(imageSrcSet){
image.
attr('srcset',imageSrcSet);

if(imageSizes){
image.
attr('sizes',imageSizes);
}
}

image.
attr('src',imageSource).
removeAttr('data-lazy data-srcset data-sizes').
removeClass('slick-loading');

if(_.options.adaptiveHeight===true){
_.setPosition();
}

_.$slider.trigger('lazyLoaded',[_,image,imageSource]);
_.progressiveLazyLoad();

};

imageToLoad.onerror=function(){

if(tryCount<3){

/**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
setTimeout(function(){
_.progressiveLazyLoad(tryCount+1);
},500);

}else {

image.
removeAttr('data-lazy').
removeClass('slick-loading').
addClass('slick-lazyload-error');

_.$slider.trigger('lazyLoadError',[_,image,imageSource]);

_.progressiveLazyLoad();

}

};

imageToLoad.src=imageSource;

}else {

_.$slider.trigger('allImagesLoaded',[_]);

}

};

Slick.prototype.refresh=function(initializing){

var _=this,currentSlide,lastVisibleIndex;

lastVisibleIndex=_.slideCount-_.options.slidesToShow;

// in non-infinite sliders, we don't want to go past the
// last visible index.
if(!_.options.infinite&&_.currentSlide>lastVisibleIndex){
_.currentSlide=lastVisibleIndex;
}

// if less slides than to show, go to start.
if(_.slideCount<=_.options.slidesToShow){
_.currentSlide=0;

}

currentSlide=_.currentSlide;

_.destroy(true);

$.extend(_,_.initials,{currentSlide:currentSlide});

_.init();

if(!initializing){

_.changeSlide({
data:{
message:'index',
index:currentSlide}},

false);

}

};

Slick.prototype.registerBreakpoints=function(){

var _=this,breakpoint,currentBreakpoint,l,
responsiveSettings=_.options.responsive||null;

if($.type(responsiveSettings)==='array'&&responsiveSettings.length){

_.respondTo=_.options.respondTo||'window';

for(breakpoint in responsiveSettings){

l=_.breakpoints.length-1;

if(responsiveSettings.hasOwnProperty(breakpoint)){
currentBreakpoint=responsiveSettings[breakpoint].breakpoint;

// loop through the breakpoints and cut out any existing
// ones with the same breakpoint number, we don't want dupes.
while(l>=0){
if(_.breakpoints[l]&&_.breakpoints[l]===currentBreakpoint){
_.breakpoints.splice(l,1);
}
l--;
}

_.breakpoints.push(currentBreakpoint);
_.breakpointSettings[currentBreakpoint]=responsiveSettings[breakpoint].settings;

}

}

_.breakpoints.sort(function(a,b){
return _.options.mobileFirst?a-b:b-a;
});

}

};

Slick.prototype.reinit=function(){

var _=this;

_.$slides=
_.$slideTrack.
children(_.options.slide).
addClass('slick-slide');

_.slideCount=_.$slides.length;

if(_.currentSlide>=_.slideCount&&_.currentSlide!==0){
_.currentSlide=_.currentSlide-_.options.slidesToScroll;
}

if(_.slideCount<=_.options.slidesToShow){
_.currentSlide=0;
}

_.registerBreakpoints();

_.setProps();
_.setupInfinite();
_.buildArrows();
_.updateArrows();
_.initArrowEvents();
_.buildDots();
_.updateDots();
_.initDotEvents();
_.cleanUpSlideEvents();
_.initSlideEvents();

_.checkResponsive(false,true);

if(_.options.focusOnSelect===true){
$(_.$slideTrack).children().on('click.slick',_.selectHandler);
}

_.setSlideClasses(typeof _.currentSlide==='number'?_.currentSlide:0);

_.setPosition();
_.focusHandler();

_.paused=!_.options.autoplay;
_.autoPlay();

_.$slider.trigger('reInit',[_]);

};

Slick.prototype.resize=function(){

var _=this;

if($(window).width()!==_.windowWidth){
clearTimeout(_.windowDelay);
_.windowDelay=window.setTimeout(function(){
_.windowWidth=$(window).width();
_.checkResponsive();
if(!_.unslicked){_.setPosition();}
},50);
}
};

Slick.prototype.removeSlide=Slick.prototype.slickRemove=function(index,removeBefore,removeAll){

var _=this;

if(typeof index==='boolean'){
removeBefore=index;
index=removeBefore===true?0:_.slideCount-1;
}else {
index=removeBefore===true?--index:index;
}

if(_.slideCount<1||index<0||index>_.slideCount-1){
return false;
}

_.unload();

if(removeAll===true){
_.$slideTrack.children().remove();
}else {
_.$slideTrack.children(this.options.slide).eq(index).remove();
}

_.$slides=_.$slideTrack.children(this.options.slide);

_.$slideTrack.children(this.options.slide).detach();

_.$slideTrack.append(_.$slides);

_.$slidesCache=_.$slides;

_.reinit();

};

Slick.prototype.setCSS=function(position){

var _=this,
positionProps={},
x,y;

if(_.options.rtl===true){
position=-position;
}
x=_.positionProp=='left'?Math.ceil(position)+'px':'0px';
y=_.positionProp=='top'?Math.ceil(position)+'px':'0px';

positionProps[_.positionProp]=position;

if(_.transformsEnabled===false){
_.$slideTrack.css(positionProps);
}else {
positionProps={};
if(_.cssTransitions===false){
positionProps[_.animType]='translate('+x+', '+y+')';
_.$slideTrack.css(positionProps);
}else {
positionProps[_.animType]='translate3d('+x+', '+y+', 0px)';
_.$slideTrack.css(positionProps);
}
}

};

Slick.prototype.setDimensions=function(){

var _=this;

if(_.options.vertical===false){
if(_.options.centerMode===true){
_.$list.css({
padding:'0px '+_.options.centerPadding});

}
}else {
_.$list.height(_.$slides.first().outerHeight(true)*_.options.slidesToShow);
if(_.options.centerMode===true){
_.$list.css({
padding:_.options.centerPadding+' 0px'});

}
}

_.listWidth=_.$list.width();
_.listHeight=_.$list.height();


if(_.options.vertical===false&&_.options.variableWidth===false){
_.slideWidth=Math.ceil(_.listWidth/_.options.slidesToShow);
_.$slideTrack.width(Math.ceil(_.slideWidth*_.$slideTrack.children('.slick-slide').length));

}else if(_.options.variableWidth===true){
_.$slideTrack.width(5000*_.slideCount);
}else {
_.slideWidth=Math.ceil(_.listWidth);
_.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true)*_.$slideTrack.children('.slick-slide').length));
}

var offset=_.$slides.first().outerWidth(true)-_.$slides.first().width();
if(_.options.variableWidth===false)_.$slideTrack.children('.slick-slide').width(_.slideWidth-offset);

};

Slick.prototype.setFade=function(){

var _=this,
targetLeft;

_.$slides.each(function(index,element){
targetLeft=_.slideWidth*index*-1;
if(_.options.rtl===true){
$(element).css({
position:'relative',
right:targetLeft,
top:0,
zIndex:_.options.zIndex-2,
opacity:0});

}else {
$(element).css({
position:'relative',
left:targetLeft,
top:0,
zIndex:_.options.zIndex-2,
opacity:0});

}
});

_.$slides.eq(_.currentSlide).css({
zIndex:_.options.zIndex-1,
opacity:1});


};

Slick.prototype.setHeight=function(){

var _=this;

if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){
var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);
_.$list.css('height',targetHeight);
}

};

Slick.prototype.setOption=
Slick.prototype.slickSetOption=function(){

/**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

var _=this,l,item,option,value,refresh=false,type;

if($.type(arguments[0])==='object'){

option=arguments[0];
refresh=arguments[1];
type='multiple';

}else if($.type(arguments[0])==='string'){

option=arguments[0];
value=arguments[1];
refresh=arguments[2];

if(arguments[0]==='responsive'&&$.type(arguments[1])==='array'){

type='responsive';

}else if(typeof arguments[1]!=='undefined'){

type='single';

}

}

if(type==='single'){

_.options[option]=value;


}else if(type==='multiple'){

$.each(option,function(opt,val){

_.options[opt]=val;

});


}else if(type==='responsive'){

for(item in value){

if($.type(_.options.responsive)!=='array'){

_.options.responsive=[value[item]];

}else {

l=_.options.responsive.length-1;

// loop through the responsive object and splice out duplicates.
while(l>=0){

if(_.options.responsive[l].breakpoint===value[item].breakpoint){

_.options.responsive.splice(l,1);

}

l--;

}

_.options.responsive.push(value[item]);

}

}

}

if(refresh){

_.unload();
_.reinit();

}

};

Slick.prototype.setPosition=function(){

var _=this;

_.setDimensions();

_.setHeight();

if(_.options.fade===false){
_.setCSS(_.getLeft(_.currentSlide));
}else {
_.setFade();
}

_.$slider.trigger('setPosition',[_]);

};

Slick.prototype.setProps=function(){

var _=this,
bodyStyle=document.body.style;

_.positionProp=_.options.vertical===true?'top':'left';

if(_.positionProp==='top'){
_.$slider.addClass('slick-vertical');
}else {
_.$slider.removeClass('slick-vertical');
}

if(bodyStyle.WebkitTransition!==undefined||
bodyStyle.MozTransition!==undefined||
bodyStyle.msTransition!==undefined){
if(_.options.useCSS===true){
_.cssTransitions=true;
}
}

if(_.options.fade){
if(typeof _.options.zIndex==='number'){
if(_.options.zIndex<3){
_.options.zIndex=3;
}
}else {
_.options.zIndex=_.defaults.zIndex;
}
}

if(bodyStyle.OTransform!==undefined){
_.animType='OTransform';
_.transformType='-o-transform';
_.transitionType='OTransition';
if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined)_.animType=false;
}
if(bodyStyle.MozTransform!==undefined){
_.animType='MozTransform';
_.transformType='-moz-transform';
_.transitionType='MozTransition';
if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.MozPerspective===undefined)_.animType=false;
}
if(bodyStyle.webkitTransform!==undefined){
_.animType='webkitTransform';
_.transformType='-webkit-transform';
_.transitionType='webkitTransition';
if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined)_.animType=false;
}
if(bodyStyle.msTransform!==undefined){
_.animType='msTransform';
_.transformType='-ms-transform';
_.transitionType='msTransition';
if(bodyStyle.msTransform===undefined)_.animType=false;
}
if(bodyStyle.transform!==undefined&&_.animType!==false){
_.animType='transform';
_.transformType='transform';
_.transitionType='transition';
}
_.transformsEnabled=_.options.useTransform&&_.animType!==null&&_.animType!==false;
};


Slick.prototype.setSlideClasses=function(index){

var _=this,
centerOffset,allSlides,indexOffset,remainder;

allSlides=_.$slider.
find('.slick-slide').
removeClass('slick-active slick-center slick-current').
attr('aria-hidden','true');

_.$slides.
eq(index).
addClass('slick-current');

if(_.options.centerMode===true){

var evenCoef=_.options.slidesToShow%2===0?1:0;

centerOffset=Math.floor(_.options.slidesToShow/2);

if(_.options.infinite===true){

if(index>=centerOffset&&index<=_.slideCount-1-centerOffset){
_.$slides.
slice(index-centerOffset+evenCoef,index+centerOffset+1).
addClass('slick-active').
attr('aria-hidden','false');

}else {

indexOffset=_.options.slidesToShow+index;
allSlides.
slice(indexOffset-centerOffset+1+evenCoef,indexOffset+centerOffset+2).
addClass('slick-active').
attr('aria-hidden','false');

}

if(index===0){

allSlides.
eq(allSlides.length-1-_.options.slidesToShow).
addClass('slick-center');

}else if(index===_.slideCount-1){

allSlides.
eq(_.options.slidesToShow).
addClass('slick-center');

}

}

_.$slides.
eq(index).
addClass('slick-center');

}else {

if(index>=0&&index<=_.slideCount-_.options.slidesToShow){

_.$slides.
slice(index,index+_.options.slidesToShow).
addClass('slick-active').
attr('aria-hidden','false');

}else if(allSlides.length<=_.options.slidesToShow){

allSlides.
addClass('slick-active').
attr('aria-hidden','false');

}else {

remainder=_.slideCount%_.options.slidesToShow;
indexOffset=_.options.infinite===true?_.options.slidesToShow+index:index;

if(_.options.slidesToShow==_.options.slidesToScroll&&_.slideCount-index<_.options.slidesToShow){

allSlides.
slice(indexOffset-(_.options.slidesToShow-remainder),indexOffset+remainder).
addClass('slick-active').
attr('aria-hidden','false');

}else {

allSlides.
slice(indexOffset,indexOffset+_.options.slidesToShow).
addClass('slick-active').
attr('aria-hidden','false');

}

}

}

if(_.options.lazyLoad==='ondemand'||_.options.lazyLoad==='anticipated'){
_.lazyLoad();
}
};

Slick.prototype.setupInfinite=function(){

var _=this,
i,slideIndex,infiniteCount;

if(_.options.fade===true){
_.options.centerMode=false;
}

if(_.options.infinite===true&&_.options.fade===false){

slideIndex=null;

if(_.slideCount>_.options.slidesToShow){

if(_.options.centerMode===true){
infiniteCount=_.options.slidesToShow+1;
}else {
infiniteCount=_.options.slidesToShow;
}

for(i=_.slideCount;i>_.slideCount-
infiniteCount;i-=1){
slideIndex=i-1;
$(_.$slides[slideIndex]).clone(true).attr('id','').
attr('data-slick-index',slideIndex-_.slideCount).
prependTo(_.$slideTrack).addClass('slick-cloned');
}
for(i=0;i<infiniteCount+_.slideCount;i+=1){
slideIndex=i;
$(_.$slides[slideIndex]).clone(true).attr('id','').
attr('data-slick-index',slideIndex+_.slideCount).
appendTo(_.$slideTrack).addClass('slick-cloned');
}
_.$slideTrack.find('.slick-cloned').find('[id]').each(function(){
$(this).attr('id','');
});

}

}

};

Slick.prototype.interrupt=function(toggle){

var _=this;

if(!toggle){
_.autoPlay();
}
_.interrupted=toggle;

};

Slick.prototype.selectHandler=function(event){

var _=this;

var targetElement=
$(event.target).is('.slick-slide')?
$(event.target):
$(event.target).parents('.slick-slide');

var index=parseInt(targetElement.attr('data-slick-index'));

if(!index)index=0;

if(_.slideCount<=_.options.slidesToShow){

_.slideHandler(index,false,true);
return;

}

_.slideHandler(index);

};

Slick.prototype.slideHandler=function(index,sync,dontAnimate){

var targetSlide,animSlide,oldSlide,slideLeft,targetLeft=null,
_=this,navTarget;

sync=sync||false;

if(_.animating===true&&_.options.waitForAnimate===true){
return;
}

if(_.options.fade===true&&_.currentSlide===index){
return;
}

if(sync===false){
_.asNavFor(index);
}

targetSlide=index;
targetLeft=_.getLeft(targetSlide);
slideLeft=_.getLeft(_.currentSlide);

_.currentLeft=_.swipeLeft===null?slideLeft:_.swipeLeft;

if(_.options.infinite===false&&_.options.centerMode===false&&(index<0||index>_.getDotCount()*_.options.slidesToScroll)){
if(_.options.fade===false){
targetSlide=_.currentSlide;
if(dontAnimate!==true&&_.slideCount>_.options.slidesToShow){
_.animateSlide(slideLeft,function(){
_.postSlide(targetSlide);
});
}else {
_.postSlide(targetSlide);
}
}
return;
}else if(_.options.infinite===false&&_.options.centerMode===true&&(index<0||index>_.slideCount-_.options.slidesToScroll)){
if(_.options.fade===false){
targetSlide=_.currentSlide;
if(dontAnimate!==true&&_.slideCount>_.options.slidesToShow){
_.animateSlide(slideLeft,function(){
_.postSlide(targetSlide);
});
}else {
_.postSlide(targetSlide);
}
}
return;
}

if(_.options.autoplay){
clearInterval(_.autoPlayTimer);
}

if(targetSlide<0){
if(_.slideCount%_.options.slidesToScroll!==0){
animSlide=_.slideCount-_.slideCount%_.options.slidesToScroll;
}else {
animSlide=_.slideCount+targetSlide;
}
}else if(targetSlide>=_.slideCount){
if(_.slideCount%_.options.slidesToScroll!==0){
animSlide=0;
}else {
animSlide=targetSlide-_.slideCount;
}
}else {
animSlide=targetSlide;
}

_.animating=true;

_.$slider.trigger('beforeChange',[_,_.currentSlide,animSlide]);

oldSlide=_.currentSlide;
_.currentSlide=animSlide;

_.setSlideClasses(_.currentSlide);

if(_.options.asNavFor){

navTarget=_.getNavTarget();
navTarget=navTarget.slick('getSlick');

if(navTarget.slideCount<=navTarget.options.slidesToShow){
navTarget.setSlideClasses(_.currentSlide);
}

}

_.updateDots();
_.updateArrows();

if(_.options.fade===true){
if(dontAnimate!==true){

_.fadeSlideOut(oldSlide);

_.fadeSlide(animSlide,function(){
_.postSlide(animSlide);
});

}else {
_.postSlide(animSlide);
}
_.animateHeight();
return;
}

if(dontAnimate!==true&&_.slideCount>_.options.slidesToShow){
_.animateSlide(targetLeft,function(){
_.postSlide(animSlide);
});
}else {
_.postSlide(animSlide);
}

};

Slick.prototype.startLoad=function(){

var _=this;

if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){

_.$prevArrow.hide();
_.$nextArrow.hide();

}

if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){

_.$dots.hide();

}

_.$slider.addClass('slick-loading');

};

Slick.prototype.swipeDirection=function(){

var xDist,yDist,r,swipeAngle,_=this;

xDist=_.touchObject.startX-_.touchObject.curX;
yDist=_.touchObject.startY-_.touchObject.curY;
r=Math.atan2(yDist,xDist);

swipeAngle=Math.round(r*180/Math.PI);
if(swipeAngle<0){
swipeAngle=360-Math.abs(swipeAngle);
}

if(swipeAngle<=45&&swipeAngle>=0){
return _.options.rtl===false?'left':'right';
}
if(swipeAngle<=360&&swipeAngle>=315){
return _.options.rtl===false?'left':'right';
}
if(swipeAngle>=135&&swipeAngle<=225){
return _.options.rtl===false?'right':'left';
}
if(_.options.verticalSwiping===true){
if(swipeAngle>=35&&swipeAngle<=135){
return 'down';
}else {
return 'up';
}
}

return 'vertical';

};

Slick.prototype.swipeEnd=function(event){

var _=this,
slideCount,
direction;

_.dragging=false;
_.swiping=false;

if(_.scrolling){
_.scrolling=false;
return false;
}

_.interrupted=false;
_.shouldClick=_.touchObject.swipeLength>10?false:true;

if(_.touchObject.curX===undefined){
return false;
}

if(_.touchObject.edgeHit===true){
_.$slider.trigger('edge',[_,_.swipeDirection()]);
}

if(_.touchObject.swipeLength>=_.touchObject.minSwipe){

direction=_.swipeDirection();

switch(direction){

case'left':
case'down':

slideCount=
_.options.swipeToSlide?
_.checkNavigable(_.currentSlide+_.getSlideCount()):
_.currentSlide+_.getSlideCount();

_.currentDirection=0;

break;

case'right':
case'up':

slideCount=
_.options.swipeToSlide?
_.checkNavigable(_.currentSlide-_.getSlideCount()):
_.currentSlide-_.getSlideCount();

_.currentDirection=1;

break;
}




if(direction!='vertical'){

_.slideHandler(slideCount);
_.touchObject={};
_.$slider.trigger('swipe',[_,direction]);

}

}else {

if(_.touchObject.startX!==_.touchObject.curX){

_.slideHandler(_.currentSlide);
_.touchObject={};

}

}

};

Slick.prototype.swipeHandler=function(event){

var _=this;

if(_.options.swipe===false||'ontouchend'in document&&_.options.swipe===false){
return;
}else if(_.options.draggable===false&&event.type.indexOf('mouse')!==-1){
return;
}

_.touchObject.fingerCount=event.originalEvent&&event.originalEvent.touches!==undefined?
event.originalEvent.touches.length:1;

_.touchObject.minSwipe=_.listWidth/_.options.
touchThreshold;

if(_.options.verticalSwiping===true){
_.touchObject.minSwipe=_.listHeight/_.options.
touchThreshold;
}

switch(event.data.action){

case'start':
_.swipeStart(event);
break;

case'move':
_.swipeMove(event);
break;

case'end':
_.swipeEnd(event);
break;}



};

Slick.prototype.swipeMove=function(event){

var _=this,
curLeft,swipeDirection,swipeLength,positionOffset,touches,verticalSwipeLength;

touches=event.originalEvent!==undefined?event.originalEvent.touches:null;

if(!_.dragging||_.scrolling||touches&&touches.length!==1){
return false;
}

curLeft=_.getLeft(_.currentSlide);

_.touchObject.curX=touches!==undefined?touches[0].pageX:event.clientX;
_.touchObject.curY=touches!==undefined?touches[0].pageY:event.clientY;

_.touchObject.swipeLength=Math.round(Math.sqrt(
Math.pow(_.touchObject.curX-_.touchObject.startX,2)));

verticalSwipeLength=Math.round(Math.sqrt(
Math.pow(_.touchObject.curY-_.touchObject.startY,2)));

if(!_.options.verticalSwiping&&!_.swiping&&verticalSwipeLength>4){
_.scrolling=true;
return false;
}

if(_.options.verticalSwiping===true){
_.touchObject.swipeLength=verticalSwipeLength;
}

swipeDirection=_.swipeDirection();

if(event.originalEvent!==undefined&&_.touchObject.swipeLength>4){
_.swiping=true;
event.preventDefault();
}

positionOffset=(_.options.rtl===false?1:-1)*(_.touchObject.curX>_.touchObject.startX?1:-1);
if(_.options.verticalSwiping===true){
positionOffset=_.touchObject.curY>_.touchObject.startY?1:-1;
}


swipeLength=_.touchObject.swipeLength;

_.touchObject.edgeHit=false;

if(_.options.infinite===false){
if(_.currentSlide===0&&swipeDirection==='right'||_.currentSlide>=_.getDotCount()&&swipeDirection==='left'){
swipeLength=_.touchObject.swipeLength*_.options.edgeFriction;
_.touchObject.edgeHit=true;
}
}

if(_.options.vertical===false){
_.swipeLeft=curLeft+swipeLength*positionOffset;
}else {
_.swipeLeft=curLeft+swipeLength*(_.$list.height()/_.listWidth)*positionOffset;
}
if(_.options.verticalSwiping===true){
_.swipeLeft=curLeft+swipeLength*positionOffset;
}

if(_.options.fade===true||_.options.touchMove===false){
return false;
}

if(_.animating===true){
_.swipeLeft=null;
return false;
}

_.setCSS(_.swipeLeft);

};

Slick.prototype.swipeStart=function(event){

var _=this,
touches;

_.interrupted=true;

if(_.touchObject.fingerCount!==1||_.slideCount<=_.options.slidesToShow){
_.touchObject={};
return false;
}

if(event.originalEvent!==undefined&&event.originalEvent.touches!==undefined){
touches=event.originalEvent.touches[0];
}

_.touchObject.startX=_.touchObject.curX=touches!==undefined?touches.pageX:event.clientX;
_.touchObject.startY=_.touchObject.curY=touches!==undefined?touches.pageY:event.clientY;

_.dragging=true;

};

Slick.prototype.unfilterSlides=Slick.prototype.slickUnfilter=function(){

var _=this;

if(_.$slidesCache!==null){

_.unload();

_.$slideTrack.children(this.options.slide).detach();

_.$slidesCache.appendTo(_.$slideTrack);

_.reinit();

}

};

Slick.prototype.unload=function(){

var _=this;

$('.slick-cloned',_.$slider).remove();

if(_.$dots){
_.$dots.remove();
}

if(_.$prevArrow&&_.htmlExpr.test(_.options.prevArrow)){
_.$prevArrow.remove();
}

if(_.$nextArrow&&_.htmlExpr.test(_.options.nextArrow)){
_.$nextArrow.remove();
}

_.$slides.
removeClass('slick-slide slick-active slick-visible slick-current').
attr('aria-hidden','true').
css('width','');

};

Slick.prototype.unslick=function(fromBreakpoint){

var _=this;
_.$slider.trigger('unslick',[_,fromBreakpoint]);
_.destroy();

};

Slick.prototype.updateArrows=function(){

var _=this,
centerOffset;

centerOffset=Math.floor(_.options.slidesToShow/2);

if(_.options.arrows===true&&
_.slideCount>_.options.slidesToShow&&
!_.options.infinite){

_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled','false');
_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled','false');

if(_.currentSlide===0){

_.$prevArrow.addClass('slick-disabled').attr('aria-disabled','true');
_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled','false');

}else if(_.currentSlide>=_.slideCount-_.options.slidesToShow&&_.options.centerMode===false){

_.$nextArrow.addClass('slick-disabled').attr('aria-disabled','true');
_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled','false');

}else if(_.currentSlide>=_.slideCount-1&&_.options.centerMode===true){

_.$nextArrow.addClass('slick-disabled').attr('aria-disabled','true');
_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled','false');

}

}

};

Slick.prototype.updateDots=function(){

var _=this;

if(_.$dots!==null){

_.$dots.
find('li').
removeClass('slick-active').
end();

_.$dots.
find('li').
eq(Math.floor(_.currentSlide/_.options.slidesToScroll)).
addClass('slick-active');

}

};

Slick.prototype.visibility=function(){

var _=this;

if(_.options.autoplay){

if(document[_.hidden]){

_.interrupted=true;

}else {

_.interrupted=false;

}

}

};

$.fn.slick=function(){
var _=this,
opt=arguments[0],
args=Array.prototype.slice.call(arguments,1),
l=_.length,
i,
ret;
for(i=0;i<l;i++){
if(typeof opt=='object'||typeof opt=='undefined')
_[i].slick=new Slick(_[i],opt);else

ret=_[i].slick[opt].apply(_[i].slick,args);
if(typeof ret!='undefined')return ret;
}
return _;
};

});


/***/},

/***/"./node_modules/tealight/dist/tealight.es.js":
/*!***************************************************!*\
  !*** ./node_modules/tealight/dist/tealight.es.js ***!
  \***************************************************/
/*! exports provided: default */
/***/function node_modulesTealightDistTealightEsJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var is_dom_node__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! is-dom-node */"./node_modules/is-dom-node/dist/is-dom-node.es.js");
/* harmony import */var is_dom_node_list__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! is-dom-node-list */"./node_modules/is-dom-node-list/dist/is-dom-node-list.es.js");
/*! @license Tealight v0.3.6

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/



function tealight(target,context){
if(context===void 0)context=document;

if(target instanceof Array){return target.filter(is_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"]);}
if(Object(is_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"])(target)){return [target];}
if(Object(is_dom_node_list__WEBPACK_IMPORTED_MODULE_1__["default"])(target)){return Array.prototype.slice.call(target);}
if(typeof target==="string"){
try{
var query=context.querySelectorAll(target);
return Array.prototype.slice.call(query);
}catch(err){
return [];
}
}
return [];
}

/* harmony default export */__webpack_exports__["default"]=tealight;


/***/},

/***/"./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/function node_modulesWebpackBuildinAmdOptionsJs(module,exports){

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__){/* globals __webpack_amd_options__ */
module.exports=__webpack_amd_options__;

/* WEBPACK VAR INJECTION */}).call(this,{});

/***/},

/***/"./node_modules/what-input/dist/what-input.js":
/*!****************************************************!*\
  !*** ./node_modules/what-input/dist/what-input.js ***!
  \****************************************************/
/*! no static exports found */
/***/function node_modulesWhatInputDistWhatInputJs(module,exports,__webpack_require__){

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.2.7
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root,factory){
module.exports=factory();
})(this,function(){
return(/******/function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};

/******/ // The require function
/******/function __webpack_require__(moduleId){

/******/ // Check if module is in cache
/******/if(installedModules[moduleId])
/******/return installedModules[moduleId].exports;

/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={
/******/exports:{},
/******/id:moduleId,
/******/loaded:false
/******/};

/******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);

/******/ // Flag the module as loaded
/******/module.loaded=true;

/******/ // Return the exports of the module
/******/return module.exports;
/******/}


/******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;

/******/ // expose the module cache
/******/__webpack_require__.c=installedModules;

/******/ // __webpack_public_path__
/******/__webpack_require__.p="";

/******/ // Load entry module and return exports
/******/return __webpack_require__(0);
/******/}(
/************************************************************************/
/******/[
/* 0 */
/***/function(module,exports){

module.exports=function(){
/*
	   * bail out if there is no document or window
	   * (i.e. in a node/non-DOM environment)
	   *
	   * Return a stubbed API instead
	   */
if(typeof document==='undefined'||typeof window==='undefined'){
return {
// always return "initial" because no interaction will ever be detected
ask:function ask(){
return 'initial';
},

// always return null
element:function element(){
return null;
},

// no-op
ignoreKeys:function ignoreKeys(){},

// no-op
specificKeys:function specificKeys(){},

// no-op
registerOnChange:function registerOnChange(){},

// no-op
unRegisterOnChange:function unRegisterOnChange(){}};

}

/*
	   * variables
	   */

// cache document.documentElement
var docElem=document.documentElement;

// currently focused dom element
var currentElement=null;

// last used input type
var currentInput='initial';

// last used input intent
var currentIntent=currentInput;

// UNIX timestamp of current event
var currentTimestamp=Date.now();

// check for a `data-whatpersist` attribute on either the `html` or `body` elements, defaults to `true`
var shouldPersist='false';

// form input types
var formInputs=['button','input','select','textarea'];

// empty array for holding callback functions
var functionList=[];

// list of modifier keys commonly used with the mouse and
// can be safely ignored to prevent false keyboard detection
var ignoreMap=[16,// shift
17,// control
18,// alt
91,// Windows key / left Apple cmd
93// Windows menu / right Apple cmd
];

var specificMap=[];

// mapping of events to input types
var inputMap={
keydown:'keyboard',
keyup:'keyboard',
mousedown:'mouse',
mousemove:'mouse',
MSPointerDown:'pointer',
MSPointerMove:'pointer',
pointerdown:'pointer',
pointermove:'pointer',
touchstart:'touch',
touchend:'touch'

// boolean: true if the page is being scrolled
};var isScrolling=false;

// store current mouse position
var mousePos={
x:null,
y:null

// map of IE 10 pointer events
};var pointerMap={
2:'touch',
3:'touch',// treat pen like touch
4:'mouse'

// check support for passive event listeners
};var supportsPassive=false;

try{
var opts=Object.defineProperty({},'passive',{
get:function get(){
supportsPassive=true;
}});


window.addEventListener('test',null,opts);
}catch(e){}
// fail silently


/*
	   * set up
	   */

var setUp=function setUp(){
// add correct mouse wheel event mapping to `inputMap`
inputMap[detectWheel()]='mouse';

addListeners();
};

/*
	   * events
	   */

var addListeners=function addListeners(){
// `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
// can only demonstrate potential, but not actual, interaction
// and are treated separately
var options=supportsPassive?{passive:true}:false;

document.addEventListener('DOMContentLoaded',setPersist);

// pointer events (mouse, pen, touch)
if(window.PointerEvent){
window.addEventListener('pointerdown',setInput);
window.addEventListener('pointermove',setIntent);
}else if(window.MSPointerEvent){
window.addEventListener('MSPointerDown',setInput);
window.addEventListener('MSPointerMove',setIntent);
}else {
// mouse events
window.addEventListener('mousedown',setInput);
window.addEventListener('mousemove',setIntent);

// touch events
if('ontouchstart'in window){
window.addEventListener('touchstart',setInput,options);
window.addEventListener('touchend',setInput);
}
}

// mouse wheel
window.addEventListener(detectWheel(),setIntent,options);

// keyboard events
window.addEventListener('keydown',setInput);
window.addEventListener('keyup',setInput);

// focus events
window.addEventListener('focusin',setElement);
window.addEventListener('focusout',clearElement);
};

// checks if input persistence should happen and
// get saved state from session storage if true (defaults to `false`)
var setPersist=function setPersist(){
shouldPersist=!(docElem.getAttribute('data-whatpersist')||document.body.getAttribute('data-whatpersist')==='false');

if(shouldPersist){
// check for session variables and use if available
try{
if(window.sessionStorage.getItem('what-input')){
currentInput=window.sessionStorage.getItem('what-input');
}

if(window.sessionStorage.getItem('what-intent')){
currentIntent=window.sessionStorage.getItem('what-intent');
}
}catch(e){
// fail silently
}
}

// always run these so at least `initial` state is set
doUpdate('input');
doUpdate('intent');
};

// checks conditions before updating new input
var setInput=function setInput(event){
var eventKey=event.which;
var value=inputMap[event.type];

if(value==='pointer'){
value=pointerType(event);
}

var ignoreMatch=!specificMap.length&&ignoreMap.indexOf(eventKey)===-1;

var specificMatch=specificMap.length&&specificMap.indexOf(eventKey)!==-1;

var shouldUpdate=value==='keyboard'&&eventKey&&(ignoreMatch||specificMatch)||value==='mouse'||value==='touch';

// prevent touch detection from being overridden by event execution order
if(validateTouch(value)){
shouldUpdate=false;
}

if(shouldUpdate&&currentInput!==value){
currentInput=value;

persistInput('input',currentInput);
doUpdate('input');
}

if(shouldUpdate&&currentIntent!==value){
// preserve intent for keyboard interaction with form fields
var activeElem=document.activeElement;
var notFormInput=activeElem&&activeElem.nodeName&&(formInputs.indexOf(activeElem.nodeName.toLowerCase())===-1||activeElem.nodeName.toLowerCase()==='button'&&!checkClosest(activeElem,'form'));

if(notFormInput){
currentIntent=value;

persistInput('intent',currentIntent);
doUpdate('intent');
}
}
};

// updates the doc and `inputTypes` array with new input
var doUpdate=function doUpdate(which){
docElem.setAttribute('data-what'+which,which==='input'?currentInput:currentIntent);

fireFunctions(which);
};

// updates input intent for `mousemove` and `pointermove`
var setIntent=function setIntent(event){
var value=inputMap[event.type];

if(value==='pointer'){
value=pointerType(event);
}

// test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove
detectScrolling(event);

// only execute if scrolling isn't happening
if((!isScrolling&&!validateTouch(value)||isScrolling&&event.type==='wheel'||event.type==='mousewheel'||event.type==='DOMMouseScroll')&&currentIntent!==value){
currentIntent=value;

persistInput('intent',currentIntent);
doUpdate('intent');
}
};

var setElement=function setElement(event){
if(!event.target.nodeName){
// If nodeName is undefined, clear the element
// This can happen if click inside an <svg> element.
clearElement();
return;
}

currentElement=event.target.nodeName.toLowerCase();
docElem.setAttribute('data-whatelement',currentElement);

if(event.target.classList&&event.target.classList.length){
docElem.setAttribute('data-whatclasses',event.target.classList.toString().replace(' ',','));
}
};

var clearElement=function clearElement(){
currentElement=null;

docElem.removeAttribute('data-whatelement');
docElem.removeAttribute('data-whatclasses');
};

var persistInput=function persistInput(which,value){
if(shouldPersist){
try{
window.sessionStorage.setItem('what-'+which,value);
}catch(e){
// fail silently
}
}
};

/*
	   * utilities
	   */

var pointerType=function pointerType(event){
if(typeof event.pointerType==='number'){
return pointerMap[event.pointerType];
}else {
// treat pen like touch
return event.pointerType==='pen'?'touch':event.pointerType;
}
};

// prevent touch detection from being overridden by event execution order
var validateTouch=function validateTouch(value){
var timestamp=Date.now();

var touchIsValid=value==='mouse'&&currentInput==='touch'&&timestamp-currentTimestamp<200;

currentTimestamp=timestamp;

return touchIsValid;
};

// detect version of mouse wheel event to use
// via https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
var detectWheel=function detectWheel(){
var wheelType=null;

// Modern browsers support "wheel"
if('onwheel'in document.createElement('div')){
wheelType='wheel';
}else {
// Webkit and IE support at least "mousewheel"
// or assume that remaining browsers are older Firefox
wheelType=document.onmousewheel!==undefined?'mousewheel':'DOMMouseScroll';
}

return wheelType;
};

// runs callback functions
var fireFunctions=function fireFunctions(type){
for(var i=0,len=functionList.length;i<len;i++){
if(functionList[i].type===type){
functionList[i].fn.call(undefined,type==='input'?currentInput:currentIntent);
}
}
};

// finds matching element in an object
var objPos=function objPos(match){
for(var i=0,len=functionList.length;i<len;i++){
if(functionList[i].fn===match){
return i;
}
}
};

var detectScrolling=function detectScrolling(event){
if(mousePos.x!==event.screenX||mousePos.y!==event.screenY){
isScrolling=false;

mousePos.x=event.screenX;
mousePos.y=event.screenY;
}else {
isScrolling=true;
}
};

// manual version of `closest()`
var checkClosest=function checkClosest(elem,tag){
var ElementPrototype=window.Element.prototype;

if(!ElementPrototype.matches){
ElementPrototype.matches=ElementPrototype.msMatchesSelector||ElementPrototype.webkitMatchesSelector;
}

if(!ElementPrototype.closest){
do{
if(elem.matches(tag)){
return elem;
}

elem=elem.parentElement||elem.parentNode;
}while(elem!==null&&elem.nodeType===1);

return null;
}else {
return elem.closest(tag);
}
};

/*
	   * init
	   */

// don't start script unless browser cuts the mustard
// (also passes if polyfills are used)
if('addEventListener'in window&&Array.prototype.indexOf){
setUp();
}

/*
	   * api
	   */

return {
// returns string: the current input type
// opt: 'intent'|'input'
// 'input' (default): returns the same value as the `data-whatinput` attribute
// 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
ask:function ask(opt){
return opt==='intent'?currentIntent:currentInput;
},

// returns string: the currently focused element or null
element:function element(){
return currentElement;
},

// overwrites ignored keys with provided array
ignoreKeys:function ignoreKeys(arr){
ignoreMap=arr;
},

// overwrites specific char keys to update on
specificKeys:function specificKeys(arr){
specificMap=arr;
},

// attach functions to input and intent "events"
// funct: function to fire on change
// eventType: 'input'|'intent'
registerOnChange:function registerOnChange(fn,eventType){
functionList.push({
fn:fn,
type:eventType||'input'});

},

unRegisterOnChange:function unRegisterOnChange(fn){
var position=objPos(fn);

if(position||position===0){
functionList.splice(position,1);
}
},

clearStorage:function clearStorage(){
window.sessionStorage.clear();
}};

}();

/***/}
/******/]));
});

/***/}}]);

}());

//# sourceMappingURL=vendor.js.map