# Object 的变化侦测

> 2019.07.17 @wsl

## 1. 变化侦测

变化侦测：状态变化时，需要重新渲染。变化侦测就是为了解决这个问题，有两种类型：push, pull。

Angular 和 React 采用 pull，Vue.js 采用 push。pushpush 的优点是可以进行更细粒度的更新。从Vue.js 2.0开始，引入了虚拟DOM，将粒度调整为中等粒度，即组件。

侦测一个对象的变化有两种方法：Object.defineProperty 和 Proxy。

因为Proxy的支持问题，目前vue是采用第一种方法。

## 2. 变化侦测的过程

### 2.1 追踪变化

下面是将Object.defineProperty封装成一个函数，定义一个响应式数据，传入data, key, val，读取数据时，get 函数被触发；设置数据时，set 函数被触发。

```javascript
function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
        }
    });
}
```

### 2.2 收集依赖

这只是简单的对象变化侦测，侦测到对象变化时，要将变化更新到依赖的组件中。那么，首先要收集依赖，才能在变化时通知依赖。

**getter中，收集依赖，setter中，触发依赖**。

把依赖收集的代码，封装成一个Dep类，专门管理依赖。使用这个类，我们可以收集依赖、删除依赖或者向依赖发送通知等。这样，依赖就收集到了Dep中。

```javascript
export default class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        remove(this.subs, sub);
    }

    depend() {
        if (window.target) {
            this.addSub(window.target);
        }
    }

    notify() {
        const subs = this.subs.slice();

        for (let i = 0; l = subs.length; i++) {
            subs[i].update();
        }
    }
};

function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);

        if (index > -1) {
            arr.splice(index, 1);
        }
    }
}
```

改造defineReactive。

```javascript
function defineReactive(data, key, val) {
    let dep = new Dep(); // 新增

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.depend(); // 新增
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            dep.notify(); // 新增
        }
    });
}
```

### 2.3 依赖什么，Watcher

在上面代码中，我们收集依赖是window.target，那它到底是什么呢？

依赖应该是属性发生变化后，所要通知的地方，是用到这个数据的地方。用这个数据的地方可能有很多，类型也不一样，有模板，有watch，所以这个时候需要抽象出一个能集中处理这些不同情况的类，然后在依赖收集的阶段只收集这个封装好的类的实例进来，通知也只通知它一个，它再负责通知其他地方。抽象的这个类，叫做 Watcher。

可以看到，Watcher 是一个中介的角色，数据发生变化通知给它，然后它再通知给其他地方。





