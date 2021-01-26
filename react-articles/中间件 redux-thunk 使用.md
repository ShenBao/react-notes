# redux-thunk

redux-thunk 是一个 redux 的中间件，用来处理 redux 中的复杂逻辑，比如异步请求；

redux-thunk 中间件可以让 action 创建函数不仅仅返回一个 action 对象，也可以是返回一个函数；

```bash
yarn add redux-thunk
```

use:

```js
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);
export default store;
```

redux-dev-tools 和 redux-thunk 兼容: https://github.com/zalmoxisus/redux-devtools-extension
