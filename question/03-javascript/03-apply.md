# 应用&扩展


## 数组去重方法

1. 利用for嵌套for，然后splice去重：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。NaN, {} 没有去重，null会消失。

2. indexOf()：NaN，{}没去重。

3. sort()：利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。NaN、{}没有去重。

4. includes()：利用includes检测数组是否有某个值，去重。{}没有去重。

5. 利用Set()去重：代码量少，但是无法去掉重复{}。

   ```javascript
   [...new Set(arr) ]
   Array.from(new Set(arr))
   ```

   利用for嵌套for，然后splice去重（ES5中最常用）：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。NaN, null, {} 的去重会出问题。

6. hasOwnProperty：利用hasOwnProperty 判断是否存在对象属性。完美去重。

7. filter()

8. 递归

9. Map()

[JavaScript数组去重（12种方法，史上最全） - 前端开发随笔 ...](https://segmentfault.com/a/1190000016418021)

[7种方法实现数组去重- 掘金](https://juejin.im/post/5aed6110518825671b026bed)


## 对象的浅拷贝、深拷贝

### 浅拷贝

1. Object.assign()
2. 展开运算符...
3. Array.prototype.concat()
4. Array.prototype.slice()

### 深拷贝

1. 递归

   思想：对于简单类型，直接复制。对于引用类型，递归复制它的每一个属性。

2. JSON.parse(JSON.stringify(obj));

   原理就是先将对象转换为字符串，再通过JSON.parse重新建立一个对象。

   但是这种方法的局限也很多：

   - 不能复制function、正则、Symbol
   - 循环引用报错
   - 相同的引用会被重复复制

3. 函数库lodash

参考笔记：JavaScript-对象-浅拷贝、深拷贝



## 数字显示千分号

方案一：使用原生方法，支持带小数点的数字，缺点是有些浏览器不支持。

```js
function formatNumber(num) {
    return num.toLocaleString();
}
```

方案二：使用正则表达式。

```js
function formatNumber(num) {
    let parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // parts[0].replace(/(\d)(?=(?:\d{3})+$)/g,'$1,');
    return parts.join('.');
}
```

方案三：将数字转换成字符串数组处理。

```js
function formatNumber(num) {
    let parts = num.toString().split('.');
    let arr = parts[0].split('');
    for (let i = arr.length - 3; i > 0; i -= 3) {
        arr.splice(i, 0, ',');
    }
	parts[0] = arr.join('');
    return parts.join('.');
}
```



## 参考链接

[javascript 带千分号显示数字](https://blog.csdn.net/jobschen/article/details/47860239)

