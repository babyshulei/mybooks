# 基本计算器

## 题目

实现一个基本的计算器来计算一个简单的字符串表达式 s 的值。 

示例 1：

```
输入：s = "1 + 1"
输出：2
```


示例 2：

```
输入：s = " 2-1 + 2 "
输出：3
```


示例 3：

```
输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
```


提示：

- 1 <= s.length <= 3 * 105
- s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
- s 表示一个有效的表达式

## 题解

### 题解一

因为只有 +、- 运算，所以考虑直接移除括号，进行计算。根据括号前的符号决定括号内部的计算，用一个栈存储括号的深度。

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    const ops = [1];
    let sign = 1;
    let ret = 0;

    const n = s.length;
    let i = 0;
    while(i < n) {
        if (s[i] === ' ') {
            i++;
        } else if (s[i] === '+') {
            sign = ops[ops.length - 1];
            i++;
        } else if (s[i] === '-') {
            sign = -ops[ops.length - 1];
            i++;
        } else if (s[i] === '(') {
            ops.push(sign);
            i++;
        } else if (s[i] === ')') {
            ops.pop();
            i++;
        } else {
            let num = 0;
            while(i < n && !isNaN(Number(s[i])) && s[i] !== ' ') {
                num = num * 10 + (s[i] - 0);
                i++;
            }
            ret += sign * num;
        }
    }

    return ret;
};
```



## 参考链接

[224. 基本计算器](https://leetcode-cn.com/problems/basic-calculator/)

