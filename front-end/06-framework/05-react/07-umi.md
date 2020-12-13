# UmiJS

## 简介

是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。



## 基础

### 目录结构

一个基础的 Umi 项目大致是这样的，

```
.
├── package.json
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── .umi
    ├── layouts/index.tsx
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts
```



## 进阶

### 按需加载

**常见使用场景**：组件体积太大，不适合直接计入 bundle 中，以免影响首屏加载速度。

按需加载功能默认是关闭的，需要在使用之前先通过配置开启，

```js
export default {
  dynamicImport: {},
}
```

使用按需加载：首先封装一个异步组件，通过dynamic函数。然后在需要使用异步组件的位置正常使用即可。

示例：

```js
import { dynamic } from 'umi';
export default dynamic({
  loader: async function() {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
    const { default: HugeA } = await import(/* webpackChunkName: "external_A" */ './HugeA');
    return HugeA;
  },
});
```

使用：

```js
import React from 'react';
import AsyncHugeA from './AsyncHugeA';
// 像使用普通组件一样即可
// dynamic 为你做:
// 1. 异步加载该模块的 bundle
// 2. 加载期间 显示 loading（可定制）
// 3. 异步组件加载完毕后，显示异步组件
export default () => {
  return <AsyncHugeA />;
}
```



## 参考链接

[官方Doc](https://umijs.org/zh-CN/docs)

