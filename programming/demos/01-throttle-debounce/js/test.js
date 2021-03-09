function init() {
    console.log('init');

    window.addEventListener('scroll', debounce(function(){
        console.log('debounce scroll', Date.now());
    }, 300));

    window.addEventListener('scroll', throttle(function(){
        console.log('throttle scroll', Date.now());
    }, 300));
}

// 防抖
function debounce(fn, wait) {
    var timer;

    return function() {
        var context = this,
            args = arguments;

        clearTimeout(timer);

        timer = setTimeout(function() {
            fn.apply(context, args);
        }, wait);
    };
}

// 节流
function throttle(fn, wait) {
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
                fn.apply(context, args);
            }, wait);
        } else {
            lastTime = now;
            fn.apply(context, args);
        }
    };
}

init();
