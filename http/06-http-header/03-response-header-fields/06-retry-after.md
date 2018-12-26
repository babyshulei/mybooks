# Retry-After

> 2018-12-27 @wsl

```
Retry-After: 120
```

首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。主要配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用。

字段值可以指定为具体的日期时间（ Wed, 04 Jul 2012 06: 34: 24 GMT 等格式），也可以是创建响应后的秒数。

