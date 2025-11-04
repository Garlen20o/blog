---
title: 'npm&pnpm学习'
description: ''
date: 2023-08-04
lastUpdated: false
tags:
  - Npm
  - 工程化
---


## npm



### npm install原理

1. npm install后，先根据npmrc 确定npm的配置（项目级---> 用户 ---> 全局 ）

2. 检查package.json和package-lock.json

   2.1 如果没有构建过：获取包信息，以广度优先的算法扁平化构建依赖树，

   2.2 如果构建了：检查两者版本是否一致：一致则到第三步。不一致根据package.json去下载资源+ 更新 lock的版本信息。

3. 检查缓存，没有则从镜像下载资源，添加缓存+更新缓存信息到package-lock.json。



理解：版本一致的话以lock的为准，不一致的话以package.json为准，并更新到lock。



package-lock.json 的作用

- package-lock.json 帮我们做了缓存，他会通过 `name + version + integrity` 信息生成一个唯一的key，这个key能找到对应的index-v5 下的缓存记录 也就是npm cache
- 不同环境锁定版本记录依赖树详细信息





### npm run 原理

读取package.json的script：如： vite命令

- 先从当前项目的node_modules/.bin去查找可执行命令vite
- 如果没找到就去全局的node_modules 去找可执行命令vite
- 如果还没找到就去环境变量查找
- 再找不到就进行报错



e.g. 可以看到vuecli，脚手架源码；以启动开发环境这条命令来看。

```json
"serve": "vue-cli-service serve"
```

```json
"bin": {
    "vue-cli-service": "bin/vue-cli-service.js"
  },
```

可以看到源码带有bin目录，下面有这段源码；

npm install 时遍历依赖结构时，应该是统一抽取这段bin目录到顶级目录node_modules下面.

```js
//vue-cli-service.js
...
const Service = require('../lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

...
service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
```

可以看到是有一个Service类的run方法执行开发环境。

```js
 //直接看run方法源码
async run (name, args = {}, rawArgv = []) {
    ...
    init(){
      // apply plugins. 这里初始化所有预设脚本
      this.plugins.forEach(({ id, apply }) => {
        if (this.pluginsToSkip.has(id)) return
        apply(new PluginAPI(id, this), this.projectOptions)
      })
    }

    ...

    args._ = args._ || []
    let command = this.commands[name]// **这里通过接受启动命令的参数来决定预设的脚本，开发环境是 ”serve“
    if (!command && name) {
      error(`command "${name}" does not exist.`)
      process.exit(1)
    }
    if (!command || args.help || args.h) {
      command = this.commands.help
    } else {
      args._.shift() // remove command itself
      rawArgv.shift()
    }
    const { fn } = command
    return fn(args, rawArgv)
  }
```

```js
// PluginAPI
registerCommand (name, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = null
    }
    this.service.commands[name] = { fn, opts: opts || {}}//
  }

// command/serve的脚本：可以看到注册了serve一个函数，就是上面的 fn
	module.exports = (api, options) => {
  	....
    api.registerCommand('serve'，{...},async function serve(){...}）
  }
```

1. 在 `Service` 类的构造函数中解析所有插件。
2. 在 `init` 方法中调用每个插件的 `apply` 方法，传入 `PluginAPI` 实例。
3. 在插件的 `apply` 方法中，通过 `api.registerCommand` 注册命令。
4. 注册的命令被存储在 `Service` 实例的 `this.commands` 对象中，供后续运行时调用。







1. **`pre<script-name>`**：会在 `<script-name>` 执行**之前**自动运行。
2. **`post<script-name>`**：会在 `<script-name>` 执行**之后**自动运行。



**问题：使用nvm切换node版本时，全局的node bin有不同，比如tsc。**

需要注意版本切换时，全局环境依赖。





### npx

在命令行中运行node包中的可执行文件，而不需要全局安装这些包

运行命令的规则和npm的顺序一致



### npm私服

```sh
npm install verdaccio -g
```





## Pnpm



下一代js工具包的管理工具，主要特点是

1. 使用链接的方式引用包，通过统一的存储位置 .pnpm-store存放，节省各种工具包存储占用。
2. 创建非扁平化的node_modules，解决依赖版本冲突，有效处理幽灵依赖问题。



是否彻底解决幽灵依赖？

幽灵依赖的根源是传统包管理器（npm/yarn classic）的 “扁平 node_modules” 结构：当依赖安装时，子依赖会被 “提升” 到项目根目录的 `node_modules` 中，导致项目可以直接引用这些未显式声明的子依赖。

- 手动配置 `hoist` 导致依赖提升（类似npm扁平化）
- pnpm 对 `peerDependencies` 的处理可能导致间接可访问性：当包 `A` 声明 `peerDependencies: { B: 'x.x.x' }` 时，`B` 需由项目或上层依赖提供，pnpm 会将 `B` 安装在能被 `A` 访问的位置（可能靠近根目录）。
- webpack等历史原因...



pnpm如何patch源码

- pnpm 会在安装依赖时读取 `.pnpmfile.cjs`，自动为指定包应用 `patches/` 目录中的补丁。
- 补丁仅作用于当前项目，其他项目如果没有这些补丁文件，会使用包的原始版本。
- 若后续需要更新补丁，只需重新执行 `pnpm patch <pkg@x.x.x>` → 修改 → `pnpm patch-commit <path>` 即可覆盖旧补丁。



Eslint 协助检验幽灵依赖

关键工具是 `eslint-plugin-import` 插件，其提供的 `no-extraneous-dependencies` 规则可实现这一检测： 核心规则：禁止使用未在 package.json 中声明的依赖
