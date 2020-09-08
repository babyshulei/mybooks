# Python

Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。

Python 的设计具有很强的可读性，相比其他语言经常使用英文关键字，其他语言的一些标点符号，它具有比其他语言更有特色语法结构。



## 安装 Python

### windows

从[官网](https://www.python.org/)上下载安装包。

特别要注意勾上`Add Python 3.8 to PATH`，然后点“Install Now”即可完成安装。

安装成功后，打开命令提示符窗口，敲入python后，两种情况：

- 看到提示符`>>>`就表示我们已经在Python交互式环境中了，可以输入任何Python代码，回车后会立刻得到执行结果。输入`exit()`并回车，就可以退出Python交互式环境（直接关掉命令行窗口也可以）。
- 得到一个错误，因为Windows会根据一个`Path`的环境变量设定的路径去查找`python.exe`，如果没找到，就会报错。如果在安装时漏掉了勾选`Add Python 3.8 to PATH`，那就要手动把`python.exe`所在的路径添加到Path中。

> 坑：
>
> Win10 在执行 python 命令时会出现应用商店。原因是在环境变量 `C:\Users\x\AppData\Local\Microsoft\WindowsApps` 目录下有两个 python 文件，删除即可。
>
> 如果无法删除，还有另外一种解决方案：进入菜单-管理应用执行别名，将应用安装程序python和python3关闭即可。



## 参考链接

[Windows pip安装- 知乎](https://zhuanlan.zhihu.com/p/38603105)

[Python - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/Python)

[Python 简介| 菜鸟教程](https://www.runoob.com/python/python-intro.html)

