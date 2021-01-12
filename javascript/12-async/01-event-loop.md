# Event Loop

## 定义

### event loop

event loop翻译出来就是**事件循环**，可以理解为实现异步的一种方式，[event loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)在**HTML Standard**中的定义开篇：

> 为了协调事件，用户交互，脚本，渲染，网络等，用户代理必须使用本节所述的`event loop`。

**事件，用户交互，脚本，渲染，网络**这些都是我们所熟悉的东西，他们都是由event loop协调的。触发一个`click`事件，进行一次`ajax`请求，背后都有`event loop`在运作。

每个线程（thread）都有自己的 event loop，所以每个 web worker 都有自己的 event loop，可以独立运行。

但是同域的所有 windows （多个tab打开同一个域名下的页面）共用同一个 event loop，所以它们可以 synchronously communicate。

Event loop 持续运行，它会执行任何排队的 task。

### task

> 一个event loop有一个或者多个task队列。

> 当用户代理安排一个任务，必须将该任务增加到相应的event loop的一个tsak队列中。

> 每一个task都来源于指定的任务源，比如可以为鼠标、键盘事件提供一个task队列，其他事件又是一个单独的队列。可以为鼠标、键盘事件分配更多的时间，保证交互的流畅。

task也被称为macrotask，task队列还是比较好理解的，就是一个先进先出的队列，由指定的任务源去提供任务。

**哪些是task任务源呢？**

