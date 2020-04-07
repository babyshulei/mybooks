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

## 4. 通过Scroll事件

未支持ResizeObserver的浏览器，可以采用[css-element-queries](https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js)中的方案，原理是在被监测元素里包裹一个跟元素位置大小相同的隐藏块。隐藏块可以滚动，当被监测元素尺寸变化时触发隐藏块的滚动事件，达到监测元素尺寸变化的目的。

滚动的描述：

> To scroll an element element to x,y optionally with a scroll behavior behavior (which is "auto" if omitted) means to:
>
> 1. Let box be element’s associated scrolling box.
> 2. - **If box has rightward overflow direction** Let x be max(0, min(x, element scrolling area width - element padding edge width)).
>    - If box has leftward overflow direction Let x be min(0, max(x, element padding edge width - element scrolling area width)).
> 3. - **If box has downward overflow direction** Let y be max(0, min(y, element scrolling area height - element padding edge height)).
>    - If box has upward overflow direction Let y be min(0, max(y, element padding edge height - element scrolling area height)).
> 4. Let position be the scroll position box would have by aligning scrolling area x-coordinate x with the left of box and aligning scrolling area y-coordinate y with the top of box.
> 5. If position is the **same as** box’s current scroll position, and box does not have an ongoing smooth scroll, **abort these steps**.
> 6. **Perform a scroll** of box to position, element as the associated element and behavior as the scroll behavior.

最后一步[“perform a scroll”](https://www.w3.org/TR/cssom-view-1/#perform-a-scroll)才会真正触发滚动事件。

第五步便是问题关键，位置相同的时候，滚动事件不会发生。



**监测元素放大：**

隐藏块里面有一个远大于隐藏块的子元素，先让子元素滚到最尽头，那么 x 和 y 达到了最大值。当容器尺寸变大时，因为子元素的尺寸是固定的，故 scrolling area 的大小不变，所以两者的差变小了，x 和 y 得到新的最小值，发生了滚动。

**监测元素缩小：**

我们希望容器变小时，差值也变小。那么只能是让 scrolling area 也跟着变小了。可以通过百分比处理。

设百分比为`n`，滚动前容器宽度为`x1`，滚动后容器宽度为`x2`，那么有子元素 `n*x1, n*x2`，因为是缩小，所以`x1>x2`。若要触发滚动事件，需要：

```
n*x1 - x1 > n*x2 -x2 可得 (n-1)x1 > (n-1)x2 那么 n -1 > 0 即 n > 1
```

同时，期望容器达到最小时 x和y都没有达到最小值，容器为0时无意义，故设最小为1，则：

```
(n-1)*1 >= 1 可得 n >= 2
```

故只需让子元素大小至少为200%就可以。

隐藏块里有一个子元素，大小为200%，位置在最尽头，此时隐藏块缩小时，会触发滚动事件。

```js
function utils__fontResizer(callback) {
    var resizer,
        expand,
        shrink,
        reset,
        dirty,
        rafId,
        newWidth,
        newHeight,
        lastWidth,
        lastHeight,
        expandChild,
        fontResizer,
        resizeObserve,
        onResized,
        onScroll;

    fontResizer = document.createElement('div');
    fontResizer.innerText = '&nbsp;&nbsp;&nbsp;';
    fontResizer.classList.add('font-resizer');
    document.body.appendChild(fontResizer);

    if (window.ResizeObserver != undefined) {
        resizeObserve = new window.ResizeObserver(function(entries) {
            var entry = entries[0];
            callback(entry);
        });

        resizeObserve.observe(fontResizer);
    } else {
        fontResizer.html(tpl__fontResizer());

        resizer = fontResizer.childNodes[0];
        expand = resizer.childNodes[0];
        expandChild = expand.childNodes[0];
        shrink = resizer.childNodes[1];

        lastWidth = fontResizer.offsetWidth;
        lastHeight = fontResizer.offsetHeight;

        reset = function() {
            expandChild.style.width = '100000px';
            expandChild.style.height = '100000px';

            expand.scrollLeft = 100000;
            expand.scrollTop = 100000;

            shrink.scrollLeft = 100000;
            shrink.scrollTop = 100000;
        };

        reset();

        onResized = function() {
            rafId = 0;

            if (!dirty) {
                return;
            }

            lastWidth = newWidth;
            lastHeight = newHeight;
            callback();
        };

        onScroll = function() {
            newWidth = fontResizer.offsetWidth;
            newHeight = fontResizer.offsetHeight;
            dirty = newWidth !== lastWidth || newHeight !== lastHeight;

            if (dirty && !rafId) {
                rafId = requestAnimationFrame(onResized);
            }

            reset();
        };
        expand.addEventListener('scroll', onScroll);
        shrink.addEventListener('scroll', onScroll);
    }
}
```

```html
<!-- tpl__fontResizer() -->
<div class="resizer">
    <div class="resize-sensor-expand">
        <div class="resize-sensor-expand__child"></div>
    </div>
    <div class="resize-sensor-shrink">
        <div class="resize-sensor-shrink__child"></div>
    </div>
</div>
```

```css
.font-resizer {
    position: absolute;
    font-size: inherit;
    top: -10000000px;
    left: 0;
    width: 1em;
    height: 1em;
}

.resize-sensor-expand,
.resize-sensor-shrink {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: -1;
    visibility: hidden;
}

.resize-sensor-expand__child {
    position: absolute;
    left: 0;
    top: 0;
    transition: 0s;
}

.resize-sensor-shrink__child {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    transition: 0s;
}
```



## 参考链接

[掘金-JS怎么监听div元素的resize](https://juejin.im/post/5c26d01a6fb9a049b07d6ce2)

[MDN-resize](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)

[MDN-MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

[MDN-ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

[GitHub-ResizeSensor.js](https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js)

[JS监听div元素的resize | 啷哩咯啷](https://libin1991.github.io/2019/01/01/JS监听div元素的resize/)

[巧妙监测元素尺寸变化](https://blog.crimx.com/2017/07/15/element-onresize/)

