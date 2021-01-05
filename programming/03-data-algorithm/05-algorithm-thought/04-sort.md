# 排序

排序就是将一组对象按照某种逻辑顺序重新排列的过程。

## 分析排序算法

分析排序算法，一般从以下几方面来衡量：

**一、排序算法的执行效率**

1. 最好情况、最坏情况、平均情况的时间复杂度，和其对应的原始数据情况。
2. 时间复杂度的系数、常数、低阶。在对同阶时间复杂度算法性能对比时，结合数据量级，将这些影响因素也考虑进来。
3. 比较次数和交换（或移动）的次数。基于比较的排序算法的执行效率分析，需要考虑比较次数和交换（或移动）的次数。

**二、排序算法的内存消耗**

算法的内存消耗可以用空间复杂度来衡量。有一类排序算法叫**原地排序（Sorted in place）算法**，特指空间复杂度是O(1)的排序算法。

**三、排序算法的稳定性**

排序算法的**稳定性**是指，如果待排序的序列中存在值相等的元素，经过排序之后，相等元素之间原有的前后顺序不变。

排序后相等元素前后顺序不变的，该排序算法叫做**稳定的排序算法**；如果前后顺序发生改变，那对应的排序算法就叫做**不稳定的排序算法**。

稳定的排序算法，可以在一次排序后，用其他key再次排序时仍然保持有序，在以多个条件进行排序时非常有用。

### 小结

排序可以按如下分类：

- 内存占用：
  - In-place sort（原地排序，不占用额外内存或占用常数的内存）：插入排序、选择排序、冒泡排序、堆排序、快速排序。
  - Out-place sort：归并排序、计数排序、基数排序、桶排序。
- 稳定性：
  - stable sort：插入排序、冒泡排序、归并排序、计数排序、基数排序、桶排序。
  - unstable sort：选择排序、快速排序、堆排序。
- 是否基于比较：
  - 比较排序，时间复杂度最少可达到O(n log n)，主要有：冒泡排序，选择排序，插入排序，归并排序，堆排序，快速排序等。
  - 非比较排序，时间复杂度可以达到O(n)，主要有：计数排序，基数排序，桶排序等。

总结：

| 排序算法 | 时间复杂度       | 内存消耗      | 稳定性 | 比较/非比较 |
| -------- | ---------------- | ------------- | ------ | ----------- |
| 冒泡排序 | O(n<sup>2</sup>) | In-place sort | 稳定   | 比较        |
| 插入排序 | O(n<sup>2</sup>) | In-place sort | 稳定   | 比较        |
| 选择排序 | O(n<sup>2</sup>) | In-place sort | 不稳定 | 比较        |
| 归并排序 |                  |               |        |             |
| 快速排序 | O(nlogn)         | In-place sort | 不稳定 | 比较        |
| 堆排序   |                  |               |        |             |
| 计数排序 |                  |               |        |             |
| 基数排序 |                  |               |        |             |
| 桶排序   |                  |               |        |             |



## 常见排序算法

### 冒泡排序（Bubble Sort）

#### 原理

原理是相邻的数字两两进行比较，按照从小到大或者从大到小的顺序进行交换，这样一趟过去后，最大或最小的数字被交换到了最后一位，然后再从头开始进行两两比较交换，直到倒数第二位时结束。

#### 代码实现

```js
function bubbleSort(arr) {
    const length = arr.length;

    if (length <= 1) {
        return arr;
    }

    for (let i = 0; i < length; i++) {
        // 提前退出冒泡循环的标志位
        let flag = false;
        for (let j = 0; j < length - i - 1; j++) {
            // 冒泡交换
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
        // 没有数据交换，提前退出
        if (!flag) break;
    }

    return arr;
}
```

#### 分析

稳定的原地排序算法。

