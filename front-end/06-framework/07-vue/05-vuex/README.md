# Vuex

## 开始

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。

store和全局对象的区别：

- Vuex的状态存储是响应式的
- 不能直接改变store中的状态，需要显式地提交mutation。

### 创建store

类似vue-router，可以创建个store.js 或 store/index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';

const mutations = {
    // 对state的修改，同步函数
    setParam(state, payload) {
        state.param = payload.param;
    },
    // ...
};

const actions = {
 	// 一些操作，提交mutation，可以包含异步函数
    someAction({ state }, options) {},
    // ...
};

const state = {
  	// state中的变量，初始化
    param1: '',
    param2: 0,
    // ...
};

Vue.use(Vuex);

export default new Vuex.Store({
 	state,
  	mutations,
    actions,
});
```

获取状态对象：

```js
// 通过store实例获取
store.state.param
this.$store.state.param // 组件内部

// 通过 mapState 方法
import { mapState } from 'vuex';

computed: {
    ...mapState({
        param1: state => state.param1,
        param1: state => state.param1,
        // ...
    }),
},
```

触发状态变更：

```js
store.commit
this.$store.commit('setParam', {param: 'haha'})
```

### State

Vuex使用单一状态树，每个应用只包含一个store实例。

Vuex 的状态存储是响应式的，结合vue的computed属性，实现状态的响应式更新。

### Getter

store中可以定义getter，和计算属性类似，getter的返回值会根据它的依赖缓存起来，只有当它的依赖值发生改变才会被重新计算。

参数：

- state：用于取依赖的属性
- getters：也可能依赖其他的getter

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
```

属性访问：

```js
store.getters.doneTodos

// 通过 mapGetters 获取
import { mapGetters } from 'vuex'

computed: {
  	// 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      	'doneTodosCount',
      	'anotherGetter',
      	// ...
    ])
}
```

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。比较类似于事件的概念。每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。

这个回调函数就是我们实际进行状态更改的地方

参数：

- state：state对象
- payload：提交载荷，用于传入额外参数

```js
const mutations = {
    // 对state的修改
    setParam(state, payload) {
        state.param = payload.param;
    },
    // ...
};
```

调用：

```js
this.$store.commit('setParam', {param: 'haha'});
```

注意：

- 最好提前在 store 中初始化好所有所需属性。
- 当需要在对象上添加新属性时，应该使用 `Vue.set(obj, 'newProp', 123)`, 或者以新对象替换老对象
- Mutation 必须是同步函数，保证状态可追踪

### Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

参数：

- context：与 store 实例具有相同方法和属性的 context 对象，可以用参数解构来简化代码，例如 { state, commit }

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

触发：

Action 通过 `store.dispatch` 方法触发：

```js
// 载荷形式分发
store.dispatch('increment', { amount: 10 })

// 以对象形式分发
store.dispatch({
    type: 'increment',
    amount: 10
})

// 组件内部
import { mapActions } from 'vuex'

methods: {
    ...mapActions([
      'increment',
      'incrementBy',
    ]),
}

this.$store.dispatch('increment')
```

### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

## 项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 **action** 里面。

一个示例：

```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```



## Vuex原理解析

### 框架核心流程

![1591689118193](.\images\vuex-core.png)

vuex中的store本质就是没有template的隐藏着的vue组件。



## 参考链接

<https://vuex.vuejs.org/zh/>

[Vuex框架原理与源码分析- 美团技术团队](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)

[深入vuex原理(上) - 掘金](https://juejin.im/post/5c779b7df265da2da771e052)

[vuex工作原理详解- 前端- 掘金](https://juejin.im/entry/5b7a21bf51882542eb2dd685)
