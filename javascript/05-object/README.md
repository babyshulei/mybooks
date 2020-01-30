# 扩展对象的功能性

> 2019.12.14 @wsl

## 1. 对象类别

ECMAScript 6 规范清晰定义了每一个类别的对象。对象的类别如下：

- 普通（Ordinary）对象：具有JavaScript对象所有的默认内部行为。
- 特异（Exotic）对象：具有某些与默认行为不符的内部行为。
- 标准（Standard）对象：规范中定义的对象，如 Array、Date等。标准对象既可以是普通对象，也可以是特异对象。
- 内建（Build-in）对象：脚本开始执行时存在与JavaScript执行环境中的对象，所有标准对象都是内建对象。

## 2. 对象字面量语法扩展

### 属性初始值的简写

ES6新增了属性初始化的简写语法，可以消除属性名称与局部变量之间的重复书写。

当一个对象的属性与本地变量同名时，不必再写冒号和值，简单地只写属性名即可。

```javascript
function createPerson(name, age) {
    return {
        name,
        age,
    };
}

// 等价于ES5中的
function createPerson(name, age) {
    return {
        name: name,
        age: age,
    };
}
```

当对象字面量里只有一个属性的名称时，JavaScript引擎会在可访问的作用域中查找其同名变量；如果找到，则该变量的值被赋给对象字面量里的同名属性；如果未找到，会报错（经测试）。

### 对象方法的简写

ES6也改进了对象字面量定义方法的语法。

在ES5中，为对象添加方法，需要指定名称并完整定义函数来实现。

在ES6中，语法更简洁，消除了冒号和function关键字。定义的方法属性被赋值为一个匿名函数表达式，拥有ES5中定义的对象方法所具有的全部特性。二者的唯一区别是，简写方法可以使用super关键字。

```javascript
// ES5
var person = {
    name: 'John',
    sayName: function() {
        console.log(this.name);
    }
};

// ES6
const person = {
    name: 'John',
    sayName() {
        console.log(this.name);
    }
};
```

> 通过对象方法简写语法创建的方法有一个name属性，其值为小括号前的名称，如上面的person.sayName()方法的name属性为sayName。

### 可计算属性名（Computed Property Name）

在ES5及早期版本的对象实例中，如果想要通过计算得到属性名，就需要使用方括号代替点记法。

但是，如果属性名称被包含在一个变量中，或者需要计算才能得到，那么在ES5中是无法为一个对象字面量定义该属性的。

在ES6中，可在对象字面量中使用可计算属性名称，其语法与引用对象实例的可计算属性名称相同，也是使用方括号。同样，也可以使用表达式作为属性的可计算名称。

```javascript
// ES5中
var last = 'lastname';
var person1 = {
    firstname: 'John',
};
person1[last] = 'N';

// ES6中使用可计算属性
var person2 = {
    firstname: 'Alice',
    [last]: 'M',
};

// ES6中可计算属性使用表达式
var suffix = 'name';
var person3 = {
    ['first' + suffix]: 'Amy',
    ['last' + suffix]: 'W',
};
```

## 3. 新增方法

ES6在全局Object对象上引入了一些新方法。

### Object.is()方法

用全等运算符（===）比较JavaScript中的两个值时，有时返回的值并不准确。ES6引入Object.is()方法来弥补全等运算符的不准确运算。

全等运算符的不准确体现在：

- +0 === -0 为true。
- NaN === NaN 为false。需要使用isNaN()方法才能正确检测NaN。

Object.is() 接受两个参数，如果这两个参数类型相同且具有相同的值，则返回true。

```javascript
console.log(+0 == -0); // true
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(5 == 5); // true
console.log(5 === 5); // true
console.log(Object.is(5, 5)); // true

console.log(5 == '5'); // true
console.log(5 === '5'); // false
console.log(Object.is(5, '5')); // false
```

对于Object.is() 方法来说，其运行结果在大部分情况中与===运算符相同，唯一的区别在于+0和-0被识别为不相等，NaN与NaN等价。

### Object.assign()方法

ES6添加了Object.assign()方法，该方法接受一个接收对象和任意数量的源对象，最终返回接收对象。

Object.assign()方法可以接受任意数量的源对象，并按指定顺序将属性复制到接收对象中。所以如果多个源对象具有同名属性，则排位靠后的源对象会覆盖排位靠前的。

```javascript
var receiver = {};
Object.assign(receiver, {
    type: 'js',
    name: 'file.js',
}, {
    type: 'css',
});

console.log(receiver); // {type: "css", name: "file.js"}
```

