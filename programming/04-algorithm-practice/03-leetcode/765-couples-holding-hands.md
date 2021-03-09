# 情侣牵手

## 题目

N 对情侣坐在连续排列的 2N 个座位上，想要牵到对方的手。 计算最少交换座位的次数，以便每对情侣可以并肩坐在一起。 一次交换可选择任意两人，让他们站起来交换座位。

人和座位用 0 到 2N-1 的整数表示，情侣们按顺序编号，第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2N-2, 2N-1)。

这些情侣的初始座位  row[i] 是由最初始坐在第 i 个座位上的人决定的。

示例 1:

```
输入: row = [0, 2, 1, 3]
输出: 1
解释: 我们只需要交换row[1]和row[2]的位置即可。
```

示例 2:

```
输入: row = [3, 2, 0, 1]
输出: 0
解释: 无需交换座位，所有的情侣都已经可以手牵手了。
```


说明:

- len(row) 是偶数且数值在 [4, 60]范围内。
- 可以保证row 是序列 0...len(row)-1 的一个全排列。



## 题解

### 题解一

最少次数就是发现不对就交换。

```js
/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function(row) {
    let couples = row.length / 2;
    let count = 0;
    for(let i = 0; i < couples; i++){
        const one = row[2 * i];
        const two = row[2 * i + 1];

        if (one % 2 === 0 && two - one !== 1) {
            const j = findNumIndex(one + 1, 2 * i + 2);
            swap(2 * i + 1, j);
            count++;
        } else if (one % 2 === 1 && one - two !== 1) {
            const j = findNumIndex(one - 1, 2 * i + 2);
            swap(2 * i + 1, j);
            count++;
        }
    }
    return count;

    function findNumIndex(target, start) {
        for (let i = start; i < row.length; i++) {
            if (row[i] === target) {
                return i;
            }
        }
    }

    function swap(x, y) {
        let tmp = row[x];
        row[x] = row[y];
        row[y] = tmp;
    }
};
```

复杂度

- 时间复杂度：O(n^2)
- 空间复杂度：O(1)

#### 优化

建立个Map存储索引，查找的时间复杂度直接降为O(1)

```js
var minSwapsCouples = function(row) {
    const length = row.length;
    const map = {};
    let count = 0;

    for(let i = 0; i < length; i++) {
        map[row[i]] = i;
    }

    for(let i = 0; i < length; i += 2){
        const one = row[i];
        const two = row[i + 1];
        const next = one % 2 === 0 ? one + 1 : one - 1;

        if (two !== next) {
            const j = map[next];
            swap(i + 1, j);
            count++;
        }
    }
    return count;

    function swap(x, y) {
        let tmp = row[x];
        row[x] = row[y];
        row[y] = tmp;
        // map[row[x]] = x; // 可忽略，因为交换过去的值不会再查找
        map[tmp] = y;
    }
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(n)



## 参考链接

https://leetcode-cn.com/problems/couples-holding-hands/

