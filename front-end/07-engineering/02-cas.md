# CAS登录

> 2020.03.19 @wsl

## 什么是CAS

CAS（Central Authentication Service） 是 Yale大学发起的一个企业级的、开源的项目，旨在为 Web 应用系统提供一种可靠的单点登录解决方法（属于Web SSO）。

CAS开始于2001年， 并在2004年12月正式成为JA-SIG的一个项目。

### 主要特性

1、  开源的、多协议的SSO解决方案；Protocols：Custom Protocol、CAS、OAuth、OpenID、RESTful API、SAML1.1、SAML2.0等。

2、  支持多种认证机制：Active Directory、JAAS、JDBC、LDAP、X.509 Certificates等；

3、  安全策略：使用票据（Ticket）来实现支持的认证协议；

4、  支持授权：可以决定哪些服务可以请求和验证服务票据（Service Ticket）；

5、  提供高可用性：通过把认证过的状态数据存储在TicketRegistry组件中，这些组件有很多支持分布式环境的实现，如：BerkleyDB、Default 、EhcacheTicketRegistry、JDBCTicketRegistry、JBOSS TreeCache、JpaTicketRegistry、MemcacheTicketRegistry等；

6、  支持多种客户端： Java、 .Net、 PHP、 Perl、 Apache, uPortal等。

## SSO 单点登录原理

主要针对 Web SSO

### 什么是SSO

单点登录（Single Sign-On ,简称SSO）是目前比较流行的服务于企业业务整合的解决方案之一，SSO 使得在多个应用系统中，用户只需要**登录一次**就可以访问所有相互信任的应用系统。

### SSO原理

#### SSO体系中的角色

一般SSO体系主要角色有三种：

1、 User（多个）

2、 Web应用（多个）

3、 SSO认证中心（**1个**）

#### SSO实现模式的原则

SSO实现模式一般包括以下三个原则：

1、  所有的认证登录都在SSO认证中心进行；

2、  SSO认证中心通过一些方法来告诉 Web 应用当前访问用户究竟是不是已通过认证的用户；

3、  SSO 认证中心和所有的 Web 应用建立一种信任关系，也就是说web应用必须信任认证中心。（单点

#### SSO主要实现方式

SSO的主要实现方式有：

1、  共享cookies

基于共享同域的cookie是Web刚开始阶段时使用的一种方式，它利用浏览同域名之间自动传递cookies机制，实现两个域名之间系统令牌传递问题；另外，关于跨域问题，虽然cookies本身不跨域，但可以利用它实现跨域的SSO。如：代理、暴露SSO令牌值等。

缺点：不灵活而且有不少安全隐患，已经被抛弃。

2、  Broker-based(基于经纪人)

这种技术的特点就是，有一个集中的认证和用户帐号管理的服务器。经纪人给被用于进一步请求的电子身份存取。中央数据库的使用减少了管理的代价，并为认证提供一个公共和独立的"第三方"。例如Kerberos、Sesame、IBM KryptoKnight（凭证库思想)等。Kerberos是由麻省理工大学发明的安全认证服务，已经被UNIX和Windows作为默认的安全认证服务集成进操作系统。

3、  Agent-based（基于代理人）

在这种解决方案中，有一个自动地为不同的应用程序认证用户身份的代理程序。这个代理程序需要设计有不同的功能。比如，它可以使用口令表或加密密钥来自动地将认证的负担从用户移开。代理人被放在服务器上面，在服务器的认证系统和客户端认证方法之间充当一个"翻译"。例如SSH等。

4、  Token-based

例如SecureID,WebID，现在被广泛使用的口令认证，比如FTP、邮件服务器的登录认证，这是一种简单易用的方式，实现一个口令在多种应用当中使用。

5、  基于网关

6、  基于SAML

SAML(Security Assertion Markup Language，安全断言标记语言）的出现大大简化了SSO，并被OASIS批准为**SSO的执行标准**。开源组织OpenSAML 实现了 SAML 规范。

## CAS 的基本原理

### 结构体系

从结构体系看，CAS包括两部分：CAS Server和CAS Client。

#### CAS Server

CAS Server负责完成对用户的认证工作，需要独立部署，CAS Server 会处理用户名 / 密码等凭证 (Credentials)。

#### CAS Client

负责处理对客户端受保护资源的访问请求，需要对请求方进行身份认证时，重定向到CAS Server进行认证。（原则上，客户端应用不再接受任何的用户名密码等 Credentials）。

CAS Client 与受保护的客户端应用部署在一起，以 Filter 方式保护受保护的资源。











## 参考链接

[CAS实现SSO单点登录原理](https://blog.csdn.net/cruise_h/article/details/51013597)

