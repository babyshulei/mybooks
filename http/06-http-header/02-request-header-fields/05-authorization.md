# Authorization

> 2018-12-03 @wsl

Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接受到返回的401状态码响应后，把首部字段 Authorization 加入请求中。共用缓存在接受到含有 Authorization 首部字段的请求时的操作处理会略有差异。

```
Authorization: Basic dWVub3N1bjpwYXHzd29yZA==
```

