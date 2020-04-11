# HTML5的新特性

2014年10月29日，W3C宣布，经过接近8年的艰苦努力，HTML5标准规范终于制定完成。

HTML5将会取代1999年制定的HTML 4.01、XHTML 1.0标准，以期能在互联网应用迅速发展的时候，使网络标准达到符合当代的网络需求，为桌面和移动平台带来无缝衔接的丰富内容。

HTML5的新特性主要有：

- 文件类型声明（<!DOCTYPE>）仅有一型：`<!DOCTYPE html>`。
- 新的解析顺序：不再基于SGML。
- 新增标签：
  - 结构元素：article、aside、header、hgroup、footer、figure、section、nav
  - 其他元素：video、audio、canvas、embed、mark、progress、meter、time、command、details、datagrid、keygen、output、source、menu、ruby、wbr、bdi、dialog
- input元素的新类型：date, email, url等等。
- 新的属性：ping（用于a与area）, charset（用于meta）, async（用于script）。
- 全域属性：id, tabindex, repeat。
- 新的全域属性：contenteditable, contextmenu, draggable, dropzone, hidden, spellcheck。
- 移除标签：
  - 纯表现元素：basefont、big、center、font、s、strike、tt、u 用css代替
  - 部分浏览器支持的元素：applet、bgsound、blink、marquee
  - 对可用性产生负面影响的元素：frameset、frame、noframes,在html5中不支持frame框架，只支持iframe框架
- 提供了新的API
  - Geolocation：地理信息
  - Drag and Drop
  - Web Storage：localStorage、sessionStorage
  - Application Cache
  - Web Workers
  - XMLHttpRequest Level2：通过cors实现了跨域xhr。
  - WebSockets
  - SSE（Server-Sent Events）
  - Canvas/WebGL
  - SVG
  - Audio/Video

## 语义化标签

html标签是我们开发前端界面的骨架，但是以前我们使用html标签布局使用的都是div标签，div标签的语义非常的不清晰，因此html5为了规范这一块，给出了一系列的标签：

article、aside、header、hgroup、footer、figure、section、nav







## 参考链接

[HTML5的新特性概述（上）- 掘金](https://juejin.im/post/5be8d817e51d457f7a4aba13)

[HTML5新特性概述(下) - 掘金](https://juejin.im/post/5bea349a518825170d1a9db1)

[HTML5新特性浅谈](https://blog.csdn.net/gane_cheng/article/details/52819118)

[史上最全--HTML5新特性都有哪些 - 简书](https://www.jianshu.com/p/37c0b1eb4145)

[HTML5新特性总结0804 - segmentfault](https://segmentfault.com/a/1190000010504564)

[html5新特性总结 - 掘金](https://juejin.im/post/5b9f76235188255c652d3212)

[Server-Sent Events 教程- 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)

