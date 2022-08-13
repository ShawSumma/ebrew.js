/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/global.css":
/*!***************************!*\
  !*** ./source/global.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/rete-connection-plugin/build/connection-plugin.esm.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rete-connection-plugin/build/connection-plugin.esm.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "defaultPath": () => (/* binding */ defaultPath)
/* harmony export */ });
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/*!
* rete-connection-plugin v0.9.0 
* (c) 2019 Vitaliy Stoliarov 
* Released under the MIT license.
*/
function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function toTrainCase(str) {
  return str.toLowerCase().replace(/ /g, '-');
}

function getMapItemRecursively(map, el) {
  return map.get(el) || (el.parentElement ? getMapItemRecursively(map, el.parentElement) : null);
}
function defaultPath(points, curvature) {
  var _points = _slicedToArray(points, 4),
      x1 = _points[0],
      y1 = _points[1],
      x2 = _points[2],
      y2 = _points[3];

  var hx1 = x1 + Math.abs(x2 - x1) * curvature;
  var hx2 = x2 - Math.abs(x2 - x1) * curvature;
  return "M ".concat(x1, " ").concat(y1, " C ").concat(hx1, " ").concat(y1, " ").concat(hx2, " ").concat(y2, " ").concat(x2, " ").concat(y2);
}
function renderPathData(emitter, points, connection) {
  var data = {
    points: points,
    connection: connection,
    d: ''
  };
  emitter.trigger('connectionpath', data);
  return data.d || defaultPath(points, 0.4);
}
function updateConnection(_ref) {
  var el = _ref.el,
      d = _ref.d;
  var path = el.querySelector('.connection path');
  if (!path) throw new Error('Path of connection was broken');
  path.setAttribute('d', d);
}
function renderConnection(_ref2) {
  var _svg$classList;

  var el = _ref2.el,
      d = _ref2.d,
      connection = _ref2.connection;
  var classed = !connection ? [] : ['input-' + toTrainCase(connection.input.name), 'output-' + toTrainCase(connection.output.name), 'socket-input-' + toTrainCase(connection.input.socket.name), 'socket-output-' + toTrainCase(connection.output.socket.name)];
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  (_svg$classList = svg.classList).add.apply(_svg$classList, ['connection'].concat(classed));

  path.classList.add('main-path');
  path.setAttribute('d', d);
  svg.appendChild(path);
  el.appendChild(svg);
  updateConnection({
    el: el,
    d: d
  });
}

var PickerView =
/*#__PURE__*/
function () {
  function PickerView(emitter, editorView) {
    _classCallCheck(this, PickerView);

    this.emitter = emitter;
    this.editorView = editorView;

    _defineProperty(this, "el", void 0);

    this.el = document.createElement('div');
    this.el.style.position = 'absolute';
    this.editorView.area.appendChild(this.el);
  }

  _createClass(PickerView, [{
    key: "updatePseudoConnection",
    value: function updatePseudoConnection(io) {
      if (io !== null) {
        this.renderConnection(io);
      } else if (this.el.parentElement) {
        this.el.innerHTML = '';
      }
    }
  }, {
    key: "getPoints",
    value: function getPoints(io) {
      var mouse = this.editorView.area.mouse;
      if (!io.node) throw new Error('Node in output/input not found');
      var node = this.editorView.nodes.get(io.node);
      if (!node) throw new Error('Node view not found');

      var _node$getSocketPositi = node.getSocketPosition(io),
          _node$getSocketPositi2 = _slicedToArray(_node$getSocketPositi, 2),
          x1 = _node$getSocketPositi2[0],
          y1 = _node$getSocketPositi2[1];

      return io instanceof rete__WEBPACK_IMPORTED_MODULE_0__.Output ? [x1, y1, mouse.x, mouse.y] : [mouse.x, mouse.y, x1, y1];
    }
  }, {
    key: "updateConnection",
    value: function updateConnection$1(io) {
      var d = renderPathData(this.emitter, this.getPoints(io));

      updateConnection({
        el: this.el,
        d: d
      });
    }
  }, {
    key: "renderConnection",
    value: function renderConnection$1(io) {
      var d = renderPathData(this.emitter, this.getPoints(io));

      renderConnection({
        el: this.el,
        d: d
      });
    }
  }]);

  return PickerView;
}();

var Picker =
/*#__PURE__*/
function () {
  function Picker(editor) {
    var _this = this;

    _classCallCheck(this, Picker);

    _defineProperty(this, "editor", void 0);

    _defineProperty(this, "_io", null);

    _defineProperty(this, "view", void 0);

    this.editor = editor;
    this.view = new PickerView(editor, editor.view);
    editor.on('mousemove', function () {
      return _this.io && _this.view.updateConnection(_this.io);
    });
  }

  _createClass(Picker, [{
    key: "reset",
    value: function reset() {
      this.io = null;
    }
  }, {
    key: "pickOutput",
    value: function pickOutput(output) {
      if (!this.editor.trigger('connectionpick', output)) return;

      if (this.io instanceof rete__WEBPACK_IMPORTED_MODULE_0__.Input) {
        if (!output.multipleConnections && output.hasConnection()) this.editor.removeConnection(output.connections[0]);
        this.editor.connect(output, this.io);
        this.reset();
        return;
      }

      if (this.io) this.reset();
      this.io = output;
    }
  }, {
    key: "pickInput",
    value: function pickInput(input) {
      var _this2 = this;

      if (!this.editor.trigger('connectionpick', input)) return;

      if (this.io === null) {
        if (input.hasConnection()) {
          this.io = input.connections[0].output;
          this.editor.removeConnection(input.connections[0]);
        } else {
          this.io = input;
        }

        return true;
      }

      if (!input.multipleConnections && input.hasConnection()) this.editor.removeConnection(input.connections[0]);
      if (!this.io.multipleConnections && this.io.hasConnection()) this.editor.removeConnection(this.io.connections[0]);

      if (this.io instanceof rete__WEBPACK_IMPORTED_MODULE_0__.Output && this.io.connectedTo(input)) {
        var connection = input.connections.find(function (c) {
          return c.output === _this2.io;
        });

        if (connection) {
          this.editor.removeConnection(connection);
        }
      }

      if (this.io instanceof rete__WEBPACK_IMPORTED_MODULE_0__.Output) {
        this.editor.connect(this.io, input);
        this.reset();
      }
    }
  }, {
    key: "pickConnection",
    value: function pickConnection(connection) {
      var output = connection.output;
      this.editor.removeConnection(connection);
      this.io = output;
    }
  }, {
    key: "io",
    get: function get() {
      return this._io;
    },
    set: function set(io) {
      this._io = io;
      this.view.updatePseudoConnection(io);
    }
  }]);

  return Picker;
}();

var Flow =
/*#__PURE__*/
function () {
  function Flow(picker) {
    _classCallCheck(this, Flow);

    _defineProperty(this, "picker", void 0);

    _defineProperty(this, "target", void 0);

    this.picker = picker;
    this.target = null;
  }

  _createClass(Flow, [{
    key: "act",
    value: function act(_ref) {
      var input = _ref.input,
          output = _ref.output;
      if (this.unlock(input || output)) return;
      if (input) this.picker.pickInput(input);else if (output) this.picker.pickOutput(output);else this.picker.reset();
    }
  }, {
    key: "start",
    value: function start(params, io) {
      this.act(params);
      this.target = io;
    }
  }, {
    key: "complete",
    value: function complete() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.act(params);
    }
  }, {
    key: "hasTarget",
    value: function hasTarget() {
      return Boolean(this.target);
    }
  }, {
    key: "unlock",
    value: function unlock(io) {
      var target = this.target;
      this.target = null;
      return target && target === io;
    }
  }]);

  return Flow;
}();

___$insertStyle(".connection {\n  overflow: visible !important;\n  position: absolute;\n  z-index: -1;\n  pointer-events: none; }\n  .connection > * {\n    pointer-events: all; }\n  .connection .main-path {\n    fill: none;\n    stroke-width: 5px;\n    stroke: steelblue; }\n");

function install(editor) {
  editor.bind('connectionpath');
  editor.bind('connectiondrop');
  editor.bind('connectionpick');
  editor.bind('resetconnection');
  var picker = new Picker(editor);
  var flow = new Flow(picker);
  var socketsParams = new WeakMap();

  function pointerDown(e) {
    var flowParams = socketsParams.get(this);

    if (flowParams) {
      var input = flowParams.input,
          output = flowParams.output;
      editor.view.container.dispatchEvent(new PointerEvent('pointermove', e));
      e.preventDefault();
      e.stopPropagation();
      flow.start({
        input: input,
        output: output
      }, input || output);
    }
  }

  function pointerUp(e) {
    var flowEl = document.elementFromPoint(e.clientX, e.clientY);

    if (picker.io) {
      editor.trigger('connectiondrop', picker.io);
    }

    if (flowEl) {
      flow.complete(getMapItemRecursively(socketsParams, flowEl) || {});
    }
  }

  editor.on('resetconnection', function () {
    return flow.complete();
  });
  editor.on('rendersocket', function (_ref) {
    var el = _ref.el,
        input = _ref.input,
        output = _ref.output;
    socketsParams.set(el, {
      input: input,
      output: output
    });
    el.removeEventListener('pointerdown', pointerDown);
    el.addEventListener('pointerdown', pointerDown);
  });
  window.addEventListener('pointerup', pointerUp);
  editor.on('renderconnection', function (_ref2) {
    var el = _ref2.el,
        connection = _ref2.connection,
        points = _ref2.points;
    var d = renderPathData(editor, points, connection);
    renderConnection({
      el: el,
      d: d,
      connection: connection
    });
  });
  editor.on('updateconnection', function (_ref3) {
    var el = _ref3.el,
        connection = _ref3.connection,
        points = _ref3.points;
    var d = renderPathData(editor, points, connection);
    updateConnection({
      el: el,
      d: d
    });
  });
  editor.on('destroy', function () {
    window.removeEventListener('pointerup', pointerUp);
  });
}

var index = {
  name: 'connection',
  install: install
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);

//# sourceMappingURL=connection-plugin.esm.js.map


/***/ }),

