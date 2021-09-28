# react 17

React17+ React Hook + TS4 学习笔记

## TypeScript

- 接⼝ interface
- 泛型
- 类型守卫
- Utility Types
- TS + React 结合
- 类型
- conditional type
- 联合类型
- 交叉类型
- 类型推断
- 类型兼容

## React

- 基本知识
- 状态提升
- Context
- Ref 转发
- 复合组件
- cloneElement
- suspense

### React Hook

- useState
- useEffect
- useCallback
- useMemo
- useRef
- useContext
- useReducer
- 闭包原理与常⻅的坑
- hook 使⽤规则

### ⾃定义 Hook

- 异步处理
- HTTP 增删改查
- 状态管理
- 路由管理
- ⻚⾯标题管理
- auth header 管理
- URL 参数管理
- Loading 和 Error 管理

### 状态管理

- Url 参数与状态同步
- Context
- Redux Toolkit
- React Query 管理服务端状态
- 全局和本地状态管理划分原则

### 性能优化

- 代码分割
- useMemo & useCallback
- Profiler 监控性能
- Chrome Devtool / 性能上报

### ⾃动化测试

- Hook 测试
- 单元测试
- 集成测试
- 端对端测试

### 其它内容

- React Router 6
- JWT / CSS-in-JS
- husky / prettier
- commitlint

## 问题

搜索框发送请求过于频繁？

- 自定义 Hook useDebounce 减少发送频率

useDebounce 返回 any 类型不够精准？

- 用泛型判断传入类型

需要将用户信息在多个组件间共享？

- 用 useContext 挂载用户信息

页面初始加载没有 loading 体验不好？

- 用 React 实验特性：Suspense

异步请求代码繁琐处理 error 和 loading 复杂？

- 用 useAsync 自定义 Hook 抽象代码

忍不住用 any 类型？

- 善用类型推断和 unknown 类型

## 跨组件状态管理总结

小场面
- `状态提升` / 组合组件

缓存状态
- `react-query` / swr

客户端状态
- `url` / redux / `context`

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
