
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
