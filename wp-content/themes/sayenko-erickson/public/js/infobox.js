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

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
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

var defineProperty = Object.defineProperty;
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

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
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

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$1 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["/js/infobox"],{

/***/"./assets/js/infobox.js":
/*!******************************!*\
  !*** ./assets/js/infobox.js ***!
  \******************************/
/*! no exports provided */
/***/function assetsJsInfoboxJs(module,__webpack_exports__,__webpack_require__){
__webpack_require__.r(__webpack_exports__);
/* harmony import */var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! core-js/modules/es.array.filter */"./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! core-js/modules/es.array.index-of */"./node_modules/core-js/modules/es.array.index-of.js");



/**
 * @name InfoBox
 * @version 1.1.19 [April 6, 2018]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */

/*global google */

/**
 * @name InfoBoxOptions
 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
 * @property {boolean} [disableAutoPan=false] Disable auto-pan on <tt>open</tt>.
 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
 *  to the map pixel corresponding to <tt>position</tt>.
 * @property {LatLng} position The geographic location at which to display the InfoBox.
 * @property {number} zIndex The CSS z-index style value for the InfoBox.
 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
 * @property {string} [boxClass="infoBox"] The name of the CSS class defining the styles for the InfoBox container.
 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the InfoBox. Style values defined here override those that may
 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the InfoBox before the new style values are applied.
 * @property {string} closeBoxMargin The CSS margin style value for the close box.
 *  The default is "2px" (a 2-pixel margin on all sides).
 * @property {string} closeBoxTitle The tool tip for the close box. The default is " Close ".
 * @property {string} closeBoxURL The URL of the image representing the close box.
 *  Note: The default is the URL for Google's standard close box.
 *  Set this property to "" if no close box is required.
 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
 *  map edge after an auto-pan.
 * @property {boolean} [isHidden=false] Hide the InfoBox on <tt>open</tt>.
 *  [Deprecated in favor of the <tt>visible</tt> property.]
 * @property {boolean} [visible=true] Show the InfoBox on <tt>open</tt>.
 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
 */

/**
 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
 *  Call <tt>InfoBox.open</tt> to add the box to the map.
 * @constructor
 * @param {InfoBoxOptions} [opt_opts]
 */
function InfoBox(opt_opts){
opt_opts=opt_opts||{};
google.maps.OverlayView.apply(this,arguments);// Standard options (in common with google.maps.InfoWindow):
//

this.content_=opt_opts.content||"";
this.disableAutoPan_=opt_opts.disableAutoPan||false;
this.maxWidth_=opt_opts.maxWidth||0;
this.pixelOffset_=opt_opts.pixelOffset||new google.maps.Size(0,0);
this.position_=opt_opts.position||new google.maps.LatLng(0,0);
this.zIndex_=opt_opts.zIndex||null;// Additional options (unique to InfoBox):
//

this.boxClass_=opt_opts.boxClass||"infoBox";
this.boxStyle_=opt_opts.boxStyle||{};
this.closeBoxMargin_=opt_opts.closeBoxMargin||"2px";
this.closeBoxURL_=opt_opts.closeBoxURL||"//www.google.com/intl/en_us/mapfiles/close.gif";

if(opt_opts.closeBoxURL===""){
this.closeBoxURL_="";
}

this.closeBoxTitle_=opt_opts.closeBoxTitle||" Close ";
this.infoBoxClearance_=opt_opts.infoBoxClearance||new google.maps.Size(1,1);

if(typeof opt_opts.visible==="undefined"){
if(typeof opt_opts.isHidden==="undefined"){
opt_opts.visible=true;
}else {
opt_opts.visible=!opt_opts.isHidden;
}
}

this.isHidden_=!opt_opts.visible;
this.alignBottom_=opt_opts.alignBottom||false;
this.pane_=opt_opts.pane||"floatPane";
this.enableEventPropagation_=opt_opts.enableEventPropagation||false;
this.div_=null;
this.closeListener_=null;
this.moveListener_=null;
this.contextListener_=null;
this.eventListeners_=null;
this.fixedWidthSet_=null;
}
/* InfoBox extends OverlayView in the Google Maps API v3.
 */


InfoBox.prototype=new google.maps.OverlayView();
/**
 * Creates the DIV representing the InfoBox.
 * @private
 */

InfoBox.prototype.createInfoBoxDiv_=function(){
var i;
var events;
var bw;
var me=this;// This handler prevents an event in the InfoBox from being passed on to the map.
//

var cancelHandler=function cancelHandler(e){
e.cancelBubble=true;

if(e.stopPropagation){
e.stopPropagation();
}
};// This handler ignores the current event in the InfoBox and conditionally prevents
// the event from being passed on to the map. It is used for the contextmenu event.
//


var ignoreHandler=function ignoreHandler(e){
e.returnValue=false;

if(e.preventDefault){
e.preventDefault();
}

if(!me.enableEventPropagation_){
cancelHandler(e);
}
};

if(!this.div_){
this.div_=document.createElement("div");
this.setBoxStyle_();

if(typeof this.content_.nodeType==="undefined"){
this.div_.innerHTML=this.getCloseBoxImg_()+this.content_;
}else {
this.div_.innerHTML=this.getCloseBoxImg_();
this.div_.appendChild(this.content_);
}// Add the InfoBox DIV to the DOM


this.getPanes()[this.pane_].appendChild(this.div_);
this.addClickHandler_();

if(this.div_.style.width){
this.fixedWidthSet_=true;
}else {
if(this.maxWidth_!==0&&this.div_.offsetWidth>this.maxWidth_){
this.div_.style.width=this.maxWidth_;
this.div_.style.overflow="auto";
this.fixedWidthSet_=true;
}else {
// The following code is needed to overcome problems with MSIE
bw=this.getBoxWidths_();
this.div_.style.width=this.div_.offsetWidth-bw.left-bw.right+"px";
this.fixedWidthSet_=false;
}
}

this.panBox_(this.disableAutoPan_);

if(!this.enableEventPropagation_){
this.eventListeners_=[];// Cancel event propagation.
//
// Note: mousemove not included (to resolve Issue 152)

events=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"];

for(i=0;i<events.length;i++){
this.eventListeners_.push(google.maps.event.addDomListener(this.div_,events[i],cancelHandler));
}// Workaround for Google bug that causes the cursor to change to a pointer
// when the mouse moves over a marker underneath InfoBox.


this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(e){
this.style.cursor="default";
}));
}

this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",ignoreHandler);
/**
     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
     * @name InfoBox#domready
     * @event
     */

google.maps.event.trigger(this,"domready");
}
};
/**
 * Returns the HTML <IMG> tag for the close box.
 * @private
 */


