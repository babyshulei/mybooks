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



## 安装 WSL 2

安装参考：[安装 WSL 2](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package)。

安装Windows子系统后，如果想要[重置/注销子系统](https://windows10.pro/reset-unregister-linux-subsystem/)，选择 设置-应用-应用和功能-Ubuntu 高级选项-重置。然后再运行Ubuntu，就会显示正在安装，进入初始化步骤即可。

查看wsl安装的环境：`wslconfig /l`

修改wsl默认运行的环境：`wslconfig /setdefault docker-desktop`

[WSL 启动命令和配置 - Windows](https://docs.microsoft.com/zh-cn/windows/wsl/wsl-config)

### 踩坑 - 报错 \r': command not found

在 Linux 环境下运行代码中 sh 脚本，发现报错：`$'\r': command not found`。

排查发现，是文件换行符为 `\r\n` 的原因，而 Linux 的换行符为 `\n`，所以运行报错。

再排查发现，git 上的代码换行符为 LF，但拉下来就变成了 CRLF，原来是 git 默认转换换行符的锅！！！

参见：[配置 Git 处理行结束符](https://docs.github.com/cn/github/using-git/configuring-git-to-handle-line-endings)

在 Windows 环境下，git 默认会配置 `core.autocrlf` 为 true，这就导致的拉下来的代码换行符会转化为 Windows 默认的换行符格式 CRLF，而在提交代码时，换行符又会自动转换为 Linux 默认的换行符格式 LF，目的是方便多平台的开发者协作开发。

因此需要把这个配置干掉，不让它进行自动转换，这样就能在 Linux 系统下正常运行啦！

`git config --global core.autocrlf false`

问题解决，撒花~~~

## 修改 host

### 方案一：修改hosts文件

hosts文件（域名解析文件）是一个用于储存计算机网络中各节点信息的计算机文件。**这个文件负责将主机名称映射到相应的 IP 地址**。hosts文件通常用于补充或取代网络中DNS的功能。和DNS不同的是，计算机的用户可以直接对hosts文件进行控制。

最初在Internet的前身ARPANET中，其成员SRI International手动维护并分享了一个名为HOSTS.TXT的文件，其中就包括主机名称和对应地址。1983年DNS系统开始开发，1984年得到了发展。在网络快速的发展过程中，DNS可以自动提供动态的主机名解析。不过在现代操作系统，**hosts文件仍然是一个可以作为备用手段的名称解析机制**。

操作：

1. 在开始图标上点击右键，单击命令提示符（管理员）

2. 此时默认进入`C:\Windows\system32>`路径

3. 输入`notepad drivers\etc\hosts`，按回车使用记事本打开hosts文件

4. 将**ip地址+域名对**添加到文件最后，示例：

   ```
   # Copyright (c) 1993-2009 Microsoft Corp.
   #
   # This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
   #
   # This file contains the mappings of IP addresses to host names. Each
   # entry should be kept on an individual line. The IP address should
   # be placed in the first column followed by the corresponding host name.
   # The IP address and the host name should be separated by at least one
   # space.
   #
   # Additionally, comments (such as these) may be inserted on individual
   # lines or following the machine name denoted by a '#' symbol.
   #
   # For example:
   #
   #      102.54.94.97     rhino.acme.com          # source server
   #       38.25.63.10     x.acme.com              # x client host
   
   # localhost name resolution is handled within DNS itself.
   #	127.0.0.1       localhost
   #	::1             localhost
   74.125.23.141 chrome-devtools-frontend.appspot.com
   # Added by Docker Desktop
   10.221.85.39 host.docker.internal
   10.221.85.39 gateway.docker.internal
   # To allow the same kube context to work on the host and the container:
   127.0.0.1 kubernetes.docker.internal
   # End of section
   ```

### 方案二：安装SwitchHosts

项目开源地址：https://github.com/oldj/SwitchHosts

下载安装SwitchHosts，以管理员身份运行，就可以自由地组合hosts文件啦！

参见：[[开源工具]SwitchHosts!更方便的切换hosts](https://cloud.tencent.com/developer/article/1408956)





