# 二进制中1的个数

## 题目

输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。



## 题解

思路一：判断最右边的是不是1，然后数字右移，继续判断，直到全部右移完。由于左侧有符号位，这种方法可能会造成死循环。

思路二：设置flag = 1，与数字做异或，判断最右边是否为1；flag左移，与数字异或，判断右侧倒数第二个是否为1；一直左移，直到最左边之后，flag变为0。

```js
function NumberOf1(n)
{
    let count = 0;
    let flag = 1;
    
    while (flag) {
        if (n & flag) {
            count++;
        }
        flag = flag << 1;
    }
    
    return count;
}
```

思路三：将数字减1，与数字进行异或，此时数字最右边的1就会被抵消掉；循环做这个操作，有多少个1，就可以循环多少次。

```js
function NumberOf1(n)
{
    let count = 0;
    
    while (n) {
        count++;
        n = n & (n - 1);
    }
    
    return count;
}
```



## 参考链接

<https://leetcode-cn.com/problems/number-of-1-bits/>

<https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/>

[牛客-二进制中1的个数](https://www.nowcoder.com/practice/8ee967e43c2c4ec193b040ea7fbb10b8?tpId=13&tqId=11164&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

