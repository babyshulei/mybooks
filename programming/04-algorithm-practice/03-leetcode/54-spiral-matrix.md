# 螺旋矩阵

## 题目

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

示例 1：

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```


示例 2：

```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```


提示：

- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 10
- -100 <= `matrix[i][j]` <= 100



## 题解

### 题解一

按照规则遍历数组，返回对应输出

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const ret = [];

    for (let i = 0; i < Math.min(m, n) / 2; i++) {
        // right
        for (let j = i; j < n - i; j++) {
            ret.push(matrix[i][j]);
        }
        // down
        for (let j = i + 1; j < m - i; j++) {
            ret.push(matrix[j][n - i - 1]);
        }
        // left
        for (let j = n - i - 2; j >= i; j--) {
            if (m - i - 1 === i) {
                break;
            }
            ret.push(matrix[m - i - 1][j]);
        }
        // up
        for (let j = m - i - 2; j > i; j--) {
            if (n - i - 1 === i) {
                break;
            }
            ret.push(matrix[j][i]);
        }
    }

    return ret;
};
```

复杂度：

- 时间复杂度：O(m*n)
- 空间复杂度：O(1)



## 参考链接

[54. 螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

