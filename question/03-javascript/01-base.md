# 基础

## 作用域、闭包

### 1. 描述下ES中的作用域和闭包。

es5全局+函数级，es6块级作用域。函数可以记住并访问所在的词法作用域，即使在当前作用域之外执行，这时就产生了闭包。

### 2. 变量提升、临时死区出现的场景

- 变量提升

给出如下代码的输出并解释原因：

```javascript
var a = 1;

function f() {
    console.log(a);
    var a = 2;
}

f();
```

输出undefined，因为变量定义会提前到函数开头(hoisting)。

如果内部有函数，整个函数会提升到函数顶部。

- 临时死区

JS引擎在扫描代码发现变量声明时，var声明会提升到作用域顶部，let/const声明会放到TDZ中。访问TDZ变量会触发运行时错误。只有执行过变量声明语句后，变量才会从TDZ中移出，然后方可正常访问。

```js
let value = 10;

if (true) {
    console.log(value);
    let value = 'blue'; // Uncaught ReferenceError: Cannot access 'value' before initialization
}
```

由于let 和 const 声明的变量不会被提升，如果在声明之前访问这些变量，会触发引用错误，即“临时死区”的场景出现。

### 3. 什么是作用域链(scope chain)？可举例说明。

几个要点：作用域的范围是函数，函数嵌套函数，查找变量从内层函数依次向外层找，最后找不到在window上找。



## 原型、原型链

### 1. 如何实现对象的继承？

写出让B原型继承A的代码。

```javascript
function A() {
    this.a = 1;
}
  
function B() {
    this.b = 2;
}
```

B.prototype = new A(); 

### 2. 什么是原型链(prototype chain)？可举例说明。

每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（**prototype** ）。该原型对象也有一个自己的原型对象( `__proto__` ) ，层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节。

上一题的例子

```javascript
var b = new B();
// b.b == 2
// b.a == 1
```

b.b在b自己的属性上找，b.a自己的属性里没找到则去b的原型即b，`__proto__`也就是B.prototype里找，一层一层往上找，到null为止，`b.__proto__.__proto__`是Object.prototype，`b.__proto__.__proto__.__proto__`为null。

参见笔记：JavaScript-对象-原型、原型链


## 数据类型

### 1. 如何获取一个变量的数据类型？

```js
function getType(param) {
    let type = typeof param;

    if (type === 'object') {
        type = getObjectType(param);
    }

    return type;

    function getObjectType(obj) {
        const str = Object.prototype.toString.call(obj);

        return str.slice(8, str.length - 1);
    }
}
```



## 字符串

### 1. 写一个解析url的函数

```js
function parseUrl(url) {
    const querystring = url.split('?')[1];
    const vars = querystring && querystring.split('&') || [];
    const query = {};

    for(let i = 0; i < vars.length; i++) {
        if (vars[i]) {
            let pair = vars[i].split('=');
            query[pair[0]] = pair[1];
        }
    }

    return query;
}
```

利用a标签

```js
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {}, seg = a.search.replace(/^\?/, '').split('&'), len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}; 
```



## 函数

### 1. 解释call、apply、bind的区别，可举例说明。

call和apply都是调用一个函数，并指定this和参数，call和apply第一个参数都是指定的this的值，区别在于call第二个参数开始的参数是替换的参数，而apply的第二个参数是一个数组。bind是由一个函数创建一个新函数，并绑定this和部分参数，参数形式和call类似。



### 2. 箭头函数

参见笔记：JavaScript-函数

#### 箭头函数与function函数有哪些不同？

- 没有this、super、arguments和new.target绑定。

- 不能通过new关键字调用。

- 没有原型。

- 不可以改变this的绑定。

- 不支持arguments对象。

- 不支持重复的命名参数。


> 箭头函数有name属性，和其他函数的规则相同。

#### 箭头函数的this绑定？

箭头函数中没有this绑定，必须通过查找作用域链来决定其值。如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this；否则，this的值会被设置为全局对象。并且，不能通过call()、apply()、bind()方法来改变this的值。

### 3. 实现一个函数，使 add(1)(2)(3), add(1)(2, 3), add(1, 2, 3) 都返回 6

函数柯里化，参见笔记：编程-编程思想-函数柯里化



## 代理与反射

### 1. 实现一个MyArray对象，模拟数组的部分功能。

参见 javascript/demos/13-proxy-reflection/myarray.js



## 事件

### 1. 事件捕获和事件冒泡的顺序，target和currentTarget。

先从外向内捕获，然后从内向外冒泡。

document.body.addEventListener(event, fn, useCapture); 

- useCapture：true - 捕获阶段执行，false（默认值） - 冒泡阶段执行。

currentTarget始终是监听事件者，而target是事件的真正发出者。

### 2. 描述事件委派(delegation)的原理和优点。

原理是在容器节点上绑定事件，利用冒泡，判断事件是否在匹配指定的选择器的节点上被触发。优点是只用绑定一次，不用对每个目标做绑定，还有对动态插入的节点也生效，无需重新绑定。

### 3. 有哪些触屏事件？

touchstart，touchmove，touchend，touchcancel

###  4. 为什么老版本的webkit的click事件有300ms延迟？

为了支持双击放大，如果300ms以内有两次点击则触发放大操作，而不是click。chromium较新版本在没有双击放大的页面去掉了click事件的300ms延迟。

### 5. 点击穿透现象，什么时候会出现？如何避免？

click事件有300ms的延迟。点击蒙层上的关闭按钮，蒙层消失后发现触发了下面元素的click事件。

蒙层上绑定 touch 事件，touch事件触发了，蒙层关闭，下面的元素成了 click事件的目标。

下面恰好是个a标签的话，会导致页面的跳转

- 解决方案：

  - 不混用 touch 和 click

  - 消费掉touch后的click

    例如加个透明蒙层、pointer-events、下面元素的事件处理器处理等等。

