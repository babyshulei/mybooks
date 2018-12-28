# Accept-Encoding

> 2018-12-03 @wsl

Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。

```
Accept-Encoding: gzip, deflate
```



下面列举一些内容编码：

- gzip

  由文件压缩程序 gzip（GUN zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法（LZ77）及32位循环冗余校验（Cyclic Redundancy Check，通称 CRC）。

- compress

  由 UNIX 文件压缩程序 compress 生成的编码格式，采用 Lempel-Ziv-Welch 算法（LZW）。

- deflate

  组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。

- identity

  不执行压缩或不会变化的默认编码格式。

采用权重 q 来进行表示相对优先级，与首部字段 Accept 相同，另外，也可以使用星号（*）作为通配符，指定任意的编码格式。