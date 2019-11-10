# Create React App

Create React App 是 FaceBook 的 React 团队官方出的一个构建 React 单页面应用的脚手架工具。它本身集成了 Webpack，并配置了一系列内置的 loader 和默认的 npm 的脚本，可以很轻松的实现零配置就可以快速开发 React 的应用。

- Github 地址：https://github.com/facebook/create-react-app
- 官方文档地址：https://create-react-app.dev

```bash
node -v
npm -v

npm install -g create-react-app

# 如果不能确保最新版本，可以先尝试卸载： npm uninstall -g create-react-app,然后再全局安装。
create-react-app react-app

# 创建 ts 版本的项目
create-react-app react-ts-app --scripts-version=react-scripts-ts
```

npm 命令

```bash
npm start   # 运行工程，启动编译当前的 React 项目，并自动打开 http://localhost:3000/
npm build   # 生成生产环境的构建版本
npm test    # 测试工程
npm eject   # 单向操作不可逆，npm eun eject 命令暴露项目的配置，可以自由配置项目所需的依赖
```

yarn 命令

```bash
yarn start
yarn test
yarn build
```

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
