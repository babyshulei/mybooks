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
