# 最长湍流子数组

## 题目

当 A 的子数组 A[i], A[i+1], ..., A[j] 满足下列条件时，我们称其为湍流子数组：

- 若 i <= k < j，当 k 为奇数时， A[k] > A[k+1]，且当 k 为偶数时，A[k] < A[k+1]；
- 或 若 i <= k < j，当 k 为偶数时，A[k] > A[k+1] ，且当 k 为奇数时， A[k] < A[k+1]。

也就是说，如果比较符号在子数组中的每个相邻元素对之间翻转，则该子数组是湍流子数组。

返回 A 的最大湍流子数组的长度。

示例 1：

```
输入：[9,4,2,10,7,8,8,1,9]
输出：5
解释：(A[1] > A[2] < A[3] > A[4] < A[5])
```


示例 2：

```
输入：[4,8,12,16]
输出：2
```




示例 3：

```
输入：[100]
输出：1
```


提示：

- 1 <= A.length <= 40000
- 0 <= A[i] <= 10^9

## 题解

### 题解一

思路：

遍历数组，用一个标志flag来标记下一个数是上升还是下降，用变量max存储最大子数组长度，用变量count存储当前数组长度。

根据标志状态，判断下一个数是否符合要求，进行count、flag、max的计算。

遍历完成后，返回max即可。

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function(arr) {
    const length = arr.length;
    let max = 1;
    let count = 1;
    let flag = 0; // 0: no state, 1: next up, 2: next down

    for(let i = 0; i < length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            if (flag === 0 || flag === 2) {
                count++;
                flag = 1;
            } else {
                count = 2;
                flag = 1;
            }
        } else if (arr[i] < arr[i + 1]) {
            if (flag === 0 || flag === 1) {
                count++;
                flag = 2;
            } else {
                count = 2;
                flag = 2;
            }
        } else {
            count = 1;
            flag = 0;
        }
        max = Math.max(max, count);
    }

    return max;
};
```

复杂度分析：

- 时间复杂度：O(n)
- 空间复杂度：O(1)

### 题解二

双指针方案。

遍历数组，假设湍流子数组两端指针为left、right，那么初始值都为0。用 max 代表最大数组长度。

然后判断下一个数字是否符合条件，满足的话，right右移；不满足的话，left=right；如果两个数字相等，那么都要右移。

将max与子数组长度比较，取较大值。

当右指针到数组边界，遍历终止。

```js
var maxTurbulenceSize = function(arr) {
    const length = arr.length;
    let max = 1;
    let left = 0;
    let right = 0;

    while(right < length - 1) {
        if (left === right) {
            if (arr[right] === arr[right + 1]) {
                left++;
            }
            right++;
        } else {
            if (arr[right - 1] > arr[right] && arr[right] < arr[right + 1]) {
                right++;
            } else if (arr[right - 1] < arr[right] && arr[right] > arr[right + 1]) {
                right++;
            } else {
                left = right;
            }
        }
        max = Math.max(max, right - left + 1);
    }

    return max;
};
```

### 题解三

动态规划。

在位置 i 的湍流子数组长度，可以通过前一个位置的湍流子数组获得，前一个位置湍流子数组有两种情况，一个是a[i] > a[i-1]、一个是a[i] < a[i-1]。

将a[i]与a[i-1]进行比较，根据情况可以进行计算，得到当前位置的长度。

遍历数组得到最大子数组长度。

```js
var maxTurbulenceSize = function(arr) {
    const length = arr.length;
    let max = 1;
    let dp0 = 1; // i > i-1
    let dp1 = 1; // i < i-1

    for (let i = 1; i < length; i++) {
        if (arr[i] > arr[i - 1]) {
            dp0 = dp1 + 1;
            dp1 = 1;
        } else if (arr[i] < arr[i - 1]) {
            dp1 = dp0 + 1;
            dp0 = 1;
        } else {
            dp0 = dp1 = 1;
        }
        max = Math.max(max, dp0);
        max = Math.max(max, dp1);
    }

    return max;
};
```



## 参考链接

https://leetcode-cn.com/problems/longest-turbulent-subarray/

