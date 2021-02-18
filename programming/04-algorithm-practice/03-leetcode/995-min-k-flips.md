# K 连续位的最小翻转次数

## 题目

在仅包含 0 和 1 的数组 A 中，一次 K 位翻转包括选择一个长度为 K 的（连续）子数组，同时将子数组中的每个 0 更改为 1，而每个 1 更改为 0。

返回所需的 K 位翻转的最小次数，以便数组没有值为 0 的元素。如果不可能，返回 -1。

示例 1：

```
输入：A = [0,1,0], K = 1
输出：2
解释：先翻转 A[0]，然后翻转 A[2]。
```


示例 2：

```
输入：A = [1,1,0], K = 2
输出：-1
解释：无论我们怎样翻转大小为 2 的子数组，我们都不能使数组变为 [1,1,1]。
```


示例 3：

```
输入：A = [0,0,0,1,0,1,1,0], K = 3
输出：3
解释：
翻转 A[0],A[1],A[2]: A变成 [1,1,1,1,0,1,1,0]
翻转 A[4],A[5],A[6]: A变成 [1,1,1,1,1,0,0,0]
翻转 A[5],A[6],A[7]: A变成 [1,1,1,1,1,1,1,1]
```


提示：

- 1 <= A.length <= 30000
- 1 <= K <= A.length

## 题解

### 题解一

遍历数据，遇到0就翻转，如果到最后仍有0，说明不可能，否则返回翻转次数。

```js
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var minKBitFlips = function(A, K) {
    let count = 0;
    for(let i = 0; i <= A.length - K; i++) {
        if (A[i] === 0) {
            bitFlip(i);
            count++;
        }
    }

    for(let i = A.length - K + 1; i < A.length; i++) {
        if (A[i] === 0) {
            return -1;
        }
    }

    return count;

    function bitFlip(index) {
        for(let i = 0; i < K; i++) {
            A[index + i] = (A[index + i] + 1) % 2;
        }
    }
};
```

复杂度：

- 时间复杂度：O(nK)，n为数组长度。
- 空间复杂度：O(1)

#### 优化

在翻转的过程中可以跳跃遍历。

```js
var minKBitFlips = function(A, K) {
    let count = 0;
    let i = 0;
    while(i < A.length) {
        if (A[i] === 0) {
            if (i <= A.length - K) {
                i = bitFlip(i);
                count++;
            } else {
                return -1;
            }  
        } else {
            i++;
        }
    }

    return count;

    function bitFlip(index) {
        let nextIndex = index + 1;
        let flag = false;

        for(let i = 0; i < K; i++) {
            const idx = index + i;

            A[idx] = (A[idx] + 1) % 2;

            if (!flag) {
                nextIndex = A[idx] ? idx + 1 : flag = true && idx;
            }
        }
        return nextIndex;
    }
};
```

没啥用……相当于遍历时的判断放到了翻转函数中。时间反而更长了T T。



### 题解二

差分数组。

使用一个变量`revCnt`保存当前位置的翻转次数，初始为0。使用一个差分数组`diff`保存相邻两个数字的翻转次数差。那么当前位置的翻转次数可以由前一位的翻转次数加上差分数组获得，即`revCnt = revCnt + diff[i]`。

如果当前数字`i`加上翻转次数为偶数，说明需要翻转，如果当前索引无法进行翻转，直接返回 -1；否则翻转次数加一`count++`，当前翻转次数加一`revCnt++`，而`i+K`处，翻转结束，对应差分数组相应减一`diff[i+K]--`。

```js
var minKBitFlips = function(A, K) {
	const length = A.length;
    let diff = new Array(length + 1).fill(0);
    let count = 0;
    let revCnt = 0;
    
    for(let i = 0; i < length; i++) {
        revCnt += diff[i];
        if ((A[i] + revCnt) % 2 === 0) {
            if (i > length - K) {
                return -1;
            }
            count++;
            revCnt++;
            diff[i + K]--;
        }
    }
    
    return count;
};
```

复杂度：

- 时间复杂度： O(N)
- 空间复杂度： O(N)



#### 优化

可以巧妙利用 A 数组只有数字 0/1的特性，将A数组作为差分数组。如果有翻转，则翻转范围外的值加2，以此作为翻转次数的差分标记，且不影响对应位置的奇偶性。

这样就将O(N)的空间复杂度变为了O(1)。

```js
var minKBitFlips = function(A, K) {
    const length = A.length;
    let count = 0;
    let revCnt = 0;
    
    for(let i = 0; i < length; i++) {
        if (A[i] > 1) {
            revCnt--;
            A[i] -= 2; // 复原数组元素
        }
        if ((A[i] + revCnt) % 2 === 0) {
            if (i > length - K) {
                return -1;
            }
            count++;
            revCnt++;
            if (i < length - K) {
                A[i + K] += 2;
            }
        }
    }
    
    return count;
};
```



## 参考链接

[ K 连续位的最小翻转次数](https://leetcode-cn.com/problems/minimum-number-of-k-consecutive-bit-flips/)