注意，Object.assign()方法不能讲提供者的访问器属性复制到接收对象中。由于Object.assign()方法执行了赋值操作，因此提供者的访问器属性最终会转变为接收对象中的一个数据属性。

```javascript
var rece = {},
    supplier = {
        get name() {
            return 'file.js';
        }
    };
Object.assign(rece, supplier);
console.log(rece, supplier);
```

console结果：

![1576558280066](.\images\object-assign.png)

## 4. 重复的对象字面量属性

ES5严格模式中加入了对象字面量重复属性的校验，当同时存在多个同名属性时会抛出错误。

ES6中重复属性检查被移除了，严格和未严格模式下，代码都不再检查重复属性，对于每一组重复属性，都会选取最后一个取值。

```javascript
// ES5
'use strict';
var person = {
    name: 'aaa',
    name: 'bbb' // 报语法错误
};

// ES6
'use strict';
var person = {
    name: 'aaa',
    name: 'bbb'
};
console.log(person); // {name: "bbb"}
```

## 5. 自有属性枚举顺序

ES5中未定义对象属性的枚举顺序，由JavaScript引擎厂商自行决定。

ES6则严格规定了对象的自有属性被枚举时的返回顺序，这会影响到Object.getOwnPropertyNames() 方法及 Reflect.ownKeys 返回属性的方式，Object.assign()方法处理属性的顺序也将随之改变。

自有属性枚举顺序的基本规则是：

1. 所有数字键按升序排序
2. 所有字符串键按照它们被加入对象的顺序排序。
3. 所有symbol键按照它们被加入对象的顺序排序。

```javascript
var obj = {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join('')); // 012acbd
```

> 对于for-in循环，仍未指定一个明确的枚举顺序；而Object.keys()方法和JSON.stringify()方法都指明与for-in使用相同的枚举顺序，因此它们的枚举顺序目前也不明晰。

## 6. 增强对象原型

### 改变对象原型

ES5中，正常情况下，通过构造函数或Object.create()方法创建对象，其原型是在对象被创建时指定的。对象原型在实例化之后保持不变。可以通过Object.getPrototypeOf()方法来返回指定对象的原型。

ES6中，添加了Object.setPrototypeOf()方法，通过这个方法可以改变任意指定对象的原型，它接受两个参数：被改变原型的对象及替代第一个参数原型的对象。

### 简化原型访问的Super引用

ES6中引入了Super引用的特性，使用它可以更便捷地访问对象原型。

Super引用相当于指向对象原型的指针，就是Object.getPrototypeOf(this)的值。

```javascript
let person = {
    getGreeting() {
        return "John";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

let friend = {
    getGreeting() {
        // 等同于 Object.getPrototypeOf(this).getGreeting().call(this)
        return super.getGreeting() + ", hi!";
    }
};

Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // John, hi!

Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // Woof, hi!
```

注意，必须要在使用简写方法的对象中使用Super引用，如果在其他方法声明中使用会导致语法错误：

```javascript
let friend = {
    getGreeting: function() {
        // 语法错误
        return super.getGreeting() + ", hi!";
    }
};
```

Super引用在多重继承的情况下非常有用，因为这种情况下，使用Object.getPrototypeOf()方法将会出问题。

Super引用不是动态变化的，它总是指向正确的对象。

```javascript
let person = {
    getGreeting() {
        return "John";
    }
};

let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting().call(this) + ", hi!";
        // return super.getGreeting() + ", hi!";
    }
};

// 原型是friend
let relative = Object.create(friend);

Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // John, hi!
console.log(relative.getGreeting()); // 会进入递归调用直到触发栈溢出报错，如果使用super则会正确输出 John, hi!
```

### 正式的方法定义

ES6之前，没有正式定义过“方法”，方法仅仅是一个具有功能而非数据的对象属性。

ES6中正式将方法定义为一个函数，它有一个内部的[[HomeObject]]属性来容纳这个方法从属的对象。

普通的函数是没有明确定义的[[HomeObject]]属性的。

Super的所有引用都通过[[HomeObject]]属性来确定后续的运行过程。

第一步，在[[HomeObject]]属性上调用Object.getPrototypeOf()方法来检索原型的引用。

然后，搜寻原型找到同名函数。

最后，设置this绑定并且调用相应的方法。

参见之前的Super引用例子。friend.getGreeting()方法的[HomeObject]]属性 --> friend --的原型是--> person，所以super.getGreeting() 等价于 person.getGreeting().call(this)



## 参考链接

[MDN|JavaScript资源](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources)

[Standard ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

