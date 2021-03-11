# Windows 环境配置

## cmd 中设置别名 alias

1、关闭所有在运行的CMD窗口

2、创建文件`C:\cmd-alias.bat`，包含以下内容：

```bat
doskey sayhello=echo Hello $*
doskey cattxt=type xxxxxxxxxxxx.txt $*
@doskey ls=ls --color=auto $*
@doskey ll=ls -alF --color=auto $*
@doskey la=ls -A $*
@doskey l=ls -CF $*
```

> doskey就相当于Linux中的alias，
> $*表示这个命令还可能有其他参数，
> @表示执行这条命令时不显示这条命令本身
> 第二个命令type xxxxxxxxxxxx.txt的作用是读取txt文件内容并打印到屏幕，等同于Linux下的cat

3、使用Win+R，输入`regedit`进入注册表，找到`HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor`，右键新建，字符串值，名为`AutoRun`，值为`C:\cmd-alias.bat`，保存退出。

4、打开CMD，即可享受自定义命令。

参考：[在cmd中自定义命令 - Alias - CSDN](https://blog.csdn.net/qq285744011/article/details/51134905)

