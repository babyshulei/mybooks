# 不同的子序列

## 题目

给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。

字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

题目数据保证答案符合 32 位带符号整数范围。

示例 1：

```
输入：s = "rabbbit", t = "rabbit"
输出：3
解释：
如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
(上箭头符号 ^ 表示选取的字母)
rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^
```


示例 2：

```
输入：s = "babgbag", t = "bag"
输出：5
解释：
如下图所示, 有 5 种可以从 s 中得到 "bag" 的方案。 
(上箭头符号 ^ 表示选取的字母)
babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^
```


提示：

- 0 <= s.length, t.length <= 1000
- s 和 t 由英文字母组成



## 题解

### 题解一：动态规划

假设字符串 s 和 t 的长度分别为 m 和 n。如果 t 是 s 的子序列，则 s 的长度一定大于或等于 t 的长度，即只有当 m≥n 时，t 才可能是 s 的子序列。如果 m<n，则 t 一定不是 s 的子序列，因此直接返回 0。

当 m≥n 时，可以通过动态规划的方法计算在 s 的子序列中 t 出现的个数。

创建二维数组 dp，其中 `dp[i][j]` 表示在 s[i:] 的子序列中 t[j:] 出现的个数。

考虑边界情况：

- 当 j = n 时，t[j:] 为空字符串，是任何字符的子序列，所以对任意i，有`dp[i][n] = 1`；
- 当 i = m 且 j < n 时，s[i:] 为空字符串，t[j:]为非空字符串，有`dp[m][j]=0`；

状态转移方程：

- s[i] = t[j] 时，有`dp[i][j] = dp[i+1][j+1]+dp[i+1][j]`
- s[i] 不等于 t[j] 时，有 `dp[i][j]=dp[i+1][j]`

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    const m = s.length;
    const n = t.length;

    if (m < n) {
        return 0;
    }
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        dp[i][n] = 1;
    }

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (s[i] === t[j]) {
                dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j];
            } else {
                dp[i][j] = dp[i + 1][j];
            }
        }
    }

    return dp[0][0];
};
```

复杂度：

- 时间复杂度：O(mn)
- 空间复杂度：O(mn)

## 参考链接

[115. 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)

