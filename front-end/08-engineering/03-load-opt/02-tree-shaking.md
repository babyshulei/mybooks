# Tree-shaking

> 优化是一种态度，不因小而不为，不因艰而不攻。



Tree-Shaking这个名词，它代表的大意就是删除没用到的代码。这样的功能对于构建大型应用时是非常好的，因为日常开发经常需要引用各种库。但大多时候仅仅使用了这些库的某些部分，并非需要全部，此时Tree-Shaking如果能帮助我们删除掉没有使用的代码，将会大大缩减打包后的代码量。

Tree-Shaking在前端界由[rollup](https://link.zhihu.com/?target=https%3A//github.com/rollup/rollup)首先提出并实现，后续[webpack](https://link.zhihu.com/?target=https%3A//github.com/webpack/webpack)在2.x版本也借助于[UglifyJS](https://link.zhihu.com/?target=https%3A//github.com/mishoo/UglifyJS2)实现了。

## 原理

Tree-shaking的本质是消除无用的js代码。无用代码消除在广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE（dead code elimination）。

Tree-shaking 是 DCE 的一种新的实现，Javascript同传统的编程语言不同的是，javascript绝大多数情况需要通过网络进行加载，然后执行，加载的文件大小越小，整体执行时间更短，所以去除无用代码以减少文件体积，对javascript来说更有意义。

Tree-shaking 和传统的 DCE的方法又不太一样，传统的DCE 消灭不可能执行的代码，而Tree-shaking 更关注于消除没有用到的代码。

### DCE

Dead Code 一般具有以下几个特征

- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

传统编译型的语言中，都是由编译器将Dead Code从AST（抽象语法树）中删除，那javascript中是由谁做DCE呢？

其实不是打包工具 rollup，webpack，closure compiler 做的，而是著名的代码压缩优化工具 uglify 做的。

### Tree-shaking

Tree-shaking更关注于无用模块的消除，消除那些引用了但并没有被使用的模块。

Tree-shaking的消除原理是依赖于ES6的模块特性。

ES6 module 特点：

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable的

ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。

所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。

这是 ES6 modules 在设计时的一个重要考量，也是为什么没有直接采用 CommonJS，正是基于这个基础上，才使得 tree-shaking 成为可能，这也是为什么 rollup 和 webpack 2 都要用 ES6 module syntax 才能 tree-shaking。

Tree-shaking效果分析：无用函数消除成功；无用类消除失败。原因：

- rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
- javascript动态语言的特性使得静态分析比较困难
- 副作用广泛存在

**结论：tree-shaking对顶层纯函数效果较好。**

函数的副作用相对较少，顶层函数相对来说更容易分析，加上babel默认都是"use strict"严格模式，减少顶层函数的动态访问的方式，也更容易分析

## 参考链接

[你的Tree-Shaking并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)

[Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/6844903544756109319)



