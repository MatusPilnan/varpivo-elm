(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $author$project$Messages$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Messages$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Messages$SetTime = function (a) {
	return {$: 'SetTime', a: a};
};
var $author$project$Messages$SetTimeZone = function (a) {
	return {$: 'SetTimeZone', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Messages$RejectApiUrl = function (a) {
	return {$: 'RejectApiUrl', a: a};
};
var $author$project$Messages$SaveApiUrl = function (a) {
	return {$: 'SaveApiUrl', a: a};
};
var $author$project$Api$Data$Message = function (message) {
	return {message: message};
};
var $author$project$Api$Data$decodeChain = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $author$project$Api$Data$decode = F2(
	function (key, decoder) {
		return $author$project$Api$Data$decodeChain(
			A2($elm$json$Json$Decode$field, key, decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Api$Data$messageDecoder = A3(
	$author$project$Api$Data$decode,
	'message',
	$elm$json$Json$Decode$string,
	$elm$json$Json$Decode$succeed($author$project$Api$Data$Message));
var $author$project$Api$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Api$headers = $elm$core$List$filterMap(
	function (_v0) {
		var key = _v0.a;
		var value = _v0.b;
		return A2(
			$elm$core$Maybe$map,
			$elm$http$Http$header(key),
			value);
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Api$interpolatePath = F2(
	function (rawPath, pathParams) {
		var interpolate = F2(
			function (_v0, path) {
				var name = _v0.a;
				var value = _v0.b;
				return A3($elm$core$String$replace, '{' + (name + '}'), value, path);
			});
		return A2(
			$elm$core$List$drop,
			1,
			A2(
				$elm$core$String$split,
				'/',
				A3($elm$core$List$foldl, interpolate, rawPath, pathParams)));
	});
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 'QueryParameter', a: a, b: b};
	});
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $elm$url$Url$Builder$string = F2(
	function (key, value) {
		return A2(
			$elm$url$Url$Builder$QueryParameter,
			$elm$url$Url$percentEncode(key),
			$elm$url$Url$percentEncode(value));
	});
var $author$project$Api$queries = $elm$core$List$filterMap(
	function (_v0) {
		var key = _v0.a;
		var value = _v0.b;
		return A2(
			$elm$core$Maybe$map,
			$elm$url$Url$Builder$string(key),
			value);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Api$request = F7(
	function (method, path, pathParams, queryParams, headerParams, body, decoder) {
		return $author$project$Api$Request(
			{
				basePath: 'http://127.0.0.1:5000',
				body: A2(
					$elm$core$Maybe$withDefault,
					$elm$http$Http$emptyBody,
					A2($elm$core$Maybe$map, $elm$http$Http$jsonBody, body)),
				decoder: decoder,
				headers: $author$project$Api$headers(headerParams),
				method: method,
				pathParams: A2($author$project$Api$interpolatePath, path, pathParams),
				queryParams: $author$project$Api$queries(queryParams),
				timeout: $elm$core$Maybe$Nothing,
				tracker: $elm$core$Maybe$Nothing
			});
	});
var $author$project$Api$Request$Info$getDiscover = A7($author$project$Api$request, 'GET', '/discover-varpivo', _List_Nil, _List_Nil, _List_Nil, $elm$core$Maybe$Nothing, $author$project$Api$Data$messageDecoder);
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters)));
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Api$decodeBody = F2(
	function (decoder, body) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, decoder, body);
		if (_v0.$ === 'Ok') {
			var value = _v0.a;
			return $elm$core$Result$Ok(value);
		} else {
			var err = _v0.a;
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody(
					$elm$json$Json$Decode$errorToString(err)));
		}
	});
var $author$project$Api$decodeResponse = F2(
	function (decoder, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				if ($elm$core$String$isEmpty(body)) {
					var _v1 = A2($elm$json$Json$Decode$decodeString, decoder, '{}');
					if (_v1.$ === 'Ok') {
						var value = _v1.a;
						return $elm$core$Result$Ok(value);
					} else {
						return A2($author$project$Api$decodeBody, decoder, body);
					}
				} else {
					return A2($author$project$Api$decodeBody, decoder, body);
				}
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $author$project$Api$expectJson = F3(
	function (mapError, toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Result$mapError(mapError),
				$author$project$Api$decodeResponse(decoder)));
	});
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $author$project$Api$sendWithCustomError = F3(
	function (mapError, toMsg, _v0) {
		var req = _v0.a;
		return $elm$http$Http$request(
			{
				body: req.body,
				expect: A3($author$project$Api$expectJson, mapError, toMsg, req.decoder),
				headers: req.headers,
				method: req.method,
				timeout: req.timeout,
				tracker: req.tracker,
				url: A3($elm$url$Url$Builder$crossOrigin, req.basePath, req.pathParams, req.queryParams)
			});
	});
var $author$project$Api$send = F2(
	function (toMsg, req) {
		return A3($author$project$Api$sendWithCustomError, $elm$core$Basics$identity, toMsg, req);
	});
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Api$withBasePath = F2(
	function (basePath, _v0) {
		var req = _v0.a;
		return $author$project$Api$Request(
			_Utils_update(
				req,
				{basePath: basePath}));
	});
var $author$project$ApiFunctions$checkApiUrl = F2(
	function (basePath, autoCheck) {
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					return $author$project$Messages$SaveApiUrl(
						_Utils_Tuple2(basePath, autoCheck));
				} else {
					var e = response.a;
					switch (e.$) {
						case 'BadStatus':
							var code = e.a;
							if (code === 404) {
								return $author$project$Messages$RejectApiUrl(
									_Utils_Tuple2('No Var:Pivo server found on that address', autoCheck));
							} else {
								return $author$project$Messages$RejectApiUrl(
									_Utils_Tuple2(
										'Unknown error ' + $elm$core$Debug$toString(e),
										autoCheck));
							}
						case 'NetworkError':
							return $author$project$Messages$RejectApiUrl(
								_Utils_Tuple2('Could not connect to that address', autoCheck));
						default:
							return $author$project$Messages$RejectApiUrl(
								_Utils_Tuple2(
									'Unknown error ' + $elm$core$Debug$toString(e),
									autoCheck));
					}
				}
			},
			A2($author$project$Api$withBasePath, basePath, $author$project$Api$Request$Info$getDiscover));
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0.a;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.path),
					$elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					$elm$core$Basics$identity)));
	});
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0.a;
	return $elm$url$Url$Parser$Parser(
		function (_v1) {
			var visited = _v1.visited;
			var unvisited = _v1.unvisited;
			var params = _v1.params;
			var frag = _v1.frag;
			var value = _v1.value;
			return _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					visited,
					unvisited,
					params,
					frag,
					value(
						queryParser(params)))
				]);
		});
};
var $elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return $elm$url$Url$Parser$Internal$Parser(
			function (dict) {
				return func(
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, key, dict)));
			});
	});
