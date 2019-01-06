# 13 用模块封装代码

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

