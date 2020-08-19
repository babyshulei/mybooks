# V8内存管理和垃圾回收机制

JavaScript引擎的内存空间主要分为栈和堆。

## 栈

临时存储空间，主要存储局部变量和函数调用。

基本类型数据（Number、String、Boolean、Null、Undefined、Symbol、BigInt）保存在栈内存中。

引用类型数据保存在堆内存中，对应变量是一个指向堆内存中实际对象的引用，存在栈中。

对于函数，解释器创建了“调用栈”来记录函数的调用过程。每调用一个函数，解释器就把这个函数添加进调用栈，解释器会为被添加进来的函数创建一个栈帧（用来保存函数的局部变量以及执行语句）并立即执行。如果正在执行的函数还调用了其他函数，新函数会继续被添加进入调用栈。函数执行完成，对应的栈帧立即被销毁。

> 如何查看调用栈？
>
> 1、使用 console.trace() 向 Web 控制台输出一个堆栈跟踪
>
> 2、浏览器开发者工具进行断点调试

栈虽然很轻量，在使用时创建，使用结束后销毁，但是不是可以无限增长的，被分配的调用栈空间被占满时，就会引起”栈溢出“的错误。

> 为什么基本数据类型存储在栈中，引用数据类型存储在堆中？
>
> JavaScript 引擎需要用栈来维护程序执行期间的上下文状态，如果栈空间大了的话，所有数据都存放在栈空间里面，会影响到上下文切换的效率，进而影响整个程序的执行效率。

## 堆

堆空间存储的数据比较复杂，大致可以划分为5个区域：

- 代码区（Code Space）
- Map 区（Map Space）
- 大对象区（Large Object Space）
- 新生代（New Space）
- 老生代（Old Space）

![img](.\images\v8-memory.png)

新生代内存是临时分配的内存，存活时间短；老生代内存是常驻内存，存活时间长。



## 垃圾回收机制

随着程序的运行，堆中的数据会越来越多；栈由系统自动管理，所以需要一个机制来管理堆空间，这就是垃圾回收机制。

### Minor GC（Scavenger）

清道夫GC，主要管理新生代空间，保证新生代空间的紧凑和干净。新生代空间是最新产生的数据存活的地方，这些数据往往都是短暂的。新生代空间相对较小，大约在1M~8M，可以通过V8标志如 --max_semi_space_size 或 --min_semi_space_size 来控制新生代空间大小。



**Scavenge算法**将内存空间对半分为两个区域，一半是对象区域（from），一半是空闲区域（to）。

新对象会首先分配到 from 空间，当进行垃圾回收的时候，会先将 from 空间中的存活对象复制到 to 空间进行保存，对未存活对象的空间进行回收。

复制完成后，from 空间和 to 空间进行调换，to 空间会变成新的 from 空间，原来的 from 空间则变成 to 空间。

新生代内存回收频率很高，速度也很快，但是空间利用率很低，因为有一半的内存空间处于“闲置”的状态。

### 对象的晋升

新生代中多次回收仍然存活的对象会被转移到老生代内存中，这种现象称为**晋升**。有下面两种情况：

1. 对象从From空间复制到To空间时，会检查它的内存地址来判断这个对象是否已经经历过一个新生代的清理，如果是，则复制到老生代中，否则复制到To空间中。
2. 对象从From空间复制到To空间时，如果To空间已经被使用了超过25%，那么这个对象直接被复制到老生代。

### Major GC（Mark-Sweep & Mark-Compact）

该GC主要负责老生代空间的紧凑和清理。当V8知道老生代空间无更多空间的时候就会触发这个GC。

老生代内存占用较多，如果使用 Scanvenge 算法，不仅会浪费一半空间，而且复制如此大块的内存消耗的时间也会相当长。V8 在老生代中的垃圾回收策略采用 Mark-Sweep 和 Mark-Compact 相结合。

#### 标记清除（Mark-Sweep）

