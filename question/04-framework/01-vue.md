## Vue

### vue

### 1. 详述Vue数据双向绑定原理

语法糖，dom监听+模型监听

数据挟持+发布者-订阅者模式实现。

数据挟持：

​	get方法，set方法。

对象更新：

​	重写Object.defineProperty() 中的get和set方法;

​	在get中收集依赖，在set中触发依赖。

数组更新：

​	重写了一组观察数组的原型方法，例如：push()，pop()，shift()等。手动调用$set更新数组值。

​	用一个拦截器覆盖Array.prototype。当使用Array原型上的方法操作数组时，执行的是拦截器对应的方法，因此，可以通过拦截器追踪到Array的变化。

​	在getter中收集依赖，在拦截器中触发依赖。



[这一次彻底搞懂Vue针对数组和双向绑定(MVVM)的处理方式- 掘金](https://juejin.im/post/5af665186fb9a07aa83ecde0)

[vue 的双向绑定原理及实现- 前端- 掘金](https://juejin.im/entry/5923973da22b9d005893805a)

[剖析Vue原理&实现双向绑定MVVM - 前端足迹- SegmentFault ...](https://segmentfault.com/a/1190000006599500)



### 2. 详述vue的diff算法

- 创建节点
- 删除节点
- 更新节点
  - 更新子节点
    - 创建子节点
    - 更新子节点
    - 移动子节点
    - 删除子节点

更新子节点遍历的优化策略：

- 新前与旧前
- 新后与旧后
- 新后与旧前
- 新前与旧后
- key-index索引表
- 循环遍历

参见笔记：Vue-虚拟Dom

### 3. 组件通信

#### props 和 $emit

props：单向数据流，完成父子组件的通信。

子=>父： this.$emit

#### `$attrs` 和 `$listeners`

上面这种组件通信的方式只适合直接的父子组件，也就是如果父组件A下面有子组件B，组件B下面有组件C，这时如果组件A直接想传递数据给组件C那就行不通了！ 只能是组件A通过 props 将数据传给组件B，然后组件B获取到组件A 传递过来的数据后再通过 props 将数据传给组件C。当然这种方式是非常复杂的，无关组件中的逻辑业务一种增多了，代码维护也没变得困难，再加上如果嵌套的层级越多逻辑也复杂，无关代码越多！

针对这样一个问题，`Vue 2.4` 提供了`$attrs` 和 `$listeners` 来实现能够直接让组件A传递消息给组件C。

#### eventBus

跨组件：可以使用eventBus。

#### v-model

#### $parent 和 $children

#### vuex 状态管理



[Vue 组件通信方式全面详解- 掘金](https://juejin.im/post/5c77c4ae518825407505e262)



### 4. props双向绑定

<https://juejin.im/entry/5843abb1a22b9d007a97854c>

<https://cn.vuejs.org/v2/guide/components-props.html>

起因：遇到报错

vue.runtime.js:593 [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "curr"

原因：所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。这意味着你不应该在一个子组件内部改变 prop。



### 5. 引入cdn资源

https://segmentfault.com/a/1190000015709430
减小打包体积，将公用的依赖放到cdn上，缓存一次就可以。

webpack配置项 externals：https://webpack.docschina.org/configuration/externals/

```js
module.exports = {
    module: {
        ...
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'alias': 'ObjName'
    },
    ....
}
```

alias 是项目内使用时的组件名称，ObjName 是某外部组件对外暴露的名称。

**在项目 js 中引入**

```js
import VueRouter from 'vue-router'
```

在模版文件中引入 cdn

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
    <!-- 正常的引入 cdn 资源即可 -->
    <script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
    <script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <!-- built files will be auto injected -->
  </body>
</html>
```



### 6. computed和watch的区别

- computed：计算属性，由data/props中的已知值，计算得到的一个新值。依赖其他数据的变化。

  生成一个惰性的watcher，只有在取值操作(getter触发)时收集依赖且计算值
  当有依赖变动时仅将 dirty 置为 true，不做计算操作
  当有取值操作时，根据自身标记 dirty 属性返回上一次计算结果/重新计算值

- watch：监听某个数据的变化，支持深度监听。

  生成一个watcher对象，在监视的属性每次变动时都会触发回调。

适用场景：

computed：一个数据受多个数据影响

watch：一个数据影响多个数据

### 7. Vue.nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

[Vue API-nextTick](https://cn.vuejs.org/v2/api/index.html#Vue-nextTick)





## 参考链接

<https://segmentfault.com/a/1190000015580896>

