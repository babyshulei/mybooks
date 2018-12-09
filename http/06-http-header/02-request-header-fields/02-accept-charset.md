# Accept-Charset

> 2018-12-02 @wsl

Accept-charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。

该首部字段应用于内容协商机制的服务器驱动协商。

```
Accept-Charset: iso-8859-5, unicode-1-1;q=0.5
```

