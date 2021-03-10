# Linux 命令行

## 使用手册 man pages

1、使用手册命令 `man command`

`man`：显示关于命令的相关信息

`whereis`：查看命令手册页的位置

`whatis`：查看命令手册页的描述

`man -k`或`spropos`：显示包含string的手册页



2、`q`：退出



## 目录相关操作

1、显示当前目录

`pwd`：显示当前目录。(Print Working Directory)



2、切换目录

`cd <path>`：切换当前目录至path。(Change Directory)

`cd` 或`cd ~`：回到home目录。

`cd ..` ：进入当前目录的上级目录。

`cd . `：留在当前目录。

`cd -` ：进入上一次的工作目录。

`cd /` ：切换当前目录至根目录

`cd /path`：切换当前目录至根目录的path

`cd path`：切换至当前目录下的子目录path

> 注：在编写path时可以使用Tab键进行路径补全。

 

3、列出目录内容

`ls` ：列出当前目录下的文件

`ls <path>`：列出path路径下目录的文件

`ls -a` ：列出当前目录下的所有文件，包括隐藏文件，其中隐藏文件名前用 . 标注

`ls -l` ：列出当前目录下的文件的详细信息

`ls -lh` ： 列出当前目录下文件的详细信息。-h 会使file sizes数据以更可读的方式显示。

 

 4、创建目录

`mkdir dir` ：在当前目录下创建dir目录

`mkdir -p path/dir`： 在当前目录的path路径上创建dir目录，-p 作用为按照需要创建父目录path。



5、删除目录

`rmdir dir` ：删除dir目录，dir目录需为空目录

`rmdir -p path/dir`： 根据path路径递归地删除dir目录，dir目录需为空目录

 

6、栈操作

`pushed` ：添加一个目录到栈

`poped`：从栈中移除一个目录



## 文件相关操作

1、文件是区分大小写的

 

2、文件类型

`file`：判断文件类型

`file -s` ：判断特殊文件类型，例如在/dev和/proc目录下的文件

 

 3、创建空白文件

`touch` ： 创建空白文件

`touch -t` ： 创建空白文件的同时设置时间属性

 

4、删除文件

`rm` ： 永久删除文件

`rm -i` ： 删除文件，在删除前进行提示

`rm -rf` ： 强制递归地删除目录及其文件，无论其是否为空目录。其中 -f 代表强制删除；-r 代表递归地删除目录下面文件及子目录下的文件

 

 5、复制文件

`cp file filecopy`：复制文件file到filecopy 

`cp file dir`：复制文件file到目录dir下

`cp -r` ： 复制完整的目录。其中-r 代表递归地复制目录下文件及子目录下文件

`cp file1 file2 filen dir`：复制多个文件至dir目录。此时dir必须为一个目录

`cp -i` ：复制文件， 在出现覆盖文件情况时进行提示是否覆盖

 

 6、mv命令

移动或重命名文件/目录

`mv file1 file2`：重命名文件，将文件file1重命名为file2

`mv file <path>`：移动文件，将文件file移动到<path>路径的目录下，注意文件源地址和目标地址必须不同

`mv dir1 dir2`：重命名目录，将目录dir1重命名为dir2

`mv dir <path>`：移动目录，将目录dir移动到<path>路径的目录下

`mv -i` ：若出现覆盖事件，则提示是否覆盖

 

 7、rename命令

批量重命名文件

`rename`命令在不同的Linux发行版上使用方法不同，建议重命名几个文件时选择使用`mv`命令。

- 在Debian/Ubuntu上使用
  rename命令在Debian上是使用正则表达式来实现对多个文件进行重命名，下例实现了将所有以.txt结尾的文件的.txt重命名为.png： `rename   's/\.txt/\.png/' *.txt`   

- 在CentOS/RHEL/Fedora上使用
  语法略微不同，下例实现了将所有以.conf结尾的文件的.conf重命名为.backup： `rename   .conf .backup *.conf`   

 