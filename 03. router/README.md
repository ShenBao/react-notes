# React Router

React Router 是完整的 React 路由解决方案.

- [React Router V4.x](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Router V3.x](https://github.com/ReactTraining/react-router/tree/v3/docs)
- [React Router V2.x](https://github.com/ReactTraining/react-router/tree/v2.8.1/docs)
- [React Router v5.1](https://reacttraining.com/blog/react-router-v5-1/)

https://segmentfault.com/a/1190000011765141

https://github.com/youngwind/blog/issues/109

https://www.jianshu.com/p/d2aa8fb951e4

https://segmentfault.com/a/1190000007238999

https://www.cnblogs.com/dashnowords/p/9671213.html

https://ruphi.cn/archives/271/#anchor4


```js
// 路由表
<Route to="/topic/:id" component={Topic} />

// Link处
<Link to={ '/topic/ ' + '2' } >topic 2</Link>

// JS方式
this.props.router.push( '/topic/'+'2' )

// 页面组件
// this.props.match.params.id
const Topic = (porps) {
    const { match } = porps;
    return <h1>{match.params}</h1>
}
```

## 通过 query 传递参数

前提：必须由其他页面跳过来，参数才会被传递过来

注：不需要配置路由表。路由表中的内容照常：

```js
// 路由表
<Route path='/topic' component={Topic} />

// Link处
<Link to={
    {
        path: '/topic',
        query: {
            id:2
        }
    }
}/>

// JS方式
this.props.router.push({
    path: '/sort',
    query: {
        id: 2
    }
})

// 页面组件
// this.props.location.query.id
const Topic = (porps) {
    const { location } = porps;
    return <h1>{location.query}</h1>
}
```

## 通过 state

同 query 差不多，只是属性不一样，而且state传的参数是在内存中的，query 传的参数是公开的，在地址栏

```js
// Link 处
<Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}/>

// JS方式
this.props.router.push({
    path:'/sort',
    state:{
        id: 2
    }
})

// 页面组件
this.props.location.state.name
```

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