var $elm$url$Url$Parser$Query$string = function (key) {
	return A2(
		$elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$Maybe$Just(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Model$getApiUrlsFromQueryString = function (url) {
	var queryParser = $elm$url$Url$Parser$query(
		$elm$url$Url$Parser$Query$string('connections'));
	var _v0 = A2(
		$elm$url$Url$Parser$parse,
		queryParser,
		_Utils_update(
			url,
			{path: ''}));
	if (_v0.$ === 'Just') {
		var urls = _v0.a;
		return A2(
			$elm$core$Result$withDefault,
			_List_Nil,
			A2(
				$elm$json$Json$Decode$decodeString,
				$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
				A2($elm$core$Maybe$withDefault, '[]', urls)));
	} else {
		return _List_Nil;
	}
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $author$project$Main$prepareAddress = F2(
	function (protocol, address) {
		return A2(
			$elm$core$String$dropRight,
			1,
			_Utils_ap(
				(A2($elm$core$String$startsWith, 'http://', address) || A2($elm$core$String$startsWith, 'https://', address)) ? address : _Utils_ap(protocol, address),
				(A2($elm$core$String$endsWith, '/api', address) || A2($elm$core$String$endsWith, '/', address)) ? (A2($elm$core$String$endsWith, '/', address) ? '' : ' ') : '/api/'));
	});
var $author$project$Main$checkApiUrlsFromQueryString = F2(
	function (protocol, url) {
		var decodedUrls = $author$project$Model$getApiUrlsFromQueryString(url);
		return $elm$core$List$isEmpty(decodedUrls) ? _List_fromArray(
			[$elm$core$Platform$Cmd$none]) : A2(
			$elm$core$List$map,
			function (address) {
				return A2(
					$author$project$ApiFunctions$checkApiUrl,
					A2($author$project$Main$prepareAddress, protocol, address),
					true);
			},
			decodedUrls);
	});
var $author$project$Messages$FetchRecipes = {$: 'FetchRecipes'};
var $author$project$Messages$SetBrewSession = function (a) {
	return {$: 'SetBrewSession', a: a};
};
var $author$project$Api$Data$BrewSession = F4(
	function (steps, recipe, boilStartedAt, bsCodeValid) {
		return {boilStartedAt: boilStartedAt, bsCodeValid: bsCodeValid, recipe: recipe, steps: steps};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Api$Data$maybeField = F3(
	function (key, decoder, fallback) {
		var valueDecoder = $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
					$elm$json$Json$Decode$null(fallback)
				]));
		var fieldDecoder = A2($elm$json$Json$Decode$field, key, $elm$json$Json$Decode$value);
		var decodeObject = function (rawObject) {
			var _v0 = A2($elm$json$Json$Decode$decodeValue, fieldDecoder, rawObject);
			if (_v0.$ === 'Ok') {
				var rawValue = _v0.a;
				var _v1 = A2($elm$json$Json$Decode$decodeValue, valueDecoder, rawValue);
				if (_v1.$ === 'Ok') {
					var value = _v1.a;
					return $elm$json$Json$Decode$succeed(value);
				} else {
					var error = _v1.a;
					return $elm$json$Json$Decode$fail(
						$elm$json$Json$Decode$errorToString(error));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, decodeObject, $elm$json$Json$Decode$value);
	});
var $author$project$Api$Data$maybeDecode = F3(
	function (key, decoder, fallback) {
		return $author$project$Api$Data$decodeChain(
			A3($author$project$Api$Data$maybeField, key, decoder, fallback));
	});
var $author$project$Api$Data$Recipe = F5(
	function (name, id, style, ingredients, boilTime) {
		return {boilTime: boilTime, id: id, ingredients: ingredients, name: name, style: style};
	});
var $author$project$Api$Data$Ingredient = F3(
	function (name, unit, amount) {
		return {amount: amount, name: name, unit: unit};
	});
var $author$project$Api$Data$ingredientDecoder = A3(
	$author$project$Api$Data$decode,
	'amount',
	$elm$json$Json$Decode$float,
	A3(
		$author$project$Api$Data$decode,
		'unit',
		$elm$json$Json$Decode$string,
		A3(
			$author$project$Api$Data$decode,
			'name',
			$elm$json$Json$Decode$string,
			$elm$json$Json$Decode$succeed($author$project$Api$Data$Ingredient))));
var $author$project$Api$Data$RecipeListStyle = F2(
	function (name, type_) {
		return {name: name, type_: type_};
	});
var $author$project$Api$Data$recipeListStyleDecoder = A3(
	$author$project$Api$Data$decode,
	'type',
	$elm$json$Json$Decode$string,
	A3(
		$author$project$Api$Data$decode,
		'name',
		$elm$json$Json$Decode$string,
		$elm$json$Json$Decode$succeed($author$project$Api$Data$RecipeListStyle)));
var $author$project$Api$Data$recipeDecoder = A4(
	$author$project$Api$Data$maybeDecode,
	'boil_time',
	$elm$json$Json$Decode$float,
	$elm$core$Maybe$Nothing,
	A3(
		$author$project$Api$Data$decode,
		'ingredients',
		$elm$json$Json$Decode$list($author$project$Api$Data$ingredientDecoder),
		A3(
			$author$project$Api$Data$decode,
			'style',
			$author$project$Api$Data$recipeListStyleDecoder,
			A3(
				$author$project$Api$Data$decode,
				'id',
				$elm$json$Json$Decode$string,
				A3(
					$author$project$Api$Data$decode,
					'name',
					$elm$json$Json$Decode$string,
					$elm$json$Json$Decode$succeed($author$project$Api$Data$Recipe))))));
var $author$project$Api$Data$RecipeStep = function (id) {
	return function (started) {
		return function (finished) {
			return function (progress) {
				return function (estimation) {
					return function (description) {
						return function (durationMins) {
							return function (name) {
								return function (available) {
									return function (kind) {
										return function (target) {
											return {available: available, description: description, durationMins: durationMins, estimation: estimation, finished: finished, id: id, kind: kind, name: name, progress: progress, started: started, target: target};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Api$Data$recipeStepDecoder = A4(
	$author$project$Api$Data$maybeDecode,
	'target',
	$elm$json$Json$Decode$float,
	$elm$core$Maybe$Nothing,
	A3(
		$author$project$Api$Data$decode,
		'kind',
		$elm$json$Json$Decode$string,
		A3(
			$author$project$Api$Data$decode,
			'available',
			$elm$json$Json$Decode$bool,
			A3(
				$author$project$Api$Data$decode,
				'name',
				$elm$json$Json$Decode$string,
				A4(
					$author$project$Api$Data$maybeDecode,
					'duration_mins',
					$elm$json$Json$Decode$float,
					$elm$core$Maybe$Nothing,
					A3(
						$author$project$Api$Data$decode,
						'description',
						$elm$json$Json$Decode$string,
						A4(
							$author$project$Api$Data$maybeDecode,
							'estimation',
							$elm$json$Json$Decode$float,
							$elm$core$Maybe$Nothing,
							A4(
								$author$project$Api$Data$maybeDecode,
								'progress',
								$elm$json$Json$Decode$float,
								$elm$core$Maybe$Nothing,
								A4(
									$author$project$Api$Data$maybeDecode,
									'finished',
									$elm$json$Json$Decode$float,
									$elm$core$Maybe$Nothing,
									A4(
										$author$project$Api$Data$maybeDecode,
										'started',
										$elm$json$Json$Decode$float,
										$elm$core$Maybe$Nothing,
										A3(
											$author$project$Api$Data$decode,
											'id',
											$elm$json$Json$Decode$string,
											$elm$json$Json$Decode$succeed($author$project$Api$Data$RecipeStep))))))))))));
var $author$project$Api$Data$brewSessionDecoder = A3(
	$author$project$Api$Data$decode,
	'bs_code_valid',
	$elm$json$Json$Decode$bool,
	A4(
		$author$project$Api$Data$maybeDecode,
		'boil_started_at',
		$elm$json$Json$Decode$float,
		$elm$core$Maybe$Nothing,
		A3(
			$author$project$Api$Data$decode,
			'recipe',
			$author$project$Api$Data$recipeDecoder,
			A3(
				$author$project$Api$Data$decode,
				'steps',
				$elm$json$Json$Decode$list($author$project$Api$Data$recipeStepDecoder),
				$elm$json$Json$Decode$succeed($author$project$Api$Data$BrewSession)))));
var $author$project$Api$Request$BrewSessionStatus$getBrewStatus = function (authorization_header) {
	return A7(
		$author$project$Api$request,
		'GET',
		'/status',
		_List_Nil,
		_List_Nil,
		_List_fromArray(
			[
				_Utils_Tuple2(
				'Authorization',
				A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
			]),
		$elm$core$Maybe$Nothing,
		$author$project$Api$Data$brewSessionDecoder);
};
var $author$project$Data$Conversions$apiRecipeToRecipe = function (a) {
	return {
		boil_time: a.boilTime,
		id: a.id,
		ingredients: A2(
			$elm$core$List$map,
			function (i) {
				return {amount: i.amount, name: i.name, unit: i.unit};
			},
			a.ingredients),
		name: a.name,
		style_name: a.style.name,
		style_type: a.style.type_
	};
};
var $author$project$Data$Step$Generic = {$: 'Generic'};
var $author$project$Data$Step$Hop = {$: 'Hop'};
var $author$project$Data$Step$KeepTemperature = {$: 'KeepTemperature'};
var $author$project$Data$Step$Misc = {$: 'Misc'};
var $author$project$Data$Step$SetTemperature = {$: 'SetTemperature'};
var $author$project$Data$Step$Water = {$: 'Water'};
var $author$project$Data$Step$Weight = {$: 'Weight'};
var $author$project$Data$Conversions$apiStepToRecipeStep = function (entry) {
	return {
		available: entry.available,
		description: entry.description,
		duration: entry.durationMins,
		estimation: entry.estimation,
		finished: entry.finished,
		id: entry.id,
		kind: function () {
			var _v0 = entry.kind;
			switch (_v0) {
				case 'generic':
					return $author$project$Data$Step$Generic;
				case 'hop':
					return $author$project$Data$Step$Hop;
				case 'misc':
					return $author$project$Data$Step$Misc;
				case 'set_temperature':
					return $author$project$Data$Step$SetTemperature;
				case 'keep_temperature':
					return $author$project$Data$Step$KeepTemperature;
				case 'water':
					return $author$project$Data$Step$Water;
				case 'weight':
					return $author$project$Data$Step$Weight;
				default:
					return $author$project$Data$Step$Generic;
			}
		}(),
		name: entry.name,
		progress: entry.progress,
		started: entry.started,
		target: entry.target
	};
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Basics$round = _Basics_round;
var $author$project$ApiFunctions$handleBrewSession = function (response) {
	if (response.$ === 'Ok') {
		var value = response.a;
		return $elm$core$Maybe$Just(
			{
				boilStartedAt: A2($elm$core$Maybe$map, $elm$core$Basics$round, value.boilStartedAt),
				brewSessionCodeValid: value.bsCodeValid,
				recipeListEntry: $elm$core$Maybe$Just(
					$author$project$Data$Conversions$apiRecipeToRecipe(value.recipe)),
				stepIds: A2(
					$elm$core$List$map,
					function (step) {
						return step.id;
					},
					value.steps),
				steps: $elm$core$Dict$fromList(
					A2(
						$elm$core$List$map,
						function (step) {
							return _Utils_Tuple2(
								step.id,
								$author$project$Data$Conversions$apiStepToRecipeStep(step));
						},
						value.steps))
			});
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$ApiFunctions$fetchBrewSession = F2(
	function (brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			function (response) {
				var _v0 = $author$project$ApiFunctions$handleBrewSession(response);
				if (_v0.$ === 'Nothing') {
					return $author$project$Messages$FetchRecipes;
				} else {
					var result = _v0.a;
					return $author$project$Messages$SetBrewSession(result);
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$BrewSessionStatus$getBrewStatus(
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $author$project$Router$Home = {$: 'Home'};
var $author$project$Data$BFImport$defaultBFImport = {
	add: false,
	errorMessage: '',
	form: {error: '', hint: 'Enter the ID or URL of your recipe from Brewer\'s Friend', valid: true, value: ''},
	importing: false,
	replace: false,
	successMessage: ''
};
var $author$project$Model$defaultSecurityFormState = {error: '', hint: 'Current brew session key', valid: true, value: ''};
var $author$project$Model$getBrewSessionKeyFromUrl = function (url) {
	var _v0 = A2(
		$elm$url$Url$Parser$parse,
		$elm$url$Url$Parser$query(
			$elm$url$Url$Parser$Query$string('brewSessionCode')),
		_Utils_update(
			url,
			{path: ''}));
	if (_v0.$ === 'Just') {
		var key = _v0.a;
		return key;
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Model$defaultSecurity = F2(
	function (url, flags) {
		var codeFromUrl = $author$project$Model$getBrewSessionKeyFromUrl(url);
		return {
			code: A2($elm$core$Maybe$withDefault, flags.brewSessionCode, codeFromUrl),
			form: $author$project$Model$defaultSecurityFormState,
			shareSecurityCode: false,
			valid: function () {
				if (codeFromUrl.$ === 'Just') {
					return true;
				} else {
					return false;
				}
			}()
		};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $aforemny$material_components_web_elm$Material$Snackbar$MessageId = function (a) {
	return {$: 'MessageId', a: a};
};
var $aforemny$material_components_web_elm$Material$Snackbar$Queue = function (a) {
	return {$: 'Queue', a: a};
};
var $aforemny$material_components_web_elm$Material$Snackbar$initialQueue = $aforemny$material_components_web_elm$Material$Snackbar$Queue(
	{
		messages: _List_Nil,
		nextMessageId: $aforemny$material_components_web_elm$Material$Snackbar$MessageId(0)
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Model$init = F3(
	function (flags, url, key) {
		var apiUrlsInQuery = !$elm$core$List$isEmpty(
			$author$project$Model$getApiUrlsFromQueryString(url));
		return {
			apiBaseUrl: flags.apiBaseUrl,
			apiConnecting: apiUrlsInQuery ? true : false,
			apiDefaultProtocol: flags.apiDefaultProtocol,
			availableRecipes: _List_Nil,
			basePath: flags.basePath,
			basePathList: A2(
				$elm$core$List$filter,
				function (val) {
					return !$elm$core$String$isEmpty(val);
				},
				A2($elm$core$String$split, '/', flags.basePath)),
			bfImport: $author$project$Data$BFImport$defaultBFImport,
			boilStartedAt: $elm$core$Maybe$Nothing,
			calibrationValue: -1,
			dialogVariant: $elm$core$Maybe$Nothing,
			heating: false,
			key: key,
			loading: true,
			menuOpened: false,
			newApiUrlFormError: $elm$core$Maybe$Nothing,
			origin: flags.origin,
			recipeSteps: $elm$core$Dict$empty,
			remainingBoilTime: $elm$core$Maybe$Nothing,
			route: $author$project$Router$Home,
			security: A2($author$project$Model$defaultSecurity, url, flags),
			selectedApiUrl: $elm$core$Maybe$Nothing,
			selectedRecipe: $elm$core$Maybe$Nothing,
			sharingSupported: flags.sharingSupported,
			snackbarQueue: $aforemny$material_components_web_elm$Material$Snackbar$initialQueue,
			stepsOrder: _List_Nil,
			storedApiUrls: flags.storedApiUrls,
			temperature: 0,
			timezone: $elm$core$Maybe$Nothing,
			title: 'Var:Pivo',
			url: url,
			value: 0,
			weight: 0
		};
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var model = A3($author$project$Model$init, flags, url, key);
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_Utils_ap(
					_List_fromArray(
						[
							A2($author$project$ApiFunctions$fetchBrewSession, model.security.code, flags.apiBaseUrl),
							A2($elm$core$Task$perform, $author$project$Messages$SetTimeZone, $elm$time$Time$here),
							A2($elm$core$Task$perform, $author$project$Messages$SetTime, $elm$time$Time$now)
						]),
					A2($author$project$Main$checkApiUrlsFromQueryString, flags.apiDefaultProtocol, url))));
	});
var $author$project$Messages$NavigateTo = function (a) {
	return {$: 'NavigateTo', a: a};
};
var $author$project$Messages$Recv = function (a) {
	return {$: 'Recv', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Main$messageReceiver = _Platform_incomingPort('messageReceiver', $elm$json$Json$Decode$string);
var $author$project$Main$notificationClick = _Platform_incomingPort(
	'notificationClick',
	$elm$json$Json$Decode$list($elm$json$Json$Decode$string));
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$messageReceiver($author$project$Messages$Recv),
				$author$project$Main$notificationClick(
				function (path) {
					return $author$project$Messages$NavigateTo(
						_Utils_Tuple2(path, _List_Nil));
				}),
				A2($elm$time$Time$every, 1000, $author$project$Messages$SetTime)
			]));
};
var $aforemny$material_components_web_elm$Material$Snackbar$inc = function (_v0) {
	var messageId = _v0.a;
	return $aforemny$material_components_web_elm$Material$Snackbar$MessageId(messageId + 1);
};
var $aforemny$material_components_web_elm$Material$Snackbar$addMessage = F2(
	function (message_, _v0) {
		var queue = _v0.a;
		return $aforemny$material_components_web_elm$Material$Snackbar$Queue(
			_Utils_update(
				queue,
				{
					messages: _Utils_ap(
						queue.messages,
						_List_fromArray(
							[
								_Utils_Tuple2(queue.nextMessageId, message_)
							])),
					nextMessageId: $aforemny$material_components_web_elm$Material$Snackbar$inc(queue.nextMessageId)
				}));
	});
var $author$project$Messages$Security = {$: 'Security'};
var $author$project$Messages$ShowDialog = function (a) {
	return {$: 'ShowDialog', a: a};
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $aforemny$material_components_web_elm$Material$Snackbar$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var $aforemny$material_components_web_elm$Material$Snackbar$customIcon = F3(
	function (node, attributes, nodes) {
		return $aforemny$material_components_web_elm$Material$Snackbar$Icon(
			{attributes: attributes, node: node, nodes: nodes});
	});
var $elm$html$Html$i = _VirtualDom_node('i');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $aforemny$material_components_web_elm$Material$Snackbar$icon = function (iconName) {
	return A3(
		$aforemny$material_components_web_elm$Material$Snackbar$customIcon,
		$elm$html$Html$i,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('material-icons')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(iconName)
			]));
};
var $aforemny$material_components_web_elm$Material$Snackbar$Message = function (a) {
	return {$: 'Message', a: a};
};
var $aforemny$material_components_web_elm$Material$Snackbar$message = function (label) {
	return $aforemny$material_components_web_elm$Material$Snackbar$Message(
		{
			actionButton: $elm$core$Maybe$Nothing,
			actionIcon: $elm$core$Maybe$Nothing,
			label: label,
			leading: false,
			onActionButtonClick: $elm$core$Maybe$Nothing,
			onActionIconClick: $elm$core$Maybe$Nothing,
			stacked: false,
			timeoutMs: $elm$core$Maybe$Just(5000)
		});
};
var $aforemny$material_components_web_elm$Material$Snackbar$setActionButton = F2(
	function (actionButton, _v0) {
		var message_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Snackbar$Message(
			_Utils_update(
				message_,
				{actionButton: actionButton}));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$setActionIcon = F2(
	function (actionIcon, _v0) {
		var message_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Snackbar$Message(
			_Utils_update(
				message_,
				{actionIcon: actionIcon}));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$setOnActionButtonClick = F2(
	function (onActionButtonClick, _v0) {
		var message_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Snackbar$Message(
			_Utils_update(
				message_,
				{
					onActionButtonClick: $elm$core$Maybe$Just(onActionButtonClick)
				}));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$setStacked = F2(
	function (stacked, _v0) {
		var message_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Snackbar$Message(
			_Utils_update(
				message_,
				{stacked: stacked}));
	});
var $author$project$SnackbarTools$brewSessionKeyRejectedMessage = function (message) {
	return A2(
		$aforemny$material_components_web_elm$Material$Snackbar$setOnActionButtonClick,
		function (_v0) {
			return $author$project$Messages$ShowDialog($author$project$Messages$Security);
		},
		A2(
			$aforemny$material_components_web_elm$Material$Snackbar$setStacked,
			true,
			A2(
				$aforemny$material_components_web_elm$Material$Snackbar$setActionButton,
				$elm$core$Maybe$Just('Edit key'),
				A2(
					$aforemny$material_components_web_elm$Material$Snackbar$setActionIcon,
					$elm$core$Maybe$Just(
						$aforemny$material_components_web_elm$Material$Snackbar$icon('close')),
					$aforemny$material_components_web_elm$Material$Snackbar$message(message)))));
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$ConnectionsManagement$brewSessionLink = function (model) {
	var base = _Utils_ap(model.origin, model.basePath);
	var _v0 = model.apiBaseUrl;
	if (_v0 === '') {
		return base;
	} else {
		var url = _v0;
		return base + ('?connections=' + (A2(
			$elm$json$Json$Encode$encode,
			0,
			A2(
				$elm$json$Json$Encode$list,
				$elm$json$Json$Encode$string,
				_List_fromArray(
					[url]))) + ((model.security.valid && model.security.shareSecurityCode) ? ('&brewSessionCode=' + model.security.code) : '')));
	}
};
var $author$project$Messages$ShowSnackbar = function (a) {
	return {$: 'ShowSnackbar', a: a};
};
var $author$project$Messages$BrewSessionCodeRejected = function (a) {
	return {$: 'BrewSessionCodeRejected', a: a};
};
var $author$project$ApiFunctions$handleApiError = function (e) {
	if (e.$ === 'BadStatus') {
		var code = e.a;
		if (code === 401) {
			return $author$project$Messages$BrewSessionCodeRejected(
				_Utils_Tuple2('You are in spectator mode! Add brew session key to gain control.', true));
		} else {
			return $author$project$Messages$ShowSnackbar(
				$elm$core$Debug$toString(e));
		}
	} else {
		return $author$project$Messages$ShowSnackbar(
			$elm$core$Debug$toString(e));
	}
};
var $author$project$Api$Request$Scale$putScaleRes = function (authorization_header) {
	return A7(
		$author$project$Api$request,
		'PUT',
		'/scale',
		_List_Nil,
		_List_Nil,
		_List_fromArray(
			[
				_Utils_Tuple2(
				'Authorization',
				A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
			]),
		$elm$core$Maybe$Nothing,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $author$project$ApiFunctions$calibrate = F2(
	function (brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					return $author$project$Messages$ShowSnackbar('Calibration in progress. Do not move the weight.');
				} else {
					var e = response.a;
					return $author$project$ApiFunctions$handleApiError(e);
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$Scale$putScaleRes(
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $author$project$Api$Request$BrewSessionStatus$deleteBrewStatus = function (authorization_header) {
	return A7(
		$author$project$Api$request,
		'DELETE',
		'/status',
		_List_Nil,
		_List_Nil,
		_List_fromArray(
			[
				_Utils_Tuple2(
				'Authorization',
				A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
			]),
		$elm$core$Maybe$Nothing,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $author$project$ApiFunctions$cancelBrewSession = F2(
	function (brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					return $author$project$Messages$SetBrewSession(
						{boilStartedAt: $elm$core$Maybe$Nothing, brewSessionCodeValid: true, recipeListEntry: $elm$core$Maybe$Nothing, stepIds: _List_Nil, steps: $elm$core$Dict$empty});
				} else {
					var e = response.a;
					return $author$project$ApiFunctions$handleApiError(e);
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$BrewSessionStatus$deleteBrewStatus(
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$close = F2(
	function (messageId, _v0) {
		var queue = _v0.a;
		return $aforemny$material_components_web_elm$Material$Snackbar$Queue(
			_Utils_update(
				queue,
				{
					messages: function () {
						var _v1 = queue.messages;
						if (!_v1.b) {
							return _List_Nil;
						} else {
							var _v2 = _v1.a;
							var currentMessageId = _v2.a;
							var otherMessages = _v1.b;
							return _Utils_eq(currentMessageId, messageId) ? otherMessages : queue.messages;
						}
					}()
				}));
	});
var $author$project$Main$connect = _Platform_outgoingPort('connect', $elm$json$Json$Encode$string);
var $author$project$Main$console = _Platform_outgoingPort('console', $elm$json$Json$Encode$string);
var $author$project$Messages$SetSteps = function (a) {
	return {$: 'SetSteps', a: a};
};
var $author$project$Data$Conversions$apiStepListToStepList = function (value) {
	return _Utils_Tuple2(
		$elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (step) {
					return _Utils_Tuple2(
						step.id,
						$author$project$Data$Conversions$apiStepToRecipeStep(step));
				},
				value.steps)),
		A2(
			$elm$core$List$map,
			function (step) {
				return step.id;
			},
			value.steps));
};
var $author$project$ApiFunctions$handleSteps = function (res) {
	if (res.$ === 'Ok') {
		var value = res.a;
		return $author$project$Data$Conversions$apiStepListToStepList(value);
	} else {
		return _Utils_Tuple2($elm$core$Dict$empty, _List_Nil);
	}
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Api$Data$StepsList = function (steps) {
	return {steps: steps};
};
var $author$project$Api$Data$stepsListDecoder = A3(
	$author$project$Api$Data$decode,
	'steps',
	$elm$json$Json$Decode$list($author$project$Api$Data$recipeStepDecoder),
	$elm$json$Json$Decode$succeed($author$project$Api$Data$StepsList));
var $author$project$Api$Request$Recipes$postRecipe = function (recipeId_path) {
	return A7(
		$author$project$Api$request,
		'POST',
		'/recipe/{recipeId}',
		_List_fromArray(
			[
				_Utils_Tuple2(
				'recipeId',
				$elm$core$Basics$identity(recipeId_path))
			]),
		_List_Nil,
		_List_Nil,
		$elm$core$Maybe$Nothing,
		$author$project$Api$Data$stepsListDecoder);
};
var $author$project$ApiFunctions$fetchRecipeSteps = F2(
	function (recipeId, basePath) {
		return A2(
			$author$project$Api$send,
			function (msg) {
				var _v0 = $author$project$ApiFunctions$handleSteps(msg);
				var steps = _v0.a;
				var order = _v0.b;
				return $elm$core$Dict$isEmpty(steps) ? $author$project$Messages$ShowSnackbar('Couldn\'t get recipe steps!') : $author$project$Messages$SetSteps(
					_Utils_Tuple2(steps, order));
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$Recipes$postRecipe(recipeId)));
	});
var $author$project$Messages$SetAvailableRecipes = function (a) {
	return {$: 'SetAvailableRecipes', a: a};
};
var $author$project$Api$Data$RecipeList = function (recipes) {
	return {recipes: recipes};
};
var $author$project$Api$Data$recipeListDecoder = A3(
	$author$project$Api$Data$decode,
	'recipes',
	$elm$json$Json$Decode$list($author$project$Api$Data$recipeDecoder),
	$elm$json$Json$Decode$succeed($author$project$Api$Data$RecipeList));
var $author$project$Api$Request$Recipes$getRecipeList = A7($author$project$Api$request, 'GET', '/recipe', _List_Nil, _List_Nil, _List_Nil, $elm$core$Maybe$Nothing, $author$project$Api$Data$recipeListDecoder);
var $author$project$ApiFunctions$handleRecipes = function (res) {
	if (res.$ === 'Ok') {
		var value = res.a;
		return A2($elm$core$List$map, $author$project$Data$Conversions$apiRecipeToRecipe, value.recipes);
	} else {
		return _List_Nil;
	}
};
var $author$project$ApiFunctions$fetchRecipes = function (basePath) {
	return A2(
		$author$project$Api$send,
		function (msg) {
			return $author$project$Messages$SetAvailableRecipes(
				$author$project$ApiFunctions$handleRecipes(msg));
		},
		A2($author$project$Api$withBasePath, basePath, $author$project$Api$Request$Recipes$getRecipeList));
};
var $author$project$Api$Request$RecipeSteps$deleteStepStart = F2(
	function (stepId_path, authorization_header) {
		return A7(
			$author$project$Api$request,
			'DELETE',
			'/step/{stepId}',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'stepId',
					$elm$core$Basics$identity(stepId_path))
				]),
			_List_Nil,
			_List_fromArray(
				[
					_Utils_Tuple2(
					'Authorization',
					A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
				]),
			$elm$core$Maybe$Nothing,
			$author$project$Api$Data$recipeStepDecoder);
	});
var $author$project$Messages$UpdateStep = function (a) {
	return {$: 'UpdateStep', a: a};
};
var $author$project$ApiFunctions$handleStep = function (response) {
	if (response.$ === 'Ok') {
		var value = response.a;
		return $author$project$Messages$UpdateStep(
			$author$project$Data$Conversions$apiStepToRecipeStep(value));
	} else {
		var e = response.a;
		return $author$project$ApiFunctions$handleApiError(e);
	}
};
var $author$project$ApiFunctions$finishStep = F3(
	function (stepId, brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			$author$project$ApiFunctions$handleStep,
			A2(
				$author$project$Api$withBasePath,
				basePath,
				A2(
					$author$project$Api$Request$RecipeSteps$deleteStepStart,
					stepId,
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $ianmackenzie$elm_units$Quantity$Quantity = function (a) {
	return {$: 'Quantity', a: a};
};
var $ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numSeconds);
};
var $ianmackenzie$elm_units$Duration$milliseconds = function (numMilliseconds) {
	return $ianmackenzie$elm_units$Duration$seconds(0.001 * numMilliseconds);
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $ianmackenzie$elm_units$Duration$from = F2(
	function (startTime, endTime) {
		var numMilliseconds = $elm$time$Time$posixToMillis(endTime) - $elm$time$Time$posixToMillis(startTime);
		return $ianmackenzie$elm_units$Duration$milliseconds(numMilliseconds);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Messages$CalibrationWeightPlaced = {$: 'CalibrationWeightPlaced'};
var $author$project$Messages$Confirm = function (a) {
	return {$: 'Confirm', a: a};
};
var $author$project$KegMessage$handleJsonDecodeError = F2(
	function (e, model) {
		switch (e.$) {
			case 'Field':
				var string = e.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							snackbarQueue: A2(
								$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
								$aforemny$material_components_web_elm$Material$Snackbar$message(string),
								model.snackbarQueue)
						}),
					$elm$core$Platform$Cmd$none);
			case 'Index':
				var _int = e.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							snackbarQueue: A2(
								$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
								$aforemny$material_components_web_elm$Material$Snackbar$message(
									$elm$core$String$fromInt(_int)),
								model.snackbarQueue)
						}),
					$elm$core$Platform$Cmd$none);
			case 'OneOf':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							snackbarQueue: A2(
								$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
								$aforemny$material_components_web_elm$Material$Snackbar$message('oneof errors'),
								model.snackbarQueue)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var string = e.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							snackbarQueue: A2(
								$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
								$aforemny$material_components_web_elm$Material$Snackbar$message(string),
								model.snackbarQueue)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Data$Step$empty = {available: false, description: '', duration: $elm$core$Maybe$Nothing, estimation: $elm$core$Maybe$Nothing, finished: $elm$core$Maybe$Nothing, id: '', kind: $author$project$Data$Step$Generic, name: '', progress: $elm$core$Maybe$Nothing, started: $elm$core$Maybe$Nothing, target: $elm$core$Maybe$Nothing};
var $author$project$KegMessage$handleStepChange = F3(
	function (model, newStep, notificationPort) {
		var oldStep = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Data$Step$empty,
			A2($elm$core$Dict$get, newStep.id, model.recipeSteps));
		var newModel = _Utils_update(
			model,
			{
				recipeSteps: A3($elm$core$Dict$insert, newStep.id, newStep, model.recipeSteps)
			});
		var _v0 = _Utils_Tuple2(newStep.started, newStep.finished);
		if (_v0.a.$ === 'Just') {
			if (_v0.b.$ === 'Just') {
				var newFinished = _v0.b.a;
				var _v1 = oldStep.finished;
				if (_v1.$ === 'Nothing') {
					return _Utils_Tuple2(
						newModel,
						notificationPort(
							{subtitle: newStep.name, time: newFinished * 1000, title: 'Step finished'}));
				} else {
					return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
				}
			} else {
				var newStarted = _v0.a.a;
				var _v2 = _v0.b;
				var _v3 = oldStep.started;
				if (_v3.$ === 'Nothing') {
					return _Utils_Tuple2(
						newModel,
						notificationPort(
							{subtitle: newStep.description, time: newStarted * 1000, title: newStep.name}));
				} else {
					return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
				}
			}
		} else {
			return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Api$Data$Temperature = F2(
	function (temperature, heating) {
		return {heating: heating, temperature: temperature};
	});
var $author$project$Api$Data$temperatureDecoder = A3(
	$author$project$Api$Data$decode,
	'heating',
	$elm$json$Json$Decode$bool,
	A3(
		$author$project$Api$Data$decode,
		'temperature',
		$elm$json$Json$Decode$float,
		$elm$json$Json$Decode$succeed($author$project$Api$Data$Temperature)));
var $author$project$Api$Data$WSKeg = F2(
	function (payload, content) {
		return {content: content, payload: payload};
	});
var $author$project$Api$Data$wSKegDecoder = A3(
	$author$project$Api$Data$decode,
	'content',
	$elm$json$Json$Decode$string,
	A3(
		$author$project$Api$Data$decode,
		'payload',
		$elm$json$Json$Decode$string,
		$elm$json$Json$Decode$succeed($author$project$Api$Data$WSKeg)));
var $author$project$KegMessage$handleKegMessage = F4(
	function (data, model, console, notificationPort) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Data$wSKegDecoder, data);
		if (_v0.$ === 'Ok') {
			var value = _v0.a;
			var _v1 = value.content;
			switch (_v1) {
				case 'step':
					var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Data$recipeStepDecoder, value.payload);
					if (_v2.$ === 'Ok') {
						var step = _v2.a;
						return A3(
							$author$project$KegMessage$handleStepChange,
							model,
							$author$project$Data$Conversions$apiStepToRecipeStep(step),
							notificationPort);
					} else {
						var e = _v2.a;
						return A2($author$project$KegMessage$handleJsonDecodeError, e, model);
					}
				case 'weight':
					var _v3 = A2($elm$json$Json$Decode$decodeString, $elm$json$Json$Decode$float, value.payload);
					if (_v3.$ === 'Ok') {
						var weight = _v3.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{weight: weight}),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = _v3.a;
						return A2($author$project$KegMessage$handleJsonDecodeError, e, model);
					}
				case 'temperature':
					var _v4 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Data$temperatureDecoder, value.payload);
					if (_v4.$ === 'Ok') {
						var temp = _v4.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{heating: temp.heating, temperature: temp.temperature}),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = _v4.a;
						return A2($author$project$KegMessage$handleJsonDecodeError, e, model);
					}
				case 'boil_started_at':
					var _v5 = A2($elm$json$Json$Decode$decodeString, $elm$json$Json$Decode$int, value.payload);
					if (_v5.$ === 'Ok') {
						var boil = _v5.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									boilStartedAt: $elm$core$Maybe$Just(
										$elm$time$Time$millisToPosix(boil))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = _v5.a;
						return A2($author$project$KegMessage$handleJsonDecodeError, e, model);
					}
				case 'calibration':
					var _v6 = value.payload;
					switch (_v6) {
						case 'ready':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										dialogVariant: $elm$core$Maybe$Just(
											$author$project$Messages$Confirm(
												_Utils_Tuple2('Place calibration weight on the scale', $author$project$Messages$CalibrationWeightPlaced)))
									}),
								$elm$core$Platform$Cmd$none);
						case 'done':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										snackbarQueue: A2(
											$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
											$aforemny$material_components_web_elm$Material$Snackbar$message('Calibration done'),
											model.snackbarQueue)
									}),
								$elm$core$Platform$Cmd$none);
						default:
							return _Utils_Tuple2(
								model,
								console(
									$elm$core$Debug$toString(value)));
					}
				default:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								snackbarQueue: A2(
									$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
									$aforemny$material_components_web_elm$Material$Snackbar$message(value.payload),
									model.snackbarQueue)
							}),
						$elm$core$Platform$Cmd$none);
			}
		} else {
			var e = _v0.a;
			return A2($author$project$KegMessage$handleJsonDecodeError, e, model);
		}
	});
var $author$project$Messages$ImportRecipeFailure = function (a) {
	return {$: 'ImportRecipeFailure', a: a};
};
var $author$project$Messages$ImportRecipeSuccess = function (a) {
	return {$: 'ImportRecipeSuccess', a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Api$Data$maybeEncode = F2(
	function (key, encoder) {
		return $elm$core$Maybe$map(
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Tuple$pair(key),
				encoder));
	});
var $author$project$Api$Data$encodeBrewerSFriendRecipeIDPairs = function (model) {
	var pairs = _List_fromArray(
		[
			A3($author$project$Api$Data$maybeEncode, 'id', $elm$json$Json$Encode$string, model.id),
			A3($author$project$Api$Data$maybeEncode, 'url', $elm$json$Json$Encode$string, model.url),
			A3($author$project$Api$Data$maybeEncode, 'replace', $elm$json$Json$Encode$bool, model.replace),
			A3($author$project$Api$Data$maybeEncode, 'add', $elm$json$Json$Encode$bool, model.add)
		]);
	return pairs;
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Api$Data$encodeObject = A2(
	$elm$core$Basics$composeL,
	$elm$json$Json$Encode$object,
	$elm$core$List$filterMap($elm$core$Basics$identity));
var $author$project$Api$Data$encodeBrewerSFriendRecipeID = A2($elm$core$Basics$composeL, $author$project$Api$Data$encodeObject, $author$project$Api$Data$encodeBrewerSFriendRecipeIDPairs);
var $author$project$Api$Request$Recipes$postBrewersFriendRecipe = function (brewerSFriendRecipeID_body) {
	return A7(
		$author$project$Api$request,
		'POST',
		'/recipe/brewers_friend',
		_List_Nil,
		_List_Nil,
		_List_Nil,
		A2($elm$core$Maybe$map, $author$project$Api$Data$encodeBrewerSFriendRecipeID, brewerSFriendRecipeID_body),
		$author$project$Api$Data$recipeDecoder);
};
var $author$project$ApiFunctions$importBrewersFriend = F5(
	function (basePath, recipeId, recipeUrl, replace, add) {
		var requestBody = {
			add: $elm$core$Maybe$Just(add),
			id: recipeId,
			replace: $elm$core$Maybe$Just(replace),
			url: recipeUrl
		};
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					var r = response.a;
					return $author$project$Messages$ImportRecipeSuccess(
						$author$project$Data$Conversions$apiRecipeToRecipe(r));
				} else {
					var e = response.a;
					return $author$project$Messages$ImportRecipeFailure(
						function () {
							if (e.$ === 'BadStatus') {
								var code = e.a;
								switch (code) {
									case 400:
										return 'You have to enter Brewer\'s Friend ID or URL';
									case 403:
										return 'Recipe is not accessible. Are you sure it\'s set to public?';
									case 404:
										return 'Recipe not found.';
									case 409:
										return 'Recipe already exists. Specify if you want to replace it or add another copy, and try again.';
									default:
										return 'Import failed.';
								}
							} else {
								return 'Import failed.';
							}
						}());
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$Recipes$postBrewersFriendRecipe(
					$elm$core$Maybe$Just(requestBody))));
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $ianmackenzie$elm_units$Duration$minutes = function (numMinutes) {
	return $ianmackenzie$elm_units$Duration$seconds(60 * numMinutes);
};
var $elm$url$Url$Builder$absolute = F2(
	function (pathSegments, parameters) {
		return '/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters));
	});
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Router$navigate = F3(
	function (model, target, query) {
		return A2(
			$elm$browser$Browser$Navigation$pushUrl,
			model.key,
			A2(
				$elm$url$Url$Builder$absolute,
				_Utils_ap(model.basePathList, target),
				query));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Main$notification = _Platform_outgoingPort(
	'notification',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'subtitle',
					$elm$json$Json$Encode$string($.subtitle)),
					_Utils_Tuple2(
					'time',
					$elm$json$Json$Encode$float($.time)),
					_Utils_Tuple2(
					'title',
					$elm$json$Json$Encode$string($.title))
				]));
	});
var $author$project$Router$Connections = {$: 'Connections'};
var $author$project$Router$BrewSession = {$: 'BrewSession'};
var $author$project$Router$Recipe = {$: 'Recipe'};
var $author$project$Router$RecipeImport = {$: 'RecipeImport'};
var $author$project$Router$Scale = function (a) {
	return {$: 'Scale', a: a};
};
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.visited;
		var unvisited = _v0.unvisited;
		var params = _v0.params;
		var frag = _v0.frag;
		var value = _v0.value;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0.a;
		return $elm$url$Url$Parser$Parser(
			function (_v1) {
				var visited = _v1.visited;
				var unvisited = _v1.unvisited;
				var params = _v1.params;
				var frag = _v1.frag;
				var value = _v1.value;
				return A2(
					$elm$core$List$map,
					$elm$url$Url$Parser$mapState(value),
					parseArg(
						A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				$elm$core$List$concatMap,
				function (_v0) {
					var parser = _v0.a;
					return parser(state);
				},
				parsers);
		});
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0.a;
		var parseAfter = _v1.a;
		return $elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					$elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
var $elm$url$Url$Parser$s = function (str) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var visited = _v0.visited;
			var unvisited = _v0.unvisited;
			var params = _v0.params;
			var frag = _v0.frag;
			var value = _v0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						$elm$url$Url$Parser$State,
						A2($elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var $elm$url$Url$Parser$top = $elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var $author$project$Router$routeParser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Router$RecipeImport,
			$elm$url$Url$Parser$s('import')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Router$Recipe,
			$elm$url$Url$Parser$s('recipe')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Router$BrewSession,
			$elm$url$Url$Parser$s('brew-session')),
			A2($elm$url$Url$Parser$map, $author$project$Router$Home, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Router$Scale,
			A2(
				$elm$url$Url$Parser$questionMark,
				$elm$url$Url$Parser$s('scale'),
				$elm$url$Url$Parser$Query$string('step'))),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Router$Connections,
			$elm$url$Url$Parser$s('connections'))
		]));
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Router$route = F3(
	function (url, model, console) {
		var _v0 = A2(
			$elm$url$Url$Parser$parse,
			$author$project$Router$routeParser,
			_Utils_update(
				url,
				{
					path: A3($elm$core$String$replace, model.basePath, '', url.path)
				}));
		if (_v0.$ === 'Nothing') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{route: $author$project$Router$Home, url: url}),
				$elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							console(
							$elm$url$Url$toString(url)),
							A3(
							$author$project$Router$navigate,
							model,
							_List_fromArray(
								['']),
							_List_Nil)
						])));
		} else {
			var currentPage = _v0.a;
			if ((model.apiBaseUrl === '') && (!_Utils_eq(currentPage, $author$project$Router$Connections))) {
				return _Utils_Tuple2(
					model,
					A3(
						$author$project$Router$navigate,
						model,
						_List_fromArray(
							['connections']),
						_List_Nil));
			} else {
				switch (currentPage.$) {
					case 'Recipe':
						var _v2 = model.selectedRecipe;
						if (_v2.$ === 'Nothing') {
							return _Utils_Tuple2(
								model,
								A3(
									$author$project$Router$navigate,
									model,
									_List_fromArray(
										['']),
									_List_Nil));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{route: currentPage, url: url}),
								console(
									'recipe ' + $elm$url$Url$toString(url)));
						}
					case 'Home':
						return $elm$core$Dict$isEmpty(model.recipeSteps) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{route: $author$project$Router$Home, selectedRecipe: $elm$core$Maybe$Nothing, url: url}),
							console(
								'home ' + $elm$url$Url$toString(url))) : _Utils_Tuple2(
							model,
							A3(
								$author$project$Router$navigate,
								model,
								_List_fromArray(
									['brew-session']),
								_List_Nil));
					case 'BrewSession':
						return $elm$core$Dict$isEmpty(model.recipeSteps) ? _Utils_Tuple2(
							model,
							A3(
								$author$project$Router$navigate,
								model,
								_List_fromArray(
									['']),
								_List_Nil)) : _Utils_Tuple2(
							_Utils_update(
								model,
								{route: currentPage, url: url}),
							console(
								'bs ' + $elm$url$Url$toString(url)));
					case 'Scale':
						var stepId = currentPage.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{route: currentPage, url: url}),
							console(
								$elm$core$Debug$toString(stepId)));
					case 'Connections':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{newApiUrlFormError: $elm$core$Maybe$Nothing, route: currentPage, url: url}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{bfImport: $author$project$Data$BFImport$defaultBFImport, route: currentPage, url: url}),
							$elm$core$Platform$Cmd$none);
				}
			}
		}
	});
var $author$project$Main$saveBrewSessionCode = _Platform_outgoingPort('saveBrewSessionCode', $elm$json$Json$Encode$string);
var $author$project$Main$saveConnections = _Platform_outgoingPort(
	'saveConnections',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'connections',
					$elm$json$Json$Encode$list($elm$json$Json$Encode$string)($.connections)),
					_Utils_Tuple2(
					'selected',
					$elm$json$Json$Encode$string($.selected))
				]));
	});
var $author$project$Main$sendMessage = _Platform_outgoingPort('sendMessage', $elm$json$Json$Encode$string);
var $author$project$Main$shareLink = _Platform_outgoingPort('shareLink', $elm$json$Json$Encode$string);
var $author$project$SnackbarTools$simpleMessage = function (message) {
	return A2(
		$aforemny$material_components_web_elm$Material$Snackbar$setActionIcon,
		$elm$core$Maybe$Just(
			$aforemny$material_components_web_elm$Material$Snackbar$icon('close')),
		$aforemny$material_components_web_elm$Material$Snackbar$message(message));
};
var $author$project$Api$Request$Scale$patchScaleRes = F2(
	function (grams_query, authorization_header) {
		return A7(
			$author$project$Api$request,
			'PATCH',
			'/scale',
			_List_Nil,
			_List_fromArray(
				[
					_Utils_Tuple2(
					'grams',
					$elm$core$Maybe$Just(
						$elm$core$String$fromInt(grams_query)))
				]),
			_List_fromArray(
				[
					_Utils_Tuple2(
					'Authorization',
					A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
				]),
			$elm$core$Maybe$Nothing,
			$elm$json$Json$Decode$succeed(_Utils_Tuple0));
	});
var $author$project$ApiFunctions$startCalibration = F3(
	function (grams, brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					return $author$project$Messages$ShowSnackbar('Scale calibration started');
				} else {
					var e = response.a;
					return $author$project$ApiFunctions$handleApiError(e);
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				A2(
					$author$project$Api$Request$Scale$patchScaleRes,
					grams,
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $author$project$Api$Request$RecipeSteps$postStepStart = F2(
	function (stepId_path, authorization_header) {
		return A7(
			$author$project$Api$request,
			'POST',
			'/step/{stepId}',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'stepId',
					$elm$core$Basics$identity(stepId_path))
				]),
			_List_Nil,
			_List_fromArray(
				[
					_Utils_Tuple2(
					'Authorization',
					A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
				]),
			$elm$core$Maybe$Nothing,
			$author$project$Api$Data$recipeStepDecoder);
	});
var $author$project$ApiFunctions$startStep = F3(
	function (stepId, brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			$author$project$ApiFunctions$handleStep,
			A2(
				$author$project$Api$withBasePath,
				basePath,
				A2(
					$author$project$Api$Request$RecipeSteps$postStepStart,
					stepId,
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $author$project$Api$Request$Scale$deleteScaleRes = function (authorization_header) {
	return A7(
		$author$project$Api$request,
		'DELETE',
		'/scale',
		_List_Nil,
		_List_Nil,
		_List_fromArray(
			[
				_Utils_Tuple2(
				'Authorization',
				A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
			]),
		$elm$core$Maybe$Nothing,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $author$project$ApiFunctions$tareScale = F2(
	function (brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					return $author$project$Messages$ShowSnackbar('Tare done');
				} else {
					var e = response.a;
					return $author$project$ApiFunctions$handleApiError(e);
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$Scale$deleteScaleRes(
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $elm$core$String$toUpper = _String_toUpper;
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $author$project$Messages$BrewSessionCodeVerified = function (a) {
	return {$: 'BrewSessionCodeVerified', a: a};
};
var $author$project$Api$Request$Info$getAuth = function (authorization_header) {
	return A7(
		$author$project$Api$request,
		'GET',
		'/auth',
		_List_Nil,
		_List_Nil,
		_List_fromArray(
			[
				_Utils_Tuple2(
				'Authorization',
				A2($elm$core$Maybe$map, $elm$core$Basics$identity, authorization_header))
			]),
		$elm$core$Maybe$Nothing,
		$author$project$Api$Data$messageDecoder);
};
var $author$project$ApiFunctions$verifyBrewSessionCode = F2(
	function (brewSessionCode, basePath) {
		return A2(
			$author$project$Api$send,
			function (response) {
				if (response.$ === 'Ok') {
					return $author$project$Messages$BrewSessionCodeVerified(brewSessionCode);
				} else {
					var e = response.a;
					if (e.$ === 'BadStatus') {
						var code = e.a;
						if (code === 401) {
							return $author$project$Messages$BrewSessionCodeRejected(
								_Utils_Tuple2('Invalid code', false));
						} else {
							return $author$project$Messages$BrewSessionCodeRejected(
								_Utils_Tuple2('Code couldn\'t be verified', false));
						}
					} else {
						return $author$project$Messages$BrewSessionCodeRejected(
							_Utils_Tuple2('Code couldn\'t be verified', false));
					}
				}
			},
			A2(
				$author$project$Api$withBasePath,
				basePath,
				$author$project$Api$Request$Info$getAuth(
					$elm$core$Maybe$Just(brewSessionCode))));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'SnackbarClosed':
					var messageId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								snackbarQueue: A2($aforemny$material_components_web_elm$Material$Snackbar$close, messageId, model.snackbarQueue)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Increment':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{value: model.value + 1}),
						$elm$core$Platform$Cmd$none);
				case 'Decrement':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								availableRecipes: A2($elm$core$List$drop, 1, model.availableRecipes),
								value: model.value - 1
							}),
						$elm$core$Platform$Cmd$none);
				case 'FetchRecipes':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{loading: true}),
						$author$project$ApiFunctions$fetchRecipes(model.apiBaseUrl));
				case 'SetAvailableRecipes':
					var list = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{apiConnecting: false, availableRecipes: list, loading: false, value: model.value + 1}),
						$elm$core$Platform$Cmd$none);
				case 'Recv':
					var data = msg.a;
					return A4($author$project$KegMessage$handleKegMessage, data, model, $author$project$Main$console, $author$project$Main$notification);
				case 'Send':
					return _Utils_Tuple2(
						model,
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$notification(
									{subtitle: 'Subtitle', time: 6777, title: 'Title'}),
									$author$project$Main$sendMessage('msg')
								])));
				case 'ShowDialog':
					var dialog = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								dialogVariant: $elm$core$Maybe$Just(dialog)
							}),
						$elm$core$Platform$Cmd$none);
				case 'CloseDialog':
					var afterClose = msg.a;
					if (afterClose.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{dialogVariant: $elm$core$Maybe$Nothing}),
							$elm$core$Platform$Cmd$none);
					} else {
						var a = afterClose.a;
						var $temp$msg = a,
							$temp$model = _Utils_update(
							model,
							{dialogVariant: $elm$core$Maybe$Nothing});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					}
				case 'SelectRecipe':
					var recipe = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								loading: true,
								selectedRecipe: $elm$core$Maybe$Just(recipe)
							}),
						A2($author$project$ApiFunctions$fetchRecipeSteps, recipe.id, model.apiBaseUrl));
				case 'SetSteps':
					var _v2 = msg.a;
					var recipeSteps = _v2.a;
					var stepOrder = _v2.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{loading: false, recipeSteps: recipeSteps, stepsOrder: stepOrder}),
						A3(
							$author$project$Router$navigate,
							model,
							_List_fromArray(
								['brew-session']),
							_List_Nil));
				case 'ShowSnackbar':
					var string = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								loading: false,
								snackbarQueue: A2(
									$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
									$author$project$SnackbarTools$simpleMessage(string),
									model.snackbarQueue)
							}),
						$elm$core$Platform$Cmd$none);
				case 'ShowRecipeDetail':
					var recipeListEntry = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectedRecipe: $elm$core$Maybe$Just(recipeListEntry)
							}),
						A3(
							$author$project$Router$navigate,
							model,
							_List_fromArray(
								['recipe']),
							_List_Nil));
				case 'LinkClicked':
					var urlRequest = msg.a;
					if (urlRequest.$ === 'Internal') {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A3(
										$author$project$Router$navigate,
										model,
										_List_fromArray(
											[url.path]),
										_List_Nil),
										$author$project$Main$console(
										$elm$core$Debug$toString(url))
									])));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							$elm$browser$Browser$Navigation$load(href));
					}
				case 'UrlChanged':
					var url = msg.a;
					return A3($author$project$Router$route, url, model, $author$project$Main$console);
				case 'NavigateTo':
					var _v4 = msg.a;
					var path = _v4.a;
					var query = _v4.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{menuOpened: false}),
						A3($author$project$Router$navigate, model, path, query));
				case 'RequestTimeZone':
					return _Utils_Tuple2(
						model,
						A2($elm$core$Task$perform, $author$project$Messages$SetTimeZone, $elm$time$Time$here));
				case 'SetTimeZone':
					var zone = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								timezone: $elm$core$Maybe$Just(zone)
							}),
						$elm$core$Platform$Cmd$none);
				case 'SetTime':
					var time = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								remainingBoilTime: function () {
									var _v5 = model.selectedRecipe;
									if (_v5.$ === 'Nothing') {
										return $elm$core$Maybe$Nothing;
									} else {
										var recipe = _v5.a;
										var _v6 = recipe.boil_time;
										if (_v6.$ === 'Nothing') {
											return $elm$core$Maybe$Nothing;
										} else {
											var boil_time = _v6.a;
											var _v7 = model.boilStartedAt;
											if (_v7.$ === 'Nothing') {
												return $elm$core$Maybe$Just(
													$ianmackenzie$elm_units$Duration$minutes(boil_time));
											} else {
												var started = _v7.a;
												return $elm$core$Maybe$Just(
													A2(
														$ianmackenzie$elm_units$Duration$from,
														time,
														$elm$time$Time$millisToPosix(
															$elm$time$Time$posixToMillis(started) + ($elm$core$Basics$round(boil_time) * 60000))));
											}
										}
									}
								}()
							}),
						$elm$core$Platform$Cmd$none);
				case 'SetBrewSession':
					var brewSessionData = msg.a;
					var oldSecurity = model.security;
					var oldSecurityForm = oldSecurity.form;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								boilStartedAt: A2($elm$core$Maybe$map, $elm$time$Time$millisToPosix, brewSessionData.boilStartedAt),
								loading: false,
								recipeSteps: brewSessionData.steps,
								security: _Utils_update(
									oldSecurity,
									{
										form: _Utils_update(
											oldSecurityForm,
											{
												value: brewSessionData.brewSessionCodeValid ? model.security.code : ''
											}),
										valid: brewSessionData.brewSessionCodeValid
									}),
								selectedRecipe: brewSessionData.recipeListEntry,
								stepsOrder: brewSessionData.stepIds
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A3(
									$author$project$Router$navigate,
									model,
									_List_fromArray(
										['brew-session']),
									_List_Nil),
									brewSessionData.brewSessionCodeValid ? $author$project$Main$saveBrewSessionCode(model.security.code) : $elm$core$Platform$Cmd$none
								])));
				case 'StartStep':
					var stepId = msg.a;
					return _Utils_Tuple2(
						model,
						A3($author$project$ApiFunctions$startStep, stepId, model.security.code, model.apiBaseUrl));
				case 'UpdateStep':
					var step = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								recipeSteps: A3($elm$core$Dict$insert, step.id, step, model.recipeSteps)
							}),
						$elm$core$Platform$Cmd$none);
				case 'FinishStep':
					var stepId = msg.a;
					return _Utils_Tuple2(
						model,
						function () {
							var _v8 = A2($elm$core$Dict$get, stepId, model.recipeSteps);
							if (_v8.$ === 'Just') {
								var step = _v8.a;
								var _v9 = _Utils_Tuple2(step.started, step.finished);
								if ((_v9.a.$ === 'Just') && (_v9.b.$ === 'Nothing')) {
									var _v10 = _v9.b;
									return $elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												A3($author$project$ApiFunctions$finishStep, stepId, model.security.code, model.apiBaseUrl),
												A3($author$project$Router$navigate, model, _List_Nil, _List_Nil)
											]));
								} else {
									return A3($author$project$Router$navigate, model, _List_Nil, _List_Nil);
								}
							} else {
								return A3($author$project$Router$navigate, model, _List_Nil, _List_Nil);
							}
						}());
				case 'MenuOpened':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{menuOpened: true}),
						$elm$core$Platform$Cmd$none);
				case 'MenuClosed':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{menuOpened: false}),
						$elm$core$Platform$Cmd$none);
				case 'CalibrationValueUpdate':
					var _int = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{calibrationValue: _int}),
						$elm$core$Platform$Cmd$none);
				case 'StartCalibration':
					return _Utils_Tuple2(
						model,
						_Utils_eq(model.calibrationValue, -1) ? $elm$core$Platform$Cmd$none : A3($author$project$ApiFunctions$startCalibration, model.calibrationValue, model.security.code, model.apiBaseUrl));
				case 'CalibrationWeightPlaced':
					return _Utils_Tuple2(
						model,
						A2($author$project$ApiFunctions$calibrate, model.security.code, model.apiBaseUrl));
				case 'TareScale':
					return _Utils_Tuple2(
						model,
						A2($author$project$ApiFunctions$tareScale, model.security.code, model.apiBaseUrl));
				case 'CancelBrewSession':
					return _Utils_Tuple2(
						model,
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2($author$project$ApiFunctions$cancelBrewSession, model.security.code, model.apiBaseUrl),
									$author$project$ApiFunctions$fetchRecipes(model.apiBaseUrl)
								])));
				case 'Multiple':
					var msgs = msg.a;
					return _Utils_Tuple2(
						model,
						function () {
							var _v11 = $elm$core$List$unzip(
								A2(
									$elm$core$List$map,
									function (i) {
										return A2($author$project$Main$update, i, model);
									},
									A2(
										$elm$core$List$filter,
										function (i) {
											if (i.$ === 'Multiple') {
												return false;
											} else {
												return true;
											}
										},
										msgs)));
							var cmds = _v11.b;
							return $elm$core$Platform$Cmd$batch(cmds);
						}());
				case 'NewApiUrl':
					var string = msg.a;
					var address = A2($author$project$Main$prepareAddress, model.apiDefaultProtocol, string);
					var _v13 = $elm$url$Url$fromString(address);
					if (_v13.$ === 'Just') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{apiConnecting: true, newApiUrlFormError: $elm$core$Maybe$Nothing}),
							A2($author$project$ApiFunctions$checkApiUrl, address, false));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									newApiUrlFormError: $elm$core$Maybe$Just('Please enter a valid address')
								}),
							$author$project$Main$console(address));
					}
				case 'SelectApiUrl':
					var string = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectedApiUrl: $elm$core$Maybe$Just(string)
							}),
						$elm$core$Platform$Cmd$none);
				case 'SaveApiUrl':
					var _v14 = msg.a;
					var string = _v14.a;
					var autoDetection = _v14.b;
					var storedApiUrls = A2($elm$core$List$member, string, model.storedApiUrls) ? model.storedApiUrls : _Utils_ap(
						model.storedApiUrls,
						_List_fromArray(
							[string]));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								apiBaseUrl: (model.apiBaseUrl === '') ? string : (autoDetection ? model.apiBaseUrl : string),
								apiConnecting: false,
								loading: true,
								newApiUrlFormError: $elm$core$Maybe$Nothing,
								storedApiUrls: storedApiUrls
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$saveConnections(
									{connections: storedApiUrls, selected: string}),
									A2($author$project$ApiFunctions$fetchBrewSession, model.security.code, string),
									A3(
									$author$project$Router$navigate,
									model,
									_List_fromArray(
										['']),
									_List_Nil),
									$author$project$Main$connect(string + '/tap')
								])));
				case 'RemoveApiUrl':
					var string = msg.a;
					var storedApiUrls = A2(
						$elm$core$List$filter,
						function (url) {
							return !_Utils_eq(url, string);
						},
						model.storedApiUrls);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{storedApiUrls: storedApiUrls}),
						$author$project$Main$saveConnections(
							{
								connections: storedApiUrls,
								selected: A2($elm$core$Maybe$withDefault, '', model.selectedApiUrl)
							}));
				case 'RejectApiUrl':
					var _v15 = msg.a;
					var reason = _v15.a;
					var autoCheckedUrl = _v15.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								apiConnecting: false,
								newApiUrlFormError: autoCheckedUrl ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(reason)
							}),
						$author$project$Main$console(reason));
				case 'BrewSessionCodeInput':
					var value = msg.a;
					var oldSecurity = model.security;
					var oldSecurityForm = oldSecurity.form;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								security: _Utils_update(
									oldSecurity,
									{
										form: _Utils_update(
											oldSecurityForm,
											{
												value: $elm$core$String$toUpper(value)
											})
									})
							}),
						$elm$core$Platform$Cmd$none);
				case 'BrewSessionCodeChange':
					var suggestedCode = msg.a;
					var oldSecurity = model.security;
					var oldSecurityForm = oldSecurity.form;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								security: _Utils_update(
									oldSecurity,
									{
										form: _Utils_update(
											oldSecurityForm,
											{hint: 'Checking...'})
									})
							}),
						A2($author$project$ApiFunctions$verifyBrewSessionCode, suggestedCode, model.apiBaseUrl));
				case 'BrewSessionCodeVerified':
					var newCode = msg.a;
					var oldSecurity = model.security;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								security: _Utils_update(
									oldSecurity,
									{
										code: newCode,
										form: _Utils_update(
											$author$project$Model$defaultSecurityFormState,
											{value: newCode}),
										valid: true
									})
							}),
						$author$project$Main$saveBrewSessionCode(newCode));
				case 'BrewSessionCodeRejected':
					var _v16 = msg.a;
					var rejectionMessage = _v16.a;
					var currentIsInvalid = _v16.b;
					var oldSecurity = model.security;
					var oldSecurityForm = oldSecurity.form;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								security: _Utils_update(
									oldSecurity,
									{
										form: _Utils_update(
											oldSecurityForm,
											{error: rejectionMessage, valid: false}),
										valid: (!currentIsInvalid) ? model.security.valid : false
									}),
								snackbarQueue: A2(
									$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
									$author$project$SnackbarTools$brewSessionKeyRejectedMessage(rejectionMessage),
									model.snackbarQueue)
							}),
						$elm$core$Platform$Cmd$none);
				case 'CheckingUrlsFromQuery':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{apiConnecting: true}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleCodeSharing':
					var oldSecurity = model.security;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								security: _Utils_update(
									oldSecurity,
									{shareSecurityCode: !oldSecurity.shareSecurityCode})
							}),
						$elm$core$Platform$Cmd$none);
				case 'ShareLink':
					return _Utils_Tuple2(
						model.sharingSupported ? model : _Utils_update(
							model,
							{
								snackbarQueue: A2(
									$aforemny$material_components_web_elm$Material$Snackbar$addMessage,
									$author$project$SnackbarTools$simpleMessage('Link copied.'),
									model.snackbarQueue)
							}),
						$author$project$Main$shareLink(
							$author$project$ConnectionsManagement$brewSessionLink(model)));
				case 'BFImportInput':
					var string = msg.a;
					var oldImport = model.bfImport;
					var bfUrlCheck = A2(
						$elm$core$String$startsWith,
						A2(
							$elm$core$String$left,
							$elm$core$String$length(string),
							'https://brewersfriend.com'),
						string) || (A2(
						$elm$core$String$startsWith,
						A2(
							$elm$core$String$left,
							$elm$core$String$length(string),
							'http://brewersfriend.com'),
						string) || (A2(
						$elm$core$String$startsWith,
						A2(
							$elm$core$String$left,
							$elm$core$String$length(string),
							'brewersfriend.com'),
						string) || (A2(
						$elm$core$String$startsWith,
						A2(
							$elm$core$String$left,
							$elm$core$String$length(string),
							'https://www.brewersfriend.com'),
						string) || (A2(
						$elm$core$String$startsWith,
						A2(
							$elm$core$String$left,
							$elm$core$String$length(string),
							'http://www.brewersfriend.com'),
						string) || A2(
						$elm$core$String$startsWith,
						A2(
							$elm$core$String$left,
							$elm$core$String$length(string),
							'www.brewersfriend.com'),
						string)))));
					var _v17 = ($elm$core$String$length(string) >= 1) ? (A2($elm$core$String$all, $elm$core$Char$isDigit, string) ? _Utils_Tuple3(true, '', 'Entering Brewer\'s Friend ID') : (bfUrlCheck ? _Utils_Tuple3(true, '', 'Entering Brewer\'s Friend URL') : _Utils_Tuple3(false, 'Not a Brewer\'s Friend URL/ID', ''))) : _Utils_Tuple3(true, '', 'Enter the ID or URL of your recipe from Brewer\'s Friend');
					var valid = _v17.a;
					var error = _v17.b;
					var hint = _v17.c;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bfImport: _Utils_update(
									oldImport,
									{
										form: {error: error, hint: hint, valid: valid, value: string}
									})
							}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleRecipeReplace':
					var oldImport = model.bfImport;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bfImport: _Utils_update(
									oldImport,
									{add: false, replace: !oldImport.replace})
							}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleRecipeAdd':
					var oldImport = model.bfImport;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bfImport: _Utils_update(
									oldImport,
									{add: !oldImport.add, replace: false})
							}),
						$elm$core$Platform$Cmd$none);
				case 'ImportRecipe':
					var idOrUrl = msg.a;
					var oldImport = model.bfImport;
					var bfUrlCheck = A2($elm$core$String$startsWith, 'https://brewersfriend.com', idOrUrl) || (A2($elm$core$String$startsWith, 'http://brewersfriend.com', idOrUrl) || (A2($elm$core$String$startsWith, 'brewersfriend.com', idOrUrl) || (A2($elm$core$String$startsWith, 'https://www.brewersfriend.com', idOrUrl) || (A2($elm$core$String$startsWith, 'http://www.brewersfriend.com', idOrUrl) || (A2($elm$core$String$startsWith, 'www.brewersfriend.com', idOrUrl) || A2($elm$core$String$all, $elm$core$Char$isDigit, idOrUrl))))));
					var _v18 = A2($elm$core$String$all, $elm$core$Char$isDigit, idOrUrl) ? _Utils_Tuple2(
						$elm$core$Maybe$Just(idOrUrl),
						$elm$core$Maybe$Nothing) : _Utils_Tuple2(
						$elm$core$Maybe$Nothing,
						$elm$core$Maybe$Just(idOrUrl));
					var id = _v18.a;
					var url = _v18.b;
					return bfUrlCheck ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bfImport: _Utils_update(
									oldImport,
									{importing: true})
							}),
						A5($author$project$ApiFunctions$importBrewersFriend, model.apiBaseUrl, id, url, model.bfImport.replace, model.bfImport.add)) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bfImport: _Utils_update(
									oldImport,
									{
										form: {error: 'Invalid input', hint: '', valid: false, value: oldImport.form.value}
									})
							}),
						$elm$core$Platform$Cmd$none);
				case 'ImportRecipeSuccess':
					var recipeListEntry = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								availableRecipes: _Utils_ap(
									model.availableRecipes,
									_List_fromArray(
										[recipeListEntry])),
								bfImport: _Utils_update(
									$author$project$Data$BFImport$defaultBFImport,
									{importing: false, successMessage: 'Recipe ' + (recipeListEntry.name + ' imported successfully.')})
							}),
						$elm$core$Platform$Cmd$none);
				default:
					var reason = msg.a;
					var oldImport = model.bfImport;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bfImport: _Utils_update(
									oldImport,
									{errorMessage: reason, importing: false, successMessage: ''})
							}),
						$elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Messages$SnackbarClosed = function (a) {
	return {$: 'SnackbarClosed', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowAttrs = function (a) {
	return {$: 'RowAttrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowAttrs(attrs_);
};
var $elm$html$Html$Attributes$align = $elm$html$Html$Attributes$stringProperty('align');
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAttrs = function (a) {
	return {$: 'ColAttrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAttrs(attrs_);
};
var $aforemny$material_components_web_elm$Material$Theme$background = $elm$html$Html$Attributes$class('mdc-theme--background');
var $aforemny$material_components_web_elm$Material$Typography$caption = $elm$html$Html$Attributes$class('mdc-typography--caption');
var $rundis$elm_bootstrap$Bootstrap$Grid$Column = function (a) {
	return {$: 'Column', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$col = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Column(
			{children: children, options: options});
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $ianmackenzie$elm_units$Constants$second = 1;
var $ianmackenzie$elm_units$Constants$minute = 60 * $ianmackenzie$elm_units$Constants$second;
var $ianmackenzie$elm_units$Constants$hour = 60 * $ianmackenzie$elm_units$Constants$minute;
var $ianmackenzie$elm_units$Duration$inSeconds = function (_v0) {
	var numSeconds = _v0.a;
	return numSeconds;
};
var $ianmackenzie$elm_units$Duration$inHours = function (duration) {
	return $ianmackenzie$elm_units$Duration$inSeconds(duration) / $ianmackenzie$elm_units$Constants$hour;
};
var $ianmackenzie$elm_units$Duration$inMinutes = function (duration) {
	return $ianmackenzie$elm_units$Duration$inSeconds(duration) / 60;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $author$project$BottomToolbar$formattedBoilTime = function (input) {
	if (input.$ === 'Nothing') {
		return '00:00:00';
	} else {
		var boilTime = input.a;
		return ($ianmackenzie$elm_units$Duration$inSeconds(boilTime) > 0) ? (A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				$elm$core$Basics$floor(
					$ianmackenzie$elm_units$Duration$inHours(boilTime)))) + (':' + (A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2(
					$elm$core$Basics$modBy,
					60,
					$elm$core$Basics$floor(
						$ianmackenzie$elm_units$Duration$inMinutes(boilTime))))) + (':' + A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2(
					$elm$core$Basics$modBy,
					60,
					$elm$core$Basics$floor(
						$ianmackenzie$elm_units$Duration$inSeconds(boilTime))))))))) : '00:00:00';
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $aforemny$material_components_web_elm$Material$Typography$headline6 = $elm$html$Html$Attributes$class('mdc-typography--headline6');
var $author$project$BottomToolbar$heaterIndicatorClass = function (heating) {
	return heating ? $elm$html$Html$Attributes$class('varpivo-heater-on') : $elm$html$Html$Attributes$class('varpivo-heater-off');
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0 = $elm$html$Html$Attributes$class('m-0');
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Middle = {$: 'Middle'};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$XS = {$: 'XS'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAlign = function (a) {
	return {$: 'ColAlign', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$VAlign = F2(
	function (screenSize, align) {
		return {align: align, screenSize: screenSize};
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colVAlign = F2(
	function (size, align) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAlign(
			A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$VAlign, size, align));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$colVAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Middle);
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt1 = $elm$html$Html$Attributes$class('mt-1');
var $elm$html$Html$p = _VirtualDom_node('p');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$px3 = $elm$html$Html$Attributes$class('px-3');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Border$right = $elm$html$Html$Attributes$class('border-right');
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col = {$: 'Col'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width = F2(
	function (screenSize, columnCount) {
		return {columnCount: columnCount, screenSize: screenSize};
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColAlign = F2(
	function (align_, options) {
		var _v0 = align_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						alignXs: $elm$core$Maybe$Just(align_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						alignSm: $elm$core$Maybe$Just(align_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						alignMd: $elm$core$Maybe$Just(align_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						alignLg: $elm$core$Maybe$Just(align_)
					});
			default:
				return _Utils_update(
					options,
					{
						alignXl: $elm$core$Maybe$Just(align_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOffset = F2(
	function (offset_, options) {
		var _v0 = offset_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						offsetXs: $elm$core$Maybe$Just(offset_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						offsetSm: $elm$core$Maybe$Just(offset_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						offsetMd: $elm$core$Maybe$Just(offset_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						offsetLg: $elm$core$Maybe$Just(offset_)
					});
			default:
				return _Utils_update(
					options,
					{
						offsetXl: $elm$core$Maybe$Just(offset_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOrder = F2(
	function (order_, options) {
		var _v0 = order_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						orderXs: $elm$core$Maybe$Just(order_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						orderSm: $elm$core$Maybe$Just(order_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						orderMd: $elm$core$Maybe$Just(order_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						orderLg: $elm$core$Maybe$Just(order_)
					});
			default:
				return _Utils_update(
					options,
					{
						orderXl: $elm$core$Maybe$Just(order_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPull = F2(
	function (pull_, options) {
		var _v0 = pull_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						pullXs: $elm$core$Maybe$Just(pull_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						pullSm: $elm$core$Maybe$Just(pull_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						pullMd: $elm$core$Maybe$Just(pull_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						pullLg: $elm$core$Maybe$Just(pull_)
					});
			default:
				return _Utils_update(
					options,
					{
						pullXl: $elm$core$Maybe$Just(pull_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPush = F2(
	function (push_, options) {
		var _v0 = push_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						pushXs: $elm$core$Maybe$Just(push_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						pushSm: $elm$core$Maybe$Just(push_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						pushMd: $elm$core$Maybe$Just(push_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						pushLg: $elm$core$Maybe$Just(push_)
					});
			default:
				return _Utils_update(
					options,
					{
						pushXl: $elm$core$Maybe$Just(push_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColWidth = F2(
	function (width_, options) {
		var _v0 = width_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						widthXs: $elm$core$Maybe$Just(width_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						widthSm: $elm$core$Maybe$Just(width_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						widthMd: $elm$core$Maybe$Just(width_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						widthLg: $elm$core$Maybe$Just(width_)
					});
			default:
				return _Utils_update(
					options,
					{
						widthXl: $elm$core$Maybe$Just(width_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOption = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'ColAttrs':
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
			case 'ColWidth':
				var width_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColWidth, width_, options);
			case 'ColOffset':
				var offset_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOffset, offset_, options);
			case 'ColPull':
				var pull_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPull, pull_, options);
			case 'ColPush':
				var push_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPush, push_, options);
			case 'ColOrder':
				var order_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOrder, order_, options);
			case 'ColAlign':
				var align = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColAlign, align, options);
			default:
				var align = modifier.a;
				return _Utils_update(
					options,
					{
						textAlign: $elm$core$Maybe$Just(align)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$columnCountOption = function (size) {
	switch (size.$) {
		case 'Col':
			return $elm$core$Maybe$Nothing;
		case 'Col1':
			return $elm$core$Maybe$Just('1');
		case 'Col2':
			return $elm$core$Maybe$Just('2');
		case 'Col3':
			return $elm$core$Maybe$Just('3');
		case 'Col4':
			return $elm$core$Maybe$Just('4');
		case 'Col5':
			return $elm$core$Maybe$Just('5');
		case 'Col6':
			return $elm$core$Maybe$Just('6');
		case 'Col7':
			return $elm$core$Maybe$Just('7');
		case 'Col8':
			return $elm$core$Maybe$Just('8');
		case 'Col9':
			return $elm$core$Maybe$Just('9');
		case 'Col10':
			return $elm$core$Maybe$Just('10');
		case 'Col11':
			return $elm$core$Maybe$Just('11');
		case 'Col12':
			return $elm$core$Maybe$Just('12');
		default:
			return $elm$core$Maybe$Just('auto');
	}
};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption = function (size) {
	switch (size.$) {
		case 'XS':
			return $elm$core$Maybe$Nothing;
		case 'SM':
			return $elm$core$Maybe$Just('sm');
		case 'MD':
			return $elm$core$Maybe$Just('md');
		case 'LG':
			return $elm$core$Maybe$Just('lg');
		default:
			return $elm$core$Maybe$Just('xl');
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthClass = function (_v0) {
	var screenSize = _v0.screenSize;
	var columnCount = _v0.columnCount;
	return $elm$html$Html$Attributes$class(
		'col' + (A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return '-' + v;
				},
				$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))) + A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return '-' + v;
				},
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$columnCountOption(columnCount)))));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthsToAttributes = function (widths) {
	var width_ = function (w) {
		return A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthClass, w);
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, width_, widths));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultColOptions = {alignLg: $elm$core$Maybe$Nothing, alignMd: $elm$core$Maybe$Nothing, alignSm: $elm$core$Maybe$Nothing, alignXl: $elm$core$Maybe$Nothing, alignXs: $elm$core$Maybe$Nothing, attributes: _List_Nil, offsetLg: $elm$core$Maybe$Nothing, offsetMd: $elm$core$Maybe$Nothing, offsetSm: $elm$core$Maybe$Nothing, offsetXl: $elm$core$Maybe$Nothing, offsetXs: $elm$core$Maybe$Nothing, orderLg: $elm$core$Maybe$Nothing, orderMd: $elm$core$Maybe$Nothing, orderSm: $elm$core$Maybe$Nothing, orderXl: $elm$core$Maybe$Nothing, orderXs: $elm$core$Maybe$Nothing, pullLg: $elm$core$Maybe$Nothing, pullMd: $elm$core$Maybe$Nothing, pullSm: $elm$core$Maybe$Nothing, pullXl: $elm$core$Maybe$Nothing, pullXs: $elm$core$Maybe$Nothing, pushLg: $elm$core$Maybe$Nothing, pushMd: $elm$core$Maybe$Nothing, pushSm: $elm$core$Maybe$Nothing, pushXl: $elm$core$Maybe$Nothing, pushXs: $elm$core$Maybe$Nothing, textAlign: $elm$core$Maybe$Nothing, widthLg: $elm$core$Maybe$Nothing, widthMd: $elm$core$Maybe$Nothing, widthSm: $elm$core$Maybe$Nothing, widthXl: $elm$core$Maybe$Nothing, widthXs: $elm$core$Maybe$Nothing};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetCountOption = function (size) {
	switch (size.$) {
		case 'Offset0':
			return '0';
		case 'Offset1':
			return '1';
		case 'Offset2':
			return '2';
		case 'Offset3':
			return '3';
		case 'Offset4':
			return '4';
		case 'Offset5':
			return '5';
		case 'Offset6':
			return '6';
		case 'Offset7':
			return '7';
		case 'Offset8':
			return '8';
		case 'Offset9':
			return '9';
		case 'Offset10':
			return '10';
		default:
			return '11';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString = function (screenSize) {
	var _v0 = $rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize);
	if (_v0.$ === 'Just') {
		var s = _v0.a;
		return '-' + (s + '-');
	} else {
		return '-';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetClass = function (_v0) {
	var screenSize = _v0.screenSize;
	var offsetCount = _v0.offsetCount;
	return $elm$html$Html$Attributes$class(
		'offset' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetCountOption(offsetCount)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetsToAttributes = function (offsets) {
	var offset_ = function (m) {
		return A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetClass, m);
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, offset_, offsets));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderColOption = function (size) {
	switch (size.$) {
		case 'OrderFirst':
			return 'first';
		case 'Order1':
			return '1';
		case 'Order2':
			return '2';
		case 'Order3':
			return '3';
		case 'Order4':
			return '4';
		case 'Order5':
			return '5';
		case 'Order6':
			return '6';
		case 'Order7':
			return '7';
		case 'Order8':
			return '8';
		case 'Order9':
			return '9';
		case 'Order10':
			return '10';
		case 'Order11':
			return '11';
		case 'Order12':
			return '12';
		default:
			return 'last';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderToAttributes = function (orders) {
	var order_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class(
					'order' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderColOption(moveCount))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, order_, orders));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption = function (size) {
	switch (size.$) {
		case 'Move0':
			return '0';
		case 'Move1':
			return '1';
		case 'Move2':
			return '2';
		case 'Move3':
			return '3';
		case 'Move4':
			return '4';
		case 'Move5':
			return '5';
		case 'Move6':
			return '6';
		case 'Move7':
			return '7';
		case 'Move8':
			return '8';
		case 'Move9':
			return '9';
		case 'Move10':
			return '10';
		case 'Move11':
			return '11';
		default:
			return '12';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$pullsToAttributes = function (pulls) {
	var pull_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class(
					'pull' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption(moveCount))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, pull_, pulls));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$pushesToAttributes = function (pushes) {
	var push_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class(
					'push' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption(moveCount))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, push_, pushes));
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignDirOption = function (dir) {
	switch (dir.$) {
		case 'Center':
			return 'center';
		case 'Left':
			return 'left';
		default:
			return 'right';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass = function (_v0) {
	var dir = _v0.dir;
	var size = _v0.size;
	return $elm$html$Html$Attributes$class(
		'text' + (A2(
			$elm$core$Maybe$withDefault,
			'-',
			A2(
				$elm$core$Maybe$map,
				function (s) {
					return '-' + (s + '-');
				},
				$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size))) + $rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignDirOption(dir)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$verticalAlignOption = function (align) {
	switch (align.$) {
		case 'Top':
			return 'start';
		case 'Middle':
			return 'center';
		default:
			return 'end';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignClass = F2(
	function (prefix, _v0) {
		var align = _v0.align;
		var screenSize = _v0.screenSize;
		return $elm$html$Html$Attributes$class(
			_Utils_ap(
				prefix,
				_Utils_ap(
					A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function (v) {
								return v + '-';
							},
							$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))),
					$rundis$elm_bootstrap$Bootstrap$Grid$Internal$verticalAlignOption(align))));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes = F2(
	function (prefix, aligns) {
		var align = function (a) {
			return A2(
				$elm$core$Maybe$map,
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignClass(prefix),
				a);
		};
		return A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A2($elm$core$List$map, align, aligns));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOption, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultColOptions, modifiers);
	var shouldAddDefaultXs = !$elm$core$List$length(
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[options.widthXs, options.widthSm, options.widthMd, options.widthLg, options.widthXl])));
	return _Utils_ap(
		$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthsToAttributes(
			_List_fromArray(
				[
					shouldAddDefaultXs ? $elm$core$Maybe$Just(
					A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col)) : options.widthXs,
					options.widthSm,
					options.widthMd,
					options.widthLg,
					options.widthXl
				])),
		_Utils_ap(
			$rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetsToAttributes(
				_List_fromArray(
					[options.offsetXs, options.offsetSm, options.offsetMd, options.offsetLg, options.offsetXl])),
			_Utils_ap(
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$pullsToAttributes(
					_List_fromArray(
						[options.pullXs, options.pullSm, options.pullMd, options.pullLg, options.pullXl])),
				_Utils_ap(
					$rundis$elm_bootstrap$Bootstrap$Grid$Internal$pushesToAttributes(
						_List_fromArray(
							[options.pushXs, options.pushSm, options.pushMd, options.pushLg, options.pushXl])),
					_Utils_ap(
						$rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderToAttributes(
							_List_fromArray(
								[options.orderXs, options.orderSm, options.orderMd, options.orderLg, options.orderXl])),
						_Utils_ap(
							A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes,
								'align-self-',
								_List_fromArray(
									[options.alignXs, options.alignSm, options.alignMd, options.alignLg, options.alignXl])),
							_Utils_ap(
								function () {
									var _v0 = options.textAlign;
									if (_v0.$ === 'Just') {
										var a = _v0.a;
										return _List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass(a)
											]);
									} else {
										return _List_Nil;
									}
								}(),
								options.attributes)))))));
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $rundis$elm_bootstrap$Bootstrap$Grid$renderCol = function (column) {
	switch (column.$) {
		case 'Column':
			var options = column.a.options;
			var children = column.a.children;
			return A2(
				$elm$html$Html$div,
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
				children);
		case 'ColBreak':
			var e = column.a;
			return e;
		default:
			var options = column.a.options;
			var children = column.a.children;
			return A3(
				$elm$html$Html$Keyed$node,
				'div',
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
				children);
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowHAlign = F2(
	function (align, options) {
		var _v0 = align.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						hAlignXs: $elm$core$Maybe$Just(align)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						hAlignSm: $elm$core$Maybe$Just(align)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						hAlignMd: $elm$core$Maybe$Just(align)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						hAlignLg: $elm$core$Maybe$Just(align)
					});
			default:
				return _Utils_update(
					options,
					{
						hAlignXl: $elm$core$Maybe$Just(align)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowVAlign = F2(
	function (align_, options) {
		var _v0 = align_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						vAlignXs: $elm$core$Maybe$Just(align_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						vAlignSm: $elm$core$Maybe$Just(align_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						vAlignMd: $elm$core$Maybe$Just(align_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						vAlignLg: $elm$core$Maybe$Just(align_)
					});
			default:
				return _Utils_update(
					options,
					{
						vAlignXl: $elm$core$Maybe$Just(align_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowOption = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'RowAttrs':
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
			case 'RowVAlign':
				var align = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowVAlign, align, options);
			default:
				var align = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowHAlign, align, options);
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultRowOptions = {attributes: _List_Nil, hAlignLg: $elm$core$Maybe$Nothing, hAlignMd: $elm$core$Maybe$Nothing, hAlignSm: $elm$core$Maybe$Nothing, hAlignXl: $elm$core$Maybe$Nothing, hAlignXs: $elm$core$Maybe$Nothing, vAlignLg: $elm$core$Maybe$Nothing, vAlignMd: $elm$core$Maybe$Nothing, vAlignSm: $elm$core$Maybe$Nothing, vAlignXl: $elm$core$Maybe$Nothing, vAlignXs: $elm$core$Maybe$Nothing};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$horizontalAlignOption = function (align) {
	switch (align.$) {
		case 'Left':
			return 'start';
		case 'Center':
			return 'center';
		case 'Right':
			return 'end';
		case 'Around':
			return 'around';
		default:
			return 'between';
	}
};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$hAlignClass = function (_v0) {
	var align = _v0.align;
	var screenSize = _v0.screenSize;
	return $elm$html$Html$Attributes$class(
		'justify-content-' + (A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return v + '-';
				},
				$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))) + $rundis$elm_bootstrap$Bootstrap$General$Internal$horizontalAlignOption(align)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$hAlignsToAttributes = function (aligns) {
	var align = function (a) {
		return A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$General$Internal$hAlignClass, a);
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, align, aligns));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowOption, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultRowOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('row')
			]),
		_Utils_ap(
			A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes,
				'align-items-',
				_List_fromArray(
					[options.vAlignXs, options.vAlignSm, options.vAlignMd, options.vAlignLg, options.vAlignXl])),
			_Utils_ap(
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$hAlignsToAttributes(
					_List_fromArray(
						[options.hAlignXs, options.hAlignSm, options.hAlignMd, options.hAlignLg, options.hAlignXl])),
				options.attributes)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$row = F2(
	function (options, cols) {
		return A2(
			$elm$html$Html$div,
			$rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes(options),
			A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Grid$renderCol, cols));
	});
var $aforemny$material_components_web_elm$Material$Theme$textSecondaryOnBackground = $elm$html$Html$Attributes$class('mdc-theme--text-secondary-on-background');
var $aforemny$material_components_web_elm$Material$Elevation$z = function (n) {
	return $elm$html$Html$Attributes$class(
		'mdc-elevation--z' + $elm$core$String$fromInt(n));
};
var $aforemny$material_components_web_elm$Material$Elevation$z7 = $aforemny$material_components_web_elm$Material$Elevation$z(7);
var $author$project$BottomToolbar$bottomToolbar = F3(
	function (temperature, boilTime, heating) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Elevation$z7,
					$aforemny$material_components_web_elm$Material$Theme$background,
					$elm$html$Html$Attributes$class('varpivo-bottom-toolbar')
				]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
							_List_fromArray(
								[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$px3]))
						]),
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Border$right]))
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$caption, $aforemny$material_components_web_elm$Material$Theme$textSecondaryOnBackground, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt1]),
									_List_fromArray(
										[
											$elm$html$Html$text('Kettle temp')
										])),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$row,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$col,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[$aforemny$material_components_web_elm$Material$Typography$headline6, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromFloat(temperature) + ' °C')
														]))
												])),
											A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$col,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
													_List_fromArray(
														[
															$aforemny$material_components_web_elm$Material$Typography$headline6,
															$elm$html$Html$Attributes$align('right')
														])),
													$rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$i,
													_List_fromArray(
														[
															$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0,
															$elm$html$Html$Attributes$class('fas'),
															$elm$html$Html$Attributes$class('fa-fire'),
															$author$project$BottomToolbar$heaterIndicatorClass(heating)
														]),
													_List_Nil)
												]))
										]))
								])),
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$caption, $aforemny$material_components_web_elm$Material$Theme$textSecondaryOnBackground, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt1]),
									_List_fromArray(
										[
											$elm$html$Html$text('Remaining boil time')
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$headline6, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$author$project$BottomToolbar$formattedBoilTime(boilTime))
										]))
								]))
						]))
				]));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Snackbar$config = function (_v0) {
	var onClosed = _v0.onClosed;
	return $aforemny$material_components_web_elm$Material$Snackbar$Config(
		{additionalAttributes: _List_Nil, closeOnEscape: false, onClosed: onClosed});
};
var $rundis$elm_bootstrap$Bootstrap$Grid$container = F2(
	function (attributes, children) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				attributes),
			children);
	});
var $author$project$Main$isRecipeSelected = function (model) {
	var _v0 = model.selectedRecipe;
	if (_v0.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Messages$MenuClosed = {$: 'MenuClosed'};
var $author$project$Messages$CancelBrewSession = {$: 'CancelBrewSession'};
var $author$project$Messages$Invite = {$: 'Invite'};
var $aforemny$material_components_web_elm$Material$List$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$List$config = $aforemny$material_components_web_elm$Material$List$Config(
	{additionalAttributes: _List_Nil, avatarList: false, dense: false, nonInteractive: false, twoLine: false, vertical: false, wrapFocus: false});
var $aforemny$material_components_web_elm$Material$List$Item$Internal$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$List$Item$config = $aforemny$material_components_web_elm$Material$List$Item$Internal$Config(
	{
		additionalAttributes: _List_Nil,
		disabled: false,
		href: $elm$core$Maybe$Nothing,
		node: $elm$html$Html$text(''),
		onClick: $elm$core$Maybe$Nothing,
		selection: $elm$core$Maybe$Nothing,
		target: $elm$core$Maybe$Nothing
	});
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $aforemny$material_components_web_elm$Material$List$Divider$listDividerCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-list-divider'));
var $aforemny$material_components_web_elm$Material$List$Divider$group = function (additionalAttributes) {
	return A2(
		$elm$html$Html$hr,
		_Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[$aforemny$material_components_web_elm$Material$List$Divider$listDividerCs])),
			additionalAttributes),
		_List_Nil);
};
var $aforemny$material_components_web_elm$Material$Icon$icon = F2(
	function (additionalAttributes, iconName) {
		return A2(
			$elm$html$Html$i,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('material-icons'),
				additionalAttributes),
			_List_fromArray(
				[
					$elm$html$Html$text(iconName)
				]));
	});
var $aforemny$material_components_web_elm$Material$List$avatarListCs = function (_v0) {
	var avatarList = _v0.a.avatarList;
	return avatarList ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list--avatar-list')) : $elm$core$Maybe$Nothing;
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $aforemny$material_components_web_elm$Material$List$clickHandler = function (listItems) {
	var getOnClick = function (listItem_) {
		switch (listItem_.$) {
			case 'ListItem':
				var onClick = listItem_.a.a.onClick;
				return $elm$core$Maybe$Just(onClick);
			case 'ListItemDivider':
				return $elm$core$Maybe$Nothing;
			default:
				return $elm$core$Maybe$Nothing;
		}
	};
	var nthOnClick = function (index) {
		return A2(
			$elm$core$Maybe$andThen,
			$elm$core$Basics$identity,
			$elm$core$List$head(
				A2(
					$elm$core$List$drop,
					index,
					A2(
						$elm$core$List$filterMap,
						$elm$core$Basics$identity,
						A2($elm$core$List$map, getOnClick, listItems)))));
	};
	var mergedClickHandler = A2(
		$elm$json$Json$Decode$andThen,
		function (index) {
			var _v0 = nthOnClick(index);
			if (_v0.$ === 'Just') {
				var msg_ = _v0.a;
				return $elm$json$Json$Decode$succeed(msg_);
			} else {
				return $elm$json$Json$Decode$fail('');
			}
		},
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['detail', 'index']),
			$elm$json$Json$Decode$int));
	return $elm$core$Maybe$Just(
		A2($elm$html$Html$Events$on, 'MDCList:action', mergedClickHandler));
};
var $aforemny$material_components_web_elm$Material$List$denseCs = function (_v0) {
	var dense = _v0.a.dense;
	return dense ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list--dense')) : $elm$core$Maybe$Nothing;
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $aforemny$material_components_web_elm$Material$List$nonInteractiveCs = function (_v0) {
	var nonInteractive = _v0.a.nonInteractive;
	return nonInteractive ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list--non-interactive')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$List$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-list'));
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$property = $elm$virtual_dom$VirtualDom$property;
var $aforemny$material_components_web_elm$Material$List$selectedIndexProp = function (listItems) {
	var selectedIndex = A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2(
			$elm$core$List$indexedMap,
			F2(
				function (index, listItem_) {
					switch (listItem_.$) {
						case 'ListItem':
							var selection = listItem_.a.a.selection;
							return (!_Utils_eq(selection, $elm$core$Maybe$Nothing)) ? $elm$core$Maybe$Just(index) : $elm$core$Maybe$Nothing;
						case 'ListItemDivider':
							return $elm$core$Maybe$Nothing;
						default:
							return $elm$core$Maybe$Nothing;
					}
				}),
			A2(
				$elm$core$List$filter,
				function (listItem_) {
					switch (listItem_.$) {
						case 'ListItem':
							return true;
						case 'ListItemDivider':
							return false;
						default:
							return false;
					}
				},
				listItems)));
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'selectedIndex',
			A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, selectedIndex)));
};
var $aforemny$material_components_web_elm$Material$List$twoLineCs = function (_v0) {
	var twoLine = _v0.a.twoLine;
	return twoLine ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list--two-line')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$List$wrapFocusProp = function (_v0) {
	var wrapFocus = _v0.a.wrapFocus;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'wrapFocus',
			$elm$json$Json$Encode$bool(wrapFocus)));
};
var $aforemny$material_components_web_elm$Material$List$list = F3(
	function (config_, firstListItem, remainingListItems) {
		var additionalAttributes = config_.a.additionalAttributes;
		var listItems = A2($elm$core$List$cons, firstListItem, remainingListItems);
		return A3(
			$elm$html$Html$node,
			'mdc-list',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$List$rootCs,
							$aforemny$material_components_web_elm$Material$List$nonInteractiveCs(config_),
							$aforemny$material_components_web_elm$Material$List$denseCs(config_),
							$aforemny$material_components_web_elm$Material$List$avatarListCs(config_),
							$aforemny$material_components_web_elm$Material$List$twoLineCs(config_),
							$aforemny$material_components_web_elm$Material$List$wrapFocusProp(config_),
							$aforemny$material_components_web_elm$Material$List$clickHandler(listItems),
							$aforemny$material_components_web_elm$Material$List$selectedIndexProp(listItems)
						])),
				additionalAttributes),
			A2(
				$elm$core$List$map,
				function (listItem_) {
					switch (listItem_.$) {
						case 'ListItem':
							var node = listItem_.a.a.node;
							return node;
						case 'ListItemDivider':
							var node = listItem_.a;
							return node;
						default:
							var node = listItem_.a;
							return node;
					}
				},
				listItems));
	});
