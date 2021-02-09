# K 个不同整数的子数组

## 题目

给定一个正整数数组 A，如果 A 的某个子数组中不同整数的个数恰好为 K，则称 A 的这个连续、不一定独立的子数组为好子数组。

（例如，[1,2,3,1,2] 中有 3 个不同的整数：1，2，以及 3。）

返回 A 中好子数组的数目。

示例 1：

```
输入：A = [1,2,1,2,3], K = 2
输出：7
解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
```


示例 2：

```
输入：A = [1,2,1,3,4], K = 3
输出：3
解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
```


提示：

- 1 <= A.length <= 20000
- 1 <= A[i] <= A.length
- 1 <= K <= A.length

## 题解

失败解法：

思路是每个位置进行子数组的计算，遍历整个数组后得到子数组的个数。

过于暴力，未通过T T	

```js
var subarraysWithKDistinct = function(A, K) {
    const length = A.length;
    let count = 0;
    for (let start = 0; start < length; start++) {
        let map = { length: 0 };
        for (let end = start; end < length; end++) {
            if (map[A[end]]) {
                map[A[end]]++;
            } else {
                map[A[end]] = 1;
                map.length++;
            }
            if (map.length === K) {
                count++;
            } else if (map.length > K) {
                break;
            }
        }
        if (map.length < K) {
            break;
        }
    }
    return count;
};
```

### 题解一

双指针法

问题由获取K个不同整数的子数组转化为，求最多包含K中不同整数的子数组之差。

```js
var subarraysWithKDistinct = function(A, K) {
    return maxSubarrys(A, K) - maxSubarrys(A, K - 1);

    function maxSubarrys(A, K) {
        const length = A.length;
        let ret = 0;
        let map = { length: 0 };
        let start = 0;
        let end = 0;
        while(end < length) {
            if (map[A[end]]) {
                map[A[end]]++;
                end++;
            } else {
                map[A[end]] = 1;
                map.length++;
                end++;
            }

            while(map.length > K) {
                map[A[start]]--;
                if (map[A[start]] === 0) {
                    map.length--;
                }
                start++;
            }
            ret += end - start;
        }

        return ret;
    }
};
```

## 参考链接

https://leetcode-cn.com/problems/subarrays-with-k-different-integers/

