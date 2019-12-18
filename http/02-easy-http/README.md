# 第二章 简单的HTTP协议

> 2018-10-19 @wsl

## 1. HTTP协议用于客户端和服务端之间的通信

客户端发出请求，服务端响应该请求并返回。

请求报文是由请求方法、请求URI、协议版本、可选的请求首部字段和内容实体构成的。

响应报文基本上由协议版本、状态码、用以解释状态码的原因短语、可选的响应首部字段以及实体主体构成。

 

## 2. HTTP是不保存状态的协议

HTTP/1.1虽然是无状态协议，但为了实现保持状态的功能，引入了Cookie技术。

 

## 3. 请求URI定位资源

 

## 4. HTTP请求方法

HTTP/0.9，HTTP最早大规模使用的版本，现已过时。在这个版本中 只有`GET`一种请求方法，在HTTP通讯也没有指定版本号，也不支持请求头信息。

HTTP/1.0，一个在HTTP通讯中指定版本号的协议版本。支持：`GET`、`POST`、`HEAD`三种HTTP请求方法。

HTTP/1.1，目前使用最广泛的版本。该版本默认采用持久连接，并能很好地配合代理服务器工作。还支持以管道方式同时发送多个请求，以便降低线路负载，提高传输速度。HTTP/1.1新增了：`OPTIONS`、`PUT`、`DELETE`、`TRACE`、`CONNECT`五种HTTP请求方法。

在HTTP/1.1标准制定之后，又陆续扩展了一些方法。其中使用中较多的是 `PATCH` 方法，它在2010年的[RFC 5789](http://tools.ietf.org/html/rfc5789)标准中被定义。`PATCH`请求与`PUT`请求类似，同样用于资源的更新。二者有以下两点不同：

- 但`PATCH`一般用于资源的部分更新，而`PUT`一般用于资源的整体更新。
- 当资源不存在时，`PATCH`会创建一个新的资源，而`PUT`只会对已在资源进行更新。

| 方法    | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| GET     | 请求指定的资源。使用GET的请求应该只被用于获取数据。          |
| HEAD    | 获取报文首部。和GET方法一样，只是不返回报文主体部分。        |
| POST    | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| PUT     | 传输文件，向指定资源位置上传其最新内容。                     |
| DELETE  | 删除文件，用于请求服务器删除所请求URI 所标识的资源，与PUT相反的方法。 |
| CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。通常用于SSL加密服务器的链接与非加密的HTTP代理服务器的通信。 |
| OPTIONS | 询问支持的方法，用于客户端查看服务器的性能。                 |
| TRACE   | 追踪路径，回显服务器之前收到的请求，主要用于测试或诊断。     |
| PATCH   | 用来对资源进行局部更新，是对 PUT 方法的补充。                |

 

## 5. 持久连接（HTTP Persistent Connections）

也称为 HTTP keep-alive 或 HTTP connection reuse

**特点**：只要任意一端没有明确提出断开连接，则保持TCP连接状态。

在HTTP/1.1中，所有的连接默认都是持久连接，但在HTTP/1.0内并未标准化。

持久连接使得多数请求以**管线化**方式发送成为可能。

 

## 6. Cookie

HTTP是无状态协议，不对之前发生过的请求和响应的状态进行管理。解决此类问题，引入Cookie技术。

Cookie技术通过在请求和响应报文中写入Cookie信息来控制客户端状态。

服务端发送响应报文（首部字段Set-Cookie） --> 客户端保存Cookie

客户端后续发送请求（存有Cookie信息状态） --> 服务端校验Cookie并响应



## 参考链接

[HTTP请求方法](https://itbilu.com/other/relate/EkwKysXIl.html)

[MDN|HTTP请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)

[RFC 7231, section 4: Request methods](https://tools.ietf.org/html/rfc7231#section-4)

[RFC 5789, section 2: Patch method](https://tools.ietf.org/html/rfc5789#section-2)