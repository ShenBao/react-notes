# React-Redux

## 概念

Why?

- 避免 Redux 中 store 全局化，把 store 直接集成到 React 应用的顶层 props 里面，方便各个子组件能访问到顶层 props
- 解决手动监听 state 中数据改变: store.subscribe(render)

核心

- Provider 和 connect 方法

## 使用

Provider

- 将顶层组件包裹在 Provider 组件之中
- 所有组件就处于 react-redux 的控制之下了，store 作为参数放到 Provider 组件中，方便其中所有子组件调用
- 结构
  ```js
  <Provider store = {store}>
      <组件 />
  <Provider>
  ```
- 目的: 使得所有组件都能够访问到 Redux 中的数据

connect 方法

- 语法: `connect(mapStateToProps, mapDispatchToProps)(MyComponent)`
- mapStateToProps - 把 state 映射到 props 中去，意思就是把 Redux 中的数据映射到 React 中的 props 中去 - 映射
  `js const mapStateToProps = (state) => { return { todos: state.todos } }`
  - 渲染
    ```js
    this.props.todos;
    ```
  - 目的: 把 Redux 中的 state 变成 React 中的 props
- mapDispatchToProps - 把各种 dispatch 也变成了 props，在组件中可以直接使用 - 避免了手动去用 store.subscribe 订阅 render 函数以达到更新页面的目的
