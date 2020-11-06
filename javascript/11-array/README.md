# 数组

## 创建数组

ES6 之前，创建数组有两种方法，一种是调用 Array 构造函数，另一种是用数组字面量方法。但是这两种创建方法功能比较有限，如类数组对象的转换还需要额外开发。

为了进一步简化数组的创建过程，ES6 新增了 Array.of() 和 Array.from() 两个方法创建数组。

### Array.of()

Array.of() 方法时为了规避通过 Array 构造函数创建数组时的怪异行为。Array 构造函数传入数值类型的参数、非数值类型的参数、多个参数的表现各不相同，无法保证创建的数组符合预期。

Array.of() 方法创建数组，只需传入数组的参数即可，参数的类型和数量不会影响生成数组的行为，Array.of() 方法总会创建一个包含所有参数的数组。

#### 语法

```
Array.of(element0[, element1[, ...[, elementN]]])
```

参数：

- elementN
  任意个参数，将按顺序成为返回数组中的元素。

示例：

```js
let items = Array.of(1);
console.log(items); // [1]
items = Array.of(1, 2);
console.log(items); // [1, 2]
items = Array.of('2');
console.log(items); // ["2"]
```

> Array.of() 方法不通过 Symbol.species 属性确定返回值的类型，它使用当前构造函数（即 of() 方法中的this值）来确定正确的返回数据类型。

### Array.from()

JavaScript 不支持直接将非数组对象转换为真实数组。在ES5中，需要采用如下方案来把类数组对象转换为数组：

```javascript
// 方案1
function makeArray(arrayLike) {
    var res = [];

    for (var i = 0; i < arrayLike.length; i++) {
        res.push(arrayLike[i]);
    }

    return res;
}

// 方案2
function makeArray2(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
```

这两种方案要编写函数且语义不够清晰，ES6 新增了 `Array.from()` 方法来将对象转化为数组。

`Array.from()` 方法从一个类数组或可迭代对象上，创建一个新的，浅拷贝的数组实例。

#### 语法

````
Array.from(arrayLike [, mapFn [, thisArg]])
````

参数：

- arrayLike
  想要转换成数组的类数组对象或可迭代对象。
- mapFn
  可选参数，如果指定了该参数，新数组中的每个元素会执行该回调函数。
- thisArg
  可选参数，执行回调函数 mapFn 时 this 对象。

示例：

```javascript
// mapFn 参数示例
function trans() {
    return Array.from(arguments, val => val + 1);
}

let numbers = trans(1, 2, 3);
console.log(numbers); // [ 2, 3, 4 ]

// thisArg 参数示例
let helper = {
    diff: 2,
    add(val) {
        return val + this.diff;
    },
};
function trans2() {
    return Array.from(arguments, helper.add, helper);
}

let num2 = trans2(1, 2, 3);
console.log(num2); // [ 3, 4, 5 ]

// 转换可迭代对象
let ite = {
    *[Symbol.iterator]() {
        yield 1;
        yield 3;
        yield 5;
    },
};
let num3 = Array.from(ite);
console.log(num3); // [ 1, 3, 5 ]
```

> 如果一个对象既是类数组又是可迭代的，那么`Array.from()`方法会根据迭代器来决定转换哪个值。

## ES6 新增原型方法

### find() 和 findIndex()

ES5 添加了 indexOf() 和 lastIndexOf() 方法，用于在数组中查找特定的值。

ES6 添加了 find() 和 findIndex() 方法，用于在数组中根据某个条件查找匹配元素，补充了数组中查找元素的场景。

find() 和 findIndex() 方法两个方法接收的参数一致，区别在于 find() 方法返回查找到的值，findIndex() 方法返回查找到值的索引。

#### 语法

```
arr.find(callback[, thisArg])
arr.findIndex(callback[, thisArg])
```

参数：

- callback
  在数组每一项上执行的回调函数，接收3个参数：
  - element：当前遍历到的元素
  - index：当前遍历到的索引
  - array：数组本身
- thisArg
  可选参数，用于指定回调函数中 this 的值

示例：

```javascript
let arr = [2, 4, 5, 6, 7];
console.log(arr.find(v => v > 5)); // 6
console.log(arr.findIndex(v => v > 5)); // 3
```

### fill()

`fill()` 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

#### 语法

```
arr.fill(value[, start[, end]])
```

参数：

- value
  用来填充数组元素的值
- start
  可选参数，填充的起始索引，默认值为 0
- end
  可选参数，填充的终止索引，默认值为 this.length

示例：

```javascript
let array = new Array(5);
array.fill(3);
console.log(array); // [3, 3, 3, 3, 3]
array.fill(2, 1, 3);
console.log(array); // [3, 2, 2, 3, 3]
```

> 如果起始索引或者终止索引为负值，那么这些值会与数组的 length 属性相加来作为最终位置。
>
> 例如：起始索引为 -2，那么索引值实际为 array.length -2。

### copyWithin()

`copyWithin()` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回数组，不会改变原数组的长度。

#### 语法

```
arr.copyWithin(target[, start[, end]])
```

参数：

- target
  0 为基底的索引，复制序列到该位置。
  如果 target >= arr.length，将不会发生拷贝。
- start
  可选参数。0 为基底的索引，开始复制元素的起始位置。默认值为0。
- end
  可选参数。0 为基底的索引，开始复制元素的结束位置，但不包含 end 这个位置的元素。默认值为 arr.length。

> 和 fill() 方法一样，copyWithin() 方法的所有参数都接受负值，并且会自动与数组相加来作为最终使用的索引。

示例：

```javascript
let carr = [1, 2, 3, 4, 5, 6, 7];
carr.copyWithin(2, 0, 3);
console.log(carr); // [1, 2, 1, 2, 3, 6, 7]
```



## 参考链接

[Array.of() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

[Array.from() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

[Array.prototype.indexOf() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

[Array.prototype.lastIndexOf() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

[Array.prototype.find() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

[Array.prototype.findIndex() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

[Array.prototype.fill() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

[Array.prototype.copyWithin() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

