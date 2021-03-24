# OSI 七层网络协议

- 应用层 Application
- 表示层 Presentation
- 会话层 Session
- 传输层 Transport
- 网络层 Network
- 数据链路层 Data-Link
- 物理层 Physicial

## 应用层

应用层（Application Layer）决定了向用户提供应用服务时通信的活动。例如：HTTP、HTTPS、FTP、DNS、TELNET、SSH、SMTP、POP3、HTML等。

## 表示层

表示层（Presentation Layer）把数据转换为能与接收者的系统格式兼容并适合传输的格式。

定义数据格式及加密。例如：加密，ASCII等。

## 会话层

会话层（Session Layer）负责在数据传输中设置和维护计算机网络中两台计算机之间的通信连接。

它定义了如何开始、控制和结束一个会话，包括对多个双向消息的控制和管理，以便在只完成连续消息的一部分时可以通知应用，从而使表示层看到的数据是连续的，在某些情况下，如果表示层收到了所有的数据，则用数据代表表示层。例如：RPC，SQL等。

## 传输层

传输层（Transport Layer）对上层提供处于网络连接中的两台计算机之间的数据传输。
传输层把传输表头（TH）加至数据以形成数据包。传输表头包含了所使用的协议等发送信息。例如：TCP，UDP，SPX。

## 网络层

网络层（Network Layer）用来处理在网络上流动的数据包。

网络层决定数据的路径选择和转寄，将网络表头（NH）加至数据包，以形成报文。网络表头包含了网络数据。例如：互联网协议（IP）等。

## 数据链路层

数据链路层（Data Link Layer）负责网络寻址、错误侦测和改错。当表头和表尾被加至数据包时，会形成[信息框](https://zh.wikipedia.org/wiki/資訊框)（Data Frame）。数据链表头（DLH）是包含了物理地址和错误侦测及改错的方法。数据链表尾（DLT）是一串指示数据包末端的字符串。例如：以太网、无线局域网（Wi-Fi）和通用分组无线服务（GPRS）等。

分为两个子层：逻辑链路控制（logical link control，LLC）子层和介质访问控制（Media access control，MAC）子层。

## 物理层

物理层（Physical Layer）在局部局域网上传送[数据帧](https://zh.wikipedia.org/wiki/数据帧)（Data Frame），它负责管理电脑通信设备和网络媒体之间的互通。包括了针脚、电压、线缆规范、集线器、中继器、网卡、主机接口卡等。

物理层常用多个规范完成对所有细节的定义。例如：[Rj45](https://baike.baidu.com/item/Rj45/3401007)，[802.3](https://baike.baidu.com/item/802.3/960717)等。

## 封装

​把数据信息包装起来的做法。发送端在层与层之间传输数据时，每经过一层会被打上该层所属的首部信息。反之，接收端在层与层之间传输数据时，每经过一层时会把对应的首部消去。

## IP、TCP和DNS

- **IP（Internet Protocol，网际协议）**

  位于网络层，把各种数据包传送给对方。需要获知 IP地址、MAC地址。

  使用ARP协议凭借MAC地址进行通信。ARP是一种解析地址的协议，根据通信方的IP地址就可以反查出对应的MAC地址。

  路由选择。


- **TCP（Transmission Control Protocol，传输控制协议）**

  位于传输层，提供可靠的字节流服务。

  TCP三次握手，使用flag：SYN（synchronize）、ACK（acknowledgement），确保传输的可靠性。

  发送端 SYN-->接收端    接收端SYN/ACK -->发送端    发送端ACK-->接收端


- **DNS（Doman Name System：域名系统）**

  位于应用层的协议，提供域名到IP之间的解析服务。

## URI 和 URL

- **URL（Uniform Resource Locator，统一资源定位符）**

  使用Web浏览器等访问Web页面时需要输入的网页地址。


- **URI（Uniform Resource Identifier，统一资源标识符）**

  由某个协议方案表示的资源的定位标识符。


- **绝对URI、绝对URL、相对URL**


## 参考链接

[OSI参考模型_百度百科](https://baike.baidu.com/item/OSI参考模型)
