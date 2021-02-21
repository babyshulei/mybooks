# 绝对差不超过限制的最长连续子数组

## 题目

给你一个整数数组 nums ，和一个表示限制的整数 limit，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 limit 。

如果不存在满足条件的子数组，则返回 0 。

示例 1：

```
输入：nums = [8,2,4,7], limit = 4
输出：2 
解释：所有子数组如下：
[8] 最大绝对差 |8-8| = 0 <= 4.
[8,2] 最大绝对差 |8-2| = 6 > 4. 
[8,2,4] 最大绝对差 |8-2| = 6 > 4.
[8,2,4,7] 最大绝对差 |8-2| = 6 > 4.
[2] 最大绝对差 |2-2| = 0 <= 4.
[2,4] 最大绝对差 |2-4| = 2 <= 4.
[2,4,7] 最大绝对差 |2-7| = 5 > 4.
[4] 最大绝对差 |4-4| = 0 <= 4.
[4,7] 最大绝对差 |4-7| = 3 <= 4.
[7] 最大绝对差 |7-7| = 0 <= 4. 
因此，满足题意的最长子数组的长度为 2 。
```


示例 2：

```
输入：nums = [10,1,2,4,7,2], limit = 5
输出：4 
解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。
```


示例 3：

```
输入：nums = [4,2,2,2,4,4,2,2], limit = 0
输出：3
```


提示：

- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^9
- 0 <= limit <= 10^9



## 题解

思路：

遍历数组，获取每个位置上满足limit限制的最长子数组长度，取最大值返回。

```js
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
    const length = nums.length;
    let maxLen = 0;
    for(let i = 0; i < length; i++) {
        let max = nums[i];
        let min = nums[i];
        for(let j = i; j < length; j++) {
            let num = nums[j];
            if (num < min) {
                min = num;
            } else if (num > max) {
                max = num;
            }
            if (max - min <= limit) {
                maxLen = Math.max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }
    return maxLen;
};
```

超时了……尝试失败T T

复杂度：

- 时间复杂度：O(n^2)
- 空间复杂度：O(1)



### 题解一：滑动窗口+有序集合

固定右侧，找到满足条件的左侧位置，当右侧向右滑动时，左侧也会向右滑动。窗口内容有序，优化查找左索引的时间复杂度。

为方便统计窗口内的最大值和最小值，可以使用平衡树：

- 语言自带的红黑树，例如 C++ 中的 `std::multiset`，Java 中的 `TreeMap`；
- 第三方的平衡树库，例如 Python 中的 `sortedcontainers`（事实上，这个库的底层实现并不是平衡树，但各种操作的时间复杂度仍然很优秀）；
- 手写 `Treap` 一类的平衡树；

无JavaScript的解法，要自己写树，以后再研究。

### 题解二：滑动窗口 + 单调队列

用一个单调递增队列维护最小值，一个单调递减队列维护最大值。这样只需要计算两个队列的队首的差值，即可知道当前窗口是否满足条件。

```js
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
    const length = nums.length;
    const queMax = [];
    const queMin = [];
    let left = right = 0;
    let maxLen = 0;

    for(right; right < length; right++) {
        while(queMax.length && queMax[queMax.length - 1] < nums[right]) {
            queMax.pop();
        }
        while(queMin.length && queMin[queMin.length - 1] > nums[right]) {
            queMin.pop();
        }
        queMax.push(nums[right]);
        queMin.push(nums[right]);
        while(queMax.length && queMin.length && queMax[0] - queMin[0] > limit) {
            if (nums[left] === queMax[0]) {
                queMax.shift();
            }
            if (nums[left] === queMin[0]) {
                queMin.shift();
            }
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(n)



## 参考链接

[1438. 绝对差不超过限制的最长连续子数组](https://leetcode-cn.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)

