 # H5的History

> 2019.11.11 @wsl

## 前进和后退

- window.history.back()

  - 后退。相当于用户点击浏览器的后退按钮

- window.history.forward()

  - 前进。相当于用户点击浏览器的前进按钮

- window.history.go(index)：

  - 跳到第index页。

  ```javascript
  window.history.go(-1) // 会后退一页（等同于调用back()）
  window.history.go(1) // 会前进一页（等同于调用forward()）
  window.history.go(2) // 会前进两页
  ```

- window.history.length
  - 获取历史堆栈中页面的数量。

## 添加和修改历史记录

### history.pushState(state, title, url)

需要三个参数：

- **state** — 是一个JavaScript对象，通过pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。   
- **title** — Firefox 目前忽略这个参数，但未来可能会用到。可以为跳转的state传递一个短标题。
- **url** — 可选，定义新的历史URL记录。注意，调用 `pushState()` 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则 `pushState()` 会抛出一个异常。该参数是可选的，缺省为当前URL。

使用 `history.pushState()` 可以改变referrer，它在用户发送 [`XMLHttpRequest`](https://developer.mozilla.org/en/DOM/XMLHttpRequest) 请求时在HTTP头部使用，改变state后创建的 [`XMLHttpRequest`](https://developer.mozilla.org/en/DOM/XMLHttpRequest) 对象的referrer都会被改变。因为referrer是标识创建  `XMLHttpRequest` 对象时 `this` 所代表的window对象中document的URL。

例子：

```javascript
let stateObj = {
    foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");
```

假设在 http://mozilla.org/foo.html 中执行了上述 JavaScript 代码，这将使浏览器地址栏显示为 http://mozilla.org/bar.html，但并不会导致浏览器加载 `bar.html` ，甚至不会检查`bar.html` 是否存在。

假设现在用户又访问了 http://google.com，然后点击了返回按钮。此时，地址栏将显示 http://mozilla.org/bar.html，`history.state` 中包含了 `stateObj` 的一份拷贝。页面此时展现为`bar.html`。且因为页面被重新加载了，所以`popstate`事件将不会被触发。

> 我理解这里popstate事件不会触发，是因为页面被重新加载后，window变了，所以也不会触发popstate事件了。

如果我们再次点击返回按钮，页面URL会变为http://mozilla.org/foo.html，文档对象document会触发另外一个 `popstate` 事件，这一次的事件对象state object为null。 这里也一样，返回并不改变文档的内容，尽管文档在接收 `popstate` 事件时可能会改变自己的内容，其内容仍与之前的展现一致。

> 注意 pushState()  绝对不会触发 hashchange 事件，即使新的URL与旧的URL仅哈希不同也是如此。



### history.replaceState(state, title, url)

使用方法类似于pushState，区别在于 replaceState() 是修改了当前的历史记录项而不是新建一个。 注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。

例子：

假设 http://mozilla.org/foo.html 执行了如下JavaScript代码：

```javascript
let stateObj = {
    foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");
```

然后，假设http://mozilla.org/bar.html执行了如下 JavaScript：

```javascript
history.replaceState(stateObj, "page 3", "bar2.html");
```

这将会导致地址栏显示http://mozilla.org/bar2.html,，但是浏览器并不会去加载`bar2.html` 甚至都不需要检查 `bar2.html` 是否存在。

假设现在用户重新导向到了http://www.microsoft.com，然后点击了回退按钮。这里，地址栏会显示http://mozilla.org/bar2.html。假如用户再次点击回退按钮，地址栏会显示http://mozilla.org/foo.html，完全跳过了bar.html。



### popState 事件

 每当活动的历史记录项发生变化时， `popstate` 事件都会被传递给window对象。如果当前活动的历史记录项是被 `pushState` 创建的，或者是由 `replaceState` 改变的，那么 `popstate` 事件的状态属性 `state` 会包含一个当前历史记录状态对象的拷贝。



### 获取当前状态

history.state：读取当前历史状态。



### window.onpopstate

window.onpopstate 是 popstate事件在window对象上的事件处理程序。

每当处于激活状态的历史记录条目发生变化时，popstate事件就会在对应window对象上触发。如果当前处于激活状态的历史记录条目是由`history.pushState()`方法创建，或者由`history.replaceState()`方法修改过的，则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝。

调用`history.pushState()`或者`history.replaceState()`不会触发popstate事件。 popstate事件只会在浏览器某些行为下触发，比如点击后退、前进按钮（或者在JavaScript中调用`history.back()、history.forward()、 history.go()`方法）。

当网页加载时,各浏览器对 popstate 事件是否触发有不同的表现，Chrome 和 Safari会触发popstate事件，而Firefox不会。



## 优化单页应用的跳转

利用h5的history，改善ajax列表请求体验。

可对 window.onpopstate 事件进行处理，改变页面前进后退逻辑。

用户前进时，调用方法window.history.pushState(state, title, url)，返回时就可以监听 popstate 事件，通过state进行相关逻辑处理。

如果页面刷新，调用 window.history.replaceState(state, title, url)，保证当前state正确。如何获取正确的state？方法一：从history.state取，Safari会有问题。方法二：存在localStorage中，用时取。方法三：放在url中，页面切换时改变url的参数，这种较推荐。



除了使用history，还有借助锚点hash的方法，优化页面跳转逻辑。锚点的兼容性好，但是原本功能是页面定位，用作页面跳转会影响该功能。而且history可以传复杂数据。



## 参考链接

[MDN|操作浏览器历史](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

[MDN|window.onpopstate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate)

