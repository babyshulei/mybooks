# Vue 3.0

Evan You（尤雨溪）2018年11月16日在 Vue Toronto 的主题演讲中预演了 Vue 3 。利用现代浏览器支持的新功能，Vue 3 将成为我们已经了解和喜爱的 Vue.js 强大的的改进版本。

总结起来，Vue 3 以下方面值得我们期待 ：

- 更快
- 更小
- 更易于维护
- 更多的原生支持
- 更易于开发使用

完整的PPT： <https://docs.google.com/presentation/d/1yhPGyhQrJcpJI2ZFvBme3pGKaGNiLi709c37svivv0o/edit#slide=id.p>

## 让 Vue 更快

- 重写虚拟DOM
- 优化插槽生成
- 静态树提升
- 静态属性提升
- 基于Proxy的观察者机制



## 让 Vue 更小

- 优化Tree Shaking



## 使其更具可维护性

Vue 3 将带来更多可维护的源代码。 它不仅会使用 TypeScript ，而且许多软件包将被解耦，使所有内容更加模块化。



## 更多的原生支持

运行时内核也将与平台无关，使得 Vue 可以更容易地与任何平台（例如Web，iOS或Android）一起使用。



## 更易于开发使用

Observer 模块已被解压缩到自己的包中，允许您以新的方式使用它。

跟踪重新渲染的位置也会更容易。

改进对 TypeScript 的支持，允许在编辑器中进行高级的类型检查和有用的错误和警告。



### 实验性的 Hooks API

当我们需要在 Vue 中共享两个组件之间的行为时，我们通常使用 Mixins 。然而，Evan 正在尝试使用 Hooks API 来避免来自 Mixins 的一些问题，并且更适合使用惯用的 Vue 代码。



### 实验性的 Time Slicing 支持

当您有许多组件同时尝试重新渲染时，任何浏览器都可以开始变得很慢，从而使用户体验下降。

Evan展示了他如何尝试使用 Time Slicing，将 JS 的执行分解为几个部分，如果有用户交互需要处理，这些部分将提供给浏览器。



## 参考链接

[Vue.js 3.0 新特性预览](https://www.html.cn/archives/10052)

[Vue 3.0 官网](https://v3.vuejs.org/)

[一篇文章上手Vue3中新增的API](https://mp.weixin.qq.com/s?__biz=MzAwNDcyNjI3OA==&mid=2650846878&idx=1&sn=e1a2886412fe8fbd7668ef2fb81ef79a)

