/*!
 * jQuery JavaScript Library v1.12.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T19:56Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
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

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
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
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
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
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
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
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
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

jQuery.extend( {

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
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
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

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
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
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
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
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
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
		var args, proxy, tmp;

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

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
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
	expando = "sizzle" + 1 * new Date(),
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
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
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
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
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
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
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
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
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
		i = arr.length;

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
	return context && typeof context.getElementsByTagName !== "undefined" && context;
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
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
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
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
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

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
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
	// Purposefully self-exclusive
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
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
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
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
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

	return document;
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
		!compilerCache[ expr + " " ] &&
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
		} catch (e) {}
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
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
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
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
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
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

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

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
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
							idx = indexOf( seed, matched[i] );
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
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
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
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
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

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

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
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

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
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
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
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
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

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
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

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
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
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
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
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
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
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
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
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
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
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
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
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

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

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
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
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
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
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
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
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
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


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
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
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
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
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

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
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
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
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
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
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

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
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// we once tried to use readyState "interactive" here,
		// but it caused issues like the one
		// discovered by ChrisS here:
		// http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

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
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
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

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
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
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
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
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
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
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
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
		return elem;
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
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

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
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

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
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
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

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

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
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
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
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
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
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
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
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
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

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
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

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
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
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
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
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
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

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
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

				// Support: IE < 9, Android < 4.0
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
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
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
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
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

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
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
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
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

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
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

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

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
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

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
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
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


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

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

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
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

		values[ index ] = jQuery._data( elem, "olddisplay" );
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
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
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
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

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
		if ( rnumnonpx.test( val ) ) {
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

jQuery.extend( {

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
		"animationIterationCount": true,
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
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
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

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

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
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
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
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

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
} );

jQuery.fn.extend( {
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

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
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

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
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
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
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
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

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
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

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
		dataShow = jQuery._data( elem, "fxshow" );

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

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
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
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
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
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
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
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
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
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
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
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

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

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
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

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

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
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

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
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
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
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

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
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
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
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
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

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
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
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
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
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
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
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
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
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
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
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

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
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

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
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
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
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
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
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
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
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
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
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

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
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
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

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

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
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
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
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
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
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
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
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

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

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
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
				window.clearTimeout( timeoutTimer );
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
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
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
					jQuery.event.trigger( "ajaxStop" );
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
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
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
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

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
		} );

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

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

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
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
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
		s.converters[ "script json" ] = function() {
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
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

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
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

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
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
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
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
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

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
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
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
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
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
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
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

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
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
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
	} );
} );


jQuery.fn.extend( {

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
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

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
	} );
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
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0].elements).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// ------------------------------------------------------------------------------------------------
// minMatrixb.js
// version 0.0.2
// Copyright (c) doxas
// ------------------------------------------------------------------------------------------------

function matIV(){
	this.create = function(){
		return new Float32Array(16);
	};
	this.identity = function(dest){
		dest[0]  = 1; dest[1]  = 0; dest[2]  = 0; dest[3]  = 0;
		dest[4]  = 0; dest[5]  = 1; dest[6]  = 0; dest[7]  = 0;
		dest[8]  = 0; dest[9]  = 0; dest[10] = 1; dest[11] = 0;
		dest[12] = 0; dest[13] = 0; dest[14] = 0; dest[15] = 1;
		return dest;
	};
	this.multiply = function(mat1, mat2, dest){
		var a = mat1[0],  b = mat1[1],  c = mat1[2],  d = mat1[3],
			e = mat1[4],  f = mat1[5],  g = mat1[6],  h = mat1[7],
			i = mat1[8],  j = mat1[9],  k = mat1[10], l = mat1[11],
			m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15],
			A = mat2[0],  B = mat2[1],  C = mat2[2],  D = mat2[3],
			E = mat2[4],  F = mat2[5],  G = mat2[6],  H = mat2[7],
			I = mat2[8],  J = mat2[9],  K = mat2[10], L = mat2[11],
			M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
		dest[0] = A * a + B * e + C * i + D * m;
		dest[1] = A * b + B * f + C * j + D * n;
		dest[2] = A * c + B * g + C * k + D * o;
		dest[3] = A * d + B * h + C * l + D * p;
		dest[4] = E * a + F * e + G * i + H * m;
		dest[5] = E * b + F * f + G * j + H * n;
		dest[6] = E * c + F * g + G * k + H * o;
		dest[7] = E * d + F * h + G * l + H * p;
		dest[8] = I * a + J * e + K * i + L * m;
		dest[9] = I * b + J * f + K * j + L * n;
		dest[10] = I * c + J * g + K * k + L * o;
		dest[11] = I * d + J * h + K * l + L * p;
		dest[12] = M * a + N * e + O * i + P * m;
		dest[13] = M * b + N * f + O * j + P * n;
		dest[14] = M * c + N * g + O * k + P * o;
		dest[15] = M * d + N * h + O * l + P * p;
		return dest;
	};
	this.scale = function(mat, vec, dest){
		dest[0]  = mat[0]  * vec[0];
		dest[1]  = mat[1]  * vec[0];
		dest[2]  = mat[2]  * vec[0];
		dest[3]  = mat[3]  * vec[0];
		dest[4]  = mat[4]  * vec[1];
		dest[5]  = mat[5]  * vec[1];
		dest[6]  = mat[6]  * vec[1];
		dest[7]  = mat[7]  * vec[1];
		dest[8]  = mat[8]  * vec[2];
		dest[9]  = mat[9]  * vec[2];
		dest[10] = mat[10] * vec[2];
		dest[11] = mat[11] * vec[2];
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
		return dest;
	};
	this.translate = function(mat, vec, dest){
		dest[0] = mat[0]; dest[1] = mat[1]; dest[2]  = mat[2];  dest[3]  = mat[3];
		dest[4] = mat[4]; dest[5] = mat[5]; dest[6]  = mat[6];  dest[7]  = mat[7];
		dest[8] = mat[8]; dest[9] = mat[9]; dest[10] = mat[10]; dest[11] = mat[11];
		dest[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8]  * vec[2] + mat[12];
		dest[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9]  * vec[2] + mat[13];
		dest[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
		dest[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
		return dest;
	};
	this.rotate = function(mat, angle, axis, dest){
		var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
		if(!sq){return null;}
		var a = axis[0], b = axis[1], c = axis[2];
		if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
		var d = Math.sin(angle), e = Math.cos(angle), f = 1 - e,
			g = mat[0],  h = mat[1], i = mat[2],  j = mat[3],
			k = mat[4],  l = mat[5], m = mat[6],  n = mat[7],
			o = mat[8],  p = mat[9], q = mat[10], r = mat[11],
			s = a * a * f + e,
			t = b * a * f + c * d,
			u = c * a * f - b * d,
			v = a * b * f - c * d,
			w = b * b * f + e,
			x = c * b * f + a * d,
			y = a * c * f + b * d,
			z = b * c * f - a * d,
			A = c * c * f + e;
		if(angle){
			if(mat != dest){
				dest[12] = mat[12]; dest[13] = mat[13];
				dest[14] = mat[14]; dest[15] = mat[15];
			}
		} else {
			dest = mat;
		}
		dest[0]  = g * s + k * t + o * u;
		dest[1]  = h * s + l * t + p * u;
		dest[2]  = i * s + m * t + q * u;
		dest[3]  = j * s + n * t + r * u;
		dest[4]  = g * v + k * w + o * x;
		dest[5]  = h * v + l * w + p * x;
		dest[6]  = i * v + m * w + q * x;
		dest[7]  = j * v + n * w + r * x;
		dest[8]  = g * y + k * z + o * A;
		dest[9]  = h * y + l * z + p * A;
		dest[10] = i * y + m * z + q * A;
		dest[11] = j * y + n * z + r * A;
		return dest;
	};
	this.lookAt = function(eye, center, up, dest){
		var eyeX    = eye[0],    eyeY    = eye[1],    eyeZ    = eye[2],
			upX     = up[0],     upY     = up[1],     upZ     = up[2],
			centerX = center[0], centerY = center[1], centerZ = center[2];
		if(eyeX == centerX && eyeY == centerY && eyeZ == centerZ){return this.identity(dest);}
		var x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
		z0 = eyeX - center[0]; z1 = eyeY - center[1]; z2 = eyeZ - center[2];
		l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
		z0 *= l; z1 *= l; z2 *= l;
		x0 = upY * z2 - upZ * z1;
		x1 = upZ * z0 - upX * z2;
		x2 = upX * z1 - upY * z0;
		l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
		if(!l){
			x0 = 0; x1 = 0; x2 = 0;
		} else {
			l = 1 / l;
			x0 *= l; x1 *= l; x2 *= l;
		}
		y0 = z1 * x2 - z2 * x1; y1 = z2 * x0 - z0 * x2; y2 = z0 * x1 - z1 * x0;
		l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
		if(!l){
			y0 = 0; y1 = 0; y2 = 0;
		} else {
			l = 1 / l;
			y0 *= l; y1 *= l; y2 *= l;
		}
		dest[0] = x0; dest[1] = y0; dest[2]  = z0; dest[3]  = 0;
		dest[4] = x1; dest[5] = y1; dest[6]  = z1; dest[7]  = 0;
		dest[8] = x2; dest[9] = y2; dest[10] = z2; dest[11] = 0;
		dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
		dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
		dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
		dest[15] = 1;
		return dest;
	};
	this.perspective = function(fovy, aspect, near, far, dest){
		var t = near * Math.tan(fovy * Math.PI / 360);
		var r = t * aspect;
		var a = r * 2, b = t * 2, c = far - near;
		dest[0]  = near * 2 / a;
		dest[1]  = 0;
		dest[2]  = 0;
		dest[3]  = 0;
		dest[4]  = 0;
		dest[5]  = near * 2 / b;
		dest[6]  = 0;
		dest[7]  = 0;
		dest[8]  = 0;
		dest[9]  = 0;
		dest[10] = -(far + near) / c;
		dest[11] = -1;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = -(far * near * 2) / c;
		dest[15] = 0;
		return dest;
	};
	this.ortho = function(left, right, top, bottom, near, far, dest) {
		var h = (right - left);
		var v = (top - bottom);
		var d = (far - near);
		dest[0]  = 2 / h;
		dest[1]  = 0;
		dest[2]  = 0;
		dest[3]  = 0;
		dest[4]  = 0;
		dest[5]  = 2 / v;
		dest[6]  = 0;
		dest[7]  = 0;
		dest[8]  = 0;
		dest[9]  = 0;
		dest[10] = -2 / d;
		dest[11] = 0;
		dest[12] = -(left + right) / h;
		dest[13] = -(top + bottom) / v;
		dest[14] = -(far + near) / d;
		dest[15] = 1;
		return dest;
	};
	this.transpose = function(mat, dest){
		dest[0]  = mat[0];  dest[1]  = mat[4];
		dest[2]  = mat[8];  dest[3]  = mat[12];
		dest[4]  = mat[1];  dest[5]  = mat[5];
		dest[6]  = mat[9];  dest[7]  = mat[13];
		dest[8]  = mat[2];  dest[9]  = mat[6];
		dest[10] = mat[10]; dest[11] = mat[14];
		dest[12] = mat[3];  dest[13] = mat[7];
		dest[14] = mat[11]; dest[15] = mat[15];
		return dest;
	};
	this.inverse = function(mat, dest){
		var a = mat[0],  b = mat[1],  c = mat[2],  d = mat[3],
			e = mat[4],  f = mat[5],  g = mat[6],  h = mat[7],
			i = mat[8],  j = mat[9],  k = mat[10], l = mat[11],
			m = mat[12], n = mat[13], o = mat[14], p = mat[15],
			q = a * f - b * e, r = a * g - c * e,
			s = a * h - d * e, t = b * g - c * f,
			u = b * h - d * f, v = c * h - d * g,
			w = i * n - j * m, x = i * o - k * m,
			y = i * p - l * m, z = j * o - k * n,
			A = j * p - l * n, B = k * p - l * o,
			ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
		dest[0]  = ( f * B - g * A + h * z) * ivd;
		dest[1]  = (-b * B + c * A - d * z) * ivd;
		dest[2]  = ( n * v - o * u + p * t) * ivd;
		dest[3]  = (-j * v + k * u - l * t) * ivd;
		dest[4]  = (-e * B + g * y - h * x) * ivd;
		dest[5]  = ( a * B - c * y + d * x) * ivd;
		dest[6]  = (-m * v + o * s - p * r) * ivd;
		dest[7]  = ( i * v - k * s + l * r) * ivd;
		dest[8]  = ( e * A - f * y + h * w) * ivd;
		dest[9]  = (-a * A + b * y - d * w) * ivd;
		dest[10] = ( m * u - n * s + p * q) * ivd;
		dest[11] = (-i * u + j * s - l * q) * ivd;
		dest[12] = (-e * z + f * x - g * w) * ivd;
		dest[13] = ( a * z - b * x + c * w) * ivd;
		dest[14] = (-m * t + n * r - o * q) * ivd;
		dest[15] = ( i * t - j * r + k * q) * ivd;
		return dest;
	};
}

function qtnIV(){
	this.create = function(){
		return new Float32Array(4);
	};
	this.identity = function(dest){
		dest[0] = 0; dest[1] = 0; dest[2] = 0; dest[3] = 1;
		return dest;
	};
	this.inverse = function(qtn, dest){
		dest[0] = -qtn[0];
		dest[1] = -qtn[1];
		dest[2] = -qtn[2];
		dest[3] =  qtn[3];
		return dest;
	};
	this.normalize = function(dest){
		var x = dest[0], y = dest[1], z = dest[2], w = dest[3];
		var l = Math.sqrt(x * x + y * y + z * z + w * w);
		if(l === 0){
			dest[0] = 0;
			dest[1] = 0;
			dest[2] = 0;
			dest[3] = 0;
		}else{
			l = 1 / l;
			dest[0] = x * l;
			dest[1] = y * l;
			dest[2] = z * l;
			dest[3] = w * l;
		}
		return dest;
	};
	this.multiply = function(qtn1, qtn2, dest){
		var ax = qtn1[0], ay = qtn1[1], az = qtn1[2], aw = qtn1[3];
		var bx = qtn2[0], by = qtn2[1], bz = qtn2[2], bw = qtn2[3];
		dest[0] = ax * bw + aw * bx + ay * bz - az * by;
		dest[1] = ay * bw + aw * by + az * bx - ax * bz;
		dest[2] = az * bw + aw * bz + ax * by - ay * bx;
		dest[3] = aw * bw - ax * bx - ay * by - az * bz;
		return dest;
	};
	this.rotate = function(angle, axis, dest){
		var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
		if(!sq){return null;}
		var a = axis[0], b = axis[1], c = axis[2];
		if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
		var s = Math.sin(angle * 0.5);
		dest[0] = a * s;
		dest[1] = b * s;
		dest[2] = c * s;
		dest[3] = Math.cos(angle * 0.5);
		return dest;
	};
	this.toVecIII = function(vec, qtn, dest){
		var qp = this.create();
		var qq = this.create();
		var qr = this.create();
		this.inverse(qtn, qr);
		qp[0] = vec[0];
		qp[1] = vec[1];
		qp[2] = vec[2];
		this.multiply(qr, qp, qq);
		this.multiply(qq, qtn, qr);
		dest[0] = qr[0];
		dest[1] = qr[1];
		dest[2] = qr[2];
		return dest;
	};
	this.toMatIV = function(qtn, dest){
		var x = qtn[0], y = qtn[1], z = qtn[2], w = qtn[3];
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;
		dest[0]  = 1 - (yy + zz);
		dest[1]  = xy - wz;
		dest[2]  = xz + wy;
		dest[3]  = 0;
		dest[4]  = xy + wz;
		dest[5]  = 1 - (xx + zz);
		dest[6]  = yz - wx;
		dest[7]  = 0;
		dest[8]  = xz - wy;
		dest[9]  = yz + wx;
		dest[10] = 1 - (xx + yy);
		dest[11] = 0;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = 0;
		dest[15] = 1;
		return dest;
	};
	this.slerp = function(qtn1, qtn2, time, dest){
		var ht = qtn1[0] * qtn2[0] + qtn1[1] * qtn2[1] + qtn1[2] * qtn2[2] + qtn1[3] * qtn2[3];
		var hs = 1.0 - ht * ht;
		if(hs <= 0.0){
			dest[0] = qtn1[0];
			dest[1] = qtn1[1];
			dest[2] = qtn1[2];
			dest[3] = qtn1[3];
		}else{
			hs = Math.sqrt(hs);
			if(Math.abs(hs) < 0.0001){
				dest[0] = (qtn1[0] * 0.5 + qtn2[0] * 0.5);
				dest[1] = (qtn1[1] * 0.5 + qtn2[1] * 0.5);
				dest[2] = (qtn1[2] * 0.5 + qtn2[2] * 0.5);
				dest[3] = (qtn1[3] * 0.5 + qtn2[3] * 0.5);
			}else{
				var ph = Math.acos(ht);
				var pt = ph * time;
				var t0 = Math.sin(ph - pt) / hs;
				var t1 = Math.sin(pt) / hs;
				dest[0] = qtn1[0] * t0 + qtn2[0] * t1;
				dest[1] = qtn1[1] * t0 + qtn2[1] * t1;
				dest[2] = qtn1[2] * t0 + qtn2[2] * t1;
				dest[3] = qtn1[3] * t0 + qtn2[3] * t1;
			}
		}
		return dest;
	};
}

function torus(row, column, irad, orad, color){
	var pos = new Array(), nor = new Array(),
	    col = new Array(), st  = new Array(), idx = new Array();
	for(var i = 0; i <= row; i++){
		var r = Math.PI * 2 / row * i;
		var rr = Math.cos(r);
		var ry = Math.sin(r);
		for(var ii = 0; ii <= column; ii++){
			var tr = Math.PI * 2 / column * ii;
			var tx = (rr * irad + orad) * Math.cos(tr);
			var ty = ry * irad;
			var tz = (rr * irad + orad) * Math.sin(tr);
			var rx = rr * Math.cos(tr);
			var rz = rr * Math.sin(tr);
			if(color){
				var tc = color;
			}else{
				tc = hsva(360 / column * ii, 1, 1, 1);
			}
			var rs = 1 / column * ii;
			var rt = 1 / row * i + 0.5;
			if(rt > 1.0){rt -= 1.0;}
			rt = 1.0 - rt;
			pos.push(tx, ty, tz);
			nor.push(rx, ry, rz);
			col.push(tc[0], tc[1], tc[2], tc[3]);
			st.push(rs, rt);
		}
	}
	for(i = 0; i < row; i++){
		for(ii = 0; ii < column; ii++){
			r = (column + 1) * i + ii;
			idx.push(r, r + column + 1, r + 1);
			idx.push(r + column + 1, r + column + 2, r + 1);
		}
	}
	return {p : pos, n : nor, c : col, t : st, i : idx};
}

function sphere(row, column, rad, color){
	var pos = new Array(), nor = new Array(), col = new Array(),
			st  = new Array(), num = new Array(), idx = new Array();
	for(var i = 0; i <= row; i++){
		var r = Math.PI / row * i;
		var ry = Math.cos(r);
		var rr = Math.sin(r);
		for(var ii = 0; ii <= column; ii++){
			var tr = Math.PI * 2 / column * ii;
			var tx = rr * rad * Math.cos(tr);
			var ty = ry * rad;
			var tz = rr * rad * Math.sin(tr);
			var rx = rr * Math.cos(tr);
			var rz = rr * Math.sin(tr);
			if(color){
				var tc = color;
			}else{
				tc = hsva(360 / row * i, 1, 1, 1);
			}
			pos.push(tx, ty, tz);
			nor.push(rx, ry, rz);
			col.push(tc[0], tc[1], tc[2], tc[3]);
			st.push(1 - 1 / column * ii, 1 / row * i);
			num.push(i * row + ii + 1);
		}
	}
	r = 0;
	for(i = 0; i < row; i++){
		for(ii = 0; ii < column; ii++){
			r = (column + 1) * i + ii;
			idx.push(r, r + 1, r + column + 2);
			idx.push(r, r + column + 2, r + column + 1);
		}
	}
	return {p: pos, n: nor, c: col, t: st, num: num, i: idx};
}

function line(length, color){
	var position = [], col = [], index = [];
	var lineX = Math.random() * 10 - 5,
			lineY = Math.random() * 10 - 5,
			lineZ = Math.random() * 10 - 5,
			vecX = Math.random() * 2 - 1,
			vecY = Math.random() * 2 - 1,
			vecZ = Math.random() * 2 - 1,
			surfaceX = 5.0 * vecX / Math.abs(vecX),
			surfaceY = 5.0 * vecY / Math.abs(vecY),
			surfaceZ = 5.0 * vecZ / Math.abs(vecZ),
			percentage = 1.0;
	position.push(lineX, lineY, lineZ);
	for(var i = 0; i < length; i++){
		percentage_x = (-lineX + surfaceX)/ vecX;
		if(percentage_x < 1.0 && percentage_x > 0){
			percentage = percentage_x;
		};
		percentage_y = (-lineY + surfaceY)/ vecY / percentage;
		if(percentage_y < 1.0 && percentage_y > 0){
			percentage = percentage_y;
		};
		percentage_z = (-lineZ + surfaceZ)/ vecZ / percentage;
		if(percentage_z < 1.0 && percentage_z > 0){
			percentage = percentage_z;
		};
		lineX += vecX * percentage;
		lineY += vecY * percentage;
		lineZ += vecZ * percentage;
		percentage = 1.0;
		if (Math.abs(lineX) > 5.0){
			lineX = surfaceX;
		};
		if (Math.abs(lineY) > 5.0){
			lineY = surfaceY;
		};
		if (Math.abs(lineZ) > 5.0){
			lineZ = surfaceZ;
		};
		position.push(lineX, lineY, lineZ);
		index.push(i, i + 1);
		// if(lineX == surfaceX && lineY == surfaceY && lineZ == surfaceZ){
		// 	break;
		// };
	};
	for(var i = 0; i < position.length / 3; i++){
		col.push(color[0], color[1], color[2], color[3]);
	}
	return {p: position, c:col, i: index};
}

function particle(row, column, rad, color, x, y, z){
	var pos = new Array(), nor = new Array(), col = new Array(),
			st  = new Array(), num = new Array(), idx = new Array();
	for(var i = 0; i <= row; i++){
		var r = Math.PI / row * i;
		var ry = Math.cos(r);
		var rr = Math.sin(r);
		for(var ii = 0; ii <= column; ii++){
			var tr = Math.PI * 2 / column * ii;
			var tx = rr * rad * Math.cos(tr) + x;
			var ty = ry * rad + y;
			var tz = rr * rad * Math.sin(tr) + z;
			var rx = rr * Math.cos(tr);
			var rz = rr * Math.sin(tr);
			if(color){
				var tc = color;
			}else{
				tc = hsva(360 / row * i, 1, 1, 1);
			}
			pos.push(tx, ty, tz);
			nor.push(rx, ry, rz);
			col.push(tc[0], tc[1], tc[2], tc[3]);
			st.push(1 - 1 / column * ii, 1 / row * i);
			num.push(i * row + ii + 1);
		}
	}
	r = 0;
	for(i = 0; i < row; i++){
		for(ii = 0; ii < column; ii++){
			r = (column + 1) * i + ii;
			idx.push(r, r + 1, r + column + 2);
			idx.push(r, r + column + 2, r + column + 1);
		}
	}
	return {p: pos, n: nor, c: col, t: st, i: idx};
}

function cube(side, color){
	var hs = side * 0.5;
	var pos = [
		-hs, -hs,  hs,  hs, -hs,  hs,  hs,  hs,  hs, -hs,  hs,  hs,
		-hs, -hs, -hs, -hs,  hs, -hs,  hs,  hs, -hs,  hs, -hs, -hs,
		-hs,  hs, -hs, -hs,  hs,  hs,  hs,  hs,  hs,  hs,  hs, -hs,
		-hs, -hs, -hs,  hs, -hs, -hs,  hs, -hs,  hs, -hs, -hs,  hs,
		 hs, -hs, -hs,  hs,  hs, -hs,  hs,  hs,  hs,  hs, -hs,  hs,
		-hs, -hs, -hs, -hs, -hs,  hs, -hs,  hs,  hs, -hs,  hs, -hs
	];
	var nor = [
		-1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
		-1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,
		-1.0, -1.0, -1.0,  1.0, -1.0, -1.0,  1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
		 1.0, -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0
	];
	var col = new Array();
	for(var i = 0; i < pos.length / 3; i++){
		if(color){
			var tc = color;
		}else{
			tc = hsva(360 / pos.length / 3 * i, 1, 1, 1);
		}
		col.push(tc[0], tc[1], tc[2], tc[3]);
	}
	var st = [
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
	];
	var idx = [
		 0,  1,  2,  0,  2,  3,
		 4,  5,  6,  4,  6,  7,
		 8,  9, 10,  8, 10, 11,
		12, 13, 14, 12, 14, 15,
		16, 17, 18, 16, 18, 19,
		20, 21, 22, 20, 22, 23
	];
	return {p : pos, n : nor, c : col, t : st, i : idx};
}

function cubeLine(side, color){
	var hs = side * 0.5;
	var pos = [
		-hs, -hs,  hs,  hs, -hs,  hs,  hs,  hs,  hs, -hs,  hs,  hs,
		-hs, -hs, -hs, -hs,  hs, -hs,  hs,  hs, -hs,  hs, -hs, -hs,
		-hs,  hs, -hs, -hs,  hs,  hs,  hs,  hs,  hs,  hs,  hs, -hs,
		-hs, -hs, -hs,  hs, -hs, -hs,  hs, -hs,  hs, -hs, -hs,  hs,
		 hs, -hs, -hs,  hs,  hs, -hs,  hs,  hs,  hs,  hs, -hs,  hs,
		-hs, -hs, -hs, -hs, -hs,  hs, -hs,  hs,  hs, -hs,  hs, -hs
	];
	var nor = [
		-1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
		-1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,
		-1.0, -1.0, -1.0,  1.0, -1.0, -1.0,  1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
		 1.0, -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0
	];
	var col = new Array();
	for(var i = 0; i < pos.length / 3; i++){
		if(color){
			var tc = color;
		}else{
			tc = hsva(360 / pos.length / 3 * i, 1, 1, 1);
		}
		col.push(tc[0], tc[1], tc[2], tc[3]);
	}
	var st = [
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
	];
	var idx = [
		 2,  3,  0,  3, 
		 4,  5,  6,  7,
		10, 11,  8, 11,
		12, 13, 14, 15,
		18, 19, 16, 19,
		20, 21, 22, 23
	];
	return {p : pos, n : nor, c : col, t : st, i : idx};
}

function cubeLattice(side, color, division){
	var hs = side * 0.5,
			inter = hs / division;
	var pos = new Array();
	for(var i = 0; i < division + 1; i++){
		for(var j = 0; j < division + 1; j++){
			for(var k = 0; k < division + 1; k++){
				if(i == 0){
					pos.push(inter * k - hs, inter * j - hs, inter * i - hs);
				}
			}
		}
	}

	var col = new Array();
	for(var i = 0; i < pos.length; i++){
		col.push(color[0]. color[1], color[2], color[3]);
	}

	var idx = new Array();
	for()
}

function hsva(h, s, v, a){
	if(s > 1 || v > 1 || a > 1){return;}
	var th = h % 360;
	var i = Math.floor(th / 60);
	var f = th / 60 - i;
	var m = v * (1 - s);
	var n = v * (1 - s * f);
	var k = v * (1 - s * (1 - f));
	var color = new Array();
	if(!s > 0 && !s < 0){
		color.push(v, v, v, a); 
	} else {
		var r = new Array(v, n, m, m, k, v);
		var g = new Array(k, v, v, n, m, m);
		var b = new Array(m, m, k, v, v, n);
		color.push(r[i], g[i], b[i], a);
	}
	return color;
}
;
// ------------------------------------------------------------------------------------------------
// objson.js
// version 0.0.1
// Copyright (c) doxas
// ------------------------------------------------------------------------------------------------

function objsonConvert(source){
	source = source.replace(/^#[\x20-\x7e]+\s$/gm, '');
	source = source.replace(/^g[\x20-\x7e]+\s$/gm, '');
	source = source.replace(/^g\s$/gm, '');
	source = source.replace(/\x20{2,}/gm, '\x20');
	source = source.replace(/^\s/gm, '');
	var rows = source.match(/[\x20-\x7e]+\s/gm);
	var i, j, k, l;
	var a, b, c, d;
	var len, dest, fNormal;
	var pos = 0;
	var nor = 0;
	var tex = 0;
	var position = [];
	var normal   = [];
	var texCoord = [];
	var vertex   = [];
	var index    = [];
	var indices  = [];
	for(i = 0, len = rows.length; i < len; i++){
		switch(rows[i].substr(0, 2)){
			case 'v ':
				a = rows[i].match(/-?[\d\.]+(e(?=-)?|e(?=\+)?)?[-\+\d\.]*/g);
				if(vertex[pos] == null){
					vertex[pos] = new objsonVertexData();
					vertex[pos].faceIndex = [];
				}
				vertex[pos].position = [a[0], a[1], a[2]];
				pos++;
				break;
			case 'vn':
				a = rows[i].match(/-?[\d\.]+(e(?=-)?|e(?=\+)?)?[-\+\d\.]*/g);
				if(vertex[nor] == null){
					vertex[nor] = new objsonVertexData();
					vertex[nor].faceIndex = [];
				}
				vertex[nor].normal = [a[0], a[1], a[2]];
				nor++;
				break;
			case 'vt':
				a = rows[i].match(/-?[\d\.]+(e(?=-)?|e(?=\+)?)?[-\+\d\.]*/g);
				if(vertex[tex] == null){
					vertex[tex] = new objsonVertexData();
					vertex[tex].faceIndex = [];
				}
				vertex[tex].texCoord = [a[0], a[1]];
				tex++;
				break;
			case 'f ':
				a = rows[i].match(/[\d\/]+/g);
				index.push(a[0], a[1], a[2]);
				if(a.length > 3){
					index.push(a[2], a[3], a[0]);
				}
				break;
			default :
				break;
		}
	}
	if(nor === 0){
		j = index.length / 3;
		fNormal = new Array(j);
		for(i = 0; i < j; i++){
			a = index[i * 3    ].split(/\//);
			b = index[i * 3 + 1].split(/\//);
			c = index[i * 3 + 2].split(/\//);
			fNormal[i] = faceNormal(vertex[a[0] - 1].position, vertex[b[0] - 1].position, vertex[c[0] - 1].position);
			vertex[a[0] - 1].faceIndex.push(i);
			vertex[b[0] - 1].faceIndex.push(i);
			vertex[c[0] - 1].faceIndex.push(i);
		}
		for(i = 0; i < pos; i++){
			a = [0.0, 0.0, 0.0];
			b = vertex[i].faceIndex;
			k = b.length;
			for(j = 0; j < k; j++){
				a[0] += parseFloat(fNormal[b[j]][0]);
				a[1] += parseFloat(fNormal[b[j]][1]);
				a[2] += parseFloat(fNormal[b[j]][2]);
			}
			vertex[i].normal = vec3Normalize(a);
		}
	}
	for(i = 0, len = index.length; i < len; i++){
		j = Math.floor(i / 3);
		a = index[i].split(/\//);
		k = a[0] - 1;
		if(indices[k] == null){
			indices[k] = new objsonVertexData();
			indices[k].position = k;
		}
		if(a[2] != null){
			if(a[2] !== ''){
				if(indices[k].normal == null){
					indices[k].normal = a[2] - 1;
				}else{
					if(indices[k].normal !== a[2] - 1){
						indices[pos] = new objsonVertexData();
						indices[pos].position = k;
						indices[pos].normal = a[2] - 1;
						k = pos;
						pos++;
					}
				}
			}
		}
		if(a[1] != null){
			if(a[1] !== ''){
				if(indices[k].texCoord == null){
					indices[k].texCoord = a[1] - 1;
				}else{
					if(indices[k].texCoord !== a[1] - 1){
						indices[pos] = new objsonVertexData();
						indices[pos].position = a[0] - 1;
						if(a[2] != null){
							if(a[2] !== ''){
								indices[pos].normal = a[2] - 1;
							}
						}
						indices[pos].texCoord = a[1] - 1;
						k = pos;
						pos++;
					}
				}
			}
		}
		index[i] = k;
	}
	for(i = 0, len = indices.length; i < len; i++){
		a = indices[i];
		b = []; c = []; d = [];
		if(a != null){
			k = a.position;
			b = vertex[k].position;
			position[i * 3]     = b[0];
			position[i * 3 + 1] = b[1];
			position[i * 3 + 2] = b[2];
			if(nor > 0){k = a.normal;}
			c = vertex[k].normal;
			normal[i * 3]     = c[0];
			normal[i * 3 + 1] = c[1];
			normal[i * 3 + 2] = c[2];
			if(tex > 0){
				k = a.texCoord;
				d = vertex[k].texCoord;
				texCoord[i * 2]     = d[0];
				texCoord[i * 2 + 1] = d[1];
			}
		}else{
			b = vertex[i].position;
			position[i * 3]     = b[0];
			position[i * 3 + 1] = b[1];
			position[i * 3 + 2] = b[2];
			c = vertex[i].normal;
			normal[i * 3]     = c[0];
			normal[i * 3 + 1] = c[1];
			normal[i * 3 + 2] = c[2];
			if(tex > 0){
				d = vertex[i].texCoord;
				texCoord[i * 2]     = d[0];
				texCoord[i * 2 + 1] = d[1];
			}
		}
	}
	dest = '{';
	dest += '"vertex":' + indices.length;
	dest += ',"face":' + index.length / 3;
	dest += ',"position":[' + position.join(',') + ']';
	dest += ',"normal":[' + normal.join(',') + ']';
	if(tex > 0){dest += ',"texCoord":[' + texCoord.join(',') + ']';}
	dest += ',"index":[' + index.join(',') + ']';
	dest += '}';
	return dest;
}

function objsonVertexData(){
	this.position = null;
	this.normal   = null;
	this.texCoord = null;
	this.faceIndex = null;
}

function vec3Normalize(v, d){
	var e, dig;
	var n = [0.0, 0.0, 0.0];
	var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	if(l > 0){
		if(!d){dig = 5;}else{dig = d;}
		e = 1.0 / l;
		n[0] = (v[0] * e).toFixed(dig);
		n[1] = (v[1] * e).toFixed(dig);
		n[2] = (v[2] * e).toFixed(dig);
	}
	return n;
}

function faceNormal(v0, v1, v2){
	var n = [];
	var vec1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
	var vec2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
	n[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1];
	n[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2];
	n[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0];
	return vec3Normalize(n);
}
;
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */


WebGLUtils = function() {

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
        '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
  return '' +
    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    '<td align="center">' +
    '<div style="display: table-cell; vertical-align: middle;">' +
    '<div style="">' + msg + '</div>' +
    '</div>' +
    '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @param {function:(msg)} opt_onError An function to call
 *     if there is an error during creation.
 * @return {WebGLRenderingContext} The created context.
 */
var setupWebGL = function(canvas, opt_attribs, opt_onError) {
  function handleCreationError(msg) {
      var container = document.getElementsByTagName("body")[0];
    //var container = canvas.parentNode;
    if (container) {
      var str = window.WebGLRenderingContext ?
           OTHER_PROBLEM :
           GET_A_WEBGL_BROWSER;
      if (msg) {
        str += "<br/><br/>Status: " + msg;
      }
      container.innerHTML = makeFailHTML(str);
    }
  };

  opt_onError = opt_onError || handleCreationError;

  if (canvas.addEventListener) {
    canvas.addEventListener("webglcontextcreationerror", function(event) {
          opt_onError(event.statusMessage);
        }, false);
  }
  var context = create3DContext(canvas, opt_attribs);
  if (!context) {
    if (!window.WebGLRenderingContext) {
      opt_onError("");
    } else {
      opt_onError("");
    }
  }

  return context;
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
var create3DContext = function(canvas, opt_attribs) {
  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs);
    } catch(e) {}
    if (context) {
      break;
    }
  }
  return context;
}

return {
  create3DContext: create3DContext,
  setupWebGL: setupWebGL
};
}();

/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
             window.setTimeout(callback, 1000/60);
           };
  })();
}

/** * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec. 
 * 
 * Cancels an animation frame request. 
 * Checks for cross-browser support, falls back to clearTimeout. 
 * @param {number}  Animation frame request. */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}
;
/*---------- myGlsl.js -------------------------------
 プログラムオブジェクト(シェーダプログラム）を生成する．
 gl : GLコンテキスト
 vs_source : 頂点シェーダのプログラム(文字列)
 fs_source : フラグメントシェーダのプログラム(文字列)
 プログラムオブジェクトprogramを生成し,成功したらtrueを返す
------------------------------------------------------*/


function initGlsl(gl, vs_source, fs_source) 
{
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  
  gl.shaderSource(vertexShader, vs_source);
  gl.shaderSource(fragmentShader, fs_source);

  // シェーダをコンパイルする
  gl.compileShader(vertexShader);
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      alert(gl.getShaderInfoLog(vertexShader) + "in vertexShader");
      return null;
    }
  gl.compileShader(fragmentShader);
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      alert(gl.getShaderInfoLog(fragmentShader) + "in fragmentShader");
      return null;
    }

  //プログラムオブジェクトの作成
  var program = gl.createProgram();
  if (!program) 
  {
    alert("プログラムオブジェクトの作成に失敗");
    return false;
  }
  // シェーダオブジェクトを設定する
  gl.attachShader(program, vertexShader);

  gl.attachShader(program, fragmentShader);

  // プログラムオブジェクトをリンクする
  gl.linkProgram(program);

  // リンク結果をチェックする
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) 
  {
    var error = gl.getProgramInfoLog(program);
    alert('プログラムオブジェクトのリンクに失敗 ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return false;
  }  
  gl.useProgram(program);
  gl.program = program;
  return true;
}
;
//-------------------------------------------------------
//  swgSupport.js
//  光源，カメラ，視体積，マウス操作等のパラメータや関数を定義
//------------------------------------------------------------------

//光源
function Light()
{
  this.pos = [50.0, 0.0, 100.0, 1.0];//w=1:点光源，w=0:平行光源(光源方向）
  this.color = [1.0, 1.0, 1.0, 1.0];//拡散光・環境光・鏡面光みな同じ
  this.attenuation = [1.0, 0.0, 0.0];//一定減衰率,1次減衰率,2次減衰率
  this.spotCnt = [0.0, 0.0, 0.0];//スポット光源が照射される中心位置（スポット中心）
  this.spotCutoff = 30.0;//スポットライト・カットオフ
  this.spotExponent = 10.0;//スポットライト指数
};
//---------------------------------------------------
//カメラと視体積
function Camera() 
{
  //カメラ
  this.pos = [100.0, 0.0, 0.0];//位置（視点）
  this.cnt = [0.0, 0.0, 0.0];//注視点
  this.dist= 100.0; //注視点から視点までの距離(R)
  this.theta = 10.0;//仰角（水平面との偏角θ）
  this.phi = 0.0;  //方位角（φ）
  //視体積
  this.fovy = 40.0;//視野角
  this.near = 1.0; //前方クリップ面(近平面)
  this.far = 200.0;//後方クリップ面(遠平面)
  this.delta =5;// 0.02;//距離増分
};

Camera.prototype.getPos = function()
{
  this.pos[0] = this.cnt[0] + this.dist * Math.cos(DEG_TO_RAD * this.theta) * Math.cos(DEG_TO_RAD * this.phi);//x
  this.pos[1] = this.cnt[1] + this.dist * Math.cos(DEG_TO_RAD * this.theta) * Math.sin(DEG_TO_RAD * this.phi);//y
  this.pos[2] = this.cnt[2] + this.dist * Math.sin(DEG_TO_RAD * this.theta);//z
}
//----------------------------------------------------
//マウスによるカメラ操作
function mouseOperation(canvas, camera)
{
  var xStart, yStart;
  var flagMouse = false;
//  var flagMove = false;
  var rect;

  canvas.onmousedown = function(ev)
  {
    //Web page左上からの距離
    var x = ev.clientX; // マウスポインタのx座標
    var y = ev.clientY; // マウスポインタのy座標
    var wid = 30;
    var dd = camera.delta;//5;//0.2;//距離増分
    rect = ev.target.getBoundingClientRect() ;//Web page左上を原点にしたピクセル単位のcanvas領域

    if(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) 
    {//canvas外
      flagMouse = false;  return; 
    }
      
    xStart = x; yStart = y;
    flagMouse = true;
	  
　  if(x > rect.left && x < rect.left + wid && y > rect.top && y < rect.top + wid)//canvasの左上
    {//dolly
      camera.dist -= dd;//近づく
    }
    else if(x > rect.right - wid && x < rect.right && y > rect.top && y < rect.top +wid)//右上
    {//dolly
      camera.dist += dd;//遠ざかる
    }
   
    else if(y > rect.top + canvas.height/2 - wid && y < rect.top + canvas.height/2 + wid)
    {//pan
      if(x > rect.left && x < rect.left + wid ) camera.phi -= 1.0;//真左
      else if(x > rect.right - wid && x < rect.right) camera.phi += 1.0;//真右  
      camera.cnt[0] = camera.pos[0] - camera.dist * Math.cos(DEG_TO_RAD * camera.phi) * Math.cos(DEG_TO_RAD * camera.theta);
	  camera.cnt[1] = camera.pos[1] - camera.dist * Math.sin(DEG_TO_RAD * camera.phi) * Math.cos(DEG_TO_RAD * camera.theta);
    }
    else if(x > rect.left + canvas.width/2 - wid && x < rect.left + canvas.width/2 + wid)
    {//tilt
      if(y < rect.top + wid ) camera.theta += 1.0;//真上
	  else if(y > rect.bottom - wid) camera.theta -= 1.0;//真下
	  
      camera.cnt[0] = camera.pos[0] - camera.dist * Math.cos(DEG_TO_RAD * camera.theta) * Math.cos(DEG_TO_RAD * camera.phi);
      camera.cnt[1] = camera.pos[1] - camera.dist * Math.cos(DEG_TO_RAD * camera.theta) * Math.sin(DEG_TO_RAD * camera.phi);
      camera.cnt[2] = camera.pos[2] - camera.dist * Math.sin(DEG_TO_RAD * camera.theta);
    }    
    else if(x > rect.left && x < rect.left + wid && y > rect.bottom - wid && y < rect.bottom)//左した
    {
      camera.fovy -= 1.0;//zoom in
    }
    else if(x > rect.right - wid && x < rect.right && y > rect.bottom - wid && y < rect.bottom)//右下
    {
      camera.fovy += 1.0;//zoom out
    }
    camera.getPos();
    display();
  }

  canvas.onmouseup = function(ev)
  {
    flagMouse = false;
  }
  canvas.onmousemove = function(ev)
  {
    if(!flagMouse) return;
    //Web page左上からの距離
    var x = ev.clientX; // マウスポインタのx座標
    var y = ev.clientY; // マウスポインタのy座標
    var dd = 0.2;//距離増分
    rect = ev.target.getBoundingClientRect() ;//Web page左上を原点にしたピクセル単位のcanvas領域
  
    if(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom){ flagMouse = false; return;}//canvas外
	
    if(y < rect.top + canvas.height / 2) camera.phi += dd * (x - xStart) ;//tumble
    else camera.phi -= dd * (x - xStart) ;//tumble

    camera.theta += dd * (y - yStart) ;//crane

    camera.getPos();
    display();
    xStart = x;
    yStart = y;
  }
}
;
//自作の数学ライブラリ
//3次元ベクトル、3×3行列、クォータニオン、乱数
//swgMath.js

var flagQuaternion = true;
var DEG_TO_RAD = Math.PI / 180.0;
var RAD_TO_DEG = 180.0 / Math.PI;

/******************************************************
  3次元ベクトル
*******************************************************/
//コンストラクタ
function Vector3(x, y, z) 
{
  if(typeof x === 'number' && typeof y === 'number' && typeof z === 'number' )
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  else
  {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
}
//---------------------------------------------
Vector3.prototype.copy = function(v)
{
  if(typeof v === 'object')
  {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  }
  else
  {
    console.log("Vector3 ERROR --- copy()の 引数がベクトルでない！");
  }
}
//---------------------------------------------------
//ベクトル加算
Vector3.prototype.add = function(v)
{
  if(typeof v === 'object')
  {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  else
  {
    console.log("Vector3 ERROR --- add()の 引数がベクトルでない！");
  }
}
//------------------------------------------------------
//ベクトルの加算
//引数のベクトル自身は変化しない
function add(a, b)
{
  if(typeof a === 'object' && typeof b === 'object')
  {
    var c = new Vector3(a.x, a.y, a.z);
    c.add(b);
    return c;
  }
  else 
  {
    console.log("Vector3 ERROR --- add()の 引数がベクトルでない！");
  }
}
//--------------------------------------------------------
//ベクトルの減算
Vector3.prototype.sub = function(v)
{
  if(typeof v === 'object')
  {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
  else
  {
    console.log("Vector3 ERROR --- sub()の 引数がベクトルでない！");
  }
}
//----------------------------------------------------------
//ベクトルの減算
//引数のベクトル自身は変化しない
function sub(a, b)
{

  if(typeof a === 'object' && typeof b === 'object')
  {
    var c = new Vector3(a.x, a.y, a.z);
    c.sub(b);
    return c;
  }
  else
  {
    console.log("Vector3 ERROR --- sub()の 引数がベクトルでない！");
  }
}
//----------------------------------------------------------
//ベクトルの乗算
Vector3.prototype.mul = function(a)
{
  if(typeof a === 'number')//スカラ乗算
  {//scalar
    this.x *= a;
    this.y *= a;
    this.z *= a;
  }
  else if(typeof a == 'object')//ベクトルどうしの乗算
  {
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
  }
}
//----------------------------------------------------------
//ベクトルの乗算
//引数のベクトル自身は変化しない
function mul(a, b)
{
  if(typeof a === 'number' && typeof b === 'object')
  {
    var c = new Vector3(b.x, b.y, b.z);
    c.mul(a);
  }
  else if(typeof a === 'object' && typeof b === 'number')
  {
    var c = new Vector3(a.x, a.y, a.z);
    c.mul(b);
  }
  else if(typeof a === 'object' && typeof b === 'object')//ベクトルどうしの乗算
  {
    var c = new Vector3();
    c.x = a.x * b.x;
    c.y = a.y * b.y;
    c.z = a.z * b.z;
  }
  return c;
}
//------------------------------------------------------------
//スカラ除算
Vector3.prototype.div = function(s)
{
  if(typeof s === 'number' && s != 0)//スカラ除算
  {
    this.x /= s;
    this.y /= s;
    this.z /= s;
  }
  else
  {
    console.log("Vector3 ERROR --- div()の 引数がスカラでない，または0です！");
  }
}
//-------------------------------------------------------------
//スカラ除算
//引数自身は変化しない
function div(a, s)
{
  if(typeof a === 'object' && typeof s === 'number')
  {
    var c = new Vector3(a.x, a.y, a.z);
    c.div(s);
    return c;
  }
  else
  {
    console.log("Vector3 ERROR --- div()の 引数が間違い！");
  }
}
//-------------------------------------------------------------
//ベクトルの大きさ
function mag(v)
{
  var s = v.x * v.x + v.y * v.y + v.z * v.z;
  return Math.sqrt(s);
}
//-------------------------------------------------------------
//ベクトルの大きさの二乗
function mag2(v)
{
  var s = v.x * v.x + v.y * v.y + v.z * v.z;
  return s;
}
//-------------------------------------------------------------
//ベクトル間距離
function distance(a, b)
{
  var c = new Vector3(a.x, a.y, a.z);
  c.sub(b);
  return mag(c);
}
//------------------------------------------------------------
//ベクトル間2乗距離
function distance2(a, b)
{
  var c = new Vector3(a.x, a.y, a.z);
  c.sub(b);
  return mag2(c);
}
//-------------------------------------------------------
//内積
function dot(a, b)
{
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
//-------------------------------------------------------- 
Vector3.prototype.reverse = function()
{
  var x = this.x; var y = this.y; var z = this.z;
  this.x = -x; this.y = -y; this.z = -z;
}
//---------------------------------------------------------
function reverse(v)
{
  if(typeof v !== 'object'){
    console.log("reverse()の引数がベクトルでない　!"); return;
  }
  return new Vector3(-v.x, -v.y, -v.z);
}
//---------------------------------------------------------
//外積
function cross(a, b)
{
  if(typeof a !== 'object' || typeof b !== 'object'){
    console.log("cross()の引数がベクトルでない　!"); return;
  }
  
  var c = new Vector3();
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
}
//--------------------------------------------------------
//自身の単位ベクトル
Vector3.prototype.norm = function()
{
  var eps = 0.000001;
  var x = this.x; var y = this.y; var z = this.z;
  var s = Math.sqrt(x*x + y*y + z*z);
  if(s <= eps) s = 1.0;
  this.x = x/s; this.y = y/s; this.z = z/s;

  if(Math.abs(Math.abs(x) < eps)) this.x = 0.0;
  if(Math.abs(Math.abs(y) < eps)) this.y = 0.0;
  if(Math.abs(Math.abs(z) < eps)) this.z = 0.0;

}
//--------------------------------------------------------
//単位ベクトルを返す。自身は変化しない
function norm(a)
{
  if(typeof a === 'object')
  {
    var b = new Vector3(a.x, a.y, a.z);
    b.norm();
    return b;
  }
  else
  {
    console.log("Vector3 ERROR --- norm()の 引数が間違い！");
  }
}
//--------------------------------------------------------
//単位ベクトルを返す。自身は変化しない
//ｚ成分を0とした正規化
function normXY(a)
{
  if(typeof a === 'object')
  {
    var b = new Vector3();
    b.copy(a);
    b.norm();
    return b;
  }
  else
  {
    console.log("Vector3 ERROR --- norm()の 引数が間違い！");
  }
}
//--------------------------------------------------------
//a->bの単位ベクトルを返す
function direction(a, b)
{
　if(typeof a ==='object' && typeof b === 'object')
  {
    var c = new Vector3();
    c.copy(b);
    c.sub(a);
    c.norm();
    return c;
  }
  else
  {
    console.log("Vector3 ERROR --- direction()の 引数が間違い！");
  }
}
  
//---------------------------------------------------------
//x軸回転後のベクトルを返す(自身が変化する）
Vector3.prototype.rotX_deg = function(ang)
{//ang:deg
  var y = this.y; var z = this.z;

  this.y = y * Math.cos(DEG_TO_RAD * ang) - z * Math.sin(DEG_TO_RAD * ang);
  this.z = y * Math.sin(DEG_TO_RAD * ang) + z * Math.cos(DEG_TO_RAD * ang);
}
//---------------------------------------------------------
//y軸回転後のベクトルを返す(自身が変化する）
Vector3.prototype.rotY_deg = function(ang)
{
  var x = this.x; var z = this.z;

  this.x =  x * Math.cos(DEG_TO_RAD * ang) + z * Math.sin(DEG_TO_RAD * ang);
  this.z =- x * Math.sin(DEG_TO_RAD * ang) + z * Math.cos(DEG_TO_RAD * ang);
}
//-----------------------------------------------------------
//z軸回転後のベクトルを返す(自身が変化する）
Vector3.prototype.rotZ_deg = function(ang)
{
  var x = this.x; var y = this.y;
  this.x = x * Math.cos(DEG_TO_RAD * ang) - y * Math.sin(DEG_TO_RAD * ang);
  this.y = x * Math.sin(DEG_TO_RAD * ang) + y * Math.cos(DEG_TO_RAD * ang);
}
//------------------------------------------------------------
//ｘ軸回転後のベクトルを返す(自身が変化する）
Vector3.prototype.rotX_rad = function(ang)
{
  var y = this.y; var z = this.z;

  this.y = y * Math.cos(ang) - z * Math.sin(ang);
  this.z = y * Math.sin(ang) + z * Math.cos(ang);
}
//-------------------------------------------------------------
//ｙ軸回転後のベクトルを返す(自身が変化する）
Vector3.prototype.rotY_rad = function(ang)
{
  var x = this.x; var z = this.z;

  this.x =  x * Math.cos(ang) + z * Math.sin(ang);
  this.z =- x * Math.sin(ang) + z * Math.cos(ang);
}
//-------------------------------------------------------------
//ｚ軸回転後のベクトルを返す(自身が変化する）
Vector3.prototype.rotZ_rad = function(ang)
{
  var x = this.x; var y = this.y;
  this.x = x * Math.cos(ang) - y * Math.sin(ang);
  this.y = x * Math.sin(ang) + y * Math.cos(ang);
}
//-------------------------------------------------------------
//ｚ軸回転後のベクトルを返す(自身は変化しない）
function rotZ_rad(a, ang)
{
  var b = new Vector3(a.x, a.y, a.z);
  b.rotZ_rad(ang);
  return b;
}
//-------------------------------------------------------------
//第1引数のベクトルを中心とした回転
Vector3.prototype.rotX_radC = function(a, ang)
{
  var xx, yy, zz;

  xx = this.x ; yy = this.y - a.y; zz = this.z - a.z;
  this.x = xx;
  this.y = yy * Math.cos(ang) - zz * Math.sin(ang) + a.y;
  this.z = yy * Math.sin(ang) + zz * Math.cos(ang) + a.z;
}

//-------------------------------------------------------------
//第1引数のベクトルを中心とした回転
Vector3.prototype.rotY_radC = function(a, ang)
{
  var xx, yy, zz;

  xx = this.x - a.x; yy = this.y; zz = this.z - a.z;
  this.x = xx * Math.cos(ang) + zz * Math.sin(ang) + a.x;
  this.y = yy;
  this.z =-xx * Math.sin(ang) + zz * Math.cos(ang) + a.z;
}
//-------------------------------------------------------------
//第1引数のベクトルを中心とした回転
Vector3.prototype.rotZ_radC = function(a, ang)
{
  var xx, yy, zz;

  xx = this.x - a.x; yy = this.y - a.y; zz = this.z;
  this.x = xx * Math.cos(ang) - yy * Math.sin(ang) + a.x;
  this.y = xx * Math.sin(ang) + yy * Math.cos(ang) + a.y;
  this.z = zz;
}

//-----------------------------------------------------------------
//オイラー角で回転(elrはdeg）
function rotate(v, elr)
{
  v.rotX_deg(elr.x);
  v.rotY_deg(elr.y);
  v.rotZ_deg(elr.z);
  return v;
}

//-------------------------------------------------------------
//ベクトルa,b間の角度(rad)
function getAngle_rad( a, b)
{
  var ang;
  var c = (a.x*b.x+a.y*b.y+a.z*b.z)/(mag(a)*mag(b));
  if(c >= 1.0) ang = 0.0;
  else if (c <= -1.0) ang = Math.PI;
  else ang = Math.acos(c);
  return ang;//rad単位で返す
}

//--------------------------------------------------------------
//ベクトルa,b間の角度(deg)
function getAngle_deg( a, b)
{
  var ang;
  var c = (a.x*b.x+a.y*b.y+a.z*b.z)/(mag(a)*mag(b));
  if(c >= 1.0) ang = 0.0;
  else if (c <= -1.0) ang = Math.PI;
  else ang = Math.acos(c);
  return ang * RAD_TO_DEG;//度単位で返す
}

//---------------------------------------------------------------
//基本姿勢でa->bの軸がｘ軸方向であるオブジェクトのオイラー角(deg)
function getEulerX(a, b)
{
    var cx, cy, cz, len;
    var e = new Vector3();
    cx = b.x - a.x;
    cy = b.y - a.y;
    cz = b.z - a.z;
    len = distance(a, b);
    e.x = 0.0;
    if(cz >= len) e.y = -90.0;
    else if(cz <= -len) e.y = 90.0;
    else e.y = - Math.asin(cz / len) * RAD_TO_DEG;
    if(Math.abs(cx) <= 0.0001 && Math.abs(cy) <= 0.0001) e.z = 0.0;
    else e.z = Math.atan2(cy, cx) * RAD_TO_DEG;
    return e;
}
//-----------------------------------------------------------------
//基本姿勢でa->bの軸がz軸方向であるオブジェクトのオイラー角(deg)
function getEulerZ(a, b)
{
    var cx, cy, cz, len;
    var e = new Vector3();
    cx = b.x - a.x;
    cy = b.y - a.y;
    cz = b.z - a.z;
    len = distance(a, b);
    
    e.z = 0.0;
    if(cy >= len) e.x = -90.0;
    else if(cy <= -len) e.x = 90.0;
    else e.x = -Math.asin(cy / len) * RAD_TO_DEG;
    if(Math.abs(cx) <= 0.0001 && Math.abs(cz) <= 0.0001) e.y = 0.0;
    else e.y = Math.atan2(cx, cz) * RAD_TO_DEG;
    return e;
}

/*****************************************************************
    3×3行列
******************************************************************/
//コンストラクタ（引数が空白であれば単位行列で初期化）
function Matrix3(e0, e1, e2, e3, e4, e5, e6, e7, e8)
{
  this.e = [
     1,0,0, 　
     0,1,0, 
     0,0,1 
  ];

  if(typeof e0 === 'number' && typeof e1 === 'number' && typeof e2 === 'number' &&
     typeof e3 === 'number' && typeof e4 === 'number' && typeof e5 === 'number' &&
     typeof e6 === 'number' && typeof e7 === 'number' && typeof e8 === 'number' )
  {
    this.e[0] = e0; this.e[1] = e1; this.e[2] = e2;
    this.e[3] = e3; this.e[4] = e4; this.e[5] = e5;
    this.e[6] = e6; this.e[7] = e7; this.e[8] = e8;
  }
}
//-----------------------------------------------------------------
//行列要素をセットする。
Matrix3.prototype.set = function(e0, e1, e2, e3, e4, e5, e6, e7, e8) 
{
  this.e[0] = e0;
  this.e[1] = e1;
  this.e[2] = e2;
  this.e[3] = e3;
  this.e[4] = e4;
  this.e[5] = e5;
  this.e[6] = e6;
  this.e[7] = e7;
  this.e[8] = e8;
}
//---------------------------------------------------
// 渡された行列の要素をコピーする。
Matrix3.prototype.copy = function(m) 
{
  var i, s, d;

  s = m.e;
  d = this.e;

  if (s === d) {
    return;
  }
    
  for (i = 0; i < 9; ++i) {
    d[i] = s[i];
  }
}
//-------------------------------------------------------------
//行列式
function det(m)
{
  var d = m.e[0]*m.e[4]*m.e[8] + m.e[1]*m.e[5]*m.e[6] + m.e[2]*m.e[7]*m.e[3]
        - m.e[0]*m.e[7]*m.e[5] - m.e[1]*m.e[3]*m.e[8] - m.e[6]*m.e[4]*m.e[2] ;
  return d;
}
//----------------------------------------------------------------
//逆行列
Matrix3.prototype.inverse = function()
{
    var e = this.e;
    var d = det(this);
    if( d == 0.0 ) {
			 console.log("逆行列を求めることができません！"+ "br");
       d = 1.0;
    }

    var c = [];
    c[0] =  (e[4]*e[8]-e[5]*e[7])/d;
    c[1] = -(e[1]*e[8]-e[2]*e[7])/d;
    c[2] =  (e[1]*e[5]-e[2]*e[4])/d;
    c[3] = -(e[3]*e[8]-e[5]*e[6])/d;
    c[4] =  (e[0]*e[8]-e[2]*e[6])/d;
    c[5] = -(e[0]*e[5]-e[2]*e[3])/d;
    c[6] =  (e[3]*e[7]-e[4]*e[6])/d;
    c[7] = -(e[0]*e[7]-e[1]*e[6])/d;
    c[8] =  (e[0]*e[4]-e[1]*e[3])/d;
    
    for(var i = 0; i < 9; i++) this.e[i] = c[i];
}

//----------------------------------------------------------------------------
//ベクトルを右から掛ける
//結果はVector3
function mulMV(m, v)
{
  var e = m.e;
  var u = new Vector3();
  u.x = e[0]*v.x + e[1]*v.y + e[2]*v.z;
  u.y = e[3]*v.x + e[4]*v.y + e[5]*v.z;
  u.z = e[6]*v.x + e[7]*v.y + e[8]*v.z;
  return u;
}
//----------------------------------------------------------------------------
//ベクトルを左から掛ける
//結果はVector3
function mulVM(v, m)
{
  var e = m.e;
  var u = new Vector3();
  u.x = e[0]*v.x + e[3]*v.y + e[6]*v.z;
  u.y = e[1]*v.x + e[4]*v.y + e[7]*v.z;
  u.z = e[2]*v.x + e[5]*v.y + e[8]*v.z;
  return u;
}
//-------------------------------------------------------------
//行列と行列の乗算(結果は行列）
function mulMM(m1, m2)
{
  var a = m1.e;
  var b = m2.e;
  var m = new Matrix3();
  m.e[0] = a[0]*b[0] + a[1]*b[3] + a[2]*b[6]; 
  m.e[1] = a[0]*b[1] + a[1]*b[4] + a[2]*b[7];
  m.e[2] = a[0]*b[2] + a[1]*b[5] + a[2]*b[8];
  m.e[3] = a[3]*b[0] + a[4]*b[3] + a[5]*b[6]; 
  m.e[4] = a[3]*b[1] + a[4]*b[4] + a[5]*b[7]; 
  m.e[5] = a[3]*b[2] + a[4]*b[5] + a[5]*b[8]; 
  m.e[6] = a[6]*b[0] + a[7]*b[3] + a[8]*b[6]; 
  m.e[7] = a[6]*b[1] + a[7]*b[4] + a[8]*b[7]; 
  m.e[8] = a[6]*b[2] + a[7]*b[5] + a[8]*b[8]; 
  return m;
}
/**************************************************************
    クォータニオン(四元数） 
    定義式： q = s + ix + jy + kz
***************************************************************/
//コンストラクタ
function Quaternion(s, x, y, z)
{
  if(typeof s === 'number' && typeof x === 'number' && typeof y === 'number' && typeof z === 'number' )
  {
    this.s = s;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  else//空白
  {
    this.s = 1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
}
//---------------------------------------------
//渡されたクォータニオンの要素をコピーする
Quaternion.prototype.copy = function(q)
{
  if(typeof q.s === 'number' && typeof q.x === 'number' && typeof q.y === 'number' && typeof q.z === 'number' )
  {
    this.s = q.s;
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
  }
  else
  {
    console.log("Quaternion ERROR --- copy()の 引数がクォータニオンでない！");
  }
}

//----------------------------------------------------------------------------
//共役四元数
//自身が共役四元数に変化
Quaternion.prototype.conjugate = function()
{
  var q = new Quaternion(this.s, this.x, this.y, this.z);
  this.s =  q.s;
  this.x = -q.x;
  this.y = -q.y;
  this.z = -q.z;
}

//------------------------------------------------------------------------------
//共役四元数
function conjugate(q)
{
  if(typeof q.s === 'number' && typeof q.x === 'number' && typeof q.y === 'number' && typeof q.z === 'number' )
  {
    return new Quaternion(q.s, -q.x, -q.y, -q.z);
  }
  else
  {
    console.log("Quaternion ERROR --- conjugate()の 引数がクォータニオンでない！");
  }
}

//---------------------------------------------------
//クォータニオン加算
Quaternion.prototype.add = function(q)
{
  if(typeof q.s === 'number' && typeof q.x === 'number' && typeof q.y === 'number' && typeof q.z === 'number' )
  {
    this.s += q.s;
    this.x += q.x;
    this.y += q.y;
    this.z += q.z;
  }
  else
  {
    console.log("Quaternion ERROR --- add()の 引数がクォータニオンでない！");
  }
}
//------------------------------------------------------
//クォータニオン加算
function addQQ(p, q)
{
  if(typeof p.s === 'number' && typeof p.x === 'number' && typeof p.y === 'number' && typeof p.z === 'number' && 
     typeof q.s === 'number' && typeof q.x === 'number' && typeof q.y === 'number' && typeof q.z === 'number' )
  {
    var c = new Quaternion();
    c.copy(p);
    c.add(q);
    return c;
  }
  else{
    console.log("Quaternion ERROR --- add()の 引数がクォータニオンでない！");
  }
}
//---------------------------------------------------
//クォータニオン減算
Quaternion.prototype.sub = function(q)
{
  if(typeof q.s === 'number' && typeof q.x === 'number' && typeof q.y === 'number' && typeof q.z === 'number' )
  {
    this.s -= q.s;
    this.x -= q.x;
    this.y -= q.y;
    this.z -= q.z;
  }
  else
  {
    console.log("Quaternion ERROR --- add()の 引数がクォータニオンでない！");
  }
}
//------------------------------------------------------
//クォータニオン減算
function subQQ(p, q)
{
  if(typeof p.s === 'number' && typeof p.x === 'number' && typeof p.y === 'number' && typeof p.z === 'number' && 
     typeof q.s === 'number' && typeof q.x === 'number' && typeof q.y === 'number' && typeof q.z === 'number' )
  {
    var c = new Quaternion();
    c.copy(p);
    c.sub(q);
    return c;
  }
  else{
    console.log("Quaternion ERROR --- add()の 引数がクォータニオンでない！");
  }
}
//---------------------------------------------------------------------
//スカラ乗算
Quaternion.prototype.mulS = function(s)
{
  if(typeof a == 'number')//aがスカラ
  {
    this.s *= s;
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }
  else
  {
    console.log("Quaternion ERROR --- mul()の 引数がスカラでない！");
  }
}

//---------------------------------------------------------------------
//クォータニオンとスカラの乗算
//クォータニオンを返す
function mulQS(p, s)
{
  if(typeof p === 'object' && typeof s === 'number')
  {
    var q = new Quaternion();
    q.s = p.s * s;
    q.x = p.x * s;
    q.y = p.y * s;
    q.z = p.z * s;
    return q;
  }
  else
  {
    console.log("Quaternion ERROR --- mul()の 引数が不正！");
  }
}

//---------------------------------------------------------------------
//スカラ除算
Quaternion.prototype.divS = function(s)
{
  if(typeof s == 'number')//aがスカラ
  {
    this.s /= s;
    this.x /= s;
    this.y /= s;
    this.z /= s;
  }
  else
  {
    console.log("Quaternion ERROR --- div()の 引数がスカラでない！");
  }
}
//---------------------------------------------------------------------
//クォータニオンをスカラで除算
//クォータニオンを返す

function divQS(p, s)
{
  if(typeof p === 'object' && typeof s === 'number')
  {
    var q = new Quaternion();
    q.s = p.s / s;
    q.x = p.x / s;
    q.y = p.y / s;
    q.z = p.z / s;
    return q;
  }
  else
  {
    console.log("Quaternion ERROR --- div()の 引数が不正！");
  }
}

//-------------------------------------------------------------------
//四元数どうしの乗算
//自身のクォータニオンに引数のクォータニオンを右から掛ける
Quaternion.prototype.mulQ = function(q)
{
  var p = new Quaternion(this.s, this.x, this.y, this.z);//自身の四元数
  var u = new Vector3(this.x, this.y, this.z);//そのベクトル部
  var v = new Vector3(q.x, q.y, q.z);//引数四元数のベクトル部
  this.s = p.s * q.s - dot(u, v);
  var w = new Vector3();
  w = add(mul(p.s , v), mul(q.s , u));
  w.add(cross(u, v)); 
  this.x = w.x; this.y = w.y, this.z = w.z;
}
//-------------------------------------------------------------------
//四元数どうしの乗算
//引数のクォータニオンと引数のクォータニオンを乗算
//クォータニオンを返す
function mulQQ(p, q)
{
  var pp = new Quaternion();
  pp.copy(p);
  pp.mulQ(q);
  return pp;
}

//----------------------------------------------------------------------
//クォータニオンとベクトルの乗算
//クォータニオンを返す
function mulQV(q, v)
{
//console.log("ZZZ s = " + q.s + " x = " + q.x + " y = " + q.y + " z = " + q.z);
//console.log("PPP  x = " + v.x + " y = " + v.y + " z = " + v.z);
  if(typeof q === 'object' && typeof v === 'object')
  {
    var p = new Quaternion(0, v.x, v.y, v.z);//スカラ部が0の四元数
    return mulQQ(q, p);
  }
  else
    console.log("Quaternion ERROR --- mulQV()の 引数が不正！");  
}
//----------------------------------------------------------------------
//クォータニオンとベクトルの乗算
//クォータニオンを返す
function mulVQ(v, q)
{
  if(typeof q === 'object' && typeof v === 'object')
  {
    var p = new Quaternion(0, v.x, v.y, v.z);//スカラ部が0の四元数
    return mulQQ(p, q);
  }
  else
    console.log("Quaternion ERROR --- mulVQ()の 引数が不正！");  
}
//-----------------------------------------------------------------------
//大きさを返す
function magQ(q)
{
  return Math.sqrt(q.s*q.s + q.x*q.x + q.y*q.y + q.z*q.z);
}
//-----------------------------------------------------------------------
//自身を正規化
Quaternion.prototype.norm = function()
{
  var eps = 0.000001;
  var p = new Quaternion();
  p.copy(this);
  var mag = magQ(p);
  if(mag <= eps) mag = 1;
  p.divS(mag);
  if(Math.abs(p.s) < eps) p.s = 0.0;
  if(Math.abs(p.x) < eps) p.x = 0.0;
  if(Math.abs(p.y) < eps) p.y = 0.0;
  if(Math.abs(p.z) < eps) p.z = 0.0;
  this.copy(p);
}
//-----------------------------------------------------------------------
//引数を正規化
//引数自身は変化しない
//クォータニオンを返す
function normQ(q)
{
  var eps = 0.000001;
  var p = new Quaternion();
  var mag = q_mag(q);
  if(mag <= eps) mag = 1;
  p = q_div(q, mag);
  if(Math.abs(p.s) < eps) p.s = 0.0;
  if(Math.abs(p.x) < eps) p.x = 0.0;
  if(Math.abs(p.y) < eps) p.y = 0.0;
  if(Math.abs(p.z) < eps) p.z = 0.0;
  
  return p;
}
//--------------------------------------------------------------------------
//ベクトル部分を返す
function getVector(q)
{
  var v = new Vector3(q.x, q.y, q.z);
  return v;
}
//---------------------------------------------------------------------------
//ベクトルvをクォータニオンqで回転し回転後のベクトルを返す
//オブジェクト座標系--->慣性座標系
function qvRotate(q, v)
{
  var c = conjugate(q);//qの共役
  var p = mulQV(q, v);
  var qq = mulQQ(p, c);
  return getVector(qq);
}
//---------------------------------------------------------------------------
//任意の回転軸axisと回転角angからからクォータニオンを作成
//axisは慣性座標、angは[deg]
function getQFromAxis(ang, axis)
{
  axis.norm();//axisを正規化
  var alpha = ang * DEG_TO_RAD / 2.0;
  axis.mul(Math.sin(alpha));
  var q = new Quaternion(Math.cos(alpha), axis.x, axis.y, axis.z);
  return q;
}
//----------------------------------------------------------------------
//オイラー角のxyzの順番で回転させるときと等価なクォータニオンを作成
//オイラー角elrは[deg]単位の3次元ベクトル
function getQFromEulerXYZ(elr)
{
  qx = getQFromAxis(elr.x, new Vector3(1, 0, 0));
  qy = getQFromAxis(elr.y, new Vector3(0, 1, 0));
  qz = getQFromAxis(elr.z, new Vector3(0, 0, 1));
  var p = mulQQ(qy, qx);
  var q = mulQQ(qz, p);
  
  return q;
} 
//----------------------------------------------------------------------
//オイラー角のzyxの順番で回転させるときと等価なクォータニオンを作成
//オイラー角elrは[deg]単位の3次元ベクトル
function getQFromEulerZYX(elr)
{
  qx = getQFromAxis(elr.x, new Vector3(1, 0, 0));
  qy = getQFromAxis(elr.y, new Vector3(0, 1, 0));
  qz = getQFromAxis(elr.z, new Vector3(0, 0, 1));
  p = mulQQ(qx, qy);
  q = mulQQ(p, qz);
  return q;
}

/**************************************************************
    乱数
***************************************************************/
//
function getRandom(fMin, fMax)
{//一様乱数
  return fMin + (fMax - fMin) * Math.random();
}

//放射状の一様乱数
function getRandomVector(r0)
{
  vPos = new Vector3(getRandom(-r0, r0), getRandom(-r0, r0), getRandom(-r0, r0));
  return vPos;
}

//XY平面における放射状の一様乱数
function getRandomVectorXY(r0)
{
  vPos = new Vector3();
  var r = getRandom(0.0, r0);
  var theta = getRandom(-Math.PI, Math.PI);
  vPos.x = Math.cos(theta) * r;
  vPos.y = Math.sin(theta) * r;
  return vPos;
}
//リング状に分布する乱数(中心ほど密度は高い)
function getRandomRingVectorXY(minR, maxR)
{
  vPos = new Vector3();
  var r = getRandom(minR, maxR);
  var theta = getRandom(-Math.PI, Math.PI);
  vPos.x = Math.cos(theta) * r;
  vPos.y = Math.sin(theta) * r;
  return vPos;
}
;
//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       wrapper[propertyName] = ctx[propertyName];
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow[err]) {
        glErrorShadow[err] = false;
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingContext(ctx) {
  var wrapper_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var onLost_ = undefined;
  var onRestored_ = undefined;
  var nextOnRestored_ = undefined;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShdow_[k];
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // Only call the functions if the context is not lost.
      if (!contextLost_) {
        if (!checkResources(arguments)) {
          glErrorShadow_[ctx.INVALID_OPERATION] = true;
          return;
        }
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper_[propertyName] = makeLostContextWrapper(ctx, propertyName);
     } else {
       wrapper_[propertyName] = ctx[propertyName];
     }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {statusMessage: statusMessage};
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        ctx.deleteBuffer(resource);
      } else if (resource instanceof WebctxFramebuffer) {
        ctx.deleteFramebuffer(resource);
      } else if (resource instanceof WebctxProgram) {
        ctx.deleteProgram(resource);
      } else if (resource instanceof WebctxRenderbuffer) {
        ctx.deleteRenderbuffer(resource);
      } else if (resource instanceof WebctxShader) {
        ctx.deleteShader(resource);
      } else if (resource instanceof WebctxTexture) {
        ctx.deleteTexture(resource);
      }
    }
  }

  wrapper_.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      ++contextId_;
      while (ctx.getError());
      clearErrors();
      glErrorShadow_[ctx.CONTEXT_LOST_WEBGL] = true;
      setTimeout(function() {
          if (onLost_) {
            onLost_(makeWebGLContextEvent("context lost"));
          }
        }, 0);
    }
  };

  wrapper_.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_) {
        setTimeout(function() {
            freeResources();
            resetToInitialState(ctx);
            contextLost_ = false;
            if (onRestored_) {
              var callback = onRestored_;
              onRestored_ = nextOnRestored_;
              nextOnRestored_ = undefined;
              callback(makeWebGLContextEvent("context restored"));
            }
          }, 0);
      } else {
        throw "You can not restore the context without a listener"
      }
    }
  };

  // Wrap a few functions specially.
  wrapper_.getError = function() {
    if (!contextLost_) {
      var err;
      while (err = ctx.getError()) {
        glErrorShadow_[err] = true;
      }
    }
    for (var err in glErrorShadow_) {
      if (glErrorShadow_[err]) {
        delete glErrorShadow_[err];
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  var creationFunctions = [
    "createBuffer",
    "createFramebuffer",
    "createProgram",
    "createRenderbuffer",
    "createShader",
    "createTexture"
  ];
  for (var ii = 0; ii < creationFunctions.length; ++ii) {
    var functionName = creationFunctions[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return null;
        }
        var obj = f.apply(ctx, arguments);
        obj.__webglDebugContextLostId__ = contextId_;
        resourceDb_.push(obj);
        return obj;
      };
    }(ctx[functionName]);
  }

  var functionsThatShouldReturnNull = [
    "getActiveAttrib",
    "getActiveUniform",
    "getBufferParameter",
    "getContextAttributes",
    "getAttachedShaders",
    "getFramebufferAttachmentParameter",
    "getParameter",
    "getProgramParameter",
    "getProgramInfoLog",
    "getRenderbufferParameter",
    "getShaderParameter",
    "getShaderInfoLog",
    "getShaderSource",
    "getTexParameter",
    "getUniform",
    "getUniformLocation",
    "getVertexAttrib"
  ];
  for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
    var functionName = functionsThatShouldReturnNull[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return null;
        }
        return f.apply(ctx, arguments);
      }
    }(wrapper_[functionName]);
  }

  var isFunctions = [
    "isBuffer",
    "isEnabled",
    "isFramebuffer",
    "isProgram",
    "isRenderbuffer",
    "isShader",
    "isTexture"
  ];
  for (var ii = 0; ii < isFunctions.length; ++ii) {
    var functionName = isFunctions[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return false;
        }
        return f.apply(ctx, arguments);
      }
    }(wrapper_[functionName]);
  }

  wrapper_.checkFramebufferStatus = function(f) {
    return function() {
      if (contextLost_) {
        return ctx.FRAMEBUFFER_UNSUPPORTED;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.checkFramebufferStatus);

  wrapper_.getAttribLocation = function(f) {
    return function() {
      if (contextLost_) {
        return -1;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.getAttribLocation);

  wrapper_.getVertexAttribOffset = function(f) {
    return function() {
      if (contextLost_) {
        return 0;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.getVertexAttribOffset);

  wrapper_.isContextLost = function() {
    return contextLost_;
  };

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  wrapper_.registerOnContextLostListener = function(listener) {
    onLost_ = wrapEvent(listener);
  };

  wrapper_.registerOnContextRestoredListener = function(listener) {
    if (contextLost_) {
      nextOnRestored_ = wrapEvent(listener);
    } else {
      onRestored_ = wrapEvent(listener);
    }
  }

  return wrapper_;
}

return {
  /**
   * Initializes this module. Safe to call more than once.
   * @param {!WebGLRenderingContext} ctx A WebGL context. If
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
   *            funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a WebGL context returns a wrapped context that adds 4
   * functions.
   *
   * ctx.loseContext:
   *   simulates a lost context event.
   *
   * ctx.restoreContext:
   *   simulates the context being restored.
   *
   * ctx.registerOnContextLostListener(listener):
   *   lets you register a listener for context lost. Use instead
   *   of addEventListener('webglcontextlostevent', listener);
   *
   * ctx.registerOnContextRestoredListener(listener):
   *   lets you register a listener for context restored. Use
   *   instead of addEventListener('webglcontextrestored',
   *   listener);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   */
  'makeLostContextSimulatingContext': makeLostContextSimulatingContext,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();

/********************************************************************
    2D描画関数(HTML5の2Dグラフィックス機能）
    呼び出す側のプログラムにおいてコンテキストをctxとすること
*********************************************************************/
//---------------------------------------------------
function drawLine(x1, y1, x2, y2, color, line_width)
{
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
//----------------------------------------------------
function drawLines(pointData, color, line_width)
{
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.moveTo(pointData[0][0], pointData[0][1]);
  for(var i = 1; i < pointData.length; i++) ctx.lineTo(pointData[i][0], pointData[i][1]);
  ctx.stroke();
}
//----------------------------------------------------------
function drawRect(x0, y0, w, h, fill, color, line_width)
{//x0,y0は中心座標
  var x = x0 - w / 2;
  var y = y0 - h / 2;
  if(fill == 0)
  {
    ctx.lineWidth = line_width; 
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
  else
  {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
}
//----------------------------------------------------------
function drawCircle(x0, y0, radius, fill, color, line_width)
{//x0,y0は中心座標
  ctx.beginPath();
  ctx.arc(x0, y0, radius, 2.0 * Math.PI, false);
  if(fill == 0)
  {
    ctx.lineWidth = line_width; 
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  else
  {
    ctx.fillStyle = color;
    ctx.fill();
  }
}
//-----------------------------------------------------------
function drawTriangle(x0, y0, radius, fill, color, line_width)
{//x0,y0は中心座標, radiusは中心から頂点までの距離
  var rs = radius * Math.sin(Math.PI/6);
  var rc = radius * Math.cos(Math.PI/6);
  var x1 = x0; var y1 = y0 - radius;
  var x2 = x0 - rc; var y2 = y0 + rs;
  var x3 = x0 + rc; var y3 = y2; 
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if(fill == 0)
  {
    ctx.lineWidth = line_width; 
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  else
  {
    ctx.fillStyle = color;
    ctx.fill();
  }
}

//-----------------------------------------------------------------
function drawText(text, x, y, color, scX, scY)
{
  ctx.fillStyle = color;
  ctx.scale(scX, scY);
  ctx.fillText(text, x / scX, y / scY);
  ctx.scale(1 / scX, 1 / scY);//元のサイズに戻す
}
//----------------------------------------------------------------
function clearCanvas(color)
{
　ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

;
/*------------------------------------------------------------
            swgCollision.js
            剛体同士の衝突
--------------------------------------------------------------*/

var flagCollision = true;
var flagSeparate = false;
var awakeValue = 1;//覚醒させる運動量のしきい値

function collision(dt)
{
  var i, j;

  for(i = 0; i < numRigid; i++)
  {   
    rigid[i].action3D(dt);//放物運動(swgRigid.js)
//console.log(" i = " + i + "  state = " + rigid[i].state);
    if(!flagCollision) continue;//衝突判定せず
    for(j = 0; j < numRigid; j++)
    {
	  if(i == j) continue;
//console.log(" i = " + i + "  state = " + rigid[i].state + " j = " + j + "  state = " + rigid[j].state);
      //境界球で予備判定
	  var d = distance2(rigid[i].vPos, rigid[j].vPos);//2乗距離
	  var a = rigid[i].boundingR + rigid[j].boundingR;
      if(d > a*a) continue;

      collisionWithRigid(i, j, dt);
    }
  }	

  //強制引き離し  
  var distEnforce = 0.2;//引き離す距離
  var vDir = new Vector3();
  for(i = 0; i < numRigid; i++)
  { 
	if(flagSeparate)
	{
      //強制引き離し(x,y,z方向のサイズが同程度でなければ利用不可）
	  for(j = 0; j < numRigid; j++)
	  {
		var a = (rigid[i].vSize.x + rigid[j].vSize.x)/2;
		var d = distance(rigid[i].vPos, rigid[j].vPos);//中心間距離
		if(d < 0.2) vDir = new Vector3(1.0, 1.0, 0.0);//深くめり込んだ場合
		else vDir = direction(rigid[i].vPos , rigid[j].vPos);
		if(d < a)
		{
 	      rigid[i].vPos.sub(mul(distEnforce, vDir));
		  rigid[j].vPos.add(mul(distEnforce, vDir));
		}
	  }
	}
  }
}

//--------------------------------------------------------------------------
function collisionWithRigid(i, j, dt)
{
  var rikiseki;
  var vn1, vn2;//法線成分の大きさ
  var muc,B, m1, m2;
  var vVelocityP1, vVelocityP2;//合成速度
  var vTangential;//接線方向
  var vDir = new Vector3();
  var vA1 = new Vector3();
  var vA2 = new Vector3();
  var vPos1 = new Vector3();
  var vPos2 = new Vector3();
  var vRg1 = new Vector3();
  var vRg2 = new Vector3();
  
  var depth = checkCollision(i, j);//衝突判定

  if(depth < 0.0) return;
  rigid[i].vForce = new Vector3();
  rigid[i].vTorque = new Vector3();
  rigid[j].vForce = new Vector3();
  rigid[j].vTorque = new Vector3();

  vRg1.copy(rigid[i].vGravityToPoint);
  vRg2.copy(rigid[j].vGravityToPoint);
  m1 = rigid[i].mass;
  m2 = rigid[j].mass;

  vVelocityP1 = add(rigid[i].vVel , cross(rigid[i].vOmega, vRg1));
  vn1 = dot(vVelocityP1, rigid[i].vNormal);
  vVelocityP2 = add(rigid[j].vVel , cross(rigid[j].vOmega, vRg2));
  vn2 = dot(vVelocityP2, rigid[i].vNormal);

  //衝突応答
  vTangential = cross( rigid[i].vNormal, cross(sub(vVelocityP1, vVelocityP2), rigid[i].vNormal));
  vTangential.norm();
  //力積
  rikiseki = - (restitution + 1.0) * (vn1 - vn2) / (1.0/m1 + 1.0/m2
          + dot(rigid[i].vNormal , cross(mulMV(rigid[i].mInertiaInverse, cross(vRg1, rigid[i].vNormal)), vRg1))
          + dot(rigid[i].vNormal , cross(mulMV(rigid[j].mInertiaInverse, cross(vRg2, rigid[i].vNormal)), vRg2)));
  //強い運動量を受けたとき覚醒
  if(Math.abs(rikiseki) >  awakeValue)
  {
    rigid[i].state = "FREE";
    rigid[j].state = "FREE";
  }

  //力の総和
  rigid[i].vForce.add(mul(rigid[i].vNormal , rikiseki / dt));
  rigid[j].vForce.sub(mul(rigid[i].vNormal , rikiseki / dt));
  //力のモーメント（トルク）の総和
  rigid[i].vTorque.add(mul(cross(vRg1, rigid[i].vNormal) , rikiseki / dt));
  rigid[j].vTorque.sub(mul(cross(vRg2, rigid[i].vNormal) , rikiseki / dt));

  //摩擦を考慮
  vA1 = cross(mulMV(rigid[i].mInertiaInverse , cross(vRg1, vTangential)) , vRg1);
  vA2 = cross(mulMV(rigid[j].mInertiaInverse , cross(vRg2, vTangential)) , vRg2);
  B = - dot(vTangential, sub(vVelocityP1, vVelocityP2)) / (1.0/m1+1.0/m2+ dot(vTangential,add(vA1, vA2)));
  muc = Math.abs(B / rikiseki);
  if(muK >= muc)
  {
    rigid[i].vForce.add(vTangential, B / dt);
    rigid[i].vTorque.add(mul(cross(vRg1, vTangential) , B / dt));
    rigid[j].vForce.sub(mul(vTangential, B / dt));
    rigid[j].vTorque.sub(mul(cross(vRg2, vTangential) , B / dt));
  }
  else
  {
    rigid[i].vForce.add(mul( muK * rikiseki / dt , vTangential));
	rigid[i].vTorque.add(mul(cross(vRg1, vTangential) , muK * rikiseki / dt));
	rigid[j].vForce.sub(mul(muK * rikiseki / dt , vTangential));
	rigid[j].vTorque.sub(mul(cross(vRg2, vTangential) , muK * rikiseki / dt));
  }

  //位置回転角度の更新
  if(rigid[i].state== "FREE")// || rigid[i].state== "FREE_ON_FLOOR" )
  {
    // i番目の剛体
    //衝突時にめり込んだ分引き離す
    rigid[i].vPos.sub(mul(depth/2.0+0.01 , rigid[i].vNormal));//0.01は分離を確実にするため				
    rigid[i].vAcc = div(rigid[i].vForce , m1); //加速度
    rigid[i].vVel.add(mul(rigid[i].vAcc , dt));//速度
    rigid[i].vAlpha = mulMV(rigid[i].mInertiaInverse , rigid[i].vTorque);//角加速度の更新
    rigid[i].vOmega.add(mul(rigid[i].vAlpha , dt));          //角速度
  }
  if(rigid[j].state== "FREE")// || rigid[j].state== "FREE_ON_FLOOR" )
  { 
    // j番の剛体
    //衝突時にめり込んだ分引き離す
    rigid[j].vPos.add(mul(depth/2.0+0.01 , rigid[i].vNormal));
    rigid[j].vAcc = div(rigid[j].vForce , m2);
    rigid[j].vVel.add(mul(rigid[j].vAcc , dt));
    rigid[j].vAlpha = mulMV(rigid[j].mInertiaInverse , rigid[j].vTorque);
    rigid[j].vOmega.add(mul(rigid[j].vAlpha , dt));
  }
}
//--------------------------------------------------------------------------------------------
//衝突があれば衝突時の深さdepthを返す。
//depthが負のときは非衝突である
function checkCollision(i, j)
{
  var depth;
    
  if(rigid[i].kind == "SPHERE")
  {
    switch(rigid[j].kind ) 
    {
      case "SPHERE"://球同士
        depth = rigid[i].collisionSphereWithSphere(rigid[j]);
        return depth;
		break;

      case "CUBE":
        depth = rigid[i].collisionSphereWithCube(rigid[j]);
        if(depth >= 0.0) return depth;
        depth = rigid[j].collisionCubeWithSphere(rigid[i]);
        if(depth >= 0.0) rigid[i].vNormal.reverse();
        return depth;
        break;
      case "CYLINDER"://円柱
        depth = rigid[i].collisionSphereWithCylinder(rigid[j]);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionCylinderWithSphere(rigid[i]);
		if(depth >= 0.0) rigid[i].vNormal.reverse();
		return depth;
		break;
    }
  }

  else if(rigid[i].kind == "CUBE")
  {
    switch(rigid[j].kind)
    {
	  case "SPHERE":
	    depth = rigid[i].collisionCubeWithSphere(rigid[j]);
//console.log("BBB depth = " + depth + " x=" + rigid[i].vNormal.x + " y=" + rigid[i].vNormal.y + " z=" + rigid[i].vNormal.z);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionSphereWithCube(rigid[i]);
		if(depth >= 0.0) rigid[i].vNormal.reverse();
//console.log("CCC depth = " + depth + " x=" + rigid[i].vNormal.x + " y=" + rigid[i].vNormal.y + " z=" + rigid[i].vNormal.z);
		return depth;
		break;
      case "CUBE":
        depth = rigid[i].collisionCubeWithCube(rigid[j]);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionCubeWithCube(rigid[i]);
		if(depth >= 0.0) rigid[i].vNormal.reverse();
		return depth;
		break;
      case "CYLINDER"://円柱
        depth = rigid[i].collisionCubeWithCylinder(rigid[j]);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionCylinderWithCube(rigid[i]);
		if(depth >= 0.0) rigid[i].vNormal.reverse();
		return depth; 
		break;
    }
  }

  else if(rigid[i].kind == "CYLINDER")//円柱
  {
    switch(rigid[j].kind)
    {
	  case "SPHERE":
	    depth = rigid[i].collisionCylinderWithSphere(rigid[j]);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionSphereWithCylinder(rigid[i]);
		rigid[i].vNormal.reverse();
		return depth;
		break;
      case "CUBE":
 		depth = rigid[i].collisionCylinderWithCube(rigid[j]);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionCubeWithCylinder(rigid[i]);
		rigid[i].vNormal.reverse();
		return depth;
		break;
      case "CYLINDER"://円柱同士
        depth = rigid[i].collisionCylinderWithCylinder(rigid[j]);
		if(depth >= 0.0) return depth;
		depth = rigid[j].collisionCylinderWithCylinder(rigid[i]);
		if(depth >= 0.0) rigid[i].vNormal.reverse();
		return depth;
        break;
    }
  }
  return NON_COLLISION;
}
;
/*--------------------------------------------------------------
     collisionSM_R.js
     2次元バス質点モデルと剛体球の衝突
----------------------------------------------------------------*/


function collisionSMwithR(sm, dt)
{
  var i, j, d;
console.log(" numPoint = " + sm.numPoint)
  
  for(k = 0; k < sm.numPoint; k++)
  {   
    d = distance(sm.point[k].vPos,  sm.rigid2.vPos);
	if( d > sm.radius + sm.rigid2.vSize.x / 2.0) continue;
	collisionSM_Rigid(sm, k, dt);
  }
}
//--------------------------------------------------------------------------
function collisionSM_Rigid(sm, k, dt)
{
	var rikiseki;
	var vn1, vn2;//法線成分の大きさ
	var muc, B, m1, m2;
	var vVelocityP1, vVelocityP2;//合成速度
	var vNormal;//注目剛体(質点)から見た衝突面の法線方向
	var vTangential;//接線方向
	var vDir, vA1, vA2, vRg1, vRg2;

    //var k = i + j * (sm.numRow + 1);
	sm.point[k].vForce =new Vector3();
	sm.point[k].vTorque = new Vector3();
	sm.rigid2.vForce = new Vector3();
	sm.rigid2.vTorque = new Vector3();

	vNormal = direction(sm.point[k].vPos, sm.rigid2.vPos);
//console.log(" nx = " + vNormal.x + " ny = " + vNormal.y + " nz = " + vNormal.z);

	//重心から衝突点までのベクトル
	sm.point[k].vGravityToPoint = mul(sm.radius , vNormal);
	sm.rigid2.vGravityToPoint = mul(sm.rigid2.vSize.x/2.0 , vNormal);

	sm.rigid2.vGravityToPoint.reverse();
	var depth = (sm.radius + sm.rigid2.vSize.x / 2.0) - distance(sm.point[k].vPos, sm.rigid2.vPos);

	if(depth < 0.0) return;
	vRg1 = sm.point[k].vGravityToPoint;
	vRg2 = sm.rigid2.vGravityToPoint;
	m1 = sm.mass;//質点の質量
	m2 = sm.rigid2.mass;
//console.log("PPP x = " + sm.point[k].vOmega.x + " y = " + sm.point[k].vOmega.y + " z = " + sm.point[k].vOmega.z);

	vVelocityP1 = add(sm.point[k].vVel, cross(sm.point[k].vOmega, vRg1));
	vn1 = dot(vVelocityP1, vNormal);
	vVelocityP2 = add(sm.rigid2.vVel, cross(sm.rigid2.vOmega, vRg2));
	vn2 = dot(vVelocityP2, vNormal);

	//衝突応答
	vTangential = cross( vNormal, cross(sub(vVelocityP1, vVelocityP2), vNormal));
	vTangential.norm();
	//力積
	rikiseki = - (restitution + 1.0) * (vn1 - vn2) / (1.0/m1 + 1.0/m2
		  + dot(vNormal , cross(mulMV(sm.point[k].mInertiaInverse, cross(vRg1, vNormal)), vRg1))
		  + dot(vNormal , cross(mulMV(sm.rigid2.mInertiaInverse, cross(vRg2, vNormal)), vRg2)));
	//力の総和
	var vFF = mul(vNormal , rikiseki / dt);
	sm.point[k].vForce.add(vFF);
	sm.rigid2.vForce.sub(vFF);
	//力のモーメント（トルク）の総和
	vFF = mul(cross(vRg1, vNormal) , rikiseki / dt);
	sm.point[k].vTorque.add(vFF); 
	sm.rigid2.vTorque.sub(vFF);

	//摩擦を考慮
	vA1 = cross(mulMV(sm.point[k].mInertiaInverse, cross(vRg1, vTangential)) , vRg1);
	vA2 = cross(mulMV(sm.rigid2.mInertiaInverse, cross(vRg2, vTangential)) , vRg2);
	B = - dot(vTangential, sub(vVelocityP1, vVelocityP2)) / (1/m1+1/m2+ dot(vTangential,add(vA1, vA2)));
	muc = Math.abs(B / rikiseki);
	if(muK >= muc)
	{
		sm.point[k].vForce.add( mul(vTangential, B / dt) );
		sm.point[k].vTorque.add( mul(cross(vRg1, vTangential) , B / dt ));
		sm.rigid2.vForce.sub( mul(vTangential,  B / dt) );
		sm.rigid2.vTorque.sub( mul(cross(vRg2, vTangential) , B / dt) );
	}
	else
	{
		sm.point[k].vForce.add( mul(muK * rikiseki / dt, vTangential) );
		sm.point[k].vTorque.add( mul(cross(vRg1, vTangential) , muK * rikiseki / dt) );
		sm.rigid2.vForce.sub( mul(muK * rikiseki / dt , vTangential) );
		sm.rigid2.vTorque.sub( mul(cross(vRg2, vTangential) , muK * rikiseki / dt) );
	}
	//衝突判定時にめり込んだ分引き離す
	vFF = mul(depth/2.0, vNormal);
	sm.point[k].vPos.sub( vFF );				
	if(sm.rigid2.state == "FREE") sm.rigid2.vPos.add( vFF );

	//位置回転角度の更新
	// i番目の剛体
	sm.point[k].vAccel = div(sm.point[k].vForce , m1) ;    //加速度
	sm.point[k].vVel.add( mul(sm.point[k].vAccel , dt) );//速度
	sm.point[k].vAlpha = mulMV(sm.point[k].mInertiaInverse , sm.point[k].vTorque);//角加速度の更新
	sm.point[k].vOmega.add( mul(sm.point[k].vAlpha , dt) );          //角速度

	// 剛体
	if(sm.rigid2.state == "FREE")
	{
	  sm.rigid2.vAccel = div(sm.rigid2.vForce , m2);
	  sm.rigid2.vVel.add( mul(sm.rigid2.vAccel , dt) );
	  sm.rigid2.vAlpha = mulMV(sm.rigid2.mInertiaInverse , sm.rigid2.vTorque);
	  sm.rigid2.vOmega.add( mul(sm.rigid2.vAlpha , dt) );
	}
}
;
/********************************************************************
    2D描画関数(HTML5の2Dグラフィックス機能）
    左下を(-1,-1)、右上を(1, 1)に正規化したデカルト座標系
    呼び出す側のプログラムにおいてコンテキストをctxとすること
    canvas要素をcanvasとすること
*********************************************************************/
//var canvas; //キャンバス要素
//var ctx;//コンテキスト
// X0 = canvas.width / 2;//デカルト座標の原点（canvas座標における位置）
// Y0 = canvas.height / 2;

//---------------------------------------------------
function drawLine(x1, y1, x2, y2, color, line_width)
{
  x1 = (1 + x1) * X0;
  y1 = (1 - y1) * Y0;
  x2 = (1 + x2) * X0;
  y2 = (1 - y2) * Y0;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
//----------------------------------------------------
function drawLines(pointData, color, line_width)
{
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.moveTo(pointData[0][0], pointData[0][1]);
  for(var i = 1; i < pointData.length; i++) ctx.lineTo(pointData[i][0], pointData[i][1]);
  ctx.stroke();
}
//----------------------------------------------------------
function drawRect(x0, y0, w, h, fill, color, line_width)
{//x0,y0は中心座標
  var x = x0 - w / 2;
  var y = y0 - h / 2;
  if(fill == 0)
  {
    ctx.lineWidth = line_width; 
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
  else
  {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
}
//----------------------------------------------------------
function drawCircle(x0, y0, radius, fill, color, line_width)
{//x0,y0は中心座標
  ctx.beginPath();
  ctx.arc(x0, y0, radius, 2.0 * Math.PI, false);
  if(fill == 0)
  {
    ctx.lineWidth = line_width; 
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  else
  {
    ctx.fillStyle = color;
    ctx.fill();
  }
}
//-----------------------------------------------------------
function drawTriangle(x0, y0, radius, fill, color, line_width)
{//x0,y0は中心座標, radiusは中心から頂点までの距離
  var rs = radius * Math.sin(Math.PI/6);
  var rc = radius * Math.cos(Math.PI/6);
  var x1 = x0; var y1 = y0 - radius;
  var x2 = x0 - rc; var y2 = y0 + rs;
  var x3 = x0 + rc; var y3 = y2; 
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if(fill == 0)
  {
    ctx.lineWidth = line_width; 
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  else
  {
    ctx.fillStyle = color;
    ctx.fill();
  }
}

//-----------------------------------------------------------------
function drawText(text, x, y, color, scX, scY)
{
  ctx.fillStyle = color;
  ctx.scale(scX, scY);
  ctx.fillText(text, x / scX, y / scY);
  ctx.scale(1 / scX, 1 / scY);//元のサイズに戻す
}
//----------------------------------------------------------------
function clearCanvas(color)
{
　ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

;
//kwgHierarchy.js

function Table()
{
  //部品の大きさは異なるが同じ色，同じ種類なのでparts個数は1
  this.flagSolid = true;
  this.shadow = 0.0;
  
  //位置・姿勢（root位置）
  this.vPos = new Vector3(0.0, 0.0, 0.0);//Topの中心の(x,y)，脚の下端
  this.vEuler = new Vector3(0.0, 0.0, 0.0);
  this.vSize = new Vector3(1.0, 1.0, 1.0);//全体のスケール変換に使用
 
  var i;
//  this.parts;
  this.parts = new Rigid_HS();
  this.parts.kind = "SUPER";
  this.parts.diffuse = [0.8, 0.5, 0.2, 1.0];
  this.parts.ambient = [0.5, 0.3, 0.1, 1.0];
  this.parts.nSlice = 10;
  this.parts.nStack = 10;
  this.parts.eps1 = 0.2;
  this.parts.eps2 = 0.2;
    
  //サイズ
  this.vTop = new Vector3(1.0, 2.0, 0.1);//天板
  this.vLeg = new Vector3(0.15, 0.15, 1.0);
  
  //------------------------------
  Table.prototype.draw = function(gl)
  {
    this.parts.flagSolid = this.flagSolid;
    this.parts.shadow = this.shadow;
    var n = this.parts.initVertexBuffers(gl);//1種類のプリミティブを使うので1回だけでよい
  
    //スタック行列の確保
    var stackMat = new Matrix4();//テーブルのときは1個でよい
    // モデル行列の初期化
    var modelMatrix = new Matrix4();
  
    if(this.shadow >= 0.01) modelMatrix.dropShadow(plane, light.pos);//簡易シャドウ
  
    //全体(root)
    modelMatrix.translate(this.vPos.x, this.vPos.y, this.vPos.z);
    modelMatrix.rotate(this.vEuler.z, 0, 0, 1); // z軸周りに回転
    modelMatrix.rotate(this.vEuler.y, 0, 1, 0); // y軸周りに回転
    modelMatrix.rotate(this.vEuler.x, 1, 0, 0); // x軸周りに回転
    modelMatrix.scale(this.vSize.x, this.vSize.y, this.vSize.z);
  
    stackMat.copy(modelMatrix);//rootのモデル行列を保存
　
    //天板
  　modelMatrix.translate(0.0, 0.0, this.vLeg.z);
    modelMatrix.scale(this.vTop.x, this.vTop.y, this.vTop.z);
    this.parts.draw(gl, n, modelMatrix);
  
    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //前右脚
  　modelMatrix.translate(0.4 * this.vTop.x, -0.4 * this.vTop.y, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);

    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //前左脚
  　modelMatrix.translate(-0.4 * this.vTop.x, -0.4 * this.vTop.y, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);

    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //後右脚
  　modelMatrix.translate(0.4 * this.vTop.x, 0.4 * this.vTop.y, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);

    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //後左脚
  　modelMatrix.translate(-0.4 * this.vTop.x, 0.4 * this.vTop.y, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);
  }
}

//-------------------------------------------------------------------
function Chair()
{
  this.flagSolid = true;
  this.shadow = 0.0;
  
  //位置・姿勢（root位置）
  this.vPos = new Vector3(0.0, 0.0, 0.0);//Topの中心の(x,y)，脚の下端
  this.vEuler = new Vector3(0.0, 0.0, 0.0);
  this.vSize = new Vector3(1.0, 1.0, 1.0);//全体のスケール変換に使用
  
  this.parts = new Rigid_HS();
  this.parts.kind = "SUPER";
  this.parts.diffuse = [0.8, 0.2, 0.2, 1.0];
  this.parts.ambient = [0.4, 0.1, 0.1, 1.0];
  this.parts.nSlice = 10;
  this.parts.nStack = 10;
  this.parts.eps1 = 0.2;
  this.parts.eps2 = 1.0;
  
  //サイズ
  this.vTop = new Vector3(0.5, 0.5, 0.05);//天板
  this.vLeg = new Vector3(0.1, 0.1, 0.5);
  
  //------------------------------
  Chair.prototype.draw = function(gl)
  {
    this.parts.flagSolid = this.flagSolid;
    this.parts.shadow = this.shadow;
    var n = this.parts.initVertexBuffers(gl);//1種類のプリミティブを使うので1回だけでよい
  
    //スタック行列の確保
    var stackMat = new Matrix4();//テーブルのときは1個でよい
    // モデル行列の初期化
    var modelMatrix = new Matrix4();
  
    if(this.shadow >= 0.01) modelMatrix.dropShadow(plane, light.pos);//簡易シャドウ
  
    //全体(root)
    modelMatrix.translate(this.vPos.x, this.vPos.y, this.vPos.z);
    modelMatrix.rotate(this.vEuler.z, 0, 0, 1); // z軸周りに回転
    modelMatrix.rotate(this.vEuler.y, 0, 1, 0); // y軸周りに回転
    modelMatrix.rotate(this.vEuler.x, 1, 0, 0); // x軸周りに回転
    modelMatrix.scale(this.vSize.x, this.vSize.y, this.vSize.z);
  
    stackMat.copy(modelMatrix);//rootのモデル行列を保存
　
    //天板
  　modelMatrix.translate(0.0, 0.0, this.vLeg.z);
    modelMatrix.scale(this.vTop.x, this.vTop.y, this.vTop.z);
    this.parts.draw(gl, n, modelMatrix);
  
    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //前脚
  　modelMatrix.translate(0.4 * this.vTop.x, 0.0, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);

    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //後脚
  　modelMatrix.translate(-0.4 * this.vTop.x, 0.0, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);

    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //右脚
  　modelMatrix.translate(0.0, -0.4 * this.vTop.y, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);

    modelMatrix.copy(stackMat);//rootのモデル行列に戻す
    //左脚
  　modelMatrix.translate(0.0, 0.4 * this.vTop.y, 0.5 * this.vLeg.z);
    modelMatrix.scale(this.vLeg.x, this.vLeg.y, this.vLeg.z);
    this.parts.draw(gl, n, modelMatrix);
  }
}



;
/*------------------------------------------------------------------------------------------------------
  松田晃一著：「WebGL+HTML5　3DCGプログラミング入門」，カットシステム，2012年
  この書籍に添付されているCD-ROMのcuon-matrix.jsの1部を著者の許可を得て変更あるいは削除して使用している．
--------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------
 4x4の行列を実装したクラス． 
 この行列は、OpenGL,GLSLとおなじように列優先である．
 行列演算は右方向から実行する．
------------------------------------------------*/

//単位行列に初期化するコンストラクタ
function Matrix4()
{
  this.elements = new Float32Array([
     1,0,0,0, 
     0,1,0,0, 
     0,0,1,0, 
     0,0,0,1
  ]);
};

Matrix4.prototype.set = function(e0, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15) 
{
  this.elements[0] = e0;
  this.elements[1] = e1;
  this.elements[2] = e2;
  this.elements[3] = e3;
  this.elements[4] = e4;
  this.elements[5] = e5;
  this.elements[6] = e6;
  this.elements[7] = e7;
  this.elements[8] = e8;
  this.elements[9] = e9;
  this.elements[10] = e10;
  this.elements[11] = e11;
  this.elements[12] = e12;
  this.elements[13] = e13;
  this.elements[14] = e14;
  this.elements[15] = e15;
}
/*---------------------------------------------------
 渡された行列の要素をコピーする。
 src 要素をコピーしてくる行列
 ----------------------------------------------------*/
Matrix4.prototype.copy = function(src) 
{
  var i, s, d;

  s = src.elements;
  d = this.elements;

  if (s === d) {
    return;
  }
    
  for (i = 0; i < 16; ++i) {
    d[i] = s[i];
  }

  return this;
};

/*-------------------------------
 行列どうしの積
 other:右側からかける行列
 this:掛けられる行列（その結果を返す）
---------------------------------*/
Matrix4.prototype.multiply = function(other) 
{
  var i, e, a, b, ai0, ai1, ai2, ai3;
  e = this.elements;
  a = this.elements;
  b = other.elements;

  for (i = 0; i < 4; i++) {
    ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
    e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
    e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
    e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
    e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
  }
};
/*-------------------------
 転置行列をつくる。
----------------------------*/
Matrix4.prototype.transpose = function() 
{
  var e, t;

  e = this.elements;

  t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
  t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
  t = e[ 3];  e[ 3] = e[12];  e[12] = t;
  t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
  t = e[ 7];  e[ 7] = e[13];  e[13] = t;
  t = e[11];  e[11] = e[14];  e[14] = t;

};

/*-----------------------------
 other: 逆行列を計算する行列
-------------------------------*/
Matrix4.prototype.setInverseOf = function(other) 
{
  var i, s, d, inv, det;

  s = other.elements;
  d = this.elements;
  inv = new Float32Array(16);

  inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
            + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
  inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
            - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
  inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
            + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
  inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
            - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

  inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
            - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
  inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
            + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
  inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
            - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
  inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
            + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

  inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
            + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
  inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
            - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
  inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
            + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
  inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
            - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

  inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
            - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
  inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
            + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
  inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
            - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
  inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
            + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

  det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
  if (det === 0) {
  　console.log("Matrix4の逆行列を求めることができません");
  }

  det = 1 / det;
  for (i = 0; i < 16; i++) {
    d[i] = inv[i] * det;
  }
};

/*-----------------------------
 自身の逆行列を求める
-------------------------------*/
Matrix4.prototype.invert = function() {
  return this.setInverseOf(this);
};

/*----------------------------------
 正射影行列に設定しthisにかけられる
 left: 左クリップ平面のX座標
 right: 右クリップ平面のX座標
 bottom: 下クリップ平面のY座標
 top: 上クリップ平面のY座標
 near: 近クリップ平面までの距離
 far: 遠クリップ平面までの距離
-------------------------------------*/
Matrix4.prototype.ortho = function(left, right, bottom, top, near, far) 
{
  var e, rw, rh, rd;

  if (left === right || bottom === top || near === far) {
    console.log( 'ortho error!');
  }

  rw = 1 / (right - left);
  rh = 1 / (top - bottom);
  rd = 1 / (far - near);

  var e = new Float32Array(16);

  e[0]  = 2 * rw;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = 2 * rh;
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -2 * rd;
  e[11] = 0;

  e[12] = -(right + left) * rw;
  e[13] = -(top + bottom) * rh;
  e[14] = -(far + near) * rd;
  e[15] = 1;

  var m = new Matrix4();
  m.elements = e; 
  
  this.multiply(m);

};

/*---------------------------------------------------
 透視射影行列を作成し右からthisに掛ける
 fov: 垂直視野角 [度]
 aspect: 視野のアスペクト比（幅 / 高さ）
 near: 近クリップ平面までの距離。正数でなくてはならない
 far: 遠クリップ平面までの距離。正数でなくてはならない
-------------------------------------------------------*/
Matrix4.prototype.perspective = function(fov, aspect, near, far) 
{
  var e, rd, s, ct;

  if (near === far || aspect === 0) {
    console.log('perspective error! near = far or aspect = 0');
  }
  if (near <= 0) {
    console.log( 'perspective error! near <= 0');
  }
  if (far <= 0) {
    console.log( 'perspective error! far <= 0');
  }

  fov = Math.PI * fov / 180 / 2;
  s = Math.sin(fov);
  if (s === 0) {
    console.log( 'perspective error! fovY = 0');
  }

  rd = 1 / (far - near);
  ct = Math.cos(fov) / s;

  var e = new Float32Array(16);

  e[0]  = ct / aspect;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = ct;
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -(far + near) * rd;
  e[11] = -1;

  e[12] = 0;
  e[13] = 0;
  e[14] = -2 * near * far * rd;
  e[15] = 0;

  var m = new Matrix4();
  m.elements = e; 
  this.multiply(m);
};
/*----------------------------------------
 スケーリング行列をつくりthisに右からかける
 x: X方向の倍率
 y: Y方向の倍率
 z: Z方向の倍率
-------------------------------------------*/
Matrix4.prototype.scale = function(x, y, z) 
{
  var e = new Float32Array(16);

  e[0] = x;  e[4] = 0;  e[8]  = 0;  e[12] = 0;
  e[1] = 0;  e[5] = y;  e[9]  = 0;  e[13] = 0;
  e[2] = 0;  e[6] = 0;  e[10] = z;  e[14] = 0;
  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  var m = new Matrix4();
  m.elements = e; 
  this.multiply(m);
};

/*-----------------------------------
 平行移動行列をつくり右からかける
 x: X方向の移動量
 y: Y方向の移動量
 z: Z方向の移動量
-------------------------------------*/
Matrix4.prototype.translate = function(x, y, z) 
{
  var e = new Float32Array(16);

  e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
  e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
  e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  var m = new Matrix4();
  m.elements = e; 
  this.multiply(m);  
};

/*------------------------------
 * 回転行列をつくり右からかける
 angle: 回転角 [度]
 x: 回転軸方向ベクトルのX成分
 y: 回転軸方向ベクトルのY成分
 z: 回転軸方向ベクトルのZ成分
--------------------------------*/
Matrix4.prototype.rotate = function(angle, x, y, z) 
{
  var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

  angle = Math.PI * angle / 180;
  
  var e = new Float32Array(16);

  s = Math.sin(angle);
  c = Math.cos(angle);

  if (0 !== x && 0 === y && 0 === z) {
    // X軸まわりの回転
    if (x < 0) {
      s = -s;
    }
    e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
    e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
    e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else if (0 === x && 0 !== y && 0 === z) {
    // Y軸まわりの回転
    if (y < 0) {
      s = -s;
    }
    e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
    e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
    e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else if (0 === x && 0 === y && 0 !== z) {
    // Z軸まわりの回転
    if (z < 0) {
      s = -s;
    }
    e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
    e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else {
    // その他の任意軸まわりの回転
    len = Math.sqrt(x*x + y*y + z*z);
    if (len !== 1) {
      rlen = 1 / len;
      x *= rlen;
      y *= rlen;
      z *= rlen;
    }
    nc = 1 - c;
    xy = x * y;
    yz = y * z;
    zx = z * x;
    xs = x * s;
    ys = y * s;
    zs = z * s;

    e[ 0] = x*x*nc +  c;
    e[ 1] = xy *nc + zs;
    e[ 2] = zx *nc - ys;
    e[ 3] = 0;

    e[ 4] = xy *nc - zs;
    e[ 5] = y*y*nc +  c;
    e[ 6] = yz *nc + xs;
    e[ 7] = 0;

    e[ 8] = zx *nc + ys;
    e[ 9] = yz *nc - xs;
    e[10] = z*z*nc +  c;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;
  }
  
  var m = new Matrix4();
  m.elements = e;
  this.multiply(m);
};

/*------------------------------------------------
 視野変換行列を設定する。
 eyeX, eyeY, eyeZ: 視点の位置
 centerX, centerY, centerZ: 注視点の位置
 upX, upY, upZ: カメラの上方向を表す方向ベクトル
--------------------------------------------------*/
Matrix4.prototype.lookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) 
{
  var fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

  fx = centerX - eyeX;
  fy = centerY - eyeY;
  fz = centerZ - eyeZ;

  // fを正規化する
  rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
  fx *= rlf;
  fy *= rlf;
  fz *= rlf;

  // fとupの外積を求める
  sx = fy * upZ - fz * upY;
  sy = fz * upX - fx * upZ;
  sz = fx * upY - fy * upX;

  // sを正規化する
  rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
  sx *= rls;
  sy *= rls;
  sz *= rls;

  // sとfの外積を求める
  ux = sy * fz - sz * fy;
  uy = sz * fx - sx * fz;
  uz = sx * fy - sy * fx;

  var e = new Float32Array(16);
  
  e[0] = sx;
  e[1] = ux;
  e[2] = -fx;
  e[3] = 0;

  e[4] = sy;
  e[5] = uy;
  e[6] = -fy;
  e[7] = 0;

  e[8] = sz;
  e[9] = uz;
  e[10] = -fz;
  e[11] = 0;

  e[12] = 0;
  e[13] = 0;
  e[14] = 0;
  e[15] = 1;

  var m = new Matrix4();
  m.elements = e; 
  // 平行移動する
  m.translate(-eyeX, -eyeY, -eyeZ);
  
  this.multiply(m);
};

/*-----------------------------------------------------------------------
 頂点を平面上に射影するような行列を右からかける。
 plane: 平面方程式 ax + by + cz + d = 0 の係数[a, b, c, d]を格納した配列
 light: 光源の同次座標を格納した配列。light[3]=0の場合、平行光源を表す
 ------------------------------------------------------------------------*/
Matrix4.prototype.dropShadow = function(plane, light) 
{
  var e = new Float32Array(16);

  var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

  e[ 0] = dot - light[0] * plane[0];
  e[ 1] =     - light[1] * plane[0];
  e[ 2] =     - light[2] * plane[0];
  e[ 3] =     - light[3] * plane[0];

  e[ 4] =     - light[0] * plane[1];
  e[ 5] = dot - light[1] * plane[1];
  e[ 6] =     - light[2] * plane[1];
  e[ 7] =     - light[3] * plane[1];

  e[ 8] =     - light[0] * plane[2];
  e[ 9] =     - light[1] * plane[2];
  e[10] = dot - light[2] * plane[2];
  e[11] =     - light[3] * plane[2];

  e[12] =     - light[0] * plane[3];
  e[13] =     - light[1] * plane[3];
  e[14] =     - light[2] * plane[3];
  e[15] = dot - light[3] * plane[3];

  var m = new Matrix4();
  m.elements = e; 
  
  this.multiply(m);
}
;
/*----------------------------------------------------------------------------
   階層構造用Rigidクラス
   2014.9.17 更新
----------------------------------------------------------------------------*/


var MAX_VERTEX = 30;//多面体近似のときの頂点数
var muK = 1.0;//0.5;//動摩擦係数
var muS = 1.0;//静止摩擦係数
var restitution = 0.5;//跳ね返り係数
var dampRotation = 3.0;//回転減速係数
var gravity = 9.8;//重力加速度[m/s^2] 
var restValue = 0.2; //静止状態にするしきい値（速度，回転速度）
var flagDrag = false;//空気抵抗フラグ
var flagMagnus = false;
var flagTumbling = false;
var flagQuaternion = false;

function Rigid_HS()
{
  //プロパティ
  this.kind = "SPHERE";
  this.diffuse = [0.6, 0.6, 0.6, 1.0];
  this.ambient = [0.4, 0.4, 0.4, 1.0];
  //this.specular = [0.8, 0.8, 0.8, 1.0];
  this.specular = [0.5, 0.5, 0.5, 1.0];
  this.shininess = 200.0; 
  this.vVel = new Vector3();//速度(m/s) 
  this.vVel0 = new Vector3();//更新前の速度
  this.vPos = new Vector3();//位置(m)
  this.vPos0 = new Vector3();//初期位置
  this.vForce = new Vector3();//外力（Newton)
  this.vForce0 = new Vector3();//外力（初期値)
  this.vOmega = new Vector3();//角速度(rad/s)
  this.vOmega0 = new Vector3();//角速度(rad/s),更新前  
  this.vAcc = new Vector3();//加速度
  this.vTorque = new Vector3();//トルク
  this.vEuler0 = new Vector3();//回転角度（オイラー角で指定,更新前）
  this.vEuler = new Vector3();//回転角度（オイラー角で指定,更新後）
  this.vSize = new Vector3(1.0, 1.0, 1.0);//スケーリング
  this.vGravityToPoint = new Vector3();//重心から衝突点までのベクトル
  this.mass = 1;//質量[kg]
  this.mInertia = new Matrix3();//慣性モーメントのテンソル
  this.mInertiaInverse = new Matrix3();//その逆行列
  this.vInertialResistance = new Vector3();
  this.vRotationalResistance = new Vector3();
  
  this.q = new Quaternion();
  this.vAxis = new Vector3(1.0, 0.0, 0.0);//回転軸
  this.angle = 0.0;
  this.nSlice = 25;
  this.nStack = 25; 
  this.radiusRatio = 0.2;//上底半径/下底半径（トーラスとバネの時はradius1/radius2)
  this.eps1 = 1.0;//"SUPER"のパラメータ
  this.eps2 = 1.0;//"SUPER"のパラメータ
  this.flagDebug = false;//trueのときワイヤーフレームモデル
  this.shadow = 0.0;//影の濃さを表す（0.0なら実オブジェクト)
  //フロア表示のチェック模様
  this.flagCheck = false;
  this.col1 = [0.6, 0.5, 0.5, 1.0];
  this.col2 = [0.4, 0.4, 0.6, 1.0];
  this.plane = [0, 0, 1, 0];//簡易シャドウを描くときの平面の平面方程式
  //テクスチャ
  this.flagTexture = false;
  this.nRepeatS = 1;
  this.nRepeatT = 1;
  //衝突判定などに使われるプロパティ
　this.vP = [];
  this.vP0 = [];//球以外の頂点座標
  this.vNormal = new Vector3();
  this.vNormalFacet = [];//直方体の面の法線ベクトル
  this.numVertex;//球以外の多面体の頂点数
  this.boundingR;//境界球の半径
  this.state = "FREE";
  this.flagFixed = false;
  //tumbling特有のプロパティ
  this.coefLift = 1.0;//揚力係数
  this.delta = 0.5;//シフト率
  //Spring特有のプロパティ
  this.nPitch = 5;//バネ
  this.radius = 0.5;//バネはvSizeを使用しない
  this.len0 = 1;//バネの自然長
  this.len = 1;//length0+変位量  
  this.constant;//バネ定数
  this.row = [];
  this.col = [];
  //水面の波などの表現
  this.sizeX = 10;
  this.sizeY = 10;
  this.data = [];//各格子点のx,y,z座標(kind = "GRID_SQUARE"などのときに必要なデータ)
                 //kind = "ELEVATION"のときはｚ成分だけ
  //SUPER2のパラメータ
  this.size1 = [0.5, 0.2, 0.5];  
  this.size2 = [0.5, 0.2, 0.5];   
  this.middle = 0.5; //中間のサイズ
  this.angle2 = 0;//曲げる角度（度）
  this.jStart = 1;
  this.type = 0;//0,1,2だけ               
}

Rigid_HS.prototype.initVertexBuffers = function(gl)
{
  //頂点データをシェーダへアップロードするメソッド
  var n;
  var vertices = [];//頂点座標
  var normals = []; //法線ベクトル
  var indices = []; //頂点番号
  var colors = [];//check模様のときだけ
  var texCoords = [];//テクスチャ座標

  if(!this.flagTexture)
  {//非テクスチャ用
    if     (this.kind == "CUBE")    n = makeCube(vertices, normals, indices, this.flagDebug);
    else if(this.kind == "SPHERE")  n = makeSphere(vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CYLINDER")n = makeCylinder(vertices, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug);
    else if(this.kind == "PRISM")   n = makePrism(vertices, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug);
    else if(this.kind == "TORUS")   n = makeTorus(vertices, normals, indices, this.radiusRatio, this.nSlice, this.nStack);
    else if(this.kind == "SUPER")   n = makeSuper(vertices, normals, indices, this.nSlice, this.nStack, this.eps1, this.eps2);
    else if(this.kind == "SUPER2")   n = makeSuper2(vertices, normals, indices, this.size1, this.size2, this.nSlice, this.nStack, this.eps1, this.eps2, this.middle, this.angle2, this.jStart, this.type);
    else if(this.kind == "SPRING")   n = makeSpring(vertices, normals, indices, this.radius, this.radiusRatio, this.nSlice, this.nStack, this.nPitch, this.len);
    else if(this.kind == "CYLINDER_X") n = makeCylinderX(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "CYLINDER_Y") n = makeCylinderY(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "CYLINDER_Z") n = makeCylinderZ(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "PLATE_Z")    n = makePlateZ(vertices, normals, indices, this.flagDebug);
    else if(this.kind == "GRID_PLATE") n = makeGridPlate(vertices, normals, indices, this.nSlice, this.nStack, this.flagDebug);
    else if(this.kind == "GRID_SQUARE") n = makeGridSquare(this.data, vertices, normals, indices, this.nSlice, this.nStack, this.flagDebug);
    else if(this.kind == "ELEVATION") n = makeElevation(this.data, vertices, normals, indices, this.nSlice, this.nStack, this.sizeX, this.sizeY, this.flagDebug)
    else if(this.kind == "CHECK_PLATE") n = makeCheckedPlate(vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2) ;  
    else if(this.kind == "CHECK_SQUARE") n = makeCheckedSquare(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2) ;  
    else if(this.kind == "GRID_SPHERE") n = makeGridSphere(this.data, vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CHECK_SPHERE") n = makeCheckedSphere(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2);
    else if(this.kind == "GRID_CYLINDER") n = makeGridCylinder(this.data, vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CHECK_CYLINDER") n = makeCheckedCylinder(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2);
  }
  else
  {//テクスチャ用
    if     (this.kind == "CUBE")    n = makeCubeTex(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "CUBE_BUMP") n = makeCubeBump(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "SPHERE")  n = makeSphereTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "CYLINDER")n =  makeCylinderTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "PRISM")   n = makePrismTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "TORUS")   n = makeTorusTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "SUPER")   n = makeSuperTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.eps1, this.eps2, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "PLATE_Z") n = makePlateZTex(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_PLATE") n = makeGridPlateTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_SQUARE") n = makeGridSquareTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_SPHERE") n = makeGridSphereTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_CYLINDER") n = makeGridCylinderTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
  }
  gl.disableVertexAttribArray(colorLoc);//colorのバッファオブジェクトの割り当てを無効化（フロアを表示したとき，フロアのインデックス以上の球やトーラスを描画できなくなることを防ぐため）


  // バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();
  if(this.flagTexture) {var texCoordBuffer = gl.createBuffer();}
  var normalBuffer = gl.createBuffer();
  if(this.flagCheck) var colorBuffer = gl.createBuffer();
  var indexBuffer = gl.createBuffer();
  if (!vertexBuffer || !normalBuffer || !indexBuffer) return -1;
  
  // 頂点の座標をバッファ・オブジェクトに書き込む
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(vertices), gl.STATIC_DRAW);
  // vertexLocにバッファ・オブジェクトを割り当てる
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  gl.vertexAttribPointer(vertexLoc, 3, gl.FLOAT, false, 0, 0);
  // バッファ・オブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(vertexLoc);//有効化する

  if(this.flagTexture)
  {
    // 頂点のテクスチャ座標をバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(texCoords), gl.STATIC_DRAW);
    // texLocにバッファオブジェクトを割り当てる
    var texLoc = gl.getAttribLocation(gl.program, 'a_texCoord');
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
    // バッファオブジェクトのバインドを解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.enableVertexAttribArray(texLoc);//有効化する
  }

  if(this.flagCheck)
  {
    // 頂点の色をバッファ・オブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // a_colorの格納場所を取得し、バッファオブジェクトを割り当てる
    var colorLoc = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    // バッファ・オブジェクトのバインドを解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.enableVertexAttribArray(colorLoc);//有効化
  }

  // 法線データをバッファ・オブジェクトに書き込む
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(normals), gl.STATIC_DRAW);
  // normalLocにバッファ・オブジェクトを割り当てる
  var normalLoc = gl.getAttribLocation(gl.program, 'a_normal');
  gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(normalLoc);//有効化する

  //バッファ・オブジェクトをターゲットにバインドする
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // インデックスデータをバッファ・オブジェクトに書き込む
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}

Rigid_HS.prototype.draw = function(gl, n, modelMatrix)
{
  //マテリアル特性のユニフォーム変数格納場所を取得し値を設定する
  var diffLoc = gl.getUniformLocation(gl.program, 'u_diffuseColor');
  gl.uniform4fv(diffLoc, new Float32Array(this.diffuse));
  var ambiLoc = gl.getUniformLocation(gl.program, 'u_ambientColor');
  gl.uniform4fv(ambiLoc, new Float32Array(this.ambient));
  var specLoc = gl.getUniformLocation(gl.program, 'u_specularColor');
  gl.uniform4fv(specLoc, new Float32Array(this.specular));
  var shinLoc = gl.getUniformLocation(gl.program, 'u_shininess');
  gl.uniform1f(shinLoc, this.shininess);
　var checkLoc = gl.getUniformLocation(gl.program, 'u_flagCheck');
　gl.uniform1i(checkLoc, this.flagCheck);
  var shadowLoc = gl.getUniformLocation(gl.program, 'u_shadow');
  gl.uniform1f(shadowLoc, this.shadow);
  var flagTexLoc = gl.getUniformLocation(gl.program, 'u_flagTexture');
  gl.uniform1i(flagTexLoc, this.flagTexture);

  //法線変換行列を計算する
  var normalMatrix = new Matrix4();// 初期化
  if(this.shadow < 0.01)//影でないときだけ
  {
    normalMatrix.setInverseOf(modelMatrix);//モデルリング行列の逆行列を求め
    normalMatrix.transpose();              //さらに転置する
  }
  //それぞれの行列のuniform変数の格納場所を取得し値を設定する
  var modelMatrixLoc = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  gl.uniformMatrix4fv(modelMatrixLoc, false, modelMatrix.elements);
  var normalMatrixLoc = gl.getUniformLocation(gl.program, 'u_normalMatrix');
  gl.uniformMatrix4fv(normalMatrixLoc, false, normalMatrix.elements);
  //物体を描画する
  if(this.flagDebug == false)//solidモデルで描画
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
  else//wireframeモデルで描画
  {
    if(this.kind == "GRID_SQUARE" || this.kind == "CHECK_SQUARE" || this.kind == "ELEVATION")
      gl.drawElements(gl.LINES, n, gl.UNSIGNED_SHORT, 0);
    else
      gl.drawElements(gl.LINE_STRIP, n, gl.UNSIGNED_SHORT, 0);
  }
}
;
//--------------------------------------------------
//swgPrimitive.js
//--------------------------------------------------

function makeCube(vertices, normals, indices, flagDebug)
{
  // 1辺が1の立方体を生成する
  //    p2----- p1
  //   /|      /|
  //  p3------p0|
  //  | |     | |
  //  | |p6---|-|p5
  //  |/      |/
  //  p7------p4
  
  // 頂点座標
  var vv = [
     0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5,-0.5, 0.5,   0.5,-0.5, 0.5, //p0-p1-p2-p3 上(0,1,2,3)
     0.5, 0.5, 0.5,   0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5,-0.5, //p0-p3-p7-p4 前(4,5,6,7)
     0.5, 0.5, 0.5,   0.5, 0.5,-0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5, //p0-p4-p5-p1 右(8,9,10,11)
    -0.5, 0.5, 0.5,  -0.5, 0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5, //p1-p5-p6-p2 奥(12,13,14,15)
    -0.5,-0.5,-0.5,   0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5, //p6-p7-p3-p2 左(16,17,18,19)
     0.5, 0.5,-0.5,   0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5  //p4-p7-p6-p5 下(20,21,22,23)
  ];
  for(var i = 0; i < vv.length; i++) vertices[i] = vv[i];
  
  // 法線
  var nn = [
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  //p0-p1-p2-p3 上
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  //p0-p3-p7-p4 前
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  //p0-p4-p5-p1 右
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  //p1-p5-p6-p2 奥
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  //p6-p7-p3-p2 左
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   //p4-p7-p6-p5 下
  ];
  for(var i = 0; i < nn.length; i++) normals[i] = nn[i];
  // インデックス
  if(flagDebug == false)//solid model
  {//各三角形頂点に対するインデックス
    var ii = [
       0, 1, 2,   0, 2, 3,    // 上
       4, 5, 6,   4, 6, 7,    // 前
       8, 9,10,   8,10,11,    // 右
      12,13,14,  12,14,15,    // 奥
      16,17,18,  16,18,19,    // 左
      20,21,22,  20,22,23     // 下
    ];
    for(var i = 0; i < ii.length; i++) indices[i] = ii[i];
  }
  else
  {//wireframe model
    var i2 = [
      0, 1, 2, 3,
      4, 5, 6, 7,
      8, 9, 10, 11,
      12, 13, 14, 15,
      16, 17, 18, 19,
      22, 23, 20, 21
    ];
    for(var i = 0; i < i2.length; i++) indices[i] = i2[i];
  }
  return indices.length;
}

//-----------------------------------------------
function makeSphere(vertices, normals, indices, nSlice, nStack)
{
//直径が1の球(鉛直軸はｚ）
  //nSlice:経度方向(i)分割数
  //nStack:緯度方向(j)分割数

  var i, phi, si, ci;
  var j, theta, sj, cj;
  var r = 0.5;
  
  // 頂点座標を生成する
  for (j = 0; j <= nStack; j++) 
  {
    theta = j * Math.PI / nStack;
    sj = r * Math.sin(theta);
    cj = r * Math.cos(theta);
    for (i = 0; i <= nSlice; i++) 
    {
      phi = i * 2 * Math.PI / nSlice;
      si = Math.sin(phi);
      ci = Math.cos(phi);

      vertices.push(sj * ci);//x
      vertices.push(sj * si);//y
      vertices.push(cj);     //z
    }
  }

  var k1, k2;
  // インデックスを生成する
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
      k1 = j * (nSlice+1) + i;
      k2 = k1 + (nSlice+1);

      indices.push(k1);
      indices.push(k2);
      indices.push(k1 + 1);

      indices.push(k1 + 1);
      indices.push(k2);
      indices.push(k2 + 1);
    }
  }

  // 頂点座標と法線は同じものが使える
  for(var i = 0; i < vertices.length; i++) normals[i] = vertices[i];
  
  return indices.length;

}

//----------------------------------------------------------------------
function makeCylinder(vertices, normals, indices, radiusRatio, nSlice, flagDebug)
{
  //半径0.5，高さ1.0の円柱
  //円柱(rBottom=rTop))、円錐台、円錐(rTop = 0.0)
  //nSlice--xy断面分割数
  
  var rBottom = 0.5;//下底半径
  var rTop = rBottom * radiusRatio;//上底半径
  var height = 1.0;//高さ
  //物体の中心は下底と上底の中間
  var i, j;
  var phi;
  var phi0 = 2.0*Math.PI/nSlice;
  
  //上底(Top)
  vertices[0] = 0.0; vertices[1] = 0.0; vertices[2] = height/2.0; //中心点
  normals[0]  = 0.0; normals[1]  = 0.0; normals[2]  = 1.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = i * phi0;
    vertices.push(rTop * Math.cos(phi));//x
    vertices.push(rTop * Math.sin(phi));//y
    vertices.push(height/2.0);          //z
    normals.push(0.0); //x
    normals.push(0.0); //y
    normals.push(1.0); //z
  }
  //側面(Side)
  var rr = rBottom - rTop;//半径差
  var ss = Math.sqrt(rr*rr + height*height);//斜辺
  var nz = rr / ss;
  var nxy = height / ss;
  var hh, r0;
  
  for(j = 0; j <= 1; j++)
  {
    if(j == 0) { hh = height / 2.0; r0 = rTop; }
    else { hh = - height / 2.0; r0 = rBottom; }
    
    for(i = 0; i <= nSlice; i++)
    {
       phi = i * phi0;
       vertices.push(r0 * Math.cos(phi));//x座標
       vertices.push(r0 * Math.sin(phi));//y座標
       vertices.push(hh); //z座標
       
       //法線ベクトル
       normals.push(nxy * Math.cos(phi));//x
       normals.push(nxy * Math.sin(phi));//y
       normals.push(nz);                 //z
    }  
  }
 
  var nd = vertices.length;//これまでの頂点データ個数
  //下底（Bottom)
  vertices[nd] = 0.0; vertices[nd+1] = 0.0; vertices[nd+2] = -height/2.0; //中心点
  normals[nd]  = 0.0; normals[nd+1]  = 0.0; normals[nd+2]  = -1.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = -i * phi0;//時計回り
    vertices.push(rBottom * Math.cos(phi));//x
    vertices.push(rBottom * Math.sin(phi));//y
    vertices.push(-height/2.0);            //z
    normals.push( 0.0); //x
    normals.push( 0.0); //y
    normals.push(-1.0); //z
  }

  //index
  if(flagDebug == false)
  {
    //Top
    for(var i = 0; i < nSlice; i++)
    {
      indices.push(0); indices.push(i+1); indices.push(i+2); 
    }
    for(i = 0; i < nSlice; i++)
    {//各面に三角形要素が2つ
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(nSlice + 3 + i);
      
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
    }
    //Bottom 
    var nv = nd / 3; //中心点の頂点番号 
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nv); indices.push(nv+i+1); indices.push(nv+i+2);
    }
  }
  else //wireframe
  {//側面だけでよい
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
      indices.push(nSlice + 2 + i);
    }
  }
  return indices.length;
}


//----------------------------------------------------------------------
function makePrism(vertices, normals, indices, radiusRatio, nSlice, flagDebug)
{
  //半径0.5，高さ1.0の円柱に内接する多角柱
  //多角柱(rBottom=rTop))、多角錐台、多角錐(rTop = 0.0)
  //nSlice--xy断面分割数

  var rBottom = 0.5;//下底半径
  var rTop = rBottom * radiusRatio;//上底半径
  var height = 1.0;//高さ

  var i, j;
  var phi, phi2;
  var phi0 = 2.0 * Math.PI/nSlice;
  
  //上底（Top)
  vertices[0] = 0.0; vertices[1] = 0.0; vertices[2] = height/2.0; //中心点
  normals[0]  = 0.0; normals[1]  = 0.0; normals[2]  = 1.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = i * phi0 + phi0/2;//平らな面が正面を向くようにphi0/2を追加
    vertices.push(rTop * Math.cos(phi));//x
    vertices.push(rTop * Math.sin(phi));//y
    vertices.push(height/2.0);          //z
    normals.push(0.0); //x
    normals.push(0.0); //y
    normals.push(1.0); //z
  }
  //側面(Side)
  var alpha = (nSlice - 2)*Math.PI / (2.0 * nSlice);
  var rr = (rBottom - rTop) * Math.sin(alpha);//半径差
  var ss = Math.sqrt(rr*rr + height*height);//斜辺
  var nz = rr / ss;
  var nxy = height / ss;
  var hh, r0;

  for(j = 0; j <= 1; j++)
  {
    //半径
    if(j == 0){ r0 = rTop; hh =  height/2.0; }
    else      {r0 = rBottom; hh = -height/2.0; }
    for(i = 0; i < nSlice; i++)
    {
      //1つの頂点に番号を2個必要
      phi = i * phi0 + phi0/2;
      phi2 = phi + phi0/2.0;
      //座標 
      vertices.push(r0 * Math.cos(phi));//x座標(外部から見て左側）
      vertices.push(r0 * Math.sin(phi));//y座標
      vertices.push(hh);                //z座標
      vertices.push(r0 * Math.cos(phi+phi0));//x座標（右側）
      vertices.push(r0 * Math.sin(phi+phi0));//y座標
      vertices.push(hh);                     //z座標
       
      //法線ベクトル(隣り合う頂点は同じ法線ベクトル）
      normals.push(nxy * Math.cos(phi2));//x
      normals.push(nxy * Math.sin(phi2));//y
      normals.push(nz);                  //z
      normals.push(nxy * Math.cos(phi2));//x
      normals.push(nxy * Math.sin(phi2));//y
      normals.push(nz);                  //z  
    }
  }

  var nd = vertices.length;//これまでの頂点データ個数
  //下底（Bottom)
  vertices[nd] = 0.0; vertices[nd+1] = 0.0; vertices[nd+2] = -height/2.0; //中心点
  normals[nd]  = 0.0; normals[nd+1]  = 0.0; normals[nd+2]  = -1.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = -i * phi0 ;//- phi0/2;//時計回り
    vertices.push(rBottom * Math.cos(phi));//x
    vertices.push(rBottom * Math.sin(phi));//y
    vertices.push(-height/2.0);            //z
    normals.push( 0.0); //x
    normals.push( 0.0); //y
    normals.push(-1.0); //z
  }
  
  //index
  if(flagDebug == false)
  {
    //Top
    for(var i = 0; i < nSlice; i++)
    {
      indices.push(0); indices.push(i+1); indices.push(i+2);
    }
    //Side
    for(i = 0; i < nSlice; i++)
    {//各面に三角形要素が2つ
      indices.push(nSlice + 2 + i*2);
      indices.push(3 * nSlice + 2 + i*2);
      indices.push(nSlice + 3 + i*2);
      
      indices.push(3 * nSlice + 2 + i*2);
      indices.push(3 * nSlice + 3 + i*2);
      indices.push(nSlice + 3 + i*2);
    }
    //Bottom 
    var nv = nd / 3; //中心点の頂点番号 
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nv); indices.push(nv+i+1); indices.push(nv+i+2);
    }
  }
  else//wireframe
  {
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nSlice + 2 + i*2);
      indices.push(3 * nSlice + 2 + i*2);
      indices.push(3 * nSlice + 3 + i*2);
      indices.push(nSlice + 3 + i*2);
      indices.push(nSlice + 2 + i*2);
    }  
  }

  return indices.length;
}

//---------------------------------------------
function makeTorus(vertices, normals, indices, radiusRatio, nSlice, nStack)
{	
  var radius1 = 0.5;//円環の中心軸半径(主半径）
  var radius2 = radiusRatio * radius1;//断面半径（副半径）
  //nSlice:円環断面における表面分割点数
  //nStack:円環の分割数
  if(radiusRatio > 1.0) { printf("radiusRatio < 1 としてください"); return;}

  var i, j;
  var rr, zz;
  var theta0, theta1, phi;

  //頂点座標，法線ベクトル
  for(j = 0; j <= nStack; j++)
  {
    //i=0は基本断面(x=radius1を中心とする円, y=0）
    theta0 = 2.0 * Math.PI * j / nStack;
    theta1 = 2.0 * Math.PI * (j+1) / nStack;
　　for(i = 0; i <= nSlice; i++)
    {
      phi = -Math.PI + 2.0 * Math.PI * i / nSlice;
      rr = radius1 + radius2 * Math.cos(phi);//z軸からの距離
      zz = radius2 * Math.sin(phi);
      //頂点のxyz座標(i=0を内側xy平面)
      vertices.push(rr * Math.cos(theta0));//x座標
      vertices.push(rr * Math.sin(theta0));//y
      vertices.push(zz);                   //z
      normals.push(Math.cos(phi)*Math.cos(theta0));//x
      normals.push(Math.cos(phi)*Math.sin(theta0));//y
      normals.push(Math.sin(phi));                 //z
    }
  }
  //インデックス
  for(j = 0; j < nStack; j++)
  {
　　for(i = 0; i < nSlice; i++)
    {
      indices.push((nSlice+1) * j + i);
      indices.push((nSlice+1) * (j+1) + i);
      indices.push((nSlice+1) * j + i+1);

      indices.push((nSlice+1) * (j+1) + i);
      indices.push((nSlice+1) * (j+1) + i+1);
      indices.push((nSlice+1) * j + i+1);
    }
  }
  return indices.length;
}
//---------------------------------------------
function makeSpring(vertices, normals, indices, radius, ratio, nSlice, nStack, nPitch, len)
{	
  var radius1 = radius ;//円環の中心軸半径(主半径）
  var radius2 = radius * ratio ;//断面半径（副半径）
  //nSlice:円環断面における表面分割点数
  //nStack:円環の分割数
  var pitch = len / nPitch;
  //縮んだときの制限
  if(pitch < 2 * radius2) pitch = 2.0 * radius2 ;
  var dp = pitch / nStack;
//alert("pitch="+pitch +"  dp="+dp);
  var i, j, k;
  var rr, zz;
  var theta0, theta1, phi;
  var phi0 = 2.0 * Math.PI / nSlice;
  
  //頂点座標，法線ベクトル

  //始端（下,負のｙ軸方向）
  vertices[0] = radius1; vertices[1] = 0.0; vertices[2] = -len/2.0; //中心点
  normals[0]  = 0.0; normals[1]  = -1.0; normals[2]  = 0.0;

  var r;
  for(i = 0; i <= nSlice; i++)
  {
    phi = i * phi0;
    vertices.push(radius1 + radius2 * Math.cos(phi));//x
    vertices.push(0.0);//y
    vertices.push(radius2 * Math.sin(phi) -len/2.0);//z
    normals.push(0.0); //x
    normals.push(-1.0); //y
    normals.push(0.0); //z
  }

  var hh = dp;
  for(k = 0; k < nPitch; k++)
  {
    hh -= dp;
    for(j = 0; j <= nStack; j++)
    {
      //i=0は基本断面(x=radius1を中心とする円, y=0）
      theta0 = 2.0 * Math.PI * j / nStack;
      theta1 = 2.0 * Math.PI * (j+1) / nStack;
　　  for(i = 0; i <= nSlice; i++)
      {
        phi = -Math.PI + phi0 * i;
        rr = radius1 + radius2 * Math.cos(phi);//z軸からの距離
        zz = radius2 * Math.sin(phi) + hh - len / 2;
        //頂点のxyz座標(i=0を内側xy平面)
        vertices.push(rr * Math.cos(theta0));//x座標
        vertices.push(rr * Math.sin(theta0));//y
        vertices.push(zz);                   //z
        normals.push(Math.cos(phi)*Math.cos(theta0));//x
        normals.push(Math.cos(phi)*Math.sin(theta0));//y
        normals.push(Math.sin(phi));                 //z
      }
      hh += dp;
    }
  }

  var nd = vertices.length;//これまでの頂点データ個数
  //終端（上、正のｙ軸方向)
  vertices[nd] = radius1; vertices[nd+1] = 0.0; vertices[nd+2] = len/2.0; //中心点
  normals[nd]  = 0.0; normals[nd+1]  = 1.0; normals[nd+2]  = 0.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = -i * phi0 ;//時計回り
    vertices.push(radius1 + radius2 * Math.cos(phi));//x
    vertices.push(0.0);//y
    vertices.push(radius2 * Math.sin(phi) + len/2.0);            //z
    normals.push( 0.0); //x
    normals.push( 1.0); //y
    normals.push( 0.0); //z
  }

  //インデックス
  //始端
  for(var i = 0; i < nSlice; i++)
  {
    indices.push(0); indices.push(i+1); indices.push(i+2);
  }
  for(k = 0; k < nPitch; k++)
  {
    for(j = 0; j < nStack; j++)
    {
　　  for(i = 0; i < nSlice; i++)
      {
        indices.push(nSlice+2 + (nSlice+1)*(nStack+1)*k + (nSlice+1) * j + i);
        indices.push(nSlice+2 + (nSlice+1)*(nStack+1)*k + (nSlice+1) * (j+1) + i);
        indices.push(nSlice+2 + (nSlice+1)*(nStack+1)*k + (nSlice+1) * j + i+1);

        indices.push(nSlice+2 + (nSlice+1)*(nStack+1)*k + (nSlice+1) * (j+1) + i);
        indices.push(nSlice+2 + (nSlice+1)*(nStack+1)*k + (nSlice+1) * (j+1) + i+1);
        indices.push(nSlice+2 + (nSlice+1)*(nStack+1)*k + (nSlice+1) * j + i+1);
      }
    }
  }

  //終端 
  var nv = nd / 3; //中心点の頂点番号 
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nv); indices.push(nv+i+1); indices.push(nv+i+2);
    }

  return indices.length;
}

//-----------------------------------------------------------------
function makeSuper(vertices, normals, indices, nSlice, nStack, eps1, eps2)
{
　//上下の中心が原点
　var i,j,ip,im,np,npL,npR,npU,npD,k;
　var ct,theta,phi,z,cc, ss, gg;
　var r = 0.5;//基本球の半径
  //頂点座標
  //j == 0;//Top（nSlice+1個）
  for (i = 0 ;i <= nSlice; i++)
  {
    vertices.push(0.0);//x
    vertices.push(0.0);//y
    vertices.push(r);  //z
  }
 
　for(j = 1 ;j < nStack;j++)
  {
    theta = (Math.PI/nStack) * (nStack / 2.0 - j);
		                //thetaはx-y平面からの偏角となっている
    if(theta >= 0.0) //上半分
    {
      z = r * Math.pow(Math.sin(Math.abs(theta)),eps1);
    }
    else//下半分        
	{
	  z = - r * Math.pow(Math.sin(Math.abs(theta)), eps1);
	}
    for (i = 0;i <= nSlice; i++)
    {
      phi = 2.0 * Math.PI * i/nSlice;
      ct = Math.cos(phi);
	  //if( ct == 0.0 ) cc = 0.0;
	  //else 
      if (ct >= 0) { cc = Math.pow(ct, eps2);}
	  else             { cc = -Math.pow(Math.abs(ct),eps2); }
      //座標
      vertices.push(r * Math.pow(Math.cos(theta),eps1)*cc);//x
	  if(i == 0 || i == nSlice/2 || i == nSlice) vertices.push(0.0);//y
      else 
      {
        ss = Math.sin(phi);
        gg = Math.pow(Math.abs(ss), eps2);
        if(i > nSlice/2) gg = -gg;
        vertices.push(r * Math.pow(Math.cos(theta),eps1) * gg);//y
      }
      vertices.push(z);//z	
    }//i
  }//j
  //j = nStack:Bottom（nSlice+1個）
  for(i = 0; i <= nSlice; i++)
  {
    vertices.push(0.0);//x
    vertices.push(0.0);//y
    vertices.push(-r); //z
  }
//alert("SUPER nn = " + vertices.length);

  var p1 = [], p2 = [], p3 = [];
  var n1 = [], n2 = [], n3 = [], n4 = [];
  //法線ベクトル
  //Top
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0);//x
    normals.push(0.0);//y
    normals.push(1.0);//z
  }
  //Side
  for(j = 1;j < nStack;j++)//隣り合う4個の三角形の法線ベクトルを平均化
  {
    for(i = 0;i <= nSlice;i++)
    {
      ip = i+1;
	  if(ip == nSlice+1) ip = 1;
	  im = i-1;
	  if(i == 0) im = nSlice-1;

      np  = j*(nSlice+1)+i;//注目点
	  npL = j*(nSlice+1)+im;//左側
	  npR = j*(nSlice+1)+ip;//右側
	  npU = np-nSlice-1;//上
	  npD = np+nSlice+1;//下
      
      p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];
	  p2[0]=vertices[3*npU]; p2[1]=vertices[3*npU+1]; p2[2]=vertices[3*npU+2];
	  p3[0]=vertices[3*npL]; p3[1]=vertices[3*npL+1]; p3[2]=vertices[3*npL+2];
	  calcNormal(p1,p2,p3,n1);//外から見て左上
	  p2[0]=vertices[3*npR]; p2[1]=vertices[3*npR+1]; p2[2]=vertices[3*npR+2];
	  p3[0]=vertices[3*npU]; p3[1]=vertices[3*npU+1]; p3[2]=vertices[3*npU+2];
	  calcNormal(p1,p2,p3,n2);//右上
      p2[0]=vertices[3*npL]; p2[1]=vertices[3*npL+1]; p2[2]=vertices[3*npL+2];
	  p3[0]=vertices[3*npD]; p3[1]=vertices[3*npD+1]; p3[2]=vertices[3*npD+2];
	  calcNormal(p1,p2,p3,n3);//外から見て左下
	  p2[0]=vertices[3*npD]; p2[1]=vertices[3*npD+1]; p2[2]=vertices[3*npD+2];
	  p3[0]=vertices[3*npR]; p3[1]=vertices[3*npR+1]; p3[2]=vertices[3*npR+2];
	  calcNormal(p1,p2,p3,n4);//右下
	  
      normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);//ｘ方向
	  normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);//ｙ
      normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//ｚ
    }
  }
  //Bottom
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0); //x
    normals.push(0.0); //y
    normals.push(-1.0);//z
  }

  //インデックス
  var k1, k2;
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
      k1 = j * (nSlice+1) + i;
      k2 = k1 + (nSlice+1);

      indices.push(k1);
      indices.push(k2);
      indices.push(k1 + 1);

      indices.push(k2);
      indices.push(k2 + 1);
      indices.push(k1 + 1);
    }
  }
  return indices.length;
}
//----------------------------------------------------------------------------
function makeSuper2(vertices, normals, indices, size1, size2, nSlice, nStack, 
          eps1, eps2, middle, angle, jStart, type)
{	
  //上下の中心が原点
  var i,j,ip,im,np,npL,npR,npU,npD,k;
  var ct,phi,theta,z,fz;
  var cc, xx, yy, zz, aa, sr, cr;

  for(j = 0 ;j <= nStack;j++)
  {
    theta = (Math.PI/nStack) * (nStack / 2 - j);
    if(theta > 0) z = Math.pow(Math.sin(theta),eps1);//z
    else z = - Math.pow(Math.sin(Math.abs(theta)), eps1);
    //形状関数
	if(z < 0.0) fz = (middle-1)*z + middle;
	else fz = (1-middle)*z + middle;

    for (i = 0 ;i <= nSlice ;i++)
    {
      k = (nSlice+1) * j + i;//object自身から見て左側(x > 0)
	  //k2 = nSlice * j + nSlice - i;//右側(x < 0)
	  phi = 2 * Math.PI * i/nSlice;
      ct = Math.cos(phi);
      if (ct >= 0) { cc = Math.pow(ct, eps2);}
      else  { cc = -Math.pow(Math.abs(ct),eps2); }
      if(j == 0 || j == nStack) 
      {
        vertices[3*k] = 0.0;  //x
        vertices[3*k+1] = 0.0;//y
      }
	  else 
	  {
	    if(j <= nStack/2)
		{
		  vertices[3*k] = size1[0] * Math.pow(Math.cos(theta),eps1)*cc*fz;
		  vertices[3*k+1] = size1[1] * Math.pow(Math.cos(theta),eps1)*Math.pow(Math.abs(Math.sin(phi)),eps2)*fz;
		  if(i > nSlice/2) vertices[3*k+1] = - vertices[3*k+1];
        }
		else
		{
		  vertices[3*k] = size2[0] * Math.pow(Math.cos(theta),eps1)*cc*fz;
		  vertices[3*k+1] = size2[1] * Math.pow(Math.cos(theta),eps1)*Math.pow(Math.abs(Math.sin(phi)),eps2)*fz;
		  if(i > nSlice/2) vertices[3*k+1] = - vertices[3*k+1];
		}
      }
	  //if(i == 0) k2 = k;

      //vertices[3*k2] = vertices[3*k];
      //vertices[3*k2+1] = -vertices[3*k+1];
      if(j <= nStack/2)
	  {
		vertices[3*k+2] = size1[2] * z;
		//vertices[3*k2+2] = size1[2] * z;
      }
	  else
	  {
		vertices[3*k+2] = size2[2] * z;
		//vertices[3*k2+2] = size2[2] * z;
      }
    }
  }
//alert("SUPER2 nn = " + vertices.length);

  //変形
  if(type == 0)
  {
	//前方：z軸
	//z軸回転(x>0なら正のz軸回転，x<0なら負のz軸回転）
	for(j = jStart; j <= nStack; j++)
	{
	  for(i = 0; i <= nSlice; i++)
	  {
		k = (nSlice+1) * j + i;//自分から見て左側(x > 0)
		xx = vertices[3*k]; 
        yy = vertices[3*k+1];
		if(j <= nStack/2)
		  aa = Math.PI * angle * Math.abs(xx) / size1[0] / 180.0;
		else
		  aa = Math.PI * angle * Math.abs(xx) / size2[0] / 180.0;
        cr = Math.cos(aa);
		sr = Math.sin(aa);
		if(xx > 0.0)
		{
		  vertices[3*k] = xx * cr - yy * sr;//x
		  vertices[3*k+1] = xx * sr + yy * cr;//y
		}
		else
		{
		  vertices[3*k] = xx * cr + yy * sr ;
		  vertices[3*k+1] = -xx * sr + yy * cr;
		}
      }
	}
  }
  else if(type == 1)
  {
	//前方：z軸
	//後半を上下（x軸回転）
	for(j = jStart; j <= nStack; j++)
	{
      for(i = 0; i <= nSlice; i++)
	  {
		k = (nSlice+1) * j + i;
		yy = vertices[3*k+1]; zz = vertices[3*k+2];
		aa = Math.PI * angle / 180.0 * (j-jStart) / nSlice;
		cr = Math.cos(aa);
		sr = Math.sin(aa);
		vertices[3*k+1] = yy * cr - zz * sr;
		vertices[3*k+2] = yy * sr + zz * cr;
	  }
	}
  }
  else if(type == 2)
  {
	//前方：z軸
	//後半を左右（y軸回転）
	for(j = jStart; j <= nStack; j++)
	{
	  for(i = 0; i <= nSlice; i++)
	  {
		k = (nSlice+1) * j + i;
		xx = vertices[3*k]; zz = vertices[3*k+2];
		aa = Math.PI * angle / 180.0 * (j-jStart) / nSlice;
		cr = Math.cos(aa);
		sr = Math.sin(aa);
		vertices[3*k] = xx * cr + zz * sr;
		vertices[3*k+2] = -xx * sr + zz * cr;
	  }
    }
  }

  var p1 = [], p2 = [], p3 = [];
  var n1 = [], n2 = [], n3 = [], n4 = [];
  //法線ベクトル
  //Top
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0);//x
    normals.push(0.0);//y
    normals.push(1.0);//z
  }
  //Side
  for(j = 1;j < nStack;j++)//隣り合う4個の三角形の法線ベクトルを平均化
  {
    for(i = 0;i <= nSlice;i++)
    {
      ip = i+1;
	  if(ip == nSlice+1) ip = 1;
	  im = i-1;
	  if(i == 0) im = nSlice-1;

      np  = j*(nSlice+1)+i;//注目点
	  npL = j*(nSlice+1)+im;//左側
	  npR = j*(nSlice+1)+ip;//右側
	  npU = np-nSlice-1;//上
	  npD = np+nSlice+1;//下
      
      p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];
	  p2[0]=vertices[3*npU]; p2[1]=vertices[3*npU+1]; p2[2]=vertices[3*npU+2];
	  p3[0]=vertices[3*npL]; p3[1]=vertices[3*npL+1]; p3[2]=vertices[3*npL+2];
	  calcNormal(p1,p2,p3,n1);//外から見て左上
	  p2[0]=vertices[3*npR]; p2[1]=vertices[3*npR+1]; p2[2]=vertices[3*npR+2];
	  p3[0]=vertices[3*npU]; p3[1]=vertices[3*npU+1]; p3[2]=vertices[3*npU+2];
	  calcNormal(p1,p2,p3,n2);//右上
      p2[0]=vertices[3*npL]; p2[1]=vertices[3*npL+1]; p2[2]=vertices[3*npL+2];
	  p3[0]=vertices[3*npD]; p3[1]=vertices[3*npD+1]; p3[2]=vertices[3*npD+2];
	  calcNormal(p1,p2,p3,n3);//外から見て左下
	  p2[0]=vertices[3*npD]; p2[1]=vertices[3*npD+1]; p2[2]=vertices[3*npD+2];
	  p3[0]=vertices[3*npR]; p3[1]=vertices[3*npR+1]; p3[2]=vertices[3*npR+2];
	  calcNormal(p1,p2,p3,n4);//右下
	  
      normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);//ｘ方向
	  normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);//ｙ
      normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//ｚ
    }
  }
  //Bottom
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0); //x
    normals.push(0.0); //y
    normals.push(-1.0);//z
  }

  //インデックス
  var k1, k2;
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
      k1 = j * (nSlice+1) + i;
      k2 = k1 + (nSlice+1);

      indices.push(k1);
      indices.push(k2);
      indices.push(k1 + 1);

      indices.push(k2);
      indices.push(k2 + 1);
      indices.push(k1 + 1);
    }
  }
  return indices.length;
}

//----------------------------------------------------------
//法線方向計算ルーチン
function calcNormal(p1, p2, p3, nn)
{
	var A = new Vector3(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);
	var B = new Vector3(p3[0] - p2[0], p3[1] - p2[1], p3[2] - p2[2]);
	var n = cross(A , B);//外積
	n.norm();
	nn[0] = n.x; nn[1] = n.y; nn[2] = n.z;
}
//--------------------------------------------------------
function makePlateZ(vertices, normals, indices, flagDebug)
{
  var i;
  //1辺が1.0の正方形
  var vv = [ 0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            -0.5,-0.5, 0.0,
             0.5,-0.5, 0.0,
             0.5, 0.5, 0.0];
  for(i = 0; i < vv.length; i++) vertices[i] = vv[i];
  for(i = 0; i < vv.length; i++)
  {
    normals.push(0.0); normals.push(0.0); normals.push(1.0);
  }
  //indices
  if(flagDebug == false)
  {
    var ii = [ 0, 1, 2,   
               0, 2, 3];
    for(var i = 0; i < ii.length; i++) indices[i] = ii[i];
  }
  else
  {
    var i2 = [ 0, 1, 2, 3, 4];
    for(var i = 0; i < i2.length; i++) indices[i] = i2[i];
  }
//alert("naaaa= " + indices.length);
  return indices.length;
}

//-------------------------------------------------------
function makeGridPlate(vertices, normals, indices, nSliceX, nSliceY, flagDebug)
{//1辺が1，xy平面，中心は原点
  var i, j;
  var pitchX = 1.0 / nSliceX;
  var pitchY = 1.0 / nSliceY;

  //verdices, normals
  for(i = 0; i <= nSliceX; i++)
  {
    for(j = 0; j <= nSliceY; j++)
    {
      //座標
      vertices.push(i * pitchX - 0.5);//x
      vertices.push(j * pitchY - 0.5);//y
      vertices.push(0.0);             //z
      //法線
      normals.push(0.0);//x
      normals.push(0.0);//y
      normals.push(1.0);//z
    }
  }
  //indices
  if(flagDebug == false)//solid model
  {
    for(j = 0; j < nSliceY; j++)
    {
      for(i = 0; i < nSliceX; i++)
      {
        indices.push((nSliceY+1) * i + j);
        indices.push((nSliceY+1) * (i+1) + j);
        indices.push((nSliceY+1) * i + j+1);
      
        indices.push((nSliceY+1) * (i+1) + j);
        indices.push((nSliceY+1) * (i+1) + j+1);
        indices.push((nSliceY+1) * i + j+1);
      }
    }
  }
  else//wireframe model
  {
    for(j = 0; j < nSliceY; j++)
    {
      for(i = 0; i < nSliceX; i++)
      {
        indices.push((nSliceY+1) * i + j); indices.push((nSliceY+1) * (i+1) + j);
        indices.push((nSliceY+1) * (i+1) + j);indices.push((nSliceY+1) * i + j+1);
        indices.push((nSliceY+1) * i + j+1);indices.push((nSliceY+1) * i + j);
      
        indices.push((nSliceY+1) * (i+1) + j);indices.push((nSliceY+1) * (i+1) + j+1);
        indices.push((nSliceY+1) * (i+1) + j+1);indices.push((nSliceY+1) * i + j+1);
      }
    }
  }
//console.log("nSliceX = " + nSliceX + " nSliceY = " + nSliceY + " len = " + indices.length);
  return indices.length;
}

//-------------------------------------------------------
function makeGridSquare(data, vertices, normals, indices, nSliceX, nSliceY, flagDebug)
{ 
  //例えば2次元バネ-質点モデル全体を1つの四辺形で表現
  //data[k][0]～data[k][2]で格子点iのx,y,z成分が与えられる。
  var i, j, k;
  //頂点座標vertices
  for(j = 0; j <= nSliceY; j++)
  {
    for(i = 0; i <= nSliceX; i++)
    {
      k = i + j * (nSliceX + 1);
//console.log("k = " + k + " nx = " + nSliceX + " ny = " + nSliceY);
//console.log("BBB k = " + k + " x = " + data[k][0] + " y = " + data[k][1] + " z = " + data[k][2]);
      //座標
      vertices.push(data[k][0]);//x
      vertices.push(data[k][1]);//y
      vertices.push(data[k][2]);//z
    }
  }

  //法線normals
  //角は1つの三角形、辺は2つの三角形、内部は4個の三角形の平均
  var np, npL, npR, npU, npL;
  var n1 = [], n2 = [], n3 = [], n4 = [];
  
  for(j = 0;j <= nSliceY;j++)
  {
    if(j == 0)
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          np = 0;  npD = 1; npR = nSliceX+1;
          calcNormal(data[np], data[npD], data[npR], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ
        }
        else if( i <  nSliceX)
        {//2つの三角形の平均
          np = i; npR = i+nSliceX+1; npU = i-1; npD = i+1;
          calcNormal(data[np], data[npR], data[npU], n1);
          calcNormal(data[np], data[npD], data[npR], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ
        }
        else//i == nSliceX
        {
          np = nSliceX;  npR = 2*nSliceX+1; npU = nSliceX-1;
          calcNormal(data[np], data[npD], data[npR], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ 
        }
      }
    }
    else if(j < nSliceY)
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          //2つの三角形の平均
          np = j * (nSliceX + 1); npL = np-(nSliceX+1); npD = np+1; npR = np+(nSliceX+1);
          calcNormal(data[np], data[npL], data[npD], n1);
          calcNormal(data[np], data[npD], data[npR], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ 
        } 
        else if(i < nSliceX)
        { //隣り合う4個の三角形の法線ベクトルを平均化
          np = i+j*(nSliceX+1); npU = np-1; npD = np+1;
          npL = i+(j-1)*(nSliceX+1); npR = i+(j+1)*(nSliceX+1);
          calcNormal(data[np], data[npU], data[npL], n1);
          calcNormal(data[np], data[npL], data[npD], n2);
          calcNormal(data[np], data[npD], data[npR], n3);
          calcNormal(data[np], data[npR], data[npU], n4);
          normals.push((n1[0] + n2[0] + n3[0] + n4[0]) / 4);//ｘ
          normals.push((n1[1] + n2[1] + n3[1] + n4[1]) / 4);//ｙ
          normals.push((n1[2] + n2[2] + n3[2] + n4[2]) / 4);//ｚ 
        }
        else
        {
          //i = nSliceX;
          //2つの三角形の平均
          np = nSliceX+j*(nSliceX+1); npL = np-(nSliceX+1); npU = np-1; npR = np+(nSliceX+1);
          calcNormal(data[np], data[npU], data[npL], n1);
          calcNormal(data[np], data[npR], data[npU], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ 
        }
      }
    }
    else//j= nSliceY
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          np = nSliceY*(nSliceX+1); npL = (nSliceY-1)*(nSliceX+1); npD = np+1; 
          calcNormal(data[np], data[npL], data[npD], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ
        }
        else if( i < nSliceX)
        {//2つの三角形の平均
          np = i+nSliceY*(nSliceX+1); npL = np-(nSliceX+1); npU = np-1; npD = np+1;
          calcNormal(data[np], data[npU], data[npL], n1);
          calcNormal(data[np], data[npL], data[npD], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ
        }
        else
        {
          //i == nSliceX
          np = nSliceX+nSliceY*(nSliceX+1); npU = np-1; npL = np-(nSliceX+1);
          calcNormal(data[np], data[npU], data[npL], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ 
        }
      }
    }
  }
  //indices
  var np0, np1, np2, np3;
  //if(flagDebug)//solid model
  for(j = 0; j < nSliceY; j++)
  {
    for(i = 0; i < nSliceX; i++)
    { 
      np0 = i + j*(nSliceX+1); np1 = np0+1; np2 = np1+nSliceX+1; np3 = np2-1;
      if(flagDebug == false)//solid model
      {
        indices.push(np0); indices.push(np1); indices.push(np3);
        indices.push(np1); indices.push(np2); indices.push(np3);
      }
      else//wireframe model
      {//gl.LINESで一本ずつ表示（rigidクラスのdraw())
        indices.push(np0); indices.push(np1);  indices.push(np1); indices.push(np3);
        indices.push(np3); indices.push(np0);  indices.push(np1); indices.push(np2); 
        indices.push(np2); indices.push(np3);
      }
    }
  }
  return indices.length;
}

//-------------------------------------------------------
function makeElevation(data, vertices, normals, indices, nSliceX, nSliceY, sizeX, sizeY, flagDebug)
{ 
  //xy座標が固定され、ｚ座標だけが変化する波などを表現するプリミティブ
  //data[k]に格子点(i, j)のz成分が与えられている。
  var pd = [];
  var i, j, k;
  //セルのサイズ
  pitchX = sizeX / nSliceX;
  pitchY = sizeY / nSliceY;
  //頂点座標vertices
  for(j = 0; j <= nSliceY; j++)
  {
    for(i = 0; i <= nSliceX; i++)
    {
      k = i + j * (nSliceX + 1);
      //座標
      pd.push([(i - nSliceX / 2) * pitchX, (j - nSliceY / 2) * pitchY, data[k]]); 
      vertices.push((i - nSliceX / 2) * pitchX);//x
      vertices.push((j - nSliceY / 2) * pitchY);//y
      vertices.push(data[k]);//z
    }
  }

  //法線normals
  //角は1つの三角形、辺は2つの三角形、内部は4個の三角形の平均
  var np, npL, npR, npU, npL;
  var n1 = [], n2 = [], n3 = [], n4 = [];
  
  for(j = 0;j <= nSliceY;j++)
  {
    if(j == 0)
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          np = 0;  npD = 1; npR = nSliceX+1;
          calcNormal(pd[np], pd[npD], pd[npR], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ
        }
        else if( i <  nSliceX)
        {//2つの三角形の平均
          np = i; npR = i+nSliceX+1; npU = i-1; npD = i+1;
          calcNormal(pd[np], pd[npR], pd[npU], n1);
          calcNormal(pd[np], pd[npD], pd[npR], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ
        }
        else//i == nSliceX
        {
          np = nSliceX;  npR = 2*nSliceX+1; npU = nSliceX-1;
          calcNormal(pd[np], pd[npD], pd[npR], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ 
        }
      }
    }
    else if(j < nSliceY)
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          //2つの三角形の平均
          np = j * (nSliceX + 1); npL = np-(nSliceX+1); npD = np+1; npR = np+(nSliceX+1);
          calcNormal(pd[np], pd[npL], pd[npD], n1);
          calcNormal(pd[np], pd[npD], pd[npR], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ 
        } 
        else if(i < nSliceX)
        { //隣り合う4個の三角形の法線ベクトルを平均化
          np = i+j*(nSliceX+1); npU = np-1; npD = np+1;
          npL = i+(j-1)*(nSliceX+1); npR = i+(j+1)*(nSliceX+1);
          calcNormal(pd[np], pd[npU], pd[npL], n1);
          calcNormal(pd[np], pd[npL], pd[npD], n2);
          calcNormal(pd[np], pd[npD], pd[npR], n3);
          calcNormal(pd[np], pd[npR], pd[npU], n4);
          normals.push((n1[0] + n2[0] + n3[0] + n4[0]) / 4);//ｘ
          normals.push((n1[1] + n2[1] + n3[1] + n4[1]) / 4);//ｙ
          normals.push((n1[2] + n2[2] + n3[2] + n4[2]) / 4);//ｚ 
        }
        else
        {
          //i = nSliceX;
          //2つの三角形の平均
          np = nSliceX+j*(nSliceX+1); npL = np-(nSliceX+1); npU = np-1; npR = np+(nSliceX+1);
          calcNormal(pd[np], pd[npU], pd[npL], n1);
          calcNormal(pd[np], pd[npR], pd[npU], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ 
        }
      }
    }
    else//j= nSliceY
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          np = nSliceY*(nSliceX+1); npL = (nSliceY-1)*(nSliceX+1); npD = np+1; 
          calcNormal(pd[np], pd[npL], pd[npD], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ
        }
        else if( i < nSliceX)
        {//2つの三角形の平均
          np = i+nSliceY*(nSliceX+1); npL = np-(nSliceX+1); npU = np-1; npD = np+1;
          calcNormal(pd[np], pd[npU], pd[npL], n1);
          calcNormal(pd[np], pd[npL], pd[npD], n2);
          normals.push((n1[0] + n2[0]) / 2);//ｘ
          normals.push((n1[1] + n2[1]) / 2);//ｙ
          normals.push((n1[2] + n2[2]) / 2);//ｚ
        }
        else
        {
          //i == nSliceX
          np = nSliceX+nSliceY*(nSliceX+1); npU = np-1; npL = np-(nSliceX+1);
          calcNormal(pd[np], pd[npU], pd[npL], n1);
          normals.push(n1[0]);//ｘ
          normals.push(n1[1]);//ｙ
          normals.push(n1[2]);//ｚ 
        }
      }
    }
  }
  //indices
  var np0, np1, np2, np3;
  
  for(j = 0; j < nSliceY; j++)
  {
    for(i = 0; i < nSliceX; i++)
    { 
      np0 = i + j*(nSliceX+1); np1 = np0+1; np2 = np1+nSliceX+1; np3 = np2-1;
      if(flagDebug == false)//solid model
      {
        indices.push(np0); indices.push(np1); indices.push(np3);
        indices.push(np1); indices.push(np2); indices.push(np3);
      }
      else//wireframe model
      {//gl.LINESで一本ずつ表示（rigidクラスのdraw())
        indices.push(np0); indices.push(np1);  indices.push(np1); indices.push(np3);
        indices.push(np3); indices.push(np0);  indices.push(np1); indices.push(np2); 
        indices.push(np2); indices.push(np3);
      }
    }
  }
  return indices.length;
}

//-------------------------------------------------------
function makeCheckedPlate(vertices, colors, normals, indices, nSliceX, nSliceY, col1, col2)
{
  //xy平面，中心は原点
  var i, j;
  var pitchX = 1.0 / nSliceX;
  var pitchY = 1.0 / nSliceY;

  //verticesColors, normals
  for(j = 0; j <= nSliceY; j++)
  {
    for(i = 0; i <= nSliceX; i++)
    {
      //座標(同じ座標の頂点を2個ずつ）
      vertices.push(i * pitchX - 0.5);//x
      vertices.push(j * pitchY - 0.5);//y
      vertices.push(0.0);             //z
      vertices.push(i * pitchX - 0.5);//x
      vertices.push(j * pitchY - 0.5);//y
      vertices.push(0.0);             //z
                     
      //色(チェック模様，やはり2個ずつであるが色を変える）
      if(2 * Math.round(i / 2) == i)
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
        else                           
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
      }
      else
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
        else                           
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
      }
      
      //法線(2個の頂点）
      normals.push(0.0); normals.push(0.0); normals.push(1.0);//x,y,z
      normals.push(0.0); normals.push(0.0); normals.push(1.0);//x,y,z
    }
  }
  //indices
  for(j = 0; j < nSliceY; j++)
  {
    for(i = 0; i < nSliceX; i++)
    {
    　var k0 = j * (nSliceX+1) * 2 + i * 2;
      var k1 = k0 + 3;
      var k2 = (j+1) * (nSliceX+1) * 2 + i * 2 +1;
      var k3 = k2 + 1;

      indices.push(k0); indices.push(k1); indices.push(k3);  
      indices.push(k0); indices.push(k3); indices.push(k2);
    }
  }
  return indices.length;

}

//-------------------------------------------------------
function makeCheckedSquare(data, vertices, colors, normals, indices, nSliceX, nSliceY, col1, col2)
{ 
  //例えば2次元バネ-質点モデル全体を1つの四辺形で表現
  //data[k][0]～data[k][2]で格子点iのx,y,z成分が与えられる。
  var i, j, k;
  //頂点座標vertices
  for(j = 0; j <= nSliceY; j++)
  {
    for(i = 0; i <= nSliceX; i++)
    {
      k = i + j * (nSliceX + 1);
      //座標(同じ座標データを2組）
      vertices.push(data[k][0]); vertices.push(data[k][1]); vertices.push(data[k][2]);//x,y,z
      vertices.push(data[k][0]); vertices.push(data[k][1]); vertices.push(data[k][2]);//x,y,z
      //色(チェック模様，やはり2個ずつであるが色を変える）
      if(2 * Math.round(i / 2) == i)
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
        else                           
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
      }
      else
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
        else                           
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
      }
    }
  }

  //法線normals(やはり2組）
  //角は1つの三角形、辺は2つの三角形、内部は4個の三角形の平均
  var np, npL, npR, npU, npL;
  var n1 = [], n2 = [], n3 = [], n4 = [];
  
  for(j = 0;j <= nSliceY;j++)
  {
    if(j == 0)
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          np = 0;  npD = 1; npR = nSliceX+1;
          calcNormal(data[np], data[npD], data[npR], n1);
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ
        }
        else if( i < nSliceX)
        {//2つの三角形の平均
          np = i; npR = i+nSliceX+1; npU = i-1; npD = i+1;
          calcNormal(data[np], data[npR], data[npU], n1);
          calcNormal(data[np], data[npD], data[npR], n2);
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ
        }
        else//i == nSliceX
        {
          np = nSliceX;  npR = 2*nSliceX+1; npU = nSliceX-1;
          calcNormal(data[np], data[npD], data[npR], n1);
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ 
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//ｚ 
        }
      }
    }
    else if(j < nSliceY)
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          //2つの三角形の平均
          np = j * (nSliceX + 1); npL = np-(nSliceX+1); npD = np+1; npR = np+(nSliceX+1);
          calcNormal(data[np], data[npL], data[npD], n1);
          calcNormal(data[np], data[npD], data[npR], n2);
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ 
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ 
        } 
        else if(i < nSliceX)
        { //隣り合う4個の三角形の法線ベクトルを平均化
          np = i+j*(nSliceX+1); npU = np-1; npD = np+1;
          npL = i+(j-1)*(nSliceX+1); npR = i+(j+1)*(nSliceX+1);
          calcNormal(data[np], data[npU], data[npL], n1);
          calcNormal(data[np], data[npL], data[npD], n2);
          calcNormal(data[np], data[npD], data[npR], n3);
          calcNormal(data[np], data[npR], data[npU], n4);
          normals.push((n1[0] + n2[0] + n3[0] + n4[0]) / 4); normals.push((n1[1] + n2[1] + n3[1] + n4[1]) / 4); normals.push((n1[2] + n2[2] + n3[2] + n4[2]) / 4);//x,y,ｚ 
          normals.push((n1[0] + n2[0] + n3[0] + n4[0]) / 4); normals.push((n1[1] + n2[1] + n3[1] + n4[1]) / 4); normals.push((n1[2] + n2[2] + n3[2] + n4[2]) / 4);//x,y,ｚ 
        }
        else
        {
          //i = nSliceX;
          //2つの三角形の平均
          np = nSliceX+j*(nSliceX+1); npL = np-(nSliceX+1); npU = np-1; npR = np+(nSliceX+1);
          calcNormal(data[np], data[npU], data[npL], n1);
          calcNormal(data[np], data[npR], data[npU], n2);
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ 
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ 
        }
      }
    }
    else//j= nSliceY
    {
      for(i = 0; i <= nSliceX; i++)
      {
        if(i == 0)
        {
          np = nSliceY*(nSliceX+1); npL = (nSliceY-1)*(nSliceX+1); npD = np+1; 
          calcNormal(data[np], data[npL], data[npD], n1);
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ
        }
        else if( i < nSliceX)
        {//2つの三角形の平均
          np = i+nSliceY*(nSliceX+1); npL = np-(nSliceX+1); npU = np-1; npD = np+1;
          calcNormal(data[np], data[npU], data[npL], n1);
          calcNormal(data[np], data[npL], data[npD], n2);
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ
          normals.push((n1[0] + n2[0]) / 2); normals.push((n1[1] + n2[1]) / 2); normals.push((n1[2] + n2[2]) / 2);//x,y,ｚ
        }
        else
        {
          //i == nSliceX
          np = nSliceX+nSliceY*(nSliceX+1); npU = np-1; npL = np-(nSliceX+1);
          calcNormal(data[np], data[npU], data[npL], n1);
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ 
          normals.push(n1[0]); normals.push(n1[1]); normals.push(n1[2]);//x,y,ｚ 
        }
      }
    }
  }
  //indices

  for(j = 0; j < nSliceY; j++)
  {
    for(i = 0; i < nSliceX; i++)
    { 
    　var k0 = j * (nSliceX+1) * 2 + i * 2;
      var k1 = k0 + 3;
      var k2 = (j+1) * (nSliceX+1) * 2 + i * 2 +1;
      var k3 = k2 + 1;
      if(flagDebug == false)//solid model
      {
        indices.push(k0); indices.push(k1); indices.push(k3);
        indices.push(k0); indices.push(k3); indices.push(k2);
      }
      else
      {
        indices.push(k0);indices.push(k1);  indices.push(k1);indices.push(k3); 
        indices.push(k3);indices.push(k0);  indices.push(k1);indices.push(k2);
        indices.push(k2);indices.push(k3);  indices.push(k0);indices.push(k2);
      }
      
    }
  }

  return indices.length;
}

//-------------------------------------------------------
function makeStripedPlate(vertices, colors, normals, indices, nSliceX, nSliceY, col1, col2)
{
  //1辺が1の正方形，斜め縞模様
  //xy平面，中心は原点
  var i, j;
  var pitchX = 1.0 / nSliceX;
  var pitchY = 1.0 / nSliceY;

  //verdicesColors, normals
  for(j = 0; j <= nSliceY; j++)
  {
    for(i = 0; i <= nSliceX; i++)
    {
      //座標
      vertices.push(i * pitchX - 0.5);//x
      vertices.push(j * pitchY - 0.5);//y
      vertices.push(0.0);                   //z
                     
      //色
      if(2 * Math.round(i / 2) == i)
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col1[0]);  
          colors.push(col1[1]);
          colors.push(col1[2]);
        }
        else                           
        {
          colors.push(col2[0]);  
          colors.push(col2[1]);
          colors.push(col2[2]);
        }
      }
      else
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col2[0]);  
          colors.push(col2[1]);
          colors.push(col2[2]);
        }
        else                           
        {
          colors.push(col1[0]);  
          colors.push(col1[1]);
          colors.push(col1[2]);
        }
      }
      
      //法線
      normals.push(0.0);//x
      normals.push(0.0);//y
      normals.push(1.0);//z
    }
  }
  //indices
  for(j = 0; j < nSliceY; j++)
  {
    for(i = 0; i < nSliceX; i++)
    {
      indices.push((nSliceX+1) * j + i);
      indices.push((nSliceX+1) * j + i + 1);
      indices.push((nSliceX+1) * (j+1) + i+1);
      
      indices.push((nSliceX+1) * j + i);
      indices.push((nSliceX+1) * (j+1) + i+1);
      indices.push((nSliceX+1) * (j+1) + i);
    }
  }
  return indices.length;

}
//----------------------------------------------------------------------
function makeCylinderX(vertices, normals, indices, nSlice, flagDebug)
{
  //x軸方向に伸びた円柱
  //半径0.5，高さ1.0の円柱
  //rBottom=rTopの底面の中心が原点の円柱
  //nSlice--yz断面分割数
  var rBottom = 0.5;//下底半径
  var rTop = rBottom;//上底半径
  var h0 = 1.0;//高さ
 
  var i, j;
  var phi;
  var phi0 = 2.0*Math.PI/nSlice;
//alert("XXXXXXXX");  
  //上底(Top)
  vertices[0] = h0; vertices[1] = 0.0; vertices[2] = 0.0; //中心点
  normals[0]  = 1.0; normals[1]  = 0.0; normals[2]  = 0.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = i * phi0;
    vertices.push(h0);                  //x
    vertices.push(rTop * Math.cos(phi));//y
    vertices.push(rTop * Math.sin(phi));//z
    normals.push(1.0); //x
    normals.push(0.0); //y
    normals.push(0.0); //z
  }
  
  //側面(Side)
  var hh, r0;

  for(j = 0; j <= 1; j++)
  {
    if(j == 0) { hh = h0; r0 = rTop; }
    else { hh = 0.0; r0 = rBottom; }
    
    for(i = 0; i <= nSlice; i++)
    {
       phi = i * phi0;
       vertices.push(hh);                //x座標
       vertices.push(r0 * Math.cos(phi));//y座標
       vertices.push(r0 * Math.sin(phi));//z座標
       
       //法線ベクトル
       normals.push(0.0);          //x
       normals.push(Math.cos(phi));//y
       normals.push(Math.sin(phi));//z
    }  
  }
 
  var nd = vertices.length;//これまでの頂点データ個数
  //下底（Bottom)
  vertices[nd] = 0.0; vertices[nd+1] = 0.0; vertices[nd+2] = 0.0; //中心点
  normals[nd]  = -1.0; normals[nd+1]  = 0.0; normals[nd+2]  = 0.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = -i * phi0;//時計回り
    vertices.push(0.0);                    //x
    vertices.push(rBottom * Math.cos(phi));//y
    vertices.push(rBottom * Math.sin(phi));//z
    normals.push(-1.0); //x
    normals.push( 0.0); //y
    normals.push( 0.0); //z
  }

  //index
  if(flagDebug == false)
  {
    //Top
    for(var i = 0; i < nSlice; i++)
    {
      indices.push(0); indices.push(i+1); indices.push(i+2); 
    }
    for(i = 0; i < nSlice; i++)
    {//各面に三角形要素が2つ
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(nSlice + 3 + i);
      
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
    }
    //Bottom 
    var nv = nd / 3; //中心点の頂点番号 
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nv); indices.push(nv+i+1); indices.push(nv+i+2);
    }
  }
  else //wireframe
  {//側面だけでよい
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
      indices.push(nSlice + 2 + i);
    }
  }
  return indices.length;
}
//----------------------------------------------------------------------
function makeCylinderY(vertices, normals, indices, nSlice, flagDebug)
{
  //y軸方向に伸びた円柱
  //半径0.5，高さ1.0の円柱
  //rBottom=rTopの底面の中心が原点の円柱
  //nSlice--xz断面分割数
  
  var rBottom = 0.5;//下底半径
  var rTop = rBottom;//上底半径
  var h0 = 1.0;//高さ
  
  var i, j;
  var phi;
  var phi0 = 2.0*Math.PI/nSlice;
  
  //上底(Top)
  vertices[0] = 0.0; vertices[1] = h0; vertices[2] = 0.0; //中心点
  normals[0]  = 0.0; normals[1]  = 1.0; normals[2]  = 0.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = i * phi0;
    vertices.push(rTop * Math.sin(phi));//x
    vertices.push(h0);                  //y
    vertices.push(rTop * Math.cos(phi));//z
    normals.push(0.0); //x
    normals.push(1.0); //y
    normals.push(0.0); //z
  }
  
  //側面(Side)
  var hh, r0;

  for(j = 0; j <= 1; j++)
  {
    if(j == 0) { hh = h0; r0 = rTop; }
    else { hh = 0.0; r0 = rBottom; }
    
    for(i = 0; i <= nSlice; i++)
    {
       phi = i * phi0;
       vertices.push(r0 * Math.sin(phi));//x座標
       vertices.push(hh);                //y座標
       vertices.push(r0 * Math.cos(phi));//z座標    
       //法線ベクトル
       normals.push(Math.sin(phi));//x
       normals.push(0.0);          //y
       normals.push(Math.cos(phi));//z
    }  
  }
 
  var nd = vertices.length;//これまでの頂点データ個数
  //下底（Bottom)
  vertices[nd] = 0.0; vertices[nd+1] = 0.0; vertices[nd+2] = 0.0; //中心点
  normals[nd]  = -1.0; normals[nd+1]  = 0.0; normals[nd+2]  = 0.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = -i * phi0;//時計回り
    vertices.push(rBottom * Math.sin(phi));//x
    vertices.push(0.0);                    //y
    vertices.push(rBottom * Math.cos(phi));//z
    normals.push( 0.0); //x
    normals.push(-1.0); //y
    normals.push( 0.0); //z
  }

  //index
  if(flagDebug == false)
  {
    //Top
    for(var i = 0; i < nSlice; i++)
    {
      indices.push(0); indices.push(i+1); indices.push(i+2); 
    }
    for(i = 0; i < nSlice; i++)
    {//各面に三角形要素が2つ
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(nSlice + 3 + i);
      
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
    }
    //Bottom 
    var nv = nd / 3; //中心点の頂点番号 
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nv); indices.push(nv+i+1); indices.push(nv+i+2);
    }
  }
  else //wireframe
  {//側面だけでよい
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
      indices.push(nSlice + 2 + i);
    }
  }
  return indices.length;
}

//----------------------------------------------------------------------
function makeCylinderZ(vertices, normals, indices, nSlice, flagDebug)
{
  //ｚ軸方向に伸びた円柱
  //半径0.5，高さ1.0の円柱
  //rBottom=rTopの底面の中心が原点の円柱
  //nSlice--xy断面分割数
  
  var rBottom = 0.5;//下底半径
  var rTop = rBottom;//上底半径
  var h0 = 1.0;//高さ
  
  var i, j;
  var phi;
  var phi0 = 2.0*Math.PI/nSlice;
  
  //上底(Top)
  vertices[0] = 0.0; vertices[1] = 0.0; vertices[2] = h0; //中心点
  normals[0]  = 0.0; normals[1]  = 0.0; normals[2]  = 1.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = i * phi0;
    vertices.push(rTop * Math.cos(phi));//x
    vertices.push(rTop * Math.sin(phi));//y
    vertices.push(h0);          //z
    normals.push(0.0); //x
    normals.push(0.0); //y
    normals.push(1.0); //z
  }
  
  //側面(Side)
  var hh, r0;

  for(j = 0; j <= 1; j++)
  {
    if(j == 0) { hh = h0; r0 = rTop; }
    else { hh = 0.0; r0 = rBottom; }
    
    for(i = 0; i <= nSlice; i++)
    {
       phi = i * phi0;
       vertices.push(r0 * Math.cos(phi));//x座標
       vertices.push(r0 * Math.sin(phi));//y座標
       vertices.push(hh); //z座標
       
       //法線ベクトル
       normals.push(Math.cos(phi));//x
       normals.push(Math.sin(phi));//y
       normals.push(0.0);          //z
    }  
  }
 
  var nd = vertices.length;//これまでの頂点データ個数
  //下底（Bottom)
  vertices[nd] = 0.0; vertices[nd+1] = 0.0; vertices[nd+2] = 0.0; //中心点
  normals[nd]  = 0.0; normals[nd+1]  = 0.0; normals[nd+2]  = -1.0;
  for(i = 0; i <= nSlice; i++)
  {
    phi = -i * phi0;//時計回り
    vertices.push(rBottom * Math.cos(phi));//x
    vertices.push(rBottom * Math.sin(phi));//y
    vertices.push(0.0);            //z
    normals.push( 0.0); //x
    normals.push( 0.0); //y
    normals.push(-1.0); //z
  }

  //index
  if(flagDebug == false)
  {
    //Top
    for(var i = 0; i < nSlice; i++)
    {
      indices.push(0); indices.push(i+1); indices.push(i+2); 
    }
    for(i = 0; i < nSlice; i++)
    {//各面に三角形要素が2つ
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(nSlice + 3 + i);
      
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
    }
    //Bottom 
    var nv = nd / 3; //中心点の頂点番号 
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nv); indices.push(nv+i+1); indices.push(nv+i+2);
    }
  }
  else //wireframe
  {//側面だけでよい
    for(i = 0; i < nSlice; i++)
    {
      indices.push(nSlice + 2 + i);
      indices.push(2*nSlice + 3 + i);
      indices.push(2*nSlice + 4 + i);
      indices.push(nSlice + 3 + i);
      indices.push(nSlice + 2 + i);
    }
  }
  return indices.length;
}
//------------------------------------------------------------------------
function makeGridSphere(data, vertices, normals, indices, nSlice, nStack)
{ //SpringMassModelの"Tex"のDebugモードで使用
　//中心が原点
　var i,j,ip,im,np,npL,npR,npU,npD,k;

  //頂点座標
  //j == 0:Top（nSlice+1個）
  for (i = 0 ; i <= nSlice; i++)
  {//極も複数個の点で表現
    //座標
    vertices.push(data[0][0]);//x
    vertices.push(data[0][1]);//y
    vertices.push(data[0][2]);//z
  }
  //中間
　for(j = 1 ; j < nStack; j++)
  {
    for(i = 0 ; i <= nSlice; i++)
    {
      var i0 = i;
      if(i == nSlice) i0 = 0;
      k = i0 + (j-1) * nSlice + 1;
      vertices.push(data[k][0]);//x
      vertices.push(data[k][1]);//y
      vertices.push(data[k][2]);//z
    }
  }
  //j = nStack:Bottom（nSlice+1個）
  k = data.length - 1;
  for(i = 0; i <= nSlice; i++)
  {
    vertices.push(data[k][0]);//x
    vertices.push(data[k][1]);//y
    vertices.push(data[k][2]);//z
  }

  var p1 = [], p2 = [], p3 = [];
  var n1 = [], n2 = [], n3 = [], n4 = [];
  //法線ベクトル
  //Top
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0);//x
    normals.push(0.0);//y
    normals.push(0.0);//z
  }
  //Side
  for(j = 1;j < nStack;j++)//隣り合う4個の三角形の法線ベクトルを平均化
  for(i = 0;i <= nSlice;i++)
  {
    ip = i+1;
	if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = j*(nSlice+1)+i;//注目点
	npL = j*(nSlice+1)+im;//左側
	npR = j*(nSlice+1)+ip;//右側
	npU = np-nSlice-1;//上
	npD = np+nSlice+1;//下
      
    p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];
    p2[0]=vertices[3*npU]; p2[1]=vertices[3*npU+1]; p2[2]=vertices[3*npU+2];
	p3[0]=vertices[3*npL]; p3[1]=vertices[3*npL+1]; p3[2]=vertices[3*npL+2];
	calcNormal(p1,p2,p3,n1);//外から見て左上
	p2[0]=vertices[3*npR]; p2[1]=vertices[3*npR+1]; p2[2]=vertices[3*npR+2];
	p3[0]=vertices[3*npU]; p3[1]=vertices[3*npU+1]; p3[2]=vertices[3*npU+2];
	calcNormal(p1,p2,p3,n2);//右上
	
    p2[0]=vertices[3*npL]; p2[1]=vertices[3*npL+1]; p2[2]=vertices[3*npL+2];
	p3[0]=vertices[3*npD]; p3[1]=vertices[3*npD+1]; p3[2]=vertices[3*npD+2];
	calcNormal(p1,p2,p3,n3);//外から見て左下
	p2[0]=vertices[3*npD]; p2[1]=vertices[3*npD+1]; p2[2]=vertices[3*npD+2];
	p3[0]=vertices[3*npR]; p3[1]=vertices[3*npR+1]; p3[2]=vertices[3*npR+2];
	calcNormal(p1,p2,p3,n4);//右下
	  
    normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);//ｘ方向
	normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);//ｙ
    normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//ｚ
  }
  //Bottom
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0); //x
    normals.push(0.0); //y
    normals.push(0.0);//z
  }

  //インデックス
  var k1, k2;
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
      k1 = j * (nSlice+1) + i;
      k2 = k1 + (nSlice+1);

      indices.push(k1);
      indices.push(k2);
      indices.push(k1 + 1);

      indices.push(k2);
      indices.push(k2 + 1);
      indices.push(k1 + 1);
    }
  }
  return indices.length;
}

//-----------------------------------------------------------------
function makeCheckedSphere(data, vertices, colors, normals, indices, nSlice, nStack, col1, col2)
{ //SpringMassModelのチェック模様(flagCkeck=falseとすると白色）
　//中心が原点
　var i,j,ip,im,np,npL,npR,npU,npD,k;
  
  var cnt = 0;
  //頂点座標
  //j == 0:Top（nSlice+1個）
  for (i = 0 ; i <= nSlice; i++)
  {//極も複数個の点で表現
    //座標(同じ座標データを2組）
    vertices.push(data[0][0]);vertices.push(data[0][1]);vertices.push(data[0][2]);
    vertices.push(data[0][0]);vertices.push(data[0][1]);vertices.push(data[0][2]);
    //色データ、やはり2個ずつであるが色を変える
    if(2*Math.round(i/2) == i)
    {
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);   
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);  
    } 
    else
    {
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);   
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);  
    } 
  }
//console.log(" ver.len = " + vertices.length + " col.len = " + colors.length);
  cnt++;
  //中間
　for(j = 1 ; j < nStack; j++)
  {
    for(i = 0 ; i <= nSlice; i++)
    {
      var i0 = i;
      if(i == nSlice) i0 = 0;
      k = i0 + (j-1) * nSlice + 1;
      vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);
      vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);
      
      if(2 * Math.round(i / 2) == i)
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
        else                           
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
      }
      else
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
        else                           
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
      }
    
      if(i < nSlice) cnt++;
    }
  }
//console.log(" cnt = " + cnt + " data.len = " + data.length);
   k = data.length -1;
  //j = nStack:Bottom（nSlice+1個）
  for(i = 0; i <= nSlice; i++)
  {
    vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);
    vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);

    if(2*Math.round(i/2) == i)
    {
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);   
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);  
    } 
    else
    {
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);   
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);  
    } 
   
  }

  var p1 = [], p2 = [], p3 = [];
  var n1 = [], n2 = [], n3 = [], n4 = [];
  //法線ベクトル(やはり2組）
  //Top
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0);normals.push(0.0);normals.push(0.0);
    normals.push(0.0);normals.push(0.0);normals.push(0.0);
  }
  //Side
  for(j = 1;j < nStack;j++)//隣り合う4個の三角形の法線ベクトルを平均化
  for(i = 0;i <= nSlice;i++)
  {
    ip = i+1;
	if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = j*(nSlice+1)+i  ;//注目点
	npL = j*(nSlice+1)+im ;//左側
	npR = j*(nSlice+1)+ip ;//右側
	npU = np-nSlice-1     ;//上
	npD = np+nSlice+1     ;//下
    
    p1[0]=vertices[6*np] ; p1[1]=vertices[6*np+1] ; p1[2]=vertices[6*np+2];
    p2[0]=vertices[6*npU]; p2[1]=vertices[6*npU+1]; p2[2]=vertices[6*npU+2];
	p3[0]=vertices[6*npL]; p3[1]=vertices[6*npL+1]; p3[2]=vertices[6*npL+2];
	calcNormal(p1,p2,p3,n1);//外から見て左上
    p2[0]=vertices[6*npR]; p2[1]=vertices[6*npR+1]; p2[2]=vertices[6*npR+2];
	p3[0]=vertices[6*npU]; p3[1]=vertices[6*npU+1]; p3[2]=vertices[6*npU+2];
	calcNormal(p1,p2,p3,n2);//右上
    p2[0]=vertices[6*npL]; p2[1]=vertices[6*npL+1]; p2[2]=vertices[6*npL+2];
    p3[0]=vertices[6*npD]; p3[1]=vertices[6*npD+1]; p3[2]=vertices[6*npD+2];
    calcNormal(p1,p2,p3,n3);//外から見て左下
    p2[0]=vertices[6*npD]; p2[1]=vertices[6*npD+1]; p2[2]=vertices[6*npD+2];
    p3[0]=vertices[6*npR]; p3[1]=vertices[6*npR+1]; p3[2]=vertices[6*npR+2];
    calcNormal(p1,p2,p3,n4);//右下
	  
    normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//x,y,ｚ
    normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//x,y,ｚ
  }
  //Bottom
  for(i = 0;i <= nSlice;i++)
  {
    normals.push(0.0);normals.push(0.0);normals.push(0.0);//x,y,z
    normals.push(0.0);normals.push(0.0);normals.push(0.0);//x,y,z
  }
//console.log("ver_n = " + vertices.length + " nor_n = " + normals.length + " col_n = " + colors.length);
  //インデックス
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
    　var k0 = j * (nSlice+1) * 2 + i * 2;
      var k1 = k0 + (nSlice+1) * 2+1;
      var k2 = k1 +1;
      var k3 = k0 + 3;
      
      indices.push(k0); indices.push(k1); indices.push(k2);
      indices.push(k0); indices.push(k2); indices.push(k3);
    }
  }
//console.log(" ind_n = " + indices.length);
  return indices.length;
}

//------------------------------------------------------------------------
function makeGridCylinder(data, vertices, normals, indices, nSlice, nStack)
{ //SpringMassModelの"Tex"のDebugモードで使用
　//上下の中心が原点
　var i, i0, j, ip, im, np, npL, npR, npU, npD, k;

  //Topの中心頂点座標
  vertices.push(data[0][0]);//x
  vertices.push(data[0][1]);//y
  vertices.push(data[0][2]);//z
  //Topの円周
  for(i = 0 ; i <= nSlice; i++)
  {
    var i0 = i;
    if(i == nSlice) i0 = 0;
    k = i0 + 1;
    vertices.push(data[k][0]);//x
    vertices.push(data[k][1]);//y
    vertices.push(data[k][2]);//z
  }
  
  //側面
　for(j = 0 ; j <= nStack; j++)
  {
    for(i = 0 ; i <= nSlice; i++)
    {
      var i0 = i;
      if(i == nSlice) i0 = 0;
      k = i0 + j * nSlice + 1;
      vertices.push(data[k][0]);//x
      vertices.push(data[k][1]);//y
      vertices.push(data[k][2]);//z
    }
  }
  //Bottomの円周
  for(i = 0 ; i <= nSlice; i++)
  {
    var i0 = i;
    if(i == nSlice) i0 = 0;
    k = i0 + nStack*nSlice + 1
    vertices.push(data[k][0]);//x
    vertices.push(data[k][1]);//y
    vertices.push(data[k][2]);//z
  }
  
  //Bottomの中心座標
  k = data.length-1;
  vertices.push(data[k][0]);//x
  vertices.push(data[k][1]);//y
  vertices.push(data[k][2]);//z

  var p1 = [], p2 = [], p3 = [];
  var n1 = [], n2 = [], n3 = [], n4 = [];
  //法線ベクトル
  //Topの中心
  normals.push(0.0);//x
  normals.push(0.0);//y
  normals.push(0.0);//z   
  //Topの円周 
  for(i = 0;i <= nSlice;i++)//隣り合う2個の三角形の法線ベクトルを平均化
  {
    ip = i+1;
    if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = i + 1;//注目点
	npL = im + 1;//左側
	npR = ip + 1;//右側
	npU = 0;//上
      
    p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];
    p2[0]=vertices[3*npU]; p2[1]=vertices[3*npU+1]; p2[2]=vertices[3*npU+2];
	p3[0]=vertices[3*npL]; p3[1]=vertices[3*npL+1]; p3[2]=vertices[3*npL+2];
	calcNormal(p1,p2,p3,n1);//外から見て左上
	p2[0]=vertices[3*npR]; p2[1]=vertices[3*npR+1]; p2[2]=vertices[3*npR+2];
	p3[0]=vertices[3*npU]; p3[1]=vertices[3*npU+1]; p3[2]=vertices[3*npU+2];
	calcNormal(p1,p2,p3,n2);//右上
	  
    normals.push((n1[0]+n2[0])/2.0);//ｘ方向
	normals.push((n1[1]+n2[1])/2.0);//ｙ
    normals.push((n1[2]+n2[2])/2.0);//ｚ
  }
  var nn = nSlice + 2;//ここまでの頂点数
  //SideのTop
  j = 0;
  for(i = 0;i <= nSlice;i++)//側面のTop
  {//隣り合う2個の三角形の法線ベクトルを平均化
    ip = i+1;
    if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = j*(nSlice+1)+i + nn;//注目点
	npL = j*(nSlice+1)+im + nn;//左側
	npR = j*(nSlice+1)+ip + nn;//右側
	npD = np+nSlice+1 + nn;//下
   
    p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];	
    p2[0]=vertices[3*npL]; p2[1]=vertices[3*npL+1]; p2[2]=vertices[3*npL+2];
	p3[0]=vertices[3*npD]; p3[1]=vertices[3*npD+1]; p3[2]=vertices[3*npD+2];
	calcNormal(p1,p2,p3,n3);//外から見て左下
	p2[0]=vertices[3*npD]; p2[1]=vertices[3*npD+1]; p2[2]=vertices[3*npD+2];
	p3[0]=vertices[3*npR]; p3[1]=vertices[3*npR+1]; p3[2]=vertices[3*npR+2];
	calcNormal(p1,p2,p3,n4);//右下
	  
    normals.push((n3[0]+n4[0])/2.0);//ｘ方向
	normals.push((n3[1]+n4[1])/2.0);//ｙ
    normals.push((n3[2]+n4[2])/2.0);//ｚ
  }
  //sideの中間  
  for(j = 1;j < nStack;j++)
  {
  　for(i = 0;i <= nSlice;i++)//隣り合う4個の三角形の法線ベクトルを平均化
    {
      ip = i+1;
	  if(ip == nSlice+1) ip = 1;
	  im = i-1;
	  if(i == 0) im = nSlice-1;

      np  = j*(nSlice+1)+i + nn;//注目点
	  npL = j*(nSlice+1)+im + nn;//左側
	  npR = j*(nSlice+1)+ip + nn;//右側
	  npU = np-nSlice-1;//上
	  npD = np+nSlice+1;//下
      
      p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];
      p2[0]=vertices[3*npU]; p2[1]=vertices[3*npU+1]; p2[2]=vertices[3*npU+2];
	  p3[0]=vertices[3*npL]; p3[1]=vertices[3*npL+1]; p3[2]=vertices[3*npL+2];
	  calcNormal(p1,p2,p3,n1);//外から見て左上
	  p2[0]=vertices[3*npR]; p2[1]=vertices[3*npR+1]; p2[2]=vertices[3*npR+2];
	  p3[0]=vertices[3*npU]; p3[1]=vertices[3*npU+1]; p3[2]=vertices[3*npU+2];
	  calcNormal(p1,p2,p3,n2);//右上
	
      p2[0]=vertices[3*npL]; p2[1]=vertices[3*npL+1]; p2[2]=vertices[3*npL+2];
	  p3[0]=vertices[3*npD]; p3[1]=vertices[3*npD+1]; p3[2]=vertices[3*npD+2];
	  calcNormal(p1,p2,p3,n3);//外から見て左下
	  p2[0]=vertices[3*npD]; p2[1]=vertices[3*npD+1]; p2[2]=vertices[3*npD+2];
	  p3[0]=vertices[3*npR]; p3[1]=vertices[3*npR+1]; p3[2]=vertices[3*npR+2];
	  calcNormal(p1,p2,p3,n4);//右下
	  
      normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);//ｘ方向
	  normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);//ｙ
      normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//ｚ
    }
  }

  //sideのbottom
  j = nStack;
  for(i = 0;i <= nSlice;i++)//隣り合う2個の三角形の法線ベクトルを平均化
  {
    ip = i+1;
    if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = j*(nSlice+1)+i + nn;//注目点
	npL = j*(nSlice+1)+im + nn;//左側
	npR = j*(nSlice+1)+ip + nn;//右側
	npU = np-nSlice-1;//上
      
    p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];
    p2[0]=vertices[3*npU]; p2[1]=vertices[3*npU+1]; p2[2]=vertices[3*npU+2];
	p3[0]=vertices[3*npL]; p3[1]=vertices[3*npL+1]; p3[2]=vertices[3*npL+2];
	calcNormal(p1,p2,p3,n1);//外から見て左上
	p2[0]=vertices[3*npR]; p2[1]=vertices[3*npR+1]; p2[2]=vertices[3*npR+2];
	p3[0]=vertices[3*npU]; p3[1]=vertices[3*npU+1]; p3[2]=vertices[3*npU+2];
	calcNormal(p1,p2,p3,n2);//右上
	  
    normals.push((n1[0]+n2[0])/2.0);//ｘ方向
	normals.push((n1[1]+n2[1])/2.0);//ｙ
    normals.push((n1[2]+n2[2])/2.0);//ｚ
  }
  
  //Bottomの円周
  nn = (nSlice+1) * (nStack+2) + 1;
  for(i = 0;i <= nSlice;i++)
  {//隣り合う2個の三角形の法線ベクトルを平均化
    ip = i+1;
    if(i == nSlice) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = i + nn;//注目点
	npL = im + nn;//左側
	npR = ip + nn;//右側
	npD = nSlice + nn+1;//Bottomの中心
    p1[0]=vertices[3*np] ; p1[1]=vertices[3*np+1] ; p1[2]=vertices[3*np+2];	
    p2[0]=vertices[3*npL]; p2[1]=vertices[3*npL+1]; p2[2]=vertices[3*npL+2];
	p3[0]=vertices[3*npD]; p3[1]=vertices[3*npD+1]; p3[2]=vertices[3*npD+2];
	calcNormal(p1,p2,p3,n3);//外から見て左下
	p2[0]=vertices[3*npD]; p2[1]=vertices[3*npD+1]; p2[2]=vertices[3*npD+2];
	p3[0]=vertices[3*npR]; p3[1]=vertices[3*npR+1]; p3[2]=vertices[3*npR+2];
	calcNormal(p1,p2,p3,n4);//右下
	  
    normals.push((n3[0]+n4[0])/2.0);//ｘ方向
	normals.push((n3[1]+n4[1])/2.0);//ｙ
    normals.push((n3[2]+n4[2])/2.0);//ｚ
  }

  //Bottomの中心
  normals.push(0.0);//x
  normals.push(0.0);//y
  normals.push(0.0);//z
 
  //インデックス
  var k1, k2;
  //Top
  for(i = 0; i < nSlice; i++)
  { 
    ip = i + 1;
      if(i == nSlice) ip = 1
      indices.push(0);
      indices.push(i + 1);
      indices.push(ip + 1);
  }
  nn = nSlice + 2;
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
      k1 = j * (nSlice+1) + i + nn ;
      k2 = k1 + (nSlice+1);

      indices.push(k1);
      indices.push(k2);
      indices.push(k1 + 1);

      indices.push(k2);
      indices.push(k2 + 1);
      indices.push(k1 + 1);
    }
  }
  nn = (nStack+2) * (nSlice + 1) + 1;
  //Bottom
  for(i = 0; i < nSlice; i++)
  {
    ip = i + 1;
    indices.push(vertices.length/3-1);//中心点
    indices.push(nn + ip);
    indices.push(nn + i);
  }
  return indices.length;
}

//------------------------------------------------------------------------
function makeCheckedCylinder(data, vertices, colors, normals, indices, nSlice, nStack, col1, col2)
{ //SpringMassModelのチェック模様(flagCkeck=falseとすると白色）
　//全体の中心が原点
　var i, i0, j, ip, im, np, npL, npR, npU, npD, k;

  //すべての頂点を2組ずつ作成
  //Topの中心頂点座標
  vertices.push(data[0][0]);vertices.push(data[0][1]);vertices.push(data[0][2]);//x,y,z
  vertices.push(data[0][0]);vertices.push(data[0][1]);vertices.push(data[0][2]);//x,y,z
  
  //色データ  
  colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);   
  colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);  
  //Topの円周
  for(i = 0 ; i <= nSlice; i++)
  {
    var i0 = i;
    if(i == nSlice) i0 = 0;
    k = i0 + 1;//このkはデータ番号
    vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
    vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
    //色データ
    if(2*Math.round(i/2) == i)
    {
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);  
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);   
    } 
    else
    {
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);  
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);   
    } 
  }
  
  //側面
　for(j = 0 ; j <= nStack; j++)
  {
    for(i = 0 ; i <= nSlice; i++)
    {
      var i0 = i;
      if(i == nSlice) i0 = 0;
      k = i0 + j * nSlice + 1;
      vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
      vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
      if(2 * Math.round(i / 2) == i)
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
        else                           
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
      }
      else
      {
        if(2 * Math.round(j / 2) == j) 
        {
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
        }
        else                           
        {
          colors.push(col1[0]);  colors.push(col1[1]);　colors.push(col1[2]);
          colors.push(col2[0]);  colors.push(col2[1]);　colors.push(col2[2]);
        }
      }    
    }
  }
  //Bottomの円周
  for(i = 0 ; i <= nSlice; i++)
  {
    var i0 = i;
    if(i == nSlice) i0 = 0;
    k = i0 + nStack*nSlice + 1
    vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
    vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
    //色データ
    if(2*Math.round(i/2) == i)
    {
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);   
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);  
    } 
    else
    {
      colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);   
      colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);  
    } 
  }
  
  //Bottomの中心座標
  k = data.length-1;
  vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
  vertices.push(data[k][0]);vertices.push(data[k][1]);vertices.push(data[k][2]);//x,y,z
  //色データ
  colors.push(col1[0]); colors.push(col1[1]);colors.push(col1[2]);   
  colors.push(col2[0]); colors.push(col2[1]);colors.push(col2[2]);  

  var p1 = [], p2 = [], p3 = [];
  var n1 = [], n2 = [], n3 = [], n4 = [];
  //法線ベクトル
  //Topの中心
  normals.push(0.0);normals.push(0.0);normals.push(0.0);//x,y,z   
  normals.push(0.0);normals.push(0.0);normals.push(0.0);//x,y,z   
  //Topの円周 
  for(i = 0;i <= nSlice;i++)//隣り合う2個の三角形の法線ベクトルを平均化
  {
    ip = i+1;
    if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = i + 1;//注目点
	npL = im + 1;//左側
	npR = ip + 1;//右側
	npU = 0;//上
      
    p1[0]=vertices[6*np] ; p1[1]=vertices[6*np+1] ; p1[2]=vertices[6*np+2];
    p2[0]=vertices[6*npU]; p2[1]=vertices[6*npU+1]; p2[2]=vertices[6*npU+2];
	p3[0]=vertices[6*npL]; p3[1]=vertices[6*npL+1]; p3[2]=vertices[6*npL+2];
	calcNormal(p1,p2,p3,n1);//外から見て左上
	p2[0]=vertices[6*npR]; p2[1]=vertices[6*npR+1]; p2[2]=vertices[6*npR+2];
	p3[0]=vertices[6*npU]; p3[1]=vertices[6*npU+1]; p3[2]=vertices[6*npU+2];
	calcNormal(p1,p2,p3,n2);//右上
	  
    normals.push((n1[0]+n2[0])/2.0);normals.push((n1[1]+n2[1])/2.0);normals.push((n1[2]+n2[2])/2.0);//x,y,ｚ
    normals.push((n1[0]+n2[0])/2.0);normals.push((n1[1]+n2[1])/2.0);normals.push((n1[2]+n2[2])/2.0);//x,y,ｚ
  }
  var nn = nSlice + 2;//ここまでの頂点数
  //SideのTop
  j = 0;
  for(i = 0;i <= nSlice;i++)//側面のTop
  {//隣り合う2個の三角形の法線ベクトルを平均化
    ip = i+1;
    if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = j*(nSlice+1)+i + nn;//注目点
	npL = j*(nSlice+1)+im + nn;//左側
	npR = j*(nSlice+1)+ip + nn;//右側
	npD = np+nSlice+1 + nn;//下
   
    p1[0]=vertices[6*np] ; p1[1]=vertices[6*np+1] ; p1[2]=vertices[6*np+2];	
    p2[0]=vertices[6*npL]; p2[1]=vertices[6*npL+1]; p2[2]=vertices[6*npL+2];
	p3[0]=vertices[6*npD]; p3[1]=vertices[6*npD+1]; p3[2]=vertices[6*npD+2];
	calcNormal(p1,p2,p3,n3);//外から見て左下
	p2[0]=vertices[6*npD]; p2[1]=vertices[6*npD+1]; p2[2]=vertices[6*npD+2];
	p3[0]=vertices[6*npR]; p3[1]=vertices[6*npR+1]; p3[2]=vertices[6*npR+2];
	calcNormal(p1,p2,p3,n4);//右下
	  
    normals.push((n3[0]+n4[0])/2.0);normals.push((n3[1]+n4[1])/2.0);normals.push((n3[2]+n4[2])/2.0);//x,y,ｚ
    normals.push((n3[0]+n4[0])/2.0);normals.push((n3[1]+n4[1])/2.0);normals.push((n3[2]+n4[2])/2.0);//x,y,ｚ
  }
  //sideの中間  
  for(j = 1;j < nStack;j++)
  {
  　for(i = 0;i <= nSlice;i++)//隣り合う4個の三角形の法線ベクトルを平均化
    {
      ip = i+1;
	  if(ip == nSlice+1) ip = 1;
	  im = i-1;
	  if(i == 0) im = nSlice-1;

      np  = j*(nSlice+1)+i + nn;//注目点
	  npL = j*(nSlice+1)+im + nn;//左側
	  npR = j*(nSlice+1)+ip + nn;//右側
	  npU = np-nSlice-1;//上
	  npD = np+nSlice+1;//下
      
      p1[0]=vertices[6*np] ; p1[1]=vertices[6*np+1] ; p1[2]=vertices[6*np+2];
      p2[0]=vertices[6*npU]; p2[1]=vertices[6*npU+1]; p2[2]=vertices[6*npU+2];
	  p3[0]=vertices[6*npL]; p3[1]=vertices[6*npL+1]; p3[2]=vertices[6*npL+2];
	  calcNormal(p1,p2,p3,n1);//外から見て左上
	  p2[0]=vertices[6*npR]; p2[1]=vertices[6*npR+1]; p2[2]=vertices[6*npR+2];
	  p3[0]=vertices[6*npU]; p3[1]=vertices[6*npU+1]; p3[2]=vertices[6*npU+2];
	  calcNormal(p1,p2,p3,n2);//右上
	
      p2[0]=vertices[6*npL]; p2[1]=vertices[6*npL+1]; p2[2]=vertices[6*npL+2];
	  p3[0]=vertices[6*npD]; p3[1]=vertices[6*npD+1]; p3[2]=vertices[6*npD+2];
	  calcNormal(p1,p2,p3,n3);//外から見て左下
	  p2[0]=vertices[6*npD]; p2[1]=vertices[6*npD+1]; p2[2]=vertices[6*npD+2];
	  p3[0]=vertices[6*npR]; p3[1]=vertices[6*npR+1]; p3[2]=vertices[6*npR+2];
	  calcNormal(p1,p2,p3,n4);//右下
	  
      normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//x,y,ｚ
      normals.push((n1[0]+n2[0]+n3[0]+n4[0])/4.0);normals.push((n1[1]+n2[1]+n3[1]+n4[1])/4.0);normals.push((n1[2]+n2[2]+n3[2]+n4[2])/4.0);//x,y,ｚ
    }
  }

  //sideのbottom
  j = nStack;
  for(i = 0;i <= nSlice;i++)//隣り合う2個の三角形の法線ベクトルを平均化
  {
    ip = i+1;
    if(ip == nSlice+1) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = j*(nSlice+1)+i + nn;//注目点
	npL = j*(nSlice+1)+im + nn;//左側
	npR = j*(nSlice+1)+ip + nn;//右側
	npU = np-nSlice-1;//上
      
    p1[0]=vertices[6*np] ; p1[1]=vertices[6*np+1] ; p1[2]=vertices[6*np+2];
    p2[0]=vertices[6*npU]; p2[1]=vertices[6*npU+1]; p2[2]=vertices[6*npU+2];
	p3[0]=vertices[6*npL]; p3[1]=vertices[6*npL+1]; p3[2]=vertices[6*npL+2];
	calcNormal(p1,p2,p3,n1);//外から見て左上
	p2[0]=vertices[6*npR]; p2[1]=vertices[6*npR+1]; p2[2]=vertices[6*npR+2];
	p3[0]=vertices[6*npU]; p3[1]=vertices[6*npU+1]; p3[2]=vertices[6*npU+2];
	calcNormal(p1,p2,p3,n2);//右上
	  
    normals.push((n1[0]+n2[0])/2.0);normals.push((n1[1]+n2[1])/2.0);normals.push((n1[2]+n2[2])/2.0);//x,y,ｚ
    normals.push((n1[0]+n2[0])/2.0);normals.push((n1[1]+n2[1])/2.0);normals.push((n1[2]+n2[2])/2.0);//x,y,ｚ
  }
  
  //Bottomの円周
  nn = (nSlice+1) * (nStack+2) + 1;
  for(i = 0;i <= nSlice;i++)
  {//隣り合う2個の三角形の法線ベクトルを平均化
    ip = i+1;
    if(i == nSlice) ip = 1;
	im = i-1;
	if(i == 0) im = nSlice-1;

    np  = i + nn;//注目点
	npL = im + nn;//左側
	npR = ip + nn;//右側
	npD = nSlice + nn+1;//Bottomの中心
    p1[0]=vertices[6*np] ; p1[1]=vertices[6*np+1] ; p1[2]=vertices[6*np+2];	
    p2[0]=vertices[6*npL]; p2[1]=vertices[6*npL+1]; p2[2]=vertices[6*npL+2];
	p3[0]=vertices[6*npD]; p3[1]=vertices[6*npD+1]; p3[2]=vertices[6*npD+2];
	calcNormal(p1,p2,p3,n3);//外から見て左下
	p2[0]=vertices[6*npD]; p2[1]=vertices[6*npD+1]; p2[2]=vertices[6*npD+2];
	p3[0]=vertices[6*npR]; p3[1]=vertices[6*npR+1]; p3[2]=vertices[6*npR+2];
	calcNormal(p1,p2,p3,n4);//右下
	  
    normals.push((n3[0]+n4[0])/2.0);normals.push((n3[1]+n4[1])/2.0);normals.push((n3[2]+n4[2])/2.0);//x,y,ｚ
    normals.push((n3[0]+n4[0])/2.0);normals.push((n3[1]+n4[1])/2.0);normals.push((n3[2]+n4[2])/2.0);//x,y,ｚ
  }

  //Bottomの中心
  normals.push(0.0);normals.push(0.0);normals.push(0.0);//z
  normals.push(0.0);normals.push(0.0);normals.push(0.0);//z
 
  //インデックス
  var k1, k2;
  //Top
  for(i = 0; i < nSlice; i++)
  { 
    ip = i + 1;
    if(i == 2 * Math.round(i/2)) j = 1; else j = 0;
    indices.push(j);indices.push(2*i+2);indices.push(2*ip+3);
  }

  nn = (nSlice + 2) * 2;
  for (j = 0; j < nStack; j++)
  {
    for (i = 0; i < nSlice; i++) 
    {
    　var k0 = j * (nSlice+1) * 2 + i * 2 + nn;
      var k1 = k0 + (nSlice+1) * 2+1;
      var k2 = k1 +1;
      var k3 = k0 + 3;
      
      indices.push(k0); indices.push(k1); indices.push(k2);
      indices.push(k0); indices.push(k2); indices.push(k3);
    }
  }

  nn = ((nStack+2) * (nSlice + 1) + 1) * 2;
  //Bottom
  for(i = 0; i < nSlice; i++)
  {
    ip = i + 1;
    if(i == 2 * Math.round(i/2)) j = 1; else j = 0;
    indices.push(vertices.length/3-1-j);//中心座標
    indices.push(nn + 2*ip+1);indices.push(nn + 2*i);
  }
  return indices.length;
}

;
/*----------------------------------------------------------
   Rigidクラス（3Dオブジェクトの定義と描画）
------------------------------------------------------------*/

var MAX_VERTEX = 30;//多面体近似のときの頂点数
var muK = 1.0;//0.5;//動摩擦係数
var muS = 1.0;//静止摩擦係数
var restitution = 0.5;//跳ね返り係数
var dampRotation = 3.0;//回転減速係数
var gravity = 9.8;//重力加速度[m/s^2] 
var restValue = 0.2; //静止状態にするしきい値（速度，回転速度）
var flagDrag = false;//空気抵抗フラグ
var flagMagnus = false;
var flagTumbling = false;
var flagQuaternion = false;

function Rigid()
{
  //プロパティ
  this.kind = "SPHERE";
  this.diffuse = [0.6, 0.6, 0.6, 1.0];
  this.ambient = [0.4, 0.4, 0.4, 1.0];
  this.specular = [0.5, 0.5, 0.5, 1.0];
  this.shininess = 200.0; 
  this.vVel = new Vector3();//速度(m/s) 
  this.vVel0 = new Vector3();//更新前の速度
  this.vPos = new Vector3();//位置(m)
  this.vPos0 = new Vector3();//初期位置
  this.vForce = new Vector3();//外力（Newton)
  this.vForce0 = new Vector3();//外力（初期値)
  this.vOmega = new Vector3();//角速度(rad/s)
  this.vOmega0 = new Vector3();//角速度(rad/s),更新前  
  this.vAcc = new Vector3();//加速度
  this.vTorque = new Vector3();//トルク
  this.vEuler0 = new Vector3();//回転角度（オイラー角で指定,更新前）
  this.vEuler = new Vector3();//回転角度（オイラー角で指定,更新後）
  this.vSize = new Vector3(1.0, 1.0, 1.0);//スケーリング
  this.vGravityToPoint = new Vector3();//重心から衝突点までのベクトル
  this.mass = 1;//質量[kg]
  this.mInertia = new Matrix3();//慣性モーメントのテンソル
  this.mInertiaInverse = new Matrix3();//その逆行列
  this.vInertialResistance = new Vector3();
  this.vRotationalResistance = new Vector3();
  
  this.q = new Quaternion();
  this.vAxis = new Vector3(1.0, 0.0, 0.0);//回転軸
  this.angle = 0.0;
  this.nSlice = 25;
  this.nStack = 25; 
  this.radiusRatio = 0.2;//上底半径/下底半径（トーラスとバネの時はradius1/radius2)
  this.eps1 = 1.0;//"SUPER"のパラメータ
  this.eps2 = 1.0;//"SUPER"のパラメータ
  this.flagDebug = false;//trueのときワイヤーフレームモデル
  this.shadow = 0.0;//影の濃さを表す（0.0なら実オブジェクト)
  //フロア表示のチェック模様
  this.flagCheck = false;
  this.col1 = [0.6, 0.5, 0.5, 1.0];
  this.col2 = [0.4, 0.4, 0.6, 1.0];
  this.plane = [0, 0, 1, 0];//簡易シャドウを描くときの平面の平面方程式
  //テクスチャ
  this.flagTexture = false;
  this.nRepeatS = 1;
  this.nRepeatT = 1;
  //衝突判定などに使われるプロパティ
　this.vP = [];
  this.vP0 = [];//球以外の頂点座標
  this.vNormal = new Vector3();
  this.vNormalFacet = [];//直方体の面の法線ベクトル
  this.numVertex;//球以外の多面体の頂点数
  this.boundingR;//境界球の半径
  this.state = "FREE";
  this.flagFixed = false;
  //tumbling特有のプロパティ
  this.coefLift = 1.0;//揚力係数
  this.delta = 0.5;//シフト率
  //Spring特有のプロパティ
  this.nPitch = 5;//バネ
  this.radius = 0.5;//バネはvSizeを使用しない
  this.len0 = 1;//バネの自然長
  this.len = 1;//length0+変位量  
  this.constant;//バネ定数
  this.row = [];
  this.col = [];
  //水面の波などの表現
  this.sizeX = 10;
  this.sizeY = 10;
  this.data = [];//各格子点のx,y,z座標(kind = "GRID_SQUARE"などのときに必要なデータ)
                 //kind = "ELEVATION"のときはｚ成分だけ
  //SUPER2のパラメータ
  this.size1 = [0.5, 0.1, 0.5];  
  this.size2 = [0.5, 0.1, 0.5];   
  this.middle = 0.5; //中間のサイズ
  this.angle2 = 0;//曲げる角度（度）
  this.jStart = 5;
  this.type = 1;//0,1,2だけ               
}

Rigid.prototype.initVertexBuffers = function(gl)
{
  //頂点データをシェーダへアップロードするメソッド
  var n;
  var vertices = [];//頂点座標
  var normals = []; //法線ベクトル
  var indices = []; //頂点番号
  var colors = [];//check模様のときだけ
  var texCoords = [];//テクスチャ座標

  if(!this.flagTexture)
  {//非テクスチャ用
    if     (this.kind == "CUBE")    n = makeCube(vertices, normals, indices, this.flagDebug);
    else if(this.kind == "SPHERE")  n = makeSphere(vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CYLINDER")n = makeCylinder(vertices, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug);
    else if(this.kind == "PRISM")   n = makePrism(vertices, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug);
    else if(this.kind == "TORUS")   n = makeTorus(vertices, normals, indices, this.radiusRatio, this.nSlice, this.nStack);
    else if(this.kind == "SUPER")   n = makeSuper(vertices, normals, indices, this.nSlice, this.nStack, this.eps1, this.eps2);
    else if(this.kind == "SUPER2")   n = makeSuper2(vertices, normals, indices, this.size1, this.size2, this.nSlice, this.nStack, this.eps1, this.eps2, this.middle, this.angle2, this.jStart, this.type);
    else if(this.kind == "SPRING")   n = makeSpring(vertices, normals, indices, this.radius, this.radiusRatio, this.nSlice, this.nStack, this.nPitch, this.len);
    else if(this.kind == "CYLINDER_X") n = makeCylinderX(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "CYLINDER_Y") n = makeCylinderY(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "CYLINDER_Z") n = makeCylinderZ(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "PLATE_Z")    n = makePlateZ(vertices, normals, indices, this.flagDebug);
    else if(this.kind == "GRID_PLATE") n = makeGridPlate(vertices, normals, indices, this.nSlice, this.nStack, this.flagDebug);
    else if(this.kind == "GRID_SQUARE") n = makeGridSquare(this.data, vertices, normals, indices, this.nSlice, this.nStack, this.flagDebug);
    else if(this.kind == "ELEVATION") n = makeElevation(this.data, vertices, normals, indices, this.nSlice, this.nStack, this.sizeX, this.sizeY, this.flagDebug)
    else if(this.kind == "CHECK_PLATE") n = makeCheckedPlate(vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2) ;  
    else if(this.kind == "CHECK_SQUARE") n = makeCheckedSquare(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2) ;  
    else if(this.kind == "GRID_SPHERE") n = makeGridSphere(this.data, vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CHECK_SPHERE") n = makeCheckedSphere(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2);
    else if(this.kind == "GRID_CYLINDER") n = makeGridCylinder(this.data, vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CHECK_CYLINDER") n = makeCheckedCylinder(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2);
  }
  else
  {//テクスチャ用
    if     (this.kind == "CUBE")    n = makeCubeTex(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "CUBE_BUMP") n = makeCubeBump(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "SPHERE")  n = makeSphereTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "CYLINDER")n =  makeCylinderTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "PRISM")   n = makePrismTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "TORUS")   n = makeTorusTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "SUPER")   n = makeSuperTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.eps1, this.eps2, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "PLATE_Z") n = makePlateZTex(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_PLATE") n = makeGridPlateTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_SQUARE") n = makeGridSquareTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_SPHERE") n = makeGridSphereTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_CYLINDER") n = makeGridCylinderTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
  }
  gl.disableVertexAttribArray(colorLoc);//colorのバッファオブジェクトの割り当てを無効化（フロアを表示したとき，フロアのインデックス以上の球やトーラスを描画できなくなることを防ぐため）

  // バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();
  if(this.flagTexture) {var texCoordBuffer = gl.createBuffer();}
  var normalBuffer = gl.createBuffer();
  if(this.flagCheck) var colorBuffer = gl.createBuffer();
  var indexBuffer = gl.createBuffer();
  if (!vertexBuffer || !normalBuffer || !indexBuffer) return -1;
  
  // 頂点の座標をバッファ・オブジェクトに書き込む
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(vertices), gl.STATIC_DRAW);
  // vertexLocにバッファ・オブジェクトを割り当てる
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  gl.vertexAttribPointer(vertexLoc, 3, gl.FLOAT, false, 0, 0);
  // バッファ・オブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(vertexLoc);//有効化する

  if(this.flagTexture)
  {
    // 頂点のテクスチャ座標をバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(texCoords), gl.STATIC_DRAW);
    // texLocにバッファオブジェクトを割り当てる
    var texLoc = gl.getAttribLocation(gl.program, 'a_texCoord');
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
    // バッファオブジェクトのバインドを解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.enableVertexAttribArray(texLoc);//有効化する
  }

  if(this.flagCheck)
  {
    // 頂点の色をバッファ・オブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // a_colorの格納場所を取得し、バッファオブジェクトを割り当てる
    var colorLoc = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    // バッファ・オブジェクトのバインドを解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.enableVertexAttribArray(colorLoc);//有効化
  }

  // 法線データをバッファ・オブジェクトに書き込む
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(normals), gl.STATIC_DRAW);
  // normalLocにバッファ・オブジェクトを割り当てる
  var normalLoc = gl.getAttribLocation(gl.program, 'a_normal');
  gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(normalLoc);//有効化する

  //バッファ・オブジェクトをターゲットにバインドする
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // インデックスデータをバッファ・オブジェクトに書き込む
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);


  return n;
}

Rigid.prototype.draw = function(gl, n)
{
  //マテリアル特性のユニフォーム変数格納場所を取得し値を設定する
  var diffLoc = gl.getUniformLocation(gl.program, 'u_diffuseColor');
  gl.uniform4fv(diffLoc, new Float32Array(this.diffuse));
  var ambiLoc = gl.getUniformLocation(gl.program, 'u_ambientColor');
  gl.uniform4fv(ambiLoc, new Float32Array(this.ambient));
  var specLoc = gl.getUniformLocation(gl.program, 'u_specularColor');
  gl.uniform4fv(specLoc, new Float32Array(this.specular));
  var shinLoc = gl.getUniformLocation(gl.program, 'u_shininess');
  gl.uniform1f(shinLoc, this.shininess);
　var checkLoc = gl.getUniformLocation(gl.program, 'u_flagCheck');
　gl.uniform1i(checkLoc, this.flagCheck);
  var shadowLoc = gl.getUniformLocation(gl.program, 'u_shadow');
  gl.uniform1f(shadowLoc, this.shadow);
  var flagTexLoc = gl.getUniformLocation(gl.program, 'u_flagTexture');
  gl.uniform1i(flagTexLoc, this.flagTexture);

  // モデル行列を計算する
  var modelMatrix = new Matrix4(); // モデル行列の初期化
  if(this.shadow >= 0.01) modelMatrix.dropShadow(plane, light.pos);//簡易シャドウ
  modelMatrix.translate(this.vPos.x, this.vPos.y, this.vPos.z);
  //回転
  if(flagQuaternion)
  {
    if(this.q.s > 1.0) this.q.s = 1.0;
    if(this.q.s < -1.0) this.q.s = -1.0;
    this.angle = 2.0 * Math.acos(this.q.s) * RAD_TO_DEG;//[rad->deg]
    this.vAxis = norm(getVector(this.q));
    if(this.vAxis.x == 0 && this.vAxis.y == 0 && this.vAxis.z == 0) {
      this.vAxis.x = 1;
    }
    modelMatrix.rotate(this.angle, this.vAxis.x, this.vAxis.y, this.vAxis.z); //任意軸回転
  }
  else
  {//xyz軸の順番でオイラー角回転
    modelMatrix.rotate(this.vEuler.z, 0, 0, 1); // z軸周りに回転
    modelMatrix.rotate(this.vEuler.y, 0, 1, 0); // y軸周りに回転
    modelMatrix.rotate(this.vEuler.x, 1, 0, 0); // x軸周りに回転
  }
  //拡大縮小
  modelMatrix.scale(this.vSize.x, this.vSize.y, this.vSize.z);

  //法線変換行列を計算する
  var normalMatrix = new Matrix4();// 初期化
  if(this.shadow < 0.01)//影でないときだけ
  {
    normalMatrix.setInverseOf(modelMatrix);//モデルリング行列の逆行列を求め
    normalMatrix.transpose();              //さらに転置する
  }
  //それぞれの行列のuniform変数の格納場所を取得し値を設定する
  var modelMatrixLoc = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  gl.uniformMatrix4fv(modelMatrixLoc, false, modelMatrix.elements);
  var normalMatrixLoc = gl.getUniformLocation(gl.program, 'u_normalMatrix');
  gl.uniformMatrix4fv(normalMatrixLoc, false, normalMatrix.elements);
  //物体を描画する
  if(this.flagDebug == false)//solidモデルで描画
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
  else//wireframeモデルで描画
  {
    if(this.kind == "GRID_SQUARE" || this.kind == "CHECK_SQUARE" || this.kind == "ELEVATION")
      gl.drawElements(gl.LINES, n, gl.UNSIGNED_SHORT, 0);
    else
      gl.drawElements(gl.LINE_STRIP, n, gl.UNSIGNED_SHORT, 0);
  }
}

//---------------------------------------------------------
Rigid.prototype.ready = function()
{
  this.state = "FREE";
  for(var i = 0; i < MAX_VERTEX; i++){
    this.vP0[i] = new Vector3();
    this.vP[i] = new Vector3();
    this.vNormalFacet[i] = new Vector3();
  }
  this.calcMomentOfInertia();
  this.calcInertialResistance();
  this.calcRotationalResistance();
  this.calcBoundingRadius();
  if(this.kind == "CUBE") this.setVertexOfCube();
  else if(this.kind == "CYLINDER") this.setVertexOfCylinder();
}

//----------------------------------------------------------------------------
Rigid.prototype.sphere2D = function()
{
  var R = this.vSize.x / 2.0;
  //接触面の法線方向（rigid側から見た方向）
  var vNormal = new Vector3(0.0, 0.0, -1.0);
  //重心から接触点へのベクトル
  this.vGravityToPoint = new Vector3(0.0, 0.0, -this.vPos.z);
  //回転による接触面の速度（vVelとは逆方向）
  var vVelRotate = cross(this.vOmega , this.vGravityToPoint);
  //接地点の合成速度
  var vp = add(this.vVel, vVelRotate); //接地点速度
  var vAxisRotate = cross(vp, vNormal);//回転軸
  vAxisRotate.norm();
  var a = this.mass * muK * gravity;
  //線形速度の減速/加速
  this.vForce.sub(mul(a, norm(vp)));
  //回転速度の加速/減速
  this.vTorque.add(mul(a * R, vAxisRotate));
  //滑らずに転がる場合でもある程度減速 
  this.vForce.sub(mul(0.1*a, norm(this.vVel)));
  //鉛直軸回転に対する減速
  this.vTorque.z -= 0.1 * dampRotation * this.mass * muK * (norm(this.vOmega)).z;
}

//-----------------------------------------------------------------------------
Rigid.prototype.cylinder2D = function()
{
  var eps = 0.0174;//1度以内
  //円柱の中心軸(ｵﾌﾞｼﾞｪｸﾄ座標のz軸）方向
  var vCenter = new Vector3(0, 0, 1);
  vCenter = qvRotate(this.q, vCenter);
  //中心軸方向をrigidの速度方向に揃える
  if(dot(this.vVel, vCenter) < 0.0) vCenter.reverse();
  var e0 = Math.abs(dot(vCenter , new Vector3(0.0, 0.0, 1.0)));
  
  if( e0 < eps && Math.abs(this.vOmega.z) < 0.5)
  {//中心軸が床面に水平で慣性軸のz軸回転が小さいとき
    var R = this.vSize.x / 2.0;//円柱の半径
    //rigid側から見た接触面の法線方向
	var vNormal = new Vector3(0.0, 0.0, -1.0);
	this.vGravityToPoint = new Vector3(0.0, 0.0, -this.vPos.z);
	var vDir = cross(vCenter, vNormal);//中心軸に直交する水平方向
	//中心軸に直交する方向および平行な方向の速度成分
	var vVelV = mul(dot(this.vVel, vDir), vDir);
	var vVelH = mul(dot(this.vVel, vCenter), vCenter);
    if(mag(vVelH) < 3.0)
	{//中心軸に平行な速度がある値以下になったとき転がり運動に移行
	  this.vVel = vVelV;
      //回転による接触面の速度
	  var vVelRotate = cross(this.vOmega, this.vGravityToPoint);			
	  var vp = add(vVelV, vVelRotate);//接地点合成速度
	  var vAxisRotate = cross(vp, vNormal);//回転軸
	  vAxisRotate.norm();//正規化
      var a = this.mass * muK * gravity;
      //線形速度の減速/加速
	  this.vForce.sub(mul(a , norm(vp)));
      //回転速度の加速/減速
	  this.vTorque.add(mul(a * R, vAxisRotate));
      //滑らずに転がる場合でもある程度減速 
      this.vForce.sub(mul(0.1 * a, norm(this.vVel)));
	}
	else //滑り運動に対する減速だけ
	  this.vForce.add(mul(this.mass * muK * gravity , reverse(norm(this.vVel))));
  }
  else
  {//中心軸が床面に水平でない場合．水平でも鉛直軸回転が大きい場合
	this.vForce.add(mul(this.mass * muK * gravity, reverse(norm(this.vVel))));
  }
  //鉛直軸回転に対する減速
  this.vTorque.z -= dampRotation * this.mass * muK * (norm(this.vOmega)).z;
}

//----------------------------------------------------------
Rigid.prototype.action3D = function(dt)
{	
  //フロア（地面）に落下するまでは放物運動をおこなう
  this.vForce = add(this.vForce0, new Vector3(0.0, 0.0, -this.mass * gravity));
  this.vTorque = new Vector3() ;
  var bottom = this.getBottom();//最低点およびvGravityToPointも取得
  if(bottom < 0.0) this.vPos.z -= bottom;//沈み込み防止

  if(this.state != "FREE" ) return;

  if(flagTumbling) this.tumbling();

  if(flagDrag)
  {
    //並進運動に対する慣性抵抗
    this.vForce.sub(mul(Math.abs(dot(qvRotate(this.q, this.vInertialResistance), this.vVel)) , this.vVel)) ;
    //回転運動に対する慣性抵抗
	this.vTorque.sub(mul(Math.abs(dot(qvRotate(this.q, this.vRotationalResistance), this.vOmega)) , this.vOmega));
  }

  if(flagMagnus)
  {
    var r = this.vSize.x / 2.0;
	var k = Math.PI * 1.2 * r * r * r * 0.001;//rは見かけのサイズの1/10
	this.vForce.add(mul(k, cross(this.vOmega, this.vVel)));
  }
  
  var flagCollisionF = false;
  if(bottom <= 0 && this.vVel.z <= 0 ) //フロア上または衝突
  {
    if(this.vVel.z < -0.3)//vzが負の大きな値のとき衝突とする 
    { 
      this.collisionWithFloor(dt); 
      flagCollisionF = true; 
    }

    if(!flagCollisionF)
    {
      this.state = "FREE";
	  //重力と抗力によるトルク
	  if(this.kind == "CUBE" || this.kind == "CYLINDER")
	  {
	    var torq = mul(cross(this.vGravityToPoint, new Vector3(0.0, 0.0, this.mass * gravity)), 0.5);
	    this.vTorque.add(torq);
	  }
      //床平面上の2次元運動
	  if(this.kind == "SPHERE") this.sphere2D();
	  else if(this.kind == "CYLINDER") this.cylinder2D();
	  else
	  {//直方体
	    var vDir = normXY(this.vVel);//z成分を無視
        this.vForce.sub(mul(this.mass * muK * gravity, vDir));
        //床面におけるｚ軸回転に対し逆方向のトルクを与える
        this.vTorque.z -= dampRotation * this.mass * muK * (norm(this.vOmega)).z;
	  }

      if(this.isStabilized())
	  {
	    if(mag(this.vVel) + this.boundingR * mag(this.vOmega) < restValue) 
	    {//静止状態にする
          this.state = "RESTING";
        }
	  }
    }
  }

  if(this.state == "RESTING")
  {//静止状態にする
    this.vVel = new Vector3();
    this.vTorque = new Vector3();
    this.vOmega = new Vector3();
  }
 
  //並進運動の速度・位置の更新
  var vAcc = div(this.vForce , this.mass);
  this.vVel.add(mul(vAcc , dt));
  this.vPos.add(mul(this.vVel , dt));
　//回転運動の角速度・クォータニオンの更新
  //オブジェクト座標系に変換しEulerの運動方程式を適用
  var vOmegaObj = qvRotate(conjugate(this.q), this.vOmega);
  var vTorqueObj = qvRotate(conjugate(this.q), this.vTorque);
  var cs = cross(vOmegaObj, mulMV(this.mInertia, vOmegaObj));
  //角加速度（オブジェクト座標系）
  var vAlpha = mulMV(this.mInertiaInverse, sub(vTorqueObj, cs));
  //角加速度を慣性座標系にもどし角速度を更新
  this.vOmega.add(qvRotate(this.q, mul(vAlpha, dt)));
  var qq = mulVQ(this.vOmega, this.q); 
  this.q.add(mulQS(qq, (0.5 * dt)));
  this.q.norm();
}

//-------------------------------------------------------------------------
//Floorとの衝突を調べFloorから最低位置の高さを返す
Rigid.prototype.getBottom = function()
{
  var bottom, i, cnt;
  var eps = 0.0;//0.1;
  var vCollision = [];//衝突点の頂点番号(多面体)
  for(i = 0; i < 30; i++) vCollision[i] = new Vector3();
  var vPointCollision = new Vector3();
  bottom = 1000.0;
  if( this.vPos.z <= this.boundingR + eps)
  {//床と衝突の可能性あり
    if(this.kind == "SPHERE")
    {
      bottom = this.vPos.z - this.boundingR;
      this.vGravityToPoint = new Vector3(0, 0, -this.boundingR);

      return bottom;
    }
    else
    {
	  //World座標に変換
      for(i = 0; i < this.numVertex; i++)
      {
        this.vP[i] = qvRotate(this.q, this.vP0[i]);//慣性空間へ変換
        //中心座標だけ平行移動
        this.vP[i].add(this.vPos);//World座標
      }
      cnt = 0;//衝突点個数
      vPointCollision = new Vector3();
      for(i = 0 ; i < this.numVertex; i++) {
        if(this.vP[i].z <= 0) { vPointCollision.add(this.vP[i]); cnt++; }
        if(this.vP[i].z < bottom )  bottom = this.vP[i].z;
      }
      if(bottom <= eps)  //Floorと衝突
      {
        vPointCollision.div(cnt);
        this.vGravityToPoint = sub(vPointCollision, this.vPos);
        return bottom;
      }
    }
  }
  return bottom;
}
//--------------------------------------------------------------
Rigid.prototype.collisionWithFloor = function(dt)
{
  var c = 0.2;
  var vNormal = new Vector3(0.0, 0.0, -1.0);//衝突面の法線方向(rigid側からの法線）	
  //衝突点の合成速度
  var vp = add(this.vVel, cross(this.vOmega, this.vGravityToPoint));//衝突点速度(ベクトル）
  var vTangent = cross(vNormal, cross(vp, vNormal)); //接線ベクトル
  vTangent.norm();
	
  var a1 = cross(this.vGravityToPoint, vNormal);
  var a2 = mulMV(this.mInertiaInverse, a1);
  var a3 = cross(a2, this.vGravityToPoint);
  //力積
  var rikiseki = - (restitution + 1.0) * dot(vNormal, vp) / (1.0/this.mass + dot(vNormal, a3));

  //摩擦なし
  //力の総和
  this.vForce.add(mul(vNormal, rikiseki / dt));
  //力のモーメント（トルク）の総和
  this.vTorque.add(mul(cross(this.vGravityToPoint, vNormal), c*rikiseki / dt));

  //摩擦を考慮した分を追加
  var c2 = dot(vTangent, cross(mulMV(this.mInertiaInverse, cross(this.vGravityToPoint, vTangent)), this.vGravityToPoint));
  var B = -dot(vTangent, vp) / (1.0/this.mass + c2);
  var muC = Math.abs(B / rikiseki);
  if(muK >= muC){
    this.vForce.add(mul(B/dt, vTangent));
    this.vTorque.add(mul(cross(this.vGravityToPoint, vTangent), c* B/dt));
  }
  else
  {
    this.vForce.add( mul(muK * rikiseki / dt , vTangent));
	this.vTorque.add(mul(cross(this.vGravityToPoint, vTangent) , c*muK * rikiseki / dt));
  }
}

//--------------------------------------------------------------
Rigid.prototype.isStabilized = function()
{
  //安定な姿勢とは，
  //直方体：P0-P1とP1-P2の両方が水平であるか，どちらかが水平面に垂直
  //円柱：中心軸が水平面に直角または平行
  
  var e0, e1;
  var eps0 = 0.0174;//cos89  0.08715;//cos8   
  var eps1 =  0.9998;//cos1  0.99619;//cos5    
  var vNormal = new Vector3(0, 0, 1);

  if(this.kind == "SPHERE") return true;

  else if(this.kind == "CUBE")
  {
    e0 = norm(qvRotate(this.q, direction(this.vP0[4], this.vP0[0])));//慣性座標に変換
    e0 = Math.abs(dot(e0, vNormal));
	e1 = norm(qvRotate(this.q, direction(this.vP0[0], this.vP0[1])));
    e1 = Math.abs(dot(e1, vNormal));
	//どちらかが鉛直なら安定
	if( e0 > eps1 ) return true;
	if( e1 > eps1 ) return true;
	if( e0 < eps0 && e1 < eps0) return true;//どちらも水平
 
  }

  else if(this.kind == "CYLINDER")
  {
    e0 = norm(qvRotate(this.q, direction(this.vP0[2*this.nSlice], this.vP0[2*this.nSlice+1])));//中心軸(基本姿勢のz軸)
    e0 = Math.abs(dot(e0, vNormal));

    if( e0 > eps1) return true;//z軸に平行（垂直）
    if( e0 < eps0) return true;//フロアに平行
  }
  return false;
}

//------------------------------------------------------------------------------
Rigid.prototype.calcMomentOfInertia = function()
{ 
  if(this.kind != "SPHERE" && this.kind != "CUBE"  && this.kind != "CYLINDER") {
    console.log("この立体の慣性モーメントは求めていません"); return;
  }
  var sx = this.vSize.x; var sy = this.vSize.y; var sz = this.vSize.z;
  var mass = this.mass;
  
  var Ixx, Iyy, Izz;

  if(this.kind == "SPHERE")
  {
    if(sx != sy || sy != sz || sz != sx) { console.log("完全な球にしてください"); return; }
    Ixx = Iyy = Izz = sx * sx * mass / 10.0; //vSizeは直径
  }

  else if(this.kind == "CYLINDER")//円柱
  {
    if(sx != sy) { console.log("完全な円柱にしてください"); return; } 
    Ixx = mass * (sy * sy / 16.0 + sz * sz / 12.0);
    Iyy = mass * (sx * sx / 16.0 + sz * sz / 12.0);
    Izz = mass * (sx * sx + sy * sy) / 16.0;
  }
  else if(this.kind == "CUBE")//直方体(直方体)
  {
    Ixx = mass * (sy * sy + sz * sz) / 12.0;
    Iyy = mass * (sx * sx + sz * sz) / 12.0;
    Izz = mass * (sx * sx + sy * sy) / 12.0;
  }
  //慣性モーメント のテンソル
  this.mInertia.set(Ixx, 0.0, 0.0,
                    0.0, Iyy, 0.0,
                    0.0, 0.0, Izz );
  this.mInertiaInverse.set(1/Ixx, 0.0, 0.0,
                           0.0, 1/Iyy, 0.0,
                           0.0, 0.0, 1/Izz);
}

//-----------------------------------------------------------------------------
Rigid.prototype.calcInertialResistance = function()
{ //x,y,z方向の断面積
  var vArea = new Vector3();

  if(this.kind == "SPHERE")
  {
    vArea.x = Math.PI * this.vSize.y * this.vSize.z / 4.0;
	vArea.y = Math.PI * this.vSize.z * this.vSize.x / 4.0;
	vArea.z = Math.PI * this.vSize.x * this.vSize.y / 4.0;		
  }
  else if(this.kind == "CUBE")
  {
    vArea.x = this.vSize.y * this.vSize.z ;
	vArea.y = this.vSize.z * this.vSize.x ;
	vArea.z = this.vSize.x * this.vSize.y ;
  }
  else if(this.kind == "CYLINDER")//円柱
  {
    vArea.x = this.vSize.y * this.vSize.z ;
    vArea.y = this.vSize.x * this.vSize.z ;
    vArea.z = Math.PI * this.vSize.x * this.vSize.y / 4.0;
  }
  //ci=0.5*CD*ρ*A(CD=1.0, ρ=1.2)
  //見かけの大きさの1/10，面積は1/100倍
  this.vInertialResistance = mul(0.5 * 1.2 * 0.01, vArea); 
}
//---------------------------------------------------------------------
Rigid.prototype.calcRotationalResistance = function()
{
  var gamma = 0.1;//回転抵抗係数の直交成分に対する平行成分の比
  var k_shape;
  var shortR, longR;
  var a = this.vSize.x / 2.0, b = this.vSize.y / 2.0, c = this.vSize.z / 2.0;
  var a2 = a * a, b2 = b * b, c2 = c * c;

  if(this.kind == "SPHERE")
  {
    k_shape = 1.0;
    var ci = (1.0 - (1.0 - gamma) * k_shape) * Math.PI * Math.pow(a, 5.0);
	this.vRotationalResistance = new Vector3(ci, ci, ci);
  }
  else if(this.kind == "CUBE")
  {
    longR = Math.sqrt(b*b + c*c); shortR = Math.min(b, c);
	k_shape = shortR / longR; 
	this.vRotationalResistance.x = (1.0 - (1.0 - gamma) * k_shape) * Math.pow(longR, 3.0) * b * c * 4.0;

	longR = Math.sqrt(a*a + c*c); shortR = Math.min(a, c);
	k_shape = shortR / longR; 
	this.vRotationalResistance.y = (1.0 - (1.0 - gamma) * k_shape) * Math.pow(longR, 3.0) * c * a * 4.0;

    longR = Math.sqrt(a*a + b*b ); shortR = Math.min(a, b);
	k_shape = shortR / longR; 
	this.vRotationalResistance.z = (1.0 - (1.0 - gamma) * k_shape) * Math.pow(longR, 3.0) * a * b * 4.0;
  }
  else if(this.kind == "CYLINDER")
  {
    longR = Math.max(a, b); shortR = Math.min(b, c); 
	k_shape = shortR / longR; 
	this.vRotationalResistance.z = (1.0 - (1.0 - gamma) * k_shape) * Math.pow(longR, 3.0) * a * b * Math.PI;

	longR = Math.sqrt(b*b + c*c); shortR = Math.min(b, c);
	k_shape = shortR / longR; 
	this.vRotationalResistance.x = (1.0 - (1.0 - gamma) * k_shape) * Math.pow(longR, 3.0) * b * c * 4.0;

	longR = Math.max(a, c); shortR = Math.min(a, c);
	k_shape = shortR / longR; 
	this.vRotationalResistance.y = (1.0 - (1.0 - gamma) * k_shape) * Math.pow(longR, 4.0) * a * c * 4.0;
  }
  //見かけのサイズの1/10，CD=1.0としてρCD/2を乗じる(CR=(1/8)*CD*ρ*R^3*A)
  this.vRotationalResistance.mul(0.125 * 1.2 * 0.00001);		
}

//-------------------------------------------------------------------------
Rigid.prototype.calcBoundingRadius = function()
{
  var sx = this.vSize.x;
  var sy = this.vSize.y;
  var sz = this.vSize.z;
  
  if(this.kind == "SPHERE"){ //球
    this.boundingR = sx / 2.0;
  }
  else if(this.kind == "CUBE" ) {//直方体(球体とみなしたときの半径)
    this.boundingR = Math.sqrt(sx * sx + sy *sy + sz * sz) / 2.0;
  }
  else if(this.kind == "CYLINDER"){//円柱
    var a = Math.max(sx, sy);
    this.boundingR = Math.sqrt(a * a + sz * sz) / 2.0;
  }
}
//-----------------------------------------------------------------------------
Rigid.prototype.setVertexOfCube = function()
{
  var sx = this.vSize.x;
  var sy = this.vSize.y;
  var sz = this.vSize.z;

  this.vP0[0].x = sx / 2.0; this.vP0[0].y = sy / 2.0; this.vP0[0].z = sz / 2.0;
  this.vP0[1].x =-sx / 2.0; this.vP0[1].y = sy / 2.0; this.vP0[1].z = sz / 2.0;
  this.vP0[2].x =-sx / 2.0; this.vP0[2].y =-sy / 2.0; this.vP0[2].z = sz / 2.0;
  this.vP0[3].x = sx / 2.0; this.vP0[3].y =-sy / 2.0; this.vP0[3].z = sz / 2.0;
  this.vP0[4].x = sx / 2.0; this.vP0[4].y = sy / 2.0; this.vP0[4].z =-sz / 2.0;
  this.vP0[5].x =-sx / 2.0; this.vP0[5].y = sy / 2.0; this.vP0[5].z =-sz / 2.0;
  this.vP0[6].x =-sx / 2.0; this.vP0[6].y =-sy / 2.0; this.vP0[6].z =-sz / 2.0;
  this.vP0[7].x = sx / 2.0; this.vP0[7].y =-sy / 2.0; this.vP0[7].z =-sz / 2.0;
  this.numVertex = 8;
}
//-----------------------------------------------------------------------------
Rigid.prototype.setVertexOfCylinder = function()
{
  var i, phi, phi0;
  this.numVertex = 2 * this.nSlice + 2;

  if(this.numVertex > MAX_VERTEX) {
    console.log("nSliceを小さくしてください in setVertexOfCylinder");
    return;
  }

  phi0 = 2.0 * Math.PI / this.nSlice;
  for(i = 0;i < this.nSlice;i++)
  {   
    phi = phi0 * i;
	this.vP0[i].x = 0.5 * Math.cos(phi) * this.vSize.x; //上底のx成分
	this.vP0[i].y = 0.5 * Math.sin(phi) * this.vSize.y; //ｙ成分
	this.vP0[i].z = 0.5 * this.vSize.z;                 //ｚ成分(高さ)
	this.vP0[i+this.nSlice].x = this.vP0[i].x;          //下底のx成分
	this.vP0[i+this.nSlice].y = this.vP0[i].y;          //ｙ成分
	this.vP0[i+this.nSlice].z = - 0.5 * this.vSize.z;   //ｚ成分
  }
  //上底の中心
  this.vP0[2*this.nSlice].x = 0.0;
  this.vP0[2*this.nSlice].y = 0.0;
  this.vP0[2*this.nSlice].z = 0.5 * this.vSize.z;
  //下底の中心
  this.vP0[2*this.nSlice+1].x = 0.0;
  this.vP0[2*this.nSlice+1].y = 0.0;
  this.vP0[2*this.nSlice+1].z = -0.5 * this.vSize.z;
}
//-----------------------------------------------------------------------
Rigid.prototype.tumbling = function()
{
  var sx = this.vSize.x; 
  var sy = this.vSize.y;
  //慣性空間における法線ベクトル
  var vNorm = qvRotate(this.q, new Vector3(0.0, 0.0, 1.0));
  if(vNorm.z < 0.0) vNorm.reverse();
  var vVelocityN = norm(this.vVel);//正規化速度
  //紙片の接線ベクトル
  var vTang = cross(vNorm, cross(vVelocityN, vNorm));//接線ベクトル
  vTang.norm();
　//迎え角の計算
  var dotTV = dot(vTang, vVelocityN);
  if(dotTV > 1.0) dotTV = 1.0;
  var phi = Math.acos(dotTV);//迎え角
  var S = sx * sy * 0.01;//紙片の面積
  var rho = 1.2;//空気密度
  var cc = 0.5 * this.coefLift * rho * mag(this.vVel) * Math.sin(2*phi) * S;
  var vForceLift = mul(cc, cross(this.vVel, cross(vNorm, vTang)));//揚力
  this.vForce.add(vForceLift);
  //進行方向の紙片の長さ
  var Length = 0.1 * Math.abs(dot(qvRotate(this.q, new Vector3(sx, sy, 0.0)), vTang));
  //回転トルクの追加
  this.vTorque.add(mul(cross(vTang, vForceLift), this.delta * Length));
}

/*-----------------------------------------------------------------------------
  剛体と剛体の衝突判定
----------------------------------------------------------------------------- */
var NON_COLLISION = -999;
//球同士
Rigid.prototype.collisionSphereWithSphere = function(rigid)
{
	this.vNormal = direction(this.vPos, rigid.vPos);//球1(this)から球2(rig)へ向かう単位法線ベクトル
	//重心から衝突点までのベクトル
	this.vGravityToPoint = mul(this.vSize.x/2.0, this.vNormal);
	rigid.vGravityToPoint = mul(rigid.vSize.x/2.0, this.vNormal);
	rigid.vGravityToPoint.reverse();
	var depth = (this.vSize.x + rigid.vSize.x) / 2.0 - distance(this.vPos, rigid.vPos);
	return depth;//球同士の場合，必ず衝突
}

//------------------------------------------------------------------------------
//球と直方体の衝突判定
//球の中心から辺までの距離 <= 球の半径でかつ
//球の中心が直方体の辺に対して正領域が１つの場合
//直方体の辺と交差するときも衝突（正領域が2つ）
Rigid.prototype.collisionSphereWithCube = function(rigid)
{
  //直方体の面を構成する頂点番号
  var vs = [ [0,1,2,3], [0,3,7,4], [0,4,5,1],
             [1,5,6,2], [2,6,7,3], [4,7,6,5] ];
  //辺を構成する頂点番号(最初の2個）と面番号
  var ve = [ [0,1,0,2], [1,2,0,3], [2,3,0,4], [3,0,0,1],
             [0,4,1,2], [1,5,2,3], [2,6,3,4], [3,7,1,4],
             [4,5,2,5], [5,6,3,5], [6,7,4,5], [7,4,1,5] ];
  var i, j, k, no1, no2;
  var dist = [];//球の中心から面までの距離
  var f, d;//判定式
  var faceNo = []; 
  var cnt;
  var rr = this.vSize.x / 2.0;//球の半径
  var depth;
  var vCollision = new Vector3();//衝突点
  var vDir = new Vector3();

  //衝突対象(#2)の頂点の位置を取得
  for(i = 0; i < rigid.numVertex; i++)
    rigid.vP[i] = add(qvRotate(rigid.q, rigid.vP0[i]) , rigid.vPos);

  //衝突対象(#2)の面の法線ベクトル
  for(j = 0; j < 6; j++)//jは#2の面番号
  {
    rigid.vNormalFacet[j] = cross(sub(rigid.vP[vs[j][1]], rigid.vP[vs[j][0]]) , sub(rigid.vP[vs[j][2]], rigid.vP[vs[j][1]])) ;
    rigid.vNormalFacet[j].norm();
  }
  //球の中心から対象直方体の面までの距離を調査
  cnt = 0;//球の中心が直方体の面の正領域にある回数
  for(j = 0; j < 6; j++) //対象直方体の面番号
  {
    f = dot(rigid.vNormalFacet[j] , sub(this.vPos, rigid.vP[vs[j][0]]));
    if( f >= 0.0 ) 
    {
      faceNo[cnt] = j;
      dist[faceNo[cnt]] = f;//面から球中心点までの距離
      cnt++;
      vCollision = sub(this.vPos , mul(rigid.vNormalFacet[j], rr)); //cnt=1のときの交点候補
    }
  }
  if(cnt == 1)
  { //面と衝突の可能性あり
    this.vNormal = rigid.vNormalFacet[faceNo[0]] ;
	this.vNormal.reverse();
	depth = dot(this.vNormal , sub(vCollision, rigid.vP[vs[faceNo[0]][0]]));
    //重心から衝突点までのベクトル
    this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは中心座標)
    rigid.vGravityToPoint = sub(vCollision, rigid.vPos) ;//対象剛体側
    return depth;
  }
  else if(cnt == 2)
  { //辺と交差の可能性あり
    //面を共有する辺番号
    for(k = 0; k < 12; k++)
    {
      if( faceNo[0] == ve[k][2] && faceNo[1] == ve[k][3] ){
        no1 = ve[k][0]; no2 = ve[k][1]; //交差する辺の頂点番号
        break;
      }
    }
    //辺の方向ベクトル
    vDir = direction(rigid.vP[no1] , rigid.vP[no2]); //
    f = dot(vDir , sub(rigid.vP[no1], this.vPos)) ;
    vCollision = sub(rigid.vP[no1], mul(vDir, f));//球の中心から辺へ垂線を下ろした時の交点
    d = mag(sub(vCollision , this.vPos));//その距離

    if(d > rr) return NON_COLLISION;
    depth = rr - d;
    this.vNormal = direction(this.vPos , vCollision) ;//球の中心から衝突点への単位ベクトル
    //重心から衝突点までのベクトル
    this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは球の中心座標)
    rigid.vGravityToPoint =sub(vCollision, rigid.vPos) ;//対象剛体側
    return depth;
  }
  else return NON_COLLISION;
}

//------------------------------------------------------------------------------
//直方体(直方体)と球の衝突判定
//直方体の頂点が球の内部に存在するとき衝突
Rigid.prototype.collisionCubeWithSphere = function(rigid)
{
  var i, cnt, dist;
  var vCollision = new Vector3();//衝突点

  //直方体の頂点の位置を取得(vP[i]に格納)
  for(i = 0; i <this.numVertex; i++)
  {
    this.vP[i] = qvRotate(this.q, this.vP0[i]);
    this.vP[i].add(this.vPos);
  }

  cnt = 0;
  for(i = 0; i < 8; i++)
  {
    dist = distance(rigid.vPos, this.vP[i]);//球中心から直方体の頂点までの距離
    if(dist < rigid.boundingR) //球の半径以下なら
    {//衝突
      cnt++;
      vCollision.add(this.vP[i]);
    }
  }
  if(cnt == 0) return NON_COLLISION;

  vCollision.div(cnt);
  this.vNormal = sub(rigid.vPos, vCollision);//法線方向
  var depth = rigid.boundingR - mag(this.vNormal);
  this.vNormal.norm();
  //重心から衝突点までのベクトル
  this.vGravityToPoint = sub(vCollision, this.vPos); //直方体(中心から衝突点へ向かうベクトル)
  rigid.vGravityToPoint = sub(vCollision, rigid.vPos);
  return depth;
}

//------------------------------------------------------------------------------
//直方体と直方体の衝突判定
//注目剛体の頂点が対象剛体の内部（境界上を含む)にあるとき衝突
//辺と辺が交差するとき衝突
Rigid.prototype.collisionCubeWithCube = function(rigid)
{
  //面を構成する頂点番号
  var vs = [ [0,1,2,3], [0,3,7,4], [0,4,5,1],
             [1,5,6,2], [2,6,7,3], [4,7,6,5] ];

  var i, j, k;
  var nfvP = [];//交点と辺で作る面の法線ベクトル
  for(i = 0; i < 4; i++) nfvP[i] = new Vector3();
  var f;//判定式
  var min0, dd;
  var minNo, kaisu, cnt, VertexNo = [];
  var vCollision = new Vector3();//衝突点
  var vPoint = [];//面との交点（参照渡しに使用するため配列宣言）
  vPoint[0] = new Vector3();

  //注目剛体の頂点の世界座標空間における位置を取得(vP[i]に格納)
  for(i = 0; i < this.numVertex; i++)
  {
	this.vP[i] = qvRotate(this.q, this.vP0[i]);
	this.vP[i].add(this.vPos);
  }
  //衝突対象(#2)の頂点の世界座標空間における位置を取得
  for(i = 0; i < rigid.numVertex; i++)
  {
	rigid.vP[i] = qvRotate(rigid.q, rigid.vP0[i]);
	rigid.vP[i].add(rigid.vPos);
  }

  //#2の面の法線ベクトル
  for(j = 0; j < 6; j++)//jは#2(対象剛体）の面番号
  {
    rigid.vNormalFacet[j] = cross(sub(rigid.vP[vs[j][1]], rigid.vP[vs[j][0]]) , sub(rigid.vP[vs[j][2]], rigid.vP[vs[j][1]])) ;
    rigid.vNormalFacet[j].norm();
  }
  //注目直方体の全ての頂点について対象剛体の内部にあるかどうかを調査
  cnt = 0;//対象剛体内部にある注目剛体の頂点個数
  for(i = 0; i < 8; i++) //#1の頂点
  {
    kaisu = 0;//判定式が負となる回数
    for(j = 0; j < 6; j++) //#2の面番号
    {
      f = dot(rigid.vNormalFacet[j] , sub(this.vP[i], rigid.vP[vs[j][0]]));
      if( f > 0.001 ) break;//fが全て負のとき衝突
      kaisu ++;
    }
    if( kaisu == 6) //#1の頂点が#2の内部
    {
      VertexNo[cnt] = i;//#2に衝突している#1の頂点番号
      cnt++;
    }
  }
  
  if(cnt != 0)
  {
    //#2の面に衝突している#1の頂点をすべて求め平均値を衝突点とする
    vCollision = new Vector3();//衝突点のクリア
    for(k = 0; k < cnt; k++) 
    {
      vCollision.add(this.vP[VertexNo[k]]);//衝突点を追加
    }
    //衝突点
    vCollision.div(cnt);//平均値
    //辺と辺が交差していればその部分の交点を追加し平均
    if(this.getPointCubeWithCube(rigid, vPoint) == true)
    {
      vCollision.add(vPoint[0]);
      vCollision.div(2.0);
    }

    //最も近い面番号minNoを決定
    f = dot(rigid.vNormalFacet[0] , sub(vCollision, rigid.vP[vs[0][0]]));
    min0 = Math.abs(f) / mag(rigid.vNormalFacet[0]) ;//面までの距離(めり込み量）
    minNo = 0;
    for(j = 1; j < 6; j++)//jは対象剛体の面番号
    {
      f = dot(rigid.vNormalFacet[j] , sub(vCollision, rigid.vP[vs[j][0]]));
      dd = Math.abs(f) / mag(rigid.vNormalFacet[j]) ;//面までの距離
      if( dd < min0 )
      {
          min0 = dd;
          minNo = j;
      }
    }
    //その面の法線ベクトルを反転
    this.vNormal = reverse(rigid.vNormalFacet[minNo]);

    //重心から衝突点までのベクトル
    this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは中心座標)
    rigid.vGravityToPoint = sub(vCollision, rigid.vPos) ;//対象剛体側
    return min0;
  }
  else//辺と辺の交差
  {
    if(!this.getPointCubeWithCube(rigid, vPoint)) return NON_COLLISION;
    //最も近い面番号minNoを決定
    f = dot(rigid.vNormalFacet[0] , sub(vPoint[0], rigid.vP[vs[0][0]]));
    min0 = Math.abs(f) / mag(rigid.vNormalFacet[0]) ;//j=0の面までの距離
    minNo = 0;
    for(j = 1; j < 6; j++)//jは対象剛体の面番号
    {
      f = dot(rigid.vNormalFacet[j] , sub(vPoint[0], rigid.vP[vs[j][0]]));
      dd = Math.abs(f) / mag(rigid.vNormalFacet[j]) ;//面までの距離
      if( dd < min0)
      {
          min0 = dd;
          minNo = j;
      }
    }
    if(this.vNormal.x == 0.0 && this.vNormal.y == 0.0 && this.vNormal.z == 0.0 ) this.vNormal = rigid.vNormalFacet[minNo];
 
	this.vNormal.norm();//隣り合う面のときは和の正規化で近似
    //その面の法線ベクトルを反転
    this.vNormal.reverse();

    //重心から衝突点までのベクトル
    this.vGravityToPoint = sub(vPoint[0], this.vPos) ; //注目剛体側（vPosは中心座標)
    rigid.vGravityToPoint = sub(vPoint[0], rigid.vPos) ;//対象剛体側

    return min0;
  }
}
//---------------------------------------------------------------------
//注目剛体の辺が対象剛体の面と交差している点を加え平均をとり衝突点とする
//辺の両端が１つの面の外側であればその辺は交差しない
//面と面が十字状にクロスしているときも判定
Rigid.prototype.getPointCubeWithCube = function(rigid, vPoint)
{
  //直方体の面を構成する頂点番号
  var vs = [ [0,1,2,3], [0,3,7,4], [0,4,5,1],
             [1,5,6,2], [2,6,7,3], [4,7,6,5] ];
  //辺を構成する頂点番号
  var ve = [ [0,1], [1,2], [2,3], [3,0],
             [0,4], [1,5], [2,6], [3,7],
             [4,5], [5,6], [6,7], [7,4] ];

  var i, j, k, kp, kaisu, cnt;
  var fa, fb, tt;
  var vNormal0 = [];//交点と辺で作る面の法線ベクトル
  for(i = 0; i < 4; i++) vNormal0[i] = new Vector3(); 
  var vPoint0 = new Vector3();    //交点

  kaisu = 0; //注目剛体の辺が対象剛体の面と交差する回数
  vPoint[0] = new Vector3(); //交差点
  this.vNormal = new Vector3(); //面の法線方向の和
  for(i = 0; i < 12; i++) //注目直方体の辺
  {
    for(j = 0; j < 6; j++)//対象直方体の面
    { //辺の頂点が対象剛体の面の正領域か負領域か
      fa = dot(rigid.vNormalFacet[j] , sub(this.vP[ve[i][0]], rigid.vP[vs[j][0]]));
      fb = dot(rigid.vNormalFacet[j] , sub(this.vP[ve[i][1]], rigid.vP[vs[j][0]]));
      if(fa * fb >= 0.0) continue;//同じ領域にあれば交差しない
      tt = fa / (fa - fb);
      vPoint0 = add(mul(sub(this.vP[ve[i][1]], this.vP[ve[i][0]]) , tt), this.vP[ve[i][0]]);//平面との交点
      cnt = 0;
      for(k = 0; k < 4; k++)//交点を持つ面の辺
      {
        kp = k+1;
        if(kp == 4) kp = 0;
        vNormal0[k] = cross(sub(rigid.vP[vs[j][k]], vPoint0) , sub(rigid.vP[vs[j][kp]], rigid.vP[vs[j][k]])) ;
        if(dot(rigid.vNormalFacet[j] , vNormal0[k]) < 0.0) break;//１つでも負ならばこの面とは交差しない
		cnt++;
      }
      if(cnt == 4)
      {//交差
        kaisu++;
        vPoint[0].add(vPoint0);
        this.vNormal.add(rigid.vNormalFacet[j]);
      }
    }
  }
  if(kaisu != 2 && kaisu != 4 && kaisu != 8) return false;//交差なし
  vPoint[0].div(kaisu);
  return true;
}
//------------------------------------------------------------------
//球と円柱の衝突判定
//球の中心から円柱の中心軸までの距離 <= 球の半径＋円柱の半径(側面衝突）
//上底または下底と衝突（球の中心は上底または下底の外部)
//どちらも衝突点が円柱の上底と下底の中間に存在
Rigid.prototype.collisionSphereWithCylinder = function(rigid)
{
  var dist;//球の中心から円柱中心軸までの距離
  var depth;//めり込み量
  var h1, h2;
  var rr = this.vSize.x / 2.0;//球の半径
  var vCollision;//衝突点
  var vKoten;//球の中心から円柱中心軸へ下ろした垂線の交点

  //球の頂点
  for(var i = 0; i < this.numVertex; i++)
  {
	this.vP[i] = qvRotate(this.q, this.vP0[i]);
	this.vP[i].add(this.vPos);
  }

  //対象円柱の頂点
  for(var i = 0; i < rigid.numVertex; i++)
  {
	rigid.vP[i] = qvRotate(rigid.q, rigid.vP0[i]);
	rigid.vP[i].add(rigid.vPos);
  }
  //円柱中心軸ベクトル
  var vCenter = direction(rigid.vP[2*rigid.nSlice + 1], rigid.vP[2*rigid.nSlice]);
  //球の中心から円柱中心軸へ下ろした垂線の交点
  vKoten = sub(rigid.vP[2*rigid.nSlice+1] , mul(vCenter, dot(vCenter, sub(rigid.vP[2*rigid.nSlice+1], this.vPos))));//vPosは球の中心
  //球の中心から交点までの距離
  dist = mag(sub(vKoten, this.vPos));
  //衝突の最低条件
  if(dist > rr + Math.max(rigid.vSize.x, rigid.vSize.y) / 2.0) return NON_COLLISION;

  //球の中心から上底、下底までの距離
  h1 = Math.abs(dot(vCenter , sub(this.vPos, rigid.vP[2*rigid.nSlice]))); //上底までの距離
  h2 = Math.abs(dot(vCenter , sub(this.vPos, rigid.vP[2*rigid.nSlice+1])));//下底までの距離
  //側面衝突
  if(h1 < rigid.vSize.z && h2 < rigid.vSize.z)
  {
    this.vNormal = sub(this.vPos, vKoten);
    vCollision = add(vKoten, mul(this.vNormal, rigid.vSize.x / 2.0)) ;
    depth = rr + rigid.vSize.x/2.0 - mag(this.vNormal);
    this.vNormal.norm();
  }
  else//上底または下底と衝突
  {
	if((h1 < rr || h2 < rr) && dist > Math.max(rigid.vSize.x, rigid.vSize.y) / 2.0) return NON_COLLISION;
	//if(h1 > rr || h2 > rr || dist > Math.max(rigid.vSize.x, rigid.vSize.y) / 2.0) return NON_COLLISION;

    if(h1 <= rr )//上底側で衝突
    {
      this.vNormal = vCenter;
      vCollision = sub(this.vPos, mul(this.vNormal, dot(this.vNormal , sub(this.vPos, rigid.vP[2*rigid.nSlice]))));
      depth = rr - h1;
    }
    else if(h2 <= rr )//下底側で衝突
    {
      this.vNormal = reverse(vCenter);
      vCollision = sub(this.vPos, mul(this.vNormal, dot(this.vNormal , sub(this.vPos, rigid.vP[2*rigid.nSlice+1]))));
      depth = rr - h2;
    }
    else return NON_COLLISION;
  }
  this.vNormal.reverse();//注目剛体側から見た法線方向

  //重心から衝突点までのベクトル
  this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは球の中心座標)
  rigid.vGravityToPoint = sub(vCollision, rigid.vPos) ;//対象剛体側
  return depth;
}
//------------------------------------------------------------------------------
//円柱と球の衝突判定
//円柱の頂点が球の内部に存在するとき衝突
Rigid.prototype.collisionCylinderWithSphere = function(rigid)
{
  var i, cnt, dist;
  var vCollision = new Vector3();//衝突点

  for(i = 0; i < this.numVertex; i++)
  {
	this.vP[i] = qvRotate(this.q, this.vP0[i]);
	this.vP[i].add(this.vPos);
  }
  
  cnt = 0;
  for(i = 0; i < 2*this.nSlice; i++)
  {
    dist = mag(sub(rigid.vPos, this.vP[i])); //球中心から円柱の頂点までの距離
    if(dist < rigid.vSize.x / 2.0) //球の半径以下なら
    {//衝突
      cnt++;
      vCollision.add(this.vP[i]);
    }
  }
  if(cnt == 0) return NON_COLLISION;

  vCollision.div(cnt);
  this.vNormal = sub(rigid.vPos, vCollision);//法線方向
  var depth = rigid.vSize.x / 2.0 - mag(this.vNormal);
  this.vNormal.norm();
  //重心から衝突点までのベクトル
  this.vGravityToPoint = sub(vCollision, this.vPos); //直方体(中心から衝突点へ向かうベクトル)
  rigid.vGravityToPoint = sub(vCollision, rigid.vPos);
  return depth;
}

//------------------------------------------------------------------------------
//円柱同士の衝突判定
//円柱の頂点が他方の円柱の内部（境界上を含む)にあるとき衝突
//辺と辺の交差による衝突
Rigid.prototype.collisionCylinderWithCylinder = function(rigid)
{
  var h1, h2, aveH1, aveH2, dist0, dist;
  var vCollision = new Vector3() ;//衝突点
  var vKoten = new Vector3();//衝突点から対象円柱の中心軸へ下ろした垂線の交点
  vKotenTop = new Vector3();
  vKotenBtm = new Vector3();
  vDir = new Vector3();
  var i, cnt;
  var flagCollisionInfinite = false;
  var a2 = rigid.vSize.x * rigid.vSize.x / 4.0;
  var b2 = rigid.vSize.y * rigid.vSize.y / 4.0;
  var depth;

  //注目円柱(#1,円柱)の頂点の位置を取得
  for(i = 0; i < this.numVertex; i++)
  {
	this.vP[i] = add(qvRotate(this.q, this.vP0[i]), this.vPos);
  }
  //衝突対象(#2,円柱)の頂点の位置を取得
  for(i = 0; i < rigid.numVertex; i++)
  {
	rigid.vP[i] = add(qvRotate(rigid.q, rigid.vP0[i]), rigid.vPos);
  }

  var vCenter1 = direction(this.vP[2*this.nSlice+1], this.vP[2*this.nSlice]);//注目円柱の中心軸ベクトル(下底->上底）
  var vCenter2 = direction(rigid.vP[2*rigid.nSlice+1], rigid.vP[2*rigid.nSlice]);//対象円柱の中心軸ベクトル
  //中心軸間の最短距離
  if( mag(sub(vCenter1, vCenter2)) == 0.0 || mag(add(vCenter1, vCenter2)) == 0.0){  //２直線が平行
    //注目円柱の中心から対象中心軸へ下ろした垂線の交点
    vKoten = sub(rigid.vPos, mul(vCenter2, dot(vCenter2 , sub(rigid.vPos, this.vPos))));
    dist0 = distance(vKoten, this.vPos);
  }
  else
    dist0 = Math.abs(dot(sub(this.vPos, rigid.vPos) , cross(vCenter1 , vCenter2)));

  //最初の衝突判定
  if(dist0 > this.vSize.x/2.0 + rigid.vSize.x/2.0) return NON_COLLISION;
  
  if(this.vSize.x <= this.vSize.z)
  {
    if(rigid.vSize.x <= rigid.vSize.z)
    {
      //円柱を球とみなして衝突判定
      depth = this.collisionSphereWithSphere(rigid);
     if(depth > 0) return depth;
    }
    else
    {
      depth = this.collisionSphereWithCylinder(rigid);
     if(depth > 0) return depth;
    }
  }
      
  //注目円柱の全ての頂点について対象剛体の内部にあるかどうかを調査
  cnt = 0;//対象剛体内部にある注目剛体の頂点個数
  aveH1 = 0.0; aveH2 = 0.0;
  var vAveKoten = new Vector3();
  for(i = 0; i < 2*this.nSlice; i++) //#1の頂点
  {
    //#1の頂点から#2中心軸に落とした垂線の交点
    vKoten = sub(rigid.vP[2*rigid.nSlice+1], mul(vCenter2, dot(vCenter2, sub(rigid.vP[2*rigid.nSlice+1], this.vP[i]))));
    dist = distance(vKoten, this.vP[i]);//注目円柱の頂点から対象円柱中心軸までの距離
    if(dist <= rigid.vSize.x / 2.0 + 0.001) //円柱の半径以下なら衝突の可能性あり
    {
      flagCollisionInfinite = true;

	  h1 = Math.abs(dot(vCenter2 , sub(vKoten, rigid.vP[2*rigid.nSlice]))); //上底までの距離
	  h2 = Math.abs(dot(vCenter2 , sub(vKoten, rigid.vP[2*rigid.nSlice+1])));//下底までの距離
	  if(h1 <= rigid.vSize.z+0.0001 && h2 <= rigid.vSize.z+0.0001)
	  {//衝突
        cnt++;
        aveH1 += h1;
        aveH2 += h2;
		vAveKoten.add(vKoten);
		vCollision.add(this.vP[i]);
      }
    }
  }
  if(flagCollisionInfinite == true && cnt == 0) return NON_COLLISION;//無限円柱の内部にあるが，有限円柱の外部
  
  if(cnt != 0)
  {
    //#2の面に衝突している#1の頂点の平均値を衝突点とする
    vCollision.div(cnt);
	aveH1 /= cnt;
	aveH2 /= cnt;
	vAveKoten.div(cnt);
 
	depth = this.getDepthOfCollisionInCylinder(rigid, vCenter2, vCollision, vAveKoten, aveH1, aveH2);
	return depth;
  }

  //辺と辺の交差を調査
  //注目円柱のside edgeが対象円柱と交差している点を加え平均をとり衝突点とする
  //side edgeが無限長の対象円柱と交差するか調べ，交差したならば
  //その交点が両方の円柱の上底と下底の間に存在するとき交差

  //注目剛体の中心軸方向
  var vCenter = qvRotate(conjugate(rigid.q), vCenter1);
  //対象物体座標系の基本姿勢で調査
  cnt = 0;
  vCollision = new Vector3(0.0, 0.0, 0.0);
  var vCollision0 = new Vector3();
  var vCollision1 = new Vector3();
  for(i = 0; i < this.nSlice; i++)
  {
    //注目円柱の side edge 起点(下底）:方向はvCenter
    var vQ = qvRotate(conjugate(rigid.q), sub(this.vP[i+this.nSlice], rigid.vPos));
    var a = vCenter.x * vCenter.x + vCenter.y * vCenter.y;
    var b = (vQ.x * vCenter.x + vQ.y * vCenter.y);
    var c = vQ.x * vQ.x + vQ.y * vQ.y - rigid.vSize.x * rigid.vSize.x / 4.0;
    //判別式
    var D = b * b - a * c;
    if( D < 0.0) continue;//外部
    else if(D == 0.0)//対象剛体の側面上
    {
      vCollision0 = vQ + (- b / a) * vCenter;
      if(vCollision0.z > -rigid.vSize.z/2 && vCollision0.z < rigid.vSize.z/2) 
	  {
	    vCollision.add(vCollision0);
	    cnt++;
	  }
      continue;
    }
	else//内部
	{
	  vCollision0 = vQ + (-(b + Math.sqrt(D)) / a) * vCenter;
	  vCollision1 = vQ + (-(b - Math.sqrt(D)) / a) * vCenter;
	  if(vCollision0.z > -rigid.vSize.z/2 && vCollision0.z < rigid.vSize.z/2)
	  {
	    if(vCollision1.z < -rigid.vSize.z/2) vCollision1.z = - rigid.vSize.z/2;
	    if(vCollision1.z > rigid.vSize.z/2)  vCollision1.z =   rigid.vSize.z/2;
	    vCollision.add( add(vCollision0, vCollision1) );
	    cnt += 2;
	    continue;
	  }
	  else if(vCollision0.z < -rigid.vSize.z/2)
	  {
	    if(vCollision1.z < -rigid.vSize.z/2) continue;
	    if(vCollision1.z > -rigid.vSize.z/2 && vCollision1.z < rigid.vSize.z/2)
	    {
	      vCollision0.z = - rigid.vSize.z/2; 
	    }
		else if(vCollision1.z > rigid.vSize.z/2)
		{
		  vCollision0.z = - rigid.vSize.z/2; 
		  vCollision1.z =   rigid.vSize.z/2;
        }
		vCollision.add( add(vCollision0, vCollision1) );
		cnt += 2;
		continue;
	  }
	  else if(vCollision0.z > rigid.vSize.z/2)
	  {
	    if(vCollision1.z > rigid.vSize.z/2) continue;
	    if(vCollision1.z > -rigid.vSize.z/2 && vCollision1.z < rigid.vSize.z/2)
	    {
	      vCollision0.z = rigid.vSize.z/2; 
	    }
	    else if(vCollision1.z < -rigid.vSize.z/2)
	    {
	   	  vCollision0.z =   rigid.vSize.z/2; 
		  vCollision1.z = - rigid.vSize.z/2;
	    }
		vCollision.add( add(vCollision0, vCollision1) );
		cnt += 2;
		continue;
	  }
    }
  }
  if(cnt == 0) return NON_COLLISION;
  vCollision.div(cnt);
  //めり込み量
  depth = rigid.vSize.x/2.0 - Math.sqrt(vCollision.x*vCollision.x + vCollision.y*vCollision.y);//長半径からの距離で近似
  //対象楕円柱の法線方向
  this.vNormal = new Vector3(vCollision.x / a2, vCollision.y / b2, 0.0);
  this.vNormal = qvRotate(rigid.q, this.vNormal);//世界座標系に戻す
  if(mag(this.vNormal) <= 0.0001) return NON_COLLISION;//相殺されたとき
  this.vNormal.norm();
  this.vNormal.reverse();//物体#1から見た法線方向

  //衝突点を世界座標に戻す
  vCollision = add(qvRotate(rigid.q, vCollision), rigid.vPos);

  //衝突点が注目円柱の内部か
  h1 = Math.abs(dot(vCenter1 , sub(vCollision, this.vP[2*nSlice])));//注目円柱の上底までの距離
  h2 = Math.abs(dot(reverse(vCenter1) , sub(vCollision, this.vP[2*nSlice+1])));//注目円柱の下底までの距離
  if(h1 > vSize.z) return NON_COLLISION;
  if(h2 > vSize.z) return NON_COLLISION;

  //重心から衝突点までのベクトル
  this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは中心座標)
  rigid.vGravityToPoint = sub(vCollision, rigid.vPos) ;//対象剛体側
  return depth;
	
}
//---------------------------------------------------------------------------------------------
Rigid.prototype.getDepthOfCollisionInCylinder = function(rigid, vCenter, vCollision, vKoten, aveH1, aveH2)
{
  var depth;

  //相対速度ベクトル
  var vDir = sub(add(this.vVel, cross(this.vOmega , sub(vCollision, this.vPos))),
                 add(rigid.vVel, cross(rigid.vOmega , sub(vCollision, rigid.vPos))));//#2に対する#1の衝突点へ向かう衝突点の速度ベクトル
  vDir.norm();

  var ss;
  //側面から衝突点までの距離
  ss = rigid.vSize.x / 2.0 - distance(vCollision, vKoten);
  
  var c = dot(vCenter , vDir);
  if(Math.abs(c) > 0.01)//中心軸に直交せずに衝突
  {
	if(ss > aveH1)
    {//衝突点がTopに近い
      this.vNormal = reverse(vCenter);
	  depth = aveH1;
	}
	else if(ss > aveH2)
    {//Bottomに近い
	  this.vNormal = vCenter;
	  depth = aveH2;
	}
	else
    {//側面に衝突
      this.vNormal = direction(vCollision, vKoten) ;
      this.vNormal.norm();
	  depth = ss;
	}
  }
  else//側面同士の衝突
  {
    this.vNormal = direction(vCollision, vKoten) ;
    this.vNormal.norm();
    depth = ss;
  }
  //重心から衝突点までのベクトル
  this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは中心座標)
  rigid.vGravityToPoint = sub(vCollision, rigid.vPos) ;//対象剛体側
  return depth;
}

//------------------------------------------------------------------------------
//直方体と円柱の衝突判定
//直方体の頂点が円柱の内部に存在するとき衝突
//面と側面（辺）の衝突
Rigid.prototype.collisionCubeWithCylinder = function(rigid)
{
  var i, j, cnt;
  var depth;//めり込み量
  var aveH1, aveH2;//平均値
  var vCollision;//衝突点
  var vCenter;//円柱中心軸方向ベクトル
  var vKoten, vAveKoten ;//直方体の頂点から円柱の中心軸へ下ろした垂線の交点とその平均値
  var a2 = rigid.vSize.x * rigid.vSize.x / 4.0;
  var b2 = rigid.vSize.y * rigid.vSize.y / 4.0;

  //直方体の頂点の世界座標位置を取得(this.vP[i]に格納)
  for(i = 0; i < this.numVertex; i++)
  {
	this.vP[i] = add(qvRotate(this.q, this.vP0[i]) , this.vPos);
  }
  //対象円柱の頂点の世界座標位置を取得(rigid.vP[i]に格納)
  for(i = 0; i < rigid.numVertex; i++)
  {
	rigid.vP[i] = add(qvRotate(rigid.q, rigid.vP0[i]) , rigid.vPos);
  }
  //円柱の中心軸
  vCenter = direction(rigid.vP[2*rigid.nSlice+1] , rigid.vP[2*rigid.nSlice]) ;//中心軸単位ベクトル(下底->上底）
  vCollision = new Vector3();
  cnt = 0;
  vAveKoten = new Vector3();
  aveH1 = 0.0; aveH2 = 0.0;
  for(i = 0; i < this.numVertex; i++)//注目剛体の各頂点
  {
    //対象円柱の物体座標(基本姿勢)における直方体の侵入頂点位置
	var vQ = qvRotate(conjugate(rigid.q), sub(this.vP[i], rigid.vPos));
	var f =  vQ.x*vQ.x / a2 + vQ.y*vQ.y / b2 -1.0;
	if(f > 0.0) continue;
	if(vQ.z <= rigid.vSize.z / 2.0 && vQ.z >= -rigid.vSize.z / 2.0)
	{//衝突
      cnt++;
	  vKoten = sub(rigid.vPos , mul(vCenter, dot(vCenter, sub(rigid.vPos, this.vP[i]))));//注目剛体の各頂点から円柱中心軸へ降ろした垂線の交点
      vCollision.add(this.vP[i]);//侵入した頂点を衝突点に近似
      vAveKoten.add(vKoten);
      aveH1 += rigid.vSize.z/2.0 - vQ.z;//h1;//上底までの平均距離
      aveH2 += vQ.z + rigid.vSize.z/2.0;//h2;//下底までの平均距離
    }
  }
  if(cnt == 0) return NON_COLLISION;

  vCollision.div(cnt);
  vAveKoten.div(cnt);
  aveH1 /= cnt;
  aveH2 /= cnt;


  //側面から衝突点までの距離
  ss = rigid.vSize.x / 2.0 - distance(vCollision, vAveKoten);

  if(ss > aveH1)
  {//衝突点がTopに近い
    this.vNormal = reverse(vCenter);
    depth = aveH1;
  }
  else if(ss > aveH2)
  {//Bottomに近い
    this.vNormal = vCenter;
    depth = aveH2;
  }
  else
  {//側面に衝突
    this.vNormal = direction(vCollision, vAveKoten) ;
    this.vNormal.norm();
    depth = ss;
  }
  //重心から衝突点までのベクトル
  this.vGravityToPoint = sub(vCollision, this.vPos) ; //注目剛体側（vPosは中心座標)
  rigid.vGravityToPoint = sub(vCollision, rigid.vPos) ;//対象剛体側
  return depth;

}

//------------------------------------------------------------------------------
//円柱と直方体の衝突判定
//円柱の頂点が直方体の内部（境界上を含む)にあるとき衝突とする
//辺と辺の交差も考慮
Rigid.prototype.collisionCylinderWithCube = function(rigid)
{
  //面を構成する頂点番号（対象直方体）
  var vs = [ [0,1,2,3], [0,3,7,4], [0,4,5,1],
             [1,5,6,2], [2,6,7,3], [4,7,6,5] ];

  var i, j, k;
  var dist = [];//頂点から面までの距離
  var f;//判定式
  var dd, depth;
  var VertexNo = [];//[MAX_VERTEX];
  var kaisu, cnt;
  var vCollision;//衝突点
  var vPoint;
  var vCenter;//円柱の中心軸

  //最初に円柱を球とみなして判定
  if(this.vSize.x <= this.vSize.z)
  {
    depth = this.collisionSphereWithCube(rigid);
    if(depth > 0) return depth;
  }
  
  //注目剛体(#1,円柱)の頂点の位置を取得
  for(i = 0; i < this.numVertex; i++)
  {
	this.vP[i] = qvRotate(this.q, this.vP0[i]);
	this.vP[i].add(this.vPos);
  }
  //衝突対象(#2,直方体)の頂点の位置を取得
  for(i = 0; i < rigid.numVertex; i++)
  {
	rigid.vP[i] = qvRotate(rigid.q, rigid.vP0[i]);
	rigid.vP[i].add(rigid.vPos);
  }

  //#2の面の法線ベクトル
  for(j = 0; j < 6; j++)//jは#2の面番号
  {
    rigid.vNormalFacet[j] = cross(sub(rigid.vP[vs[j][1]], rigid.vP[vs[j][0]]) , sub(rigid.vP[vs[j][2]], rigid.vP[vs[j][1]])) ;
    rigid.vNormalFacet[j].norm();
  }

  //注目円柱の全ての頂点について対象剛体の内部にあるかどうかを調査
  cnt = 0;//対象剛体内部にある注目剛体の頂点個数
  for(i = 0; i < this.numVertex; i++) //#1の頂点
  {
    kaisu = 0;//判定式が負となる回数(負のとき直方体の内側）
    for(j = 0; j < 6; j++) //#2の面番号
    {
      f = dot(rigid.vNormalFacet[j] , sub(this.vP[i], rigid.vP[vs[j][0]]));
      if( f > 0.001 ) break; 
      //fが全て負のとき衝突
      dist[6 * i + j] = Math.abs(f) / mag(rigid.vNormalFacet[j]) ;//面までの距離
      kaisu ++;
    }
    if( kaisu == 6) //#1の頂点が#2の内部
    {
       VertexNo[cnt] = i;//#2に衝突している#1の頂点番号
       cnt++;
    }
  }
  if(cnt == 0) //辺対辺を調査
  {
    var vPoint = []//1個であるが配列扱い（参照渡し）
    vPoint[0] = new Vector3();//衝突点
    depth = this.getPointCylinderInCube(rigid, vPoint) ;
  //重心から衝突点までのベクトル
    this.vGravityToPoint = sub(vPoint[0] , this.vPos) ; //注目剛体側（vPosは中心座標)
    rigid.vGravityToPoint = sub(vPoint[0] , rigid.vPos) ;//対象剛体側
    return depth;
  }
  else//点対面を調査
  {//円柱の点対直方体の面
    vCollision = new Vector3();//衝突点のクリア
    for(k = 0; k < cnt; k++)
    {
      vCollision.add(this.vP[VertexNo[k]]);//衝突点を追加
    }
    //衝突点
    vCollision.div(cnt);//平均値
	//円柱の頂点が1つでも直方体の内部のとき面までの距離と面番号を求める
    var cnt0 = 0;
    depth = 1000;//大きな値に設定
    var candidateNo;
    for(j = 0; j < 6; j++)
    {
      dd = Math.abs(dot(rigid.vNormalFacet[j] , sub(vCollision, rigid.vP[vs[j][0]])))/mag(rigid.vNormalFacet[j]) ;//面までの距離
      if(dd < rigid.vSize.x / 4)
      {
	    //最も近い面番号とその距離を求める
	    if(dd < depth) { depth = dd; candidateNo = j;}// depth = dd;}
        cnt0++;
      }
    }
    if(cnt0 == 0) return NON_COLLISION;
    this.vNormal = reverse(rigid.vNormalFacet[candidateNo]);

    this.vNormal.norm();   
    //重心から衝突点までのベクトル
    this.vGravityToPoint = sub(vCollision , this.vPos) ; //注目剛体側（vPosは中心座標)
    rigid.vGravityToPoint = sub(vCollision , rigid.vPos) ;//対象剛体側
    return depth;
  }
}

//---------------------------------------------------------------------
Rigid.prototype.getPointCylinderInCube = function(rigid, vPoint)
{
  //注目剛体の辺(edge)が対象剛体の面と交差しているときその交点を加え平均をとり衝突点とする
  //注目剛体の線分の両端が対象剛体の１つの面の外側であればその線分は交差しない

  //面を構成する頂点番号（対象直方体）
  var vs = [ [0,1,2,3], [0,3,7,4], [0,4,5,1],
             [1,5,6,2], [2,6,7,3], [4,7,6,5] ];

  var i, j, k, kp, cnt, kosu;
  var fa, fb, tt;
  var fNo = [];
  var vNormal0 = [];//[4];//交点と辺で作る面の法線ベクトル
  var vPoint0;    //交点

  //辺を構成する頂点番号(注目円柱)
  var ve = [];
  for(i = 0; i < this.nSlice; i++){
    ve[2*i] = i; ve[2*i+1] = i + this.nSlice;
  }

  kosu = 0;
  vPoint[0] = new Vector3();
  for(i = 0; i < this.nSlice; i++) //注目円柱の線分
  {
    for(j = 0; j < 6; j++)//対象直方体の面
    {
      fa = dot(rigid.vNormalFacet[j] , sub(this.vP[ve[i*2]], rigid.vP[vs[j][0]]));
      fb = dot(rigid.vNormalFacet[j] , sub(this.vP[ve[i*2+1]], rigid.vP[vs[j][0]]));
      if(fa * fb >= 0.0) continue;//この面とは交差しない
      tt = fa / (fa - fb);
      vPoint0 = add(mul(sub(this.vP[ve[i*2+1]], this.vP[ve[i*2]]), tt), this.vP[ve[i*2]]);//平面との交点
      cnt = 0;
      for(k = 0; k < 4; k++)//交点を持つ直方体面の辺
      {
        kp = k+1;
        if(kp == 4) kp = 0;
        vNormal0[k] = cross(sub(rigid.vP[vs[j][k]], vPoint0) , sub(rigid.vP[vs[j][kp]], rigid.vP[vs[j][k]])) ;
        if(dot(rigid.vNormalFacet[j] , vNormal0[k]) < 0.0) break;//１つでも負ならばこの面とは交差しない
        cnt++;
      }
      if(cnt == 4)
      {//交差
        vPoint[0].add(vPoint0);
        fNo[kosu] = j;
        kosu++; //直方体の面と交差している回数
      }
    }
  }
  if(kosu == 0) return NON_COLLISION;//２つの剛体は独立
  vPoint[0].div(kosu);
  var vCenter = direction(this.vP[2*this.nSlice+1] , this.vP[2*this.nSlice]);//下底から上底の中心軸方向
  var vA = sub(vPoint[0], this.vP[2*this.nSlice+1]);//中心軸から交点へ向かうベクトル
  this.vNormal = sub(vA , mul(vCenter, dot(vCenter, vA)));
  this.vNormal.norm();
  var depth = dot(rigid.vNormalFacet[fNo[0]] , sub(rigid.vP[vs[fNo[0]][0]], vPoint[0])) * 1.2;
  return depth;
}



;
/***************************************************************************************
  swgRigid2D.js
  Rigid2Dクラス
****************************************************************************************/

function Rigid2D()
{
  this.kind = "TRIANGLE";
  this.color = new Float32Array([0.0, 0.0, 0.0, 1.0]);
  this.flagFill = false;
  this.verteces = [];
  this.angle = 0.0;
  this.transX = 0.0;
  this.transY = 0.0;
  this.scaleX = 1.0;
  this.scaleY = 1.0;
}

Rigid2D.prototype.draw = function()
{
  if(this.kind == "TRIANGLE") this.vertices = makeTriangle();
  else if(this.kind == "RECTANGLE") this.vertices = makeRectangle(this.flagFill);
  else if(this.kind == "CIRCLE") this.vertices = makeCircle(this.flagFill);
    
  var hpwLoc = gl.getUniformLocation(gl.program, 'u_hpw');
  gl.uniform1f(hpwLoc, hpw);

  var angLoc = gl.getUniformLocation(gl.program, 'u_angle');
  gl.uniform1f(angLoc, this.angle);
  var transXLoc = gl.getUniformLocation(gl.program, 'u_tx');
  gl.uniform1f(transXLoc, this.transX);
  var transYLoc = gl.getUniformLocation(gl.program, 'u_ty');
  gl.uniform1f(transYLoc, this.transY);
  var scaleXLoc = gl.getUniformLocation(gl.program, 'u_sx');
  gl.uniform1f(scaleXLoc, this.scaleX);
  var scaleYLoc = gl.getUniformLocation(gl.program, 'u_sy');
  gl.uniform1f(scaleYLoc, this.scaleY);
  
  var colLoc = gl.getUniformLocation(gl.program, 'u_color');
  gl.uniform4fv(colLoc, this.color);

  // バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();
  // バッファオブジェクトをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // バッファオブジェクトにデータを書き込む
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
  //attribute変数の格納場所を取得する
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  //vertex変数にバッファオブジェクトを割り当てる
  gl.vertexAttribPointer(vertexLoc, 2, gl.FLOAT, false, 0, 0);

  // a_vertex変数でのバッファオブジェクトの割り当てを有効にする
  gl.enableVertexAttribArray(vertexLoc);

  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  //図形の描画
  if(this.flagFill == "true")
  {
    if(this.kind == "CIRCLE")
    {//円
      gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length/2);
    }
    else
    {//三角形と四角形
      gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/2);
    }
  }   
  else
  {//塗りつぶしなし
    gl.drawArrays(gl.LINE_LOOP, 0, this.vertices.length/2);
  }
}
/****************************************************************
  頂点座標作成
*****************************************************************/  
function makeTriangle() 
{

  var vertices = [//正三角形
    -0.5, -0.288675,  
     0.5, -0.288675,   
     0.0, 0.57735 
  ];
  return vertices;
}

function makeRectangle(flagFill) 
{
  if(flagFill == "true")//塗りつぶし
  {
    var vertices = [
      0.5, 0.5,  -0.5, 0.5,  -0.5, -0.5,  
      0.5, 0.5,  -0.5,-0.5,   0.5, -0.5
    ];
  }
  else//線画
  {
    var vertices =  [
      0.5, 0.5,  -0.5, 0.5,  -0.5, -0.5,  0.5, -0.5
    ];
  }
  return vertices;
}

function makeCircle(flagFill)
{
  var nSlice = 10;
  var theta0 = 2.0 * Math.PI / nSlice;
  var theta, x, y;
  var vertices = [];
  if(flagFill == "true")
  {
    vertices[0] = 0.0;  vertices[1] = 0.0; //中心点
    for(var i = 0; i <= nSlice; i++)
    {
     theta = i * theta0;
      x = 0.5 * Math.cos(theta);
      y = 0.5 * Math.sin(theta);
      vertices[2 + i * 2] = x;
      vertices[3 + i * 2] = y;
    }
  }
  else
  {
    for(var i = 0; i < nSlice; i++)
    {
      theta = i * theta0;
      x = 0.5 * Math.cos(theta);
      y = 0.5 * Math.sin(theta);
      vertices[0 + i * 2] = x;
      vertices[1 + i * 2] = y;
    }
  }
  return vertices;
}
;
/*----------------------------------------------------------------------------
   階層構造用Rigidクラス
   2014.9.17 更新
----------------------------------------------------------------------------*/


var MAX_VERTEX = 30;//多面体近似のときの頂点数
var muK = 1.0;//0.5;//動摩擦係数
var muS = 1.0;//静止摩擦係数
var restitution = 0.5;//跳ね返り係数
var dampRotation = 3.0;//回転減速係数
var gravity = 9.8;//重力加速度[m/s^2] 
var restValue = 0.2; //静止状態にするしきい値（速度，回転速度）
var flagDrag = false;//空気抵抗フラグ
var flagMagnus = false;
var flagTumbling = false;
var flagQuaternion = false;

function Rigid_HS()
{
  //プロパティ
  this.kind = "SPHERE";
  this.diffuse = [0.6, 0.6, 0.6, 1.0];
  this.ambient = [0.4, 0.4, 0.4, 1.0];
  //this.specular = [0.8, 0.8, 0.8, 1.0];
  this.specular = [0.5, 0.5, 0.5, 1.0];
  this.shininess = 200.0; 
  this.vVel = new Vector3();//速度(m/s) 
  this.vVel0 = new Vector3();//更新前の速度
  this.vPos = new Vector3();//位置(m)
  this.vPos0 = new Vector3();//初期位置
  this.vForce = new Vector3();//外力（Newton)
  this.vForce0 = new Vector3();//外力（初期値)
  this.vOmega = new Vector3();//角速度(rad/s)
  this.vOmega0 = new Vector3();//角速度(rad/s),更新前  
  this.vAcc = new Vector3();//加速度
  this.vTorque = new Vector3();//トルク
  this.vEuler0 = new Vector3();//回転角度（オイラー角で指定,更新前）
  this.vEuler = new Vector3();//回転角度（オイラー角で指定,更新後）
  this.vSize = new Vector3(1.0, 1.0, 1.0);//スケーリング
  this.vGravityToPoint = new Vector3();//重心から衝突点までのベクトル
  this.mass = 1;//質量[kg]
  this.mInertia = new Matrix3();//慣性モーメントのテンソル
  this.mInertiaInverse = new Matrix3();//その逆行列
  this.vInertialResistance = new Vector3();
  this.vRotationalResistance = new Vector3();
  
  this.q = new Quaternion();
  this.vAxis = new Vector3(1.0, 0.0, 0.0);//回転軸
  this.angle = 0.0;
  this.nSlice = 25;
  this.nStack = 25; 
  this.radiusRatio = 0.2;//上底半径/下底半径（トーラスとバネの時はradius1/radius2)
  this.eps1 = 1.0;//"SUPER"のパラメータ
  this.eps2 = 1.0;//"SUPER"のパラメータ
  this.flagDebug = false;//trueのときワイヤーフレームモデル
  this.shadow = 0.0;//影の濃さを表す（0.0なら実オブジェクト)
  //フロア表示のチェック模様
  this.flagCheck = false;
  this.col1 = [0.6, 0.5, 0.5, 1.0];
  this.col2 = [0.4, 0.4, 0.6, 1.0];
  this.plane = [0, 0, 1, 0];//簡易シャドウを描くときの平面の平面方程式
  //テクスチャ
  this.flagTexture = false;
  this.nRepeatS = 1;
  this.nRepeatT = 1;
  //衝突判定などに使われるプロパティ
　this.vP = [];
  this.vP0 = [];//球以外の頂点座標
  this.vNormal = new Vector3();
  this.vNormalFacet = [];//直方体の面の法線ベクトル
  this.numVertex;//球以外の多面体の頂点数
  this.boundingR;//境界球の半径
  this.state = "FREE";
  this.flagFixed = false;
  //tumbling特有のプロパティ
  this.coefLift = 1.0;//揚力係数
  this.delta = 0.5;//シフト率
  //Spring特有のプロパティ
  this.nPitch = 5;//バネ
  this.radius = 0.5;//バネはvSizeを使用しない
  this.len0 = 1;//バネの自然長
  this.len = 1;//length0+変位量  
  this.constant;//バネ定数
  this.row = [];
  this.col = [];
  //水面の波などの表現
  this.sizeX = 10;
  this.sizeY = 10;
  this.data = [];//各格子点のx,y,z座標(kind = "GRID_SQUARE"などのときに必要なデータ)
                 //kind = "ELEVATION"のときはｚ成分だけ
  //SUPER2のパラメータ
  this.size1 = [0.5, 0.2, 0.5];  
  this.size2 = [0.5, 0.2, 0.5];   
  this.middle = 0.5; //中間のサイズ
  this.angle2 = 0;//曲げる角度（度）
  this.jStart = 1;
  this.type = 0;//0,1,2だけ               
}

Rigid_HS.prototype.initVertexBuffers = function(gl)
{
  //頂点データをシェーダへアップロードするメソッド
  var n;
  var vertices = [];//頂点座標
  var normals = []; //法線ベクトル
  var indices = []; //頂点番号
  var colors = [];//check模様のときだけ
  var texCoords = [];//テクスチャ座標

  if(!this.flagTexture)
  {//非テクスチャ用
    if     (this.kind == "CUBE")    n = makeCube(vertices, normals, indices, this.flagDebug);
    else if(this.kind == "SPHERE")  n = makeSphere(vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CYLINDER")n = makeCylinder(vertices, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug);
    else if(this.kind == "PRISM")   n = makePrism(vertices, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug);
    else if(this.kind == "TORUS")   n = makeTorus(vertices, normals, indices, this.radiusRatio, this.nSlice, this.nStack);
    else if(this.kind == "SUPER")   n = makeSuper(vertices, normals, indices, this.nSlice, this.nStack, this.eps1, this.eps2);
    else if(this.kind == "SUPER2")   n = makeSuper2(vertices, normals, indices, this.size1, this.size2, this.nSlice, this.nStack, this.eps1, this.eps2, this.middle, this.angle2, this.jStart, this.type);
    else if(this.kind == "SPRING")   n = makeSpring(vertices, normals, indices, this.radius, this.radiusRatio, this.nSlice, this.nStack, this.nPitch, this.len);
    else if(this.kind == "CYLINDER_X") n = makeCylinderX(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "CYLINDER_Y") n = makeCylinderY(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "CYLINDER_Z") n = makeCylinderZ(vertices, normals, indices, this.nSlice, this.flagDebug);
    else if(this.kind == "PLATE_Z")    n = makePlateZ(vertices, normals, indices, this.flagDebug);
    else if(this.kind == "GRID_PLATE") n = makeGridPlate(vertices, normals, indices, this.nSlice, this.nStack, this.flagDebug);
    else if(this.kind == "GRID_SQUARE") n = makeGridSquare(this.data, vertices, normals, indices, this.nSlice, this.nStack, this.flagDebug);
    else if(this.kind == "ELEVATION") n = makeElevation(this.data, vertices, normals, indices, this.nSlice, this.nStack, this.sizeX, this.sizeY, this.flagDebug)
    else if(this.kind == "CHECK_PLATE") n = makeCheckedPlate(vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2) ;  
    else if(this.kind == "CHECK_SQUARE") n = makeCheckedSquare(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2) ;  
    else if(this.kind == "GRID_SPHERE") n = makeGridSphere(this.data, vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CHECK_SPHERE") n = makeCheckedSphere(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2);
    else if(this.kind == "GRID_CYLINDER") n = makeGridCylinder(this.data, vertices, normals, indices, this.nSlice, this.nStack);
    else if(this.kind == "CHECK_CYLINDER") n = makeCheckedCylinder(this.data, vertices, colors, normals, indices, this.nSlice, this.nStack, this.col1, this.col2);
  }
  else
  {//テクスチャ用
    if     (this.kind == "CUBE")    n = makeCubeTex(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "CUBE_BUMP") n = makeCubeBump(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "SPHERE")  n = makeSphereTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "CYLINDER")n =  makeCylinderTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "PRISM")   n = makePrismTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "TORUS")   n = makeTorusTex(vertices, texCoords, normals, indices, this.radiusRatio, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "SUPER")   n = makeSuperTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.eps1, this.eps2, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "PLATE_Z") n = makePlateZTex(vertices, texCoords, normals, indices, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_PLATE") n = makeGridPlateTex(vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_SQUARE") n = makeGridSquareTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.flagDebug, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_SPHERE") n = makeGridSphereTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
    else if(this.kind == "GRID_CYLINDER") n = makeGridCylinderTex(this.data, vertices, texCoords, normals, indices, this.nSlice, this.nStack, this.nRepeatS, this.nRepeatT);
  }
  gl.disableVertexAttribArray(colorLoc);//colorのバッファオブジェクトの割り当てを無効化（フロアを表示したとき，フロアのインデックス以上の球やトーラスを描画できなくなることを防ぐため）


  // バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();
  if(this.flagTexture) {var texCoordBuffer = gl.createBuffer();}
  var normalBuffer = gl.createBuffer();
  if(this.flagCheck) var colorBuffer = gl.createBuffer();
  var indexBuffer = gl.createBuffer();
  if (!vertexBuffer || !normalBuffer || !indexBuffer) return -1;
  
  // 頂点の座標をバッファ・オブジェクトに書き込む
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(vertices), gl.STATIC_DRAW);
  // vertexLocにバッファ・オブジェクトを割り当てる
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  gl.vertexAttribPointer(vertexLoc, 3, gl.FLOAT, false, 0, 0);
  // バッファ・オブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(vertexLoc);//有効化する

  if(this.flagTexture)
  {
    // 頂点のテクスチャ座標をバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(texCoords), gl.STATIC_DRAW);
    // texLocにバッファオブジェクトを割り当てる
    var texLoc = gl.getAttribLocation(gl.program, 'a_texCoord');
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
    // バッファオブジェクトのバインドを解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.enableVertexAttribArray(texLoc);//有効化する
  }

  if(this.flagCheck)
  {
    // 頂点の色をバッファ・オブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // a_colorの格納場所を取得し、バッファオブジェクトを割り当てる
    var colorLoc = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    // バッファ・オブジェクトのバインドを解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.enableVertexAttribArray(colorLoc);//有効化
  }

  // 法線データをバッファ・オブジェクトに書き込む
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(normals), gl.STATIC_DRAW);
  // normalLocにバッファ・オブジェクトを割り当てる
  var normalLoc = gl.getAttribLocation(gl.program, 'a_normal');
  gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(normalLoc);//有効化する

  //バッファ・オブジェクトをターゲットにバインドする
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // インデックスデータをバッファ・オブジェクトに書き込む
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}

Rigid_HS.prototype.draw = function(gl, n, modelMatrix)
{
  //マテリアル特性のユニフォーム変数格納場所を取得し値を設定する
  var diffLoc = gl.getUniformLocation(gl.program, 'u_diffuseColor');
  gl.uniform4fv(diffLoc, new Float32Array(this.diffuse));
  var ambiLoc = gl.getUniformLocation(gl.program, 'u_ambientColor');
  gl.uniform4fv(ambiLoc, new Float32Array(this.ambient));
  var specLoc = gl.getUniformLocation(gl.program, 'u_specularColor');
  gl.uniform4fv(specLoc, new Float32Array(this.specular));
  var shinLoc = gl.getUniformLocation(gl.program, 'u_shininess');
  gl.uniform1f(shinLoc, this.shininess);
　var checkLoc = gl.getUniformLocation(gl.program, 'u_flagCheck');
　gl.uniform1i(checkLoc, this.flagCheck);
  var shadowLoc = gl.getUniformLocation(gl.program, 'u_shadow');
  gl.uniform1f(shadowLoc, this.shadow);
  var flagTexLoc = gl.getUniformLocation(gl.program, 'u_flagTexture');
  gl.uniform1i(flagTexLoc, this.flagTexture);

  //法線変換行列を計算する
  var normalMatrix = new Matrix4();// 初期化
  if(this.shadow < 0.01)//影でないときだけ
  {
    normalMatrix.setInverseOf(modelMatrix);//モデルリング行列の逆行列を求め
    normalMatrix.transpose();              //さらに転置する
  }
  //それぞれの行列のuniform変数の格納場所を取得し値を設定する
  var modelMatrixLoc = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  gl.uniformMatrix4fv(modelMatrixLoc, false, modelMatrix.elements);
  var normalMatrixLoc = gl.getUniformLocation(gl.program, 'u_normalMatrix');
  gl.uniformMatrix4fv(normalMatrixLoc, false, normalMatrix.elements);
  //物体を描画する
  if(this.flagDebug == false)//solidモデルで描画
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
  else//wireframeモデルで描画
  {
    if(this.kind == "GRID_SQUARE" || this.kind == "CHECK_SQUARE" || this.kind == "ELEVATION")
      gl.drawElements(gl.LINES, n, gl.UNSIGNED_SHORT, 0);
    else
      gl.drawElements(gl.LINE_STRIP, n, gl.UNSIGNED_SHORT, 0);
  }
}
;
//---------------------------------------------------
//      swgShape2D.js
//      WebGLによる2次元形状クラス(メソッドと関数）
//---------------------------------------------------
//Shape2Dクラス
function Shape2D()
{
  this.kind = "TRIANGLE";
  this.color = [0.0, 0.0, 0.0, 1.0];
  this.flagFill = false;
  this.vertices = [];
  this.angle = 0.0;
  this.transX = 0.0;
  this.transY = 0.0;
  this.scaleX = 1.0;
  this.scaleY = 1.0;
}

Shape2D.prototype.draw = function()
{
  if(this.kind == "TRIANGLE") this.vertices = makeTriangle();
  else if(this.kind == "RECTANGLE") this.vertices = makeRectangle(this.flagFill);
  else if(this.kind == "CIRCLE") this.vertices = makeCircle(this.flagFill);
   
　var pointLoc = gl.getUniformLocation(gl.program, 'u_flagPoint');
　gl.uniform1i(pointLoc, false);
　var colorLoc = gl.getUniformLocation(gl.program, 'u_flagColor');
　gl.uniform1i(colorLoc, false);

  var angLoc = gl.getUniformLocation(gl.program, 'u_angle');
  gl.uniform1f(angLoc, this.angle);
  var transXLoc = gl.getUniformLocation(gl.program, 'u_tx');
  gl.uniform1f(transXLoc, this.transX);
  var transYLoc = gl.getUniformLocation(gl.program, 'u_ty');
  gl.uniform1f(transYLoc, this.transY);
  var scaleXLoc = gl.getUniformLocation(gl.program, 'u_sx');
  gl.uniform1f(scaleXLoc, this.scaleX);
  var scaleYLoc = gl.getUniformLocation(gl.program, 'u_sy');
  gl.uniform1f(scaleYLoc, this.scaleY);
  
  var colLoc = gl.getUniformLocation(gl.program, 'u_color');
  gl.uniform4fv(colLoc, new Float32Array(this.color));

  // バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();
  // バッファオブジェクトをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // バッファオブジェクトにデータを書き込む
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
  //attribute変数の格納場所を取得する
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  //vertex変数にバッファオブジェクトを割り当てる
  gl.vertexAttribPointer(vertexLoc, 2, gl.FLOAT, false, 0, 0);
  // a_vertex変数でのバッファオブジェクトの割り当てを有効にする
  gl.enableVertexAttribArray(vertexLoc);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  var n = this.vertices.length / 2;//頂点数
  //図形の描画
  if(this.flagFill == true)
  {
    if(this.kind == "CIRCLE")
    {//円
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    }
    else//kind==TRIANGLE,RECTANGLE
    {//三角形と四角形
       gl.drawArrays(gl.TRIANGLES, 0, n);
    }
  }   
  else
  {//塗りつぶしなし
    if(this.kind == "LINES") gl.drawArrays(gl.LINES, 0, n);
    else if(this.kind == "LINE_STRIP") gl.drawArrays(gl.LINE_STRIP, 0, n);
    else//円、三角形、四角形
      gl.drawArrays(gl.LINE_LOOP, 0, n);
  }
}
//------------------------------------------------------------------------
//頂点座標作成
function makeTriangle() 
{
  //一辺が1の正三角形
  var vertices = [
    -0.5, -0.288675,  
     0.5, -0.288675,   
     0.0, 0.57735 
  ];
  return vertices;
}

function makeRectangle(flagFill) 
{ //一辺が1の正四角形
  if(flagFill == true)//塗りつぶし
  {
    var vertices = [
      0.5, 0.5,  -0.5, 0.5,  -0.5, -0.5,  
      0.5, 0.5,  -0.5,-0.5,   0.5, -0.5
    ] ;
  }
  else//枠線
  {
    var vertices = [
      0.5, 0.5,  -0.5, 0.5,  -0.5, -0.5,  0.5, -0.5
    ] ;
  }
  return vertices;
}

function makeCircle(flagFill)
{//直径が1の円
  var nSlice = 30;
  var theta0 = 2.0 * Math.PI / nSlice;
  var vertices = [];
  var theta, x, y;
  if(flagFill == true)
  {
    vertices[0] = 0.0;  vertices[1] = 0.0; //中心点
    for(var i = 0; i <= nSlice; i++)
    {
      theta = i * theta0;
      x = 0.5 * Math.cos(theta);
      y = 0.5 * Math.sin(theta);
      vertices[2 + i * 2] = x;
      vertices[3 + i * 2] = y;
    }
  }
  else
  {
    for(var i = 0; i < nSlice; i++)
    {
      theta = i * theta0;
      x = 0.5 * Math.cos(theta);
      y = 0.5 * Math.sin(theta);
      vertices[0 + i * 2] = x;
      vertices[1 + i * 2] = y;
    }
  }
  return vertices;
}
//---------------------------------------------------------------

function drawLines(data, col)
{
  //WebGLの線プリミティブで線幅1の線を作成
  var s = new Shape2D();
  s.kind = "LINES";
  for(var i = 0; i < data.length; i++) s.vertices[i] = data[i];
  s.color = getColor(col);
  s.draw();
}  

function drawLineStrip(data, col)
{
  //WebGLの線プリミティブで線幅1の線を作成
  var s = new Shape2D();
  s.kind = "LINE_STRIP";
  for(var i = 0; i < data.length; i++) s.vertices[i] = data[i];
  s.color = getColor(col);
  s.draw();
}  

function drawLine(x1, y1, x2, y2, width, col)
{//細い塗りつぶした四角形で太さのある線を作成
  var x0 = (x1 + x2) / 2;//中心点
  var y0 = (y1 + y2) / 2;
  var w = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
  var h = 2 * width / canvas.height;
  var ang = Math.atan2(y2-y1, x2-x1);//[rad]
  drawRectangle(x0, y0, w, h, true, col, ang);
}  

function drawRectangle(x0, y0, w, h, fill, col, ang)
{
  var s = new Shape2D();
  s.kind = "RECTANGLE";
  s.transX = x0;
  s.transY = y0;
  s.scaleX = w;
  s.scaleY = h;
  s.flagFill = fill;
  s.angle = ang;
  s.color = getColor(col);
  s.draw();
}  

function drawTriangle(x0, y0, sx, sy, fill, col, ang)
{
  //x0,y0:重心
  //sx=syのとき正三角形
  var s = new Shape2D();
  s.kind = "TRIANGLE";
  s.transX = x0;
  s.transY = y0;
  s.scaleX = sx;//回転前の横方向倍率
  s.scaleY = sy;//回転前の縦方向倍率
  s.flagFill = fill;
  s.angle = ang;//[rad]
  s.color = getColor(col);
  s.draw();
}  

function drawCircle(x0, y0, diaX, diaY, fill, col, ang)
{
  //diaX=diaYのとき円）
  var s = new Shape2D();
  s.kind = "CIRCLE";
  s.transX = x0;
  s.transY = y0;
  s.scaleX = diaX;//diaXは回転前のx方向直径
  s.scaleY = diaY;//diaYは回転前のy方向直径
  s.flagFill = fill;
  s.angle = ang;//[rad]
  s.color = getColor(col);
  s.draw();
}  

function drawArrow(x0, y0, len, width, col, ang)
{ 
  //+x軸方向を向いた矢印
  //ang[rad]
flagPoint = false;
  var h = 2 * width / canvas.height;
  var w = 0.353 * len;//矢じりの長さ
  var a = 3 * Math.PI / 4;//矢じりの傾斜角
  //中心線
  drawRectangle(x0, y0, len, h, true, col, ang);
  var ss = Math.sin(ang); var cc = Math.cos(ang);
  var x1 = len*3/8; var y1 = len/8;
  //上矢じり
  var x = x1 * cc - y1 * ss + x0;
  var y = x1 * ss + y1 * cc + y0;
  drawRectangle(x, y, w, h, true, col, ang+a);
  //下矢じり
  y1 = - len/8;
  x = x1 * cc - y1 * ss + x0;
  y = x1 * ss + y1 * cc + y0;
  drawRectangle(x, y, w,  h, true, col, ang-a);
}

function drawPoints(vertices, pointSize, pointType, col)
{
  //複数の点を描画
  var sizeLoc = gl.getUniformLocation(gl.program, 'u_size');
  gl.uniform1f(sizeLoc, pointSize);
  var typeLoc = gl.getUniformLocation(gl.program, 'u_type');
  gl.uniform1f(typeLoc, pointType);

　var pointLoc = gl.getUniformLocation(gl.program, 'u_flagPoint');
　gl.uniform1i(pointLoc, true);//flagPoint);
　var colorLoc = gl.getUniformLocation(gl.program, 'u_flagColor');
　gl.uniform1i(colorLoc, false);

  var color = getColor(col);
  var colLoc = gl.getUniformLocation(gl.program, 'u_color');
  gl.uniform4fv(colLoc, new Float32Array(color));
  // バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();  
  // バッファオブジェクトを有効にする
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // バッファオブジェクトに頂点データを書き込む
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // attribute変数にバッファオブジェクトを割り当てる
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  gl.vertexAttribPointer(vertexLoc, 2, gl.FLOAT, false, 0, 0);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  // バッファオブジェクトの割り当てを有効化する
  gl.enableVertexAttribArray(vertexLoc);

  var n = vertices.length / 2;
  //描画する
  gl.drawArrays(gl.POINTS, 0, n); 
}

function drawRectangles(vertices, colors)
{
  //頂点座標と各頂点の色データを与えた四角形（colormapなど、塗りつぶしだけ）
　var pointLoc = gl.getUniformLocation(gl.program, 'u_flagPoint');
　gl.uniform1i(pointLoc, false);
　var colorLoc = gl.getUniformLocation(gl.program, 'u_flagColor');
　gl.uniform1i(colorLoc, true);

  var angLoc = gl.getUniformLocation(gl.program, 'u_angle');
  gl.uniform1f(angLoc, 0);//頂点座標は確定値なので回転・平行移動を0にする
  var transXLoc = gl.getUniformLocation(gl.program, 'u_tx');
  gl.uniform1f(transXLoc, 0);
  var transYLoc = gl.getUniformLocation(gl.program, 'u_ty');
  gl.uniform1f(transYLoc, 0);
  var scaleXLoc = gl.getUniformLocation(gl.program, 'u_sx');//scaleは1
  gl.uniform1f(scaleXLoc, 1);
  var scaleYLoc = gl.getUniformLocation(gl.program, 'u_sy');
  gl.uniform1f(scaleYLoc, 1);
  
  // 頂点バッファオブジェクトを作成する
  var vertexBuffer = gl.createBuffer();
  // バッファオブジェクトをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // バッファオブジェクトにデータを書き込む
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //attribute変数の格納場所を取得する
  var vertexLoc = gl.getAttribLocation(gl.program, 'a_vertex');
  //vertex変数にバッファオブジェクトを割り当てる
  gl.vertexAttribPointer(vertexLoc, 2, gl.FLOAT, false, 0, 0);
  // a_vertex変数でのバッファオブジェクトの割り当てを有効にする
  gl.enableVertexAttribArray(vertexLoc);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  // 色バッファオブジェクトを作成する
  var colorBuffer = gl.createBuffer();
  // バッファオブジェクトをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // バッファオブジェクトにデータを書き込む
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  //attribute変数の格納場所を取得する
  var colorLoc = gl.getAttribLocation(gl.program, 'a_color');
  //vertex変数にバッファオブジェクトを割り当てる
  gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
  // a_vertex変数でのバッファオブジェクトの割り当てを有効にする
  gl.enableVertexAttribArray(colorLoc);
  // バッファオブジェクトのバインドを解除する
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var n = vertices.length / 2;//頂点数
//console.log(" n = " + n);
  gl.drawArrays(gl.TRIANGLES, 0, n);
  
  gl.disableVertexAttribArray(vertexLoc);
  gl.disableVertexAttribArray(colorLoc);

}
//-------------------------------------------------------
function getColor(col)
{
  var cc;
  var nn = col.length;
   
  if(col == "red") cc = [1, 0, 0, 1];
  else if(col == "green") cc = [0, 1, 0, 1];
  else if(col == "blue") cc = [0, 0, 1, 1];
  else if(col == "yellow") cc = [1, 1, 0, 1];
  else if(col == "cyan") cc = [0, 1, 1, 1];
  else if(col == "magenta") cc = [1, 0, 1, 1];
  else if(col == "dark_red") cc = [0.5, 0, 0, 1];
  else if(col == "dark_green") cc = [0, 0.5, 0, 1];
  else if(col == "dark_blue") cc = [0, 0, 0.5, 1];
  else if(col == "dark_yellow") cc = [0.5, 0.5, 0, 1];
  else if(col == "dark_cyan") cc = [0, 0.5, 0.5, 1];
  else if(col == "dark_magenta") cc = [0.5, 0, 0.5, 1];
  else if(col == "white") cc = [1, 1, 1, 1];
  else if(col == "black") cc = [0, 0, 0, 1];
  else if(col == "gray") cc = [0.5, 0.5, 0.5, 1];
  else if(col == "light_gray") cc = [0.7, 0.7, 0.7, 1];
  else if(col == "light_red") cc = [1, 0.7, 0.7, 1];
  else if(col == "light_green") cc = [0.7, 1, 0.7, 1];
  else if(col == "light_blue") cc = [0.7, 0.7, 1, 1];

  return cc;
}  
;
/*----------------------------------------------------
       simultaneous.js
  連立1次方程式(Simultaneous linear equation)の解法
------------------------------------------------------*/

function Gauss(a, b, n)
{
  //入力：a[i][j]=係数行列(計算後変化),b[n]=定数ベクトル, n=元数(0からn-1)
  //出力：b[i]=方程式の解(i=0,1,2,---,n-1)

  var i, j, k;
  var akk, p1, s;

  //前進消去
  for (k = 0; k < n - 1; k++)
  {
    Pivoting(a, b, n, k);
    akk = a[k][k];
    for (i = k + 1; i < n; i++)
    {
      p1 = a[i][k] / akk;
      b[i] -= p1 * b[k];
      for (j = k; j < n; j++) a[i][j] -= p1 * a[k][j];
    }
  }

  //後退代入
  b[n - 1] /= a[n - 1][n - 1];
  for (i = n - 2; i >= 0; i--)
  {
    s = 0.0;
    for (j = i + 1; j < n; j++) s += a[i][j] * b[j];
    b[i] = (b[i] - s) / a[i][i];
  }

}
function Pivoting(a, b, n, k)
{
  var piv, ch;
  var i, j, kk;

  piv = 0.0;//pivoting
  kk = k;
  for (i = k; i < n; i++)
  {
	if (piv < Math.abs(a[i][k]))
	{
	  piv = Math.abs(a[i][k]); 
	  kk = i;
	}
  }
  if (piv == 0.0)
  {
	alert("解くことができません(Gauss,Pivoting) ");
	return;
  }
  if (kk != k)
  {
	for (j = k; j < n; j++)
	{
      ch = a[k][j]; a[k][j] = a[kk][j]; a[kk][j] = ch;
	}
	ch = b[k]; b[k] = b[kk]; b[kk] = ch;
  }
}
//---------------------------------------------------
function Thomas(a, b, n, boundary)
{
  //a[3]:3個の係数
  //入力：a[3]=3個の確定している係数
  //      b[n]=定数ベクトル(n+1個）
  //      n=元数
  //出力：b[n]=方程式の解(0,1,2,...,n)
  var p = [], q = [];
  var i;

  if(boundary == 0)//Dirichlet
  {
	//前進消去
	p[0] = a[1];
	q[0] = b[0];//境界値
	for(i = 1; i <= n; i++)
	{
	  p[i] = a[1] - a[0] * a[2] / p[i-1];
	  q[i] = b[i] - a[0] * q[i-1] / p[i-1];
	}
	//b[0],b[n]は境界値（確定値）なので計算しなくてよい
	//後退代入
	for(i = n-1; i >= 1; i--)
	{
	  b[i] = (q[i] - a[2] * b[i+1]) / p[i];
	}
  }
  else//Neumann
  {
	//前進消去
	p[1] = a[0] + a[1];
	q[1] = b[1];
	for(i = 2; i < n; i++)
	{
      p[i] = a[1] - a[0] * a[2] / p[i-1];
	  q[i] = b[i] - a[0] * q[i-1] / p[i-1];
	}
	//後退代入
	b[n] = b[n-1];
	for(i = n-1; i >= 1; i--)
	{
	  b[i] = (q[i] - a[2] * b[i+1]) / p[i];
	}
	b[0] = b[1];
	b[n] = b[n-1];	
  }
}

;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//























