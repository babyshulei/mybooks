# 文件处理

## 下载并写入文件

request(url).pipe(fs.createWriteStream(dstpath))

url：请求地址。

dstpath：写入文件地址。

```javascript
var request = require('request')
var fs = require('fs')
var path = require('path')

const dirname = 'uploadImages'
const hostdir = "./public/mito/"
// 使用mkdirSync函数同步的进行循环递归创建目录
function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSync(path.dirname(dirname))) {   
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false
}

// 下载并写入文件
function downloadUrl(urlList) {
    for (const url of urlList) {
      const first = url.indexOf(dirname)
      const last = url.lastIndexOf('/')
      if (first > 0 && last > 0) {
        const name = url.substr(last + 1)
        const dir = url.substr(first, last - first)
        const dstpath = hostdir + dir + '/' + name
        if (name.length && dir.length && !fs.existsSync(dstpath)) {
          if (mkdirSync(hostdir + dir)) {
            console.log(dstpath)
            request(url).pipe(fs.createWriteStream(dstpath))
          }
        }
      }
    }
}
```

若需要下载完成回调：

```javascript
 request(uri).pipe(stream).on('close', function() {
     console.log(下载完毕);
 }); 
```





## 参考链接

[nodejs下载图片保存到本地](https://blog.csdn.net/tujiaw/article/details/77511473)