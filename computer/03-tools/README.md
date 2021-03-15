# 工具

- 项目构建
  - webpack
  - glup
- 代码处理
  - 压缩合并：UglifyJS
  - 代码编译：Babel
- 开发测试
  - git/gitlab/github
  - vscode
  - vi/vim
  - charles
- 文档生成
  - gitbook



## 项目构建工具

### 1. 背景

#### Modular

- 命名空间冲突
- 管理项目依赖和版本
- 控制依赖的加载顺序
- 可维护性
- 可复用性

无模块化-->CommonJS规范-->AMD规范-->CMD规范-->ES6模块化

#### Framework

- React  ( jsx )
- Vue  ( .vue file )
- Angular ( Typescript )

#### Language

- ES6
- TypeScript
- Flow
- Scss/Less

### 2. 目标

- 代码转换：将Typescript, Es6, vue, react编译成浏览器可运行的JS，将Less编译成CSS
- 文件优化：压缩代码，合并图片
- 代码分割：提取多个页面的公共代码
- 异步加载：提升首屏速度，只加载与首屏相关的代码
- 模块合并
- 热更新，热替换
- 代码校验
- 自动发布
- More . . .  

### 3. 对比

- Grunt
- Gulp
- Fis3
- Webpack
- Rollup
- Parcel
- Bash

#### Grunt

- 任务执行者
- 灵活，只负责执行我们定义的任务
- 大量的可复用的插件封装好了常见的构建任务
- 集成度不高，需要写很多配置才可以使用

```javascript
module.exports = function(grunt) {
 grunt.initConfig({
   jshint: {
     files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
     options: {
       globals: {
         jQuery: true
       }
     }
   },
   watch: {
     files: ['<%= jshint.files %>'],
     tasks: ['jshint']
   }
 });
 grunt.loadNpmTasks('grunt-contrib-jshint');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.registerTask('default', ['jshint']);
};
```

#### Gulp

- 基于流的自动化构建工具，支持监听文件，读写文件
- 集成度不高，需要写很多配置

```javascript
//task配置
//js压缩,使用gulp jsmin启动
gulp.task('jsmin',function(){
 gulp.src(devJs) .pipe(uglify())
     .pipe(gulp.dest(distJs));
});
//less编译
gulp.task('less',function(){
 gulp.src(devLess)
     .pipe(less({
       outputStyle:'compressed'
     })).pipe(gulp.dest(distLess));
});
//css压缩
gulp.task('minifyCss',function(){
 gulp.src(devCss).pipe(minifyCss()).pipe(gulp.dest(distCss))
});
//监控改动并自动刷新
gulp.task('auto',function(){  gulp.watch(devJs,['jsmin']);  gulp.watch(devLess,['less']);
 gulp.watch(['dev']).on('change',browserSync.reload);
});
gulp.task('default',['jsmin','less','minifyCss','imgmin','tplmin','copyLib','server','auto']);
```

#### Fis3

- 读写文件
- 资源定位
- 文件缓存
- 文件编译
- 资源压缩
- 图片合并
- 配置简单，开箱即用
- 目前官方已经停止维护

```javascript
// 加 md5
fis.match('*.{js,css,png}', { useHash: true });
// 启用 fis-spriter-csssprites 插件
fis.match('::package', { spriter: fis.plugin('csssprites') });
// 对 CSS 进行图片合并
// 给匹配到的文件分配属性 `useSprite`
fis.match('*.css', { useSprite: true });
// fis-optimizer-uglify-js 插件进行压缩，已内置
fis.match('*.js', { optimizer: fis.plugin('uglify-js') });
// fis-optimizer-clean-css 插件进行压缩，已内置
fis.match('*.css', { optimizer: fis.plugin('clean-css')});
// fis-optimizer-png-compressor 插件进行压缩，已内置
fis.match('*.png', { optimizer: fis.plugin('png-compressor')});
```

#### Rollup

- Webpack 流行后的产品
- 生态不够完善
- 功能不如webpack强大
- Tree-shaking 

```javascript
export default {
 entry: 'src/scripts/main.js',
 dest: 'build/js/main.min.js',
 format: 'iife',
 sourceMap: 'inline',
 plugins: [
   resolve({
     jsnext: true,
     main: true,
     browser: true,
   }),
   commonjs(),
   eslint({
     exclude: [
       'src/styles/**',
     ]
   }),
   babel({  exclude: 'node_modules/**' }),
   replace({ ENV: JSON.stringify(process.env.NODE_ENV || 'development') }),
 ],
};
```

#### Parcel

一个号称极速零配置Web应用打包工具

![img](C:/develop/mybooks/front-end/04-tools/01-project/images/parcel.png)

#### Webpack

- 具有良好的生态和维护团队
- 针对很多业务场景提供了一站式解决方案
- 其他打包工具有的特性他都有
- ...



## 参考链接

[分享|Webpack 揭秘](https://docs.google.com/presentation/d/1X1ONpKuV0Bi0sU2Xems2rUufjTqp9CpB503uBCwE0U8/edit)

[知乎|JavaScript 模块化入门Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)

[知乎|JavaScript 模块化入门Ⅱ：模块打包构建](https://zhuanlan.zhihu.com/p/22945985)

