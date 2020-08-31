# 在CSS中使用JS变量

Vue 3.0出了新特性，可以在CSS中使用JS变量。

## 实践

1、首先我们先创建个支持vue3的vite项目：

```shell
npm init vite-app vars
```

2、进入到该文件夹安装依赖

```shell
cd vars && npm i
```

3、创建组件

```vue
<template>
    <h1>{{ color }}</h1>
</template>

<script>
export default {
    data() {
        return {
            // 变量声明
            color: 'red',
            opacity: 0,
        };
    },
    mounted() {
        setInterval(() => {
            this.opacity >= 1 && (this.opacity = 0);
            this.opacity += 0.2;
        }, 300);
    },
};
</script>

<style vars="{ color, opacity }">
h1 {
    /* 在css中使用 */
    color: var(--color);
    /* 响应式数据 */
    opacity: var(--opacity);
}
</style>
```

生成的html：

![1598843830027](.\images\css-var-html.png)

4、变量名称支持中文名。

```
// js
'透明度': 0
// css
opacity: var(--透明度);
```

5、可以放在scoped的`<style>` 标签，

```vue
<style vars="{ color }" scoped>
h1 {
    opacity: var(--opacity);
}
</style>
```

生成的html：

```html
<h1 data-v-0f9050b1="" style="--0f9050b1-opacity:0.2;">red</h1>
```

> 如果想要全局生效，则需要在`--`后加上`global:`，如 `color: var(--global:color);`。
>
> 亲测这种写法实际上并没有生成--color，这个看后续vue3.0的实现，目前vue3.0功能还未稳定。



## 兼容性

CSS变量的兼容性：

![1598854618579](.\images\css-var-caniuse.png)



## 参考链接

[Vue超好玩的新特性：在CSS中使用JS变量](https://segmentfault.com/a/1190000023479851)

