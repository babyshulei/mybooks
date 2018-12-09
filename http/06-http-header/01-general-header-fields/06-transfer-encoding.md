# Transfer-Encoding

> 2018-11-29 @wsl

首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。 

HTTP/1.1 的传输编码方式仅对分块传输编码有效。 

例子：

```http
HTTP/1.1 200 OK
Date: Thu, 29 Nov 2018 09:22:47 GMT
Cache-Control: public, max-age=604800
Content-Type: text/javascript; charset=utf-8
Expiress: Thu, 30 Nov 2018 09:22:47 GMT
X-Frame-Option: DENY
X-XSS-Protection: 1; mode=block
Content-Encoding: gzip
Transfer-Encoding: chunked
Connection: keep-alive

cf0  ←16进制（10进制为3312）

· · · 3312字节分块数据 · · ·

392  ←16进制（10进制为914）

· · · 914字节分块数据 · · ·

0
```

以上用例中， 正如在首部字段 Transfer-Encoding 中指定的那样， 有效使用分块传输编码， 且分别被分成 3312 字节和 914 字节大小的分块数据。 