- 最好情况：初始数据有序，时间复杂度 O(n)。
- 最坏情况：初始数据倒序，时间复杂度 O(n<sup>2</sup>)。
- 平均时间复杂度：
  可以通过“有序度”和“逆序度”进行分析。
  **有序度**，数组中具有有序关系的元素对个数，满足：`i<j, a[i]<=a[j]`
  **逆序度**，数组中不具有有序关系的元素对个数，满足：`i<j, a[i]>a[j]`
  **满有序度**，即完全有序的数组的有序度，为`n*(n-1)/2`。
  实际上，`逆序度=满有序度-有序度`。
  冒泡排序中，相邻元素会比较和交换，每交换1次，有序度加1，即交换的次数等于逆序度。最好情况下，逆序度为0；最坏情况逆序度为`n*(n-1)/2`；平均情况为`n*(n-1)/4`。比较的操作会大于交换的操作。
  可以得到，平均时间复杂度为O(n<sup>2</sup>)。

### 插入排序（Insertion Sort）

#### 原理

将数组分为两个区间，**已排序区间**和**未排序区间**。初始已排序区间只有一个元素，为数组的第一个元素。每次取未排序区间中的元素，在已排序区间从后向前扫描，找到合适的位置将其插入，保证已排序区间数据一直有序。重复这个过程，直到未排序区间为空。

#### 代码实现

```js
function insertionSort(a) {
    const length = a.length;
    if (length <= 1) {
        return a;
    }
    for (let i = 1; i < length; i++) {
        let value = a[i];
        let j;
        // 查找插入的位置
        for (j = i - 1; j >= 0; j--) {
            if (value < a[j]) {
                a[j + 1] = a[j]; // 数据移动
            } else {
                break;
            }
        }
        a[j + 1] = value; // 插入数据
    }
    return a;
}
```

#### 分析

稳定的原地排序算法。

- 最好情况：初始数据有序，时间复杂度 O(n)。
- 最坏情况：初始数据倒序，时间复杂度 O(n<sup>2</sup>)。
- 平均时间复杂度：
  在数组中插入一个数据的平均时间复杂度为 O(n)，循环执行n次插入操作，所以插入排序的平均时间复杂度为 O(n<sup>2</sup>)。

### 选择排序（Selection Sort）

#### 原理

顾名思义，就是直接从待排序数组里选择一个最小（或最大）的数字，每次都拿一个最小数字出来，顺序放入新数组，直到全部拿完。

**工作原理：**在未排序区间中找到最小（大）元素，存放到已排序区间的末尾；循环这个过程，直到所有元素均排序完毕。

#### 代码实现

```js
function selectionSort(a) {
    const length = a.length;

    for (let i = 0; i < length; i++) {
        let index = i;
        for (let j = i; j < length; j++) {
            // 遍历未排序数组，得到最小值索引
            if (a[j] < a[index]) {
                index = j;
            }
        }
        // 交换最小值到已排序数组末尾
        [a[i], a[index]] = [a[index], a[i]];
    }
}
```

#### 分析

- 原地排序算法。
- 不稳定的排序算法：每次选择元素都会交换位置，破坏了稳定性。
- 最好、最坏、平均时间复杂度都为O(n<sup>2</sup>)。

### 归并排序



### 快速排序

#### 原理

（1）在数据集之中，选择一个元素作为"基准"（pivot）。

（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

#### 代码实现

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


### 堆排序





### 计数排序





### 基数排序



### 桶排序





## 参考链接

[《算法4》]()

[数据结构与算法之美 - 极客时间](https://time.geekbang.org/column/intro/100017301)

[九大排序算法再总结](http://blog.csdn.net/xiazdong/article/details/8462393)

[常用排序算法总结](http://www.cnblogs.com/eniac12/p/5329396.html)

[经典排序算法【集锦】](http://www.cnblogs.com/kkun/archive/2011/11/23/2260312.html)

[快速排序（Quicksort）的Javascript实现- 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)

<https://leetcode-cn.com/problems/sort-an-array/>
