# If-Unmodified-Since

> 2018-12-09 @wsl

```
If-Unmodified-Since: Thu, 09 Dec 2018 00:00:00 GMT
```

首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。它的作用就是告知服务器，指定的请求资源只有在字段值内定的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 412 Precondition Failed 作为响应返回。