/***/ "./node_modules/rete-svelte-render-plugin/build/rete-svelte-render-plugin.esm.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/rete-svelte-render-plugin/build/rete-svelte-render-plugin.esm.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
function n(){}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function i(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t){return null==t?"":t}function l(t,n){t.appendChild(n)}function a(t,n,e){t.insertBefore(n,e||null)}function s(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function d(){return p(" ")}function v(t,n,e,o){return t.addEventListener(n,e,o),function(){return t.removeEventListener(n,e,o)}}function g(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function h(t,n){n=""+n,t.data!==n&&(t.data=n)}function b(t,n,e){t.classList[e?"add":"remove"](n)}var y;function $(t){y=t}function m(){if(!y)throw new Error("Function called outside component initialization");return y}function k(t){m().$$.on_mount.push(t)}function x(t){m().$$.on_destroy.push(t)}var C=[],w=[],_=[],D=[],S=Promise.resolve(),j=!1;function O(){j||(j=!0,S.then(P))}function T(){return O(),S}function E(t){_.push(t)}function A(t){D.push(t)}var z=!1,L=new Set;function P(){if(!z){z=!0;do{for(var t=0;t<C.length;t+=1){var n=C[t];$(n),B(n.$$)}for(C.length=0;w.length;)w.pop()();for(var e=0;e<_.length;e+=1){var o=_[e];L.has(o)||(L.add(o),o())}_.length=0}while(C.length);for(;D.length;)D.pop()();j=!1,z=!1,L.clear()}}function B(t){if(null!==t.fragment){t.update(),r(t.before_update);var n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(E)}}var I,M=new Set;function F(){I={r:0,c:[],p:I}}function N(){I.r||r(I.c),I=I.p}function q(t,n){t&&t.i&&(M.delete(t),t.i(n))}function G(t,n,e,o){if(t&&t.o){if(M.has(t))return;M.add(t),I.c.push((function(){M.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function H(t,n){G(t,1,1,(function(){n.delete(t.key)}))}function J(t,n,e,o,r,i,c,u,l,a,s,f){for(var p=t.length,d=i.length,v=p,g={};v--;)g[t[v].key]=v;var h=[],b=new Map,y=new Map;for(v=d;v--;){var $=f(r,i,v),m=e($),k=c.get(m);k?o&&k.p($,n):(k=a(m,$)).c(),b.set(m,h[v]=k),m in g&&y.set(m,Math.abs(v-g[m]))}var x=new Set,C=new Set;function w(t){q(t,1),t.m(u,s),c.set(t.key,t),s=t.first,d--}for(;p&&d;){var _=h[d-1],D=t[p-1],S=_.key,j=D.key;_===D?(s=_.first,p--,d--):b.has(j)?!c.has(S)||x.has(S)?w(_):C.has(j)?p--:y.get(S)>y.get(j)?(C.add(S),w(_)):(x.add(j),p--):(l(D,c),p--)}for(;p--;){var O=t[p];b.has(O.key)||l(O,c)}for(;d;)w(h[d-1]);return h}function K(t,n,e){var o=t.$$.props[n];void 0!==o&&(t.$$.bound[o]=e,e(t.$$.ctx[o]))}function Q(t){t&&t.c()}function R(t,n,o){var c=t.$$,u=c.fragment,l=c.on_mount,a=c.on_destroy,s=c.after_update;u&&u.m(n,o),E((function(){var n=l.map(e).filter(i);a?a.push.apply(a,n):r(n),t.$$.on_mount=[]})),s.forEach(E)}function U(t,n){var e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function V(t,n){-1===t.$$.dirty[0]&&(C.push(t),O(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function W(t,e,i,c,u,l,a){void 0===a&&(a=[-1]);var s=y;$(t);var f=e.props||{},p=t.$$={fragment:null,ctx:null,props:l,update:n,not_equal:u,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(s?s.$$.context:[]),callbacks:o(),dirty:a},d=!1;p.ctx=i?i(t,f,(function(n,e){for(var o=[],r=arguments.length-2;r-- >0;)o[r]=arguments[r+2];var i=o.length?o[0]:e;return p.ctx&&u(p.ctx[n],p.ctx[n]=i)&&(p.bound[n]&&p.bound[n](i),d&&V(t,n)),e})):[],p.update(),d=!0,r(p.before_update),p.fragment=!!c&&c(p.ctx),e.target&&(e.hydrate?p.fragment&&p.fragment.l(function(t){return Array.from(t.childNodes)}(e.target)):p.fragment&&p.fragment.c(),e.intro&&q(t.$$.fragment),R(t,e.target,e.anchor),P()),$(s)}var X=function(){};function Y(t){var n,e;return{c:function(){n=f("label"),e=p(t[1])},m:function(t,o){a(t,n,o),l(n,e)},p:function(t,n){2&n&&h(e,t[1])},d:function(t){t&&s(n)}}}function Z(t){var e,o,r,i,c,p=t[1]&&Y(t);return{c:function(){e=f("div"),p&&p.c(),o=d(),g(r=f("input"),"type",t[2]),g(e,"class",i=u(t[0])+" svelte-1oe6jtx")},m:function(n,i){a(n,e,i),p&&p.m(e,null),l(e,o),l(e,r),t[11](r),c=v(r,"input",t[4])},p:function(t,n){var c=n[0];t[1]?p?p.p(t,c):((p=Y(t)).c(),p.m(e,o)):p&&(p.d(1),p=null),4&c&&g(r,"type",t[2]),1&c&&i!==(i=u(t[0])+" svelte-1oe6jtx")&&g(e,"class",i)},i:n,o:n,d:function(n){n&&s(e),p&&p.d(),t[11](null),c()}}}function tt(t,n,e){var o=n.bindControl,r=n.control,i=n.controlType;void 0===i&&(i="control");var c=n.emitter,u=n.key,l=n.label,a=n.type;void 0===a&&(a="text");var s,f=n.getData,p=n.putData;return k((function(){r&&(o(s,r),f&&e(3,s.value=f(u),s))})),t.$set=function(t){"bindControl"in t&&e(5,o=t.bindControl),"control"in t&&e(6,r=t.control),"controlType"in t&&e(0,i=t.controlType),"emitter"in t&&e(7,c=t.emitter),"key"in t&&e(8,u=t.key),"label"in t&&e(1,l=t.label),"type"in t&&e(2,a=t.type),"getData"in t&&e(9,f=t.getData),"putData"in t&&e(10,p=t.putData)},t.$$.update=function(){104&t.$$.dirty&&s&&r&&o(s,r)},[i,l,a,s,function(t){u&&p(u,t.target.value),c.trigger("process")},o,r,c,u,f,p,function(t){w[t?"unshift":"push"]((function(){e(3,s=t)}))}]}X.prototype.$destroy=function(){U(this,1),this.$destroy=n},X.prototype.$on=function(t,n){var e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),function(){var t=e.indexOf(n);-1!==t&&e.splice(t,1)}},X.prototype.$set=function(){};var nt=function(t){function n(n){var e;t.call(this),document.getElementById("svelte-1oe6jtx-style")||((e=f("style")).id="svelte-1oe6jtx-style",e.textContent=".input-control.svelte-1oe6jtx{z-index:1;width:calc(100% - 36px);vertical-align:middle;display:inline-block}.control.svelte-1oe6jtx{padding:6px 18px}",l(document.head,e)),W(this,n,tt,Z,c,{bindControl:5,control:6,controlType:0,emitter:7,key:8,label:1,type:2,getData:9,putData:10})}t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n;var e={bindControl:{configurable:!0},control:{configurable:!0},controlType:{configurable:!0},emitter:{configurable:!0},key:{configurable:!0},label:{configurable:!0},type:{configurable:!0},getData:{configurable:!0},putData:{configurable:!0}};return e.bindControl.get=function(){return this.$$.ctx[5]},e.bindControl.set=function(t){this.$set({bindControl:t}),P()},e.control.get=function(){return this.$$.ctx[6]},e.control.set=function(t){this.$set({control:t}),P()},e.controlType.get=function(){return this.$$.ctx[0]},e.controlType.set=function(t){this.$set({controlType:t}),P()},e.emitter.get=function(){return this.$$.ctx[7]},e.emitter.set=function(t){this.$set({emitter:t}),P()},e.key.get=function(){return this.$$.ctx[8]},e.key.set=function(t){this.$set({key:t}),P()},e.label.get=function(){return this.$$.ctx[1]},e.label.set=function(t){this.$set({label:t}),P()},e.type.get=function(){return this.$$.ctx[2]},e.type.set=function(t){this.$set({type:t}),P()},e.getData.get=function(){return this.$$.ctx[9]},e.getData.set=function(t){this.$set({getData:t}),P()},e.putData.get=function(){return this.$$.ctx[10]},e.putData.set=function(t){this.$set({putData:t}),P()},Object.defineProperties(n.prototype,e),n}(X);function et(t){var n,e;return{c:function(){n=f("label"),e=p(t[1]),g(n,"class","svelte-1uw2b75")},m:function(t,o){a(t,n,o),l(n,e)},p:function(t,n){2&n&&h(e,t[1])},d:function(t){t&&s(n)}}}function ot(t){var e,o,r,i,c,u=t[1]&&et(t);return{c:function(){e=f("div"),u&&u.c(),o=d(),g(r=f("input"),"type",t[2]),g(r,"title",t[4]),g(r,"placeholder",t[4]),g(e,"class",i=t[0]+" defaultable svelte-1uw2b75")},m:function(n,i){a(n,e,i),u&&u.m(e,null),l(e,o),l(e,r),t[13](r),c=v(r,"input",t[5])},p:function(t,n){var c=n[0];t[1]?u?u.p(t,c):((u=et(t)).c(),u.m(e,o)):u&&(u.d(1),u=null),4&c&&g(r,"type",t[2]),16&c&&g(r,"title",t[4]),16&c&&g(r,"placeholder",t[4]),1&c&&i!==(i=t[0]+" defaultable svelte-1uw2b75")&&g(e,"class",i)},i:n,o:n,d:function(n){n&&s(e),u&&u.d(),t[13](null),c()}}}function rt(t,n,e){var o=n.control,r=n.controlType;void 0===r&&(r="control");var i=n.emitter,c=n.key,u=n.label,l=n.type;void 0===l&&(l="text");var a,s,f=n.getData,p=n.putData,d=n.value,v=o.parent.connections;return k((function(){i.on("connectioncreated connectionremoved",(function(t){e(12,v=o.parent.connections)})),d&&T().then((function(){e(3,a.value=d,a)}))})),x((function(){})),t.$set=function(t){"control"in t&&e(6,o=t.control),"controlType"in t&&e(0,r=t.controlType),"emitter"in t&&e(7,i=t.emitter),"key"in t&&e(8,c=t.key),"label"in t&&e(1,u=t.label),"type"in t&&e(2,l=t.type),"getData"in t&&e(9,f=t.getData),"putData"in t&&e(10,p=t.putData),"value"in t&&e(11,d=t.value)},t.$$.update=function(){4096&t.$$.dirty&&e(4,s=0===v.length?"Static value":"Default value")},[r,u,l,a,s,function(t){c&&p(c,t.target.value),i.trigger("process")},o,i,c,f,p,d,v,function(t){w[t?"unshift":"push"]((function(){e(3,a=t)}))}]}var it=function(t){function n(n){var e;t.call(this),document.getElementById("svelte-1uw2b75-style")||((e=f("style")).id="svelte-1uw2b75-style",e.textContent=".input-control.svelte-1uw2b75{z-index:1;width:calc(100% - 36px);vertical-align:middle;display:inline-block}.control.svelte-1uw2b75{padding:6px 18px}.defaultable.svelte-1uw2b75{display:flex;flex-direction:column}label.svelte-1uw2b75{color:white;display:inline-block;font-family:sans-serif;font-size:14px;line-height:24px}",l(document.head,e)),W(this,n,rt,ot,c,{control:6,controlType:0,emitter:7,key:8,label:1,type:2,getData:9,putData:10,value:11})}t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n;var e={control:{configurable:!0},controlType:{configurable:!0},emitter:{configurable:!0},key:{configurable:!0},label:{configurable:!0},type:{configurable:!0},getData:{configurable:!0},putData:{configurable:!0},value:{configurable:!0}};return e.control.get=function(){return this.$$.ctx[6]},e.control.set=function(t){this.$set({control:t}),P()},e.controlType.get=function(){return this.$$.ctx[0]},e.controlType.set=function(t){this.$set({controlType:t}),P()},e.emitter.get=function(){return this.$$.ctx[7]},e.emitter.set=function(t){this.$set({emitter:t}),P()},e.key.get=function(){return this.$$.ctx[8]},e.key.set=function(t){this.$set({key:t}),P()},e.label.get=function(){return this.$$.ctx[1]},e.label.set=function(t){this.$set({label:t}),P()},e.type.get=function(){return this.$$.ctx[2]},e.type.set=function(t){this.$set({type:t}),P()},e.getData.get=function(){return this.$$.ctx[9]},e.getData.set=function(t){this.$set({getData:t}),P()},e.putData.get=function(){return this.$$.ctx[10]},e.putData.set=function(t){this.$set({putData:t}),P()},e.value.get=function(){return this.$$.ctx[11]},e.value.set=function(t){this.$set({value:t}),P()},Object.defineProperties(n.prototype,e),n}(X);function ct(t){var e,o,r;return{c:function(){e=f("div"),g(o=f("input"),"title","Filter..."),g(o,"placeholder","Filter..."),g(e,"class","control filter svelte-enwcu")},m:function(n,i){a(n,e,i),l(e,o),t[5](o),r=v(o,"input",t[1])},p:n,i:n,o:n,d:function(n){n&&s(e),t[5](null),r()}}}function ut(t,n,e){var o,r=function(t){return m().$$.context.get(t)}("filter"),i=n.key,c=n.control;return x((function(){})),t.$set=function(t){"key"in t&&e(2,i=t.key),"control"in t&&e(3,c=t.control)},[o,function(t){var n=t.target.value;r.set(n)},i,c,r,function(t){w[t?"unshift":"push"]((function(){e(0,o=t)}))}]}var lt=function(t){function n(n){var e;t.call(this),document.getElementById("svelte-enwcu-style")||((e=f("style")).id="svelte-enwcu-style",e.textContent=".control.svelte-enwcu{padding:6px 18px}.filter.svelte-enwcu{text-align:center}",l(document.head,e)),W(this,n,ut,ct,c,{key:2,control:3})}t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n;var e={key:{configurable:!0},control:{configurable:!0}};return e.key.get=function(){return this.$$.ctx[2]},e.key.set=function(t){this.$set({key:t}),P()},e.control.get=function(){return this.$$.ctx[3]},e.control.set=function(t){this.$set({control:t}),P()},Object.defineProperties(n.prototype,e),n}(X),at=function(t){function n(t,n,e){this.render="svelte",this.component=nt,this.props={emitter:t,key:n,readonly:e}}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n}(rete__WEBPACK_IMPORTED_MODULE_0__["default"].Control),st=[];function ft(t){var e;return{c:function(){e=f("div")},m:function(n,o){a(n,e,o),t[3](e)},p:n,i:n,o:n,d:function(n){n&&s(e),t[3](null)}}}function pt(t,n,e){var o,r=n.bindControl,i=n.control;return k((function(){r(o,i)})),t.$set=function(t){"bindControl"in t&&e(1,r=t.bindControl),"control"in t&&e(2,i=t.control)},[o,r,i,function(t){w[t?"unshift":"push"]((function(){e(0,o=t)}))}]}var dt=function(t){function n(n){t.call(this),W(this,n,pt,ft,c,{bindControl:1,control:2})}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n}(X);function vt(t){var n=function(t){return t.toLowerCase().replace(/ /g,"-")};return Array.isArray(t)?t.map(n):n(t)}function gt(t){var e,o,r;return{c:function(){g(e=f("div"),"class",o="socket "+vt(t[1])+" "+vt(t[0].name)+" svelte-kbmsi6"),g(e,"title",r=t[0].name)},m:function(n,o){a(n,e,o),t[7](e)},p:function(t,n){var i=n[0];3&i&&o!==(o="socket "+vt(t[1])+" "+vt(t[0].name)+" svelte-kbmsi6")&&g(e,"class",o),1&i&&r!==(r=t[0].name)&&g(e,"title",r)},i:n,o:n,d:function(n){n&&s(e),t[7](null)}}}function ht(t,n,e){var o=n.socket,r=n.type,i=n.bindSocket,c=n.withControl,u=n.output;void 0===u&&(u=null);var l,a=n.input;return void 0===a&&(a=null),k((function(){i(l,r,"output"===r?u:a)})),t.$set=function(t){"socket"in t&&e(0,o=t.socket),"type"in t&&e(1,r=t.type),"bindSocket"in t&&e(3,i=t.bindSocket),"withControl"in t&&e(4,c=t.withControl),"output"in t&&e(5,u=t.output),"input"in t&&e(6,a=t.input)},t.$$.update=function(){110&t.$$.dirty&&l&&i(l,r,"output"===r?u:a)},[o,r,l,i,c,u,a,function(t){w[t?"unshift":"push"]((function(){e(2,l=t)}))}]}var bt=function(t){function n(n){var e;t.call(this),document.getElementById("svelte-kbmsi6-style")||((e=f("style")).id="svelte-kbmsi6-style",e.textContent=".socket.svelte-kbmsi6{display:inline-block;cursor:pointer;border:1px solid white;border-radius:12px;width:24px;height:24px;margin:6px;vertical-align:middle;background:#96b38a;z-index:2;box-sizing:border-box}.socket.svelte-kbmsi6:hover{border-width:4px}.socket.multiple.svelte-kbmsi6{border-color:yellow}.socket.output.svelte-kbmsi6{margin-right:-12px}.socket.input.svelte-kbmsi6{margin-left:-12px}",l(document.head,e)),W(this,n,ht,gt,c,{socket:0,type:1,bindSocket:3,withControl:4,output:5,input:6})}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n}(X);function yt(t,n,e){var o=t.slice();return o[14]=n[e],o[15]=n,o[16]=e,o}function $t(t,n,e){var o=t.slice();return o[17]=n[e],o}function mt(t,n,e){var o=t.slice();return o[20]=n[e],o[21]=n,o[16]=e,o}function kt(t,n){var e,o,r,i,c,u,v,b=n[20].name+"";function y(t){n[12].call(null,t,n[20])}var $={output:n[20],bindSocket:n[1],type:"output"};void 0!==n[20].socket&&($.socket=n[20].socket);var m=new bt({props:$});return w.push((function(){return K(m,"socket",y)})),{key:t,first:null,c:function(){e=f("div"),o=f("div"),r=p(b),i=d(),Q(m.$$.fragment),u=d(),g(o,"class","output-title svelte-gvp353"),g(e,"class","output svelte-gvp353"),this.first=e},m:function(t,n){a(t,e,n),l(e,o),l(o,r),l(e,i),R(m,e,null),l(e,u),v=!0},p:function(t,e){n=t,(!v||16&e)&&b!==(b=n[20].name+"")&&h(r,b);var o={};16&e&&(o.output=n[20]),2&e&&(o.bindSocket=n[1]),!c&&16&e&&(c=!0,o.socket=n[20].socket,A((function(){return c=!1}))),m.$set(o)},i:function(t){v||(q(m.$$.fragment,t),v=!0)},o:function(t){G(m.$$.fragment,t),v=!1},d:function(t){t&&s(e),U(m)}}}function xt(t){var n,e=new dt({props:{bindControl:t[2],control:t[17]}});return{c:function(){Q(e.$$.fragment)},m:function(t,o){R(e,t,o),n=!0},p:function(t,n){var o={};4&n&&(o.bindControl=t[2]),32&n&&(o.control=t[17]),e.$set(o)},i:function(t){n||(q(e.$$.fragment,t),n=!0)},o:function(t){G(e.$$.fragment,t),n=!1},d:function(t){U(e,t)}}}function Ct(t){var n,e=new dt({props:{bindControl:t[2],control:t[14].control}});return{c:function(){Q(e.$$.fragment)},m:function(t,o){R(e,t,o),n=!0},p:function(t,n){var o={};4&n&&(o.bindControl=t[2]),8&n&&(o.control=t[14].control),e.$set(o)},i:function(t){n||(q(e.$$.fragment,t),n=!0)},o:function(t){G(e.$$.fragment,t),n=!1},d:function(t){U(e,t)}}}function wt(t){var e,o,r=t[14].name+"";return{c:function(){e=f("div"),o=p(r),g(e,"class","input-title svelte-gvp353")},m:function(t,n){a(t,e,n),l(e,o)},p:function(t,n){8&n&&r!==(r=t[14].name+"")&&h(o,r)},i:n,o:n,d:function(t){t&&s(e)}}}function _t(t,n){var e,o,r,i,c,u,p,v;function h(t){n[13].call(null,t,n[14])}var b={input:n[14],bindSocket:n[1],type:"input",withControl:n[14].showControl()};void 0!==n[14].socket&&(b.socket=n[14].socket);var y=new bt({props:b});w.push((function(){return K(y,"socket",h)}));var $=[wt,Ct],m=[];function k(t,n){return 8&n&&(i=!t[14].showControl()),i?0:1}return c=k(n,-1),u=m[c]=$[c](n),{key:t,first:null,c:function(){e=f("div"),Q(y.$$.fragment),r=d(),u.c(),p=d(),g(e,"class","input svelte-gvp353"),this.first=e},m:function(t,n){a(t,e,n),R(y,e,null),l(e,r),m[c].m(e,null),l(e,p),v=!0},p:function(t,r){n=t;var i={};8&r&&(i.input=n[14]),2&r&&(i.bindSocket=n[1]),8&r&&(i.withControl=n[14].showControl()),!o&&8&r&&(o=!0,i.socket=n[14].socket,A((function(){return o=!1}))),y.$set(i);var l=c;(c=k(n,r))===l?m[c].p(n,r):(F(),G(m[l],1,1,(function(){m[l]=null})),N(),(u=m[c])||(u=m[c]=$[c](n)).c(),q(u,1),u.m(e,p))},i:function(t){v||(q(y.$$.fragment,t),q(u),v=!0)},o:function(t){G(y.$$.fragment,t),G(u),v=!1},d:function(t){t&&s(e),U(y),m[c].d()}}}function Dt(t){for(var n,e,o,r,i,c,u,v,y=t[0].name+"",$=[],m=new Map,k=[],x=new Map,C=t[4],w=function(t){return t[20].key},_=0;_<C.length;_+=1){var D=mt(t,C,_),S=w(D);m.set(S,$[_]=kt(S,D))}for(var j=t[5],O=[],T=0;T<j.length;T+=1)O[T]=xt($t(t,j,T));for(var E=function(t){return G(O[t],1,1,(function(){O[t]=null}))},A=t[3],z=function(t){return t[14].key},L=0;L<A.length;L+=1){var P=yt(t,A,L),B=z(P);x.set(B,k[L]=_t(B,P))}return{c:function(){n=f("div"),e=f("div"),o=p(y),r=d();for(var l=0;l<$.length;l+=1)$[l].c();i=d();for(var a=0;a<O.length;a+=1)O[a].c();c=d();for(var s=0;s<k.length;s+=1)k[s].c();g(e,"class","title svelte-gvp353"),g(n,"class",u="node "+vt(t[0].name)+" "+t[7]+" svelte-gvp353"),b(n,"selected",t[6])},m:function(t,u){a(t,n,u),l(n,e),l(e,o),l(n,r);for(var s=0;s<$.length;s+=1)$[s].m(n,null);l(n,i);for(var f=0;f<O.length;f+=1)O[f].m(n,null);l(n,c);for(var p=0;p<k.length;p+=1)k[p].m(n,null);v=!0},p:function(t,e){var r=e[0];if((!v||1&r)&&y!==(y=t[0].name+"")&&h(o,y),18&r){var l=t[4];F(),$=J($,r,w,1,t,l,m,n,H,kt,i,mt),N()}if(36&r){var a;for(j=t[5],a=0;a<j.length;a+=1){var s=$t(t,j,a);O[a]?(O[a].p(s,r),q(O[a],1)):(O[a]=xt(s),O[a].c(),q(O[a],1),O[a].m(n,c))}for(F(),a=j.length;a<O.length;a+=1)E(a);N()}if(14&r){var f=t[3];F(),k=J(k,r,z,1,t,f,x,n,H,_t,null,yt),N()}(!v||129&r&&u!==(u="node "+vt(t[0].name)+" "+t[7]+" svelte-gvp353"))&&g(n,"class",u),193&r&&b(n,"selected",t[6])},i:function(t){if(!v){for(var n=0;n<C.length;n+=1)q($[n]);for(var e=0;e<j.length;e+=1)q(O[e]);for(var o=0;o<A.length;o+=1)q(k[o]);v=!0}},o:function(t){for(var n=0;n<$.length;n+=1)G($[n]);O=O.filter(Boolean);for(var e=0;e<O.length;e+=1)G(O[e]);for(var o=0;o<k.length;o+=1)G(k[o]);v=!1},d:function(t){t&&s(n);for(var e=0;e<$.length;e+=1)$[e].d();!function(t,n){for(var e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(O,t);for(var o=0;o<k.length;o+=1)k[o].d()}}}function St(t,e,o){var r,i,u=e.editor,l=e.node,a=e.bindSocket,s=e.bindControl,f=function(t,e){var o;void 0===e&&(e=n);var r=[];function i(n){if(c(t,n)&&(t=n,o)){for(var e=!st.length,i=0;i<r.length;i+=1){var u=r[i];u[1](),st.push(u,t)}if(e){for(var l=0;l<st.length;l+=2)st[l][0](st[l+1]);st.length=0}}}return{set:i,update:function(n){i(n(t))},subscribe:function(c,u){void 0===u&&(u=n);var l=[c,u];return r.push(l),1===r.length&&(o=e(i)||n),c(t),function(){var t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}("");r="filter",i=f,m().$$.context.set(r,i);var p,d,v,g,h=[],b=[];return f.subscribe((function(t){o(3,b=[].concat(t?Array.from(l.inputs.values()).filter((function(n){return n.name.toLowerCase().indexOf(t.toLowerCase())>-1})):Array.from(l.inputs.values())));h.filter((function(t){return!b.includes(t)}));h.forEach((function(t){var n=!b.includes(t);t.connections.forEach((function(t){var e=u.view.connections.get(t);n?e.el.classList.add("hidden-connection"):e.el.classList.remove("hidden-connection")}))})),T().then((function(){u.view.updateConnections({node:l})}))})),t.$set=function(t){"editor"in t&&o(8,u=t.editor),"node"in t&&o(0,l=t.node),"bindSocket"in t&&o(1,a=t.bindSocket),"bindControl"in t&&o(2,s=t.bindControl)},t.$$.update=function(){1&t.$$.dirty&&(h=Array.from(l.inputs.values())),1&t.$$.dirty&&o(4,p=Array.from(l.outputs.values())),1&t.$$.dirty&&o(5,d=Array.from(l.controls.values())),257&t.$$.dirty&&o(6,v=u.selected.contains(l)?"selected":""),1&t.$$.dirty&&o(7,g=l.data.class||"")},[l,a,s,b,p,d,v,g,u,h,f,[],function(t,n){n.socket=t,o(4,p),o(0,l)},function(t,n){n.socket=t,o(3,b)}]}var jt=function(t){function n(n){var e;t.call(this),document.getElementById("svelte-gvp353-style")||((e=f("style")).id="svelte-gvp353-style",e.textContent=".node.svelte-gvp353.svelte-gvp353{background:rgba(110, 136, 255, 0.8);border:2px solid #4e58bf;border-radius:10px;cursor:pointer;min-width:180px;height:auto;padding-bottom:6px;box-sizing:content-box;position:relative;user-select:none}.node.svelte-gvp353.svelte-gvp353:hover{background:rgba(130, 153, 255, 0.8)}.node.selected.svelte-gvp353.svelte-gvp353{background:#ffd92c;border-color:#e3c000}.node.svelte-gvp353 .title.svelte-gvp353{color:white;font-family:sans-serif;font-size:18px;padding:8px}.node.svelte-gvp353 .output.svelte-gvp353{text-align:right}.node.svelte-gvp353 .input.svelte-gvp353{text-align:left;display:flex}.node.svelte-gvp353 .input-title.svelte-gvp353,.node.svelte-gvp353 .output-title.svelte-gvp353{vertical-align:middle;color:white;display:inline-block;font-family:sans-serif;font-size:14px;margin:6px;line-height:24px}.hidden-connection{opacity:0}",l(document.head,e)),W(this,n,St,Dt,c,{editor:8,node:0,bindSocket:1,bindControl:2})}t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n;var e={editor:{configurable:!0},node:{configurable:!0},bindSocket:{configurable:!0},bindControl:{configurable:!0}};return e.editor.get=function(){return this.$$.ctx[8]},e.editor.set=function(t){this.$set({editor:t}),P()},e.node.get=function(){return this.$$.ctx[0]},e.node.set=function(t){this.$set({node:t}),P()},e.bindSocket.get=function(){return this.$$.ctx[1]},e.bindSocket.set=function(t){this.$set({bindSocket:t}),P()},e.bindControl.get=function(){return this.$$.ctx[2]},e.bindControl.set=function(t){this.$set({bindControl:t}),P()},Object.defineProperties(n.prototype,e),n}(X);function Ot(t,n,e){var o=document.createElement("div"),r=new n({target:o,props:e});return t.appendChild(o),r}var Tt=function(t){return new Promise((function(n){if(!t.svelteContext)return n()}))};var Et={name:"rete-svelte-render",install:function(t,n){var e=n.component;n.options,t.on("rendernode",(function(n){var o=n.el,r=n.node,i=n.component,c=n.bindSocket,u=n.bindControl;i.render&&"svelte"===i.render&&(r._svelte=function(t,n,e,o){var r=e.el,i=e.node,c=e.component,u=e.bindSocket,l=e.bindControl,a=Ot(r,c.component||n||jt,Object.assign({},c.props,{node:i,editor:t,bindSocket:u,bindControl:l}));return i.svelteContext=a,a}(t,e,{el:o,node:r,component:i,bindSocket:c,bindControl:u}),r.update=Promise.resolve(Tt(r)))})),t.on("rendercontrol",(function(t){var n=t.el,e=t.control;e.render&&"svelte"===e.render&&(e._svelte=function(t,n,e){var o=n.el,r=n.control,i=Ot(o,r.component,Object.assign({},{control:r},r.props,{getData:r.getData.bind(r),putData:r.putData.bind(r)}));return r.svelteContext=i,i}(0,{el:n,control:e}),e.update=Promise.resolve(Tt(e)))})),t.on("connectioncreated connectionremoved",(function(t){Tt(t.output.node),Tt(t.input.node)})),t.on("nodeselected",(function(){t.nodes.map(Tt)}))},Control:nt,DefaultableControlComponent:it,FilterControlComponent:lt,Node:jt,InputControl:at,Socket:bt};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Et);
//# sourceMappingURL=rete-svelte-render-plugin.esm.js.map


/***/ }),

/***/ "./node_modules/rete/build/rete.esm.js":
/*!*********************************************!*\
  !*** ./node_modules/rete/build/rete.esm.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component$1),
/* harmony export */   "Connection": () => (/* binding */ Connection),
/* harmony export */   "Control": () => (/* binding */ Control),
/* harmony export */   "Emitter": () => (/* binding */ Emitter),
/* harmony export */   "Engine": () => (/* binding */ Engine),
/* harmony export */   "IO": () => (/* binding */ IO),
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "Node": () => (/* binding */ Node),
/* harmony export */   "NodeEditor": () => (/* binding */ NodeEditor),
/* harmony export */   "Output": () => (/* binding */ Output),
/* harmony export */   "Recursion": () => (/* binding */ Recursion),
/* harmony export */   "Socket": () => (/* binding */ Socket),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*!
* rete v1.4.9 
* (c) 2022 Vitaliy Stoliarov 
* Released under the MIT license.
*/
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var Component = function Component(name) {
  _classCallCheck(this, Component);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "data", {});

  _defineProperty(this, "engine", null);

  this.name = name;
};

var Node =
/*#__PURE__*/
function () {
  function Node(name) {
    _classCallCheck(this, Node);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "position", [0.0, 0.0]);

    _defineProperty(this, "inputs", new Map());

    _defineProperty(this, "outputs", new Map());

    _defineProperty(this, "controls", new Map());

    _defineProperty(this, "data", {});

    _defineProperty(this, "meta", {});

    this.name = name;
    this.id = Node.incrementId();
  }

  _createClass(Node, [{
    key: "_add",
    value: function _add(list, item, prop) {
      if (list.has(item.key)) throw new Error("Item with key '".concat(item.key, "' already been added to the node"));
      if (item[prop] !== null) throw new Error('Item has already been added to some node');
      item[prop] = this;
      list.set(item.key, item);
    }
  }, {
    key: "addControl",
    value: function addControl(control) {
      this._add(this.controls, control, 'parent');

      return this;
    }
  }, {
    key: "removeControl",
    value: function removeControl(control) {
      control.parent = null;
      this.controls["delete"](control.key);
    }
  }, {
    key: "addInput",
    value: function addInput(input) {
      this._add(this.inputs, input, 'node');

      return this;
    }
  }, {
    key: "removeInput",
    value: function removeInput(input) {
      input.removeConnections();
      input.node = null;
      this.inputs["delete"](input.key);
    }
  }, {
    key: "addOutput",
    value: function addOutput(output) {
      this._add(this.outputs, output, 'node');

      return this;
    }
  }, {
    key: "removeOutput",
    value: function removeOutput(output) {
      output.removeConnections();
      output.node = null;
      this.outputs["delete"](output.key);
    }
  }, {
    key: "setMeta",
    value: function setMeta(meta) {
      this.meta = meta;
      return this;
    }
  }, {
    key: "getConnections",
    value: function getConnections() {
      var ios = [].concat(_toConsumableArray(this.inputs.values()), _toConsumableArray(this.outputs.values()));
      var connections = ios.reduce(function (arr, io) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(io.connections));
      }, []);
      return connections;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "toJSON",
    value: function toJSON() {
      var reduceIO = function reduceIO(list) {
        return Array.from(list).reduce(function (obj, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              io = _ref2[1];

          obj[key] = io.toJSON();
          return obj;
        }, {});
      };

      return {
        'id': this.id,
        'data': this.data,
        'inputs': reduceIO(this.inputs),
        'outputs': reduceIO(this.outputs),
        'position': this.position,
        'name': this.name
      };
    }
  }], [{
    key: "incrementId",
    value: function incrementId() {
      if (!this.latestId) this.latestId = 1;else this.latestId++;
      return this.latestId;
    }
  }, {
    key: "resetId",
    value: function resetId() {
      this.latestId = 0;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var node = new Node(json.name);

      var _json$position = _slicedToArray(json.position, 2),
          x = _json$position[0],
          y = _json$position[1];

      node.id = json.id;
      node.data = json.data;
      node.position = [x, y];
      node.name = json.name;
      Node.latestId = Math.max(node.id, Node.latestId);
      return node;
    }
  }]);

  return Node;
}();

_defineProperty(Node, "latestId", 0);

var Component$1 =
/*#__PURE__*/
function (_ComponentWorker) {
  _inherits(Component, _ComponentWorker);

  function Component(name) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, name));

    _defineProperty(_assertThisInitialized(_this), "editor", null);

    _defineProperty(_assertThisInitialized(_this), "data", {});

    return _this;
  }

  _createClass(Component, [{
    key: "build",
    value: function () {
      var _build = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(node) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.builder(node);

              case 2:
                return _context.abrupt("return", node);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build(_x) {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: "createNode",
    value: function () {
      var _createNode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var data,
            node,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                node = new Node(this.name);
                node.data = data;
                _context2.next = 5;
                return this.build(node);

              case 5:
                return _context2.abrupt("return", node);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createNode() {
        return _createNode.apply(this, arguments);
      }

      return createNode;
    }()
  }]);

  return Component;
}(Component);

var Connection =
/*#__PURE__*/
function () {
  function Connection(output, input) {
    _classCallCheck(this, Connection);

    _defineProperty(this, "output", void 0);

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "data", {});

    this.output = output;
    this.input = input;
    this.data = {};
    this.input.addConnection(this);
  }

  _createClass(Connection, [{
    key: "remove",
    value: function remove() {
      this.input.removeConnection(this);
      this.output.removeConnection(this);
    }
  }]);

  return Connection;
}();

var Control =
/*#__PURE__*/
function () {
  function Control(key) {
    _classCallCheck(this, Control);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "data", {});

    _defineProperty(this, "parent", null);

    if (this.constructor === Control) throw new TypeError('Can not construct abstract class');
    if (!key) throw new Error('The key parameter is missing in super() of Control ');
    this.key = key;
  }

  _createClass(Control, [{
    key: "getNode",
    value: function getNode() {
      if (this.parent === null) throw new Error('Control isn\'t added to Node/Input');
      if (this.parent instanceof Node) return this.parent;
      if (!this.parent.node) throw new Error('Control hasn\'t be added to Input or Node');
      return this.parent.node;
    }
  }, {
    key: "getData",
    value: function getData(key) {
      return this.getNode().data[key];
    }
  }, {
    key: "putData",
    value: function putData(key, data) {
      this.getNode().data[key] = data;
    }
  }]);

  return Control;
}();

var Emitter =
/*#__PURE__*/
function () {
  function Emitter(events) {
    _classCallCheck(this, Emitter);

    _defineProperty(this, "events", {});

    _defineProperty(this, "silent", false);

    this.events = events instanceof Emitter ? events.events : events.handlers;
  }

  _createClass(Emitter, [{
    key: "on",
    value: function on(names, handler) {
      var _this = this;

      var events = names instanceof Array ? names : names.split(' ');
      events.forEach(function (name) {
        if (!_this.events[name]) throw new Error("The event ".concat(name, " does not exist"));

        _this.events[name].push(handler);
      });
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(name) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!(name in this.events)) throw new Error("The event ".concat(name, " cannot be triggered"));
      return this.events[name].reduce(function (r, e) {
        return e(params) !== false && r;
      }, true); // return false if at least one event is false        
    }
  }, {
    key: "bind",
    value: function bind(name) {
      if (this.events[name]) throw new Error("The event ".concat(name, " is already bound"));
      this.events[name] = [];
    }
  }, {
    key: "exist",
    value: function exist(name) {
      return Array.isArray(this.events[name]);
    }
  }]);

  return Emitter;
}();

var IO =
/*#__PURE__*/
function () {
  function IO(key, name, socket, multiConns) {
    _classCallCheck(this, IO);

    _defineProperty(this, "node", null);

    _defineProperty(this, "multipleConnections", void 0);

    _defineProperty(this, "connections", []);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "socket", void 0);

    this.node = null;
    this.multipleConnections = multiConns;
    this.connections = [];
    this.key = key;
    this.name = name;
    this.socket = socket;
  }

  _createClass(IO, [{
    key: "removeConnection",
    value: function removeConnection(connection) {
      this.connections.splice(this.connections.indexOf(connection), 1);
    }
  }, {
    key: "removeConnections",
    value: function removeConnections() {
      var _this = this;

      this.connections.forEach(function (connection) {
        return _this.removeConnection(connection);
      });
    }
  }]);

  return IO;
}();

var Input =
/*#__PURE__*/
function (_IO) {
  _inherits(Input, _IO);

  function Input(key, title, socket) {
    var _this;

    var multiConns = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, key, title, socket, multiConns));

    _defineProperty(_assertThisInitialized(_this), "control", null);

    return _this;
  }

  _createClass(Input, [{
    key: "hasConnection",
    value: function hasConnection() {
      return this.connections.length > 0;
    }
  }, {
    key: "addConnection",
    value: function addConnection(connection) {
      if (!this.multipleConnections && this.hasConnection()) throw new Error('Multiple connections not allowed');
      this.connections.push(connection);
    }
  }, {
    key: "addControl",
    value: function addControl(control) {
      this.control = control;
      control.parent = this;
    }
  }, {
    key: "showControl",
    value: function showControl() {
      return !this.hasConnection() && this.control !== null;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        'connections': this.connections.map(function (c) {
          if (!c.output.node) throw new Error('Node not added to Output');
          return {
            node: c.output.node.id,
            output: c.output.key,
            data: c.data
          };
        })
      };
    }
  }]);

  return Input;
}(IO);

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "isValidData",
    value: function isValidData(data) {
      return typeof data.id === 'string' && this.isValidId(data.id) && data.nodes instanceof Object && !(data.nodes instanceof Array);
    }
  }, {
    key: "isValidId",
    value: function isValidId(id) {
      return /^[\w-]{3,}@[0-9]+\.[0-9]+\.[0-9]+$/.test(id);
    }
  }, {
    key: "validate",
    value: function validate(id, data) {
      var id1 = id.split('@');
      var id2 = data.id.split('@');
      var msg = [];
      if (!this.isValidData(data)) msg.push('Data is not suitable');
      if (id !== data.id) msg.push('IDs not equal');
      if (id1[0] !== id2[0]) msg.push('Names don\'t match');
      if (id1[1] !== id2[1]) msg.push('Versions don\'t match');
      return {
        success: Boolean(!msg.length),
        msg: msg.join('. ')
      };
    }
  }]);

  return Validator;
}();