InfoBox.prototype.getCloseBoxImg_=function(){
var img="";

if(this.closeBoxURL_!==""){
img="<img";
img+=" src='"+this.closeBoxURL_+"'";
img+=" align=right";// Do this because Opera chokes on style='float: right;'

img+=" title='"+this.closeBoxTitle_+"'";
img+=" style='";
img+=" position: relative;";// Required by MSIE

img+=" cursor: pointer;";
img+=" margin: "+this.closeBoxMargin_+";";
img+="'>";
}

return img;
};
/**
 * Adds the click handler to the InfoBox close box.
 * @private
 */


InfoBox.prototype.addClickHandler_=function(){
var closeBox;

if(this.closeBoxURL_!==""){
closeBox=this.div_.firstChild;
this.closeListener_=google.maps.event.addDomListener(closeBox,"click",this.getCloseClickHandler_());
}else {
this.closeListener_=null;
}
};
/**
 * Returns the function to call when the user clicks the close box of an InfoBox.
 * @private
 */


InfoBox.prototype.getCloseClickHandler_=function(){
var me=this;
return function(e){
// 1.0.3 fix: Always prevent propagation of a close box click to the map:
e.cancelBubble=true;

if(e.stopPropagation){
e.stopPropagation();
}
/**
     * This event is fired when the InfoBox's close box is clicked.
     * @name InfoBox#closeclick
     * @event
     */


google.maps.event.trigger(me,"closeclick");
me.close();
};
};
/**
 * Pans the map so that the InfoBox appears entirely within the map's visible area.
 * @private
 */


