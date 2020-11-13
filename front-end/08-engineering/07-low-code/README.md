# Low-code

## 简介

低代码开发平台（low-code development platform，简称**LCDP**），**通过 GUI、配置化的方式代替传统的手写代码编程**，让经验背景不同的开发者都能在低代码开发平台上，基于可视化的 UI 和模型驱动的逻辑来创建应用程序。

利用低代码平台创建整个 App，或者只在一些特定场景需要人工编码，减少了所需的人工代码量，一方面能够提高业务交付速度，另一方面也能让广大非专业开发者参与应用开发，降低了开发门槛和人力成本。

技术上，实现低代码平台的关键要素是**模型驱动设计、代码自动生成和可视化编程**，通过这些手段来隐藏下层的代码细节。

痛点：

- 大量模块重复开发
- 被浪费的开发周期、沟通成本
- 只能专业人士开发

目标：

- 通过工具化、自动化的方式提高生产效率
- 降低开发门槛、人力成本
- 企业级中后台应用

 low-code 演进：

- 模型驱动设计：从直接操作 DOM 到数据驱动视图，提升代码可预测性
- 代码自动生成：从模板到代码片段到搭建，不断减少人工代码量
- 可视化编程：从组件拼装到拖拽生成，减少低效的重复工作

在web App中主要有两部分：数据和视图，所以low-code的方向也通常是这两个。

视图是low-code主要方向，而且通常是一种可视化编辑的方案

1. 页面拖拽编辑。这种方式基本完全不需要code，但拖拽生成的页面比较僵硬，很难在进行二次开发。
2. 以组件或者模版形式可视化编辑页面（如umi）。通常将模版或者组件引入APP之后仍需二次开发，优点是引入组件后自动生成的相关代码结构清晰。



## 实践

目标：





样例：

https://webcodesk.com/

[美团乐高](https://zhuanlan.zhihu.com/p/27288444)：快速搭建后台系统页面的平台。

[imgcook](https://imgcook.taobao.org/)：通过设计稿一键智能生成视图代码。



开源库：

- [blocks](https://github.com/blocks/blocks)
  基于jsx的页面构建器，技术栈react，楼层式组件构建页面。
  
- [frappe](https://github.com/frappe/frappe)
  全栈开发low-code平台开源框架，基于Python、JavaScript，数据库采用MariaDB。
  
- [structor](https://github.com/ipselon/structor)

- [builder](https://github.com/BuilderIO/builder)
  PC端网页构建，可拖拽式组件，支持前端主流框架。
  
- [vuegg](https://github.com/vuegg/vuegg)
  可拖拽式组件页面搭建。基于vue。
  
- [amis](https://github.com/baidu/amis)
  百度开源的前端low-code框架，基于TypeScript、scss，通过 JSON 配置就能生成各种后台页面。
  
- [react-visual-editor](https://github.com/brick-design/react-visual-editor)
  组件可视化拖拽，页面搭建，源码生成工具，自由拖拽嵌套。
  
- [h5-Dooring](https://github.com/MrXujiang/h5-Dooring)
  开源免费的H5可视化页面配置解决方案，致力于提供一套简单方便、专业可靠、无限可能的H5落地页最佳实践。技术栈以react为主， 后台采用nodejs开发。
  
- [luban-h5](https://github.com/ly525/luban-h5)
  鲁班 H5 是基于 Vue2.0 开发的，通过拖拽的形式，生成页面的工具，类似易企秀、百度 H5 等工具。
  
- [gods-pen](https://github.com/ymm-tech/gods-pen)
  码良是一个在线生成 h5 页面并提供页面管理和页面编辑的平台，用于快速制作 H5 页面
  
  

方案：

- 方向：H5/PC
- 交互：楼层式/拖拽式

























## 参考链接

[awesome-lowcode - GitHub](https://github.com/taowen/awesome-lowcode)

[低代码开发平台- 维基百科](https://zh.wikipedia.org/zh/低程式碼開發平台)

[前端low-code意味着什么？ | 黯羽轻扬](http://www.ayqy.net/blog/low-code-frontend/)