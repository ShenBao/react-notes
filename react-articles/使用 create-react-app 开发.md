# 使用 create-react-app 开发

在企业中用 react 进行项目开发, 都是基于 react 的脚手架的, 我们称之为 SPA(Singer Page Application)应用;

在这些应用中, 我们会用到路由, 网络, 状态管理等等全家桶体系的知识; 也会进一步运用 ES6/7 语法, 构架工具, 架构, 设计模式等等。

## 什么是 React 脚手架

1）react 脚手架是用来帮助我们快速创建一个基于 react 库的模板项目, 主要包括三部分:

![cra-jj.png](./img/cra-jj.png)

2）使用脚手架开发的项目一定是要遵循模块化、组件化、工程化的；在 react 中提供了一个用于创建 react 项目的脚手架库: create-react-app。

3）通常项目的整体技术配置是：react + react-xxx + webpack + es6/7 + eslint。

```bash
npm install -g create-react-app

npm root -g

create-react-app react-app

npm start   # 运行工程，启动编译当前的React项目，并自动打开 http://localhost:3000/
npm build   # 生成生产环境的构建版本
npm test    # 测试工程
npm eject   # 单向操作不可逆，npm eun eject命令暴露项目的配置，可以自由配置项目所需的依赖
```
