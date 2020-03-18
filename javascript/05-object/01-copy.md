# 对象的浅拷贝、深拷贝

> 2020.03.17 @wsl

![img](./images/js-copy.jpg)



## 浅拷贝

### 概念

创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

### 使用场景

#### Object.assign(target, ...sources)

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```js
let obj2 = Object.assign({}, obj1);
```



#### 展开运算符 ...

效果和Object.assign()一样。

```js
let obj2 = {...obj1};
```



#### Array.prototype.slice(begin, end)

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin`和 `end`（不包括`end`）决定的原数组的**浅拷贝**。原始数组不会被改变。

```js
let arr2 = arr1.slice(2, 10);
```



#### Array.prototype.concat(...arrs)

 `concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```js
let arr2 = arr1.concat(arr);
```



#### 简单实现

```js
function cloneShallow(obj) {
    let target = {};
    
    Object.keys(obj).forEach((key) => {
        target[key] = obj[key];
    });
    
    return target;
}
```



## 深拷贝

### 概念

深拷贝会拷贝所有的属性，并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时即发生深拷贝。深拷贝相比于浅拷贝速度较慢并且花销较大。拷贝前后两个对象互不影响。

### 使用场景

#### JSON.parse(JSON.stringify(obj))

原理就是先将对象转换为字符串，再通过JSON.parse重新建立一个对象。

但是这种方法的局限也很多：

- 会忽略 undefined, symbol, function

- 不能处理正则
- 不能正确处理 new Date()
- 循环引用报错
- 相同的引用会被重复复制



#### 递归

思想：对于简单类型，直接复制。对于引用类型，递归复制它的每一个属性。

##### 简单实现

```js
function cloneDeep(source) {
    let target = {};
    
    Object.keys(source).forEach((key) => {
        if (typeof source[key] === 'object') {
            target[key] = cloneDeep(source[key]);
        } else {
            target[key] = source[key];
        }
    });
    
    return target;
}
```

该实现还存在很多问题：

- 没有对传入参数进行校验，传入 `null` 时应该返回 `null` 而不是 `{}`
- 对于对象的判断逻辑不严谨，因为 `typeof null === 'object'`
- 没有考虑数组的兼容



##### 兼容数组、null

```js
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

function cloneDeep(source) {
    if (!isObject(source)) {
        return source;
    }
    
    let target = Array.isArray(source) ? [] : {};
    
    Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
            target[key] = cloneDeep(source[key]);
        } else {
            target[key] = source[key];
        }
    });
    
    return target;
}
```



#### 函数库

jQuery.extend()、lodash.cloneDeep()等。



## 参考链接

[【进阶 4-1 期】详细解析赋值、浅拷贝和深拷贝的区别](https://github.com/yygmind/blog/issues/25)

[【进阶 4-2 期】Object.assign 原理及其实现](https://github.com/yygmind/blog/issues/26)

[【进阶 4-3 期】面试题之如何实现一个深拷贝](https://github.com/yygmind/blog/issues/29)

[【进阶 4-4 期】Lodash是如何实现深拷贝的](https://github.com/yygmind/blog/issues/31)

[js 深拷贝vs 浅拷贝- 掘金](https://juejin.im/post/59ac1c4ef265da248e75892b)

[浅拷贝与深拷贝- 掘金](https://juejin.im/post/5b5dcf8351882519790c9a2e)

[JavaScript」带你彻底搞清楚深拷贝、浅拷贝和循环引用 ...](https://segmentfault.com/a/1190000015042902)

