# 二维区域和检索 - 矩阵不可变

## 题目

给定一个二维矩阵，计算其子矩形范围内元素的总和，该子矩阵的左上角为 (row1, col1) ，右下角为 (row2, col2) 。

![Range Sum Query 2D](.\images\304.png)


上图子矩阵左上角 (row1, col1) = (2, 1) ，右下角(row2, col2) = (4, 3)，该子矩形内元素的总和为 8。

示例：

```
给定 matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

sumRegion(2, 1, 4, 3) -> 8
sumRegion(1, 1, 2, 2) -> 11
sumRegion(1, 2, 2, 4) -> 12
```


提示：

- 你可以假设矩阵不可变。
- 会多次调用 sumRegion 方法。
- 你可以假设 row1 ≤ row2 且 col1 ≤ col2 。



## 题解

一维数组时，可以建立前缀和数组，降低获取某段元素和的时间复杂度。

二维数组时，也可以建立类似的前缀和数组，从而降低获取某个范围矩阵的元素和的时间复杂度。

可以通过二维几何图的方式，形象地得到对应的公式：

![resolution](.\images\resolution.jpg)

代码如下：

```js
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    const m = matrix.length;
    if (!m) return;
    const n = matrix[0].length;
    if (!n) return;
    this.sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            this.sums[i + 1][j + 1] = this.sums[i][j + 1] + this.sums[i + 1][j] + matrix[i][j] - this.sums[i][j];
        }
    }
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    if (!this.sums) return 0;
    return this.sums[row2 + 1][col2 + 1] - this.sums[row1][col2 + 1] - this.sums[row2 + 1][col1] + this.sums[row1][col1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
```

复杂度：

- 时间复杂度：O(1)，创建数组O(mn)，后续检索O(1)
- 空间复杂度：O(mn)，需要创建一个(m+1)*(n+1)的前缀和数组



## 参考链接

[304. 二维区域和检索 - 矩阵不可变](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/)