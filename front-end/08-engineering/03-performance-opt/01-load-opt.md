# 加载优化

## 网页加载

网页加载大致可分为三个阶段：请求阶段、资源处理阶段、页面渲染阶段。

- **请求阶段**主要是资源、数据请求，网络状况及数据量对该部分影响较大，主要优化手段为**优化网络和对数据压缩**。
- **资源解析阶段**主要是对请求下来的资源和数据进行处理，数据规模及处理方式对该部分影响较大，主要优化手段减少数据处理耗时。
- **渲染阶段**主要是将处理后的数据渲染在页面上，频繁的重绘和重排对该部分影响较大，主要优化手段是**减少重绘和重排**。

## 前端渲染模式

React、Vue 等现代化前端框架，都是CSR（Client-side rendering）模式，前端部分几乎全都是由客户端动态渲染（客户端执行 JS 代码，动态创建 DOM 结构）出来的。

客户端逻辑越重，初始化需要执行的 JS 越多，首屏性能就越慢，因而出现了更多的渲染模式探索：

- SSR（Server-Side Rendering）：服务端渲染，在服务端将 Web 应用渲染成 HTML
- Rehydration：二次渲染，复用服务端渲染的 HTML DOM 结构和数据，在客户端“温启动”JS 渲染
- Prerendering：预渲染，在编译时运行一个客户端应用抓取其初始状态生成静态 HTML

### CSR

CSR（Client-side rendering），即客户端渲染，是指用 JS 直接在浏览器里渲染页面，包括数据请求、视图模板、路由在内的所有逻辑都在客户端处理。

> Client-side rendering (CSR) means rendering pages directly in the browser using JavaScript. All logic, data fetching, templating and routing are handled on the client rather than the server.

渲染流程如下：

![img](C:/develop/mybooks/front-end/08-engineering/images/csr.png)

主要缺陷在于随着应用程序的更新迭代，客户端所要执行 JS 代码量越来越多，前置的第三方类库/框架、polyfill 等都会在一定程度上拖慢首屏性能，在（中低端）移动设备上尤为明显。

