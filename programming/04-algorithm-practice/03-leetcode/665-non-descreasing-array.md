# 非递减数列

## 题目

给你一个长度为 n 的整数数组，请你判断在最多改变 1 个元素的情况下，该数组能否变成一个非递减数列。

我们是这样定义一个非递减数列的：对于数组中所有的 `i (0 <= i <= n-2)`，总满足 `nums[i] <= nums[i + 1]`。

示例 1:

```
输入: nums = [4,2,3]
输出: true
解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
```


示例 2:

```
输入: nums = [4,2,1]
输出: false
解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
```


说明：

- `1 <= n <= 10 ^ 4`
- `10 ^ 5 <= nums[i] <= 10 ^ 5`

## 题解

思路：

最多只能改一个元素，使数组变为一个非递减数列。

可以遍历这个数组，看其是否为非递减数列。设置flag标记是否修改过元素。

如果遇到元素不满足条件，首先看flag是否为ture，如果为true，说明已经改过一个元素了，直接返回`false`；如果为false，继续看其能否修改这个元素使数列继续保持非递减，如果不能，直接返回`false`；如果能，flag置为`true`。

如果数组能遍历到结束，说明数组符合条件，返回`true`。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
    let flag = false;
    for(let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            if (flag) {
                return false;
            }
            if (i === 0 || i === nums.length - 2 || (nums[i - 1] <= nums[i + 1]) || (nums[i] <= nums[i + 2])) {
                flag = true;
            } else {
                return false;
            }
        }
    }
    return true;
};
```

复杂度分析：

- 时间复杂度：O(n)
- 空间复杂度：O(1)

优化：

直接根据现有情况决定是修改当前元素还是修改后面的元素，然后进行标记，如果再次遇到不符合的情况，标记为true，直接返回`false`。

```js
var checkPossibility = function(nums) {
    let flag = false;
    for(let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            if (flag) {
                return false;
            }
            if (i > 0 && nums[i + 1] < nums[i - 1]) {
                nums[i + 1] = nums[i];
            }
            flag = true;
        }
    }
    return true;
};
```



## 参考链接

https://leetcode-cn.com/problems/non-decreasing-array/

