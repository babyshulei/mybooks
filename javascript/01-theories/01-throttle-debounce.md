# Debounce 和 Throttle 的原理及实现

> 2019.08.08 @wsl

Dom 上有些事件会频繁触发，如 mosemove, scroll, resize... 如果不进行性能优化，频繁触发事件回调，很可能会造成页面卡顿。为解决这类问题，常使用的方法就是 **throttle（节流）** 和 **debounce（防抖）**。 

## 1. Debounce

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

