# 132 模式

## 题目

给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。

如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

进阶：很容易想到时间复杂度为 O(n^2) 的解决方案，你可以设计一个时间复杂度为 O(n logn) 或 O(n) 的解决方案吗？

示例 1：

```
输入：nums = [1,2,3,4]
输出：false
解释：序列中不存在 132 模式的子序列。
```


示例 2：

```
输入：nums = [3,1,4,2]
输出：true
解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
```


示例 3：

```
输入：nums = [-1,3,2,0]
输出：true
解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。
```


提示：

- n == nums.length
- 1 <= n <= 104
- -10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>



## 题解

### 题解一：枚举1

- 我们用单调栈维护所有可以作为 2 的候选元素。初始时，单调栈中只有唯一的元素 a[n−1]。我们还需要使用一个变量 max_k 记录所有可以真正作为 22 的元素的最大值；
- 随后我们从 n−2 开始从右到左枚举元素a[i]：
  - 首先我们判断 a[i] 是否可以作为 1。如果 a[i]<max_k，那么它就可以作为 1，我们就找到了一组满足 132 模式的三元组；
  - 随后我们判断 a[i] 是否可以作为 3，以此找出哪些可以真正作为 2 的元素。我们将 a[i] 不断地与单调栈栈顶的元素进行比较，如果 a[i] 较大，那么栈顶元素可以真正作为 2，将其弹出并更新 max_k；
  - 最后我们将 a[i] 作为 2 的候选元素放入单调栈中。这里可以进行一个优化，即如果 a[i]≤max_k，那么我们也没有必要将 a[i] 放入栈中，因为即使它在未来被弹出，也不会将 max_k 更新为更大的值。
- 在枚举完所有的元素后，如果仍未找到满足 132 模式的三元组，那就说明其不存在。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    const n = nums.length;
    if (n < 3) {
        return false;
    }
    let candi = [nums[n - 1]];
    let max_k = -Number.MAX_SAFE_INTEGER;
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < max_k) {
            return true;
        }
        while (candi.length && nums[i] > candi[candi.length - 1]) {
            max_k = candi[candi.length - 1];
            candi.pop();
        }
        if (nums[i] > max_k) {
            candi.push(nums[i]);
        }
    }
    return false;
};
```



## 参考链接

[456. 132 模式](https://leetcode-cn.com/problems/132-pattern/)

