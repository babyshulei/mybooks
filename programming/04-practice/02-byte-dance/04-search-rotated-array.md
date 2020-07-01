# 搜索旋转排序数组

> 2020.04.08 @wsl

## 题目

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]` )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 `-1` 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 *O*(log *n*) 级别。

**示例 1:**

```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

**示例 2:**

```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```



## 题解

### 思路一

- 找到旋转的下标 `rotation_index` ，也就是数组中最小的元素。二分查找在这里可以派上用场。
- 在选中的数组区域中再次使用二分查找。

```js
var search = function(nums, target) {
    const len = nums.length;

    if (len === 0) {
        return -1;
    } else if (len === 1) {
        return nums[0] === target ? 0 : -1;
    }

    // 获取旋转下标idx
    const idx = getIndex();

    // target等于数组最小值
    if (nums[idx] === target) {
        return idx;
    }

    // 数组未旋转
    if (idx === 0) {
        return binarySearch(0, len - 1);
    }

    // 搜索右侧
    if (target < nums[0]) {
        return binarySearch(idx, len - 1);
    }

    // 搜索左侧
    return binarySearch(0, idx - 1);

    // 二分查找有序数组
    function binarySearch(left, right) {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (target === nums[mid]) {
                return mid;
            } else if (target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }

    // 获取旋转数组旋转点索引，即数组中的最小值索引
    function getIndex() {
        let left = 0;
        let right = len - 1;

        if (nums[left] < nums[right]) {
            return 0;
        }

        while(left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] > nums[mid + 1]) {
                return mid + 1;
            } else {
                if (nums[mid] < nums[left]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        }

        return 0;
    }
};
```

### 思路二

直接进行二分查找法，明确左移和右移的规律。

- nums[0] <= nums[mid] 时，即 0 - mid 不包含旋转，nums[0] <= target < nums[mid] 时，取前半段。
- nums[0] > nums[mid]时，即 0-target 包含旋转，target < nums[mid] 时，即target < nums[mid]  < nums[0]，取前半段。
- nums[0] > nums[mid]时，即 0-target 包含旋转，target >= nums[0] 时，即 target >= nums[0] > nums[mid]，  取前半段。
- 其他情况取后半段。

```js
var search = function(nums, target) {
    const len = nums.length;

    let left = 0;
    let right = len - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (target === nums[mid]) {
            return mid;
        }

        if ((nums[left] <= target) && (target < nums[mid])
            || (target < nums[mid]) && (nums[mid] < nums[left])
            || (target >= nums[left]) && (nums[left] > nums[mid])) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
};
```

或者

```js
var search = function(nums, target) {
    const len = nums.length;

    let left = 0;
    let right = len - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (target === nums[mid]) {
            return mid;
        }

        if (nums[mid] >= nums[left]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
};
```



## 参考链接

<https://leetcode-cn.com/problems/search-in-rotated-sorted-array/>

<https://leetcode.com/problems/search-in-rotated-sorted-array/>