var Context =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Context, _Emitter);

  function Context(id, events) {
    var _this;

    _classCallCheck(this, Context);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Context).call(this, events));

    _defineProperty(_assertThisInitialized(_this), "id", void 0);

    _defineProperty(_assertThisInitialized(_this), "plugins", void 0);

    _defineProperty(_assertThisInitialized(_this), "components", void 0);

    if (!Validator.isValidId(id)) throw new Error('ID should be valid to name@0.1.0 format');
    _this.id = id;
    _this.plugins = new Map();
    _this.components = new Map();
    return _this;
  }

  _createClass(Context, [{
    key: "use",
    value: function use(plugin, options) {
      if (plugin.name && this.plugins.has(plugin.name)) throw new Error("Plugin ".concat(plugin.name, " already in use"));
      plugin.install(this, options || {});
      this.plugins.set(plugin.name, options);
    }
  }, {
    key: "register",
    value: function register(component) {
      if (this.components.has(component.name)) throw new Error("Component ".concat(component.name, " already registered"));
      this.components.set(component.name, component);
      this.trigger('componentregister', component);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.trigger('destroy');
    }
  }]);

  return Context;
}(Emitter);

function listenWindow(event, handler) {
  window.addEventListener(event, handler);
  return function () {
    window.removeEventListener(event, handler);
  };
}

var Drag =
/*#__PURE__*/
function () {
  function Drag(el) {
    var onTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_x, _y, _e) {};
    var onStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (_e) {};
    var onDrag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_e) {};

    _classCallCheck(this, Drag);

    this.onTranslate = onTranslate;
    this.onStart = onStart;
    this.onDrag = onDrag;

    _defineProperty(this, "pointerStart", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "destroy", void 0);

    this.pointerStart = null;
    this.el = el;
    this.el.style.touchAction = 'none';
    this.el.addEventListener('pointerdown', this.down.bind(this));
    var destroyMove = listenWindow('pointermove', this.move.bind(this));
    var destroyUp = listenWindow('pointerup', this.up.bind(this));

    this.destroy = function () {
      destroyMove();
      destroyUp();
    };
  }

  _createClass(Drag, [{
    key: "down",
    value: function down(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.stopPropagation();
      this.pointerStart = [e.pageX, e.pageY];
      this.onStart(e);
    }
  }, {
    key: "move",
    value: function move(e) {
      if (!this.pointerStart) return;
      e.preventDefault();
      var _ref = [e.pageX, e.pageY],
          x = _ref[0],
          y = _ref[1];
      var delta = [x - this.pointerStart[0], y - this.pointerStart[1]];
      var zoom = this.el.getBoundingClientRect().width / this.el.offsetWidth;
      this.onTranslate(delta[0] / zoom, delta[1] / zoom, e);
    }
  }, {
    key: "up",
    value: function up(e) {
      if (!this.pointerStart) return;
      this.pointerStart = null;
      this.onDrag(e);
    }
  }]);

  return Drag;
}();

