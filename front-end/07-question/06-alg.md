# 算法

## 排序算法

### 冒泡排序

原理是临近的数字两两进行比较，按照从小到大或者从大到小的顺序进行交换，这样一趟过去后，最大或最小的数字被交换到了最后一位，然后再从头开始进行两两比较交换，直到倒数第二位时结束。



### 鸡尾酒排序

鸡尾酒排序，也叫定向冒泡排序，是冒泡排序的一种改进。此算法与冒泡排序的不同处在于从低到高然后从高到低，而冒泡排序则仅从低到高去比较序列里的每个元素。他可以得到比冒泡排序稍微好一点的效能。



### 选择排序

顾名思义，就是直接从待排序数组里选择一个最小(或最大)的数字，每次都拿一个最小数字出来，顺序放入新数组，直到全部拿完。

工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置；然后，再从剩余未排序元素中继续寻找最小（大）元素，放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。



### 插入排序

对于未排序数据(右手抓到的牌)，在已排序序列(左手已经排好序的手牌)中从后向前扫描，找到相应位置并插入。

插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

具体算法描述如下：
1. 从第一个元素开始，该元素可以认为已经被排序

2. 取出下一个元素，在已经排序的元素序列中从后向前扫描

3. 如果该元素（已排序）大于新元素，将该元素移到下一位置

4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置

5. 将新元素插入到该位置后
6. 重复步骤2~5

**时间复杂度**

| 排序算法     | 平均时间复杂度 | 最坏时间复杂度 | 空间复杂度 | 是否稳定 |
| ------------ | :------------: | :------------: | :--------: | :------: |
| 冒泡排序     |     O(n²)      |     O(n²)      |    O(1)    |    是    |
| 选择排序     |     O(n²)      |     O(n²)      |    O(1)    |   不是   |
| 直接插入排序 |     O(n²)      |     O(n²)      |    O(1)    |    是    |

### 快速排序

快速排序是由东尼·霍尔所发展的一种排序算法。在平均状况下，排序n个元素要O(nlogn)次比较。在最坏状况下则需要O(n^2)次比较，但这种状况并不常见。事实上，快速排序通常明显比其他O(nlogn)算法更快，因为它的内部循环可以在大部分的架构上很有效率地被实现出来。

快速排序使用分治策略(Divide and Conquer)来把一个序列分为两个子序列。步骤为：

1. 从序列中挑出一个元素，作为"基准"(pivot).
2. 把所有比基准值小的元素放在基准前面，所有比基准值大的元素放在基准的后面（相同的数可以到任一边），这个称为分区(partition)操作。
3. 对每个分区递归地进行步骤1~3，递归的结束条件是序列的大小是0或1，这时整体已经被排好序了。



