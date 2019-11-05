# 监听Dom元素变化

> 2019.08.14 @wsl

## 1. resize 事件

文档视图（window对象）调整大小时会触发resize事件。

resize事件只能应用在window对象上，无法监听具体的dom元素。

resize事件在窗口大小变化时会频繁触发，因此事件处理程序不应该执行开销很大的操作，或者对执行程序的触发频率进行控制。

## 2. MutationObserver

MutationObserver接口提供了监视对DOM树所做更改的能力。

**方法：**

`disconnect()`
阻止 MutationObserver 实例继续接收的通知，直到再次调用其observe()方法，该观察者对象包含的回调函数都不会再被调用。

`observe()`
配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知。

`takeRecords()`
从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中。











## 3. ResizeObserver

Resize Observer是一个新的JavaScript API，与Intersection Observer API、Mutation Observer等其他观察者API非常相似。 它允许在尺寸发生变化时通知元素。

ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding。

ResizeObserver避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理DOM中更深层次的元素来实现这一点。

**方法：**

`ResizeObserver.disconnect()`
	取消和结束目标对象上所有对 Element或 SVGElement 观察。

`ResizeObserver.observe()`
	开始观察指定的 Element或 SVGElement。

`ResizeObserver.unobserve()`
	结束观察指定的Element或 SVGElement。

示例：

```javascript
const $el = document.querySelector('.resize-observer');
const resizeObserver = new ResizeObserver(entries => {
	for (let entry of entries) { // 也可以使用 entries.forEach()
		// do something
        // entry 是一个对象，属性有 contentRect（元素的尺寸位置信息）, target（Dom元素本身）
	}
});
resizeObserver.observe($el);
```

**兼容性：**

Chrome 64+, Opera 51+, Firefox 和 IE 未支持。



## 参考链接

[掘金-JS怎么监听div元素的resize](https://juejin.im/post/5c26d01a6fb9a049b07d6ce2)

[MDN-resize](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)

[MDN-MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

[MDN-ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)