InfoBox.prototype.panBox_=function(disablePan){
var map;
var xOffset=0,
yOffset=0;

if(!disablePan){
map=this.getMap();

if(map instanceof google.maps.Map){
// Only pan if attached to map, not panorama
if(!map.getBounds().contains(this.position_)){
// Marker not in visible area of map, so set center
// of map to the marker position first.
map.setCenter(this.position_);
}

var iwOffsetX=this.pixelOffset_.width;
var iwOffsetY=this.pixelOffset_.height;
var iwWidth=this.div_.offsetWidth;
var iwHeight=this.div_.offsetHeight;
var padX=this.infoBoxClearance_.width;
var padY=this.infoBoxClearance_.height;

if(map.panToBounds.length==2){
// Using projection.fromLatLngToContainerPixel to compute the infowindow position
// does not work correctly anymore for JS Maps API v3.32 and above if there is a
// previous synchronous call that causes the map to animate (e.g. setCenter when
// the position is not within bounds). Hence, we are using panToBounds with
// padding instead, which works synchronously.
var padding={
left:0,
right:0,
top:0,
bottom:0};

padding.left=-iwOffsetX+padX;
padding.right=iwOffsetX+iwWidth+padX;

if(this.alignBottom_){
padding.top=-iwOffsetY+padY+iwHeight;
padding.bottom=iwOffsetY+padY;
}else {
padding.top=-iwOffsetY+padY;
padding.bottom=iwOffsetY+iwHeight+padY;
}

map.panToBounds(new google.maps.LatLngBounds(this.position_),padding);
}else {
var mapDiv=map.getDiv();
var mapWidth=mapDiv.offsetWidth;
var mapHeight=mapDiv.offsetHeight;
var pixPosition=this.getProjection().fromLatLngToContainerPixel(this.position_);

if(pixPosition.x<-iwOffsetX+padX){
xOffset=pixPosition.x+iwOffsetX-padX;
}else if(pixPosition.x+iwWidth+iwOffsetX+padX>mapWidth){
xOffset=pixPosition.x+iwWidth+iwOffsetX+padX-mapWidth;
}

if(this.alignBottom_){
if(pixPosition.y<-iwOffsetY+padY+iwHeight){
yOffset=pixPosition.y+iwOffsetY-padY-iwHeight;
}else if(pixPosition.y+iwOffsetY+padY>mapHeight){
yOffset=pixPosition.y+iwOffsetY+padY-mapHeight;
}
}else {
if(pixPosition.y<-iwOffsetY+padY){
yOffset=pixPosition.y+iwOffsetY-padY;
}else if(pixPosition.y+iwHeight+iwOffsetY+padY>mapHeight){
yOffset=pixPosition.y+iwHeight+iwOffsetY+padY-mapHeight;
}
}

if(!(xOffset===0&&yOffset===0)){
// Move the map to the shifted center.
//
var c=map.getCenter();
map.panBy(xOffset,yOffset);
}
}
}
}
};
/**
 * Sets the style of the InfoBox by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */


