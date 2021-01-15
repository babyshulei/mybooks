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
