# CSS

## 基础

### 1. HTML引入CSS的方式有哪些？

- 内联样式：HTML element的style属性中添加CSS
- 嵌入样式：HTML内部style标签内写入CSS代码
- 链接样式：HTML外部link标签引入外部CSS文件
- 导入样式：CSS规则@import引入外部CSS文件

#### link和@import的区别

- 从属关系：link是HTML标签，@import是CSS规则；link除了加载CSS，还可以定义RSS，定义rel连接属性等，@import就只能加载CSS；
- 下载顺序：link在页面加载时同时加载，@import引用的CSS会等页面加载完成后再加载；
- 兼容性：link没有兼容性问题，@import不兼容IE5以下；
- DOM可控性：link可以通过js操作DOM动态引入样式表改变样式，而@import不可以。

可参考：<https://www.cnblogs.com/my--sunshine/p/6872224.html>



### 2. 描述一下选择器的优先级

- `!important` > 内联 > `#id` > `.class` > `tag` > * > 继承 > 默认
- 选择器从右往左解析

先比较选择器里id选择器的个数，如果相同则比较class选择器的个数，如果还相同就比较type(tag)选择器的个数。

内联  > ID选择器  > 类选择器 > 标签选择器

**!important 例外规则**

!important 用于单独指定某条样式中的单个属性。对于被指定的属性，有 !important 指定的权重值大于所有未用 !important 指定的规则。

**权重计算**

优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下：

1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`;
2. `B` 的值等于 `ID选择器` 出现的次数;
3. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数;
4. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 。

浏览器实现：1,10,100,1000



### 3. 什么是盒子模型？

页面渲染时，dom 元素所采用的 **布局模型**。

- 由内到外：content-box、padding-box、border-box、margin-box。

- 标准盒子模型（默认）：width、height是content-box的宽高。

- IE5.X和6怪异模式下：width、height是border-box的宽高。
  IE8 及更早IE版本不支持设置padding的宽度和border的宽度属性。
  解决IE8及更早版本不兼容问题可以在HTML页面声明 `<!DOCTYPE html>`即可。

可通过`box-sizing`进行设置。

- box-sizing: border-box | content-box;

参见笔记：前端-CSS-盒子模型



### 4. 什么是margin折叠？

同一个BFC内的文档流里的多个相邻（兄弟和父子）块级元素的垂直方向的margin合并成一个。

相邻margin条件：

- 流内块级盒，同一个BFC
- 无行盒、间隙、padding、border相隔
- 同属垂直相邻盒边
  - 盒的top、margin和其第一个子级的top margin
  - 盒的bottom margin和下面相邻兄弟的top margin
  - 盒最后一个子级的bottom margin和其父级的bottom margin
  - 特殊盒子自身的top和bottom margin

相邻margin会发生折叠。

#### magin折叠计算题

**计算如下margin宽度折叠后的margin宽度：(3px, 5px)，(3px, -5px)，(3px, 5px, -4px)，并说明计算方法。**

5px， -2px，1px。计算方法是正值的最大值加上负值的最小值。

#### 什么时候不折叠？

- 浮动不折叠
- 创建BFC与其子级不折叠
- 绝对定位不折叠
- 内联块不折叠
- 兄弟有间隙不折叠
- 父子间有padding，border，间隙不折叠
- 特殊盒子有padding，border不折叠



### 5. inline、block、inline-block的区别是什么？

inline元素和其他inline元素在同一行展示，宽度由内容决定，无法设置宽度、高度；可以设置水平方向的margin和padding。

block元素在新行开始，默认宽度为容器的宽度，可以设置宽度、高度；可以设置margin和padding。

inline-block从外面看是inline，里面看是block，可以设置宽度、高度；可以设置margin和padding。



### 6. 什么是BFC？

BFC（Block Formatting Context）：块级格式化上下文。

文档流可分为定位流、浮动流、常规流。其中常规流就是BFC中的FC，即格式化上下文。FC是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的FC有BFC、IFC、GFC、FFC。

BFC是块级格式化上下文，适用于布局块级盒子的一块渲染区域。

#### BFC 的原理/BFC的布局规则

BFC 的原理，其实也就是 BFC 的渲染规则。包括：

- BFC **内部的**子元素垂直排列，在垂直方向，**边距会发生重叠**。
- BFC在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然。
- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
- **BFC区域不与旁边的float box区域重叠**。（可以用来清除浮动带来的影响 overflow: hidden）。
- 计算BFC的高度时，浮动的子元素也参与计算。

#### 如何生成BFC？

- 根元素：`<html>`
- 浮动元素：float的值不为none
- 绝对定位元素：position的值为absolute或fixed
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption、flex、inline-flex、grid、inline-grid

#### BFC的应用

- 阻止`margin`重叠
- 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个`div`都位于同一个 BFC 区域之中)
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖

参见：

[块格式化上下文- Web 开发者指南| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

[史上最全面、最透彻的BFC原理剖析 - 掘金](https://juejin.cn/post/6844903496970420237)



### 7. em, rem, px, rpx, vw, vh 的概念。

em相对于自身的字体大小，而rem相对于root element(html)。



### 8. 什么是层叠上下文？

元素提升为一个比较特殊的图层，在三维空间中 **(z轴)** 高出普通元素一等。

#### 如何生成层叠上下文？

触发条件

- 根层叠上下文(`html`)
- `position`
- css3属性
  - `flex`
  - `transform`
  - `opacity`
  - `filter`
  - `will-change`
  - `-webkit-overflow-scrolling`

#### 同一层叠上下文中，层叠等级如何排列？

- 层叠等级：层叠上下文在z轴上的排序
  - 在同一层叠上下文中，层叠等级才有意义
  - `z-index`的优先级最高

![img](.\image\z-index.png)

参考链接：

[层叠上下文- Web 开发者指南| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

[深入理解CSS中的层叠上下文和层叠顺序« 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

### 9. 如何创建一个CSS动画？

- transition：过渡动画
  - `transition-property`: 属性
  - `transition-duration`: 间隔
  - `transition-timing-function`: 曲线
  - `transition-delay`: 延迟
  - 常用钩子: `transitionend`
- animation：关键帧动画
  - `animation-name`: 动画名称，对应`@keyframes`
  - `animation-duration`: 间隔
  - `animation-timing-function`: 曲线
  - `animation-delay`: 延迟
  - `animation-iteration-count`: 次数
    - infinite: 循环动画
  - `animation-direction`: 方向
    - alternate: 反向播放
  - `animation-fill-mode`: 静止模式
    - forwards: 停止时，保留最后一帧
    - backwards: 停止时，回到第一帧
    - both: 同时运用 forwards / backwards
  - 常用钩子: `animationend`
- 动画属性：尽量使用动画属性进行动画，能拥有较好的性能表现
  - translate
  - scale
  - rotate
  - skew
  - opacity
  - color



## 实践

### 1. font-size 计算

**说出以下代码里p元素的font-size和line-height的computed value，并解释原因。**

```html
<div style="font-size: 10px">
    <p style="font: 2em/2em arial">test</p>
