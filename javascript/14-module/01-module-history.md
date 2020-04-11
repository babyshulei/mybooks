# 前端模块化演进

- 命名空间冲突
- 管理项目依赖和版本
- 控制依赖的加载顺序
- 可维护性
- 可复用性

无模块化-->CommonJS规范-->AMD规范-->CMD规范-->ES6模块化

## CommonJS

```javascript
// CommonJS
const moduleA = require('./moduleA');
module.exports = moduleA.someFunc;
```

CommonJS 可复用于Nodejs环境，方便做同构应用，无法直接运行在浏览器上，必须通过工具转换成ES5

CommonJS 采用同步的方式加载模块，在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，**CommonJS不适合浏览器端模块加载**，更合理的方案是使用异步加载，比如下边AMD规范。

## AMD

```js
// AMD API
require([module], callback)
define(id, [depends], callback)
require.config()
```

通过define来**定义**一个模块，然后使用require来**加载**一个模块, 使用require.config()指定引用路径。

```javascript
//AMD
define('module', ['dep'], dep => {
	return exports;
});
require(['module'], module => {
 	// do Somethind
});
```

AMD 采用异步的方式加载依赖，实现AMD的代表是 requirejs。

AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块。要提前加载所有的依赖，然后才可以使用，而不是需要使用时再加载。

## CMD

```javascript
// CMD
define(function(require, exports, module) {
 	let a = require('./a');
 	a.doSomething();
 	let b = require('./b');
 	b.doSomething();
});
```

CMD，异步加载模块，推崇就近依赖，只有在用到某个模块的时候再去require。对应 SeaJS。

## ES6 module

```javascript
// ES6 module
import { readFile } from 'fs'
import React from 'react'
export function hello() {}
export default { }
```

ES6 模块，ECMA 提出的JS模块规范，将来会成为主流。



## 参考链接

[AMD、CMD、CommonJs、ES6的对比-CSDN](https://blog.csdn.net/tangxiujiang/article/details/81104174)

[掘金|这一次，我要弄懂javascript的模块化](https://juejin.im/post/5b4420e7f265da0f4b7a7b27)

[segmentfault|JavaScript模块化开发的演进历程](https://segmentfault.com/a/1190000011081338)

