# Symbol和Symbol属性

> 2020.02.12 @wsl

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













