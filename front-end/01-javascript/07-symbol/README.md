# Symbol和Symbol属性

## 创建Symbol

可以通过全局的Symbol函数创建一个Symbol。

```javascript
let firstName = Symbol();
let person = {};

person[firstName] = "David";
console.log(person[firstName]); // David
```

> 由于 Symbol 是原始值，因此调用 new Symbol() 会导致程序抛出错误。

Symbol函数接受一个可选参数，可以让你添加一段文本描述即将创建的Symbol，这段描述不可用于属性访问。

```javascript
let firstName = Symbol('first name');
let person = {};

person[firstName] = "David";
console.log(person[firstName]); // David
console.log(firstName); // Symbol(first name)
```

Symbol 的描述被存储在内部的 [[Description]] 属性中，只有当调用Symbol的toString()方法时才可以读取这个属性。不能直接在代码里访问 [[Description]] 。

### 辨识Symbol

使用 typeof 可以用来检测变量是否为Symbol类型。

```javascript
let test = Symbol('lalala');
console.log(typeof test); // symbol
```

## Symbol 的使用方法

所有使用可计算属性名的地方，都可以使用Symbol。

Symbol 也可以用于可计算对象字面量属性名、Object.defineProperty()方法 和Object.defineProperties() 方法的调用过程中。

```javascript
let first = Symbol('first');
// 使用一个可计算对象字面量属性
let man = {
    [first]: 'John',
};

Object.defineProperty(man, first, {
    writable: false,
});

let last = Symbol('last');
Object.defineProperties(man, {
    [last]: {
        value: 'B',
        writable: false,
    }
});

console.log(man[first], man[last]); // John B
```

## Symbol 共享体系

有时我们可能希望在不同的代码中共享一个Symbol。ES6提供了一个可以随时访问的全局Symbol注册表。

通过Symbol.for() 方法可以创建一个可共享的Symbol。例如：

```javascript
let uid = Symbol.for('uid');
let obj = {};

obj[uid] = 'haha';
console.log(uid, obj[uid]); // Symbol(uid) "haha"
```

Symbol.for()方法首先在全局Symbol注册表中搜索键为 ‘uid’ 的Symbol 是否存在，如果存在，直接返回已有的Symbol；否则，创建一个新的Symbol，并使用这个键在全局注册表中注册，随即返回新创建的Symbol。

后续如果再传入相同的键调用Symbol.for()会返回相同的Symbol。例如：

```javascript
let uid = Symbol.for('uid');
let obj = {};

obj[uid] = 'haha';
console.log(uid, obj[uid]); // Symbol(uid) "haha"

let uid2 = Symbol.for('uid');

console.log(uid === uid2, uid2, obj[uid2]); // true Symbol(uid) "haha"
```

可以使用Symbol.keyFor()方法在Symbol全局注册表中检索与Symbol有关的键。

```javascript
let uid = Symbol.for('uid');
let uid2 = Symbol.for('uid');
let uid3 = Symbol('uid');

console.log(Symbol.keyFor(uid), Symbol.keyFor(uid2), Symbol.keyFor(uid3)); // uid uid undefined
```

## Symbol 与强制类型转换

其他类型没有与Symbol逻辑等价的值，因而Symbol 使用起来不是很灵活。尤其是不能将Symbol强制转换为字符串类型和数字类型。

例如，尝试将Symbol 与一个字符串拼接，会导致程序抛出错误。将Symbol与数学运算符混合使用，也会导致程序抛出错误（逻辑运算符除外，Symbol 可以转 Boolean，等价布尔值为 true）。

```javascript
var uid = Symbol('uid');
var desc = 'aa' + uid; // 报错
var sum = uid / 1; // 报错
```

## Symbol 属性检索

**Object.keys()** 方法和 **Object.getOwnPropertyNames()** 方法可以检索对象中所有的属性名：

前者返回所有可枚举的属性名；后者不考虑属性名的可枚举性一律返回。

为了保持ES5函数的原有功能，这两个方法都不支持Symbol属性。

ES6新增 **Object.getOwnPropertySymbols()**方法来检索对象中的Symbol属性，该方法返回一个包含所有Symbol自有属性的数组。

## 通过well-known Symbol 暴露内部操作

ES6开放了以前JavaScript中常见的内部操作，并通过预定义一些 well-known Symbol 来表示。每一个这类Symbol 都是Symbol 对象的一个属性。这些 well-known Symbol 包括：

- **Symbol.hasInstance**

  在执行 instanceof 时调用的内部方法，用于检测对象的继承信息。

- **Symbol.isConcatSpreadable**

  一个布尔值，用于表示当传递一个集合作为Array.prototype.concat() 方法的参数时，是否应该将集合内的元素规整到同一层级。

- **Symbol.iterator**

  一个返回迭代器的方法。

- **Symbol.match**

  一个在调用 String.prototype.match() 方法时调用的方法，用于比较字符串。

- **Symbol.replace**

  一个在调用 String.prototype.replace() 方法时调用的方法，用于替换字符串的子串。

- **Symbol.search**

  一个在调用 String.prototype.search() 方法时调用的方法，用于在字符串中定位子串。

- **Symbol.species**

  用于创建派生对象的构造函数。

- **Symbol.split**

  一个在调用 String.prototype.split() 方法时调用的方法，用于分割字符串。

- **Symbol.toPrimitive**

  一个返回对象原始值的方法。

- **Symbol.toStringTag**

  一个在调用Object.prototype.toString()方法时使用的字符串，用于创建对象描述。

- **Symbol.unscopables**

  定义了一些不可被with语句引用的对象属性名称的对象集合。

重写一个由 well-known Symbol 定义的方法，会导致对象内部的默认行为被改变，从而一个普通对象会变为一个奇异对象（exotic object）。

### Symbol.hasInstance 方法

每一个函数都有一个Symbol.hasInstance 方法，用于确定对象是否为函数的实例。该方法不可写、不可配置并且不可枚举。

该方法只接受一个参数，即要检查的值。如果传入的值是函数的实例，返回true。

```javascript
obj instanceof Array;
// 等价于
Array[Symbol.hasInstance](obj);
```

