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

> NOTE: *chaining* means appending component names to class attribute starting from child to parent.

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
    chain: ['App'],
    children: ['hello ', username.refer]
  });
}
// or
class App extends Component {
  constructor() { // 'App' is chained automatically 
    super({ 
      children: ['hello ', username.refer] 
    });
  }
}

new Manager(
  document.getElementById('root'), 
  App()
)
.update().render();
```

```css
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
// Box({})

// define a component functional style with merge
function FlexBox(params) {
  return new Component(merge(params, {
    chain: ['FlexBox'],
    attributes: {
      style: {
        gap: '.25rem'
      }
    }
  }));
}
// FlexBox({})

// define a child component functional style with chain
function ColFlexBox(params) {
  return FlexBox(chain('ColFlexBox', params, {
    attributes: {
      style: {
        padding: '.5rem 1rem'
      }
    }
  }));
}
// ColFlexBox({})
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
