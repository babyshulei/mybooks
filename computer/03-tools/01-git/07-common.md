# 常用

## 快捷功能

### 自动补全

输入Git命令时可以敲两次跳格键（Tab），就会看到列出所有匹配的可用命令建议

### Git命令别名

用 `git config` 为命令设置别名。

例子：`$ git config --global alias.co checkout`



## 代码更新

### 更新远程代码到本地

`git fetch origin`：更新远程代码到本地仓库

`git pull`：拉取远程代码，自动抓取数据并合并到当前分支



### 推送本地代码到远程

`git push [remote-name] [branch-name]`： 推送数据到远程仓库。



### 清理远程分支

`git fetch -p`

`git remote prune origin`



## 代码暂存

### git checkout

git checkout命令用于切换分支或恢复工作树文件。

`git checkout master`：切换到master分支。

`git checkout -- files`： 把文件从暂存区域复制到工作目录，用来丢弃本地修改。

`git checkout .`：把当前目录所有修改的文件，从HEAD中迁出并把它恢复成未修改时的样子

### git stash

- `git stash`
push新的储藏到堆栈中

- `git stash list`
查看现有储藏

- `git stash apply` 
应用最近的储藏
`git stash apply stash@{2}`
应用指定的stash@{2}

- `git stash pop`
pop并应用堆栈中最近的储藏

- `git stash drop`
移除最近的储藏
`git stash drop stash@{2}`
移除指定的stash@{2}



## 代码合并

### git merge

`git merge --abort`：退出合并

### git rebase

通过rebase，可以将commit分支置为最上层，commit记录更清晰。

`git rebase master`：rebase master分支

出现冲突：

```shell
解决冲突后，git add .
git rebase --continue
```



## 代码提交



https://www.jianshu.com/p/9f11d398111f



## 版本控制

### 撤销commit

`git reset HEAD~`

### 回退版本

```
$ git reset --hard HEAD^         回退到上个版本
$ git reset --hard HEAD~3        回退到前3次提交之前，以此类推，回退到n次提交之前
$ git reset --hard commit_id     退到/进到 指定commit的sha码
```



## 文件权限

`chmod` 修改文件权限














