# React-02

## 1. 协调（reconciliation）是什么？

当一个组件的 props 或 state 发生变化时，React 通过比较新返回的元素和之前渲染的元素来决定是否有必要进行实际的 DOM 更新。当它们不相等时，React 将更新 DOM。这个过程被称为 _协调（reconciliation）_。

## 2. 如何用一个动态键名来设置状态？

如果你使用 ES6 或 Babel 转码器来转换你的 JSX 代码，那么你可以用计算属性命名完成。

```javascript
handleInputChange(event) {
  this.setState({ [event.target.id]: event.target.value })
}
```

## 3. 每次组件渲染时，函数被调用的常见错误是什么？

你需要确保在传递函数作为参数时，没有调用该函数。

```jsx | pure
render() {
  // 错误❌： handleClick 被调用而不是作为引用被传入
  return <button onClick={this.handleClick()}>{'Click Me'}</button>
}
```

取而代之的是传递函数本身，不加圆括号。

```jsx | pure
render() {
  // 正确：handleClick 是作为一个引用传递的!
  return <button onClick={this.handleClick}>{'Click Me'}</button>
}
```

## 4. lazy 函数是否支持命名导出？

不，目前 `React.lazy` 函数只支持默认出口。如果你想导入被命名导出的模块，你可以创建一个中间模块，将其作为默认出口。这也保证了摇树的工作，不会拉取未使用的组件。

让我们来看看一个导出多个命名组件的组件文件。

```javascript
// MoreComponents.js
export const SomeComponent = /* ... */;
export const UnusedComponent = /* ... */;
```

并在一个中间文件 `IntermediateComponent.js` 中重新导出 `MoreComponents.js` 组件

```javascript
// IntermediateComponent.js
export { SomeComponent as default } from './MoreComponents.js';
```

现在你可以使用下面的 lazy 函数导入该模块。

```javascript
import React, { lazy } from 'react';
const SomeComponent = lazy(() => import('./IntermediateComponent.js'));
```

## 5. 为什么 React 使用 `className` 而不是 `class` 属性？

`class` 是 JavaScript 的一个关键字，而 JSX 是 JavaScript 的一个扩展。这就是为什么 React 使用 `className` 而不是 `class` 的主要原因。传递一个字符串作为 `className` prop。

```jsx | pure
render() {
  return <span className={'menu navigation-menu'}>{'Menu'}</span>
}
```

## 6. 片段（fragments）是什么？

这是 React 中常见的模式，用于一个组件返回多个元素。片段让你可以对一个 children 的列表进行分组，而无需在 DOM 中添加额外的节点。

```jsx | pure
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  )
}
```

这里还有一个短语法可以用，但是很多工具不支持：

```jsx | pure
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  )
}
```

## 7. 为什么片段（fragments）比 div 容器要好？

1. 片段的速度更快一些，并且由于没有创建额外的 DOM 节点而使用更少的内存。这只有在非常大和深的树上才会体现出真正的好处。
2. 一些 CSS 机制，如 Flexbox 和 CSS Grid 有一个特殊的父子关系，在中间添加 div 会使其难以保持所需的布局。
3. DOM 检查器不那么杂乱。

## 8. 什么是 React 中的传递门（Portal）？

传递门是一种推荐的方式，可以将子节点渲染到父组件的 DOM 层次结构之外的 DOM 节点中。

```javascript
ReactDOM.createPortal(child, container);
```

第一个参数是任何可渲染的 React children，比如一个元素、字符串或片段。第二个参数是一个 DOM 元素。

## 9. 什么是无状态组件?

如果行为是独立于其状态的，那么它可以是一个无状态组件。你可以使用函数或类来创建无状态组件。但除非你需要在你的组件中使用生命周期钩子，否则你应该选择函数组件。如果你决定在这里使用函数组件，会有很多好处；它们易于编写、理解和测试，速度稍快，而且你可以完全避免使用 `this` 关键字。

## 10. 什么是状态组件?

如果一个组件的行为依赖于该组件的状态（state），那么它可以被称为有状态的组件。这些有状态的组件总是类组件，并且有一个在构造器（`constructor`）中被初始化的状态。

```javascript
class App extends Component {
  // 也可以使用类字段语法
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    // ...
  }
}
```

