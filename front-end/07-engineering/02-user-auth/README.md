# 用户鉴权

> 2020.03.30 @wsl

目前常用的几种鉴权方式：

1. HTTP Basic Authentication
2. session-cookie
3. Token 验证
4. OAuth(开放授权)

## HTTP Basic Authentication

这种授权方式是浏览器遵守HTTP协议实现的基本授权方式。进行HTTP通信的过程中，HTTP协议定义了基本认证认证允许HTTP服务器对客户端进行用户身份证的方法。

### 认证过程

 1、客户端向服务器请求数据，请求的内容可能是一个网页或者是一个ajax异步请求，此时，假设客户端尚未被验证，则客户端提供如下请求至服务器:

```http
Get /index.html HTTP/1.0
Host:www.google.com
```

2、服务器向客户端发送验证请求代码401,（WWW-Authenticate: Basic realm=”google.com”这句话是关键，如果没有客户端不会弹出用户名和密码输入界面）服务器返回的数据大抵如下：

```http
HTTP/1.0 401 Unauthorised
Server: SokEvo/1.0
WWW-Authenticate: Basic realm=”google.com”
Content-Type: text/html
Content-Length: xxx
```

3、当符合http1.0或1.1规范的客户端（如IE，FIREFOX）收到401返回值时，将自动弹出一个登录窗口，要求用户输入用户名和密码。

4、用户输入用户名和密码后，将用户名及密码以BASE64加密方式加密，并将密文放入前一条请求信息中，则客户端发送的第一条请求信息则变成如下内容：

```http
Get /index.html HTTP/1.0
Host:www.google.com
Authorization: Basic d2FuZzp3YW5n
```

注：d2FuZzp3YW5n表示加密后的用户名及密码（用户名：密码 然后通过base64加密，加密过程是浏览器默认的行为，不需要我们人为加密，我们只需要输入用户名密码即可）

5、服务器收到上述请求信息后，将Authorization字段后的用户信息取出、解密，将解密后的用户名及密码与用户数据库进行比较验证，如用户名及密码正确，服务器则根据请求，将所请求资源发送给客户端

**效果：**

客户端未未认证的时候，会弹出用户名密码输入框，这个时候请求时属于pending状态，这个时候其实当用户输入用户名密码的时候客户端会再次发送带Authentication头的请求。

### 注销

有登陆就有注销，当我们认证成功后每次请求请求头都会带上Authentication及里面的内容，那么如何做到让这次登陆失效的？

可以在注销操作的时候，在服务器设置一个专门的注销账号，当接收到的Authentication信息为注销用户名密码的时候就代表注销成功了，而客户端在注销操作的时候，手动的的去修改请求头重的Authentication，将他设置为服务器默认的注销账号和密码。

### 总结

这种验证方式的缺陷加密方式简单，仅仅是base64加密，这种加密方式是可逆的。同时在每个请求的头上都会附带上用户名和密码信息，这样在外网是很容易被嗅探器探测到的。

这种加密方式一般多被用在内部安全性要求不高的的系统上，现在使用这种鉴权比较少了。



## session-cookie





## 参考链接

[前后端常见的几种鉴权方式](https://blog.csdn.net/wang839305939/article/details/78713124)

