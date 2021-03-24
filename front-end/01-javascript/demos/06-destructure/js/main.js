// 解构声明变量
/*
let node = {
    start: 'hello',
    name: 'world',
};

let { start, name } = node;
console.log(start, name);
*/

// 未提供初始化程序，会报语法错误。
// let { type };

// 解构赋值
/*
let node = {
        start: 'hello',
        name: 'world',
    },
    start = 'st',
    name = 'test';

({ start, name } = node);
console.log(start, name);
*/

// 用在函数传参中
/*
let node = {
    start: 'hello',
    name: 'world',
},
start = 'st',
name = 'test';

function output(value) {
    console.log(value === node);
}

output({ start, name } = node);
console.log(start, name);
*/

// 默认值
// let node = {
//     start: 'hello',
//     name: 'world',
// };

// let { start, name, value = 'haha', end } = node;
// console.log(start, name, value, end);

// 为非同名局部变量赋值
let node = {
    start: 'hello',
};

let { start: localStart, name: localName = 'test' } = node;
console.log(localStart, localName);