老生代采用的是“标记清除”来回收未存活对象。

分为标记和清除两个阶段。标记阶段会遍历堆中所有的对象，并对存活的对象进行标记，清除阶段则是对未标记的对象进行清除。

#### 标记整理（Mark-Compact）

标记清除有一个问题就是，进行标记清除之后，内存空间往往是不连续的，会出现很多内存碎片。这种不连续的碎片空间中，遇到较大的对象时可能会由于空间不足而导致无法存储。

为了解决内存碎片的问题，需要使用另外一种算法——“标记整理（Mark-Compact）”。标记整理对待未存活对象不是立即回收，而是将存活对象移到另一端，然后直接清掉端边界以外的内存。

V8的老生代使用标记清除和标记整理结合的方式。主要采用标记清除算法，如果空间不足以分配从新生代晋升过来的对象时，才使用标记整理。

### V8的优化

#### 增量标记（Incremental Marking）

为了避免出现 JavaScript 运行程序与垃圾回收器看到的不一致的情况，进行垃圾回收的时候，都需要将正在运行的程序停下来，等待垃圾回收执行完成之后再恢复程序的执行，这种现象称为“全停顿”。如果需要回收的数据过多，那么全停顿的时间就会比较长，会影响其他程序的正常执行。

为了避免垃圾回收时间过长影响其他程序的执行，V8采用了增量标记的算法，将标记过程分成一个个小的子标记过程，让垃圾回收与 JavaScript 应用逻辑代码交替执行，直到标记阶段完成。

通俗理解，就是把垃圾回收这个大的任务分成一个个小任务，穿插在 JavaScript 任务中间执行，这个过程其实跟 React Fiber 的设计思路类似。

#### 惰性清理

由于标记完成后，所有对象都已经被标记，不是存活对象就是未存活对象，堆上多少空间格局已经确定。惰性清理就是先不着急释放那些未存活对象所占用的空间，而是延迟清理过程的执行。垃圾回收器可以根据需要逐一清理未存活对象所占用的内存页。

#### 其他

V8后续还引入了增量式整理（Incremental Compaction），以及并行标记和并行清理，通过并行利用多核CPU来提升垃圾回收的性能。

## 内存泄漏

虽然JavaScript会自动垃圾收集，但是如果我们的代码写法不当，会让变量一直处于“进入环境”的状态，无法被回收。下面列一下内存泄漏常见的几种情况。

### 常见 JavaScript 内存泄漏

#### 意外的全局变量

```js
function foo(arg) {
    bar = "this is a hidden global variable";
}
```

bar 未声明，会变成一个全局变量，在页面关闭之前不会被释放。

另一种意外的全局变量可能由 `this` 创建：

```js
function foo() {
    this.variable = "potential accidental global";
}
// foo 调用自己，this 指向了全局对象（window）
foo();
```

在 JavaScript 文件头部加上 'use strict'，可以避免此类错误发生。启用严格模式解析 JavaScript ，避免意外的全局变量。

> 明确声明的全局变量，也是定义为不可回收的（除非定义为空或重新分配）。当全局变量用于临时存储和处理大量信息时，要多加小心，确保用完后将它设置为 null 或重新定义。

#### 被意外的计时器或回调函数

```js
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);
```

这样的代码很常见，如果id为Node的元素从DOM中移除，该定时器仍会存在，同时，因为回调函数中包含对someResource的引用，定时器外面的someResource也不会被释放。

对于观察者的例子，一旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。老的 IE 6 是无法处理循环引用的。如今，即使没有明确移除它们，一旦观察者对象变成不可达，大部分浏览器是可以回收观察者处理函数的。

```js
var element = document.getElementById('button');
function onClick(event) {
    element.innerHTML = 'text';
}
element.addEventListener('click', onClick);
```

