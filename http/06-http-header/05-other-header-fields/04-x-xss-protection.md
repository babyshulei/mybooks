# X-XSS-Protection

> 2019-01-04 @wsl

```
X-XSS-Protection: 1
```

首部字段 X-XSS-Protection 属于 HTTP 响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器 XSS 防护机制的开关。

首部字段 X-XSS-Protection 可指定的字段值如下。

- 0：将 XSS 过滤设置成无效状态
- 1：将 XSS 过滤设置成有效状态

