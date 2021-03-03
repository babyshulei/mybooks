# 比特位计数

## 题目

给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

示例 1:

```
输入: 2
输出: [0,1,1]
```


示例 2:

```
输入: 5
输出: [0,1,1,2,1,2]
```


进阶:

- 给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
- 要求算法的空间复杂度为O(n)。
- 你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的 __builtin_popcount）来执行此操作。



## 题解

### 题解一：直接计算

暴力法，遍历1的个数。

```js
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
    const ret = [0];
    for(let i = 1; i <= num; i++) {
        const numStr = i.toString(2);
        let count = 0;
        for(let j = 0; j < numStr.length; j++) {
            if (numStr[j] === '1') {
                count++;
            }
        }
        ret.push(count);
    }
    return ret;
};
```

复杂度：

- 时间复杂度：O(k*num)
- 空间复杂度：O(1)

#### 优化

利用位运算的技巧，提升获取1个数的计算速度。

按位与运算（\&）的一个性质是：对于任意整数 x，令 `x=x&(x−1)`，该运算将 xx 的二进制表示的最后一个 1 变成 0。因此，对 x 重复该操作，直到 x 变成 0，则操作次数即为 x 的「一比特数」。

```js
var countBits = function(num) {
    const ret = [0];
    for(let i = 1; i <= num; i++) {
        ret[i] = countOnes(i);
    }
    return ret;
};

function countOnes(num) {
    let count = 0;
    while(num) {
        num = num & (num - 1);
        count++;
    }
    return count;
}
```

### 题解二：动态规划-最低有效位

可以使用「最低有效位」计算「一比特数」。

对于正整数 x，将其二进制表示右移一位，等价于将其二进制表示的最低位去掉，得到的数是`Math.floor(x/2)`。如果 `bits[Math.floor(x/2)]` 的值已知，则可以得到 `bits[x]` 的值：

- 如果 x 是偶数，则 `bits[x] = bits[Math.floor(x/2)]`
- 如果 xx 是奇数，则 `bits[x] = bits[Math.floor(x/2)] + 1`

上述两种情况可以合并成：bits[x] 的值等于 `bits[Math.floor(x/2)]` 的值加上 x 除以 2 的余数。

由于 `Math.floor(x/2)`可以通过 `x >> 1` 得到，x 除以 2 的余数可以通过 `x & 1` 得到，因此有：`bits[x]=bits[x>>1]+(x&1)`。

```js
var countBits = function(num) {
    const bits = [0];
    for(let i = 1; i <= num; i++) {
        bits[i] = bits[i >> 1] + (i & 1);
    }
    return bits;
};
```

复杂度：

- 时间复杂度：O(num)
- 空间复杂度：O(1)

### 题解三：动态规划-最低设置位

令 `y=x&(x−1)`，则 y 为将 x 的最低设置位从 1 变成 0 之后的数，显然 0≤y<x，`bits[x]=bits[y]+1`。因此对任意正整数 x，都有`bits[x]=bits[x&(x−1)]+1`。

```js
var countBits = function(num) {
    const bits = [0];
    for(let i = 1; i <= num; i++) {
        bits[i] = bits[i & (i - 1)] + 1;
    }
    return bits;
};
```

复杂度：

- 时间复杂度：O(num)
- 空间复杂度：O(1)



## 参考链接

[338. 比特位计数](https://leetcode-cn.com/problems/counting-bits/)

