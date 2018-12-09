# Proxy-Authorization

> 2018-12-09 @wsl

```
Proxy-Authorization: Basic dGlwOjkpNLAGfFY5
```

接受到从代理服务器发来的认证质询时，客户端会发送包含首部字段 Proxy-Authorization 的请求，以告知服务器认证所需要的信息。

这个行为是与客户端和服务器之间的HTTP访问认证相类似的，不同之处在于，认证行为发生在客户端与代理之间。客户端与服务器之间的认证，使用首部字段 Authorization 可起到相同作用。

