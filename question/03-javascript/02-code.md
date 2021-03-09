# 手写代码

## Promise
### 1. 手写Promise
简版

```js
// 简版
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.reason = null;

  that.resolveCbs = [];
  that.rejectCbs = [];

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULLFILLED;
      that.value = value;
      that.resolveCbs.map(cb => cb(value));
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.rejectCbs.map(cb => cb(reason));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFullFilled, onRejected) {
  const that = this;
  if (that.status === PENDING) {
    that.resolveCbs.push(onFullFilled);
    that.rejectCbs.push(onRejected);
  }
  if (that.status === FULLFILLED) {
    onFullFilled(that.value);
  }
  if (that.status === REJECTED) {
    onRejected(that.reason);
  }
  return that;
}

MyPromise.prototype.catch = function(onRejected) {
  const that = this;
  if (that.status === PENDING) {
    that.rejectCbs.push(onRejected);
  }
  if (that.status === REJECTED) {
    onRejected(that.reason);
  }
  return that;
}
```

### 2. 使用 Promise 实现每隔一秒输出1、2、3

```js
// 解法一
const oneToThree = () => {
  const arr = [1, 2, 3];
  arr.reduce((prev, next) => {
    return prev.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(next);
          resolve();
        }, 1000);
      })
    });
  }, Promise.resolve())
};

// 解法二
const oneToThree2 = async() => {
  const arr = [1, 2, 3];

  for(let i = 0; i < arr.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(arr[i]);
        resolve();
      }, 1000);
    });
  }
}
```

### 3. 使用 Promise 实现红绿灯交替重复亮

红灯 3 秒亮一次，黄灯 2 秒亮一次，绿灯 1 秒亮一次，用 Promise 实现 3 个灯交替重复亮。

题解：

```js
// 解法一
async function light() {
  const lightMap = ['red', 'yellow', 'green'];
  const timeMap = [3000, 2000, 1000];
  let i = 0;

  while(true) {
    await new Promise((resolve) => {
      console.log(lightMap[i]);
      setTimeout(() => {
        resolve();
      }, timeMap[i]);
    });
    i = (i + 1) % 3;
  }
}

// 解法二
function light2() {
  const red = () => console.log('red');
  const yellow = () => console.log('yellow');
  const green = () => console.log('green');
  const light = (cb, timer) => {
    return new Promise((resolve) => {
      cb();
      setTimeout(() => {
        resolve();
      }, timer);
    });
  }

  const step = () => {
    Promise.resolve().then(() => {
      return light(red, 3000);
    }).then(() => {
      return light(yellow, 2000);
    }).then(() => {
      return light(green, 1000);
    }).then(() => {
      return step();
    });
  }

  return step();
}
```

### 4. 实现 mergePromise 函数

实现 `mergePromise` 函数，将传进去的数组按先后顺序执行，并且把返回的值先后放在数组 `data` 中。

例如：

```js
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise () {
  // 在这里写代码
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

题解：

```js
// 解法一
async function mergePromise(arr) {
  let ret = [];

  for(let i = 0; i < arr.length; i++) {
    const val = await arr[i]();
    ret.push(val);
  }

  return ret;
}

// 解法二
function mergePromise (ajaxList) {
    const data = [];
    let promise = Promise.resolve();
  
    ajaxList.forEach((ajax) => {
      promise = promise.then(() => {
        return ajax();
      }).then((resolve) => {
        data.push(resolve);
        return data;
      })
    })
  
    return promise;
  }
```

### 5. 封装一个异步加载图片的方法

```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      console.log('图片加载完成');
      resolve(image);
    }
    image.onerror = () => {
      reject(new Error('加载失败' + url));
    }
    image.src = url;
  })
}
```

### 6. 限制异步操作并发数并尽可能快地完成

已知图片列表：

```js
var urls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];
```

已知函数：

```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function() {
    	reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  });
};

