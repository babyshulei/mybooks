# 搜索二维矩阵

## 题目

编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。

示例 1：

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```


示例 2：

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
```


提示：

- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 100
- `-10^4 <= matrix[i][j], target <= 10^4`

## 题解

先判断行范围，再在对应行进行查找。

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let i = 0;

    if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) {
        return false;
    }

    while (i < m) {
        if (target === matrix[i][0]) {
            return true;
        } else if (target > matrix[i][0]) {
            i++;
        } else {
            i--;
            break;
        }
    }

    if (i === m) i--;

    let left = 0, right = n - 1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target === matrix[i][mid]) {
            return true;
        } else if (target < matrix[i][mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return false;
};
```

复杂度：

- 时间复杂度：O(mlogn)
- 空间复杂度：O(1)

## 参考链接

[74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/)

