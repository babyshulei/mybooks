# 最长公共前缀

## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1:**

```
输入: ["flower","flow","flight"]
输出: "fl"
```

**示例 2:**

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

**说明:**

所有输入只包含小写字母 `a-z` 。



## 题解

### 初解

遍历，找到相同前缀的字符串。

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let pre = strs[0];
    const n = strs.length;

    for (let i = 1; i < n; i++) {
        const len = strs[i].length;

        if (pre.length > len) {
            pre = pre.substring(0, len);
        }

        for (let j = 0; j < pre.length; j++) {
            if (pre[j] !== strs[i][j]) {
                pre = pre.substring(0, j);
                break;
            }
        }
    }

    return pre || '';
};
```

### 水平扫描法

LCP(S1…Sn)=LCP(LCP(LCP(S1,S2),S3),…Sn)

依次遍历字符串，找到最长公共前缀。当前缀是一个空串时，直接返回''；否则遍历到最后一个字符串。

```js
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return '';

    let pre = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(pre) !== 0) {
            pre = pre.substring(0, pre.length - 1);
            if (!pre) return '';
        }
    }
    
    return pre;
};
```

时间复杂度：O(S)，S 是所有字符串中字符数量的总和。

最坏的情况下，n 个字符串都是相同的。算法会将 S1与其他字符串 S2 …Sn 都做一次比较。这样就会进行S次字符比较，其中 S 是输入数据中所有字符数量。

空间复杂度：O(1)，我们只需要使用常数级别的额外空间。

### 分治

根据LCP操作的规律，可以采用分治的技巧，将原问题LCP(S<sub>i</sub>…S<sub>j</sub>) 分成两个子问题， LCP(S<sub>i</sub>…S<sub>mid</sub>) 与LCP(S<sub>mid+1</sub>…S<sub>j</sub>) ，其中 mid = (i + j)/2。

我们用子问题的解 lcpLeft 与 lcpRight 构造原问题的解LCP(S<sub>i</sub>…S<sub>j</sub>) 。从头到尾挨个比较 lcpLeft 与 lcpRight 中的字符，直到不能再匹配为止。 计算所得的 lcpLeft 与 lcpRight 最长公共前缀就是原问题的解 LCP(S<sub>i</sub>…S<sub>j</sub>) 。

```js
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return '';

    return getPrefix(strs, 0, strs.length - 1);

    function getPrefix(strs, left, right) {
        if (left === right) {
            return strs[left];
        }

        const mid = Math.floor((left + right) / 2);
        const lcpLeft = getPrefix(strs, left, mid);
        const lcpRight = getPrefix(strs, mid + 1, right);

        return compare(lcpLeft, lcpRight);
    }

    function compare(str1, str2) {
        const min = Math.min(str1.length, str2.length);

        for(let i = 0; i < min; i++) {
            if (str1[i] !== str2[i]) {
                return str1.substring(0, i);
            }
        }

        return str1.substring(0, min);
    }
};
```

- 时间复杂度：O(S)，S 是所有字符串中字符数量的总和，S=m*n。

  时间复杂度的递推式为 `T(n)=2*T(n/2)+O(m)`， 化简后可知其就是 O(S)。最好情况下，算法会进行 `minLen*n` 次比较，其中 minLen 是数组中最短字符串的长度。

- 空间复杂度：`O(m*log(n)`

  内存开支主要是递归过程中使用的栈空间所消耗的。 一共会进行 log(n) 次递归，每次需要 m 的空间存储返回结果，所以空间复杂度为 `O(m*log(n)`。



### 二分查找法

目标是获取公共前缀的最大长度，先遍历字符串数组，得到最小字符串长度，即为公共前缀可能的最大值。

利用二分查找法，每次将长度索引取为可能范围 [low, high] 的中间值 mid ，中间值（前mid个字符）为公共前缀，则 low = mid + 1；中间值不为公共前缀，则high = mid - 1。逐渐缩小范围，直到 low > high，得到公共前缀。

```js
var longestCommonPrefix = function(strs) {
    if (strs === null || strs.length === 0) return '';

    let minLen = Number.MAX_VALUE;
    for (let i = 0; i < strs.length; i++) {
        minLen = Math.min(minLen, strs[i].length);
    }

    let low = 1;
    let high = minLen;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (isCommonPre(strs, mid)) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return strs[0].substring(0, Math.floor((low + high) / 2));

    function isCommonPre(strs, len) {
        const str = strs[0].substring(0, len);
        for (let i = 1; i < strs.length; i++) {
            if (strs[i].indexOf(str) !== 0){
                return false;
            }
        }
        return true;
    }
};
```

最坏情况下，我们有 n 个长度为 m 的相同字符串。

时间复杂度：`O(S*log(n))`，其中 S 所有字符串中字符数量的总和。

算法一共会进行 log(n) 次迭代，每次一都会进行 `S = m*n` 次比较，所以总时间复杂度为 `O(S*log(n))`。

空间复杂度：O(1)，我们只需要使用常数级别的额外空间。



## 参考链接

[leetcode](https://leetcode-cn.com/problems/longest-common-prefix/)

[*String*.prototype.*substring*() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

