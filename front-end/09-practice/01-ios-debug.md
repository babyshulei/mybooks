# ios手机safari+chrome调试（windows）

## 1. 安装iTunes

Windows 系统首先要安装 iTunes ，打开 Apple 官网下载 iTunes 并完成 iTunes  安装，否则计算机无法正确识别 iPhone 设备。



## 2. Safari 设置权限

连接ios手机到pc电脑，设置 - Safari - 高级 - web检查器、JavaScript



## 3. 安装调试工具

打开PowerShell工具，windows自带，每个版本不一样，调试需要版本3以上。

### 1）安装scoop

**1、修改执行策略**

```powershell
set-executionpolicy unrestricted -s cu
```

此时会出现提示

```
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略
[Y] 是(Y) [N] 否(N) [S] 挂起(S) [?] 帮助 (默认值为“Y”): 
```

输入Y或者直接回车，如果不是这个提示，请升级版本。

**2、下载安装scoop**

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

成功提示

```
Initializing...
Downloading...
Extracting...
Creating shim...
Adding ~\scoop\shims to your path.
Scoop was installed successfully!
Type 'scoop help' for instructions.
```

### 2）安装ios_webkit_debug_proxy

通过scoop安装ios_webkit_debug_proxy

```powershell
scoop bucket add extras
scoop install ios-webkit-debug-proxyCopy
```


成功提示：

```
Installing 'ios-webkit-debug-proxy' (1.8.3) [64bit]
ios-webkit-debug-proxy-1.8.3-win64-bin.zip (3.4 MB) [=========================================================] 100%
Checking hash of ios-webkit-debug-proxy-1.8.3-win64-bin.zip ... ok.
Extracting ios-webkit-debug-proxy-1.8.3-win64-bin.zip ... done.
Linking ~\scoop\apps\ios-webkit-debug-proxy\current => ~\scoop\apps\ios-webkit-debug-proxy\1.8.3
Creating shim for 'ios_webkit_debug_proxy'.
'ios-webkit-debug-proxy' (1.8.3) was installed successfully!
```

## 4. 浏览器页面调试

**1、确保手机已连接，输入如下：**

```powershell
ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.htmlCopy
```

如果手机未连接上，则会出现如下错误提示，请在itunes查看是否已连接

```
Listing devices on :9221
device_listener: connect function failed with error 10061
No device found, is it plugged in?
```

连接成功会显示设备，格式基本如下：

```
Listing devices on :9221
Connected :9222 to 瀹惰鐨?iPhone (ejdifheufhudsuhdfidhfshfdosfd)
```

**2、打开Chrome进行调试**

此时在浏览器中输入 http://localhost:9221/ 可以看到当前连接的设备。

在 `chrome://inspect/#devices` 添加设备端口，点击`port  forwarding`按钮，添加端口号`localhost:9222`，如果有新的设备累加。

刷新页面，remote Target中会出现手机访问的浏览器地址，点击inspect即可调试。

#### chrome下调试ios Safari控制台失效？

chrome 必须是45.0.2454.85的版本，否则无法执行js，控制台不能调试 js。



## 5. 解决高版本 Chrome 控制台失效问题

**1、安装 [remotedebug-ios-webkit-adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter#getting-started)**

```powershell
npm install remotedebug-ios-webkit-adapter -g
```

**2、启动 remotedebug_ios_webkit_adapter**

```powershell
remotedebug_ios_webkit_adapter --port=9000
```

**3、打开Chrome进行调试**

谷歌浏览器打开 chrome://inspect/#devices - Configure - 配置上一步指定的端口  localhost:9000 - Done

现在可以控制台调试了，亲测 console.log() 失效，有 console.error()、console.info() 的结果，但是打印内容有问题。

解决方案：

修改文件：C:\Users\xxxx\AppData\Roaming\npm\node_modules\remotedebug-ios-webkit-adapter\out\protocols\ios\ios.js

```js
onConsoleMessageAdded(msg){
        let message = msg.params.message;
        let type;
        let method = "Runtime.consoleAPICalled";
        if (message.type === 'log') {
            switch (message.level) {
                case 'log':
                    type = 'log';
                    break;
                case 'info':
                    type = 'info';
                    break;
                case 'error':
                    type = 'error';
                    break;
                default: type = 'log';
            }
        }
        else {
            type = message.type;
        }
        const consoleMessage = {
            source: message.source,
            level: type,
            text: message.text,
            lineNumber: message.line,
            timestamp: (new Date).getTime(),
            url: message.url,
            stackTrace: message.stackTrace ? {
                callFrames: message.stackTrace
            } : undefined,
            args:message.parameters,
            networkRequestId: message.networkRequestId
        };

        if(type == "error") {
            method = "Log.entryAdded";
            this._target.fireEventToTools(method, {
	            entry: consoleMessage
	        });
        } else {
        	this._target.fireEventToTools(method, consoleMessage);
        }

        return Promise.resolve(null);
}
```

 

## 参考链接

[IOS 客户端H5调试方法简书](https://www.jianshu.com/p/37ce82651948)

<https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter/issues/62>

