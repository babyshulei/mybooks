# 可获得的最大点数

## 题目

几张卡牌 排成一行，每张卡牌都有一个对应的点数。点数由整数数组 cardPoints 给出。

每次行动，你可以从行的开头或者末尾拿一张卡牌，最终你必须正好拿 k 张卡牌。

你的点数就是你拿到手中的所有卡牌的点数之和。

给你一个整数数组 cardPoints 和整数 k，请你返回可以获得的最大点数。

示例 1：

```
输入：cardPoints = [1,2,3,4,5,6,1], k = 3
输出：12
解释：第一次行动，不管拿哪张牌，你的点数总是 1 。但是，先拿最右边的卡牌将会最大化你的可获得点数。最优策略是拿右边的三张牌，最终点数为 1 + 6 + 5 = 12 。
```


示例 2：

```
输入：cardPoints = [1,2,3,4,5,6,1], k = 3
输出：12
解释：第一次行动，不管拿哪张牌，你的点数总是 1 。但是，先拿最右边的卡牌将会最大化你的可获得点数。最优策略是拿右边的三张牌，最终点数为 1 + 6 + 5 = 12 。
```


示例 3：

```
输入：cardPoints = [9,7,7,9,7,7,9], k = 7
输出：55
解释：你必须拿起所有卡牌，可以获得的点数为所有卡牌的点数之和。
```


示例 4：

```
输入：cardPoints = [1,1000,1], k = 1
输出：1
解释：你无法拿到中间那张卡牌，所以可以获得的最大点数为 1 。 
```


示例 5：

```
输入：cardPoints = [1,79,80,1,1,1,200,1], k = 3
输出：202
```

提示：

- 1 <= cardPoints.length <= 10^5
- 1 <= cardPoints[i] <= 10^4
- 1 <= k <= cardPoints.length

## 题解

### 题解一

思路：

卡牌数是固定的k，只能从开头或末尾取。

采用滑动窗口的方案，一开始取开头的k个，得到其点数之和，作为最大点数。

然后再从数组的末尾开始向前滑动，计算点数和，和最大点数比较，取较大的那个作为最大点数。

遍历，直到取数组末尾k个值，得到所有场景的点数之和的最大值，返回。

```js
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    const length = cardPoints.length;
    let sum = 0;
    for(let i = 0; i < k; i++) {
        sum += cardPoints[i];
    }
    let max = sum;
    for(let j = length - 1; j >= length - k; j--) {
        sum += cardPoints[j] - cardPoints[k - length + j];
        max = Math.max(max, sum);
    }
    return max;
};
```

复杂度分析：

- 时间复杂度： O(n)
- 空间复杂度： O(1)

### 题解二

思路：

取走首尾一共 k 个牌，那么就剩下 n - k 个连续的牌，总体点数和是个定值，想要取最大点数和，那么找到最小剩余点数和即可。

```js
var maxScore = function(cardPoints, k) {
    const length = cardPoints.length;
    let sum = 0;
    let left = 0;
    // 计算牌数总和、剩余牌数和
    for(let i = 0; i < length; i++) {
        if (i < length - k) {
            left += cardPoints[i];
        }
        sum += cardPoints[i];
    }
    // 滑动剩余牌数的窗口，找到最小值
    let min = left;
    for(let j = 1; j <= k; j++) {
        left += cardPoints[j + length - k - 1] - cardPoints[j - 1];
        min = Math.min(min, left);
    }
    return sum - min;
};
```



## 参考链接

https://leetcode-cn.com/problems/maximum-points-you-can-obtain-from-cards/

