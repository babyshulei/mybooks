# Accept

> 2018-11-30 @wsl

Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。 

```
Accept: text/html, application/xhtml+xml, application/xml; q=0.9, */*; q=0.8
```



## 常见媒体类型

### 1. 文本文件类型

- text/html
- text/plain
- text/css
- appllication/xhtml+xml
- application/xml
- ......



### 2. 图片文件类型

- image/jpeg
- image/gif
- image/png
- ......



### 3. 视频文件类型

- video/mpeg
- video/quicktime
- ......



### 4. 应用程序使用的二进制文件

- application/octet-strea
- application/zip
- ……



比如，浏览器不支持PNG图片的显示，那 Accept 就不指定 image/png ，而指定可处理的 image/gif 和 image/jpeg 等图片类型。

若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值，用分号（;）进行分隔。权重值 q 的范围是 0-1（可精确到小数点后3位），且1为最大值。不指定权重 q 值时，默认权重为 q=1.0。

当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。