规范在[Generic task sources](https://html.spec.whatwg.org/multipage/webappapis.html#generic-task-sources)中有提及：

> **DOM操作任务源：**
> 此任务源被用来相应dom操作，例如一个元素以非阻塞的方式[插入文档](https://html.spec.whatwg.org/multipage/infrastructure.html#insert-an-element-into-a-document)。

> **用户交互任务源：**
> 此任务源用于对用户交互作出反应，例如键盘或鼠标输入。响应用户操作的事件（例如[click](https://w3c.github.io/uievents/#event-type-click)）必须使用task队列。

> **网络任务源：**
> 网络任务源被用来响应网络活动。如XHR回调。

> **history traversal任务源：**
> 当调用history.back()等类似的api时，将任务插进task队列。

task任务源非常宽泛，比如`ajax`的`onload`，`click`事件，基本上我们经常绑定的各种事件都是task任务源，还有数据库操作（IndexedDB ），需要注意的是`setTimeout`、`setInterval`、`setImmediate`也是task任务源。总结来说task任务源：

- setTimeout / setInterval / setImmediate
- 事件回调
- XHR回调
- I/O
- UI rendering

### microtask

> 每一个event loop都有一个microtask队列，一个microtask会被排进microtask队列而不是task队列。

> 有两种microtasks：分别是solitary callback microtasks和compound microtasks。规范只覆盖solitary callback microtasks。

> 如果在初期执行时，[spin the event loop](https://html.spec.whatwg.org/multipage/webappapis.html#spin-the-event-loop)，microtasks有可能被移动到常规的task队列，在这种情况下，microtasks任务源会被task任务源所用。通常情况，task任务源和microtasks是不相关的。

microtask 队列和task 队列有些相似，都是先进先出的队列，由指定的任务源去提供任务，不同的是一个
event loop里只有一个microtask 队列。

**HTML Standard**没有具体指明哪些是microtask任务源，通常认为是microtask任务源有：

- process.nextTick
- promise
- Object.observe
- MutationObserver

**NOTE:**
Promise的定义在 ECMAScript规范而不是在HTML规范中，但是ECMAScript规范中有一个[jobs](http://ecma-international.org/ecma-262/6.0/index.html#sec-jobs-and-job-queues)的概念和microtasks很相似。**[在Promises/A+规范的Notes 3.1](https://promisesaplus.com/#notes)中提及了promise的then方法可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现**。所以开头提及的promise在不同浏览器的差异正源于此，有的浏览器将`then`放入了macro-task队列，有的放入了micro-task 队列。在jake的博文[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)中提及了一个讨论[vague mailing list discussions](https://esdiscuss.org/topic/the-initialization-steps-for-web-browsers#content-16)，一个普遍的共识是promises属于microtasks队列。

## Event Loop 解析

> Event Loop有：window event loop（[similar-origin window agents](https://html.spec.whatwg.org/multipage/webappapis.html#similar-origin-window-agent)）、worker event loop（worker agents）、worklet event loop（[worklet agents](https://html.spec.whatwg.org/multipage/webappapis.html#worklet-agent)）。

> 用户代理可以通过similar-origin window agents 共享一个 event loop。

> event loop 总是具有至少一个浏览器上下文，当一个event loop的浏览器上下文全都销毁的时候，event loop也会销毁。一个浏览器上下文总有一个event loop去协调它的活动。

> Worker的event loop相对简单一些，一个worker对应一个event loop，[worker进程模型](https://html.spec.whatwg.org/multipage/workers.html#run-a-worker)管理event loop的生命周期。

反复提到的一个词是[browsing contexts](https://html.spec.whatwg.org/multipage/browsers.html#browsing-context)（浏览器上下文）。

> **浏览器上下文**是一个将 Document 对象呈现给用户的环境。在一个 Web 浏览器内，一个标签页或窗口常包含一个浏览上下文，如一个 [iframe](https://html.spec.whatwg.org/multipage/embedded-content.html#the-iframe-element) 或一个 [frameset](https://html.spec.whatwg.org/multipage/obsolete.html#frameset) 内的若干 frame。



结合一些资料，对上边规范给出一些理解（有误请指正）：

- 每个线程都有自己的`event loop`。
- 浏览器可以有多个`event loop`，`browsing contexts`和`web workers`就是相互独立的。
- 所有同源的`browsing contexts`可以共用`event loop`，这样它们之间就可以相互通信。



### 处理过程（Processing model）

在规范的[Processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)定义了`event loop`的循环过程：

一个event loop只要存在，就会不断执行下边的步骤：

> 1. 在tasks队列中选择一个作为taskQueue，用户代理可以选择任何task队列，该队列必须包含至少一个[可运行的任务](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task-runnable)。如果没有这样的任务队列，则跳到下边的microtasks步骤。
>
> 2. 选择最老的task成为taskQueue中第一个[可运行的任务](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task-runnable)，并将其从taskQueue中删除。
>
> 3. 将上边选择的task设置为[正在运行的task](https://html.spec.whatwg.org/multipage/webappapis.html#currently-running-task)。
>
> 4. 设置taskStartTime为[当前高分辨率时间](https://w3c.github.io/hr-time/#dfn-current-high-resolution-time)。
>
> 5. Run: 运行被选择的task。
>
> 6. 将event loop的[正在运行的task](https://html.spec.whatwg.org/multipage/webappapis.html#currently-running-task)变为null。
>
> 7. Microtasks: 执行[microtasks任务检查点](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint)。（也就是执行microtasks队列里的任务）
>
> 8. 设置now为[当前高分辨率时间](https://w3c.github.io/hr-time/#dfn-current-high-resolution-time)。
>
> 9. 上报任务持续时间。
>
> 10. 更新渲染（Update the rendering）...
>
>     1-4. 判断 document 在此时间点渲染是否会『获益』。浏览器只需保证 60Hz 的刷新率即可（在机器负荷重时还会降低刷新率），若 eventloop 频率过高，即使渲染了浏览器也无法及时展示。所以并不是每轮 eventloop 都会执行 UI Render。
>     5-10. 执行各种渲染所需工作，如 触发 resize、scroll 事件、建立媒体查询、运行 CSS 动画等等。
>
>     11.执行 animation frame callbacks(即requestAnimationFrame的callback)
>
>     12.执行 IntersectionObserver callback
>
>     13-14.渲染 UI
>
> 11. 如果这是一个window event loop，且事件循环的task队列中没有文档处于完全活跃的task，且microtask队列为空，且没有浏览器上下文有渲染时机，那么，对于每个浏览器上下文，运行[start a idle period算法](https://w3c.github.io/requestidlecallback/#start-an-idle-period-algorithm)中的步骤，传递给与该浏览上下文关联的window。
>
> 12. 上报更新渲染的持续时间。
>
> 13. 如果这是一个worker event loop，但是没有任务在task队列中，并且[WorkerGlobalScope](https://html.spec.whatwg.org/multipage/workers.html#workerglobalscope)对象的closing标识为true，则销毁event loop，中止这些步骤，然后进行定义在[Web workers](https://html.spec.whatwg.org/multipage/workers.html#workers)章节的[run a worker](https://html.spec.whatwg.org/multipage/workers.html#run-a-worker)。
>
> 14. 返回到第一步。

event loop会不断循环上面的步骤，概括说来：

- `event loop`会不断循环的去取`tasks`队列的中最老的一个任务推入栈中执行，并在当次循环里依次执行并清空`microtask`队列里的任务。
- 执行完`microtask`队列里的任务，有**可能**会渲染更新。（浏览器很聪明，在一帧以内的多次dom变动浏览器不会立即响应，而是会积攒变动以最高60HZ的频率更新视图）

### microtasks检查点（microtask checkpoint）

`event loop`运行执行了一个`microtask checkpoint`，看看规范如何描述`microtask checkpoint`：

> 1. 如果microtask checkpoint的[flag](https://html.spec.whatwg.org/multipage/webappapis.html#performing-a-microtask-checkpoint)（标识）为true，返回。
>
> 2. 将microtask checkpoint的flag设为true。
>
> 3. 循环：当event loop的microtask队列不为空时
>
>    1. 在microtask队列中选择最老的一个任务。
>    2. 将上一步选择的任务设为event loop的[currently running task](https://html.spec.whatwg.org/multipage/webappapis.html#currently-running-task)。
>    3. 运行选择的任务。
>    4. 将event loop的[currently running task](https://html.spec.whatwg.org/multipage/webappapis.html#currently-running-task)变为null。
>
> 4. 每一个[environment settings object](https://html.spec.whatwg.org/multipage/webappapis.html#environment-settings-object)它们的 [responsible event loop](https://html.spec.whatwg.org/multipage/webappapis.html#responsible-event-loop)就是当前的event loop，会
>
>    给environment settings object发一个[ rejected promises ](https://html.spec.whatwg.org/multipage/webappapis.html#notify-about-rejected-promises)的通知。
>
> 5. [清理IndexedDB的事务](https://w3c.github.io/IndexedDB/#cleanup-indexed-database-transactions)。
>6. 将microtask checkpoint的flag设为flase。



`microtask checkpoint`所做的就是执行microtask队列里的任务。什么时候会调用`microtask checkpoint`呢?

- 在event loop中步骤（Microtasks: Perform a microtask checkpoint）执行checkpoint，也就是在运行task之后，更新渲染之前。
- Calling scripts - [clean up after running a callback](https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-a-callback)。在Calling scripts 的清理阶段，如果 javascript 执行栈为空时，执行一个microtask checkpoint。
- 在requestAnimationFrame 的执行过程：[在执行 ](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[animation frame callbacks ](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[时，](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[会](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[唤起](https://heycam.github.io/webidl/)[callback](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[（](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[invoke the callback](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)[）](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html)，[在唤起 ](https://heycam.github.io/webidl/)[callback ](https://heycam.github.io/webidl/)[的最后一步，会 ](https://heycam.github.io/webidl/)[clean up after running a callback](https://heycam.github.io/webidl/)，此时若满足 javascript 执行栈为空的条件，则执行 microtask。
- Creating and inserting nodes
- Parsing XML documents



### 执行栈

javaScript是单线程，也就是说只有一个主线程，主线程有一个栈，每一个函数执行的时候，都会生成新的execution context（执行上下文），执行上下文会包含一些当前函数的参数、局部变量之类的信息，它会被推入栈中，running execution context（正在执行的上下文）始终处于栈的顶部。当函数执行完后，它的执行上下文会从栈弹出。



### 更新渲染（Update the rendering）

规范允许浏览器自己选择是否更新视图。也就是说可能不是每轮事件循环都去更新视图，只在有必要的时候才更新视图。

渲染的基本流程：

1. 处理 HTML 标记并构建 DOM 树。
2. 处理 CSS 标记并构建 CSSOM 树， 将 DOM 与 CSSOM 合并成一个渲染树。
3. 根据渲染树来布局，以计算每个节点的几何信息。
4. 将各个节点绘制到屏幕上。

**Note: 可以看到渲染树的一个重要组成部分是CSSOM树，绘制会等待css样式全部加载完成才进行，所以css样式加载的快慢是首屏呈现快慢的关键点。**

- 在一轮event loop中多次修改同一dom，只有最后一次会进行绘制。
- 渲染更新（Update the rendering）会在event loop中的tasks和microtasks完成后进行，但并不是每轮event loop都会更新渲染，这取决于是否修改了dom和浏览器觉得是否有必要在此时立即将新状态呈现给用户。如果在一帧的时间内（时间并不确定，因为浏览器每秒的帧数总在波动，16.7ms只是估算并不准确）修改了多处dom，浏览器可能将变动积攒起来，只进行一次绘制，这是合理的。
- 如果希望在每轮event loop都即时呈现变动，可以使用requestAnimationFrame。



## requestAnimationFrame

**window.requestAnimationFrame()** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。



## Web Worker

Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。



## 参考链接

[HTML5规范-Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

[并发模型与事件循环- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[window.requestAnimationFrame - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

[使用Web Workers - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

[带你彻底弄懂Event Loop - 掘金](https://juejin.im/post/5b8f76675188255c7c653811)

[从event loop规范探究javaScript异步及浏览器更新渲染时机 ...](https://github.com/aooy/blog/issues/5)

[一次弄懂Event Loop（JS, NodeJs）-掘金](<https://juejin.im/post/5c3d8956e51d4511dc72c200>)

[第 25 题：浏览器和Node 事件循环的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26)