var $aforemny$material_components_web_elm$Material$List$Item$Internal$ListItem = function (a) {
	return {$: 'ListItem', a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $aforemny$material_components_web_elm$Material$List$Item$Internal$Activated = {$: 'Activated'};
var $aforemny$material_components_web_elm$Material$List$Item$activatedCs = function (_v0) {
	var selection = _v0.a.selection;
	return _Utils_eq(
		selection,
		$elm$core$Maybe$Just($aforemny$material_components_web_elm$Material$List$Item$Internal$Activated)) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list-item--activated')) : $elm$core$Maybe$Nothing;
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $aforemny$material_components_web_elm$Material$List$Item$ariaSelectedAttr = function (_v0) {
	var selection = _v0.a.selection;
	return (!_Utils_eq(selection, $elm$core$Maybe$Nothing)) ? $elm$core$Maybe$Just(
		A2($elm$html$Html$Attributes$attribute, 'aria-selected', 'true')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$List$Item$disabledCs = function (_v0) {
	var disabled = _v0.a.disabled;
	return disabled ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list-item--disabled')) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $aforemny$material_components_web_elm$Material$List$Item$hrefAttr = function (_v0) {
	var href = _v0.a.href;
	return A2($elm$core$Maybe$map, $elm$html$Html$Attributes$href, href);
};
var $aforemny$material_components_web_elm$Material$List$Item$listItemCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-list-item'));
var $aforemny$material_components_web_elm$Material$List$Item$Internal$Selected = {$: 'Selected'};
var $aforemny$material_components_web_elm$Material$List$Item$selectedCs = function (_v0) {
	var selection = _v0.a.selection;
	return _Utils_eq(
		selection,
		$elm$core$Maybe$Just($aforemny$material_components_web_elm$Material$List$Item$Internal$Selected)) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-list-item--selected')) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $aforemny$material_components_web_elm$Material$List$Item$targetAttr = function (_v0) {
	var href = _v0.a.href;
	var target = _v0.a.target;
	return (!_Utils_eq(href, $elm$core$Maybe$Nothing)) ? A2($elm$core$Maybe$map, $elm$html$Html$Attributes$target, target) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$List$Item$listItemView = F2(
	function (config_, nodes) {
		var additionalAttributes = config_.a.additionalAttributes;
		var href = config_.a.href;
		return function (attributes) {
			return (!_Utils_eq(href, $elm$core$Maybe$Nothing)) ? A3(
				$elm$html$Html$node,
				'mdc-list-item',
				_List_Nil,
				_List_fromArray(
					[
						A2($elm$html$Html$a, attributes, nodes)
					])) : A3($elm$html$Html$node, 'mdc-list-item', attributes, nodes);
		}(
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$List$Item$listItemCs,
							$aforemny$material_components_web_elm$Material$List$Item$hrefAttr(config_),
							$aforemny$material_components_web_elm$Material$List$Item$targetAttr(config_),
							$aforemny$material_components_web_elm$Material$List$Item$disabledCs(config_),
							$aforemny$material_components_web_elm$Material$List$Item$selectedCs(config_),
							$aforemny$material_components_web_elm$Material$List$Item$activatedCs(config_),
							$aforemny$material_components_web_elm$Material$List$Item$ariaSelectedAttr(config_)
						])),
				additionalAttributes));
	});
var $aforemny$material_components_web_elm$Material$List$Item$listItem = F2(
	function (_v0, nodes) {
		var config_ = _v0.a;
		var additionalAttributes = config_.additionalAttributes;
		var href = config_.href;
		return $aforemny$material_components_web_elm$Material$List$Item$Internal$ListItem(
			$aforemny$material_components_web_elm$Material$List$Item$Internal$Config(
				_Utils_update(
					config_,
					{
						node: A2(
							$aforemny$material_components_web_elm$Material$List$Item$listItemView,
							$aforemny$material_components_web_elm$Material$List$Item$Internal$Config(config_),
							nodes)
					})));
	});
var $aforemny$material_components_web_elm$Material$List$Item$meta = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-list-item__meta'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$List$Item$setOnClick = F2(
	function (onClick, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$List$Item$Internal$Config(
			_Utils_update(
				config_,
				{
					onClick: $elm$core$Maybe$Just(onClick)
				}));
	});
var $aforemny$material_components_web_elm$Material$List$setWrapFocus = F2(
	function (wrapFocus, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$List$Config(
			_Utils_update(
				config_,
				{wrapFocus: wrapFocus}));
	});
var $aforemny$material_components_web_elm$Material$List$listGroupSubheaderCs = $elm$html$Html$Attributes$class('mdc-list-group__subheader');
var $elm$html$Html$span = _VirtualDom_node('span');
var $aforemny$material_components_web_elm$Material$List$subheader = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$span,
			A2($elm$core$List$cons, $aforemny$material_components_web_elm$Material$List$listGroupSubheaderCs, additionalAttributes),
			nodes);
	});
