# 3 函数

> 2019.04.21 @wsl 

## 1. 函数形参的默认值

ES5中，对于函数的命名参数，如果不显式传值，其值默认为undefined。

ES6中，函数在声明时，可以指定传参默认值，如果未传入值，则使用默认值。

```javascript
function makeRequest(url, timeout = 2000, callback = function() {}) {
    // 函数体，按照ES6的语法，url是必需参数，其余两个有默认值的是可选参数
}
```

声明函数时，可以为任意参数指定默认值，在已指定默认值的参数后可以继续声明无默认值参数。

```javascript
function makeRequest(url, timeout = 2000, callback) {
    // 函数体
}
```

> 注：指定默认值的参数，在未传值或传入 undefined 时才会使用默认值。其它传参，如0，null 都是生效的。

**默认参数值对arguments对象的影响**

在非严格模式下，命名参数的变化会同步更新到arguments对象中。如下示例：

```javascript
function mixArgs(first, second) {
    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true
}

mixArgs('a', 'b');
```

在严格模式下，无论参数如何变化，arguments对象不再随之改变。

```javascript
function mixArgs(first, second) {
    'use strict';

    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]); // false
    console.log(second === arguments[1]); // false
}

mixArgs('a', 'b');
```

在ES6中，如果一个函数使用了默认参数值，则无论是否显式定义了严格模式，arguments对象的行为都将于ES5严格模式下保持一致。默认参数值的存在使得arguments对象保持与命名参数分离。

```javascript
function mixArgs(first, second = 'b') {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs('a'); // 1 true false false false
mixArgs('a', 's'); // 2 true true false false
```

