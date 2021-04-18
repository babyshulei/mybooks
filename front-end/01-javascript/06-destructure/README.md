# 解构：使数据访问更便捷

解构是一种打破数据结构，将其拆分为更小部分的过程。

## 1. 对象解构

对象解构的语法形式是在一个赋值操作符左边放置一个对象字面量。

### 解构声明变量

```javascript
let node = {
    start: 'hello',
    name: 'world',
};

let { start, name } = node;
console.log(start, name); // hello world
```

注意，如果使用var, let, const 解构声明变量，则必须要提供初始化程序（也就是等号右侧的值），否则会抛出语法错误。

```javascript
let { type }; // 语法错误！Uncaught SyntaxError: Missing initializer in destructuring declaration
```

### 解构赋值

在声明变量时可以使用解构语法，同样，在变量赋值时也可以使用解构语法。

```javascript
let node = {
        start: 'hello',
        name: 'world',
    },
    start = 'st',
    name = 'test';

({ start, name } = node);
console.log(start, name);
```

> 注意，一定要用小括号包裹解构赋值语句。JavaScript引擎将一对开放的花括号视为一个代码块，语法规定，代码块语句不允许出现在赋值语句左侧，添加小括号后可以将块语句转化为一个表达式，从而实现解构赋值的过程。

解构赋值表达式的值与表达式右侧的值相等，因此，在任何可以使用值的地方都可以使用解构赋值表达式。

```javascript
let node = {
    start: 'hello',
    name: 'world',
},
start = 'st',
name = 'test';

function output(value) {
    console.log(value === node);
}

output({ start, name } = node); // true
console.log(start, name); // hello world
```

调用output()函数时传入了一个解构表达式，由于JavaScript表达式的值为右侧的值，因而此处传入的参数等同于node，且变量start、name的值被重新赋值，最终将node传入output()函数。

> 解构赋值表达式（也就是=右侧的表达式）如果为null或undefined会导致程序抛出错误。即，任何尝试读取null或undefined的属性的行为都会触发运行时错误。

### 默认值

使用解构赋值表达式时，如果指定的局部变量名称在对象中不存在，那么这个局部变量会被赋值为undefined。

可以定义一个默认值，在属性名称后添加一个等号和相应的默认值，那么在指定属性不存在时，就会取这个指定的默认值。

```javascript
let node = {
    start: 'hello',
    name: 'world',
};

let { start, name, value = 'haha', end } = node;
console.log(start, name, value, end); // hello world haha undefined
```

如果希望使用不同命名的局部变量来存储对象属性的值，可以使用ES6中的一个扩展语法，name: localName，也可以添加默认值，只需在变量名后添加等号和默认值即可。例子：

```javascript
let node = {
    start: 'hello',
};

let { start: localStart, name: localName = 'test' } = node;
console.log(localStart, localName); // hello test
```

### 嵌套对象解构

解构嵌套对象仍然与对象字面量的语法相似，如下例：

```javascript
let deep = {
    start: 'hello',
    loc: {
        foo: {
            line: 1,
            column: 2,
        },
    },
};

let { loc: { foo }} = deep;
console.log(foo); // {line: 1, column: 2}
```

在对象解构中，所有冒号前的标识符都代表在对象中的检索位置，右侧为被赋值的变量名；如果冒号后是花括号，则意味着要赋予的最终值嵌套在对象内部更深的层级中。

同样，也可以使用一个与对象属性名不同的局部变量名，如：

```javascript
let { loc: { foo: localFoo }} = deep;
```

## 2. 数组解构

数组解构使用的是数组字面量，且解构操作全部在数组内完成。

在数组解构语法中，我们通过值在数组中的位置进行选取，且可以将其存储在任意变量中，未显式声明的元素都会直接被忽略。

在这个过程中，数组本身不会发生任何变化。

```javascript
let colors = ['red', 'green', 'white', 'black'];
let [ , , thirdColor ] = colors;

console.log(thirdColor); // white
```

### 解构赋值

数组解构也可用于赋值上下文，但不需要用小括号包裹表达式，和对象解构的约定不同。

