# Web 应用

> 2019-01-17 @wsl

Web 应用是指通过 Web 功能提供的应用程序。比如购物网站、网上银行、SNS、BBS、搜索引擎和 e-learning 等。互联网（Internet）或企业内网（Intranet）上遍布各式各样的 Web 应用。

原本应用 HTTP 协议的 Web 的机制就是对客户端发来的请求，返回事前准备好的内容。可随着 Web 越来越普及，仅靠这样的做法已不足以应对所有的需求，更需要引入由程序创建 HTML内容的做法。

类似这种由程序创建的内容称为动态内容，而事先准备好的内容称为静态内容。Web 应用则作用于动态内容之上。

## 1. CGI

CGI（Common Gateway Interface， 通用网关接口）是指 Web 服务器在接收到客户端发送过来的请求后转发给程序的一组机制。在 CGI 的作用下，程序会对请求内容做出相应的动作，比如创建 HTML等动态内容。

使用 CGI 的程序叫做 CGI 程序，通常是用 Perl、 PHP、 Ruby 和 C 等编程语言编写而成。

## 2. Servlet

Servlet 是一种能在服务器上创建动态内容的程序。Servlet 是用 Java 语言实现的一个接口，属于面向企业级 Java（JavaEE， Java Enterprise Edition）的一部分。

> Servlet 没有对应中文译名， 全称是 Java Servlet。 名称取自 Servlet=Server+Applet， 表示轻量服务程序。

之前提及的 CGI，由于每次接到请求，程序都要跟着启动一次。因此一旦访问量过大，Web 服务器要承担相当大的负载。而 Servlet 运行在与 Web 服务器相同的进程中，因此受到的负载较小 2。Servlet 的运行环境叫做 Web 容器或 Servlet 容器。

> Servlet 常驻内存， 因此在每次请求时， 可启动相对进程级别更为轻量的Servlet，程序的执行效率从而变得更高。

Servlet 作为解决 CGI 问题的对抗技术 ，随 Java 一起得到了普及。

