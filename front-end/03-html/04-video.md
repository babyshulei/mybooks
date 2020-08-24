# `<video>`

`<video>`标签用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。音频也可以，但最好用`<audio>`标签。

下面列一下 video 常用属性和事件，完整参见：<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video>

## 属性

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| autoplay         | 布尔属性；指定后，视频会马上自动开始播放，不会停下来等着数据载入结束。 |
| buffered         | 媒体已缓存的区域。包含了一个 [`TimeRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeRanges) 对象。 |
| controls         | 加上这个属性，会提供用户控制，允许用户控制视频的播放，包括音量，跨帧，暂停/恢复播放。 |
| crossorigin      | 该枚举属性指明抓取相关图片是否必须用到CORS（跨域资源共享）。 [支持CORS的资源](https://developer.mozilla.org/zh-CN/docs/CORS_Enabled_Image) 可在 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 元素中被重用，而不会被污染。<br />取值有：anonymous、use-credentials。 |
| currentTime      | 读取`CurentTime`返回一个双精度浮点值，指示以秒为单位的媒体的当前播放位置。如果video尚未开始播放，则会在开始播放后返回偏移量。通过`CurentTime`将当前播放位置设置为给定时间，会在加载媒体时将媒体查找到该位置（从指定的位置开始播放）。 |
| duration（只读） | 一个双精度浮点值，它指示媒体的持续时间(总长度)，以秒为单位，在媒体的时间线上。如果元素上没有媒体，或者媒体无效，则返回的值为NaN。如果媒体没有已知终点(例如时间未知的实时流、网络广播、来自WebRTC的媒体等等)，那么这个值就是Infinity。 |
| height           | 视频展示区域的高度，单位是CSS像素。                          |
| width            | 视频显示区域的宽度，单位是CSS像素。                          |
| loop             | 布尔属性；指定后，会在视频结尾的地方，自动返回视频开始的地方。 |
| muted            | 布尔属性，指明了视频里的音频的默认设置。设置后，音频会初始化为静音。默认值是false,意味着视频播放的时候音频也会播放 。 |
| playsinline      | 一个布尔属性，标志视频将被“inline”播放，即在元素的播放区域内。请注意，没有此属性并不意味着视频始终是全屏播放的。 |
| preload          | 视频预加载处理，不设置会采用浏览器默认值，可取值：<br />- none：不需要缓存；<br />- metadata：只需抓取视频元数据；<br />- auto：自动缓存视频；<br />- ''：代指 auto 值。 |
| poster           | 一个海报帧的URL，用于在用户播放或者跳帧之前展示。如果属性未指定，那么在第一帧可用之前什么都不会展示；之后第一帧就像海报帧一样展示。 |
| src              | 要嵌到页面的视频的URL。可选；也可以使用video块内的 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source) 元素来指定需要嵌到页面的视频。 |



## 事件

| 事件名    | 触发时机                                     |
| --------- | -------------------------------------------- |
| ended     | 媒体播放到结束，播放停止。                   |
| pause     | 暂停播放。                                   |
| play      | 开始播放。                                   |
| seeking   | 开始seek操作。                               |
| timeupdae | `currentTime`属性指示的时间已更新。          |
| error     | 一些错误（如网络连接错误）导致无法加载资源。 |

## 方法

| 方法                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [play()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play) | 尝试播放媒体。返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，当媒体成功开始播放时被解决（resolved）。当播放因为任何原因失败时，这个 promise 被拒绝（rejected） |
| [pause()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/pause) | 暂停媒体的播放，如果媒体已经处于暂停状态，该方法没有效果。   |
| [load()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/load) | 重置媒体成初始化状态，选择一个播放源， 为载入媒体重新播放做准备。 媒体预播放的信息是由 `preload` 这个参数决定的。 |



## 参考链接

[`<video>`  | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

[HTMLVideoElement | Apple Developer](https://developer.apple.com/documentation/webkitjs/htmlvideoelement)

[HTML Living Standard - video](https://html.spec.whatwg.org/multipage/media.html#the-video-element)

