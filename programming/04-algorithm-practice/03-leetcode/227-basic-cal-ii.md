# 基本计算器II

## 题目

给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

整数除法仅保留整数部分。

示例 1：

```
输入：s = "3+2*2"
输出：7
```

示例 2：

```
输入：s = " 3/2 "
输出：1
```


示例 3：

```
输入：s = " 3+5 / 2 "
输出：5
```


提示：

- 1 <= s.length <= 3 * 10<sup>5</sup>
- s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
- s 表示一个 有效表达式
- 表达式中的所有整数都是非负整数，且在范围 [0, 231 - 1] 内
- 题目数据保证答案是一个 32-bit 整数



## 题解

### 题解一

按照四则运算规范从左到右计算，用 before 存储未计算到结果的值，遇到 +、- 就可以将before计算到结果中，遇到 *、/ 则继续向后遍历，先进行乘除运算，将结果存到before中，最后返回ret结果。

```js
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    let ret = 0;
    let before = 0;
    let sign = 1;
    let mdu = '';
    
    const n = s.length;
    let i = 0;
    while (i < n) {
        if (s[i] === ' ') {
            i++;
        } else if (s[i] === '+' || s[i] === '-') {
            ret += sign * before;
            before = 0;
            sign = s[i] === '+' ? 1 : -1;
            i++;
        } else if (s[i] === '*' || s[i] === '/') {
            mdu = s[i];
            i++;
        } else {
            let num = 0;
            while (i < n && !isNaN(Number(s[i])) && s[i] !== ' ') {
                num = 10 * num + (s[i] - 0);
                i++;
            }
            if (mdu === '*') {
                before *= num;
                mdu = '';
            } else if (mdu === '/') {
                before = Math.floor(before / num);
                mdu = '';
            } else {
                before = num; 
            }
        }
    }

    ret += sign * before;

    return ret;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(1)



### 题解二：栈

由于乘除运算优于加减运算，因此可以优先进行乘除运算，用一个栈保存计算结果，然后累加即可。

可以遍历字符串s，然后根据前面运算符的来决定计算方式：

- 加号：将数字压入栈；
- 减号：将数字的相反数压入栈；
- 乘除号：计算数字与栈顶元素，并将栈顶元素替换为计算结果。

最后累加即可。

```js
var calculate = function(s) {
    let ret = 0;
    let stack = [];
    let preSign = '+';
    
    s = s.trim();
    const n = s.length;
    let num = 0;
    for (let i = 0; i < n; i++) {
        if (!isNaN(Number(s[i])) && s[i] !== ' ') {
            num = 10 * num + (s[i] - 0);
        }
        if (isNaN(Number(s[i])) || i === n - 1) {
            switch (preSign) {
                case '+':
                   stack.push(num);
                   break;
                case '-':
                    stack.push(-num);
                    break;
                case '*':
                    stack.push(stack.pop() * num);
                    break;
                case '/':
                    stack.push(stack.pop() / num | 0);
                    break;
            }
            preSign = s[i];
            num = 0;
        }
    }

    while (stack.length) {
        ret += stack.pop();
    }

    return ret;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(n)



## 参考链接

[227. 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)

