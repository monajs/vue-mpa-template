## vue-map

### 项目启动
```bash
npm i
```

```bash
npm start --page=home
```

### 项目打包
```bash
npm run build
```

* 打包后文件存储在 `dist` 文件夹下


### 项目结构
```bash
.
├── build
│   ├── app.conf.js                 // 脚本配置文件
│   ├── webpack.base.js
│   ├── webpack.dev.js              // 本地启动服务脚本
│   ├── webpack.build.js            // 打包构建脚本
│   └── webpack.server.js           // webpack.server配置
├── config
│   └── hosts.json                  // 区分环境的配置
├── dist                            // 构建后的目录
└── src                             // 项目目录
    ├── mock                        // mock服务，对接了mock平台
    ├── base                        // 最基础的工具库
    │   └── ...
    ├── components                  // 公共组件库
    │   └── ...
    ├── config                      // 根据环境生成的配置
    │   └── ...
    ├── core                        // 公共工具包
    │   └── ...
    ├── server                      // 接口请求统一维护
    │   └── ...
    ├── style                       // 公共样式
    │   └── ...
    └── views                       // 项目页面

```


### eslint

[eslint-rules](https://eslint.org/docs/rules/)


### commitlint

#### Commit message格式:
`<type>: <subject>`
注意冒号后面有空格。

#### type
用于说明 commit 的类别，只允许使用下面7个标识。

* `feat`：新功能（feature）
* `fix`：修补bug
* `docs`：文档（documentation）
* `style`： 格式（不影响代码运行的变动）
* `refactor`：重构（即不是新增功能，也不是修改bug的代码变动）
* `test`：增加测试
* `chore`：构建过程或辅助工具的变动


### stylelint

[stylelint-rules](https://stylelint.io/user-guide/rules/)

[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/blob/9efccc5bb3e5faf57bf99b36b3bd7c8256b66a09/index.js) extends [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended/blob/master/index.js)

