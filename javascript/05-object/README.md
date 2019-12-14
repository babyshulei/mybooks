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



## 参考链接

[MDN|JavaScript资源](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources)

[Standard ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

