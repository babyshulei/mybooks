# 迭代器(Iterator)和生成器(Generator)

> 2020.03.17@wsl

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



## 可迭代对象和for-of循环

### 可迭代对象

可迭代对象具有 Symbol.iterator 属性，Symbol.iterator 通过指定的函数可以返回一个作用于附属对象的迭代器。

ES6中，所有的集合对象（数组、Set集合、Map集合）和字符串都是可迭代对象，具有默认的迭代器。

由于生成器默认会为 Symbol.iterator 属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象。

### for-of循环

for-of循环传入一个可迭代对象，每执行一次都会调用可迭代对象的next()方法，并将迭代器返回的结果对象的value 属性存储在一个变量中；循环将持续执行这一过程，直到返回对象的done属性值为true。

```js
let arr = [1, 2, 3];

for (let value of arr) {
    console.log(value);
}

// 输出
// 1
// 2
// 3
```

> 注意：如果将 for-of 语句用于不可迭代对象、null 或 undefined 将会导致程序抛出错误。

### Symbol.iterator

可以通过Symbol.iterator来访问默认的迭代器。

由于具有 Symbol.iterator属性的对象都有默认的迭代器，因此可以用它来检测对象是否为可迭代对象。

```js
function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function';
}
```

默认情况下，开发者定义的对象都是不可迭代对象，但如果给 Symbol.iterator 属性添加一个生成器，则可以将其变为可迭代对象。

```js
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

// 输出
// 3
// 6
// 9
```



## 内建迭代器

### 集合对象迭代器

ES6中有3种类型的集合对象：数组、Map集合、Set集合。

这3种对象都内建了以下3种迭代器：

- entries()  返回一个迭代器，其值为多个键值对。
- values()  返回一个迭代器，其值为集合的值。
- keys()  返回一个迭代器，其值为集合中的所有键名。

> 注意，对于数组对象，无论是否为数组添加命名属性，迭代器只会迭代数字索引对应的键值对。而for-in循环迭代的是数组属性，而不是数字类型的索引。

```js
let colors = ['red', 'yellow'];
colors.name = 'myColor';

// 只会迭代数组的数字索引
for (let item of colors.entries()) {
    console.log(item);
}

// for-in 迭代的数组的属性
for (let item in colors) {
    console.log(item);
}

// 输出
// [0, "red"]
// [1, "yellow"]
// 0
// 1
// name
```

#### 不同集合类型的默认迭代器

每个类型都有默认的迭代器，如果在for-of循环中不指定迭代器，就使用默认迭代器。

数组、Set集合的默认迭代器是 values()；Map集合的默认迭代器是 entries()。

```js
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

// 输出
// green
// white
// 2
// 3
// 4
// ["John", 23]
// ["Sarah", 18]
```

可以在for-of循环中使用解构语法，利用Map集合默认构造函数的行为来简化编码过程。Set集合、数组也同理。

```js
let nameMap = new Map([['John', 23], ['Sarah', 18]]);

for (let [key, value] of nameMap) {
    console.log(`${key}: ${value}`);
}
```

 ### 字符串迭代器

ES5 正式规定可以通过方括号访问字符串中的字符。由于方括号操作的是编码单元而非字符，因此无法正确访问双字节字符。

```js
const str = 'a𠮷b';
for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
}

// 输出与预期不符
// a
// ?
// ?
// b
```

可以通过for-of循环输出正确的字符。

```js
const str = 'a𠮷b';
for (let value of str) {
    console.log(value);
}

// 输出
// a
// 𠮷
// b
```

### NodeList迭代器

DOM标准中有一个NodeList类型，代表页面文档中所有元素的集合。

ES5中，NodeList对象和数组都具有length属性，可以通过方括号访问集合中的独立元素；但在内部实现上有一定差异。

ES6中，DOM定义的NodeList类型（定义在HTML标准中）也拥有了默认迭代器，其行为与数组的默认迭代器完全一致。

```js
const divs = document.getElementsByTagName('div');

for(let div of divs) {
    console.log(div.id);
}
```

## 展开运算符与非数组可迭代对象

展开运算符可以操作所有可迭代对象，并根据默认迭代器来选取要引用的值，从迭代器读取所有值。

在数组字面量中可以多次使用展开运算符，将可迭代对象中的多个元素依次插入新数组中，替换原先展开运算符所在的位置。

```js
const arr1 = [1, 2, 3];
const arr2 = [3, 6, 9];
const arr3 = [5, ...arr1, ...arr2];

console.log(arr3); // [5, 1, 2, 3, 3, 6, 9]
```

其中，原始数组中的值只是被复制到allNumbers中，它们本身并未改变。

## 高级迭代器功能

### 给迭代器传递参数

可以给迭代器的 next() 方法传递参数，这个参数的值会替代生成器内部上一条 yield 语句的返回值。

