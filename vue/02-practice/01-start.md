# Vue项目搭建

> 2020-03-05 @wsl

## 前言

技术栈：

webpack4 工程化编译

babel7 代码编译

vue 开发框架

vue-router 路由跳转



## 项目搭建

### 1、初始化项目

```shell
npm init
```

### 2、安装webpack四件套

```shell
npm i webpack webpack-cli webpack-dev-server webpack-merge --save-dev
```

**webpack**：前端打包工具
**webpack-cli**：在webpack 3中，webpack和CLI都在同一个包中，但在第4版中，两者被分开了，因此这里必须安装CLI
**webpack-dev-server**：用于起一个本地服务器
**webpack-merge**：用于合并webpack基础配置项

### 3、创建相应文件

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

webpack4 增加了 mode 属性，设置为 development / production,以下是默认配置

```
development:

process.env.NODE_ENV 的值设为 development
默认开启以下插件，充分利用了持久化缓存。参考基于 webpack 的持久化缓存方案

NamedChunksPlugin ：以名称固化 chunk id
NamedModulesPlugin ：以名称固化 module id


production:

process.env.NODE_ENV 的值设为 production
默认开启以下插件，其中 SideEffectsFlagPlugin 和 UglifyJsPlugin 用于 tree-shaking

FlagDependencyUsagePlugin ：编译时标记依赖
FlagIncludedChunksPlugin ：标记子chunks，防子chunks多次加载
ModuleConcatenationPlugin ：作用域提升(scope hosting),预编译功能,提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
NoEmitOnErrorsPlugin ：在输出阶段时，遇到编译错误跳过
OccurrenceOrderPlugin ：给经常使用的ids更短的值
SideEffectsFlagPlugin ：识别 package.json 或者 module.rules 的 sideEffects 标志（纯的 ES2015 模块)，安全地删除未用到的 export 导出
UglifyJsPlugin ：删除未引用代码，并压缩
```

main.js

```javascript
import Vue from 'vue';
import App from './App';

new Vue({
    el: '#app',
    render: h => h(App),
});
```

App.vue

```vue
<template>
    <div class="app">
        hello world
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>
```

index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <title>TRY MORE</title>
</head>
<body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>
</html>
```

### 4、安装vue 核心解析插件

```shell
npm i vue vue-router --save
npm i vue-loader vue-template-compiler --save-dev
```

由于 vue 的解析在 dev 和 prod 中均需使用，因此归入基本配置 base

```javascript
// webpack.base.js
//...
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};
```

### 5、安装 html 模板解析插件

```shell
npm i html-webpack-plugin --save-dev
```



```javascript
// webpack.dev.js

// ...
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ]
};
```

### 6、创建 npm 命令

```json
"scripts": {
	"start": "webpack-dev-server --hot --open --config build/webpack.dev.js",
    "dev": "npm run start",
    "build": "webpack --config build/webpack.prod.js"
},
```

--hot 模块热替换

--open 开启本地服务器

此时 npm start，项目可正常运行

## 功能拓展

### dev环境配置

添加报错处理：

添加 friendly-errors-webpack-plugin, portfinder, node-notifier

```shell
npm i friendly-errors-webpack-plugin portfinder node-notifier -D
```

```javascript
// webpack.dev.js
// 存放 dev 配置
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function createNotifierCallback() {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            error,
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || ''
        });
    };
}

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: { // 开发服务器
        quiet: true,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        port: 8080,
        hot: true,
        open: 'http://localhost:8080/',
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
            },
        },
    },
    output: { // 输出
        filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
        path: path.resolve(__dirname, '../dist')
    },
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [`Your application is running here: http://localhost:${port}`]
                    },
                    onErrors: createNotifierCallback()
                })
            );
            resolve(devWebpackConfig);
        }
    });
});
```

### 添加loader

#### css loader

CSS 基础 loader

```
npm i css-loader style-loader -D
```

CSS 前处理 less 两件套

```shell
npm i less less-loader -D
```

CSS 前处理 sass 两件套

```shell
npm i node-sass sass-loader -D
```

CSS 后处理 postcss 两件套

```shell
npm i postcss-loader autoprefixer -D
```

并在根文件夹创建 postcss.config.js 文件

```javascript
// postcss.config.js
// 自动添加css兼容属性
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

安装以上依赖，在 base 文件中加入一下 loader 代码

```javascript
// webpack.base.js

// ...省略号
rules: [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader',
    ],
  },
]
```

按需引入，可以只引入其中几种loader。



#### html loader

```shell
npm i html-loader -D
```

```javascript
// webpack.base.js
// ...
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            },
        ],
    },
};
```



#### babel

```shell
npm i @babel/core @babel/preset-env babel-loader -D
```

```javascript
// webpack.base.js
// ...
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
```



#### 图片，文字loader

解析图片，字体等可以用 file-loader 或 url-loader。

```shell
npm i url-loader -D
```

```javascript
// webpack.base.js
// ...
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url-loader',
                options: {
                	limit: 5000,
                    name: 'imgs/[name].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                },
            },
        ],
    },
};
```



