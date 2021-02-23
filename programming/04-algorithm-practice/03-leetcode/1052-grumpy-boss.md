# 爱生气的书店老板

## 题目

今天，书店老板有一家店打算试营业 customers.length 分钟。每分钟都有一些顾客（customers[i]）会进入书店，所有这些顾客都会在那一分钟结束后离开。

在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 grumpy[i] = 1，否则 grumpy[i] = 0。 当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。

请你返回这一天营业下来，最多有多少客户能够感到满意的数量。

示例：

```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
输出：16
解释：
书店老板在最后 3 分钟保持冷静。
感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
```


提示：

- 1 <= X <= customers.length == grumpy.length <= 20000
- 0 <= customers[i] <= 1000
- 0 <= grumpy[i] <= 1



## 题解

思路：

假设老板不生气的满意客户总数为base；连续X分钟不生气时，增加的客户满意数为more；滑动窗口，获取more的最大值。

```js
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
    const length = customers.length;
    // 老板不生气的基础满意客户数
    let base = 0;
    // X分钟内不生气，增加满意客户数
    let more = 0;

    // 初始化窗口，[0,X-1]
    for(let i = 0; i < X; i++) {
        if (grumpy[i]) {
            more += customers[i];
        } else {
            base += customers[i];
        }
    }

    // X分钟内不生气，增加满意客户数的最大值
    let maxMore = more;

    // 滑动窗口，获取maxMore
    for (let right = X; right < length; right++) {
        if (grumpy[right]) {
            more += customers[right];
        } else {
            base += customers[right];
        }
        if (grumpy[right - X]) {
            more -= customers[right - X];
        }
        maxMore = Math.max(more, maxMore);
    }

    return base + maxMore;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(1)



## 参考链接

[1052. 爱生气的书店老板](https://leetcode-cn.com/problems/grumpy-bookstore-owner/)

