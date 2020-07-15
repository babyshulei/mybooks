# 编程语言

每一种**程序设计语言**可以被看作是一套包含[语法](https://zh.wikipedia.org/wiki/语法)、[词汇](https://zh.wikipedia.org/wiki/词汇)和[语义](https://zh.wikipedia.org/wiki/语义)的正式规范。

这些规范通常包括：

- [数据](https://zh.wikipedia.org/wiki/数据)和[数据结构](https://zh.wikipedia.org/wiki/数据结构)
- [指令](https://zh.wikipedia.org/wiki/指令)及[流程控制](https://zh.wikipedia.org/wiki/流程控制)
- 引用机制和重用
- 设计哲学



## 高级编程语言

计算机不能直接理解高级语言，只能直接理解机器语言，所以必须要把高级语言翻译成机器语言，计算机才能执行高级语言编写的程序。

把高级语言翻译成机器语言的两种方式：一种是编译，一种是解释。两种方式只是翻译的时间不同。

### 编译型语言

编译型语言写的程序执行之前，需要一个专门的编译过程，把程序编译成为机器代码，比如exe文件，以后要运行的话就不用重新翻译了，直接使用编译的结果就行了（exe文件）。

因为翻译只做了一次，运行时不需要翻译，所以编译型语言的程序执行效率高，但也不能一概而论，部分解释型语言的解释器通过在运行时动态优化代码，甚至能够使解释型语言的性能超过编译型语言。

最典型的例子就是C语言。

优点：编译一次，一劳永逸；无需提供源码，保证源码安全性。

缺点：不同平台的可执行文件不同，跨平台能力差。

### 解释型语言

解释型语言在运行程序的时候将程序翻译成机器语言，所以运行速度相对于编译语言要慢。

这种编程语言需要利用[解释器](https://zh.wikipedia.org/wiki/直譯器)，在运行期，动态将代码逐句解释（interpret）为机器代码，或是已经预先编译为机器代码的[子程序](https://zh.wikipedia.org/wiki/子程式)，之后再运行。

优点：可以跨平台

缺点：运行时需要源代码，知识产权保护性差；运行效率低。

> 理论上，任何编程语言都可以是编译式，或解释型的。它们之间的区别，仅与程序的应用有关。许多编程语言同时采用编译器与解释器来实现，其中包括[Lisp](https://zh.wikipedia.org/wiki/Lisp)，[Pascal](https://zh.wikipedia.org/wiki/Pascal_(程式語言))，[C](https://zh.wikipedia.org/wiki/C語言)，[BASIC](https://zh.wikipedia.org/wiki/BASIC) 与 [Python](https://zh.wikipedia.org/wiki/Python)。[JAVA](https://zh.wikipedia.org/wiki/JAVA)及[C#](https://zh.wikipedia.org/wiki/C♯)采用混合方式，先将代码编译为[字节码](https://zh.wikipedia.org/wiki/字节码)，在运行时再进行解释。



## 脚本语言

**脚本语言**（Scripting language）是为了缩短传统的“编写、编译、链接、运行”（edit-compile-link-run）过程而创建的计算机编程语言。早期的脚本语言经常被称为批处理语言或工作控制语言。

脚本语言通常是解释运行而非编译。脚本语言一般都是以文本形式存在，类似于一种命令。

脚本语言通常都有简单、易学、易用的特性，目的就是希望能让程序员快速完成程序的编写工作。高级编程语言和脚本语言之间互相交叉，二者之间没有明确的界限。



## 参考链接

[编译型语言、解释型语言、脚本语言的区别 |_CSDN](https://blog.csdn.net/u011026329/article/details/51119402)

[编译型语言和解释型语言（一） - 简书](https://www.jianshu.com/p/c1ce70ccdb74)

[编译语言-维基百科](https://zh.wikipedia.org/wiki/編譯語言)

[解释型语言 - 维基百科](https://zh.wikipedia.org/wiki/直譯語言)

[脚本语言 - 维基百科](https://zh.wikipedia.org/wiki/腳本語言)

