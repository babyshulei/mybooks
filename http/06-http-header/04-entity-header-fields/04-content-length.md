# Content-Length

> 2018-12-28 @wsl

```
Content-Length: 15000
```

首部字段 Content-Length 表明了实体主体部分的大小（ 单位是字节）。对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。由于实体主体大小的计算方法略微复杂，在此不再展开。可参考 RFC2616 的 4.4。

