# 抓包工具

## Fiddler

**Fiddler**是在windows上运行的程序，专门用来捕获HTTP，HTTPS的。

### Wireshark

**Wireshark**能获取HTTP，也能获取HTTPS，但是不能解密HTTPS。Wireshark 比fiddler更强大，消息量更多。

优点：

1、强大的协议解析能力，一到七层全解码，一览无遗，对于协议细节的研究特别有帮助。

2、对于https加密流量，只要将浏览器的session key 自动导入wireshark，Wireshark可以自动解密https流量。

缺点：

尽管可以自定义过滤列表，但为了抓取一个特定TCP Flow /Session 流量需要写一个长长的过滤列表，这对于初学者很不友好。



## Charles



## 参考链接

[抓包工具：fiddler和wireshark对比](https://zhuanlan.zhihu.com/p/44912855)