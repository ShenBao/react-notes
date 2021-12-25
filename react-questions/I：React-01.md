# React-01

## 1. 什么是 React？

React 是一个**开源前端 JavaScript 库**，用于构建用户界面，尤其是单页应用程序。它用于处理 Web 和移动应用程序的视图层。React 是由 Facebook 的软件工程师 [乔丹·沃克](https://github.com/jordwalke) 创建的。React 于 2011 年在 Facebook 的 News Feed 上首次发布，2012 年首次在 Instagram 发布。

## 2. React 的主要特性是什么？

React 的主要特性是:

- 考虑到 DOM 操作内存开销大，React 使用**虚拟 DOM（VirtualDOM）** 替代了真实 DOM（RealDOM）
- 支持**服务端渲染**
- 遵循**单向**数据流或数据绑定
- 使用**可复用/可组合**的 UI 组件来进行视图开发

## 3. 什么是 JSX？

JSX 是 ECMAScript 的类似 XML 的语法扩展（缩写是 JavaScript XML）。实际上，它只是为 `React.createElement()` 函数提供语法糖，为我们提供了在 JavaScript 中使用类 HTML 模板语法的能力。

下面的示例中，`<h1>` 标签内的文本会作为 JavaScript 函数（`React.createElement()`）的返回值返回给 render 函数：

```jsx | pure
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{'Welcome to React world!'}</h1>
      </div>
    );
  }
}
```

## 4. 元素（Element）和组件（Component）的区别是什么？

元素是一个普通的对象，它描述了你希望以 DOM 节点或其他组件的形式出现在屏幕上的内容。元素可以在其 props 中包含其他 元素。创建一个 React 元素开销很小。一旦创建了元素，就永远不会对其进行修改。

React Element 的对象表示如下：

```js
const element = React.createElement('div', { id: 'login-btn' }, 'Login');
```

上面的 `React.createElement()` 函数会返回一个如下的对象：

```js
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

最终，它会使用 `ReactDOM.render()` 将元素渲染到 DOM：

```html
<div id="login-btn">Login</div>
```

而**组件**可以用几种不同的方式声明。它可以是带有 `render()` 方法的类。或者，你可以简单地将其定义为一个函数。无论哪种情况，它都将 props 作为输入，并返回 JSX 树作为输出：

```js
const Button = ({ onLogin }) => (
  <div id={'login-btn'} onClick={onLogin}>
    Login
  </div>
);
```

然后将 JSX 编译成 `React.createElement()` 函数：

```js
const Button = ({ onLogin }) =>
  React.createElement('div', { id: 'login-btn', onClick: onLogin }, 'Login');
```

## 5. 如何在 React 中创建组件？

这里有两种可以用方式来创建一个组件：

1. **函数组件：** 这是创建组件最简单的方式。它们是纯 JavaScript 函数，接受 props 对象作为第一个参数并返回 React 元素：

```jsx | pure
function Greeting({ message }) {
  return <h1>{`Hello, ${message}`}</h1>;
}
```

2. **类组件：** 你也可以使用 ES6 的 class 语法来定义一个组件。上面的函数组件可以被改写为：

```jsx | pure
class Greeting extends React.Component {
  render() {
    return <h1>{`Hello, ${this.props.message}`}</h1>;
  }
}
```

## 6. 何时选择类组件或函数组件

如果一个组件需要状态或者生命周期方法，则使用类组件，否则使用函数组件。

然而，从 React 16.8 引入 Hooks 后，你可以在函数组件中使用之前只在类组件中有的特性，比如状态和生命周期方法。

## 7. Pure Components 是什么？

`React.PureComponent` 与 `React.Component` 几乎完全相同，不同之处在于它为你处理了 `shouldComponentUpdate()` 方法。当 props 和 state 改变时，PureComponent 将对 props 和 state 进行浅表比较。另一方面，Component 初始不会将当前 props 和 state 与 nextPorps 和 nextState 进行比较。因此，每当调用 `shouldComponentUpdate` 时，组件将默认重新渲染。

## 8. React 中的 state 是什么？

组件的状态是一个对象，其中包含一些在组件的生命周期中可能会发生变化的信息。我们应该始终尝试使状态尽可能简单，并最大程度减少有状态组件的数量。

让我们来创建一个带有 message 状态的 user 组件：

```jsx | pure
class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Welcome to React world',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
```

![state](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8472c6438dfe48068002c5fdf1fbf098~tplv-k3u1fbpfcp-zoom-1.image)

状态类似于 Props，但它是私有的，并由组件完全控制。也就是说除了拥有和设置它的组件之外，其他任何组件都无法访问它。

## 9. React 中的 props 是什么

Props 是组件的输入。它们是单个值或包含一组值的对象，这些对象在创建时会使用类似于 HTML 标签属性的命名约定传递给组件。它们是从父组件传递到子组件的数据。

React 中 props 的主要目的是提供以下组件功能：

1. 将自定义数据传递到你的组件。
2. 触发状态更改。
3. 通过组件的 `render()` 方法中的 `this.props.reactProp` 使用。

举个例子，让我们创建一个带有 `reactProp` 属性的元素：

```jsx | pure
<Element reactProp={'1'} />
```

然后，这个 `reactProp`（或你想出的任何名称）成为附加到 React 的本地 props 对象的属性，该对象最初已经存在于使用 React 库创建的所有组件上。

```js
props.reactProp;
```

## 10. state 和 props 的区别是什么？

props 和 state 都是普通的 JavaScript 对象。尽管它们两者都拥有影响渲染输出的信息，但它们在组件层面的功能却有所不同。将 props 传递给组件类似于传递参数给函数，而 state 则类似于函数中声明的变量一样在组件内进行管理。

## 11. 为什么我们不能直接更新状态？

如果你尝试直接更新状态，React 组件并不会重新渲染。

```javascript
// 错误❌
this.state.message = 'Hello world';
```

正确的做法是使用 `setState()` 方法。它会计划一个对组件状态对象的更新。当状态更改时，组件通过重新渲染进行响应。

```javascript
// 正确✅
this.setState({ message: 'Hello World' });
```

> **注意：**你可以使用构造函数或者最新的 javascript class 字段声明语法直接将其分配给状态对象。

## 12. 回调函数作为 `setState()` 的参数的目的是什么？

setState 完成并重新渲染组件后，将调用回调函数。由于 setState() 是异步的，因此回调函数可用于任何后续操作。

> **注意：**我们建议使用生命周期方法而不是这个回调函数

```javascript
setState({ name: 'John' }, () =>
  console.log('The name has updated and component re-rendered'),
);
```

## 13. HTML 和 React 的事件处理有什么不同？

下面是一些 HTML 和 React 的事件处理的主要不同：

1. 在 HTML 中，事件名应该是全小写的：

```html
<button onclick="activateLasers()"></button>
```

然而在 React 中事件名遵循小驼峰 格式：

```jsx | pure
<button onClick={activateLasers}>
```

2. 在 HTML 中，你应该返回 `false` 来阻止默认行为：

```html
<a href="#" onclick='console.log("The link was clicked."); return false;' />
```

然后在 React 中你必须明确地调用 `preventDefault()`

```javascript
function handleClick(event) {
  event.preventDefault();
  console.log('The link was clicked.');
}
```

3. 在 HTML 中，你调用函数时需要加上 `()`：

然后在 React 中你不应该在函数名后带上 `()`。（比如前面示例中的 `activateLasers` 函数）

## 14. 如何在 JSX 回调函数中绑定方法或事件处理器

这里有 3 个方法做到这一点：

1. **在构造器中绑定：** 在 JavaScript 类中，默认情况下不绑定方法。同样的事情也适用于定义为类方法的 React 事件处理器。通常我们将它们绑定在构造函数中。

```javascript
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }
}
```

2. **类的公共字段语法：** 如果你不喜欢使用绑定的方式，也可以使用类的公共字段语法来正确绑定回调：

```jsx | pure
handleClick = () => {
  console.log('this is:', this);
};
```

```jsx | pure
<button onClick={this.handleClick}>{'Click me'}</button>
```

3. **箭头函数作为回调：** 你可以直接在回调中使用箭头函数

```jsx | pure
<button onClick={event => this.handleClick(event)}>{'Click me'}</button>
```

> **注意：** 如果回调作为 prop 传递给子组件，这些组件可能会触发额外的重渲染。在这些场景中，考虑到性能因素，最佳的选择是使用 `.bind()` 或类的公共字段语法。

## 15. 如何传递参数给事件处理器或回调？

你可以使用一个箭头函数来包裹一个事件处理器并传递参数：

```jsx | pure
<button onClick={() => this.handleClick(id)} />
```

这等价于调用 `.bind` 函数：

```jsx | pure
<button onClick={this.handleClick.bind(this, id)} />
```

除了这两种办法，你也可以传递参数给一个箭头函数：

```jsx | pure
<button onClick={this.handleClick(id)} />;
handleClick = id => () => {
  console.log('Hello, your ticket number is', id);
};
```

## 16. React 中的合成事件是什么？

`SyntheticEvent` 是基于浏览器本地事件的跨浏览器包装。它的 API 与浏览器的本地事件相同，包括 `stopPropagation()` 和 `preventDefault()`，但事件在所有浏览器中的表现均一致。

## 17. 什么是内联条件表达式？

你可以使用 JS 可用的 `if` 语句或三元表达式来有条件地渲染表达式。 除了这些方法之外，还可以通过将所有表达式括在花括号中然后在其后跟 JS 逻辑运算符 `&&` 来将任何表达式嵌入 JSX。

```jsx | pure
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don't have unread messages.</h2>
  );
}
```

## 18. 什么是 `key` prop？在元素数组中使用它的好处是什么？

`key` 是当你创建一个元素数组时应该包含的一个特殊的字符串属性。`key` prop 会帮助 React 识别具体哪一项被修改、添加或被移除。

通常，我们将数据中的 ID 用作 `key`：

```jsx | pure
const todoItems = todos.map(todo => <li key={todo.id}>{todo.text}</li>);
```

如果呈现的项目没有稳定的 ID，退而求其次，我们可以将 `index` 作为 `key`：

```jsx | pure
const todoItems = todos.map((todo, index) => (
  <li key={index.toString()}>{todo.text}</li>
));
```

**注意：**

1. 如果列表项可能改变，不建议使用 `indexes` 作为 `keys`。这可能会对性能产生负面影响，并可能导致组件状态出现问题。
2. 如果你将列表项提取为单独的组件，则在列表组件上应用 `keys` 而不是 `li` 标签。
3. 如果列表项中不存在 `key` prop，则控制台中将出现警告消息。

## 19. refs 有什么用？

refs 用于返回对该元素的引用。在大多数情况下，应避免使用它们，但是，当你需要直接访问 DOM 元素或组件的实例时，它们会很有用。

## 20. 如何创建 refs？

这里有两种方式

1.这是最近添加的方法。使用 `React.createRef()` 方法创建 refs，并通过 ref 属性附加到 React 元素。为了在整个组件中使用 refs，只需将 ref 分配给构造函数中的 instance 属性。

```jsx | pure
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

