# Bash

> 2019.10.31 @wsl

## 1. shell 脚本

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

Shell 脚本（shell script），是一种为 shell 编写的脚本程序。

Shell 编程跟 JavaScript、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

Linux 的 Shell 种类众多，常见的有：

- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）
- ……

由于易用和免费，Bash 在日常工作中被广泛使用。同时，Bash 也是大多数Linux 系统默认的 Shell。

在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 **#!/bin/sh**，它同样也可以改为 **#!/bin/bash**。

**#!** 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。



## 2. 运行

### 2.1 作为可执行程序

将代码保存为 *.sh文件，并给文件添加可执行权限，运行时调用脚本即可。

```shell
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```

### 2.2 作为解释器参数

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

```shell
/bin/sh test.sh
/bin/php test.php
```



## 3. 语法

### 3.1 变量

```bash
# 显式地直接赋值
text_name="john"

# 用语句给变量赋值
for file in `ls /etc`
for file in $(ls /etc)

# 使用变量
# 在变量名前面加 $ 即可，变量名外面的花括号是可选的，加花括号是为了帮助解释器识别变量的边界。
echo $test_name
echo ${test_name}

for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done

# 只读变量
# 使用readonly命令可以将变量定义为只读变量，只读变量的值不能被改变
myUrl="http://www.google.com"
readonly myUrl
# 重新赋值会报错，./test.sh: line 21: myUrl: readonly variable
myUrl="http://www.example.com"

# 删除变量
unset test_name
echo "$test_name end"
```

注意：变量名和等号之间不能有空格。变量名命名需遵循：

- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
- 中间不能有空格，可以使用下划线（_）。
- 不能使用标点符号。
- 不能使用bash里的关键字（可用help命令查看保留关键字）。



#### 变量类型

运行shell时，会同时存在三种变量：

- **1) 局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
- **2) 环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
- **3) shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行



#### 字符串

字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。单双引号的区别跟PHP类似。

```bash
# 单引号
# 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
# 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。
str='this is a string'
echo "$str"

# 双引号
# 双引号里可以有变量
# 双引号里可以出现转义字符
new_name="Alice"
new_str="Hello, I'm \"${new_name}\"!"
echo $new_str # Hello, I'm "Alice"!

# 拼接字符串
stu_name="student"
# 使用双引号拼接
greeting="hello, "$stu_name" !"
greeting_1="hello, ${stu_name} !"
echo "$greeting" "$greeting_1" # hello, student ! hello, student !

# 使用单引号拼接
greeting='hello, '$stu_name' !'
greeting_1='hello, ${stu_name} !'
echo "$greeting" "$greeting_1" # hello, student ! hello, ${stu_name} !

# 获取字符串长度
echo ${#stu_name} # 7

# 提取字符串
echo "${greeting:2:8}" # llo, stu

# 查找子字符串
test_str="this is a good start"
# 查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)
echo `expr index "$string" io` # 3
```

#### 数组

bash支持一维数组（不支持多维数组），并且没有限定数组的大小。

类似于 C 语言，数组元素的下标由 0 开始编号。获取数组中的元素要利用下标，下标可以是整数或算术表达式，其值应大于或等于 0。

```bash
# 定义数组
# shell中，用括号来表示数组，数组元素用"空格"符号分割开。
arr=(val0 val1 val2)
arr2=(
	val0
	val1
	val2
)
# 单独定义数组各个元素，可以不使用连续的下标，而且下标的范围没有限制。
arr3[0]=val0;
arr3[1]=val1;
arr3[5]=val2;

# 读取数组
${arr[2]}
# 使用 @ 符号可以获取数组中的所有元素
echo "${arr[@]}"

# 获取数组长度
length=${#arr[@]}
# 或者
length=${#arr[*]}
# 取得数组单个元素的长度
lengthn=${#arr[n]}
```

#### 注释

```bash
# 单行注释
# 以 # 开头的行就是注释，会被解释器忽略。

# 多行注释
:<<EOF
注释内容
......
EOF

# EOF也可以使用其他符号
:<<'
注释内容
......
'
```



## 参考链接

[维基百科|Bash](https://zh.wikipedia.org/wiki/Bash)

[菜鸟教程|Shell教程](https://www.runoob.com/linux/linux-shell.html)

