# Jest 异步处理 & Mock

## async 异步请求处理

一般项目代码中会有不少异步 ajax 请求，例如测试下面 async.js 中的代码

```js
import axios from 'axios';
// 传入 callback 函数进行处理
export const fetchData1 = (fn) => {
  axios.get('http://www.csxiaoyao.com/api/data.json').then((response) => {
    fn(response.data);
  });
};
// 返回 promise 交给后续程序处理
export const fetchData2 = () => {
  return axios.get('http://www.csxiaoyao.com/api/data.json');
};
```

新建测试用例文件 async.test.js 进行测试

```js
import {fetchData1, fetchData2} from './async';
// ...
```

【1】callback 中处理，需要手动结束 done，否则可能走不到 callback

```js
test('fetchData1 返回结果为 { success: true }', (done) => {
  fetchData1((data) => {
    expect(data).toEqual({success: true});
    // 如果不写 done()，当接口404会导致用例不执行
    done();
  });
});
```

【2】返回 promise

处理成功，需要指定返回 expect 数量，否则可能直接走失败分支跳过

```js
test('fetchData2 返回结果为 { success: true }', () => {
  // 指定执行返回的 expect 数量
  expect.assertions(1);
  return fetchData2().then((response) => {
    expect(response.data).toEqual({success: true});
  });
});
```

处理失败，需要指定返回 expect 数量，否则可能直接走成功分支跳过

```js
test('fetchData2 返回结果为 404', () => {
  // 当接口不为404，则不会走catch
  expect.assertions(1);
  return fetchData2().catch((e) => {
    expect(e.toString().indexOf('404') > 1).toBe(true);
  });
});
```

【3】promise - resolves / rejects 处理方式

promise - resolves

```js
test('fetchData2 返回结果为 { success: true }', () => {
  return expect(fetchData2()).resolves.toMatchObject({
    data: {success: true},
  });
});
```

promise-rejects

```js
test('fetchData2 返回结果为 404', () => {
  return expect(fetchData2()).rejects.toThrow();
});
```

【4】promise-async|await 处理方式

成功处理方式 1

```js
test('fetchData2 返回结果为 { success: true }', async () => {
  await expect(fetchData2()).resolves.toMatchObject({
    data: {success: true},
  });
});
```

成功处理方式 2

```js
test('fetchData2 返回结果为 { success: true }', async () => {
  const response = await fetchData2();
  expect(response.data).toEqual({success: true});
});
```

失败处理方式 1

```js
test('fetchData2 返回结果为 404', async () => {
  await expect(fetchData2()).rejects.toThrow();
});
```

失败处理方式 2

```js
test('fetchData2 返回结果为 404', async () => {
  expect.assertions(1);
  try {
    await fetchData2();
  } catch (e) {
    expect(e.toString().indexOf('404') > -1).toBe(true);
  }
});
```

## mock - ajax 模拟 ajax 请求

接口的正确性一般由后端自动化测试保证，前端自动化测试，一般需要 mock 触发的 ajax 请求，例如测试 mock.js 中接口调用

```js
export const getData = () => {
  return axios.get('/api').then((res) => res.data);
};
```

测试用例，jest.mock('axios') 模拟 axios 请求

```js
import {getData} from './mock';
import axios from 'axios';
// jest 模拟 axios 请求
jest.mock('axios');
test('测试 axios getData', async () => {
  // 模拟函数的返回，getData 不会真正发起 axios 请求
  axios.get.mockResolvedValueOnce({data: 'hello'});
  axios.get.mockResolvedValueOnce({data: 'world'});
  // axios.get.mockResolvedValue({ data: 'hello' })
  await getData().then((data) => {
    expect(data).toBe('hello');
  });
  await getData().then((data) => {
    expect(data).toBe('world');
  });
});
```

## **mocks** 文件替换 ajax

如果需要测试 mock.js 中 ajax 请求

```js
export const fetchData = () => {
  return axios.get('/api').then((res) => res.data); // '(function(){return 123})()'
};
```

除了上述方法指定 mock 函数和返回结果，还可以使用 mock 文件替换对应方法，让异步变同步，需要在 **mocks** 文件夹下建立同名文件，如 **mocks**/mock.js

```js
export const fetchData = () => {
  return new Promise((resolved, reject) => {
    resolved('(function(){return 123})()');
  });
};
```

测试用例，对于在 mock.js 但不在 **mocks**/mock.js 中的方法则不会被覆盖

```js
jest.mock('./mock');
// jest.unmock('./08-mock2'); // 取消模拟
import {fetchData} from './mock';
test('测试 fetchData', () => {
  return fetchData().then((data) => {
    expect(eval(data)).toEqual(123);
  });
});
```

还可以设置自动 mock，jest.config.js 中打开 automock: true，程序会自动在 mocks 文件夹下找同名文件，省去了手动调用 jest.mock('./mock');

## mock - function 模拟函数调用

对于单元测试，无需关心外部传入的函数的实现，使用 jest.fn 生成一个 mock 函数，可以捕获函数的调用和返回结果，以及 this 和调用顺序，例如测试 mock.js

```js
export const runCallback = (callback) => {
  callback(123);
};
```

测试用例

