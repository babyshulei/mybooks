# 改进的数组功能

## 创建数组

ES6 之前，创建数组有两种方法，一种是调用 Array 构造函数，另一种是用数组字面量方法。但是这两种创建方法功能比较有限，如类数组对象的转换还需要额外开发。

为了进一步简化数组的创建过程，ES6 新增了 Array.of() 和 Array.from() 两个方法创建数组。

### Array.of()

Array.of() 方法时为了规避通过 Array 构造函数创建数组时的怪异行为。Array 构造函数传入数值类型的参数、非数值类型的参数、多个参数的表现各不相同，无法保证创建的数组符合预期。

Array.of() 方法创建数组，只需传入数组的参数即可，参数的类型和数量不会影响生成数组的行为，Array.of() 方法总会创建一个包含所有参数的数组。

```js
let items = Array.of(1);
console.log(items); // [1]
items = Array.of(1, 2);
console.log(items); // [1, 2]
items = Array.of('2');
console.log(items); // ["2"]
```

> Array.of() 方法不通过 Symbol.species 属性确定返回值的类型，它使用当前构造函数（即 of() 方法中的this值）来确定正确的返回数据类型。