2. 无论 React 版本如何，你都可以使用 ref 回调方法。例如，搜索栏组件的输入元素的访问方式如下。

```jsx | pure
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.txtSearch = null;
    this.state = { term: '' };
    this.setInputSearchRef = e => {
      this.txtSearch = e;
    };
  }
  onInputChange(event) {
    this.setState({ term: this.txtSearch.value });
  }
  render() {
    return (
      <input
        value={this.state.term}
        onChange={this.onInputChange.bind(this)}
        ref={this.setInputSearchRef}
      />
    );
  }
}
```

你也可以使用闭包在函数组件中使用 refs。

> **注意：** 你也可以使用内联 ref 回调，即使这不是推荐的方法

## 21. refs 转发是什么？

_Ref 转发_ 是让某些组件可以使用它们接收的 `ref` 的特性，这些组件还可以进一步将其传递给子组件。

```jsx | pure
const ButtonElement = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
));

// Create ref to the DOM button:
const ref = React.createRef();
<ButtonElement ref={ref}>{'Forward Ref'}</ButtonElement>;
```

## 22. refs 回调和 `findDOMNode()` 哪个是首选项？

最好使用 refs 回调 而不是 `findDOMNode()` API。因为 `findDOMNode()` 将来会阻止对 React 的某些改进。

