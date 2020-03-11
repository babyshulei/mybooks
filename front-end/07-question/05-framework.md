# 框架

#### 详述Vue双向绑定原理

语法糖，dom监听+模型监听

数据挟持+发布者-订阅者模式实现。

数据挟持：

​	get方法，set方法。

对象更新：重写Object.defineProperty() 中的get和set方法;

数组更新：重写了一组观察数组的原型方法，例如：push()，pop()，shift()等。手动调用$set更新数组值。



[这一次彻底搞懂Vue针对数组和双向绑定(MVVM)的处理方式- 掘金](https://juejin.im/post/5af665186fb9a07aa83ecde0)



## 参考链接

<https://segmentfault.com/a/1190000015580896>