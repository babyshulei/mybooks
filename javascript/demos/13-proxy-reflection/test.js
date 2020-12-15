/**
 * 简单的转发代理
 */
/*
let target = {};
let proxy = new Proxy(target, {});

proxy.name = 'pp';
console.log(proxy.name, target.name);

target.name = 'tt';
console.log(proxy.name, target.name);
*/


/**
 * set 陷阱
 */
let target = {};
let proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw('属性值必须是数字！');
      }
    }

    return Reflect.set(trapTarget, key, value, receiver);
  }
});

target.str = 'skrrrr';
// proxy.test = 'aha'; // throw Error
proxy.count = 120;
console.log(proxy.str, proxy.count); // skrrrr 120

proxy.str = 'miaowu';
console.log(proxy.str, proxy.count); // miaowu 120

/**
 * get 陷阱
 */
let tar = {};
let p = new Proxy(tar, {
  get(trapTarget, key, receiver) {
    if (!(key in receiver)) {
      throw new Error(`属性${key}不存在！`);
    }
    return Reflect.get(trapTarget, key, receiver);
  }
});

p.test = 'get';

console.log(p.test, tar.test); // get get
// console.log(p.hello); // throw Error

/**
 * has 陷阱
 */
let tt = {
  name: 'target',
  val: 'hide',
};

let pp = new Proxy(tt, {
  has(trapTarget, key) {
    if (key === 'val') {
      return false;
    } else {
      return Reflect.has(trapTarget, key);
    }
  }
});

console.log('name' in pp, 'val' in pp, 'test' in pp); // true false false

/**
 * delete 操作符
 */
let obj = {
  name: 'example',
  value: 33,
};

Object.defineProperty(obj, 'name', { configurable: false});

console.log('value' in obj); // true

let result1 = delete obj.value;

console.log(result1, 'value' in obj); // true false

// 严格模式下，下行会抛出一个错误
let result2 = delete obj.name;

console.log(result2, 'name' in obj); // false true
