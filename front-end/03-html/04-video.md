# `<video>`

## 属性





## 事件

### 进入/退出全屏

W3C标准：

进入全屏：`Element.requestFullscreen`

退出全屏：`document.exitFullscreen`

浏览器兼容：

```js
function requestFullscreen() {
    const $video = this.$refs.video;
    if ($video.requestFullscreen) {
        $video.requestFullscreen();
    } else if ($video.webkitRequestFullScreen) {
        $video.webkitRequestFullScreen();
    } else if ($video.mozRequestFullScreen) {
        $video.mozRequestFullScreen();
    } else if ($video.msRequestFullscreen) {
        $video.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
```

### 监听屏幕旋转

```js
window.onorientationchange = () => {
    console.log(`the orientation of the device is now ${window.screen.orientation.angle}`);
};
```







## 参考链接

[`<video>`  | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

[Element.requestFullscreen() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)

[How to exit fullscreen onclick using Javascript? - Stack Overflow](https://stackoverflow.com/questions/36672561/how-to-exit-fullscreen-onclick-using-javascript)

[orientationchange - Web API 接口参考| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/orientationchange_event)

[Source: lib/polyfill/fullscreen.js](https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html)

