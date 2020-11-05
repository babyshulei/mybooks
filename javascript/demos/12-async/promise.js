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
