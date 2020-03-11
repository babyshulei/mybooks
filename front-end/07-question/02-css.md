# CSS

#### 1. HTML引入CSS的方式有哪些？

HTML element的style属性，HTML内部style标签引入，HTML外部link标签引入，CSS代码import引入。

#### 2. png、jpg、gif三种图片格式如何选择，你还知道哪些图片格式？

颜色简单、有透明的用png、颜色丰富(照片)用jpg，有动画的用gif。图片格式还有webp、svg等等。

#### 3. 什么是盒子模型？

由内到外：content-box、padding-box、border-box、margin-box。

默认width、height是content-box的宽高。

IE怪异模式下width、height是border-box的宽高。

#### 4. 解释box-sizing: border-box的作用。

设置width、height为border-box的宽高。

#### 5. 什么是margin折叠？

同一个BFC内的文档流里的多个相邻(兄弟和父子)块级元素的垂直方向的margin合并成一个。

#### 6. 计算如下margin宽度折叠后的margin宽度：(3px, 5px)，(3px, -5px)，(3px, 5px, -4px)，并说明计算方法。
5px， -2px，1px。计算方法是正值的最大值加上负值的最小值。

#### 7. 说出以下代码里p元素的font-size和line-height的computed value，并解释原因。

```html
<div style="font-size: 10px">
    <p style="font: 2em/2em arial">test</p>
</div>
```

p元素的font-size为20px，line-height为40px，em相对于自身的font-size或继承的font-size。

#### 8. em和rem的区别是什么？
em相对于自身的字体大小，而rem相对于root element(html)。

#### 9. 描述一下选择器的优先级。
先比较选择器里id选择器的个数，如果相同则比较class选择器的个数，如果还相同就比较type(tag)选择器的个数。

#### 10. inline、block、inline-block的区别是什么？
inline元素和其他inline元素在同一行展示，宽度由内容决定，无法设置宽度；block元素在新行开始，默认宽度为容器的宽度，可以设置宽度；inline-block从外面看是inline，里面看是block，可以设置宽度。

#### 11. 什么是clearfix？写出clearfix的代码。
float的元素不在文档流里，无法撑开容器，clearfix就是为了解决这个问题。可以用overflow:hidden，也可以在容器末尾加一个空div并设置clear:both，还可以用如下代码：

```css
.clearfix:after {
    content: '';
    display: block;
    clear: both;
}
```

#### 12. 以下文档结构，如果设置img为float:left则p的文字会在图片的右边展示，如果文字很长则会绕到图片的下方，给出一个方案让文字都在图片的右边不绕到图片的下边，且p需要占满图片右边的空间，并解释原因。

```html
<div>
    <img src="...">
    <p>text</p>
</div>
```

给p设置overflow:hidden，原理是给p生成新的BFC。

#### 13. 如何做水平和垂直居中？给出几种方案。

方案一，已知宽高，设为absolute，然后left、top都设为50%，根据宽高设置负margin来居中；

方案二，类似方案一，最后一步用transform: translate(-50%,-50%)；

方案三，绝对定位，top、bottom、left、right都设为0，设好宽高，margin设为auto；

方案四，display:table-cell + vertical-align:middle。

方案五，display: flex; justify-content: center; align-items: center;

