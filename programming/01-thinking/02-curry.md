# 函数柯里化

## 定义

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

例子：

```js
function add(a, b) {
    return a + b;
}

var addCurry = curry(add);
addCurry(1)(2) // 等价于 add(1, 2)，等价于addCurry(1, 2)
```

## 用途

参数复用。本质上是降低通用性，提高适用性。

```js
// 示例
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=kevin");
```

例二：把柯里化后的函数传给其他函数比如 map 

```js
var person = [{name: 'kevin'}, {name: 'daisy'}];

var name = person.map(function (item) {
    return item.name;
})

// 使用 curry 函数
var prop = curry(function (key, obj) {
    return obj[key]
});

// 代码更精简易懂了，prop函数还可复用到其他位置
var name = person.map(prop('name'))
```

## 实现

### 简单版

```js
function curry(fn, ...args) {
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

console.log(a, b, c);
```

### 高颜值版

```js
var curry = (fn) =>
    judge = (...args) => 
         args.length === fn.length
            ? fn(...args)
            : (...arg) => judge(...args, ...arg);
```



## 参考链接

[JavaScript专题之函数柯里化· Issue #42 · mqyqingfeng/Blog ...](https://github.com/mqyqingfeng/Blog/issues/42)

[柯里化- 维基百科，自由的百科全书](https://zh.wikipedia.org/zh/%E6%9F%AF%E9%87%8C%E5%8C%96)

