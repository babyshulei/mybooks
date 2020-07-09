# 调整数组顺序使奇数位于偶数前面

## 题目

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。



## 题解

### 思路一

循环一次，空间换时间。

```js
function reOrderArray(array)
{
    const odd = [];
    const even = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2) {
            odd.push(array[i]);
        } else {
            even.push(array[i]);
        }
    }
    
    return odd.concat(even);
}
```

### 思路二

i从左向右遍历，找到第一个偶数。

j从i+1开始向后找，直到找到第一个奇数。

将[i,...,j-1]的元素整体后移一位，最后将找到的奇数放入i位置，然后i++。

终止条件：j向后遍历查找失败。

### 思路三

使用插入排序的思想。

```js
function reOrderArray(array)
{
    let k = 0; // 奇数位指针
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2) {
            let j = i;
            while (j > k) {
                const tmp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = tmp;
                j--;
            }
            k++;
        }
    }
    
    return array;
}
```



## 参考链接

<https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/>

[牛客网](https://www.nowcoder.com/practice/beb5aa231adc45b2a5dcc5b62c93f593?tpId=13&&tqId=11166&rp=1&ru=/activity/oj&qru=/ta/coding-interviews/question-ranking)