var Zoom =
/*#__PURE__*/
function () {
  function Zoom(container, el, intensity, onzoom) {
    _classCallCheck(this, Zoom);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "intensity", void 0);

    _defineProperty(this, "onzoom", void 0);

    _defineProperty(this, "previous", null);

    _defineProperty(this, "pointers", []);

    _defineProperty(this, "destroy", void 0);

    this.el = el;
    this.intensity = intensity;
    this.onzoom = onzoom;
    container.addEventListener('wheel', this.wheel.bind(this));
    container.addEventListener('pointerdown', this.down.bind(this));
    container.addEventListener('dblclick', this.dblclick.bind(this));
    var destroyMove = listenWindow('pointermove', this.move.bind(this));
    var destroyUp = listenWindow('pointerup', this.end.bind(this));
    var destroyCancel = listenWindow('pointercancel', this.end.bind(this));

    this.destroy = function () {
      destroyMove();
      destroyUp();
      destroyCancel();
    };
  }

  _createClass(Zoom, [{
    key: "wheel",
    value: function wheel(e) {
      e.preventDefault();
      var rect = this.el.getBoundingClientRect();
      var isNegative = e.deltaY < 0;
      var delta = isNegative ? this.intensity : -this.intensity;
      var ox = (rect.left - e.clientX) * delta;
      var oy = (rect.top - e.clientY) * delta;
      this.onzoom(delta, ox, oy, 'wheel');
    }
  }, {
    key: "touches",
    value: function touches() {
      var e = {
        touches: this.pointers
      };
      var _ref = [e.touches[0].clientX, e.touches[0].clientY],
          x1 = _ref[0],
          y1 = _ref[1];
      var _ref2 = [e.touches[1].clientX, e.touches[1].clientY],
          x2 = _ref2[0],
          y2 = _ref2[1];
      var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      return {
        cx: (x1 + x2) / 2,
        cy: (y1 + y2) / 2,
        distance: distance
      };
    }
  }, {
    key: "down",
    value: function down(e) {
      this.pointers.push(e);
    }
  }, {
    key: "move",
    value: function move(e) {
      this.pointers = this.pointers.map(function (p) {
        return p.pointerId === e.pointerId ? e : p;
      });
      if (!this.translating) return;
      var rect = this.el.getBoundingClientRect();

      var _this$touches = this.touches(),
          cx = _this$touches.cx,
          cy = _this$touches.cy,
          distance = _this$touches.distance;

      if (this.previous !== null) {
        var delta = distance / this.previous.distance - 1;
        var ox = (rect.left - cx) * delta;
        var oy = (rect.top - cy) * delta;
        this.onzoom(delta, ox - (this.previous.cx - cx), oy - (this.previous.cy - cy), 'touch');
      }

      this.previous = {
        cx: cx,
        cy: cy,
        distance: distance
      };
    }
  }, {
    key: "end",
    value: function end(e) {
      this.previous = null;
      this.pointers = this.pointers.filter(function (p) {
        return p.pointerId !== e.pointerId;
      });
    }
  }, {
    key: "dblclick",
    value: function dblclick(e) {
      e.preventDefault();
      var rect = this.el.getBoundingClientRect();
      var delta = 4 * this.intensity;
      var ox = (rect.left - e.clientX) * delta;
      var oy = (rect.top - e.clientY) * delta;
      this.onzoom(delta, ox, oy, 'dblclick');
    }
  }, {
    key: "translating",
    get: function get() {
      // is translating while zoom (works on multitouch)
      return this.pointers.length >= 2;
    }
  }]);

  return Zoom;
}();

var Area =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Area, _Emitter);

  function Area(container, emitter) {
    var _this;

    _classCallCheck(this, Area);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Area).call(this, emitter));

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "transform", {
      k: 1,
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_this), "mouse", {
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_startPosition", null);

    _defineProperty(_assertThisInitialized(_this), "_zoom", void 0);

    _defineProperty(_assertThisInitialized(_this), "_drag", void 0);

    var el = _this.el = document.createElement('div');
    _this.container = container;
    el.style.transformOrigin = '0 0';
    _this._zoom = new Zoom(container, el, 0.1, _this.onZoom.bind(_assertThisInitialized(_this)));
    _this._drag = new Drag(container, _this.onTranslate.bind(_assertThisInitialized(_this)), _this.onStart.bind(_assertThisInitialized(_this)));
    emitter.on('destroy', function () {
      _this._zoom.destroy();

      _this._drag.destroy();
    });

    _this.container.addEventListener('pointermove', _this.pointermove.bind(_assertThisInitialized(_this)));

    _this.update();

    return _this;
  }

  _createClass(Area, [{
    key: "update",
    value: function update() {
      var t = this.transform;
      this.el.style.transform = "translate(".concat(t.x, "px, ").concat(t.y, "px) scale(").concat(t.k, ")");
    }
  }, {
    key: "pointermove",
    value: function pointermove(e) {
      var clientX = e.clientX,
          clientY = e.clientY;
      var rect = this.el.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      var k = this.transform.k;
      this.mouse = {
        x: x / k,
        y: y / k
      };
      this.trigger('mousemove', _objectSpread({}, this.mouse)); // TODO rename on `pointermove`
    }
  }, {
    key: "onStart",
    value: function onStart() {
      this._startPosition = _objectSpread({}, this.transform);
    }
  }, {
    key: "onTranslate",
    value: function onTranslate(dx, dy) {
      if (this._zoom.translating) return; // lock translation while zoom on multitouch

      if (this._startPosition) this.translate(this._startPosition.x + dx, this._startPosition.y + dy);
    }
  }, {
    key: "onZoom",
    value: function onZoom(delta, ox, oy, source) {
      this.zoom(this.transform.k * (1 + delta), ox, oy, source);
      this.update();
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      var params = {
        transform: this.transform,
        x: x,
        y: y
      };
      if (!this.trigger('translate', params)) return;
      this.transform.x = params.x;
      this.transform.y = params.y;
      this.update();
      this.trigger('translated');
    }
  }, {
    key: "zoom",
    value: function zoom(_zoom) {
      var ox = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var oy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var source = arguments.length > 3 ? arguments[3] : undefined;
      var k = this.transform.k;
      var params = {
        transform: this.transform,
        zoom: _zoom,
        source: source
      };
      if (!this.trigger('zoom', params)) return;
      var d = (k - params.zoom) / (k - _zoom || 1);
      this.transform.k = params.zoom || 1;
      this.transform.x += ox * d;
      this.transform.y += oy * d;
      this.update();
      this.trigger('zoomed', {
        source: source
      });
    }
  }, {
    key: "appendChild",
    value: function appendChild(el) {
      this.el.appendChild(el);
    }
  }, {
    key: "removeChild",
    value: function removeChild(el) {
      this.el.removeChild(el);
    }
  }]);

  return Area;
}(Emitter);

var ConnectionView =
/*#__PURE__*/
function (_Emitter) {
  _inherits(ConnectionView, _Emitter);

  function ConnectionView(connection, inputNode, outputNode, emitter) {
    var _this;

    _classCallCheck(this, ConnectionView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectionView).call(this, emitter));

    _defineProperty(_assertThisInitialized(_this), "connection", void 0);

    _defineProperty(_assertThisInitialized(_this), "inputNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "outputNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _this.connection = connection;
    _this.inputNode = inputNode;
    _this.outputNode = outputNode;
    _this.el = document.createElement('div');
    _this.el.style.position = 'absolute';
    _this.el.style.zIndex = '-1';

    _this.trigger('renderconnection', {
      el: _this.el,
      connection: _this.connection,
      points: _this.getPoints()
    });

    return _this;
  }

  _createClass(ConnectionView, [{
    key: "getPoints",
    value: function getPoints() {
      var _this$connection = this.connection,
          input = _this$connection.input,
          output = _this$connection.output;

      if (this.inputNode.hasSocket(input) && this.outputNode.hasSocket(output)) {
        var _this$outputNode$getS = this.outputNode.getSocketPosition(output),
            _this$outputNode$getS2 = _slicedToArray(_this$outputNode$getS, 2),
            x1 = _this$outputNode$getS2[0],
            y1 = _this$outputNode$getS2[1];

        var _this$inputNode$getSo = this.inputNode.getSocketPosition(input),
            _this$inputNode$getSo2 = _slicedToArray(_this$inputNode$getSo, 2),
            x2 = _this$inputNode$getSo2[0],
            y2 = _this$inputNode$getSo2[1];

        return [x1, y1, x2, y2];
      }

      return [0, 0, 0, 0];
    }
  }, {
    key: "update",
    value: function update() {
      this.trigger('updateconnection', {
        el: this.el,
        connection: this.connection,
        points: this.getPoints()
      });
    }
  }]);

  return ConnectionView;
}(Emitter);

var ControlView =
/*#__PURE__*/
function (_Emitter) {
  _inherits(ControlView, _Emitter);

  function ControlView(el, control, emitter) {
    var _this;

    _classCallCheck(this, ControlView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ControlView).call(this, emitter));

    _this.trigger('rendercontrol', {
      el: el,
      control: control
    });

    return _this;
  }

  return ControlView;
}(Emitter);

var SocketView =
/*#__PURE__*/
function (_Emitter) {
  _inherits(SocketView, _Emitter);

  function SocketView(el, type, io, node, emitter) {
    var _this$trigger;

    var _this;

    _classCallCheck(this, SocketView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SocketView).call(this, emitter));

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", void 0);

    _defineProperty(_assertThisInitialized(_this), "io", void 0);

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    _this.el = el;
    _this.type = type;
    _this.io = io;
    _this.node = node;

    _this.trigger('rendersocket', (_this$trigger = {
      el: el
    }, _defineProperty(_this$trigger, type, _this.io), _defineProperty(_this$trigger, "socket", io.socket), _this$trigger));

    return _this;
  }

  _createClass(SocketView, [{
    key: "getPosition",
    value: function getPosition(_ref) {
      var position = _ref.position;
      var el = this.el;
      return [position[0] + el.offsetLeft + el.offsetWidth / 2, position[1] + el.offsetTop + el.offsetHeight / 2];
    }
  }]);

  return SocketView;
}(Emitter);

var NodeView =
/*#__PURE__*/
function (_Emitter) {
  _inherits(NodeView, _Emitter);

  function NodeView(node, component, emitter) {
    var _this;

    _classCallCheck(this, NodeView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeView).call(this, emitter));

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    _defineProperty(_assertThisInitialized(_this), "component", void 0);

    _defineProperty(_assertThisInitialized(_this), "sockets", new Map());

    _defineProperty(_assertThisInitialized(_this), "controls", new Map());

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "_startPosition", []);

    _defineProperty(_assertThisInitialized(_this), "_drag", void 0);

    _this.node = node;
    _this.component = component;
    _this.el = document.createElement('div');
    _this.el.style.position = 'absolute';

    _this.el.addEventListener('contextmenu', function (e) {
      return _this.trigger('contextmenu', {
        e: e,
        node: _this.node
      });
    });

    _this._drag = new Drag(_this.el, _this.onTranslate.bind(_assertThisInitialized(_this)), _this.onSelect.bind(_assertThisInitialized(_this)), function () {
      _this.trigger('nodedraged', node);

      _this.trigger('nodedragged', node);
    });

    _this.trigger('rendernode', {
      el: _this.el,
      node: node,
      component: component.data,
      bindSocket: _this.bindSocket.bind(_assertThisInitialized(_this)),
      bindControl: _this.bindControl.bind(_assertThisInitialized(_this))
    });

    _this.update();

    return _this;
  }

  _createClass(NodeView, [{
    key: "clearSockets",
    value: function clearSockets() {
      var _this2 = this;

      var ios = [].concat(_toConsumableArray(this.node.inputs.values()), _toConsumableArray(this.node.outputs.values()));
      this.sockets.forEach(function (s) {
        if (!ios.includes(s.io)) _this2.sockets["delete"](s.io);
      });
    }
  }, {
    key: "bindSocket",
    value: function bindSocket(el, type, io) {
      this.clearSockets();
      this.sockets.set(io, new SocketView(el, type, io, this.node, this));
    }
  }, {
    key: "bindControl",
    value: function bindControl(el, control) {
      this.controls.set(control, new ControlView(el, control, this));
    }
  }, {
    key: "hasSocket",
    value: function hasSocket(io) {
      return this.sockets.has(io);
    }
  }, {
    key: "getSocketPosition",
    value: function getSocketPosition(io) {
      var socket = this.sockets.get(io);
      if (!socket) throw new Error("Socket not found for ".concat(io.name, " with key ").concat(io.key));
      return socket.getPosition(this.node);
    }
  }, {
    key: "onSelect",
    value: function onSelect(e) {
      var payload = {
        node: this.node,
        accumulate: e.ctrlKey,
        e: e
      };
      this.onStart();
      this.trigger('multiselectnode', payload);
      this.trigger('selectnode', payload);
    }
  }, {
    key: "onStart",
    value: function onStart() {
      this._startPosition = _toConsumableArray(this.node.position);
    }
  }, {
    key: "onTranslate",
    value: function onTranslate(dx, dy) {
      this.trigger('translatenode', {
        node: this.node,
        dx: dx,
        dy: dy
      });
    }
  }, {
    key: "onDrag",
    value: function onDrag(dx, dy) {
      var x = this._startPosition[0] + dx;
      var y = this._startPosition[1] + dy;
      this.translate(x, y);
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      var node = this.node;
      var params = {
        node: node,
        x: x,
        y: y
      };
      if (!this.trigger('nodetranslate', params)) return;

      var _node$position = _slicedToArray(node.position, 2),
          px = _node$position[0],
          py = _node$position[1];

      var prev = [px, py];
      node.position[0] = params.x;
      node.position[1] = params.y;
      this.update();
      this.trigger('nodetranslated', {
        node: node,
        prev: prev
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this$node$position = _slicedToArray(this.node.position, 2),
          x = _this$node$position[0],
          y = _this$node$position[1];

      this.el.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
    }
  }, {
    key: "remove",
    value: function remove() {}
  }, {
    key: "destroy",
    value: function destroy() {
      this._drag.destroy();
    }
  }]);

  return NodeView;
}(Emitter);

var EditorView =
/*#__PURE__*/
function (_Emitter) {
  _inherits(EditorView, _Emitter);

  // eslint-disable-next-line max-statements
  function EditorView(container, components, emitter) {
    var _this;

    _classCallCheck(this, EditorView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditorView).call(this, emitter));

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "components", void 0);

    _defineProperty(_assertThisInitialized(_this), "nodes", new Map());

    _defineProperty(_assertThisInitialized(_this), "connections", new Map());

    _defineProperty(_assertThisInitialized(_this), "area", void 0);

    _this.container = container;
    _this.components = components;
    _this.container.style.overflow = 'hidden';

    _this.container.addEventListener('click', _this.click.bind(_assertThisInitialized(_this)));

    _this.container.addEventListener('contextmenu', function (e) {
      return _this.trigger('contextmenu', {
        e: e,
        view: _assertThisInitialized(_this)
      });
    });

    emitter.on('destroy', listenWindow('resize', _this.resize.bind(_assertThisInitialized(_this))));
    emitter.on('destroy', function () {
      return _this.nodes.forEach(function (view) {
        return view.destroy();
      });
    });

    _this.on('nodetranslated', _this.updateConnections.bind(_assertThisInitialized(_this)));

    _this.on('rendersocket', function (_ref) {
      var socket = _ref.socket;
      var connections = Array.from(_this.connections.entries());
      var relatedConnections = connections.filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            connection = _ref3[0];

        var input = connection.input,
            output = connection.output;
        return [input.socket, output.socket].includes(socket);
      });
      relatedConnections.forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            _ = _ref5[0],
            view = _ref5[1];

        return requestAnimationFrame(function () {
          return view.update();
        });
      });
    });

    _this.area = new Area(container, _assertThisInitialized(_this));

    _this.container.appendChild(_this.area.el);

    return _this;
  }

  _createClass(EditorView, [{
    key: "addNode",
    value: function addNode(node) {
      var component = this.components.get(node.name);
      if (!component) throw new Error("Component ".concat(node.name, " not found"));
      var nodeView = new NodeView(node, component, this);
      this.nodes.set(node, nodeView);
      this.area.appendChild(nodeView.el);
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var nodeView = this.nodes.get(node);
      this.nodes["delete"](node);

      if (nodeView) {
        this.area.removeChild(nodeView.el);
        nodeView.destroy();
      }
    }
  }, {
    key: "addConnection",
    value: function addConnection(connection) {
      if (!connection.input.node || !connection.output.node) throw new Error('Connection input or output not added to node');
      var viewInput = this.nodes.get(connection.input.node);
      var viewOutput = this.nodes.get(connection.output.node);
      if (!viewInput || !viewOutput) throw new Error('View node not found for input or output');
      var connView = new ConnectionView(connection, viewInput, viewOutput, this);
      this.connections.set(connection, connView);
      this.area.appendChild(connView.el);
    }
  }, {
    key: "removeConnection",
    value: function removeConnection(connection) {
      var connView = this.connections.get(connection);
      this.connections["delete"](connection);
      if (connView) this.area.removeChild(connView.el);
    }
  }, {
    key: "updateConnections",
    value: function updateConnections(_ref6) {
      var _this2 = this;

      var node = _ref6.node;
      node.getConnections().forEach(function (conn) {
        var connView = _this2.connections.get(conn);

        if (!connView) throw new Error('Connection view not found');
        connView.update();
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var container = this.container;
      if (!container.parentElement) throw new Error('Container doesn\'t have parent element');
      var width = container.parentElement.clientWidth;
      var height = container.parentElement.clientHeight;
      container.style.width = width + 'px';
      container.style.height = height + 'px';
    }
  }, {
    key: "click",
    value: function click(e) {
      var container = this.container;
      if (container !== e.target) return;
      if (!this.trigger('click', {
        e: e,
        container: container
      })) return;
    }
  }]);

  return EditorView;
}(Emitter);

var Selected =
/*#__PURE__*/
function () {
  function Selected() {
    _classCallCheck(this, Selected);

    _defineProperty(this, "list", []);
  }

  _createClass(Selected, [{
    key: "add",
    value: function add(item) {
      var accumulate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!accumulate) this.list = [item];else if (!this.contains(item)) this.list.push(item);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.list = [];
    }
  }, {
    key: "remove",
    value: function remove(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }
  }, {
    key: "contains",
    value: function contains(item) {
      return this.list.indexOf(item) !== -1;
    }
  }, {
    key: "each",
    value: function each(callback) {
      this.list.forEach(callback);
    }
  }]);

  return Selected;
}();

var Events = function Events(handlers) {
  _classCallCheck(this, Events);

  _defineProperty(this, "handlers", void 0);

  this.handlers = _objectSpread({
    warn: [console.warn],
    error: [console.error],
    componentregister: [],
    destroy: []
  }, handlers);
};

