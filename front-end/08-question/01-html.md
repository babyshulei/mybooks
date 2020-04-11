# HTML

## 标签

### 1. 写出你了解的 HTML 标签，并把他们分一下类。

详见笔记：[HTML标签](https://babyshulei.github.io/mybooks/front-end/03-html/01-tags.html)



### 2. i vs em？strong vs b？

**HTML元素 `<i>`** 用于表现因某些原因需要区分普通文本的一系列文本。例如技术术语、外文短语或是小说中人物的思想活动等，它的内容通常以斜体显示。

**HTML 着重元素 `<em>`** 标记出需要用户着重阅读的内容， `<em>` 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读。



**Strong 元素 （`<strong>`）**表示文本十分重要，一般用粗体显示。

**HTML提醒注意（Bring Attention To）元素（`<b>`）**用于吸引读者的注意到该元素的内容上（如果没有另加特别强调）。这个元素过去被认为是**粗体（Boldface）元素**，并且大多数浏览器仍然将文字显示为粗体。尽管如此，你不应将 `<b>` 元素用于显示粗体文字；替代方案是使用 CSS [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight) 属性来创建粗体文字。



### 3. 什么是 DOCTYPE，DOCTYPE 有什么用？浏览器渲染模式？

文档类型，一个文档类型标记是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。Doctype还会对浏览器的渲染模式产生影响，不同的渲染模式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析，所以Doctype是非常关键的，尤其是在 IE 系列浏览器中，由DOCTYPE 所决定的 HTML 页面的渲染模式至关重要。

浏览器解析HTML有三种解析方式:

- 非怪异（标准）模式
- 怪异模式
- 部分怪异（近乎标准）模式

在“标准模式”(standards mode) 页面按照 HTML 与 CSS 的定义渲染，而在“怪异模式(quirks mode) 模式”中则尝试模拟更旧的浏览器的行为。 一些浏览器（例如，那些基于 Mozilla 的 Gecko 渲染引擎的，或者 Internet Explorer 8 在 strict mode 下）也使用一种尝试于这两者之间妥协的“近乎标准”(almost standards) 模式，实施了一种表单元格尺寸的怪异行为，除此之外符合标准定义。

一个不含任何 DOCTYPE 的网页将会以 怪异(quirks) 模式渲染。

HTML5提供的`<DOCTYPE html>`是标准模式，向后兼容的, 等同于开启了标准模式，那么浏览器就得老老实实的按照W3C的 标准解析渲染页面，这样一来，你的页面在所有的浏览器里显示的就都是一个样子了。

[怪异模式和标准模式- HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)



### 4. HTML语义化

语义化的含义就是用正确的标签做正确的事情，html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。



## HTML5

### 1. h5新特性

- 文件类型声明（<!DOCTYPE>）仅有一型：`<!DOCTYPE html>`。
- 新增标签：语义化标签、其他标签
- canvas，svg
- video，audio
- localstorage，sessionStorage
- xhr2
- websockets

[参见笔记](https://babyshulei.github.io/mybooks/front-end/03-html/03-html5.html)



## DOM

### 1. 你对 HTML DOM 是怎么理解的？

DOM: Document Object Module, 文档对象模型。我们通过JavaScript操作页面的元素，进行添加、移动、改变或移除的方法和属性, 都是DOM提供的。

#### 什么是DOM节点？

根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：

- 整个文档是一个文档节点
- 每个 HTML 元素是元素节点
- HTML 元素内的文本是文本节点
- 每个 HTML 属性是属性节点
- 注释是注释节点

#### 什么是 HTML DOM节点树？

HTML文本会被解析为DOM树, 树中的所有节点均可通过 JavaScript 进行访问。所有 HTML 元素（节点）均可被修改，也可以创建或删除节点。

![ct_htmltree](.\images\htmltree.gif)

#### 节点的关系

父（parent）、子（child）和同胞（sibling）等术语用于描述这些关系。父节点拥有子节点。同级的子节点被称为同胞（兄弟或姐妹）:

- 在节点树中，顶端节点被称为根（root）
- 每个节点都有父节点、除了根（它没有父节点）
- 一个节点可拥有任意数量的子
- 同胞是拥有相同父节点的节点

### 2. 如何操作 DOM？

```javascript
document.createElement('div');
document.createTextNode(node);
document.createDocumentFragment();

document.getElementById('id');
document.getElementByTagName('div');
document.getElementByClassName('ss');

document.querySelector('#id');
$elm.querySelectorAll('.ss');

$elm.children
$elm.firstElementChild
$elm.lastElementChild

$elm.appendChild(child);
$elm.insertBefore(newNode, refNode);
$elm.insertAdjacentHTML('beforebegin', htmlString);

parent.removeChild(node);
parent.replaceChild(newChild, oldChild);
```

[总结js常用的dom操作（js的dom操作API）](https://www.haorooms.com/post/js_dom_api)



### 3. DOM事件

事件捕获：从外到内

事件冒泡：从内（目标元素）到外

Dom事件流：

捕获 -> 目标阶段 ->冒泡

事件委派：

原理是在容器节点上绑定事件，利用冒泡，判断事件是否在匹配指定的选择器的节点上被触发。优点是只用绑定一次，不用对每个目标做绑定，还有对动态插入的节点也生效，无需重新绑定。

常见api：

阻止默认事件：e.preventDefault()；

阻止冒泡：e.stopPropagation();

event.currentTarget   //当前所绑定的事件对象。在事件委托中，指的是【父元素】。

event.target  //当前被点击的元素。在事件委托中，指的是【子元素】。



### 4. classList和dataset分别是什么？

classList类似className，区别是className是空格隔开的字符串，而classList是一个类数组对象，有add、remove、toggle方法。dataset是获取以data-开头的属性的方法。



### 5. 描述history.pushState的作用。

无刷新的新增一个历史记录，第一个参数是记录绑定的数据，第二个参数是标题(很多浏览器都忽略了)，第三个参数是新的URL。