var $author$project$Menu$brewSessionGroup = function (activeBrewSession) {
	return _List_fromArray(
		[
			$aforemny$material_components_web_elm$Material$List$Divider$group(_List_Nil),
			A2(
			$aforemny$material_components_web_elm$Material$List$subheader,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Brew Session')
				])),
			A3(
			$aforemny$material_components_web_elm$Material$List$list,
			A2($aforemny$material_components_web_elm$Material$List$setWrapFocus, true, $aforemny$material_components_web_elm$Material$List$config),
			A2(
				$aforemny$material_components_web_elm$Material$List$Item$listItem,
				A2(
					$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
					$author$project$Messages$ShowDialog($author$project$Messages$Invite),
					$aforemny$material_components_web_elm$Material$List$Item$config),
				_List_fromArray(
					[
						$elm$html$Html$text('Invite friends'),
						A2(
						$aforemny$material_components_web_elm$Material$List$Item$meta,
						_List_Nil,
						_List_fromArray(
							[
								A2($aforemny$material_components_web_elm$Material$Icon$icon, _List_Nil, 'person_add')
							]))
					])),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$aforemny$material_components_web_elm$Material$List$Item$listItem,
						A2(
							$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
							$author$project$Messages$NavigateTo(
								_Utils_Tuple2(
									_List_fromArray(
										['import']),
									_List_Nil)),
							$aforemny$material_components_web_elm$Material$List$Item$config),
						_List_fromArray(
							[
								$elm$html$Html$text('Import recipe'),
								A2(
								$aforemny$material_components_web_elm$Material$List$Item$meta,
								_List_Nil,
								_List_fromArray(
									[
										A2($aforemny$material_components_web_elm$Material$Icon$icon, _List_Nil, 'assignment_returned')
									]))
							]))
					]),
				activeBrewSession ? _List_fromArray(
					[
						A2(
						$aforemny$material_components_web_elm$Material$List$Item$listItem,
						A2(
							$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
							$author$project$Messages$ShowDialog(
								$author$project$Messages$Confirm(
									_Utils_Tuple2('Do you really want to discard current brew session? This can\'t be undone!', $author$project$Messages$CancelBrewSession))),
							$aforemny$material_components_web_elm$Material$List$Item$config),
						_List_fromArray(
							[
								$elm$html$Html$text('Cancel brewing'),
								A2(
								$aforemny$material_components_web_elm$Material$List$Item$meta,
								_List_Nil,
								_List_fromArray(
									[
										A2($aforemny$material_components_web_elm$Material$Icon$icon, _List_Nil, 'delete')
									]))
							]))
					]) : _List_Nil))
		]);
};
var $aforemny$material_components_web_elm$Material$Drawer$Modal$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Drawer$Modal$config = $aforemny$material_components_web_elm$Material$Drawer$Modal$Config(
	{additionalAttributes: _List_Nil, onClose: $elm$core$Maybe$Nothing, open: false});
var $aforemny$material_components_web_elm$Material$IconButton$Internal$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$IconButton$config = $aforemny$material_components_web_elm$Material$IconButton$Internal$Config(
	{additionalAttributes: _List_Nil, disabled: false, label: $elm$core$Maybe$Nothing, onClick: $elm$core$Maybe$Nothing});
var $aforemny$material_components_web_elm$Material$Drawer$Modal$content = F2(
	function (attributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-drawer__content'),
				attributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$Drawer$Modal$closeHandler = function (_v0) {
	var onClose = _v0.a.onClose;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Events$on('MDCDrawer:close'),
			$elm$json$Json$Decode$succeed),
		onClose);
};
var $aforemny$material_components_web_elm$Material$Drawer$Modal$modalCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-drawer--modal'));
var $aforemny$material_components_web_elm$Material$Drawer$Modal$openProp = function (_v0) {
	var open = _v0.a.open;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'open',
			$elm$json$Json$Encode$bool(open)));
};
var $aforemny$material_components_web_elm$Material$Drawer$Modal$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-drawer'));
var $aforemny$material_components_web_elm$Material$Drawer$Modal$drawer = F2(
	function (config_, nodes) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-drawer',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Drawer$Modal$rootCs,
							$aforemny$material_components_web_elm$Material$Drawer$Modal$modalCs,
							$aforemny$material_components_web_elm$Material$Drawer$Modal$openProp(config_),
							$aforemny$material_components_web_elm$Material$Drawer$Modal$closeHandler(config_)
						])),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$List$listGroupCs = $elm$html$Html$Attributes$class('mdc-list-group');
var $aforemny$material_components_web_elm$Material$List$group = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2($elm$core$List$cons, $aforemny$material_components_web_elm$Material$List$listGroupCs, additionalAttributes),
			nodes);
	});
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$h6 = _VirtualDom_node('h6');
var $aforemny$material_components_web_elm$Material$Drawer$Modal$header = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-drawer__header'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$IconButton$Internal$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var $aforemny$material_components_web_elm$Material$IconButton$customIcon = F3(
	function (node, attributes, nodes) {
		return $aforemny$material_components_web_elm$Material$IconButton$Internal$Icon(
			{attributes: attributes, node: node, nodes: nodes});
	});
var $aforemny$material_components_web_elm$Material$IconButton$icon = function (iconName) {
	return A3(
		$aforemny$material_components_web_elm$Material$IconButton$customIcon,
		$elm$html$Html$i,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('material-icons')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(iconName)
			]));
};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $aforemny$material_components_web_elm$Material$IconButton$clickHandler = function (_v0) {
	var onClick = _v0.a.onClick;
	return A2($elm$core$Maybe$map, $elm$html$Html$Events$onClick, onClick);
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $aforemny$material_components_web_elm$Material$IconButton$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-icon-button'));
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $aforemny$material_components_web_elm$Material$IconButton$tabIndexProp = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$tabindex(0));
var $aforemny$material_components_web_elm$Material$IconButton$iconButton = F2(
	function (config_, icon_) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-icon-button',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$IconButton$rootCs,
							$aforemny$material_components_web_elm$Material$IconButton$tabIndexProp,
							$aforemny$material_components_web_elm$Material$IconButton$clickHandler(config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$map,
					$elm$core$Basics$never,
					function () {
						if (icon_.$ === 'Icon') {
							var node = icon_.a.node;
							var attributes = icon_.a.attributes;
							var nodes = icon_.a.nodes;
							return A2(
								node,
								A2(
									$elm$core$List$cons,
									$elm$html$Html$Attributes$class('mdc-icon-button__icon'),
									attributes),
								nodes);
						} else {
							var node = icon_.a.node;
							var attributes = icon_.a.attributes;
							var nodes = icon_.a.nodes;
							return A2(
								node,
								A2(
									$elm$core$List$cons,
									$elm$svg$Svg$Attributes$class('mdc-icon-button__icon'),
									attributes),
								nodes);
						}
					}())
				]));
	});
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0 = $elm$html$Html$Attributes$class('p-0');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr0 = $elm$html$Html$Attributes$class('pr-0');
var $author$project$Messages$Calibration = {$: 'Calibration'};
var $author$project$Messages$Scale = {$: 'Scale'};
var $author$project$Menu$scaleGroup = _List_fromArray(
	[
		$aforemny$material_components_web_elm$Material$List$Divider$group(_List_Nil),
		A2(
		$aforemny$material_components_web_elm$Material$List$subheader,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text('Scale')
			])),
		A3(
		$aforemny$material_components_web_elm$Material$List$list,
		A2($aforemny$material_components_web_elm$Material$List$setWrapFocus, true, $aforemny$material_components_web_elm$Material$List$config),
		A2(
			$aforemny$material_components_web_elm$Material$List$Item$listItem,
			A2(
				$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
				$author$project$Messages$ShowDialog($author$project$Messages$Scale),
				$aforemny$material_components_web_elm$Material$List$Item$config),
			_List_fromArray(
				[
					$elm$html$Html$text('Mini scale'),
					A2(
					$aforemny$material_components_web_elm$Material$List$Item$meta,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fas'),
									$elm$html$Html$Attributes$class('fa-balance-scale-right')
								]),
							_List_Nil)
						]))
				])),
		_List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$List$Item$listItem,
				A2(
					$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
					$author$project$Messages$ShowDialog($author$project$Messages$Calibration),
					$aforemny$material_components_web_elm$Material$List$Item$config),
				_List_fromArray(
					[
						$elm$html$Html$text('Calibrate scale'),
						A2(
						$aforemny$material_components_web_elm$Material$List$Item$meta,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('fas'),
										$elm$html$Html$Attributes$class('fa-balance-scale')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$aforemny$material_components_web_elm$Material$List$Item$listItem,
				A2(
					$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
					$author$project$Messages$NavigateTo(
						_Utils_Tuple2(
							_List_fromArray(
								['scale']),
							_List_Nil)),
					$aforemny$material_components_web_elm$Material$List$Item$config),
				_List_fromArray(
					[
						$elm$html$Html$text('Scale'),
						A2(
						$aforemny$material_components_web_elm$Material$List$Item$meta,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('fas'),
										$elm$html$Html$Attributes$class('fa-balance-scale-left')
									]),
								_List_Nil)
							]))
					]))
			]))
	]);
var $aforemny$material_components_web_elm$Material$Drawer$Modal$scrim = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-drawer-scrim'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$IconButton$setOnClick = F2(
	function (onClick, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$IconButton$Internal$Config(
			_Utils_update(
				config_,
				{
					onClick: $elm$core$Maybe$Just(onClick)
				}));
	});
var $aforemny$material_components_web_elm$Material$Drawer$Modal$setOnClose = F2(
	function (onClose, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Drawer$Modal$Config(
			_Utils_update(
				config_,
				{
					onClose: $elm$core$Maybe$Just(onClose)
				}));
	});
var $aforemny$material_components_web_elm$Material$Drawer$Modal$setOpen = F2(
	function (open, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Drawer$Modal$Config(
			_Utils_update(
				config_,
				{open: open}));
	});
var $author$project$Menu$settingsGroup = function (brewSessionCodeValid) {
	return _List_fromArray(
		[
			$aforemny$material_components_web_elm$Material$List$Divider$group(_List_Nil),
			A2(
			$aforemny$material_components_web_elm$Material$List$subheader,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Settings')
				])),
			A3(
			$aforemny$material_components_web_elm$Material$List$list,
			A2($aforemny$material_components_web_elm$Material$List$setWrapFocus, true, $aforemny$material_components_web_elm$Material$List$config),
			A2(
				$aforemny$material_components_web_elm$Material$List$Item$listItem,
				A2(
					$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
					$author$project$Messages$NavigateTo(
						_Utils_Tuple2(
							_List_fromArray(
								['connections']),
							_List_Nil)),
					$aforemny$material_components_web_elm$Material$List$Item$config),
				_List_fromArray(
					[
						$elm$html$Html$text('Manage connections'),
						A2(
						$aforemny$material_components_web_elm$Material$List$Item$meta,
						_List_Nil,
						_List_fromArray(
							[
								A2($aforemny$material_components_web_elm$Material$Icon$icon, _List_Nil, 'wifi')
							]))
					])),
			_List_fromArray(
				[
					A2(
					$aforemny$material_components_web_elm$Material$List$Item$listItem,
					A2(
						$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
						$author$project$Messages$ShowDialog($author$project$Messages$Security),
						$aforemny$material_components_web_elm$Material$List$Item$config),
					_List_fromArray(
						[
							$elm$html$Html$text('Edit brew session key'),
							A2(
							$aforemny$material_components_web_elm$Material$List$Item$meta,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$aforemny$material_components_web_elm$Material$Icon$icon,
									_List_Nil,
									brewSessionCodeValid ? 'verified_user' : 'vpn_key')
								]))
						]))
				]))
		]);
};
var $aforemny$material_components_web_elm$Material$Drawer$Modal$subtitle = $elm$html$Html$Attributes$class('mdc-drawer__subtitle');
var $author$project$Menu$subtitle = function (model) {
	return $elm$html$Html$text(
		function () {
			var _v0 = model.selectedRecipe;
			if (_v0.$ === 'Just') {
				var recipe = _v0.a;
				return 'Brewing ' + recipe.name;
			} else {
				var _v1 = model.apiBaseUrl;
				if (_v1 === '') {
					return 'Not connected';
				} else {
					var url = _v1;
					return url;
				}
			}
		}());
};
var $aforemny$material_components_web_elm$Material$Drawer$Modal$title = $elm$html$Html$Attributes$class('mdc-drawer__title');
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAuto = {$: 'ColAuto'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColWidth = function (a) {
	return {$: 'ColWidth', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$width = F2(
	function (size, count) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColWidth(
			A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width, size, count));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xsAuto = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAuto);
var $author$project$Menu$menuDrawer = F2(
	function (model, activeBrewSession) {
		return _List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$Drawer$Modal$drawer,
				A2(
					$aforemny$material_components_web_elm$Material$Drawer$Modal$setOnClose,
					$author$project$Messages$MenuClosed,
					A2($aforemny$material_components_web_elm$Material$Drawer$Modal$setOpen, model.menuOpened, $aforemny$material_components_web_elm$Material$Drawer$Modal$config)),
				_List_fromArray(
					[
						A2(
						$aforemny$material_components_web_elm$Material$Drawer$Modal$header,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$row,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
												_List_fromArray(
													[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr0]))
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$h3,
												_List_fromArray(
													[$aforemny$material_components_web_elm$Material$Drawer$Modal$title]),
												_List_fromArray(
													[
														$elm$html$Html$text('Var:Pivo')
													]))
											])),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Grid$Col$xsAuto,
												$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0,
														$elm$html$Html$Attributes$align('center')
													])),
												$rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs
											]),
										_List_fromArray(
											[
												A2(
												$aforemny$material_components_web_elm$Material$IconButton$iconButton,
												A2($aforemny$material_components_web_elm$Material$IconButton$setOnClick, $author$project$Messages$MenuClosed, $aforemny$material_components_web_elm$Material$IconButton$config),
												$aforemny$material_components_web_elm$Material$IconButton$icon('close'))
											]))
									])),
								A2(
								$elm$html$Html$h6,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Drawer$Modal$subtitle]),
								_List_fromArray(
									[
										$author$project$Menu$subtitle(model)
									]))
							])),
						A2(
						$aforemny$material_components_web_elm$Material$Drawer$Modal$content,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$aforemny$material_components_web_elm$Material$List$group,
								_List_Nil,
								_Utils_ap(
									$author$project$Menu$brewSessionGroup(activeBrewSession),
									_Utils_ap(
										$author$project$Menu$scaleGroup,
										$author$project$Menu$settingsGroup(model.security.valid))))
							]))
					])),
				A2($aforemny$material_components_web_elm$Material$Drawer$Modal$scrim, _List_Nil, _List_Nil)
			]);
	});
var $author$project$Messages$MenuOpened = {$: 'MenuOpened'};
var $aforemny$material_components_web_elm$Material$TopAppBar$alignEnd = $elm$html$Html$Attributes$class('mdc-top-app-bar__section--align-end');
var $aforemny$material_components_web_elm$Material$TopAppBar$alignStart = $elm$html$Html$Attributes$class('mdc-top-app-bar__section--align-start');
var $aforemny$material_components_web_elm$Material$Button$Internal$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Button$config = $aforemny$material_components_web_elm$Material$Button$Internal$Config(
	{additionalAttributes: _List_Nil, dense: false, disabled: false, href: $elm$core$Maybe$Nothing, icon: $elm$core$Maybe$Nothing, onClick: $elm$core$Maybe$Nothing, target: $elm$core$Maybe$Nothing, touch: true, trailingIcon: false});
var $aforemny$material_components_web_elm$Material$TopAppBar$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$TopAppBar$config = $aforemny$material_components_web_elm$Material$TopAppBar$Config(
	{additionalAttributes: _List_Nil, dense: false, fixed: false});
var $aforemny$material_components_web_elm$Material$TopAppBar$navigationIcon = $elm$html$Html$Attributes$class('mdc-top-app-bar__navigation-icon');
var $aforemny$material_components_web_elm$Material$Theme$onPrimary = $elm$html$Html$Attributes$class('mdc-theme--on-primary');
var $aforemny$material_components_web_elm$Material$TopAppBar$Regular = {$: 'Regular'};
var $aforemny$material_components_web_elm$Material$TopAppBar$denseCs = function (_v0) {
	var dense = _v0.a.dense;
	return dense ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-top-app-bar--dense')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TopAppBar$fixedCs = function (_v0) {
	var fixed = _v0.a.fixed;
	return fixed ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-top-app-bar--fixed')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TopAppBar$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-top-app-bar'));
var $aforemny$material_components_web_elm$Material$TopAppBar$variantCs = function (variant) {
	switch (variant.$) {
		case 'Regular':
			return $elm$core$Maybe$Nothing;
		case 'Short':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-top-app-bar--short'));
		case 'ShortCollapsed':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-top-app-bar--short mdc-top-app-bar--short-collapsed'));
		default:
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-top-app-bar--prominent'));
	}
};
var $aforemny$material_components_web_elm$Material$TopAppBar$genericTopAppBar = F3(
	function (variant, config_, nodes) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-top-app-bar',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$TopAppBar$rootCs,
							$aforemny$material_components_web_elm$Material$TopAppBar$variantCs(variant),
							$aforemny$material_components_web_elm$Material$TopAppBar$denseCs(config_),
							$aforemny$material_components_web_elm$Material$TopAppBar$fixedCs(config_)
						])),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$TopAppBar$regular = F2(
	function (config_, nodes) {
		return A3($aforemny$material_components_web_elm$Material$TopAppBar$genericTopAppBar, $aforemny$material_components_web_elm$Material$TopAppBar$Regular, config_, nodes);
	});
var $elm$html$Html$section = _VirtualDom_node('section');
var $aforemny$material_components_web_elm$Material$TopAppBar$row = F2(
	function (attributes, nodes) {
		return A2(
			$elm$html$Html$section,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-top-app-bar__row')
					]),
				attributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$TopAppBar$section = F2(
	function (attributes, nodes) {
		return A2(
			$elm$html$Html$section,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-top-app-bar__section')
					]),
				attributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$Button$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Button$Internal$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$IconButton$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$IconButton$Internal$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Button$setOnClick = F2(
	function (onClick, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Button$Internal$Config(
			_Utils_update(
				config_,
				{
					onClick: $elm$core$Maybe$Just(onClick)
				}));
	});
var $aforemny$material_components_web_elm$Material$Menu$surfaceAnchor = $elm$html$Html$Attributes$class('mdc-menu-surface--anchor');
var $aforemny$material_components_web_elm$Material$Button$Text = {$: 'Text'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $aforemny$material_components_web_elm$Material$Button$clickHandler = function (_v0) {
	var onClick = _v0.a.onClick;
	return A2($elm$core$Maybe$map, $elm$html$Html$Events$onClick, onClick);
};
var $aforemny$material_components_web_elm$Material$Button$denseCs = function (_v0) {
	var dense = _v0.a.dense;
	return dense ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-button--dense')) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $aforemny$material_components_web_elm$Material$Button$disabledAttr = function (_v0) {
	var disabled = _v0.a.disabled;
	return $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$disabled(disabled));
};
var $aforemny$material_components_web_elm$Material$Button$disabledProp = function (_v0) {
	var disabled = _v0.a.disabled;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'disabled',
			$elm$json$Json$Encode$bool(disabled)));
};
var $aforemny$material_components_web_elm$Material$Button$hrefAttr = function (_v0) {
	var href = _v0.a.href;
	return A2($elm$core$Maybe$map, $elm$html$Html$Attributes$href, href);
};
var $aforemny$material_components_web_elm$Material$Button$labelElt = function (label) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-button__label')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				])));
};
var $aforemny$material_components_web_elm$Material$Button$iconElt = function (_v0) {
	var config_ = _v0.a;
	return A2(
		$elm$core$Maybe$map,
		$elm$html$Html$map($elm$core$Basics$never),
		function () {
			var _v1 = config_.icon;
			if (_v1.$ === 'Just') {
				if (_v1.a.$ === 'Icon') {
					var node = _v1.a.a.node;
					var attributes = _v1.a.a.attributes;
					var nodes = _v1.a.a.nodes;
					return $elm$core$Maybe$Just(
						A2(
							node,
							A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$class('mdc-button__icon'),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									attributes)),
							nodes));
				} else {
					var node = _v1.a.a.node;
					var attributes = _v1.a.a.attributes;
					var nodes = _v1.a.a.nodes;
					return $elm$core$Maybe$Just(
						A2(
							node,
							A2(
								$elm$core$List$cons,
								$elm$svg$Svg$Attributes$class('mdc-button__icon'),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									attributes)),
							nodes));
				}
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $aforemny$material_components_web_elm$Material$Button$leadingIconElt = function (config_) {
	var trailingIcon = config_.a.trailingIcon;
	return (!trailingIcon) ? $aforemny$material_components_web_elm$Material$Button$iconElt(config_) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Button$rippleElt = $elm$core$Maybe$Just(
	A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-button__ripple')
			]),
		_List_Nil));
var $aforemny$material_components_web_elm$Material$Button$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-button'));
var $aforemny$material_components_web_elm$Material$Button$tabIndexProp = function (_v0) {
	var disabled = _v0.a.disabled;
	return disabled ? $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'tabIndex',
			$elm$json$Json$Encode$int(-1))) : $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'tabIndex',
			$elm$json$Json$Encode$int(0)));
};
var $aforemny$material_components_web_elm$Material$Button$targetAttr = function (_v0) {
	var href = _v0.a.href;
	var target = _v0.a.target;
	return (!_Utils_eq(href, $elm$core$Maybe$Nothing)) ? A2($elm$core$Maybe$map, $elm$html$Html$Attributes$target, target) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Button$touchCs = function (_v0) {
	var touch = _v0.a.touch;
	return touch ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-button--touch')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Button$touchElt = function (_v0) {
	var touch = _v0.a.touch;
	return touch ? $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-button__touch')
				]),
			_List_Nil)) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Button$trailingIconElt = function (config_) {
	var trailingIcon = config_.a.trailingIcon;
	return trailingIcon ? $aforemny$material_components_web_elm$Material$Button$iconElt(config_) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Button$variantCs = function (variant) {
	switch (variant.$) {
		case 'Text':
			return $elm$core$Maybe$Nothing;
		case 'Raised':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-button--raised'));
		case 'Unelevated':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-button--unelevated'));
		default:
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-button--outlined'));
	}
};
var $aforemny$material_components_web_elm$Material$Button$button = F3(
	function (variant, config_, label) {
		var additionalAttributes = config_.a.additionalAttributes;
		var touch = config_.a.touch;
		var href = config_.a.href;
		var wrapTouch = function (node) {
			return touch ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-touch-target-wrapper')
					]),
				_List_fromArray(
					[node])) : node;
		};
		return wrapTouch(
			A3(
				$elm$html$Html$node,
				'mdc-button',
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Button$disabledProp(config_)
						])),
				_List_fromArray(
					[
						A2(
						(!_Utils_eq(href, $elm$core$Maybe$Nothing)) ? $elm$html$Html$a : $elm$html$Html$button,
						_Utils_ap(
							A2(
								$elm$core$List$filterMap,
								$elm$core$Basics$identity,
								_List_fromArray(
									[
										$aforemny$material_components_web_elm$Material$Button$rootCs,
										$aforemny$material_components_web_elm$Material$Button$variantCs(variant),
										$aforemny$material_components_web_elm$Material$Button$denseCs(config_),
										$aforemny$material_components_web_elm$Material$Button$touchCs(config_),
										$aforemny$material_components_web_elm$Material$Button$disabledAttr(config_),
										$aforemny$material_components_web_elm$Material$Button$tabIndexProp(config_),
										$aforemny$material_components_web_elm$Material$Button$hrefAttr(config_),
										$aforemny$material_components_web_elm$Material$Button$targetAttr(config_),
										$aforemny$material_components_web_elm$Material$Button$clickHandler(config_)
									])),
							additionalAttributes),
						A2(
							$elm$core$List$filterMap,
							$elm$core$Basics$identity,
							_List_fromArray(
								[
									$aforemny$material_components_web_elm$Material$Button$rippleElt,
									$aforemny$material_components_web_elm$Material$Button$leadingIconElt(config_),
									$aforemny$material_components_web_elm$Material$Button$labelElt(label),
									$aforemny$material_components_web_elm$Material$Button$trailingIconElt(config_),
									$aforemny$material_components_web_elm$Material$Button$touchElt(config_)
								])))
					])));
	});
var $aforemny$material_components_web_elm$Material$Button$text = F2(
	function (config_, label) {
		return A3($aforemny$material_components_web_elm$Material$Button$button, $aforemny$material_components_web_elm$Material$Button$Text, config_, label);
	});
var $aforemny$material_components_web_elm$Material$TopAppBar$title = $elm$html$Html$Attributes$class('mdc-top-app-bar__title');
var $aforemny$material_components_web_elm$Material$Elevation$z8 = $aforemny$material_components_web_elm$Material$Elevation$z(8);
var $author$project$Navbar$navbar = F3(
	function (title, showRecipeButton, brewSessionCodeValid) {
		return A2(
			$aforemny$material_components_web_elm$Material$TopAppBar$regular,
			$aforemny$material_components_web_elm$Material$TopAppBar$config,
			_List_fromArray(
				[
					A2(
					$aforemny$material_components_web_elm$Material$TopAppBar$row,
					_List_fromArray(
						[$aforemny$material_components_web_elm$Material$Elevation$z8]),
					_List_fromArray(
						[
							A2(
							$aforemny$material_components_web_elm$Material$TopAppBar$section,
							_List_fromArray(
								[$aforemny$material_components_web_elm$Material$TopAppBar$alignStart, $aforemny$material_components_web_elm$Material$TopAppBar$title]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$aforemny$material_components_web_elm$Material$Button$text,
											A2(
												$aforemny$material_components_web_elm$Material$Button$setAttributes,
												_List_fromArray(
													[$aforemny$material_components_web_elm$Material$Theme$onPrimary]),
												A2(
													$aforemny$material_components_web_elm$Material$Button$setOnClick,
													$author$project$Messages$NavigateTo(
														_Utils_Tuple2(_List_Nil, _List_Nil)),
													$aforemny$material_components_web_elm$Material$Button$config)),
											title)
										]))
								])),
							A2(
							$aforemny$material_components_web_elm$Material$TopAppBar$section,
							_List_fromArray(
								[$aforemny$material_components_web_elm$Material$TopAppBar$alignEnd, $aforemny$material_components_web_elm$Material$Menu$surfaceAnchor]),
							_List_fromArray(
								[
									A2(
									$aforemny$material_components_web_elm$Material$IconButton$iconButton,
									A2(
										$aforemny$material_components_web_elm$Material$IconButton$setAttributes,
										_List_fromArray(
											[$aforemny$material_components_web_elm$Material$TopAppBar$navigationIcon]),
										A2(
											$aforemny$material_components_web_elm$Material$IconButton$setOnClick,
											$author$project$Messages$ShowDialog($author$project$Messages$Security),
											$aforemny$material_components_web_elm$Material$IconButton$config)),
									$aforemny$material_components_web_elm$Material$IconButton$icon(
										brewSessionCodeValid ? 'verified_user' : 'vpn_key')),
									showRecipeButton ? A2(
									$aforemny$material_components_web_elm$Material$IconButton$iconButton,
									A2(
										$aforemny$material_components_web_elm$Material$IconButton$setAttributes,
										_List_fromArray(
											[$aforemny$material_components_web_elm$Material$TopAppBar$navigationIcon]),
										A2(
											$aforemny$material_components_web_elm$Material$IconButton$setOnClick,
											$author$project$Messages$NavigateTo(
												_Utils_Tuple2(
													_List_fromArray(
														['recipe']),
													_List_Nil)),
											$aforemny$material_components_web_elm$Material$IconButton$config)),
									$aforemny$material_components_web_elm$Material$IconButton$icon('menu_book')) : A2($elm$html$Html$div, _List_Nil, _List_Nil),
									A2(
									$aforemny$material_components_web_elm$Material$IconButton$iconButton,
									A2(
										$aforemny$material_components_web_elm$Material$IconButton$setOnClick,
										$author$project$Messages$MenuOpened,
										A2(
											$aforemny$material_components_web_elm$Material$IconButton$setAttributes,
											_List_fromArray(
												[$aforemny$material_components_web_elm$Material$TopAppBar$navigationIcon]),
											$aforemny$material_components_web_elm$Material$IconButton$config)),
									$aforemny$material_components_web_elm$Material$IconButton$icon('menu'))
								]))
						]))
				]));
	});
var $author$project$Messages$BFImportInput = function (a) {
	return {$: 'BFImportInput', a: a};
};
var $author$project$Messages$ImportRecipe = function (a) {
	return {$: 'ImportRecipe', a: a};
};
var $author$project$Messages$ToggleRecipeAdd = {$: 'ToggleRecipeAdd'};
var $author$project$Messages$ToggleRecipeReplace = {$: 'ToggleRecipeReplace'};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter = $elm$html$Html$Attributes$class('align-items-center');
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block = $elm$html$Html$Attributes$class('d-flex');
var $aforemny$material_components_web_elm$Material$Typography$body1 = $elm$html$Html$Attributes$class('mdc-typography--body1');
var $aforemny$material_components_web_elm$Material$CircularProgress$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$CircularProgress$Large = {$: 'Large'};
var $aforemny$material_components_web_elm$Material$CircularProgress$config = $aforemny$material_components_web_elm$Material$CircularProgress$Config(
	{additionalAttributes: _List_Nil, closed: false, fourColored: false, label: $elm$core$Maybe$Nothing, size: $aforemny$material_components_web_elm$Material$CircularProgress$Large});
var $aforemny$material_components_web_elm$Material$HelperText$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$HelperText$config = $aforemny$material_components_web_elm$Material$HelperText$Config(
	{additionalAttributes: _List_Nil, persistent: false, validation: true});
var $aforemny$material_components_web_elm$Material$Switch$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Switch$config = $aforemny$material_components_web_elm$Material$Switch$Config(
	{additionalAttributes: _List_Nil, checked: false, disabled: false, onChange: $elm$core$Maybe$Nothing});
var $aforemny$material_components_web_elm$Material$TextField$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$TextField$config = $aforemny$material_components_web_elm$Material$TextField$Config(
	{additionalAttributes: _List_Nil, disabled: false, endAligned: false, fullwidth: false, label: $elm$core$Maybe$Nothing, leadingIcon: $elm$core$Maybe$Nothing, max: $elm$core$Maybe$Nothing, maxLength: $elm$core$Maybe$Nothing, min: $elm$core$Maybe$Nothing, minLength: $elm$core$Maybe$Nothing, onChange: $elm$core$Maybe$Nothing, onInput: $elm$core$Maybe$Nothing, pattern: $elm$core$Maybe$Nothing, placeholder: $elm$core$Maybe$Nothing, prefix: $elm$core$Maybe$Nothing, required: false, step: $elm$core$Maybe$Nothing, suffix: $elm$core$Maybe$Nothing, trailingIcon: $elm$core$Maybe$Nothing, type_: $elm$core$Maybe$Nothing, valid: true, value: $elm$core$Maybe$Nothing});
var $aforemny$material_components_web_elm$Material$TextField$disabledCs = function (_v0) {
	var disabled = _v0.a.disabled;
	return disabled ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--disabled')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$disabledProp = function (_v0) {
	var disabled = _v0.a.disabled;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'disabled',
			$elm$json$Json$Encode$bool(disabled)));
};
var $aforemny$material_components_web_elm$Material$TextField$endAlignedCs = function (_v0) {
	var endAligned = _v0.a.endAligned;
	return endAligned ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--end-aligned')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$filledCs = function (outlined_) {
	return (!outlined_) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--filled')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$foucClassNamesProp = $elm$core$Maybe$Just(
	A2(
		$elm$html$Html$Attributes$property,
		'foucClassNames',
		A2(
			$elm$json$Json$Encode$list,
			$elm$json$Json$Encode$string,
			_List_fromArray(
				['mdc-text-field--label-floating']))));
