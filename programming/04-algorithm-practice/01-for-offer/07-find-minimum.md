# 旋转数组的最小数字

## 题目

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。

例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。

NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。



## 题解

### 无重复数字

二分查找法，如果 mid 小于第一个元素，则右指针左移；如果 mid 大于第一个元素，则左指针右移。最后得到左指针为最大值，右指针为最小值。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    var len = nums.length;
    if (len === 0) return 0;
    if (nums[0] < nums[len - 1]) return nums[0];
    var left = 0;
    var right = len - 1;

    while(left < right) {
        if (left + 1 === right) break;

        var mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[0]) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return nums[right];
};
```

优化：

停止搜索时间点：

nums[mid] > nums[mid + 1]，因此 mid+1 是最小值。

nums[mid - 1] > nums[mid]，因此 mid 是最小值。



## 参考链接

[牛客网-旋转数组的最小数字](https://www.nowcoder.com/practice/9f3231a991af4f55b95579b44b7a01ba?tpId=13&tqId=11159&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

[LeetCode-寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array)  

[LeetCode-寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii)  

