# 准备

## 安装 Dart SDK

Dart官网：<https://dart.dev/get-dart>

选择下载sdk：<https://dart.dev/tools/sdk/archive>

解压到本地，得到 `dart-sdk`文件夹，将`dart-sdk`下的的`bin`目录添加到系统Path环境变量中。



## 配置 VSCode

在vscode插件商店中搜索Dart进行插件安装。



## 测试环境

在VSCode中新建一个`test.dart`文件，编写如下代码

```dart
void  main(){
    print("Hello world!");
}
```

## 添加launch.json

目录/.vscode/launch.json

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Dart",
            "program": "test.dart",
            "request": "launch",
            "type": "dart"
        }
    ]
}
```



## 运行代码

点击调试面板，启动调试。可以在调试控制台看到输出`Hello world!`。



## 参考链接

[Dart语言——45分钟快速入门](https://juejin.im/post/6844903844535779342)

[Dart VS code 开发环境搭建](https://segmentfault.com/a/1190000018721187)

