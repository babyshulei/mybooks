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



## 扩展问题：跳台阶

```
一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
```

### 题解

n = 1时，有1种跳法；

n = 2时，有2种跳法；

n > 2时，假设有f(n)种跳法，如果青蛙第一步跳了1级，就是f(n-1)种跳法；如果第一步跳了2级，就是f(n-2)种跳法；可得 f(n) = f(n-1) + f(n-2)。即裴波那契数列。

```js
function jumpFloor(number)
{
    if (number === 1) {
        return 1;
    } else if (number === 2) {
        return 2;
    }
    
    var result = 0;
    var first = 1;
    var second = 2;
    for(let i = 2; i < number; i++) {
        result = first + second;
        first = second;
        second = result;
    }
    
    return result;
}
```



## 扩展问题：变态跳台阶

```
一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
```

### 题解

用数学归纳法可得 f(n) = 2^(n-1)

```js
function jumpFloorII(number)
{
    return 2 ** (number - 1);
}
```



## 参考链接

<https://leetcode-cn.com/problems/fibonacci-number/>

<https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/>

[牛客-裴波那契数列](https://www.nowcoder.com/practice/c6c7742f5ba7442aada113136ddea0c3?tpId=13&tqId=11160&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

[牛客-变态跳台阶](https://www.nowcoder.com/practice/22243d016f6b47f2a6928b4313c85387?tpId=13&tqId=11162&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

[牛客-跳台阶](https://www.nowcoder.com/practice/8c82a5b80378478f9484d87d1c5f12a4?tpId=13&tqId=11161&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

