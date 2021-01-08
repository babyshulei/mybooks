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
| isExtensible             | Object.isExtensible()                                        | Reflect.isExtensible()             |
| preventExtensions        | Object.preventExtensions()                                   | Reflect.preventExtensions()        |
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

返回值：

- 代理对象

### 创建可撤销代理

[Proxy.revocable()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable) 方法可以用来创建一个可撤销代理。

语法：

```js
Proxy.revocable(target, handler);
```

参数：和Proxy相同，传入目标对象和代理处理程序。

返回值是具有以下属性的对象：

- proxy
  可被撤销的代理对象
- revoke
  撤销代理要调用的函数

调用 revoke() 函数后，不能通过proxy执行进一步的操作。任何与代理对象的交互都会抛出错误。

示例：

```js
let target = {
  name: 'tata',
};

let { proxy, revoke } = Proxy.revocable(target, {});

console.log(proxy.name); // tata

revoke();

console.log(proxy.name); // 报错
```

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
    set: function(trapTarget, key, value, receiver) {
        return Reflect.set(trapTarget, key, value, receiver);
    }
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
  get: function(trapTarget, key, receiver) {
    return Reflect.get(trapTarget, key, receiver);
  }
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
  has: function(trapTarget, key) {
    return Reflect.has(trapTarget, key);
  }
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
  deleteProperty: function(trapTarget, key) {
    return Reflect.deleteProperty(trapTarget, key);
  }
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
  getPrototypeOf(trapTarget) {
    return Reflect.getPrototypeOf(trapTarget);
  }
});
```

参数：

- trapTarget
  读取原型的对象（代理的目标）

返回值：

- 必须是一个对象或null，其他返回值会抛出异常。

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
  setPrototypeOf(trapTarget, prototype) {
    return Reflect.setPrototypeOf(trapTarget, prototype);
  }
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

### 对象可扩展性陷阱

#### isExtensible 陷阱

[isExtensible 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible)用于拦截对象的Object.isExtensible()方法。

语法：

```js
var p = new Proxy(target, {
  isExtensible: function(trapTarget) {
    return Reflect.isExtensible(trapTarget);
  }
});
```

参数：

- trapTarget：目标对象

返回值：

- 一定是个布尔值，表示对象是否可扩展。

#### preventExtensions 陷阱

[preventExtensions 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions)用于拦截对象的Object.preventExtensions()方法。

语法：

```js
var p = new Proxy(target, {
  preventExtensions: function(trapTarget) {
    return Reflect.preventExtensions(trapTarget);
  }
});
```

参数：

- trapTarget：目标对象

preventExtensions 陷阱返回的一定是个布尔值，表示操作是否成功。

示例，让Objec.preventExtensions()对代理失效：

```js
let target = {
  name: 'example',
  value: 33,
};

let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget);
  },
  preventExtensions(trapTarget) {
    return false;
  },
});

console.log(Object.isExtensible(target), Object.isExtensible(proxy)); // true true

// 抛出异常
Object.preventExtensions(proxy);

console.log(Object.isExtensible(target), Object.isExtensible(proxy)); // true true
```



> Object.isExtensible()、Object.preventExtensions()和Reflect.isExtensible()、Reflect.preventExtensions()方法的异同：
>
> Object.isExtensible()和Reflect.isExtensible()方法非常相似，只有当传入非对象时，Object.isExtensible()返回false，而Reflect.isExtensible()则抛出一个错误。
>
> Object.preventExtensions()和Reflect.preventExtensions()非常相似，区别是无论Object.preventExtensions()方法的参数是否为一个对象，它总是返回该参数；而Reflect.preventExtensions()方法传入非对象参数会抛出错误，传入对象时，操作成功返回true，否则返回false。



### 属性描述符陷阱

#### defineProperty 陷阱

[defineProperty 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty)用于拦截对对象的 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 操作。

**语法**：

```js
var p = new Proxy(target, {
  defineProperty: function(trapTarget, key, descriptor) {
    return Refelect.defineProperty(trapTarget, key, descriptor);
  }
});
```

**属性**：

- trapTarget
  要定义属性的对象（代理的目标）
- key
  属性的键（字符串或Symbol）
- descriptor
  属性的描述符对象

**返回值**：

- 操作成功后返回true，否则返回false。

**描述符对象限制**：

为确保和 Object.defineProperty() 方法的行为一致，传入陷阱的描述符对象已规范化。无论什么对象作为第三个参数传给 Object.defineProperty() 方法，传递给陷阱的对象都只有属性 enumerable、configurable、value、writable、get 和 set。

示例，通过defineProperty陷阱限制Object.defineProperty()方法定义的属性类型：

```js
// 限制定义的属性类型不为symbol
let target = {};
let proxy = new Proxy(target, {
  defineProperty(trapTarget, key, descriptor) {
    if (typeof key === 'symbol') {
      return false;
    }
    return Reflect.defineProperty(trapTarget, key, descriptor);
  }
});

Object.defineProperty(proxy, 'aaa', {
  value: 'test',
});

let sym = Symbol('another');
// 抛出错误
Object.defineProperty(proxy, sym, {
  value: 'asymbol',
});

