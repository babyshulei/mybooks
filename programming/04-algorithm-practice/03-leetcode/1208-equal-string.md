# 尽可能使字符串相等

## 题目

给你两个长度相同的字符串，s 和 t。

将 s 中的第 i 个字符变到 t 中的第 i 个字符需要 |s[i] - t[i]| 的开销（开销可能为 0），也就是两个字符的 ASCII 码值的差的绝对值。

用于变更字符串的最大预算是 maxCost。在转化字符串时，总开销应当小于等于该预算，这也意味着字符串的转化可能是不完全的。

如果你可以将 s 的子字符串转化为它在 t 中对应的子字符串，则返回可以转化的最大长度。

如果 s 中没有子字符串可以转化成 t 中对应的子字符串，则返回 0。

示例 1：

```
输入：s = "abcd", t = "bcdf", cost = 3
输出：3
解释：s 中的 "abc" 可以变为 "bcd"。开销为 3，所以最大长度为 3。
```

示例 2：

```
输入：s = "abcd", t = "cdef", cost = 3
输出：1
解释：s 中的任一字符要想变成 t 中对应的字符，其开销都是 2。因此，最大长度为 1。
```

示例 3：

```
输入：s = "abcd", t = "acde", cost = 0
输出：1
解释：你无法作出任何改动，所以最大长度为 1。
```

提示：

- 1 <= s.length, t.length <= 10^5
- 0 <= maxCost <= 10^6
- s 和 t 都只含小写英文字母。

## 题解

### 题解一

滑动窗口类型题，还可以优化。

首先获取花销数组 cost，cost[i] 即为位置i字符变换的花销。

初始化返回的最大长度ret为0。

遍历数组，计算当前位置起，在 maxCost 预算内的字符长度len；将其与最大长度比较，较大值为最大长度。

遍历完数组，返回最大长度ret。

```js
var equalSubstring = function(s, t, maxCost) {
    const length = s.length;
    let cost = [];
    let ret = 0;

    for(let i = 0; i < length; i++) {
        cost[i] = Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
    }

    for(let start = 0; start < length; start++) {
        let sum = 0;
        let len = 0;
        for(let end = start; end < length; end++) {
            sum += cost[end];
            if (sum <= maxCost){
                len++;
            } else {
                break;
            }
        }
        if (len === length) {
            ret = length;
            break;
        } else if (len > ret) {
            ret = len;
        }
    }

    return ret;
};
```

复杂度分析：

- 时间复杂度： O(n^2)
- 空间复杂度： O(n)

### 题解二

前缀和 + 二分查找

假定字符串长度为n，对位置i，字符变化的开销是`|s[i] - t[i]|`。可以得到一个长度为n的数组 diff，`diff[i] =|s[i] - t[i]| `。

计算数组diff 的前缀和accDiff，accDiff[0]为0，accDiff[i] 为前 i 项开销和，可得一个递增的数组。那么 `(i, j], 0<=i<j<=n` 的开销和为 `accDiff(j) - accDiff(i)`。

那么，在位置 j ，在 maxCost 预算内，有 `accDiff(j) - accDiff(i) <= maxCost`，有 `accDiff(i) >= accDiff(j) - maxCost`，即为在 `0-(j-1)` 位置找到满足需求的最小的i，而accDiff为递增数列，可以使用二分查找优化查询速度。

找到 i 后，得到位置 j 可转化的最大长度为 j - i ，与最大长度比较。

最后返回最大长度。

```js
var equalSubstring = function(s, t, maxCost) {
    const length = s.length;
    let accDiff = [0];
    let maxLength = 0;

    for(let i = 0; i < length; i++) {
        accDiff[i + 1] = accDiff[i] + Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
    }

    for(let end = 1; end <= length; end++) {
        let start = binarySearch(accDiff, end, accDiff[end] - maxCost);
        maxLength = Math.max(maxLength, end - start);
    }

    return maxLength;

    function binarySearch(arr, endIndex, target) {
        let left = 0;
        let right = endIndex;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
};
```

 复杂度分析：

- 时间复杂度： O(nlogn)
- 空间复杂度： O(n)

### 题解三

首先遍历字符串，得到 diff 数组。

设子字符串的起始指针为start，结束指针为end，最大长度 maxLength，初始值均为0。

遍历diff数组，首先固定起始指针，结束指针后移，判断当前花销和，如果满足条件，更新最大长度；如果不满足条件，将起始指针后移，直到满足条件。

遍历diff数组，直到结束指针到达末尾。返回最大长度。

```js
var equalSubstring = function(s, t, maxCost) {
    const length = s.length;
    let diff = [];

    for(let i = 0; i < length; i++) {
        diff[i] = Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
    }

    let maxLength = 0;
    let start = 0;
    let end = 0;
    let sum = 0;

    for(end; end < length; end++) {
        sum += diff[end];
        while(sum > maxCost) {
            sum -= diff[start];
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
};
```



## 参考链接

https://leetcode-cn.com/problems/get-equal-substrings-within-budget/

