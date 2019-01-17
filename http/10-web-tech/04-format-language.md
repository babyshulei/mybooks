# 数据发布的格式及语言

> 2019-01-17 @wsl

## 1. XML

XML（eXtensible Markup Language， 可扩展标记语言）是一种可按应用目标进行扩展的通用标记语言。旨在通过使用 XML，使互联网数据共享变得更容易。

XML 和 HTML 都是从标准通用标记语言 SGML（Standard Generalized Markup Language）简化而成。与 HTML相比，它对数据的记录方式做了特殊处理。

XML和 HTML一样，使用标签构成树形结构，并且可自定义扩展标签。

从 XML文档中读取数据比起 HTML更为简单。由于 XML的结构基本上都是用标签分割而成的树形结构，因此通过语法分析器（Parser）的解析功能解析 XML结构并取出数据元素，可更容易地对数据进行读取。



## 2. 发布更新信息的 RSS/Atom

RSS（简易信息聚合，也叫聚合内容）和 Atom 都是发布新闻或博客日志等更新信息文档的格式的总称。两者都用到了 XML。

RSS 有以下版本， 名称和编写方式也不相同。

- RSS 0.9（RDF Site Summary）：最初的 RSS 版本。1999 年 3 月由网景通信公司自行开发用于其门户网站。基础构图创建在初期的 RDF规格上。
- RSS 0.91（Rich Site Summary）：在 RSS0.9 的基础上扩展元素，于1999 年 7 月开发完毕。非 RDF 规格， 使用 XML方式编写。
- RSS 1.0（RDF Site Summary）：RSS 规格正处于混乱状态。2000 年12 月由 RSS-DEV 工作组再次采用 RSS0.9 中使用的 RDF 规格发布。
- RSS2.0（Really Simple Syndication）：非 RSS1.0 发展路线。增加支持 RSS0.91 的兼容性，2000 年 12 月由 UserLand Software 公司开发完成。

Atom 具有以下两种标准。

- Atom 供稿格式（Atom Syndication Format）：为发布内容而制定的网站消息来源格式，单讲 Atom 时，就是指此标准。
- Atom 出版协定（Atom Publishing Protocol）：为 Web 上内容的新增或修改而制定的协议。

用于订阅博客更新信息的 RSS 阅读器， 这种应用几乎支持 RSS 的所有版本以及 Atom。



## 3. JavaScript 衍生的轻量级易用 JSON

JSON（JavaScript Object Notation）是一种以 JavaScript（ECMAScript）的对象表示法为基础的轻量级数据标记语言。能够处理的数据类型有 false/null/true/ 对象 / 数组 / 数字 / 字符串，这 7 种类型。

JSON 让数据更轻更纯粹，并且 JSON 的字符串形式可被 JavaScript 轻易地读入。当初配合 XML使用的 Ajax 技术也让 JSON 的应用变得更为广泛。另外，其他各种编程语言也提供丰富的库类，以达到轻便操作 JSON 的目的。

