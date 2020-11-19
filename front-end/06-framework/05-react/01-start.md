# 入门

## React 核心概念

React 通过JSX语法开发组件，然后将组件组合成复杂的UI页面。

下面是一个组件：

```react
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
      </div>
    );
  }
}

// 用法示例: <ShoppingList name="Mark" />
```

其中，ShoppingList 是一个 **React 组件类**，或者说是一个 **React 组件类型**。一个组件接收一些参数，我们把这些参数叫做 `props`（“props” 是 “properties” 简写），然后通过 `render` 方法返回需要展示在屏幕上的视图的层次结构。

- 通过 `props` 传递数据
- 通过 `state` 存储组件数据，实现状态变化

### JSX

JSX，是一个 JavaScript 的语法扩展。示例如下：

```react
const element = <h1>Hello, world!</h1>;

// 在JSX中嵌入表达式：通过大括号包裹
const name = 'David';
const element = <h1>Hello, {name}</h1>;

// 指定属性（字面量）：通过使用引号，来将属性值指定为字符串字面量
const element = <div tabIndex="0"></div>;

// 指定属性（表达式）：使用大括号，来在属性值中插入一个 JavaScript 表达式
const element = <img src={user.iconUrl}></img>;

// 假如一个标签里面没有内容，可以使用 /> 来闭合标签。
const element = <div className="hello" />;

// JSX标签里可以包含子元素
const element = (
	<div>
    	<h1>this is a title</h1>
        <p>this is a paragraph</p>
    </div>
);
```

- JSX也是一个表达式
  在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。
-  React DOM 使用 camelCase（小驼峰命名）来定义属性的名称
  例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。
- JSX 防止注入攻击
  React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

#### JSX 表示对象

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

示例：

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// 等价于
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` 会预先执行一些检查，以帮助你编写无错代码。实际上它会创建了一个对象，这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

### 元素渲染

> 元素是构成 React 应用的最小砖块。

元素描述了你在屏幕上想看到的内容。

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)：

```react
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

#### 更新已渲染的元素

React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。根据已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)。

```react
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

### 组件 & Props

React 元素不仅可以是DOM标签，还可以是用户自定义的组件。

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

#### 函数组件

如果你想写的组件只包含一个 `render` 方法，并且不包含 state，那么使用**函数组件**就会更简单。我们不需要定义一个继承于 `React.Component` 的类，我们可以定义一个函数，这个函数接收 `props` 作为参数，然后返回需要渲染的元素。

#### 渲染组件

示例：

```react
/******************* 定义 Welcome 组件 ******************/
// 写法一(class组件)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 写法二（函数组件）
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

/******************* 定义 React 元素 *******************/
// 例一：React元素为用户自定义的组件
const element = <Welcome name="Sara" />;

