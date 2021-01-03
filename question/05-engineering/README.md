# 工程化

## 性能

### 1. 前端性能优化方案？

- 代码压缩，静态资源压缩
- 图片压缩
- CDN
- 优化代码质量减少过多的DOM操作
- 合并请求
- 提升合成层
- raf(渲染间隔16.7ms，减少回流与重绘)
- 懒加载

![h5-preference](.\images\h5-preference.png)

## 工程

### 1. webpack打包





### 2. 前端模块化

无模块化 -> CommonJs -> AMD -> CMD -> ES6 module

伪模块化，通过命名来区分模块，BEM命名规范。export, global+lint检查。

CommonJs：同步加载模块，node.js采用该规范。require('module'); module.exports。因为是同步加载，可能会造成阻塞，服务端可以用，浏览器端不建议。

AMD：异步加载模块，define定义模块，require加载模块。依赖前置，提前执行，提前加载所有的依赖，然后才可以使用。

CMD：异步加载模块。依赖就近，延迟执行，需要时再引用，用到哪个依赖时加载哪个模块。

ES6 module：import，export；动态import。



参见笔记：JavaScript-模块

