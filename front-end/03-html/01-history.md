 # H5的History

> 2019.11.11 @wsl

## 优化单页应用的跳转

利用h5的history，改善ajax列表请求体验。

可对 window.onpopstate 事件进行处理，改变页面前进后退逻辑。

用户前进时，调用方法window.history.pushState(state, title, url)，返回时就可以监听 popstate 事件，通过state进行相关逻辑处理。

如果页面刷新，调用 window.history.replaceState(state, title, url)，保证当前state正确。如何获取正确的state？方法一：从history.state取，Safari会有问题。方法二：存在localStorage中，用时取。方法三：放在url中，页面切换时改变url的参数，这种较推荐。



除了使用history，还有借助锚点hash的方法，优化页面跳转逻辑。锚点的兼容性好，但是原本功能是页面定位，用作页面跳转会影响该功能。而且history可以传复杂数据。

