/*
// 简单的转发代理
let target = {};
let proxy = new Proxy(target, {});

proxy.name = 'pp';
console.log(proxy.name, target.name);

target.name = 'tt';
console.log(proxy.name, target.name);


// set 陷阱
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


// get 陷阱
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


// has 陷阱
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


// delete 操作符
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


// deleteProperty 陷阱
console.log('================deleteProperty=================')
let tar = {
  able: 11,
  unable: 22,
};
let pro = new Proxy(tar, {
  deleteProperty(trapTarget, key) {
    if (key === 'unable') {
      return false;
    } else {
      return Reflect.deleteProperty(trapTarget, key);
    }
  }
});

console.log('able' in pro, 'unable' in pro); // true true

let res1 = delete pro.able;
let res2 = delete pro.unable;

console.log(res1, res2); // true false
console.log('able' in pro, 'unable' in pro); // false true


// 原型代理陷阱
console.log('============原型代理陷阱============');
let target = {
  name: 'example',
  value: 42,
}

// 通过原型代理陷阱隐藏代理的原型
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return null;
  },
  setPrototypeOf(trapTarget, prototype) {
    return false;
  }
});

console.log(target.__proto__ === Object.prototype, proxy.__proto__ === Object.prototype); // true false
// 成功
Object.setPrototypeOf(target, {});
// 抛出错误
// Object.setPrototypeOf(proxy, {});

let res1 = Object.getPrototypeOf(1);
console.log(res1 === Number.prototype); // true

// 抛出错误
let res2 = Reflect.getPrototypeOf(1);


// 对象可扩展陷阱
let target = {
  name: 'example',
  value: 33,
};

let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget);
  },
  preventExtensions(trapTarget) {
    return false;
  },
});

console.log(Object.isExtensible(target), Object.isExtensible(proxy)); // true true

// 抛出异常
Object.preventExtensions(proxy);

console.log(Object.isExtensible(target), Object.isExtensible(proxy)); // true true
*/

/**
 * 限制添加属性名类型
 */
/*
let target = {};
let proxy = new Proxy(target, {
  defineProperty(trapTarget, key, descriptor) {
    if (typeof key === 'symbol') {
      return false;
    }
    return Reflect.deleteProperty(trapTarget, key, descriptor);
  }
});

Object.defineProperty(proxy, 'aaa', {
  value: 'test',
});

let sym = Symbol('another');
// 抛出错误
Object.defineProperty(proxy, sym, {
  value: 'asymbol',
});
*/

/**
 * 利用 ownKeys 陷阱来过滤掉不想使用的属性键
 */
/*
let target = {};
let proxy = new Proxy(target, {
  ownKeys(trapTarget) {
    return Reflect.ownKeys(trapTarget).filter((key) => {
      return typeof key !== 'string' || key[0] !== '_';
    });
  }
});

let sym = Symbol('test');
proxy.name = 'outer';
proxy._name = 'inner';
proxy[sym] = 'atest';

console.log(proxy);
console.log(Object.getOwnPropertyNames(proxy));
console.log( Object.getOwnPropertySymbols(proxy));
*/