**React 16.8 更新：**

Hooks 让你在不写类的情况下使用状态和其他 React 功能。

等效的函数组件

```javascript
import React, {useState} from 'react';

const App = (props) => {
  const [count, setCount] = useState(0);

  return (
    // JSX
  )
}
```

## 11. 如何在 React 中对 props 进行验证？

当应用程序运行在开发模式时，React 会自动检查我们在组件上设置的所有 props，以确保它们具有正确的类型。如果类型不正确，React 会在控制台生成警告信息。由于对性能的影响，它在生产模式中被禁用。必需 props 是用 `isRequired` 定义的。

预定义的 props 类型集合。

1. `PropTypes.number`
2. `PropTypes.string`
3. `PropTypes.array`
4. `PropTypes.object`
5. `PropTypes.func`
6. `PropTypes.node`
7. `PropTypes.element`
8. `PropTypes.bool`
9. `PropTypes.symbol`
10. `PropTypes.any`

我们可以为 `User` 组件定义 `propTypes`，如下所示。

```jsx | pure
import React from 'react';
import PropTypes from 'prop-types';

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  };

  render() {
    return (
      <>
        <h1>{`Welcome, ${this.props.name}`}</h1>
        <h2>{`Age, ${this.props.age}`}</h2>
      </>
    );
  }
}
```

> 注意：在 React v15.5 中，`PropTypes` 被从 `React.PropTypes` 移到 `prop-types`库中。

等效的函数式组件：

```jsx | pure
import React from 'react';
import PropTypes from 'prop-types';

function User() {
  return (
    <>
      <h1>{`Welcome, ${this.props.name}`}</h1>
      <h2>{`Age, ${this.props.age}`}</h2>
    </>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
```

## 12. React 的优势是什么？

以下是 React的 主要优势。

1. 通过虚拟 DOM 提高应用程序的性能。
2. JSX 使代码易于阅读和编写。
3. 它在客户端和服务器端都能进行渲染（SSR）。
4. 易于与框架（Angular, Backbone）集成，因为它只是一个视图库。
5. 使用 Jest 等工具容易编写单元和集成测试。

## 13. React 的局限性是什么？

除了优点之外，React 也有一些限制。

1. React 只是一个视图库，不是一个完整的框架。
2. 对于刚接触网络开发的初学者来说，有一个学习曲线。
3. 将 React 整合到传统的 MVC 框架中需要一些额外的配置。
4. 代码的复杂性随着内联模板和 JSX 的增加而增加。
5. 太多的小组件导致了过度工程化或模板化。

## 14. 什么是 React v16 中的错误边界（Error Boundary）？

错误边界是指在其子组件树的任何地方捕获 JavaScript 错误的组件，记录这些错误，并显示一个后备 UI ，而不是崩溃的组件树。

如果一个类组件定义了一个新的生命周期方法 `componentDidCatch(error, info)` 或 `static getDerivedStateFromError()` ，它就成为一个错误边界。

```jsx | pure
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // 你也可以把错误记录到一个错误报告服务中去
    logErrorToMyService(error, info)。
  }

  static getDerivedStateFromError(error) {
    // 更新状态，以便下次渲染时显示回退的用户界面。
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的回退用户界面
      return <h1>{'Something went wrong.'}</h1>;
    }
    return this.props.children。
  }
}
```

之后把它作为一个普通的组件使用。

