# 弹幕的实现

使用开源库 [Danmaku](https://github.com/weizhenye/Danmaku)，官方 [Demo](https://danmaku.js.org/)、[中文文档](https://github.com/weizhenye/Danmaku/wiki/中文文档)。

## API

### 初始化

```js
const danmaku = new Danmaku({
  // 必填。用于显示弹幕的「舞台」会被添加到该容器中。
  container: document.getElementById('my-container'),

  // 媒体可以是 <video> 或 <audio> 元素，如果未提供，会变成实时模式。
  media: document.getElementById('my-media'),

  // 预设的弹幕数据数组，在媒体模式中使用。在 emit API 中有说明格式。
  comments: [],

  // 支持 DOM 引擎和 canvas 引擎。canvas 引擎比 DOM 更高效，但相对更耗内存。
  // 完整版本中默认为 DOM 引擎。
  engine: 'canvas',

  // 弹幕速度，也可以用 speed API 设置。
  speed: 144
});
```

### 发射弹幕

```js
danmaku.emit({
  text: 'example',

  // 默认为 rtl（从右到左），支持 ltr、rtl、top、bottom。
  mode: 'rtl',

  // 弹幕显示的时间，单位为秒。
  // 在使用媒体模式时，如果未设置，会默认为音视频的当前时间；实时模式不需要设置。
  time: 233.3,

  // 在使用 DOM 引擎时，Danmaku 会为每一条弹幕创建一个 <div> 节点，
  // style 对象会直接设置到 `div.style` 上，按 CSS 规则来写。
  // 例如：
  style: {
    fontSize: '20px',
    color: '#ffffff',
    border: '1px solid #337ab7',
    textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000'
  },

  // 在使用 canvas 引擎时，Danmaku 会为每一条弹幕创建一个 <canvas> 对象，
  // 需要按 CanvasRenderingContext2D 对象的格式来写。
  // 例如：
  style: {
    font: '10px sans-serif',
    textAlign: 'start',
    // 注意 bottom 是默认的
    textBaseline: 'bottom',
    direction: 'inherit',
    fillStyle: '#000',
    strokeStyle: '#000',
    lineWidth: 1.0,
    // ...
  },

  // 自定义渲染器，当 `render` 字段存在时, `text`, `html` 和 `style` 将被忽略。

  // 在使用 DOM 引擎时，该函数应当返回一个 HTMLElement。
  render: function() {
    var $div = document.createElement('div');
    var $img = document.createElement('img');
    $img.src = '/path/to/xxx.png';
    $div.appendChild($img);
    return $div;
  },
  // 在使用 canvas 引擎时，该函数应当返回一个 HTMLCanvasElement。
  render: function() {
    var canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 180;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
    return canvas;
  }
});
```

### 其他

- 调整大小：danmaku.resize()
- 显示：danmaku.show()
- 隐藏：danmaku.hide()
- 清屏：danmaku.clear()
- 基准速度：danmaku.speed = xxx
  所有弹幕都有一个 `duration` 属性，表示其存活时间。`duration` 由 `舞台宽度 / danmaku.speed` 计算，其中 `danmaku.speed` 是所有弹幕的一个基准速度，因为每条弹幕的实际速度由 `(弹幕宽度 + 舞台宽度) / duration` 计算。默认速度为 `144`。
- 销毁：danmaku.destroy()

## 源码分析

### 入口

`index.js`

导出 Danmaku 的初始化函数，绑定方法 emit()、show()、hide()、clear()、resize()，绑定属性 speed。

### 初始化

`/api/init.js`

主要做了以下工作：

- 初始化`this._`相关字段：

  ```js
  this._ = {};
  this._.visible = true;
  this._.requestId = 0;
  this._.speed = Math.max(0, opt.speed) || 144;
  this._.duration = 4;
  this._.runningList = [];
  this._.position = 0;
  this._.paused = true;
  // 生成舞台，初始化舞台样式
  this._.stage = this._.engine.init(this.container);
  // 初始化space
  this._.space={};
  resetSpace(this._.space);
  ```

- 初始化内部属性 `this.container`、`this.media`

- 判断是使用 dom 还是 canvas 引擎，设置对应属性：`this.engine='dom'/'canvas'`、`this._.engine=domEngine/canvasEngine`

- 初始化弹幕列表`this.comments`，将弹幕列表按照 time 值排序，格式化弹幕mode

- `this.media`存在，绑定媒体事件`bindEvents`：play、pause、seeking

- 调整弹幕宽高，调整duration：`this.resize()`

- 如果媒体未暂停，调用 `seek()`、`play()`

```js
// 存活时间计算公式：
// duration = 舞台宽度/基准速度
this._.duration = this._.stage.width / this._.speed;
```



### 事件处理

#### play

- 如果不可见或者处于播放态（防止重复处理），直接返回。
- 设置暂停态标志位：`this._.paused=false`
- 校正当前弹幕列表`this._.runningList`的时间`cmt._utc`
- 创建engine：`createEngine(framing, setup, render, remove)`
- 启动帧动画：`单帧-engine()`

#### pause

- 如果不可见或者处于暂停态，直接返回。
- 设置暂停态标志位：`this._.paused=true`
- 清除帧动画

#### seeking

- 如果没有媒体，直接返回。
- 清屏，重置space
- 查找并设置当前弹幕位置

### 动画Engine

#### createEngine

/engine/index.js，function(framing, setup, render, remove)，返回一个函数，用于动画帧的调用。

函数内部进行如下操作：

- 帧预处理：`framing(this._.stage)`
- 移除`this._.runningList`中过期的弹幕： `remove(this._.stage, cmt)`
- 获取即将登场的弹幕`pendingList`，装载到舞台上： `setup(this._.stage, pendingList)`
- 弹幕碰撞检测：处理 `pendingList`，计算弹幕位置（碰撞检测） `cmt.y=allocate(cmt)`，top和bottom模式的`cmt.x`，push 到 `this._.runningList`
- 弹幕帧动画渲染：遍历 `this._.runningList`，计算ltr和rtl模式的弹幕位置`cmt.x`，渲染弹幕`render(this._.stage, cmt)`

```js
/** x 位置计算公式：
 * ltr/rtl：
 * 	弹幕已走过的距离：elasped = (舞台宽度+弹幕宽度)*(当前播放时间-弹幕时间)*基准速度/存活时间
 *	ltr：cmt.x = elapsed - 弹幕宽度 + 0.5
 *	rtl：cmt.x = 舞台宽度 - elapsed + 0.5
 * top/bottom：(舞台宽度-弹幕宽度)/2
*/
var elapsed = (this._.stage.width + cmt.width) * (dn - cmt._utc) * pbr / this._.duration;
if (cmt.mode === 'ltr') {
    cmt.x = (elapsed - cmt.width + .5) | 0;
}
if (cmt.mode === 'rtl') {
    cmt.x = (this._.stage.width - elapsed + .5) | 0;
}
if (cmt.mode === 'top' || cmt.mode === 'bottom') {
    cmt.x = (this._.stage.width - cmt.width) >> 1;
}
```

#### domEngine

/engine/dom.js

导出对象，包含属性name: 'dom'，方法 init(), clear(), resize(), framing(), setup(), render(), remove()。

##### init()

创建舞台，初始化样式。

```js
export function init() {
  var stage = document.createElement('div');
  stage.style.cssText = 'overflow:hidden;white-space:nowrap;transform:translateZ(0);';
  return stage;
}
```

##### setup()

添加弹幕节点，初始化节点属性，获取 `cmt.width`、`cmt.height`。

```js
export function setup(stage, comments) {
  var df = document.createDocumentFragment();
  var i = 0;
  var cmt = null;
  for (i = 0; i < comments.length; i++) {
    cmt = comments[i];
    cmt.node = cmt.node || createCommentNode(cmt);
    df.appendChild(cmt.node);
  }
  if (comments.length) {
    stage.appendChild(df);
  }
  for (i = 0; i < comments.length; i++) {
    cmt = comments[i];
    cmt.width = cmt.width || cmt.node.offsetWidth;
    cmt.height = cmt.height || cmt.node.offsetHeight;
  }
}
```

##### remove()

移除废弃弹幕节点

```js
export function remove(stage, cmt) {
  stage.removeChild(cmt.node);
  if (!this.media) {
    cmt.node = null;
  }
}
```

##### render()

添加弹幕动画样式

```js
export function render(stage, cmt) {
  cmt.node.style[transform] = 'translate(' + cmt.x + 'px,' + cmt.y + 'px)';
}
```

#### canvasEngine

/engine/canvas.js



### 轨道分配

/internal/allocate.js

allocate(cmt)

- 获取弹幕 mode 对应的轨道空间 crs
- 设置上一条弹幕索引`last=0`，当前弹幕索引`curr=0`，遍历 crs
  - 获取当前遍历的轨道弹幕 `cr=crs[i]`，弹幕`requiredRange`为弹幕高度`cmt.height`，如果是top/bottom mode，requireRange 加上 `cr.height`。
  - 如果当前遍历的轨道 - 上一条弹幕的范围 > requiredRange，即这之间的范围可以放下当前弹幕，设置`curr=i`，直接跳出循环
    `cr.range - cr.height- crs[last].range > requiredRange` 
  - 如果 i 和 弹幕会碰撞，设置 `last = i`，继续循环
- 获取弹幕轨道 `channel=crs[last].range`，设置弹幕相关数据 `{range, time, width, height}`
- 添加弹幕数据到上一条的后面，同时删除掉过期弹幕。`crs.splice(last + 1, curr - last - 1, crObj)`
- 返回弹幕 y 值。

弹幕碰撞的计算`willCollide(cr, cmt)`：

- top/bottom mode的，直接判断是否 视频当前时间 - cr弹幕时间 < 弹幕存活时间，返回
- 计算 cr 总宽度，cr 已出现的宽度
- 如果 cr 的宽度 > cr 已出现的宽度，说明还有一部分cr没出现，当前轨道会碰撞，返回
- 计算 cr 的尾巴移动到舞台边缘的时间，cmt 的头移动到舞台边缘的时间
- cmt 能在舞台内追上 cr 的话，就会碰撞，返回



## 参考链接

[Awesome Danmaku | GitHub](https://github.com/OpenDanmakuCommunity/awesome-danmaku)

[barrage-ui | npm](https://www.npmjs.com/package/barrage-ui)

[danmaku | npm](https://www.npmjs.com/package/danmaku)

[DPlayer | npm](https://www.npmjs.com/package/dplayer)

[@rustle/danmuku | npm](https://www.npmjs.com/package/@rustle/danmuku)

[CommentCoreLibrary | GitHub](https://github.com/jabbany/CommentCoreLibrary)

[ABPlayerHTML5 | GitHub](https://github.com/jabbany/ABPlayerHTML5)

