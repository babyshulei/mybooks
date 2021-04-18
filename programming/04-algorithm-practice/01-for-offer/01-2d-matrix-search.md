# 二维数组的查找

## 题目

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

## 题解

### 初始解法

由左上角作为起点，进行从左往右的遍历。

如果等于数组值，那么return true。

如果target大于数组值，且大于右侧数组值，右移；如果一直右移到了边界值，从下一行的起点开始计算；

else （即小于右侧数组值）如果大于下方数组值，下移。

否则（说明既小于右侧，又小于下侧）返回false。

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    const m = matrix.length; // m行
    const n = (matrix[0] && matrix[0].length) || 0; // n列
    let i = 0, j = 0;
    for (i; i < m; i++) {
        for (j; j < n; j++) {
            if (target === matrix[i][j]) {
                return true;
            } else if (j < n - 1 && target >= matrix[i][j + 1]) {
                continue;
            } else if (j = n - 1 && target > matrix[i][j]) {
                j = 0;
                break;
            } else if (i < m - 1 && target >= matrix[i + 1][j]) {
                break;
            } else {
                return false;
            }
        }
    }
    return false;
};
```

### 进阶解法

因为数组有序，所以可以从左下角遍历，向右方向递增，向上方向递减。如果target > 数组值，右移；target< 数组值，上移。

（也可以选择右上角为起点遍历）

```js
function Find(target, array)
{
    const m = array.length;
    const n = (array && array[0].length) || 0;
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = 0; j < n; j++) {
            if (target === array[i][j]) {
                return true;
            } else if (target > array[i][j]) {
                continue;
            } else if (target < array[i][j]) {
                break;
            }
        }
    }
    
    return false;
}
```

用一个for循环的方案

```js
function Find(target, array)
{
    const m = array.length;
    const n = (array && array[0].length) || 0;
    
    for (let i = m - 1, j = 0; i >= 0 & j < n;) {
        if (target === array[i][j]) {
            return true;
        } else if (target > array[i][j]) {
            j++;
            continue;
        } else if (target < array[i][j]) {
            i--;
            continue;
        }
    }
    return false;
}
```

时间复杂度：O(n+m)

空间复杂度：O(1)

### 进阶解法2

把每一行看成有序递增的数组，利用二分查找，通过遍历每一行得到答案，时间复杂度是nlogn。

```js
function Find(target, array)
{
    for (let i = 0; i < array.length; i++) {
        let low = 0;
        let high = array[i].length - 1;
        
        while(low <= high) {
            let mid = Math.floor((low + high) / 2);
            
            if (target < array[i][mid]) {
                high = mid - 1;
            } else if (target > array[i][mid]) {
                low = mid + 1;
            } else {
                return true;
            }
        }
    }
    return false;
}
```



## 参考链接

[leetcode 题解](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/solution/sou-suo-er-wei-ju-zhen-ii-by-leetcode-2/)

[牛客网讨论](https://www.nowcoder.com/questionTerminal/abc3fe2ce8e146608e868a70efebf62e)

