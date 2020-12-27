# 搜索插入位置

## 题目

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1：

```
输入: [1,3,5,6], 5
输出: 2
```

示例 2:

```
输入: [1,3,5,6], 2
输出: 1
```

示例 3:

```
输入: [1,3,5,6], 7
输出: 4
```

示例 4:

```
输入: [1,3,5,6], 0
输出: 0
```

## 题解

### 题解一

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    const length = nums.length;

    if (length === 0) {
        nums.push(target);
        return 0;
    }

    let left = 0;
    let right = length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target <= nums[left]) {
            if (target < nums[left]) {
                nums.splice(left, 0, target);
            }
            
            return left;
        }
        if (target >= nums[right]) {
            if (target > nums[right]) {
                nums.splice(right + 1, 0, target);
                return right + 1;
            }
            
            return right;
        }
        if (target === nums[mid]) {
            return mid;
        } else if (target > nums[mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
};
```



### 题解二

只是返回位置，不用操作数组的。

考虑这个插入的位置pos，它成立的条件为：

nums[pos-1]<target<=nums[pos]

套用二分法可得：

```js
var searchInsert = function(nums, target) {
    const length = nums.length;
    let left = 0;
    let right = length - 1;
    let ans = length;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};
```



## 参考链接

[搜索插入位置](https://leetcode-cn.com/problems/search-insert-position)









