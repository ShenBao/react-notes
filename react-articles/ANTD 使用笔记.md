## Ant Design

## 概念

官网

- https://ant.design/index-cn
- https://github.com/ant-design/ant-design/

作用

- 开发和服务于企业级后台产品
- 提供丰富、高质量的组件
  - 按钮
  - 图标
  - 布局系统
  - 分页
  - 表格
  - 表单
  - 日期选择器
  - 树选择
  - 进度条
  - 。。。。
- 开箱即用
- 使用 TypeScript 构建，提供完整的类型定义文件
- 全链路开发和设计工具体系
- 可以理解成为 react 定制的 UI 组件库

## 使用

安装

```bash
npm install antd --save    /   yarn add antd     /  cnpm install antd --save
```

引入样式文件:
在项目的 css 文件中引入 Antd 的 css

```js
@import '~antd/dist/antd.css';
```

引入 UI 组件

## 按需加载

原因

- 虽然组件成功运行起来了，但实际上加载了全部的 antd 组件的样式，会影响前端的性能

方法

1. 借助 react-app-rewired 进行自定义配置

步骤

1. 引入 react-app-rewired 并修改 package.json 里的启动配置
   ```bash
   yarn add react-app-rewired customize-cra
   ```
2. 配置 package.json 文件
3. 在项目根目录创建一个 config-overrides.js 用于修改默认配置
4. 安装用于按需加载组件代码和样式的 babel 插件
   ```bash
   yarn add babel-plugin-import
   ```
