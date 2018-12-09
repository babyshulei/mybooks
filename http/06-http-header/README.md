# 第六章 HTTP首部

> 2018-11-19 @wsl

## 1. HTTP首部字段

使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容。

HTTP首部字段是由首部字段名和字段值构成的，中间用冒号”:”分隔。

根据实际用途分为以下4种类型：

- 通用首部字段

- 请求首部字段

- 响应首部字段

- 实体首部字段

 

## 2. HTTP/1.1 规范定义了如下47种首部字段

### 通用首部字段

| 首部字段名        | 说明                       |
| ----------------- | -------------------------- |
| Cache-Control     | 控制缓存的行为             |
| Connection        | 逐跳首部，连接的管理       |
| Date              | 创建报文的日期时间         |
| Pragma            | 报文指令                   |
| Trailer           | 报文末端的首部一览         |
| Transfer-Encoding | 指定报文主体的传输编码方式 |
| Upgrade           | 升级为其他协议             |
| Via               | 代理服务器的相关信息       |
| Warning           | 错误通知                   |



### 请求首部字段

| 首部字段名          | 说明                                          |
| ------------------- | --------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型                      |
| Accept-Charset      | 优先的字符集                                  |
| Accept-Encoding     | 优先的内容编码                                |
| Accept-Language     | 优先的语言（自然语言）                        |
| Authorization       | Web认证信息                                   |
| Expect              | 期待服务器的指定行为                          |
| From                | 用户的电子邮箱地址                            |
| Host                | 请求资源所在服务器                            |
| if-Match            | 比较实体标记（ETag）                          |
| if-Modified-Since   | 比较资源的更新时间                            |
| if-None-Match       | 比较实体标记（与if-Match相反）                |
| if-Range            | 资源为更新时发送实体Byte的范围请求            |
| if-Unmodified-Since | 比较资源的更新时间（与if-Modified-Since相反） |
| Max-Forwards        | 最大传输逐跳数                                |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                |
| Range               | 实体字节范围请求                              |
| Referer             | 对请求中的URL的原始获取方法                   |
| TE                  | 传输编码的优先级                              |
| User-Agent          | HTTP客户端程序的信息                          |



### 响应首部字段

| 首部字段名         | 说明                         |
| ------------------ | ---------------------------- |
| Accept-Ranges      | 是否接受字节范围请求         |
| Age                | 推算资源创建经过时间         |
| ETag               | 资源的匹配信息               |
| Location           | 令客户端重定向至指定的URL    |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Rety-After         | 对再次发起请求的时机要求     |
| Server             | HTTP服务器的安装信息         |
| Vary               | 代理服务器缓存的管理信息     |
| WWW-Authenticate   | 服务器对客户端的认证信息     |



### 实体首部字段

| 首部字段名       | 说明                         |
| ---------------- | ---------------------------- |
| Allow            | 资源可支持的HTTP方法         |
| Content-Encoding | 实体主体适用的编码方式       |
| Content-Language | 实体主体的自然语言           |
| Content-Length   | 实体主体的大小（单位：字节） |
| Content-Location | 替代对资源的URI              |
| Content-MD5      | 实体主体的报文摘要           |
| Content-Range    | 实体主体的位置范围           |
| Content-Type     | 实体主体的媒体类型           |
| Expires          | 实体主体过期的日期时间       |
| Last-Modified    | 资源的最后修改日期时间       |

 

除了 RFC2616 中定义的47种首部字段，还有其他的首部字段会在HTTP协议通信交互中使用，如Cookie, Set-Cookie, Content-Disposition等，这些非正式首部字段统一归纳在 RFC4299 HTTP Header Field Registrations 中。



## 3. 首部类型

HTTP首部字段将定义成缓存代理和非缓存代理的行为，分为2种类型

- 端到端首部（End-to-end Header）

  分在此类别中的首部会转发给请求/响应对应的最终接受目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发

- 逐跳首部（Hop-by-hop Header）

  分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不在转发。HTTP/1.1 和之后版本中，如果要使用hop-by-hop 首部，需提供Connection首部字段。



逐跳首部一般为下面8个，其余的为端到端首部：Connection、Keep-Alive、Proxy-Authenticate、Proxy-Authorization、Trailer、TE、Transfer-Encoding、Upgrade