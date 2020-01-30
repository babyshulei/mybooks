function Person (name) {
    this.name = name;
}

const per1 = new Person('John');
const per2 = Person('John');

console.log(per1, per2);

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
    if (typeof new.target !== undefined) {
        this.name = name;
    } else {
        console.log('Error!');
    }
}

const aa = new Person('John');
const bb = Person('John');
