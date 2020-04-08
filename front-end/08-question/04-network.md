# 网络相关

## 跨域问题

### 1. Ajax 请求 同步？异步？

AJAX中根据async的值不同分为同步（async = false）和异步（async = true）两种执行方式；在W3C的教程中推荐使用异步执行。

默认情况下async是true，也就是异步。

- 同步请求：

  发出请求后，需要等待请求完成后才能进行执行下一步操作。也就是说，页面会处于一个假死状态。

- 异步请求：

  发出请求后，其他代码继续执行，Ajax请求不影响页面的加载和用户的操作。不影响用户体验。

#### ajax请求过程，简单实现一个Ajax请求

参见：[笔记-AJAX](https://babyshulei.github.io/mybooks/front-end/05-network/04-ajax/)



#### ajax和jsonp哪个可以跨域，原理是什么？

ajax默认无法跨域，xhr2新增的CORS让ajax也可以跨域，需要输出http头(Access-Control-Allow-Origin)。jsonp可以跨域， 原理是script元素的src可以跨域。



### 2. 浏览器跨域问题的解决方案？

浏览器同源策略：域名、协议、端口号都要相同。

跨域的解决方案：

1. 通过Flash插件发送HTTP请求

2. 配置代理服务器，如Nginx

3. JSONP跨域

   只能用GET请求，并且要求返回JavaScript。JSONP通常以函数调用的形式返回。

4. 跨域资源共享CORS

5. document.domain + iframe跨域

6. location.hash + iframe

7. window.name + iframe跨域

8. postMessage跨域

9. nodejs中间件代理跨域

10. WebSocket协议跨域

11. img beacon跨域，常用来上报打点

    利用img标签的src属性发送请求，上报打点相关的数据。

参见：[笔记-AJAX](https://babyshulei.github.io/mybooks/front-end/05-network/04-ajax/)、[笔记-跨域问题](https://babyshulei.github.io/mybooks/front-end/05-network/05-cross-domain.html)



## 网络请求

### 1. tcp三次握手，四次挥手

参见：[笔记-TCP](https://babyshulei.github.io/mybooks/front-end/05-network/01-tcp/)



### 2. 详述输入url到页面渲染完成

域名解析-TCP分包-IP寻路-握手-滑动窗口传输-持久化连接-挥手-解析-构建dom树与cssom-构建渲染树-回流-重绘-渲染

- 域名（DNS）解析
- TCP 连接
- 发送HTTP请求
- 服务端处理请求并返回HTTP报文
- 浏览器解析渲染页面
- 连接结束

参见：[笔记-URL->PAGE](https://babyshulei.github.io/mybooks/front-end/05-network/06-url-webpage.html)



### 3. 浏览器如何缓存？

#### HTTP缓存机制

浏览器与服务器通信的方式为应答模式，即是：浏览器发起HTTP请求 – 服务器响应该请求。那么浏览器第一次向服务器发起该请求后拿到请求结果，会根据响应报文中HTTP头的缓存标识，决定是否缓存结果，是则将请求结果和缓存标识存入浏览器缓存中。

![img](.\images\http-cache.jpg)

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

根据是否需要向服务器重新发起HTTP请求将缓存过程分为两个部分，分别是强制缓存和协商缓存。

**强制缓存**

强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程，强制缓存的情况主要有三种(暂不分析协商缓存过程)，如下：

- 不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求

- 存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存

  ![img](.\images\http-cache-02.jpg)

- 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果

> 那么强制缓存的缓存规则是什么？

当浏览器向服务器发起请求时，服务器会将缓存规则放入HTTP响应报文的HTTP头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是Expires和Cache-Control，其中Cache-Control优先级比Expires高。

**协商缓存**

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：

- 协商缓存生效，返回304

  ![img](C:\Develop\mybooks\front-end\07-question\images\http-cache-03.jpg)

- 协商缓存失效，返回200和请求结果

  ![img](.\images\http-cache-04.jpg)

协商缓存的标识也是在响应报文的HTTP头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有：Last-Modified / If-Modified-Since和Etag / If-None-Match，其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高。

**总结**

强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回304，继续使用缓存。

[彻底理解浏览器的缓存机制- 前端- 掘金](https://juejin.im/entry/5ad86c16f265da505a77dca4)

### 4. 为什么cookie的容量比localStorage小？

因为cookie会附带在http请求的header里，如果容量大会有性能问题。



### 4. 应用缓存原理？

- app cache
- CacheStorage
- Web Worker
- Service Worker

#### 描述application cache更新的过程。

第一次访问缓存manifest文件里列的文件，之后访问先加载缓存，在后台加载manifest文件按字节对比看是否有变化，如果没变化则说明缓存未失效，否则在后台按列表更新缓存，在下一次刷新页面的时候使用新的资源。

[浏览器缓存、CacheStorage、Web Worker 与Service Worker ...](https://github.com/youngwind/blog/issues/113)



### 5. 正向代理，反向代理都是什么？如何实现？



### 6. 7层网络协议

[参见笔记](https://babyshulei.github.io/mybooks/front-end/05-network/)



## 参考链接

<https://segmentfault.com/a/1190000015580896>