老版本的 IE 是无法检测 DOM 节点与 JavaScript 代码之间的循环引用，会导致内存泄漏。如今，现代的浏览器（包括 IE 和 Microsoft Edge）使用了更先进的垃圾回收算法，已经可以正确检测和处理循环引用了。换言之，回收节点内存时，不必非要调用 `removeEventListener` 了。

#### 闭包

闭包是 JavaScript 开发的一个关键方面：匿名函数可以访问父级作用域的变量。

```js
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    }
  };
};
setInterval(replaceThing, 1000);
```

在这段代码中：每次调用`replaceThing`，`theThing`得到一个包含大数组和一个新闭包（`someMethod`）的新对象。同时，变量 `unused` 是一个引用 `originalThing` 的闭包。

闭包的作用域一旦创建，它们有同样的父级作用域，作用域是共享的。`someMethod` 可以通过 `theThing` 使用，`someMethod` 与 `unused` 分享闭包作用域，尽管 `unused` 从未使用，它引用的 `originalThing` 迫使它保留在内存中（防止被回收）。

当这段代码反复运行，就会看到内存占用不断上升，垃圾回收器（GC）并无法降低内存占用。本质上，闭包的链表已经创建，每一个闭包作用域携带一个指向大数组的间接的引用，造成严重的内存泄漏。

[Meteor 的博文](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156) 解释了如何修复此种问题。在 `replaceThing` 的最后添加 `originalThing = null` 。

#### 没有清理的DOM元素引用

有时，保存 DOM 节点内部数据结构很有用。假如你想快速更新表格的几行内容，把每一行 DOM 存成字典（JSON 键值对）或者数组很有意义。此时，同样的 DOM 元素存在两个引用：一个在 DOM 树中，另一个在字典中。将来你决定删除这些行时，需要把两个引用都清除。

```js
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image'),
    text: document.getElementById('text')
};
function doStuff() {
    image.src = 'http://some.url/image';
    button.click();
    console.log(text.innerHTML);
    // 更多逻辑
}
function removeButton() {
    // 按钮是 body 的后代元素
    document.body.removeChild(document.getElementById('button'));
    // 此时，仍旧存在一个全局的 #button 的引用
    // elements 字典。button 元素仍旧在内存中，不能被 GC 回收。
}
```

此外还要考虑 DOM 树内部或子节点的引用问题。假如你的 JavaScript 代码中保存了表格某一个 `<td>` 的引用。将来决定删除整个表格的时候，直觉认为 GC 会回收除了已保存的 `<td>` 以外的其它节点。实际情况并非如此：此 `<td>` 是表格的子节点，子元素与父元素是引用关系。由于代码保留了 `<td>` 的引用，导致整个表格仍待在内存中。保存 DOM 元素引用的时候，要小心谨慎。

### Chrome 内存剖析工具

#### Performance

可以通过chrome 的 Performance 工具查看内存占用：

![1594717100230](.\images\js-heap.png)

步骤：

- 打开开发者工具 Performance
- 勾选 Screenshots 和 memory
- 左上角小圆点开始录制(record)
- 停止录制

图中 Heap 对应的部分就可以看到内存在周期性的回落，和垃圾回收相关。如果垃圾回收之后的最低值 min基本平稳，接近水平，就说明不存在内存泄漏。如果 min 在不断上涨，那么肯定是有较为严重的内存泄漏问题。

避免内存泄漏的一些方式：

- 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收
- 注意程序逻辑，避免“死循环”之类的
- 避免创建过多的对象

总而言之需要遵循一条**原则：不用了的东西要及时归还**。



## 参考链接

[V8内存管理及垃圾回收机制](https://segmentfault.com/a/1190000023162310)

[V8垃圾回收？看这篇就够了！- Go 语言中文网](https://studygolang.com/articles/26423)

[浅谈V8引擎中的垃圾回收机制](https://segmentfault.com/a/1190000000440270)

[JavaScript中的垃圾回收和内存泄漏](https://github.com/ljianshu/Blog/issues/65)

[4类JavaScript 内存泄漏及如何避免| Alon's Blog](https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/)

