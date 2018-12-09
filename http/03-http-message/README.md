# 第三章 HTTP报文内的HTTP

> 2018-10-22 @wsl

## 1. HTTP报文

请求端（客户端）的HTTP报文叫做请求报文。响应端（服务端）的HTTP报文叫做响应报文。

HTTP报文本身是由多行（用CR+LF作换行符）数据构成的字符串文本。

> CR+LF：Carriage Return 回车符；Line Feed 换行符。

HTTP报文可大致分为报文首部和报文主体两块。两者由最初出现的空行（CR+LF）来划分。

 

## 2. 请求报文和响应报文

- 请求报文首部：

  请求行、请求首部字段、通用首部字段、实体首部字段

- 响应报文首部：

  状态行、响应首部字段、通用首部字段、实体首部字段

 

- 请求行：

  包含用于请求的方法，请求URI和HTTP版本。例：GET /index.html HTTP/1.1

- 状态行：

  包含表明响应结果的状态码，原因短语和HTTP版本。例：HTTP/1.1 200 OK

- 首部字段：

  包含请求和响应的各种条件和属性的各类首部。

  一般有4种首部：通用首部、请求首部、响应首部、实体首部。

- 其他：

  可能包含HTTP的RFC里未定义的首部（Cookie等）。

 

## 3. 报文主体和实体主体的差异

- 报文（message）：

  HTTP通信中的基本单位，由8位组字节流组成，通过HTTP通信传输。

- 实体（entity）：

  作为请求或响应的有效载荷数据被传输，其内容由实体首部和实体主体组成。

HTTP报文的主体用于传输请求或响应的实体主体。

 

## 4. 传输时编码

- 内容编码：

  内容编码指明应用在实体内容上的编码格式，并保持实体信息原样压缩。内容编码后的实体由客户端接收并负责解码。

  常见的内容编码：gzip, compress, deflate, identity（不进行编码）

- 分块传输编码：

  分块传输编码会将实体主体分成多个部分（块）。每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用“0(CR+LF)”来标记。

 

## 5. 多部分对象集合（Multipart）

HTTP协议中采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。

多部分对象集合包含的对象有：

- multipart/form-data

  在Web表单文件上传时使用。

- multipart/byteranges

  状态码206（Partial Content）响应报文包含了多个范围的内容时使用。

 

在HTTP报文中使用多部分对象集合时，需要在首部字段加上Content-Type。

使用boundary字符串来划分多部分对象集合指明的各类实体。在boundary字符串指定的各个实体的起始行之前插入“--”标记（如--BOUNDARY_S），在多部分对象集合对应的字符串的最后插入“--”标记（如--BOUNDARY_S--）作为结束。

多部分对象集合的每个部分类型中，都可以含有首部字段。

例子：

```
Content-Type: multipart/form-data; boundary=abcd000

--abcd000
Content-Disposition: form-data; name="hello"

some data
--abcd000
Content-Disposition: form-data; name="pics"; filename="file1.txt"
Content-Type: text/plain

file1.txt data
--abcd000--
```

 

## 6. 范围请求（Range Request）

指定范围发送的请求叫做范围请求。通过首部字段 Range 来指定资源的 byte 范围。

例子： 

```
 // 5001-10000字节
Range: bytes=5001-10000
// 5001后的全部
Range: bytes=5001-
// 多重范围
Range: bytes=0-3000, 5000-7000
```

针对范围请求，响应会返回状态码为206 Partial Content 的响应报文。对于多重范围的范围请求，响应会在首部字段 Content-Type 表明 multipart/byteranges 后返回相应报文。

如果服务端无法响应范围请求，会返回状态码为200 OK 和完整的实体内容。

 

## 7. 内容协商（Content Negotiation）

内容协商机制是指客户端和服务端就响应的资源内容进行交涉，然后提供给客户端最为合适的资源。内容协商会以语言、字符集、编码方式等为基准判断响应的资源。

判断的基准，请求报文中的某些首部字段：

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Content-Language

内容协商技术：

- 服务器驱动协商

- 客户端驱动协商

- 透明协商

