# 三数之和

## 题目

给你一个包含 *n* 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 *a，b，c ，*使得 *a + b + c =* 0 ？请你找出所有满足条件且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

 

**示例：**

```
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```



## 题解

### 初解

思路：将传入数组进行排序，然后分成三个数组，<0, =0, >0。

进行如下计算：

- 在小于0数组中取两个数，看大于0中有没有对应的值；遍历得到一个三元组。
- 在小于0数组中取一个数，等于0数组中取1个数，看大于0中有没有对应的值；遍历得到一个三元组。
- 等于0数组中取3个数；得到一个三元组。
- 大于0中取2个，看小于0中有没有对应的值；遍历得到一个三元组。

这些三元组集合加起来即为满足要求的所有三元组。



### 解法2

1、将数组排序

2、定义三个指针，i，l，r。遍历i，那么这个问题就可以转化为在i之后的数组中寻找nums[l]+nums[r]=-nums[i]这个问题，也就将三数之和问题转变为二数之和。（可以使用双指针）

- 如果 nums[i] > 0，说明三个数都大于零，跳出循环
- 取 l = i + 1，r = length - 1；s 为三数之和。
  - s = 0，说明这是一组解，此时l ++, r --，如果nums[l]或nums[r] 和前一位相同，继续 ++ 或 --；
  - s > 0，说明和偏大，要将右侧指针左移，即 r--；
  - s < 0，说明和偏小，要将左侧指针右移，即 l++；

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ret = [];
    const length = nums.length;

    nums.sort((a, b) => a - b);

    for (let i = 0; i < length - 2; i += 1) {
        if (nums[i] > 0) {
            break;
        }
 
        if(i === 0 || nums[i] > nums[i - 1]) {
            let l = i + 1;
            let r = length - 1;
            while(l < r) {
                const s = nums[i] + nums[l] + nums[r];

                if (s === 0) {
                    ret.push([nums[i], nums[l], nums[r]]);
                    l += 1;
                    r -= 1;
                    while (l < r && nums[l] === nums[l - 1]) {
                        l += 1;
                    }
                    while (r > l && nums[r] === nums[r + 1]) {
                        r -= 1;
                    }
                } else if (s > 0) {
                    r -= 1;
                } else {
                    l += 1;
                }
            }
        }
    }

    return ret;
};
```

- 时间复杂度：o(n<sup>2</sup>)

- 空间复杂度：o(1)



## 参考链接

[leetcode](https://leetcode-cn.com/problems/3sum/)