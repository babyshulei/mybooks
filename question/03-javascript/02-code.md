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
### 数组去重方法

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


### 对象的浅拷贝、深拷贝

#### 浅拷贝

1. Object.assign()
2. 展开运算符...
3. Array.prototype.concat()
4. Array.prototype.slice()

#### 深拷贝

1. 递归

   思想：对于简单类型，直接复制。对于引用类型，递归复制它的每一个属性。

2. JSON.parse(JSON.stringify(obj));

   原理就是先将对象转换为字符串，再通过JSON.parse重新建立一个对象。

   但是这种方法的局限也很多：

   - 不能复制function、正则、Symbol
   - 循环引用报错
   - 相同的引用会被重复复制

3. 函数库lodash

参考笔记：JavaScript-对象-浅拷贝、深拷贝



### 数字显示千分号

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


