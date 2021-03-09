# 转置矩阵

## 题目

给你一个二维整数数组 `matrix`， 返回 `matrix` 的 **转置矩阵** 。

矩阵的 **转置** 是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。

示例 1：

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[1,4,7],[2,5,8],[3,6,9]]
```


示例 2：

```
输入：matrix = [[1,2,3],[4,5,6]]
输出：[[1,4],[2,5],[3,6]]
```


提示：

- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 1000
- 1 <= m * n <= 10^5
- -10^9 <= `matrix[i][j]` <= 10^9

## 题解

### 题解一

遍历数组矩阵，交换矩阵的行索引和列索引。

```js
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let ret = new Array(n).fill(0).map(() => new Array(m).fill(0));

    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            ret[j][i] = matrix[i][j];
        }
    }

    return ret;
};
```

复杂度：

- 时间复杂度：O(mn)
- 空间复杂度：O(1)



## 参考链接

[867. 转置矩阵](https://leetcode-cn.com/problems/transpose-matrix/)

