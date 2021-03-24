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


/**
 * ArrayBuffer
 */
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength); // 10
let sbuff = buffer.slice(2, 5);
console.log(sbuff.byteLength); // 3

/**
 * DataView
 */
let view1 = new DataView(buffer);
let view2 = new DataView(buffer, 2);
console.log(view1.buffer === view2.buffer); // true
console.log(view1.byteOffset, view2.byteOffset); // 0 2
console.log(view1.byteLength, view2.byteLength); // 10 8

/**
 * DataView
 * get/set
 */
let buff = new ArrayBuffer(10);
let view = new DataView(buff);

view.setInt8(0, 3);
view.setInt8(1, -5);

console.log(view.getInt8(0), view.getInt8(1)); // 3 -5
console.log(view.getInt16(0)); // 1019

/**
 * TypedArray
 */
// 方式一
let arr1 = new Int8Array(2);
console.log(arr1.length, arr1.byteLength, arr1.byteOffset); // 2 2 0

// 方式二
let arr2 = new Int16Array([13, 20]);
let arr16 = new Int32Array(arr2);
console.log(arr2.buffer === arr16.buffer); // false
console.log(arr2.length, arr2.byteLength, arr2[0], arr2[1]); // 2 4 13 20
console.log(arr16.length, arr16.byteLength, arr16[0], arr16[1]); // 2 8 13 20

// 方式三
let bf = new ArrayBuffer(20);
let arr3 = new Int32Array(bf, 4, 2);
console.log(arr3.length, arr3.byteLength, arr3.byteOffset); // 2 8 4

console.log(arr1.BYTES_PER_ELEMENT, arr2.BYTES_PER_ELEMENT, arr3.BYTES_PER_ELEMENT); // 1 2 4