### 添加 vue-router

```shell
npm i vue-router -S
```

src文件夹下添加 router.js 文件（或 router/index.js）

```javascript
// router.js

import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/views/HelloWorld';

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
        },
    ],
});
```

App.vue 添加 router-view 标签

```vue
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>
```

main.js 添加router

```javascript
// main.js
import Vue from 'vue';
import App from './App';
import router from './router';

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
```

### 添加vuex

安装vuex插件

```shell
npm i vuex -S
```

src文件夹下添加store.js （或store/index.js）

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import request from '../api/request';
import { utilsIsXiangkan } from '../utils/utils';

const mutations = {
    setGreeting(state, payload) {
        state.greeting = payload.greeting;
    },
    // ...
};

const actions = {
    getPoem({ state }, options) {
        request.post('/activity/springFestival/poem', {
            greeting: state.greeting,
        })
            .then((data) => {
                if (data.status === 200 && data.data.status === 0 && data.data.data.length) {
                    if (typeof options.success === 'function') {
                        options.success(data);
                    }
                } else if (typeof options.error === 'function') {
                    options.error(data);
                }
            })
            .catch(() => {
                if (typeof options.error === 'function') {
                    options.error();
                }
            });
    },
    // ...
};

const state = {
    greeting: '',
	// ...
};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
});
```

main.js引入store

```js
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
```

## 打包优化

### 解决每次打包，dist文件未清除

- 安装 clean-webpack-plugin 插件

```javascript
// webpack.prod.js

// 打包之前清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// ...省略号
plugins: [
  new CleanWebpackPlugin(['dist/*'], {
    root: path.resolve(__dirname, '../')
  }),
]
```

### 添加stylelint

1. 安装 stylelint相关包

```shell
npm i -D stylelint stylelint-config-standard
```

后者 `stylelint-config-stand` 不是必需的，也可以自己根据文档从零开始配置规则，或者用第三方如 github 的规则 `stylelint-config-primer` 。

2. package.json添加npm scripts

```json
{
    // ...
    "scripts": {
        // ...
        "stylelint": "stylelint src/**/*.css src/**/*.vue",
        "stylelintfix": "stylelint src/**/*.css src/**/*.vue --fix"
    },
}
```

3. 根目录下添加stylelint.config.js

```js
// https://stylelint.io/user-guide/configuration/
// https://github.com/stylelint/stylelint-config-standard

module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'function-url-quotes': 'never',
        'string-quotes': 'double',
        'selector-max-specificity': null,
        'color-named': 'never',
        'color-no-hex': null,
        'no-duplicate-selectors': null,
        'font-family-no-missing-generic-family-keyword': null,
        indentation: 4,
    },
};
```

### 添加eslint

1. 全局安装最新的eslint

```shell
npm i -g eslint@latest
eslint --init
```

2. 本地安装eslint

```shell
npm i -D eslint
```

3. `.eslintrc.js`文件添加配置，下面是参考，采用airbnb规范。

```javascript
module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended`
    // or `plugin:vue/recommended` for stricter rules.
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never',
            },
        ],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state', // for vuex state
                    'acc', // for reduce accumulators
                    'e', // for e.returnvalue
                    'robj', // for reassign object
                ],
            },
        ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js'],
            },
        ],
        'vue/html-indent': ['error', 4],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 1,
        'arrow-body-style': 1,
        indent: ['error', 4],
        'no-console': 'off',
    },
};
```

4. 安装相关依赖

```shell
npm i eslint-plugin-vue babel-eslint @vue/cli-service @vue/cli-plugin-eslint @vue/eslint-config-airbnb -D
```

5. package.json 添加 scripts

```json
{
    // ...
    "scripts": {
        // ...
        "lint": "vue-cli-service lint"
    },
}
```

#### 不依赖vue-cli 3.0，安装eslint

安装依赖

```shell
npm i babel-eslint eslint-config-airbnb-base eslint-friendly-formatter eslint-import-resolver-webpack eslint-loader eslint-plugin-import eslint-plugin-vue -D
```

package.json

```json
{
    // ...
    "scripts": {
        // ...
        "lint": "npm run eslint && npm run stylelint",
        "eslint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
        "eslintfix": "eslint --ext .js,.vue src test/unit test/e2e/specs --fix"
    },
}
```

.eslintrc.js

```js
// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: [
        'plugin:vue/strongly-recommended',
        'airbnb-base',
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        "indent": ["error", 4],
        "vue/html-indent": ["error", 4],
        // don't require .vue extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never'
            }
        ],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state', // for vuex state
                    'acc', // for reduce accumulators
                    'e' // for e.returnvalue
                ]
            }
        ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js']
            }
        ],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 1,
        'arrow-body-style': 1,
        "ignoreTemplateLiterals": true
    }
}
```

#### 如何忽略eslint

某些场景想要忽略eslint，可以通过如下方案忽略：

- 直接忽略整个文件、文件夹：添加`.eslintignore`文件，在里面添加想要忽略的文件or文件夹

  ```
  /build/
  /config/
  /*.js
  /docs
  /deploy
  ```