var $aforemny$material_components_web_elm$Material$TextField$fullwidthCs = function (_v0) {
	var fullwidth = _v0.a.fullwidth;
	return fullwidth ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--fullwidth')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$ariaLabelAttr = function (_v0) {
	var fullwidth = _v0.a.fullwidth;
	var placeholder = _v0.a.placeholder;
	var label = _v0.a.label;
	return fullwidth ? A2(
		$elm$core$Maybe$map,
		$elm$html$Html$Attributes$attribute('aria-label'),
		label) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $aforemny$material_components_web_elm$Material$TextField$changeHandler = function (_v0) {
	var onChange = _v0.a.onChange;
	return A2(
		$elm$core$Maybe$map,
		function (f) {
			return A2(
				$elm$html$Html$Events$on,
				'change',
				A2($elm$json$Json$Decode$map, f, $elm$html$Html$Events$targetValue));
		},
		onChange);
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $aforemny$material_components_web_elm$Material$TextField$inputCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-text-field__input'));
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $aforemny$material_components_web_elm$Material$TextField$inputHandler = function (_v0) {
	var onInput = _v0.a.onInput;
	return A2($elm$core$Maybe$map, $elm$html$Html$Events$onInput, onInput);
};
var $aforemny$material_components_web_elm$Material$TextField$maxLengthAttr = function (_v0) {
	var maxLength = _v0.a.maxLength;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Attributes$attribute('maxLength'),
			$elm$core$String$fromInt),
		maxLength);
};
var $aforemny$material_components_web_elm$Material$TextField$minLengthAttr = function (_v0) {
	var minLength = _v0.a.minLength;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Attributes$attribute('minLength'),
			$elm$core$String$fromInt),
		minLength);
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $aforemny$material_components_web_elm$Material$TextField$placeholderAttr = function (_v0) {
	var placeholder = _v0.a.placeholder;
	return A2($elm$core$Maybe$map, $elm$html$Html$Attributes$placeholder, placeholder);
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $aforemny$material_components_web_elm$Material$TextField$typeAttr = function (_v0) {
	var type_ = _v0.a.type_;
	return A2($elm$core$Maybe$map, $elm$html$Html$Attributes$type_, type_);
};
var $aforemny$material_components_web_elm$Material$TextField$inputElt = function (config_) {
	return A2(
		$elm$html$Html$input,
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$TextField$inputCs,
					$aforemny$material_components_web_elm$Material$TextField$typeAttr(config_),
					$aforemny$material_components_web_elm$Material$TextField$ariaLabelAttr(config_),
					$aforemny$material_components_web_elm$Material$TextField$placeholderAttr(config_),
					$aforemny$material_components_web_elm$Material$TextField$inputHandler(config_),
					$aforemny$material_components_web_elm$Material$TextField$changeHandler(config_),
					$aforemny$material_components_web_elm$Material$TextField$minLengthAttr(config_),
					$aforemny$material_components_web_elm$Material$TextField$maxLengthAttr(config_)
				])),
		_List_Nil);
};
var $aforemny$material_components_web_elm$Material$TextField$labelElt = function (_v0) {
	var label = _v0.a.label;
	var value = _v0.a.value;
	var fullwidth = _v0.a.fullwidth;
	var floatingLabelFloatAboveCs = 'mdc-floating-label--float-above';
	var floatingLabelCs = 'mdc-floating-label';
	var _v1 = _Utils_Tuple2(fullwidth, label);
	if ((!_v1.a) && (_v1.b.$ === 'Just')) {
		var str = _v1.b.a;
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					(A2($elm$core$Maybe$withDefault, '', value) !== '') ? $elm$html$Html$Attributes$class(floatingLabelCs + (' ' + floatingLabelFloatAboveCs)) : $elm$html$Html$Attributes$class(floatingLabelCs),
					A2(
					$elm$html$Html$Attributes$property,
					'foucClassNames',
					A2(
						$elm$json$Json$Encode$list,
						$elm$json$Json$Encode$string,
						_List_fromArray(
							[floatingLabelFloatAboveCs])))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(str)
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $aforemny$material_components_web_elm$Material$TextField$labelFloatingCs = function (_v0) {
	var label = _v0.a.label;
	var value = _v0.a.value;
	var fullwidth = _v0.a.fullwidth;
	return ((!fullwidth) && ((!_Utils_eq(label, $elm$core$Maybe$Nothing)) && (A2($elm$core$Maybe$withDefault, '', value) !== ''))) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--label-floating')) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$Events$keyCode = A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int);
var $aforemny$material_components_web_elm$Material$TextField$iconElt = F2(
	function (modifierCs, icon_) {
		if (icon_.$ === 'Nothing') {
			return $elm$html$Html$text('');
		} else {
			if (icon_.a.$ === 'Icon') {
				var node = icon_.a.a.node;
				var attributes = icon_.a.a.attributes;
				var nodes = icon_.a.a.nodes;
				var onInteraction = icon_.a.a.onInteraction;
				var disabled = icon_.a.a.disabled;
				return A2(
					node,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$Attributes$class('mdc-text-field__icon'),
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(modifierCs),
							function () {
								if (onInteraction.$ === 'Just') {
									var msg = onInteraction.a;
									return (!disabled) ? A2(
										$elm$core$List$cons,
										$elm$html$Html$Attributes$tabindex(0),
										A2(
											$elm$core$List$cons,
											A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
											A2(
												$elm$core$List$cons,
												$elm$html$Html$Events$onClick(msg),
												A2(
													$elm$core$List$cons,
													A2(
														$elm$html$Html$Events$on,
														'keydown',
														A2(
															$elm$json$Json$Decode$andThen,
															function (keyCode) {
																return (keyCode === 13) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('');
															},
															$elm$html$Html$Events$keyCode)),
													attributes)))) : A2(
										$elm$core$List$cons,
										$elm$html$Html$Attributes$tabindex(-1),
										A2(
											$elm$core$List$cons,
											A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
											attributes));
								} else {
									return attributes;
								}
							}())),
					nodes);
			} else {
				var node = icon_.a.a.node;
				var attributes = icon_.a.a.attributes;
				var nodes = icon_.a.a.nodes;
				var onInteraction = icon_.a.a.onInteraction;
				var disabled = icon_.a.a.disabled;
				return A2(
					node,
					A2(
						$elm$core$List$cons,
						$elm$svg$Svg$Attributes$class('mdc-text-field__icon'),
						A2(
							$elm$core$List$cons,
							$elm$svg$Svg$Attributes$class(modifierCs),
							function () {
								if (onInteraction.$ === 'Just') {
									var msg = onInteraction.a;
									return (!disabled) ? A2(
										$elm$core$List$cons,
										$elm$html$Html$Attributes$tabindex(0),
										A2(
											$elm$core$List$cons,
											A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
											A2(
												$elm$core$List$cons,
												$elm$html$Html$Events$onClick(msg),
												A2(
													$elm$core$List$cons,
													A2(
														$elm$html$Html$Events$on,
														'keydown',
														A2(
															$elm$json$Json$Decode$andThen,
															function (keyCode) {
																return (keyCode === 13) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('');
															},
															$elm$html$Html$Events$keyCode)),
													attributes)))) : A2(
										$elm$core$List$cons,
										$elm$html$Html$Attributes$tabindex(-1),
										A2(
											$elm$core$List$cons,
											A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
											attributes));
								} else {
									return attributes;
								}
							}())),
					nodes);
			}
		}
	});
var $aforemny$material_components_web_elm$Material$TextField$leadingIconElt = function (_v0) {
	var leadingIcon = _v0.a.leadingIcon;
	return A2($aforemny$material_components_web_elm$Material$TextField$iconElt, 'mdc-text-field__icon--leading', leadingIcon);
};
var $aforemny$material_components_web_elm$Material$TextField$lineRippleElt = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-line-ripple')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$TextField$maxLengthProp = function (_v0) {
	var maxLength = _v0.a.maxLength;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'maxLength',
			$elm$json$Json$Encode$int(
				A2($elm$core$Maybe$withDefault, -1, maxLength))));
};
var $aforemny$material_components_web_elm$Material$TextField$maxProp = function (_v0) {
	var max = _v0.a.max;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'max',
			$elm$json$Json$Encode$string(
				A2(
					$elm$core$Maybe$withDefault,
					'',
					A2($elm$core$Maybe$map, $elm$core$String$fromInt, max)))));
};
var $aforemny$material_components_web_elm$Material$TextField$minLengthProp = function (_v0) {
	var minLength = _v0.a.minLength;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'minLength',
			$elm$json$Json$Encode$int(
				A2($elm$core$Maybe$withDefault, -1, minLength))));
};
var $aforemny$material_components_web_elm$Material$TextField$minProp = function (_v0) {
	var min = _v0.a.min;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'min',
			$elm$json$Json$Encode$string(
				A2(
					$elm$core$Maybe$withDefault,
					'',
					A2($elm$core$Maybe$map, $elm$core$String$fromInt, min)))));
};
var $aforemny$material_components_web_elm$Material$TextField$noLabelCs = function (_v0) {
	var label = _v0.a.label;
	return _Utils_eq(label, $elm$core$Maybe$Nothing) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--no-label')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$notchedOutlineLeadingElt = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-notched-outline__leading')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$TextField$notchedOutlineNotchElt = function (config_) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-notched-outline__notch')
			]),
		_List_fromArray(
			[
				$aforemny$material_components_web_elm$Material$TextField$labelElt(config_)
			]));
};
var $aforemny$material_components_web_elm$Material$TextField$notchedOutlineTrailingElt = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-notched-outline__trailing')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$TextField$notchedOutlineElt = function (config_) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-notched-outline')
			]),
		_List_fromArray(
			[
				$aforemny$material_components_web_elm$Material$TextField$notchedOutlineLeadingElt,
				$aforemny$material_components_web_elm$Material$TextField$notchedOutlineNotchElt(config_),
				$aforemny$material_components_web_elm$Material$TextField$notchedOutlineTrailingElt
			]));
};
var $aforemny$material_components_web_elm$Material$TextField$outlinedCs = function (outlined_) {
	return outlined_ ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--outlined')) : $elm$core$Maybe$Nothing;
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $aforemny$material_components_web_elm$Material$TextField$patternProp = function (_v0) {
	var pattern = _v0.a.pattern;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'pattern',
			A2(
				$elm$core$Maybe$withDefault,
				$elm$json$Json$Encode$null,
				A2($elm$core$Maybe$map, $elm$json$Json$Encode$string, pattern))));
};
var $aforemny$material_components_web_elm$Material$TextField$prefixCs = $elm$html$Html$Attributes$class('mdc-text-field__affix mdc-text-field__affix--prefix');
var $aforemny$material_components_web_elm$Material$TextField$prefixElt = function (_v0) {
	var prefix = _v0.a.prefix;
	if (prefix.$ === 'Just') {
		var prefixStr = prefix.a;
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$TextField$prefixCs]),
			_List_fromArray(
				[
					$elm$html$Html$text(prefixStr)
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $aforemny$material_components_web_elm$Material$TextField$requiredProp = function (_v0) {
	var required = _v0.a.required;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'required',
			$elm$json$Json$Encode$bool(required)));
};
var $aforemny$material_components_web_elm$Material$TextField$rippleElt = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-text-field__ripple')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$TextField$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-text-field'));
var $aforemny$material_components_web_elm$Material$TextField$stepProp = function (_v0) {
	var step = _v0.a.step;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'step',
			$elm$json$Json$Encode$string(
				A2(
					$elm$core$Maybe$withDefault,
					'',
					A2($elm$core$Maybe$map, $elm$core$String$fromInt, step)))));
};
var $aforemny$material_components_web_elm$Material$TextField$suffixCs = $elm$html$Html$Attributes$class('mdc-text-field__affix mdc-text-field__affix--suffix');
var $aforemny$material_components_web_elm$Material$TextField$suffixElt = function (_v0) {
	var suffix = _v0.a.suffix;
	if (suffix.$ === 'Just') {
		var suffixStr = suffix.a;
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$TextField$suffixCs]),
			_List_fromArray(
				[
					$elm$html$Html$text(suffixStr)
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $aforemny$material_components_web_elm$Material$TextField$trailingIconElt = function (_v0) {
	var trailingIcon = _v0.a.trailingIcon;
	return A2($aforemny$material_components_web_elm$Material$TextField$iconElt, 'mdc-text-field__icon--trailing', trailingIcon);
};
var $aforemny$material_components_web_elm$Material$TextField$validProp = function (_v0) {
	var valid = _v0.a.valid;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'valid',
			$elm$json$Json$Encode$bool(valid)));
};
var $aforemny$material_components_web_elm$Material$TextField$valueProp = function (_v0) {
	var value = _v0.a.value;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Attributes$property('value'),
			$elm$json$Json$Encode$string),
		value);
};
var $aforemny$material_components_web_elm$Material$TextField$withLeadingIconCs = function (_v0) {
	var leadingIcon = _v0.a.leadingIcon;
	return (!_Utils_eq(leadingIcon, $elm$core$Maybe$Nothing)) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--with-leading-icon')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$withTrailingIconCs = function (_v0) {
	var trailingIcon = _v0.a.trailingIcon;
	return (!_Utils_eq(trailingIcon, $elm$core$Maybe$Nothing)) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field--with-trailing-icon')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$TextField$textField = F2(
	function (outlined_, config_) {
		var additionalAttributes = config_.a.additionalAttributes;
		var fullwidth = config_.a.fullwidth;
		return A3(
			$elm$html$Html$node,
			'mdc-text-field',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$TextField$rootCs,
							$aforemny$material_components_web_elm$Material$TextField$noLabelCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$filledCs(outlined_),
							$aforemny$material_components_web_elm$Material$TextField$outlinedCs(outlined_),
							$aforemny$material_components_web_elm$Material$TextField$fullwidthCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$labelFloatingCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$foucClassNamesProp,
							$aforemny$material_components_web_elm$Material$TextField$disabledCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$withLeadingIconCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$withTrailingIconCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$endAlignedCs(config_),
							$aforemny$material_components_web_elm$Material$TextField$valueProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$disabledProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$requiredProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$validProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$patternProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$minLengthProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$maxLengthProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$minProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$maxProp(config_),
							$aforemny$material_components_web_elm$Material$TextField$stepProp(config_)
						])),
				additionalAttributes),
			outlined_ ? _List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$TextField$leadingIconElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$prefixElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$inputElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$suffixElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$notchedOutlineElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$trailingIconElt(config_)
				]) : _List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$TextField$rippleElt,
					$aforemny$material_components_web_elm$Material$TextField$leadingIconElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$prefixElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$inputElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$suffixElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$labelElt(config_),
					$aforemny$material_components_web_elm$Material$TextField$lineRippleElt,
					$aforemny$material_components_web_elm$Material$TextField$trailingIconElt(config_)
				]));
	});
var $aforemny$material_components_web_elm$Material$TextField$filled = function (config_) {
	return A2($aforemny$material_components_web_elm$Material$TextField$textField, false, config_);
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $aforemny$material_components_web_elm$Material$Typography$headline4 = $elm$html$Html$Attributes$class('mdc-typography--headline4');
var $aforemny$material_components_web_elm$Material$HelperText$helperLineCs = $elm$html$Html$Attributes$class('mdc-text-field-helper-line');
var $aforemny$material_components_web_elm$Material$HelperText$helperLine = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2($elm$core$List$cons, $aforemny$material_components_web_elm$Material$HelperText$helperLineCs, additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$HelperText$ariaHiddenAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'));
var $aforemny$material_components_web_elm$Material$HelperText$helperTextCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-text-field-helper-text'));
var $aforemny$material_components_web_elm$Material$HelperText$persistentCs = function (_v0) {
	var config_ = _v0.a;
	return config_.persistent ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field-helper-text--persistent')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$HelperText$validationCs = function (_v0) {
	var config_ = _v0.a;
	return config_.validation ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-text-field-helper-text--validation-msg')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$HelperText$helperText = F2(
	function (config_, string) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$HelperText$helperTextCs,
							$aforemny$material_components_web_elm$Material$HelperText$persistentCs(config_),
							$aforemny$material_components_web_elm$Material$HelperText$validationCs(config_),
							$aforemny$material_components_web_elm$Material$HelperText$ariaHiddenAttr
						])),
				additionalAttributes),
			_List_fromArray(
				[
					$elm$html$Html$text(string)
				]));
	});
var $elm$html$Html$img = _VirtualDom_node('img');
var $aforemny$material_components_web_elm$Material$CircularProgress$ariaLabelAttr = function (_v0) {
	var label = _v0.a.label;
	return A2(
		$elm$core$Maybe$map,
		$elm$html$Html$Attributes$attribute('aria-label'),
		label);
};
var $aforemny$material_components_web_elm$Material$CircularProgress$ariaValueMaxAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'aria-value-max', '1'));
var $aforemny$material_components_web_elm$Material$CircularProgress$ariaValueMinAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'aria-value-min', '0'));
var $aforemny$material_components_web_elm$Material$CircularProgress$ariaValueNowAttr = function (progress) {
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$html$Html$Attributes$attribute('aria-value-now'),
				$elm$core$String$fromFloat),
			function ($) {
				return $.progress;
			}),
		progress);
};
var $aforemny$material_components_web_elm$Material$CircularProgress$closedProp = function (_v0) {
	var closed = _v0.a.closed;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'closed',
			$elm$json$Json$Encode$bool(closed)));
};
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $aforemny$material_components_web_elm$Material$CircularProgress$circleCs = function (progress) {
	return $elm$svg$Svg$Attributes$class(
		(!_Utils_eq(progress, $elm$core$Maybe$Nothing)) ? 'mdc-circular-progress__determinate-circle' : 'mdc-circular-progress__indeterminate-circle');
};
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $aforemny$material_components_web_elm$Material$CircularProgress$strokeDasharrayAttr = function (_v0) {
	var size = _v0.a.size;
	return A3(
		$elm$core$Basics$composeL,
		$elm$svg$Svg$Attributes$strokeDasharray,
		$elm$core$String$fromFloat,
		function () {
			switch (size.$) {
				case 'Large':
					return 113.097;
				case 'Medium':
					return 78.54;
				default:
					return 54.978;
			}
		}());
};
var $elm$svg$Svg$Attributes$strokeDashoffset = _VirtualDom_attribute('stroke-dashoffset');
var $aforemny$material_components_web_elm$Material$CircularProgress$strokeDashoffsetAttr = F2(
	function (progress, _v0) {
		var size = _v0.a.size;
		return A3(
			$elm$core$Basics$composeL,
			$elm$svg$Svg$Attributes$strokeDashoffset,
			$elm$core$String$fromFloat,
			function () {
				var _v1 = _Utils_Tuple2(progress, size);
				if (_v1.a.$ === 'Just') {
					switch (_v1.b.$) {
						case 'Large':
							var _v2 = _v1.b;
							return 113.097;
						case 'Medium':
							var _v5 = _v1.b;
							return 78.54;
						default:
							var _v8 = _v1.b;
							return 54.978;
					}
				} else {
					switch (_v1.b.$) {
						case 'Large':
							var _v3 = _v1.a;
							var _v4 = _v1.b;
							return 56.549;
						case 'Medium':
							var _v6 = _v1.a;
							var _v7 = _v1.b;
							return 39.27;
						default:
							var _v9 = _v1.a;
							var _v10 = _v1.b;
							return 27.489;
					}
				}
			}());
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$circleElt = F2(
	function (progress, config_) {
		return A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$CircularProgress$circleCs(progress),
					$elm$svg$Svg$Attributes$cx('24'),
					$elm$svg$Svg$Attributes$cy('24'),
					$elm$svg$Svg$Attributes$r('18'),
					$aforemny$material_components_web_elm$Material$CircularProgress$strokeDasharrayAttr(config_),
					A2($aforemny$material_components_web_elm$Material$CircularProgress$strokeDashoffsetAttr, progress, config_)
				]),
			_List_Nil);
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $aforemny$material_components_web_elm$Material$CircularProgress$determinateCircleGraphicElt = F2(
	function (progress, config_) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('mdc-circular-progress__determinate-circle-graphic'),
					$elm$svg$Svg$Attributes$viewBox('0 0 48 48')
				]),
			_List_fromArray(
				[
					A2($aforemny$material_components_web_elm$Material$CircularProgress$circleElt, progress, config_)
				]));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$determinateContainerElt = F2(
	function (progress, config_) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-circular-progress__determinate-container')
				]),
			_List_fromArray(
				[
					A2($aforemny$material_components_web_elm$Material$CircularProgress$determinateCircleGraphicElt, progress, config_)
				]));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$determinateProp = function (progress) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'determinate',
			$elm$json$Json$Encode$bool(
				!_Utils_eq(progress, $elm$core$Maybe$Nothing))));
};
var $aforemny$material_components_web_elm$Material$CircularProgress$indeterminateCircleGraphicElt = function (config_) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('mdc-circular-progress__indeterminate-circle-graphic'),
				$elm$svg$Svg$Attributes$viewBox('0 0 48 48')
			]),
		_List_fromArray(
			[
				A2($aforemny$material_components_web_elm$Material$CircularProgress$circleElt, $elm$core$Maybe$Nothing, config_)
			]));
};
var $aforemny$material_components_web_elm$Material$CircularProgress$spinnerLayerElt = F2(
	function (config_, additionalAttributes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-circular-progress__spinner-layer'),
				additionalAttributes),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mdc-circular-progress__circle-clipper'),
							$elm$html$Html$Attributes$class('mdc-circular-progress__circle-left')
						]),
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$CircularProgress$indeterminateCircleGraphicElt(config_)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mdc-circular-progress__gap-patch')
						]),
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$CircularProgress$indeterminateCircleGraphicElt(config_)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mdc-circular-progress__circle-clipper'),
							$elm$html$Html$Attributes$class('mdc-circular-progress__circle-right')
						]),
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$CircularProgress$indeterminateCircleGraphicElt(config_)
						]))
				]));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$indeterminateContainerElt = function (config_) {
	var fourColored = config_.a.fourColored;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-circular-progress__indeterminate-container')
			]),
		fourColored ? _List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$CircularProgress$spinnerLayerElt,
				config_,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-circular-progress__color-1')
					])),
				A2(
				$aforemny$material_components_web_elm$Material$CircularProgress$spinnerLayerElt,
				config_,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-circular-progress__color-2')
					])),
				A2(
				$aforemny$material_components_web_elm$Material$CircularProgress$spinnerLayerElt,
				config_,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-circular-progress__color-3')
					])),
				A2(
				$aforemny$material_components_web_elm$Material$CircularProgress$spinnerLayerElt,
				config_,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-circular-progress__color-4')
					]))
			]) : _List_fromArray(
			[
				A2($aforemny$material_components_web_elm$Material$CircularProgress$spinnerLayerElt, config_, _List_Nil)
			]));
};
var $aforemny$material_components_web_elm$Material$CircularProgress$indeterminateCs = function (progress) {
	return (!_Utils_eq(progress, $elm$core$Maybe$Nothing)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-circular-progress--indeterminate'));
};
var $aforemny$material_components_web_elm$Material$CircularProgress$progressProp = function (progress) {
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$html$Html$Attributes$property('progress'),
				$elm$json$Json$Encode$float),
			function ($) {
				return $.progress;
			}),
		progress);
};
var $aforemny$material_components_web_elm$Material$CircularProgress$progressbarRole = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'role', 'progressbar'));
var $aforemny$material_components_web_elm$Material$CircularProgress$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-circular-progress'));
var $aforemny$material_components_web_elm$Material$CircularProgress$sizeCs = function (_v0) {
	var size = _v0.a.size;
	return A3(
		$elm$core$Basics$composeL,
		$elm$core$Maybe$Just,
		$elm$html$Html$Attributes$class,
		function () {
			switch (size.$) {
				case 'Large':
					return 'mdc-circular-progress--large';
				case 'Medium':
					return 'mdc-circular-progress--medium';
				default:
					return 'mdc-circular-progress--small';
			}
		}());
};
var $aforemny$material_components_web_elm$Material$CircularProgress$circularProgress = F2(
	function (progress, config_) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-circular-progress',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$CircularProgress$rootCs,
							$aforemny$material_components_web_elm$Material$CircularProgress$indeterminateCs(progress),
							$aforemny$material_components_web_elm$Material$CircularProgress$sizeCs(config_),
							$aforemny$material_components_web_elm$Material$CircularProgress$progressbarRole,
							$aforemny$material_components_web_elm$Material$CircularProgress$ariaLabelAttr(config_),
							$aforemny$material_components_web_elm$Material$CircularProgress$ariaValueMinAttr,
							$aforemny$material_components_web_elm$Material$CircularProgress$ariaValueMaxAttr,
							$aforemny$material_components_web_elm$Material$CircularProgress$ariaValueNowAttr(progress),
							$aforemny$material_components_web_elm$Material$CircularProgress$determinateProp(progress),
							$aforemny$material_components_web_elm$Material$CircularProgress$progressProp(progress),
							$aforemny$material_components_web_elm$Material$CircularProgress$closedProp(config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[
					A2(
					$aforemny$material_components_web_elm$Material$CircularProgress$determinateContainerElt,
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Maybe$Just(
							{progress: 0}),
						A2($elm$core$Maybe$map, $elm$core$Maybe$Just, progress)),
					config_),
					$aforemny$material_components_web_elm$Material$CircularProgress$indeterminateContainerElt(config_)
				]));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$indeterminate = function (config_) {
	return A2($aforemny$material_components_web_elm$Material$CircularProgress$circularProgress, $elm$core$Maybe$Nothing, config_);
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd = $elm$html$Html$Attributes$class('justify-content-end');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb0 = $elm$html$Html$Attributes$class('mb-0');
var $aforemny$material_components_web_elm$Material$CircularProgress$Medium = {$: 'Medium'};
var $aforemny$material_components_web_elm$Material$CircularProgress$medium = $aforemny$material_components_web_elm$Material$CircularProgress$Medium;
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mr3 = $elm$html$Html$Attributes$class('mr-3');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt2 = $elm$html$Html$Attributes$class('mt-2');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$my2 = $elm$html$Html$Attributes$class('my-2');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$my4 = $elm$html$Html$Attributes$class('my-4');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pb5 = $elm$html$Html$Attributes$class('pb-5');
var $aforemny$material_components_web_elm$Material$Button$Raised = {$: 'Raised'};
var $aforemny$material_components_web_elm$Material$Button$raised = F2(
	function (config_, label) {
		return A3($aforemny$material_components_web_elm$Material$Button$button, $aforemny$material_components_web_elm$Material$Button$Raised, config_, label);
	});
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row = $elm$html$Html$Attributes$class('flex-row');
var $aforemny$material_components_web_elm$Material$CircularProgress$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$CircularProgress$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Switch$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Switch$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Switch$setChecked = F2(
	function (checked, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Switch$Config(
			_Utils_update(
				config_,
				{checked: checked}));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$setClosed = F2(
	function (closed, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$CircularProgress$Config(
			_Utils_update(
				config_,
				{closed: closed}));
	});
var $aforemny$material_components_web_elm$Material$Button$setDisabled = F2(
	function (disabled, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Button$Internal$Config(
			_Utils_update(
				config_,
				{disabled: disabled}));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$setFourColored = F2(
	function (fourColored, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$CircularProgress$Config(
			_Utils_update(
				config_,
				{fourColored: fourColored}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setLabel = F2(
	function (label, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{label: label}));
	});
var $aforemny$material_components_web_elm$Material$Switch$setOnChange = F2(
	function (onChange, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Switch$Config(
			_Utils_update(
				config_,
				{
					onChange: $elm$core$Maybe$Just(onChange)
				}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setOnInput = F2(
	function (onInput, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{
					onInput: $elm$core$Maybe$Just(onInput)
				}));
	});
var $aforemny$material_components_web_elm$Material$HelperText$setPersistent = F2(
	function (persistent, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$HelperText$Config(
			_Utils_update(
				config_,
				{persistent: persistent}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setRequired = F2(
	function (required, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{required: required}));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$setSize = F2(
	function (size, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$CircularProgress$Config(
			_Utils_update(
				config_,
				{size: size}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setValid = F2(
	function (valid, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{valid: valid}));
	});
var $aforemny$material_components_web_elm$Material$HelperText$setValidation = F2(
	function (validation, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$HelperText$Config(
			_Utils_update(
				config_,
				{validation: validation}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setValue = F2(
	function (value, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{value: value}));
	});
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Danger = {$: 'Danger'};
var $rundis$elm_bootstrap$Bootstrap$Alert$Shown = {$: 'Shown'};
var $rundis$elm_bootstrap$Bootstrap$Alert$Config = function (a) {
	return {$: 'Config', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Alert$attrs = F2(
	function (attributes, _v0) {
		var configRec = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Alert$Config(
			_Utils_update(
				configRec,
				{attributes: attributes}));
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$children = F2(
	function (children_, _v0) {
		var configRec = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Alert$Config(
			_Utils_update(
				configRec,
				{children: children_}));
	});
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Secondary = {$: 'Secondary'};
var $rundis$elm_bootstrap$Bootstrap$Alert$config = $rundis$elm_bootstrap$Bootstrap$Alert$Config(
	{attributes: _List_Nil, children: _List_Nil, dismissable: $elm$core$Maybe$Nothing, role: $rundis$elm_bootstrap$Bootstrap$Internal$Role$Secondary, visibility: $rundis$elm_bootstrap$Bootstrap$Alert$Shown, withAnimation: false});
var $rundis$elm_bootstrap$Bootstrap$Alert$role = F2(
	function (role_, _v0) {
		var configRec = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Alert$Config(
			_Utils_update(
				configRec,
				{role: role_}));
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$Closed = {$: 'Closed'};
var $rundis$elm_bootstrap$Bootstrap$Alert$StartClose = {$: 'StartClose'};
var $rundis$elm_bootstrap$Bootstrap$Alert$clickHandler = F2(
	function (visibility, configRec) {
		var handleClick = F2(
			function (viz, toMsg) {
				return $elm$html$Html$Events$onClick(
					toMsg(viz));
			});
		var _v0 = configRec.dismissable;
		if (_v0.$ === 'Just') {
			var dismissMsg = _v0.a;
			return _List_fromArray(
				[
					configRec.withAnimation ? A2(handleClick, $rundis$elm_bootstrap$Bootstrap$Alert$StartClose, dismissMsg) : A2(handleClick, $rundis$elm_bootstrap$Bootstrap$Alert$Closed, dismissMsg)
				]);
		} else {
			return _List_Nil;
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$injectButton = F2(
	function (btn, children_) {
		if (children_.b) {
			var head = children_.a;
			var tail = children_.b;
			return A2(
				$elm$core$List$cons,
				head,
				A2($elm$core$List$cons, btn, tail));
		} else {
			return _List_fromArray(
				[btn]);
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$isDismissable = function (configRec) {
	var _v0 = configRec.dismissable;
	if (_v0.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Alert$maybeAddDismissButton = F3(
	function (visibilty, configRec, children_) {
		return $rundis$elm_bootstrap$Bootstrap$Alert$isDismissable(configRec) ? A2(
			$rundis$elm_bootstrap$Bootstrap$Alert$injectButton,
			A2(
				$elm$html$Html$button,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Attributes$class('close'),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'close')
						]),
					A2($rundis$elm_bootstrap$Bootstrap$Alert$clickHandler, visibilty, configRec)),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('×')
							]))
					])),
			children_) : children_;
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass = F2(
	function (prefix, role) {
		return $elm$html$Html$Attributes$class(
			prefix + ('-' + function () {
				switch (role.$) {
					case 'Primary':
						return 'primary';
					case 'Secondary':
						return 'secondary';
					case 'Success':
						return 'success';
					case 'Info':
						return 'info';
					case 'Warning':
						return 'warning';
					case 'Danger':
						return 'danger';
					case 'Light':
						return 'light';
					default:
						return 'dark';
				}
			}()));
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$viewAttributes = F2(
	function (visibility, configRec) {
		var visibiltyAttributes = _Utils_eq(visibility, $rundis$elm_bootstrap$Bootstrap$Alert$Closed) ? _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'none')
			]) : _List_Nil;
		var animationAttributes = function () {
			if (configRec.withAnimation) {
				var _v0 = configRec.dismissable;
				if (_v0.$ === 'Just') {
					var dismissMsg = _v0.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$Events$on,
							'transitionend',
							$elm$json$Json$Decode$succeed(
								dismissMsg($rundis$elm_bootstrap$Bootstrap$Alert$Closed)))
						]);
				} else {
					return _List_Nil;
				}
			} else {
				return _List_Nil;
			}
		}();
		var alertAttributes = _List_fromArray(
			[
				A2($elm$html$Html$Attributes$attribute, 'role', 'alert'),
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('alert', true),
						_Utils_Tuple2(
						'alert-dismissible',
						$rundis$elm_bootstrap$Bootstrap$Alert$isDismissable(configRec)),
						_Utils_Tuple2('fade', configRec.withAnimation),
						_Utils_Tuple2(
						'show',
						_Utils_eq(visibility, $rundis$elm_bootstrap$Bootstrap$Alert$Shown))
					])),
				A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'alert', configRec.role)
			]);
		return $elm$core$List$concat(
			_List_fromArray(
				[configRec.attributes, alertAttributes, visibiltyAttributes, animationAttributes]));
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$view = F2(
	function (visibility, _v0) {
		var configRec = _v0.a;
		return A2(
			$elm$html$Html$div,
			A2($rundis$elm_bootstrap$Bootstrap$Alert$viewAttributes, visibility, configRec),
			A3($rundis$elm_bootstrap$Bootstrap$Alert$maybeAddDismissButton, visibility, configRec, configRec.children));
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$simple = F3(
	function (role_, attributes, children_) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Alert$view,
			$rundis$elm_bootstrap$Bootstrap$Alert$Shown,
			A2(
				$rundis$elm_bootstrap$Bootstrap$Alert$children,
				children_,
				A2(
					$rundis$elm_bootstrap$Bootstrap$Alert$attrs,
					attributes,
					A2($rundis$elm_bootstrap$Bootstrap$Alert$role, role_, $rundis$elm_bootstrap$Bootstrap$Alert$config))));
	});
var $rundis$elm_bootstrap$Bootstrap$Alert$simpleDanger = $rundis$elm_bootstrap$Bootstrap$Alert$simple($rundis$elm_bootstrap$Bootstrap$Internal$Role$Danger);
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Success = {$: 'Success'};
var $rundis$elm_bootstrap$Bootstrap$Alert$simpleSuccess = $rundis$elm_bootstrap$Bootstrap$Alert$simple($rundis$elm_bootstrap$Bootstrap$Internal$Role$Success);
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $aforemny$material_components_web_elm$Material$Typography$subtitle2 = $elm$html$Html$Attributes$class('mdc-typography--subtitle2');
var $aforemny$material_components_web_elm$Material$Switch$checkedProp = function (_v0) {
	var checked = _v0.a.checked;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'checked',
			$elm$json$Json$Encode$bool(checked)));
};
var $aforemny$material_components_web_elm$Material$Switch$disabledProp = function (_v0) {
	var disabled = _v0.a.disabled;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'disabled',
			$elm$json$Json$Encode$bool(disabled)));
};
var $aforemny$material_components_web_elm$Material$Switch$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-switch'));
var $aforemny$material_components_web_elm$Material$Switch$changeHandler = function (_v0) {
	var onChange = _v0.a.onChange;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Events$on('change'),
			$elm$json$Json$Decode$succeed),
		onChange);
};
var $aforemny$material_components_web_elm$Material$Switch$checkboxTypeAttr = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$type_('checkbox'));
var $aforemny$material_components_web_elm$Material$Switch$nativeControlCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-switch__native-control'));
var $aforemny$material_components_web_elm$Material$Switch$switchRoleAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'role', 'switch'));
var $aforemny$material_components_web_elm$Material$Switch$nativeControlElt = function (config_) {
	return A2(
		$elm$html$Html$input,
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Switch$nativeControlCs,
					$aforemny$material_components_web_elm$Material$Switch$checkboxTypeAttr,
					$aforemny$material_components_web_elm$Material$Switch$switchRoleAttr,
					$aforemny$material_components_web_elm$Material$Switch$checkedProp(config_),
					$aforemny$material_components_web_elm$Material$Switch$changeHandler(config_)
				])),
		_List_Nil);
};
var $aforemny$material_components_web_elm$Material$Switch$thumbElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-switch__thumb')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Switch$thumbUnderlayElt = function (config_) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-switch__thumb-underlay')
			]),
		_List_fromArray(
			[
				$aforemny$material_components_web_elm$Material$Switch$thumbElt,
				$aforemny$material_components_web_elm$Material$Switch$nativeControlElt(config_)
			]));
};
var $aforemny$material_components_web_elm$Material$Switch$trackElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-switch__track')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Switch$switch = function (config_) {
	var additionalAttributes = config_.a.additionalAttributes;
	return A3(
		$elm$html$Html$node,
		'mdc-switch',
		_Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						$aforemny$material_components_web_elm$Material$Switch$rootCs,
						$aforemny$material_components_web_elm$Material$Switch$checkedProp(config_),
						$aforemny$material_components_web_elm$Material$Switch$disabledProp(config_)
					])),
			additionalAttributes),
		_List_fromArray(
			[
				$aforemny$material_components_web_elm$Material$Switch$trackElt,
				$aforemny$material_components_web_elm$Material$Switch$thumbUnderlayElt(config_)
			]));
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100 = $elm$html$Html$Attributes$class('w-100');
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col3 = {$: 'Col3'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs3 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col3);
var $author$project$RecipeImport$brewersFriendImport = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pb5]),
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h2,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$headline4]),
								_List_fromArray(
									[
										$elm$html$Html$text('Import from Brewer\'s Friend')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$body1]),
								_List_fromArray(
									[
										$elm$html$Html$text('Import your Brewer\'s Friend recipe by entering it\'s ID, or the URL (link).')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$body1]),
								_List_fromArray(
									[
										$elm$html$Html$text('The recipe has to be public.')
									]))
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$TextField$filled(
								A2(
									$aforemny$material_components_web_elm$Material$TextField$setAttributes,
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
									A2(
										$aforemny$material_components_web_elm$Material$TextField$setValid,
										model.bfImport.form.valid,
										A2(
											$aforemny$material_components_web_elm$Material$TextField$setOnInput,
											$author$project$Messages$BFImportInput,
											A2(
												$aforemny$material_components_web_elm$Material$TextField$setValue,
												$elm$core$Maybe$Just(model.bfImport.form.value),
												A2(
													$aforemny$material_components_web_elm$Material$TextField$setRequired,
													true,
													A2(
														$aforemny$material_components_web_elm$Material$TextField$setLabel,
														$elm$core$Maybe$Just('Recipe ID or link'),
														$aforemny$material_components_web_elm$Material$TextField$config))))))),
								A2(
								$aforemny$material_components_web_elm$Material$HelperText$helperLine,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$aforemny$material_components_web_elm$Material$HelperText$helperText,
										A2(
											$aforemny$material_components_web_elm$Material$HelperText$setValidation,
											!model.bfImport.form.valid,
											A2($aforemny$material_components_web_elm$Material$HelperText$setPersistent, true, $aforemny$material_components_web_elm$Material$HelperText$config)),
										model.bfImport.form.valid ? model.bfImport.form.hint : model.bfImport.form.error)
									]))
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt2]))
					]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd]))
							]),
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$CircularProgress$indeterminate(
								A2(
									$aforemny$material_components_web_elm$Material$CircularProgress$setAttributes,
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mr3]),
									A2(
										$aforemny$material_components_web_elm$Material$CircularProgress$setSize,
										$aforemny$material_components_web_elm$Material$CircularProgress$medium,
										A2(
											$aforemny$material_components_web_elm$Material$CircularProgress$setClosed,
											!model.bfImport.importing,
											A2($aforemny$material_components_web_elm$Material$CircularProgress$setFourColored, true, $aforemny$material_components_web_elm$Material$CircularProgress$config))))),
								A2(
								$aforemny$material_components_web_elm$Material$Button$raised,
								A2(
									$aforemny$material_components_web_elm$Material$Button$setDisabled,
									(!model.bfImport.form.valid) || $elm$core$String$isEmpty(model.bfImport.form.value),
									A2(
										$aforemny$material_components_web_elm$Material$Button$setOnClick,
										$author$project$Messages$ImportRecipe(model.bfImport.form.value),
										$aforemny$material_components_web_elm$Material$Button$config)),
								'Import')
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd]))
					]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$body1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$my4]),
								_List_fromArray(
									[
										$elm$html$Html$text('Replace recipe if it already exists')
									]))
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[
										$elm$html$Html$Attributes$align('center')
									])),
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs3
							]),
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$Switch$switch(
								A2(
									$aforemny$material_components_web_elm$Material$Switch$setAttributes,
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$my2]),
									A2(
										$aforemny$material_components_web_elm$Material$Switch$setOnChange,
										$author$project$Messages$ToggleRecipeReplace,
										A2($aforemny$material_components_web_elm$Material$Switch$setChecked, model.bfImport.replace, $aforemny$material_components_web_elm$Material$Switch$config))))
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd]))
					]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$body1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$my2]),
								_List_fromArray(
									[
										$elm$html$Html$text('Add recipe again even if it already exists')
									]))
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[
										$elm$html$Html$Attributes$align('center')
									])),
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs3
							]),
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$Switch$switch(
								A2(
									$aforemny$material_components_web_elm$Material$Switch$setOnChange,
									$author$project$Messages$ToggleRecipeAdd,
									A2($aforemny$material_components_web_elm$Material$Switch$setChecked, model.bfImport.add, $aforemny$material_components_web_elm$Material$Switch$config)))
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								(!$elm$core$String$isEmpty(model.bfImport.successMessage)) ? A2(
								$rundis$elm_bootstrap$Bootstrap$Alert$simpleSuccess,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(model.bfImport.successMessage)
									])) : A2($elm$html$Html$div, _List_Nil, _List_Nil),
								(!$elm$core$String$isEmpty(model.bfImport.errorMessage)) ? A2(
								$rundis$elm_bootstrap$Bootstrap$Alert$simpleDanger,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(model.bfImport.errorMessage)
									])) : A2($elm$html$Html$div, _List_Nil, _List_Nil)
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(_List_Nil)
					]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$subtitle2, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb0]),
								_List_fromArray(
									[
										$elm$html$Html$text('Hint: Where to find the ID?')
									]))
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$img,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$src(model.basePath + '/assets/brewers_friend_hint.png'),
										$elm$html$Html$Attributes$alt('ID is the number in Brewer\'s Friend recipe link'),
										A2($elm$html$Html$Attributes$attribute, 'width', '100%')
									]),
								_List_Nil)
							]))
					]))
			]));
};
var $author$project$Helpers$center = $elm$html$Html$Attributes$class('varpivo-centered-page');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col = $elm$html$Html$Attributes$class('flex-column');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyCenter = $elm$html$Html$Attributes$class('justify-content-center');
var $author$project$Page$loading = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyCenter, $author$project$Helpers$center]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h4,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$Typography$headline4]),
			_List_fromArray(
				[
					$elm$html$Html$text('Loading recipes')
				])),
			$aforemny$material_components_web_elm$Material$CircularProgress$indeterminate(
			A2($aforemny$material_components_web_elm$Material$CircularProgress$setFourColored, true, $aforemny$material_components_web_elm$Material$CircularProgress$config))
		]));
