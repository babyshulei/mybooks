# 弹幕核心通用构件 - CommentCoreLibrary

## 引用

### 接入

CCL编译好的代码在 `dist/` 目录下。有两个文件非常重要： `CommentCoreLibrary.js` 和 `style.css`。 这两个分别负责CCL的JS引擎部分和CSS呈现部分，不能省略。相对的还有俩 `.min.js`和 `.min.css` 文件 是上述文件的压缩版。压缩版代码都在一行，较不方便对行号调试，建议开发时采用未压缩版，架设时则可以采取 压缩版。

引用方法为，在对应的HTML文件头部添加

```HTML
<head>
    ... 其他头部信息 ...
    <link rel="stylesheet" href="dist/css/style.css" />
    <script src="dist/CommentCoreLibrary.js"></script>
    ... 其他头部信息 ...
</head>
```

之后在相应需要弹幕的位置，放置如下 HTML DOM结构：

```HTML
<div id='my-player' class='abp'>
    <div id='my-comment-stage' class='container'></div>
</div>
```

其中弹幕结构会在 `container` 这个 div 里插入。采用双层嵌套可以允许你的弹幕 container 于实际容器 的大小不同，用于实现避开字幕等等功能。

### 架设 CommentCore 主体

调用API目前来说比较容易，在建立好页面dom之后，只要绑定 CommentManager 即可。

弹幕管理器通过提供一个用于渲染的HTML元件来初始化。这个HTML元件应该属于"container"这个css 类 并是 'abp' 类的一个包裹元素的子元素

``` js
var CM = new CommentManager(document.getElementById('my-comment-stage'));
CM.init(); // 初始化
```

之后 `CM` 实例会提供如下功能：

```js
// 载入弹幕列表
var danmakuList = [
    {
        "mode":1,  // 取值参见“弹幕类型”
        "text":"Hello World", // 弹幕文本
        "stime":0, // 弹幕时间，单位ms
        "size":25, // 弹幕字号，单位 px
        "color":0xffffff // 弹幕颜色，Number类型。为RGB对应的六位十六进制数字，如 0xffffff
    }
];
CM.load(danmakuList);

// 插入弹幕
var someDanmakuAObj = {
    "mode":1,
    "text":"Hello CommentCoreLibrary",
    "stime":1000,
    "size":30,
    "color":0xff0000
};
CM.insert(someDanmakuAObj);

// 启动播放弹幕（在未启动状态下弹幕不会移动）
CM.start();

// 停止播放（停止弹幕移动）
CM.stop();

// 更新时间轴时间，单位ms
CM.time(500);
CM.time(1000);
```

