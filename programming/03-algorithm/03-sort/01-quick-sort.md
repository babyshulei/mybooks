# 快速排序

## 思路

（1）在数据集之中，选择一个元素作为"基准"（pivot）。

（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。



## 方案

全是正数的数组：

```js
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
    
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr[pivotIndex];
　　var left = [];
　　var right = [];

　　for (var i = 0; i < arr.length; i++){
      if (i === pivotIndex) {
          continue;
      } else if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}

　　return quickSort(left).concat([pivot], quickSort(right));
};
```



```js
var sortArray = function(nums) {
    quickSort(nums, 0, nums.length - 1);
    return nums;

    function quickSort(nums, low, high) {
        if (low < high) {
            var pivotIdx = partition(nums, low, high);
            quickSort(nums, low, pivotIdx - 1);
            quickSort(nums, pivotIdx + 1, high);
        }
    }

    function partition(arr, low, high) {
        var x = arr[low];
        while (low < high) {
            while(low<high&&x<arr[high]) high--;
            exchange(arr,low,high);
            while(low<high&&x>arr[low]) low++;
            exchange(arr,low,high);
        }
        return low;
    }

    function exchange(arr,pos1,pos2){
        var x=arr[pos1];
        arr[pos1]=arr[pos2];
        arr[pos2]=x;
    }
};
```





## 参考链接

[快速排序（Quicksort）的Javascript实现- 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)

<https://leetcode-cn.com/problems/sort-an-array/>

