# 盒子模型

> 2019.11.11 @wsl

## 扩展应用

### 1. 三角形

利用border，画三角形。

```css
.triangle-top {
    width: 0;
    height: 0;
    border-top: 20px solid #abc;
    border-left: 30px solid transparent;
    border-right: 50px solid transparent;
}
```

### 2. 对话框

![1573452405231](.\images\02-chat-msg.png)

针对图中的尖角部分，可以使用两个三角形叠加的方式画出。

如果要加阴影，可以使用filter。

```css
.chat-msg {
    filter: drop-shadow(0 0 2px #999);
    background-color: #fff;
}
```



## 实例

参见 /demos/02-css/box/

