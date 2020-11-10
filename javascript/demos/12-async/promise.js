function MyPromise(fn) {
    this.status = 'pending';

    fn(function(data) {
        this.status = 'resolve';
        return data;
    },function(err) {
        this.status = 'rejected';
        return err;
    });

    return this;
}

var a = new MyPromise((resolve, rejected) => {
    if (true) {
        resolve(1);
    } else {
        rejected(2);
    }
});


class MyStack {
    constructor() {
        this.stack = [];
    }

    push(data) {
        this.stack.push(data);
    }

    pop() {
        this.stack.pop();
    }

    top() {
        const len = this.stack.length;
        return this.stack[len - 1];
    }
}

const newStack = new MyStack();
newStack.push(2);
console.log(newStack, newStack.top());

/**
 * Promise
 */
let promise = new Promise(function(resolve, rejected) {
    console.log('Promise');
    resolve('haha');
});

promise.then((res) => {
    console.log('success', res);
}).catch((err) => {
    console.log('err', err);
});

console.log('Hello!');

/**
 * Promise.resolve(), reject()
 */
let pro1 = Promise.resolve(233);
let pro2 = Promise.reject(7);
pro1
    .then((r) => console.log('succ', r))
    .catch((e) => console.log('err', e));
pro2
    .then((r) => console.log('succ', r))
    .catch((e) => console.log('err', e));
// succ 233
// err 7

/**
 * Thenable
 */
// let thenable = {
//     then(resolve, rejected) {
//         const random = Math.random();
//         // if (random > 0.5) {
//             // resolve(random);
//         // } else {
//             rejected(random);
//         // }
//     }
// };
// let aaa = Promise.resolve(thenable);
// let bbb = Promise.reject(thenable);

// aaa
//     .then((r) => console.log('asucc', r))
//     .catch((e) => console.log('aerr', e));
// bbb
//     .then((r) => console.log('bsucc', r))
//     .catch((e) => console.log('berr', e));
	// 已完成
let thenable = {
    then: function(resovle, reject) {
        console.log('hi');
        resovle(42); 
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);
});

// 已拒绝
let thenable2 = {
    then: function(resolve, reject) {
        console.log('reject');
        reject(30);
    }
};
let p2 = Promise.resolve(thenable2);
p2.catch(function(value) {
    console.log(value);
});
