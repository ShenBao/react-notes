# React Hook+Egg

- https://coding.imooc.com/class/chapter/452.html#Anchor
- https://www.imooc.com/learn/1185
- https://github.com/simuty/FullStack-Project
- https://github.com/a86356/travel-business

## React.js

自定义 hook

- useTitleHook（设置页面 title）
- useHttpHook（发送 http 请求）
- useObserverHook（监听 dom 元素是否展示）
- useImgHook（图片懒加载）

自定义组件

- CreatePortal（根节点之外创建新节点）
- ErrorBoundary（捕获错误组件）
- LazyLoad（延迟加载组件）
- Modal（弹窗组件）
- MenuBar（底部导航组件）
- ShowLoading（列表底部 loading 组件）

第三方

- UmiJs
- think-react-store
- project-libs
- rc-form

应用

- createPortal；ErrorBoundary（错误边界）
- useState；useEffect；context api；suspense；lazy

## Egg.js

自定义中间件

- httpLog（日志）
- userExist（用户是否存）

自定义扩展

- Application（扩展应用）
- Helper（扩展帮助函数）
- Context（扩展上下文）
- Request（扩展请求）
- Response（扩展响应）

自定义插件

- egg-auth（验证用户）
- egg-info（系统信息）
- egg-notFound（接口不存在）

应用

- 路由（Router） ；控制器（Controller）；
- 服务（Service）；框架扩展；插件；定时任务；
- 多进程管理；Sequelize

## 如何造一个好轮子

需求层面

- 需求:
  ① 能够请求接口
   ② 能够返回请求的状态
  ③ 能够按需发送请求
  ④ 在函数组件内使用

- 直接请求接口
- 使用 JWT 验证用户
- 接口返回的错误信息

技术层面

- 自定义 hook — useHttpHook
  - 提取公共部分
  - header 中添加 token
  - 处理登录失效问题

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
