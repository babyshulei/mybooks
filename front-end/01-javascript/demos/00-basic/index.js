/**
 * 实现 a == 1 && a == 2 && a == 3 为true
 */
/*
var a = {
  i: 1,
  valueOf() {
    return a.i++;
  },
  // toString() {
  //   return a.i++;
  // },
};

console.log(a == 1 && a == 2 && a == 3); // true
*/

/*
const a = {
  i: 1,
  valueOf: function () {
    console.log('value of');
    return a.i++;
  },
  toString: function () {
    console.log('to string');
    return a.i++;
  }
}
// x == y ： x为object，y为string/number时，会调用 toPrimitive(x) == y
// toPrimitive()未传入PreferredType时，会先调用valueOf再调用toString
if (a == 1 && a == 2 && a == 3) {
  console.log('hello world!');
}
*/

/**
 * 实现 a === 1 && a === 2 && a === 3 为true
 */
/*
var value = 1;
Object.defineProperty(window, 'a', {
  get() {
    return this.value++;
  }
});

console.log(a === 1 && a === 2 && a === 3);
*/


// 获取数据类型
function Person(name) {
  this.name = name;
}

var per = new Person('Amy');
var arr = new Array();

console.log(getType(per), getType(arr), getType(null), getType(undefined));

function getType(param) {
  let type = typeof param;

  if (type === 'object') {
    type = getObjectType(param);
  }

  return type;

  function getObjectType(obj) {
    const str = Object.prototype.toString.call(obj);
    return str.slice(8, str.length - 1);
  }
}
