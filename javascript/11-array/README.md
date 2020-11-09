# 数组

## 创建数组

ES6 之前，创建数组有两种方法，一种是调用 Array 构造函数，另一种是用数组字面量方法。但是这两种创建方法功能比较有限，如类数组对象的转换还需要额外开发。

为了进一步简化数组的创建过程，ES6 新增了 Array.of() 和 Array.from() 两个方法创建数组。

### Array.of()

[Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of) 方法时为了规避通过 Array 构造函数创建数组时的怪异行为。Array 构造函数传入数值类型的参数、非数值类型的参数、多个参数的表现各不相同，无法保证创建的数组符合预期。

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

[`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)方法从一个类数组或可迭代对象上，创建一个新的，浅拷贝的数组实例。

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

ES5 添加了 [indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 和 [lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) 方法，用于在数组中查找特定的值。

ES6 添加了 find() 和 findIndex() 方法，用于在数组中根据某个条件查找匹配元素，补充了数组中查找元素的场景。

[find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 和 [findIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) 方法两个方法接收的参数一致，区别在于 find() 方法返回查找到的值，findIndex() 方法返回查找到值的索引。

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

[`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

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

[`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) 方法浅复制数组的一部分到同一数组中的另一个位置，并返回数组，不会改变原数组的长度。

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

## 定型数组

定型数组是一种用于处理数值类型数据的专用数组。

定型数组支持存储和操作以下8种不同的数值类型：

- int8
- uint8
- int16
- uint16
- int32
- uint32
- float32
- float64

在使用定型数组前，需要创建一个数组缓冲区存储这些数据。

### 数组缓冲区

数组缓冲区是一段可以包含特定数量字节的内存地址。可以通过 [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 构造函数来创建数组缓冲区。创建完成后，可以通过 byteLength 属性查看缓冲区中的字节数量。

可以通过 [slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice) 方法分割已有数组缓冲区来创建一个新的，这个方法和数组的 slice() 方法很像。

语法：

```js
new ArrayBuffer(length) // length：要创建的 ArrayBuffer 的大小，单位为字节
arrayBuffer.slice(begin[, end]) // 切片索引范围：[begin, end)
```

示例：

```js
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength); // 10
let sbuff = buffer.slice(2, 5);
console.log(sbuff.byteLength); // 3
```

> 注意：数组缓冲区包含的实际字节在创建时就已确定，可以修改缓冲区内的数据，但不能改变缓冲区的尺寸大小。

### 视图

数组缓冲区是内存中的一段地址，视图是用来操作内存的接口。

视图可以操作数组缓冲区或缓冲区字节的子集，并按照其中一种数值型数据类型来读取和写入数据。

#### DataView

[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 类型是一种通用的数组缓冲区视图，其支持所有8种数值型数据类型。

DataView 需要通过 ArrayBuffer 实例来创建，语法如下：

```js
new DataView(buffer [, byteOffset [, byteLength]])
```

参数：

- buffer
  一个 已经存在的[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 或 [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)  对象，`DataView` 对象的数据源。
- byteOffset
  可选参数。DataView 对象的第一个字节在 buffer 中的字节偏移。默认是 0。
- byteLength
  可选参数。DataView 对象的字节长度。默认是 buffer 的长度。

示例：

```js
let buffer = new ArrayBuffer(10);
let view1 = new DataView(buffer);
let view2 = new DataView(buffer, 2);
console.log(view1.buffer === view2.buffer); // true
console.log(view1.byteOffset, view2.byteOffset); // 0 2
console.log(view1.byteLength, view2.byteLength); // 10 8
```

#### 读取和写入数据

JavaScript 有 8 种数值型数据类型，每一种都能在DataView的原型上找到相应的在数组缓冲区中写入数据和读取数据的方法。写入数据以 set 开头，读取数据以 get 开头。

get 方法接受两个参数：读取数据时偏移的字节数量；一个可选的布尔值，表示是否按照小端序进行读取。

set 方法接受三个参数：写入数据时偏移的字节数量；写入的值；一个可选的布尔值，表示是否按照小端序格式存储。

- getInt8(byteOffset, littleEndian)
- setInt8(byteOffset, value, littleEndian)
- getFloat32(byteOffset, littleEndian)
- setFloat32(byteOffset, value, littleEndian)
- ......

视图是独立的，无论数据之前是通过何种方式存储的，都可在任意时刻读取或写入任意格式的数据。

举例：

```js
let buff = new ArrayBuffer(10);
let view = new DataView(buff);

view.setInt8(0, 3);
view.setInt8(1, -5);

console.log(view.getInt8(0), view.getInt8(1)); // 3 -5
console.log(view.getInt16(0)); // 1019
```

当混合使用不同的数据类型时，DataView 是合适的选择；如果只使用某个特定的数据类型，那么特定类型的视图是更好的选择。

#### 定型数组是视图

ES6 [定型数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)实际上是用于数组缓冲区的特定类型的视图。ES 规范的特定类型视图如下：

- [`Int8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array) 1
- [`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 1
- [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) 1
- [`Int16Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int16Array) 2
- [`Uint16Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array) 2
- [`Int32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) 4
- [`Uint32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array) 4
- [`Float32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) 4
- [`Float64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float64Array) 8
- [`BigInt64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array) 8
- [`BigUint64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array) 8

其中 uint8 的值有两个选择，Uint8ClampedArray 和 Uint8Array，这两个大致相同，唯一的区别在于数组缓冲区的值如果小于 0 或者大于 255，UintClampedArray 会分别将其转换为 0 或 255。

定型数组操作只能在特定的数据类型上进行。例如，所有 Int8Array 的操作都是用 int8 类型的值。

创建定型数组语法：

```js
// 方式一
new TypedArray();
new TypedArray(length);
// 方式二
new TypedArray(typedArray);
new TypedArray(object);
// 方式三
new TypedArray(buffer [, byteOffset [, length]]);
```

- **方式一：**
  传入一个数字，这个数字表示分配给数组的元素数量。如果不传参数，会按照传入0来处理，这样缓冲区没有分配到任何比特，创建的定型数组不能用来保存数据。
- **方式二：**
  传入一个对象，对象类型可以为：定型数组、可迭代对象、数组、类数组对象。
- **方式三：**
  传入DataView可接受的参数，分别为：数组缓冲区、可选的比特偏移量、可选的长度值。

每个定型数组由多个元素组成，元素大小指的是每个元素表示的字节数。该值存储在每个构造函数和每个实例的 `BYTES_PER_ELEMENT` 属性中。

可以通过length属性来访问数组中的元素数量。通过 buffer 属性访问创建的数组缓冲区。

示例：

```js
// 方式一
let arr1 = new Int8Array(2);
console.log(arr1.length, arr1.byteLength, arr1.byteOffset); // 2 2 0

// 方式二
let arr2 = new Int16Array([13, 20]);
let arr16 = new Int32Array(arr2);
console.log(arr2.buffer === arr16.buffer); // false
console.log(arr2.length, arr2.byteLength, arr2[0], arr2[1]); // 2 4 13 20
console.log(arr16.length, arr16.byteLength, arr16[0], arr16[1]); // 2 8 13 20

// 方式三
let bf = new ArrayBuffer(20);
let arr3 = new Int32Array(bf, 4, 2);
console.log(arr3.length, arr3.byteLength, arr3.byteOffset); // 2 8 4

console.log(arr1.BYTES_PER_ELEMENT, arr2.BYTES_PER_ELEMENT, arr3.BYTES_PER_ELEMENT); // 1 2 4
```

## 定型数组与普通数组

### 相似之处

定型数组和普通数组有很多相似之处，如 length 属性，通过索引访问元素等。

#### 通用方法

定型数组包括许多在功能上与普通数组等效的方法：

- [copyWithin(target, start, end)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)：浅复制数组的一部分到同一数组中的另一个位置，并返回数组，而不改变大小length，但是**改变了数组**

- [entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)：**返回一个新的**可迭代数组对象包含了数组中的每项的键值对，在next()调用时返回一个双项数组（每项的键&值）

- [fill(value, start, end)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)：用特定值填充数组中的一个或多个元素, **返回一个新的数组**

- [filter(callback(element, index, array), thisArg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)：用通过筛选全部元素，**返回一个新的数组**           箭头函数写法：words.filter(word => word.length > 6)

- [find(callback(element, index, array), thisArg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)：查找满足特定条件的数组元素，返回匹配值。遇到第一个匹配的值就暂停返回。
  array.find((item) => item>10)

- [findIndex(callback(element, index, array), thisArg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)：查找满足特定条件的数组元素，返回匹配值的索引位置。遇到第一个匹配的值就暂停返回。

- [forEach(callback(curr, index, array))](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)：数组遍历

- [indexOf(searchElement, fromIndex)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)：查找元素，返回该元素的索引位置，遇到第一个就暂停返回
  ~str.indexOf(seachFor) 为true包含在字符串中

- [join(separator)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)：创建并返回一个有数组中元素组成的字符串，通过逗号指定符号分隔

- [keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)：返回一个包含数组中每个索引键的Array Interator对象。索引迭代器会包含哪些没有对应元素的索引

- [lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)：返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1
  array.lastIndexOf(searchElement, fromIndex)
  fromIndex默认array.length-1, lastIndexOf使用严格相等

- [map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)：**创建一个新数组**，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
  array.map(callback(curr, index, array), thisArg)
  ​从来没被赋过值或者使用 delete 删除的索引则不会被调用
  map处理的数组，callback第一次调用时确定，执行过程的修改不影响遍历过程

- [reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)：对数组中的每个元素执行一个提供的reducer函数（升序执行），将其结果汇总为单个返回值
  array.reduce(callback(acc, curr, currIndex, array), initialValue)
  不包括数组中被删除或从未被赋值的元素

- - 数组里所有值的和
  - 累加对象数组里的值
  - 将二维数组转化为一维
  - 计算数组中每个元素出现的次数
  - 按属性对object分类
  - 数组去重
  - 按顺序运行Promise（**后续再看**）
  - 功能型函数管道（**后续再看**）

- [reduceRight()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceright)：接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值
  array.reduceRight(callback(prev, curr, index, array), initialValue)

- [reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)：将数组中元素的位置颠倒，**会改变数组**

- [slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)：**返回一个新的数组对象，**有一个由 begin和 end（**不包括end**）决定的原数组的**浅拷贝**。

- some()

- sort()

- values()

尽管这些方法和Array.prototype中的很像，但并非完全一致，定型数组中的方法会额外检查数值类型是否安全，也会通过 Symbol.species 确认方法的返回值是定型数组而非普通数组。

#### 相同的迭代器

定型数组与普通数组由3个相同的迭代器，分别是 entries()、keys()、values()方法，定型数组可以和普通数组一样使用展开运算符、for-of循环。

#### of() 方法和 from() 方法

所有定型数组都含有静态of() 方法和 from() 方法，运行效果类似 Array.of() 方法和 Array.from() 方法，当然，返回的定型数组。

### 差别

定型数组和普通数组最重要的差别：定型数组不是普通数组。它不继承自Array，通过 Array.isArray() 方法检查定型数组返回的是 false。

#### 行为差异

普通数组的值可以是不同类型的；其长度可以变化。而定型数组的值需要是符合要求的，非法值会进行错误更正；定型数组的长度是固定的。

#### 缺失的方法

定型数组相对于普通数组，缺失了如下方法：

concat()、shift()、pop()、splice()、push()、ushift()

这是由于定型数组的尺寸不可更改。

#### 附加方法

定型数组相较于普通数组，增加了如下方法：

- set(array[, offset])
  将其他数组复制到已有的定型数组
  array：拷贝数据的源数组，定型数组和普通数组都可以
  offset：可选参数，偏移量，表示开始插入数据的位置
- subarray([begin[, end]])
  提取已有的定型数组的一部分作为一个新的定型数组，索引范围：[begin, end)



## 参考链接

[Array - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

[ArrayBuffer - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

[DataView - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

[TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

