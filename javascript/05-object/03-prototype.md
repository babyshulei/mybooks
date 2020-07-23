# 原型、原型链

许多面向对象语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。

ECMAScript 没有接口的概念，只支持实现继承，实现继承主要是依靠原型链来实现的。

## 原型

创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。默认情况下，所有的原型对象都会自动获得一个constructor属性，这个属性是指向一个prototype属性所在的函数指针。

例如，创建了一个Person函数，那么 Person.prototype.constructor 指向 Person。

通过函数创建的实例，包含一个指向原型对象的内部指针。即`__proto__`属性。

例如：

```js
function Person() {}

var person = new Person();

console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
```

### 显式原型，隐式原型

1. 每个函数function都有一个prototype，即显式原型(属性)
2. 每个实例对象都有一个`__proto__`，可称为隐式原型(属性)
3. 对象的隐式原型的值为其对应构造函数的显式原型的值

区别：

`__proto__`是每个对象都有的一个属性，而prototype是函数才会有（函数也有`__proto__`）的属性。

`__proto__`指向的是当前对象的原型对象，而prototype指向它的构造函数的原型对象。

## 原型链

基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。

每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（**prototype** ）。该原型对象也有一个自己的原型对象( `__proto__` ) ，层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节。

例如：

```js
function Person() {}

var person = new Person();

console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__.__proto__ === Object.prototype); // true
console.log(person.__proto__.__proto__.__proto__ === null); // true
```



## 参考链接

[继承与原型链- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有 ...](https://blog.csdn.net/weixin_40387601/article/details/80327955)

