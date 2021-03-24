# Fullscreen API

W3C 制定了 [Fullscreen API](https://fullscreen.spec.whatwg.org/) 标准，目前较新的浏览器已支持。历史版本的浏览器有各自的实现，兼容可参考 [screenfull.js](https://github.com/sindresorhus/screenfull.js)。

## 进入全屏

调用 [Element.requestFullscreen()](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen) 方法可以进入全屏。

兼容：

| requestFullscreen() （标准版本） |
| -------------------------------- |
| webkitRequestFullscreen()        |
| mozRequestFullScreen()           |
| msRequestFullscreen()            |

## 退出全屏

调用  [Document.exitFullscreen()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen) 可以退出全屏。

兼容：

| document.exitFullscreen() （标准方法） |
| -------------------------------------- |
| document.webkitExitFullscreen()        |
| document.mozCancelFullScreen()         |
| document.msExitFullscreen()            |

## 检查全屏状态

每当浏览器进入全屏模式时，[`document.fullscreenElement`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/fullscreenElement) 对象（只读）都会引用当前展示的元素。否则，该对象返回 `null`。

使用 `document.fullscreenElement`，我们能：

- 判断浏览器目前是否处于全屏状态
- 检查哪个元素正在被全屏展示

兼容：

| document.fullscreenElement （标准方法） |
| --------------------------------------- |
| document.webkitFullscreenElement        |
| document.mozFullScreenElement           |
| document.msFullscreenElement            |

## 其他方法与事件处理函数

- **document.fullscreenEnabled**：如果页面可用于全屏模式，则返回 `true`。若没有为窗口插件或 `<iframe>` 元素显示设置 `allowfullscreen` 属性，则会在尝试全屏展示它们时返回失败。`document.onfullscreenerror` 事件也会被相应触发。
- **document.onfullscreenchange**：每当浏览器进入或退出全屏模式时触发的事件处理函数。
- **document.onfullscreenerror**：当请求全屏模式失败时触发的事件处理函数。

兼容：

| document.fullscreenEnabled（标准方法） | document.onfullscreenchange （标准方法） | document.onfullscreenerror （标准方法） |
| -------------------------------------- | ---------------------------------------- | --------------------------------------- |
| document.webkitFullscreenEnabled       | document.onwebkitfullscreenchange        | document.onwebkitfullscreenerror        |
| document.mozFullScreenEnabled          | document.onmozfullscreenchange           | document.onmozfullscreenerror           |
| document.msFullscreenEnabled           | document.onmsfullscreenchange            | document.onmsfullscreenerror            |

## 全屏相关的 CSS

可通过 `:fullscreen` 伪选择器及其内核前缀修改元素在全屏模式下的样式：

```css
:-webkit-full-screen {
    /*style for full screen element */
}
 
:-moz-full-screen {
    /*style for full screen element */
}
 
:-ms-fullscreen {
    /*style for full screen element */
}
 
:fullscreen { /* official selector */
    /*style for full screen element */
}
```

## 全屏兼容

```js
/**
 * 全屏 Fullscreen API 兼容，参考： https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
 * exports: screenfull 对象
 * API：
 *      .request($el)：进入全屏
 *      .exit()：退出全屏
 *      .toggle()：切换全屏
 *      .on(event, function)：添加一个事件监听，event-change/error
 *      .off(event, function)：移除之前注册的事件监听
 *      .onchange(function)：等同于 .on('change', function)
 *      .onerror(function)：等同于 .on('error', function)
 *      .isFullscreen：boolean，是否全屏态
 *      .element：返回当前全屏元素，没有返回null
 *      .isEnabled：是否支持全屏API
 *      .raw：暴露原生全屏API，包括：requestFullscreen, exitFullscreen,
 *          fullscreenElement, fullscreenEnabled, fullscreenchange, fullscreenerror
 */

const document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};

const fn = (function _() {
    const fnMap = [
        [
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror',
        ],
        // New WebKit
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror',

        ],
        // Old WebKit
        [
            'webkitRequestFullScreen',
            'webkitCancelFullScreen',
            'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            'webkitfullscreenerror',

        ],
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror',
        ],
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError',
        ],
    ];

    const ret = {};

    for (let i = 0; i < fnMap.length; i += 1) {
        const val = fnMap[i];
        if (val && val[1] in document) {
            for (i = 0; i < val.length; i += 1) {
                ret[fnMap[0][i]] = val[i];
            }
            return ret;
        }
    }

    return false;
}());

const eventNameMap = {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror,
};

const screenfull = {
    request(element = document.documentElement) {
        return new Promise(((resolve, reject) => {
            const onFullScreenEntered = function _() {
                this.off('change', onFullScreenEntered);
                resolve();
            }.bind(this);

            this.on('change', onFullScreenEntered);

            const returnPromise = element[fn.requestFullscreen]();

            if (returnPromise instanceof Promise) {
                returnPromise.then(onFullScreenEntered).catch(reject);
            }
        }));
    },
    exit() {
        return new Promise(((resolve, reject) => {
            if (!this.isFullscreen) {
                resolve();
                return;
            }

            const onFullScreenExit = function _() {
                this.off('change', onFullScreenExit);
                resolve();
            }.bind(this);

            this.on('change', onFullScreenExit);

            const returnPromise = document[fn.exitFullscreen]();

            if (returnPromise instanceof Promise) {
                returnPromise.then(onFullScreenExit).catch(reject);
            }
        }));
    },
    toggle(element) {
        return this.isFullscreen ? this.exit() : this.request(element);
    },
    onchange(callback) {
        this.on('change', callback);
    },
    onerror(callback) {
        this.on('error', callback);
    },
    on(event, callback) {
        const eventName = eventNameMap[event];
        if (eventName) {
            document.addEventListener(eventName, callback, false);
        }
    },
    off(event, callback) {
        const eventName = eventNameMap[event];
        if (eventName) {
            document.removeEventListener(eventName, callback, false);
        }
    },
    raw: fn,
};

if (!fn) {
    screenfull.isEnabled = false;
} else {
    Object.defineProperties(screenfull, {
        isFullscreen: {
            get() {
                return Boolean(document[fn.fullscreenElement]);
            },
        },
        element: {
            enumerable: true,
            get() {
                return document[fn.fullscreenElement];
            },
        },
        isEnabled: {
            enumerable: true,
            get() {
                // Coerce to boolean in case of old WebKit
                return Boolean(document[fn.fullscreenEnabled]);
            },
        },
    });
}

export default screenfull;
```



## 参考链接

[【译】使用Fullscreen API 全屏展示内容· Issue #17 · JChehe ...](https://github.com/JChehe/blog/issues/17)

[全屏指南 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/指南)

[screenfull.js | GitHub](https://github.com/sindresorhus/screenfull.js)

[HTMLVideoElement | Apple Developer](https://developer.apple.com/documentation/webkitjs/htmlvideoelement)

[orientationchange - Web API 接口参考| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/orientationchange_event)

[Screen.orientation|MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/orientation)

[探讨判断横竖屏的最佳实现](https://aotu.io/notes/2017/01/31/detect-orientation/index.html)