具体使用的参考可以参考 [demo/tutorial](https://github.com/jabbany/CommentCoreLibrary/tree/master/demo/tutorial)。内有大部分此示例的代码。

### 架设 KagerouEngine 引擎

KagerouEngine分为两个部分：JS Host和Worker Client。在编译后，分别位于 `dist/scripting/Host.js` 和 `dist/scripting/Worker.js`。架设时，只需在外部引入 `Host.js` 然后把 `Worker.js` 的位置，在初始化 `Host` 时传递进入即可。`scripting/` 目录的 结构关系需要保护，以免 Worker 无法载入相应的需要的运行时库。

#### 合体配置方法

目前的合体方法是把 `CommentManager.scripting` 赋值成 Scripting Host 生成的 Sandbox实例 即可。未来会有专门的方法和事件供挂载。

### 弹幕类型

参见：[弹幕类型说明 Types](https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentTypes.md)

弹幕播放器自主支持以下类型的弹幕模式：

- 1 - 上端滚动弹幕 / Top-anchored scrolling
- 2 - 下端滚动弹幕 / Bottom-anchored scrolling
- 4 - 底部弹幕 / Bottom-anchored static
- 5 - 顶部弹幕 / Top-anchored static
- 6 - 逆向弹幕 / Top-anchored reverse
- 7 - 定位弹幕 / Animated positioned
- 8 - 代码高级弹幕 / Code comments
- 9 - 预留 Zoome 弹幕兼容性 / Reserved: Zoome-type
- 17 - 图片定位弹幕 / Reserved: Image
- 18 - Canvas/SVG定位弹幕（未完成） / Reserved: Canvas or SVG
- 19 - 绘图弹幕（未完成） / Reserved: Draw-command
- 20 - 高阶定位混合弹幕组（实验性）/ Reserved: Motion spec
- 21 - 字幕弹幕 / Subtitles

默认情况下，弹幕都必须包含：开始时间、字体大小、字体字号、颜色。

## 组件功能 Functionality

CommentCoreLibrary 包括 CommentCore 主体和 KagerouEngine 引擎。

CommentCore 主体包括：

- CommentManager 弹幕管理器（用于控制弹幕）
- CommentSpaceAllocator 弹幕空间规划器（用于排版弹幕）
- IComment:CoreComment/ScrollComment 弹幕对象（可以自己扩展实现更多弹幕类型）

CommentCore主体可以进行：

- 弹幕呈现和空间规划（滚动、逆向、顶部、底部、高级定位、高级移动）
- 弹幕过滤
- 实时弹幕支持

KagerouEngine 引擎包括：

- Host (OOAPI) 接受与呈现端
- Sandbox (OOAPI) 代码沙箱与BiliScript运行时

KagerouEngine 用于呈现原版类似 BiliScript 的脚本代码弹幕。KagerouEngine 是一套在最大可能的程度上兼容原版 Bilibili 代码弹幕语法和环境的安全的高层接口。 它建造于 OOAPI 底层API之上，并通过 OOAPI 与显示端进行通讯。受益于这种隔离，我们可以在 KagerouEngine 中运行相对不受信任的脚本弹幕而不影响整个网站的安全。



如果不需要代码弹幕支持，只需要部署 CommentCore 部分。对于仅需要对代码沙箱支持的， 也可以直接使用 KagerouEngine （它对 CommentCore 部分没有依赖）。

### CommentManager

弹幕管理器。

#### 属性

- `options: Object`
  用于放置弹幕默认参数等。
  - `global`：`opacity` 透明度；`scale` 生命时间加成（TTL Scale）；`className` CSS类名（非CSS呈现模式下也可能会参考此项进行呈现）
  - `scroll`：`opacity` 透明度；`scale` 生命时间加成（TTL Scale）
  - `limit`：最大显示弹幕数量，0 或以下表示不限制同屏弹幕数量，默认 `0`
  - `seekTrigger`：在 time() 调用时间数值跳跃大于这个数值（ms）时，并不输出从上一个时间到这个时间的弹幕，而是直接更新上次弹幕时间。用于避免在手动移动时间轴时导致弹幕一起输出。 默认 `2000` 。
- `isRunning: Bool`
  管理器的弹幕是否在运行。false 表示没有在运行，true 表示在运行。可以通过 start/stop 控制。
- `width: Number`
  舞台的长度像素值，用于计算弹幕位置。此数只有在 init 之后才有效。
- `height : Number`
  舞台的高度像素值，用于计算弹幕位置。此数只有在 init 之后才有效。

#### 方法

- `constructor(StageElement:HTMLDivElement)`
  构造器。提供一个用于管理的 stage 来绑定弹幕管理器。
- `init(rendererType:string = 'css')`
  初始化弹幕管理器并初次绑定舞台大小。注意：init调用时请确保弹幕舞台对象可以访问，并且已经实例化和可测大小。如果在动态的构成组件，只要保证在调用 init() 时舞台返回的大小数据正确即可。
  初始化管理器默认播放状态是未播放，需要单独通过 `start()` 启用。
  rendererType 决定了渲染引擎类型，默认为CSS3渲染：
  - `css`: CSS3 transition
  - `svg`: SVG Animation
  - `canvas`: Canvas
  - `legacy`: DOM + Timer
- `load(timeline: Array<ICommentData>)`
  载入一些抽象弹幕对象作为时间轴。这些弹幕对象不必排序，管理器会自动根据 stime 进行排序。`load` 会 清空之前的时间轴。
- `start()`
  启动弹幕管理器的内部计时器。弹幕在未启动计时器的状态下是不会移动的。用于在刚刚 `init()` 之后进入播放状态，或者在暂停弹幕后重新开始移动弹幕。播放时调用无作用。
- `stop()`
  与 start 方法作用相反，正在进行的效果和正在滚动的弹幕会被强制停止。
- `insert(data: ICommentData)`
  把弹幕插入弹幕列表（时间轴）。插入会动态调整目前的位置。注意：当插入弹幕的时间小于已经播放的时间，有可能看不到的。
- `remove(data: ICommentData)`
  从弹幕列表中删除弹幕。注意参数data必须是同一个实例引用，否则即使参数都一样也不会导致弹幕被删除。 
- `send(data: ICommentData)`
  把一个抽象弹幕数据对象变成一个 `IComment` 实例并放入运行列表中。
- `clear()`
  清除舞台。清除正在运行的管理器管辖内的所有弹幕（runline里的）。不清除 timeline。
- `time(currentTime: Number)`
  通报目前的时间轴时间。单位是毫秒。
- `finish(comment: IComment)`
  完成弹幕，从舞台删除，从空间管理器里删除。更好的方法是调用 `IComment` 的 `finish()` 方法。 

#### 事件

管理器的事件可以由 `addEventListener(event, listener)` 绑定，由 `dispatchEvent(event, data)` 派发。

**基础事件 (Basic Events)**

- `load`

  此事件在调用 `load` 并且成功载入弹幕时间轴后被派发

- `clear`

  此事件在调用 `clear` 并且成功清除屏幕弹幕后被派发

- `resize`

  此事件在调用 `setBounds` 后被派发

- `enterComment`

  （数据参数：弹幕本体）在弹幕进入运行列表的时候派发

- `exitComment`

  （数据参数：弹幕本体）在弹幕消亡前派发

详细参见：<https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentManager.md>

### CommentFilter

弹幕过滤器是一套简便的弹幕过滤系统，可以用来调整用户显示的弹幕信息。

在创建了 CommentManager 对象并初始化后，过滤器可以通过 `CommentManager.filter` 访问。 在文档内，将会用 `filter` 对象来表示 `CommentFilter` 的一个实例。

> 过滤器在 `send()` 之前执行，所以通过 `send()` 派发的弹幕将不会通过 CommentFilter。 这同时表示直播弹幕等基于 `send()` 实现弹幕发送的方法不会直接自动调用弹幕过滤器。如果希望过滤 这些弹幕，需要手动调用过滤

#### 手动调用过滤器

过滤器的 `doValidate` 方法用于判断弹幕是否应该被过滤，手动进行过滤只需把检测的弹幕送入 `filter.doValidate(cmt)` 即可。

#### 过滤器语法

过滤器有两种方式过滤，包括基础过滤、高级过滤列表。

- 基础过滤
  模式过滤，通过设置 `allowTypes` 选择显示或者抛弃的 mode 类型。
- 高级过滤列表
  通过一系列规则过滤弹幕。规则可以通过 `addRule()` 添加规则，通过 `removeRule()` 删除添加了的规则。规则实例可以通过 `filter.rules` 查询。

详细参见：<https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentFilter.md>

### CommentProvider

弹幕源管理器提供了一套简单的绑定静态或者动态弹幕的系统。使用CommentCoreLibrary并不需要使用 CommentProvider不过CommentProvider提供了一套更好的载入弹幕的方法。

CommentProvider提供了一个方便控制解析器的组件，本身并不解析弹幕格式。具体的格式解析接口和实现参考 [data-formats 章节](https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/data-formats/Readme.md)。

详细参见：<https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentProvider.md>

### IComment

弹幕抽象对象。

在 `v1.0` 后，CommentCoreLibrary采用抽象化弹幕对象。这样便于实现不同的渲染幕布的支持，和复杂的 运动轨迹支持。在新的模式下，一个单独的弹幕管理器将可以比较容易的支持渲染到 DOM, Canvas 和 WebGL 等平面，而且支持新种类的弹幕将会非常容易。

新的变化也允许了我们抽象化空间规划模块，这样实现新的空间规划或者更改空间规划模块的模式将会变得容易到 仅需扩展数行的规划规则。同时这样也大量的削减了代码重复，提高了效率。

#### 属性

- **text** 文字
- **mode** 弹幕类型，参见 [CommentTypes](https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentTypes.md)
- **stime** 弹幕开始时间，单位ms
- **size** 弹幕字号，单位px
- **color** 弹幕颜色，Number类型。为RGB对应的六位十六进制数字，如 0xffffff
- ....

详细参见：<https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentProperties.md>

#### 方法

- constructor
- init(recycle:IComment = null)
- time(dt: Number)
- update()
- invalidate()
- animate()
- finish()
- stop()
- toString()

详细参见：<https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentObject.md>

## 参考链接

[CommentCoreLibrary | GitHub](https://github.com/jabbany/CommentCoreLibrary)

[CommentCoreLibraru | npm](https://www.npmjs.com/package/comment-core-library)

[官方文档](http://jabbany.github.io/CommentCoreLibrary/docs/)

[API文档](https://commentcorelibrary.readthedocs.io/en/stable/CommentCoreLibraryAPI/)

[Demo | golive | GitHub](https://github.com/jean-lee/golive)