var EditorEvents =
/*#__PURE__*/
function (_Events) {
  _inherits(EditorEvents, _Events);

  function EditorEvents() {
    _classCallCheck(this, EditorEvents);

    return _possibleConstructorReturn(this, _getPrototypeOf(EditorEvents).call(this, {
      nodecreate: [],
      nodecreated: [],
      noderemove: [],
      noderemoved: [],
      connectioncreate: [],
      connectioncreated: [],
      connectionremove: [],
      connectionremoved: [],
      translatenode: [],
      nodetranslate: [],
      nodetranslated: [],
      nodedraged: [],
      nodedragged: [],
      selectnode: [],
      multiselectnode: [],
      nodeselect: [],
      nodeselected: [],
      rendernode: [],
      rendersocket: [],
      rendercontrol: [],
      renderconnection: [],
      updateconnection: [],
      keydown: [],
      keyup: [],
      translate: [],
      translated: [],
      zoom: [],
      zoomed: [],
      click: [],
      mousemove: [],
      contextmenu: [],
      "import": [],
      "export": [],
      process: [],
      clear: []
    }));
  }

  return EditorEvents;
}(Events);

var NodeEditor =
/*#__PURE__*/
function (_Context) {
  _inherits(NodeEditor, _Context);

  function NodeEditor(id, container) {
    var _this;

    _classCallCheck(this, NodeEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeEditor).call(this, id, new EditorEvents()));

    _defineProperty(_assertThisInitialized(_this), "nodes", []);

    _defineProperty(_assertThisInitialized(_this), "selected", new Selected());

    _defineProperty(_assertThisInitialized(_this), "view", void 0);

    _this.view = new EditorView(container, _this.components, _assertThisInitialized(_this));

    _this.on('destroy', listenWindow('keydown', function (e) {
      return _this.trigger('keydown', e);
    }));

    _this.on('destroy', listenWindow('keyup', function (e) {
      return _this.trigger('keyup', e);
    }));

    _this.on('selectnode', function (_ref) {
      var node = _ref.node,
          accumulate = _ref.accumulate;
      return _this.selectNode(node, accumulate);
    });

    _this.on('nodeselected', function () {
      return _this.selected.each(function (n) {
        var nodeView = _this.view.nodes.get(n);

        nodeView && nodeView.onStart();
      });
    });

    _this.on('translatenode', function (_ref2) {
      var dx = _ref2.dx,
          dy = _ref2.dy;
      return _this.selected.each(function (n) {
        var nodeView = _this.view.nodes.get(n);

        nodeView && nodeView.onDrag(dx, dy);
      });
    });

    return _this;
  }

  _createClass(NodeEditor, [{
    key: "addNode",
    value: function addNode(node) {
      if (!this.trigger('nodecreate', node)) return;
      this.nodes.push(node);
      this.view.addNode(node);
      this.trigger('nodecreated', node);
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var _this2 = this;

      if (!this.trigger('noderemove', node)) return;
      node.getConnections().forEach(function (c) {
        return _this2.removeConnection(c);
      });
      this.nodes.splice(this.nodes.indexOf(node), 1);
      this.view.removeNode(node);
      this.trigger('noderemoved', node);
    }
  }, {
    key: "connect",
    value: function connect(output, input) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.trigger('connectioncreate', {
        output: output,
        input: input
      })) return;

      try {
        var connection = output.connectTo(input);
        connection.data = data;
        this.view.addConnection(connection);
        this.trigger('connectioncreated', connection);
      } catch (e) {
        this.trigger('warn', e);
      }
    }
  }, {
    key: "removeConnection",
    value: function removeConnection(connection) {
      if (!this.trigger('connectionremove', connection)) return;
      this.view.removeConnection(connection);
      connection.remove();
      this.trigger('connectionremoved', connection);
    }
  }, {
    key: "selectNode",
    value: function selectNode(node) {
      var accumulate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.nodes.indexOf(node) === -1) throw new Error('Node not exist in list');
      if (!this.trigger('nodeselect', node)) return;
      this.selected.add(node, accumulate);
      this.trigger('nodeselected', node);
    }
  }, {
    key: "getComponent",
    value: function getComponent(name) {
      var component = this.components.get(name);
      if (!component) throw "Component ".concat(name, " not found");
      return component;
    }
  }, {
    key: "register",
    value: function register(component) {
      _get(_getPrototypeOf(NodeEditor.prototype), "register", this).call(this, component);

      component.editor = this;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this3 = this;

      _toConsumableArray(this.nodes).forEach(function (node) {
        return _this3.removeNode(node);
      });

      this.trigger('clear');
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        id: this.id,
        nodes: {}
      };
      this.nodes.forEach(function (node) {
        return data.nodes[node.id] = node.toJSON();
      });
      this.trigger('export', data);
      return data;
    }
  }, {
    key: "beforeImport",
    value: function beforeImport(json) {
      var checking = Validator.validate(this.id, json);

      if (!checking.success) {
        this.trigger('warn', checking.msg);
        return false;
      }

      this.silent = true;
      this.clear();
      this.trigger('import', json);
      return true;
    }
  }, {
    key: "afterImport",
    value: function afterImport() {
      this.silent = false;
      return true;
    }
  }, {
    key: "fromJSON",
    value: function () {
      var _fromJSON = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(json) {
        var _this4 = this;

        var nodes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.beforeImport(json)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                nodes = {};
                _context2.prev = 3;
                _context2.next = 6;
                return Promise.all(Object.keys(json.nodes).map(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(id) {
                    var node, component;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            node = json.nodes[id];
                            component = _this4.getComponent(node.name);
                            _context.next = 4;
                            return component.build(Node.fromJSON(node));

                          case 4:
                            nodes[id] = _context.sent;

                            _this4.addNode(nodes[id]);

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 6:
                Object.keys(json.nodes).forEach(function (id) {
                  var jsonNode = json.nodes[id];
                  var node = nodes[id];
                  Object.keys(jsonNode.outputs).forEach(function (key) {
                    var outputJson = jsonNode.outputs[key];
                    outputJson.connections.forEach(function (jsonConnection) {
                      var nodeId = jsonConnection.node;
                      var data = jsonConnection.data;
                      var targetOutput = node.outputs.get(key);
                      var targetInput = nodes[nodeId].inputs.get(jsonConnection.input);

                      if (!targetOutput || !targetInput) {
                        return _this4.trigger('error', "IO not found for node ".concat(node.id));
                      }

                      _this4.connect(targetOutput, targetInput, data);
                    });
                  });
                });
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                this.trigger('warn', _context2.t0);
                return _context2.abrupt("return", !this.afterImport());

              case 13:
                return _context2.abrupt("return", this.afterImport());

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      function fromJSON(_x) {
        return _fromJSON.apply(this, arguments);
      }

      return fromJSON;
    }()
  }]);

  return NodeEditor;
}(Context);

var Output =
/*#__PURE__*/
function (_IO) {
  _inherits(Output, _IO);

  function Output(key, title, socket) {
    var multiConns = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    _classCallCheck(this, Output);

    return _possibleConstructorReturn(this, _getPrototypeOf(Output).call(this, key, title, socket, multiConns));
  }

  _createClass(Output, [{
    key: "hasConnection",
    value: function hasConnection() {
      return this.connections.length > 0;
    }
  }, {
    key: "connectTo",
    value: function connectTo(input) {
      if (!this.socket.compatibleWith(input.socket)) throw new Error('Sockets not compatible');
      if (!input.multipleConnections && input.hasConnection()) throw new Error('Input already has one connection');
      if (!this.multipleConnections && this.hasConnection()) throw new Error('Output already has one connection');
      var connection = new Connection(this, input);
      this.connections.push(connection);
      return connection;
    }
  }, {
    key: "connectedTo",
    value: function connectedTo(input) {
      return this.connections.some(function (item) {
        return item.input === input;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        'connections': this.connections.map(function (c) {
          if (!c.input.node) throw new Error('Node not added to Input');
          return {
            node: c.input.node.id,
            input: c.input.key,
            data: c.data
          };
        })
      };
    }
  }]);

  return Output;
}(IO);

var Socket =
/*#__PURE__*/
function () {
  function Socket(name) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Socket);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "compatible", []);

    this.name = name;
    this.data = data;
    this.compatible = [];
  }

  _createClass(Socket, [{
    key: "combineWith",
    value: function combineWith(socket) {
      this.compatible.push(socket);
    }
  }, {
    key: "compatibleWith",
    value: function compatibleWith(socket) {
      return this === socket || this.compatible.includes(socket);
    }
  }]);

  return Socket;
}();

function intersect(array1, array2) {
  return array1.filter(function (value) {
    return -1 !== array2.indexOf(value);
  });
}

