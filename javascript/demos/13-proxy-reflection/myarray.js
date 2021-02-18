/**
 * 实现MyArray类：
 *  数字键存取，length进行相应变化
 *  length值修改，存储数字键、值进行相应变化
 */

/*
function isNumber(v) {
    if (isNaN(v) || isFinite(v) || Math.floor(v) != v) {
        return false;
    } else {
        return true;
    }
}
*/

/**
 * 是否为数组索引，标准提供的说明：
 * 当且仅当 ToString(ToUnit32(P)) 等于P，并且 ToUnit32(P) 不等于 2^32 - 1时，
 * 字符串属性名称 P 才是一个数组索引。
 */

function toUnit32(value) {
    return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
}

function isArrayIndex(key) {
    const numericKey = toUnit32(key);
    return String(numericKey) == key && numericKey < (Math.pow(2, 32) - 1);
}

/*
function MyArray(length = 0) {
    return new Proxy({ length }, {
        set(target, key, value) {
            const currentLength = Reflect.get(target, 'length');
            if (isArrayIndex(key)) {
                const numericKey = Number(key);
                if (currentLength <= numericKey) {
                    Reflect.set(target, 'length', numericKey + 1);
                }
            } else if (key === 'length') {
                if (value < currentLength) {
                    for(let i = currentLength - 1; i >= value; i--) {
                        Reflect.deleteProperty(target, i);
                    }
                }
            }
            return Reflect.set(target, key, value);
        },
    });
}

let arr = new MyArray(10);
console.log(arr, arr.length);
arr[0] = 10;
arr[13] = 'why';
console.log(arr.length, arr);
*/

class MyArray {
    constructor(length = 0) {
        this.length = length;
        return new Proxy(this, {
            set(target, key, value) {
                const currentLength = Reflect.get(target, 'length');
                if (isArrayIndex(key)) {
                    const numericKey = Number(key);
                    if (currentLength <= numericKey) {
                        Reflect.set(target, 'length', numericKey + 1);
                    }
                } else if (key === 'length') {
                    if (value < currentLength) {
                        for(let i = currentLength - 1; i >= value; i--) {
                            Reflect.deleteProperty(target, i);
                        }
                    }
                }
                return Reflect.set(target, key, value);
            },
        });
    }
}

let arr = new MyArray(10);
console.log(arr, arr.length);
arr[0] = 10;
arr[13] = 'why';
console.log(arr.length, arr);
