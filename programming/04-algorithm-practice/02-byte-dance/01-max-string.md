# 无重复字符的最长字符串

## 题目

给定一个字符串，请你找出其中不含有重复字符的 **最长子串** 的长度。



## 题解

### 滑动窗口

通过使用 HashSet 作为滑动窗口，我们可以用 O(1) 的时间来完成对字符是否在当前的子字符串中的检查。

滑动窗口是数组/字符串问题中常用的抽象概念。 窗口通常是在数组/字符串中由开始和结束索引定义的一系列元素的集合，即 [i, j)（左闭，右开）。而滑动窗口是可以将两个边界向某一方向“滑动”的窗口。例如，我们将 [i, j) 向右滑动 1个元素，则它将变为 [i+1, j+1)（左闭，右开）。

回到我们的问题，我们使用 HashSet 将字符存储在当前窗口 [i, j)（最初 j=i）中。 然后我们向右侧滑动索引 j，如果它不在 HashSet 中，我们会继续滑动 j。直到 s[j] 已经存在于 HashSet 中。此时，我们找到的没有重复字符的最长子字符串将会以索引 i 开头。如果我们对所有的 i 这样做，就可以得到答案。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const len = s.length;
    let map = new Set();
    let ans = 0;
    let i = 0;
    let j = 0;

    while(i < len && j < len) {
        if (set.has(s[j])) {
            map.delete(s[i++]);
        } else {
            map.add(s[j++]);
            ans = Math.max(ans, j - i);
        }
    }

    return ans;
};
```

复杂度分析：

时间复杂度：o(2n) = o(n)，在最糟糕的情况下，每个字符将被 i 和 j 访问两次。

空间复杂度：O(min(m, n))，与之前的方法相同。滑动窗口法需要 O(k) 的空间，其中 k 表示 Set 的大小。而 Set 的大小取决于字符串 n 的大小以及字符集 / 字母 m 的大小。

### 优化的滑动窗口

上述的方法最多需要执行 2n 个步骤。事实上，它可以被进一步优化为仅需要 n 个步骤。我们可以定义字符到索引的映射，而不是使用集合来判断一个字符是否存在。 当我们找到重复的字符时，我们可以立即跳过该窗口。

也就是说，如果 s[j]s[j] 在 [i, j) 范围内有与 j' 重复的字符，我们不需要逐渐增加 i 。 我们可以直接跳过 [i，j'] 范围内的所有元素，并将 i 变为 j' + 1。

```js
var lengthOfLongestSubstring = function(s) {
    const len = s.length;
    let map = new Map();
    let ans = 0;

    for (let i = 0, j = 0; j < len; j++) {
        if (map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i);
        }
        map.set(s[j], j);
        ans = Math.max(ans, j - i + 1);
    }

    return ans;
};
```



```js
var lengthOfLongestSubstring = function(s) {
    const len = s.length;
    let map = new Map();
    let ans = 0;

    for (let i = 0, j = 0; j < len; j++) {
        if (map.get(s[j]) >= i && i !== j) {
            i = map.get(s[j]) + 1;
        } else {
            ans = Math.max(ans, j - i + 1);
        }

        map.set(s[j], j);
    }

    return ans;
};
```

时间复杂度：o(n)，索引 j 将会迭代 n*n* 次。

空间复杂度：o(min(m,n))



## 参考链接

[leetcode-无重复字符的最长字符串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

