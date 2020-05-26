# ES6 Module

> 2019-01-05 @wsl

## 1. 模块的概念

模块是自动运行在严格模式下并且没有办法退出运行的 JavaScript 代码。在模块顶部创建的变量不会自动添加到全局共享作用域，这个变量仅在模块的顶级作用域中存在，而且模块必须导出一些外部代码可以访问的元素，如变量或函数。模块也可以从其他模块导入绑定。

模块还有两个特性需要知道，首先，在模块的顶部，this 的值是 undefined；其次，模块不支持 HTML 风格的代码注释。



## 2. 导出的基本语法

可以用 export 关键字将一部分已发布的代码暴露给其他模块，可以将 export 放在任何变量、函数或类声明的前面，以将它们从模块导出。

除非用 default 关键字，否则不能用这个语法导出匿名函数或类。

不必总是导出声明，可以导出引用。任何未显式导出的变量、函数或类都是模块私有的，无法从模块外部访问。

```javascript
// 导出变量
export var color = 'red';

// 导出函数
export function add(num1, num2) {
  return num1 + num2;
}

function multi(num1, num2) {
  return num1 * num2;
}

// 导出multi函数的引用
export multi;
```



## 3. 导入的基本语法

通过 import 关键字导入另一个模块中导出的功能。语法：

```javascript
import { identifier1, identifier2 } from "./example.js";
```

当从模块中导入一个绑定时，它就好像使用 const 定义的一样。你无法定义另一个同名变量（包括导入另一个同名绑定），也无法在 import 语句前使用标识符或改变绑定的值。

```javascript
// 导入单个绑定
import { sum } from "./mymath.js";

// 导入多个绑定
import { sum, multi } from "./mymath.js";

// 导入整个模块，加载到 mymath 对象中
// 这种导入格式被称作命名空间导入
import * as mymath from "./mymath.js";
```

不管在 import 语句中把一个模块写了多少次，该模块只执行一次。导入模块的代码执行后，实例化过的模块被保存在内存中，只要另一个 import 语句引用它就可以重复使用它。例如，同一个应用程序的不同模块都从 example.js 导入绑定，那么这些模块将使用相同的模块实例。

> export 和 import 的一个重要限制是，它们必须在其他语句和函数之外使用。
>
> export 语句不允许出现在 if 语句中，不能有条件导出或以任何形式动态导出。模块语法存在的一个原因是要让 JavaScript 引擎静态地确定哪些可以导出。因此，只能在模块顶部使用 export。
>
> 同样，不能在一条语句中使用 import，只能在顶部使用它。
>
> export 和 import 关键字被设计成静态的，不能动态地导入或导出绑定。

ECMAScript6 的 import 语句为变量、函数和类创建的是只读绑定，而不是像正常变量一样简单地引用原始绑定。



## 4. 导出和导入时重命名

可以使用 as 关键字来对导出、导入的元素重命名。

```javascript
function sum(num1, num2) {
    return num1 + num2;
}
export { sum as add};
```

这里，sum是本地名称，add是导出时使用的名称。其他模块导入这个函数时，需要使用add这个名称。

```javascript
import { add as sum } from "./example.js"
console.log(typeof add); // undefined
console.log(sum(1, 2)); // 3
```

这段代码导入add函数时，使用sum重命名，改变了函数的本地名称。



## 5. 模块的默认值

模块的默认值指的是通过 default 关键字指定的单个变量、函数或类，只能为每个模块设置一个默认的导出值，导出时多次使用default关键字是一个语法错误。

1）导出默认值

```javascript
// 方法一：直接导出默认值
export default function(num1, num2) {
    return num1 + num2;
}

// 方法二：添加默认导出值的标识符
function sum(num1, num2) {
    return num1 + num2;
}

export default sum;

// 方法三：使用重命名语法
function sum(num1, num2) {
    return num1 + num2;
}

export { sum as default };
```



2）导入默认值

```javascript
// 导入默认值
import sum from "./example.js";

// 一句话导入所有导出的绑定
impot sum, { color } from "./example.js"; // sum: 默认值，color：非默认值

// 可以使用重命名语法
import { default as sum, color } from "./example.js";
```

用逗号将默认的本地名称与大括号包裹的非默认值分隔开，在import语句中，默认值必须排在非默认值之前



## 6. 重新导出一个绑定

```javascript
// 在example.js模块中查找sum声明，然后将其导出。
export { sum } from "./example.js";

// 在example.js模块中查找sum声明，然后再用add这个名字将其导出。
export { sum as add } from "./example.js";

// 导出模块中的所有值，包括默认导出值和所有命名导出值。可能会影响当前模块导出的内容，如默认导出。
export * from "./example.js";
```



## 7. 无绑定导入

某些模块可能不导出任何东西，只修改全局作用域的对象。可以使用简化的导入操作来执行模块代码，而且不导入任何的绑定。

```javascript
import "./example.js";
```



## 8. 动态import

关键字import可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 `promise`。

```js
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
```

这种使用方式也支持 `await` 关键字。

```js
let module = await import('/modules/my-module.js');
```



## 9. 加载模块

在Web浏览器中使用模块，脚本加载方法：

- 在`<script>` 元素中通过src属性指定一个加载代码的地址来加载JavaScript代码文件。
- 将JavaScript代码内嵌到没有src属性的`<script>`元素中。
- 通过 Web Worker 或 Service Worker 的方法加载并执行JavaScript代码文件。

### 在`<script>`中使用模块

`<script>`元素的默认行为是将JavaScript文件作为脚本加载，而非作为模块加载。将 type 属性设置为 "module" 可以让浏览器将所有内联代码或包含在 src 指定的文件中的代码按照模块而非脚本的方法加载。

```html
<script type="module" src="./module.js"></script>
```

`<script>`元素的 type 属性为 "module" 时，自动应用 defer 属性。模块文件按照顺序下载并解析，在文档完全被解析之后，模块按照它们出现在HTML文件中的顺序依次执行。 

当`<script>`元素的 async 属性应用在模块上时，会让模块以类似脚本的方式执行。唯一的区别是，在模块执行前，模块中的所有导入资源都必须下载下来。这可以确保只有当模块执行所需的所有资源都下载完成后才执行模块，但不能保证的是模块的执行时机。

### 将模块作为Worker加载

为了支持加载模块，Worker 的构造函数添加了第二个参数，为一个对象，其 type 属性默认值为 "script"，可以将其设置为 "module" 来加载模块文件。

```javascript
let worker = new Worker("module.js", { type: "module" });
```

### 模块说明符

浏览器要求模块说明符具有以下几种格式之一：

- 以 / 开头的解析为从根目录开始。
- 以 ./ 开头的解析为从当前目录开始。
- 以 ../ 开头的解析为从父目录开始。
- URL 格式。



## 参考链接

[MDN | import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)