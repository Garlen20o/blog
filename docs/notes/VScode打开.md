---
title: 'Windows&Mac配置右键Vscode菜单'
description: 'Windows&Mac配置右键Vscode菜单，记录一下，其他操作配置都类似了。'
date: 2023-10-10
lastUpdated: false
tags:
  - 配置
---


## Windows修改注册表跳转右键菜单

以vscode：

cmd -> regedit -> HKEY_CLASSES_ROOT\Directory\shell\vscode

1. vscode 目录下创建`command`（目录必须命名为command）
2. 修改 command 的数值为 VS Code 可执行程序路径 ---  "E:\vscode\Microsoft VS Code\Code.exe" "%1"
3. 图标：vscode 目录下新建 `Icon` 文件

[使用注册表编辑win10鼠标右键菜单，详细解释（右键文件夹、文件以及右键空白区域下三种情况）](https://blog.csdn.net/qq_34769162/article/details/117068877)



## 给Mac添加右键菜单「使用 VSCode 打开」的方法

聚焦搜索搜自动操作，创建一个快速操作，打开后在左侧面板选择“实用工具”；然后找到”运行 Shell 脚本“，把它拽到右侧面板里，在右侧“服务”收到选定选择文件夹，位置 Finder（访达）；“运行 Shell 脚本”的面板里，选择 Shell”/bin/bash“，传递输入“作为自变量”，然后修改 Shell 脚本

```zsh
for f in "$@"
do
     open -a "Visual Studio Code" "$f"
done
```

保存命名为：使用 VSCode 打开

可以看到保存在了：~Library/Services/用VScode打开.workflow


## 总结
其实可以拖动文件夹到图标打开，但有人习惯右键打开。
主要是配置右键菜单，以后其他操作配置都类似了。

- Windows：修改注册表
- Mac：自动操作

