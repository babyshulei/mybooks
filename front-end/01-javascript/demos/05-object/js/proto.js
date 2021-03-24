/**
 * 对象原型、原型链
 */
var obj = {
    a: 2,
    get b() {
        return this._b;
    },
    set b(val) {
        this._b = val;
    },
};

var foo = {
    get b() {
        return this._b;
    },
    set b(val) {
        this._b = val;
    },
};

var newObj = Object.create(obj);

foo.b = 10;
console.log(foo.b);

console.log(newObj);
newObj.a = 7; // 在 newObj 上创建屏蔽属性
newObj.b = 15; // 调用原型链上方对应属性的setter，end
console.log(newObj.a, newObj.b, newObj);
console.log(obj.a, obj.b, obj);
console.log(newObj.__proto__ === obj); // true

function Nothing() {
    console.log('The End!');
}

var a = new Nothing();
// The End!
console.log(a); // {}
