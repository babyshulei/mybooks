# 自动化测试

## 技术/工具

### Selenium 2.0

 Selenium 2.0（Selenium WebDriver）， 支持多平台、多语言、多款浏览器（通过各种浏览器的驱动来驱动浏览器），提供了功能丰富的API接口。而随着前端技术的发展，Selenium 2.0 逐渐呈现出环境安装复杂、API 调用不友好、性能不高等缺点。

### Puppeteer

[Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/)是一个 Node 库，它提供了一套高阶 API ，通过 Devtools 协议控制 `Chromium` 或 `Chrome` 浏览器。

官方描述的功能：

- 生成页面 PDF；
- 抓取 SPA（单页应用）并生成预渲染内容（即“ SSR ”，服务器端渲染）；
- 自动提交表单，进行 UI 测试，键盘输入等；
- 创建一个时时更新的自动化测试环境，使用 JavaScript 和最新的浏览器功能直接在最新版本的 Chrome 中执行测试；
- 捕获网站的 Timeline Trace，用来帮助分析性能问题；
- 测试浏览器扩展。

### Jasmine

Jasmine，主要用于异步测试，是一个功能丰富的JavaScript自动化测试框架。应用程序运行在Node.js上，通过连续运行测试用例，允许准确和灵活的bug报告。

（1）Jasmine最大的优点是它可以兼容你选择的所有框架或库，这使它成为最灵活的JavaScript测试框架之一。无论用户想要使用Sinon来模拟或者Chai来断言测试用例，Jasmine都将毫无困难地帮助用户。

（2）Jasmine的社区非常大，用户将获得各种各样的支持，包括库、博客文章或视频教程。

（3）随着社区的扩大，Jasmine的学习曲线非常平滑。用户也会得到令人印象深刻的文档。

### Mocha

Mocha是一个基于javascript的自动化测试框架，用于测试使用Node.js运行的应用程序。

（1）该应用程序是开源的，并且允许灵活性；

（2）它可以很容易地支持生成器；

（3）可以在网上找到许多教程和文档；

（4）使用灵活的报告顺序执行测试用例；

（5）Mocha帮助您轻松地将异常映射到相关的测试用例。

### Jest

Jest由Facebook开发，用于测试JavaScript代码，尤其是使用React JS开发的应用程序。

Jest的特别之处在于，它提供了一个不需要任何配置经验的集成框架。这个工具已经可以使用了，如果用户正在使用npm，用户可以通过运行以下命令立即设置它。

（1）使用Jest的最大好处是最小配置和设置的开箱即用体验，因为它附带了一个mock支持断言库。与任何新的测试库一样，测试用例是使用行为驱动的开发方法编写的。用户可以将用户的测试用例放在一个名为_tests_的文件夹中，并开始运行它们。

（2）Jest被认为是一个有很好文档的、快速执行的JavaScript测试框架。

（3）Jest提供了一种健壮的开发人员工具，代码更不容易出错。

该框架还可以通过捕获屏幕截图来执行可视化回归测试。当使用React JS开发应用程序时，该特性对于防止意外导致的UI bug非常方便。它的工作原理是记录呈现组件的屏幕快照，然后与将来呈现的组件进行比较。如果添加了任何新功能，屏幕截图都可以轻松更新。

### HttpRunner

HttpRunner 是一款面向 HTTP(S) 协议的通用测试框架，需编写维护一份 `YAML/JSON` 脚本，即可实现自动化测试、性能测试、线上监控、持续集成等多种测试需求。

- 开源
- 只需编写维护一份 YAML/JSON 脚本，即可实现自动化测试、性能测试、线上监控、持续集成等多种测试需求
- 需要手写python代码，需要一定的学习成本



### JMeter

JMeter是Apache公司基于java开发的一款开源压力测试工具，体积小，功能全，使用方便，是一个比较轻量级的测试工具，使用起来非常简单。



## 参考链接

[京喜前端自动化测试之路](https://juejin.im/post/6844904150631710727)

[2019年最流行的五大JavaScript 自动化测试框架- 知乎](https://zhuanlan.zhihu.com/p/80450573)

[Jmeter性能测试入门- 小坦克- 博客园](https://www.cnblogs.com/tankxiao/p/4045439.html)

[Jmeter接口测试（一）（自动化初试） - 简书](https://www.jianshu.com/p/6dc0a1ea287c)

[Jasmine 测试指南- 掘金](https://juejin.im/post/6844904053223194638)

[HttpRunner V2.x 中文使用手册](https://v2.httprunner.org/)