```js
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}

let iterator = createIterator();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next(4)); // {value: 6, done: false}
console.log(iterator.next(5)); // {value: 8, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

有一个特例，第一次调用 next() 方法时无论传入什么参数都会被丢弃。

> 由于传给 next() 方法的参数会代替上一次 yield 的返回值，而在第一次调用 next() 方法前不会执行任何 yield 语句，因此在第一次调用 next() 方法时传递参数是无意义的。

### 在迭代器中抛出错误

可以给迭代器传递参数，还可以给它传递错误条件。通过 throw() 方法，当迭代器恢复执行时可令其抛出一个错误。并且，可以在生成器内部通过 try-catch 来捕获这些错误。

```js
function *createIterator() {
    let first = yield 1;
    let second;

    try {
        second = yield first + 2;
    } catch (e) {
        second = 7;
    }
    yield second + 5;
}

const ite = createIterator();

console.log(ite.next()); // {value: 1, done: false}
console.log(ite.next(2)); // {value: 4, done: false}
console.log(ite.throw(new Error('boom!'))); // {value: 12, done: false}
console.log(ite.next()); // {value: undefined, done: true}
```

可以看到，调用 throw() 方法后也会像调用 next() 方法一样返回一个结果对象，它会命令迭代器继续执行，但同时也抛出一个错误，在此之后的执行过程取决于生成器内部的代码。

在迭代器内部，如果使用了 yield 语句，则可以通过 next() 方法和 throw() 方法控制执行过程。

### 生成器返回语句

由于生成器也是函数，因此可以通过 return 语句提前退出函数执行。在生成器中，return 表示所有操作已经完成，属性 done 被设置为 true；如果指定了返回值，则属性 value 会被设置为这个值。

通过return 语句指定的返回值，只会在返回对象中出现一次，在后续调用返回的对象中，value 属性会被重置为 undefined。

```js
function *createIte() {
    yield 2;
    yield 5;
    return 8;
    yield 12;
}

const ite = createIte();
console.log(ite.next()); // {value: 2, done: false}
console.log(ite.next()); // {value: 5, done: false}
console.log(ite.next()); // {value: 8, done: true}
console.log(ite.next()); // {value: undefined, done: true}
```

### 委托生成器

有些情况需要将生成器合起来用，此时可以使用 `yield *` 语句，将生成数据的过程委托给其他迭代器。

```js
function *createIte1() {
    yield 2;
    yield 5;
}

function *createIte2() {
    yield 8;
    yield 12;
}

function *createIte() {
    yield *createIte1();
    yield *createIte2();
}

const ite = createIte();
console.log(ite.next()); // {value: 2, done: false}
console.log(ite.next()); // {value: 5, done: false}
console.log(ite.next()); // {value: 8, done: false}
console.log(ite.next()); // {value: 12, done: false}
console.log(ite.next()); // {value: undefined, done: true}
```

使用 return 语句生成的返回值只存在于迭代器内部，不会出现在迭代器委托调用 next() 方法得到的迭代对象中。如果想输出，需要额外添加 yield 语句。

```js
function *createIte1() {
    yield 2;
    yield 5;
    return 3;
}

function *createIte2(count) {
    for (let i = 0; i < count; i++) {
        yield 'repeat';
    }
}

function *createIte() {
    const result = yield *createIte1();
    yield *createIte2(result);
}

const ite = createIte();
console.log(ite.next()); // {value: 2, done: false}
console.log(ite.next()); // {value: 5, done: false}
console.log(ite.next()); // {value: "repeat", done: false}
console.log(ite.next()); // {value: "repeat", done: false}
console.log(ite.next()); // {value: "repeat", done: false}
console.log(ite.next()); // {value: undefined, done: true}
```

> `yield *`也可直接应用于字符串，例如 `yield * 'hello'`，此时将使用字符串的默认迭代器。

## 异步任务执行

由于 yield 语句会暂停当前函数执行过程并等待下一次调用 next 方法，因此可以创建一个函数，在函数中调用生成器生成相应的迭代器，实现一个异步任务执行器。

```js
/* 异步任务迭代器 */
function run(taskDef) {
    // 创建任务迭代器
    let task = new taskDef();
    // 开始执行任务
    let result = task.next();

    // 开始迭代执行
    step();

    function step() {
        // 如果任务未完成，继续执行
        if (!result.done) {
            if (typeof result.value === 'function') {
                result.value((err, data) => {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }

                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
}

/* 异步任务：读取文件 */
let fs = require('fs');
function readFile(filename) {
    return function(callback) {
        fs.readFile(filename, callback);
    };
}

// 同步代码风格，执行异步任务
run(function*() {
    let contents = yield readFile('xxx.json');
    doSomething(contents);
    console.log('Done');
});
```

