# JavaScript中的类

## 类的声明

ES6 可以通过 class 关键字声明一个类，例如：

```js
class PersonClass {
    // 构造函数，为保留的方法名
    constructor(name) {
        // 自有属性，为实例中的属性，不会出现在原型上，且只能在构造函数或方法中创建
        this.name = name;
    }
    // 等价于 PersonClass.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}

let person = new PersonClass('John');
person.sayName(); // John
console.log(person instanceof PersonClass); // true
console.log(person instanceof Object); // true
console.log(typeof PersonClass); // function
console.log(typeof PersonClass.prototype.sayName); // function
```

类声明仅仅是基于已有自定义类型声明的语法糖。

**类声明和函数声明的区别**：

- 函数声明可以被提升，而类声明和let声明类似，不能被提升；真正执行声明语句前，它们会一直存在于临时死区中。
- 类声明中的代码自动运行在严格模式下，无法强行让代码脱离严格模式执行。
- 类声明的方法都是**不可枚举**的，自定义类型中需要通过 Object.defineProperty() 方法手动指定某个方法为不可枚举。
- 每个类都有一个 [[Construct]] 的内部方法，通过 new 关键字调用那些不含 [[Construct]] 的方法会导致程序抛出错误。
- 使用除关键字 new 以外的方式调用类的构造函数会导致程序抛出错误。
- 在类中修改类名会导致程序报错。
- 与函数不同，类属性不可被赋予新值，为只读属性，如 PersonClass.prototype。

So，上例的等价代码如下：

```js
let PersonClass2 = (function() {
    'use strict';
    const PersonClass2 = function (name) {
        if (typeof new.target === 'undefined') {
            throw new Error('必须通过 new 关键字调用构造函数');
        }
        this.name = name;
    };
    
    Object.defineProperty(PersonClass2.prototype, 'sayName', {
        value: function () {
            if (typeof new.target !== 'undefined') {
                throw new Error('不可使用 new 关键字调用该方法');
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true,
    });
    
    return PersonClass2;
}());
```

> 类的名称只在类中为常量，所以尽管不能在类中修改类名，但是可以在外部修改：
>
> ```js
> class Foo {
>     constructor() {
>         Foo = 'bar'; // 抛出错误
>     }
> }
> 
> Foo = 'bar'; // 在外部可以修改
> ```

## 类表达式

类似函数有声明形式和表达式形式，类也有声明形式和表达式形式。

基本表达式语法如下：

```js
let ClassName = class {
    constructor() {}
    someMethod() {}
};
```

命名表达式：

```js
// 标识符 ClassName2 只存在于类定义中
let ClassName = class ClassName2 {
    constructor() {}
    someMethod() {}
};

console.log(typeof ClassName); // function
console.log(typeof ClassName2); // undefined
```

## 作为一等公民的类

在程序中，一等公民是指一个可以传入函数，可以从函数返回，并且可以赋值给变量的值。

ES6 将类也设计为一等公民，允许通过多种方式使用类的特性。

例如，可以将类作为参数传入函数中。

```js
function createObj(classDef) {
    return new classDef();
}

let obj = new createObj(class {
    sayHi() {
        console.log('Hello');
    }
});

obj.sayHi(); // Hello
```

通过立即调用类构造函数可以创建单例。形如 `new class {}(params)`。

```js
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('John');
console.log(person.sayName); // John
```

## 类的方法、属性

类的方法参见类的声明小节。类声明的方法和属性都是不可枚举的。

### 访问器属性

类支持在原型上定义访问器属性。创建 getter，需要在关键字 get 后紧跟一个空格和相应的标识符；创建 setter，将关键字 get 替换为 set 即可。

```js
class Person {
    constructor(name) {
        this.name = name;
        this.firstname = 'X';
    }
    get first() {
        return this.firstname;
    }
    set first(val) {
        this.firstname = val;
    }
}

const per = new Person('John');
console.log(per.first); // X
per.first = 'Brown';
console.log(per.first); // Brwon

const desc = Object.getOwnPropertyDescriptor(Person.prototype, 'first');
console.log('get' in desc, 'set' in desc, desc.enumerable); // true true false
```

非类形式的等价实现：