Code splitting、[lazy-load](http://mp.weixin.qq.com/s?__biz=MzIwMTM5MTM1NA==&mid=2649473171&idx=1&sn=651a2cca45c940ab4b774753171e4828&chksm=8ef1cd06b986441052f2622863cb0b8d151d8b69fbc849231512eb7a44ef7d95c0c1aa22844d&scene=21#wechat_redirect) 等优化措施能够缓解一部分，但优化空间相对有限，无助于从根本上解决问题。

此时，只有改变渲染模式才能创造更多的可能性。

### SSR

SSR（Server-Side Rendering）服务端渲染，在服务端生成完整的 HTML 页面：

> Server rendering generates the full HTML for a page on the server in response to navigation.

省去了客户端二次请求数据的网络开销，以及渲染视图模板的性能负担。与 CSR 相比，其 FCP、TTI 通常会更快。

渲染流程：

![img](C:/develop/mybooks/front-end/08-engineering/images/ssr.png)

P.S.另一方面，服务端的网络环境要优于客户端，内部服务器之间通信路径也更短

因为页面逻辑（包括即时数据请求）和模板渲染工作都放在服务端完成，减少了客户端的 JS 代码量，流式文档解析（streaming document parsing）等浏览器优化机制也能发挥其作用，在低端设备和弱网情况下表现更好。但在服务器上生成页面同样需要时间，会导致页面内容响应时间（TTFB, Time to First Byte）变慢。

一种办法是可以通过流式 SSR、组件级缓存、模板化、HTML 缓存等技术来进一步优化。

另一种办法是继续在渲染模式上探索，采用静态渲染（Static Rendering）。

### Static Rendering

将生成 HTML 页面的工作放到编译时，而不必在请求带来时动态完成。为每个 URL 预先单独生成 HTML 文件，并进一步借助[CDN](http://mp.weixin.qq.com/s?__biz=MzIwMTM5MTM1NA==&mid=2649473411&idx=1&sn=da86e432ceb7115433d15e35dd61be97&chksm=8ef1cc16b98645002c10513416fe9a984046de3de1642cc0f0a39553d47006862d8cdbaedcb1&scene=21#wechat_redirect)加速访问：

> Static rendering happens at build-time and offers a fast First Paint, First Contentful Paint and Time To Interactive – assuming the amount of client-side JS is limited. Unlike Server Rendering, it also manages to achieve a consistently fast Time To First Byte, since the HTML for a page doesn’t have to be generated on the fly.

渲染流程如下图：

![img](C:/develop/mybooks/front-end/08-engineering/images/static-rendering.png)

P.S.SSR 第一部分的 Server Rendering 渲染工作变成了 Streaming 传递静态 HTML 文件

静态渲染也并非完美，其关键问题在于*“静态”*：

- 需要为每个 URL 单独生成一份 HTML 文件：对于无法预知所有可能的 URL，或者存在大量不同页面的网站，静态渲染就不那么容易，甚至根本不可行
- 只适用于偏静态内容：对于动态的、个性化的内容作用不大

另外，还有个与静态渲染相似的概念，叫预渲染（Prerendering）。

### Prerendering

主要区别在于，静态渲染得到的页面已经是可交互的，无需在客户端额外执行大量 JS 代码，而预渲染必须经客户端渲染才真正可交互：

> Static rendered pages are interactive without the need to execute much client-side JS, whereas prerendering improves the First Paint or First Contentful Paint of a Single Page Application that must be booted on the client in order for pages to be truly interactive.

也就是说，禁用 JS 后，静态渲染的页面几乎不受影响，而预渲染的页面将只剩下超链接之类的基本功能。

### Rehydration

Rehydration 模式将 CSR 与 SSR 结合起来了，服务端渲染出基本内容后，在客户端进行二次渲染（Rehydration）：

> Often referred to as Universal Rendering or simply “SSR”, this approach attempts to smooth over the trade-offs between Client-Side Rendering and Server Rendering by doing both. Navigation requests like full page loads or reloads are handled by a server that renders the application to HTML, then the JavaScript and data used for rendering is embedded into the resulting document.

渲染流程：

![img](C:/develop/mybooks/front-end/08-engineering/images/rehydration.webp)

注意`bundle.js`仍然是全量的 CSR 代码，这些代码执行完毕页面才真正可交互。因此，这种模式下，FP（First Paint）虽然有所提升，但 TTI（Time To Interactive）可能会变慢，因为在客户端二次渲染完成之前，页面无法响应用户输入（被 JS 代码执行阻塞了）

对于二次渲染造成交互无法响应的问题，可能的优化方向是增量渲染（例如[React Fiber](http://mp.weixin.qq.com/s?__biz=MzIwMTM5MTM1NA==&mid=2649472898&idx=1&sn=4981b77656603b770a39bbf8920c0c49&chksm=8ef1b217b9863b013bcfb6a2da2a70a93a5323939714d22770f49da4438d69950cda6ad37961&scene=21#wechat_redirect)），以及渐进式渲染/部分渲染。

### Trisomorphic Rendering

如果把[Service Worker](http://mp.weixin.qq.com/s?__biz=MzIwMTM5MTM1NA==&mid=400647614&idx=1&sn=e1ac2b90425c0a149e376dde31f2d3a9&scene=21#wechat_redirect)也考虑进来的话，还有一种涉及三方的渲染模式：

```
SSR + CSR + ServiceWorker rendering = Trisomorphic Rendering
```

如下图：

![img](C:/develop/mybooks/front-end/08-engineering/images/trisomorphic-rendering.png)

首先通过流式 SSR 渲染初始页面，接着由 Service Worker 根据路由规则，借助 SSR 渲染出目标 HTML 页面：

> It’s a technique where you can use streaming server rendering for initial/non-JS navigations, and then have your service worker take on rendering of HTML for navigations after it has been installed. This can keep cached components and templates up to date and enables SPA-style navigations for rendering new views in the same session.

主要优势在于能够跨三方共享模板渲染和路由控制逻辑：

> This approach works best when you can share the same templating and routing code between the server, client page, and service worker.

### 总结

每种渲染模式都有一定优势，也有其局限性和缺点，实际场景中需要在多种因素之下权衡选择：

![img](C:\develop\mybooks\front-end\08-engineering\images\rendering.png)



## 前端性能指标

- FCP（First Contentful Paint）：用户所请求的内容在屏幕上可见的时间点
- TTI（Time To Interactive）：页面可交互的时间点



## 参考链接

[前端加载优化实战](https://mp.weixin.qq.com/s?__biz=MzUyMzA3MTY1NA==&mid=2247485369&idx=1&sn=c608eb3bf3a0fde1b35160edd6bf545d)

[图解 SSR 等 6 种前端渲染模式](https://mp.weixin.qq.com/s?__biz=MzIwMTM5MTM1NA==&mid=2649473600&idx=1&sn=87eb98498e7dc97c2ad1d7ba8dd5041c)