InfoBox.prototype.setBoxStyle_=function(){
var i,boxStyle;

if(this.div_){
// Apply style values from the style sheet defined in the boxClass parameter:
this.div_.className=this.boxClass_;// Clear existing inline style values:

this.div_.style.cssText="";// Apply style values defined in the boxStyle parameter:

boxStyle=this.boxStyle_;

for(i in boxStyle){
if(boxStyle.hasOwnProperty(i)){
this.div_.style[i]=boxStyle[i];
}
}// Fix for iOS disappearing InfoBox problem.
// See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
// Required: use "matrix" technique to specify transforms in order to avoid this bug.


if(typeof this.div_.style.WebkitTransform==="undefined"||this.div_.style.WebkitTransform.indexOf("translateZ")===-1&&this.div_.style.WebkitTransform.indexOf("matrix")===-1){
this.div_.style.WebkitTransform="translateZ(0)";
}// Fix up opacity style for benefit of MSIE:
//


if(typeof this.div_.style.opacity!=="undefined"&&this.div_.style.opacity!==""){
// See http://www.quirksmode.org/css/opacity.html
this.div_.style.MsFilter="\"progid:DXImageTransform.Microsoft.Alpha(Opacity="+this.div_.style.opacity*100+")\"";
this.div_.style.filter="alpha(opacity="+this.div_.style.opacity*100+")";
}// Apply required styles:
//


this.div_.style.position="absolute";
this.div_.style.visibility='hidden';

if(this.zIndex_!==null){
this.div_.style.zIndex=this.zIndex_;
}
}
};
/**
 * Get the widths of the borders of the InfoBox.
 * @private
 * @return {Object} widths object (top, bottom left, right)
 */


InfoBox.prototype.getBoxWidths_=function(){
var computedStyle;
var bw={
top:0,
bottom:0,
left:0,
right:0};

var box=this.div_;

if(document.defaultView&&document.defaultView.getComputedStyle){
computedStyle=box.ownerDocument.defaultView.getComputedStyle(box,"");

if(computedStyle){
// The computed styles are always in pixel units (good!)
bw.top=parseInt(computedStyle.borderTopWidth,10)||0;
bw.bottom=parseInt(computedStyle.borderBottomWidth,10)||0;
bw.left=parseInt(computedStyle.borderLeftWidth,10)||0;
bw.right=parseInt(computedStyle.borderRightWidth,10)||0;
}
}else if(document.documentElement.currentStyle){
// MSIE
if(box.currentStyle){
// The current styles may not be in pixel units, but assume they are (bad!)
bw.top=parseInt(box.currentStyle.borderTopWidth,10)||0;
bw.bottom=parseInt(box.currentStyle.borderBottomWidth,10)||0;
bw.left=parseInt(box.currentStyle.borderLeftWidth,10)||0;
bw.right=parseInt(box.currentStyle.borderRightWidth,10)||0;
}
}

return bw;
};
/**
 * Invoked when <tt>close</tt> is called. Do not call it directly.
 */


InfoBox.prototype.onRemove=function(){
if(this.div_){
this.div_.parentNode.removeChild(this.div_);
this.div_=null;
}
};
/**
 * Draws the InfoBox based on the current map projection and zoom level.
 */


InfoBox.prototype.draw=function(){
this.createInfoBoxDiv_();
var pixPosition=this.getProjection().fromLatLngToDivPixel(this.position_);
this.div_.style.left=pixPosition.x+this.pixelOffset_.width+"px";

if(this.alignBottom_){
this.div_.style.bottom=-(pixPosition.y+this.pixelOffset_.height)+"px";
}else {
this.div_.style.top=pixPosition.y+this.pixelOffset_.height+"px";
}

if(this.isHidden_){
this.div_.style.visibility="hidden";
}else {
this.div_.style.visibility="visible";
}
};
/**
 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
 *  <tt>closeBoxMargin</tt>, <tt>closeBoxTitle</tt>, <tt>closeBoxURL</tt>, and
 *  <tt>enableEventPropagation</tt> properties have no affect until the current
 *  InfoBox is <tt>close</tt>d and a new one is <tt>open</tt>ed.
 * @param {InfoBoxOptions} opt_opts
 */


