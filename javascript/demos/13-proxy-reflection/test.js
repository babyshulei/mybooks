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

 