# @rescripts/cli

- [@rescripts/cli](https://www.npmjs.com/package/@rescripts/cli)
- [@rescripts/cli](https://github.com/harrysolovay/rescripts)

## 安装

```bash
npm i -D @rescripts/cli

npm i -D @rescripts/rescript-env
```

package.json

```json
{
  "name": "built-with-rescripts",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.6.1",
    "react-dom": "^16.6.1",
    "react-scripts": "2.1.1"
  }
  "devDependencies": {
    "@rescripts/cli": "^0.0.11",
    "@rescripts/rescript-env": "^0.0.10"
  }
  "scripts": {
-   "start": "react-scripts start",
+   "start": "rescripts start",
-   "build": "react-scripts build",
+   "build": "rescripts build",
-   "test": "react-scripts test",
+   "test": "rescripts test",
-   "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ],
+ "rescripts": [
+   "env"
+ ]
}
```

## 新建配置文件

.rescriptsrc.js


```js
module.exports = [
  [
    'use-rewire',
    'react-app-rewire-compression-plugin',
    {test: /\.js(\?.*)?$/i, cache: true},
  ],
  {
    webpack: config => {
      console.log('blammo')
      return config
    },
    devServer: config => {
      console.log('blammo')
      return config
    },
    jest: config => {
      console.log('blammo')
      return config
    },
  },
]
```

```js
module.exports = [
  [
    'use-babel-config',
    {
      presets: ['react-app'],
      plugins: [
        'react-require',
        [
          'module-resolver',
          {
            root: '.',
            alias: {
              '~': './src',
            },
          },
        ],
      ],
    },
  ],
  [
    'use-eslint-config',
    {
      extends: ['react-app'],
      plugins: ['ramda'],
      rules: {
        'ramda/compose-pipe-style': 'error',
        'react/react-in-jsx-scope': 0,
      },
    },
  ],
]
```
