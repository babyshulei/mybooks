# 合并区间

## 题目

给出一个区间的集合，请合并所有重叠的区间。

示例 1:

```
输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2:**

```
输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

**提示：**

- `intervals[i][0] <= intervals[i][1]`

## 题解

先排序，再合并。

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    const length = intervals.length;

    intervals.sort((a, b) => {
        return a[0] - b[0];
    });

    let res = [[...intervals[0]]];
    let index = 1;

    for(let i = 1; i < length; i++) {
        const tmp = [...intervals[i]];
        if (tmp[0] <= res[index - 1][1]) {
            res[index - 1][1] = res[index - 1][1] > tmp[1] ? res[index - 1][1] : tmp[1]; 
        } else {
            res.push(tmp);
            index++;
        }
    }

    return res;
};
```



## 参考链接

https://leetcode-cn.com/problems/merge-intervals/