var $aforemny$material_components_web_elm$Material$Typography$body2 = $elm$html$Html$Attributes$class('mdc-typography--body2');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt5 = $elm$html$Html$Attributes$class('mt-5');
var $aforemny$material_components_web_elm$Material$Button$Outlined = {$: 'Outlined'};
var $aforemny$material_components_web_elm$Material$Button$outlined = F2(
	function (config_, label) {
		return A3($aforemny$material_components_web_elm$Material$Button$button, $aforemny$material_components_web_elm$Material$Button$Outlined, config_, label);
	});
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2 = $elm$html$Html$Attributes$class('p-2');
var $author$project$Page$noRecipes = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$author$project$Helpers$center,
				$elm$html$Html$Attributes$align('center'),
				$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block,
				$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col,
				$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter,
				$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyCenter
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h4,
				_List_fromArray(
					[$aforemny$material_components_web_elm$Material$Typography$headline4, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2]),
				_List_fromArray(
					[
						$elm$html$Html$text('We couldn\'t find any recipes!')
					])),
				A2(
				$elm$html$Html$h4,
				_List_fromArray(
					[$aforemny$material_components_web_elm$Material$Typography$headline4, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2]),
				_List_fromArray(
					[
						$elm$html$Html$text('\uD83D\uDE31 \uD83D\uDE25')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[$aforemny$material_components_web_elm$Material$Typography$body2, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt5]),
				_List_fromArray(
					[
						$elm$html$Html$text('Connecting to ' + model.apiBaseUrl)
					])),
				A2(
				$aforemny$material_components_web_elm$Material$Button$outlined,
				A2(
					$aforemny$material_components_web_elm$Material$Button$setOnClick,
					$author$project$Messages$NavigateTo(
						_Utils_Tuple2(
							_List_fromArray(
								['connections']),
							_List_Nil)),
					$aforemny$material_components_web_elm$Material$Button$config),
				'Manage connections')
			]));
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt2 = $elm$html$Html$Attributes$class('pt-2');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt3 = $elm$html$Html$Attributes$class('pt-3');
var $aforemny$material_components_web_elm$Material$List$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$List$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$List$setTwoLine = F2(
	function (twoLine, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$List$Config(
			_Utils_update(
				config_,
				{twoLine: twoLine}));
	});
var $author$project$Messages$ShowRecipeDetail = function (a) {
	return {$: 'ShowRecipeDetail', a: a};
};
var $aforemny$material_components_web_elm$Material$List$Item$primaryText = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-list-item__primary-text'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$List$Item$secondaryText = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-list-item__secondary-text'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$List$Item$text = F2(
	function (additionalAttributes, _v0) {
		var primary = _v0.primary;
		var secondary = _v0.secondary;
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-list-item__text'),
				additionalAttributes),
			_List_fromArray(
				[
					A2($aforemny$material_components_web_elm$Material$List$Item$primaryText, _List_Nil, primary),
					A2($aforemny$material_components_web_elm$Material$List$Item$secondaryText, _List_Nil, secondary)
				]));
	});
var $author$project$Recipes$viewRecipeListEntry = function (recipeListEntry) {
	return A2(
		$aforemny$material_components_web_elm$Material$List$Item$listItem,
		A2(
			$aforemny$material_components_web_elm$Material$List$Item$setOnClick,
			$author$project$Messages$ShowRecipeDetail(recipeListEntry),
			$aforemny$material_components_web_elm$Material$List$Item$config),
		_List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$List$Item$text,
				_List_Nil,
				{
					primary: _List_fromArray(
						[
							$elm$html$Html$text(recipeListEntry.name)
						]),
					secondary: _List_fromArray(
						[
							$elm$html$Html$text(recipeListEntry.style_name + (' - ' + recipeListEntry.style_type))
						])
				})
			]));
};
var $author$project$Recipes$recipeSelection = function (recipes) {
	var recipeListItems = A2($elm$core$List$map, $author$project$Recipes$viewRecipeListEntry, recipes);
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt2]))
					]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h4,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$headline4]),
								_List_fromArray(
									[
										$elm$html$Html$text('What are we brewing?')
									]))
							]))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt3]))
							]),
						_List_fromArray(
							[
								function () {
								if (!recipeListItems.b) {
									return A2($elm$html$Html$div, _List_Nil, _List_Nil);
								} else {
									var first = recipeListItems.a;
									var rest = recipeListItems.b;
									return A3(
										$aforemny$material_components_web_elm$Material$List$list,
										A2(
											$aforemny$material_components_web_elm$Material$List$setAttributes,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'max-width', '600px'),
													A2($elm$html$Html$Attributes$style, 'border', '1px solid rgba(0,0,0,.1)')
												]),
											A2($aforemny$material_components_web_elm$Material$List$setTwoLine, true, $aforemny$material_components_web_elm$Material$List$config)),
										first,
										rest);
								}
							}()
							]))
					]))
			]));
};
var $author$project$Page$home = function (model) {
	return model.loading ? $author$project$Page$loading : ($elm$core$List$isEmpty(model.availableRecipes) ? $author$project$Page$noRecipes(model) : $author$project$Recipes$recipeSelection(model.availableRecipes));
};
var $author$project$Messages$Increment = {$: 'Increment'};
var $author$project$Messages$NewApiUrl = function (a) {
	return {$: 'NewApiUrl', a: a};
};
var $author$project$Messages$RemoveApiUrl = function (a) {
	return {$: 'RemoveApiUrl', a: a};
};
var $author$project$Messages$SelectApiUrl = function (a) {
	return {$: 'SelectApiUrl', a: a};
};
var $aforemny$material_components_web_elm$Material$Select$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Select$config = $aforemny$material_components_web_elm$Material$Select$Config(
	{additionalAttributes: _List_Nil, disabled: false, label: $elm$core$Maybe$Nothing, leadingIcon: $elm$core$Maybe$Nothing, onChange: $elm$core$Maybe$Nothing, required: false, selected: $elm$core$Maybe$Nothing, valid: true});
var $aforemny$material_components_web_elm$Material$Select$Item$Internal$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Select$Item$config = function (_v0) {
	var value = _v0.value;
	return $aforemny$material_components_web_elm$Material$Select$Item$Internal$Config(
		{additionalAttributes: _List_Nil, disabled: false, value: value});
};
var $aforemny$material_components_web_elm$Material$TextField$Icon$Internal$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var $aforemny$material_components_web_elm$Material$TextField$Icon$customIcon = F3(
	function (node, attributes, nodes) {
		return $aforemny$material_components_web_elm$Material$TextField$Icon$Internal$Icon(
			{attributes: attributes, disabled: false, node: node, nodes: nodes, onInteraction: $elm$core$Maybe$Nothing});
	});
var $author$project$ConnectionsManagement$newApiUrlValidity = function (model) {
	var _v0 = model.newApiUrlFormError;
	if (_v0.$ === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var $author$project$ConnectionsManagement$helperText = function (model) {
	return A2(
		$aforemny$material_components_web_elm$Material$HelperText$helperLine,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$HelperText$helperText,
				A2(
					$aforemny$material_components_web_elm$Material$HelperText$setValidation,
					!$author$project$ConnectionsManagement$newApiUrlValidity(model),
					A2($aforemny$material_components_web_elm$Material$HelperText$setPersistent, true, $aforemny$material_components_web_elm$Material$HelperText$config)),
				A2(
					$elm$core$Maybe$withDefault,
					model.apiConnecting ? 'Connecting...' : 'What address is the server on?',
					model.newApiUrlFormError))
			]));
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyAround = $elm$html$Html$Attributes$class('justify-content-around');
var $aforemny$material_components_web_elm$Material$Select$Outlined = {$: 'Outlined'};
var $aforemny$material_components_web_elm$Material$Select$anchorElt = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-select__anchor'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$Select$disabledProp = function (_v0) {
	var disabled = _v0.a.disabled;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'disabled',
			$elm$json$Json$Encode$bool(disabled)));
};
var $aforemny$material_components_web_elm$Material$Select$dropdownIconElt = A2(
	$elm$html$Html$i,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-select__dropdown-icon')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Select$floatingLabelElt = function (_v0) {
	var label = _v0.a.label;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-floating-label')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				A2($elm$core$Maybe$withDefault, '', label))
			]));
};
var $aforemny$material_components_web_elm$Material$Select$leadingIconCs = function (_v0) {
	var leadingIcon = _v0.a.leadingIcon;
	return A2(
		$elm$core$Maybe$map,
		function (_v1) {
			return $elm$html$Html$Attributes$class('mdc-select--with-leading-icon');
		},
		leadingIcon);
};
var $aforemny$material_components_web_elm$Material$Select$leadingIconElt = function (_v0) {
	var leadingIcon = _v0.a.leadingIcon;
	if (leadingIcon.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		if (leadingIcon.a.$ === 'Icon') {
			var node = leadingIcon.a.a.node;
			var attributes = leadingIcon.a.a.attributes;
			var nodes = leadingIcon.a.a.nodes;
			var onInteraction = leadingIcon.a.a.onInteraction;
			var disabled = leadingIcon.a.a.disabled;
			return A2(
				node,
				A2(
					$elm$core$List$cons,
					$elm$html$Html$Attributes$class('mdc-select__icon'),
					function () {
						if (onInteraction.$ === 'Just') {
							var msg = onInteraction.a;
							return (!disabled) ? A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$tabindex(0),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
									A2(
										$elm$core$List$cons,
										$elm$html$Html$Events$onClick(msg),
										A2(
											$elm$core$List$cons,
											A2(
												$elm$html$Html$Events$on,
												'keydown',
												A2(
													$elm$json$Json$Decode$andThen,
													function (keyCode) {
														return (keyCode === 13) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('');
													},
													$elm$html$Html$Events$keyCode)),
											attributes)))) : A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$tabindex(-1),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
									attributes));
						} else {
							return attributes;
						}
					}()),
				nodes);
		} else {
			var node = leadingIcon.a.a.node;
			var attributes = leadingIcon.a.a.attributes;
			var nodes = leadingIcon.a.a.nodes;
			var onInteraction = leadingIcon.a.a.onInteraction;
			var disabled = leadingIcon.a.a.disabled;
			return A2(
				node,
				A2(
					$elm$core$List$cons,
					$elm$svg$Svg$Attributes$class('mdc-select__icon'),
					function () {
						if (onInteraction.$ === 'Just') {
							var msg = onInteraction.a;
							return (!disabled) ? A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$tabindex(0),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
									A2(
										$elm$core$List$cons,
										$elm$html$Html$Events$onClick(msg),
										A2(
											$elm$core$List$cons,
											A2(
												$elm$html$Html$Events$on,
												'keydown',
												A2(
													$elm$json$Json$Decode$andThen,
													function (keyCode) {
														return (keyCode === 13) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('');
													},
													$elm$html$Html$Events$keyCode)),
											attributes)))) : A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$tabindex(-1),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
									attributes));
						} else {
							return attributes;
						}
					}()),
				nodes);
		}
	}
};
var $elm$html$Html$label = _VirtualDom_node('label');
var $aforemny$material_components_web_elm$Material$Select$lineRippleElt = A2(
	$elm$html$Html$label,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-line-ripple')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Menu$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Menu$config = $aforemny$material_components_web_elm$Material$Menu$Config(
	{additionalAttributes: _List_Nil, onClose: $elm$core$Maybe$Nothing, open: false, quickOpen: false});
var $aforemny$material_components_web_elm$Material$List$Item$graphic = F2(
	function (additionalAttributes, nodes) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('mdc-list-item__graphic'),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$List$Item$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$List$Item$Internal$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$List$Item$setDisabled = F2(
	function (disabled, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$List$Item$Internal$Config(
			_Utils_update(
				config_,
				{disabled: disabled}));
	});
var $aforemny$material_components_web_elm$Material$Select$listItemConfig = F3(
	function (selectedValue, onChange, _v0) {
		var value = _v0.a.value;
		var disabled = _v0.a.disabled;
		var additionalAttributes = _v0.a.additionalAttributes;
		return function () {
			if (onChange.$ === 'Just') {
				var onChange_ = onChange.a;
				return $aforemny$material_components_web_elm$Material$List$Item$setOnClick(
					onChange_(value));
			} else {
				return $elm$core$Basics$identity;
			}
		}()(
			A2(
				$aforemny$material_components_web_elm$Material$List$Item$setAttributes,
				additionalAttributes,
				A2($aforemny$material_components_web_elm$Material$List$Item$setDisabled, disabled, $aforemny$material_components_web_elm$Material$List$Item$config)));
	});
var $aforemny$material_components_web_elm$Material$Select$listItem = F4(
	function (leadingIcon, selected, onChange, _v0) {
		var config_ = _v0.a;
		var nodes = _v0.b;
		return A2(
			$aforemny$material_components_web_elm$Material$List$Item$listItem,
			A3($aforemny$material_components_web_elm$Material$Select$listItemConfig, selected, onChange, config_),
			(!_Utils_eq(leadingIcon, $elm$core$Maybe$Nothing)) ? A2(
				$elm$core$List$cons,
				A2($aforemny$material_components_web_elm$Material$List$Item$graphic, _List_Nil, _List_Nil),
				nodes) : nodes);
	});
var $aforemny$material_components_web_elm$Material$Menu$closeHandler = function (_v0) {
	var onClose = _v0.a.onClose;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Events$on('MDCMenuSurface:close'),
			$elm$json$Json$Decode$succeed),
		onClose);
};
var $aforemny$material_components_web_elm$Material$Menu$openProp = function (_v0) {
	var open = _v0.a.open;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'open',
			$elm$json$Json$Encode$bool(open)));
};
var $aforemny$material_components_web_elm$Material$Menu$quickOpenProp = function (_v0) {
	var quickOpen = _v0.a.quickOpen;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'quickOpen',
			$elm$json$Json$Encode$bool(quickOpen)));
};
var $aforemny$material_components_web_elm$Material$Menu$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-menu mdc-menu-surface'));
var $aforemny$material_components_web_elm$Material$Menu$menu = F2(
	function (config_, nodes) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-menu',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Menu$rootCs,
							$aforemny$material_components_web_elm$Material$Menu$openProp(config_),
							$aforemny$material_components_web_elm$Material$Menu$quickOpenProp(config_),
							$aforemny$material_components_web_elm$Material$Menu$closeHandler(config_)
						])),
				additionalAttributes),
			nodes);
	});
var $aforemny$material_components_web_elm$Material$Menu$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Menu$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Select$menuElt = F5(
	function (leadingIcon, selected, onChange, firstSelectItem, remainingSelectItems) {
		return A2(
			$aforemny$material_components_web_elm$Material$Menu$menu,
			A2(
				$aforemny$material_components_web_elm$Material$Menu$setAttributes,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-select__menu'),
						A2($elm$html$Html$Attributes$style, 'width', '100%')
					]),
				$aforemny$material_components_web_elm$Material$Menu$config),
			_List_fromArray(
				[
					A3(
					$aforemny$material_components_web_elm$Material$List$list,
					A2($aforemny$material_components_web_elm$Material$List$setWrapFocus, true, $aforemny$material_components_web_elm$Material$List$config),
					A4($aforemny$material_components_web_elm$Material$Select$listItem, leadingIcon, selected, onChange, firstSelectItem),
					A2(
						$elm$core$List$map,
						A3($aforemny$material_components_web_elm$Material$Select$listItem, leadingIcon, selected, onChange),
						remainingSelectItems))
				]));
	});
var $aforemny$material_components_web_elm$Material$Select$notchedOutlineElt = function (_v0) {
	var label = _v0.a.label;
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-notched-outline')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-notched-outline__leading')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-notched-outline__notch')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mdc-floating-label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($elm$core$Maybe$withDefault, '', label))
							]))
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-notched-outline__trailing')
					]),
				_List_Nil)
			]));
};
var $aforemny$material_components_web_elm$Material$Select$outlinedCs = function (variant) {
	return _Utils_eq(variant, $aforemny$material_components_web_elm$Material$Select$Outlined) ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-select--outlined')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Select$requiredProp = function (_v0) {
	var required = _v0.a.required;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'required',
			$elm$json$Json$Encode$bool(required)));
};
var $aforemny$material_components_web_elm$Material$Select$rippleElt = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-text-field__ripple')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Select$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-select'));
var $aforemny$material_components_web_elm$Material$Select$selectedIndexProp = function (selectedIndex) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'selectedIndex',
			$elm$json$Json$Encode$int(
				A2($elm$core$Maybe$withDefault, -1, selectedIndex))));
};
var $elm$html$Html$Attributes$readonly = $elm$html$Html$Attributes$boolProperty('readOnly');
var $aforemny$material_components_web_elm$Material$Select$selectedTextElt = A2(
	$elm$html$Html$input,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-select__selected-text'),
			$elm$html$Html$Attributes$disabled(true),
			$elm$html$Html$Attributes$readonly(true)
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Select$validProp = function (_v0) {
	var valid = _v0.a.valid;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'valid',
			$elm$json$Json$Encode$bool(valid)));
};
var $aforemny$material_components_web_elm$Material$Select$select = F4(
	function (variant, config_, firstSelectItem, remainingSelectItems) {
		var leadingIcon = config_.a.leadingIcon;
		var selected = config_.a.selected;
		var additionalAttributes = config_.a.additionalAttributes;
		var onChange = config_.a.onChange;
		var selectedIndex = $elm$core$List$head(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (index, _v0) {
							var value = _v0.a.a.value;
							return _Utils_eq(
								$elm$core$Maybe$Just(value),
								selected) ? $elm$core$Maybe$Just(index) : $elm$core$Maybe$Nothing;
						}),
					A2($elm$core$List$cons, firstSelectItem, remainingSelectItems))));
		return A3(
			$elm$html$Html$node,
			'mdc-select',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Select$rootCs,
							$aforemny$material_components_web_elm$Material$Select$outlinedCs(variant),
							$aforemny$material_components_web_elm$Material$Select$leadingIconCs(config_),
							$aforemny$material_components_web_elm$Material$Select$disabledProp(config_),
							$aforemny$material_components_web_elm$Material$Select$selectedIndexProp(selectedIndex),
							$aforemny$material_components_web_elm$Material$Select$validProp(config_),
							$aforemny$material_components_web_elm$Material$Select$requiredProp(config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[
					A2(
					$aforemny$material_components_web_elm$Material$Select$anchorElt,
					_List_Nil,
					$elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[
									$aforemny$material_components_web_elm$Material$Select$rippleElt,
									$aforemny$material_components_web_elm$Material$Select$leadingIconElt(config_),
									$aforemny$material_components_web_elm$Material$Select$selectedTextElt,
									$aforemny$material_components_web_elm$Material$Select$dropdownIconElt
								]),
								_Utils_eq(variant, $aforemny$material_components_web_elm$Material$Select$Outlined) ? _List_fromArray(
								[
									$aforemny$material_components_web_elm$Material$Select$notchedOutlineElt(config_)
								]) : _List_fromArray(
								[
									$aforemny$material_components_web_elm$Material$Select$floatingLabelElt(config_),
									$aforemny$material_components_web_elm$Material$Select$lineRippleElt
								])
							]))),
					A5($aforemny$material_components_web_elm$Material$Select$menuElt, leadingIcon, selected, onChange, firstSelectItem, remainingSelectItems)
				]));
	});
var $aforemny$material_components_web_elm$Material$Select$outlined = F3(
	function (config_, firstSelectItem, remainingSelectItems) {
		return A4($aforemny$material_components_web_elm$Material$Select$select, $aforemny$material_components_web_elm$Material$Select$Outlined, config_, firstSelectItem, remainingSelectItems);
	});
var $aforemny$material_components_web_elm$Material$TextField$outlined = function (config_) {
	return A2($aforemny$material_components_web_elm$Material$TextField$textField, true, config_);
};
var $aforemny$material_components_web_elm$Material$Select$Item$Internal$SelectItem = F2(
	function (a, b) {
		return {$: 'SelectItem', a: a, b: b};
	});
var $aforemny$material_components_web_elm$Material$Select$Item$selectItem = $aforemny$material_components_web_elm$Material$Select$Item$Internal$SelectItem;
var $aforemny$material_components_web_elm$Material$Select$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Select$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Select$setLabel = F2(
	function (label, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Select$Config(
			_Utils_update(
				config_,
				{label: label}));
	});
var $aforemny$material_components_web_elm$Material$Select$setOnChange = F2(
	function (onChange, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Select$Config(
			_Utils_update(
				config_,
				{
					onChange: $elm$core$Maybe$Just(onChange)
				}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setOnChange = F2(
	function (onChange, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{
					onChange: $elm$core$Maybe$Just(onChange)
				}));
	});
var $aforemny$material_components_web_elm$Material$Select$setSelected = F2(
	function (selected, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Select$Config(
			_Utils_update(
				config_,
				{selected: selected}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setTrailingIcon = F2(
	function (trailingIcon, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{trailingIcon: trailingIcon}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setType = F2(
	function (type_, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{type_: type_}));
	});
var $aforemny$material_components_web_elm$Material$Select$setValid = F2(
	function (valid, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Select$Config(
			_Utils_update(
				config_,
				{valid: valid}));
	});
var $aforemny$material_components_web_elm$Material$CircularProgress$Small = {$: 'Small'};
var $aforemny$material_components_web_elm$Material$CircularProgress$small = $aforemny$material_components_web_elm$Material$CircularProgress$Small;
var $author$project$ConnectionsManagement$urlNotSelected = function (model) {
	var _v0 = model.selectedApiUrl;
	if (_v0.$ === 'Just') {
		return false;
	} else {
		return true;
	}
};
var $author$project$ConnectionsManagement$noApiUrl = function (model) {
	var apiUrlToSelectItem = function (apiUrl) {
		return A2(
			$aforemny$material_components_web_elm$Material$Select$Item$selectItem,
			$aforemny$material_components_web_elm$Material$Select$Item$config(
				{value: apiUrl}),
			_List_fromArray(
				[
					$elm$html$Html$text(apiUrl)
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyAround]),
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$container,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h4,
										_List_fromArray(
											[$aforemny$material_components_web_elm$Material$Typography$headline4, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2]),
										_List_fromArray(
											[
												$elm$html$Html$text('Where should we connect to?')
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						function () {
							var _v0 = model.storedApiUrls;
							if (!_v0.b) {
								return _List_Nil;
							} else {
								var first = _v0.a;
								var rest = _v0.b;
								return _List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$row,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Grid$col,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$p,
														_List_fromArray(
															[$aforemny$material_components_web_elm$Material$Typography$body1]),
														_List_fromArray(
															[
																$elm$html$Html$text('Select one of your stored connections below.')
															]))
													]))
											])),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$row,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Grid$col,
												_List_Nil,
												_List_fromArray(
													[
														A3(
														$aforemny$material_components_web_elm$Material$Select$outlined,
														A2(
															$aforemny$material_components_web_elm$Material$Select$setValid,
															$author$project$ConnectionsManagement$newApiUrlValidity(model),
															A2(
																$aforemny$material_components_web_elm$Material$Select$setSelected,
																model.selectedApiUrl,
																A2(
																	$aforemny$material_components_web_elm$Material$Select$setAttributes,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('varpivo-connection-select')
																		]),
																	A2(
																		$aforemny$material_components_web_elm$Material$Select$setOnChange,
																		$author$project$Messages$SelectApiUrl,
																		A2(
																			$aforemny$material_components_web_elm$Material$Select$setLabel,
																			$elm$core$Maybe$Just('Var:Pivo server address'),
																			$aforemny$material_components_web_elm$Material$Select$config))))),
														apiUrlToSelectItem(first),
														A2($elm$core$List$map, apiUrlToSelectItem, rest)),
														$author$project$ConnectionsManagement$helperText(model)
													]))
											])),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$row,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Grid$col,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$aforemny$material_components_web_elm$Material$Button$outlined,
														A2(
															$aforemny$material_components_web_elm$Material$Button$setOnClick,
															$author$project$Messages$RemoveApiUrl(
																A2($elm$core$Maybe$withDefault, '', model.selectedApiUrl)),
															A2(
																$aforemny$material_components_web_elm$Material$Button$setDisabled,
																_Utils_eq(
																	A2($elm$core$Maybe$withDefault, '', model.selectedApiUrl),
																	model.apiBaseUrl) || $author$project$ConnectionsManagement$urlNotSelected(model),
																A2(
																	$aforemny$material_components_web_elm$Material$Button$setAttributes,
																	_List_fromArray(
																		[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
																	A2($aforemny$material_components_web_elm$Material$Button$setOnClick, $author$project$Messages$Increment, $aforemny$material_components_web_elm$Material$Button$config)))),
														'Remove')
													])),
												A2(
												$rundis$elm_bootstrap$Bootstrap$Grid$col,
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
														_List_fromArray(
															[
																$elm$html$Html$Attributes$align('end')
															]))
													]),
												_List_fromArray(
													[
														A2(
														$aforemny$material_components_web_elm$Material$Button$raised,
														A2(
															$aforemny$material_components_web_elm$Material$Button$setDisabled,
															$author$project$ConnectionsManagement$urlNotSelected(model),
															A2(
																$aforemny$material_components_web_elm$Material$Button$setAttributes,
																_List_fromArray(
																	[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
																A2(
																	$aforemny$material_components_web_elm$Material$Button$setOnClick,
																	$author$project$Messages$NewApiUrl(
																		A2($elm$core$Maybe$withDefault, model.apiBaseUrl, model.selectedApiUrl)),
																	$aforemny$material_components_web_elm$Material$Button$config))),
														'Connect')
													]))
											])),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$row,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
												_List_fromArray(
													[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt5]))
											]),
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Grid$col,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$p,
														_List_fromArray(
															[$aforemny$material_components_web_elm$Material$Typography$headline6]),
														_List_fromArray(
															[
																$elm$html$Html$text('Or...')
															]))
													]))
											]))
									]);
							}
						}()),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[$aforemny$material_components_web_elm$Material$Typography$body1]),
										_List_fromArray(
											[
												$elm$html$Html$text('Enter the address of your Var:Pivo server.')
											]))
									]))
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[$aforemny$material_components_web_elm$Material$Typography$body1]),
										_List_fromArray(
											[
												$elm$html$Html$text('You should find it on the device display, or try the NFC thing!')
											]))
									]))
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_Nil,
								_List_fromArray(
									[
										$aforemny$material_components_web_elm$Material$TextField$outlined(
										A2(
											$aforemny$material_components_web_elm$Material$TextField$setValid,
											$author$project$ConnectionsManagement$newApiUrlValidity(model),
											A2(
												$aforemny$material_components_web_elm$Material$TextField$setTrailingIcon,
												model.apiConnecting ? $elm$core$Maybe$Just(
													A3(
														$aforemny$material_components_web_elm$Material$TextField$Icon$customIcon,
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$aforemny$material_components_web_elm$Material$CircularProgress$indeterminate(
																A2($aforemny$material_components_web_elm$Material$CircularProgress$setSize, $aforemny$material_components_web_elm$Material$CircularProgress$small, $aforemny$material_components_web_elm$Material$CircularProgress$config))
															]))) : $elm$core$Maybe$Nothing,
												A2(
													$aforemny$material_components_web_elm$Material$TextField$setOnChange,
													$author$project$Messages$NewApiUrl,
													A2(
														$aforemny$material_components_web_elm$Material$TextField$setAttributes,
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
														A2(
															$aforemny$material_components_web_elm$Material$TextField$setType,
															$elm$core$Maybe$Just('string'),
															A2(
																$aforemny$material_components_web_elm$Material$TextField$setRequired,
																true,
																A2(
																	$aforemny$material_components_web_elm$Material$TextField$setLabel,
																	$elm$core$Maybe$Just('Address of Var:Pivo server'),
																	$aforemny$material_components_web_elm$Material$TextField$config)))))))),
										$author$project$ConnectionsManagement$helperText(model)
									]))
							]))
					]))
			]));
};
var $author$project$Messages$SelectRecipe = function (a) {
	return {$: 'SelectRecipe', a: a};
};
var $aforemny$material_components_web_elm$Material$DataTable$Cell = function (a) {
	return {$: 'Cell', a: a};
};
var $aforemny$material_components_web_elm$Material$DataTable$cell = F2(
	function (attributes, nodes) {
		return $aforemny$material_components_web_elm$Material$DataTable$Cell(
			{attributes: attributes, nodes: nodes, numeric: false});
	});
var $aforemny$material_components_web_elm$Material$DataTable$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$DataTable$config = $aforemny$material_components_web_elm$Material$DataTable$Config(
	{additionalAttributes: _List_Nil, label: $elm$core$Maybe$Nothing});
var $aforemny$material_components_web_elm$Material$Fab$Extended$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$config = $aforemny$material_components_web_elm$Material$Fab$Extended$Config(
	{additionalAttributes: _List_Nil, exited: false, icon: $elm$core$Maybe$Nothing, onClick: $elm$core$Maybe$Nothing, trailingIcon: false});
var $aforemny$material_components_web_elm$Material$DataTable$ariaLabelAttr = function (_v0) {
	var label = _v0.a.label;
	return A2(
		$elm$core$Maybe$map,
		$elm$html$Html$Attributes$attribute('aria-label'),
		label);
};
var $aforemny$material_components_web_elm$Material$Checkbox$Internal$Config = function (a) {
	return {$: 'Config', a: a};
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $aforemny$material_components_web_elm$Material$Checkbox$backgroundElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-checkbox__background')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('mdc-checkbox__checkmark'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('mdc-checkbox__checkmark-path'),
							$elm$svg$Svg$Attributes$fill('none'),
							$elm$svg$Svg$Attributes$d('M1.73,12.91 8.1,19.28 22.79,4.59')
						]),
					_List_Nil)
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-checkbox__mixedmark')
				]),
			_List_Nil)
		]));
