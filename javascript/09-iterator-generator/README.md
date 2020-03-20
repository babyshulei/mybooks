# 迭代器(Iterator)和生成器(Generator)

> 2020.03.17 @wsl

## 什么是迭代器

迭代器是一种特殊对象，具有一些专门为迭代过程设计的专有接口。

迭代器对象有一个next()方法，每次调用都返回一个结果对象。

结果对象有两个属性：

- value：表示下一个要返回的值。在最后一个值返回后，再次调用next()，value为迭代器最终返回的值。
- done：布尔值，当没有更多可返回的数据时返回true。

迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每一次调用next()方法，都会返回下一个可用的值。

## 什么是生成器

生成器是一种返回迭代器的函数，通过function 关键字后的 * 来表示，函数中会用到新的关键字yield。* 可以紧挨着function关键字，也可以在中间添加一个空格。

yield 关键字是 ES6 的新特性，可以通过它来指定调用迭代器next()方法的返回值和返回顺序。

生成器函数，每当执行完一条yield语句，函数就会自动停止执行，直到再次调用迭代器的next()方法才会继续执行。

使用yield关键字可以返回任何值或表达式，所以可以通过生成器函数批量地给迭代器添加元素。举例：

```js
// 生成器也可以写成 function* createIterator
function *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

const iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
// 之后所有调用都会返回相同内容
console.log(iterator.next()); // {value: undefined, done: true}
```

> 注意：yield只可在生成器内部使用，，在其他地方使用会导致程序抛出错误。和return关键字一样，不能穿透函数边界。

```js
function *createIterator2(items) {
    items.forEach(() => {
        yield items[i]; // 报错：Uncaught SyntaxError: Unexpected identifier
    });
}
```

### 生成器函数表达式

可以通过函数表达式来创建生成器，在function 和 () 中间添加一个 * 即可。

```js
const createIterator = function *(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}
```

> 注意，不能用箭头函数来创建生成器。

### 生成器对象的方法

由于生成器本身就是函数，因而可以将它们添加到对象中。

```js
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
```

