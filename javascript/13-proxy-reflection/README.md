# 代理(Proxy)和反射(Reflection)API

代理 Proxy 是一种可以拦截并改变底层JavaScript引擎操作的包装器，在ES6中通过它暴露内部运作的对象。

## 代理和反射

调用 new Proxy() 可创建代替其他目标（target）对象的代理。

代理可以拦截JavaScript引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应特定操作的陷阱函数。

反射API以Reflect对象的形式出现，每个代理陷阱对应一个命名和参数都相同的Reflect方法。

| 代理陷阱                 | 覆写的特性                                                   | 默认特性                           |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------- |
| get                      | 读取一个属性值                                               | Reflect.get()                      |
| set                      | 写入一个属性                                                 | Reflect.set()                      |
| has                      | in操作符                                                     | Reflect.has()                      |
| deleteProperty           | delete操作符                                                 | Reflect.deleteProperty()           |
| getPrototypeOf           | Object.getPrototypeOf()                                      | Reflect.getPrototypeOf()           |
| setPrototypeOf           | Object.setPrototypeOf()                                      | Reflect.setPrototypeOf()           |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()                            | Reflect.getOwnPropertyDescriptor() |
| defineProperty           | Object.defineProperty()                                      | Reflect.delfineProperty()          |
| ownKeys                  | Object.keys()<br />Object.getOwnPropertyNames()<br />Object.getOwnPropertySymbols() | Reflect.ownKeys()                  |
| apply                    | 调用一个函数                                                 | Reflect.apply()                    |
| construct                | 用new调用一个函数                                            | Reflect.construct()                |

每个陷阱覆写JavaScript对象的一些内建特性，可以用它们拦截并修改这些特性。如果仍需使用内建特性，可以使用相应的反射方法。

## 创建代理

使用[Proxy构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)创建代理。

语法：

```js
const proxy = new Proxy(target, handler)
```

参数：

- target
  要使用 Proxy 包装的目标对象
- handler
  处理程序，一个或多个陷阱的对象。在代理中，除了专门为操作定义的陷阱外，其余操作均使用默认特性。

### 简单的转发代理

不使用任何陷阱的处理程序等价于简单的转发代理，示例：

```js
let target = {};
let proxy = new Proxy(target, {});

proxy.name = 'hello';
console.log(proxy.name, target.name); // hello hello

target.name = 'john';
console.log(proxy.name, target.name); // john john
```

上面的代理将所有的操作直接转发到目标，代理只是简单地将操作转发给目标，不会存储对应属性。因此 proxy.name 和 target.name 引用的都是 target.name。

### 使用set陷阱验证属性

可以定义一个[set陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)来覆写设置值的默认特性。

语法：

```js
const p = new Proxy(target, {
    set: function(trapTarget, key, value, receiver) {}
});
```

参数：

- trapTarget
  目标对象
- key
  要写入的属性键（string或symbol类型）
- value
  被写入的属性值
- receiver
  操作发生的对象（通常是代理）

示例：









## 参考链接

[Proxy - MDN Web Docs - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

