/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a #tag  on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) buffer += this.renderTokens(this.parse(value), context, partials, value);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

/*! docsearch 2.5.2 | © Algolia | github.com/algolia/docsearch */
(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")exports["docsearch"]=factory();else root["docsearch"]=factory()})(typeof self!=="undefined"?self:this,function(){return function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{configurable:false,enumerable:true,get:getter})}};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=21)}([function(module,exports,__webpack_require__){"use strict";var DOM=__webpack_require__(1);function escapeRegExp(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}module.exports={isArray:null,isFunction:null,isObject:null,bind:null,each:null,map:null,mixin:null,isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:false},escapeRegExChars:function(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isNumber:function(obj){return typeof obj==="number"},toStr:function toStr(s){return s===undefined||s===null?"":s+""},cloneDeep:function cloneDeep(obj){var clone=this.mixin({},obj);var self=this;this.each(clone,function(value,key){if(value){if(self.isArray(value)){clone[key]=[].concat(value)}else if(self.isObject(value)){clone[key]=self.cloneDeep(value)}}});return clone},error:function(msg){throw new Error(msg)},every:function(obj,test){var result=true;if(!obj){return result}this.each(obj,function(val,key){result=test.call(null,val,key,obj);if(!result){return false}});return!!result},any:function(obj,test){var found=false;if(!obj){return found}this.each(obj,function(val,key){if(test.call(null,val,key,obj)){found=true;return false}});return found},getUniqueId:function(){var counter=0;return function(){return counter++}}(),templatify:function templatify(obj){if(this.isFunction(obj)){return obj}var $template=DOM.element(obj);if($template.prop("tagName")==="SCRIPT"){return function template(){return $template.text()}}return function template(){return String(obj)}},defer:function(fn){setTimeout(fn,0)},noop:function(){},formatPrefix:function(prefix,noPrefix){return noPrefix?"":prefix+"-"},className:function(prefix,clazz,skipDot){return(skipDot?"":".")+prefix+clazz},escapeHighlightedString:function(str,highlightPreTag,highlightPostTag){highlightPreTag=highlightPreTag||"<em>";var pre=document.createElement("div");pre.appendChild(document.createTextNode(highlightPreTag));highlightPostTag=highlightPostTag||"</em>";var post=document.createElement("div");post.appendChild(document.createTextNode(highlightPostTag));var div=document.createElement("div");div.appendChild(document.createTextNode(str));return div.innerHTML.replace(RegExp(escapeRegExp(pre.innerHTML),"g"),highlightPreTag).replace(RegExp(escapeRegExp(post.innerHTML),"g"),highlightPostTag)}}},function(module,exports,__webpack_require__){"use strict";module.exports={element:null}},function(module,exports){var hasOwn=Object.prototype.hasOwnProperty;var toString=Object.prototype.toString;module.exports=function forEach(obj,fn,ctx){if(toString.call(fn)!=="[object Function]"){throw new TypeError("iterator must be a function")}var l=obj.length;if(l===+l){for(var i=0;i<l;i++){fn.call(ctx,obj[i],i,obj)}}else{for(var k in obj){if(hasOwn.call(obj,k)){fn.call(ctx,obj[k],k,obj)}}}}},function(module,exports){var g;g=function(){return this}();try{g=g||Function("return this")()||(1,eval)("this")}catch(e){if(typeof window==="object")g=window}module.exports=g},function(module,exports){module.exports=function clone(obj){return JSON.parse(JSON.stringify(obj))}},function(module,exports,__webpack_require__){"use strict";var inherits=__webpack_require__(12);function AlgoliaSearchError(message,extraProperties){var forEach=__webpack_require__(2);var error=this;if(typeof Error.captureStackTrace==="function"){Error.captureStackTrace(this,this.constructor)}else{error.stack=(new Error).stack||"Cannot get a stacktrace, browser is too old"}this.name="AlgoliaSearchError";this.message=message||"Unknown error";if(extraProperties){forEach(extraProperties,function addToErrorObject(value,key){error[key]=value})}}inherits(AlgoliaSearchError,Error);function createCustomError(name,message){function AlgoliaSearchCustomError(){var args=Array.prototype.slice.call(arguments,0);if(typeof args[0]!=="string"){args.unshift(message)}AlgoliaSearchError.apply(this,args);this.name="AlgoliaSearch"+name+"Error"}inherits(AlgoliaSearchCustomError,AlgoliaSearchError);return AlgoliaSearchCustomError}module.exports={AlgoliaSearchError:AlgoliaSearchError,UnparsableJSON:createCustomError("UnparsableJSON","Could not parse the incoming response as JSON, see err.more for details"),RequestTimeout:createCustomError("RequestTimeout","Request timedout before getting a response"),Network:createCustomError("Network","Network issue, see err.more for details"),JSONPScriptFail:createCustomError("JSONPScriptFail","<script> was loaded but did not call our provided callback"),JSONPScriptError:createCustomError("JSONPScriptError","<script> unable to load due to an `error` event on it"),Unknown:createCustomError("Unknown","Unknown error occured")}},function(module,exports,__webpack_require__){(function(process){exports=module.exports=__webpack_require__(39);exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:localstorage();exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function useColors(){if(typeof window!=="undefined"&&window.process&&window.process.type==="renderer"){return true}return typeof document!=="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!=="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!=="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!=="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}exports.formatters.j=function(v){try{return JSON.stringify(v)}catch(err){return"[UnexpectedJSONParseError]: "+err.message}};function formatArgs(args){var useColors=this.useColors;args[0]=(useColors?"%c":"")+this.namespace+(useColors?" %c":" ")+args[0]+(useColors?"%c ":" ")+"+"+exports.humanize(this.diff);if(!useColors)return;var c="color: "+this.color;args.splice(1,0,c,"color: inherit");var index=0;var lastC=0;args[0].replace(/%[a-zA-Z%]/g,function(match){if("%%"===match)return;index++;if("%c"===match){lastC=index}});args.splice(lastC,0,c)}function log(){return"object"===typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(namespaces){try{if(null==namespaces){exports.storage.removeItem("debug")}else{exports.storage.debug=namespaces}}catch(e){}}function load(){var r;try{r=exports.storage.debug}catch(e){}if(!r&&typeof process!=="undefined"&&"env"in process){r=Object({NODE_ENV:"production"}).DEBUG}return r}exports.enable(load());function localstorage(){try{return window.localStorage}catch(e){}}}).call(exports,__webpack_require__(9))},function(module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=="[object Array]"}},function(module,exports,__webpack_require__){var foreach=__webpack_require__(2);module.exports=function map(arr,fn){var newArr=[];foreach(arr,function(item,itemIndex){newArr.push(fn(item,itemIndex,arr))});return newArr}},function(module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}try{if(typeof clearTimeout==="function"){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;runClearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]};process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},function(module,exports,__webpack_require__){"use strict";var immediate=__webpack_require__(55);var splitter=/\s+/;module.exports={onSync:onSync,onAsync:onAsync,off:off,trigger:trigger};function on(method,types,cb,context){var type;if(!cb){return this}types=types.split(splitter);cb=context?bindContext(cb,context):cb;this._callbacks=this._callbacks||{};while(type=types.shift()){this._callbacks[type]=this._callbacks[type]||{sync:[],async:[]};this._callbacks[type][method].push(cb)}return this}function onAsync(types,cb,context){return on.call(this,"async",types,cb,context)}function onSync(types,cb,context){return on.call(this,"sync",types,cb,context)}function off(types){var type;if(!this._callbacks){return this}types=types.split(splitter);while(type=types.shift()){delete this._callbacks[type]}return this}function trigger(types){var type;var callbacks;var args;var syncFlush;var asyncFlush;if(!this._callbacks){return this}types=types.split(splitter);args=[].slice.call(arguments,1);while((type=types.shift())&&(callbacks=this._callbacks[type])){syncFlush=getFlush(callbacks.sync,this,[type].concat(args));asyncFlush=getFlush(callbacks.async,this,[type].concat(args));if(syncFlush()){immediate(asyncFlush)}}return this}function getFlush(callbacks,context,args){return flush;function flush(){var cancelled;for(var i=0,len=callbacks.length;!cancelled&&i<len;i+=1){cancelled=callbacks[i].apply(context,args)===false}return!cancelled}}function bindContext(fn,context){return fn.bind?fn.bind(context):function(){fn.apply(context,[].slice.call(arguments,0))}}},function(module,exports,__webpack_require__){"use strict";var _=__webpack_require__(0);var css={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},suggestions:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:"0"},defaultClasses:{root:"algolia-autocomplete",prefix:"aa",noPrefix:false,dropdownMenu:"dropdown-menu",input:"input",hint:"hint",suggestions:"suggestions",suggestion:"suggestion",cursor:"cursor",dataset:"dataset",empty:"empty"},appendTo:{wrapper:{position:"absolute",zIndex:"100",display:"none"},input:{},inputWithNoHint:{},dropdown:{display:"block"}}};if(_.isMsie()){_.mixin(css.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"})}if(_.isMsie()&&_.isMsie()<=7){_.mixin(css.input,{marginTop:"-1px"})}module.exports=css},function(module,exports){if(typeof Object.create==="function"){module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}})}}else{module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor;ctor.prototype.constructor=ctor}}},function(module,exports,__webpack_require__){module.exports=buildSearchMethod;var errors=__webpack_require__(5);function buildSearchMethod(queryParam,url){return function search(query,args,callback){if(typeof query==="function"&&typeof args==="object"||typeof callback==="object"){throw new errors.AlgoliaSearchError("index.search usage is index.search(query, params, cb)")}if(arguments.length===0||typeof query==="function"){callback=query;query=""}else if(arguments.length===1||typeof args==="function"){callback=args;args=undefined}if(typeof query==="object"&&query!==null){args=query;query=undefined}else if(query===undefined||query===null){query=""}var params="";if(query!==undefined){params+=queryParam+"="+encodeURIComponent(query)}var additionalUA;if(args!==undefined){if(args.additionalUA){additionalUA=args.additionalUA;delete args.additionalUA}params=this.as._getSearchParams(args,params)}return this._search(params,url,callback,additionalUA)}}},function(module,exports){(function(global,factory){module.exports=factory(global)})(window,function(window){var Zepto=function(){var undefined,key,$,classList,emptyArray=[],concat=emptyArray.concat,filter=emptyArray.filter,slice=emptyArray.slice,document=window.document,elementDisplay={},classCache={},cssNumber={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},fragmentRE=/^\s*<(\w+|!)[^>]*>/,singleTagRE=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,tagExpanderRE=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rootNodeRE=/^(?:body|html)$/i,capitalRE=/([A-Z])/g,methodAttributes=["val","css","html","text","data","width","height","offset"],adjacencyOperators=["after","prepend","before","append"],table=document.createElement("table"),tableRow=document.createElement("tr"),containers={tr:document.createElement("tbody"),tbody:table,thead:table,tfoot:table,td:tableRow,th:tableRow,"*":document.createElement("div")},readyRE=/complete|loaded|interactive/,simpleSelectorRE=/^[\w-]*$/,class2type={},toString=class2type.toString,zepto={},camelize,uniq,tempParent=document.createElement("div"),propMap={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},isArray=Array.isArray||function(object){return object instanceof Array};zepto.matches=function(element,selector){if(!selector||!element||element.nodeType!==1)return false;var matchesSelector=element.matches||element.webkitMatchesSelector||element.mozMatchesSelector||element.oMatchesSelector||element.matchesSelector;if(matchesSelector)return matchesSelector.call(element,selector);var match,parent=element.parentNode,temp=!parent;if(temp)(parent=tempParent).appendChild(element);match=~zepto.qsa(parent,selector).indexOf(element);temp&&tempParent.removeChild(element);return match};function type(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"}function isFunction(value){return type(value)=="function"}function isWindow(obj){return obj!=null&&obj==obj.window}function isDocument(obj){return obj!=null&&obj.nodeType==obj.DOCUMENT_NODE}function isObject(obj){return type(obj)=="object"}function isPlainObject(obj){return isObject(obj)&&!isWindow(obj)&&Object.getPrototypeOf(obj)==Object.prototype}function likeArray(obj){var length=!!obj&&"length"in obj&&obj.length,type=$.type(obj);return"function"!=type&&!isWindow(obj)&&("array"==type||length===0||typeof length=="number"&&length>0&&length-1 in obj)}function compact(array){return filter.call(array,function(item){return item!=null})}function flatten(array){return array.length>0?$.fn.concat.apply([],array):array}camelize=function(str){return str.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():""})};function dasherize(str){return str.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}uniq=function(array){return filter.call(array,function(item,idx){return array.indexOf(item)==idx})};function classRE(name){return name in classCache?classCache[name]:classCache[name]=new RegExp("(^|\\s)"+name+"(\\s|$)")}function maybeAddPx(name,value){return typeof value=="number"&&!cssNumber[dasherize(name)]?value+"px":value}function defaultDisplay(nodeName){var element,display;if(!elementDisplay[nodeName]){element=document.createElement(nodeName);document.body.appendChild(element);display=getComputedStyle(element,"").getPropertyValue("display");element.parentNode.removeChild(element);display=="none"&&(display="block");elementDisplay[nodeName]=display}return elementDisplay[nodeName]}function children(element){return"children"in element?slice.call(element.children):$.map(element.childNodes,function(node){if(node.nodeType==1)return node})}function Z(dom,selector){var i,len=dom?dom.length:0;for(i=0;i<len;i++)this[i]=dom[i];this.length=len;this.selector=selector||""}zepto.fragment=function(html,name,properties){var dom,nodes,container;if(singleTagRE.test(html))dom=$(document.createElement(RegExp.$1));if(!dom){if(html.replace)html=html.replace(tagExpanderRE,"<$1></$2>");if(name===undefined)name=fragmentRE.test(html)&&RegExp.$1;if(!(name in containers))name="*";container=containers[name];container.innerHTML=""+html;dom=$.each(slice.call(container.childNodes),function(){container.removeChild(this)})}if(isPlainObject(properties)){nodes=$(dom);$.each(properties,function(key,value){if(methodAttributes.indexOf(key)>-1)nodes[key](value);else nodes.attr(key,value)})}return dom};zepto.Z=function(dom,selector){return new Z(dom,selector)};zepto.isZ=function(object){return object instanceof zepto.Z};zepto.init=function(selector,context){var dom;if(!selector)return zepto.Z();else if(typeof selector=="string"){selector=selector.trim();if(selector[0]=="<"&&fragmentRE.test(selector))dom=zepto.fragment(selector,RegExp.$1,context),selector=null;else if(context!==undefined)return $(context).find(selector);else dom=zepto.qsa(document,selector)}else if(isFunction(selector))return $(document).ready(selector);else if(zepto.isZ(selector))return selector;else{if(isArray(selector))dom=compact(selector);else if(isObject(selector))dom=[selector],selector=null;else if(fragmentRE.test(selector))dom=zepto.fragment(selector.trim(),RegExp.$1,context),selector=null;else if(context!==undefined)return $(context).find(selector);else dom=zepto.qsa(document,selector)}return zepto.Z(dom,selector)};$=function(selector,context){return zepto.init(selector,context)};function extend(target,source,deep){for(key in source)if(deep&&(isPlainObject(source[key])||isArray(source[key]))){if(isPlainObject(source[key])&&!isPlainObject(target[key]))target[key]={};if(isArray(source[key])&&!isArray(target[key]))target[key]=[];extend(target[key],source[key],deep)}else if(source[key]!==undefined)target[key]=source[key]}$.extend=function(target){var deep,args=slice.call(arguments,1);if(typeof target=="boolean"){deep=target;target=args.shift()}args.forEach(function(arg){extend(target,arg,deep)});return target};zepto.qsa=function(element,selector){var found,maybeID=selector[0]=="#",maybeClass=!maybeID&&selector[0]==".",nameOnly=maybeID||maybeClass?selector.slice(1):selector,isSimple=simpleSelectorRE.test(nameOnly);return element.getElementById&&isSimple&&maybeID?(found=element.getElementById(nameOnly))?[found]:[]:element.nodeType!==1&&element.nodeType!==9&&element.nodeType!==11?[]:slice.call(isSimple&&!maybeID&&element.getElementsByClassName?maybeClass?element.getElementsByClassName(nameOnly):element.getElementsByTagName(selector):element.querySelectorAll(selector))};function filtered(nodes,selector){return selector==null?$(nodes):$(nodes).filter(selector)}$.contains=document.documentElement.contains?function(parent,node){return parent!==node&&parent.contains(node)}:function(parent,node){while(node&&(node=node.parentNode))if(node===parent)return true;return false};function funcArg(context,arg,idx,payload){return isFunction(arg)?arg.call(context,idx,payload):arg}function setAttribute(node,name,value){value==null?node.removeAttribute(name):node.setAttribute(name,value)}function className(node,value){var klass=node.className||"",svg=klass&&klass.baseVal!==undefined;if(value===undefined)return svg?klass.baseVal:klass;svg?klass.baseVal=value:node.className=value}function deserializeValue(value){try{return value?value=="true"||(value=="false"?false:value=="null"?null:+value+""==value?+value:/^[\[\{]/.test(value)?$.parseJSON(value):value):value}catch(e){return value}}$.type=type;$.isFunction=isFunction;$.isWindow=isWindow;$.isArray=isArray;$.isPlainObject=isPlainObject;$.isEmptyObject=function(obj){var name;for(name in obj)return false;return true};$.isNumeric=function(val){var num=Number(val),type=typeof val;return val!=null&&type!="boolean"&&(type!="string"||val.length)&&!isNaN(num)&&isFinite(num)||false};$.inArray=function(elem,array,i){return emptyArray.indexOf.call(array,elem,i)};$.camelCase=camelize;$.trim=function(str){return str==null?"":String.prototype.trim.call(str)};$.uuid=0;$.support={};$.expr={};$.noop=function(){};$.map=function(elements,callback){var value,values=[],i,key;if(likeArray(elements))for(i=0;i<elements.length;i++){value=callback(elements[i],i);if(value!=null)values.push(value)}else for(key in elements){value=callback(elements[key],key);if(value!=null)values.push(value)}return flatten(values)};$.each=function(elements,callback){var i,key;if(likeArray(elements)){for(i=0;i<elements.length;i++)if(callback.call(elements[i],i,elements[i])===false)return elements}else{for(key in elements)if(callback.call(elements[key],key,elements[key])===false)return elements}return elements};$.grep=function(elements,callback){return filter.call(elements,callback)};if(window.JSON)$.parseJSON=JSON.parse;$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()});$.fn={constructor:zepto.Z,length:0,forEach:emptyArray.forEach,reduce:emptyArray.reduce,push:emptyArray.push,sort:emptyArray.sort,splice:emptyArray.splice,indexOf:emptyArray.indexOf,concat:function(){var i,value,args=[];for(i=0;i<arguments.length;i++){value=arguments[i];args[i]=zepto.isZ(value)?value.toArray():value}return concat.apply(zepto.isZ(this)?this.toArray():this,args)},map:function(fn){return $($.map(this,function(el,i){return fn.call(el,i,el)}))},slice:function(){return $(slice.apply(this,arguments))},ready:function(callback){if(readyRE.test(document.readyState)&&document.body)callback($);else document.addEventListener("DOMContentLoaded",function(){callback($)},false);return this},get:function(idx){return idx===undefined?slice.call(this):this[idx>=0?idx:idx+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){if(this.parentNode!=null)this.parentNode.removeChild(this)})},each:function(callback){emptyArray.every.call(this,function(el,idx){return callback.call(el,idx,el)!==false});return this},filter:function(selector){if(isFunction(selector))return this.not(this.not(selector));return $(filter.call(this,function(element){return zepto.matches(element,selector)}))},add:function(selector,context){return $(uniq(this.concat($(selector,context))))},is:function(selector){return this.length>0&&zepto.matches(this[0],selector)},not:function(selector){var nodes=[];if(isFunction(selector)&&selector.call!==undefined)this.each(function(idx){if(!selector.call(this,idx))nodes.push(this)});else{var excludes=typeof selector=="string"?this.filter(selector):likeArray(selector)&&isFunction(selector.item)?slice.call(selector):$(selector);this.forEach(function(el){if(excludes.indexOf(el)<0)nodes.push(el)})}return $(nodes)},has:function(selector){return this.filter(function(){return isObject(selector)?$.contains(this,selector):$(this).find(selector).size()})},eq:function(idx){return idx===-1?this.slice(idx):this.slice(idx,+idx+1)},first:function(){var el=this[0];return el&&!isObject(el)?el:$(el)},last:function(){var el=this[this.length-1];return el&&!isObject(el)?el:$(el)},find:function(selector){var result,$this=this;if(!selector)result=$();else if(typeof selector=="object")result=$(selector).filter(function(){var node=this;return emptyArray.some.call($this,function(parent){return $.contains(parent,node)})});else if(this.length==1)result=$(zepto.qsa(this[0],selector));else result=this.map(function(){return zepto.qsa(this,selector)});return result},closest:function(selector,context){var nodes=[],collection=typeof selector=="object"&&$(selector);this.each(function(_,node){while(node&&!(collection?collection.indexOf(node)>=0:zepto.matches(node,selector)))node=node!==context&&!isDocument(node)&&node.parentNode;if(node&&nodes.indexOf(node)<0)nodes.push(node)});return $(nodes)},parents:function(selector){var ancestors=[],nodes=this;while(nodes.length>0)nodes=$.map(nodes,function(node){if((node=node.parentNode)&&!isDocument(node)&&ancestors.indexOf(node)<0){ancestors.push(node);return node}});return filtered(ancestors,selector)},parent:function(selector){return filtered(uniq(this.pluck("parentNode")),selector)},children:function(selector){return filtered(this.map(function(){return children(this)}),selector)},contents:function(){return this.map(function(){return this.contentDocument||slice.call(this.childNodes)})},siblings:function(selector){return filtered(this.map(function(i,el){return filter.call(children(el.parentNode),function(child){return child!==el})}),selector)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(property){return $.map(this,function(el){return el[property]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display="");if(getComputedStyle(this,"").getPropertyValue("display")=="none")this.style.display=defaultDisplay(this.nodeName)})},replaceWith:function(newContent){return this.before(newContent).remove()},wrap:function(structure){var func=isFunction(structure);if(this[0]&&!func)var dom=$(structure).get(0),clone=dom.parentNode||this.length>1;return this.each(function(index){$(this).wrapAll(func?structure.call(this,index):clone?dom.cloneNode(true):dom)})},wrapAll:function(structure){if(this[0]){$(this[0]).before(structure=$(structure));var children;while((children=structure.children()).length)structure=children.first();$(structure).append(this)}return this},wrapInner:function(structure){var func=isFunction(structure);return this.each(function(index){var self=$(this),contents=self.contents(),dom=func?structure.call(this,index):structure;contents.length?contents.wrapAll(dom):self.append(dom)})},unwrap:function(){this.parent().each(function(){$(this).replaceWith($(this).children())});return this},clone:function(){return this.map(function(){return this.cloneNode(true)})},hide:function(){return this.css("display","none")},toggle:function(setting){return this.each(function(){var el=$(this);(setting===undefined?el.css("display")=="none":setting)?el.show():el.hide()})},prev:function(selector){return $(this.pluck("previousElementSibling")).filter(selector||"*")},next:function(selector){return $(this.pluck("nextElementSibling")).filter(selector||"*")},html:function(html){return 0 in arguments?this.each(function(idx){var originHtml=this.innerHTML;$(this).empty().append(funcArg(this,html,idx,originHtml))}):0 in this?this[0].innerHTML:null},text:function(text){return 0 in arguments?this.each(function(idx){var newText=funcArg(this,text,idx,this.textContent);this.textContent=newText==null?"":""+newText}):0 in this?this.pluck("textContent").join(""):null},attr:function(name,value){var result;return typeof name=="string"&&!(1 in arguments)?0 in this&&this[0].nodeType==1&&(result=this[0].getAttribute(name))!=null?result:undefined:this.each(function(idx){if(this.nodeType!==1)return;if(isObject(name))for(key in name)setAttribute(this,key,name[key]);else setAttribute(this,name,funcArg(this,value,idx,this.getAttribute(name)))})},removeAttr:function(name){return this.each(function(){this.nodeType===1&&name.split(" ").forEach(function(attribute){setAttribute(this,attribute)},this)})},prop:function(name,value){name=propMap[name]||name;return 1 in arguments?this.each(function(idx){this[name]=funcArg(this,value,idx,this[name])}):this[0]&&this[0][name]},removeProp:function(name){name=propMap[name]||name;return this.each(function(){delete this[name]})},data:function(name,value){var attrName="data-"+name.replace(capitalRE,"-$1").toLowerCase();var data=1 in arguments?this.attr(attrName,value):this.attr(attrName);return data!==null?deserializeValue(data):undefined},val:function(value){if(0 in arguments){if(value==null)value="";return this.each(function(idx){this.value=funcArg(this,value,idx,this.value)})}else{return this[0]&&(this[0].multiple?$(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)}},offset:function(coordinates){if(coordinates)return this.each(function(index){var $this=$(this),coords=funcArg(this,coordinates,index,$this.offset()),parentOffset=$this.offsetParent().offset(),props={top:coords.top-parentOffset.top,left:coords.left-parentOffset.left};if($this.css("position")=="static")props["position"]="relative";$this.css(props)});if(!this.length)return null;if(document.documentElement!==this[0]&&!$.contains(document.documentElement,this[0]))return{top:0,left:0};var obj=this[0].getBoundingClientRect();return{left:obj.left+window.pageXOffset,top:obj.top+window.pageYOffset,width:Math.round(obj.width),height:Math.round(obj.height)}},css:function(property,value){if(arguments.length<2){var element=this[0];if(typeof property=="string"){if(!element)return;return element.style[camelize(property)]||getComputedStyle(element,"").getPropertyValue(property)}else if(isArray(property)){if(!element)return;var props={};var computedStyle=getComputedStyle(element,"");$.each(property,function(_,prop){props[prop]=element.style[camelize(prop)]||computedStyle.getPropertyValue(prop)});return props}}var css="";if(type(property)=="string"){if(!value&&value!==0)this.each(function(){this.style.removeProperty(dasherize(property))});else css=dasherize(property)+":"+maybeAddPx(property,value)}else{for(key in property)if(!property[key]&&property[key]!==0)this.each(function(){this.style.removeProperty(dasherize(key))});else css+=dasherize(key)+":"+maybeAddPx(key,property[key])+";"}return this.each(function(){this.style.cssText+=";"+css})},index:function(element){return element?this.indexOf($(element)[0]):this.parent().children().indexOf(this[0])},hasClass:function(name){if(!name)return false;return emptyArray.some.call(this,function(el){return this.test(className(el))},classRE(name))},addClass:function(name){if(!name)return this;return this.each(function(idx){if(!("className"in this))return;classList=[];var cls=className(this),newName=funcArg(this,name,idx,cls);newName.split(/\s+/g).forEach(function(klass){if(!$(this).hasClass(klass))classList.push(klass)},this);classList.length&&className(this,cls+(cls?" ":"")+classList.join(" "))})},removeClass:function(name){return this.each(function(idx){if(!("className"in this))return;if(name===undefined)return className(this,"");classList=className(this);funcArg(this,name,idx,classList).split(/\s+/g).forEach(function(klass){classList=classList.replace(classRE(klass)," ")});className(this,classList.trim())})},toggleClass:function(name,when){if(!name)return this;return this.each(function(idx){var $this=$(this),names=funcArg(this,name,idx,className(this));names.split(/\s+/g).forEach(function(klass){(when===undefined?!$this.hasClass(klass):when)?$this.addClass(klass):$this.removeClass(klass)})})},scrollTop:function(value){if(!this.length)return;var hasScrollTop="scrollTop"in this[0];if(value===undefined)return hasScrollTop?this[0].scrollTop:this[0].pageYOffset;return this.each(hasScrollTop?function(){this.scrollTop=value}:function(){this.scrollTo(this.scrollX,value)})},scrollLeft:function(value){if(!this.length)return;var hasScrollLeft="scrollLeft"in this[0];if(value===undefined)return hasScrollLeft?this[0].scrollLeft:this[0].pageXOffset;return this.each(hasScrollLeft?function(){this.scrollLeft=value}:function(){this.scrollTo(value,this.scrollY)})},position:function(){if(!this.length)return;var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rootNodeRE.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat($(elem).css("margin-top"))||0;offset.left-=parseFloat($(elem).css("margin-left"))||0;parentOffset.top+=parseFloat($(offsetParent[0]).css("border-top-width"))||0;parentOffset.left+=parseFloat($(offsetParent[0]).css("border-left-width"))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var parent=this.offsetParent||document.body;while(parent&&!rootNodeRE.test(parent.nodeName)&&$(parent).css("position")=="static")parent=parent.offsetParent;return parent})}};$.fn.detach=$.fn.remove;["width","height"].forEach(function(dimension){var dimensionProperty=dimension.replace(/./,function(m){return m[0].toUpperCase()});$.fn[dimension]=function(value){var offset,el=this[0];if(value===undefined)return isWindow(el)?el["inner"+dimensionProperty]:isDocument(el)?el.documentElement["scroll"+dimensionProperty]:(offset=this.offset())&&offset[dimension];else return this.each(function(idx){el=$(this);el.css(dimension,funcArg(this,value,idx,el[dimension]()))})}});function traverseNode(node,fun){fun(node);for(var i=0,len=node.childNodes.length;i<len;i++)traverseNode(node.childNodes[i],fun)}adjacencyOperators.forEach(function(operator,operatorIndex){var inside=operatorIndex%2;$.fn[operator]=function(){var argType,nodes=$.map(arguments,function(arg){var arr=[];argType=type(arg);if(argType=="array"){arg.forEach(function(el){if(el.nodeType!==undefined)return arr.push(el);else if($.zepto.isZ(el))return arr=arr.concat(el.get());arr=arr.concat(zepto.fragment(el))});return arr}return argType=="object"||arg==null?arg:zepto.fragment(arg)}),parent,copyByClone=this.length>1;if(nodes.length<1)return this;return this.each(function(_,target){parent=inside?target:target.parentNode;target=operatorIndex==0?target.nextSibling:operatorIndex==1?target.firstChild:operatorIndex==2?target:null;var parentInDocument=$.contains(document.documentElement,parent);nodes.forEach(function(node){if(copyByClone)node=node.cloneNode(true);else if(!parent)return $(node).remove();parent.insertBefore(node,target);if(parentInDocument)traverseNode(node,function(el){if(el.nodeName!=null&&el.nodeName.toUpperCase()==="SCRIPT"&&(!el.type||el.type==="text/javascript")&&!el.src){var target=el.ownerDocument?el.ownerDocument.defaultView:window;target["eval"].call(target,el.innerHTML)}})})})};$.fn[inside?operator+"To":"insert"+(operatorIndex?"Before":"After")]=function(html){$(html)[operator](this);return this}});zepto.Z.prototype=Z.prototype=$.fn;zepto.uniq=uniq;zepto.deserializeValue=deserializeValue;$.zepto=zepto;return $}();(function($){var _zid=1,undefined,slice=Array.prototype.slice,isFunction=$.isFunction,isString=function(obj){return typeof obj=="string"},handlers={},specialEvents={},focusinSupported="onfocusin"in window,focus={focus:"focusin",blur:"focusout"},hover={mouseenter:"mouseover",mouseleave:"mouseout"};specialEvents.click=specialEvents.mousedown=specialEvents.mouseup=specialEvents.mousemove="MouseEvents";function zid(element){return element._zid||(element._zid=_zid++)}function findHandlers(element,event,fn,selector){event=parse(event);if(event.ns)var matcher=matcherFor(event.ns);return(handlers[zid(element)]||[]).filter(function(handler){return handler&&(!event.e||handler.e==event.e)&&(!event.ns||matcher.test(handler.ns))&&(!fn||zid(handler.fn)===zid(fn))&&(!selector||handler.sel==selector)})}function parse(event){var parts=(""+event).split(".");return{e:parts[0],ns:parts.slice(1).sort().join(" ")}}function matcherFor(ns){return new RegExp("(?:^| )"+ns.replace(" "," .* ?")+"(?: |$)")}function eventCapture(handler,captureSetting){return handler.del&&(!focusinSupported&&handler.e in focus)||!!captureSetting}function realEvent(type){return hover[type]||focusinSupported&&focus[type]||type}function add(element,events,fn,data,selector,delegator,capture){var id=zid(element),set=handlers[id]||(handlers[id]=[]);events.split(/\s/).forEach(function(event){if(event=="ready")return $(document).ready(fn);var handler=parse(event);handler.fn=fn;handler.sel=selector;if(handler.e in hover)fn=function(e){var related=e.relatedTarget;if(!related||related!==this&&!$.contains(this,related))return handler.fn.apply(this,arguments)};handler.del=delegator;var callback=delegator||fn;handler.proxy=function(e){e=compatible(e);if(e.isImmediatePropagationStopped())return;e.data=data;var result=callback.apply(element,e._args==undefined?[e]:[e].concat(e._args));if(result===false)e.preventDefault(),e.stopPropagation();return result};handler.i=set.length;set.push(handler);if("addEventListener"in element)element.addEventListener(realEvent(handler.e),handler.proxy,eventCapture(handler,capture))})}function remove(element,events,fn,selector,capture){var id=zid(element);(events||"").split(/\s/).forEach(function(event){findHandlers(element,event,fn,selector).forEach(function(handler){delete handlers[id][handler.i];if("removeEventListener"in element)element.removeEventListener(realEvent(handler.e),handler.proxy,eventCapture(handler,capture))})})}$.event={add:add,remove:remove};$.proxy=function(fn,context){var args=2 in arguments&&slice.call(arguments,2);if(isFunction(fn)){var proxyFn=function(){return fn.apply(context,args?args.concat(slice.call(arguments)):arguments)};proxyFn._zid=zid(fn);return proxyFn}else if(isString(context)){if(args){args.unshift(fn[context],fn);return $.proxy.apply(null,args)}else{return $.proxy(fn[context],fn)}}else{throw new TypeError("expected function")}};$.fn.bind=function(event,data,callback){return this.on(event,data,callback)};$.fn.unbind=function(event,callback){return this.off(event,callback)};$.fn.one=function(event,selector,data,callback){return this.on(event,selector,data,callback,1)};var returnTrue=function(){return true},returnFalse=function(){return false},ignoreProperties=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,eventMethods={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function compatible(event,source){if(source||!event.isDefaultPrevented){source||(source=event);$.each(eventMethods,function(name,predicate){var sourceMethod=source[name];event[name]=function(){this[predicate]=returnTrue;return sourceMethod&&sourceMethod.apply(source,arguments)};event[predicate]=returnFalse});event.timeStamp||(event.timeStamp=Date.now());if(source.defaultPrevented!==undefined?source.defaultPrevented:"returnValue"in source?source.returnValue===false:source.getPreventDefault&&source.getPreventDefault())event.isDefaultPrevented=returnTrue}return event}function createProxy(event){var key,proxy={originalEvent:event};for(key in event)if(!ignoreProperties.test(key)&&event[key]!==undefined)proxy[key]=event[key];return compatible(proxy,event)}$.fn.delegate=function(selector,event,callback){return this.on(event,selector,callback)};$.fn.undelegate=function(selector,event,callback){return this.off(event,selector,callback)};$.fn.live=function(event,callback){$(document.body).delegate(this.selector,event,callback);return this};$.fn.die=function(event,callback){$(document.body).undelegate(this.selector,event,callback);return this};$.fn.on=function(event,selector,data,callback,one){var autoRemove,delegator,$this=this;if(event&&!isString(event)){$.each(event,function(type,fn){$this.on(type,selector,data,fn,one)});return $this}if(!isString(selector)&&!isFunction(callback)&&callback!==false)callback=data,data=selector,selector=undefined;if(callback===undefined||data===false)callback=data,data=undefined;if(callback===false)callback=returnFalse;return $this.each(function(_,element){if(one)autoRemove=function(e){remove(element,e.type,callback);return callback.apply(this,arguments)};if(selector)delegator=function(e){var evt,match=$(e.target).closest(selector,element).get(0);if(match&&match!==element){evt=$.extend(createProxy(e),{currentTarget:match,liveFired:element});return(autoRemove||callback).apply(match,[evt].concat(slice.call(arguments,1)))}};add(element,event,callback,data,selector,delegator||autoRemove)})};$.fn.off=function(event,selector,callback){var $this=this;if(event&&!isString(event)){$.each(event,function(type,fn){$this.off(type,selector,fn)});return $this}if(!isString(selector)&&!isFunction(callback)&&callback!==false)callback=selector,selector=undefined;if(callback===false)callback=returnFalse;return $this.each(function(){remove(this,event,callback,selector)})};$.fn.trigger=function(event,args){event=isString(event)||$.isPlainObject(event)?$.Event(event):compatible(event);event._args=args;return this.each(function(){if(event.type in focus&&typeof this[event.type]=="function")this[event.type]();else if("dispatchEvent"in this)this.dispatchEvent(event);else $(this).triggerHandler(event,args)})};$.fn.triggerHandler=function(event,args){var e,result;this.each(function(i,element){e=createProxy(isString(event)?$.Event(event):event);e._args=args;e.target=element;$.each(findHandlers(element,event.type||event),function(i,handler){result=handler.proxy(e);if(e.isImmediatePropagationStopped())return false})});return result};("focusin focusout focus blur load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select keydown keypress keyup error").split(" ").forEach(function(event){$.fn[event]=function(callback){return 0 in arguments?this.bind(event,callback):this.trigger(event)}});$.Event=function(type,props){if(!isString(type))props=type,type=props.type;var event=document.createEvent(specialEvents[type]||"Events"),bubbles=true;if(props)for(var name in props)name=="bubbles"?bubbles=!!props[name]:event[name]=props[name];event.initEvent(type,bubbles,true);return compatible(event)}})(Zepto);(function($){var cache=[],timeout;$.fn.remove=function(){return this.each(function(){if(this.parentNode){if(this.tagName==="IMG"){cache.push(this);this.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";if(timeout)clearTimeout(timeout);timeout=setTimeout(function(){cache=[]},6e4)}this.parentNode.removeChild(this)}})}})(Zepto);(function($){var data={},dataAttr=$.fn.data,camelize=$.camelCase,exp=$.expando="Zepto"+ +new Date,emptyArray=[];function getData(node,name){var id=node[exp],store=id&&data[id];if(name===undefined)return store||setData(node);else{if(store){if(name in store)return store[name];var camelName=camelize(name);if(camelName in store)return store[camelName]}return dataAttr.call($(node),name)}}function setData(node,name,value){var id=node[exp]||(node[exp]=++$.uuid),store=data[id]||(data[id]=attributeData(node));if(name!==undefined)store[camelize(name)]=value;return store}function attributeData(node){var store={};$.each(node.attributes||emptyArray,function(i,attr){if(attr.name.indexOf("data-")==0)store[camelize(attr.name.replace("data-",""))]=$.zepto.deserializeValue(attr.value)});return store}$.fn.data=function(name,value){return value===undefined?$.isPlainObject(name)?this.each(function(i,node){$.each(name,function(key,value){setData(node,key,value)})}):0 in this?getData(this[0],name):undefined:this.each(function(){setData(this,name,value)})};$.data=function(elem,name,value){return $(elem).data(name,value)};$.hasData=function(elem){var id=elem[exp],store=id&&data[id];return store?!$.isEmptyObject(store):false};$.fn.removeData=function(names){if(typeof names=="string")names=names.split(/\s+/);return this.each(function(){var id=this[exp],store=id&&data[id];if(store)$.each(names||store,function(key){delete store[names?camelize(this):key]})})};["remove","empty"].forEach(function(methodName){var origFn=$.fn[methodName];$.fn[methodName]=function(){var elements=this.find("*");if(methodName==="remove")elements=elements.add(this);elements.removeData();return origFn.call(this)}})})(Zepto);return Zepto})},function(module,exports,__webpack_require__){"use strict";var namespace="autocomplete:";var _=__webpack_require__(0);var DOM=__webpack_require__(1);function EventBus(o){if(!o||!o.el){_.error("EventBus initialized without el")}this.$el=DOM.element(o.el)}_.mixin(EventBus.prototype,{trigger:function(type){var args=[].slice.call(arguments,1);var event=_.Event(namespace+type);this.$el.trigger(event,args);return event}});module.exports=EventBus},function(module,exports,__webpack_require__){"use strict";module.exports={wrapper:'<span class="%ROOT%"></span>',dropdown:'<span class="%PREFIX%%DROPDOWN_MENU%"></span>',dataset:'<div class="%PREFIX%%DATASET%-%CLASS%"></div>',suggestions:'<span class="%PREFIX%%SUGGESTIONS%"></span>',suggestion:'<div class="%PREFIX%%SUGGESTION%"></div>'}},function(module,exports){module.exports="0.29.0"},function(module,exports,__webpack_require__){"use strict";module.exports=function parseAlgoliaClientVersion(agent){var parsed=agent.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);if(parsed)return[parsed[1],parsed[2],parsed[3]];return undefined}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _zepto=__webpack_require__(14);var _zepto2=_interopRequireDefault(_zepto);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=_zepto2.default},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default="2.5.2"},function(module,exports,__webpack_require__){"use strict";var _main=__webpack_require__(22);var _main2=_interopRequireDefault(_main);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}module.exports=_main2.default},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _toFactory=__webpack_require__(23);var _toFactory2=_interopRequireDefault(_toFactory);var _DocSearch=__webpack_require__(24);var _DocSearch2=_interopRequireDefault(_DocSearch);var _version=__webpack_require__(20);var _version2=_interopRequireDefault(_version);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var docsearch=(0,_toFactory2.default)(_DocSearch2.default);docsearch.version=_version2.default;exports.default=docsearch},function(module,exports,__webpack_require__){"use strict";var _bind=Function.prototype.bind;function toFactory(Class){var Factory=function Factory(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return new(_bind.apply(Class,[null].concat(args)))};Factory.__proto__=Class;Factory.prototype=Class.prototype;return Factory}module.exports=toFactory},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _hogan=__webpack_require__(25);var _hogan2=_interopRequireDefault(_hogan);var _lite=__webpack_require__(28);var _lite2=_interopRequireDefault(_lite);var _autocomplete=__webpack_require__(51);var _autocomplete2=_interopRequireDefault(_autocomplete);var _templates=__webpack_require__(66);var _templates2=_interopRequireDefault(_templates);var _utils=__webpack_require__(67);var _utils2=_interopRequireDefault(_utils);var _version=__webpack_require__(20);var _version2=_interopRequireDefault(_version);var _zepto=__webpack_require__(19);var _zepto2=_interopRequireDefault(_zepto);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var usage="Usage:\n  documentationSearch({\n  apiKey,\n  indexName,\n  inputSelector,\n  [ appId ],\n  [ algoliaOptions.{hitsPerPage} ]\n  [ autocompleteOptions.{hint,debug} ]\n})";var DocSearch=function(){function DocSearch(_ref){var apiKey=_ref.apiKey,indexName=_ref.indexName,inputSelector=_ref.inputSelector,_ref$appId=_ref.appId,appId=_ref$appId===undefined?"BH4D9OD16A":_ref$appId,_ref$debug=_ref.debug,debug=_ref$debug===undefined?false:_ref$debug,_ref$algoliaOptions=_ref.algoliaOptions,algoliaOptions=_ref$algoliaOptions===undefined?{}:_ref$algoliaOptions,_ref$autocompleteOpti=_ref.autocompleteOptions,autocompleteOptions=_ref$autocompleteOpti===undefined?{debug:false,hint:false,autoselect:true}:_ref$autocompleteOpti,_ref$transformData=_ref.transformData,transformData=_ref$transformData===undefined?false:_ref$transformData,_ref$queryHook=_ref.queryHook,queryHook=_ref$queryHook===undefined?false:_ref$queryHook,_ref$handleSelected=_ref.handleSelected,handleSelected=_ref$handleSelected===undefined?false:_ref$handleSelected,_ref$enhancedSearchIn=_ref.enhancedSearchInput,enhancedSearchInput=_ref$enhancedSearchIn===undefined?false:_ref$enhancedSearchIn,_ref$layout=_ref.layout,layout=_ref$layout===undefined?"collumns":_ref$layout;_classCallCheck(this,DocSearch);DocSearch.checkArguments({apiKey:apiKey,indexName:indexName,inputSelector:inputSelector,debug:debug,algoliaOptions:algoliaOptions,autocompleteOptions:autocompleteOptions,transformData:transformData,queryHook:queryHook,handleSelected:handleSelected,enhancedSearchInput:enhancedSearchInput,layout:layout});this.apiKey=apiKey;this.appId=appId;this.indexName=indexName;this.input=DocSearch.getInputFromSelector(inputSelector);this.algoliaOptions=_extends({hitsPerPage:5},algoliaOptions);var autocompleteOptionsDebug=autocompleteOptions&&autocompleteOptions.debug?autocompleteOptions.debug:false;autocompleteOptions.debug=debug||autocompleteOptionsDebug;this.autocompleteOptions=autocompleteOptions;this.autocompleteOptions.cssClasses=this.autocompleteOptions.cssClasses||{};this.autocompleteOptions.cssClasses.prefix=this.autocompleteOptions.cssClasses.prefix||"ds";handleSelected=handleSelected||this.handleSelected;this.isSimpleLayout=layout==="simple";this.client=(0,_lite2.default)(this.appId,this.apiKey);this.client.addAlgoliaAgent("docsearch.js "+_version2.default);if(enhancedSearchInput){this.input=DocSearch.injectSearchBox(this.input)}this.autocomplete=(0,_autocomplete2.default)(this.input,autocompleteOptions,[{source:this.getAutocompleteSource(transformData,queryHook),templates:{suggestion:DocSearch.getSuggestionTemplate(this.isSimpleLayout),footer:_templates2.default.footer,empty:DocSearch.getEmptyTemplate()}}]);this.autocomplete.on("autocomplete:selected",handleSelected.bind(null,this.autocomplete.autocomplete));this.autocomplete.on("autocomplete:shown",this.handleShown.bind(null,this.input));if(enhancedSearchInput){DocSearch.bindSearchBoxEvent()}}_createClass(DocSearch,[{key:"getAutocompleteSource",value:function getAutocompleteSource(transformData,queryHook){var _this=this;return function(query,callback){if(queryHook){query=queryHook(query)||query}_this.client.search([{indexName:_this.indexName,query:query,params:_this.algoliaOptions}]).then(function(data){var hits=data.results[0].hits;if(transformData){hits=transformData(hits)||hits}callback(DocSearch.formatHits(hits))})}}},{key:"handleSelected",value:function handleSelected(input,event,suggestion){input.setVal("");window.location.href=suggestion.url}},{key:"handleShown",value:function handleShown(input){var middleOfInput=input.offset().left+input.width()/2;var middleOfWindow=(0,_zepto2.default)(document).width()/2;if(isNaN(middleOfWindow)){middleOfWindow=900}var alignClass=middleOfInput-middleOfWindow>=0?"algolia-autocomplete-right":"algolia-autocomplete-left";var otherAlignClass=middleOfInput-middleOfWindow<0?"algolia-autocomplete-right":"algolia-autocomplete-left";var autocompleteWrapper=(0,_zepto2.default)(".algolia-autocomplete");if(!autocompleteWrapper.hasClass(alignClass)){autocompleteWrapper.addClass(alignClass)}if(autocompleteWrapper.hasClass(otherAlignClass)){autocompleteWrapper.removeClass(otherAlignClass)}}}],[{key:"checkArguments",value:function checkArguments(args){if(!args.apiKey||!args.indexName){throw new Error(usage)}if(!DocSearch.getInputFromSelector(args.inputSelector)){throw new Error("Error: No input element in the page matches "+args.inputSelector)}}},{key:"injectSearchBox",value:function injectSearchBox(input){input.before(_templates2.default.searchBox);var newInput=input.prev().prev().find("input");input.remove();return newInput}},{key:"bindSearchBoxEvent",value:function bindSearchBoxEvent(){(0,_zepto2.default)('.searchbox [type="reset"]').on("click",function(){(0,_zepto2.default)("input#docsearch").focus();(0,_zepto2.default)(this).addClass("hide");_autocomplete2.default.autocomplete.setVal("")});(0,_zepto2.default)("input#docsearch").on("keyup",function(){var searchbox=document.querySelector("input#docsearch");var reset=document.querySelector('.searchbox [type="reset"]');reset.className="searchbox__reset";if(searchbox.value.length===0){reset.className+=" hide"}})}},{key:"getInputFromSelector",value:function getInputFromSelector(selector){var input=(0,_zepto2.default)(selector).filter("input");return input.length?(0,_zepto2.default)(input[0]):null}},{key:"formatHits",value:function formatHits(receivedHits){var clonedHits=_utils2.default.deepClone(receivedHits);var hits=clonedHits.map(function(hit){if(hit._highlightResult){hit._highlightResult=_utils2.default.mergeKeyWithParent(hit._highlightResult,"hierarchy")}return _utils2.default.mergeKeyWithParent(hit,"hierarchy")});var groupedHits=_utils2.default.groupBy(hits,"lvl0");_zepto2.default.each(groupedHits,function(level,collection){var groupedHitsByLvl1=_utils2.default.groupBy(collection,"lvl1");var flattenedHits=_utils2.default.flattenAndFlagFirst(groupedHitsByLvl1,"isSubCategoryHeader");groupedHits[level]=flattenedHits});groupedHits=_utils2.default.flattenAndFlagFirst(groupedHits,"isCategoryHeader");return groupedHits.map(function(hit){var url=DocSearch.formatURL(hit);var category=_utils2.default.getHighlightedValue(hit,"lvl0");var subcategory=_utils2.default.getHighlightedValue(hit,"lvl1")||category;var displayTitle=_utils2.default.compact([_utils2.default.getHighlightedValue(hit,"lvl2")||subcategory,_utils2.default.getHighlightedValue(hit,"lvl3"),_utils2.default.getHighlightedValue(hit,"lvl4"),_utils2.default.getHighlightedValue(hit,"lvl5"),_utils2.default.getHighlightedValue(hit,"lvl6")]).join('<span class="aa-suggestion-title-separator" aria-hidden="true"> › </span>');var text=_utils2.default.getSnippetedValue(hit,"content");var isTextOrSubcatoryNonEmpty=subcategory&&subcategory!==""||displayTitle&&displayTitle!=="";var isLvl1EmptyOrDuplicate=!subcategory||subcategory===""||subcategory===category;var isLvl2=displayTitle&&displayTitle!==""&&displayTitle!==subcategory;var isLvl1=!isLvl2&&subcategory&&subcategory!==""&&subcategory!==category;var isLvl0=!isLvl1&&!isLvl2;return{isLvl0:isLvl0,isLvl1:isLvl1,isLvl2:isLvl2,isLvl1EmptyOrDuplicate:isLvl1EmptyOrDuplicate,isCategoryHeader:hit.isCategoryHeader,isSubCategoryHeader:hit.isSubCategoryHeader,isTextOrSubcatoryNonEmpty:isTextOrSubcatoryNonEmpty,category:category,subcategory:subcategory,title:displayTitle,text:text,url:url}})}},{key:"formatURL",value:function formatURL(hit){var url=hit.url,anchor=hit.anchor;if(url){var containsAnchor=url.indexOf("#")!==-1;if(containsAnchor)return url;else if(anchor)return hit.url+"#"+hit.anchor;return url}else if(anchor)return"#"+hit.anchor;console.warn("no anchor nor url for : ",JSON.stringify(hit));return null}},{key:"getEmptyTemplate",value:function getEmptyTemplate(){return function(args){return _hogan2.default.compile(_templates2.default.empty).render(args)}}},{key:"getSuggestionTemplate",value:function getSuggestionTemplate(isSimpleLayout){var stringTemplate=isSimpleLayout?_templates2.default.suggestionSimple:_templates2.default.suggestion;var template=_hogan2.default.compile(stringTemplate);return function(suggestion){return template.render(suggestion)}}}]);return DocSearch}();exports.default=DocSearch},function(module,exports,__webpack_require__){var Hogan=__webpack_require__(26);Hogan.Template=__webpack_require__(27).Template;Hogan.template=Hogan.Template;module.exports=Hogan},function(module,exports,__webpack_require__){(function(Hogan){var rIsWhitespace=/\S/,rQuot=/\"/g,rNewline=/\n/g,rCr=/\r/g,rSlash=/\\/g,rLineSep=/\u2028/,rParagraphSep=/\u2029/;Hogan.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12};Hogan.scan=function scan(text,delimiters){var len=text.length,IN_TEXT=0,IN_TAG_TYPE=1,IN_TAG=2,state=IN_TEXT,tagType=null,tag=null,buf="",tokens=[],seenTag=false,i=0,lineStart=0,otag="{{",ctag="}}";function addBuf(){if(buf.length>0){tokens.push({tag:"_t",text:new String(buf)});buf=""}}function lineIsWhitespace(){var isAllWhitespace=true;for(var j=lineStart;j<tokens.length;j++){isAllWhitespace=Hogan.tags[tokens[j].tag]<Hogan.tags["_v"]||tokens[j].tag=="_t"&&tokens[j].text.match(rIsWhitespace)===null;if(!isAllWhitespace){return false}}return isAllWhitespace}function filterLine(haveSeenTag,noNewLine){addBuf();if(haveSeenTag&&lineIsWhitespace()){for(var j=lineStart,next;j<tokens.length;j++){if(tokens[j].text){if((next=tokens[j+1])&&next.tag==">"){next.indent=tokens[j].text.toString()}tokens.splice(j,1)}}}else if(!noNewLine){tokens.push({tag:"\n"})}seenTag=false;lineStart=tokens.length}function changeDelimiters(text,index){var close="="+ctag,closeIndex=text.indexOf(close,index),delimiters=trim(text.substring(text.indexOf("=",index)+1,closeIndex)).split(" ");otag=delimiters[0];ctag=delimiters[delimiters.length-1];return closeIndex+close.length-1}if(delimiters){delimiters=delimiters.split(" ");otag=delimiters[0];ctag=delimiters[1]}for(i=0;i<len;i++){if(state==IN_TEXT){if(tagChange(otag,text,i)){--i;addBuf();state=IN_TAG_TYPE}else{if(text.charAt(i)=="\n"){filterLine(seenTag)}else{buf+=text.charAt(i)}}}else if(state==IN_TAG_TYPE){i+=otag.length-1;tag=Hogan.tags[text.charAt(i+1)];tagType=tag?text.charAt(i+1):"_v";if(tagType=="="){i=changeDelimiters(text,i);state=IN_TEXT}else{if(tag){i++}state=IN_TAG}seenTag=i}else{if(tagChange(ctag,text,i)){tokens.push({tag:tagType,n:trim(buf),otag:otag,ctag:ctag,i:tagType=="/"?seenTag-otag.length:i+ctag.length});buf="";i+=ctag.length-1;state=IN_TEXT;if(tagType=="{"){if(ctag=="}}"){i++}else{cleanTripleStache(tokens[tokens.length-1])}}}else{buf+=text.charAt(i)}}}filterLine(seenTag,true);return tokens};function cleanTripleStache(token){if(token.n.substr(token.n.length-1)==="}"){token.n=token.n.substring(0,token.n.length-1)}}function trim(s){if(s.trim){return s.trim()}return s.replace(/^\s*|\s*$/g,"")}function tagChange(tag,text,index){if(text.charAt(index)!=tag.charAt(0)){return false}for(var i=1,l=tag.length;i<l;i++){if(text.charAt(index+i)!=tag.charAt(i)){return false}}return true}var allowedInSuper={_t:true,"\n":true,$:true,"/":true};function buildTree(tokens,kind,stack,customTags){var instructions=[],opener=null,tail=null,token=null;tail=stack[stack.length-1];while(tokens.length>0){token=tokens.shift();if(tail&&tail.tag=="<"&&!(token.tag in allowedInSuper)){throw new Error("Illegal content in < super tag.")}if(Hogan.tags[token.tag]<=Hogan.tags["$"]||isOpener(token,customTags)){stack.push(token);token.nodes=buildTree(tokens,token.tag,stack,customTags)}else if(token.tag=="/"){if(stack.length===0){throw new Error("Closing tag without opener: /"+token.n)}opener=stack.pop();if(token.n!=opener.n&&!isCloser(token.n,opener.n,customTags)){throw new Error("Nesting error: "+opener.n+" vs. "+token.n)}opener.end=token.i;return instructions}else if(token.tag=="\n"){token.last=tokens.length==0||tokens[0].tag=="\n"}instructions.push(token)}if(stack.length>0){throw new Error("missing closing tag: "+stack.pop().n)}return instructions}function isOpener(token,tags){for(var i=0,l=tags.length;i<l;i++){if(tags[i].o==token.n){token.tag="#";return true}}}function isCloser(close,open,tags){for(var i=0,l=tags.length;i<l;i++){if(tags[i].c==close&&tags[i].o==open){return true}}}function stringifySubstitutions(obj){var items=[];for(var key in obj){items.push('"'+esc(key)+'": function(c,p,t,i) {'+obj[key]+"}")}return"{ "+items.join(",")+" }"}function stringifyPartials(codeObj){var partials=[];for(var key in codeObj.partials){partials.push('"'+esc(key)+'":{name:"'+esc(codeObj.partials[key].name)+'", '+stringifyPartials(codeObj.partials[key])+"}")}return"partials: {"+partials.join(",")+"}, subs: "+stringifySubstitutions(codeObj.subs)}Hogan.stringify=function(codeObj,text,options){return"{code: function (c,p,i) { "+Hogan.wrapMain(codeObj.code)+" },"+stringifyPartials(codeObj)+"}"};var serialNo=0;Hogan.generate=function(tree,text,options){serialNo=0;var context={code:"",subs:{},partials:{}};Hogan.walk(tree,context);if(options.asString){return this.stringify(context,text,options)}return this.makeTemplate(context,text,options)};Hogan.wrapMain=function(code){return'var t=this;t.b(i=i||"");'+code+"return t.fl();"};Hogan.template=Hogan.Template;Hogan.makeTemplate=function(codeObj,text,options){var template=this.makePartials(codeObj);template.code=new Function("c","p","i",this.wrapMain(codeObj.code));return new this.template(template,text,this,options)};Hogan.makePartials=function(codeObj){var key,template={subs:{},partials:codeObj.partials,name:codeObj.name};for(key in template.partials){template.partials[key]=this.makePartials(template.partials[key])}for(key in codeObj.subs){template.subs[key]=new Function("c","p","t","i",codeObj.subs[key])}return template};function esc(s){return s.replace(rSlash,"\\\\").replace(rQuot,'\\"').replace(rNewline,"\\n").replace(rCr,"\\r").replace(rLineSep,"\\u2028").replace(rParagraphSep,"\\u2029")}function chooseMethod(s){return~s.indexOf(".")?"d":"f"}function createPartial(node,context){var prefix="<"+(context.prefix||"");var sym=prefix+node.n+serialNo++;context.partials[sym]={name:node.n,partials:{}};context.code+='t.b(t.rp("'+esc(sym)+'",c,p,"'+(node.indent||"")+'"));';return sym}Hogan.codegen={"#":function(node,context){context.code+="if(t.s(t."+chooseMethod(node.n)+'("'+esc(node.n)+'",c,p,1),'+"c,p,0,"+node.i+","+node.end+',"'+node.otag+" "+node.ctag+'")){'+"t.rs(c,p,"+"function(c,p,t){";Hogan.walk(node.nodes,context);context.code+="});c.pop();}"},"^":function(node,context){context.code+="if(!t.s(t."+chooseMethod(node.n)+'("'+esc(node.n)+'",c,p,1),c,p,1,0,0,"")){';Hogan.walk(node.nodes,context);context.code+="};"},">":createPartial,"<":function(node,context){var ctx={partials:{},code:"",subs:{},inPartial:true};Hogan.walk(node.nodes,ctx);var template=context.partials[createPartial(node,context)];template.subs=ctx.subs;template.partials=ctx.partials},$:function(node,context){var ctx={subs:{},code:"",partials:context.partials,prefix:node.n};Hogan.walk(node.nodes,ctx);context.subs[node.n]=ctx.code;if(!context.inPartial){context.code+='t.sub("'+esc(node.n)+'",c,p,i);'}},"\n":function(node,context){context.code+=write('"\\n"'+(node.last?"":" + i"))},_v:function(node,context){context.code+="t.b(t.v(t."+chooseMethod(node.n)+'("'+esc(node.n)+'",c,p,0)));'},_t:function(node,context){context.code+=write('"'+esc(node.text)+'"')},"{":tripleStache,"&":tripleStache};function tripleStache(node,context){context.code+="t.b(t.t(t."+chooseMethod(node.n)+'("'+esc(node.n)+'",c,p,0)));'}function write(s){return"t.b("+s+");"}Hogan.walk=function(nodelist,context){var func;for(var i=0,l=nodelist.length;i<l;i++){func=Hogan.codegen[nodelist[i].tag];func&&func(nodelist[i],context)}return context};Hogan.parse=function(tokens,text,options){options=options||{};return buildTree(tokens,"",[],options.sectionTags||[])};Hogan.cache={};Hogan.cacheKey=function(text,options){return[text,!!options.asString,!!options.disableLambda,options.delimiters,!!options.modelGet].join("||")};Hogan.compile=function(text,options){options=options||{};var key=Hogan.cacheKey(text,options);var template=this.cache[key];if(template){var partials=template.partials;for(var name in partials){delete partials[name].instance}return template}template=this.generate(this.parse(this.scan(text,options.delimiters),text,options),text,options);return this.cache[key]=template}})(true?exports:Hogan)},function(module,exports,__webpack_require__){var Hogan={};(function(Hogan){Hogan.Template=function(codeObj,text,compiler,options){codeObj=codeObj||{};this.r=codeObj.code||this.r;this.c=compiler;this.options=options||{};this.text=text||"";this.partials=codeObj.partials||{};this.subs=codeObj.subs||{};this.buf=""};Hogan.Template.prototype={r:function(context,partials,indent){return""},v:hoganEscape,t:coerceToString,render:function render(context,partials,indent){return this.ri([context],partials||{},indent)},ri:function(context,partials,indent){return this.r(context,partials,indent)},ep:function(symbol,partials){var partial=this.partials[symbol];var template=partials[partial.name];if(partial.instance&&partial.base==template){return partial.instance}if(typeof template=="string"){if(!this.c){throw new Error("No compiler available.")}template=this.c.compile(template,this.options)}if(!template){return null}this.partials[symbol].base=template;if(partial.subs){if(!partials.stackText)partials.stackText={};for(key in partial.subs){if(!partials.stackText[key]){partials.stackText[key]=this.activeSub!==undefined&&partials.stackText[this.activeSub]?partials.stackText[this.activeSub]:this.text}}template=createSpecializedPartial(template,partial.subs,partial.partials,this.stackSubs,this.stackPartials,partials.stackText)}this.partials[symbol].instance=template;return template},rp:function(symbol,context,partials,indent){var partial=this.ep(symbol,partials);if(!partial){return""}return partial.ri(context,partials,indent)},rs:function(context,partials,section){var tail=context[context.length-1];if(!isArray(tail)){section(context,partials,this);return}for(var i=0;i<tail.length;i++){context.push(tail[i]);section(context,partials,this);context.pop()}},s:function(val,ctx,partials,inverted,start,end,tags){var pass;if(isArray(val)&&val.length===0){return false}if(typeof val=="function"){val=this.ms(val,ctx,partials,inverted,start,end,tags)}pass=!!val;if(!inverted&&pass&&ctx){ctx.push(typeof val=="object"?val:ctx[ctx.length-1])}return pass},d:function(key,ctx,partials,returnFound){var found,names=key.split("."),val=this.f(names[0],ctx,partials,returnFound),doModelGet=this.options.modelGet,cx=null;if(key==="."&&isArray(ctx[ctx.length-2])){val=ctx[ctx.length-1]}else{for(var i=1;i<names.length;i++){found=findInScope(names[i],val,doModelGet);if(found!==undefined){cx=val;val=found}else{val=""}}}if(returnFound&&!val){return false}if(!returnFound&&typeof val=="function"){ctx.push(cx);val=this.mv(val,ctx,partials);ctx.pop()}return val},f:function(key,ctx,partials,returnFound){var val=false,v=null,found=false,doModelGet=this.options.modelGet;for(var i=ctx.length-1;i>=0;i--){v=ctx[i];val=findInScope(key,v,doModelGet);if(val!==undefined){found=true;break}}if(!found){return returnFound?false:""}if(!returnFound&&typeof val=="function"){val=this.mv(val,ctx,partials)}return val},ls:function(func,cx,partials,text,tags){var oldTags=this.options.delimiters;this.options.delimiters=tags;this.b(this.ct(coerceToString(func.call(cx,text)),cx,partials));this.options.delimiters=oldTags;return false},ct:function(text,cx,partials){if(this.options.disableLambda){throw new Error("Lambda features disabled.")}return this.c.compile(text,this.options).render(cx,partials)},b:function(s){this.buf+=s},fl:function(){var r=this.buf;this.buf="";return r},ms:function(func,ctx,partials,inverted,start,end,tags){var textSource,cx=ctx[ctx.length-1],result=func.call(cx);if(typeof result=="function"){if(inverted){return true}else{textSource=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text;return this.ls(result,cx,partials,textSource.substring(start,end),tags)}}return result},mv:function(func,ctx,partials){var cx=ctx[ctx.length-1];var result=func.call(cx);if(typeof result=="function"){return this.ct(coerceToString(result.call(cx)),cx,partials)}return result},sub:function(name,context,partials,indent){var f=this.subs[name];if(f){this.activeSub=name;f(context,partials,this,indent);this.activeSub=false}}};function findInScope(key,scope,doModelGet){var val;if(scope&&typeof scope=="object"){if(scope[key]!==undefined){val=scope[key]}else if(doModelGet&&scope.get&&typeof scope.get=="function"){val=scope.get(key)}}return val}function createSpecializedPartial(instance,subs,partials,stackSubs,stackPartials,stackText){function PartialTemplate(){}PartialTemplate.prototype=instance;function Substitutions(){}Substitutions.prototype=instance.subs;var key;var partial=new PartialTemplate;partial.subs=new Substitutions;partial.subsText={};partial.buf="";stackSubs=stackSubs||{};partial.stackSubs=stackSubs;partial.subsText=stackText;for(key in subs){if(!stackSubs[key])stackSubs[key]=subs[key]}for(key in stackSubs){partial.subs[key]=stackSubs[key]}stackPartials=stackPartials||{};partial.stackPartials=stackPartials;for(key in partials){if(!stackPartials[key])stackPartials[key]=partials[key]}for(key in stackPartials){partial.partials[key]=stackPartials[key]}return partial}var rAmp=/&/g,rLt=/</g,rGt=/>/g,rApos=/\'/g,rQuot=/\"/g,hChars=/[&<>\"\']/;function coerceToString(val){return String(val===null||val===undefined?"":val)}function hoganEscape(str){str=coerceToString(str);return hChars.test(str)?str.replace(rAmp,"&amp;").replace(rLt,"&lt;").replace(rGt,"&gt;").replace(rApos,"&#39;").replace(rQuot,"&quot;"):str}var isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"}})(true?exports:Hogan)},function(module,exports,__webpack_require__){"use strict";var AlgoliaSearchCore=__webpack_require__(29);var createAlgoliasearch=__webpack_require__(41);module.exports=createAlgoliasearch(AlgoliaSearchCore,"(lite) ")},function(module,exports,__webpack_require__){module.exports=AlgoliaSearchCore;var errors=__webpack_require__(5);var exitPromise=__webpack_require__(30);var IndexCore=__webpack_require__(31);var store=__webpack_require__(38);var MAX_API_KEY_LENGTH=500;var RESET_APP_DATA_TIMER=Object({NODE_ENV:"production"}).RESET_APP_DATA_TIMER&&parseInt(Object({NODE_ENV:"production"}).RESET_APP_DATA_TIMER,10)||60*2*1e3;function AlgoliaSearchCore(applicationID,apiKey,opts){var debug=__webpack_require__(6)("algoliasearch");var clone=__webpack_require__(4);var isArray=__webpack_require__(7);var map=__webpack_require__(8);var usage="Usage: algoliasearch(applicationID, apiKey, opts)";if(opts._allowEmptyCredentials!==true&&!applicationID){throw new errors.AlgoliaSearchError("Please provide an application ID. "+usage)}if(opts._allowEmptyCredentials!==true&&!apiKey){throw new errors.AlgoliaSearchError("Please provide an API key. "+usage)}this.applicationID=applicationID;this.apiKey=apiKey;this.hosts={read:[],write:[]};opts=opts||{};var protocol=opts.protocol||"https:";this._timeouts=opts.timeouts||{connect:1*1e3,read:2*1e3,write:30*1e3};if(opts.timeout){this._timeouts.connect=this._timeouts.read=this._timeouts.write=opts.timeout}if(!/:$/.test(protocol)){protocol=protocol+":"}if(opts.protocol!=="http:"&&opts.protocol!=="https:"){throw new errors.AlgoliaSearchError("protocol must be `http:` or `https:` (was `"+opts.protocol+"`)")}this._checkAppIdData();if(!opts.hosts){var defaultHosts=map(this._shuffleResult,function(hostNumber){return applicationID+"-"+hostNumber+".algolianet.com"});this.hosts.read=[this.applicationID+"-dsn.algolia.net"].concat(defaultHosts);this.hosts.write=[this.applicationID+".algolia.net"].concat(defaultHosts)}else if(isArray(opts.hosts)){this.hosts.read=clone(opts.hosts);this.hosts.write=clone(opts.hosts)}else{this.hosts.read=clone(opts.hosts.read);this.hosts.write=clone(opts.hosts.write)}this.hosts.read=map(this.hosts.read,prepareHost(protocol));this.hosts.write=map(this.hosts.write,prepareHost(protocol));this.extraHeaders={};this.cache=opts._cache||{};this._ua=opts._ua;this._useCache=opts._useCache===undefined||opts._cache?true:opts._useCache;this._useFallback=opts.useFallback===undefined?true:opts.useFallback;this._setTimeout=opts._setTimeout;debug("init done, %j",this)}AlgoliaSearchCore.prototype.initIndex=function(indexName){return new IndexCore(this,indexName)};AlgoliaSearchCore.prototype.setExtraHeader=function(name,value){this.extraHeaders[name.toLowerCase()]=value};AlgoliaSearchCore.prototype.getExtraHeader=function(name){return this.extraHeaders[name.toLowerCase()]};AlgoliaSearchCore.prototype.unsetExtraHeader=function(name){delete this.extraHeaders[name.toLowerCase()]};AlgoliaSearchCore.prototype.addAlgoliaAgent=function(algoliaAgent){if(this._ua.indexOf(";"+algoliaAgent)===-1){this._ua+=";"+algoliaAgent}};AlgoliaSearchCore.prototype._jsonRequest=function(initialOpts){this._checkAppIdData();var requestDebug=__webpack_require__(6)("algoliasearch:"+initialOpts.url);var body;var additionalUA=initialOpts.additionalUA||"";var cache=initialOpts.cache;var client=this;var tries=0;var usingFallback=false;var hasFallback=client._useFallback&&client._request.fallback&&initialOpts.fallback;var headers;if(this.apiKey.length>MAX_API_KEY_LENGTH&&initialOpts.body!==undefined&&(initialOpts.body.params!==undefined||initialOpts.body.requests!==undefined)){initialOpts.body.apiKey=this.apiKey;headers=this._computeRequestHeaders(additionalUA,false)}else{headers=this._computeRequestHeaders(additionalUA)}if(initialOpts.body!==undefined){body=safeJSONStringify(initialOpts.body)}requestDebug("request start");var debugData=[];function doRequest(requester,reqOpts){client._checkAppIdData();var startTime=new Date;var cacheID;if(client._useCache){cacheID=initialOpts.url}if(client._useCache&&body){cacheID+="_body_"+reqOpts.body}if(client._useCache&&cache&&cache[cacheID]!==undefined){requestDebug("serving response from cache");return client._promise.resolve(JSON.parse(cache[cacheID]))}if(tries>=client.hosts[initialOpts.hostType].length){if(!hasFallback||usingFallback){requestDebug("could not get any response");return client._promise.reject(new errors.AlgoliaSearchError("Cannot connect to the AlgoliaSearch API."+" Send an email to support@algolia.com to report and resolve the issue."+" Application id was: "+client.applicationID,{debugData:debugData}))}requestDebug("switching to fallback");tries=0;reqOpts.method=initialOpts.fallback.method;reqOpts.url=initialOpts.fallback.url;reqOpts.jsonBody=initialOpts.fallback.body;if(reqOpts.jsonBody){reqOpts.body=safeJSONStringify(reqOpts.jsonBody)}headers=client._computeRequestHeaders(additionalUA);reqOpts.timeouts=client._getTimeoutsForRequest(initialOpts.hostType);client._setHostIndexByType(0,initialOpts.hostType);usingFallback=true;return doRequest(client._request.fallback,reqOpts)}var currentHost=client._getHostByType(initialOpts.hostType);var url=currentHost+reqOpts.url;var options={body:reqOpts.body,jsonBody:reqOpts.jsonBody,method:reqOpts.method,headers:headers,timeouts:reqOpts.timeouts,debug:requestDebug};requestDebug("method: %s, url: %s, headers: %j, timeouts: %d",options.method,url,options.headers,options.timeouts);if(requester===client._request.fallback){requestDebug("using fallback")}return requester.call(client,url,options).then(success,tryFallback);function success(httpResponse){var status=httpResponse&&httpResponse.body&&httpResponse.body.message&&httpResponse.body.status||httpResponse.statusCode||httpResponse&&httpResponse.body&&200;requestDebug("received response: statusCode: %s, computed statusCode: %d, headers: %j",httpResponse.statusCode,status,httpResponse.headers);var httpResponseOk=Math.floor(status/100)===2;var endTime=new Date;debugData.push({currentHost:currentHost,headers:removeCredentials(headers),content:body||null,contentLength:body!==undefined?body.length:null,method:reqOpts.method,timeouts:reqOpts.timeouts,url:reqOpts.url,startTime:startTime,endTime:endTime,duration:endTime-startTime,statusCode:status});if(httpResponseOk){if(client._useCache&&cache){cache[cacheID]=httpResponse.responseText}return httpResponse.body}var shouldRetry=Math.floor(status/100)!==4;if(shouldRetry){tries+=1;return retryRequest()}requestDebug("unrecoverable error");var unrecoverableError=new errors.AlgoliaSearchError(httpResponse.body&&httpResponse.body.message,{debugData:debugData,statusCode:status});return client._promise.reject(unrecoverableError)}function tryFallback(err){requestDebug("error: %s, stack: %s",err.message,err.stack);var endTime=new Date;debugData.push({currentHost:currentHost,headers:removeCredentials(headers),content:body||null,contentLength:body!==undefined?body.length:null,method:reqOpts.method,timeouts:reqOpts.timeouts,url:reqOpts.url,startTime:startTime,endTime:endTime,duration:endTime-startTime});if(!(err instanceof errors.AlgoliaSearchError)){err=new errors.Unknown(err&&err.message,err)}tries+=1;if(err instanceof errors.Unknown||err instanceof errors.UnparsableJSON||tries>=client.hosts[initialOpts.hostType].length&&(usingFallback||!hasFallback)){err.debugData=debugData;return client._promise.reject(err)}if(err instanceof errors.RequestTimeout){return retryRequestWithHigherTimeout()}return retryRequest()}function retryRequest(){requestDebug("retrying request");client._incrementHostIndex(initialOpts.hostType);return doRequest(requester,reqOpts)}function retryRequestWithHigherTimeout(){requestDebug("retrying request with higher timeout");client._incrementHostIndex(initialOpts.hostType);client._incrementTimeoutMultipler();reqOpts.timeouts=client._getTimeoutsForRequest(initialOpts.hostType);return doRequest(requester,reqOpts)}}var promise=doRequest(client._request,{url:initialOpts.url,method:initialOpts.method,body:body,jsonBody:initialOpts.body,timeouts:client._getTimeoutsForRequest(initialOpts.hostType)});if(typeof initialOpts.callback==="function"){promise.then(function okCb(content){exitPromise(function(){initialOpts.callback(null,content)},client._setTimeout||setTimeout)},function nookCb(err){exitPromise(function(){initialOpts.callback(err)},client._setTimeout||setTimeout)})}else{return promise}};AlgoliaSearchCore.prototype._getSearchParams=function(args,params){if(args===undefined||args===null){return params}for(var key in args){if(key!==null&&args[key]!==undefined&&args.hasOwnProperty(key)){params+=params===""?"":"&";params+=key+"="+encodeURIComponent(Object.prototype.toString.call(args[key])==="[object Array]"?safeJSONStringify(args[key]):args[key])}}return params};AlgoliaSearchCore.prototype._computeRequestHeaders=function(additionalUA,withAPIKey){var forEach=__webpack_require__(2);var ua=additionalUA?this._ua+";"+additionalUA:this._ua;var requestHeaders={"x-algolia-agent":ua,"x-algolia-application-id":this.applicationID};if(withAPIKey!==false){requestHeaders["x-algolia-api-key"]=this.apiKey}if(this.userToken){requestHeaders["x-algolia-usertoken"]=this.userToken}if(this.securityTags){requestHeaders["x-algolia-tagfilters"]=this.securityTags}forEach(this.extraHeaders,function addToRequestHeaders(value,key){requestHeaders[key]=value});return requestHeaders};AlgoliaSearchCore.prototype.search=function(queries,opts,callback){var isArray=__webpack_require__(7);var map=__webpack_require__(8);var usage="Usage: client.search(arrayOfQueries[, callback])";if(!isArray(queries)){throw new Error(usage)}if(typeof opts==="function"){callback=opts;opts={}}else if(opts===undefined){opts={}}var client=this;var postObj={requests:map(queries,function prepareRequest(query){var params="";if(query.query!==undefined){params+="query="+encodeURIComponent(query.query)}return{indexName:query.indexName,params:client._getSearchParams(query.params,params)}})};var JSONPParams=map(postObj.requests,function prepareJSONPParams(request,requestId){return requestId+"="+encodeURIComponent("/1/indexes/"+encodeURIComponent(request.indexName)+"?"+request.params)}).join("&");var url="/1/indexes/*/queries";if(opts.strategy!==undefined){url+="?strategy="+opts.strategy}return this._jsonRequest({cache:this.cache,method:"POST",url:url,body:postObj,hostType:"read",fallback:{method:"GET",url:"/1/indexes/*",body:{params:JSONPParams}},callback:callback})};AlgoliaSearchCore.prototype.setSecurityTags=function(tags){if(Object.prototype.toString.call(tags)==="[object Array]"){var strTags=[];for(var i=0;i<tags.length;++i){if(Object.prototype.toString.call(tags[i])==="[object Array]"){var oredTags=[];for(var j=0;j<tags[i].length;++j){oredTags.push(tags[i][j])}strTags.push("("+oredTags.join(",")+")")}else{strTags.push(tags[i])}}tags=strTags.join(",")}this.securityTags=tags};AlgoliaSearchCore.prototype.setUserToken=function(userToken){this.userToken=userToken};AlgoliaSearchCore.prototype.clearCache=function(){this.cache={}};AlgoliaSearchCore.prototype.setRequestTimeout=function(milliseconds){if(milliseconds){this._timeouts.connect=this._timeouts.read=this._timeouts.write=milliseconds}};AlgoliaSearchCore.prototype.setTimeouts=function(timeouts){this._timeouts=timeouts};AlgoliaSearchCore.prototype.getTimeouts=function(){return this._timeouts};AlgoliaSearchCore.prototype._getAppIdData=function(){var data=store.get(this.applicationID);if(data!==null)this._cacheAppIdData(data);return data};AlgoliaSearchCore.prototype._setAppIdData=function(data){data.lastChange=(new Date).getTime();this._cacheAppIdData(data);return store.set(this.applicationID,data)};AlgoliaSearchCore.prototype._checkAppIdData=function(){var data=this._getAppIdData();var now=(new Date).getTime();if(data===null||now-data.lastChange>RESET_APP_DATA_TIMER){return this._resetInitialAppIdData(data)}return data};AlgoliaSearchCore.prototype._resetInitialAppIdData=function(data){var newData=data||{};newData.hostIndexes={read:0,write:0};newData.timeoutMultiplier=1;newData.shuffleResult=newData.shuffleResult||shuffle([1,2,3]);return this._setAppIdData(newData)};AlgoliaSearchCore.prototype._cacheAppIdData=function(data){this._hostIndexes=data.hostIndexes;this._timeoutMultiplier=data.timeoutMultiplier;this._shuffleResult=data.shuffleResult};AlgoliaSearchCore.prototype._partialAppIdDataUpdate=function(newData){var foreach=__webpack_require__(2);var currentData=this._getAppIdData();foreach(newData,function(value,key){currentData[key]=value});return this._setAppIdData(currentData)};AlgoliaSearchCore.prototype._getHostByType=function(hostType){return this.hosts[hostType][this._getHostIndexByType(hostType)]};AlgoliaSearchCore.prototype._getTimeoutMultiplier=function(){return this._timeoutMultiplier};AlgoliaSearchCore.prototype._getHostIndexByType=function(hostType){return this._hostIndexes[hostType]};AlgoliaSearchCore.prototype._setHostIndexByType=function(hostIndex,hostType){var clone=__webpack_require__(4);var newHostIndexes=clone(this._hostIndexes);newHostIndexes[hostType]=hostIndex;this._partialAppIdDataUpdate({hostIndexes:newHostIndexes});return hostIndex};AlgoliaSearchCore.prototype._incrementHostIndex=function(hostType){return this._setHostIndexByType((this._getHostIndexByType(hostType)+1)%this.hosts[hostType].length,hostType)};AlgoliaSearchCore.prototype._incrementTimeoutMultipler=function(){var timeoutMultiplier=Math.max(this._timeoutMultiplier+1,4);return this._partialAppIdDataUpdate({timeoutMultiplier:timeoutMultiplier})};AlgoliaSearchCore.prototype._getTimeoutsForRequest=function(hostType){return{connect:this._timeouts.connect*this._timeoutMultiplier,complete:this._timeouts[hostType]*this._timeoutMultiplier}};function prepareHost(protocol){return function prepare(host){return protocol+"//"+host.toLowerCase()}}function safeJSONStringify(obj){if(Array.prototype.toJSON===undefined){return JSON.stringify(obj)}var toJSON=Array.prototype.toJSON;delete Array.prototype.toJSON;var out=JSON.stringify(obj);Array.prototype.toJSON=toJSON;return out}function shuffle(array){var currentIndex=array.length;var temporaryValue;var randomIndex;while(currentIndex!==0){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue}return array}function removeCredentials(headers){var newHeaders={};for(var headerName in headers){if(Object.prototype.hasOwnProperty.call(headers,headerName)){var value;if(headerName==="x-algolia-api-key"||headerName==="x-algolia-application-id"){value="**hidden for security purposes**"}else{value=headers[headerName]}newHeaders[headerName]=value}}return newHeaders}},function(module,exports){module.exports=function exitPromise(fn,_setTimeout){_setTimeout(fn,0)}},function(module,exports,__webpack_require__){var buildSearchMethod=__webpack_require__(13);var deprecate=__webpack_require__(32);var deprecatedMessage=__webpack_require__(33);module.exports=IndexCore;function IndexCore(algoliasearch,indexName){this.indexName=indexName;this.as=algoliasearch;this.typeAheadArgs=null;this.typeAheadValueOption=null;this.cache={}}IndexCore.prototype.clearCache=function(){this.cache={}};IndexCore.prototype.search=buildSearchMethod("query");IndexCore.prototype.similarSearch=buildSearchMethod("similarQuery");IndexCore.prototype.browse=function(query,queryParameters,callback){var merge=__webpack_require__(34);var indexObj=this;var page;var hitsPerPage;if(arguments.length===0||arguments.length===1&&typeof arguments[0]==="function"){page=0;callback=arguments[0];query=undefined}else if(typeof arguments[0]==="number"){page=arguments[0];if(typeof arguments[1]==="number"){hitsPerPage=arguments[1]}else if(typeof arguments[1]==="function"){callback=arguments[1];hitsPerPage=undefined}query=undefined;queryParameters=undefined}else if(typeof arguments[0]==="object"){if(typeof arguments[1]==="function"){callback=arguments[1]}queryParameters=arguments[0];query=undefined}else if(typeof arguments[0]==="string"&&typeof arguments[1]==="function"){callback=arguments[1];queryParameters=undefined}queryParameters=merge({},queryParameters||{},{page:page,hitsPerPage:hitsPerPage,query:query});var params=this.as._getSearchParams(queryParameters,"");return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(indexObj.indexName)+"/browse",body:{params:params},hostType:"read",callback:callback})};IndexCore.prototype.browseFrom=function(cursor,callback){return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/browse",body:{cursor:cursor},hostType:"read",callback:callback})};IndexCore.prototype.searchForFacetValues=function(params,callback){var clone=__webpack_require__(4);var omit=__webpack_require__(35);var usage="Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])";if(params.facetName===undefined||params.facetQuery===undefined){throw new Error(usage)}var facetName=params.facetName;var filteredParams=omit(clone(params),function(keyName){return keyName==="facetName"});var searchParameters=this.as._getSearchParams(filteredParams,"");return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/facets/"+encodeURIComponent(facetName)+"/query",hostType:"read",body:{params:searchParameters},callback:callback})};IndexCore.prototype.searchFacet=deprecate(function(params,callback){return this.searchForFacetValues(params,callback)},deprecatedMessage("index.searchFacet(params[, callback])","index.searchForFacetValues(params[, callback])"));IndexCore.prototype._search=function(params,url,callback,additionalUA){return this.as._jsonRequest({cache:this.cache,method:"POST",url:url||"/1/indexes/"+encodeURIComponent(this.indexName)+"/query",body:{params:params},hostType:"read",fallback:{method:"GET",url:"/1/indexes/"+encodeURIComponent(this.indexName),body:{params:params}},callback:callback,additionalUA:additionalUA})};IndexCore.prototype.getObject=function(objectID,attrs,callback){var indexObj=this;if(arguments.length===1||typeof attrs==="function"){callback=attrs;attrs=undefined}var params="";if(attrs!==undefined){params="?attributes=";for(var i=0;i<attrs.length;++i){if(i!==0){params+=","}params+=attrs[i]}}return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(indexObj.indexName)+"/"+encodeURIComponent(objectID)+params,hostType:"read",callback:callback})};IndexCore.prototype.getObjects=function(objectIDs,attributesToRetrieve,callback){var isArray=__webpack_require__(7);var map=__webpack_require__(8);var usage="Usage: index.getObjects(arrayOfObjectIDs[, callback])";if(!isArray(objectIDs)){throw new Error(usage)}var indexObj=this;if(arguments.length===1||typeof attributesToRetrieve==="function"){callback=attributesToRetrieve;attributesToRetrieve=undefined}var body={requests:map(objectIDs,function prepareRequest(objectID){var request={indexName:indexObj.indexName,objectID:objectID};if(attributesToRetrieve){request.attributesToRetrieve=attributesToRetrieve.join(",")}return request})};return this.as._jsonRequest({method:"POST",url:"/1/indexes/*/objects",hostType:"read",body:body,callback:callback})};IndexCore.prototype.as=null;IndexCore.prototype.indexName=null;IndexCore.prototype.typeAheadArgs=null;IndexCore.prototype.typeAheadValueOption=null},function(module,exports){module.exports=function deprecate(fn,message){var warned=false;function deprecated(){if(!warned){console.warn(message);warned=true}return fn.apply(this,arguments)}return deprecated}},function(module,exports){module.exports=function deprecatedMessage(previousUsage,newUsage){var githubAnchorLink=previousUsage.toLowerCase().replace(/[\.\(\)]/g,"");return"algoliasearch: `"+previousUsage+"` was replaced by `"+newUsage+"`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#"+githubAnchorLink}},function(module,exports,__webpack_require__){var foreach=__webpack_require__(2);module.exports=function merge(destination){var sources=Array.prototype.slice.call(arguments);foreach(sources,function(source){for(var keyName in source){if(source.hasOwnProperty(keyName)){if(typeof destination[keyName]==="object"&&typeof source[keyName]==="object"){destination[keyName]=merge({},destination[keyName],source[keyName])}else if(source[keyName]!==undefined){destination[keyName]=source[keyName]}}}});return destination}},function(module,exports,__webpack_require__){module.exports=function omit(obj,test){var keys=__webpack_require__(36);var foreach=__webpack_require__(2);var filtered={};foreach(keys(obj),function doFilter(keyName){if(test(keyName)!==true){filtered[keyName]=obj[keyName]}});return filtered}},function(module,exports,__webpack_require__){"use strict";var has=Object.prototype.hasOwnProperty;var toStr=Object.prototype.toString;var slice=Array.prototype.slice;var isArgs=__webpack_require__(37);var isEnumerable=Object.prototype.propertyIsEnumerable;var hasDontEnumBug=!isEnumerable.call({toString:null},"toString");var hasProtoEnumBug=isEnumerable.call(function(){},"prototype");var dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];var equalsConstructorPrototype=function(o){var ctor=o.constructor;return ctor&&ctor.prototype===o};var excludedKeys={$console:true,$external:true,$frame:true,$frameElement:true,$frames:true,$innerHeight:true,$innerWidth:true,$outerHeight:true,$outerWidth:true,$pageXOffset:true,$pageYOffset:true,$parent:true,$scrollLeft:true,$scrollTop:true,$scrollX:true,$scrollY:true,$self:true,$webkitIndexedDB:true,$webkitStorageInfo:true,$window:true};var hasAutomationEqualityBug=function(){if(typeof window==="undefined"){return false}for(var k in window){try{if(!excludedKeys["$"+k]&&has.call(window,k)&&window[k]!==null&&typeof window[k]==="object"){try{equalsConstructorPrototype(window[k])}catch(e){return true}}}catch(e){return true}}return false}();var equalsConstructorPrototypeIfNotBuggy=function(o){if(typeof window==="undefined"||!hasAutomationEqualityBug){return equalsConstructorPrototype(o)}try{return equalsConstructorPrototype(o)}catch(e){return false}};var keysShim=function keys(object){var isObject=object!==null&&typeof object==="object";var isFunction=toStr.call(object)==="[object Function]";var isArguments=isArgs(object);var isString=isObject&&toStr.call(object)==="[object String]";var theKeys=[];if(!isObject&&!isFunction&&!isArguments){throw new TypeError("Object.keys called on a non-object")}var skipProto=hasProtoEnumBug&&isFunction;if(isString&&object.length>0&&!has.call(object,0)){for(var i=0;i<object.length;++i){theKeys.push(String(i))}}if(isArguments&&object.length>0){for(var j=0;j<object.length;++j){theKeys.push(String(j))}}else{for(var name in object){if(!(skipProto&&name==="prototype")&&has.call(object,name)){theKeys.push(String(name))}}}if(hasDontEnumBug){var skipConstructor=equalsConstructorPrototypeIfNotBuggy(object);for(var k=0;k<dontEnums.length;++k){if(!(skipConstructor&&dontEnums[k]==="constructor")&&has.call(object,dontEnums[k])){theKeys.push(dontEnums[k])}}}return theKeys};keysShim.shim=function shimObjectKeys(){if(Object.keys){var keysWorksWithArguments=function(){return(Object.keys(arguments)||"").length===2}(1,2);if(!keysWorksWithArguments){var originalKeys=Object.keys;Object.keys=function keys(object){if(isArgs(object)){return originalKeys(slice.call(object))}else{return originalKeys(object)}}}}else{Object.keys=keysShim}return Object.keys||keysShim};module.exports=keysShim},function(module,exports,__webpack_require__){"use strict";var toStr=Object.prototype.toString;module.exports=function isArguments(value){var str=toStr.call(value);var isArgs=str==="[object Arguments]";if(!isArgs){isArgs=str!=="[object Array]"&&value!==null&&typeof value==="object"&&typeof value.length==="number"&&value.length>=0&&toStr.call(value.callee)==="[object Function]"}return isArgs}},function(module,exports,__webpack_require__){(function(global){var debug=__webpack_require__(6)("algoliasearch:src/hostIndexState.js");var localStorageNamespace="algoliasearch-client-js";var store;var moduleStore={state:{},set:function(key,data){this.state[key]=data;return this.state[key]},get:function(key){return this.state[key]||null}};var localStorageStore={set:function(key,data){moduleStore.set(key,data);try{var namespace=JSON.parse(global.localStorage[localStorageNamespace]);namespace[key]=data;global.localStorage[localStorageNamespace]=JSON.stringify(namespace);return namespace[key]}catch(e){return localStorageFailure(key,e)}},get:function(key){try{return JSON.parse(global.localStorage[localStorageNamespace])[key]||null}catch(e){return localStorageFailure(key,e)}}};function localStorageFailure(key,e){debug("localStorage failed with",e);cleanup();store=moduleStore;return store.get(key)}store=supportsLocalStorage()?localStorageStore:moduleStore;module.exports={get:getOrSet,set:getOrSet,supportsLocalStorage:supportsLocalStorage};function getOrSet(key,data){if(arguments.length===1){return store.get(key)}return store.set(key,data)}function supportsLocalStorage(){try{if("localStorage"in global&&global.localStorage!==null){if(!global.localStorage[localStorageNamespace]){global.localStorage.setItem(localStorageNamespace,JSON.stringify({}))}return true}return false}catch(_){return false}}function cleanup(){try{global.localStorage.removeItem(localStorageNamespace)}catch(_){}}}).call(exports,__webpack_require__(3))},function(module,exports,__webpack_require__){exports=module.exports=createDebug.debug=createDebug["default"]=createDebug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=__webpack_require__(40);exports.names=[];exports.skips=[];exports.formatters={};var prevTime;function selectColor(namespace){var hash=0,i;for(i in namespace){hash=(hash<<5)-hash+namespace.charCodeAt(i);hash|=0}return exports.colors[Math.abs(hash)%exports.colors.length]}function createDebug(namespace){function debug(){if(!debug.enabled)return;var self=debug;var curr=+new Date;var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i]}args[0]=exports.coerce(args[0]);if("string"!==typeof args[0]){args.unshift("%O")}var index=0;args[0]=args[0].replace(/%([a-zA-Z%])/g,function(match,format){if(match==="%%")return match;index++;var formatter=exports.formatters[format];if("function"===typeof formatter){var val=args[index];match=formatter.call(self,val);args.splice(index,1);index--}return match});exports.formatArgs.call(self,args);var logFn=debug.log||exports.log||console.log.bind(console);logFn.apply(self,args)}debug.namespace=namespace;debug.enabled=exports.enabled(namespace);debug.useColors=exports.useColors();debug.color=selectColor(namespace);if("function"===typeof exports.init){exports.init(debug)}return debug}function enable(namespaces){exports.save(namespaces);exports.names=[];exports.skips=[];var split=(typeof namespaces==="string"?namespaces:"").split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;namespaces=split[i].replace(/\*/g,".*?");if(namespaces[0]==="-"){exports.skips.push(new RegExp("^"+namespaces.substr(1)+"$"))}else{exports.names.push(new RegExp("^"+namespaces+"$"))}}}function disable(){exports.enable("")}function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true}}return false}function coerce(val){if(val instanceof Error)return val.stack||val.message;return val}},function(module,exports){var s=1e3;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;module.exports=function(val,options){options=options||{};var type=typeof val;if(type==="string"&&val.length>0){return parse(val)}else if(type==="number"&&isNaN(val)===false){return options.long?fmtLong(val):fmtShort(val)}throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(val))};function parse(str){str=String(str);if(str.length>100){return}var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match){return}var n=parseFloat(match[1]);var type=(match[2]||"ms").toLowerCase();switch(type){case"years":case"year":case"yrs":case"yr":case"y":return n*y;case"days":case"day":case"d":return n*d;case"hours":case"hour":case"hrs":case"hr":case"h":return n*h;case"minutes":case"minute":case"mins":case"min":case"m":return n*m;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return undefined}}function fmtShort(ms){if(ms>=d){return Math.round(ms/d)+"d"}if(ms>=h){return Math.round(ms/h)+"h"}if(ms>=m){return Math.round(ms/m)+"m"}if(ms>=s){return Math.round(ms/s)+"s"}return ms+"ms"}function fmtLong(ms){return plural(ms,d,"day")||plural(ms,h,"hour")||plural(ms,m,"minute")||plural(ms,s,"second")||ms+" ms"}function plural(ms,n,name){if(ms<n){return}if(ms<n*1.5){return Math.floor(ms/n)+" "+name}return Math.ceil(ms/n)+" "+name+"s"}},function(module,exports,__webpack_require__){"use strict";var global=__webpack_require__(42);var Promise=global.Promise||__webpack_require__(43).Promise;module.exports=function createAlgoliasearch(AlgoliaSearch,uaSuffix){var inherits=__webpack_require__(12);var errors=__webpack_require__(5);var inlineHeaders=__webpack_require__(45);var jsonpRequest=__webpack_require__(47);var places=__webpack_require__(48);uaSuffix=uaSuffix||"";if(false){require("debug").enable("algoliasearch*")}function algoliasearch(applicationID,apiKey,opts){var cloneDeep=__webpack_require__(4);var getDocumentProtocol=__webpack_require__(49);opts=cloneDeep(opts||{});if(opts.protocol===undefined){opts.protocol=getDocumentProtocol()}opts._ua=opts._ua||algoliasearch.ua;return new AlgoliaSearchBrowser(applicationID,apiKey,opts)}algoliasearch.version=__webpack_require__(50);algoliasearch.ua="Algolia for vanilla JavaScript "+uaSuffix+algoliasearch.version;algoliasearch.initPlaces=places(algoliasearch);global.__algolia={debug:__webpack_require__(6),algoliasearch:algoliasearch};var support={hasXMLHttpRequest:"XMLHttpRequest"in global,hasXDomainRequest:"XDomainRequest"in global};if(support.hasXMLHttpRequest){support.cors="withCredentials"in new XMLHttpRequest}function AlgoliaSearchBrowser(){AlgoliaSearch.apply(this,arguments)}inherits(AlgoliaSearchBrowser,AlgoliaSearch);AlgoliaSearchBrowser.prototype._request=function request(url,opts){return new Promise(function wrapRequest(resolve,reject){if(!support.cors&&!support.hasXDomainRequest){reject(new errors.Network("CORS not supported"));return}url=inlineHeaders(url,opts.headers);var body=opts.body;var req=support.cors?new XMLHttpRequest:new XDomainRequest;var reqTimeout;var timedOut;var connected=false;reqTimeout=setTimeout(onTimeout,opts.timeouts.connect);req.onprogress=onProgress;if("onreadystatechange"in req)req.onreadystatechange=onReadyStateChange;req.onload=onLoad;req.onerror=onError;if(req instanceof XMLHttpRequest){req.open(opts.method,url,true)}else{req.open(opts.method,url)}if(support.cors){if(body){if(opts.method==="POST"){req.setRequestHeader("content-type","application/x-www-form-urlencoded")}else{req.setRequestHeader("content-type","application/json")}}req.setRequestHeader("accept","application/json")}req.send(body);function onLoad(){if(timedOut){return}clearTimeout(reqTimeout);var out;try{out={body:JSON.parse(req.responseText),responseText:req.responseText,statusCode:req.status,headers:req.getAllResponseHeaders&&req.getAllResponseHeaders()||{}}}catch(e){out=new errors.UnparsableJSON({more:req.responseText})}if(out instanceof errors.UnparsableJSON){reject(out)}else{resolve(out)}}function onError(event){if(timedOut){return}clearTimeout(reqTimeout);reject(new errors.Network({more:event}))}function onTimeout(){timedOut=true;req.abort();reject(new errors.RequestTimeout)}function onConnect(){connected=true;clearTimeout(reqTimeout);reqTimeout=setTimeout(onTimeout,opts.timeouts.complete)}function onProgress(){if(!connected)onConnect()}function onReadyStateChange(){if(!connected&&req.readyState>1)onConnect()}})};AlgoliaSearchBrowser.prototype._request.fallback=function requestFallback(url,opts){url=inlineHeaders(url,opts.headers);return new Promise(function wrapJsonpRequest(resolve,reject){jsonpRequest(url,opts,function jsonpRequestDone(err,content){if(err){reject(err);return}resolve(content)})})};AlgoliaSearchBrowser.prototype._promise={reject:function rejectPromise(val){return Promise.reject(val)},resolve:function resolvePromise(val){return Promise.resolve(val)},delay:function delayPromise(ms){return new Promise(function resolveOnTimeout(resolve){setTimeout(resolve,ms)})}};return algoliasearch}},function(module,exports,__webpack_require__){(function(global){var win;if(typeof window!=="undefined"){win=window}else if(typeof global!=="undefined"){win=global}else if(typeof self!=="undefined"){win=self}else{win={}}module.exports=win}).call(exports,__webpack_require__(3))},function(module,exports,__webpack_require__){(function(process,global){var require;(function(global,factory){true?module.exports=factory():typeof define==="function"&&define.amd?define(factory):global.ES6Promise=factory()})(this,function(){"use strict";function objectOrFunction(x){var type=typeof x;return x!==null&&(type==="object"||type==="function")}function isFunction(x){return typeof x==="function"}var _isArray=undefined;if(Array.isArray){_isArray=Array.isArray}else{_isArray=function(x){return Object.prototype.toString.call(x)==="[object Array]"}}var isArray=_isArray;var len=0;var vertxNext=undefined;var customSchedulerFn=undefined;var asap=function asap(callback,arg){queue[len]=callback;queue[len+1]=arg;len+=2;if(len===2){if(customSchedulerFn){customSchedulerFn(flush)}else{scheduleFlush()}}};function setScheduler(scheduleFn){customSchedulerFn=scheduleFn}function setAsap(asapFn){asap=asapFn}var browserWindow=typeof window!=="undefined"?window:undefined;var browserGlobal=browserWindow||{};var BrowserMutationObserver=browserGlobal.MutationObserver||browserGlobal.WebKitMutationObserver;var isNode=typeof self==="undefined"&&typeof process!=="undefined"&&{}.toString.call(process)==="[object process]";var isWorker=typeof Uint8ClampedArray!=="undefined"&&typeof importScripts!=="undefined"&&typeof MessageChannel!=="undefined";function useNextTick(){return function(){return process.nextTick(flush)}}function useVertxTimer(){if(typeof vertxNext!=="undefined"){return function(){vertxNext(flush)}}return useSetTimeout()}function useMutationObserver(){var iterations=0;var observer=new BrowserMutationObserver(flush);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function(){node.data=iterations=++iterations%2}}function useMessageChannel(){var channel=new MessageChannel;channel.port1.onmessage=flush;return function(){return channel.port2.postMessage(0)}}function useSetTimeout(){var globalSetTimeout=setTimeout;return function(){return globalSetTimeout(flush,1)}}var queue=new Array(1e3);function flush(){for(var i=0;i<len;i+=2){var callback=queue[i];var arg=queue[i+1];callback(arg);queue[i]=undefined;queue[i+1]=undefined}len=0}function attemptVertx(){try{var r=require;var vertx=__webpack_require__(44);vertxNext=vertx.runOnLoop||vertx.runOnContext;return useVertxTimer()}catch(e){return useSetTimeout()}}var scheduleFlush=undefined;if(isNode){scheduleFlush=useNextTick()}else if(BrowserMutationObserver){scheduleFlush=useMutationObserver()}else if(isWorker){scheduleFlush=useMessageChannel()}else if(browserWindow===undefined&&"function"==="function"){scheduleFlush=attemptVertx()}else{scheduleFlush=useSetTimeout()}function then(onFulfillment,onRejection){var _arguments=arguments;var parent=this;var child=new this.constructor(noop);if(child[PROMISE_ID]===undefined){makePromise(child)}var _state=parent._state;if(_state){(function(){var callback=_arguments[_state-1];asap(function(){return invokeCallback(_state,child,callback,parent._result)})})()}else{subscribe(parent,child,onFulfillment,onRejection)}return child}function resolve$1(object){var Constructor=this;if(object&&typeof object==="object"&&object.constructor===Constructor){return object}var promise=new Constructor(noop);resolve(promise,object);return promise}var PROMISE_ID=Math.random().toString(36).substring(16);function noop(){}var PENDING=void 0;var FULFILLED=1;var REJECTED=2;var GET_THEN_ERROR=new ErrorObject;function selfFulfillment(){return new TypeError("You cannot resolve a promise with itself")}function cannotReturnOwn(){return new TypeError("A promises callback cannot return that same promise.")}function getThen(promise){try{return promise.then}catch(error){GET_THEN_ERROR.error=error;return GET_THEN_ERROR}}function tryThen(then$$1,value,fulfillmentHandler,rejectionHandler){try{then$$1.call(value,fulfillmentHandler,rejectionHandler)}catch(e){return e}}function handleForeignThenable(promise,thenable,then$$1){asap(function(promise){var sealed=false;var error=tryThen(then$$1,thenable,function(value){if(sealed){return}sealed=true;if(thenable!==value){resolve(promise,value)}else{fulfill(promise,value)}},function(reason){if(sealed){return}sealed=true;reject(promise,reason)},"Settle: "+(promise._label||" unknown promise"));if(!sealed&&error){sealed=true;reject(promise,error)}},promise)}function handleOwnThenable(promise,thenable){if(thenable._state===FULFILLED){fulfill(promise,thenable._result)}else if(thenable._state===REJECTED){reject(promise,thenable._result)}else{subscribe(thenable,undefined,function(value){return resolve(promise,value)},function(reason){return reject(promise,reason)})}}function handleMaybeThenable(promise,maybeThenable,then$$1){if(maybeThenable.constructor===promise.constructor&&then$$1===then&&maybeThenable.constructor.resolve===resolve$1){handleOwnThenable(promise,maybeThenable)}else{if(then$$1===GET_THEN_ERROR){reject(promise,GET_THEN_ERROR.error);GET_THEN_ERROR.error=null}else if(then$$1===undefined){fulfill(promise,maybeThenable)}else if(isFunction(then$$1)){handleForeignThenable(promise,maybeThenable,then$$1)}else{fulfill(promise,maybeThenable)}}}function resolve(promise,value){if(promise===value){reject(promise,selfFulfillment())}else if(objectOrFunction(value)){handleMaybeThenable(promise,value,getThen(value))}else{fulfill(promise,value)}}function publishRejection(promise){if(promise._onerror){promise._onerror(promise._result)}publish(promise)}function fulfill(promise,value){if(promise._state!==PENDING){return}promise._result=value;promise._state=FULFILLED;if(promise._subscribers.length!==0){asap(publish,promise)}}function reject(promise,reason){if(promise._state!==PENDING){return}promise._state=REJECTED;promise._result=reason;asap(publishRejection,promise)}function subscribe(parent,child,onFulfillment,onRejection){var _subscribers=parent._subscribers;var length=_subscribers.length;parent._onerror=null;_subscribers[length]=child;_subscribers[length+FULFILLED]=onFulfillment;_subscribers[length+REJECTED]=onRejection;if(length===0&&parent._state){asap(publish,parent)}}function publish(promise){var subscribers=promise._subscribers;var settled=promise._state;if(subscribers.length===0){return}var child=undefined,callback=undefined,detail=promise._result;for(var i=0;i<subscribers.length;i+=3){child=subscribers[i];callback=subscribers[i+settled];if(child){invokeCallback(settled,child,callback,detail)}else{callback(detail)}}promise._subscribers.length=0}function ErrorObject(){this.error=null}var TRY_CATCH_ERROR=new ErrorObject;function tryCatch(callback,detail){try{return callback(detail)}catch(e){TRY_CATCH_ERROR.error=e;return TRY_CATCH_ERROR}}function invokeCallback(settled,promise,callback,detail){var hasCallback=isFunction(callback),value=undefined,error=undefined,succeeded=undefined,failed=undefined;if(hasCallback){value=tryCatch(callback,detail);if(value===TRY_CATCH_ERROR){failed=true;error=value.error;value.error=null}else{succeeded=true}if(promise===value){reject(promise,cannotReturnOwn());return}}else{value=detail;succeeded=true}if(promise._state!==PENDING){}else if(hasCallback&&succeeded){resolve(promise,value)}else if(failed){reject(promise,error)}else if(settled===FULFILLED){fulfill(promise,value)}else if(settled===REJECTED){reject(promise,value)}}function initializePromise(promise,resolver){try{resolver(function resolvePromise(value){resolve(promise,value)},function rejectPromise(reason){reject(promise,reason)})}catch(e){reject(promise,e)}}var id=0;function nextId(){return id++}function makePromise(promise){promise[PROMISE_ID]=id++;promise._state=undefined;promise._result=undefined;promise._subscribers=[]}function Enumerator$1(Constructor,input){this._instanceConstructor=Constructor;this.promise=new Constructor(noop);if(!this.promise[PROMISE_ID]){makePromise(this.promise)}if(isArray(input)){this.length=input.length;this._remaining=input.length;this._result=new Array(this.length);if(this.length===0){fulfill(this.promise,this._result)}else{this.length=this.length||0;this._enumerate(input);if(this._remaining===0){fulfill(this.promise,this._result)}}}else{reject(this.promise,validationError())}}function validationError(){return new Error("Array Methods must be provided an Array")}Enumerator$1.prototype._enumerate=function(input){for(var i=0;this._state===PENDING&&i<input.length;i++){this._eachEntry(input[i],i)}};Enumerator$1.prototype._eachEntry=function(entry,i){var c=this._instanceConstructor;var resolve$$1=c.resolve;if(resolve$$1===resolve$1){var _then=getThen(entry);if(_then===then&&entry._state!==PENDING){this._settledAt(entry._state,i,entry._result)}else if(typeof _then!=="function"){this._remaining--;this._result[i]=entry}else if(c===Promise$2){var promise=new c(noop);handleMaybeThenable(promise,entry,_then);this._willSettleAt(promise,i)}else{this._willSettleAt(new c(function(resolve$$1){return resolve$$1(entry)}),i)}}else{this._willSettleAt(resolve$$1(entry),i)}};Enumerator$1.prototype._settledAt=function(state,i,value){var promise=this.promise;if(promise._state===PENDING){this._remaining--;if(state===REJECTED){reject(promise,value)}else{this._result[i]=value}}if(this._remaining===0){fulfill(promise,this._result)}};Enumerator$1.prototype._willSettleAt=function(promise,i){var enumerator=this;subscribe(promise,undefined,function(value){return enumerator._settledAt(FULFILLED,i,value)},function(reason){return enumerator._settledAt(REJECTED,i,reason)})};function all$1(entries){return new Enumerator$1(this,entries).promise}function race$1(entries){var Constructor=this;if(!isArray(entries)){return new Constructor(function(_,reject){return reject(new TypeError("You must pass an array to race."))})}else{return new Constructor(function(resolve,reject){var length=entries.length;for(var i=0;i<length;i++){Constructor.resolve(entries[i]).then(resolve,reject)}})}}function reject$1(reason){var Constructor=this;var promise=new Constructor(noop);reject(promise,reason);return promise}function needsResolver(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function Promise$2(resolver){this[PROMISE_ID]=nextId();this._result=this._state=undefined;this._subscribers=[];if(noop!==resolver){typeof resolver!=="function"&&needsResolver();this instanceof Promise$2?initializePromise(this,resolver):needsNew()}}Promise$2.all=all$1;Promise$2.race=race$1;Promise$2.resolve=resolve$1;Promise$2.reject=reject$1;Promise$2._setScheduler=setScheduler;Promise$2._setAsap=setAsap;Promise$2._asap=asap;Promise$2.prototype={constructor:Promise$2,then:then,catch:function _catch(onRejection){return this.then(null,onRejection)}};function polyfill$1(){var local=undefined;if(typeof global!=="undefined"){local=global}else if(typeof self!=="undefined"){local=self}else{try{local=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}}var P=local.Promise;if(P){var promiseToString=null;try{promiseToString=Object.prototype.toString.call(P.resolve())}catch(e){}if(promiseToString==="[object Promise]"&&!P.cast){return}}local.Promise=Promise$2}Promise$2.polyfill=polyfill$1;Promise$2.Promise=Promise$2;return Promise$2})}).call(exports,__webpack_require__(9),__webpack_require__(3))},function(module,exports){},function(module,exports,__webpack_require__){"use strict";module.exports=inlineHeaders;var encode=__webpack_require__(46);function inlineHeaders(url,headers){if(/\?/.test(url)){url+="&"}else{url+="?"}return url+encode(headers)}},function(module,exports,__webpack_require__){"use strict";var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){sep=sep||"&";eq=eq||"=";if(obj===null){obj=undefined}if(typeof obj==="object"){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep)}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]))}}).join(sep)}if(!name)return"";return encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj))};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==="[object Array]"};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i))}return res}var objectKeys=Object.keys||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key)}return res}},function(module,exports,__webpack_require__){"use strict";module.exports=jsonpRequest;var errors=__webpack_require__(5);var JSONPCounter=0;function jsonpRequest(url,opts,cb){if(opts.method!=="GET"){cb(new Error("Method "+opts.method+" "+url+" is not supported by JSONP."));return}opts.debug("JSONP: start");var cbCalled=false;var timedOut=false;JSONPCounter+=1;var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");var cbName="algoliaJSONP_"+JSONPCounter;var done=false;window[cbName]=function(data){removeGlobals();if(timedOut){opts.debug("JSONP: Late answer, ignoring");return}cbCalled=true;clean();cb(null,{body:data})};url+="&callback="+cbName;if(opts.jsonBody&&opts.jsonBody.params){url+="&"+opts.jsonBody.params}var ontimeout=setTimeout(timeout,opts.timeouts.complete);script.onreadystatechange=readystatechange;script.onload=success;script.onerror=error;script.async=true;script.defer=true;script.src=url;head.appendChild(script);function success(){opts.debug("JSONP: success");if(done||timedOut){return}done=true;if(!cbCalled){opts.debug("JSONP: Fail. Script loaded but did not call the callback");clean();cb(new errors.JSONPScriptFail)}}function readystatechange(){if(this.readyState==="loaded"||this.readyState==="complete"){success()}}function clean(){clearTimeout(ontimeout);script.onload=null;script.onreadystatechange=null;script.onerror=null;head.removeChild(script)}function removeGlobals(){try{delete window[cbName];delete window[cbName+"_loaded"]}catch(e){window[cbName]=window[cbName+"_loaded"]=undefined}}function timeout(){opts.debug("JSONP: Script timeout");timedOut=true;clean();cb(new errors.RequestTimeout)}function error(){opts.debug("JSONP: Script error");if(done||timedOut){return}clean();cb(new errors.JSONPScriptError)}}},function(module,exports,__webpack_require__){module.exports=createPlacesClient;var buildSearchMethod=__webpack_require__(13);function createPlacesClient(algoliasearch){return function places(appID,apiKey,opts){var cloneDeep=__webpack_require__(4);opts=opts&&cloneDeep(opts)||{};opts.hosts=opts.hosts||["places-dsn.algolia.net","places-1.algolianet.com","places-2.algolianet.com","places-3.algolianet.com"];if(arguments.length===0||typeof appID==="object"||appID===undefined){appID="";apiKey="";opts._allowEmptyCredentials=true}var client=algoliasearch(appID,apiKey,opts);var index=client.initIndex("places");index.search=buildSearchMethod("query","/1/places/query");index.getObject=function(objectID,callback){return this.as._jsonRequest({method:"GET",url:"/1/places/"+encodeURIComponent(objectID),hostType:"read",callback:callback})};return index}}},function(module,exports,__webpack_require__){"use strict";module.exports=getDocumentProtocol;function getDocumentProtocol(){var protocol=window.document.location.protocol;if(protocol!=="http:"&&protocol!=="https:"){protocol="http:"}return protocol}},function(module,exports,__webpack_require__){"use strict";module.exports="3.24.7"},function(module,exports,__webpack_require__){"use strict";module.exports=__webpack_require__(52)},function(module,exports,__webpack_require__){"use strict";var zepto=__webpack_require__(14);var DOM=__webpack_require__(1);DOM.element=zepto;var _=__webpack_require__(0);_.isArray=zepto.isArray;_.isFunction=zepto.isFunction;_.isObject=zepto.isPlainObject;_.bind=zepto.proxy;_.each=function(collection,cb){zepto.each(collection,reverseArgs);function reverseArgs(index,value){return cb(value,index)}};_.map=zepto.map;_.mixin=zepto.extend;_.Event=zepto.Event;var typeaheadKey="aaAutocomplete";var Typeahead=__webpack_require__(53);var EventBus=__webpack_require__(15);function autocomplete(selector,options,datasets,typeaheadObject){datasets=_.isArray(datasets)?datasets:[].slice.call(arguments,2);var inputs=zepto(selector).each(function(i,input){var $input=zepto(input);var eventBus=new EventBus({el:$input});var typeahead=typeaheadObject||new Typeahead({input:$input,eventBus:eventBus,dropdownMenuContainer:options.dropdownMenuContainer,hint:options.hint===undefined?true:!!options.hint,minLength:options.minLength,autoselect:options.autoselect,autoselectOnBlur:options.autoselectOnBlur,openOnFocus:options.openOnFocus,templates:options.templates,debug:options.debug,cssClasses:options.cssClasses,datasets:datasets,keyboardShortcuts:options.keyboardShortcuts,appendTo:options.appendTo,autoWidth:options.autoWidth});$input.data(typeaheadKey,typeahead)});inputs.autocomplete={};_.each(["open","close","getVal","setVal","destroy","getWrapper"],function(method){inputs.autocomplete[method]=function(){var methodArguments=arguments;var result;inputs.each(function(j,input){var typeahead=zepto(input).data(typeaheadKey);result=typeahead[method].apply(typeahead,methodArguments)});return result}});return inputs}autocomplete.sources=Typeahead.sources;autocomplete.escapeHighlightedString=_.escapeHighlightedString;var wasAutocompleteSet="autocomplete"in window;var oldAutocomplete=window.autocomplete;autocomplete.noConflict=function noConflict(){if(wasAutocompleteSet){window.autocomplete=oldAutocomplete}else{delete window.autocomplete}return autocomplete};module.exports=autocomplete},function(module,exports,__webpack_require__){"use strict";var attrsKey="aaAttrs";var _=__webpack_require__(0);var DOM=__webpack_require__(1);var EventBus=__webpack_require__(15);var Input=__webpack_require__(54);var Dropdown=__webpack_require__(61);var html=__webpack_require__(16);var css=__webpack_require__(11);function Typeahead(o){var $menu;var $hint;o=o||{};if(!o.input){_.error("missing input")}this.isActivated=false;this.debug=!!o.debug;this.autoselect=!!o.autoselect;this.autoselectOnBlur=!!o.autoselectOnBlur;this.openOnFocus=!!o.openOnFocus;this.minLength=_.isNumber(o.minLength)?o.minLength:1;this.autoWidth=o.autoWidth===undefined?true:!!o.autoWidth;o.hint=!!o.hint;if(o.hint&&o.appendTo){throw new Error("[autocomplete.js] hint and appendTo options can't be used at the same time")}this.css=o.css=_.mixin({},css,o.appendTo?css.appendTo:{});this.cssClasses=o.cssClasses=_.mixin({},css.defaultClasses,o.cssClasses||{});this.cssClasses.prefix=o.cssClasses.formattedPrefix=_.formatPrefix(this.cssClasses.prefix,this.cssClasses.noPrefix);this.listboxId=o.listboxId=[this.cssClasses.root,"listbox",_.getUniqueId()].join("-");var domElts=buildDom(o);this.$node=domElts.wrapper;var $input=this.$input=domElts.input;$menu=domElts.menu;$hint=domElts.hint;if(o.dropdownMenuContainer){DOM.element(o.dropdownMenuContainer).css("position","relative").append($menu.css("top","0"))}$input.on("blur.aa",function($e){var active=document.activeElement;if(_.isMsie()&&($menu[0]===active||$menu[0].contains(active))){$e.preventDefault();$e.stopImmediatePropagation();_.defer(function(){$input.focus()})}});$menu.on("mousedown.aa",function($e){$e.preventDefault()});this.eventBus=o.eventBus||new EventBus({el:$input});this.dropdown=new Typeahead.Dropdown({appendTo:o.appendTo,wrapper:this.$node,menu:$menu,datasets:o.datasets,templates:o.templates,cssClasses:o.cssClasses,minLength:this.minLength}).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onSync("shown",this._onShown,this).onSync("empty",this._onEmpty,this).onSync("redrawn",this._onRedrawn,this).onAsync("datasetRendered",this._onDatasetRendered,this);this.input=new Typeahead.Input({input:$input,hint:$hint}).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this);this._bindKeyboardShortcuts(o);this._setLanguageDirection()}_.mixin(Typeahead.prototype,{_bindKeyboardShortcuts:function(options){if(!options.keyboardShortcuts){return}var $input=this.$input;var keyboardShortcuts=[];_.each(options.keyboardShortcuts,function(key){if(typeof key==="string"){key=key.toUpperCase().charCodeAt(0)}keyboardShortcuts.push(key)});DOM.element(document).keydown(function(event){var elt=event.target||event.srcElement;var tagName=elt.tagName;if(elt.isContentEditable||tagName==="INPUT"||tagName==="SELECT"||tagName==="TEXTAREA"){return}var which=event.which||event.keyCode;if(keyboardShortcuts.indexOf(which)===-1){return}$input.focus();event.stopPropagation();event.preventDefault()})},_onSuggestionClicked:function onSuggestionClicked(type,$el){var datum;if(datum=this.dropdown.getDatumForSuggestion($el)){this._select(datum)}},_onCursorMoved:function onCursorMoved(event,updateInput){var datum=this.dropdown.getDatumForCursor();var currentCursorId=this.dropdown.getCurrentCursor().attr("id");this.input.setActiveDescendant(currentCursorId);if(datum){if(updateInput){this.input.setInputValue(datum.value,true)}this.eventBus.trigger("cursorchanged",datum.raw,datum.datasetName)}},_onCursorRemoved:function onCursorRemoved(){this.input.resetInputValue();this._updateHint();this.eventBus.trigger("cursorremoved")},_onDatasetRendered:function onDatasetRendered(){this._updateHint();this.eventBus.trigger("updated")},_onOpened:function onOpened(){this._updateHint();this.input.expand();this.eventBus.trigger("opened")},_onEmpty:function onEmpty(){this.eventBus.trigger("empty")},_onRedrawn:function onRedrawn(){this.$node.css("top",0+"px");this.$node.css("left",0+"px");var inputRect=this.$input[0].getBoundingClientRect();if(this.autoWidth){this.$node.css("width",inputRect.width+"px")}var wrapperRect=this.$node[0].getBoundingClientRect();var top=inputRect.bottom-wrapperRect.top;this.$node.css("top",top+"px");var left=inputRect.left-wrapperRect.left;this.$node.css("left",left+"px");this.eventBus.trigger("redrawn")},_onShown:function onShown(){this.eventBus.trigger("shown");if(this.autoselect){this.dropdown.cursorTopSuggestion()}},_onClosed:function onClosed(){this.input.clearHint();this.input.removeActiveDescendant();this.input.collapse();this.eventBus.trigger("closed")},_onFocused:function onFocused(){this.isActivated=true;if(this.openOnFocus){var query=this.input.getQuery();if(query.length>=this.minLength){this.dropdown.update(query)}else{this.dropdown.empty()}this.dropdown.open()}},_onBlurred:function onBlurred(){var cursorDatum;var topSuggestionDatum;cursorDatum=this.dropdown.getDatumForCursor();topSuggestionDatum=this.dropdown.getDatumForTopSuggestion();if(!this.debug){if(this.autoselectOnBlur&&cursorDatum){this._select(cursorDatum)}else if(this.autoselectOnBlur&&topSuggestionDatum){this._select(topSuggestionDatum)}else{this.isActivated=false;this.dropdown.empty();this.dropdown.close()}}},_onEnterKeyed:function onEnterKeyed(type,$e){var cursorDatum;var topSuggestionDatum;cursorDatum=this.dropdown.getDatumForCursor();topSuggestionDatum=this.dropdown.getDatumForTopSuggestion();if(cursorDatum){this._select(cursorDatum);$e.preventDefault()}else if(this.autoselect&&topSuggestionDatum){this._select(topSuggestionDatum);$e.preventDefault()}},_onTabKeyed:function onTabKeyed(type,$e){var datum;if(datum=this.dropdown.getDatumForCursor()){this._select(datum);$e.preventDefault()}else{this._autocomplete(true)}},_onEscKeyed:function onEscKeyed(){this.dropdown.close();this.input.resetInputValue()},_onUpKeyed:function onUpKeyed(){var query=this.input.getQuery();if(this.dropdown.isEmpty&&query.length>=this.minLength){this.dropdown.update(query)}else{this.dropdown.moveCursorUp()}this.dropdown.open()},_onDownKeyed:function onDownKeyed(){var query=this.input.getQuery();if(this.dropdown.isEmpty&&query.length>=this.minLength){this.dropdown.update(query)}else{this.dropdown.moveCursorDown()}this.dropdown.open()},_onLeftKeyed:function onLeftKeyed(){if(this.dir==="rtl"){this._autocomplete()}},_onRightKeyed:function onRightKeyed(){if(this.dir==="ltr"){this._autocomplete()}},_onQueryChanged:function onQueryChanged(e,query){this.input.clearHintIfInvalid();if(query.length>=this.minLength){this.dropdown.update(query)}else{this.dropdown.empty()}this.dropdown.open();this._setLanguageDirection()},_onWhitespaceChanged:function onWhitespaceChanged(){this._updateHint();this.dropdown.open()},_setLanguageDirection:function setLanguageDirection(){var dir=this.input.getLanguageDirection();if(this.dir!==dir){this.dir=dir;this.$node.css("direction",dir);this.dropdown.setLanguageDirection(dir)}},_updateHint:function updateHint(){var datum;var val;var query;var escapedQuery;var frontMatchRegEx;var match;datum=this.dropdown.getDatumForTopSuggestion();if(datum&&this.dropdown.isVisible()&&!this.input.hasOverflow()){val=this.input.getInputValue();query=Input.normalizeQuery(val);escapedQuery=_.escapeRegExChars(query);frontMatchRegEx=new RegExp("^(?:"+escapedQuery+")(.+$)","i");match=frontMatchRegEx.exec(datum.value);if(match){this.input.setHint(val+match[1])}else{this.input.clearHint()}}else{this.input.clearHint()}},_autocomplete:function autocomplete(laxCursor){var hint;var query;var isCursorAtEnd;var datum;hint=this.input.getHint();query=this.input.getQuery();isCursorAtEnd=laxCursor||this.input.isCursorAtEnd();if(hint&&query!==hint&&isCursorAtEnd){datum=this.dropdown.getDatumForTopSuggestion();if(datum){this.input.setInputValue(datum.value)}this.eventBus.trigger("autocompleted",datum.raw,datum.datasetName)}},_select:function select(datum){if(typeof datum.value!=="undefined"){this.input.setQuery(datum.value)}this.input.setInputValue(datum.value,true);this._setLanguageDirection();var event=this.eventBus.trigger("selected",datum.raw,datum.datasetName);if(event.isDefaultPrevented()===false){this.dropdown.close();_.defer(_.bind(this.dropdown.empty,this.dropdown))}},open:function open(){if(!this.isActivated){var query=this.input.getInputValue();if(query.length>=this.minLength){this.dropdown.update(query)}else{this.dropdown.empty()}}this.dropdown.open()},close:function close(){this.dropdown.close()},setVal:function setVal(val){val=_.toStr(val);if(this.isActivated){this.input.setInputValue(val)}else{this.input.setQuery(val);this.input.setInputValue(val,true)}this._setLanguageDirection()},getVal:function getVal(){return this.input.getQuery()},destroy:function destroy(){this.input.destroy();this.dropdown.destroy();destroyDomStructure(this.$node,this.cssClasses);this.$node=null},getWrapper:function getWrapper(){return this.dropdown.$container[0]}});function buildDom(options){var $input;var $wrapper;var $dropdown;var $hint;$input=DOM.element(options.input);$wrapper=DOM.element(html.wrapper.replace("%ROOT%",options.cssClasses.root)).css(options.css.wrapper);if(!options.appendTo&&$input.css("display")==="block"&&$input.parent().css("display")==="table"){$wrapper.css("display","table-cell")}var dropdownHtml=html.dropdown.replace("%PREFIX%",options.cssClasses.prefix).replace("%DROPDOWN_MENU%",options.cssClasses.dropdownMenu);$dropdown=DOM.element(dropdownHtml).css(options.css.dropdown).attr({role:"listbox",id:options.listboxId});if(options.templates&&options.templates.dropdownMenu){$dropdown.html(_.templatify(options.templates.dropdownMenu)())}$hint=$input.clone().css(options.css.hint).css(getBackgroundStyles($input));$hint.val("").addClass(_.className(options.cssClasses.prefix,options.cssClasses.hint,true)).removeAttr("id name placeholder required").prop("readonly",true).attr({"aria-hidden":"true",autocomplete:"off",spellcheck:"false",tabindex:-1});if($hint.removeData){$hint.removeData()}$input.data(attrsKey,{"aria-autocomplete":$input.attr("aria-autocomplete"),"aria-expanded":$input.attr("aria-expanded"),"aria-owns":$input.attr("aria-owns"),autocomplete:$input.attr("autocomplete"),dir:$input.attr("dir"),role:$input.attr("role"),spellcheck:$input.attr("spellcheck"),style:$input.attr("style"),type:$input.attr("type")});$input.addClass(_.className(options.cssClasses.prefix,options.cssClasses.input,true)).attr({autocomplete:"off",spellcheck:false,role:"combobox","aria-autocomplete":options.datasets&&options.datasets[0]&&options.datasets[0].displayKey?"both":"list","aria-expanded":"false","aria-label":options.ariaLabel,"aria-owns":options.listboxId}).css(options.hint?options.css.input:options.css.inputWithNoHint);try{if(!$input.attr("dir")){$input.attr("dir","auto")}}catch(e){}$wrapper=options.appendTo?$wrapper.appendTo(DOM.element(options.appendTo).eq(0)).eq(0):$input.wrap($wrapper).parent();$wrapper.prepend(options.hint?$hint:null).append($dropdown);return{wrapper:$wrapper,input:$input,hint:$hint,menu:$dropdown}}function getBackgroundStyles($el){return{backgroundAttachment:$el.css("background-attachment"),backgroundClip:$el.css("background-clip"),backgroundColor:$el.css("background-color"),backgroundImage:$el.css("background-image"),backgroundOrigin:$el.css("background-origin"),backgroundPosition:$el.css("background-position"),backgroundRepeat:$el.css("background-repeat"),backgroundSize:$el.css("background-size")}}function destroyDomStructure($node,cssClasses){var $input=$node.find(_.className(cssClasses.prefix,cssClasses.input));_.each($input.data(attrsKey),function(val,key){if(val===undefined){$input.removeAttr(key)}else{$input.attr(key,val)}});$input.detach().removeClass(_.className(cssClasses.prefix,cssClasses.input,true)).insertAfter($node);if($input.removeData){$input.removeData(attrsKey)}$node.remove()}Typeahead.Dropdown=Dropdown;Typeahead.Input=Input;Typeahead.sources=__webpack_require__(63);module.exports=Typeahead},function(module,exports,__webpack_require__){"use strict";var specialKeyCodeMap;specialKeyCodeMap={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"};var _=__webpack_require__(0);var DOM=__webpack_require__(1);var EventEmitter=__webpack_require__(10);function Input(o){var that=this;var onBlur;var onFocus;var onKeydown;var onInput;o=o||{};if(!o.input){_.error("input is missing")}onBlur=_.bind(this._onBlur,this);onFocus=_.bind(this._onFocus,this);onKeydown=_.bind(this._onKeydown,this);onInput=_.bind(this._onInput,this);this.$hint=DOM.element(o.hint);this.$input=DOM.element(o.input).on("blur.aa",onBlur).on("focus.aa",onFocus).on("keydown.aa",onKeydown);if(this.$hint.length===0){this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=_.noop}if(!_.isMsie()){this.$input.on("input.aa",onInput)}else{this.$input.on("keydown.aa keypress.aa cut.aa paste.aa",function($e){if(specialKeyCodeMap[$e.which||$e.keyCode]){return}_.defer(_.bind(that._onInput,that,$e))})}this.query=this.$input.val();this.$overflowHelper=buildOverflowHelper(this.$input)}Input.normalizeQuery=function(str){return(str||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")};_.mixin(Input.prototype,EventEmitter,{_onBlur:function onBlur(){this.resetInputValue();this.$input.removeAttr("aria-activedescendant");this.trigger("blurred")},_onFocus:function onFocus(){this.trigger("focused")},_onKeydown:function onKeydown($e){var keyName=specialKeyCodeMap[$e.which||$e.keyCode];this._managePreventDefault(keyName,$e);if(keyName&&this._shouldTrigger(keyName,$e)){this.trigger(keyName+"Keyed",$e)}},_onInput:function onInput(){this._checkInputValue()},_managePreventDefault:function managePreventDefault(keyName,$e){var preventDefault;var hintValue;var inputValue;switch(keyName){case"tab":hintValue=this.getHint();inputValue=this.getInputValue();preventDefault=hintValue&&hintValue!==inputValue&&!withModifier($e);break;case"up":case"down":preventDefault=!withModifier($e);break;default:preventDefault=false}if(preventDefault){$e.preventDefault()}},_shouldTrigger:function shouldTrigger(keyName,$e){var trigger;switch(keyName){case"tab":trigger=!withModifier($e);break;default:trigger=true}return trigger},_checkInputValue:function checkInputValue(){var inputValue;var areEquivalent;var hasDifferentWhitespace;inputValue=this.getInputValue();areEquivalent=areQueriesEquivalent(inputValue,this.query);hasDifferentWhitespace=areEquivalent&&this.query?this.query.length!==inputValue.length:false;this.query=inputValue;if(!areEquivalent){this.trigger("queryChanged",this.query)}else if(hasDifferentWhitespace){this.trigger("whitespaceChanged",this.query)}},focus:function focus(){this.$input.focus()},blur:function blur(){this.$input.blur()},getQuery:function getQuery(){return this.query},setQuery:function setQuery(query){this.query=query},getInputValue:function getInputValue(){return this.$input.val()},setInputValue:function setInputValue(value,silent){if(typeof value==="undefined"){value=this.query}this.$input.val(value);if(silent){this.clearHint()}else{this._checkInputValue()}},expand:function expand(){this.$input.attr("aria-expanded","true")},collapse:function collapse(){this.$input.attr("aria-expanded","false")},setActiveDescendant:function setActiveDescendant(activedescendantId){this.$input.attr("aria-activedescendant",activedescendantId)},removeActiveDescendant:function removeActiveDescendant(){this.$input.removeAttr("aria-activedescendant")},resetInputValue:function resetInputValue(){this.setInputValue(this.query,true)},getHint:function getHint(){return this.$hint.val()},setHint:function setHint(value){this.$hint.val(value)},clearHint:function clearHint(){this.setHint("")},clearHintIfInvalid:function clearHintIfInvalid(){var val;var hint;var valIsPrefixOfHint;var isValid;val=this.getInputValue();hint=this.getHint();valIsPrefixOfHint=val!==hint&&hint.indexOf(val)===0;isValid=val!==""&&valIsPrefixOfHint&&!this.hasOverflow();if(!isValid){this.clearHint()}},getLanguageDirection:function getLanguageDirection(){return(this.$input.css("direction")||"ltr").toLowerCase()},hasOverflow:function hasOverflow(){var constraint=this.$input.width()-2;this.$overflowHelper.text(this.getInputValue());return this.$overflowHelper.width()>=constraint},isCursorAtEnd:function(){var valueLength;var selectionStart;var range;valueLength=this.$input.val().length;selectionStart=this.$input[0].selectionStart;if(_.isNumber(selectionStart)){return selectionStart===valueLength}else if(document.selection){range=document.selection.createRange();range.moveStart("character",-valueLength);return valueLength===range.text.length}return true},destroy:function destroy(){this.$hint.off(".aa");this.$input.off(".aa");this.$hint=this.$input=this.$overflowHelper=null}});function buildOverflowHelper($input){return DOM.element('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:$input.css("font-family"),fontSize:$input.css("font-size"),fontStyle:$input.css("font-style"),fontVariant:$input.css("font-variant"),fontWeight:$input.css("font-weight"),wordSpacing:$input.css("word-spacing"),letterSpacing:$input.css("letter-spacing"),textIndent:$input.css("text-indent"),textRendering:$input.css("text-rendering"),textTransform:$input.css("text-transform")}).insertAfter($input)}function areQueriesEquivalent(a,b){return Input.normalizeQuery(a)===Input.normalizeQuery(b)}function withModifier($e){return $e.altKey||$e.ctrlKey||$e.metaKey||$e.shiftKey}module.exports=Input},function(module,exports,__webpack_require__){"use strict";var types=[__webpack_require__(56),__webpack_require__(57),__webpack_require__(58),__webpack_require__(59),__webpack_require__(60)];var draining;var currentQueue;var queueIndex=-1;var queue=[];var scheduled=false;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){nextTick()}}function nextTick(){if(draining){return}scheduled=false;draining=true;var len=queue.length;var timeout=setTimeout(cleanUpNextTick);while(len){currentQueue=queue;queue=[];while(currentQueue&&++queueIndex<len){currentQueue[queueIndex].run()}queueIndex=-1;len=queue.length}currentQueue=null;queueIndex=-1;draining=false;clearTimeout(timeout)}var scheduleDrain;var i=-1;var len=types.length;while(++i<len){if(types[i]&&types[i].test&&types[i].test()){scheduleDrain=types[i].install(nextTick);break}}function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){var fun=this.fun;var array=this.array;switch(array.length){case 0:return fun();case 1:return fun(array[0]);case 2:return fun(array[0],array[1]);case 3:return fun(array[0],array[1],array[2]);default:return fun.apply(null,array)}};module.exports=immediate;function immediate(task){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(task,args));if(!scheduled&&!draining){scheduled=true;scheduleDrain()}}},function(module,exports,__webpack_require__){"use strict";(function(process){exports.test=function(){return typeof process!=="undefined"&&!process.browser};exports.install=function(func){return function(){process.nextTick(func)}}}).call(exports,__webpack_require__(9))},function(module,exports,__webpack_require__){"use strict";(function(global){var Mutation=global.MutationObserver||global.WebKitMutationObserver;exports.test=function(){return Mutation};exports.install=function(handle){var called=0;var observer=new Mutation(handle);var element=global.document.createTextNode("");observer.observe(element,{characterData:true});return function(){element.data=called=++called%2}}}).call(exports,__webpack_require__(3))},function(module,exports,__webpack_require__){"use strict";(function(global){exports.test=function(){if(global.setImmediate){return false}return typeof global.MessageChannel!=="undefined"};exports.install=function(func){var channel=new global.MessageChannel;channel.port1.onmessage=func;return function(){channel.port2.postMessage(0)}}}).call(exports,__webpack_require__(3))},function(module,exports,__webpack_require__){"use strict";(function(global){exports.test=function(){return"document"in global&&"onreadystatechange"in global.document.createElement("script")};exports.install=function(handle){return function(){var scriptEl=global.document.createElement("script");scriptEl.onreadystatechange=function(){handle();scriptEl.onreadystatechange=null;scriptEl.parentNode.removeChild(scriptEl);scriptEl=null};global.document.documentElement.appendChild(scriptEl);return handle}}}).call(exports,__webpack_require__(3))},function(module,exports,__webpack_require__){"use strict";exports.test=function(){return true};exports.install=function(t){return function(){setTimeout(t,0)}}},function(module,exports,__webpack_require__){"use strict";var _=__webpack_require__(0);var DOM=__webpack_require__(1);var EventEmitter=__webpack_require__(10);var Dataset=__webpack_require__(62);var css=__webpack_require__(11);function Dropdown(o){var that=this;var onSuggestionClick;var onSuggestionMouseEnter;var onSuggestionMouseLeave;o=o||{};if(!o.menu){_.error("menu is required")}if(!_.isArray(o.datasets)&&!_.isObject(o.datasets)){_.error("1 or more datasets required")}if(!o.datasets){_.error("datasets is required")}this.isOpen=false;this.isEmpty=true;this.minLength=o.minLength||0;this.templates={};this.appendTo=o.appendTo||false;this.css=_.mixin({},css,o.appendTo?css.appendTo:{});this.cssClasses=o.cssClasses=_.mixin({},css.defaultClasses,o.cssClasses||{});this.cssClasses.prefix=o.cssClasses.formattedPrefix||_.formatPrefix(this.cssClasses.prefix,this.cssClasses.noPrefix);onSuggestionClick=_.bind(this._onSuggestionClick,this);onSuggestionMouseEnter=_.bind(this._onSuggestionMouseEnter,this);onSuggestionMouseLeave=_.bind(this._onSuggestionMouseLeave,this);var cssClass=_.className(this.cssClasses.prefix,this.cssClasses.suggestion);this.$menu=DOM.element(o.menu).on("mouseenter.aa",cssClass,onSuggestionMouseEnter).on("mouseleave.aa",cssClass,onSuggestionMouseLeave).on("click.aa",cssClass,onSuggestionClick);this.$container=o.appendTo?o.wrapper:this.$menu;if(o.templates&&o.templates.header){this.templates.header=_.templatify(o.templates.header);this.$menu.prepend(this.templates.header())}if(o.templates&&o.templates.empty){this.templates.empty=_.templatify(o.templates.empty);this.$empty=DOM.element('<div class="'+_.className(this.cssClasses.prefix,this.cssClasses.empty,true)+'">'+"</div>");this.$menu.append(this.$empty);this.$empty.hide()}this.datasets=_.map(o.datasets,function(oDataset){return initializeDataset(that.$menu,oDataset,o.cssClasses)});_.each(this.datasets,function(dataset){var root=dataset.getRoot();if(root&&root.parent().length===0){that.$menu.append(root)}dataset.onSync("rendered",that._onRendered,that)});if(o.templates&&o.templates.footer){this.templates.footer=_.templatify(o.templates.footer);this.$menu.append(this.templates.footer())}var self=this;DOM.element(window).resize(function(){self._redraw()})}_.mixin(Dropdown.prototype,EventEmitter,{_onSuggestionClick:function onSuggestionClick($e){this.trigger("suggestionClicked",DOM.element($e.currentTarget))},_onSuggestionMouseEnter:function onSuggestionMouseEnter($e){var elt=DOM.element($e.currentTarget);if(elt.hasClass(_.className(this.cssClasses.prefix,this.cssClasses.cursor,true))){return}this._removeCursor();var suggestion=this;setTimeout(function(){suggestion._setCursor(elt,false)},0)},_onSuggestionMouseLeave:function onSuggestionMouseLeave($e){if($e.relatedTarget){var elt=DOM.element($e.relatedTarget);if(elt.closest("."+_.className(this.cssClasses.prefix,this.cssClasses.cursor,true)).length>0){return}}this._removeCursor();this.trigger("cursorRemoved")},_onRendered:function onRendered(e,query){this.isEmpty=_.every(this.datasets,isDatasetEmpty);if(this.isEmpty){if(query.length>=this.minLength){this.trigger("empty")}if(this.$empty){if(query.length<this.minLength){this._hide()}else{var html=this.templates.empty({query:this.datasets[0]&&this.datasets[0].query});this.$empty.html(html);this.$empty.show();this._show()}}else if(_.any(this.datasets,hasEmptyTemplate)){if(query.length<this.minLength){this._hide()}else{this._show()}}else{this._hide()}}else if(this.isOpen){if(this.$empty){this.$empty.empty();this.$empty.hide()}if(query.length>=this.minLength){this._show()}else{this._hide()}}this.trigger("datasetRendered");function isDatasetEmpty(dataset){return dataset.isEmpty()}function hasEmptyTemplate(dataset){return dataset.templates&&dataset.templates.empty}},_hide:function(){this.$container.hide()},_show:function(){this.$container.css("display","block");this._redraw();this.trigger("shown")},_redraw:function redraw(){if(!this.isOpen||!this.appendTo)return;this.trigger("redrawn")},_getSuggestions:function getSuggestions(){return this.$menu.find(_.className(this.cssClasses.prefix,this.cssClasses.suggestion))},_getCursor:function getCursor(){return this.$menu.find(_.className(this.cssClasses.prefix,this.cssClasses.cursor)).first()},_setCursor:function setCursor($el,updateInput){$el.first().addClass(_.className(this.cssClasses.prefix,this.cssClasses.cursor,true)).attr("aria-selected","true");this.trigger("cursorMoved",updateInput)},_removeCursor:function removeCursor(){this._getCursor().removeClass(_.className(this.cssClasses.prefix,this.cssClasses.cursor,true)).removeAttr("aria-selected")},_moveCursor:function moveCursor(increment){var $suggestions;var $oldCursor;var newCursorIndex;var $newCursor;if(!this.isOpen){return}$oldCursor=this._getCursor();$suggestions=this._getSuggestions();this._removeCursor();newCursorIndex=$suggestions.index($oldCursor)+increment;newCursorIndex=(newCursorIndex+1)%($suggestions.length+1)-1;if(newCursorIndex===-1){this.trigger("cursorRemoved");return}else if(newCursorIndex<-1){newCursorIndex=$suggestions.length-1}this._setCursor($newCursor=$suggestions.eq(newCursorIndex),true);this._ensureVisible($newCursor)},_ensureVisible:function ensureVisible($el){var elTop;var elBottom;var menuScrollTop;var menuHeight;elTop=$el.position().top;elBottom=elTop+$el.height()+parseInt($el.css("margin-top"),10)+parseInt($el.css("margin-bottom"),10);menuScrollTop=this.$menu.scrollTop();menuHeight=this.$menu.height()+parseInt(this.$menu.css("padding-top"),10)+parseInt(this.$menu.css("padding-bottom"),10);if(elTop<0){this.$menu.scrollTop(menuScrollTop+elTop)}else if(menuHeight<elBottom){this.$menu.scrollTop(menuScrollTop+(elBottom-menuHeight))}},close:function close(){if(this.isOpen){this.isOpen=false;this._removeCursor();this._hide();this.trigger("closed")}},open:function open(){if(!this.isOpen){this.isOpen=true;if(!this.isEmpty){this._show()}this.trigger("opened")}},setLanguageDirection:function setLanguageDirection(dir){this.$menu.css(dir==="ltr"?this.css.ltr:this.css.rtl)},moveCursorUp:function moveCursorUp(){this._moveCursor(-1)},moveCursorDown:function moveCursorDown(){this._moveCursor(+1)},getDatumForSuggestion:function getDatumForSuggestion($el){var datum=null;if($el.length){datum={raw:Dataset.extractDatum($el),value:Dataset.extractValue($el),datasetName:Dataset.extractDatasetName($el)}}return datum},getCurrentCursor:function getCurrentCursor(){return this._getCursor().first()},getDatumForCursor:function getDatumForCursor(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function getDatumForTopSuggestion(){return this.getDatumForSuggestion(this._getSuggestions().first())},cursorTopSuggestion:function cursorTopSuggestion(){this._setCursor(this._getSuggestions().first(),false)},update:function update(query){_.each(this.datasets,updateDataset);function updateDataset(dataset){dataset.update(query)}},empty:function empty(){_.each(this.datasets,clearDataset);this.isEmpty=true;function clearDataset(dataset){dataset.clear()}},isVisible:function isVisible(){return this.isOpen&&!this.isEmpty},destroy:function destroy(){this.$menu.off(".aa");this.$menu=null;_.each(this.datasets,destroyDataset);function destroyDataset(dataset){dataset.destroy()}}});Dropdown.Dataset=Dataset;function initializeDataset($menu,oDataset,cssClasses){return new Dropdown.Dataset(_.mixin({$menu:$menu,cssClasses:cssClasses},oDataset))}module.exports=Dropdown},function(module,exports,__webpack_require__){"use strict";var datasetKey="aaDataset";var valueKey="aaValue";var datumKey="aaDatum";var _=__webpack_require__(0);var DOM=__webpack_require__(1);var html=__webpack_require__(16);var css=__webpack_require__(11);var EventEmitter=__webpack_require__(10);function Dataset(o){o=o||{};o.templates=o.templates||{};if(!o.source){_.error("missing source")}if(o.name&&!isValidName(o.name)){_.error("invalid dataset name: "+o.name)}this.query=null;this._isEmpty=true;this.highlight=!!o.highlight;this.name=typeof o.name==="undefined"||o.name===null?_.getUniqueId():o.name;this.source=o.source;this.displayFn=getDisplayFn(o.display||o.displayKey);this.templates=getTemplates(o.templates,this.displayFn);this.css=_.mixin({},css,o.appendTo?css.appendTo:{});this.cssClasses=o.cssClasses=_.mixin({},css.defaultClasses,o.cssClasses||{});this.cssClasses.prefix=o.cssClasses.formattedPrefix||_.formatPrefix(this.cssClasses.prefix,this.cssClasses.noPrefix);var clazz=_.className(this.cssClasses.prefix,this.cssClasses.dataset);this.$el=o.$menu&&o.$menu.find(clazz+"-"+this.name).length>0?DOM.element(o.$menu.find(clazz+"-"+this.name)[0]):DOM.element(html.dataset.replace("%CLASS%",this.name).replace("%PREFIX%",this.cssClasses.prefix).replace("%DATASET%",this.cssClasses.dataset));this.$menu=o.$menu;this.clearCachedSuggestions()}Dataset.extractDatasetName=function extractDatasetName(el){return DOM.element(el).data(datasetKey)};Dataset.extractValue=function extractValue(el){return DOM.element(el).data(valueKey)};Dataset.extractDatum=function extractDatum(el){var datum=DOM.element(el).data(datumKey);if(typeof datum==="string"){datum=JSON.parse(datum)}return datum};_.mixin(Dataset.prototype,EventEmitter,{_render:function render(query,suggestions){if(!this.$el){return}var that=this;var hasSuggestions;var renderArgs=[].slice.call(arguments,2);this.$el.empty();hasSuggestions=suggestions&&suggestions.length;this._isEmpty=!hasSuggestions;if(!hasSuggestions&&this.templates.empty){this.$el.html(getEmptyHtml.apply(this,renderArgs)).prepend(that.templates.header?getHeaderHtml.apply(this,renderArgs):null).append(that.templates.footer?getFooterHtml.apply(this,renderArgs):null)}else if(hasSuggestions){this.$el.html(getSuggestionsHtml.apply(this,renderArgs)).prepend(that.templates.header?getHeaderHtml.apply(this,renderArgs):null).append(that.templates.footer?getFooterHtml.apply(this,renderArgs):null)}if(this.$menu){this.$menu.addClass(this.cssClasses.prefix+(hasSuggestions?"with":"without")+"-"+this.name).removeClass(this.cssClasses.prefix+(hasSuggestions?"without":"with")+"-"+this.name)}this.trigger("rendered",query);function getEmptyHtml(){var args=[].slice.call(arguments,0);args=[{query:query,isEmpty:true}].concat(args);return that.templates.empty.apply(this,args)}function getSuggestionsHtml(){var args=[].slice.call(arguments,0);var $suggestions;var nodes;var self=this;var suggestionsHtml=html.suggestions.replace("%PREFIX%",this.cssClasses.prefix).replace("%SUGGESTIONS%",this.cssClasses.suggestions);$suggestions=DOM.element(suggestionsHtml).css(this.css.suggestions);nodes=_.map(suggestions,getSuggestionNode);$suggestions.append.apply($suggestions,nodes);return $suggestions;function getSuggestionNode(suggestion){var $el;var suggestionHtml=html.suggestion.replace("%PREFIX%",self.cssClasses.prefix).replace("%SUGGESTION%",self.cssClasses.suggestion);$el=DOM.element(suggestionHtml).attr({role:"option",id:["option",Math.floor(Math.random()*1e8)].join("-")}).append(that.templates.suggestion.apply(this,[suggestion].concat(args)));$el.data(datasetKey,that.name);$el.data(valueKey,that.displayFn(suggestion)||undefined);$el.data(datumKey,JSON.stringify(suggestion));$el.children().each(function(){DOM.element(this).css(self.css.suggestionChild)});return $el}}function getHeaderHtml(){var args=[].slice.call(arguments,0);args=[{query:query,isEmpty:!hasSuggestions}].concat(args);return that.templates.header.apply(this,args)}function getFooterHtml(){var args=[].slice.call(arguments,0);args=[{query:query,isEmpty:!hasSuggestions}].concat(args);return that.templates.footer.apply(this,args)}},getRoot:function getRoot(){return this.$el},update:function update(query){function handleSuggestions(suggestions){if(!this.canceled&&query===this.query){var extraArgs=[].slice.call(arguments,1);this.cacheSuggestions(query,suggestions,extraArgs);this._render.apply(this,[query,suggestions].concat(extraArgs))}}this.query=query;this.canceled=false;if(this.shouldFetchFromCache(query)){handleSuggestions.apply(this,[this.cachedSuggestions].concat(this.cachedRenderExtraArgs))}else{this.source(query,handleSuggestions.bind(this))}},cacheSuggestions:function cacheSuggestions(query,suggestions,extraArgs){this.cachedQuery=query;this.cachedSuggestions=suggestions;this.cachedRenderExtraArgs=extraArgs},shouldFetchFromCache:function shouldFetchFromCache(query){return this.cachedQuery===query&&this.cachedSuggestions&&this.cachedSuggestions.length},clearCachedSuggestions:function clearCachedSuggestions(){delete this.cachedQuery;delete this.cachedSuggestions;delete this.cachedRenderExtraArgs},cancel:function cancel(){this.canceled=true},clear:function clear(){this.cancel();this.$el.empty();this.trigger("rendered","")},isEmpty:function isEmpty(){return this._isEmpty},destroy:function destroy(){this.clearCachedSuggestions();this.$el=null}});function getDisplayFn(display){display=display||"value";return _.isFunction(display)?display:displayFn;function displayFn(obj){return obj[display]}}function getTemplates(templates,displayFn){return{empty:templates.empty&&_.templatify(templates.empty),header:templates.header&&_.templatify(templates.header),footer:templates.footer&&_.templatify(templates.footer),suggestion:templates.suggestion||suggestionTemplate};function suggestionTemplate(context){return"<p>"+displayFn(context)+"</p>"}}function isValidName(str){return/^[_a-zA-Z0-9-]+$/.test(str)}module.exports=Dataset},function(module,exports,__webpack_require__){"use strict";module.exports={hits:__webpack_require__(64),popularIn:__webpack_require__(65)}},function(module,exports,__webpack_require__){"use strict";var _=__webpack_require__(0);var version=__webpack_require__(17);var parseAlgoliaClientVersion=__webpack_require__(18);module.exports=function search(index,params){var algoliaVersion=parseAlgoliaClientVersion(index.as._ua);if(algoliaVersion&&algoliaVersion[0]>=3&&algoliaVersion[1]>20){params=params||{};params.additionalUA="autocomplete.js "+version}return sourceFn;function sourceFn(query,cb){index.search(query,params,function(error,content){if(error){_.error(error.message);return}cb(content.hits,content)})}}},function(module,exports,__webpack_require__){"use strict";var _=__webpack_require__(0);var version=__webpack_require__(17);var parseAlgoliaClientVersion=__webpack_require__(18);module.exports=function popularIn(index,params,details,options){var algoliaVersion=parseAlgoliaClientVersion(index.as._ua);if(algoliaVersion&&algoliaVersion[0]>=3&&algoliaVersion[1]>20){params=params||{};params.additionalUA="autocomplete.js "+version}if(!details.source){return _.error("Missing 'source' key")}var source=_.isFunction(details.source)?details.source:function(hit){return hit[details.source]};if(!details.index){return _.error("Missing 'index' key")}var detailsIndex=details.index;options=options||{};return sourceFn;function sourceFn(query,cb){index.search(query,params,function(error,content){if(error){_.error(error.message);return}if(content.hits.length>0){var first=content.hits[0];var detailsParams=_.mixin({hitsPerPage:0},details);delete detailsParams.source;delete detailsParams.index;var detailsAlgoliaVersion=parseAlgoliaClientVersion(detailsIndex.as._ua);if(detailsAlgoliaVersion&&detailsAlgoliaVersion[0]>=3&&detailsAlgoliaVersion[1]>20){params.additionalUA="autocomplete.js "+version}detailsIndex.search(source(first),detailsParams,function(error2,content2){if(error2){_.error(error2.message);return}var suggestions=[];if(options.includeAll){var label=options.allTitle||"All departments";suggestions.push(_.mixin({facet:{value:label,count:content2.nbHits}},_.cloneDeep(first)))}_.each(content2.facets,function(values,facet){_.each(values,function(count,value){suggestions.push(_.mixin({facet:{facet:facet,value:value,count:count}},_.cloneDeep(first)))})});for(var i=1;i<content.hits.length;++i){suggestions.push(content.hits[i])}cb(suggestions,content)});return}cb([])})}}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var prefix="algolia-docsearch";var suggestionPrefix=prefix+"-suggestion";var footerPrefix=prefix+"-footer";var templates={suggestion:'\n  <div class="'+suggestionPrefix+"\n    {{#isCategoryHeader}}"+suggestionPrefix+"__main{{/isCategoryHeader}}\n    {{#isSubCategoryHeader}}"+suggestionPrefix+'__secondary{{/isSubCategoryHeader}}\n  ">\n    <div class="'+suggestionPrefix+'--category-header">\n        <span class="'+suggestionPrefix+'--category-header-lvl0">{{{category}}}</span>\n    </div>\n    <div class="'+suggestionPrefix+'--wrapper">\n      <div class="'+suggestionPrefix+'--subcategory-column">\n        <span class="'+suggestionPrefix+'--subcategory-column-text">{{{subcategory}}}</span>\n      </div>\n      {{#isTextOrSubcatoryNonEmpty}}\n      <div class="'+suggestionPrefix+'--content">\n        <div class="'+suggestionPrefix+'--subcategory-inline">{{{subcategory}}}</div>\n        <div class="'+suggestionPrefix+'--title">{{{title}}}</div>\n        {{#text}}<div class="'+suggestionPrefix+'--text">{{{text}}}</div>{{/text}}\n      </div>\n      {{/isTextOrSubcatoryNonEmpty}}\n    </div>\n  </div>\n  ',suggestionSimple:'\n  <div class="'+suggestionPrefix+"\n    {{#isCategoryHeader}}"+suggestionPrefix+"__main{{/isCategoryHeader}}\n    {{#isSubCategoryHeader}}"+suggestionPrefix+'__secondary{{/isSubCategoryHeader}}\n    suggestion-layout-simple\n  ">\n    <div class="'+suggestionPrefix+'--category-header">\n        {{^isLvl0}}\n        <span class="'+suggestionPrefix+"--category-header-lvl0 "+suggestionPrefix+'--category-header-item">{{{category}}}</span>\n          {{^isLvl1}}\n          {{^isLvl1EmptyOrDuplicate}}\n          <span class="'+suggestionPrefix+"--category-header-lvl1 "+suggestionPrefix+'--category-header-item">\n              {{{subcategory}}}\n          </span>\n          {{/isLvl1EmptyOrDuplicate}}\n          {{/isLvl1}}\n        {{/isLvl0}}\n        <div class="'+suggestionPrefix+"--title "+suggestionPrefix+'--category-header-item">\n            {{#isLvl2}}\n                {{{title}}}\n            {{/isLvl2}}\n            {{#isLvl1}}\n                {{{subcategory}}}\n            {{/isLvl1}}\n            {{#isLvl0}}\n                {{{category}}}\n            {{/isLvl0}}\n        </div>\n    </div>\n    <div class="'+suggestionPrefix+'--wrapper">\n      {{#text}}\n      <div class="'+suggestionPrefix+'--content">\n        <div class="'+suggestionPrefix+'--text">{{{text}}}</div>\n      </div>\n      {{/text}}\n    </div>\n  </div>\n  ',footer:'\n    <div class="'+footerPrefix+'">\n      Search by <a class="'+footerPrefix+'--logo" href="https://www.algolia.com/docsearch">Algolia</a>\n    </div>\n  ',empty:'\n  <div class="'+suggestionPrefix+'">\n    <div class="'+suggestionPrefix+'--wrapper">\n        <div class="'+suggestionPrefix+"--content "+suggestionPrefix+'--no-results">\n            <div class="'+suggestionPrefix+'--title">\n                <div class="'+suggestionPrefix+'--text">\n                    No results found for query <b>"{{query}}"</b>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n  ',searchBox:'\n  <form novalidate="novalidate" onsubmit="return false;" class="searchbox">\n    <div role="search" class="searchbox__wrapper">\n      <input id="docsearch" type="search" name="search" placeholder="Search the docs" autocomplete="off" required="required" class="searchbox__input"/>\n      <button type="submit" title="Submit your search query." class="searchbox__submit" >\n        <svg width=12 height=12 role="img" aria-label="Search">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-search-13"></use>\n        </svg>\n      </button>\n      <button type="reset" title="Clear the search query." class="searchbox__reset hide">\n        <svg width=12 height=12 role="img" aria-label="Reset">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-clear-3"></use>\n        </svg>\n      </button>\n    </div>\n</form>\n\n<div class="svg-icons" style="height: 0; width: 0; position: absolute; visibility: hidden">\n  <svg xmlns="http://www.w3.org/2000/svg">\n    <symbol id="sbx-icon-clear-3" viewBox="0 0 40 40"><path d="M16.228 20L1.886 5.657 0 3.772 3.772 0l1.885 1.886L20 16.228 34.343 1.886 36.228 0 40 3.772l-1.886 1.885L23.772 20l14.342 14.343L40 36.228 36.228 40l-1.885-1.886L20 23.772 5.657 38.114 3.772 40 0 36.228l1.886-1.885L16.228 20z" fill-rule="evenodd"></symbol>\n    <symbol id="sbx-icon-search-13" viewBox="0 0 40 40"><path d="M26.806 29.012a16.312 16.312 0 0 1-10.427 3.746C7.332 32.758 0 25.425 0 16.378 0 7.334 7.333 0 16.38 0c9.045 0 16.378 7.333 16.378 16.38 0 3.96-1.406 7.593-3.746 10.426L39.547 37.34c.607.608.61 1.59-.004 2.203a1.56 1.56 0 0 1-2.202.004L26.807 29.012zm-10.427.627c7.322 0 13.26-5.938 13.26-13.26 0-7.324-5.938-13.26-13.26-13.26-7.324 0-13.26 5.936-13.26 13.26 0 7.322 5.936 13.26 13.26 13.26z" fill-rule="evenodd"></symbol>\n  </svg>\n</div>\n  '};exports.default=templates},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var _zepto=__webpack_require__(19);var _zepto2=_interopRequireDefault(_zepto);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var utils={mergeKeyWithParent:function mergeKeyWithParent(object,property){if(object[property]===undefined){return object}if(_typeof(object[property])!=="object"){return object}var newObject=_zepto2.default.extend({},object,object[property]);delete newObject[property];return newObject},groupBy:function groupBy(collection,property){var newCollection={};_zepto2.default.each(collection,function(index,item){if(item[property]===undefined){throw new Error("[groupBy]: Object has no key "+property)}var key=item[property];if(typeof key==="string"){key=key.toLowerCase()}if(!Object.prototype.hasOwnProperty.call(newCollection,key)){newCollection[key]=[]}newCollection[key].push(item)});return newCollection},values:function values(object){return Object.keys(object).map(function(key){return object[key]})},flatten:function flatten(array){var results=[];array.forEach(function(value){if(!Array.isArray(value)){results.push(value);return}value.forEach(function(subvalue){results.push(subvalue)})});return results},flattenAndFlagFirst:function flattenAndFlagFirst(object,flag){var values=this.values(object).map(function(collection){return collection.map(function(item,index){item[flag]=index===0;return item})});return this.flatten(values)},compact:function compact(array){var results=[];array.forEach(function(value){if(!value){return}results.push(value)});return results},getHighlightedValue:function getHighlightedValue(object,property){if(object._highlightResult&&object._highlightResult.hierarchy_camel&&object._highlightResult.hierarchy_camel[property]&&object._highlightResult.hierarchy_camel[property].matchLevel&&object._highlightResult.hierarchy_camel[property].matchLevel!=="none"&&object._highlightResult.hierarchy_camel[property].value){return object._highlightResult.hierarchy_camel[property].value}if(object._highlightResult&&object._highlightResult&&object._highlightResult[property]&&object._highlightResult[property].value){return object._highlightResult[property].value}return object[property]},getSnippetedValue:function getSnippetedValue(object,property){if(!object._snippetResult||!object._snippetResult[property]||!object._snippetResult[property].value){return object[property]}var snippet=object._snippetResult[property].value;if(snippet[0]!==snippet[0].toUpperCase()){snippet="…"+snippet}if([".","!","?"].indexOf(snippet[snippet.length-1])===-1){snippet=snippet+"…"}return snippet},deepClone:function deepClone(object){return JSON.parse(JSON.stringify(object))}};exports.default=utils}])});
"use strict";

var anchorForId = function anchorForId(id) {
  var anchor = document.createElement("a");
  anchor.className = "anchor-link";
  anchor.href = "#" + id;
  anchor.innerHTML = "<span class=\"octicon octicon-link\"></span>";
  return anchor;
};

var linkifyAnchors = function linkifyAnchors(level, containingElement) {
  var headers = containingElement.getElementsByTagName("h" + level);
  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];

    if (typeof header.id !== "undefined" && header.id !== "") {
      header.appendChild(anchorForId(header.id));
    }
  }
};

window.onload = function () {
  var contentBlock = document.getElementsByClassName("document-content")[0];

  if (!contentBlock) {
    return;
  }

  for (var level = 1; level <= 6; level++) {
    linkifyAnchors(level, contentBlock);
  }
};
'use strict';

(function () {
  var $body = $('body');

  window.detectPlatform = function () {
    $('body').addClass('platform-switch');

    if (navigator.userAgent.indexOf('Win') !== -1) {
      $('body').addClass('platform-windows');
    } else if (navigator.userAgent.indexOf('Mac') !== -1) {
      $('body').addClass('platform-mac');
    } else if (navigator.userAgent.indexOf('Linux') !== -1) {
      $('body').addClass('platform-linux');
    } else {
      $('body').addClass('platform-all');
    }
  };

  var platformPrefix = 'platform-';
  var validPlatforms = ['mac', 'windows', 'linux'];

  var classForPlatform = function classForPlatform(platform) {
    return platformPrefix + platform;
  };

  var validPlatformBodyClasses = $(validPlatforms).map(function (_index, platform) {
    return classForPlatform(platform);
  });

  window.updateArticlePlatform = function (platform) {
    var className = classForPlatform(platform);

    $(validPlatformBodyClasses).each(function (_index, value) {
      if (value === className) {
        $body.addClass(value);
      } else {
        $body.removeClass(value);
      }

      var $navItem = $('#platform-nav .' + value);

      if (value === className) {
        $navItem.addClass('selected');
      } else {
        $navItem.removeClass('selected');
      }
    });
  };

  window.initPlatformNav = function () {
    var $platformNav = $('#platform-nav');
    $platformNav.addClass('show');
    $platformNav.find('a').click(function () {
      updateArticlePlatform($(this).data('platform'));
    });
  };

  window.setupSwitcher = function () {
    detectPlatform();

    var $articleBody = $('.document-content');

    var hasPlatformSpecificSections = {};
    var platformSpecificSectionsCount = 0;

    $(validPlatformBodyClasses).each(function (_index, className) {
      if ($articleBody.find('.' + className).length > 0) {
        hasPlatformSpecificSections[className] = true;
        platformSpecificSectionsCount++;
      }
    });

    if (platformSpecificSectionsCount > 0) {
      initPlatformNav();

      $(validPlatformBodyClasses).each(function (_index, className) {
        if (!hasPlatformSpecificSections[className]) {
          $('#platform-nav li.' + className).addClass('hidden');
        }
      });

      var platform = 'all';

      $body = $('body');
      var platformPrefixHashIndex = location.hash.indexOf(platformPrefix);

      if (platformPrefixHashIndex >= 0) {
        // Check if a platform is specified in the location hash
        var platformHashIndex = platformPrefixHashIndex + platformPrefix.length;
        platform = location.hash.substring(platformHashIndex);
      } else if (!$body.hasClass(classForPlatform('all'))) {
        $(validPlatforms).each(function (_index, value) {
          if ($body.hasClass(classForPlatform(value))) {
            platform = value;
          }
        });
      }

      updateArticlePlatform(platform);
    }
  };

  $(function () {
    setupSwitcher();
  });
})();