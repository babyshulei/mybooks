# 网络相关

### Ajax

#### 1. Ajax 请求 同步？异步？

AJAX中根据async的值不同分为同步（async = false）和异步（async = true）两种执行方式；在W3C的教程中推荐使用异步执行。

默认情况下async是true，也就是异步。

同步请求：

发出请求后，需要等待请求完成后才能进行执行下一步操作。也就是说，页面会处于一个假死状态。

异步请求：

发出请求后，其他代码继续执行，Ajax请求不影响页面的加载和用户的操作。不影响用户体验。

#### 2. ajax请求过程，简单实现一个Ajax请求

1. 创建XMLHttpRequest对象后，并设置**onreadystatechange的回调函数**。在回调函数中，通常我们只需通过readyState === 4判断请求是否完成，如果已完成，再根据status === 200判断是否是一个成功的响应。

2. 初始化请求。xhr.open(method, url, async)

   > 注意，千万不要把第三个参数指定为false，否则浏览器将停止响应，直到AJAX请求完成。如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。

3. 发送请求。xhr.send()。GET请求不需要参数，POST请求需要把body部分以字符串或者FormData对象传进去。

```javascript
function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = 'Error code: ' + code;
}

var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();
```

#### 3. 是否可以跨域，浏览器跨域问题的解决方案？

默认情况下，浏览器遵循**同源策略**，JavaScript在发送AJAX请求时，URL的域名必须和当前页面完全一致。

> 完全一致的意思是，域名要相同（www.example.com和example.com不同），协议要相同（http和https不同），端口号要相同（默认是:80端口，它和:8080就不同）。有的浏览器宽松一点，允许端口不同，大多数浏览器都会严格遵守这个限制。

跨域的方式：

1. 通过Flash插件发送HTTP请求

2. 配置代理服务器，如Nginx

3. JSONP跨域

   只能用GET请求，并且要求返回JavaScript。JSONP通常以函数调用的形式返回。

4. CORS

   如果浏览器支持HTML5，那么就可以一劳永逸地使用新的跨域策略：CORS了。

   CORS全称Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。

   Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。

   对于PUT、DELETE以及其他类型如application/json的POST请求，在发送AJAX请求之前，浏览器会先发送一个OPTIONS请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受；服务器必须响应并明确指出允许的Method；浏览器确认服务器响应的Access-Control-Allow-Methods头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。









## 参考链接

<https://segmentfault.com/a/1190000015580896>