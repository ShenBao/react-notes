# craco

- [craco](https://github.com/gsoft-inc/craco)

## 修改 package.json 中的 scripts

```json
{
  "scripts":{
    "start": "set PORT=5000 && craco start FAST_REFRESH=true",
    "build": "set GENERATE_SOURCEMAP=false && craco build",
    "analyzer": "env NODE_ENV=production BUILD_ANALYZER=true yarn start",
    "test": "craco test"
  }
}
```


## 配置 craco.config.js

## 扩展 babel 配置

```js
/* craco.config.js */

module.exports = {
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
          useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
          // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
          // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
          corejs: {
            version: 3, // 使用core-js@3
            proposals: true,
          },
        },
      ],
    ],
    plugins: [
        // 配置 babel-plugin-import
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
      // 配置解析器
       ["@babel/plugin-proposal-decorators", { "legacy": true }],
         ["@babel/plugin-proposal-class-properties", { "loose": true }],
       ["babel-plugin-styled-components", { "displayName": true }]
    ],
       loaderOptions: {},
       loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }

  },
}
```

## 检测模块编译情况

```js
new WebpackBar({ profile: true }),
new CircularDependencyPlugin({
  exclude: /node_modules/,
  include: /src/,
  failOnError: true,
  allowAsyncCycles: false,
  cwd: process.cwd()
})
```

## 观察打包进度

```js
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
module export = {
  webpack: {

    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin()
    ]
  }
}
```

## 修改打包输出目录

```js
module.exports = {
  webpack: {
    configure: (webpackConfig, {
      env, paths
    }) => {
      // paths.appPath='public'
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
          // ...{
          //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
          //   chunkFilename: 'static/js/[name].js'
          // },
          path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
          publicPath: '/'
      }
      return webpackConfig
    }
  }
}
```

## 热更新Hot-loader扩展

启动热更新如何避免频繁刷新

常用的热更新方案 react-hot-loader、craco也帮我们提供了两种craco-plugin-react-hot-reload、craco-fast-refresh

**react-hot-loader配置如下**

```js
// step1：webpack.config.js中引入别名配置解除相关警告
// yarn add @hot-loader/react-dom
module.exports = {
  // ...
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
// step2：注入引用App.js
import { hot } from 'react-hot-loader/root'
function App {
    return (
    <div>ceshi</div>
    )
}
export default hot(App)
```

**craco-plugin-react-hot-reload配置如下**

```js
/* craco.config.js */
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')
module.exports = {
  plugins: [{
    plugin: reactHotReloadPlugin
  }]
}
```

**craco-fast-refresh 配置如下**

这是最近发现的新 craco plugin，相对于 react-hot-loader 好用得多，零配置，不需要修改项目代码，据说性能也更好。

```js
// step1：增加插件
/* craco.config.js */
const FastRefreshCracoPlugin = require('craco-fast-refresh')
module.exports = () => {
  return {
    plugins: [{
      plugin: FastRefreshCracoPlugin
    }],
  };
};

// step2： 注入引用App.js
import React from 'react'
import { hot } from 'react-hot-loader'
const App = () => <div>Hello World!</div>

export default hot(module)(App)
```

## Antd自定义主题配置

配置antd主题颜色可随意对以下方案就行选取

### 结合lessOptions

```js
// step1：运行 yarn add craco-less
// step2：引入
const CracoLessPlugin = require('craco-less')
// step3：配置
{
  plugin: CracoLessPlugin,
  options: {
    lessLoaderOptions: {
      lessOptions: {
        modifyVars: {
          '@primary-color': '#1DA57A'
        },
        javascriptEnabled: true
      }
    }
  }
}
```

同时craco 也提供了专门的 plugin 来处理[antd 的集成](https://github.com/DocSpring/craco-antd)配置方式有区别

### Craco自定义支持

```js
// step1： yarn add craco-antd
// step2：
const CracoAntDesignPlugin = require('craco-antd')
// step3
{
  plugin: CracoAntDesignPlugin,
  options: {
    customizeTheme: {
      '@primary-color': '#FF061C'
    }
  }
}
```

针对customizeTheme 如果想单独抽离可采取如下方案

```js
// step1： 新建antd.customize.less文件
// @primary-color: #FF061C;

// step2：读取模式
{
  plugin: CracoAntDesignPlugin,
  options: {
  customizeThemeLessPath: path.join(__dirname,"antd.customize.less")}
}
```

## 自定义配置

```js
/* craco.config.js */
/**
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const {
  when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES
} = require('@craco/craco')
const webpack = require('webpack')
const CracoLessPlugin = require('craco-less')
const CracoAntDesignPlugin = require('craco-antd')
const CracoVtkPlugin = require('craco-vtk')
const WebpackBar = require('webpackbar')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const FastRefreshCracoPlugin = require('craco-fast-refresh')
const TerserPlugin = require('terser-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

const path = require('path')

// 判断编译环境是否为生产
const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true'

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      '@': pathResolve('.'),
      src: pathResolve('src'),
      assets: pathResolve('src/assets'),
      common: pathResolve('src/common'),
      components: pathResolve('src/components'),
      hooks: pathResolve('src/hooks'),
      pages: pathResolve('src/pages'),
      store: pathResolve('src/store'),
      utils: pathResolve('src/utils')
        // 此处是一个示例，实际可根据各自需求配置
    },
    plugins: [
      // webpack构建进度条
      new WebpackBar({
        profile: true
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 查看打包的进度
      new SimpleProgressWebpackPlugin(),
      // 时间转换工具采取day替换moment
      new AntdDayjsWebpackPlugin(),
      // // 新增模块循环依赖检测插件
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
          }),
          // webpack-dev-server 强化插件
          new DashboardPlugin(),
          new webpack.HotModuleReplacementPlugin()
        ], []
      ),
      /**
       * 编译产物分析
       *  - https://www.npmjs.com/package/webpack-bundle-analyzer
       * 新增打包产物分析插件
       */
      ...when(
        isBuildAnalyzer, () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // html 文件方式输出编译分析
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, `analyzer/index.html`)
          })
        ], []
      ),
      ...whenProd(
        () => [
          // new TerserPlugin({
          //   // sourceMap: true, // Must be set to true if using source-maps in production
          //   terserOptions: {
          //     ecma: undefined,
          //     parse: {},
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // 生产环境下移除控制台所有的内容
          //       drop_debugger: true, // 移除断点
          //       pure_funcs: ['console.log'] // 生产环境下移除console
          //     }
          //   }
          // }),
          // 打压缩包
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')/div>),
            threshold: 1024,
            minRatio: 0.8
          })
        ], []
      )
    ],
    //抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, {
      env, paths
    }) => {
      // paths.appPath='public'
      paths.appBuild = 'dist' // 配合输出打包修改文件目录
        // webpackConfig中可以解构出你想要的参数比如mode、devtool、entry等等，更多信息请查看webpackConfig.json文件
        /**
         * 修改 output
         */
      webpackConfig.output = {
          ...webpackConfig.output,
            // ...{
            //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
            //   chunkFilename: 'static/js/[name].js'
            // },
            path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
            publicPath: '/'
        }
        /**
         * webpack split chunks
         */
        // webpackConfig.optimization.splitChunks = {
        //   ...webpackConfig.optimization.splitChunks,
        //   ...{
        //     chunks: 'all',
        //     name: true
        //   }
        // }
        // 返回重写后的新配置
      return webpackConfig
    }
  },
  babel: {
    presets: [],
    plugins: [
      // AntDesign 按需加载
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }, 'antd'],
      ['@babel/plugin-proposal-decorators', {
        legacy: true
      }] // 用来支持装饰器
    ],
    loaderOptions: {},
    loaderOptions: (babelLoaderOptions, {
      env, paths
    }) => {
      return babelLoaderOptions
    }
  },
  /**
   * 新增 craco 提供的 plugin
   */
  plugins: [
    // 热更新
    ...whenDev(
      () => [{
        plugin: FastRefreshCracoPlugin
      }, {
        plugin: CracoVtkPlugin()
      }, {
        plugin: new AntdDayjsWebpackPlugin()
      }], []
    ),
    // 方案1、配置Antd主题less
    // {
    //   plugin: CracoLessPlugin,
    //   options: {
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         modifyVars: { '@primary-color': '#1DA57A' },
    //         javascriptEnabled: true
    //       }
    //     }
    //   }
    // },
    // 方案2、配置Antd主题
    // {
    //   plugin: CracoAntDesignPlugin,
    //   options: {
    //     customizeTheme: {
    //       '@primary-color': '#FF061C'
    //     }
    //   }
    // },
    // 方案3、配置Antd主题
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "antd.customize.less"
        ),
      },
    },
  ],
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://placeholder.com/',
        changeOrigin: true,
        secure: false,
        xfwd: false,
      }
    }
  }
}
```

## 官方暴露的 Api

```js
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    style: {
        modules: {
            localIdentName: ""
        },
        css: {
            loaderOptions: { /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */ },
            loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
        },
        sass: {
            loaderOptions: { /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */ },
            loaderOptions: (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions; }
        },
        postcss: {
            mode: "extends" /* (default value) */ || "file",
            plugins: [],
            env: {
                autoprefixer: { /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */ },
                stage: 3, /* Any valid stages: https://cssdb.org/#staging-process. */
                features: { /* Any CSS features: https://preset-env.cssdb.org/features. */ }
            },
            loaderOptions: { /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */ },
            loaderOptions: (postcssLoaderOptions, { env, paths }) => { return postcssLoaderOptions; }
        }
    },
    eslint: {
        enable: true /* (default value) */,
        mode: "extends" /* (default value) */ || "file",
        configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
        configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
        loaderOptions: { /* Any eslint-loader configuration options: https://github.com/webpack-contrib/eslint-loader. */ },
        loaderOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
    },
    babel: {
        presets: [],
        plugins: [],
        loaderOptions: { /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */ },
        loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
    },
    typescript: {
        enableTypeChecking: true /* (default value)  */
    },
    webpack: {
        alias: {},
        plugins: [],
        configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
        configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
    },
    jest: {
        babel: {
            addPresets: true, /* (default value) */
            addPlugins: true  /* (default value) */
        },
        configure: { /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */ },
        configure: (jestConfig, { env, paths, resolve, rootDir }) => { return jestConfig; }
    },
    devServer: { /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver. */ },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig; },
    plugins: [
        {
            plugin: {
                overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig; },
                overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => { return webpackConfig; },
                overrideDevServerConfig: ({ devServerConfig, cracoConfig, pluginOptions, context: { env, paths, proxy, allowedHost } }) => { return devServerConfig; },
                overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context: { env, paths, resolve, rootDir } }) => { return jestConfig },
            },
            options: {}
        }
    ]
};
```

## 链接

- https://juejin.cn/post/6871148364919111688
- https://juejin.cn/post/6896304919851368461
- https://juejin.cn/post/6844904016581754888
- https://github.com/leishihong/react-craco-demo/blob/develop/craco.config.js
