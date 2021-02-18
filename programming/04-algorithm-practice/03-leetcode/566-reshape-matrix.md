# 重塑矩阵

## 题目

在MATLAB中，有一个非常有用的函数 reshape，它可以将一个矩阵重塑为另一个大小不同的新矩阵，但保留其原始数据。

给出一个由二维数组表示的矩阵，以及两个正整数r和c，分别表示想要的重构的矩阵的行数和列数。

重构后的矩阵需要将原始矩阵的所有元素以相同的行遍历顺序填充。

如果具有给定参数的reshape操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。

示例 1:

```
输入: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
输出: 
[[1,2,3,4]]
解释:
行遍历nums的结果是 [1,2,3,4]。新的矩阵是 1 * 4 矩阵, 用之前的元素值一行一行填充新矩阵。
```


示例 2:

```
输入: 
nums = 
[[1,2],
 [3,4]]
r = 2, c = 4
输出: 
[[1,2],
 [3,4]]
解释:
没有办法将 2 * 2 矩阵转化为 2 * 4 矩阵。 所以输出原矩阵。
```


注意：

- 给定矩阵的宽和高范围在 [1, 100]。
- 给定的 r 和 c 都是正数。



## 题解

### 题解一

行遍历生成新的矩阵。

```js
/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
    const row = nums.length;
    const col = nums[0].length;

    if (col * row !== r * c || col === c) {
        return nums;
    }

    let result = new Array(r).fill(0).map(()=> []);
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            const count = i * col + j;
            result[Math.floor(count / c)][count % c] = nums[i][j];
        }
    }

    return result;
};
```

复杂度：

- 时间复杂度： O(rc)。这个时间复杂度前提是重塑矩阵成功；当无需重塑时，直接返回原数组，时间复杂度为O(1)。
- 空间复杂度：O(1)。这里的空间复杂度不包含返回的重塑矩阵需要的空间。

#### 改进

可以视为一个扁平的一维数组简化循环。

```js
var matrixReshape = function(nums, r, c) {
    const row = nums.length;
    const col = nums[0].length;

    if (col * row !== r * c || col === c) {
        return nums;
    }

    let result = new Array(r).fill(0).map(()=> []);
    for(let i = 0; i < row * col; i++) {
        result[Math.floor(i / c)][i % c] = nums[Math.floor(i / col)][i % col];
    }

    return result;
};
```

优化生成初始数组方式：

```js
var matrixReshape = function(nums, r, c) {
    const row = nums.length;
    const col = nums[0].length;

    if (col * row !== r * c || col === c) {
        return nums;
    }

    let result = [];
    for(let i = 0; i < row * col; i++) {
        const newRow = Math.floor(i / c);
        if (!result[newRow]) result.push([]);
        result[newRow][i % c] = nums[Math.floor(i / col)][i % col];
    }

    return result;
};
```



## 参考链接

https://leetcode-cn.com/problems/reshape-the-matrix/

