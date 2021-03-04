# 俄罗斯套娃信封问题

## 题目

给定一些标记了宽度和高度的信封，宽度和高度以整数对形式 (w, h) 出现。当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

请计算最多能有多少个信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

说明:

- 不允许旋转信封。

示例:

```
输入: envelopes = [[5,4],[6,4],[6,7],[2,3]]
输出: 3 
解释: 最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
```



## 题解

题目要求宽高两个维度都符合严格单调递增，为降低问题难度，可以考虑先固定一个维度，再在另一个维度上进行选择。

可以将w维度固定，将envelopes按照w升序排序。排序完后，会有w值相同时，h值无序的状况。需要保证，对于每一种w值，最多只能选择1个信封。

可以将h值作为排序的第二关键字进行降序排序，这样，对于每一种w值，h值都是递减的，那么这些h值不可能组成长度超过1的严格递增序列，这样就杜绝了错误的出现。

也就是：

- 首先我们将所有的信封按照 w 值第一关键字升序、h 值第二关键字降序进行排序；
- 随后我们就可以忽略 w 维度，求出 h 维度的最长严格递增子序列，其长度即为答案。

### 题解一：动态规划

假设当前 f[i] 为前 i 个元素满足条件的最多信封个数，即当前选择了第 i 个元素，假设上一个选择是第 j 位元素，那么有状态转移方程 f[i] = f[j] + 1，根据前面的分析，为保证不选错信封，需要同时满足 h<sub>j</sub> < h<sub>i</sub>。

遍历 i 之前的元素，得到 f[i] 的最大值即为满足条件的最多信封个数。

```js
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    const length = envelopes.length;

    if (!length) return 0;

    envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        } else {
            return a[0] - b[0];
        }
    });
    
    const f = new Array(length).fill(1);
    let ans = 1;
    for(let i = 1; i < length; i++) {
        for(let j = 0; j < i; j++) {
            if (envelopes[j][1] < envelopes[i][1]) {
                f[i] = Math.max(f[i], f[j] + 1);
            }
        }
        ans = Math.max(ans, f[i]);
    }
    return ans;
};
```

复杂度：

- 时间复杂度：O(n^2)，排序需要O(nlogn)，动态规划需要O(n^2)，最终复杂度为O(n^2)
- 空间复杂度：O(n)，即为数组 f 所需要的空间

### 题解二：动态规划+二分查找

设 f[j] 表示 h 的前 i 个元素可以组成的长度为 j 的最长严格递增子序列的末尾元素的最小值，可以看出 f 是严格单调递增的，因为越长的子序列的末尾元素显然越大。

进行状态转移时，考虑当前元素 h<sub>i</sub>：

- 如果 h<sub>i</sub> 大于 f 中的最大值，那么 h<sub>i</sub> 可以直接接在 f 之后，形成更长的严格递增子序列；
- 否则，找到比 h<sub>i</sub> 严格小的最大元素 f<sub>j</sub>，满足 f<sub>j</sub> < h<sub>i</sub> <= f<sub>j+1</sub> ，然后令 f<sub>j+1</sub> = h<sub>i</sub> ，即可以形成一个长度为 j+1的严格递增子序列。在 f 上可以进行二分查找，找到满足要求的 j。
  注：遍历envelopes数组时，w是单调递增的，所以令 f<sub>j+1</sub> = h<sub>i</sub> 这步操作，实际上是得到了 j + 1长度的最小h；h的单调递减，则保证了每次push的h，对应的w都是比之前大的，即w严格单调递增。

遍历所有元素，得到的 f 的长度即为最多的信封个数。

```js
var maxEnvelopes = function(envelopes) {
    const length = envelopes.length;

    if (!length) return 0;

    envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        } else {
            return a[0] - b[0];
        }
    });
    
    const f = [envelopes[0][1]];

    for(let i = 1; i < length; i++) {
        const num = envelopes[i][1];
        if (num > f[f.length - 1]) {
            f.push(num);
        } else {
            const index = binarySearch(f, num);
            f[index] = num;
        }
    }
    return f.length;
};

function binarySearch(f, target) {
    let low = 0, high = f.length - 1;
    while(low < high) {
        const mid = Math.floor((low + high) / 2);
        if (f[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}
```

复杂度：

- 时间复杂度：O(nlogn)，排序需要的时间复杂度为O(nlogn)，动态规划的时间复杂度同样为O(nlogn)
- 空间复杂度：O(n)，即为数组 f 需要的空间。



## 参考链接

[354. 俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/)

