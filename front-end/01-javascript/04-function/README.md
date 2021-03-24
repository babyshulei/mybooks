# 函数

> 2019.04.21 @wsl 

## 1. 函数形参的默认值

ES5中，对于函数的命名参数，如果不显式传值，其值默认为undefined。

ES6中，函数在声明时，可以指定传参默认值，如果未传入值，则使用默认值。

```javascript
function makeRequest(url, timeout = 2000, callback = function() {}) {
    // 函数体，按照ES6的语法，url是必需参数，其余两个有默认值的是可选参数
}
```

声明函数时，可以为任意参数指定默认值，在已指定默认值的参数后可以继续声明无默认值参数。

```javascript
function makeRequest(url, timeout = 2000, callback) {
    // 函数体
}
```

> 注：指定默认值的参数，在未传值或传入 undefined 时才会使用默认值。其它传参，如0，null 都是生效的。

### 默认参数值对arguments对象的影响

在非严格模式下，命名参数的变化会同步更新到arguments对象中。如下示例：

```javascript
function mixArgs(first, second) {
    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true
}

mixArgs('a', 'b');
```

在严格模式下，无论参数如何变化，arguments对象不再随之改变。

```javascript
function mixArgs(first, second) {
    'use strict';

    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]); // false
    console.log(second === arguments[1]); // false
}

mixArgs('a', 'b');
```

在ES6中，如果一个函数使用了默认参数值，则无论是否显式定义了严格模式，arguments对象的行为都将于ES5严格模式下保持一致。默认参数值的存在使得arguments对象保持与命名参数分离。

```javascript
function mixArgs(first, second = 'b') {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs('a'); // 1 true false false false
mixArgs('a', 's'); // 2 true true false false
```

### 默认参数表达式

默认参数可以非原始值传参，如通过函数执行来得到默认参数的值。注意，初始解析函数声明时不会进行求值，只有在函数调用且需要该默认参数时才会调用。例如：

```javascript
let val = 5;

function getVal() {
    return val++;
}

function add(a, b = getVal()) {
    return a + b;
}

console.log(add(1, 1)); // 2
console.log(add(1)); // 6
console.log(add(1)); // 7
```

> 注意，当使用函数调用结果作为默认参数值时，如果忘记写小括号，如b=getVal，则最终传入的是对函数的引用，而不是函数调用的结果。

正因为默认参数时在函数调用时求值，所以可以使用先定义的参数作为后定义参数的默认值，也可以作为参数传入一个函数得到后定义参数的默认值。

注意，在引用参数默认值时，只允许引入前面参数的值，先定义的参数不能访问后定义的参数。

```javascript
function getVal(v) {
    return v + 5;
}

function add(a, b = getVal(a)) {
    return a + b;
}

function add2(a = b, b) {
    return a + b;
}

console.log(add(1, 1)); // 2
console.log(add(1)); // 7
console.log(add2(1, 1)); // 2
console.log(add(undefined, 1)); // 抛出错误
```

先定义的参数，不能访问后定义的参数，原因是定义参数时会为每个参数创建一个新的标识符绑定，该绑定在初始化之前不可被引用，如果试图访问会导致程序抛出错误。

函数参数有自己的作用域和临时死区，其与函数体的作用域是各自独立的，也就是说参数的默认值不可访问函数体内声明的变量。

## 2. 处理无名参数

JavaScript的函数语法不限制调用时传入的实际参数数量，因此，函数处理时，除了命名参数，还可能出现无名参数。

早先，JavaScript 提供 arguments 对象来检查函数的所有参数，从而不必定义每一个要用的参数。

ES6中，引入不定参数（rest parameters）来解决这个问题。

### 不定参数

在函数的命名参数前添加 ... 就表明这是一个不定参数，该参数为一个数组，包含着自它之后传入的所有参数。例如，实现一个pick方法，传入一个对象和一些属性，返回给定对象的副本，包含原始对象属性的特定子集：

