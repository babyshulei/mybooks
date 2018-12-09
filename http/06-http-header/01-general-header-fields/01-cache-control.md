# Cache-Control

> 2018-11-21 @wsl

通过指定首部字段 Cache-Control 的指令，来进行缓存操作的工作机制，多个参数之间可以使用“,”分隔。

```
Cache-Control: private, max-age=0, no-cache 
```

## 1. Cache-Control 指令一览

缓存请求指令

| 指令             | 参数   | 说明                         |
| ---------------- | ------ | ---------------------------- |
| no-cache         | 无     | 强制向源服务器再次验证       |
| no-store         | 无     | 不缓存请求或响应的任何内容   |
| max-age=[秒]     | 必需   | 响应最大的Age值              |
| min-fresh(=[秒]) | 可省略 | 接受已过期的响应             |
| min-fresh=[秒]   | 必需   | 期望在指定时间内的响应仍有效 |
| no-transform     | 无     | 代理不可更改类型             |
| only-if-cached   | 无     | 从缓存获取资源               |
| cache-extension  | -      | 新指令标记（token）          |



缓存响应指令

| 指令             | 参数   | 说明                                           |
| ---------------- | ------ | ---------------------------------------------- |
| public           | 无     | 可向任意方提供响应的缓存                       |
| private          | 可省略 | 仅向特定用户返回响应                           |
| no-cache         | 可省略 | 缓存前必须确认其有效性                         |
| no-store         | 无     | 不缓存请求或响应的任何内容                     |
| no-transform     | 无     | 代理不可更改媒体类型                           |
| must-revalidate  | 无     | 可缓存但必须向源服务器进行确认                 |
| proxy-revalidate | 无     | 需求中间缓存服务器对缓存的响应有效性再进行确认 |
| max-age=[秒]     | 必需   | 响应的最大Age值                                |
| s-maxage=[秒]    | 必需   | 公众缓存服务器响应的最大Age值                  |
| cache-extension  | -      | 新指令标记（token）                            |

 

## 2. 表示是否能缓存的指令

- public 指令

  表明其他用户也可利用缓存

  ```
  Cache-Control: public
  ```

- private 指令

  表示响应只以特定的用户作为对象，这与 public 指令的行动相反

- no-cache 指令

  ```
  Cache-Control: no-cache
  ```

  意思是不要过期的缓存资源，表示为了防止从缓存中返回过期的资源。

  客户端发送携带：表示客户端将不会接受缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。

  服务器端发送携带：表示缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资源有效性进行确认，且禁止对其响应资源进行缓存操作。

  ```
  Cache-Control: no-cache=Location
  ```

  由服务器返回的响应中，若报文首部字段 Cache-Control 中对 no-cache 字段名进行具体指定参数值，那么客户端在接受到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。换言之，无参数值的首部字段可以使用缓存。只能在响应指令中指定该参数。

 

## 3. 控制可执行缓存的对象的指令

- no-store 指令

  ```
  Cache-Control: no-store
  ```

  暗示请求（和对应的响应）或响应中包含机密信息。因此，该指令规定缓存不能再本地存储请求或响应的任一部分。

  > 请注意，no-cache 不是代表着不缓存，而是代表着，不要过期的缓存，意思就是说，当请求时，中间缓存服务器会向服务器进行有效期确认，不使用当前缓存的过期资源，也许 no-cache 称为 do-not-serve-from-cache-without-revalidation 更合适。no-store 才是真正地不进行缓存。

 

## 4. 指定缓存期限和认证的指令

- s-maxage 指令

  ```
  Cache-Control: s-maxage=604800   （单位：秒）
  ```

  s-maxage 指令的功能和 max-age 指令相同，它们的不同点就是 s-maxage 指令只适用于多位用户使用的公共缓存服务器（一般指代理）。也就是说，对于同一用户重复返回响应的服务器来说，这个指令没有任何作用。另外，当使用 s-maxage 指令后，则直接忽略对 Expires 首部字段及 max-age 指令的处理。

 

- max-age 指令

  ```
  Cache-Control: max-age=604800 （单位：秒）
  ```

  当客户端发送的请求中包含 max-age 指令时，如果判断缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收到缓存的资源。另外，当指定 max-age 值为0，那么缓存服务器通常需要将请求转发给源服务器。

  当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源的有效性进行再度确认，而 max-age 数字代表资源保存为缓存的最长时间。

  应用 HTTP/1.1 版本的缓存服务器遇到同时存在Expiress首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而 HTTP/1.0 版本的缓存服务器的情况刚好相反，max-age 指令会被忽略。

 

- min-fresh 指令

  ```
  Cache-Control: min-fresh=60 （单位：秒）
  ```

  min-fresh 指令是要求缓存服务器返回至少还未过指定时间的缓存资源。

 

- max-stale 指令

  ```
  Cache-Conntrol: max-stale=3600 （单位：秒）
  ```

  使用 max-stale 可指示缓存资源，即使过期也照常接收。

  如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；如果指令中指定了具体的数值，那么即使过期，只要仍然处于 max-stale 指定的时间内，仍旧会被客户端接收。

 

- only-if-cached 指令

  ```
  Cache-Control: only-if-cached
  ```

  使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会被要求其返回，换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地缓存无响应，则返回状态码 504 Gateway Timeout （请求网关超时）

 

- must-revalidate 指令

  ```
  Cache-Control: must-revalidate 
  ```

  使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响应缓存目前是否依然有效。

  若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端一条 504 Gateway Timeout （请求网关超时）状态码。

  另外，使用 must-revalidtae 指令会忽略请求的 max-stale 指令（即使已经在首部使用了 max-stale ，也不会再有效果）。

 

- proxy-revalidate 指令

  ```
  Cache-Control: proxy-revalidate
  ```

  proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。

 

- no-transform 指令

  ```
  Cache-Control: no-transform
  ```

  使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。

  这样可以防止缓存或代理压缩图片等类似操作。

 

## 5. Canche-Control 扩展

- cache-extension token

  ```
  Cache-Control: private, community="UCI" 
  ```

  通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字段内的指令。

  如上例，Cache-Control 首部字段本身没有 community 这个指令。借助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略。因此，extension tokens 仅对能理解它的缓存服务器来说是有意义的。