var Recursion =
/*#__PURE__*/
function () {
  function Recursion(nodes) {
    _classCallCheck(this, Recursion);

    _defineProperty(this, "nodes", void 0);

    this.nodes = nodes;
  }

  _createClass(Recursion, [{
    key: "extractInputNodes",
    value: function extractInputNodes(node) {
      var _this = this;

      return Object.keys(node.inputs).reduce(function (acc, key) {
        var connections = node.inputs[key].connections;
        var nodesData = (connections || []).reduce(function (b, c) {
          return [].concat(_toConsumableArray(b), [_this.nodes[c.node]]);
        }, []);
        return [].concat(_toConsumableArray(acc), _toConsumableArray(nodesData));
      }, []);
    }
  }, {
    key: "findSelf",
    value: function findSelf(list, inputNodes) {
      var inters = intersect(list, inputNodes);
      if (inters.length) return inters[0];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = inputNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          var l = [node].concat(_toConsumableArray(list));
          var inter = this.findSelf(l, this.extractInputNodes(node));
          if (inter) return inter;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: "detect",
    value: function detect() {
      var _this2 = this;

      var nodesArr = Object.keys(this.nodes).map(function (id) {
        return _this2.nodes[id];
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nodesArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;
          var inters = this.findSelf([node], this.extractInputNodes(node));
          if (inters) return inters;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return null;
    }
  }]);

  return Recursion;
}();

var State = {
  AVAILABLE: 0,
  PROCESSED: 1,
  ABORT: 2
};

var EngineEvents =
/*#__PURE__*/
function (_Events) {
  _inherits(EngineEvents, _Events);

  function EngineEvents() {
    _classCallCheck(this, EngineEvents);

    return _possibleConstructorReturn(this, _getPrototypeOf(EngineEvents).call(this, {}));
  }

  return EngineEvents;
}(Events);

var Engine =
/*#__PURE__*/
function (_Context) {
  _inherits(Engine, _Context);

  function Engine(id) {
    var _this;

    _classCallCheck(this, Engine);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Engine).call(this, id, new EngineEvents()));

    _defineProperty(_assertThisInitialized(_this), "args", []);

    _defineProperty(_assertThisInitialized(_this), "data", null);

    _defineProperty(_assertThisInitialized(_this), "state", State.AVAILABLE);

    _defineProperty(_assertThisInitialized(_this), "forwarded", new Set());

    _defineProperty(_assertThisInitialized(_this), "onAbort", function () {});

    return _this;
  }

  _createClass(Engine, [{
    key: "clone",
    value: function clone() {
      var engine = new Engine(this.id);
      this.components.forEach(function (c) {
        return engine.register(c);
      });
      return engine;
    }
  }, {
    key: "throwError",
    value: function () {
      var _throwError = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(message) {
        var data,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                _context.next = 3;
                return this.abort();

              case 3:
                this.trigger('error', {
                  message: message,
                  data: data
                });
                this.processDone();
                return _context.abrupt("return", 'error');

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function throwError(_x) {
        return _throwError.apply(this, arguments);
      }

      return throwError;
    }()
  }, {
    key: "processStart",
    value: function processStart() {
      if (this.state === State.AVAILABLE) {
        this.state = State.PROCESSED;
        return true;
      }

      if (this.state === State.ABORT) {
        return false;
      }

      console.warn("The process is busy and has not been restarted.\n                Use abort() to force it to complete");
      return false;
    }
  }, {
    key: "processDone",
    value: function processDone() {
      var success = this.state !== State.ABORT;
      this.state = State.AVAILABLE;

      if (!success) {
        this.onAbort();

        this.onAbort = function () {};
      }

      return success;
    }
  }, {
    key: "abort",
    value: function () {
      var _abort = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (ret) {
                  if (_this2.state === State.PROCESSED) {
                    _this2.state = State.ABORT;
                    _this2.onAbort = ret;
                  } else if (_this2.state === State.ABORT) {
                    _this2.onAbort();

                    _this2.onAbort = ret;
                  } else ret();
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function abort() {
        return _abort.apply(this, arguments);
      }

      return abort;
    }()
  }, {
    key: "lock",
    value: function () {
      var _lock = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(node) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (res) {
                  node.unlockPool = node.unlockPool || [];
                  if (node.busy && !node.outputData) node.unlockPool.push(res);else res();
                  node.busy = true;
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function lock(_x2) {
        return _lock.apply(this, arguments);
      }

      return lock;
    }()
  }, {
    key: "unlock",
    value: function unlock(node) {
      node.unlockPool.forEach(function (a) {
        return a();
      });
      node.unlockPool = [];
      node.busy = false;
    }
  }, {
    key: "extractInputData",
    value: function () {
      var _extractInputData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(node) {
        var _this3 = this;

        var obj, _i, _Object$keys, key, input, conns, connData;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                obj = {};
                _i = 0, _Object$keys = Object.keys(node.inputs);

              case 2:
                if (!(_i < _Object$keys.length)) {
                  _context5.next = 13;
                  break;
                }

                key = _Object$keys[_i];
                input = node.inputs[key];
                conns = input.connections;
                _context5.next = 8;
                return Promise.all(conns.map(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee4(c) {
                    var prevNode, outputs;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            prevNode = _this3.data.nodes[c.node];
                            _context4.next = 3;
                            return _this3.processNode(prevNode);

                          case 3:
                            outputs = _context4.sent;

                            if (outputs) {
                              _context4.next = 8;
                              break;
                            }

                            _this3.abort();

                            _context4.next = 9;
                            break;

                          case 8:
                            return _context4.abrupt("return", outputs[c.output]);

                          case 9:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x4) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 8:
                connData = _context5.sent;
                obj[key] = connData;

              case 10:
                _i++;
                _context5.next = 2;
                break;

              case 13:
                return _context5.abrupt("return", obj);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function extractInputData(_x3) {
        return _extractInputData.apply(this, arguments);
      }

      return extractInputData;
    }()
  }, {
    key: "processWorker",
    value: function () {
      var _processWorker = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(node) {
        var inputData, component, outputData;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.extractInputData(node);

              case 2:
                inputData = _context6.sent;
                component = this.components.get(node.name);
                outputData = {};
                _context6.prev = 5;
                _context6.next = 8;
                return component.worker.apply(component, [node, inputData, outputData].concat(_toConsumableArray(this.args)));

              case 8:
                _context6.next = 14;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](5);
                this.abort();
                this.trigger('warn', _context6.t0);

              case 14:
                return _context6.abrupt("return", outputData);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[5, 10]]);
      }));

      function processWorker(_x5) {
        return _processWorker.apply(this, arguments);
      }

      return processWorker;
    }()
  }, {
    key: "processNode",
    value: function () {
      var _processNode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(node) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this.state === State.ABORT || !node)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", null);

              case 2:
                _context7.next = 4;
                return this.lock(node);

              case 4:
                if (node.outputData) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 7;
                return this.processWorker(node);

              case 7:
                node.outputData = _context7.sent;

              case 8:
                this.unlock(node);
                return _context7.abrupt("return", node.outputData);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function processNode(_x6) {
        return _processNode.apply(this, arguments);
      }

      return processNode;
    }()
  }, {
    key: "forwardProcess",
    value: function () {
      var _forwardProcess = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(node) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.state === State.ABORT)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", null);

              case 2:
                _context10.next = 4;
                return Promise.all(Object.keys(node.outputs).map(
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee9(key) {
                    var output;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            output = node.outputs[key];
                            _context9.next = 3;
                            return Promise.all(output.connections.map(
                            /*#__PURE__*/
                            function () {
                              var _ref3 = _asyncToGenerator(
                              /*#__PURE__*/
                              regeneratorRuntime.mark(function _callee8(c) {
                                var nextNode;
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                  while (1) {
                                    switch (_context8.prev = _context8.next) {
                                      case 0:
                                        nextNode = _this4.data.nodes[c.node];

                                        if (_this4.forwarded.has(nextNode)) {
                                          _context8.next = 7;
                                          break;
                                        }

                                        _this4.forwarded.add(nextNode);

                                        _context8.next = 5;
                                        return _this4.processNode(nextNode);

                                      case 5:
                                        _context8.next = 7;
                                        return _this4.forwardProcess(nextNode);

                                      case 7:
                                      case "end":
                                        return _context8.stop();
                                    }
                                  }
                                }, _callee8);
                              }));

                              return function (_x9) {
                                return _ref3.apply(this, arguments);
                              };
                            }()));

                          case 3:
                            return _context9.abrupt("return", _context9.sent);

                          case 4:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x8) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function forwardProcess(_x7) {
        return _forwardProcess.apply(this, arguments);
      }

      return forwardProcess;
    }()
  }, {
    key: "copy",
    value: function copy(data) {
      data = Object.assign({}, data);
      data.nodes = Object.assign({}, data.nodes);
      Object.keys(data.nodes).forEach(function (key) {
        data.nodes[key] = Object.assign({}, data.nodes[key]);
      });
      return data;
    }
  }, {
    key: "validate",
    value: function () {
      var _validate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(data) {
        var checking, recursion, recurrentNode;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                checking = Validator.validate(this.id, data);
                recursion = new Recursion(data.nodes);

                if (checking.success) {
                  _context11.next = 6;
                  break;
                }

                _context11.next = 5;
                return this.throwError(checking.msg);

              case 5:
                return _context11.abrupt("return", _context11.sent);

              case 6:
                recurrentNode = recursion.detect();

                if (!recurrentNode) {
                  _context11.next = 11;
                  break;
                }

                _context11.next = 10;
                return this.throwError('Recursion detected', recurrentNode);

              case 10:
                return _context11.abrupt("return", _context11.sent);

              case 11:
                return _context11.abrupt("return", true);

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function validate(_x10) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "processStartNode",
    value: function () {
      var _processStartNode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(id) {
        var startNode;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (id) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return");

              case 2:
                startNode = this.data.nodes[id];

                if (startNode) {
                  _context12.next = 7;
                  break;
                }

                _context12.next = 6;
                return this.throwError('Node with such id not found');

              case 6:
                return _context12.abrupt("return", _context12.sent);

              case 7:
                _context12.next = 9;
                return this.processNode(startNode);

              case 9:
                _context12.next = 11;
                return this.forwardProcess(startNode);

              case 11:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function processStartNode(_x11) {
        return _processStartNode.apply(this, arguments);
      }

      return processStartNode;
    }()
  }, {
    key: "processUnreachable",
    value: function () {
      var _processUnreachable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13() {
        var data, i, node;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                data = this.data;
                _context13.t0 = regeneratorRuntime.keys(data.nodes);

              case 2:
                if ((_context13.t1 = _context13.t0()).done) {
                  _context13.next = 12;
                  break;
                }

                i = _context13.t1.value;
                // process nodes that have not been reached
                node = data.nodes[i];

                if (!(typeof node.outputData === 'undefined')) {
                  _context13.next = 10;
                  break;
                }

                _context13.next = 8;
                return this.processNode(node);

              case 8:
                _context13.next = 10;
                return this.forwardProcess(node);

              case 10:
                _context13.next = 2;
                break;

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function processUnreachable() {
        return _processUnreachable.apply(this, arguments);
      }

      return processUnreachable;
    }()
  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(data) {
        var startId,
            _len,
            args,
            _key,
            _args14 = arguments;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                startId = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : null;

                if (this.processStart()) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt("return");

              case 3:
                if (this.validate(data)) {
                  _context14.next = 5;
                  break;
                }

                return _context14.abrupt("return");

              case 5:
                this.data = this.copy(data);

                for (_len = _args14.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                  args[_key - 2] = _args14[_key];
                }

                this.args = args;
                this.forwarded = new Set();
                _context14.next = 11;
                return this.processStartNode(startId);

              case 11:
                _context14.next = 13;
                return this.processUnreachable();

              case 13:
                return _context14.abrupt("return", this.processDone() ? 'success' : 'aborted');

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function process(_x12) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }]);

  return Engine;
}(Context);

var index = {
  Engine: Engine,
  Recursion: Recursion,
  Component: Component$1,
  Control: Control,
  Connection: Connection,
  Emitter: Emitter,
  Input: Input,
  IO: IO,
  Node: Node,
  NodeEditor: NodeEditor,
  Output: Output,
  Socket: Socket
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);

//# sourceMappingURL=rete.esm.js.map


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/hot-api.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/hot-api.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* binding */ makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy.js */ "./node_modules/svelte-hmr/runtime/proxy.js");
/* eslint-env browser */



const logPrefix = '[HMR:Svelte]'

// eslint-disable-next-line no-console
const log = (...args) => console.log(logPrefix, ...args)

const domReload = () => {
  // eslint-disable-next-line no-undef
  const win = typeof window !== 'undefined' && window
  if (win && win.location && win.location.reload) {
    log('Reload')
    win.location.reload()
  } else {
    log('Full reload required')
  }
}

const replaceCss = (previousId, newId) => {
  if (typeof document === 'undefined') return false
  if (!previousId) return false
  if (!newId) return false
  // svelte-xxx-style => svelte-xxx
  const previousClass = previousId.slice(0, -6)
  const newClass = newId.slice(0, -6)
  // eslint-disable-next-line no-undef
  document.querySelectorAll('.' + previousClass).forEach(el => {
    el.classList.remove(previousClass)
    el.classList.add(newClass)
  })
  return true
}

const removeStylesheet = cssId => {
  if (cssId == null) return
  if (typeof document === 'undefined') return
  // eslint-disable-next-line no-undef
  const el = document.getElementById(cssId)
  if (el) el.remove()
  return
}

const defaultArgs = {
  reload: domReload,
}

const makeApplyHmr = transformArgs => args => {
  const allArgs = transformArgs({ ...defaultArgs, ...args })
  return applyHmr(allArgs)
}

let needsReload = false

function applyHmr(args) {
  const {
    id,
    cssId,
    nonCssHash,
    reload = domReload,
    // normalized hot API (must conform to rollup-plugin-hot)
    hot,
    hotOptions,
    Component,
    acceptable, // some types of components are impossible to HMR correctly
    preserveLocalState,
    ProxyAdapter,
    emitCss,
  } = args

  const existing = hot.data && hot.data.record

  const canAccept = acceptable && (!existing || existing.current.canAccept)

  const r =
    existing ||
    (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.createProxy)({
      Adapter: ProxyAdapter,
      id,
      Component,
      hotOptions,
      canAccept,
      preserveLocalState,
    })

  const cssOnly =
    hotOptions.injectCss &&
    existing &&
    nonCssHash &&
    existing.current.nonCssHash === nonCssHash

  r.update({
    Component,
    hotOptions,
    canAccept,
    nonCssHash,
    cssId,
    previousCssId: r.current.cssId,
    cssOnly,
    preserveLocalState,
  })

  hot.dispose(data => {
    // handle previous fatal errors
    if (needsReload || (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)()) {
      if (hotOptions && hotOptions.noReload) {
        log('Full reload required')
      } else {
        reload()
      }
    }

    // 2020-09-21 Snowpack master doesn't pass data as arg to dispose handler
    data = data || hot.data

    data.record = r

    if (!emitCss && cssId && r.current.cssId !== cssId) {
      if (hotOptions.cssEjectDelay) {
        setTimeout(() => removeStylesheet(cssId), hotOptions.cssEjectDelay)
      } else {
        removeStylesheet(cssId)
      }
    }
  })

  if (canAccept) {
    hot.accept(async arg => {
      const { bubbled } = arg || {}

      // NOTE Snowpack registers accept handlers only once, so we can NOT rely
      // on the surrounding scope variables -- they're not the last version!
      const { cssId: newCssId, previousCssId } = r.current
      const cssChanged = newCssId !== previousCssId
      // ensure old style sheet has been removed by now
      if (!emitCss && cssChanged) removeStylesheet(previousCssId)
      // guard: css only change
      if (
        // NOTE bubbled is provided only by rollup-plugin-hot, and we
        // can't safely assume a CSS only change without it... this means we
        // can't support CSS only injection with Nollup or Webpack currently
        bubbled === false && // WARNING check false, not falsy!
        r.current.cssOnly &&
        (!cssChanged || replaceCss(previousCssId, newCssId))
      ) {
        return
      }

      const success = await r.reload()

      if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)() || (!success && !hotOptions.optimistic)) {
        needsReload = true
      }
    })
  }

  // well, endgame... we won't be able to render next updates, even successful,
  // if we don't have proxies in svelte's tree
  //
  // since we won't return the proxy and the app will expect a svelte component,
  // it's gonna crash... so it's best to report the real cause
  //
  // full reload required
  //
  const proxyOk = r && r.proxy
  if (!proxyOk) {
    throw new Error(`Failed to create HMR proxy for Svelte component ${id}`)
  }

  return r.proxy
}


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/index.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* reexport safe */ _hot_api_js__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _hot_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hot-api.js */ "./node_modules/svelte-hmr/runtime/hot-api.js");



/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/overlay.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/overlay.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-env browser */

const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const ErrorOverlay = () => {
  let errors = []
  let compileError = null

  const errorsTitle = 'Failed to init component'
  const compileErrorTitle = 'Failed to compile'

  const style = {
    section: `
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 32px;
      background: rgba(0, 0, 0, .85);
      font-family: Menlo, Consolas, monospace;
      font-size: large;
      color: rgb(232, 232, 232);
      overflow: auto;
      z-index: 2147483647;
    `,
    h1: `
      margin-top: 0;
      color: #E36049;
      font-size: large;
      font-weight: normal;
    `,
    h2: `
      margin: 32px 0 0;
      font-size: large;
      font-weight: normal;
    `,
    pre: ``,
  }

  const createOverlay = () => {
    const h1 = document.createElement('h1')
    h1.style = style.h1
    const section = document.createElement('section')
    section.appendChild(h1)
    section.style = style.section
    const body = document.createElement('div')
    section.appendChild(body)
    return { h1, el: section, body }
  }

  const setTitle = title => {
    overlay.h1.textContent = title
  }

  const show = () => {
    const { el } = overlay
    if (!el.parentNode) {
      const target = document.body
      target.appendChild(overlay.el)
    }
  }

  const hide = () => {
    const { el } = overlay
    if (el.parentNode) {
      overlay.el.remove()
    }
  }

  const update = () => {
    if (compileError) {
      overlay.body.innerHTML = ''
      setTitle(compileErrorTitle)
      const errorEl = renderError(compileError)
      overlay.body.appendChild(errorEl)
      show()
    } else if (errors.length > 0) {
      overlay.body.innerHTML = ''
      setTitle(errorsTitle)
      errors.forEach(({ title, message }) => {
        const errorEl = renderError(message, title)
        overlay.body.appendChild(errorEl)
      })
      show()
    } else {
      hide()
    }
  }

  const renderError = (message, title) => {
    const div = document.createElement('div')
    if (title) {
      const h2 = document.createElement('h2')
      h2.textContent = title
      h2.style = style.h2
      div.appendChild(h2)
    }
    const pre = document.createElement('pre')
    pre.textContent = message
    div.appendChild(pre)
    return div
  }

  const addError = (error, title) => {
    const message = (error && error.stack) || error
    errors.push({ title, message })
    update()
  }

  const clearErrors = () => {
    errors.forEach(({ element }) => {
      removeElement(element)
    })
    errors = []
    update()
  }

  const setCompileError = message => {
    compileError = message
    update()
  }

  const overlay = createOverlay()

  return {
    addError,
    clearErrors,
    setCompileError,
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorOverlay);


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js":
/*!**************************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adapter": () => (/* binding */ adapter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/svelte-hmr/runtime/overlay.js");
/* global window, document */

// NOTE from 3.38.3 (or so), insert was carrying the hydration logic, that must
// be used because DOM elements are reused more (and so insertion points are not
// necessarily added in order); then in 3.40 the logic was moved to
// insert_hydration, which is the one we must use for HMR
const svelteInsert = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_hydration || svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert
if (!svelteInsert) {
  throw new Error(
    'failed to find insert_hydration and insert in svelte/internal'
  )
}



const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const adapter = class ProxyAdapterDom {
  constructor(instance) {
    this.instance = instance
    this.insertionPoint = null

    this.afterMount = this.afterMount.bind(this)
    this.rerender = this.rerender.bind(this)

    this._noOverlay = !!instance.hotOptions.noOverlay
  }

  // NOTE overlay is only created before being actually shown to help test
  // runner (it won't have to account for error overlay when running assertions
  // about the contents of the rendered page)
  static getErrorOverlay(noCreate = false) {
    if (!noCreate && !this.errorOverlay) {
      this.errorOverlay = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
    }
    return this.errorOverlay
  }

  // TODO this is probably unused now: remove in next breaking release
  static renderCompileError(message) {
    const noCreate = !message
    const overlay = this.getErrorOverlay(noCreate)
    if (!overlay) return
    overlay.setCompileError(message)
  }

  dispose() {
    // Component is being destroyed, detaching is not optional in Svelte3's
    // component API, so we can dispose of the insertion point in every case.
    if (this.insertionPoint) {
      removeElement(this.insertionPoint)
      this.insertionPoint = null
    }
    this.clearError()
  }

  // NOTE afterMount CAN be called multiple times (e.g. keyed list)
  afterMount(target, anchor) {
    const {
      instance: { debugName },
    } = this
    if (!this.insertionPoint) {
      this.insertionPoint = document.createComment(debugName)
    }
    svelteInsert(target, this.insertionPoint, anchor)
  }

  rerender() {
    this.clearError()
    const {
      instance: { refreshComponent },
      insertionPoint,
    } = this
    if (!insertionPoint) {
      throw new Error('Cannot rerender: missing insertion point')
    }
    refreshComponent(insertionPoint.parentNode, insertionPoint)
  }

  renderError(err) {
    if (this._noOverlay) return
    const {
      instance: { debugName },
    } = this
    const title = debugName || err.moduleName || 'Error'
    this.constructor.getErrorOverlay().addError(err, title)
  }

  clearError() {
    if (this._noOverlay) return
    const overlay = this.constructor.getErrorOverlay(true)
    if (!overlay) return
    overlay.clearErrors()
  }
}

// TODO this is probably unused now: remove in next breaking release
if (typeof window !== 'undefined') {
  window.__SVELTE_HMR_ADAPTER = adapter
}

// mitigate situation with Snowpack remote source pulling latest of runtime,
// but using previous version of the Node code transform in the plugin
// see: https://github.com/rixo/svelte-hmr/issues/27
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/proxy.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/proxy.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxy": () => (/* binding */ createProxy),
/* harmony export */   "hasFatalError": () => (/* binding */ hasFatalError)
/* harmony export */ });
/* harmony import */ var _svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svelte-hooks.js */ "./node_modules/svelte-hmr/runtime/svelte-hooks.js");
/* eslint-env browser */
/**
 * The HMR proxy is a component-like object whose task is to sit in the
 * component tree in place of the proxied component, and rerender each
 * successive versions of said component.
 */



const handledMethods = ['constructor', '$destroy']
const forwardedMethods = ['$set', '$on']

const logError = (msg, err) => {
  // eslint-disable-next-line no-console
  console.error('[HMR][Svelte]', msg)
  if (err) {
    // NOTE avoid too much wrapping around user errors
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

const posixify = file => file.replace(/[/\\]/g, '/')

const getBaseName = id =>
  id
    .split('/')
    .pop()
    .split('.')
    .slice(0, -1)
    .join('.')

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const getFriendlyName = id => capitalize(getBaseName(posixify(id)))

const getDebugName = id => `<${getFriendlyName(id)}>`

const relayCalls = (getTarget, names, dest = {}) => {
  for (const key of names) {
    dest[key] = function(...args) {
      const target = getTarget()
      if (!target) {
        return
      }
      return target[key] && target[key].call(this, ...args)
    }
  }
  return dest
}

const isInternal = key => key !== '$$' && key.slice(0, 2) === '$$'

// This is intented as a somewhat generic / prospective fix to the situation
// that arised with the introduction of $$set in Svelte 3.24.1 -- trying to
// avoid giving full knowledge (like its name) of this implementation detail
// to the proxy. The $$set method can be present or not on the component, and
// its presence impacts the behaviour (but with HMR it will be tested if it is
// present _on the proxy_). So the idea here is to expose exactly the same $$
// props as the current version of the component and, for those that are
// functions, proxy the calls to the current component.
const relayInternalMethods = (proxy, cmp) => {
  // delete any previously added $$ prop
  Object.keys(proxy)
    .filter(isInternal)
    .forEach(key => {
      delete proxy[key]
    })
  // guard: no component
  if (!cmp) return
  // proxy current $$ props to the actual component
  Object.keys(cmp)
    .filter(isInternal)
    .forEach(key => {
      Object.defineProperty(proxy, key, {
        configurable: true,
        get() {
          const value = cmp[key]
          if (typeof value !== 'function') return value
          return (
            value &&
            function(...args) {
              return value.apply(this, args)
            }
          )
        },
      })
    })
}

// proxy custom methods
const copyComponentProperties = (proxy, cmp, previous) => {
  if (previous) {
    previous.forEach(prop => {
      delete proxy[prop]
    })
  }

  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(cmp))
  const wrappedProps = props.filter(prop => {
    if (!handledMethods.includes(prop) && !forwardedMethods.includes(prop)) {
      Object.defineProperty(proxy, prop, {
        configurable: true,
        get() {
          return cmp[prop]
        },
        set(value) {
          // we're changing it on the real component first to see what it
          // gives... if it throws an error, we want to throw the same error in
          // order to most closely follow non-hmr behaviour.
          cmp[prop] = value
        },
      })
      return true
    }
  })

  return wrappedProps
}

// everything in the constructor!
//
// so we don't polute the component class with new members
//
class ProxyComponent {
  constructor(
    {
      Adapter,
      id,
      debugName,
      current, // { Component, hotOptions: { preserveLocalState, ... } }
      register,
    },
    options // { target, anchor, ... }
  ) {
    let cmp
    let disposed = false
    let lastError = null

    const setComponent = _cmp => {
      cmp = _cmp
      relayInternalMethods(this, cmp)
    }

    const getComponent = () => cmp

    const destroyComponent = () => {
      // destroyComponent is tolerant (don't crash on no cmp) because it
      // is possible that reload/rerender is called after a previous
      // createComponent has failed (hence we have a proxy, but no cmp)
      if (cmp) {
        cmp.$destroy()
        setComponent(null)
      }
    }

    const refreshComponent = (target, anchor, conservativeDestroy) => {
      if (lastError) {
        lastError = null
        adapter.rerender()
      } else {
        try {
          const replaceOptions = {
            target,
            anchor,
            preserveLocalState: current.preserveLocalState,
          }
          if (conservativeDestroy) {
            replaceOptions.conservativeDestroy = true
          }
          cmp.$replace(current.Component, replaceOptions)
        } catch (err) {
          setError(err, target, anchor)
          if (
            !current.hotOptions.optimistic ||
            // non acceptable components (that is components that have to defer
            // to their parent for rerender -- e.g. accessors, named exports)
            // are most tricky, and they havent been considered when most of the
            // code has been written... as a result, they are especially tricky
            // to deal with, it's better to consider any error with them to be
            // fatal to avoid odities
            !current.canAccept ||
            (err && err.hmrFatal)
          ) {
            throw err
          } else {
            // const errString = String((err && err.stack) || err)
            logError(`Error during component init: ${debugName}`, err)
          }
        }
      }
    }

    const setError = err => {
      lastError = err
      adapter.renderError(err)
    }

    const instance = {
      hotOptions: current.hotOptions,
      proxy: this,
      id,
      debugName,
      refreshComponent,
    }

    const adapter = new Adapter(instance)

    const { afterMount, rerender } = adapter

    // $destroy is not called when a child component is disposed, so we
    // need to hook from fragment.
    const onDestroy = () => {
      // NOTE do NOT call $destroy on the cmp from here; the cmp is already
      //   dead, this would not work
      if (!disposed) {
        disposed = true
        adapter.dispose()
        unregister()
      }
    }

    // ---- register proxy instance ----

    const unregister = register(rerender)

    // ---- augmented methods ----

    this.$destroy = () => {
      destroyComponent()
      onDestroy()
    }

    // ---- forwarded methods ----

    relayCalls(getComponent, forwardedMethods, this)

    // ---- create & mount target component instance ---

    try {
      let lastProperties
      ;(0,_svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__.createProxiedComponent)(current.Component, options, {
        allowLiveBinding: current.hotOptions.allowLiveBinding,
        onDestroy,
        onMount: afterMount,
        onInstance: comp => {
          setComponent(comp)
          // WARNING the proxy MUST use the same $$ object as its component
          // instance, because a lot of wiring happens during component
          // initialisation... lots of references to $$ and $$.fragment have
          // already been distributed around when the component constructor
          // returns, before we have a chance to wrap them (and so we can't
          // wrap them no more, because existing references would become
          // invalid)
          this.$$ = comp.$$
          lastProperties = copyComponentProperties(this, comp, lastProperties)
        },
      })
    } catch (err) {
      const { target, anchor } = options
      setError(err, target, anchor)
      throw err
    }
  }
}

const syncStatics = (component, proxy, previousKeys) => {
  // remove previously copied keys
  if (previousKeys) {
    for (const key of previousKeys) {
      delete proxy[key]
    }
  }

  // forward static properties and methods
  const keys = []
  for (const key in component) {
    keys.push(key)
    proxy[key] = component[key]
  }

  return keys
}

const globalListeners = {}

const onGlobal = (event, fn) => {
  event = event.toLowerCase()
  if (!globalListeners[event]) globalListeners[event] = []
  globalListeners[event].push(fn)
}

const fireGlobal = (event, ...args) => {
  const listeners = globalListeners[event]
  if (!listeners) return
  for (const fn of listeners) {
    fn(...args)
  }
}

const fireBeforeUpdate = () => fireGlobal('beforeupdate')

const fireAfterUpdate = () => fireGlobal('afterupdate')

if (typeof window !== 'undefined') {
  window.__SVELTE_HMR = {
    on: onGlobal,
  }
  window.dispatchEvent(new CustomEvent('svelte-hmr:ready'))
}

let fatalError = false

const hasFatalError = () => fatalError

/**
 * Creates a HMR proxy and its associated `reload` function that pushes a new
 * version to all existing instances of the component.
 */
function createProxy({
  Adapter,
  id,
  Component,
  hotOptions,
  canAccept,
  preserveLocalState,
}) {
  const debugName = getDebugName(id)
  const instances = []

  // current object will be updated, proxy instances will keep a ref
  const current = {
    Component,
    hotOptions,
    canAccept,
    preserveLocalState,
  }

  const name = `Proxy${debugName}`

  // this trick gives the dynamic name Proxy<MyComponent> to the concrete
  // proxy class... unfortunately, this doesn't shows in dev tools, but
  // it stills allow to inspect cmp.constructor.name to confirm an instance
  // is a proxy
  const proxy = {
    [name]: class extends ProxyComponent {
      constructor(options) {
        try {
          super(
            {
              Adapter,
              id,
              debugName,
              current,
              register: rerender => {
                instances.push(rerender)
                const unregister = () => {
                  const i = instances.indexOf(rerender)
                  instances.splice(i, 1)
                }
                return unregister
              },
            },
            options
          )
        } catch (err) {
          // If we fail to create a proxy instance, any instance, that means
          // that we won't be able to fix this instance when it is updated.
          // Recovering to normal state will be impossible. HMR's dead.
          //
          // Fatal error will trigger a full reload on next update (reloading
          // right now is kinda pointless since buggy code still exists).
          //
          // NOTE Only report first error to avoid too much polution -- following
          // errors are probably caused by the first one, or they will show up
          // in turn when the first one is fixed ¯\_(ツ)_/¯
          //
          if (!fatalError) {
            fatalError = true
            logError(
              `Unrecoverable HMR error in ${debugName}: ` +
                `next update will trigger a full reload`
            )
          }
          throw err
        }
      }
    },
  }[name]

  // initialize static members
  let previousStatics = syncStatics(current.Component, proxy)

  const update = newState => Object.assign(current, newState)

  // reload all existing instances of this component
  const reload = () => {
    fireBeforeUpdate()

    // copy statics before doing anything because a static prop/method
    // could be used somewhere in the create/render call
    previousStatics = syncStatics(current.Component, proxy, previousStatics)

    const errors = []

    instances.forEach(rerender => {
      try {
        rerender()
      } catch (err) {
        logError(`Failed to rerender ${debugName}`, err)
        errors.push(err)
      }
    })

    if (errors.length > 0) {
      return false
    }

    fireAfterUpdate()

    return true
  }

  const hasFatalError = () => fatalError

  return { id, proxy, update, reload, hasFatalError, current }
}


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/svelte-hooks.js":
/*!*********************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/svelte-hooks.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxiedComponent": () => (/* binding */ createProxiedComponent)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/**
 * Emulates forthcoming HMR hooks in Svelte.
 *
 * All references to private component state ($$) are now isolated in this
 * module.
 */