</div>
```

p元素的font-size为20px，line-height为40px，em相对于自身的font-size或继承的font-size。

### 2. float相关

#### 如何清除浮动？

> 在非IE浏览器（如Firefox）下，当容器的高度为auto，且容器的内容中有浮动（float为left或right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。

float的元素不在文档流里，无法撑开容器，clearfix就是为了解决这个问题。有以下几种方案：

- 使用带clear属性的子元素
  - 如添加空div、伪元素，并设置`clear:both`
- 创建父级BFC
  - 如设置overflow:hidden
- 父级设置高度

示例代码：

```css
<div class="clearfix">
	<div class="floatbox"></div>
</div>

/* 方案一 */
.clearfix:after {
    content: '';
    display: block;
    clear: both;
}

/* 方案二 */
clearfix {
    overflow: hidden;
}

/* 方案三 */
clearfix {
    height: 200px;
}
```

[清除浮动的四种方式及其原理理解- 掘金](https://juejin.im/post/59e7190bf265da4307025d91)



#### float实例

以下文档结构，如果设置img为float:left则p的文字会在图片的右边展示，如果文字很长则会绕到图片的下方，给出一个方案让文字都在图片的右边不绕到图片的下边，且p需要占满图片右边的空间，并解释原因。

```html
<div>
    <img src="...">
    <p>text</p>
</div>
```

给p设置overflow:hidden，原理是给p生成新的BFC。



### 3. 如何做水平和垂直居中？

水平居中：

- 行内元素：`text-align: center`
- 块级元素：`margin: 0 auto`
- `absolute + transform/margin`
- `flex + justify-content:center`

垂直居中：

- `line-height: height`
- `absolute + transform/margin`
- `flex + align-items:center`
- `tabel-cell + vertical-align:middle`

水平垂直居中：

- `absolute + top,left: 50% + margin/transform: -50%`
- `absolute + top,left,bottom,right:0 + margin:auto`
- `flex + justify-content + align-items`



### 4. 图片格式

**png、jpg、gif三种图片格式如何选择，你还知道哪些图片格式？**

颜色简单、有透明的用png、颜色丰富(照片)用jpg，有动画的用gif。图片格式还有webp、svg等等。

