# Expect

> 2018-12-04 @wsl

客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 417 Expectation Failed。

```
Expect: 100-continue
```

客户端可以利用该首部字段，写明所期望的扩展。虽然 HTTP/1.1 规范只定义了 100-continue（状态码 100 Continue 之意）。

等待状态码 100 响应的客户端在发出请求时，需要指定 Expect: 100-continue 。

