
// 生成器也可以写成 function* createIterator
function *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

const iterator = createIterator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

/*
// yield只可在生成器内部使用，不能穿透函数边界，在其他地方使用会导致程序抛出错误
function *createIterator2(items) {
    items.forEach(() => {
        yield items[i];
    });
}

// Uncaught SyntaxError: Unexpected identifier
*/

// 生成器函数表达式
const createIterator3 = function *(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

const iterator3 = createIterator3([1, 2, 3]);

console.log(iterator3.next());

// 生成器对象的方法
// ES5风格的对象字面量
const o1 = {
    createIterator: function *(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
};

// ES6的函数方法的简写方式
const o2 = {
    *createIterator (items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
};

// for-of循环可迭代对象
let arr = [1, 2, 3];

for (let value of arr) {
    console.log(value);
}

// 判断对象是否为可迭代对象
function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function';
}

// 创建可迭代对象
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    },
};

collection.items.push(3);
collection.items.push(6);
collection.items.push(9);

for (let value of collection) {
    console.log(value);
}

// 内建迭代器
let colors = ['red', 'yellow'];
colors.name = 'myColor';

// 只会迭代数组的数字索引
for (let item of colors.entries()) {
    console.log(item);
}

// for-in 迭代的数组的属性
for (let item in colors) {
    console.log(`for-in output:${item}`);
}

// 不同集合的默认迭代器
let colorArr = ['green', 'white'];
let numSet = new Set([2, 3, 4]);
let nameMap = new Map([['John', 23], ['Sarah', 18]]);

for (let item of colorArr) {
    console.log(item);
}

for (let item of numSet) {
    console.log(item);
}

for (let item of nameMap) {
    console.log(item);
}

// 使用解构语法
let colorArr2 = ['green', 'white'];
let nameMap2 = new Map([['John', 23], ['Sarah', 18]]);

for (let [key, value] of colorArr2.entries()) {
    console.log(`${key}: ${value}`);
}

for (let [key, value] of nameMap2) {
    console.log(`${key}: ${value}`);
}

// 字符串迭代器
const str = 'a𠮷b';

for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
}

for (let value of str) {
    console.log(value);
}

// NodeList迭代器
const divs = document.getElementsByTagName('div');

for(let div of divs) {
    console.log(div.id);
}
