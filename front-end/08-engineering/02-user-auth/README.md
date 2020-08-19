# 用户鉴权

> 2020.03.30 @wsl

目前常用的几种鉴权方式：

1. HTTP Basic Authentication
2. session-cookie
3. JWT（JSON Web Token）认证
4. OAuth(开放授权)

## HTTP Basic Authentication

这种授权方式是浏览器遵守HTTP协议实现的基本授权方式。进行HTTP通信的过程中，HTTP协议定义了基本认证认证允许HTTP服务器对客户端进行用户身份证的方法。

### 认证过程

![img](..\images\http-basic-auth.png)

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



## Session-Cookie

### Cookie

`Cookie`是进行网站用户身份，实现服务端Session会话持久化的一种非常好方式。`Cookie`最早由Netscape公司开发，现在由 IETF 的[RFC 6265](http://tools.ietf.org/html/rfc6265)标准备对其规范，已被所有主流浏览器所支持。

HTTP是一种无状态的协议，客户端与服务器建立连接并传输数据，数据传输完成后，连接就会关闭。再次交互数据需要建立新的连接，因此，服务器无法从连接上跟踪会话，也无法知道用户上一次做了什么。

`Cookie`是解决HTTP无状态性的有效手段，服务器可以设置或读取`Cookie`中所包含的信息。当用户登录后，服务器会发送包含登录凭据的`Cookie`到用户浏览器客户端，而浏览器对该`Cookie`进行某种形式的存储（内存或硬盘）。用户再次访问该网站时，浏览器会发送该`Cookie`（Cookie未到期时）到服务器，服务器对该凭据进行验证，合法时使用户不必输入用户名和密码就可以直接登录。

#### Cookie的类型

`Cookie` 总是由用户客户端进行保存的（一般是浏览器），按其存储位置可分为：内存式`Cookie`和硬盘式`Cookie`。

内存式`Cookie`存储在内存中，浏览器关闭后就会消失，由于其存储时间较短，因此也被称为`非持久Cookie`或`会话Cookie`。

硬盘式`Cookie`保存在硬盘中，其不会随浏览器的关闭而消失，除非用户手工清理或到了过期时间。由于硬盘式`Cookie`存储时间是长期的，因此也被称为`持久Cookie`。

#### Cookie 的实现原理

`Cookie`是一种`key=value`形式的字符串，`Cookie`定义了一些[HTTP请求头和HTTP响应头](http://itbilu.com/other/relate/EJ3fKUwUx.html)，通过这些HTTP头信息使服务器可以与客户进行状态交互。

客户端请求服务器后，如果服务器需要记录用户状态，服务器会在响应信息中包含一个`Set-Cookie`的响应头，客户端会根据这个响应头存储`Cookie`信息。再次请求服务器时，客户端会在请求信息中包含一个`Cookie`请求头，而服务器会根据这个请求头进行用户身份、状态等较验。

![Http Cookie机制及Cookie的实现原理](..\images\http-cookie.png)

**1、创建Cookie**

当用户第一次浏览某个使用Cookie的网站时，该网站的服务器就进行如下工作：

① 该用户生成一个唯一的识别码（Cookie id），创建一个Cookie对象；

② 默认情况下它是一个会话级别的cookie，存储在浏览器的内存中，用户退出浏览器之后被删除。如果网站希望浏览器将该Cookie存储在磁盘上，则需要设置最大时效（maxAge），并给出一个以秒为单位的时间（将最大时效设为0则是命令浏览器删除该Cookie）；

③ 将Cookie放入到HTTP响应报头，将Cookie插入到一个 Set-Cookie HTTP请求报头中。

④ 发送该HTTP响应报文。

**2、设置存储Cookie**

浏览器收到该响应报文之后，根据报文头里的Set-Cookied特殊的指示，生成相应的Cookie，保存在客户端。该Cookie里面记录着用户当前的信息。

**3、发送Cookie**

当用户再次访问该网站时，浏览器首先检查所有存储的Cookies，如果某个存在该网站的Cookie（即该Cookie所声明的作用范围大于等于将要请求的资源），则把该cookie附在请求资源的HTTP请求头上发送给服务器。

**4、读取Cookie**

服务器接收到用户的HTTP请求报文之后，从报文头获取到该用户的Cookie，从里面找到所需要的东西。

#### Cookie 的特点

**1、不可跨域**

cookie是不可跨域的。协议、端口号、域名不同，视为跨域。

可以设置cookie的domain属性，设置cookie绑定的域名。如果没有设置，就会自动绑定到执行语句的当前域。

设置domain属性后，符合条件的域名可以跨域访问Cookie。例如将domain属性设置为“.baidu.com”，则以“.baidu.com”为后缀的一切域名均能够访问该Cookie。

**2、容量限制**

一般情况下：

- 300条cookies总数限制
- 单条cookie限制4096bytes
- 每个域名限制20条cookie
- 每个域名81920bytes容量限制（20*4096 = 81920 bytes）

不同浏览器实现会有差别。例如每个域名的条数限制，都大于20，少则几十多则上百。

#### Cookie的属性

- name：创建或覆盖的cookie的名字 
- value：cookie的值
- domain：cookie绑定的域名
- path：web的路由，默认为当前文档位置的路径。路径必须为绝对路径
- expires/max-age：cookie的有效期。expires属性为过期的时间节点。max-age（推荐）属性为有效期的时长，单位为秒。
- secure：boolean或null，cookie只会被https传输
- HttpOnly：为true时，不能通过js脚本来获取cookie的值，能有效的防止xss攻击

#### 设置cookie

客户端：

通过js操作cookie。通过document.cookie可以对cookie进行读写。

```js
console.log(document.cookie);
document.cookie='myname=laihuamin;path=/;domain=.baidu.com';
```

服务端：

服务端通过Set-Cookie来设置cookie，当客户端存储cookie后，请求可以携带cookie给后端。例子：

```
Set-Cookie: id=a3fWa; Domain=example.com; Path=/; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

### Session

`session` 是会话的意思，浏览器第一次访问服务端，服务端就会创建一次会话，在会话中保存标识该浏览器的信息。它与 `cookie` 的区别就是 `session` 是缓存在服务端的，`cookie` 则是缓存在客户端，他们都由服务端生成，为了弥补 `Http` 协议无状态的缺陷。

#### 为什么需要Session

`Cookie`很好的解决了HTTP通讯中状态问题，但其本身也存在一些问题，如：

1. 客户端存储，可能会被修改或删除
2. 发送请求时，`Cookie`会被一起发送到服务器，当`Cookie`数据量较大时也会带来额外的请求数据量
3. 客户端对`Cookie`数量及大小有一定的限制

`Session`解决了`Cookie`的一些缺点。`Session`同样是为了记录用户状态，对于每个用户来说都会有相应的一个状态值保存在服务器中，而只在客户端记录一个`sessionID`用于区分是哪个用户的`Session`。

与`Cookie`相比`Session`有一定的优势：

1. `Session`值存储在服务器，相对来说更安全
2. 客户端发送给服务器的只有一`sessionID`，数据量更小

#### Session的实现原理

`Session`需要在客户端存储一个`sessionID`。可以这个值存储在`Cookie`，每次发送请求时通过`Cookie`请求头将其发送到服务器；也可以不使用`Cookie`，而将`sessionID`做为一个额外的请求参数，通过URL或请求体发送到服务器。

![Session的实现原理](..\images\session.png)

由上可见，基于`Cookie`实现`Session`时，其本质上还是在客户端保存一个`Cookie`值。这个值就是`sessionID`，sessionID的名称也可按需要设置，为保存安全，其值也可能会在服务器端做加密处理。服务器在收到`sessionID`后，就可以对其解密及查找对应的用户信息等。

具体过程：

**1、创建Session**

当用户访问到一个服务器，如果服务器启用Session，服务器就要为该用户创建一个session，在创建这个session的时候，服务器首先检查这个用户发来的请求里是否包含了一个sid，如果包含了一个sid则说明之前该用户已经登陆过并为此用户创建过session，那服务器就按照这个sid把这个session在服务器的内存中查找出来（如果查找不到，就有可能为他新创建一个），如果客户端请求里不包含有sid，则为该客户端创建一个session并生成一个与此session相关的sid。

这个sid是唯一的、不重复的、不容易找到规律的字符串，这个sid将被在本次响应中返回到客户端保存，而保存这个sid的正是cookie，这样在交互过程中浏览器可以自动的按照规则把这个标识发送给服务器。 

**2、使用Session**

如果cookie被禁止，可以用以下方式传递session id。

- URL重写，就是把Session id直接附加在URL路径的后面一种是作为URL路径的附加信息，例如： 

  http://…./xxx;jSession=ByOK3vjFD75aPnrF7C2HmdnV6QZcEbzWoWiBYEnLerjQ99zWpBng!-145788764； 

- 作为查询字符串附加在URL后面，例如： 

  http://…../xxx?jSession=ByOK3vjFD75aPnrF7C2HmdnV6QZcEbzWoWiBYEnLerjQ99zWpBng!-145788764 

- 表单隐藏字段。就是服务器会自动修改表单，添加一个隐藏字段，以便在表单提交时能够把Session id传递回服务器。

### Session-Cookie 认证

1. 服务器在接受客户端首次访问时在服务器端创建seesion，然后保存seesion(我们可以将seesion保存在 内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的标识字符串,然后在 响应头中种下这个唯一标识字符串。
2. 签名。这一步通过秘钥对sid进行签名处理，避免客户端修改sid。(非必需步骤)
3. 浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求的请求头中会带上该域名下的cookie信息。
4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断该请求是否合法。

![img](..\images\session-cookie.png)

使用session-cookie做登录认证时，登录时存储session，退出登录时删除session。从而实现用户登录和注销。



## 参考链接

[前后端常见的几种鉴权方式-CSDN](https://blog.csdn.net/wang839305939/article/details/78713124)

[前后端常见的几种鉴权方式- 掘金](https://juejin.im/post/5d67662ee51d45621655353f)

[网站登录鉴权的实现_Java_leeezm的博客-CSDN博客](https://blog.csdn.net/leeezm/article/details/80464847)

[web鉴权系统· Issue #18 · xujie-phper/huge-skills-summary ...](https://github.com/xujie-phper/huge-skills-summary/issues/18)

[网站常见的鉴权认证方式有哪几种？](https://www.cnblogs.com/vickylinj/p/11929910.html)

[Http Cookie机制及Cookie的实现原理- IT笔录](https://itbilu.com/other/relate/4J4n8fIPe.html)

[理解HTTP协议中的Cookie及其与Session的区别](https://itbilu.com/other/relate/Ny2IWC3N-.html)

[Cookie-维基百科](https://zh.wikipedia.org/wiki/Cookie)

[把cookie聊清楚- 掘金](https://juejin.im/post/59d1f59bf265da06700b0934)

[Cookie和Session的作用和工作原理_Java_渴望，就奋力追寻 ...](https://blog.csdn.net/guoweimelon/article/details/50886092)

[Document.cookie - Web API 接口参考| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

[Set-Cookie - MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)

[瀏覽器的Cookie 容量限制| Tsung's Blog - 隆瑩寢飾精品](https://blog.longwin.com.tw/2018/08/browser-chrome-cookie-size-limit-2018/)

[各浏览器中cookie个数和大小限制汇总(转) - 李泓锐- 博客园](https://www.cnblogs.com/sdjxcolin/archive/2009/02/16/1391272.html)

<http://browsercookielimits.squawky.net/>