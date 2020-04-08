# 浏览器跨域问题

> 2020.04.08 @wsl

## 什么是跨域？

### 同源策略

同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

同源策略限制内容有：

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求发送后，结果被浏览器拦截了

但有三个标签是允许跨域加载资源：

- `<img src=XXX>`
- `<link href=XXX>`
- `<script src=XXX>`

**请求跨域了，那么请求到底发出去没有？**

**跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了**。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会？因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。



## 跨域问题的解决方案

### JSONP

jsonp可以跨域， 原理是script元素的src可以跨域。需要服务端支持。

只能用GET请求，并且要求返回JavaScript。JSONP通常以函数调用的形式返回。

#### 优缺点

JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。

缺点是仅支持get方法具有局限性，不安全可能会遭受XSS攻击。

#### 实现流程

1. 声明一个回调函数，其函数名(如show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的data)。
2. 创建一个`<script>`标签，将跨域的API数据接口地址赋值给script的src，还要在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=show）。
3. 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串，例如：传递进去的函数名是show，它准备好的数据是`show(data)`。
4. 最后服务器把准备的数据通过HTTP协议返回给客户端，客户端再调用执行之前声明的回调函数（show），对返回的数据进行操作。

#### 代码

前端js代码

```js
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.example.com:8080/api/jsonp?callback=jsCallback';
document.appendChild(script);

// JSONP回调函数
function jsCallback(res) {
    console.log(JSON.parse(res));
}
```

服务端返回：

```js
jsCallback({"name": "hello"})
```

服务端node.js代码：

```js
const querystring = require('querystring');
const http = require('http');
const server = http.createServer();

server.on('request', function(req, res) {
    const params = querystring.parse(req.url.split('?')[1]);
    const fn = params.callback;
    const data = { name: 'hello' };

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(`${fn}(${JSON.stringify(data)})`);

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```



### CORS

CORS全称Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。

ajax默认无法跨域，xhr2新增的CORS让ajax也可以跨域，需要输出http头(Access-Control-Allow-Origin)。

Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。

对于PUT、DELETE以及其他类型如application/json的POST请求，在发送AJAX请求之前，浏览器会先发送一个OPTIONS请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受；服务器必须响应并明确指出允许的Method；浏览器确认服务器响应的Access-Control-Allow-Methods头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。



### 其他

1. 通过Flash插件发送HTTP请求

2. 配置代理服务器，如Nginx

3. document.domain + iframe跨域

4. location.hash + iframe

5. window.name + iframe跨域

6. postMessage跨域

7. nodejs中间件代理跨域

8. WebSocket协议跨域

9. img beacon跨域，常用来上报打点

   利用img标签的src属性发送请求，上报打点相关的数据。



## 参考链接

[前端常见跨域解决方案（全） - 个人文章- SegmentFault 思否](https://segmentfault.com/a/1190000011145364)

[9种常见的前端跨域解决方案（详解） - 掘金](https://juejin.im/post/5d1ecb96f265da1b6d404433)

[九种跨域方式实现原理（完整版）- 掘金](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

[前端日志上报的新姿势“Beacon” - 知乎](https://zhuanlan.zhihu.com/p/48171879)

