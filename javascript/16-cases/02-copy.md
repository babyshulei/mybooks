# js 复制内容到剪切板

参考第三方库： [Clipboard.js ](https://clipboardjs.com/)的实现

1. [isSupported()](https://github.com/zenorocha/clipboard.js/blob/master/src/clipboard.js#L87)
   判断浏览器是否支持：document.[queryCommandSupported](https://developer.mozilla.org/en-US/docs/Web/API/Document/queryCommandSupported)('copy' | 'cut')

2. [document.execCommand()](https://github.com/zenorocha/clipboard.js/blob/master/src/clipboard-action.js#L107)

   ```js
   // html
   // <input id="username" value="123456">
   		
   // 查询元素
   var username = document.getElementById('username');
   		
   // 选中元素
   username.select()  //select事件只在表单<input type="text">和<textarea>元素上触发
   		
   // 执行复制
   document.execCommand('copy')
   ```

3. 如果不是复制可编辑内容区的值，就[fake一个可编辑内容区](https://github.com/zenorocha/clipboard.js/blob/master/src/clipboard-action.js#L48)。

   ```
   a. create一个可编辑内容区（比如textarea）
   b. 设置绝对定位且位于left | right： -9999px处。
   	top为 window.pageYOffset || document.documentElement.scrollTop
   	总之就是设置在视图内不可见的位置
   c. 设置readonly
   d. 设置要复制的文本值 value
   e. appendChild
   f. 按照2的方法复制就可以 select 、 execCommand('copy')，复制成功
   ```

4. 销毁
   remove 事件监听和fake元素即可。

实现：

```js
function copyHandler(str) {
    const $input = document.createElement('input');
    document.body.appendChild($input);
    $input.setAttribute('value', str);
    $input.setAttribute('readonly', true);
    $input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    document.body.removeChild($input);
}
```



## 参考链接

[document.execCommand - Web API 接口参考| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)

[原生的js 复制接口 execCommand('copy')](https://blog.csdn.net/mappy93/article/details/52208511)

[clipboard.js - github](https://github.com/zenorocha/clipboard.js)

[Flash-Free Clipboard for the Web](https://hacks.mozilla.org/2015/09/flash-free-clipboard-for-the-web/)

[使用原生JS 复制文本兼容移动端iOS & android - 叙帝利- 博客园](https://www.cnblogs.com/nzbin/p/10412340.html)

