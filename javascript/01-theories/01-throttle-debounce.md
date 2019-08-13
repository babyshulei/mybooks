# Debounce 和 Throttle 的原理及实现

> 2019.08.08 @wsl

Dom 上有些事件会频繁触发，如 mosemove, scroll, resize... 如果不进行性能优化，频繁触发事件回调，很可能会造成页面卡顿。为解决这类问题，常使用的方法就是 **throttle（节流）** 和 **debounce（防抖）**。 

## 1. debounce

在某段连续时间内，在事件触发后只执行一次。

```javascript
function debounce(func, wait) {
    var timer;

    return function() {
        var context = this,
            args = arguments;

        clearTimeout(timer);

        timer = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}
```

将 Debounce 化后的闭包函数作为频繁触发的事件的回调，其实还是频繁执行的，只不过，返回的闭包函数内部通过`clearTimeout()`，让真正需要执行的回调函数不执行了，只有在连续时间内，不在触发频繁事件后的`delay`秒后，执行真正的回调。

## 2. throttle

`throttle`就是设置**固定的函数执行速率**，从而降低频繁事件回调的执行次数。

```javascript
function throttle(func, wait) {
    var lastTime,
        timer;

    return function() {
        var now = Date.now(),
            context = this,
            args = arguments;

        if (lastTime && now < lastTime + wait) {
            clearTimeout(timer);

            timer = setTimeout(function() {
                lastTime = now;
                func.apply(context, args);
            }, wait);
        } else {
            lastTime = now;
            func.apply(context, args);
        }
    };
}
```

## 3. vue中使用

```vue
<template>
	<div class="hello"
		@scroll="throttleScroll"
		@click="debounceClick"
	/>
</template>

<script>
import { debounce, throttle } from '@/utils/function';

export default {
    name: "hello",
    methods: {
        throttleScroll: throttle(function () {
            console.log('scroll');
        }, 200),
        debouceClick: debounce(function () {
            console.log('click');
        }, 200),
    },
};
</script>
```

### 一些坑

**1、绑定不便：通过函数返回函数时，函数中 this 指向问题**

无法直接绑定到 component 的 methods 上，首先是无法使用对象方法的简写语法，即

```javascript
export default {
  methods:{
    methods1:throttle(()=>{
      // 没有 this 
  	})
  }
}
```

解决方案：把 function 定义的方法的 this 指向当前组件实例。

```javascript
export default {
  methods:{
    methods3:throttle(function(){
      // 可以正常使用 this
    })
  }
}
```

**2、实例共享：通过函数返回函数时，闭包私用变量被共享的问题**

```vue
<template>
  <div @click='click'  v-text='num'>
  </div>
</template>
<script>
  export default {
    name:'com'
    data(){
      return {
        num: 1
      }
  	},
    methods:{
      click:throttle(function(){
        // 可以正常使用 this
        this.num+=1
      },2000)
  	}
  }
</script>
// -----------
<template>
  <com></com>  
  <com></com>
</template>
<script>
  export default {
    name:'parent'
    component:{com}
  }
</script>
```

如上，com组件的点击事件2s触发一次，2s内同时点击两个com组件，只有第一个被点击的com组件执行了函数。这是因为，throttle 实际上只在**定义组件**的时候执行了一次，赋值给 click ，因此这个组件的所有实例共享同一个静态的 click 方法，共享了同一个 throttle 返回的闭包计时器。

目前来说，只要还是想要将方法都静态定义于 methods 中就没有什么解决方案。

解决方案：

在组件实例化的时候在各个生命周期中或者`data`函数中定义方法。

```javascript
export default {
  data(){
    const click = throttle(()=>this.num+ =1, 1000)
    return {
      click,
    }
  },
  mounted(){
    // 一个额外的好处是可以使用箭头函数 
   	this.click = throttle(()=>this.num+ =1, 1000) 
  }
}
```

不过，这样就失去了在 methods 定义函数的直观这一点，其次是在这两者中定义的时候，需要考虑到生命周期的问题，是否在定义的时候会使用到一些还未初始化的数据。



## 参考链接

[Lodash中文文档](<https://www.html.cn/doc/lodash/#_debouncefunc-wait0-options>)

[Javascript 的 Debounce 和 Throttle 的原理及实现](https://github.com/lishengzxc/bblog/issues/7#)

[vue-计算属性和侦听器](<https://cn.vuejs.org/v2/guide/computed.html>)

[vue 与 throttle 的坑](http://fszer.github.io/2018/01/21/vue与throltte的坑/)


