# 螺旋矩阵II

## 题目

给你一个正整数 n ，生成一个包含 1 到 n<sup>2</sup> 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

示例 1：

```
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
```

示例 2：

```
输入：n = 1
输出：[[1]]
```


提示：

- 1 <= n <= 20



## 题解

按照遍历螺旋矩阵的顺序，添加数字即可。

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    const ret = new Array(n).fill(0).map(() => new Array());
    let count = 1;

    for (let i = 0; i < n / 2; i++) {
        // right
        for (let j = i; j < n - i; j++) {
            ret[i][j] = count++;
        }
        // down
        for (let j = i + 1; j < n - i; j++) {
            ret[j][n - i - 1] = count++;
        }
        if (n - i - 1 === i) {
            break;
        }
        // up
        for (let j = n - i - 2; j >= i; j--) {
            ret[n - i - 1][j] = count++;
        }
        // left
        for (let j = n - i - 2; j > i; j--) {
            ret[j][i] = count++;
        }
    }
    return ret;
};
```

复杂度：

- 时间复杂度：O(n<sup>2</sup>)
- 空间复杂度：O(1)

## 参考链接

[59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