```javascript
// 使用arguments的写法
function pick(object) {
    let result = Object.create(null);
    
    for(let i = 1, len = arguments.length; i < len; i++) {
        result[arguments[i]] = object[arguments[i]];
    }
    
    return result;
}

// 使用不定参数
function pick(object, ...keys) {
    let result = Object.create(null);
    
    for(let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }
    
    return result;
}
```

可以看到，使用不定参数后，函数逻辑更加清晰明了。

> 函数的length属性统计的是命名参数的数量，不定参数不会影响length属性的值。因此，上面的pick函数的length都为1。

### 不定参数的使用限制

1）每个函数最多只能声明一个不定参数，而且一定要放在所有参数的末尾。

2）不定参数不能用于对象字面量setter之中。例如：

```javascript
let object = {
    // 会抛出语法错误：不可以在setter中使用不定参数
    set name(...value) {
        // ...
    }
}
```

这是因为对象字面量setter的参数有且只能有一个，这与不定参数的定义冲突。

### arguments对象的兼容

无论是否使用不定参数，arguments对象总是包含所有传入函数的参数。

## 3. 增强的Function构造函数

Function构造函数可以动态创建新的函数，传参为字符串形式的参数，分别为函数的参数及函数体。

ES6支持在创建函数时定义默认参数和不定参数，示例如下：

```javascript
// 语法
new Function ([arg1[, arg2[, ...argN]],] functionBody)

// ES5
var add = new Function('first', 'second', 'return first + second');

// ES6，支持默认参数
const sum = new Function('first', 'second = first', 'return first + second');
// ES6，支持不定参数
const pickFirst = new Function('...args', 'return args[0]');
```

> 使用 Function 构造器生成的 Function 对象是在函数创建时解析的。这比使用函数声明或者函数表达式并调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的。
>
> Function构造函数的作用域是全局作用域。

## 4. 展开运算符

展开运算符可以将数组在语法层面上展开，变为用逗号分隔的参数序列。

可以替代apply()的应用场景。例如：

```javascript
let val = [1, 4, 7, 3];

console.log(Math.max.apply(Math, val)); // Math.max()不能直接传入数组，因此使用apply传入参数
console.log(Math.max(...val)); // 用展开运算符替代apply()
```

