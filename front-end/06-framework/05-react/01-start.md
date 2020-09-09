# 入门



## React 基础语法

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

### 函数式组件

如果你想写的组件只包含一个 `render` 方法，并且不包含 state，那么使用**函数组件**就会更简单。我们不需要定义一个继承于 `React.Component` 的类，我们可以定义一个函数，这个函数接收 `props` 作为参数，然后返回需要渲染的元素。

```react
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
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

### 开发者工具

在 [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 或者 [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) 中安装扩展 React Devtools 可以让你在浏览器开发者工具中查看 React 的组件树。



### Demo1: 井字棋

参见：[入门教程: 认识 React](https://zh-hans.reactjs.org/tutorial/tutorial.html)

目前已实现基础功能。改进功能实现了 1。其他后续实现。