// 例二：组件可以进行组合
const element = (
	<div>
        <Welcome name="Sara" />
        <Welcome name="John" />
    </div>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

> **注意：** 组件名称必须以大写字母开头。
>
> React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。

可以通过**提取组件**，将一个复杂的组件拆分成多个独立的小组件，使逻辑更清晰，提升代码的可复用性。

#### Props

组件无论是使用[函数声明还是通过 class 声明](https://react.docschina.org/docs/components-and-props.html#function-and-class-components)，都决不能修改自身的 props。**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

### State & 生命周期

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

#### 组件的生命周期

- 挂载
  当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：
  - [constructor()](https://react.docschina.org/docs/react-component.html#constructor)
  - [static getDerivedStateFromProps()](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
  - [render()](https://react.docschina.org/docs/react-component.html#render)
  - [componentDidMount()](https://react.docschina.org/docs/react-component.html#componentdidmount)
- 更新
  当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
  - [static getDerivedStateFromProps()](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
  - [shouldComponentUpdate()](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
  - [render()](https://react.docschina.org/docs/react-component.html#render)
  - [getSnapshotBeforeUpdate()](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
  - [componentDidUpdate()](https://react.docschina.org/docs/react-component.html#componentdidupdate)
- 卸载
  当组件从 DOM 中移除时会调用如下方法：
  - [componentWillUnmount()](https://react.docschina.org/docs/react-component.html#componentwillunmount)
- 错误处理
  当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：
  - [static getDerivedStateFromError()](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror)
  - [componentDidCatch()](https://react.docschina.org/docs/react-component.html#componentdidcatch)

#### State 取值

赋值：在构造函数里给 `this.state` 赋值。

修改：不要直接修改state，直接修改不会重新渲染组件。应该使用 `setState()`。

```react
this.setState({comment: 'Hello'});
```

> 注意： `setState()` 会把传入的对象合并到当前的 state。
> 例如：当前 state 为：`{key1: 'aa'}`，调用 setState：`this.setState({key2: []});`，调用后的state为：`{key1: 'aa', key2: []}`

#### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以不能直接依赖他们的值来更新下一个状态。

解决方案是可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```react
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

#### 数据是向下流动的

组件可以选择把它的 state 作为 props 向下传递到它的子组件中。子组件会在其 props 中接收参数，但是子组件本身无法知道它是来自于父组件的 state，还是父组件的 props，还是手动输入的。

这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

### 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
- React 中你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

例如，传统的 HTML：

```html
<button onclick="activateLasers()">
  	Activate Lasers
</button>

<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在 React 中略微不同：

```react
<button onClick={activateLasers}>
    Activate Lasers
</button>

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

#### this 绑定问题

你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。

如果觉得使用 `bind` 很麻烦，这里有两种方式可以解决。

**方案一：public class fields语法**

如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 class fields 正确的绑定回调函数：

```react
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

[Create React App](https://github.com/facebookincubator/create-react-app) 默认启用此语法。

**方案二：箭头函数**

如果你没有使用 class fields 语法，你可以在回调中使用[箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)：

```react
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

此语法问题在于每次渲染 `LoggingButton` 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

#### 向事件处理程序传递参数

以下两种方式都可以向事件处理函数传递参数：

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 来实现。

在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。

### 条件渲染

> 在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。

- React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。
  包括：`if` 语句、与运算符 `&&`、三目运算符 `condition ? true : false`
- 可以使用变量来储存元素。通过它有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。
- 在极少数情况下，需要隐藏组件，即使它已经被其他组件渲染。此时可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

```react
class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            con1: true,
            con2: false,
        };
    }
    
    render() {
        const con1 = this.state.con1;
        const con2 = this.state.con2;
        // if 语句，条件渲染
        // 使用变量来存储元素
        // 返回 null 直接不进行任何渲染
        if (con2) {
            return null;
        }
        
        return (
            <div>
                <h1>Hello</h1>
                {/* 与运算符 && 实现条件渲染 */}
                {con1 &&
                    <div>con1 is true</div>
                }
                {/* 三目运算符实现条件渲染 */}
                <div>This is a demo about {con1 ? 'monkey' : 'banana'}.</div>
            </div>
        );
    }
}

ReactDOM.render(
  	<Control />,
  	document.getElementById('root')
);
```

### 列表 & Key

利用 `map()` 函数，把数组转化为[元素](https://react.docschina.org/docs/rendering-elements.html)列表。

```react
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem
      key={number.toString()}
      value={number}
    />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

// 等价于
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem
          key={number.toString()}
          value={number}
        />
      )}
    </ul>
  );
}
```

#### Key

组件内生成元素列表时，需要给每个列表元素分配一个 `key` 属性。

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此应当给数组中的每一个元素赋予一个确定的标识。

一个元素的 key 最好是这个元素在列表中拥有的一个**独一无二的字符串**。当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key。

元素的 key 只有放在**就近的数组上下文中**才有意义。即在`map()`中指定。

数组元素中使用的 key 在其**兄弟节点之间应该是独一无二**的。不需要是全局唯一的。

key 会传递信息给 React ，但**不会传递给组件**（`props`）。如果组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值。

### 表单

#### 受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)来更新。

两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

示例：

```react
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    alert(`提交的名字：${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字：
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

#### textarea标签

HTML 中, `<textarea>` 元素通过其子元素定义其文本。

```html
<textarea>文本内容</textarea>
```

而在 React 中，`<textarea>` 使用 `value` 属性代替。这样可以和input的使用方法类似。

#### select标签

HTML中，`<select>` 创建下拉列表标签。子节点为`<option>`，上面的属性 `selected` 表示选项被选中。

```html
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">椰子</option>
</select>
```

而在 React 中，不会使用 `selected` 属性，而是在根 `<select>` 标签上使用 `value` 属性。

```react
class FruitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'apple',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    alert(`喜欢的水果：${this.state.value}`);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味：
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="orange">橘子</option>
            <option value="apple">苹果</option>
            <option value="banana">香蕉</option>
          </select>
        </label>
        <input type="submit" value="提交"/>
      </form>
    );
  }
}
```

value属性传入一个数组，可以支持标签多选：

```react
<select multiple={true} value={['B', 'C']}>
```

#### 文件 input 标签

在 HTML 中，`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行控制。

```react
<input type="file" />
```

因为它的 value 只读，所以它是 React 中的一个**非受控**组件。

#### 处理多个输入

当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

```js
handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}
```

#### 受控输入空值

在[受控组件](https://react.docschina.org/docs/forms.html#controlled-components)上指定 value 的 prop 会阻止用户更改输入。如果你指定了 `value`，但输入仍可编辑，则可能是你意外地将`value` 设置为 `undefined` 或 `null`。

```react
ReactDOM.render(<input value="hi" />, mountNode); // 不可编辑

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode); // 变为可编辑
}, 1000);
```

### 组合 vs 继承

推荐使用组合而非继承来实现组件间的代码重用。

#### 包含关系

有些组件无法提前知晓它们子组件的具体内容。React 建议这些组件使用一个特殊的 `children` prop 来将他们的子组件传递到渲染结果中：

```react
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。

```react
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

如果需要传入多个组件，可以不使用 `children`，而是自行约定，示例：

```react
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

#### 特例关系

有些时候，我们会把一些组件看作是其他组件的特殊实例。“特殊”组件可以通过 props 定制并渲染“一般”组件：

```react
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

## 开发

### 创建 React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

参见：[Create React App 中文文档](https://www.html.cn/create-react-app/docs/getting-started/)

### 添加lint检查

- Eslint：js检查
  `npm i eslint -D`：安装eslint包
  `./node-modules/.bin/eslint init` ：生成eslint配置文件，安装相关依赖
  可以根据项目需求修改`.eslintrc.js`
- Stylelint：css、类css检查
  `npm i -D stylelint stylelint-config-standard `：安装相关依赖
  创建`.stylelintrc.js`，进行相关配置
- Prettier：代码规范化
- GitHooks
  `npm i husky lint-staged -D`：安装相关依赖

参见：https://www.cnblogs.com/jserhub/p/11924289.html

### webpack 配置

create-react-app 将 webpack 的配置隐藏起来了，没办法直接修改这个 webpack，可以使用 react-app-rewired + customized-cra 修改 react 中的配置。

### 开发者工具

在 [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 或者 [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) 中安装扩展 React Devtools 可以让你在浏览器开发者工具中查看 React 的组件树。

### Demo: 井字棋

参见：[入门教程: 认识 React](https://zh-hans.reactjs.org/tutorial/tutorial.html)

目前已实现基础功能。改进功能实现了 1。其他后续实现。

## 参考链接

[React 官方文档](https://react.docschina.org/docs/hello-world.html)

[带你了解规范化-eslint、stylelint、prettier、git hooks - CSDN](https://blog.csdn.net/qq_32090185/article/details/107911593)

[ESLint + Prettier + husky + lint-staged 规范统一前端代码风格](https://www.cnblogs.com/jserhub/p/11924289.html)

[react-app-rewired 和customized-cra - Baurine's Blog](https://baurine.netlify.app/2020/05/02/react-app-rewired-customize-cra/)

[使用react-app-rewired2.x添加webpack配置](https://www.cnblogs.com/zyl-Tara/p/10635033.html)

