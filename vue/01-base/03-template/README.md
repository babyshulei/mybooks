# 模板编译原理

> 2019.10.16 @wsl

# 1. 模板编译

## 1.1 作用

模板编译的主要目标就是生成渲染函数。渲染函数的作用是每次执行它，它就会使用当前最新的状态生成一份新的vnode，然后使用这个vnode进行渲染。

![template-1](.\images\template-1.png)

## 1.2 过程

将模板编译成渲染函数可以分成以下三部分：

- 将模板解析成AST----解析器
- 遍历AST标记静态节点----优化器
- 使用AST生成渲染函数----生成器

![template-2](.\images\template-2.png)

### 1.2.1 解析器

作用：将模板解析成AST。

解析器内部分成很多小的解析器，包括过滤器解析器、文本解析器、HTML解析器。通过一条主线将这些解析器组装在一起。

- 过滤器解析器：用来解析过滤器。
- 文本解析器：用来解析文本，包括带变量的文本。如：`Hello {{ name }}`。
- HTML解析器：最核心的模块，用来解析模板。每当解析到HTML标签的开始位置、结束位置、文本或者注释时，会触发钩子函数，然后将相关信息通过参数传递出来。
- 主线：监听HTML解析器。每当触发钩子函数时，就生成一个对应的AST节点。

### 1.2.2 优化器

作用：遍历AST，检测出所有静态子树，并给其打上标记。

静态节点渲染完成后，不需要重新渲染。通过给静态子树打标记，可以减少虚拟Dom更新操作的工作量，从而提升性能。

### 1.2.3 代码生成器

作用：将AST转换成渲染函数中的内容，这个内容可以称为“代码字符串”。

# 2. 解析器

## 2.1 作用

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

### 2.1.1 AST概念

抽象语法树（abstract syntax code，AST），是源代码的抽象语法结构的树状表示。

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

























