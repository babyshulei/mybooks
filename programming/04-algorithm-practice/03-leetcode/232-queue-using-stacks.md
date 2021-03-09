# 用栈实现队列

## 题目

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列的支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

- `void push(int x)` 将元素 x 推到队列的末尾
- `int pop()` 从队列的开头移除并返回元素
- `int peek()` 返回队列开头的元素
- `boolean empty()` 如果队列为空，返回 true ；否则，返回 false


说明：

- 你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。


进阶：

- 你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。

示例：

```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```


提示：

- 1 <= x <= 9
- 最多调用 100 次 push、pop、peek 和 empty
- 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）



## 题解

### 题解一

用栈操作写队列：

```js
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.queue = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.queue.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    // const ret = this.queue.shift();
    const length = this.queue.length;
    if (length === 0) {
        return;
    }
    const ret = this.queue[0];

    for(let i = 0; i < length - 1; i++) {
        this.queue[i] = this.queue[i + 1];
    }

    this.queue.pop();

    return ret;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.queue[0];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    if (this.queue.length) {
        return false;
    } else {
        return true;
    }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

#### 优化

设置首位索引，弹出队列时就不用平移数组了。

注：可以设置一个限制长度，超过时一起平移数组。

```js
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.queue = [];
    this.start = 0;
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.queue.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    const length = this.queue.length;
    if (length > this.start) {
        this.start++;
        return this.queue[this.start - 1];
    }
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.queue[this.start];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    if (this.queue.length > this.start) {
        return false;
    } else {
        return true;
    }
};
```



### 题解二：双栈

一个输入栈、一个输出栈。push操作输入栈，peek操作输出栈；如果输出栈为空，将输入栈pop并push到输出栈，这样输出栈每次弹出都是队首。

```js
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.input = [];
    this.output = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.input.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (!this.output.length) {
        while(this.input.length) {
            this.output.push(this.input.pop());
        }
    }
    return this.output.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (!this.output.length) {
        while(this.input.length) {
            this.output.push(this.input.pop());
        }
    }
    return this.output[this.output.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.input.length === 0 && this.output.length === 0;
};
```

复杂度：

- 时间复杂度：push和empty为O(1)，pop和peek为均摊O(1)
- 空间复杂度：O(n)



## 参考链接

[232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)





