# Vue项目搭建

> 2020-03-05 @wsl

## 前言

技术栈：

webpack4



## 项目搭建

1、初始化项目

```shell
npm init
```

2、安装webpack四件套

```shell
npm install vue vue-loader webpack webpack-cli --save-dev
```

3、创建相应文件

```
vue-project
  |--build
      |--webpack.prod.js
      |--webpack.dev.js
      |--webpack.base.js
  |--public
  	  |--index.html
  |--src
      |--main.js
      |--App.vue
```

webpack.base.js

```javascript
// webpack.base.js
// 存放 dev 和 prod 通用配置
const webpack = require('webpack');
const path = require("path");

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: { // 入口
        app: './src/main.js',
    },
    resolve: { // 解析
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        },
    },
    module: { // 模块
        rules: []
    },
    plugins: [], // 插件
};
```

webpack.dev.js

```javascript
// webpack.dev.js
// 存放 dev 配置
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: { // 开发服务器
        contentBase: '../dist'
    },
    output: { // 输出
        filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
        path: path.resolve(__dirname, 'public')
    },
});
```

webpack.prod.js

```javascript
// webpack.prod.js
// 存放 prod 配置
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].js', // 若文件内容无变化，则contenthash 名称不变
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [],
});
```



## 参考链接

[官方|webpack指南](https://webpack.docschina.org/concepts/)

[Webpack4 搭建Vue 项目- 掘金](https://juejin.im/post/5b7d350951882542f3278b11)

[从零开始搭建脚手架- 掘金](https://juejin.im/post/5af6f9bd6fb9a07ac90d49eb)

[从零开始Webpack 4 配置Vue项目- 张琳琳个人网站](https://zhanglinlin.site/2019/06/27/vue-init/)

[Webpack4.x 初步配置vue 项目| Vue.js 技术论坛 - LearnKu 社区](https://learnku.com/vuejs/t/23365)

