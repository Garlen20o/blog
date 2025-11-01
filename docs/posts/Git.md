---
title: 'Git日常使用'
description: 'Git日常使用和常见命令'
date: 2022-07-14
lastUpdated: false
tags:
  - Git
---

## **Git**


下载项目

download zip   和本地文件夹无区别

或

 git clone url   会有.git隐藏文件，仓库里保存着各种以前版本的代码



### 找开源项目的一些途径

• https://github.com/trending/
• https://github.com/521xueweihan/HelloGitHub
• https://github.com/ruanyf/weekly
• https://www.zhihu.com/column/mm-fe

#### 特殊的查找资源小技巧-常用前缀后缀

• 找百科大全 awesome xxx
• 找例子 xxx sample
• 找空项目架子 xxx starter / xxx boilerplate
• 找教程  xxx tutorial



git核心--- **commit提交  repository仓库  branch分支**

克隆仓库：git clone git地址
初始化仓库：git init

添加文件到暂存区：git add -A
把暂存区的文件提交到仓库：git commit -m 提交信息
查看提交的历史记录：git log --stat

工作区回滚：git checkout filename
撤销最后一次提交：git reset HEAD^1
回退到某次commit git  reset （--hard） commitID
查看commit记录： git log (查看SHA )


以当前分支为基础新建分支：git checkout -b branchname
查看本地分支 git branch
查看远程分支 git branch -r
查看本地和远程分支 git branch -a
单纯地切换到某个分支：git checkout branchname
删掉特定的分支：git branch -D branchname
删除远程分支：git push origin --delete [branch_name]
合并分支：git merge branchname
放弃合并：git merge --abort



查看远程仓库 ： git　remote -v
删除当前远程仓库连接 ： git remote rm origin
添加远程仓库：git remote add origin (git@github.com:自己的GitHub账户名/仓库名)
本地仓库改名：git branch -M main
上传代码：git push -u origin main
(第一次push,-u代表将origin仓库的master分支设为默认push分支，以后执行git push 时默认push到该分支)
**从远程仓库获取最新分支信息**：
git remote update
1.拉取新分支到本地
2.git checkout -b 本地新分支名 origin/远程新分支名
这将在本地创建一个新分支,并把远程新分支的内容拉取到本地新分支。
3.设置本地分支与远程分支关联
git branch --set-upstream-to=origin/远程新分支名 本地新分支名

推送当前分支最新的提交到远程：git push
拉取远程分支最新的提交到本地：git pull



### **提交类型的规范**

```
feat: feature, 新功能
fix: 修复 bug
docs: 修改了文档
style: 格式，不影响代码运行的改动（空格、格式化、分号等）
refactor: 重构代码
perf: 性能优化的改动
test: 增加测试
build: 影响构建或外部依赖
chore: 辅助工具的变动，不包括源码和测试文件（如 ESLint 的配置等）
revert: 回到以前提交
```


配置SSH，免密

（1）检查一下用户名和邮箱是否配置在Git Bash Here工具下执行如下命令：

git config --global  --list

如果已配置，则会显示自己的用户名及邮箱。

（2）如未配置，则执行以下命令进行配置：

git config --global  user.name "用户名"
git config --global user.email "邮箱"

（3）执行以下命令生成秘钥：
ssh-keygen -t rsa -C "邮箱"

（4） id_rsa.pub文本复制到git

