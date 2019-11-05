#!/bin/bash

ls ./*.{jpg,sh}

# grep "hello" hello.txt | wc -l
# Consider using grep -c instead of grep|wc
grep -c "hello" hello.txt

# 变量
test_name="john"
echo $test_name
echo ${test_name}
for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done

# 只读变量
# 使用readonly命令可以将变量定义为只读变量，只读变量的值不能被改变
myUrl="http://www.google.com"
readonly myUrl
myUrl="http://www.example.com"

# 删除变量
unset test_name
echo "$test_name end"

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
echo "$new_str"

# 拼接字符串
stu_name="student"
# 使用双引号拼接
greeting="hello, "$stu_name" !"
greeting_1="hello, ${stu_name} !"
echo "$greeting" "$greeting_1"
# 使用单引号拼接
greeting='hello, '$stu_name' !'
greeting_1='hello, ${stu_name} !'
echo "$greeting" "$greeting_1"

# 获取字符串长度
echo "${#stu_name}"

# 提取字符串
echo "${greeting:2:8}"

# 查找子字符串
test_str="this is a good start"
echo `expr index "$test_str" io`