```

> 如果让陷阱返回 true 并且不调用 Reflect.defineProperty() 方法，则可以让 Object.defineProperty() 方法静默失效，这既消除了错误又不会真正定义属性。

#### getOwnPropertyDescriptor 陷阱

[getOwnPropertyDescriptor 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor)用于拦截对对象的[Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 操作。

**语法**：

```js
var p = new Proxy(target, {
  getOwnPropertyDescriptor: function(trapTarget, key) {
    return Reflect.getOwnPropertyDescriptor(trapTarget, key);
  }
});
```

**参数**：

- trapTarget
  要获取属性描述符的对象（代理的目标）
- key
  属性的键

**返回值**：

- 返回描述符。

**描述符对象限制**：

为确保 Object.getOwnPropertyDescriptor() 方法的可靠性，getOwnPropertyDescriptor 陷阱返回的描述符对象值必须是 null、undefined或一个对象。如果返回对象，属性只能是enumerable、configurable、value、writable、get 和 set，如果返回对象出现了不被允许的属性，会抛出一个错误。

> Object.defineProperty()、Object.getOwnPropertyDescriptor()和Reflect.defineProperty()、Reflect.getOwnPropertyDescriptor()方法的异同：
>
> Object.defineProperty() 和 Reflect.defineProperty() 方法只有返回值的不同：Object.defineProperty() 返回第一个参数，Reflect.defineProperty() 返回一个布尔值，表示操作成功或失败。
>
> Object.getOwnPropertyDescriptor() 和 Reflect.getOwnPropertyDescriptor()方法类似，区别是Object.getOwnPropertyDescriptor() 第一个参数为原始值时，内部会强制转换为一个对象； Reflect.getOwnPropertyDescriptor() 第一个参数为原始值时，则会抛出一个错误。

### ownKeys 陷阱

[ownKeys 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys)可以拦截内部方法[[OwnPropertyKeys]]。通过 [Reflect.ownKeys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) 方法实现默认的行为，返回的数组中包含所有自有属性的键名，字符串类型和Symbol类型都包含在内。

影响的相关操作：

- [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)：返回对象自身可枚举字符串属性的数组，不包括Symbol类型的属性名。
- [Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)：返回对象自身所有字符串属性的数组，不包括Symbol类型的属性名。
- [Object.getOwnPropertySymbols()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)：返回对象自身所有Symbol属性的数组，不包括字符串类型的属性名。
- [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)：拷贝源对象自身可枚举属性到目标对象，包括字符串类型和Symbol类型的属性。
- [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)：遍历对象非Symbol类型的可枚举属性，在确定循环键时会调用陷阱。

语法：

```js
var p = new Proxy(target, {
  ownKeys: function(trapTarget) {
    return Reflect.ownKeys(trapTarget);
  }
});
```

参数：

- trapTarget
  目标对象

返回值：

- 必须是一个数组或类数组对象，否则就抛出错误。

应用：

可以用 ownKeys 陷阱来过滤掉不想使用的属性键。

```js
let target = {};
let proxy = new Proxy(target, {
  // 过滤掉 '_' 开头的字符串类型属性键
  ownKeys(trapTarget) {
    return Reflect.ownKeys(trapTarget).filter((key) => {
      return typeof key !== 'string' || key[0] !== '_';
    });
  }
});

let sym = Symbol('test');
proxy.name = 'outer';
proxy._name = 'inner';
proxy[sym] = 'atest';

console.log(proxy); // { name: 'outer', _name: 'inner', [Symbol(test)]: 'atest' }
console.log(Object.getOwnPropertyNames(proxy)); // ['name']
console.log( Object.getOwnPropertySymbols(proxy)); // [Symbol(test)]
```

### 函数代理陷阱

所有代理陷阱中，只有 apply 和 construct 的代理目标是一个函数。函数有两个内部方法 [[Call]] 和 [[Construct]]，apply 陷阱和 construct 陷阱可以覆写这些内部方法。

使用 new 操作符调用函数，执行 [[Construct]] 方法，对应 construct 陷阱；其他函数调用，执行 [[Call]] 方法，对应 apply 陷阱。

#### apply 陷阱

[apply 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply)用于拦截函数的调用。

语法：

```js
var p = new Proxy(target, {
  apply: function(trapTarget, thisArg, argumentsList) {
    return Reflect.apply(trapTarget, thisArg, argumentsList);
  }
});
```

参数：

- trapTarget
  被执行的函数（代理的目标）
- thisArg
  函数被调用时内部this的值
- argumentsList
  传递给函数的参数数组

返回值：

- 无限制

#### construct 陷阱

[consturct 陷阱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct)用于拦截 new 操作符。

语法：

```js
var p = new Proxy(target, {
  construct: function(trapTarget, argumentsList, newTarget) {
    return Reflect.construct(trapTarget, argumentsList, newTarget);
  }
});
```

参数：

- trapTarget
  被执行的函数（代理的目标）
- argumentsList
  传递给函数的参数数组
- newTarget
  最初被调用的构造函数，可选，传入 Reflect.construct 用于指定函数内部 new.target 的值

返回值：

- 必须返回一个对象

应用：

验证函数参数、不用 new 调用构造函数、覆写抽象基类构造函数、创建可调用的类构造函数等。

验证函数参数示例：

```js
/** 
* 函数参数验证：确保传入参数均为数字
* 函数调用方式验证：确保函数不会被 new 调用
*/
function sum(...values) {
  return values.reduce((pre, curr) => pre + curr, 0);
}

let sumProxy = new Proxy(sum, {
  construct(trapTarget, argumentsList) {
    throw new Error('该函数不可通过 new 来调用！');
  },
  apply(trapTarget, thisArg, argumentsList) {
    argumentsList.forEach((val) => {
      if (typeof val !== 'number') {
        throw new Error('所有参数必须是数字！');
      }
    });

    return Reflect.apply(trapTarget, thisArg, argumentsList);
  }
});

console.log(sumProxy(1, 4, 10)); // 15

console.log(sumProxy(1, 's', 10)); // Error：所有参数必须是数字！

let result = new sumProxy(); // Error: 该函数不可通过 new 来调用！
```







## 参考链接

[Proxy - MDN Web Docs - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

