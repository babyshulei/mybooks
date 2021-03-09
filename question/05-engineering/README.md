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

模块化演进：无模块化 -> CommonJs -> AMD -> CMD -> ES6 module

- CommonJs：同步加载模块，`require/module.exports/exports`。node.js采用该规范。因为是同步加载，可能会造成阻塞，服务端可以用，浏览器端不建议。
- AMD：异步加载模块，`define/require`。依赖前置，提前执行，提前加载所有的依赖，然后才可以使用。
- CMD：异步加载模块，`define/require`。依赖就近，延迟执行，需要时再引用，用到哪个依赖时加载哪个模块。
- ES6 module：`import/动态import/export`。
- 伪模块化，通过命名来区分模块，BEM命名规范。export, global+lint检查。

参见笔记：JavaScript-模块



### 3. 如何提升代码质量？

当代码会重复使用时，就需要考虑代码的复用：

- 继承
- 函数封装
- 组件抽离
- 混入 `mixin`

参考：[JS代码复用模式- SegmentFault 思否](https://segmentfault.com/a/1190000014518349)

