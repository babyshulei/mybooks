# 数组中重复的数据

## 题目

给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。

找到所有出现两次的元素。

你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？

示例：

```
输入:
[4,3,2,7,8,2,3,1]

输出:
[2,3]
```

## 题解

### 排序

通过索引号排序，比如数字`4`放到索引`3`的位置，最后找排序后数组，与索引号没有相差`1`便是重复元素。

```js
var findDuplicates = function(nums) {
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        while(nums[nums[i] - 1] !== nums[i]) {
            const tmp = nums[i];
            nums[i] = nums[tmp - 1];
            nums[tmp - 1] = tmp;
        }
    }

    nums.forEach((val, idx) => {
        if (val !== idx + 1) {
            res.push(val);
        }
    });

    return res;
};
```



### 绝对值

借用索引号，因为是在1~n之间，那么我们可以用索引0表示数字1，索引1表示数字2...，当有个数字num，我们将num - 1的位置的数字取相反数，连续两次取相反数会变回来，便可判断元素出现次数。

```js
var findDuplicates = function(nums) {
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        const loc = Math.abs(nums[i]) - 1;
        if (nums[loc] < 0) {
            res.push(loc + 1);
        }
        nums[loc] = -nums[loc];
    }

    return res;
};
```



## 参考链接

<https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/>

<https://www.nowcoder.com/questionTerminal/623a5ac0ea5b4e5f95552655361ae0a8>

