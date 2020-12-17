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
  用于接收属性的对象（代理的目标对象）
- key
  要写入的属性键（string或symbol类型）
- value
  被写入的属性值
- receiver
  操作发生的对象（通常是代理）

示例，新增属性必须是数字：

```js
let target = {};
let proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw('属性值必须是数字！');
      }
    }

    return Reflect.set(trapTarget, key, value, receiver);
  }
});

target.str = 'skrrrr';

proxy.count = 120;
console.log(proxy.str, proxy.count); // skrrrr 120

proxy.str = 'miaowu';
console.log(proxy.str, proxy.count); // miaowu 120

proxy.test = 'aha'; // throw Error
```

set 代理陷阱可以拦截写入属性的操作，get 代理陷阱可以拦截读取属性的操作。

### 使用get陷阱验证对象结构（Object Shape）

通过[get陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_O)来拦截读取对象属性的操作。

语法：

```js
var p = new Proxy(target, {
  get: function(tarpTarget, key, receiver) {}
});
```

参数：

- trapTarget
  被读取属性的源对象（代理的目标对象）
- key
  要读取的属性键（字符串或symbol）
- receiver
  操作发生的对象（通常是代理）

示例，读取属性不存在时，抛出错误：

```js
let tar = {};
let p = new Proxy(tar, {
  get(trapTarget, key, receiver) {
    if (!(key in receiver)) {
      throw new Error(`属性${key}不存在！`);
    }
    return Reflect.get(trapTarget, key, receiver);
  }
});

p.test = 'get';

console.log(p.test, tar.test); // get get
console.log(p.hello); // throw Error
```

注意：这里用in操作符检查receiver而不检查trapTarget，是为了防止receiver代理含有has陷阱。如果检查trapTarget可能会忽略掉has陷阱，从而得到错误结果。

### 使用has陷阱隐藏已有属性

使用[has陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has)可以拦截in操作。

语法：

```js
var p = new Proxy(target, {
  has: function(trapTarget, key) {}
});
```

参数：

- trapTarget
  读取属性的对象（代理的目标对象）
- key
  要检查的属性键（字符串或Symbol）

示例：

```js
let tt = {
  name: 'target',
  val: 'hide',
};

let pp = new Proxy(tt, {
  has(trapTarget, key) {
    if (key === 'val') {
      return false;
    } else {
      return Reflect.has(trapTarget, key);
    }
  }
});

console.log('name' in pp, 'val' in pp, 'test' in pp); // true false false
```

### 使用 deleteProperty 陷阱防止删除属性

[deleteProperty陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty)用于拦截对对象属性的 [delete](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 操作。

语法：

```js
var p = new Proxy(target, {
  deleteProperty: function(trapTarget, key) {}
});
```

参数：

- trapTarget
  要删除属性的对象（代理的目标）
- key
  要删除的属性键（字符串或Symbol）

示例：

```js
let tar = {
  able: 11,
  unable: 22,
};
let pro = new Proxy(tar, {
  deleteProperty(trapTarget, key) {
    if (key === 'unable') {
      return false;
    } else {
      return Reflect.deleteProperty(trapTarget, key);
    }
  }
});

console.log('able' in pro, 'unable' in pro); // true true

let res1 = delete pro.able;
let res2 = delete pro.unable;

console.log(res1, res2); // true false
console.log('able' in pro, 'unable' in pro); // false true
```

### 原型代理陷阱

#### getPrototypeOf 陷阱

代理中的 [getPrototypeOf 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf)可以拦截读取对象原型的操作。

语法：

```js
const p = new Proxy(obj, {
  getPrototypeOf(trapTarget) {}
});
```

参数：

- trapTarget
  读取原型的对象（代理的目标）

getPrototypeOf 陷阱的返回值必须是一个对象或null，其他返回值会抛出异常。

在 JavaScript 中，下面这五种操作（方法/属性/运算符）可以触发 JS 引擎读取一个对象的原型，也就是可以触发 getPrototypeOf() 代理方法的运行：

- [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [`Reflect.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf)
- [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
- [`Object.prototype.isPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
- [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)



#### setPrototypeOf 陷阱

代理中的 [setPrototypeOf 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf)可以拦截设置对象原型的操作 Object.setPrototypeOf()。

语法：

```js
var p = new Proxy(target, {
  setPrototypeOf(trapTarget, prototype) {}
});
```

参数：

- trapTarget
  接受原型设置的对象（代理的目标）
- prototype
  对象新原型对象或null

setPrototypeOf 陷阱中，如果操作失败则返回的一定是false，此时会 Object.setPrototypeOf() 会抛出错误，如果陷阱返回了任何不是false的值，那么 Object.setPropertyOf() 便假设操作成功。

陷阱可以拦截的操作：

- [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
- [`Reflect.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)



> Object.getPrototypeOf()、Object.setPrototypeOf() 和 Reflect.getPrototypeOf()、Reflect.setPrototypeOf() 方法的区别：
>
> Reflect.getPrototypeOf()、Reflect.setPrototypeOf() 方法是底层操作，赋予开发者可以访问之前只在内部操作的[[GetPrototypeOf]]和[[SetPrototypeOf]]的权限，其为这两个内部操作的包裹器（包含一些输入验证）。
>
> Object.getPrototypeOf()、Object.setPrototypeOf() 方法是高级操作，目的是给开发者使用的，在调用内部[[GetPrototypeOf]]和[[SetPrototypeOf]]操作前，会执行一些额外步骤，并通过返回值来决定下一步的操作。
>
> 如果传入的参数不是对象，则 Reflect.getPrototypeOf() 方法会抛出错误，而 Object.getPrototypeOf() 方法则会在操作执行前先将参数强制转换为一个对象。
> Reflect.setPrototypeOf() 方法会返回一个布尔值，表示是否原型已经成功设置；而 Object.setPrototypeOf() 方法返回的是设置原型的对象（即传入的第一个参数）。

示例：

```js
let target = {
  name: 'example',
  value: 42,
}

// 通过原型代理陷阱隐藏代理的原型
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return null;
  },
  setPrototypeOf(trapTarget, prototype) {
    return false;
  }
});

console.log(target.__proto__ === Object.prototype, proxy.__proto__ === Object.prototype); // true false
// 成功
Object.setPrototypeOf(target, {});
// 抛出错误
Object.setPrototypeOf(proxy, {});

let res1 = Object.getPrototypeOf(1);
console.log(res1 === Number.prototype); // true

// 抛出错误
let res2 = Reflect.getPrototypeOf(1);
```



## 参考链接

[Proxy - MDN Web Docs - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

