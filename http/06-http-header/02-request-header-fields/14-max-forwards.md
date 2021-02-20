# Max-Forwards

> 2018-12-09 @wsl

```
Max-Forwards: 10
```

通过 TRACE 方法或 OPTIONS 方法，发送含有首部字段 Max-Forwards 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，会将 Max-Forwards 的值减一后重新赋值。当服务器接收到 Max-Forwards 值为 0 的请求时，则不再进行转发，而是直接返回响应。

使用 HTTP协议通信时，请求可能会经过代理等多台服务器。途中，如果代理服务器由于某些原因导致请求转发失败，客户端也就等不到服务器返回的响应了。对此，我们无从可知。

可以灵活使用首部字段 Max-Forwards， 针对以上问题产生的原因展开调查。 由于当 Max-Forwards 字段值为 0 时， 服务器就会立即返回响应， 由此我们至少可以对以那台服务器为终点的传输路径的通信状况有所把握。