const captureState = cmp => {
  // sanity check: propper behaviour here is to crash noisily so that
  // user knows that they're looking at something broken
  if (!cmp) {
    throw new Error('Missing component')
  }
  if (!cmp.$$) {
    throw new Error('Invalid component')
  }

  const {
    $$: { callbacks, bound, ctx, props },
  } = cmp

  const state = cmp.$capture_state()

  // capturing current value of props (or we'll recreate the component with the
  // initial prop values, that may have changed -- and would not be reflected in
  // options.props)
  const hmr_props_values = {}
  Object.keys(cmp.$$.props).forEach(prop => {
    hmr_props_values[prop] = ctx[props[prop]]
  })

  return {
    ctx,
    props,
    callbacks,
    bound,
    state,
    hmr_props_values,
  }
}

// remapping all existing bindings (including hmr_future_foo ones) to the
// new version's props indexes, and refresh them with the new value from
// context
const restoreBound = (cmp, restore) => {
  // reverse prop:ctxIndex in $$.props to ctxIndex:prop
  //
  // ctxIndex can be either a regular index in $$.ctx or a hmr_future_ prop
  //
  const propsByIndex = {}
  for (const [name, i] of Object.entries(restore.props)) {
    propsByIndex[i] = name
  }

  // NOTE $$.bound cannot change in the HMR lifetime of a component, because
  //      if bindings changes, that means the parent component has changed,
  //      which means the child (current) component will be wholly recreated
  for (const [oldIndex, updateBinding] of Object.entries(restore.bound)) {
    // can be either regular prop, or future_hmr_ prop
    const propName = propsByIndex[oldIndex]

    // this should never happen if remembering of future props is enabled...
    // in any case, there's nothing we can do about it if we have lost prop
    // name knowledge at this point
    if (propName == null) continue

    // NOTE $$.props[propName] also propagates knowledge of a possible
    //      future prop to the new $$.props (via $$.props being a Proxy)
    const newIndex = cmp.$$.props[propName]
    cmp.$$.bound[newIndex] = updateBinding

    // NOTE if the prop doesn't exist or doesn't exist anymore in the new
    //      version of the component, clearing the binding is the expected
    //      behaviour (since that's what would happen in non HMR code)
    const newValue = cmp.$$.ctx[newIndex]
    updateBinding(newValue)
  }
}

// restoreState
//
// It is too late to restore context at this point because component instance
// function has already been called (and so context has already been read).
// Instead, we rely on setting current_component to the same value it has when
// the component was first rendered -- which fix support for context, and is
// also generally more respectful of normal operation.
//
const restoreState = (cmp, restore) => {
  if (!restore) return

  if (restore.callbacks) {
    cmp.$$.callbacks = restore.callbacks
  }

  if (restore.bound) {
    restoreBound(cmp, restore)
  }

  // props, props.$$slots are restored at component creation (works
  // better -- well, at all actually)
}

const get_current_component_safe = () => {
  // NOTE relying on dynamic bindings (current_component) makes us dependent on
  // bundler config (and apparently it does not work in demo-svelte-nollup)
  try {
    // unfortunately, unlike current_component, get_current_component() can
    // crash in the normal path (when there is really no parent)
    return (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_current_component)()
  } catch (err) {
    // ... so we need to consider that this error means that there is no parent
    //
    // that makes us tightly coupled to the error message but, at least, we
    // won't mute an unexpected error, which is quite a horrible thing to do
    if (err.message === 'Function called outside component initialization') {
      // who knows...
      return svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    } else {
      throw err
    }
  }
}

const createProxiedComponent = (
  Component,
  initialOptions,
  { allowLiveBinding, onInstance, onMount, onDestroy }
) => {
  let cmp
  let options = initialOptions

  const isCurrent = _cmp => cmp === _cmp

  const assignOptions = (target, anchor, restore, preserveLocalState) => {
    const props = Object.assign({}, options.props)

    // Filtering props to avoid "unexpected prop" warning
    // NOTE this is based on props present in initial options, but it should
    //      always works, because props that are passed from the parent can't
    //      change without a code change to the parent itself -- hence, the
    //      child component will be fully recreated, and initial options should
    //      always represent props that are currnetly passed by the parent
    if (options.props && restore.hmr_props_values) {
      for (const prop of Object.keys(options.props)) {
        if (restore.hmr_props_values.hasOwnProperty(prop)) {
          props[prop] = restore.hmr_props_values[prop]
        }
      }
    }

    if (preserveLocalState && restore.state) {
      if (Array.isArray(preserveLocalState)) {
        // form ['a', 'b'] => preserve only 'a' and 'b'
        props.$$inject = {}
        for (const key of preserveLocalState) {
          props.$$inject[key] = restore.state[key]
        }
      } else {
        props.$$inject = restore.state
      }
    } else {
      delete props.$$inject
    }
    options = Object.assign({}, initialOptions, {
      target,
      anchor,
      props,
      hydrate: false,
    })
  }

  // Preserving knowledge of "future props" -- very hackish version (maybe
  // there should be an option to opt out of this)
  //
  // The use case is bind:something where something doesn't exist yet in the
  // target component, but comes to exist later, after a HMR update.
  //
  // If Svelte can't map a prop in the current version of the component, it
  // will just completely discard it:
  // https://github.com/sveltejs/svelte/blob/1632bca34e4803d6b0e0b0abd652ab5968181860/src/runtime/internal/Component.ts#L46
  //
  const rememberFutureProps = cmp => {
    if (typeof Proxy === 'undefined') return

    cmp.$$.props = new Proxy(cmp.$$.props, {
      get(target, name) {
        if (target[name] === undefined) {
          target[name] = 'hmr_future_' + name
        }
        return target[name]
      },
      set(target, name, value) {
        target[name] = value
      },
    })
  }

  const instrument = targetCmp => {
    const createComponent = (Component, restore, previousCmp) => {
      ;(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_current_component)(parentComponent || previousCmp)
      const comp = new Component(options)
      // NOTE must be instrumented before restoreState, because restoring
      // bindings relies on hacked $$.props
      instrument(comp)
      restoreState(comp, restore)
      return comp
    }

    rememberFutureProps(targetCmp)

    targetCmp.$$.on_hmr = []

    // `conservative: true` means we want to be sure that the new component has
    // actually been successfuly created before destroying the old instance.
    // This could be useful for preventing runtime errors in component init to
    // bring down the whole HMR. Unfortunately the implementation bellow is
    // broken (FIXME), but that remains an interesting target for when HMR hooks
    // will actually land in Svelte itself.
    //
    // The goal would be to render an error inplace in case of error, to avoid
    // losing the navigation stack (especially annoying in native, that is not
    // based on URL navigation, so we lose the current page on each error).
    //
    targetCmp.$replace = (
      Component,
      {
        target = options.target,
        anchor = options.anchor,
        preserveLocalState,
        conservative = false,
      }
    ) => {
      const restore = captureState(targetCmp)
      assignOptions(
        target || options.target,
        anchor,
        restore,
        preserveLocalState
      )

      const callbacks = cmp ? cmp.$$.on_hmr : []

      const afterCallbacks = callbacks.map(fn => fn(cmp)).filter(Boolean)

      const previous = cmp
      if (conservative) {
        try {
          const next = createComponent(Component, restore, previous)
          // prevents on_destroy from firing on non-final cmp instance
          cmp = null
          previous.$destroy()
          cmp = next
        } catch (err) {
          cmp = previous
          throw err
        }
      } else {
        // prevents on_destroy from firing on non-final cmp instance
        cmp = null
        if (previous) {
          // previous can be null if last constructor has crashed
          previous.$destroy()
        }
        cmp = createComponent(Component, restore, cmp)
      }

      cmp.$$.hmr_cmp = cmp

      for (const fn of afterCallbacks) {
        fn(cmp)
      }

      cmp.$$.on_hmr = callbacks

      return cmp
    }

    // NOTE onMount must provide target & anchor (for us to be able to determinate
    // 			actual DOM insertion point)
    //
    // 			And also, to support keyed list, it needs to be called each time the
    // 			component is moved (same as $$.fragment.m)
    if (onMount) {
      const m = targetCmp.$$.fragment.m
      targetCmp.$$.fragment.m = (...args) => {
        const result = m(...args)
        onMount(...args)
        return result
      }
    }

    // NOTE onDestroy must be called even if the call doesn't pass through the
    //      component's $destroy method (that we can hook onto by ourselves, since
    //      it's public API) -- this happens a lot in svelte's internals, that
    //      manipulates cmp.$$.fragment directly, often binding to fragment.d,
    //      for example
    if (onDestroy) {
      targetCmp.$$.on_destroy.push(() => {
        if (isCurrent(targetCmp)) {
          onDestroy()
        }
      })
    }

    if (onInstance) {
      onInstance(targetCmp)
    }

    // Svelte 3 creates and mount components from their constructor if
    // options.target is present.
    //
    // This means that at this point, the component's `fragment.c` and,
    // most notably, `fragment.m` will already have been called _from inside
    // createComponent_. That is: before we have a chance to hook on it.
    //
    // Proxy's constructor
    //   -> createComponent
    //     -> component constructor
    //       -> component.$$.fragment.c(...) (or l, if hydrate:true)
    //       -> component.$$.fragment.m(...)
    //
    //   -> you are here <-
    //
    if (onMount) {
      const { target, anchor } = options
      if (target) {
        onMount(target, anchor)
      }
    }
  }

  const parentComponent = allowLiveBinding
    ? svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    : get_current_component_safe()

  cmp = new Component(options)
  cmp.$$.hmr_cmp = cmp

  instrument(cmp)

  return cmp
}


/***/ }),

/***/ "./source/App.svelte":
/*!***************************!*\
  !*** ./source/App.svelte ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var rete_connection_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rete-connection-plugin */ "./node_modules/rete-connection-plugin/build/connection-plugin.esm.js");
/* harmony import */ var rete_svelte_render_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rete-svelte-render-plugin */ "./node_modules/rete-svelte-render-plugin/build/rete-svelte-render-plugin.esm.js");
/* harmony import */ var _num_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./num.js */ "./source/num.js");
/* harmony import */ var _home_shaws_code_eb_js_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_shaws_code_eb_js_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* source/App.svelte generated by Svelte v3.49.0 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;





const file = "source/App.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-12bhkiz", ".rete.svelte-12bhkiz{margin:0;padding:0;width:100%;height:100%}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQXBwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHtvbk1vdW50fSBmcm9tICdzdmVsdGUnO1xuICAgIFxuICAgIGltcG9ydCBSZXRlIGZyb20gJ3JldGUnO1xuICAgIGltcG9ydCBDb25uZWN0aW9uUGx1Z2luIGZyb20gJ3JldGUtY29ubmVjdGlvbi1wbHVnaW4nO1xuICAgIGltcG9ydCBTdmVsdGVSZW5kZXJQbHVnaW4gZnJvbSAncmV0ZS1zdmVsdGUtcmVuZGVyLXBsdWdpbic7XG5cbiAgICBpbXBvcnQge051bUNvbXBvbmVudH0gZnJvbSAnLi9udW0uanMnO1xuXG4gICAgbGV0IGNvbnRhaW5lciA9IG51bGw7XG5cbiAgICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFtuZXcgTnVtQ29tcG9uZW50KCldO1xuXG4gICAgICAgIGNvbnN0IGVkaXRvciA9IG5ldyBSZXRlLk5vZGVFZGl0b3IoXCJkZW1vQDAuMC4xXCIsIGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IGVuZ2luZSA9IG5ldyBSZXRlLkVuZ2luZShcImRlbW9AMC4wLjFcIik7XG5cbiAgICAgICAgZWRpdG9yLnVzZShDb25uZWN0aW9uUGx1Z2luKTtcbiAgICAgICAgZWRpdG9yLnVzZShTdmVsdGVSZW5kZXJQbHVnaW4pO1xuXG4gICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBlZGl0b3IucmVnaXN0ZXIoY29tcG9uZW50KTtcbiAgICAgICAgICAgIGVuZ2luZS5yZWdpc3Rlcihjb21wb25lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbjEgPSBhd2FpdCBjb21wb25lbnRzWzBdLmNyZWF0ZU5vZGUoe251bToxfSk7XG4gICAgICAgIGxldCBuMiA9IGF3YWl0IGNvbXBvbmVudHNbMF0uY3JlYXRlTm9kZSh7bnVtOjJ9KTtcblxuICAgICAgICBuMS5wb3NpdGlvbiA9IFs4MCwgMjAwXTtcbiAgICAgICAgbjIucG9zaXRpb24gPSBbODAsIDQwMF07XG5cbiAgICAgICAgZWRpdG9yLmFkZE5vZGUobjEpO1xuICAgICAgICBlZGl0b3IuYWRkTm9kZShuMik7XG5cbiAgICAgICAgY29uc3QgcHJvY2VzcyA9IGFzeW5jKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2Nlc3MnKTtcbiAgICAgICAgICAgIGF3YWl0IGVuZ2luZS5hYm9ydCgpO1xuICAgICAgICAgICAgYXdhaXQgZW5naW5lLnByb2Nlc3MoZWRpdG9yLnRvSlNPTigpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRvci50b0pTT04oKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcHJvY2VzcygpO1xuXG4gICAgICAgIGVkaXRvci5vbigncHJvY2VzcycsIHByb2Nlc3MpO1xuICAgICAgICBlZGl0b3Iub24oJ25vZGVjcmVhdGVkJywgcHJvY2Vzcyk7XG4gICAgICAgIGVkaXRvci5vbignbm9kZXJlbW92ZWQnLCBwcm9jZXNzKTtcbiAgICAgICAgZWRpdG9yLm9uKCdjb25uZWN0aW9uY3JlYXRlZCcsIHByb2Nlc3MpO1xuICAgICAgICBlZGl0b3Iub24oJ2Nvbm5lY3Rpb25yZW1vdmVkJywgcHJvY2Vzcyk7XG4gICAgfSk7XG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cInJldGVcIiBiaW5kOnRoaXM9e2NvbnRhaW5lcn0+PC9kaXY+XG5cbjxzdHlsZT5cbiAgICAucmV0ZSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVESSxLQUFLLGVBQUMsQ0FBQyxBQUNILE1BQU0sQ0FBRSxDQUFDLENBQ1QsT0FBTyxDQUFFLENBQUMsQ0FDVixLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLEFBQ2hCLENBQUMifQ== */");
}

