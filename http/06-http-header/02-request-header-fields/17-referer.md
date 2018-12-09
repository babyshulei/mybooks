# Referer

> 2018-12-09 @wsl

```
Referer: http://www.test.com/index.html
```

首部字段 Referer 会告知服务器请求的原始资源的 URI。 

客户端一般都会发送 Referer 首部字段给服务器。但当直接在游览器的地址输入 URI ，或处于安全考虑时，也可以不发送该首部字段。

因为原始资源的 URI 中的查询字符串可能包含 ID 或密码等保密信息，要是写进 Referer 转发给其他服务器，则有可能导致保密信息的泄露。

另外，Referer 的正确拼写应该是 Referrer ，但不知为何，大家一致沿用这个错误的拼写。