```jsx | pure
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

## 15. React v15 中是如何处理错误边界的？

React v15 使用 `unstable_handleError` 方法为错误边界提供了非常基本的支持。在 React v16 中，它已经被重新命名为 `componentDidCatch`。

## 16. 静态类型检查的推荐方式是什么？

通常我们使用 PropTypes 库（`React.PropTypes` 从 React v15.5 开始转移到 `prop-types` 包）来进行 React 应用中的类型检查。对于大型代码库，建议使用静态类型检查器，如 Flow 或 TypeScript，在编译时进行类型检查并提供自动补全功能。

## 17. `react-dom` 包有什么用？

`react-dom` 包提供了 DOM 特定的方法，可以在你的应用程序的顶层使用。大多数组件不需要使用此模块。这个包的一些方法是：

1. `render()`
2. `hydrate()`
3. `unmountComponentAtNode()`
4. `findDOMNode()`
5. `createPortal()`

## 18. `react-dom` 的 render 方法的目的是什么？

此方法用于将 React 元素渲染到提供的容器中的 DOM 中，并返回对组件的引用。如果 React 元素之前已渲染到容器中，它将对其执行更新，并且仅在必要时更改 DOM 以反映最新更改。

```jsx | pure
ReactDOM.render(element, container[, callback])
```

如果提供了可选的回调，它将在组件渲染或更新后执行。

## 19. 什么是 ReactDOMServer？

`ReactDOMServer` 对象使你能够将组件呈现为静态标记（通常用于节点服务器）。该对象主要用于服务器端渲染（SSR）。以下方法可用于服务器和浏览器环境：

1. `renderToString()`
2. `renderToStaticMarkup()`

例如，你通常运行基于 Node 的 Web 服务器（如 Express、Hapi 或 Koa），然后调用 `renderToString` 将根组件渲染为字符串，然后将其作为响应发送。

```javascript
// 使用 Express
import { renderToString } from 'react-dom/server';
import MyPage from './MyPage';

app.get('/', (req, res) => {
  res.write('<!DOCTYPE html><html><head><title>My Page</title></head><body>');
  res.write('<div id="content">');
  res.write(renderToString(<MyPage />));
  res.write('</div></body></html>');
  res.end();
});
```

## 20. 如何在 React 中使用 innerHTML？

`dangerouslySetInnerHTML` 属性是 React 在浏览器 DOM 中使用 `innerHTML` 的替代品。就像 `innerHTML` 一样，考虑到跨站点脚本 (XSS) 攻击，使用此属性是有风险的。你只需要传递一个 `__html` 对象作为键和 HTML 文本作为值。

在这个例子中，MyComponent 使用 `dangerouslySetInnerHTML` 属性来设置 HTML 标记：

```jsx | pure
function createMarkup() {
  return { __html: 'First &middot; Second' };
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

## 21. 如何在 React 使用样式？

`style` 属性接受一个小驼峰命名法属性的 JavaScript 对象，而不是一个 CSS 字符串。这与 DOM 风格的 JavaScript 属性一致，更有效率，并能防止 XSS 安全漏洞。

```jsx | pure
const divStyle = {
  color: 'blue',
  backgroundImage: `url(${imgUrl})`,
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

样式键名是符合驼峰命名法的，以便与在 JavaScript 中访问 DOM 节点的属性相一致（例如 `node.style.backgroundImage`）。

## 22. 事件在 React 中有何不同？

Handling events in React elements has some syntactic differences:

在 React 元素上处理事件有一些语法上的不同：

1. React 事件处理程序使用小驼峰命名，而不是小写。
2. 使用 JSX，你传递一个函数作为事件处理程序，而不是一个字符串。

## 23. 如果你在构造函数中使用 `setState()`，会发生什么？

当你使用 `setState()` 时，除了分配给对象的状态外，React 还重新渲染组件和它的所有子组件。你会得到这样的错误：只能更新一个已挂载或正在挂载的组件。所以我们需要使用 `this.state` 来初始化构造函数中的变量。

## 24. 索引作为键的影响是什么？

键应该是稳定的、可预测的和唯一的，这样 React 就可以跟踪元素。

在下面的代码片段中，每个元素的键都是基于索引的，而不是与被表示的数据相联系。这限制了 React 可以做的优化。

```jsx | pure
{
  todos.map((todo, index) => <Todo {...todo} key={index} />);
}
```

如果你使用元素数据作为唯一键，假设 `todo.id` 在这个列表中是唯一的，并且是稳定的，React 将能够对元素进行重新排序，而不需要像以前那样重新计算它们。

```jsx | pure
{
  todos.map(todo => <Todo {...todo} key={todo.id} />);
}
```

## 25. 在 `componentWillMount()` 方法中使用 `setState` 真的好吗?

是的，在 `componentWillMount()` 方法中使用 `setState()` 是安全的。但同时，建议避免在`componentWillMount()` 生命周期方法中进行异步初始化。`componentWillMount()` 在挂载发生前立即被调用。它在 `render()` 之前被调用，因此在这个方法中设置状态不会触发重新渲染。避免在这个方法中引入任何副作用或订阅。我们需要确保组件初始化的异步调用发生在 `componentDidMount()` 而不是 `componentWillMount()`。

```jsx | pure
componentDidMount() {
  axios.get(`api/todos`).then((result) => {
    this.setState({
      messages: [...result.data]
    })
  })
}
```

## 26. 如果你在初始状态下使用 props，会发生什么？

如果组件上的 props 被改变而组件没有被刷新，新的 props 值将永远不会被显示，因为构造函数永远不会更新组件的当前状态。来自 props 的状态初始化只在组件第一次被创建时运行。

下面这个组件就不会显示更新的输入值。

```jsx | pure
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      inputValue: this.props.inputValue,
    };
  }

  render() {
    return <div>{this.state.inputValue}</div>;
  }
}
```

在 render 方法中使用 props 将更新数值。

```jsx | pure
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: [],
    };
  }

  render() {
    return <div>{this.props.inputValue}</div>;
  }
}
```

## 27. 你如何有条件地渲染组件？

在某些情况下，你想根据一些状态来渲染不同的组件。JSX 不渲染 `false` 或 `undefined`，所以你可以使用条件性短路来渲染你的组件的某一部分，只有当某个条件为真时。

```jsx | pure
const MyComponent = ({ name, address }) => (
  <div>
    <h2>{name}</h2>
    {address && <p>{address}</p>}
  </div>
);
```

如果你需要一个 `if-else` 条件，则使用三元运算符。

```jsx | pure
const MyComponent = ({ name, address }) => (
  <div>
    <h2>{name}</h2>
    {address ? <p>{address}</p> : <p>{'Address is not available'}</p>}
  </div>
);
```

## 28. 为什么我们在 DOM 元素上传递 props 时需要谨慎？

当我们传递 props 时，我们会遇到添加未知的 HTML 属性的风险，这是一个不好的做法。相反，我们可以使用带有 `...rest` 操作符的 prop 解构，所以它将只添加需要的 prop。

比如说。

```jsx | pure
const ComponentA = () => (
  <ComponentB isDisplay={true} className={'componentStyle'} />
);

