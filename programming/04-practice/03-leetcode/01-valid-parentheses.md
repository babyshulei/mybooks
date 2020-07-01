# 有效的括号

> 2020.05.18 @wsl

## 题目

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

## 题解

利用栈的概念，左边括号入栈，右边括号出栈，后进先出。

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var arr = [];
    var len = 0;
    var map = {
        ')': '(',
        ']': '[',
        '}': '{',
    };

    if (s === '') return true;

    for(let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(':
            case '[':
            case '{':
                arr.push(s[i]);
                len++;
            	break;
            case ')':
            case ']':
            case '}':
                if(len > 0 && arr[len - 1] === map[s[i]]) {
                    arr.pop();
                    len--;
                } else {
                    return false;
                }
            	break;
        }
    }

    return len === 0;
};
```

优化：

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var arr = [];
    var map = {
        ')': '(',
        ']': '[',
        '}': '{',
    };

    if (s === '') return true;

    for(let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(':
            case '[':
            case '{':
                arr.push(s[i]);
            	break;
            case ')':
            case ']':
            case '}':
                if(arr.pop() !== map[s[i]]) {
                    return false;
                }
            	break;
        }
    }

    return arr.length === 0;
};
```

再优化可以把下面的case分开写，去掉map，这个不太优雅，算啦。



复杂度分析

- 时间复杂度：O(n)O(n)，因为我们一次只遍历给定的字符串中的一个字符并在栈上进行 O(1)O(1) 的推入和弹出操作。
- 空间复杂度：O(n)O(n)，当我们将所有的开括号都推到栈上时以及在最糟糕的情况下，我们最终要把所有括号推到栈上。例如 ((((((((((。



## 参考链接

[力扣（LeetCode）](https://leetcode-cn.com/problems/valid-parentheses)