InfoBox.prototype.setOptions=function(opt_opts){
if(typeof opt_opts.boxClass!=="undefined"){
// Must be first
this.boxClass_=opt_opts.boxClass;
this.setBoxStyle_();
}

if(typeof opt_opts.boxStyle!=="undefined"){
// Must be second
this.boxStyle_=opt_opts.boxStyle;
this.setBoxStyle_();
}

if(typeof opt_opts.content!=="undefined"){
this.setContent(opt_opts.content);
}

if(typeof opt_opts.disableAutoPan!=="undefined"){
this.disableAutoPan_=opt_opts.disableAutoPan;
}

if(typeof opt_opts.maxWidth!=="undefined"){
this.maxWidth_=opt_opts.maxWidth;
}

if(typeof opt_opts.pixelOffset!=="undefined"){
this.pixelOffset_=opt_opts.pixelOffset;
}

if(typeof opt_opts.alignBottom!=="undefined"){
this.alignBottom_=opt_opts.alignBottom;
}

if(typeof opt_opts.position!=="undefined"){
this.setPosition(opt_opts.position);
}

if(typeof opt_opts.zIndex!=="undefined"){
this.setZIndex(opt_opts.zIndex);
}

if(typeof opt_opts.closeBoxMargin!=="undefined"){
this.closeBoxMargin_=opt_opts.closeBoxMargin;
}

if(typeof opt_opts.closeBoxURL!=="undefined"){
this.closeBoxURL_=opt_opts.closeBoxURL;
}

if(typeof opt_opts.closeBoxTitle!=="undefined"){
this.closeBoxTitle_=opt_opts.closeBoxTitle;
}

if(typeof opt_opts.infoBoxClearance!=="undefined"){
this.infoBoxClearance_=opt_opts.infoBoxClearance;
}

if(typeof opt_opts.isHidden!=="undefined"){
this.isHidden_=opt_opts.isHidden;
}

if(typeof opt_opts.visible!=="undefined"){
this.isHidden_=!opt_opts.visible;
}

if(typeof opt_opts.enableEventPropagation!=="undefined"){
this.enableEventPropagation_=opt_opts.enableEventPropagation;
}

if(this.div_){
this.draw();
}
};
/**
 * Sets the content of the InfoBox.
 *  The content can be plain text or an HTML DOM node.
 * @param {string|Node} content
 */


InfoBox.prototype.setContent=function(content){
this.content_=content;

if(this.div_){
if(this.closeListener_){
google.maps.event.removeListener(this.closeListener_);
this.closeListener_=null;
}// Odd code required to make things work with MSIE.
//


if(!this.fixedWidthSet_){
this.div_.style.width="";
}

if(typeof content.nodeType==="undefined"){
this.div_.innerHTML=this.getCloseBoxImg_()+content;
}else {
this.div_.innerHTML=this.getCloseBoxImg_();
this.div_.appendChild(content);
}// Perverse code required to make things work with MSIE.
// (Ensures the close box does, in fact, float to the right.)
//


if(!this.fixedWidthSet_){
this.div_.style.width=this.div_.offsetWidth+"px";

if(typeof content.nodeType==="undefined"){
this.div_.innerHTML=this.getCloseBoxImg_()+content;
}else {
this.div_.innerHTML=this.getCloseBoxImg_();
this.div_.appendChild(content);
}
}

this.addClickHandler_();
}
/**
   * This event is fired when the content of the InfoBox changes.
   * @name InfoBox#content_changed
   * @event
   */


google.maps.event.trigger(this,"content_changed");
};
/**
 * Sets the geographic location of the InfoBox.
 * @param {LatLng} latlng
 */


InfoBox.prototype.setPosition=function(latlng){
this.position_=latlng;

if(this.div_){
this.draw();
}
/**
   * This event is fired when the position of the InfoBox changes.
   * @name InfoBox#position_changed
   * @event
   */


google.maps.event.trigger(this,"position_changed");
};
/**
 * Sets the zIndex style for the InfoBox.
 * @param {number} index
 */