[前端笔试&面试爬坑系列---算法- 掘金](https://juejin.im/post/5b72f0caf265da282809f3b5)



#### 用js实现二分查找一个有序数组

> 将要查找的值每次与中间值比较，大于中间值，则在右边进行相同的查找，小于中间值则在左边进行比较查找，找到返回索引值，没找到返回-1。

1.非递归：

```javascript
function binarySearch(target,arr){
    var start = 0;
    var end = arr.length-1;
    while(start <= end){
        var mid = parseInt((start+end)/2);
        if(target == arr[mid]){
            return mid
        }else if(target > arr[mid]){
            start = mid + 1;
        }else if(target < arr[mid]){
            end = mid - 1;
        }else{
            return -1;
        }
    }
}
var arr = [1,2,4,6,8,9,11,34,67];
console.log(binarySearch(11,arr));
```

2.递归：

```javascript
function binarySearch(arr,target,start,end){
    var start = start || 0;
    var end = end || arr.length-1;
    var mid = parseInt((start+end)/2);
    if(target == arr[mid]){
             return mid
         }else if(target > arr[mid]){
             start = mid + 1;
             return binarySearch(arr,target,start,end);
         }else if(target < arr[mid]){
             end = mid - 1;
             return binarySearch(arr,target,start,end);
         }else{
             return -1;
    }
}
var arr = [1,2,4,6,8,9,11,34,67];
console.log(binarySearch(arr,11));
```



#### 验证一个字符串是否为回文

**什么是回文？**

回文指从左往右和从右往左读到相同内容的文字。比如: aba，abba，level。

思路：

1. 使用数组方法生成倒装的新字符串与原字符串对比

```javascript
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  return (
    Array.from(str)
      .reverse()
      .join('') === str
  );
}
```

2. 通过倒序循环生成新字符串与原字符串对比

```javascript
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  var newStr = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return str1 === str;
}
```

3. 以中间点为基点，从头至中与从尾至中逐一字符串进行对比，若有一个不同，则 `return false`. 这种方法循环次数最少，效率最高

```javascript
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
```



##### 进阶：删除一个字母的回文

给定非空字符串 s，您最多可以删除一个字符。判断是否可以成为回文。

该字符串仅包含小写字符 a-z,字符串的最大长度为 50000。

A：

- 如果单单是回文的话，就很简单了:

```js
s === [...s].reverse().join(''); // 翻转字符串与原字符相比
// 实际上这里做了很多步操作，字符转数组 翻转数组 再转字符串，所以这里性能也不是很好
// 如果对性能要求比较高的话，还是通过循环从两侧向中间逐一比较，会更好一点
```

- 题目中还有一个要求：删除一个字符，也就是允许一个字符的不同。
- 下面我们的解法主体思路就是**通过循环，从两侧向中间比较**，然后解决当出现不同的情况，如何**保证只允许出现一个不同**。



1. 出现一处不同 将值传入一个新函数，再进行判断字符串：

```js
const validPalindrome = s => {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      // 左右两边字符都要尝试一下 一边返回true即可
      return (
        isSubPalindrom(s, left + 1, right) || isSubPalindrom(s, left, right - 1)
      );
    }
    left++;
    right--;
  }
  return true; // 循环结束返回true
};
const isSubPalindrom = (s, left, right) => {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false; // 再有不同之处 返回false
    }
    left++;
    right--;
  }
  return true; // 循环结束一直相等返回true
  // 并且left不小于right 直接返回right，说明不同之处只有一个
};
console.log(
  '回文验证:',
  validPalindrome('abaacaaa'),
  validPalindrome('ab'),
  validPalindrome('abc'),
  validPalindrome('aabsjdbaa')
);
```

写好之后，我在想能不能通过递归的形式来解决，**为什么要创建第二个函数**？

2. 递归解法：

```js
const validPalindrome = (s, left = 0, right = s.length - 1, type = 'first') => {
  if (type === 'first') {
    // 第一次进入允许出现一次不同
    while (left < right) {
      if (s[left] !== s[right]) {
        return (
          validPalindrome(s, left + 1, right, 'second') ||
          validPalindrome(s, left, right - 1, 'second')
        ); // 左右两边都尝试一下 一边返回true即可
      }
      left++;
      right--;
    }
    return true; // 循环结束返回true
  } else {
    // 第二次 再有不同之处 返回false
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true; // 循环结束一直相等返回true
    // 并且left不小于right 直接返回right，说明不同之处只有一个
  }
};
console.log(
  '回文验证:',
  validPalindrome('abaacaaa'),
  validPalindrome('ab'),
  validPalindrome('abc'),
  validPalindrome('aabsjdbaa')
);
```

相对于上个解法这里就是多设置了一个变量，然后将两方区分开来，但是这样递归我还是觉得太傻了，所以在想你**能不能通过设置变量来处理**？出现两次不同即失败。

3. 设置一个变量允许一次不同

```js
const validPalindrome = s => {
  let removed = false;
  for (let [i, j] = [0, s.length - 1]; i < j; i++, j--) {
    // 从两侧向中间递减 i- j-1 减到最后 i>j i=j 退出循环
    if (s[i] !== s[j]) {
      // 如果两侧不相同
      if (removed) {
        // 只允许一次不同
        return false;
      }
      if (s[i] === s[j - 1]) {
        // 转数组删除一个不同元素 下次直接return
        // s = [...s].splice(j, 1);
        // s = s.join(''); // 处理过的字符串
        j--;
        removed = true;
      } else if (s[i + 1] === s[j]) {
        // s = [...s].splice(i, 1);
        // s = s.join(''); // 处理过的字符串
        i++;
        removed = true;
      } else {
        // 上面两个else 右边-1 或左边+1相不相等 如果两边也不相等即false
        return false;
      }
    }
  }
  return true;
};
console.log(
  '回文验证:',
  validPalindrome('abaacaaa'),
  validPalindrome('ab'),
  validPalindrome('abc'),
  validPalindrome('aabsjdbaa')
);
```



#### 软件版本号比较

编程实现一个比较任意两个软件版本号大小的函数，如 1.2.3 和 1.2.4 比较，后者版本号更大

 

#### 实现once函数

实现一个函数once，接受一个参数，参数是一个函数，返回一个新函数，新函数执行过程和传入函数一致，但是只能被执行一次

 

#### ES6函数参数默认值

使用ES5实现ES6函数参数默认值功能，如function foo(a, b) {//xxx}，f(a)执行过程将使用b的默认值

 

#### 实现sqrt函数

 

#### 快速排序in-place

 

#### 检查括号是否匹配



[前端面试中的常见的算法问题](https://www.jackpu.com/qian-duan-mian-shi-zhong-de-chang-jian-de-suan-fa-wen-ti/)

[前端算法| 前端进阶积累](http://obkoro1.com/web_accumulate/algorithm/)

[前端算法题目解析（一） - 掘金](https://juejin.im/post/5df72b066fb9a0165835a456)

