# JavaScript

#### 1. 给出如下代码的输出并解释原因：

```javascript
var a = 1;

function f() {
    console.log(a);
    var a = 2;
}

f();
```

输出undefined，因为变量定义会提前到函数开头(hoisting)。

#### 2. 什么是作用域链(scope chain)？可举例说明。
几个要点：作用域的范围是函数，函数嵌套函数，查找变量从内层函数依次向外层找，最后找不到在window上找。

#### 3. 写出让B原型继承A的代码。

```javascript
function A() {
    this.a = 1;
}
  
function B() {
    this.b = 2;
}
```

B.prototype = new A; 

#### 4. 什么是原型链(prototype chain)？可举例说明。

上一题的例子

```javascript
var b = new B;
// b.b == 2
// b.a == 1
```

b.b在b自己的属性上找，b.a自己的属性里没找到则去b的原型即b,`__proto__`也就是B.prototype里找，一层一层往上找，到null为止，`b.__proto__.__proto__`是Object.prototype，`b.__proto__.__proto__.__proto__`为null。

#### 5. 解释call、apply、bind的区别，可举例说明。

call和apply都是调用一个函数，并指定this和参数，call和apply第一个参数都是指定的this的值，区别在于call第二个参数开始的参数是替换的参数，而apply的第二个参数是一个数组。bind是由一个函数创建一个新函数，并绑定this和部分参数，参数形式和call类似。

#### 6. ajax和jsonp哪个可以跨域，原理是什么？

ajax默认无法跨域，xhr2新增的CORS让ajax也可以跨域，需要输出http头(Access-Control-Allow-Origin)。jsonp可以跨域， 原理是script元素的src可以跨域。

#### 7. 描述事件捕获和事件冒泡的顺序。

先从外向内捕获，然后从内向外冒泡。

#### 8. 描述事件委派(delegation)的原理和优点。

原理是在容器节点上绑定事件，利用冒泡，判断事件是否在匹配指定的选择器的节点上被触发。优点是只用绑定一次，不用对每个目标做绑定，还有对动态插入的节点也生效，无需重新绑定。

#### 9. 有哪些触屏事件？

touchstart，touchmove，touchend，touchcancel

#### 10. 为什么老版本的webkit的click事件有300ms延迟？

为了支持双击放大，如果300ms以内有两次点击则触发放大操作，而不是click。chromium较新版本在没有双击放大的页面去掉了click事件的300ms延迟。

#### 11. 为什么cookie的容量比localStorage小？

因为cookie会附带在http请求的header里，如果容量大会有性能问题。

#### 12. 描述application cache更新的过程。
第一次访问缓存manifest文件里列的文件，之后访问先加载缓存，在后台加载manifest文件按字节对比看是否有变化，如果没变化则说明缓存未失效，否则在后台按列表更新缓存，在下一次刷新页面的时候使用新的资源。

#### 13. classList和dataset分别是什么？

classList类似className，区别是className是空格隔开的字符串，而classList是一个类数组对象，有add、remove、toggle方法。dataset是获取以data-开头的属性的方法。

#### 14. 描述history.pushState的作用。

无刷新的新增一个历史记录，第一个参数是记录绑定的数据，第二个参数是标题(很多浏览器都忽略了)，第三个参数是新的URL。