```js
let Person = (function() {
    'use strict';

    const Person = function(name) {
        if (typeof new.target === 'undefined') {
            throw new Error('必须通过new关键字调用构造函数');
        }
        this.name = name;
    };
    Object.defineProperty(Person.prototype, 'first', {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.firstname;
        },
        set: function(val) {
            this.firstname = val;
        },
    });
    return Person;
}());
```

### 可计算成员名称

类方法和访问器属性也支持使用可计算名称。

```js
const method = 'sayName';
const property = 'first';

class Person {
    constructor(name) {
        this.name = name;
    }
    [method]() {
        console.log('Hello,', this.name);
    }
    get [property]() {
        return this.firstname || 'def';
    }
    set [property](val) {
        this.firstname = val;
    }
}

const per = new Person('John');
per.sayName(); // Hello, John
console.log(per.first); // def
```

### 生成器方法

通过在方法名前加一个星号（*），可以将任何方法定义成生成器。

也可以通过 Symbol.iterator 定义生成器方法，来为类定义默认迭代器。

```js
class Collection {
    constructor() {
        this.items = [];
    }
    *[Symbol.iterator]() {
        yield *this.items.values();
    }
    *createIte() {
        yield 1;
        yield 2;
    }
}

const coll = new Collection();
const ite = coll.createIte();
console.log(ite.next(), ite.next()); // { value: 1, done: false} { value: 2, done: false}

coll.items.push(4, 5, 6);

for (v of coll) {
    console.log(v); // 4 5 6
}
```

### 静态成员

ES5 中，通过将方法添加到构造函数中来模拟静态成员。

```js
function Example(name) {
    this.name = name;
}

// 静态方法
Example.test = function () {
    console.log('test');
}

// 实例方法
Example.prototype.hello = function () {
    console.log('hello');
}

var exp = new Example('haha');
exp.hello(); // hello
Example.test(); // test
```

ES6中，在类里可以通过 `static` 关键字来定义静态方法或访问器属性，唯一的限制是不能定义构造函数方法。

```js
class Example {
    constructor(name) {
        this.name = name;
    }
    // 等价于 Example.prototype.hello
    hello() {
        console.log('hello');
    }
    // 等价于 Example.test
    static test() {
        console.log('test');
    }
}

const exp = new Example('haha');
exp.hello(); // hello
Example.test(); // test
```

## 继承与派生类

ES6 可以用 `extends` 关键字指定类继承的函数。通过调用 `super()` 方法即可访问基类的构造函数。

```js
class Base {
    constructor(str1, str2) {
        this.a = str1;
        this.b = str2;
    }
    hello() {
        console.log(this.a, this.b);
    }
}

class Same extends Base {
    constructor(str) {
        // 等价于 Base.call(this, str, str);
        super(str, str);
    }
}

const b = new Base('aa', 'bb');
const s = new Same('ss');
b.hello(); // aa bb
s.hello(); // ss ss
```

注意：

1. 继承自其它类的类被称作派生类，如果在派生类中指定了构造函数则必须要调用 super()，否则会报错。
2. 如果不使用构造函数，则当创建新的类实例时会自动调用 super() 并传入所有参数。
3. 只可在派生类的构造函数中使用 super()，如果在非派生类或函数中使用会报错。
4. super() 负责初始化 this，在派生类的构造函数中访问 this 前一定要调用 super()，否则会报错。

### 类方法遮蔽

派生类中的方法会覆盖基类中的同名方法。如果想调用基类中的该方法，则可以调用 super.method() 方法。

```js
class Base {
    constructor(str1, str2) {
        this.a = str1;
        this.b = str2;
    }
    hello() {
        console.log('Base:', this.a, this.b);
    }
}

class Same extends Base {
    constructor(str) {
        // 等价于 Base.call(this, str, str);
        super(str, str);
    }
    hello() {
        super.hello();
        console.log('Same:', this.a, this.b);
    }
}

const b = new Base('aa', 'bb');
const s = new Same('ss');
b.hello(); // Base: aa bb
s.hello(); // Base: ss ss Same: ss ss
```

### 静态成员继承

如果基类有静态成员，那么这些静态成员在派生类中也可用。

```js
class Example {
    constructor(name) {
        this.name = name;
    }
    hello() {
        console.log('hello');
    }
    static test() {
        console.log('test');
    }
}

class Test extends Example {
}

const tt = new Test('haha');
tt.hello(); // hello
Test.test(); // test
console.log(tt instanceof Test, tt instanceof Example); // true true
```

