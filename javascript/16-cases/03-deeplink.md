# deeplink调起

什么是Deeplink？简而言之，就是你在手机上面点击一个链接，可以跳转到另一个app内部的某一个页面，不是app正常打开时显示的首页内容。

deeplink里面核心的技术就是：URL SCHEMES，IOS和Android都是如此。

## H5 调起 APP

`android`、`ios` 调起的方式：Schame+Android Itent；Schema＋Universal links（IOS9+）。

协议格式：

```
[scheme]://[host]/[path]?[query]
```

调起方式：

- 使用 a 标签
- 使用 iframe
- 使用 window.location.href

### 使用 a 标签

代码实现：

```js
function openDeeplink(schema) {
    const $a = document.createElement('a');
    
    $a.href = schema;
    $a.style.opacity = 0;
    document.body.appendChild($a);
    $a.click();
    
    return $a;
}

/* callback为调起失败的回调 */
function tryOpenDeeplink(schema, callback) {
    const $a = openDeeplink(schema);
    const openTime = Date.now();
    setTimeout(() => {
        document.body.removeChild($a);
        // 如果setTimeout 回调超过3000ms，代表成功调起
        if (Date.now() - openTime < 3000) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, 2500);
}
```

### 使用 iframe

代码实现：

```js
function openDeeplink(schema) {
    const $ifr = document.createElement('iframe');
    
    $ifr.src = schema;
    $ifr.style.display = 'none';
    document.body.appendChild($ifr);
    
    return $ifr;
}

/* callback为调起失败的回调 */
function tryOpenDeeplink(schema, callback) {
    const $ifr = openDeeplink(schema);
    const openTime = Date.now();
    setTimeout(() => {
        document.body.removeChild($ifr);
        // 如果setTimeout 回调超过3000ms，代表成功调起
        if (Date.now() - openTime < 3000) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, 2500);
}
```

### 使用 window.location.href

代码实现：

```js
function openDeeplink(schema) {
    window.location.href = schema;
}
```

注意：由于无法确定是否安装了客户端，因此通过window.location = schema的方式可能导致浏览器跳转到错误页；所以通过iframe.src或a.href载入schema是目前比较常见的方法。



## 参考链接

[deeplink 是怎么回事？](https://baijiahao.baidu.com/s?id=1606316830601842198&wfr=spider&for=pc)

[页面调起APP | 掘金](https://juejin.im/entry/6844903715732717576)

[怎么在网页中打开你的app](https://segmentfault.com/a/1190000005967865)

[web-launch-app | github](https://github.com/jawidx/web-launch-app)

