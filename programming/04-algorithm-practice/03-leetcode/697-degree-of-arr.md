# 数组的度

## 题目

给定一个非空且只包含非负数的整数数组 nums，数组的度的定义是指数组里任一元素出现频数的最大值。

你的任务是在 nums 中找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。

示例 1：

```
输入：[1, 2, 2, 3, 1]
输出：2
解释：
输入数组的度是2，因为元素1和2的出现频数最大，均为2.
连续子数组里面拥有相同度的有如下所示:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
最短连续子数组[2, 2]的长度为2，所以返回2.
```


示例 2：

```
输入：[1,2,2,3,1,4,2]
输出：6
```


提示：

- nums.length 在1到 50,000 区间范围内。
- nums[i] 是一个在 0 到 49,999 范围内的整数。



## 题解

### 题解一

遍历一遍数组，存储数组最大频率、最大频率的元素、元素相关信息等内容的哈希表。

然后再根据最大频率的元素，获取最短子数组的长度，并返回。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
    const length = nums.length;
    // degree: 数组的度；tops: 数组的度对应的num数组
    // num: 值为num的相关信息，包括起始、结束位置、出现频次
    let map = { degree: 0, tops: [] };
    let result = length;

    for(let i = 0; i < length; i++) {
        const num = nums[i];
        
        if (!map[num]) { // 未出现过num，初始化，更新degree
            map[num] = { start: i, freq: 1, end: i }
            if (map.degree <= 1) {
                map.degree = 1;
                map.tops.push(num);
            }
        } else { // 出现过num，进行最大频次的判断，更新相关信息
            let freq = ++map[num].freq;
            map[num].end = i;
            if (map.degree === freq) {
                map.tops.push(num);
            } else if (map.degree < freq) {
                map.degree = freq;
                map.tops = [num];
            }
        }
    }

    // 遍历最大频次对应的num数组，获取最小长度作为最终结果
    for(let i = 0; i < map.tops.length; i++) {
        let num = map.tops[i];
        let len = map[num].end - map[num].start + 1;

        result = Math.min(result, len);
    }

    return result;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(n)



官方题解思路基本一致，使用哈希表存储。区别一是num信息用一个数组来标识，0/1/2位对应着num出现的次数、起始位置、终止位置；区别二是未存degree和tops信息，而是直接通过遍历哈希表，获取最大频次及其对应的最小长度。

```js
var findShortestSubArray = function(nums) {
    // num: [count, start, end]
    const map = {};

    for(const [i, num] of nums.entries()) {
        if (!map[num]) {
            map[num] = [1, i, i];
        } else {
            map[num][0]++;
            map[num][2] = i;
        }
    }

    let degree = 0;
    let minLen = 0;
    for(const [count, start, end] of Object.values(map)) {
        if (count > degree) {
            degree = count;
            minLen = end - start + 1;
        } else if (count === degree) {
            minLen = Math.min(minLen, end - start + 1);
        }
    }

    return minLen;
};
```



## 参考链接

[数组的度](https://leetcode-cn.com/problems/degree-of-an-array/)

