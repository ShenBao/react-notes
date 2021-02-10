# useEffect 为什么不支持 async function ?

useEffect 如下这种写法，应该是非常常见的需求

```ts
useEffect(async () => {
  await getPoiInfo(); // 请求数据
}, []);
```

但是 React 本身并不支持这么做，理由是 effect function 应该返回一个销毁函数（effect：是指 return 返回的 cleanup 函数），如果 useEffect 第一个参数传入 async，返回值则变成了 Promise，会导致 react 在调用销毁函数的时候报错 ：function.apply is undefined。

如果你使用 Typescript, 则编译器会产生如下结果：

```ts
Argument of type '() => Promise<void>' is not assignable to parameter of type 'EffectCallback'.
```

**使用异步函数会使回调函数返回 Promise 而不是 cleanup 函数**

这就是为什么使用 Typescript 编译器会产生提示的原因。这种模式在 JS 中也不起作用，因为 react 不会等待 Promise

## React 为什么这么设计呢？

1. useEffect 的返回值是要在卸载组件时调用的，React 需要在 mount 的时候马上拿到这个值，不然就乱套了

2. useEffect() 可能有个潜在逻辑：第二次触发 useEffect 里的回调前，前一次触发的行为都执行完成，返回的清理函数也执行完成。这样逻辑才清楚。而如果是异步的，情况会变得很复杂，可能会很容易写出有 bug 的代码。

## 有两种改进的方法

1、简单改造的写法（不推荐）

```ts
useEffect(() => {
  // Create an scoped async function in the hook
  // 注意如果函数没有使用组件内的任何值，可以把它提到组件外面去定义
  // 下面代码可以提到外面，可以自由地在 effect 中使用，下面就不改啦
  async function asyncFunction() {
    await requestData();
    setData(data);
  }
  // Execute the created function directly
  anyNameFunction();
}, []); // 这里设置成[]数组，因为我们只想在挂载的时候运行它一次
```

或者 useEffect 中异步函数采用 IIFE 写法（ Immediately Invoked Function Expression 即立即调用的函数式表达式）

```ts
useEffect(() => {
  // Using an IIFE
  (async function anyNameFunction() {
    await requestData();
  })();
}, []);
```

2、把异步提取成单独函数或自定义 hook（推荐）

```ts
// 自定义hook
function useAsyncEffect(
  effect: () => Promise<void | (() => void)>,
  dependencies?: any[]
) {
  return useEffect(() => {
    const cleanupPromise = effect();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
}
// 使用
useAsyncEffect(async () => {
  const count = await fetchData();
  setCount(count);
}, [fetchData]);
```