使用 `findDOMNode` 的“传统”方法：

```javascript
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }

  render() {
    return <div />;
  }
}
```

推荐的方式是：

```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.node = createRef();
  }
  componentDidMount() {
    this.node.current.scrollIntoView();
  }

  render() {
    return <div ref={this.node} />;
  }
}
```

## 23. 为什么 Strings Refs 被遗弃了？

如果你以前使用过 React，那么你可能会熟悉一个较旧的 API，其中的`ref` 属性是一个字符串，例如 `ref = {textInput'}`，并且 DOM 节点作为`this.refs.textInput` 访问。我们建议你不要这样做，因为 String 引用有以下问题，并且被认为是旧版的。字符串引用已经在 **React v16 中被删除**。

1. 他们迫使 React 跟踪当前正在执行的组件。这是有问题的，因为它使 React 模块成为有状态的，并因此在打包 React 模块时冲突而引起奇怪的错误。
2. 它们是“不可组合的” — 如果库在传递的子项上放置了引用，则用户不能在其上放置其他引用。回调引用完全可以组合。
3. 他们不能和静态分析工具配合（比如 Flow）。Flow 无法猜测出框架 `this.refs` 上出现的字符串引用及其类型（可能不同）。 回调引用对静态分析更友好。
4. 它无法像大多数人期望的那样使用“渲染回调”模式（例如）

   ```jsx | pure
   class MyComponent extends Component {
     renderRow = index => {
       // This won't work. Ref will get attached to DataTable rather than MyComponent:
       return <input ref={'input-' + index} />;

       // This would work though! Callback refs are awesome.
       return <input ref={input => (this['input-' + index] = input)} />;
     };

     render() {
       return <DataTable data={this.props.data} renderRow={this.renderRow} />;
     }
   }
   ```

