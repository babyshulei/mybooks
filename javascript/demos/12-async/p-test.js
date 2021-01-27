/**
 * 使用 Promise 实现每隔一秒输出1/2/3
 */
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

// console.log(oneToThree());
// console.log(oneToThree2());

/**
 * 使用 Promise 实现红绿灯交替重复亮
 * 红灯 3 秒亮一次，黄灯 2 秒亮一次，绿灯 1 秒亮一次，用 Promise 实现 3 个灯交替重复亮。
 */
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

// light();

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

// light2();

/**
 * 实现 mergePromise 函数，将传进去的数组按先后顺序执行，并且把返回的值先后放在数组 data 中。
 */
function mergePromise1() {
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

  async function mergePromise(arr) {
    let ret = [];

    for(let i = 0; i < arr.length; i++) {
      const val = await arr[i]();
      ret.push(val);
    }

    return ret;
  }

  mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
  });
}

function mergePromise2() {
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

  mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
  });
}

// mergePromise1();

// 下载图片
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('图片加载完成');
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`加载失败：${url}`));
    };
    img.src = url;
  });
}

// 限制异步操作并发数并尽可能快地完成
const urls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];

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

// limitLoad(urls, loadImg, 4);

/**
 * 题目：JS 实现异步调度器
 * 要求：
 *  JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 *  完善下面代码中的 Scheduler 类，使程序能正确输出
 */
class Scheduler {
  constructor(maxNum = 2) {
    this.taskList = [];
    this.count = 0;
    this.maxNum = maxNum; // 最大并发数
  }
  async add(promiseCreator) {
    if (this.count >= this.maxNum) {
      // 超过并发数，进入等待队列
      await new Promise((resolve) => {
        this.taskList.push(resolve);
      });
    }
    this.count++;
    const result = await promiseCreator();
    this.count--;
    // 等待队列队首出队
    if (this.taskList.length) {
      this.taskList.shift()();
    }
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