const ComponentB = ({ isDisplay, ...domProps }) => (
  <div {...domProps}>{'ComponentB'}</div>
);
```

## 29. 如何在 React 中使用装饰器？

你可以对你的类组件进行装饰，这与将组件传入一个函数是一样的。**装饰器**是修改组件功能的灵活和可读的方式。

```jsx | pure
@setTitle('Profile')
class Profile extends React.Component {
  //....
}

/*
title 是一个字符串，将被设置为文档标题。WrappedComponent 是我们的装饰器在以下情况下会收到的东西直接放在一个组件类上面时，我们的装饰器会收到这样的信息，如上面的例子所示
*/
const setTitle = title => WrappedComponent => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
```

**注意：** 装饰器是一个没有进入 ES7 的功能，但目前是一个第二阶段的建议。

## 30. 如何 memo 化一个组件？

有一些可用的缓存库，可以用于函数组件。

例如，`moize` 库可以在另一个组件中对组件进行 memo 化。

```jsx | pure
import moize from 'moize';
import Component from './components/Component'; // 本模块导出一个非 memo 组件

const MemoizedFoo = moize.react(Component);

const Consumer = () => {
  <div>
    {'I will memoize the following entry:'}
    <MemoizedFoo />
  </div>;
};
```

**更新：** 从 React v16.6.0 开始，我们有一个 `React.memo`。它提供了一个更高阶的组件，除非 props 发生变化，否则会将组件缓存。要使用它，只需在使用前用 `React.memo` 包住组件。

```js
const MemoComponent = React.memo(function MemoComponent(props) {
  /* render using props */
});
// 或者
export default React.memo(MyFunctionComponent);
```

## 31. 你如何实现服务器端渲染或SSR？

React 已经具备了在 Nod e服务器上处理渲染的能力。有一个特殊版本的 DOM 渲染器，它与客户端的模式相同。

```jsx | pure
import ReactDOMServer from 'react-dom/server';
import App from './App';

