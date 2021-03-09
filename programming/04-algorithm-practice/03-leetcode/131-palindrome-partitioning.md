# 分割回文串

## 题目

给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

示例 1：

```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```


示例 2：

```
输入：s = "a"
输出：[["a"]]
```


提示：

- 1 <= s.length <= 16
- s 仅由小写英文字母组成



## 题解

由于需要求出字符串 s 的所有分割方案，因此我们考虑使用搜索 + 回溯的方法枚举所有可能的分割方法并进行判断。

假设当前搜索到第i个字符，前面的字符分割方案已经放到 ans 数组中，那么就需要枚举下一个回文串边界j，使得s[i...j]是一个回文串。

因此，可以从i开始，从小到大枚举j，判断s[i..j]是否为回文串，如果是就将其放到 ans 数组中，并从 j + 1开始搜索；如果不是，返回到上一层，继续枚举j+1。

判断 s[i...j] 是否为回文串，会出现重复计算的场景，可以将其预处理出来，每次直接获取判断结果即可。预处理判断结果可以通过动态规划计算，有状态转移方程：

```
i >= j 时，说明为单独字符或空串，f(i,j) = true
i < j 时，通过前一个状态转移，f(i,j) = f(i+1,j-1) && (s[i]===s[j])
```

代码：

```js
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const dfs = (i) => {
        if (i === n) {
            ret.push(ans.slice());
            return;
        }
        for (let j = i; j < n; j++) {
            if(f[i][j]) {
                ans.push(s.slice(i, j + 1));
                dfs(j + 1);
                ans.pop();
            }
        }
    }

    const n = s.length;
    const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
    let ret = [];
    let ans = [];

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
        }
    }
    dfs(0);
    return ret;
};
```

复杂度：

- 时间复杂度：O(n·2<sup>n</sup>)，其中n为字符串s的长度。最坏情况是s包含n个完全相同的字符，因此任意一种划分方法都满足要求。长度为n的字符串的划分方案数为 2<sup>n-1</sup> = O(2<sup>n</sup>)，每一种划分方法需要O(n)的时间求出对应的划分结果并放入答案，因此总的时间复杂度为O(n·2<sup>n</sup>)；动态规划预处理需要O(n<sup>2</sup>)的时间复杂度。
- 空间复杂度：O(n<sup>2</sup>)，数组f需要的空间为O(n<sup>2</sup>)；回溯过程中，需要使用O(n)的栈空间以及O(n)的用来存储当前字符串分割方法的空间。



## 参考链接

[131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

