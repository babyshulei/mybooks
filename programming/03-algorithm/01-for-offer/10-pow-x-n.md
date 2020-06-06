# 数值的整数次方

## 题目

给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

保证base和exponent不同时为0



## 题解

### 快速幂算法

```js
var myPow = function(x, n) {
    if (x === 0) {
        return 0;
    } else if (n === 0) {
        return 1;
    }

    let exp = n > 0 ? n : -n;
    let res = 1;

    while (exp > 0) {
        if (exp & 1) {
            res *= x;
        }
        x *= x;
        exp >>>= 1;
    }

    return n > 0 ? res : 1 / res;
};
```



## 参考链接

<https://leetcode-cn.com/problems/powx-n/>

<https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/>

[牛客网-数值的整数次方](https://www.nowcoder.com/practice/1a834e5e3e1a4b7ba251417554e07c00?tpId=13&&tqId=11165&rp=1&ru=/activity/oj&qru=/ta/coding-interviews/question-ranking)

[快速幂](https://oi-wiki.org/math/quick-pow/)