- 忽略下一行

  ```js
  // eslint-disable-next-line no-bitwise
  ```

  

- 忽略整个文件

  ```html
  <!-- eslint-disable vue/no-use-v-if-with-v-for -->
  ```

  ```js
  /* eslint-disable no-param-reassign */
  ```

### 添加gitHooks

如果安装了`@vue/cli-service` ，也会安装 [`yorkie`](https://github.com/yyx990803/yorkie)，它会让你在 `package.json` 的 `gitHooks` 字段中方便地指定 Git hook：

```
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  }
}
```

[`yorkie`](https://github.com/yyx990803/yorkie)是尤大fork自[`husky`](https://github.com/typicode/husky)，内置到了`@vue/cli`中。

#### 引入依赖添加

安装 husky依赖

```shell
npm i -D husky
```

package.json添加配置

```json
{
    // ...
	"husky": {
    	"hooks": {
      		"pre-commit": "npm run lint"
    	}
  	},
}
```



## 附录

### 关于安装依赖

**有哪些依赖**

1.    dependencies：应用能够正常运行所依赖的包。这种 dependencies 是最常见的，用户在使用 npm install 安装你的包时会自动安装这些依赖。
2.    devDependencies：开发应用时所依赖的工具包。通常是一些开发、测试、打包工具，例如 webpack、ESLint、Mocha。应用正常运行并不依赖于这些包，用户在使用 npm install 安装你的包时也不会安装这些依赖。
3.    peerDependencies：应用运行依赖的宿主包。最典型的就是插件，例如各种 jQuery 插件，这些插件本身不包含 jQeury，需要外部提供。用户使用 npm 1 或 2 时会自动安装这种依赖，npm 3 不会自动安装，会提示用户安装。
4.    bundledDependencies：发布包时需要打包的依赖，似乎很少见。
5.    optionalDependencies：可选的依赖包。此种依赖不是程序运行所必须的，但是安装后可能会有新功能，例如一个图片解码库，安装了 optionalDependencies 后会支持更多的格式。

**如何安装依赖**

在使用npm install 安装模块或插件的时候，有两种命令把他们写入到 package.json 文件里面去，他们是：

`-D | --save-dev` 将包记录到`"devDependencies"`中

`-S | --save` 将包记录到`"dependencies"`中

两者的区别即是否会在生产环境中被使用。若在生产环境中需要用到，则记录到dependencies中，反之则记录到devDependencies中。



### 填坑

#### dev环境配置了报错处理后，报错未正常展示

查看配置，应该是没问题的，依赖也已经安装。

排查定位到notifier.notify() 这个方法未正常调用。查看node-notifier包的相关信息：[npm包](https://www.npmjs.com/package/node-notifier)，[GitHub](https://github.com/mikaelbr/node-notifier)。

notifier.notify()方法可以传一个回调，打印发现报错：

```shell
notifier Error: not found: notify-send
```

原来是这个方法需要调用notify-send，目标是桌面通知。需要系统支持。

参考：[Notify-send - Alexey Vaskovsky](http://vaskovsky.net/notify-send/linux.html)

包简介也有写Requirements：

- **macOS**: >= 10.8 for native notifications, or Growl if earlier.
- **Linux**: `notify-osd` or `libnotify-bin` installed (Ubuntu should have this by default)
- **Windows**: >= 8, or task bar balloons for Windows < 8. Growl as fallback. Growl takes precedence over Windows balloons.
- **General Fallback**: Growl

so.....感觉没必要，就直接把error打印出来就好了。

解决方案：添加 console.log(error);



## 参考链接

[官方|webpack指南](https://webpack.docschina.org/concepts/)

[Webpack4 搭建Vue 项目- 掘金](https://juejin.im/post/5b7d350951882542f3278b11)

[从零开始搭建脚手架- 掘金](https://juejin.im/post/5af6f9bd6fb9a07ac90d49eb)

[从零开始Webpack 4 配置Vue项目- 张琳琳个人网站](https://zhanglinlin.site/2019/06/27/vue-init/)

[Webpack4.x 初步配置vue 项目|实例](https://learnku.com/vuejs/t/23365)

[使用 Vue2.x + webpack4.x 从零开始一步步搭建项目框架](https://blog.csdn.net/Dandelion_drq/article/details/83623603)

[分析vue-cli@2.9.3 搭建的webpack项目工程- 掘金](https://juejin.im/post/5b1df3d76fb9a01e6c0b439b)

[如何为你的 Vue 项目添加配置 Stylelint](https://juejin.im/post/5c31c9a16fb9a049f8197000)

[记为vue添加eslint过程，采用airbnb规范- 知乎](https://zhuanlan.zhihu.com/p/74887917)

[Configuring ESLint - ESLint中文](https://cn.eslint.org/docs/user-guide/configuring)
[VsCode保存时自动修复Eslint错误| 前端进阶积累 - 博客](http://obkoro1.com/web_accumulate/accumulate/tool/Eslint自动修复格式错误.html)

[记一次gitHook带来的思考🤔 - 掘金](https://juejin.im/post/5cade280f265da035d0c63fb)