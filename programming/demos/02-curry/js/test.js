/* 第一版 */
/*
var curry = function (fn) {
    var args = [].slice.call(arguments, 1);

    return function () {
        var newArgs = args.concat([].slice.call(arguments));

        return fn.apply(this, newArgs);
    }
}

function add(x, y) {
    return x + y;
}

var addCurry = curry(add, 1);
// var a = addCurry();
var b = addCurry(2);
// var c = addCurry(1, 2, 3);

// console.log(a, b, c)
*/

// 第二版
function curry(fn, ...args) {
    // var length = 3;
    var length = fn.length;

    return function() {
        var _args = [ ...args, ...arguments ];
        
        if (_args.length < length) {
            return curry.call(this, fn, ..._args);
        } else {
            return fn.apply(this, _args);
        }
    };
}

function add(a, b, c) {
    return a + b + c;
}

var addCurry = curry(add);
var a = addCurry(12)(3, 4);
var b = addCurry(2)(3)(4);
var c = addCurry(1, 2, 3);
// var addCurry = curry(add, 3);
// var a = addCurry(12)(3);
// var b = addCurry(2)(4);
// var c = addCurry(1, 3);


console.log(a, b, c) 

// var curry = (fn, length) => {
//     length = length || fn.length;
//     judge = (...args) =>
//         args.length === length
//             ? fn(...args)
//             : (arg) => judge(...args, arg);
// }

// function add(a, b) {
//     return a + b;
// }

// var addCurry = curry(add, 3);
// var a = addCurry(12)(3, 4);
// var b = addCurry(2)(3)(4);
// var c = addCurry(1, 2, 3);

// console.log(a, b, c)
