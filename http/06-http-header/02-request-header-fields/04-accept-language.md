# Accept-Language

> 2018-12-03 @wsl

Accept-Language用来告知服务器用户代理能够处理的自然语言集（指中文或者英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集。

```
Accept-Language: zh-cn,zh; q=0.7, en-us,en; q=0.3
```

采用权重 q 来进行表示相对优先级，与首部字段 Accept 相同，在上述例子中，客户端在服务器有中文版资源的情况下，会请求其返回中文版对象的响应，没有中文版时，则请求返回英文版响应。