> 展开运算符还有很多应用，如合并数组，解构赋值，浅拷贝等等，参见[阮一峰|数组的扩展](https://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

## 5. name属性

函数的name属性，为函数实例的名称。

函数声明和函数表达式都返回其定义的名称，其中，函数声明的名字比函数本身被赋值的变量的权重高。

getter函数的名称前会加“get”，setter函数的名称前会加“set”，通过bind()函数创建的函数，名称前会加“bound”。通过Function构造函数创建的函数，名称为“anonymous”。

```javascript
function doSomething() { }
var f1 = function() {};
var f2 = function anotherF() {};
var person = {
    get firstName() {
        return 'first'
    },
    sayName: function() {
        console.log(this.name);
    }
};

// 函数声明
console.log(doSomething.name); // doSomething
// 函数表达式
console.log(f1.name); // f1
// 函数声明和函数表达式同时存在
console.log(f2.name); // anotherF
// 对象字面量
console.log(person.sayName.name); // sayName
// getter函数
console.log(person.firstName.name); // get firstName
// 通过bind()函数创建的函数
console.log(f1.bind().name); // bound f1
// 通过构造函数创建的函数
console.log((new Function).name); // anonymous
```

## 6. 明确函数的多重用途

ES5及早期版本的函数具有多重功能，可以结合new使用，函数体内的this值将指向一个新对象，函数最终会返回这个对象。例如：

```javascript
function Person (name) {
    this.name = name;
}

const per1 = new Person('John');
const per2 = Person('John');

console.log(per1, per2); // Person {name: "John"} undefined
```

JavaScript函数有两个不同的内部方法，[[Call]] 和 [[Construct]]。当通过new关键字调用函数时，执行的是[[Construct]]函数，它负责创建一个通常被称为实例的新对象，然后再执行函数体，将this绑定到实例上；如果不通过new关键字调用函数，则执行[[Call]]函数，从而直接执行代码中的函数体。

具有[[Construct]]方法的函数被统称为构造函数。

不是所有的函数都有[[Construct]]方法，因此不是所有函数都可以通过new来调用，例如箭头函数就没有[[Construct]]方法。

### 元属性 new.target

在ES5中，函数体内部是无法判断函数是否是通过 new 关键字来调用的，可以通过 instanceof 来过滤this，但是这个方法是不完全可靠的，例如call、apply方法可以将this绑定到指定实例上。

在ES6中，为了解决这个问题，引入了new.target这个元属性。元属性是指非对象的属性，其可以提供非对象目标的补充信息，例如new。当调用函数的[[Construct]]方法时，new.target 被赋值为new操作符的目标，通常是新创建对象实例，即函数体内this的构造函数；如果调用[[Call]]方法，则new.target的值为undefined。

通过这个方法，就可以安全地检测一个函数是否通过new关键字调用的。注意，函数外使用new.target是一个语法错误。

```javascript
// ES5判断函数被调用的方法
function Person (name) {
    if (this instanceof Person) {
        this.name = name;
    } else {
        console.log('Error!');
    }
}

// ES6中判断函数是否通过关键字new调用
function Person (name) {
    if (typeof new.target !== undefined) { // 或 new.target === Person
        this.name = name;
    } else {
        console.log('Error!');
    }
}
```

## 7. 块级函数

在ES3和早期版本中，在代码块中声明一个块级函数严格来说是一个语法错误。但是所有的浏览器仍然支持这个特性，可是稍有不同，所以最好不要使用这个特性。

在ES5中，规范了这种行为，严格模式下，在代码块中声明函数时会抛出错误。

在ES6中，严格模式下，会将函数视作一个块级声明，可以在定义该函数的代码块内访问和调用它。

```javascript
"use strict"

if (true) {
    console.log(typeof doSomething); // function
    
    function doSomething() { }
}

console.log(typeof doSomething); // undefined
```

在定义函数的代码块内，块级函数会被提升至顶部，所以在函数定义的位置前调用它，还是能返回正确的结果。而代码块之外，函数将不再存在。

### 块级函数与let函数表达式

块级函数与let函数表达式类似，作用域为块级作用域。但是，在代码块中，块级函数会被提升至块的顶部，而用let定义的函数表达式不会被提升。

```javascript
"use strict"

if (true) {
    console.log(typeof doSomething); // 临时死区，会抛出错误
    let doSomething = function () {}
    doSomething();
}

console.log(typeof doSomething); // undefined
```

### 非严格模式下的块级函数

在ES6中，非严格模式下，也可以声明块级函数，但其行为与严格模式下稍有不同。这些函数不再提升至代码块的顶部，而是提升至外围函数或全局作用域的顶部。

## 8. 箭头函数

箭头函数是一种使用箭头（=>）定义函数的新语法，它与传统的JavaScript函数有些许的不同，主要有以下方面：

- 没有this、super、arguments和new.target绑定。

  箭头函数的这些值由外围最近一层非箭头函数决定。

- 不能通过new关键字调用。

  箭头函数没有[[Construct]]方法，所以不能被用作构造函数，如果通过new关键字调用会报错。

- 没有原型。

  由于不可以通过new关键字调用，因为没有构建原型的需求，所以箭头函数不存在prototype这个属性。

- 不可以改变this的绑定。

  函数内部的this值不可被改变，在函数的生命周期内始终保持一致。

- 不支持arguments对象。

  箭头函数没有arguments绑定，只能通过命名参数和不定参数这两种形式访问函数的参数。

- 不支持重复的命名参数。

  在严格、非严格模式下，箭头函数都不支持重复的命名参数；而在传统函数的规定中，只有在严格模式下才不能有重复的命名参数。

> 箭头函数有name属性，和其他函数的规则相同。

### 箭头函数语法

箭头函数由函数参数、箭头、函数体组成，根据使用的需求，参数和函数体可以分别采取多种不同的形式。

1、只有一个参数时，可以直接写参数名。

2、要传入两个或两个以上的参数，要在参数两侧添加一对小括号。

3、如果函数没有参数，也要在声明时写一组没有内容的小括号()。

4、如果函数体只有一条语句，可以直接返回，如果是return语句，就去掉return，直接返回return的表达式。

5、如果函数体是由多个表达式组成的，需要用花括号包裹函数体，并显式定义一个返回值。

6、如果想创建一个空函数体，需要写一对没有内容的花括号{}。

7、如果想让箭头函数向外返回一个对象字面量，则需要将该字面量包裹在小括号里，这是为了将其与函数体区分开来。

```javascript
const reflect = val => val; // 1, 4

const sum = (n1, n2) => n1 + n2; // 2, 4

const getName = () => "John"; // 3, 4

const ans = (n1, n2) => { // 2, 5
    const sum = n1 + n2;
    return sum * sum;
};

const nop = () => {}; // 3, 6

const getItem = id => ({ id: id, name: 'Temp'}); // 1, 7
```

### 创建立即执行函数表达式IIFE

fuction函数可以定义匿名函数并立即调用，自始至终不保存对该函数的引用。这种方式常用来创建一个与其他程序隔离的作用域。

只要将箭头函数包裹在小括号里，就可以用它实现相同的功能。

```javascript
let person = function(name) {
    return {
        getName: function() {
            return name;
        }
    };
}('John');
console.log(person.getName()); // John

// 箭头函数的写法
let person = ((name) {
    return {
        getName: function() {
            return name;
        }
    };
})('John');
```

> 注意，小括号只包裹箭头函数定义，没有包含调用传参，与function函数有所不同。

### 箭头函数没有this绑定

箭头函数中没有this绑定，必须通过查找作用域链来决定其值。如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this；否则，this的值会被设置为全局对象。并且，不能通过call()、apply()、bind()方法来改变this的值。

### 箭头函数没有arguments绑定

箭头函数没有自己的arguments对象，且未来无论函数在哪个上下文中运行，箭头函数始终可以访问外围函数的arguments对象。

```javascript
function createArrowFuncReturningFirstArg() {
    return () => arguments[0];
}

const arrowFunc = createArrowFuncReturningFirstArg(5);

console.log(arrowFunc()); // 5
```

### 箭头函数的辨识方法

箭头函数在被typof和instanceof操作符调用时，和其他函数表现一致。

同样，仍然可以在箭头函数上调用call()、apply()、bind()方法，但与其他函数不同的是，箭头函数的this值不会受这些方法的影响。

```javascript
const comp = (a, b) => a - b;
console.log(typeof comp); // function
console.log(comp instanceof Function); // true

const sum = (n1, n2) => n1 + n2;
console.log(sum.call(null, 1, 2)); // 3
console.log(sum.apply(null, [1, 2])); // 3

const boundSum = sum.bind(null, 1, 2);
console.log(boundSum()); // 3
```

## 9. 尾调用优化

尾调用指的是函数作为另一个函数的最后一条语句被调用。

ES5中，尾调用的实现与其他函数调用的实现类似：创建一个新的栈帧（stack frame），将其推入调用栈来表示函数调用。

ES6缩减了严格模式下尾调用栈的大小，如果满足一下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧：

- 尾调用不访问当前栈帧的变量（也就是说函数不是一个闭包）。
- 在函数内部，尾调用是最后一条语句。
- 尾调用的结果作为函数值返回。

```javascript
"use strict"
function doSomething() {
    return doSomethingElse(); // 会被优化
}
```

递归函数是其最主要的应用场景，此时尾调用优化的效果最显著。



## 参考链接

[MDN|展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

[MDN|Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

[MDN|Function.name](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name)

