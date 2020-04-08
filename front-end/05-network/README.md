# Network

## OSI 七层网络协议

- 应用层 Application
- 表示层 Presentation
- 会话层 Session
- 传输层 Transport
- 网络层 Network
- 数据链路层 Data-Link
- 物理层 Physicial

### 应用层

应用层（Application Layer）提供为应用软件而设的接口，以设置与另一应用软件之间的通信。例如：HTTP、HTTPS、FTP、TELNET、SSH、SMTP、POP3、HTML等。

### 表示层

表示层（Presentation Layer）把数据转换为能与接收者的系统格式兼容并适合传输的格式。

定义数据格式及加密。例如：加密，ASCII等。

### 会话层

会话层（Session Layer）负责在数据传输中设置和维护计算机网络中两台计算机之间的通信连接。

它定义了如何开始、控制和结束一个会话，包括对多个双向消息的控制和管理，以便在只完成连续消息的一部分时可以通知应用，从而使表示层看到的数据是连续的，在某些情况下，如果表示层收到了所有的数据，则用数据代表表示层。例如：RPC，SQL等。

### 传输层

传输层（Transport Layer）把传输表头（TH）加至数据以形成数据包。传输表头包含了所使用的协议等发送信息。例如：TCP，UDP，SPX。

### 网络层

网络层（Network Layer）决定数据的路径选择和转寄，将网络表头（NH）加至数据包，以形成报文。网络表头包含了网络数据。例如：互联网协议（IP）等。

### 数据链路层

数据链路层（Data Link Layer）负责网络寻址、错误侦测和改错。当表头和表尾被加至数据包时，会形成[信息框](https://zh.wikipedia.org/wiki/資訊框)（Data Frame）。数据链表头（DLH）是包含了物理地址和错误侦测及改错的方法。数据链表尾（DLT）是一串指示数据包末端的字符串。例如：以太网、无线局域网（Wi-Fi）和通用分组无线服务（GPRS）等。

分为两个子层：逻辑链路控制（logical link control，LLC）子层和介质访问控制（Media access control，MAC）子层。

### 物理层

物理层（Physical Layer）在局部局域网上传送[数据帧](https://zh.wikipedia.org/wiki/数据帧)（Data Frame），它负责管理电脑通信设备和网络媒体之间的互通。包括了针脚、电压、线缆规范、集线器、中继器、网卡、主机接口卡等。

物理层常用多个规范完成对所有细节的定义。例如：[Rj45](https://baike.baidu.com/item/Rj45/3401007)，[802.3](https://baike.baidu.com/item/802.3/960717)等。



## 抓包工具

### Fiddler

**Fiddler**是在windows上运行的程序，专门用来捕获HTTP，HTTPS的。

### Wireshark

**Wireshark**能获取HTTP，也能获取HTTPS，但是不能解密HTTPS。Wireshark 比fiddler更强大，消息量更多。

优点：

1、强大的协议解析能力，一到七层全解码，一览无遗，对于协议细节的研究特别有帮助。

2、对于https加密流量，只要将浏览器的session key 自动导入wireshark，Wireshark可以自动解密https流量。

缺点：

尽管可以自定义过滤列表，但为了抓取一个特定TCP Flow /Session 流量需要写一个长长的过滤列表，这对于初学者很不友好。



### Charles



## 参考链接

[抓包工具：fiddler和wireshark对比](https://zhuanlan.zhihu.com/p/44912855)

[OSI参考模型_百度百科](https://baike.baidu.com/item/OSI参考模型)
