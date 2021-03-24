# 整体流程

## 1. 目录结构

Vue.js的目录结构如下：

```bash
├--scripts				# 与构建相关的脚本和配置文件
├--dist					# 构建后的文件
├--flow					# Flow 的类型声明
├--packages				# vue-server-renderer和vue-template-compiler，作为单独的npm包发布
├--test					# 所有的测试代码
├--src					# 源代码
|   ├--compiler			# 与模板编译相关的代码
|   ├--core				# 通用的、与平台无关的运行时代码
|   |   ├--obeserver	# 实现变化侦测的代码
|   |   ├--vdom			# 实现虚拟Dom的代码
|   |   ├--instance		# Vue.js实例的构造函数和原型方法
|   |   ├--global-api	# 全局API的代码
|   |   └--components	# 通用的抽象组件
|   ├--server			# 与服务端渲染相关的代码
|   ├--platforms		# 特定平台的代码
|   ├--sfc				# 单文件组件（*.vue文件）解析逻辑
|   └--shared			# 整个项目的公用工具代码
└--types				# TypeScript类型定义
    └--test				# 类型定义测试
```

## 2. 架构设计

Vue.js整体分为三个部分：核心代码、跨平台相关和公用工具函数。


# 参考文档

《深入浅出Vue.js》

官方文档：<https://cn.vuejs.org/v2/guide/index.html>

推荐博客：<https://github.com/DDFE/DDFE-blog> 

Vue.js技术揭秘：<https://ustbhuangyi.github.io/vue-analysis/>

vue-router：<https://router.vuejs.org/zh-cn/>

vuex：<https://vuex.vuejs.org/zh-cn/>

脚手架vue-cli：<https://github.com/vuejs/vue-cli/tree/master>

nuxt.js： <https://zh.nuxtjs.org/>

VuePress主题：<https://vuepress.vuejs.org/zh/guide/>
