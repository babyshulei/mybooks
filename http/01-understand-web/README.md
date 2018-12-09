# 第一章 了解Web及网络基础

> 2018-10-16 @wsl

## 1. HTTP

​	HyperText Transfer Protocol 超文本传输协议。

 

## 2. HTTP历史

- HTTP/0.9

  HTTP 于1990年问世。

- HTTP/1.0

  HTTP正式作为标准被公布是在1996年的5月

- HTTP/1.1

  1997年1月公布的HTTP/1.1是目前主流的HTTP协议版本

 

## 3. TCP/IP协议族

​	通常使用的网络是在TCP/IP协议族的基础上运作的。而HTTP属于它内部的一个子集。

**概念**

​	TCP/IP是互联网相关的各类协议族的总称。

**分层**

​	应用层、传输层、网络层、数据链路层

- 应用层

  决定了向用户提供应用服务时通信的活动。有FTP、DNS、HTTP等。

- 传输层

  对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。有TCP和UDP。

- 网络层

  用来处理在网络上流动的数据包。

- 链路层

  用来处理网络连接的硬件部分。

**封装**

​	把数据信息包装起来的做法。发送端在层与层之间传输数据时，每经过一层会被打上该层所属的首部信息。反之，接收端在层与层之间传输数据时，每经过一层时会把对应的首部消去。

 

## 4. IP、TCP和DNS

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

 

## 5. URI 和 URL

- **URL（Uniform Resource Locator，统一资源定位符）**

  使用Web浏览器等访问Web页面时需要输入的网页地址。


- **URI（Uniform Resource Identifier，统一资源标识符）**

  由某个协议方案表示的资源的定位标识符。


- **绝对URI、绝对URL、相对URL**

