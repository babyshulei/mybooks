# Babel

## 简介

Babel 是一个 JavaScript 编译器。他把最新版的javascript编译成当下可以执行的版本，简言之，利用babel就可以让我们在当前的项目中随意的使用这些新最新的es6，甚至es7的语法。

## 运行原理

Babel的工作流程可概括为三个阶段

- Parse(解析): 通过词法分析和语法分析，将源代码解析成抽象语法树(AST)
  @babel/parser、babylon
- Transform(转换)：对解析出来的抽象语法树做中间转换处理
  @babel/traverse
- Generate(生成)：用经过转换后的抽象语法树生成新的代码
  @babel/generator

### 1、解析

接受代码并输出AST。

分为两个阶段：词法分析（Lexical Analysis） 和 语法分析（Syntactic Analysis）。

#### 词法分析

词法分析阶段把字符串形式的代码转换为 令牌（tokens） 流。

#### 语法分析

语法分析阶段会把一个令牌流转换成 AST 的形式。



简单来说，解析阶段就是：

```
code(字符串形式代码) -> tokens(令牌流) -> AST（抽象语法树）
```

Babel 使用 @babel/parser 解析代码，输入的 js 代码字符串根据 ESTree 规范生成 AST（抽象语法树）。Babel 使用的解析器是 babylon。



### 2、转换

转换步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。这是 Babel 或是其他编译器中最复杂的过程。

Babel提供了@babel/traverse(遍历)方法维护这AST树的整体状态，并且可完成对其的替换，删除或者增加节点，这个方法的参数为原始AST和自定义的转换规则，返回结果为转换后的AST。



### 3、生成

代码生成步骤把最终（经过一系列转换之后）的 AST 转换成字符串形式的代码，同时还会创建源码映射（source maps）。

代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

Babel使用 @babel/generator 将修改后的 AST 转换成代码，生成过程可以对是否压缩以及是否删除注释等进行配置，并且支持 sourceMap。



## 参考链接

[Babel原理 -  奇舞精选](https://mp.weixin.qq.com/s/kI9nm5_hpTvGHHE61fzHNQ)

