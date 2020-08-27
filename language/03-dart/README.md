# Dart

Dart 是一种适用于万维网的开放源代码编程语言，由Google主导开发，于2011年10月公开。它的开发团队由Google Chrome浏览器V8引擎团队的领导者拉尔斯·巴克主持，目标在于成为下一代结构化Web开发语言。

类似JavaScript，Dart也是一种面向对象语言，但是它采用基于类的编程。它只允许单一继承，语法风格接近C语言。

**运行Dart语言的方式**：

1、Compiled as JavaScript：编译成JavaScript

2、Stand-alone：独立运行在 Dart 虚拟机上

3、Ahead-of-time compiled：基于AOT编译成平台的本地代码

4、Native：通过 dart2native 编译器或Flutter编译为native可执行代码

**Dart的优势**：

- Dart可基于AOT（Ahead Of Time）编译，即编译成平台的本地代码，运行性能高。
- Dart也可基于JIT（Just In Time）编译，编译快速，可热加载，使开发周期加倍提升（Flutter亚秒级有状态热重载）
- Dart可以更轻松地创建以60fps运行的流畅动画和转场。Dart在没有锁的情况下进行对象分配和垃圾回收
- Dart语法结合Java与JavaScript语法特点，几乎没有令人不适的怪异语法，使Java程序员倍感亲切，快速上手

通常来说一门语言要么使用AOT编译，编译慢，开发效率低，或者使用JIT编译，在运行时编译，虽然可以热重载，但是执行效率低，而Dart在这两种之间做出了完美平衡，当开发时使用JIT编译，调试快，所见即所得，开发效率高，当发布时，使用AOT编译，编译成目标平台的本地代码，执行效率高。



## 参考链接

[Dart - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/Dart)

[dart中文网](https://www.dartcn.com/)

[极客学院dart语言概览](https://wiki.jikexueyuan.com/project/dart-language-tour/)

[Dart语言——45分钟快速入门](https://juejin.im/post/6844903844535779342)

[Get the Dart SDK | Dart](https://dart.dev/get-dart)

[Dart VS code 开发环境搭建](https://segmentfault.com/a/1190000018721187)

