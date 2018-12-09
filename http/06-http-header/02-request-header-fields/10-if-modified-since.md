# If-Modified-Since

> 2018-12-07 @wsl

如果 If-Modified-Since 字段指定的日期时间后，资源发生了更新，服务器会接受请求。

```
If-Modified-Since: Thu, 15 Apr 2011 00:00:00 GMT
```

首部字段 If-Modified-Since ，属附带条件之一，它会告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified。

If-Modified-Since 用于确认代理或客户端拥有本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确定。

