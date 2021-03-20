# TypeScript

## 简介

TypeScript是一种开源的编程语言，该语言项目由微软进行维护和管理。TypeScript不仅包含JavaScript的语法，而且还提供了静态类型检查以及使用看起来像基于类的面向对象编程语法操作 Prototype。



## 语法

### 基础类型

- boolean
- number
- string
- 数组：`type[]` 或 `Array<type>`
- 元组：[type1, type2, ...]
  `let x: [string, number];x = ['hello', 10]`
- 枚举：enum
- any
- void
- undefined
- null
- never
- object

### 泛型

软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据。

使返回值的类型与传入参数的类型是相同的。 这里，我们使用了类型变量，它是一种特殊的变量，只用于表示类型而不是值。

```ts
function identity<T>(arg: T): T {
    return arg;
}

// 使用
let output1 = identity<string>("myString");  // 指定T的类型
let output2 = identity("myString");  // 利用类型推论，编译器会自动确认T的类型
```

泛型变量：

```ts
function identity<T>(arg: T): T {
    return arg;
}

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```



## 参考链接

[TypeScript - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/TypeScript)

[TypeScript中文网· TypeScript——JavaScript的超集](http://www.tslang.cn/)

