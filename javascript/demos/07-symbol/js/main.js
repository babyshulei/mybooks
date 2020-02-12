// 创建Symbol
/*
let firstName = Symbol();
let person = {};

person[firstName] = "David";
console.log(person[firstName]); // David
*/


// Symbol函数接受一个可选参数
let firstName = Symbol('first name');
let person = {};

person[firstName] = "David";
console.log(person[firstName]); // David
console.log(firstName); // Symbol(first name)


// 辨识Symbol
let test = Symbol('lalala');
console.log(typeof test); // symbol


// 使用Symbol
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

console.log(man[first], man[last]);


