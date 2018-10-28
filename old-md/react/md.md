# react

react中的组件
JSX语法
响应式设计思想
事件绑定
PropTypes
生命周期函数
虚拟Dom
redux流程
Styled-Components

## react

> React 是一个用于构建用户界面的JAVASCRIPT库

- 只关注UI
- 虚拟DOM特性
- 单向数据流

### 一个简单的React组件及其渲染

```js
import React, { Component } from 'react';
import { render } from 'react-dom';

// 定义组件
class SimpleComponent extends Component {
  render(){
    return <div> React，我们来了... </div>;
  }
}

// 组件渲染
render(<HelloMessage />, rootElement);
```

### 顶层API

react
```js
React.Children: Object
React.Component: ReactComponent(props, context, updater)
React.DOM: Object
React.PropTypes: Object
React.cloneElement: (element, props, children)
React.createClass: (spec)
React.createElement: (type, props, children)
React.createFactory: (type)
React.createMixin: (mixin)
React.isValidElement: (object)
```

Component
```js
this.context: Object
this.props: Object
this.refs: Object
this.state: Object
this.setState: Object
```

react-dom
```js
ReactDOM.findDOMNode: findDOMNode(componentOrElement)
ReactDOM.render: ()
ReactDOM.unmountComponentAtNode: (container)
```

react-dom-server
```js
ReactDOMServer.renderToString
ReactDOMServer.renderToStaticMarkup
```


### JSX 语法


`注释`

```js
import React, { Component } from 'react';

const name = 'yongfeng';
const MyComponent = () => {
	<div>
        {/*推荐单行注释符号*/}
        {
            /*
            推荐多行行注释符号
            推荐多行行注释符号
            */
        }
    </div>
};

// ps：切记不能用<!-- 注释 -->

export default MyComponent;
```

组件命名遵循驼峰命名，首字母大写

根元素个数：React只有一个限制， 组件只能渲染单个根节点。如果你想要返回多个节点，它们必须被包含在同一个节点里。

嵌入变量：`{}花括号内可以写JS逻辑，表达式和方法定义都可以`

`属性名不能和 js 关键字冲突`

例如：`className readOnly htmlfor`


### 数据流

`state setState`

传入的数据即为props，组件内部的状态控制即为state

```js
import React, { Component } from 'react';

class StateDemo extends Component {

  state = {
    secondsElapsed: 0
  }

  tick(){
    this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
    });
  }
}
```

`props`

通过 this.props 可以获取传递给该组件的属性值，还可以通过定义 getDefaultProps 来指定默认属性值（这是ES5的写法，ES6定义组件的默认props可以直接写props）

- `this.props.children`
- `this.props.map`
- `this.props.filter`

**props是调用组件的时候传递进去的数据，一般用于组件树数据传递**

```js
import React, { Component } from 'react';

class PropsDemo extends Component {
  props = {
    title: '这是默认的title属性值'
  }
  render(){
    console.log(this.props);

    return <b>{this.props.title}</b>
  }
}

export default PropsDemo;


// 组件调用方式
// <PropsDemo title="设置的标题" />
```

`propTypes`

通过指定 propTypes 可以校验props属性值的类型，校验可提升开发者体验，用于约定统一的接口规范。

```js
import React, { Component, PropTypes } from 'react';

class PropTypesDemo extends Component {
  render(){
    return <b>{this.props.title}</b>
  }
}

PropTypesDemo.defaultProps= {
  title: '我是默认的title'
}

PropTypesDemo.propTypes = {
  title: PropTypes.string.isRequired
}

export default PropTypesDemo;
```

### 组件的方法以及理解组件生命周期

```js
import React,{ Component } from 'react';

class Demo extends Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            //定义state
        }
    }
    componentWillMount () {
    }
    componentDidMount () {
    }
    componentWillReceiveProps (nextProps) {
    }
    shouldComponentUpdate (nextProps,nextState) {
    }
    componentWillUpdate (nextProps,nextState) {
    }
    componentDidUpdate (prevProps,prevState) {
    }
    render () {
        return (
            <div></div>
        )
    }
    componentWillUnmount () {
    }
}
export default Demo;
```
react16发布还新加了处理错误信息的生命周期 componentDidCatch

### DOM操作

- ReactDOM.findDOMNode
- this.refs.xxx

获取DOM后可以方便结合现有非 react 类库的使用，通过 ref/refs 可以取得组件实例，进而取得原生节点，不过尽量通过 state/props 更新组件，不要使用该功能去更新组件的DOM。

### 事件

可以通过设置原生 dom 组件的 onEventType 属性来监听 dom 事件，例如 onClick, onMouseDown，在加强组件内聚性的同时，避免了传统 html 的全局变量污染

注意：事件回调函数参数为标准化的事件对象，可以不用考虑

```js
class HandleEvent extends Component {

  handleClick = (event) => {
    this.setState({
        bool: true
    });
  }

  render() {
    return (
      <p onClick={this.handleClick}>
      </p>
    );
  }
}
```


### 组件

```js
import React, { Component } from 'react';

class ComponentA extends Component {
  render() {
    return <a href='#'>我是组件A<br/></a>
  }
}
```

Children 组合

自定义组件中可以通过 this.props.children 访问自定义组件的子节点
```js
import React, { Component } from 'react';

// 定义一个组件，通过React.Children 拿到组件里面的子元素
class ListComponent extends Component {
  render(){
    return <ul>
      {
        React.Children.map( this.props.children, function(c){
          return <li>{c}</li>;
        })
      }
    </ul>
  }
}

class UseChildrenComponent extends Component {
  render(){
    return (
      <ListComponent>
        <a href="#">Facebook</a>
        <a href="#">Google</a>
        <a href="#">SpaceX</a>
      </ListComponent>
    )
  }
}

export default UseChildrenComponent;
```


### 表单操作


### mixin








## react-router




## redux

- React-Redux
- Redux-thunk
- Redux-saga
- redux-immutable



