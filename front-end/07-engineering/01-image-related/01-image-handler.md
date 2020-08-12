# 图片处理

- 图片缩放
- 图片裁剪
- 图片合成
  - 图片与图片的合成
  - 图片上添加文字
  - 图片上添加基础几何图形
- 算法处理

HTML5 canvas为我们提供了一块画布，让前端也有了操作位图的功能：图片旋转、缩放、滤镜、压缩等都可以通过JS来实现。

## 图片基础处理

包括图片绘制、缩放、拉伸、裁剪、合成等操作。

### 图片的跨域

canvas 加载的图片源有跨域问题。受限与 CORS 策略，canvas 绘制的图片如果是跨域的，虽然可以使用图像（比如 append 到页面），但是会污染画布，一旦一个画布被污染，就无法提取画布的数据，比如无法使用使用画布toBlob()、toDataURL()、getImageData()方法；当使用这些方法的时候会抛出一个安全错误。

解决方案：

```js
// 手动设置图片的跨域头
img.setAttribute('crossOrigin', 'anonymous');
```

Tips：

- `crossOrigin`需要严格设置，既**只有是线上图片时，才设置**，而本地路径或者`base64`时，则一定不能设置，否则在某些系统下会报错，导致图片加载失败。

### 图片绘制

#### context.drawImage()

通过[context.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)可以实现图片绘制、缩放、拉伸和裁剪等操作:

```js
context.drawImage(img,dx,dy);
context.drawImage(img,dx,dy,dwidth,dheight);
context.drawImage(img,sx,sy,swidth,sheight,dx,dy,dwidth,dheight);
```

![drawImage](..\images\Canvas_drawimage.jpg)

参数：

- *img*
绘制到上下文的元素。
- *sx*
可选。`image`被绘制区域（裁剪）的起始左上x坐标。
- *sy*
可选。`image`被绘制区域（裁剪）的起始左上y坐标。
- *swidth*
可选。`image`被绘制区域（裁剪）的宽度。如果不说明，整个矩形（裁剪）从坐标的`sx`和`sy`开始，到`image`的右下角结束。。
- *sheight*
可选。`image`被绘制区域（裁剪）的高度。
- *dx*
`image`的左上角在目标canvas上 X 轴坐标。
- *dy*
`image`的左上角在目标canvas上 Y 轴坐标。
- *dwidth*
可选。`image`在目标canvas上绘制的宽度。 允许对绘制的`image`进行缩放。 如果不说明， 在绘制时`image`宽度不会缩放。
- *dheight*
可选。`image`在目标canvas上绘制的高度。 允许对绘制的`image`进行缩放。 如果不说明， 在绘制时`image`高度不会缩放。

示例，图片裁剪+缩放+合成：

```js
import playImgUrl from '@/assets/image/play.png';

function getShareImg(imgUrl) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 60;
    canvas.height = 60;

    const playImg = new Image();
    playImg.src = playImgUrl;

    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imgUrl;
    img.onload = () => {
        // 裁剪位置、尺寸计算
        const { height, width } = img;
        let x = 0;
        let y = 0;
        let len;
        if (width > height) {
            x = (width - height) / 2;
            len = height;
        } else {
            y = (height - width) / 2;
            len = width;
        }
        console.log('img load', imgUrl, width, height, x, y, len);

        ctx.drawImage(img, x, y, len, len, 0, 0, 60, 60);
        ctx.drawImage(playImg, 0, 0, 120, 120, 15, 15, 30, 30);
        this.shareImg = canvas.toDataURL();
    };
},
```

### 图片变形

#### context.translate()

通过 [context.translate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate) ，移动 canvas 原点 x、y，对当前网格添加平移变换。

```js
context.translate(x, y);
```

#### context.rotate()

通过 [context.rotate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate) ，旋转坐标轴，旋转中心点为 canvas 原点。

```
context.rotate(angle);
```

参数：

- angle：顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： `degree * Math.PI / 180` 

#### context.scale()

[context.scale()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/scale) 根据 x 水平方向和 y 垂直方向，为 canvas 单位添加缩放变换。

```
context.scale(x, y);
```

参数：

- x：水平方向的缩放因子。
- y：垂直方向的缩放因子。

#### context.transform()

[context.transform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/transform) 使用参数描述的矩阵多次叠加当前的变换矩阵。可以缩放、旋转、移动和倾斜上下文。

```
context.transform(a, b, c, d, e, f);
```

示例，图片旋转：

```js
function rotateImg(imgUrl) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imgUrl;
    img.onload = () => {
        const { height } = img;
        // 将参照点移动到画板的中心点；
        // canvas.width / 2, canvas.height / 2
        ctx.translate(50, 50);
        // 旋转画板
        ctx.rotate((Math.PI / 180) * 45);
        // 绘制图片
        ctx.drawImage(img, 0, 0, height, height, -50, -50, 100, 100);
        // 导出图片
        console.log(canvas.toDataURL());
    };
}
```

### 图片生成

#### canvas.toDataURL()

使用 [canvas.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL) 可以将 canvas 转为一个 base64 的图片。

```js
canvas.toDataURL(type, encoderOptions);
```

参数：

- type
  可选，图片格式，默认为 `image/png`，还有`image/jpeg`，Chrome支持`image/webp`类型。
- encoderOptions
  可选，在指定图片格式为 `image/jpeg` 或 `image/webp`的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。





## 参考链接

[JavaScript中的图片处理与合成(一) - 掘金](https://juejin.im/post/6844903568823042055)

[canvas的学习方法，学习曲线- 掘金](https://juejin.im/post/6844903608379506702)

[学习HTML5 Canvas这一篇文章就够了-CSDN博客...](https://blog.csdn.net/u012468376/article/details/73350998)

[Canvas | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

[html2canvas | GitHub](https://github.com/niklasvh/html2canvas)

[启用了 CORS 的图片 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)

