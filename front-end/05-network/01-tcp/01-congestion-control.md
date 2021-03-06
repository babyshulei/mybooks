# 拥塞控制

接收窗口rwnd和拥塞窗口cwnd

发送窗口 = min(rwnd, cwnd)



慢启动和拥塞避免

慢启动：建立连接后，发送方不知道当前的网络情况怎么样，所以会比较谨慎，先慢慢地发，如果对方的ACK回复很及时，那么说明可以继续加大发送的量，并且指数级地增加，这就是慢启动。

拥塞避免：拥塞窗口会以指数倍增长，一直增长到拥塞阈值 ssthresh。然后再以递增的方式增加拥塞窗口，这个阶段叫拥塞避免。

也就是说，当cwnd < ssthresh时，是慢启动的过程；当 cwnd > ssthresh时，是拥塞避免。一直增长到合适的带宽大小。

在慢启动和拥塞避免的过程中，可能会遇到网络拥塞的情况，造成丢包，具体表现为很长时间没有收到对方的ACK，或者收到重复的ACK。



超时重传

假设很长时间没有收到对方的ACK，这个时间超过了定时器的范围，导致进行重传。超时重传的时间间隔会增加，并且发生超时重传之后最多只会发送一个报文，这个时候它进入了慢启动的过程。



快速重传

当接收方收到了乱序的数据时，会马上产生一个重复的ACK，要求重新获取第一个包开始的数据。收到重复的ACK时，不应该马上进行重传，因为可能乱序的包及时收到了。但是当收到三个重复的ACK时就可以认为那个包已经丢了，需要进行重传，不用等到超时，这个叫做快速重传。

快速重传之后就进入了快速恢复的阶段。当收到一个新数据的ACK时，将退出快速恢复，将cwnd置为ssthresh，进入拥塞避免。



## 参考链接

[TCP拥塞控制- 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/TCP拥塞控制)

