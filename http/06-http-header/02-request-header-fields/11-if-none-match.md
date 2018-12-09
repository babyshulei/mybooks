# If-None-Match

> 2018-12-07 @wsl

只有在 If-None-Match 的字段值与 ETag 值不一致时，可处理该请求。与  If-Match 首部字段的作用相反。

```
If-None-Match: *
```

首部字段 If-None-Match 属于附带条件之一。它和首部字段 If-Match 作用相反。用于指定 If-None-Match 字段值的实体标记（ETag）值与请求资源的 ETag 不一致时，它就会告知服务器处理该请求。

在 GET 和 HEAD 方法中使用首部字段 If-None-Match 可获取最新的资源。因此，这与使用首部字段 If-Modified-Since 时有些类似。

