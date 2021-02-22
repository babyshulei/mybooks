# 最大连续1的个数 III

## 题目

给定一个由若干 0 和 1 组成的数组 A，我们最多可以将 K 个值从 0 变成 1 。

返回仅包含 1 的最长（连续）子数组的长度。

示例 1：

```
输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释： 
[1,1,1,0,0,1,1,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。
```


示例 2：

```
输入：A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
输出：10
解释：
[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 10。
```

提示：

- 1 <= A.length <= 20000
- 0 <= K <= A.length
- A[i] 为 0 或 1 



## 题解

这题一开始没思路，看的答案T T。发现可以进行问题转化，和之前的题解法一样的。

掉进了同一个坑里……还需加油啊。

同类型题：[1208. 尽可能使字符串相等](https://leetcode-cn.com/problems/get-equal-substrings-within-budget/)

### 题解一：滑动窗口

要想快速判断一个区间内 0 的个数，可以将数组翻转，那么需要改变的值变为 1，不需要改变的值变为 0。遍历数组，求出前缀和，每项的值为即为前 x 项 0 的位数。可得第 i 项到第 j 项 0 的位数为两项的前缀和之差。

问题可以转化成求解前缀和的差小于等于K的最长子数组。

```js
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function(A, K) {
    const length = A.length;
    let max = 0;
    let left = 0;
    let lsum = 0;
    let rsum = 0;

    for(let right = 0; right < length; right++) {
        rsum += (1 - A[right]);
        while(lsum < rsum - K) {
            lsum += (1 - A[left]);
            left++;
        }
        max = Math.max(max, right - left + 1);
    }

    return max;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(1)



## 参考链接

[最大连续1的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/)

