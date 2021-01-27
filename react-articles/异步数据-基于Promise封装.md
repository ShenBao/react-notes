# 异步数据-基于 Promise 封装

```bash
yarn add axios
```

ajax.js

```js
import axios from 'axios';

export default function ajax(url = '', params = {}, type = 'GET') {
  let promise;
  // 1. 返回promise对象
  return new Promise((resolve, reject) => {
    // 1.1 判断请求的方式
    if ('GET' === type.toUpperCase()) {
      // 1.2 拼接字符串
      let paramsStr = '';
      Object.keys(params).forEach((key) => {
        paramsStr += key + '=' + params[key] + '&';
      });
      // 1.3 过滤最后的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
      }
      // 1.4 拼接完整的路径
      url += '?' + paramsStr;
      // 1.5 发起get请求
      promise = axios.get(url);
    } else if ('POST' === type.toUpperCase()) {
      promise = axios.post(url, params);
    }
    // 1.6 返回结果
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
```

use:

```js
const BASE_URL = '/api';
const getTodoList = () => ajax(BASE_URL + '/todos');

getTodoList().then((res) => {
  if (res.success_code === 200) {
    const action = getAllItemAction(res.items);
    dispatch(action);
  }
});
```

通过 async 和 await 接收 Promise

```js
async _reqTodoList(){
    const result = await getTodoList();
    console.log(result);
    if(result.success_code === 200){
        const action = getAllItemAction(result.items);
        store.dispatch(action);
    }
}

this._reqTodoList();
```

cra 设置跨域代理：

```js
  "proxy": {
    "/api": {
      "target": "http://localhost:1688",
      "changeOrigin": true
    }
  },
```
