var fs = require ('fs');
var path = require ('path');

var list = require ('./Awesome-React.json');

var content = `# React 社区组件汇总

- https://github.com/enaqx/awesome-react
- https://github.com/brillout/awesome-react-components
- https://github.com/rehooks/awesome-react-hooks
- https://github.com/glauberfc/awesome-react-hooks
- https://github.com/tuchk4/awesome-create-react-app
- https://github.com/tuchk4/awesome-css-in-js

| 类型 | 推荐组件 |
| --- | --- |`;

list.forEach (item => {
  var componentsStr = '';
  item.components.forEach ((component, index) => {
    if (index !== 0) {
      componentsStr += `<br/>`;
    }
    componentsStr += `[${component[0]}](${component[1]})`;
  });
  var ItemStr = `
| ${item.title} | ${componentsStr} |`;

  content += ItemStr;
});

content += `

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
`

fs.writeFileSync (`./Awesome-React.md`, content);

// var d = $ ('#test-id tr');

// var data = [];

// for (let index = 0; index < d.length; index++) {
//   var title = $ (`tr:eq(${index}) td:eq(0)`).text ();
//   console.log (title);
//   var ab = $ (`tr:eq(${index}) td:eq(1) a`).length;

//   var item = {
//     title: title,
//     components: [],
//   };

//   for (let j = 0; j < ab; j++) {
//     var at = $ (`tr:eq(${index}) td:eq(1) a:eq(${j})`);
//     var name = at.text ();
//     var url = at.attr ('href');
//     console.log (name, url);
//     item.components.push ([name, url]);
//   }

//   data.push (item);
// }

// console.log (JSON.stringify (data));
