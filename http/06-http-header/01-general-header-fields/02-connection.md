# Connection

> 2018-11-27 @wsl

Connection 作用：

- 控制不再转发给代理的首部字段
- 管理持久连接



## 1. 控制不再转发给代理的首部字段

```
Connection: 不再转发的首部字段名
```

在客户端发送请求和服务器响应内，使用 Connection 首部字段，可控制不再转发给代理的首部字段（即 Hop-by-hop首部）。



## 2. 管理持久连接

- close：断开连接

```
Connection: close
```

HTTP/1.1 版本的默认连接都是持久连接。为此，客户端会在持久连接上连续发送请求。当服务器端想明确断开连接时，则指定Connection 首部字段的值为 Close。

- Keep-Alive：保持连接

```
Connection: Keep-Alive
```

HTTP/1.1 之前的 HTTP 版本的默认连接都是非持久连接。为此，如果想在旧版本的 HTTP 协议上维持持续连接，则需要指定Connection 首部字段的值为 Keep-Alive。

