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
  };
}

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
