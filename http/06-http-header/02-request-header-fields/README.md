# HTTP请求首部字段

## 请求首部字段

请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。

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

