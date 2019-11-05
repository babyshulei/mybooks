# MV*框架

> 2019.11.04 @wsl

MV*模式是为了解决图形界面应用程序复杂性管理问题而产生的应用架构模式。

MVC、MVP、MVVM

## 1. GUI 程序面临的问题

在开发应用程序的时候，以求更好的管理应用程序的复杂性，基于**职责分离（Speration of Duties）**的思想都会对应用程序进行分层。在开发图形界面应用程序的时候，会把管理用户界面的层次称为View，应用程序的数据为Model（注意这里的Model指的是Domain Model，这个应用程序对需要解决的问题的数据抽象，不包含应用的状态，可以简单理解为对象）。Model提供数据操作的接口，执行相应的业务逻辑。

![img](.\images\gui.jpg)

有了View和Model的分层，那么问题就来了：View如何同步Model的变更，View和Model之间如何粘合在一起。

带着这个问题开始探索MV*模式，会发现这些模式之间的差异可以归纳为对这个问题处理的方式的不同。而几乎所有的MV*模式都是经典的Smalltalk-80 MVC的修改版。















## 参考链接

[界面之下：还原真实的MV*模式](https://github.com/livoras/blog/issues/11)

[MVP（Passive View）](https://martinfowler.com/eaaDev/PassiveScreen.html)

[MVP（Supervising Controller）](https://martinfowler.com/eaaDev/SupervisingPresenter.html)

[Domain Modeling](http://www.cs.sjsu.edu/~pearce/modules/lectures/ooa/analysis/DomainModeling.htm)

[MVW-demos](https://github.com/livoras/MVW-demos)