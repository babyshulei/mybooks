# 解析器

> 2019.11.06 @wsl

## 1 作用

解析器要实现的功能是将模板解析成AST。

demo：

```html
<div>
  <p>{{name}}</p>
</div>
```

转换成AST：

```javascript
{
  tag: "div"
  type: 1,
  staticRoot: false,
  static: false,
  plain: true,
  parent: undefined,
  attrsList: [],
  attrsMap: {},
  children: [
    {
      tag: "p"
      type: 1,
      staticRoot: false,
      static: false,
      plain: true,
      parent: {tag: "div", ...},
      attrsList: [],
      attrsMap: {},
      children: [{
        type: 2,
        text: "{{name}}",
        static: false,
        expression: "_s(name)"
      }]
    }
  ]
}
```

### 1.1 AST概念

[AST](https://zh.wikipedia.org/wiki/抽象語法樹) 的全称是 Abstract Syntax Tree（抽象语法树），是源代码的抽象语法结构的树状表现形式，计算机学科中编译原理的概念。Vue 源码中借鉴 jQuery 作者 [John Resig](https://zh.wikipedia.org/wiki/約翰·雷西格) 的 [HTML Parser](http://ejohn.org/blog/pure-javascript-html-parser/) 对模板进行解析，得到的就是 AST 代码。

如上例，解析器将模板解析成AST，AST是用JavaScript中的对象来描述一个节点，一个对象代表一个节点，对象中的属性用来保存节点所需的各种数据。

定义如下：

```typescript
declare type ASTNode = ASTElement | ASTText | ASTExpression;

declare type ASTElement = {
  type: 1;
  tag: string;
  attrsList: Array<{ name: string; value: string }>;
  attrsMap: { [key: string]: string | null };
  parent: ASTElement | void;
  children: Array<ASTNode>;
  static?: boolean;
  // ...
};

declare type ASTExpression = {
  type: 2;
  expression: string;
  text: string;
  static?: boolean;
  // ...
};

declare type ASTText = {
  type: 3;
  text: string;
  static?: boolean;
  isComment?: boolean;
  // ...
};
```

可以看到，ASTNode 有三种形式：ASTElement，ASTText，ASTExpression。用属性 `type` 区分。

## 2 原理

解析器内部也分了好几个子解析器，比如HTML解析器、文本解析器以及过滤器解析器，其中最主要的是HTML解析器。

HTML解析器的作用是解析HTML，它在解析HTML的过程中会不断触发各种钩子函数。这些钩子函数包括开始标签钩子函数、结束标签钩子函数、文本钩子函数以及注释钩子函数。

伪代码：

```javascript
parseHTML(template, {
    start (tag, attrs, unary) {
        // 每当解析到标签的开始位置时，触发该函数
    },
    end () {
        // 每当解析到标签的结束位置时，触发该函数
    },
    chars (text) {
        // 每当解析到文本时，触发该函数
    },
    comment (text) {
        // 每当解析到注释时，触发该函数
    }
})
```

因此，我们可以在钩子函数中构建AST节点。在`start`钩子函数中构建元素类型的节点，在`chars`钩子函数中构建文本类型的节点，在`comment`钩子函数中构建注释类型的节点。

当HTML解析器不再触发钩子函数时，就代表所有模板都解析完毕，所有类型的节点都在钩子函数中构建完成，即AST构建完成。

我们发现，钩子函数`start`有三个参数，分别是`tag`、`attrs`和`unary`，它们分别代表标签名、标签的属性以及是否是自闭合标签。

而文本节点的钩子函数`chars`和注释节点的钩子函数`comment`都只有一个参数，只有`text`。这是因为构建元素节点时需要知道标签名、属性和自闭合标识，而构建注释节点和文本节点时只需要知道文本即可。





# 参考链接

[Vue.js 模板解析器原理 - 来自《深入浅出Vue.js》第九章](https://github.com/berwin/Blog/issues/36#)

[Vue2.0 源码阅读：模板渲染](http://zhouweicsu.github.io/blog/2017/04/21/vue-2-0-template/)

