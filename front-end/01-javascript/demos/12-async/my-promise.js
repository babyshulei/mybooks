/**
 * 简版Promise
 */

const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.reason = null;

  that.resolveCbs = [];
  that.rejectCbs = [];

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULLFILLED;
      that.value = value;
      that.resolveCbs.map(cb => cb(value));
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.rejectCbs.map(cb => cb(reason));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFullFilled, onRejected) {
  const that = this;
  if (that.status === PENDING) {
    that.resolveCbs.push(onFullFilled);
    that.rejectCbs.push(onRejected);
  }
  if (that.status === FULLFILLED) {
    onFullFilled(that.value);
  }
  if (that.status === REJECTED) {
    onRejected(that.reason);
  }
  return that;
}

MyPromise.prototype.catch = function(onRejected) {
  const that = this;
  if (that.status === PENDING) {
    that.rejectCbs.push(onRejected);
  }
  if (that.status === REJECTED) {
    onRejected(that.reason);
  }
  return that;
}

const hello = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('Hello world!');
    resolve('hello');
  }, 1000);
});

hello.then((val) => {
  console.log('then', val);
}).then(() => {
  console.log('then2');
});

const err = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('err!'));
  }, 1000);
});

err.catch((e) => {
  console.log('catch error', e);
})