### 派生自表达式的类

ES6中，只要表达式可以被解析为一个函数并且具有[[Construct]]属性和原型，那么就可以用extends进行派生。

由此使得类可以继承自任意类型的表达式，从而创造更多可能性，例如动态地确定类的继承目标。

```js
function Rec(name) {
    this.name = name;
}

Rec.prototype.say = () => {
    console.log('hello');
}

function getClass() {
    return Rec;
}

class Sec extends getClass() {
    constructor(name) {
        super(name);
    }
}

const test = new Sec('test');
test.say(); // hello
console.log(test instanceof Rec); // true
```

由于可以动态确定基类，因而可以创建不同的继承方法。

```js
let mix1 = {
    fun1() {
        console.log('fun1');
    }
};

let mix2 = {
    fun2() {
        console.log(this.name);
    }
};

function mixin(...mixins) {
    var base = function() {};
    Object.assign(base.prototype, ...mixins);
    return base;
}

class ClassA extends mixin(mix1, mix2) {
    constructor(name) {
        super();
        this.name = name;
    }
}

const x = new ClassA('aa');
x.fun1(); // fun1
x.fun2(); // aa
```

> 注意，由于使用了extends，因此在构造函数中需要调用 super()。如果多个mixin对象具有相同属性，那么只有最后一个被添加的属性被保留。
>
> 在 extends 后可以使用任意表达式，但不是所有表达式最终都能合成合法的类。如果使用 null 或生成器函数会导致错误发生，类在这些情况下没有[[Construct]]属性，尝试为其创建新的实例会导致程序无法调用 [[Construct]]而报错。

### 内建对象的继承

ES5 中无法实现内建对象的继承，ES6 可以通过 extends 实现正确地继承内建对象。

示例：

```js
function MyArray() {
    Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true,
    }
});

var colors = new MyArray();
colors[0] = 'red';
console.log(colors.length); // 0（length属性未继承）
```

ES6中：

```js
class MyArray extends Array {}

var colors = new MyArray();
colors[0] = 'red';
console.log(colors.length); // 1（length属性继承成功）
```

### Symbol.species 属性

Symbol.species 属性被用于定义返回函数的静态访问器属性。

内建对象的继承中，原本在内建对象中返回实例自身的方法将自动返回派生类的实例。已定义 Symbol.species 属性的内建类型有：

- Array
- ArrayBuffer
- Map
- Promise
- RegExp
- Set
- Typed arrays

例如：

```js
class MyArray extends Array {}
let items = new MyArray(1, 2, 3);
let subitems = items.slice(1, 3);

console.log(items instanceof MyArray); // true
console.log(subitems instanceof MyArray); // true
```

自定义的类中使用 Symbol.species 属性：

```js
class MyClass {
    static get [Symbol.species]() {
        return this;
    }
    constructor(value) {
        this.value = value;
    }
    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}

class ExtClass1 extends MyClass {}

class ExtClass2 extends MyClass {
    static get [Symbol.species]() {
        return MyClass;
    }
}

const instance1 = new ExtClass1('aa'),
      clone1 = instance1.clone(),
      instance2 = new ExtClass2('bb'),
      clone2 = instance2.clone();

console.log(clone1 instanceof ExtClass1); // true
console.log(clone1 instanceof MyClass); // true
console.log(clone2 instanceof ExtClass2); // false
console.log(clone2 instanceof MyClass); // true
```

注意，这里只有一个 getter 方法却没有 setter 方法，是因为在这里不可以改变类的种类。

### 在类的构造函数中使用 new.target

在简单情况下，new.target 等于类的构造函数；但是，每个构造函数都可以根据自身被调用的方式改变自己的行为，所以会出现 new.target 的值改变的场景。由此可以有一些应用，比如通过 new.target 创建一个抽象基类。

```js
// 抽象基类
class Shape {
    constructor() {
        if (new.target === 'Shape') {
            throw new Error('这个类不能被直接实例化');
        }
    }
}

class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}

const sh = new Shape(); // 抛出错误
const rec = new Rectangle(1, 2); // 没有错误
```

> 因为类必须通过 new 关键字才能调用，所以在类的构造函数中，new.target 属性永远不会是 undefined。