var $aforemny$material_components_web_elm$Material$Checkbox$Internal$Checked = {$: 'Checked'};
var $aforemny$material_components_web_elm$Material$Checkbox$checkedProp = function (_v0) {
	var state = _v0.a.state;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'checked',
			$elm$json$Json$Encode$bool(
				_Utils_eq(
					state,
					$elm$core$Maybe$Just($aforemny$material_components_web_elm$Material$Checkbox$Internal$Checked)))));
};
var $aforemny$material_components_web_elm$Material$Checkbox$disabledProp = function (_v0) {
	var disabled = _v0.a.disabled;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'disabled',
			$elm$json$Json$Encode$bool(disabled)));
};
var $aforemny$material_components_web_elm$Material$Checkbox$Internal$Indeterminate = {$: 'Indeterminate'};
var $aforemny$material_components_web_elm$Material$Checkbox$indeterminateProp = function (_v0) {
	var state = _v0.a.state;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'indeterminate',
			$elm$json$Json$Encode$bool(
				_Utils_eq(
					state,
					$elm$core$Maybe$Just($aforemny$material_components_web_elm$Material$Checkbox$Internal$Indeterminate)))));
};
var $aforemny$material_components_web_elm$Material$Checkbox$changeHandler = function (_v0) {
	var onChange = _v0.a.onChange;
	return A2(
		$elm$core$Maybe$map,
		function (msg) {
			return A2(
				$elm$html$Html$Events$on,
				'change',
				$elm$json$Json$Decode$succeed(msg));
		},
		onChange);
};
var $aforemny$material_components_web_elm$Material$Checkbox$nativeControlElt = function (config_) {
	return A2(
		$elm$html$Html$input,
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$core$Maybe$Just(
					$elm$html$Html$Attributes$type_('checkbox')),
					$elm$core$Maybe$Just(
					$elm$html$Html$Attributes$class('mdc-checkbox__native-control')),
					$aforemny$material_components_web_elm$Material$Checkbox$checkedProp(config_),
					$aforemny$material_components_web_elm$Material$Checkbox$indeterminateProp(config_),
					$aforemny$material_components_web_elm$Material$Checkbox$changeHandler(config_)
				])),
		_List_Nil);
};
var $aforemny$material_components_web_elm$Material$Checkbox$rippleElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-checkbox__ripple')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Checkbox$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-checkbox'));
var $aforemny$material_components_web_elm$Material$Checkbox$touchCs = function (_v0) {
	var touch = _v0.a.touch;
	return touch ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-checkbox--touch')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Checkbox$checkbox = function (config_) {
	var touch = config_.a.touch;
	var additionalAttributes = config_.a.additionalAttributes;
	var wrapTouch = function (node) {
		return touch ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-touch-target-wrapper')
				]),
			_List_fromArray(
				[node])) : node;
	};
	return wrapTouch(
		A3(
			$elm$html$Html$node,
			'mdc-checkbox',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Checkbox$rootCs,
							$aforemny$material_components_web_elm$Material$Checkbox$touchCs(config_),
							$aforemny$material_components_web_elm$Material$Checkbox$checkedProp(config_),
							$aforemny$material_components_web_elm$Material$Checkbox$indeterminateProp(config_),
							$aforemny$material_components_web_elm$Material$Checkbox$disabledProp(config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Checkbox$nativeControlElt(config_),
					$aforemny$material_components_web_elm$Material$Checkbox$backgroundElt,
					$aforemny$material_components_web_elm$Material$Checkbox$rippleElt
				])));
};
var $aforemny$material_components_web_elm$Material$DataTable$dataTableCellCheckboxCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-data-table__cell--checkbox'));
var $aforemny$material_components_web_elm$Material$DataTable$dataTableCellCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-data-table__cell'));
var $aforemny$material_components_web_elm$Material$DataTable$dataTableCellNumericCs = function (numeric) {
	return numeric ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-data-table__cell--numeric')) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $aforemny$material_components_web_elm$Material$DataTable$bodyCell = function (cell_) {
	if (cell_.$ === 'Cell') {
		var numeric = cell_.a.numeric;
		var attributes = cell_.a.attributes;
		var nodes = cell_.a.nodes;
		return A2(
			$elm$html$Html$td,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$DataTable$dataTableCellCs,
							$aforemny$material_components_web_elm$Material$DataTable$dataTableCellNumericCs(numeric)
						])),
				attributes),
			nodes);
	} else {
		var attributes = cell_.a.attributes;
		var config_ = cell_.a.config_;
		return A2(
			$elm$html$Html$td,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[$aforemny$material_components_web_elm$Material$DataTable$dataTableCellCs, $aforemny$material_components_web_elm$Material$DataTable$dataTableCellCheckboxCs])),
				attributes),
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Checkbox$checkbox(
					function () {
						var config__ = config_.a;
						return $aforemny$material_components_web_elm$Material$Checkbox$Internal$Config(
							_Utils_update(
								config__,
								{
									additionalAttributes: A2(
										$elm$core$List$cons,
										$elm$html$Html$Attributes$class('mdc-data-table__row-checkbox'),
										config__.additionalAttributes)
								}));
					}())
				]));
	}
};
var $aforemny$material_components_web_elm$Material$DataTable$dataTableRowCs = $elm$html$Html$Attributes$class('mdc-data-table__row');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $aforemny$material_components_web_elm$Material$DataTable$bodyRow = function (_v0) {
	var attributes = _v0.a.attributes;
	var nodes = _v0.a.nodes;
	return A2(
		$elm$html$Html$tr,
		A2($elm$core$List$cons, $aforemny$material_components_web_elm$Material$DataTable$dataTableRowCs, attributes),
		A2($elm$core$List$map, $aforemny$material_components_web_elm$Material$DataTable$bodyCell, nodes));
};
var $aforemny$material_components_web_elm$Material$DataTable$dataTableContentCs = $elm$html$Html$Attributes$class('mdc-data-table__content');
var $aforemny$material_components_web_elm$Material$DataTable$dataTableCs = $elm$html$Html$Attributes$class('mdc-data-table');
var $aforemny$material_components_web_elm$Material$DataTable$dataTableTableCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-data-table__table'));
var $aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderRowCs = $elm$html$Html$Attributes$class('mdc-data-table__header-row');
var $aforemny$material_components_web_elm$Material$DataTable$colScopeAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'scope', 'col'));
var $aforemny$material_components_web_elm$Material$DataTable$columnHeaderRoleAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'role', 'columnheader'));
var $aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellCheckboxCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-data-table__header-cell--checkbox'));
var $aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-data-table__header-cell'));
var $aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellNumericCs = function (numeric) {
	return numeric ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-data-table__header-cell--numeric')) : $elm$core$Maybe$Nothing;
};
var $elm$html$Html$th = _VirtualDom_node('th');
var $aforemny$material_components_web_elm$Material$DataTable$headerCell = function (cell_) {
	if (cell_.$ === 'Cell') {
		var numeric = cell_.a.numeric;
		var attributes = cell_.a.attributes;
		var nodes = cell_.a.nodes;
		return A2(
			$elm$html$Html$th,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellCs,
							$aforemny$material_components_web_elm$Material$DataTable$columnHeaderRoleAttr,
							$aforemny$material_components_web_elm$Material$DataTable$colScopeAttr,
							$aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellNumericCs(numeric)
						])),
				attributes),
			nodes);
	} else {
		var attributes = cell_.a.attributes;
		var config_ = cell_.a.config_;
		return A2(
			$elm$html$Html$th,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[$aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellCs, $aforemny$material_components_web_elm$Material$DataTable$columnHeaderRoleAttr, $aforemny$material_components_web_elm$Material$DataTable$colScopeAttr, $aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderCellCheckboxCs])),
				attributes),
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Checkbox$checkbox(
					function () {
						var config__ = config_.a;
						return $aforemny$material_components_web_elm$Material$Checkbox$Internal$Config(
							_Utils_update(
								config__,
								{
									additionalAttributes: A2(
										$elm$core$List$cons,
										$elm$html$Html$Attributes$class('mdc-data-table__row-checkbox'),
										config__.additionalAttributes)
								}));
					}())
				]));
	}
};
var $aforemny$material_components_web_elm$Material$DataTable$headerRow = function (_v0) {
	var attributes = _v0.a.attributes;
	var nodes = _v0.a.nodes;
	return A2(
		$elm$html$Html$tr,
		A2($elm$core$List$cons, $aforemny$material_components_web_elm$Material$DataTable$dataTableHeaderRowCs, attributes),
		A2($elm$core$List$map, $aforemny$material_components_web_elm$Material$DataTable$headerCell, nodes));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $aforemny$material_components_web_elm$Material$DataTable$dataTable = F2(
	function (config_, _v0) {
		var additionalAttributes = config_.a.additionalAttributes;
		var thead = _v0.thead;
		var tbody = _v0.tbody;
		return A3(
			$elm$html$Html$node,
			'mdc-data-table',
			A2($elm$core$List$cons, $aforemny$material_components_web_elm$Material$DataTable$dataTableCs, additionalAttributes),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$table,
					A2(
						$elm$core$List$filterMap,
						$elm$core$Basics$identity,
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$DataTable$dataTableTableCs,
								$aforemny$material_components_web_elm$Material$DataTable$ariaLabelAttr(config_)
							])),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$thead,
							_List_Nil,
							A2($elm$core$List$map, $aforemny$material_components_web_elm$Material$DataTable$headerRow, thead)),
							A2(
							$elm$html$Html$tbody,
							_List_fromArray(
								[$aforemny$material_components_web_elm$Material$DataTable$dataTableContentCs]),
							A2($elm$core$List$map, $aforemny$material_components_web_elm$Material$DataTable$bodyRow, tbody))
						]))
				]));
	});
var $aforemny$material_components_web_elm$Material$Fab$Extended$clickHandler = function (_v0) {
	var onClick = _v0.a.onClick;
	return A2($elm$core$Maybe$map, $elm$html$Html$Events$onClick, onClick);
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$exitedCs = function (_v0) {
	var exited = _v0.a.exited;
	return exited ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-fab--exited')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$extendedFabCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-fab mdc-fab--extended'));
var $aforemny$material_components_web_elm$Material$Fab$Extended$labelElt = function (label) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-fab__label')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				])));
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$iconElt = function (_v0) {
	var config_ = _v0.a;
	return A2(
		$elm$core$Maybe$map,
		$elm$html$Html$map($elm$core$Basics$never),
		function () {
			var _v1 = config_.icon;
			if (_v1.$ === 'Just') {
				if (_v1.a.$ === 'Icon') {
					var node = _v1.a.a.node;
					var attributes = _v1.a.a.attributes;
					var nodes = _v1.a.a.nodes;
					return $elm$core$Maybe$Just(
						A2(
							node,
							A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$class('mdc-fab__icon'),
								attributes),
							nodes));
				} else {
					var node = _v1.a.a.node;
					var attributes = _v1.a.a.attributes;
					var nodes = _v1.a.a.nodes;
					return $elm$core$Maybe$Just(
						A2(
							node,
							A2(
								$elm$core$List$cons,
								$elm$svg$Svg$Attributes$class('mdc-fab__icon'),
								attributes),
							nodes));
				}
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$leadingIconElt = function (config_) {
	var trailingIcon = config_.a.trailingIcon;
	return (!trailingIcon) ? $aforemny$material_components_web_elm$Material$Fab$Extended$iconElt(config_) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$rippleElt = $elm$core$Maybe$Just(
	A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-fab__ripple')
			]),
		_List_Nil));
var $aforemny$material_components_web_elm$Material$Fab$Extended$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-fab'));
var $aforemny$material_components_web_elm$Material$Fab$Extended$tabIndexProp = function (tabIndex) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'tabIndex',
			$elm$json$Json$Encode$int(tabIndex)));
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$trailingIconElt = function (config_) {
	var trailingIcon = config_.a.trailingIcon;
	return trailingIcon ? $aforemny$material_components_web_elm$Material$Fab$Extended$iconElt(config_) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Fab$Extended$fab = F2(
	function (config_, label) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-fab',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Fab$Extended$rootCs,
							$aforemny$material_components_web_elm$Material$Fab$Extended$extendedFabCs,
							$aforemny$material_components_web_elm$Material$Fab$Extended$exitedCs(config_),
							$aforemny$material_components_web_elm$Material$Fab$Extended$clickHandler(config_),
							$aforemny$material_components_web_elm$Material$Fab$Extended$tabIndexProp(0)
						])),
				additionalAttributes),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						$aforemny$material_components_web_elm$Material$Fab$Extended$rippleElt,
						$aforemny$material_components_web_elm$Material$Fab$Extended$leadingIconElt(config_),
						$aforemny$material_components_web_elm$Material$Fab$Extended$labelElt(label),
						$aforemny$material_components_web_elm$Material$Fab$Extended$trailingIconElt(config_)
					])));
	});
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $aforemny$material_components_web_elm$Material$Typography$headline5 = $elm$html$Html$Attributes$class('mdc-typography--headline5');
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $aforemny$material_components_web_elm$Material$DataTable$Row = function (a) {
	return {$: 'Row', a: a};
};
var $aforemny$material_components_web_elm$Material$DataTable$row = F2(
	function (attributes, nodes) {
		return $aforemny$material_components_web_elm$Material$DataTable$Row(
			{attributes: attributes, nodes: nodes});
	});
var $author$project$Recipes$ingredientView = function (ingredient) {
	return A2(
		$aforemny$material_components_web_elm$Material$DataTable$row,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$DataTable$cell,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(ingredient.name)
					])),
				A2(
				$aforemny$material_components_web_elm$Material$DataTable$cell,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($myrho$elm_round$Round$round, 2, ingredient.amount) + (' ' + ingredient.unit))
					]))
			]));
};
var $aforemny$material_components_web_elm$Material$Theme$primaryBg = $elm$html$Html$Attributes$class('mdc-theme--primary-bg');
var $aforemny$material_components_web_elm$Material$DataTable$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$DataTable$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Fab$Extended$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Fab$Extended$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Fab$Extended$setOnClick = F2(
	function (onClick, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Fab$Extended$Config(
			_Utils_update(
				config_,
				{
					onClick: $elm$core$Maybe$Just(onClick)
				}));
	});
var $aforemny$material_components_web_elm$Material$Typography$subtitle1 = $elm$html$Html$Attributes$class('mdc-typography--subtitle1');
var $author$project$Recipes$recipeDetail = F2(
	function (recipe, brewable) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pb5]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h4,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$headline4]),
									_List_fromArray(
										[
											$elm$html$Html$text(recipe.name)
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$subtitle1]),
									_List_fromArray(
										[
											$elm$html$Html$text(recipe.style_type + (' - ' + recipe.style_name))
										]))
								]))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h5,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$headline5]),
									_List_fromArray(
										[
											$elm$html$Html$text('Ingredients')
										]))
								]))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$aforemny$material_components_web_elm$Material$DataTable$dataTable,
									A2(
										$aforemny$material_components_web_elm$Material$DataTable$setAttributes,
										_List_fromArray(
											[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
										$aforemny$material_components_web_elm$Material$DataTable$config),
									{
										tbody: A2(
											$elm$core$List$map,
											function (ingredient) {
												return $author$project$Recipes$ingredientView(ingredient);
											},
											recipe.ingredients),
										thead: _List_fromArray(
											[
												A2(
												$aforemny$material_components_web_elm$Material$DataTable$row,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$aforemny$material_components_web_elm$Material$DataTable$cell,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text('Ingredient')
															])),
														A2(
														$aforemny$material_components_web_elm$Material$DataTable$cell,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text('Amount')
															]))
													]))
											])
									})
								]))
						])),
					brewable ? A2(
					$aforemny$material_components_web_elm$Material$Fab$Extended$fab,
					A2(
						$aforemny$material_components_web_elm$Material$Fab$Extended$setOnClick,
						$author$project$Messages$ShowDialog(
							$author$project$Messages$Confirm(
								_Utils_Tuple2(
									'You are about to start brewing ' + recipe.name,
									$author$project$Messages$SelectRecipe(recipe)))),
						A2(
							$aforemny$material_components_web_elm$Material$Fab$Extended$setAttributes,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
									A2($elm$html$Html$Attributes$style, 'bottom', '2rem'),
									A2($elm$html$Html$Attributes$style, 'right', '2rem'),
									$aforemny$material_components_web_elm$Material$Theme$primaryBg
								]),
							$aforemny$material_components_web_elm$Material$Fab$Extended$config)),
					'Brew!') : A2($elm$html$Html$div, _List_Nil, _List_Nil)
				]));
	});
var $author$project$Messages$FinishStep = function (a) {
	return {$: 'FinishStep', a: a};
};
var $author$project$Messages$Multiple = function (a) {
	return {$: 'Multiple', a: a};
};
var $author$project$Messages$TareScale = {$: 'TareScale'};
var $aforemny$material_components_web_elm$Material$Typography$headline1 = $elm$html$Html$Attributes$class('mdc-typography--headline1');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyBetween = $elm$html$Html$Attributes$class('justify-content-between');
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $aforemny$material_components_web_elm$Material$Button$Unelevated = {$: 'Unelevated'};
var $aforemny$material_components_web_elm$Material$Button$unelevated = F2(
	function (config_, label) {
		return A3($aforemny$material_components_web_elm$Material$Button$button, $aforemny$material_components_web_elm$Material$Button$Unelevated, config_, label);
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col10 = {$: 'Col10'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col10);
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2 = {$: 'Col2'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs2 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2);
var $author$project$Scale$scale = F2(
	function (model, stepId) {
		var target = A2(
			$elm$core$Maybe$withDefault,
			-1,
			A2(
				$elm$core$Maybe$withDefault,
				$author$project$Data$Step$empty,
				A2(
					$elm$core$Dict$get,
					A2($elm$core$Maybe$withDefault, '', stepId),
					model.recipeSteps)).target);
		var subtitle = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Data$Step$empty,
			A2(
				$elm$core$Dict$get,
				A2($elm$core$Maybe$withDefault, '', stepId),
				model.recipeSteps)).description;
		var _v0 = function () {
			var _v1 = _Utils_Tuple2(
				stepId,
				A2(
					$elm$core$Dict$member,
					A2($elm$core$Maybe$withDefault, '', stepId),
					model.recipeSteps));
			if ((_v1.a.$ === 'Just') && _v1.b) {
				var _v2 = A2($elm$core$Basics$compare, model.weight, target);
				switch (_v2.$) {
					case 'LT':
						return _Utils_Tuple2(
							A2(
								$aforemny$material_components_web_elm$Material$Icon$icon,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('varpivo-scale-add')
									]),
								'arrow_drop_up'),
							A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$aforemny$material_components_web_elm$Material$Typography$headline4,
										$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2,
										$elm$html$Html$Attributes$align('end')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Target: '),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('varpivo-scale-add')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$elm$core$String$fromFloat(target) + ' g')
											]))
									])));
					case 'EQ':
						return _Utils_Tuple2(
							A2($aforemny$material_components_web_elm$Material$Icon$icon, _List_Nil, 'check'),
							A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$aforemny$material_components_web_elm$Material$Typography$headline4,
										$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2,
										$elm$html$Html$Attributes$align('end')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Target: ' + ($elm$core$String$fromFloat(target) + ' g'))
									])));
					default:
						return _Utils_Tuple2(
							A2(
								$aforemny$material_components_web_elm$Material$Icon$icon,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('varpivo-scale-remove')
									]),
								'arrow_drop_down'),
							A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$aforemny$material_components_web_elm$Material$Typography$headline4,
										$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2,
										$elm$html$Html$Attributes$align('end')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Target: '),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('varpivo-scale-remove')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$elm$core$String$fromFloat(target) + ' g')
											]))
									])));
				}
			} else {
				return _Utils_Tuple2(
					A2($elm$html$Html$div, _List_Nil, _List_Nil),
					A2($elm$html$Html$div, _List_Nil, _List_Nil));
			}
		}();
		var icon = _v0.a;
		var targetText = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$author$project$Helpers$center,
					$elm$html$Html$Attributes$align('center'),
					$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block,
					$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col,
					$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsCenter,
					$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyBetween
				]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$headline4, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2]),
									_List_fromArray(
										[
											$elm$html$Html$text('Scale')
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$subtitle1, $aforemny$material_components_web_elm$Material$Theme$textSecondaryOnBackground]),
									_List_fromArray(
										[
											$elm$html$Html$text(subtitle)
										]))
								]))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
							_List_fromArray(
								[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]))
						]),
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$row,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$col,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10,
													$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
													_List_fromArray(
														[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]))
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$aforemny$material_components_web_elm$Material$Typography$headline1,
															$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2,
															$elm$html$Html$Attributes$align('end')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromFloat(
																A2($elm$core$Basics$max, model.weight, 0)))
														]))
												])),
											A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$col,
											_List_fromArray(
												[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs2, $rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs]),
											_List_fromArray(
												[
													icon,
													A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[$aforemny$material_components_web_elm$Material$Typography$headline6]),
															_List_fromArray(
																[
																	$elm$html$Html$text(' g')
																]))
														]))
												]))
										])),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$row,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$col,
											_List_Nil,
											_List_fromArray(
												[targetText]))
										]))
								]))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$aforemny$material_components_web_elm$Material$Button$outlined,
									A2($aforemny$material_components_web_elm$Material$Button$setOnClick, $author$project$Messages$TareScale, $aforemny$material_components_web_elm$Material$Button$config),
									'Tare')
								])),
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$aforemny$material_components_web_elm$Material$Button$outlined,
									A2(
										$aforemny$material_components_web_elm$Material$Button$setOnClick,
										$author$project$Messages$NavigateTo(
											_Utils_Tuple2(_List_Nil, _List_Nil)),
										$aforemny$material_components_web_elm$Material$Button$config),
									'Cancel')
								])),
							function () {
							if (stepId.$ === 'Just') {
								var string = stepId.a;
								return A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$col,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$aforemny$material_components_web_elm$Material$Button$unelevated,
											A2(
												$aforemny$material_components_web_elm$Material$Button$setOnClick,
												$author$project$Messages$Multiple(
													_List_fromArray(
														[
															$author$project$Messages$FinishStep(string),
															$author$project$Messages$NavigateTo(
															_Utils_Tuple2(_List_Nil, _List_Nil))
														])),
												$aforemny$material_components_web_elm$Material$Button$config),
											'Confirm')
										]));
							} else {
								return A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$col,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$aforemny$material_components_web_elm$Material$Button$outlined,
											A2(
												$aforemny$material_components_web_elm$Material$Button$setOnClick,
												$author$project$Messages$ShowDialog($author$project$Messages$Calibration),
												$aforemny$material_components_web_elm$Material$Button$config),
											'Calibrate')
										]));
							}
						}()
						]))
				]));
	});
var $aforemny$material_components_web_elm$Material$Card$actionsElt = function (content) {
	var _v0 = content.actions;
	if (_v0.$ === 'Just') {
		var buttons = _v0.a.a.buttons;
		var icons = _v0.a.a.icons;
		var fullBleed = _v0.a.a.fullBleed;
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$elm$core$Maybe$Just(
							$elm$html$Html$Attributes$class('mdc-card__actions')),
							fullBleed ? $elm$core$Maybe$Just(
							$elm$html$Html$Attributes$class('mdc-card__actions--full-bleed')) : $elm$core$Maybe$Nothing
						])),
				$elm$core$List$concat(
					_List_fromArray(
						[
							(!$elm$core$List$isEmpty(buttons)) ? _List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mdc-card__action-buttons')
									]),
								A2(
									$elm$core$List$map,
									function (_v1) {
										var button_ = _v1.a;
										return button_;
									},
									buttons))
							]) : _List_Nil,
							(!$elm$core$List$isEmpty(icons)) ? _List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mdc-card__action-icons')
									]),
								A2(
									$elm$core$List$map,
									function (_v2) {
										var icon_ = _v2.a;
										return icon_;
									},
									icons))
							]) : _List_Nil
						])))
			]);
	} else {
		return _List_Nil;
	}
};
var $aforemny$material_components_web_elm$Material$Card$blocksElt = function (_v0) {
	var blocks = _v0.blocks;
	return A2(
		$elm$core$List$map,
		function (_v1) {
			var html = _v1.a;
			return html;
		},
		blocks);
};
var $aforemny$material_components_web_elm$Material$Card$outlinedCs = function (_v0) {
	var outlined = _v0.a.outlined;
	return outlined ? $elm$core$Maybe$Just(
		$elm$html$Html$Attributes$class('mdc-card--outlined')) : $elm$core$Maybe$Nothing;
};
var $aforemny$material_components_web_elm$Material$Card$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-card'));
var $aforemny$material_components_web_elm$Material$Card$card = F2(
	function (config_, content) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-card',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Card$rootCs,
							$aforemny$material_components_web_elm$Material$Card$outlinedCs(config_)
						])),
				additionalAttributes),
			$elm$core$List$concat(
				_List_fromArray(
					[
						$aforemny$material_components_web_elm$Material$Card$blocksElt(content),
						$aforemny$material_components_web_elm$Material$Card$actionsElt(content)
					])));
	});
var $aforemny$material_components_web_elm$Material$Card$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Card$config = $aforemny$material_components_web_elm$Material$Card$Config(
	{additionalAttributes: _List_Nil, outlined: false});
var $aforemny$material_components_web_elm$Material$Card$Block = function (a) {
	return {$: 'Block', a: a};
};
var $aforemny$material_components_web_elm$Material$Card$primaryActionCs = $elm$html$Html$Attributes$class('mdc-card__primary-action');
var $aforemny$material_components_web_elm$Material$Card$tabIndexProp = function (tabIndex) {
	return A2(
		$elm$html$Html$Attributes$property,
		'tabIndex',
		$elm$json$Json$Encode$int(tabIndex));
};
var $aforemny$material_components_web_elm$Material$Card$primaryAction = F2(
	function (additionalAttributes, blocks) {
		return _List_fromArray(
			[
				$aforemny$material_components_web_elm$Material$Card$Block(
				A2(
					$elm$html$Html$div,
					_Utils_ap(
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$Card$primaryActionCs,
								$aforemny$material_components_web_elm$Material$Card$tabIndexProp(0)
							]),
						additionalAttributes),
					A2(
						$elm$core$List$map,
						function (_v0) {
							var html = _v0.a;
							return html;
						},
						blocks)))
			]);
	});
var $aforemny$material_components_web_elm$Material$Card$setAttributes = F2(
	function (additionalAttributes, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Card$Config(
			_Utils_update(
				config_,
				{additionalAttributes: additionalAttributes}));
	});
var $aforemny$material_components_web_elm$Material$Card$setOutlined = F2(
	function (outlined, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Card$Config(
			_Utils_update(
				config_,
				{outlined: outlined}));
	});
var $author$project$Messages$StartStep = function (a) {
	return {$: 'StartStep', a: a};
};
var $aforemny$material_components_web_elm$Material$Card$Button = function (a) {
	return {$: 'Button', a: a};
};
var $aforemny$material_components_web_elm$Material$Card$button = F2(
	function (_v0, label) {
		var buttonConfig = _v0.a;
		return $aforemny$material_components_web_elm$Material$Card$Button(
			A2(
				$aforemny$material_components_web_elm$Material$Button$text,
				$aforemny$material_components_web_elm$Material$Button$Internal$Config(
					_Utils_update(
						buttonConfig,
						{
							additionalAttributes: A2(
								$elm$core$List$cons,
								$elm$html$Html$Attributes$class('mdc-card__action'),
								A2(
									$elm$core$List$cons,
									$elm$html$Html$Attributes$class('mdc-card__action--button'),
									buttonConfig.additionalAttributes))
						})),
				label));
	});
var $aforemny$material_components_web_elm$Material$Card$Actions = function (a) {
	return {$: 'Actions', a: a};
};
var $aforemny$material_components_web_elm$Material$Card$fullBleedActions = function (button_) {
	return $aforemny$material_components_web_elm$Material$Card$Actions(
		{
			buttons: _List_fromArray(
				[button_]),
			fullBleed: true,
			icons: _List_Nil
		});
};
var $author$project$Steps$availableStepActions = function (step) {
	return $elm$core$Maybe$Just(
		$aforemny$material_components_web_elm$Material$Card$fullBleedActions(
			A2(
				$aforemny$material_components_web_elm$Material$Card$button,
				A2(
					$aforemny$material_components_web_elm$Material$Button$setOnClick,
					$author$project$Messages$StartStep(step.id),
					$aforemny$material_components_web_elm$Material$Button$config),
				'Start')));
};
var $author$project$Steps$stepActions = function (step) {
	return step.available ? $author$project$Steps$availableStepActions(step) : $elm$core$Maybe$Nothing;
};
var $author$project$Steps$stepCardBackground = function (step) {
	var _v0 = step.finished;
	if (_v0.$ === 'Just') {
		return _List_fromArray(
			[$aforemny$material_components_web_elm$Material$Theme$onPrimary, $aforemny$material_components_web_elm$Material$Theme$primaryBg]);
	} else {
		return _List_Nil;
	}
};
var $aforemny$material_components_web_elm$Material$Card$block = $aforemny$material_components_web_elm$Material$Card$Block;
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr3 = $elm$html$Html$Attributes$class('pr-3');
var $author$project$Steps$stepIcon = function (stepKind) {
	switch (stepKind.$) {
		case 'Generic':
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fas'),
						$elm$html$Html$Attributes$class('fa-shoe-prints'),
						$elm$html$Html$Attributes$class('fa-rotate-270')
					]),
				_List_Nil);
		case 'Water':
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fas'),
						$elm$html$Html$Attributes$class('fa-faucet')
					]),
				_List_Nil);
		case 'Weight':
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fas'),
						$elm$html$Html$Attributes$class('fa-balance-scale')
					]),
				_List_Nil);
		case 'KeepTemperature':
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fas'),
						$elm$html$Html$Attributes$class('fa-stopwatch')
					]),
				_List_Nil);
		case 'SetTemperature':
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fas'),
						$elm$html$Html$Attributes$class('fa-temperature-high')
					]),
				_List_Nil);
		case 'Hop':
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fab'),
						$elm$html$Html$Attributes$class('fa-raspberry-pi')
					]),
				_List_Nil);
		default:
			return A2(
				$elm$html$Html$i,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('fas'),
						$elm$html$Html$Attributes$class('fa-flask')
					]),
				_List_Nil);
	}
};
var $author$project$Steps$stepHeading = function (step) {
	return $aforemny$material_components_web_elm$Material$Card$block(
		A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$row,
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding', '1rem')
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$col,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
							_List_fromArray(
								[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr0]))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									$aforemny$material_components_web_elm$Material$Typography$headline6,
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(step.name)
								])),
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$aforemny$material_components_web_elm$Material$Typography$subtitle2,
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(step.description)
								]))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$col,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Grid$Col$xsAuto,
							$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
							_List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0,
									$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr3,
									$elm$html$Html$Attributes$align('center'),
									$aforemny$material_components_web_elm$Material$Typography$headline6
								])),
							$rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs
						]),
					_List_fromArray(
						[
							$author$project$Steps$stepIcon(step.kind)
						]))
				])));
};
var $author$project$Steps$stepEstimation = function (est) {
	if (est.$ === 'Just') {
		var estimate = est.a;
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						'Estimated duration: ' + ($elm$core$String$fromFloat(estimate) + ' minutes.'))
					]))
			]);
	} else {
		return _List_Nil;
	}
};
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Helpers$timeOfDay = F2(
	function (timestamp, timezone) {
		var zone = function () {
			if (timezone.$ === 'Nothing') {
				return $elm$time$Time$utc;
			} else {
				var tz = timezone.a;
				return tz;
			}
		}();
		var time = $elm$time$Time$millisToPosix(
			$elm$core$Basics$round(timestamp * 1000));
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toHour, zone, time)) + (':' + ((A2($elm$time$Time$toMinute, zone, time) < 10) ? ('0' + $elm$core$String$fromInt(
			A2($elm$time$Time$toMinute, zone, time))) : $elm$core$String$fromInt(
			A2($elm$time$Time$toMinute, zone, time))));
	});
var $author$project$Steps$stepStart = F2(
	function (start, timezone) {
		return A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(
					'Started at ' + A2($author$project$Helpers$timeOfDay, start, timezone))
				]));
	});
var $author$project$Steps$stepFinished = F4(
	function (step, start, finished, timezone) {
		return _Utils_ap(
			_List_fromArray(
				[
					A2($author$project$Steps$stepStart, start, timezone)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								'Finished at ' + A2($author$project$Helpers$timeOfDay, finished, timezone))
							]))
					]),
				function () {
					var _v0 = step.duration;
					if (_v0.$ === 'Just') {
						var duration = _v0.a;
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Duration: ' + ($elm$core$String$fromFloat(duration) + ' minutes'))
									]))
							]);
					} else {
						return _List_Nil;
					}
				}()));
	});
var $aforemny$material_components_web_elm$Material$LinearProgress$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$LinearProgress$config = $aforemny$material_components_web_elm$Material$LinearProgress$Config(
	{additionalAttributes: _List_Nil, closed: false, reverse: false});
var $aforemny$material_components_web_elm$Material$LinearProgress$Determinate = function (a) {
	return {$: 'Determinate', a: a};
};
var $aforemny$material_components_web_elm$Material$LinearProgress$bufferBarElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-linear-progress__buffer-bar')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$LinearProgress$bufferDotsElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-linear-progress__buffer-dots')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$LinearProgress$bufferElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-linear-progress__buffer')
		]),
	_List_fromArray(
		[$aforemny$material_components_web_elm$Material$LinearProgress$bufferBarElt, $aforemny$material_components_web_elm$Material$LinearProgress$bufferDotsElt]));
var $aforemny$material_components_web_elm$Material$LinearProgress$bufferProp = function (variant) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'buffer',
			$elm$json$Json$Encode$float(
				function () {
					if (variant.$ === 'Buffered') {
						var buffer = variant.b;
						return buffer;
					} else {
						return 0;
					}
				}())));
};
var $aforemny$material_components_web_elm$Material$LinearProgress$closedProp = function (_v0) {
	var closed = _v0.a.closed;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'closed',
			$elm$json$Json$Encode$bool(closed)));
};
var $aforemny$material_components_web_elm$Material$LinearProgress$Indeterminate = {$: 'Indeterminate'};
var $aforemny$material_components_web_elm$Material$LinearProgress$determinateProp = function (variant) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'determinate',
			$elm$json$Json$Encode$bool(
				!_Utils_eq(variant, $aforemny$material_components_web_elm$Material$LinearProgress$Indeterminate))));
};
var $aforemny$material_components_web_elm$Material$LinearProgress$displayCss = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$style, 'display', 'block'));
var $aforemny$material_components_web_elm$Material$LinearProgress$barInnerElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-linear-progress__bar-inner')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$LinearProgress$primaryBarElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-linear-progress__bar mdc-linear-progress__primary-bar')
		]),
	_List_fromArray(
		[$aforemny$material_components_web_elm$Material$LinearProgress$barInnerElt]));
var $aforemny$material_components_web_elm$Material$LinearProgress$progressProp = function (variant) {
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'progress',
			$elm$json$Json$Encode$float(
				function () {
					switch (variant.$) {
						case 'Determinate':
							var progress = variant.a;
							return progress;
						case 'Buffered':
							var progress = variant.a;
							return progress;
						default:
							return 0;
					}
				}())));
};
var $aforemny$material_components_web_elm$Material$LinearProgress$reverseProp = function (_v0) {
	var reverse = _v0.a.reverse;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'reverse',
			$elm$json$Json$Encode$bool(reverse)));
};
var $aforemny$material_components_web_elm$Material$LinearProgress$roleAttr = $elm$core$Maybe$Just(
	A2($elm$html$Html$Attributes$attribute, 'role', 'progressbar'));
var $aforemny$material_components_web_elm$Material$LinearProgress$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-linear-progress'));
var $aforemny$material_components_web_elm$Material$LinearProgress$secondaryBarElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-linear-progress__bar mdc-linear-progress__secondary-bar')
		]),
	_List_fromArray(
		[$aforemny$material_components_web_elm$Material$LinearProgress$barInnerElt]));
var $aforemny$material_components_web_elm$Material$LinearProgress$variantCs = function (variant) {
	if (variant.$ === 'Indeterminate') {
		return $elm$core$Maybe$Just(
			$elm$html$Html$Attributes$class('mdc-linear-progress--indeterminate'));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $aforemny$material_components_web_elm$Material$LinearProgress$linearProgress = F2(
	function (variant, config_) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-linear-progress',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$LinearProgress$rootCs,
							$aforemny$material_components_web_elm$Material$LinearProgress$displayCss,
							$aforemny$material_components_web_elm$Material$LinearProgress$roleAttr,
							$aforemny$material_components_web_elm$Material$LinearProgress$variantCs(variant),
							$aforemny$material_components_web_elm$Material$LinearProgress$determinateProp(variant),
							$aforemny$material_components_web_elm$Material$LinearProgress$progressProp(variant),
							$aforemny$material_components_web_elm$Material$LinearProgress$bufferProp(variant),
							$aforemny$material_components_web_elm$Material$LinearProgress$reverseProp(config_),
							$aforemny$material_components_web_elm$Material$LinearProgress$closedProp(config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$LinearProgress$bufferElt, $aforemny$material_components_web_elm$Material$LinearProgress$primaryBarElt, $aforemny$material_components_web_elm$Material$LinearProgress$secondaryBarElt]));
	});
var $aforemny$material_components_web_elm$Material$LinearProgress$determinate = F2(
	function (config_, _v0) {
		var progress = _v0.progress;
		return A2(
			$aforemny$material_components_web_elm$Material$LinearProgress$linearProgress,
			$aforemny$material_components_web_elm$Material$LinearProgress$Determinate(progress),
			config_);
	});
var $author$project$Steps$finishStepButton = function (stepId) {
	return A2(
		$aforemny$material_components_web_elm$Material$Button$outlined,
		A2(
			$aforemny$material_components_web_elm$Material$Button$setAttributes,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Events$stopPropagationOn,
					'click',
					$elm$json$Json$Decode$succeed(
						_Utils_Tuple2(
							$author$project$Messages$FinishStep(stepId),
							true)))
				]),
			$aforemny$material_components_web_elm$Material$Button$config),
		'Finish');
};
var $aforemny$material_components_web_elm$Material$LinearProgress$indeterminate = function (config_) {
	return A2($aforemny$material_components_web_elm$Material$LinearProgress$linearProgress, $aforemny$material_components_web_elm$Material$LinearProgress$Indeterminate, config_);
};
var $author$project$Steps$stepInProgress = F3(
	function (step, start, timezone) {
		return _Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding', '0 1rem')
						]),
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$row,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$col,
									_List_Nil,
									_List_fromArray(
										[
											A2($author$project$Steps$stepStart, start, timezone)
										]))
								])),
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$row,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$col,
									_List_Nil,
									$author$project$Steps$stepEstimation(step.estimation)),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$col,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
											_List_fromArray(
												[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd]))
										]),
									_List_fromArray(
										[
											$author$project$Steps$finishStepButton(step.id)
										]))
								]))
						]))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding', '0')
						]),
					_List_fromArray(
						[
							function () {
							var _v0 = step.progress;
							if (_v0.$ === 'Just') {
								var progress = _v0.a;
								return A2(
									$aforemny$material_components_web_elm$Material$LinearProgress$determinate,
									$aforemny$material_components_web_elm$Material$LinearProgress$config,
									{progress: progress});
							} else {
								return $aforemny$material_components_web_elm$Material$LinearProgress$indeterminate($aforemny$material_components_web_elm$Material$LinearProgress$config);
							}
						}()
						]))
				]));
	});
