# 裴波那契数列

## 题目

```
大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。n<=39
f(n) = f(n-1) + f(n-2) (n>1)
```



## 题解

### 错误范例

```js
function Fibonacci(n)
{
    // write code here
    if (n <= 0) {
        return 0;
    }
    
    if (n === 1) {
        return 1;
    }
    
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

上面的递归方案有很严重的效率问题，相同数字需要计算多次求解。

### 第一版

```js
function Fibonacci(n)
{
    if (n < 2) {
        return n;
    }

    var front = 0;
    var after = 1;
    var ret = 0;
    for (let count = 2; count <= n; count++) {
        ret = front + after;
        front = after;
        after = ret;
    }
    
    return ret;
}
```



## 参考链接

<https://leetcode-cn.com/problems/fibonacci-number/>

<https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/>

<https://www.nowcoder.com/practice/c6c7742f5ba7442aada113136ddea0c3?tpId=13&tqId=11160&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking>

