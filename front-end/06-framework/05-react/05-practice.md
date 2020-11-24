# 开发

## 搭建环境

### 创建 React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

参见：[Create React App 中文文档](https://www.html.cn/create-react-app/docs/getting-started/)



### 目录结构

```shell
├─public #公共资源文件
|   ├─index.html #项目html
|   └─favicon.ico, manifest.json...
├─src #项目源码
|   ├─index.js #项目入口
|   ├─App.js
|   ├─assets #资源文件
|   ├─components #组件
|   ├─layouts #布局
|   ├─route #路由管理
|   ├─redux #状态管理
|   |   ├─store.js
|   |   ├─actions
|   |   └─reducers
|   ├─utils #工具
|   ├─services #请求
|   └─pages #页面
├─package.json
├─package-lock.json
└─README.md
```



### 添加lint检查

- Eslint：js检查
  `npm i eslint -D`：安装eslint包
  `./node-modules/.bin/eslint init` ：生成eslint配置文件，安装相关依赖
  可以根据项目需求修改`.eslintrc.js`
- Stylelint：css、类css检查
  `npm i -D stylelint stylelint-config-standard `：安装相关依赖
  创建`.stylelintrc.js`，进行相关配置
- Prettier：代码规范化
- GitHooks
  `npm i husky lint-staged -D`：安装相关依赖

参见：<https://www.cnblogs.com/jserhub/p/11924289.html>



### webpack 配置

create-react-app 将 webpack 的配置隐藏起来了，没办法直接修改这个 webpack，可以使用 react-app-rewired + customized-cra 修改 react 中的配置。

## 开发者工具

在 [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 或者 [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) 中安装扩展 React Devtools 可以让你在浏览器开发者工具中查看 React 的组件树。

## Demo: 井字棋

参见：[入门教程: 认识 React](https://zh-hans.reactjs.org/tutorial/tutorial.html)

目前已实现基础功能。改进功能实现了 1。其他后续实现。



## 参考链接

[React 官方文档](https://react.docschina.org/docs/hello-world.html)

[带你了解规范化-eslint、stylelint、prettier、git hooks - CSDN](https://blog.csdn.net/qq_32090185/article/details/107911593)

[ESLint + Prettier + husky + lint-staged 规范统一前端代码风格](https://www.cnblogs.com/jserhub/p/11924289.html)

[react-app-rewired 和customized-cra - Baurine's Blog](https://baurine.netlify.app/2020/05/02/react-app-rewired-customize-cra/)

[使用react-app-rewired2.x添加webpack配置](https://www.cnblogs.com/zyl-Tara/p/10635033.html)