```javascript
let colors = ['red', 'green', 'yellow'],
    firstColor = 'white',
    secondColor = 'black';

[ firstColor, secondColor ] = colors;
console.log(firstColor); // red
```

数组解构赋值可以用来交换变量的值。

```javascript
let a = 1,
    b = 2;

[ a, b ] = [ b, a ];
console.log(a, b); // 2 1
```

> 注意，如果右侧数组解构赋值表达式的值为null 或 undefined， 则会导致程序抛出错误。

### 默认值

可以在数组解构赋值表达式中为数组的任意位置添加默认值，当指定位置的属性不存在或其值为undefined时使用默认值。

```javascript
let colors = ['red'];
let [ first, second = 'white' ] = colors;
console.log(first, second); // red white
```

### 嵌套数组解构

类似嵌套对象解构的语法，在原有数组模式中插入另一个数组模式，即可将解构过程深入到下一个层级。

```javascript
let colors = ['red', 'green', ['yellow', 'white']];
let [, second, [deep]] = colors;
console.log(second, deep); // green yellow
```

### 不定元素

在数组中，可以通过...语法将数组中的其余元素赋值给一个特定的变量。

```javascript
let colors = ['red', 'green', 'yellow'];
let [first, ...other] = colors;
console.log(first, other); // red ["green", "yellow"]
```

数组复制功能：在ES5中，可以使用 concat() 实现。在ES6中，可以使用不定元素实现。

```javascript
// ES5
var colors = ['red', 'green', 'yellow'];
var another = colors.concat();

// ES6
let colors = ['red', 'green', 'yellow'];
let [ ...another ] = colors;
```

> 注意，在被解构的数组中，不定元素必须为最后一个条目，在后面继续添加逗号会导致程序抛出语法错误。

## 3. 混合解构

可以混合使用对象解构和数组解构来创建更多复杂的表达式，即，可以从任何混杂着对象和数组的数据结构中提取你想要的信息。例如：

```javascript
let node = {
    type: 'Identifier',
    name: 'test',
    loc: {
        start: {
            line: 1,
            col: 1,
        },
        end: {
            line: 5,
            col: 3,
        },
    },
    range: [0, 5],
};

let {
    loc: { start },
    range: [ first ],
} = node;

console.log(start, first); // {line: 1, col: 1} 0
```

这种方式极为有效，尤其是从JSON配置中提取信息时，不再需要遍历整个结构了。

## 4. 解构参数

当函数会接收大量可选参数时，我们常会定义一个可选对象options，用来传递这些可选参数。

现在，可以通过解构参数来定义这个options，能够更清晰地了解函数预期传入的可选参数。

```javascript
// ES5
function someone(name, age, options) {
    options = options || {};
    var sex = options.sex,
        from = options.from,
        hobby = options.hobby;
    // ...
}

// ES6
function someone(name, age, { sex, from, hobby }) {
    // ...
}
```

使用解构参数时，调用函数解构参数需要传参，否则程序会抛出错误。实际上，使用解构参数，JavaScript引擎会做这些事情：

```javascript
function someone(name, age, options) {
    let { sex, from, hobby } = options; // options为undefined或null时，会报错
    // ...
}
```

如果希望解构参数仍然是可选的，需要设置默认值。

```javascript
function someone(name, age, { sex, from, hobby } = {}) {
    // ...
}
```

### 解构参数的默认值

可以为解构参数指定默认值，和解构赋值语句的语法类似。如果需要解构参数可选，建议赋予相同解构的默认参数。为了避免冗余代码，可以将默认参数提取到一个独立对象中。而且这样做，还可以保证默认参数的统一，如果要改变默认值，只需改动独立对象中的参数。

```javascript
const setDefaults = {
    sex: 'male',
    from: 'Beijing',
    hobby: 'movies',
};

function someone(name, age,
  	{
    	sex = setDefaults.sex,
    	from = setDefaults.from,
    	hobby = setDefaults.hobby
	} = setDefaults
) {
    // ...
}
```