function create_fragment(ctx) {
	let div;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "rete svelte-12bhkiz");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 52, 0, 1406);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			/*div_binding*/ ctx[1](div);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			/*div_binding*/ ctx[1](null);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('App', slots, []);
	let container = null;

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(async () => {
		const components = [new _num_js__WEBPACK_IMPORTED_MODULE_5__.NumComponent()];
		const editor = new rete__WEBPACK_IMPORTED_MODULE_2__["default"].NodeEditor("demo@0.0.1", container);
		const engine = new rete__WEBPACK_IMPORTED_MODULE_2__["default"].Engine("demo@0.0.1");
		editor.use(rete_connection_plugin__WEBPACK_IMPORTED_MODULE_3__["default"]);
		editor.use(rete_svelte_render_plugin__WEBPACK_IMPORTED_MODULE_4__["default"]);

		components.forEach(component => {
			editor.register(component);
			engine.register(component);
		});

		let n1 = await components[0].createNode({ num: 1 });
		let n2 = await components[0].createNode({ num: 2 });
		n1.position = [80, 200];
		n2.position = [80, 400];
		editor.addNode(n1);
		editor.addNode(n2);

		const process = async () => {
			console.log('process');
			await engine.abort();
			await engine.process(editor.toJSON());
			console.log(editor.toJSON());
		};

		process();
		editor.on('process', process);
		editor.on('nodecreated', process);
		editor.on('noderemoved', process);
		editor.on('connectioncreated', process);
		editor.on('connectionremoved', process);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
	});

	function div_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__.onMount,
		Rete: rete__WEBPACK_IMPORTED_MODULE_2__["default"],
		ConnectionPlugin: rete_connection_plugin__WEBPACK_IMPORTED_MODULE_3__["default"],
		SvelteRenderPlugin: rete_svelte_render_plugin__WEBPACK_IMPORTED_MODULE_4__["default"],
		NumComponent: _num_js__WEBPACK_IMPORTED_MODULE_5__.NumComponent,
		container
	});

	$$self.$inject_state = $$props => {
		if ('container' in $$props) $$invalidate(0, container = $$props.container);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [container, div_binding];
}

class App extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);



/***/ }),

/***/ "./node_modules/svelte-loader/lib/hot-api.js":
/*!***************************************************!*\
  !*** ./node_modules/svelte-loader/lib/hot-api.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyHmr": () => (/* binding */ applyHmr)
/* harmony export */ });
/* harmony import */ var svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-hmr/runtime */ "./node_modules/svelte-hmr/runtime/index.js");


// eslint-disable-next-line no-undef
const g = typeof window !== 'undefined' ? window : __webpack_require__.g;

const globalKey =
	typeof Symbol !== 'undefined'
		? Symbol('SVELTE_LOADER_HOT')
		: '__SVELTE_LOADER_HOT';

if (!g[globalKey]) {
	// do updating refs counting to know when a full update has been applied
	let updatingCount = 0;

	const notifyStart = () => {
		updatingCount++;
	};

	const notifyError = reload => err => {
		const errString = (err && err.stack) || err;
		// eslint-disable-next-line no-console
		console.error(
			'[HMR] Failed to accept update (nollup compat mode)',
			errString
		);
		reload();
		notifyEnd();
	};

	const notifyEnd = () => {
		updatingCount--;
		if (updatingCount === 0) {
			// NOTE this message is important for timing in tests
			// eslint-disable-next-line no-console
			console.log('[HMR:Svelte] Up to date');
		}
	};

	g[globalKey] = {
		hotStates: {},
		notifyStart,
		notifyError,
		notifyEnd,
	};
}

const runAcceptHandlers = acceptHandlers => {
	const queue = [...acceptHandlers];
	const next = () => {
		const cur = queue.shift();
		if (cur) {
			return cur(null).then(next);
		} else {
			return Promise.resolve(null);
		}
	};
	return next();
};

const applyHmr = (0,svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)(args => {
	const { notifyStart, notifyError, notifyEnd } = g[globalKey];
	const { m, reload } = args;

	let acceptHandlers = (m.hot.data && m.hot.data.acceptHandlers) || [];
	let nextAcceptHandlers = [];

	m.hot.dispose(data => {
		data.acceptHandlers = nextAcceptHandlers;
	});

	const dispose = (...args) => m.hot.dispose(...args);

	const accept = handler => {
		if (nextAcceptHandlers.length === 0) {
			m.hot.accept();
		}
		nextAcceptHandlers.push(handler);
	};

	const check = status => {
		if (status === 'ready') {
			notifyStart();
		} else if (status === 'idle') {
			runAcceptHandlers(acceptHandlers)
				.then(notifyEnd)
				.catch(notifyError(reload));
		}
	};

	m.hot.addStatusHandler(check);

	m.hot.dispose(() => {
		m.hot.removeStatusHandler(check);
	});

	const hot = {
		data: m.hot.data,
		dispose,
		accept,
	};

	return { ...args, hot };
});


/***/ }),

/***/ "./source/num.js":
/*!***********************!*\
  !*** ./source/num.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumComponent": () => (/* binding */ NumComponent),
/* harmony export */   "numSocket": () => (/* binding */ numSocket)
/* harmony export */ });
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");


const numSocket = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Socket("Number");

const NumComponent = class extends rete__WEBPACK_IMPORTED_MODULE_0__["default"].Component {
    constructor() {
        super("Number");
    }

    builder(node) {
        const out = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("num", "Number", numSocket);
        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs["num"] = node.data.num;
    }
};


/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentTyped),
/* harmony export */   "afterUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.afterUpdate),
/* harmony export */   "beforeUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.beforeUpdate),
/* harmony export */   "createEventDispatcher": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.createEventDispatcher),
/* harmony export */   "getAllContexts": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getAllContexts),
/* harmony export */   "getContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getContext),
/* harmony export */   "hasContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.hasContext),
/* harmony export */   "onDestroy": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy),
/* harmony export */   "onMount": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onMount),
/* harmony export */   "setContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.setContext),
/* harmony export */   "tick": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.tick)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* binding */ HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* binding */ HtmlTagHydration),
/* harmony export */   "SvelteComponent": () => (/* binding */ SvelteComponent),
/* harmony export */   "SvelteComponentDev": () => (/* binding */ SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* binding */ SvelteComponentTyped),
/* harmony export */   "SvelteElement": () => (/* binding */ SvelteElement),
/* harmony export */   "action_destroyer": () => (/* binding */ action_destroyer),
/* harmony export */   "add_attribute": () => (/* binding */ add_attribute),
/* harmony export */   "add_classes": () => (/* binding */ add_classes),
/* harmony export */   "add_flush_callback": () => (/* binding */ add_flush_callback),
/* harmony export */   "add_location": () => (/* binding */ add_location),
/* harmony export */   "add_render_callback": () => (/* binding */ add_render_callback),
/* harmony export */   "add_resize_listener": () => (/* binding */ add_resize_listener),
/* harmony export */   "add_styles": () => (/* binding */ add_styles),
/* harmony export */   "add_transform": () => (/* binding */ add_transform),
/* harmony export */   "afterUpdate": () => (/* binding */ afterUpdate),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "append_dev": () => (/* binding */ append_dev),
/* harmony export */   "append_empty_stylesheet": () => (/* binding */ append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* binding */ append_hydration),
/* harmony export */   "append_hydration_dev": () => (/* binding */ append_hydration_dev),
/* harmony export */   "append_styles": () => (/* binding */ append_styles),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "attr_dev": () => (/* binding */ attr_dev),
/* harmony export */   "attribute_to_object": () => (/* binding */ attribute_to_object),
/* harmony export */   "beforeUpdate": () => (/* binding */ beforeUpdate),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "binding_callbacks": () => (/* binding */ binding_callbacks),
/* harmony export */   "blank_object": () => (/* binding */ blank_object),
/* harmony export */   "bubble": () => (/* binding */ bubble),
/* harmony export */   "check_outros": () => (/* binding */ check_outros),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "claim_component": () => (/* binding */ claim_component),
/* harmony export */   "claim_element": () => (/* binding */ claim_element),
/* harmony export */   "claim_html_tag": () => (/* binding */ claim_html_tag),
/* harmony export */   "claim_space": () => (/* binding */ claim_space),
/* harmony export */   "claim_svg_element": () => (/* binding */ claim_svg_element),
/* harmony export */   "claim_text": () => (/* binding */ claim_text),
/* harmony export */   "clear_loops": () => (/* binding */ clear_loops),
/* harmony export */   "component_subscribe": () => (/* binding */ component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* binding */ compute_rest_props),
/* harmony export */   "compute_slots": () => (/* binding */ compute_slots),
/* harmony export */   "createEventDispatcher": () => (/* binding */ createEventDispatcher),
/* harmony export */   "create_animation": () => (/* binding */ create_animation),
/* harmony export */   "create_bidirectional_transition": () => (/* binding */ create_bidirectional_transition),
/* harmony export */   "create_component": () => (/* binding */ create_component),
/* harmony export */   "create_in_transition": () => (/* binding */ create_in_transition),
/* harmony export */   "create_out_transition": () => (/* binding */ create_out_transition),
/* harmony export */   "create_slot": () => (/* binding */ create_slot),
/* harmony export */   "create_ssr_component": () => (/* binding */ create_ssr_component),
/* harmony export */   "current_component": () => (/* binding */ current_component),
/* harmony export */   "custom_event": () => (/* binding */ custom_event),
/* harmony export */   "dataset_dev": () => (/* binding */ dataset_dev),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "destroy_block": () => (/* binding */ destroy_block),
/* harmony export */   "destroy_component": () => (/* binding */ destroy_component),
/* harmony export */   "destroy_each": () => (/* binding */ destroy_each),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "detach_after_dev": () => (/* binding */ detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* binding */ detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* binding */ detach_between_dev),
/* harmony export */   "detach_dev": () => (/* binding */ detach_dev),
/* harmony export */   "dirty_components": () => (/* binding */ dirty_components),
/* harmony export */   "dispatch_dev": () => (/* binding */ dispatch_dev),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "element": () => (/* binding */ element),
/* harmony export */   "element_is": () => (/* binding */ element_is),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "end_hydrating": () => (/* binding */ end_hydrating),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "escape_attribute_value": () => (/* binding */ escape_attribute_value),
/* harmony export */   "escape_object": () => (/* binding */ escape_object),
/* harmony export */   "exclude_internal_props": () => (/* binding */ exclude_internal_props),
/* harmony export */   "fix_and_destroy_block": () => (/* binding */ fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* binding */ fix_and_outro_and_destroy_block),
/* harmony export */   "fix_position": () => (/* binding */ fix_position),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "getAllContexts": () => (/* binding */ getAllContexts),
/* harmony export */   "getContext": () => (/* binding */ getContext),
/* harmony export */   "get_all_dirty_from_scope": () => (/* binding */ get_all_dirty_from_scope),
/* harmony export */   "get_binding_group_value": () => (/* binding */ get_binding_group_value),
/* harmony export */   "get_current_component": () => (/* binding */ get_current_component),
/* harmony export */   "get_custom_elements_slots": () => (/* binding */ get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* binding */ get_root_for_style),
/* harmony export */   "get_slot_changes": () => (/* binding */ get_slot_changes),
/* harmony export */   "get_spread_object": () => (/* binding */ get_spread_object),
/* harmony export */   "get_spread_update": () => (/* binding */ get_spread_update),
/* harmony export */   "get_store_value": () => (/* binding */ get_store_value),
/* harmony export */   "globals": () => (/* binding */ globals),
/* harmony export */   "group_outros": () => (/* binding */ group_outros),
/* harmony export */   "handle_promise": () => (/* binding */ handle_promise),
/* harmony export */   "hasContext": () => (/* binding */ hasContext),
/* harmony export */   "has_prop": () => (/* binding */ has_prop),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "insert_dev": () => (/* binding */ insert_dev),
/* harmony export */   "insert_hydration": () => (/* binding */ insert_hydration),
/* harmony export */   "insert_hydration_dev": () => (/* binding */ insert_hydration_dev),
/* harmony export */   "intros": () => (/* binding */ intros),
/* harmony export */   "invalid_attribute_name_character": () => (/* binding */ invalid_attribute_name_character),
/* harmony export */   "is_client": () => (/* binding */ is_client),
/* harmony export */   "is_crossorigin": () => (/* binding */ is_crossorigin),
/* harmony export */   "is_empty": () => (/* binding */ is_empty),
/* harmony export */   "is_function": () => (/* binding */ is_function),
/* harmony export */   "is_promise": () => (/* binding */ is_promise),
/* harmony export */   "is_void": () => (/* binding */ is_void),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "listen_dev": () => (/* binding */ listen_dev),
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "loop_guard": () => (/* binding */ loop_guard),
/* harmony export */   "merge_ssr_styles": () => (/* binding */ merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* binding */ missing_component),
/* harmony export */   "mount_component": () => (/* binding */ mount_component),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "not_equal": () => (/* binding */ not_equal),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "null_to_empty": () => (/* binding */ null_to_empty),
/* harmony export */   "object_without_properties": () => (/* binding */ object_without_properties),
/* harmony export */   "onDestroy": () => (/* binding */ onDestroy),
/* harmony export */   "onMount": () => (/* binding */ onMount),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "outro_and_destroy_block": () => (/* binding */ outro_and_destroy_block),
/* harmony export */   "prevent_default": () => (/* binding */ prevent_default),
/* harmony export */   "prop_dev": () => (/* binding */ prop_dev),
/* harmony export */   "query_selector_all": () => (/* binding */ query_selector_all),
/* harmony export */   "raf": () => (/* binding */ raf),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "run_all": () => (/* binding */ run_all),
/* harmony export */   "safe_not_equal": () => (/* binding */ safe_not_equal),
/* harmony export */   "schedule_update": () => (/* binding */ schedule_update),
/* harmony export */   "select_multiple_value": () => (/* binding */ select_multiple_value),
/* harmony export */   "select_option": () => (/* binding */ select_option),
/* harmony export */   "select_options": () => (/* binding */ select_options),
/* harmony export */   "select_value": () => (/* binding */ select_value),
/* harmony export */   "self": () => (/* binding */ self),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "set_attributes": () => (/* binding */ set_attributes),
/* harmony export */   "set_current_component": () => (/* binding */ set_current_component),
/* harmony export */   "set_custom_element_data": () => (/* binding */ set_custom_element_data),
/* harmony export */   "set_data": () => (/* binding */ set_data),
/* harmony export */   "set_data_dev": () => (/* binding */ set_data_dev),
/* harmony export */   "set_input_type": () => (/* binding */ set_input_type),
/* harmony export */   "set_input_value": () => (/* binding */ set_input_value),
/* harmony export */   "set_now": () => (/* binding */ set_now),
/* harmony export */   "set_raf": () => (/* binding */ set_raf),
/* harmony export */   "set_store_value": () => (/* binding */ set_store_value),
/* harmony export */   "set_style": () => (/* binding */ set_style),
/* harmony export */   "set_svg_attributes": () => (/* binding */ set_svg_attributes),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "spread": () => (/* binding */ spread),
/* harmony export */   "src_url_equal": () => (/* binding */ src_url_equal),
/* harmony export */   "start_hydrating": () => (/* binding */ start_hydrating),
/* harmony export */   "stop_propagation": () => (/* binding */ stop_propagation),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "svg_element": () => (/* binding */ svg_element),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "tick": () => (/* binding */ tick),
/* harmony export */   "time_ranges_to_array": () => (/* binding */ time_ranges_to_array),
/* harmony export */   "to_number": () => (/* binding */ to_number),
/* harmony export */   "toggle_class": () => (/* binding */ toggle_class),
/* harmony export */   "transition_in": () => (/* binding */ transition_in),
/* harmony export */   "transition_out": () => (/* binding */ transition_out),
/* harmony export */   "trusted": () => (/* binding */ trusted),
/* harmony export */   "update_await_block_branch": () => (/* binding */ update_await_block_branch),
/* harmony export */   "update_keyed_each": () => (/* binding */ update_keyed_each),
/* harmony export */   "update_slot": () => (/* binding */ update_slot),
/* harmony export */   "update_slot_base": () => (/* binding */ update_slot_base),
/* harmony export */   "validate_component": () => (/* binding */ validate_component),
/* harmony export */   "validate_dynamic_element": () => (/* binding */ validate_dynamic_element),
/* harmony export */   "validate_each_argument": () => (/* binding */ validate_each_argument),
/* harmony export */   "validate_each_keys": () => (/* binding */ validate_each_keys),
/* harmony export */   "validate_slots": () => (/* binding */ validate_slots),
/* harmony export */   "validate_store": () => (/* binding */ validate_store),
/* harmony export */   "validate_void_dynamic_element": () => (/* binding */ validate_void_dynamic_element),
/* harmony export */   "xlink_attr": () => (/* binding */ xlink_attr)
/* harmony export */ });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes, is_svg) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration(undefined, is_svg);
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes, is_svg);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes, is_svg = false) {
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function getAllContexts() {
    return get_current_component().$$.context;
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */
function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = '';
    let last = 0;
    while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : (ch === '"' ? '&quot;' : '&lt;'));
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === 'string' || (value && typeof value === 'object');
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    const assignment = (boolean && value === true) ? '' : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${style_object[key]};`)
        .join(' ');
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function validate_dynamic_element(tag) {
    const is_string = typeof tag === 'string';
    if (tag && !is_string) {
        throw new Error('<svelte:element> expects "this" attribute to be a string.');
    }
}
function validate_void_dynamic_element(tag) {
    if (tag && is_void(tag)) {
        throw new Error(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./source/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.css */ "./source/global.css");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.svelte */ "./source/App.svelte");





const app = new _App_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
	target: document.body,
	props: {}
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map