## 24. 虚拟 DOM 是什么？

_Virtual DOM_（VDOM）是*Real DOM*的内存表示形式。 UI 的表示形式保留在内存中，并与“真实” DOM 同步。 这是在调用渲染函数和在屏幕上显示元素之间发生的一步。 这整个过程称为 [协调](https://zh-hans.reactjs.org/docs/reconciliation.html)。

## 25. 虚拟 DOM 原理

虚拟 DOM 工作原理只有三个简单的步骤。

1. 无论何时任何基础数据发生更改，整个 UI 都将以虚拟 DOM 表现形式重新呈现。

![vdom](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f8a99a43f7049feb7806a1bd54e5929~tplv-k3u1fbpfcp-zoom-1.image)

2. 然后，计算先前的 DOM 表现形式与新的 DOM 表现形式之间的差异。

![vdom2](https://github.com/sudheerj/reactjs-interview-questions/raw/master/images/vdom2.png)

3. 一旦完成计算，将只会更新内容真正改变的那部分真是 DOM。

![vdom3](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/461ba77627524f96b2bf270c1935b969~tplv-k3u1fbpfcp-zoom-1.image)

## 26. Shadow DOM 和 Virtual DOM 有什么区别？

Shadow DOM 是一种浏览器技术，主要用于确定 web components 中的变量和 CSS。Virtual DOM 是由浏览器 API 之上的 JavaScript 库实现的概念。

## 27. React Fiber 是什么?

Fiber 是 React v16 中新的 [协调](https://zh-hans.reactjs.org/docs/reconciliation.html) 引擎或核心算法的重新实现。React Fiber 的目标是提高其在动画、布局、手势、暂停、中止或重用工作的能力，以及为不同类型的更新分配优先级等方面的适用性和新的并发原语。

## 28. React Fiber 的主要设计目的是什么？

React Fiber 的目标是提高其对动画、布局和手势等领域的适用性。它的 headline 功能是**增量渲染**：能够将渲染工作拆分为多个块并将其分布到多个帧中。

## 29. 受控组件是什么？

在用户输入后能够控制表单中输入元素的组件被称为“受控组件”，比如每一个状态概念都将有一个相关的处理函数

例如下面的例子中，为了将名字转换为全大写，我们使用 `handleChange`：

```javascript
handleChange(event) {
   this.setState({value: event.target.value.toUpperCase()})
}
```

## 30. 非受控组件是什么？

受控组件是那些把状态维护在其内部的组件，当你想要获得当前值时需要使用 ref 查询 DOM。这有一点像传统的 HTML。

在下面的 `UserProfile` 组件中，`name` 输入被使用 `ref` 获取：

```jsx | pure
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {'Name:'}
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## 31. createElement 和 cloneElement 的区别是什么？

JSX 元素将被转换为 `React.createElement()` 函数以创建 React 元素，这些元素将用于 UI 的对象表示。而 `cloneElement` 用于克隆元素并将新的 `props` 传递给它。

**课后扩展：**

- [React 顶层 API](https://zh-hans.reactjs.org/docs/react-api.html)

## 32. React 中的状态提升是什么？

当多个组件需要共享相同的变化数据时，建议将共享状态提升到它们最接近的共同祖先。这意味着，如果两个子组件共享来自其父组件的相同数据，则将状态移到父组件，而不是在两个子组件中都保持内部状态。

## 33. 组件生命周期有哪些不同阶段？

组件生命周期具有三个不同的生命周期阶段。

1. **Mounting：** 组件已准备好安装在浏览器 DOM 中。这个阶段涵盖了生命周期方法 `constructor()`、`getDerivedStateFromProps()`、 `render()` 和 `componentDidMount()` 的初始化。
2. **Updating：** 在此阶段，组件以两种方式进行更新，即发送新 `props` 和从 `setState()` 或 `forceUpdate()` 更新状态。此阶段涵盖了`getDerivedStateFromProps()`，`shouldComponentUpdate()`，`render()` 、`getSnapshotBeforeUpdate()` 和 `componentDidUpdate()` 生命周期方法。
3. **Unmounting：** 在最后一个阶段，不再需要该组件并从浏览器 DOM 上卸载该组件。 这个阶段包括 `componentWillUnmount()` 生命周期方法。

值得一提的是，在将更改应用于 DOM 时，React 内部具有阶段性概念。 它们分开如下

1. **Render：** 该组件将渲染而没有任何副作用。这适用于 Pure 组件，在此阶段，React 可以暂停、中止或重新启动渲染。
2. **Pre-commit：** 在组件将更改实际应用于 DOM 之前，有一段时间可以让 React 通过 `getSnapshotBeforeUpdate()` 从 DOM 中读取内容。
3. **Commit：** React 与 DOM 一起工作并分别执行最终的生命周期：`componentDidMount()` 用于安装，`componentDidUpdate()` 用于更新，以及 `componentWillUnmount()` 用于卸载。

React 16.3+ (或者 [在线交互版本](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/))

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fac807b8490c4c11a9630a9f29e467d3~tplv-k3u1fbpfcp-zoom-1.image)

React 16.3 之前的版本：

![phases 16.2](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33a918a89bdd49c08e80732f5f6af367~tplv-k3u1fbpfcp-zoom-1.image)

## 34. React 生命周期有哪些？

React 16.3 以前的版本：

- **componentWillMount：** 在渲染之前执行，用于根组件中的应用程序级别配置。
- **componentDidMount：** 在首次渲染之后执行，所有 AJAX 请求，DOM 或状态更新以及设置事件侦听器都应在此执行。
- **componentWillReceiveProps：** 在特定属性更新以触发状态转换时执行。
- **shouldComponentUpdate：** 确定是否要更新组件。默认情况下，它返回 `true`。如果你确定在状态或属性更新后不需要渲染组件，则可以返回 `false` 值。这是提高性能的好地方，因为如果组件收到新的 `props`，它可以防止重新渲染。
- **componentWillUpdate：** 当有属性或状态改变被`shouldComponentUpdate()` 确认并返回 `true` 时，在重新渲染组件之前执行。
- **componentDidUpdate：** 通常，它用于响应属性或状态更改来更新 DOM。
- **componentWillUnmount：** 它将用于取消任何传出的网络请求，或删除与该组件关联的所有事件侦听器。

React 16.3+ 版本

- **getDerivedStateFromProps：** 在调用 `render()` 之前被调用，并且在每次渲染中都会被调用。对于需要派生状态的罕见用例，这是存在的。[如果您需要派生状态](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html) 值得一读。
- **componentDidMount：** 在首次渲染之后执行，并且所有 AJAX 请求、DOM 或状态更新以及设置事件侦听器都应在此发生。
- **shouldComponentUpdate：** 确定是否将更新组件。默认情况下，它返回 `true`。如果你确定在状态或属性更新后不需要渲染组件，则可以返回 `false`值。这是提高性能的好地方，因为如果组件接收到新的属性，它可以防止重新渲染。
- **getSnapshotBeforeUpdate：** 在将呈现的输出提交给 DOM 之前立即执行。此方法返回的任何值都将传递到 `componentDidUpdate()` 中。 这对于从 DOM（即滚动位置）捕获信息很有用。
- **componentDidUpdate：** 通常，它用于响应属性或状态更改来更新 DOM。如果 `shouldComponentUpdate()` 返回 `false`，则不会触发。
- **componentWillUnmount：** 它将用于取消任何传出的网络请求，或删除与该组件关联的所有事件侦听器。

## 35. 高阶组件是什么

高阶组件（HOC）是接收组件并返回新组件的函数。基本上，这是从 React 的组成性质衍生出来的一种模式。

我们称它们为纯组件，因为它们可以接受任何动态提供的子组件，但是它们不会修改或复制其输入组件中的任何行为。

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

HOC 可以用到很多场景中：

1. 代码重用，逻辑和引导程序抽象。
2. 渲染劫持。
3. 状态抽象和操纵。
4. props 操作。

## 36. 如何为 HOC 组件 创建 props 代理？

您可以使用属性代理模式添加或编辑传递给组件的属性，如下所示：

```jsx | pure
function HOC(WrappedComponent) {
  return class Test extends Component {
    render() {
      const newProps = {
        title: 'New Header',
        footer: false,
        showFeatureX: false,
        showFeatureY: true,
      };

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
```

**课后扩展：**

- [react 高阶组件的代理模式](https://juejin.cn/post/6844903641074106381)

## 37. context 是什么？

`Context` 提供了一种通过组件树传递数据的方法，而不需要一层一层手动传递属性。

例如，需要由许多组件在应用程序中访问经过身份验证的用户，本地设置首选项，UI 主题等。

```javascript
const { Provider, Consumer } = React.createContext(defaultValue);
```

## 38. 什么是 children 属性？

`Children` 是一个 prop（`this.props.children`），允许你将组件作为数据传递给其他组件，就像你使用的任何其他 prop 一样。放置在组件的开始标记和结束标记之间的组件树将作为 `children` 道具传递给该组件。

React API 中有许多方法可作为该属性。其中包括 `React.Children.map`、`React.Children.forEach`，`React.Children.count`、`React.Children.only` 和 `React.Children.toArray`。

children 的简单用法如下所示：

```jsx | pure
const MyDiv = React.createClass({
  render: function() {
    return <div>{this.props.children}</div>;
  },
});

ReactDOM.render(
  <MyDiv>
    <span>{'Hello'}</span>
    <span>{'World'}</span>
  </MyDiv>,
  node,
);
```

## 39. React 中如何写注释？

React JSX 中的注释和 JavaScript 的多行注释很像，但是用大括号括起来。

**单行注释：**

```jsx | pure
<div>
  {/* 这里是单行注释 */}
  {`Welcome ${user}, let's play React`}
</div>
```

**多行注释：**

```jsx | pure
<div>
  {/* Multi-line comments for more than
   one line */}
  {`Welcome ${user}, let's play React`}
</div>
```

## 40. 在 constructor 中给 `super` 函数传递 props 的目的是什么？

一个子类构造器在 `super()` 方法调用之前是无法拿到 `this` 引用的。这同样也适用于 ES6 中的 sub-classes。调用 `super()` 时传递 props 的主要是为了在子类的构造器中访问 `this.props`。

**传递 props：**

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props); // 打印 { name: 'John', age: 42 }
  }
}
```

**不传递 props：**

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super();

    console.log(this.props); // 打印 undefined

    // 但是 props 参数依然可以访问
    console.log(props); // 打印 { name: 'John', age: 42 }
  }

  render() {
    // 在 constructor 之外没有影响
    console.log(this.props); // 打印 { name: 'John', age: 42 }
  }
}
```

上面的代码片段揭示了 `this.props` 仅在构造函数中有所不同。在构造函数外部表现将是相同的。

更多信息可以参考 [为什么我们要写 super(props) ？](https://overreacted.io/zh-hans/why-do-we-write-super-props/)

大多数场景中，我们建议使用受控组件来代替表单组件。