InfoBox.prototype.setZIndex=function(index){
this.zIndex_=index;

if(this.div_){
this.div_.style.zIndex=index;
}
/**
   * This event is fired when the zIndex of the InfoBox changes.
   * @name InfoBox#zindex_changed
   * @event
   */


google.maps.event.trigger(this,"zindex_changed");
};
/**
 * Sets the visibility of the InfoBox.
 * @param {boolean} isVisible
 */


InfoBox.prototype.setVisible=function(isVisible){
this.isHidden_=!isVisible;

if(this.div_){
this.div_.style.visibility=this.isHidden_?"hidden":"visible";
}
};
/**
 * Returns the content of the InfoBox.
 * @returns {string}
 */


InfoBox.prototype.getContent=function(){
return this.content_;
};
/**
 * Returns the geographic location of the InfoBox.
 * @returns {LatLng}
 */


InfoBox.prototype.getPosition=function(){
return this.position_;
};
/**
 * Returns the zIndex for the InfoBox.
 * @returns {number}
 */


InfoBox.prototype.getZIndex=function(){
return this.zIndex_;
};
/**
 * Returns a flag indicating whether the InfoBox is visible.
 * @returns {boolean}
 */


InfoBox.prototype.getVisible=function(){
var isVisible;

if(typeof this.getMap()==="undefined"||this.getMap()===null){
isVisible=false;
}else {
isVisible=!this.isHidden_;
}

return isVisible;
};
/**
 * Returns the width of the InfoBox in pixels.
 * @returns {number}
 */


InfoBox.prototype.getWidth=function(){
var width=null;

if(this.div_){
width=this.div_.offsetWidth;
}

return width;
};
/**
 * Returns the height of the InfoBox in pixels.
 * @returns {number}
 */


InfoBox.prototype.getHeight=function(){
var height=null;

if(this.div_){
height=this.div_.offsetHeight;
}

return height;
};
/**
 * Shows the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */


InfoBox.prototype.show=function(){
this.isHidden_=false;

if(this.div_){
this.div_.style.visibility="visible";
}
};
/**
 * Hides the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */


InfoBox.prototype.hide=function(){
this.isHidden_=true;

if(this.div_){
this.div_.style.visibility="hidden";
}
};
/**
 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
 *  anchor is dragged to a new location, the InfoBox moves as well.
 * @param {Map|StreetViewPanorama} map
 * @param {MVCObject} [anchor]
 */


InfoBox.prototype.open=function(map,anchor){
var me=this;

if(anchor){
this.setPosition(anchor.getPosition());// BUG FIX 2/17/2018: needed for v3.32

this.moveListener_=google.maps.event.addListener(anchor,"position_changed",function(){
me.setPosition(this.getPosition());
});
}

this.setMap(map);

if(this.div_){
this.panBox_(this.disableAutoPan_);// BUG FIX 2/17/2018: add missing parameter
}
};
/**
 * Removes the InfoBox from the map.
 */


InfoBox.prototype.close=function(){
var i;

if(this.closeListener_){
google.maps.event.removeListener(this.closeListener_);
this.closeListener_=null;
}

if(this.eventListeners_){
for(i=0;i<this.eventListeners_.length;i++){
google.maps.event.removeListener(this.eventListeners_[i]);
}

this.eventListeners_=null;
}

if(this.moveListener_){
google.maps.event.removeListener(this.moveListener_);
this.moveListener_=null;
}

if(this.contextListener_){
google.maps.event.removeListener(this.contextListener_);
this.contextListener_=null;
}

this.setMap(null);
};

/***/},

/***/2:
/*!************************************!*\
  !*** multi ./assets/js/infobox.js ***!
  \************************************/
/*! no static exports found */
/***/function _(module,exports,__webpack_require__){

module.exports=__webpack_require__(/*! /Users/kylerumble/Sites/ericksoninc/wp-content/themes/sayenko-erickson/assets/js/infobox.js */"./assets/js/infobox.js");


/***/}},

[[2,"/js/manifest","/js/vendor"]]]);

}());

//# sourceMappingURL=infobox.js.map