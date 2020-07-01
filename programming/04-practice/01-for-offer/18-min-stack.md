# 包含min函数的栈

## 题目

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

注意：保证测试中不会当栈为空的时候，对栈调用pop()或者min()或者top()方法。

## 题解

### 思路一

在stack[0]处存放最小值，如果有出栈操作，重新获取最小值。

```js
var stack = [];

function push(node)
{
    const minNum = min();
    if (minNum) {
        const len = stack.length;
        stack[len] = node;
        if (node < minNum) {
            stack[0] = node;
        }
    } else {
        stack[0] = node;
        stack[1] = node;
    }
}
function pop()
{
    if (stack.length > 2) {
        stack.length--;
        stack[0] = stack[1];
        for (let i = 1; i < stack.length; i++) {
            const minNum = stack[0];
            if (stack[i] < minNum) {
                stack[0] = stack[i];
            }
        }
    } else {
        stack.length = 0;
    }
}
function top()
{
    const idx = stack.length ? stack.length - 1 : 0;
    return stack[idx];
}
function min()
{
    return stack[0];
}
```

### 思路二

建立一个辅助栈，每次入栈时弹入最小值，并和主栈同时出栈。

```js
var stack = [];
var minStack = [];

function push(node)
{
    const minNum = min();
    if (!minNum || node < minNum) {
        stack.push(node);
        minStack.push(node);
    } else {
        stack.push(node);
        minStack.push(minNum);
    }
}
function pop()
{
    stack.pop();
    minStack.pop();
}
function top()
{
    const idx = stack.length ? stack.length - 1 : 0;
    return stack[idx];
}
function min()
{
    const idx = stack.length ? stack.length - 1 : 0;
    return minStack[idx];
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/practice/4c776177d2c04c2494f2555c9fcc1e49?tpId=13&&tqId=11173&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

