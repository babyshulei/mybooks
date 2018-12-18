# Location

> 2018-12-19 @wsl

使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。 

```
Location: http://www.usagidesign.jp/sample.html
```

基本上， 该字段会配合 3xx ： Redirection 的响应， 提供重定向的URI。

几乎所有的浏览器在接收到包含首部字段 Location 的响应后， 都会强制性地尝试对已提示的重定向资源的访问。 