ReactDOMServer.renderToString(<App />)。
```

这个方法将把常规的 HTML 输出为一个字符串，然后可以作为服务器响应的一部分放在页面主体内。在客户端，React 检测到预渲染的内容，并无缝地衔接该内容。

## 32. 如何在 React 中启用生产模式？

你应该使用 Webpack 的 `DefinePlugin` 方法来设置 `NODE_ENV` 为 `production`，通过它来剥离诸如 propType 验证和额外警告的东西。除此之外，如果你对代码进行最小化处理，例如 Uglify 的无效代码消除法，剥离出只用于开发的代码和注释，这将极大地减少你的包的大小。

## 33. 什么是 CRA 以及它的好处？

`create-react-app` CLI 工具允许你快速创建和运行React应用程序，无需配置步骤。

让我们使用 CRA 创建 Todo 应用程序。

```console
# 安装
$ npm install -g create-react-app

# 创建新项目
$ create-react-app todo-app
$ cd todo-app

# 构建、测试、运行
$ npm run build
$ npm run test
$ npm start
```

它包括我们建立一个 React 应用程序所需要的一切。

1. 支持 React、JSX、ES6 和 Flow 语法。
2. 超越 ES6 的语言额外功能，如对象传播操作者。
3. 自动前缀的 CSS，所以你不需要 `-webkit-` 或其他前缀。
4. 一个快速的交互式单元测试运行器，内置支持覆盖率报告。
5. 一个实时的开发服务器，对常见的错误发出警告。
6. 一个构建脚本，用于捆绑 JS、CSS 和图片，并提供哈希和源码图。

## 34. 安装中的生命周期方法的顺序是什么？

当一个组件的实例被创建并插入到 DOM 中时，生命周期方法按以下顺序被调用。

1. `constructor()`
2. `static getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()`

## 35. 在 React v16 中，有哪些生命周期方法将被废弃？

以下生命周期方法将是不安全的编码做法，在异步渲染中会出现更多问题。

1. `componentWillMount()`
2. `componentWillReceiveProps()`
3. `componentWillUpdate()`

从 React v16.3 开始，这些方法被别名为 `UNSAFE_` 前缀，未加前缀的版本将在 React v17 中被移除。

## 36. `getDerivedStateFromProps()` 生命周期方法的目的是什么？

新的静态的 `getDerivedStateFromProps()` 生命周期方法在一个组件实例化后以及重新渲染前被调用。它可以返回一个对象来更新状态，也可以返回 `null` 来表示新的 props 不需要任何状态更新。

```javascript
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // ...
  }
}
```

这个生命周期方法与 `componentDidUpdate()` 一起涵盖了 `componentWillReceiveProps()` 的所有用例。

## 37. `getSnapshotBeforeUpdate()` 生命周期方法的目的是什么？

新的 `getSnapshotBeforeUpdate()` 生命周期方法会在 DOM 更新前被调用。这个方法的返回值将作为第三个参数传递给 `componentDidUpdate()`。

```javascript
class MyComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
}
```

这个生命周期方法与 `componentDidUpdate()` 一起涵盖了 `componentWillUpdate()` 的所有用例。

## 38. Hooks 是否取代了渲染 props 和高阶组件？

渲染 props 和高阶组件都只渲染一个 children，但在大多数情况下，Hooks 是一种更简单的方式，通过减少树中的嵌套来达到这个目的。

## 39. 推荐用什么方式来命名组件？

建议通过引用来命名组件，而不是使用 `displayName`。

使用 `displayName` 来命名组件。

```javascript
export default React.createClass({
  displayName: 'TodoApp',
  // ...
});
```

推荐的方法。

```javascript
export default class TodoApp extends React.Component {
  // ...
}
```

## 40. 建议在组件类中方法的排序是什么？

建议从安装到渲染阶段的方法的排序。

1. `static` 方法
2. `constructor()`
3. `getChildContext()`
4. `componentWillMount()`
5. `componentDidMount()`
6. `componentWillReceiveProps()`
7. `shouldComponentUpdate()`
8. `componentWillUpdate()`
9. `componentDidUpdate()`
10. `componentWillUnmount()`
11. 点击处理程序或事件处理程序，如 `onClickSubmit()` 或 `onChangeDescription()`
12. 渲染的 getter 方法，如 `getSelectReason()` 或 `getFooterContent()`
13. 可选的渲染方法，如 `renderNavigation()` 或 `renderProfilePicture()`
14. render()
