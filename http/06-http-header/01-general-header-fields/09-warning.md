# Warning

> 2018-11-29 @wsl

HTTP/1.1 的 Warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来的。该首部通常会告知用户一些与缓存相关的问题的警告。 

例子：

```
Warning: 113 gw.example.com:8080 "Heuriostic expiration" Tue, 03 Jul 2012 05:09:44 GMT
```

Warning 首部的格式如下，最后的日期部分可省略。

```
Warning: [警告码] [警告的主机 : 端口号] "[警告内容]" ([日期时间])
```

- HTTP 警告码

| 警告码 | 警告内容                                         | 说明                                                         |
| ------ | ------------------------------------------------ | ------------------------------------------------------------ |
| 110    | Response is stale （响应已过期）                 | 代理返回已过期的资源                                         |
| 111    | Revalidation failed （再验证失败）               | 代理再验证资源有效性时失败（服务器无法到达等原因）           |
| 112    | Disconnection operation （断开连接操作）         | 代理与互联网连接被故意切断                                   |
| 113    | Heuristic expiration （试探性过期）              | 响应的使用期超过24小时（有效缓存的设定时间大于24小时的情况下） |
| 199    | Miscellaneous warning （杂项警告）               | 任意警告内容                                                 |
| 214    | Transformation applied（使用了转换）             | 代理对内容编码或媒体类型等执行了某些处理时                   |
| 299    | Miscellaneous persistent warning（持久杂项警告） | 任意的警告内容                                               |