```js
import {runCallback} from './mock';
test('测试 callback', () => {
  // 【1】使用 jest 生成一个 mock 函数 func1，用来捕获函数调用
  const func1 = jest.fn();

  // 【2】模拟返回数据
  // 1. mockReturnValue / mockReturnValueOnce
  // func1.mockReturnValue(10)
  func1.mockReturnValueOnce(456).mockReturnValueOnce(789);

  // 2. 回调函数
  const func2 = jest.fn(() => {
    return 456;
  });
  // 等价于
  func2.mockImplementation(() => {
    return 456;
  });
  // func2.mockImplementationOnce(() => { return this })
  // func2.mockReturnThis

  // 【3】执行3次func1，1次func2
  runCallback(func1);
  runCallback(func1);
  runCallback(func1);
  runCallback(func2);

  // 【4】断言
  // 被执行
  expect(func1).toBeCalled();
  // 调用次数
  expect(func1.mock.calls.length).toBe(3);
  // 传入参数
  expect(func1.mock.calls[0]).toEqual([123]);
  expect(func1).toBeCalledWith(123);
  // 返回结果
  expect(func2.mock.results[0].value).toBe(456);

  // 【5】输出mock，进行观察
  console.log(func1.mock);
});
```

输出的 mock 为

```js
{
    calls: [[123], [123], [123]],
    instances: [undefined, undefined, undefined],
    invocationCallOrder: [1, 2, 3],
    results: [
        { type: 'return', value: 456 },
        { type: 'return', value: 789 },
        { type: 'return', value: undefined }
    ]
}
```

## mock - function 模拟 class 函数

对于单元测试，外部 class 的实现无需关心，使用 jest.fn 生成一个 mock 类，例如测试 mock.js

```js
export const createObject = (classItem) => {
  new classItem();
};
```

测试用例

```js
import {createObject} from './mock';
test('测试 createObject', () => {
  const func = jest.fn();
  createObject(func);
  console.log(func.mock);
});
```

输出结果为

```js
{
    calls: [[]],
    instances: [mockConstructor {}],
    invocationCallOrder: [1],
    results: [
        { type: 'return', value: undefined }
    ]
}
```

## mock - class 模拟实例化 class

```js
class Util {
  a() {
    // ...
  }
  b() {
    // ...
  }
}
export default Util;
```

例如测试 func.js，从外部引入了 Util 类，但单元测试不关心 Util 的实现

```js
import Util from './es6-class';
const demoFunction = (a, b) => {
  const util = new Util();
  util.a(a);
  util.b(b);
};
export default demoFunction;
```

有三种方案进行模拟

【1】jest.mock 真实 class 文件

```js
jest.mock('./es6-class');
```

jest.mock 如果发现是一个类，会自动把构造函数和方法变成 jest.fn() 以提升性能，相当于执行了

```js
const Util = jest.fn();
Util.a = jest.fn();
Util.b = jest.fn();
```

【2】自定义 jest.mock 传参

```js
jest.mock('./es6-class', () => {const Util = jest.fn() ... })
```

【3】在 **mocks** 中编写同名文件覆盖

**mocks** 文件除了可以替换 ajax 请求，还能替换 class 等，编写 **mocks**/es6-class.js

```js
const Util = jest.fn(() => {
  console.log('constructor --');
});
Util.prototype.a = jest.fn(() => {
  console.log('a --');
});
Util.prototype.b = jest.fn(() => {
  console.log('b --');
});
export default Util;
```

编写测试用例

```js
import demoFunction from './func';
import Util from './es6-class';
test('测试 demo function', () => {
  demoFunction();
  expect(Util).toHaveBeenCalled();
  expect(Util.mock.instances[0].a).toHaveBeenCalled();
  expect(Util.mock.instances[0].b).toHaveBeenCalled();
  console.log(Util.mock);
});
```

输出 mock

```js
{
    calls: [ [] ],
    instances: [ Util { a: [Function], b: [Function] } ],
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
}
```

## mock - timer 模拟定时器

例如测试 timer.js

```js
export default (callback) => {
  setTimeout(() => {
    callback();
    setTimeout(() => {
      callback();
    }, 3000);
  }, 3000);
};
```

如果直接使用 done，需要等定时器执行，要等待较长时间，影响测试效率

```js
test('测试 timer', (done) => {
  timer(() => {
    expect(1).toBe(1);
    done();
  });
});
```

因此需要使用 useFakeTimers / runAllTimers / runOnlyPendingTimers / advanceTimersByTime 来缩短 timers 时间

【1】定时器立即执行

```js
jest.runAllTimers(); // 执行2次
```

【2】只运行队列中的 timer

```js
jest.runOnlyPendingTimers(); // 执行1次
```

【3】快进 x

```js
jest.advanceTimersByTime(3000); // 快进3s

import timer from './timer';
// 各个用例之间定时器不影响
beforeEach(() => {
  jest.useFakeTimers();
});
test('测试 timer', () => {
  const fn = jest.fn();
  timer(fn);
  jest.advanceTimersByTime(3000); // 快进3s
  expect(fn).toHaveBeenCalledTimes(1);
  jest.advanceTimersByTime(3000); // 再快进3s
  expect(fn).toHaveBeenCalledTimes(2);
});
```
