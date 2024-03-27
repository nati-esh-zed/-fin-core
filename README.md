# @nez-fin/core

Component based client-side engine for building dynamic websites and web-apps.

> NOTE: This is a recent library and tests have not been properly done.
> Please, do explore and experiment. You can suggest any ideas via email [the.defalt8@gmail.com](the.defalt8@gmail.com)

## Getting Started

Either setup a new project using the provided `setup-fin` command from [@nez-fin/setup](https://github.com/nati-esh-zed/-fin-setup). Or else do your own setup and then instal @nez-fin/core.

```sh
npm install @nez-fin/core
```

## A sample code

> NOTES:
>
> - checkout `styled-components`, `@emotion/styled` and `vscode-styled-components` VSCode extension.
> - *chaining* means appending component names to class attribute starting from child to parent.
> - `Variable` and `AsyncVariable` are bound for major improvements.  
>
> Be patient for docs and tutorials. Thanks!

```js

import { Variable, Params, Component } from '@nez-fin/core';

interface TodoParams extends Params {
  tasks: Variable<Array<string>>
}

function Todo(params: TodoParams) {
  const {tasks} = params;
  return new DynamicHtml({
    name: 'Todo',
    tag: 'div',
    html: (component) => `
      <h4>${tasks.value.length} Tasks</h4>
      <ul>
        ${tasks.refer(component).map(
          task => `<li>${task}</li>`).join('\n')
        }
      </ul>
    `
  }).styled`
    /* 'styled' calls are appended to document.head inside style elements. */
    .Todo { padding: .5rem; }
    .Todo h4 { 
      margin: 0; 
      padding: 0 1rem 0;
    }
    .Todo ul {
      margin: 0; 
      padding: 0 1rem 0;
    }
  `;
}

```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A fin.js project</title>
</head>
<body>
  <div id="root"></div>
  <!-- js/bundle.js from webpack -->
  <script src="js/bundle.js"></script>
</body>
</html>
```

```js
/* index.js */
//... imports ...
const username = new Variable('guest');

function App() {
  return new Component({
    name: 'App',
    children: ['hello ', username.refer]
  });
}
// or
class App extends Component {
  constructor() { // name = 'App' is set automatically 
    super({ 
      children: ['hello ', username.refer] 
    });
  }
}

new Engine(
  document.getElementById('root'), 
  App()
)
.update().render();
```

```css
/* you can use both .styled`` method, and imported css file like this. */
/* index.css */
.App {
  margin: 0;
  padding: 1rem;
  background-color: whitesmoke;
}
```

```js
// define a component classic style
class Box extends Component {
  constructor(params) {
    super(params);
  }
}

// define a component functional style with merge
function FlexBox(params) {
  return new Component(merge(params ?? {}, {
    name: 'FlexBox',
    attributes: {
      style: {
        gap: '.25rem'
      }
    }
  })).styled`
    .FlexBox {
      display: flex;
    }
  `;;
}

// define a child component functional style with chain
function ColFlexBox(params) {
  return FlexBox(chain('ColFlexBox', params ?? {}, {
    attributes: { // you can set style attributes as JS a object
      style: {
        padding: '.5rem 1rem'
      }
    }
  })).styled`
    .ColFlexBox {
      flex-direction: column;
    }
  `;
}
```

```css
/* index.css */
.Box {
  display: block;
}
.FlexBox {
  display: flex;
}
.ColFlexBox {
  flex-direction: column;
}
```

```js
// define a component functional style with chain
function Input(params) {
  return new Component(chain('Input', {
    tag: 'input',
    attributes: {
      value: username.refer,
      onInput: (c) => username.value = c.node.value
    }
  }, params));
}
// Input()
```

***Happy building!***
