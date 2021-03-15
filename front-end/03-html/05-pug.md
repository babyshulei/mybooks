# Pug 模板

## API

参见：[API 参考文档](https://www.pugjs.cn/api/reference.html)



## 语法

### 属性 Attribute

标签属性和 HTML 语法非常相似，但它们的值就是普通的 JavaScript 表达式。

- 属性值为普通的JavaScript表达式，可以使用模板字符串
- `,` 为属性分隔符，也可以不加
- 多行属性可以换行
- 默认情况下，所有属性都经过转义，可以使用`!=`使字符不转义
- 样式属性可以是一个对象
- 类可以使用`.classname`语法来定义
- ID可以使用 `#idname` 语法来定义
- 如果省略掉标签名称的话，默认值是`div`

示例：

pug：

```js
- var pre = 'http://www.';
a(class='button' href='baidu.com') 百度
a(class='button', href=`${pre}baidu.com`) 百度
a(style={color: 'red', background: 'green'})
a.button
a#main-link
#content
```

html：

```html
<a class="button" href="baidu.com">百度</a>
<a class="button" href="http://www.baidu.com">百度</a>
<a style="color:red;background:green;"></a>
<a class="button"></a>
<a id="main-link"></a>
<div id="content"></div>
```

### 分支条件 Case

Pug 使用 `case` 进行选择，类似 JS 中的 `switch` 

可以像switch语句那样使用传递，不同的是，JS中，传递在break之前一直进行；在Pug中，传递在非空语法块之前一直进行；如果不想输出任何东西，可以用break。

示例：

```js
- var friends = 10
case friends
  when 0
    p 您没有朋友
  when 1
    p 您有一个朋友
  when 3
  when 4
    - break;
  default
    p 您有 #{friends} 个朋友
```

### 代码 Code

Pug 可以在模板中嵌入 JavaScript。

- 用 `-` 开始一段不直接进行输出的代码
- 用 `=` 开始一段带有输出的代码，它应该是可以被求值的一个 JavaScript 表达式。安全起见，它将被 HTML 转义
- 用 `!=` 开始一段不转义的，带有输出的代码

示例：

Pug：

```js
- for (var x = 0; x < 3; x++)
  li item

p= '这个代码被 <转义> 了！'

p!= '这段文字' + ' <strong>没有</strong> 被转义！'
```

html：

```html
<li>item</li>
<li>item</li>
<li>item</li>

<p>这个代码被 &lt;转义&gt; 了！</p>

<p>这段文字 <strong>没有</strong> 被转义！</p>
```

### 注释 Comment

- 带输出的注释和 JavaScript 的单行注释类似，它们像标签，能生成 HTML 注释，而且必须独立一行。
- 不带输出的注释，加一个`-`即可。
- 块注释，单提一行

Pug：

```js
// 一些内容

//- 这行不会出现在结果里

//-
    给模板写的注释
    随便写多少字
    都没关系。

//
    给生成的 HTML 写的注释
    随便写多少字
    都没关系。
```

Html：

```html
<!-- 一些内容-->

<!--给生成的 HTML 写的注释
随便写多少字
都没关系。-->
```

### 条件 Conditional

Pug 的条件判断的一般形式的括号是可选的，所以您可以省略掉开头的 `-`，效果是完全相同的。类似一个常规的 JavaScript 语法形式。

Pug 同样也提供了它的反义版本 `unless`，`unless xxx`等价于`if !xxx`。

Pug：

```js
- var user = { description: 'foo bar baz' }
- var authorised = false
#user
  if user.description
    h2.green 描述
    p.description= user.description
  else if authorised
    h2.blue 描述
    p.description.
      用户没有添加描述。
      不写点什么吗……
  else
    h2.red 描述
    p.description 用户没有描述    
```

HTML：

```html
<div id="user">
  <h2 class="green">描述</h2>
  <p class="description">foo bar baz</p>
</div>
```

### Doctype

`doctype html`：对应着`<!DOCTYPE html>`

参见：[Doctype](https://www.pugjs.cn/language/doctype.html)

### 包含 Include

包含（include）功能允许您把另外的文件内容插入进来。

- 被包含的文件的路径，如果是一个绝对路径（如 `include /root.pug`），那么前面会加上 `options.basedir` 选项属性来进行解析。否则，路径应该相对于正在被编译的当前文件。
- 被包含的如果不是 Pug 文件，那么就只会当作文本内容来引入。
- 您可以合并过滤器和包含语句，从而做到引入文件内容并直接用过滤器处理它们。

Pug

```js
//- index.pug
doctype html
html
  include includes/head.pug
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    include includes/foot.pug

//- includes/head.pug
head
  title 我的网站
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')

//- includes/foot.pug
footer#footer
  p Copyright (c) foobar
```

Html

```html
<!DOCTYPE html>
<html>

<head>
  <title>我的网站</title>
  <script src="/javascripts/jquery.js"></script>
  <script src="/javascripts/app.js"></script>
</head>

<body>
  <h1>我的网站</h1>
  <p>欢迎来到我这简陋得不能再简陋的网站。</p>
  <footer id="footer">
    <p>Copyright (c) foobar</p>
  </footer>
</body>

</html>
```

### 模板继承 Inheritance

Pug 支持使用 `block` 和 `extends` 关键字进行模板的继承。一个称之为“块”（block）的代码块，可以被子模板覆盖、替换。这个过程是递归的。

参见：[继承与扩展](https://www.pugjs.cn/language/inheritance.html)

### 嵌入 Interpolation

- 变量可以通过`=`、`#{}` 嵌入模板，内容会被求值、转义
- 可以通过`!{}`来将文本嵌入模板，文本不会被转义
- 嵌入功能不仅可以嵌入 JavaScript 表达式的值，也可以嵌入用 Pug 书写的标签。

示例：

Pug

```js
- var title = "On Dogs: Man's Best Friend";
- var theGreat = "<span>转义!</span>";
h1= title
p 这是安全的：#{theGreat}

p.
  使用带属性的嵌入标签的例子：
  #[q(lang="es") ¡Hola Mundo!]
```

html

```html
<h1>On Dogs: Man's Best Friend</h1>
<p>这是安全的：&lt;span&gt;转义!&lt;/span&gt;</p>

<p>使用带属性的嵌入标签的例子：
  <q lang="es">¡Hola Mundo!</q></p>
```

### 迭代 Iteration

Pug 目前支持两种主要的迭代方式： `each` 和 `while`。

**each**：

- 语法`each value, index in iteratorobj`，index为索引值，可选
- 还能添加一个`else`，这个语句块将会在数组与对象没有可供迭代的值时被执行
- 也可以使用 `for` 作为 `each` 的别称

示例：

Pug

```js
ul
  each val, index in ['〇', '一', '二']
    li= index + ': ' + val
```

Html

```html
<ul>
  <li>0: 〇</li>
  <li>1: 一</li>
  <li>2: 二</li>
</ul>
```

您也可以使用 `while` 来创建一个循环：

Pug

```js
- var n = 0;
ul
  while n < 4
    li= n++
```

Html

```html
<ul>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

### 混入 Mixin

混入是一种允许您在 Pug 中重复使用一整个代码块的方法。

- 它们会被编译成函数形式，可以传递一些参数
- 混入可以把一整个代码块像内容一样传递进来
- 混入也可以隐式地，从“标签属性”得到一个参数 `attributes`
- 也可以直接用 [`&attributes`](https://www.pugjs.cn/language/attributes.html#attributes) 方法来传递 `attributes` 参数
- 可以用剩余参数（rest arguments）语法来表示参数列表最后传入若干个长度不定的参数

示例：

Pug

```js
//- 定义
mixin article(title)
  .article(class!=attributes.class)
    .article-wrapper
      h1= title
      if block
        block
      else
        p 没有提供任何内容。
//- 使用
+article('Hello world')(class="art1")
+article('Hello world')
  p 这是我
  p 随便写的文章
  
//- 定义
mixin list(id, ...items)
  ul(id=id)&attributes(attributes)
    each item in items
      li= item
//- 使用
+list('my-list', 1, 2, 3, 4)(class="test")
```

Html

```html
<div class="article art1">
  <div class="article-wrapper">
    <h1>Hello world</h1>
    <p>没有提供任何内容。</p>
  </div>
</div>
<div class="article">
  <div class="article-wrapper">
    <h1>Hello world</h1>
    <p>这是我</p>
    <p>随便写的文章</p>
  </div>
</div>

<ul id="my-list" class="test">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

### 纯文本 Plain Text

Pug 提供了四种方法来放置纯文本，任何的代码或者文字都将几乎不经过任何处理，直接输出到 HTML 中。

纯文本中依然可以使用标签和字符串的[嵌入](https://www.pugjs.cn/language/interpolation.html)操作，不过每行开头就不再是 Pug 标签。

- 标签中的纯文本
  添加一段行内的纯文本。这行内容的第一项就是标签本身。标签与一个空格后面接着的任何东西，都是这个标签的文本内容。
- 原始HTML
  如果一行的开头是左尖括号（`<`），那么整行都会被当作纯文本。
- 管道文本
  另外一种向模板添加纯文本的方法就是在一行前面加一个管道符号（`|`）。该方法在混合纯文本和行内标签时会很有用。
- 标签中的纯文本块
  只需要在标签后面紧接一个点 `.`，在标签有[属性](https://www.pugjs.cn/language/attributes.html)的时候，则是紧接在闭括号后面。在标签和点之间不要有空格。块内的纯文本内容必须缩进一层

示例：

Pug

```js
p 这是一段纯洁的<em>文本</em>内容.

<div>
</div>

p
  | 管道符号总是在最开头，
  | 不算前面的缩进。

script.
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')
```

Html

```html
<p>这是一段纯洁的<em>文本</em>内容.</p>

<div>
</div>

<p>管道符号总是在最开头，
  不算前面的缩进。</p>

<script>
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')
</script>
```

### 标签 Tag

在默认情况下，在每行文本的开头（或者紧跟白字符的部分）书写这个 HTML 标签的名称。使用缩进来表示标签间的嵌套关系，这样可以构建一个 HTML 代码的树状结构。

- Pug 知道哪个元素是自闭合的
- 为了节省空间， Pug 为嵌套标签提供了一种内联式语法。`a: img`
- 诸如 `img`, `meta`, 和 `link` 之类的标签都是自动闭合的。 也可以通过在标签后加上 `/` 来明确声明此标签是自闭合的
- 标签前后的空格都会被移除，因此需要控制这些标签是否需要处理。

示例：

Pug

```js
ul
  li Item A
  li Item B
  li Item C

a: img

foo/
foo(bar='baz')/
```

Html

```html
<ul>
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ul>

<a><img /></a>

<foo />
<foo bar="baz" />
```



## 参考链接

[入门指南– Pug 模板引擎中文文档| Pug 中文网](https://www.pugjs.cn/api/getting-started.html)

