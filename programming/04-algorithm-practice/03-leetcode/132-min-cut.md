# 分割回文串

## 题目

给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。

返回符合要求的 最少分割次数 。

示例 1：

```
输入：s = "aab"
输出：1
解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
```


示例 2：

```
输入：s = "a"
输出：0
```

示例 3：

```
输入：s = "ab"
输出：1
```


提示：

- 1 <= s.length <= 2000
- s 仅由小写英文字母组成

## 题解

### 题解一：动态规划

设 f[i] 表示字符串 s[0...i] 的最少分割次数，要想得出 f[i] 的值，可以考虑枚举s[0...i]分割出的最后一个回文串，则有状态转移方程：

```
f[i] = min{f[j]} + 1，其中0 <= j < i，s[j+1...i]是一个回文串
f[i] = 0，当s[0...i]本身就是一个回文串时
```

那么如何获取 s[j+1...i]是否为回文串？可以通过动态规划预处理子字符串的回文串状态，存储到数组中，用于后续判断。

代码如下：

```js
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
    const n = s.length;
    const g = new Array(n).fill(0).map(() => new Array(n).fill(true));

    // 预处理子串是否为回文串
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            g[i][j] = g[i + 1][j - 1] && (s[i] === s[j]);
        }
    }

    // 动态规划 i 处的最少分割次数
    const f = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    for (let i = 0; i < n; i++) {
        if (g[0][i]) {
            f[i] = 0;
        } else {
            for (let j = 0; j < i; j++) {
                if (g[j + 1][i]) {
                    f[i] = Math.min(f[i], f[j] + 1);
                }
            }
        }
    }

    return f[n - 1];
};
```



## 参考链接

[132. 分割回文串 II](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