var $author$project$Steps$stepInformation = F2(
	function (step, timezone) {
		return $aforemny$material_components_web_elm$Material$Card$block(
			A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						function () {
						var _v0 = _Utils_Tuple2(step.started, step.finished);
						if (_v0.a.$ === 'Just') {
							if (_v0.b.$ === 'Just') {
								var start = _v0.a.a;
								var finished = _v0.b.a;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'padding', '0 1rem')
										]),
									A4($author$project$Steps$stepFinished, step, start, finished, timezone));
							} else {
								var start = _v0.a.a;
								var _v1 = _v0.b;
								return A2(
									$elm$html$Html$div,
									_List_Nil,
									A3($author$project$Steps$stepInProgress, step, start, timezone));
							}
						} else {
							if (_v0.b.$ === 'Just') {
								var _v2 = _v0.a;
								return A2($elm$html$Html$div, _List_Nil, _List_Nil);
							} else {
								var _v3 = _v0.a;
								var _v4 = _v0.b;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'padding', '0 1rem')
										]),
									$author$project$Steps$stepEstimation(step.estimation));
							}
						}
					}()
					])));
	});
var $author$project$Steps$stepPrimaryActions = function (step) {
	var _v0 = step.kind;
	switch (_v0.$) {
		case 'Generic':
			return _List_Nil;
		case 'Water':
			return _List_Nil;
		case 'Weight':
			return _List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					step.available ? $author$project$Messages$Multiple(
						_List_fromArray(
							[
								$author$project$Messages$StartStep(step.id),
								$author$project$Messages$NavigateTo(
								_Utils_Tuple2(
									_List_fromArray(
										['scale']),
									_List_fromArray(
										[
											A2($elm$url$Url$Builder$string, 'step', step.id)
										])))
							])) : $author$project$Messages$NavigateTo(
						_Utils_Tuple2(
							_List_fromArray(
								['scale']),
							_List_fromArray(
								[
									A2($elm$url$Url$Builder$string, 'step', step.id)
								]))))
				]);
		case 'KeepTemperature':
			return _List_Nil;
		case 'SetTemperature':
			return _List_Nil;
		case 'Hop':
			return _List_Nil;
		default:
			return _List_Nil;
	}
};
var $author$project$Steps$stepView = F2(
	function (step, timezone) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$row,
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
					_List_fromArray(
						[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt2]))
				]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$col,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$aforemny$material_components_web_elm$Material$Card$card,
							A2(
								$aforemny$material_components_web_elm$Material$Card$setAttributes,
								$author$project$Steps$stepCardBackground(step),
								A2($aforemny$material_components_web_elm$Material$Card$setOutlined, true, $aforemny$material_components_web_elm$Material$Card$config)),
							{
								actions: $author$project$Steps$stepActions(step),
								blocks: A2(
									$aforemny$material_components_web_elm$Material$Card$primaryAction,
									$author$project$Steps$stepPrimaryActions(step),
									_List_fromArray(
										[
											$author$project$Steps$stepHeading(step),
											A2($author$project$Steps$stepInformation, step, timezone)
										]))
							})
						]))
				]));
	});
var $author$project$Helpers$availableSteps = function (steps) {
	return $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function ($) {
				return $.available;
			},
			steps));
};
var $author$project$Steps$stepsSummary = function (steps) {
	var inProgress = A2(
		$elm$core$List$filter,
		function (entry) {
			var _v1 = _Utils_Tuple2(entry.started, entry.finished);
			if ((_v1.a.$ === 'Just') && (_v1.b.$ === 'Nothing')) {
				var _v2 = _v1.b;
				return true;
			} else {
				return false;
			}
		},
		steps);
	var finished = A2(
		$elm$core$List$filter,
		function (entry) {
			var _v0 = _Utils_Tuple2(entry.started, entry.finished);
			if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
				return true;
			} else {
				return false;
			}
		},
		steps);
	return A2(
		$elm$html$Html$p,
		_List_fromArray(
			[$aforemny$material_components_web_elm$Material$Typography$subtitle1]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				$elm$core$String$fromInt(
					$elm$core$List$length(steps)) + (' steps, ' + ($elm$core$String$fromInt(
					$elm$core$List$length(inProgress)) + (' in progress, ' + ($elm$core$String$fromInt(
					$author$project$Helpers$availableSteps(steps)) + (' available, ' + ($elm$core$String$fromInt(
					$elm$core$List$length(finished)) + ' finished, ')))))))
			]));
};
var $author$project$Steps$stepsListView = F4(
	function (recipe, stepsDict, stepsOrder, timezone) {
		var steps = A2(
			$elm$core$List$filterMap,
			function (stepId) {
				return A2($elm$core$Dict$get, stepId, stepsDict);
			},
			stepsOrder);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pb5]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$row,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$col,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h4,
									_List_fromArray(
										[$aforemny$material_components_web_elm$Material$Typography$headline4]),
									_List_fromArray(
										[
											$elm$html$Html$text('Brewing ' + recipe.name)
										])),
									$author$project$Steps$stepsSummary(steps)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					A2(
						$elm$core$List$map,
						function (step) {
							return A2($author$project$Steps$stepView, step, timezone);
						},
						steps))
				]));
	});
var $author$project$Page$page = function (model) {
	if (model.apiBaseUrl === '') {
		return $author$project$ConnectionsManagement$noApiUrl(model);
	} else {
		var _v0 = _Utils_Tuple2(model.route, model.selectedRecipe);
		switch (_v0.a.$) {
			case 'Recipe':
				if (_v0.b.$ === 'Nothing') {
					var _v1 = _v0.a;
					var _v2 = _v0.b;
					return $author$project$Page$home(model);
				} else {
					var _v3 = _v0.a;
					var r = _v0.b.a;
					return A2(
						$author$project$Recipes$recipeDetail,
						r,
						$elm$core$Dict$isEmpty(model.recipeSteps));
				}
			case 'Home':
				var _v4 = _v0.a;
				return $author$project$Page$home(model);
			case 'BrewSession':
				if (_v0.b.$ === 'Nothing') {
					var _v5 = _v0.a;
					var _v6 = _v0.b;
					return $author$project$Page$home(model);
				} else {
					var _v7 = _v0.a;
					var r = _v0.b.a;
					return A4($author$project$Steps$stepsListView, r, model.recipeSteps, model.stepsOrder, model.timezone);
				}
			case 'Scale':
				var stepId = _v0.a.a;
				return A2($author$project$Scale$scale, model, stepId);
			case 'Connections':
				var _v8 = _v0.a;
				return $author$project$ConnectionsManagement$noApiUrl(model);
			default:
				var _v9 = _v0.a;
				return $author$project$RecipeImport$brewersFriendImport(model);
		}
	}
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt4 = $elm$html$Html$Attributes$class('pt-4');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$py5 = $elm$html$Html$Attributes$class('py-5');
var $author$project$Messages$BrewSessionCodeChange = function (a) {
	return {$: 'BrewSessionCodeChange', a: a};
};
var $author$project$Messages$CloseDialog = function (a) {
	return {$: 'CloseDialog', a: a};
};
var $author$project$Messages$StartCalibration = {$: 'StartCalibration'};
var $author$project$Messages$CalibrationValueUpdate = function (a) {
	return {$: 'CalibrationValueUpdate', a: a};
};
var $aforemny$material_components_web_elm$Material$TextField$setEndAligned = F2(
	function (endAligned, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{endAligned: endAligned}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setMax = F2(
	function (max, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{max: max}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setMin = F2(
	function (min, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{min: min}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setStep = F2(
	function (step, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{step: step}));
	});
var $aforemny$material_components_web_elm$Material$TextField$setSuffix = F2(
	function (suffix, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$TextField$Config(
			_Utils_update(
				config_,
				{suffix: suffix}));
	});
var $author$project$Dialog$calibrationDialogContent = _List_fromArray(
	[
		A2(
		$elm$html$Html$p,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text('Enter real weight (grams) for calibration')
			])),
		$aforemny$material_components_web_elm$Material$TextField$filled(
		A2(
			$aforemny$material_components_web_elm$Material$TextField$setAttributes,
			_List_fromArray(
				[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
			A2(
				$aforemny$material_components_web_elm$Material$TextField$setOnChange,
				function (value) {
					return $author$project$Messages$CalibrationValueUpdate(
						A2(
							$elm$core$Maybe$withDefault,
							-1,
							$elm$core$String$toInt(value)));
				},
				A2(
					$aforemny$material_components_web_elm$Material$TextField$setStep,
					$elm$core$Maybe$Just(100),
					A2(
						$aforemny$material_components_web_elm$Material$TextField$setMax,
						$elm$core$Maybe$Just(5000),
						A2(
							$aforemny$material_components_web_elm$Material$TextField$setMin,
							$elm$core$Maybe$Just(1),
							A2(
								$aforemny$material_components_web_elm$Material$TextField$setType,
								$elm$core$Maybe$Just('number'),
								A2(
									$aforemny$material_components_web_elm$Material$TextField$setEndAligned,
									true,
									A2(
										$aforemny$material_components_web_elm$Material$TextField$setSuffix,
										$elm$core$Maybe$Just(' g'),
										A2(
											$aforemny$material_components_web_elm$Material$TextField$setRequired,
											true,
											A2(
												$aforemny$material_components_web_elm$Material$TextField$setLabel,
												$elm$core$Maybe$Just('Real weight'),
												$aforemny$material_components_web_elm$Material$TextField$config))))))))))),
		A2(
		$aforemny$material_components_web_elm$Material$HelperText$helperLine,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$HelperText$helperText,
				A2($aforemny$material_components_web_elm$Material$HelperText$setPersistent, true, $aforemny$material_components_web_elm$Material$HelperText$config),
				'Weight of object used for calibration')
			]))
	]);
var $author$project$Dialog$confirmDialogContent = function (message) {
	return _List_fromArray(
		[
			$elm$html$Html$text(message)
		]);
};
var $aforemny$material_components_web_elm$Material$Dialog$Config = function (a) {
	return {$: 'Config', a: a};
};
var $aforemny$material_components_web_elm$Material$Dialog$config = $aforemny$material_components_web_elm$Material$Dialog$Config(
	{additionalAttributes: _List_Nil, onClose: $elm$core$Maybe$Nothing, open: false});
var $aforemny$material_components_web_elm$Material$Dialog$closeHandler = function (_v0) {
	var onClose = _v0.a.onClose;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeL,
			$elm$html$Html$Events$on('MDCDialog:close'),
			$elm$json$Json$Decode$succeed),
		onClose);
};
var $aforemny$material_components_web_elm$Material$Dialog$actionsElt = function (_v0) {
	var actions = _v0.actions;
	return $elm$core$List$isEmpty(actions) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-dialog__actions')
				]),
			actions));
};
var $aforemny$material_components_web_elm$Material$Dialog$alertDialogRoleAttr = A2($elm$html$Html$Attributes$attribute, 'role', 'alertdialog');
var $aforemny$material_components_web_elm$Material$Dialog$ariaModalAttr = A2($elm$html$Html$Attributes$attribute, 'aria-modal', 'true');
var $aforemny$material_components_web_elm$Material$Dialog$contentElt = function (_v0) {
	var content = _v0.content;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-dialog__content')
				]),
			content));
};
var $aforemny$material_components_web_elm$Material$Dialog$dialogSurfaceCs = $elm$html$Html$Attributes$class('mdc-dialog__surface');
var $aforemny$material_components_web_elm$Material$Dialog$titleElt = function (_v0) {
	var title = _v0.title;
	if (title.$ === 'Just') {
		var title_ = title.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mdc-dialog__title')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(title_)
					])));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $aforemny$material_components_web_elm$Material$Dialog$surfaceElt = function (content) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[$aforemny$material_components_web_elm$Material$Dialog$dialogSurfaceCs, $aforemny$material_components_web_elm$Material$Dialog$alertDialogRoleAttr, $aforemny$material_components_web_elm$Material$Dialog$ariaModalAttr]),
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Dialog$titleElt(content),
					$aforemny$material_components_web_elm$Material$Dialog$contentElt(content),
					$aforemny$material_components_web_elm$Material$Dialog$actionsElt(content)
				])));
};
var $aforemny$material_components_web_elm$Material$Dialog$containerElt = function (content) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-dialog__container')
			]),
		_List_fromArray(
			[
				$aforemny$material_components_web_elm$Material$Dialog$surfaceElt(content)
			]));
};
var $aforemny$material_components_web_elm$Material$Dialog$openProp = function (_v0) {
	var open = _v0.a.open;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'open',
			$elm$json$Json$Encode$bool(open)));
};
var $aforemny$material_components_web_elm$Material$Dialog$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-dialog'));
var $aforemny$material_components_web_elm$Material$Dialog$scrimElt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mdc-dialog__scrim')
		]),
	_List_Nil);
var $aforemny$material_components_web_elm$Material$Dialog$dialog = F2(
	function (config_, content) {
		var additionalAttributes = config_.a.additionalAttributes;
		return A3(
			$elm$html$Html$node,
			'mdc-dialog',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Dialog$rootCs,
							$aforemny$material_components_web_elm$Material$Dialog$openProp(config_),
							$aforemny$material_components_web_elm$Material$Dialog$closeHandler(config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Dialog$containerElt(content),
					$aforemny$material_components_web_elm$Material$Dialog$scrimElt
				]));
	});
var $aforemny$material_components_web_elm$Material$Dialog$setOnClose = F2(
	function (onClose, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Dialog$Config(
			_Utils_update(
				config_,
				{
					onClose: $elm$core$Maybe$Just(onClose)
				}));
	});
var $aforemny$material_components_web_elm$Material$Dialog$setOpen = F2(
	function (open, _v0) {
		var config_ = _v0.a;
		return $aforemny$material_components_web_elm$Material$Dialog$Config(
			_Utils_update(
				config_,
				{open: open}));
	});
var $author$project$Dialog$dialog = F3(
	function (content, title, actions) {
		return A2(
			$aforemny$material_components_web_elm$Material$Dialog$dialog,
			A2(
				$aforemny$material_components_web_elm$Material$Dialog$setOnClose,
				$author$project$Messages$CloseDialog($elm$core$Maybe$Nothing),
				A2($aforemny$material_components_web_elm$Material$Dialog$setOpen, true, $aforemny$material_components_web_elm$Material$Dialog$config)),
			{
				actions: function () {
					if (actions.$ === 'Just') {
						var ac = actions.a;
						return ac;
					} else {
						return _List_fromArray(
							[
								A2(
								$aforemny$material_components_web_elm$Material$Button$text,
								A2(
									$aforemny$material_components_web_elm$Material$Button$setOnClick,
									$author$project$Messages$CloseDialog($elm$core$Maybe$Nothing),
									$aforemny$material_components_web_elm$Material$Button$config),
								'Cancel')
							]);
					}
				}(),
				content: content,
				title: title
			});
	});
var $author$project$Dialog$dialogActions = F2(
	function (onConfirm, onClose) {
		return _List_fromArray(
			[
				A2(
				$aforemny$material_components_web_elm$Material$Button$text,
				A2(
					$aforemny$material_components_web_elm$Material$Button$setOnClick,
					$author$project$Messages$CloseDialog(onConfirm),
					$aforemny$material_components_web_elm$Material$Button$config),
				'OK'),
				A2(
				$aforemny$material_components_web_elm$Material$Button$text,
				A2(
					$aforemny$material_components_web_elm$Material$Button$setOnClick,
					$author$project$Messages$CloseDialog(onClose),
					$aforemny$material_components_web_elm$Material$Button$config),
				'Cancel')
			]);
	});
var $author$project$Messages$ShareLink = {$: 'ShareLink'};
var $author$project$Dialog$inviteDialogActions = function (sharingSupported) {
	return _List_fromArray(
		[
			A2(
			$aforemny$material_components_web_elm$Material$Button$text,
			A2(
				$aforemny$material_components_web_elm$Material$Button$setOnClick,
				$author$project$Messages$CloseDialog(
					$elm$core$Maybe$Just($author$project$Messages$ShareLink)),
				$aforemny$material_components_web_elm$Material$Button$config),
			sharingSupported ? 'Share' : 'Copy'),
			A2(
			$aforemny$material_components_web_elm$Material$Button$text,
			A2(
				$aforemny$material_components_web_elm$Material$Button$setOnClick,
				$author$project$Messages$CloseDialog($elm$core$Maybe$Nothing),
				$aforemny$material_components_web_elm$Material$Button$config),
			'Cancel')
		]);
};
var $author$project$Messages$ToggleCodeSharing = {$: 'ToggleCodeSharing'};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt3 = $elm$html$Html$Attributes$class('mt-3');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1 = $elm$html$Html$Attributes$class('p-1');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$px2 = $elm$html$Html$Attributes$class('px-2');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$py1 = $elm$html$Html$Attributes$class('py-1');
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Dark = {$: 'Dark'};
var $rundis$elm_bootstrap$Bootstrap$Alert$simpleDark = $rundis$elm_bootstrap$Bootstrap$Alert$simple($rundis$elm_bootstrap$Bootstrap$Internal$Role$Dark);
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Warning = {$: 'Warning'};
var $rundis$elm_bootstrap$Bootstrap$Alert$simpleWarning = $rundis$elm_bootstrap$Bootstrap$Alert$simple($rundis$elm_bootstrap$Bootstrap$Internal$Role$Warning);
var $author$project$Dialog$inviteDialogContent = function (model) {
	return _Utils_ap(
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[$aforemny$material_components_web_elm$Material$Typography$body1]),
				_List_fromArray(
					[
						$elm$html$Html$text('Share this link with a friend to invite them to the brew session.')
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Alert$simpleDark,
				_List_fromArray(
					[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$px2]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'overflow', 'scroll'),
								A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
								$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0,
								$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$py1
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$ConnectionsManagement$brewSessionLink(model))
							]))
					]))
			]),
		model.security.valid ? _List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[$aforemny$material_components_web_elm$Material$Typography$body1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]),
								_List_fromArray(
									[
										$elm$html$Html$text('Share with brew session code')
									]))
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$xsAuto,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[
										$elm$html$Html$Attributes$align('center')
									])),
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$middleXs
							]),
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$Switch$switch(
								A2(
									$aforemny$material_components_web_elm$Material$Switch$setOnChange,
									$author$project$Messages$ToggleCodeSharing,
									A2($aforemny$material_components_web_elm$Material$Switch$setChecked, model.security.shareSecurityCode, $aforemny$material_components_web_elm$Material$Switch$config)))
							]))
					])),
				model.security.shareSecurityCode ? A2(
				$rundis$elm_bootstrap$Bootstrap$Alert$simpleWarning,
				_List_fromArray(
					[$aforemny$material_components_web_elm$Material$Typography$body2, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p2, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt3]),
				_List_fromArray(
					[
						$elm$html$Html$text('Careful! Sharing your brew session code will allow the user to control your brew session.')
					])) : A2($elm$html$Html$div, _List_Nil, _List_Nil)
			]) : _List_Nil);
};
var $author$project$Dialog$scaleDialogContent = function (value) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$Typography$headline6]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$fromFloat(value) + ' g')
				]))
		]);
};
var $author$project$Messages$BrewSessionCodeInput = function (a) {
	return {$: 'BrewSessionCodeInput', a: a};
};
var $author$project$Dialog$securityDialogContent = function (security) {
	return _List_fromArray(
		[
			security.valid ? A2(
			$rundis$elm_bootstrap$Bootstrap$Alert$simpleSuccess,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$Typography$body1]),
			_List_fromArray(
				[
					$elm$html$Html$text('Your brew session key seems valid. There is no need to change it right now.')
				])) : A2($elm$html$Html$div, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$Typography$body1]),
			_List_fromArray(
				[
					$elm$html$Html$text('Enter current brew session key code here to be able to control the brewing process.')
				])),
			$aforemny$material_components_web_elm$Material$TextField$filled(
			A2(
				$aforemny$material_components_web_elm$Material$TextField$setAttributes,
				_List_fromArray(
					[$rundis$elm_bootstrap$Bootstrap$Utilities$Size$w100]),
				A2(
					$aforemny$material_components_web_elm$Material$TextField$setOnChange,
					$author$project$Messages$BrewSessionCodeChange,
					A2(
						$aforemny$material_components_web_elm$Material$TextField$setValid,
						security.form.valid,
						A2(
							$aforemny$material_components_web_elm$Material$TextField$setOnInput,
							$author$project$Messages$BrewSessionCodeInput,
							A2(
								$aforemny$material_components_web_elm$Material$TextField$setValue,
								$elm$core$Maybe$Just(security.form.value),
								A2(
									$aforemny$material_components_web_elm$Material$TextField$setRequired,
									true,
									A2(
										$aforemny$material_components_web_elm$Material$TextField$setLabel,
										$elm$core$Maybe$Just('Brew session key code'),
										$aforemny$material_components_web_elm$Material$TextField$config)))))))),
			A2(
			$aforemny$material_components_web_elm$Material$HelperText$helperLine,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$aforemny$material_components_web_elm$Material$HelperText$helperText,
					A2(
						$aforemny$material_components_web_elm$Material$HelperText$setValidation,
						!security.form.valid,
						A2($aforemny$material_components_web_elm$Material$HelperText$setPersistent, true, $aforemny$material_components_web_elm$Material$HelperText$config)),
					security.form.valid ? security.form.hint : security.form.error)
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[$aforemny$material_components_web_elm$Material$Typography$body2, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt3]),
			_List_fromArray(
				[
					$elm$html$Html$text('You can find the current brew session key code on the device screen. Or use the NFC thing!')
				]))
		]);
};
var $author$project$Dialog$showDialog = function (model) {
	var _v0 = model.dialogVariant;
	if (_v0.$ === 'Nothing') {
		return A2($elm$html$Html$div, _List_Nil, _List_Nil);
	} else {
		switch (_v0.a.$) {
			case 'Security':
				var _v1 = _v0.a;
				return A3(
					$author$project$Dialog$dialog,
					$author$project$Dialog$securityDialogContent(model.security),
					$elm$core$Maybe$Just('Brew session key'),
					$elm$core$Maybe$Just(
						A2(
							$author$project$Dialog$dialogActions,
							$elm$core$Maybe$Just(
								$author$project$Messages$BrewSessionCodeChange(model.security.form.value)),
							$elm$core$Maybe$Just(
								$author$project$Messages$CloseDialog($elm$core$Maybe$Nothing)))));
			case 'Scale':
				var _v2 = _v0.a;
				return A3(
					$author$project$Dialog$dialog,
					$author$project$Dialog$scaleDialogContent(model.weight),
					$elm$core$Maybe$Just('Scale'),
					$elm$core$Maybe$Nothing);
			case 'Confirm':
				var _v3 = _v0.a.a;
				var prompt = _v3.a;
				var action = _v3.b;
				return A3(
					$author$project$Dialog$dialog,
					$author$project$Dialog$confirmDialogContent(prompt),
					$elm$core$Maybe$Just('Confirm'),
					$elm$core$Maybe$Just(
						A2(
							$author$project$Dialog$dialogActions,
							$elm$core$Maybe$Just(action),
							$elm$core$Maybe$Just(
								$author$project$Messages$CloseDialog($elm$core$Maybe$Nothing)))));
			case 'Calibration':
				var _v4 = _v0.a;
				return A3(
					$author$project$Dialog$dialog,
					$author$project$Dialog$calibrationDialogContent,
					$elm$core$Maybe$Just('Scale calibration'),
					$elm$core$Maybe$Just(
						A2(
							$author$project$Dialog$dialogActions,
							$elm$core$Maybe$Just($author$project$Messages$StartCalibration),
							$elm$core$Maybe$Just(
								$author$project$Messages$CloseDialog($elm$core$Maybe$Nothing)))));
			default:
				var _v5 = _v0.a;
				return A3(
					$author$project$Dialog$dialog,
					$author$project$Dialog$inviteDialogContent(model),
					$elm$core$Maybe$Just('Invite a friend'),
					$elm$core$Maybe$Just(
						$author$project$Dialog$inviteDialogActions(model.sharingSupported)));
		}
	}
};
var $aforemny$material_components_web_elm$Material$Snackbar$closeOnEscapeProp = function (_v0) {
	var closeOnEscape = _v0.a.closeOnEscape;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'closeOnEscape',
			$elm$json$Json$Encode$bool(closeOnEscape)));
};
var $aforemny$material_components_web_elm$Material$Snackbar$closedHandler = F2(
	function (messageId, _v0) {
		var onClosed = _v0.a.onClosed;
		return $elm$core$Maybe$Just(
			A2(
				$elm$html$Html$Events$on,
				'MDCSnackbar:closed',
				$elm$json$Json$Decode$succeed(
					onClosed(messageId))));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$leadingCs = function (message_) {
	return A2(
		$elm$core$Maybe$andThen,
		function (_v0) {
			var leading = _v0.a.leading;
			return leading ? $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-snackbar--leading')) : $elm$core$Maybe$Nothing;
		},
		message_);
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$messageIdProp = function (_v0) {
	var messageId = _v0.a;
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'messageId',
			$elm$json$Json$Encode$int(messageId)));
};
var $aforemny$material_components_web_elm$Material$Snackbar$rootCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-snackbar'));
var $aforemny$material_components_web_elm$Material$Snackbar$stackedCs = function (message_) {
	return A2(
		$elm$core$Maybe$andThen,
		function (_v0) {
			var stacked = _v0.a.stacked;
			return stacked ? $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('mdc-snackbar--stacked')) : $elm$core$Maybe$Nothing;
		},
		message_);
};
var $aforemny$material_components_web_elm$Material$Snackbar$actionButtonClickHandler = F2(
	function (messageId, _v0) {
		var onActionButtonClick = _v0.a.onActionButtonClick;
		return A2(
			$elm$core$Maybe$map,
			A2(
				$elm$core$Basics$composeL,
				$elm$html$Html$Events$onClick,
				$elm$core$Basics$apR(messageId)),
			onActionButtonClick);
	});
var $aforemny$material_components_web_elm$Material$Snackbar$actionButtonCs = $elm$core$Maybe$Just(
	$elm$html$Html$Attributes$class('mdc-button mdc-snackbar__action'));
var $aforemny$material_components_web_elm$Material$Snackbar$actionButtonElt = F2(
	function (messageId, message_) {
		var actionButton = message_.a.actionButton;
		return A2(
			$elm$core$Maybe$map,
			function (actionButtonLabel) {
				return A2(
					$elm$html$Html$button,
					A2(
						$elm$core$List$filterMap,
						$elm$core$Basics$identity,
						_List_fromArray(
							[
								$aforemny$material_components_web_elm$Material$Snackbar$actionButtonCs,
								A2($aforemny$material_components_web_elm$Material$Snackbar$actionButtonClickHandler, messageId, message_)
							])),
					_List_fromArray(
						[
							$elm$html$Html$text(actionButtonLabel)
						]));
			},
			actionButton);
	});
var $aforemny$material_components_web_elm$Material$Snackbar$actionIconClickHandler = F2(
	function (messageId, _v0) {
		var onActionIconClick = _v0.a.onActionIconClick;
		return A2(
			$elm$core$Maybe$map,
			A2(
				$elm$core$Basics$composeL,
				$elm$html$Html$Events$onClick,
				$elm$core$Basics$apR(messageId)),
			onActionIconClick);
	});
var $aforemny$material_components_web_elm$Material$Snackbar$actionIconElt = F2(
	function (messageId, message_) {
		var actionIcon = message_.a.actionIcon;
		if (actionIcon.$ === 'Just') {
			if (actionIcon.a.$ === 'Icon') {
				var node = actionIcon.a.a.node;
				var attributes = actionIcon.a.a.attributes;
				var nodes = actionIcon.a.a.nodes;
				return $elm$core$Maybe$Just(
					A2(
						node,
						_Utils_ap(
							A2(
								$elm$core$List$filterMap,
								$elm$core$Basics$identity,
								_List_fromArray(
									[
										$elm$core$Maybe$Just(
										$elm$html$Html$Attributes$class('mdc-icon-button')),
										$elm$core$Maybe$Just(
										$elm$html$Html$Attributes$class('mdc-snackbar__dismiss')),
										A2($aforemny$material_components_web_elm$Material$Snackbar$actionIconClickHandler, messageId, message_)
									])),
							attributes),
						nodes));
			} else {
				var node = actionIcon.a.a.node;
				var attributes = actionIcon.a.a.attributes;
				var nodes = actionIcon.a.a.nodes;
				return $elm$core$Maybe$Just(
					A2(
						node,
						_Utils_ap(
							A2(
								$elm$core$List$filterMap,
								$elm$core$Basics$identity,
								_List_fromArray(
									[
										$elm$core$Maybe$Just(
										$elm$svg$Svg$Attributes$class('mdc-icon-button')),
										$elm$core$Maybe$Just(
										$elm$svg$Svg$Attributes$class('mdc-snackbar__dismiss')),
										A2($aforemny$material_components_web_elm$Material$Snackbar$actionIconClickHandler, messageId, message_)
									])),
							attributes),
						nodes));
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $aforemny$material_components_web_elm$Material$Snackbar$actionsElt = F2(
	function (messageId, message_) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-snackbar__actions')
				]),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2($aforemny$material_components_web_elm$Material$Snackbar$actionButtonElt, messageId, message_),
						A2($aforemny$material_components_web_elm$Material$Snackbar$actionIconElt, messageId, message_)
					])));
	});
var $aforemny$material_components_web_elm$Material$Snackbar$ariaPoliteLiveAttr = A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite');
var $aforemny$material_components_web_elm$Material$Snackbar$ariaStatusRoleAttr = A2($elm$html$Html$Attributes$attribute, 'aria-role', 'status');
var $aforemny$material_components_web_elm$Material$Snackbar$labelElt = function (_v0) {
	var label = _v0.a.label;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mdc-snackbar__label'),
				$aforemny$material_components_web_elm$Material$Snackbar$ariaStatusRoleAttr,
				$aforemny$material_components_web_elm$Material$Snackbar$ariaPoliteLiveAttr
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(label)
			]));
};
var $aforemny$material_components_web_elm$Material$Snackbar$surfaceElt = F2(
	function (messageId, message_) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mdc-snackbar__surface')
				]),
			_List_fromArray(
				[
					$aforemny$material_components_web_elm$Material$Snackbar$labelElt(message_),
					A2($aforemny$material_components_web_elm$Material$Snackbar$actionsElt, messageId, message_)
				]));
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $aforemny$material_components_web_elm$Material$Snackbar$timeoutMsProp = function (message_) {
	var indefiniteTimeout = -1;
	var normalizedTimeoutMs = A2(
		$elm$core$Maybe$withDefault,
		indefiniteTimeout,
		A2(
			$elm$core$Maybe$andThen,
			function (_v0) {
				var timeoutMs = _v0.a.timeoutMs;
				return A2(
					$elm$core$Maybe$map,
					A2($elm$core$Basics$clamp, 4000, 10000),
					timeoutMs);
			},
			message_));
	return $elm$core$Maybe$Just(
		A2(
			$elm$html$Html$Attributes$property,
			'timeoutMs',
			$elm$json$Json$Encode$int(normalizedTimeoutMs)));
};
var $aforemny$material_components_web_elm$Material$Snackbar$snackbar = F2(
	function (config_, queue) {
		var additionalAttributes = config_.a.additionalAttributes;
		var messages = queue.a.messages;
		var nextMessageId = queue.a.nextMessageId;
		var _v0 = A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(
				$aforemny$material_components_web_elm$Material$Snackbar$MessageId(-1),
				$elm$core$Maybe$Nothing),
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$mapSecond($elm$core$Maybe$Just),
				$elm$core$List$head(messages)));
		var currentMessageId = _v0.a;
		var currentMessage = _v0.b;
		return A3(
			$elm$html$Html$node,
			'mdc-snackbar',
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$aforemny$material_components_web_elm$Material$Snackbar$rootCs,
							$aforemny$material_components_web_elm$Material$Snackbar$closeOnEscapeProp(config_),
							$aforemny$material_components_web_elm$Material$Snackbar$leadingCs(currentMessage),
							$aforemny$material_components_web_elm$Material$Snackbar$stackedCs(currentMessage),
							$aforemny$material_components_web_elm$Material$Snackbar$messageIdProp(currentMessageId),
							$aforemny$material_components_web_elm$Material$Snackbar$timeoutMsProp(currentMessage),
							A2($aforemny$material_components_web_elm$Material$Snackbar$closedHandler, currentMessageId, config_)
						])),
				additionalAttributes),
			_List_fromArray(
				[
					A2(
					$aforemny$material_components_web_elm$Material$Snackbar$surfaceElt,
					currentMessageId,
					A2(
						$elm$core$Maybe$withDefault,
						$aforemny$material_components_web_elm$Material$Snackbar$message(''),
						currentMessage))
				]));
	});
var $aforemny$material_components_web_elm$Material$Typography$typography = $elm$html$Html$Attributes$class('mdc-typography');
var $author$project$Main$view = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_Utils_ap(
					A2(
						$author$project$Menu$menuDrawer,
						model,
						!$elm$core$Dict$isEmpty(model.recipeSteps)),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[$aforemny$material_components_web_elm$Material$Typography$typography]),
							_List_fromArray(
								[
									A3(
									$author$project$Navbar$navbar,
									model.title,
									$author$project$Main$isRecipeSelected(model),
									model.security.valid),
									$author$project$Dialog$showDialog(model),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$container,
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$py5]),
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$row,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
													_List_fromArray(
														[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt4]))
												]),
											_List_fromArray(
												[
													A2(
													$rundis$elm_bootstrap$Bootstrap$Grid$col,
													_List_Nil,
													_List_fromArray(
														[
															$author$project$Page$page(model)
														]))
												]))
										])),
									A2(
									$aforemny$material_components_web_elm$Material$Snackbar$snackbar,
									$aforemny$material_components_web_elm$Material$Snackbar$config(
										{onClosed: $author$project$Messages$SnackbarClosed}),
									model.snackbarQueue),
									(!$elm$core$Dict$isEmpty(model.recipeSteps)) ? A3($author$project$BottomToolbar$bottomToolbar, model.temperature, model.remainingBoilTime, model.heating) : A2($elm$html$Html$div, _List_Nil, _List_Nil)
								]))
						])))
			]),
		title: model.title
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Messages$UrlChanged, onUrlRequest: $author$project$Messages$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (storedApiUrls) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (sharingSupported) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (origin) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (brewSessionCode) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (basePath) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (apiDefaultProtocol) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (apiBaseUrl) {
															return $elm$json$Json$Decode$succeed(
																{apiBaseUrl: apiBaseUrl, apiDefaultProtocol: apiDefaultProtocol, basePath: basePath, brewSessionCode: brewSessionCode, origin: origin, sharingSupported: sharingSupported, storedApiUrls: storedApiUrls});
														},
														A2($elm$json$Json$Decode$field, 'apiBaseUrl', $elm$json$Json$Decode$string));
												},
												A2($elm$json$Json$Decode$field, 'apiDefaultProtocol', $elm$json$Json$Decode$string));
										},
										A2($elm$json$Json$Decode$field, 'basePath', $elm$json$Json$Decode$string));
								},
								A2($elm$json$Json$Decode$field, 'brewSessionCode', $elm$json$Json$Decode$string));
						},
						A2($elm$json$Json$Decode$field, 'origin', $elm$json$Json$Decode$string));
				},
				A2($elm$json$Json$Decode$field, 'sharingSupported', $elm$json$Json$Decode$bool));
		},
		A2(
			$elm$json$Json$Decode$field,
			'storedApiUrls',
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))))(0)}});}(this));