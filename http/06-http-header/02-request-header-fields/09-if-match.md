# If-Match

> 2018-12-04 @wsl

if-Match、if-Modified-Since、if-None-Match、if-Range、if-Unmodified-Since

形如 If-xxx 这样的请求首部字段，都可以称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。

```
If-Match: "123456"
```

首部字段 If-Match ，属附带条件之一，它会告知服务器匹配资源所用的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。

服务器会对比 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态 412 Precondition Failed 的响应。

还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服务器将会忽略 ETag 的值，只要资源存在就处理请求。

