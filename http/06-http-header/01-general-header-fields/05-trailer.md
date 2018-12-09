# Trailer

> 2018-11-28 @wsl

Trailer 会事先说明在报文主体后记录哪些首部字段。该首部字段可以使用在 HTTP/1.1 版本分块传输编码时。

```http
HTTP/1.1 200 OK
Date: Tue, 03 Jul 2012 04:40:56 GMT
Content-Type: text/html
· · ·
Transfer-Encoding: chunked
Trailer: Expiress
· · ·

· · · （报文主体） · · ·

0
Expires: Tue, 28 Sep 2004 23:59:59 GMT
```

以上用例中，指定首部字段 Trailer 的值为 Expires ，在报文主体之后（分块长度0之后）出现了首部字段 Expires。

