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

function createAnimal(name) {
    return {
        name,
        sex, // 会报错
    };
}

// ES5
var person = {
    name: 'John',
    sayName: function() {
        console.log(this.name);
    }
};

// ES6，对象方法的简写
// const person = {
//     name: 'John',
//     sayName() {
//         console.log(this.name);
//     }
// };

// 可计算属性
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

console.log(person1, person2, person3);

// Object.is()方法
console.log(+0 == -0);
console.log(+0 === -0);
console.log(Object.is(+0, -0));

console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));

console.log(5 == 5);
console.log(5 === 5);
console.log(Object.is(5, 5));

console.log(5 == '5');
console.log(5 === '5');
console.log(Object.is(5, '5'));