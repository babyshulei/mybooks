/**
 * 类数组转换为数组 ES5 方案
 */
// 方案1
function makeArray(arrayLike) {
    var res = [];

    for (var i = 0; i < arrayLike.length; i++) {
        res.push(arrayLike[i]);
    }

    return res;
}

// 方案2
function makeArray2(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}

/**
 * Array.from() 示例
 */
// mapFn 参数示例
function trans() {
    return Array.from(arguments, val => val + 1);
}

let numbers = trans(1, 2, 3);
console.log(numbers); // [ 2, 3, 4 ]

// thisArg 参数示例
let helper = {
    diff: 2,
    add(val) {
        return val + this.diff;
    },
};
function trans2() {
    return Array.from(arguments, helper.add, helper);
}

let num2 = trans2(1, 2, 3);
console.log(num2); // [ 3, 4, 5 ]

// 转换可迭代对象
let ite = {
    *[Symbol.iterator]() {
        yield 1;
        yield 3;
        yield 5;
    },
};
let num3 = Array.from(ite);
console.log(num3); // [ 1, 3, 5 ]

/**
 * Array.prototype.find(), Array.prototype.findIndex()
 */
let arr = [2, 4, 5, 6, 7];
console.log(arr.find(v => v > 5)); // 6
console.log(arr.findIndex(v => v > 5)); // 3

/**
 * Array.prototype.fill()
 */
let array = new Array(5);
array.fill(3);
console.log(array); // [3, 3, 3, 3, 3]
array.fill(2, 1, 3);
console.log(array); // [3, 2, 2, 3, 3]

/**
 * Array.prototype.copyWithin()
 */
let carr = [1, 2, 3, 4, 5, 6, 7];
carr.copyWithin(2, 0, 3);
console.log(carr); // [1, 2, 1, 2, 3, 6, 7]