function limitLoad(urls, handler, limit) {
  // ...实现代码
}
```

求同时下载的链接熟练不超过 3 个的情况下，尽可能快地完成。

题解：

解一：

```js
function limitLoad(urls, handler, limit) {
  const limitUrls = urls.slice(0, limit);
  const leftUrls = urls.slice(limit);

  limitUrls.forEach((url, index) => {
    singleLoad(url, index);
  })

  function singleLoad(url, index) {
    handler(url).finally(() => {
      if (leftUrls.length) {
        const nextUrl = leftUrls.pop();
        singleLoad(nextUrl, index);
      }
    });
  }
}
```

解二：

```js
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then((fastestIndex) => {
          // 获取到已经完成的下标
          // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => {
      // 最后三个用.all来调用
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3)
  .then((res) => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### 7. 实现异步调度器

审题并完成下面代码：

```js
/**
 * 题目：JS 实现异步调度器
 * 要求：
 *  JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 *  完善下面代码中的 Scheduler 类，使程序能正确输出
 */

class Scheduler {
  add(promiseCreator) {
    // ...
  }
  // ...
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
const scheduler = new Scheduler();
const addTack = (time, order) => {
  return scheduler
    .add(() => timeout(time))
    .then(() => console.log(order));
};
addTack(1000, '1');
addTack(500, '2');
addTack(300, '3');
addTack(400, '4');

// 输出：2 3 1 4
// 一开始，1、2 两个任务进入队列
// 500ms 时，完成 2，输出 2，任务 3 进队
// 800ms 时，完成 3，输出 3，任务 4 进队
// 1000ms 时，完成 1，输出 1，没有下一个进队的
// 1200ms 时，完成 4，输出 4，没有下一个进队的
// 进队完成，输出 2 3 1 4
```

实现方式（`async/await`）：

```js
/**
 * 题目：JS 实现异步调度器
 * 要求：
 *  JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 *  完善下面代码中的 Scheduler 类，使程序能正确输出
 */

class Scheduler {
  constructor(maxNum) {
    this.taskList = [];
    this.count = 0;
    this.maxNum = maxNum; // 最大并发数
  }
  async add(promiseCreator) {
    // 如果当前并发超过最大并发，那就进入任务队列等待
    if (this.count >= this.maxNum) {
      await new Promise((resolve) => {
        this.taskList.push(resolve);
      })
    }

    // 次数 + 1（如果前面的没执行完，那就一直添加）
    this.count++;

    // 等待里面内容执行完毕
    const result = await promiseCreator();

    // 次数 - 1
    this.count--;

    // 将队首出队
    if (this.taskList.length) {
      this.taskList.shift()();
    }

    // 链式调用，将结果值返回出去
    return result;
  }
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const scheduler = new Scheduler(2);
const addTack = (time, order) => {
  return scheduler
    .add(() => timeout(time))
    .then(() => console.log(order));
};
addTack(1000, '1');
addTack(500, '2');
addTack(300, '3');
addTack(400, '4');

// 输出：2 3 1 4
```


## 应用
### 1. 数组去重方法

1. 利用for嵌套for，然后splice去重：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。NaN, {} 没有去重，null会消失。

2. indexOf()：NaN，{}没去重。

3. sort()：利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。NaN、{}没有去重。

4. includes()：利用includes检测数组是否有某个值，去重。{}没有去重。

5. 利用Set()去重：代码量少，但是无法去掉重复{}。

   ```javascript
   [...new Set(arr) ]
   Array.from(new Set(arr))
   ```

   利用for嵌套for，然后splice去重（ES5中最常用）：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。NaN, null, {} 的去重会出问题。

6. hasOwnProperty：利用hasOwnProperty 判断是否存在对象属性。完美去重。

7. filter()

8. 递归

9. Map()

[JavaScript数组去重（12种方法，史上最全） - 前端开发随笔 ...](https://segmentfault.com/a/1190000016418021)

[7种方法实现数组去重- 掘金](https://juejin.im/post/5aed6110518825671b026bed)

### 2. 对象的浅拷贝、深拷贝

#### 浅拷贝

1. Object.assign()
2. 展开运算符...
3. Array.prototype.concat()
4. Array.prototype.slice()

#### 深拷贝

1. 递归

   思想：对于简单类型，直接复制。对于引用类型，递归复制它的每一个属性。

2. `JSON.parse(JSON.stringify(obj))`

   原理就是先将对象转换为字符串，再通过JSON.parse重新建立一个对象。

   但是这种方法的局限也很多：

   - 不能复制undefined、function、正则、Symbol
   - 具有循环引用的对象时，报错
   - 相同的引用会被重复复制

3. 函数库lodash

参考笔记：JavaScript-对象-浅拷贝、深拷贝



### 3. 数字显示千分号

方案一：使用原生方法，支持带小数点的数字，缺点是有些浏览器不支持。

```js
function formatNumber(num) {
    return num.toLocaleString();
}
```

方案二：使用正则表达式。

```js
function formatNumber(num) {
    let parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // parts[0].replace(/(\d)(?=(?:\d{3})+$)/g,'$1,');
    return parts.join('.');
}
```

方案三：将数字转换成字符串数组处理。

```js
function formatNumber(num) {
    let parts = num.toString().split('.');
    let arr = parts[0].split('');
    for (let i = arr.length - 3; i > 0; i -= 3) {
        arr.splice(i, 0, ',');
    }
	parts[0] = arr.join('');
    return parts.join('.');
}
```

参考链接：[javascript 带千分号显示数字](https://blog.csdn.net/jobschen/article/details/47860239)

### 4. 防抖与节流函数

防抖和节流函数是常用的**高频触发优化方式**，对性能有较大的帮助。

**防抖函数**：将多次高频操作优化为只在最后一次执行。即wait时间内多次触发事件，只会在`last+wait`时执行回调。

- 常用场景：用户输入、用户点击

```js
function debounce(fn, wait, immediate) {
    let timer = null;
    
    return function() {
        const context = this;
        const args = arguments;
        
        if (immediate && !timer) {
            fn.apply(context, args);
        }
        
        if (timer) {
            clearTimeout(timer);
        }
        
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
}
```

**节流函数**：每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作。

- 常用场景：scroll、resize事件。

```js
function throttle(fn, wait, immediate) {
    let timer = null;
    let callNow = immediate;
    
    return function() {
        const context = this;
        const args = arguments;
        
        if (callNow) {
            fn.apply(context, args);
            callNow = false;
        }
        
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    };
}
```



## 算法

### 1. 用js实现二分查找一个有序数组

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



### 2. 验证一个字符串是否为回文

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



#### 进阶：删除一个字母的回文

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



### 3. 软件版本号比较

编程实现一个比较任意两个软件版本号大小的函数，如 1.2.3 和 1.2.4 比较，后者版本号更大

 

### 4. 实现once函数

实现一个函数once，接受一个参数，参数是一个函数，返回一个新函数，新函数执行过程和传入函数一致，但是只能被执行一次

 

### 5. ES6函数参数默认值

使用ES5实现ES6函数参数默认值功能，如function foo(a, b) {//xxx}，f(a)执行过程将使用b的默认值

 

### 6. 实现sqrt函数

 



## 参考链接

[前端笔试&面试爬坑系列---算法- 掘金](https://juejin.im/post/5b72f0caf265da282809f3b5)

[前端面试中的常见的算法问题](https://www.jackpu.com/qian-duan-mian-shi-zhong-de-chang-jian-de-suan-fa-wen-ti/)

[前端算法| 前端进阶积累](http://obkoro1.com/web_accumulate/algorithm/)

[前端算法题目解析（一） - 掘金](https://juejin.im/post/5df72b066fb9a0165835a456)
