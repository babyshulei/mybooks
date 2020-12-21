# 微前端

## 背景

### 什么是微前端？

Techniques, strategies and recipes for building a **modern web app** with **multiple teams** that can **ship features independently**.

构建一个现代web应用所需要的技术、策略和方法，具备多个团队独立开发、部署的特性。

### npm包 VS 微前端

1、业务场景

- 零散的活动页面
- 外包项目
- 中台项目
- 大型产品项目

2、npm包的痛点

- npm包的更新流程繁琐。需要应用手动更新部署，引用该子模块的应用越多，更新越复杂。
  微前端可以做到一键更新。子模块更新部署后，引用业务无需其他操作，刷新页面即可。
- 构建速度慢。应用构建时，需要同步构建业务子模块，随着子模块的更新，构建时间会越来越长，开发体验和效率都随之降低。
  微前端可以很好地解决这个问题，像某一管理应用项目，可以在线使用其他管理系统应用的子模块，不需要本地构建这些子模块的代码，从而减小了构建体积，提高了开发效率。
- npm包更新后，应用项目可能需要进行相应代码更新，涉及实际应用项目越多，升级越复杂，不便于后续的应用迭代。

3、微前端的优点

- 增量升级
- 简单、解耦的代码库
- 独立部署
- 团队自洽

## 实现

### 集成

- 后端模板集成
- package集成
- 通过iframe集成
- 使用JS集成
- 通过Web Component集成



### 方案

- single spa、乾坤
- EMP



## 参考链接

[EMP微前端解决方案](https://mp.weixin.qq.com/s/l0-uCLFRcBBrs4yTiAvryg)

[Micro Frontends 官网](https://micro-frontends.org/)

[微前端入门 - 掘金](https://juejin.cn/post/6844903953734336525)

