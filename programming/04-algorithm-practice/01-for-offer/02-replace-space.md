# 替换空格

## 题目

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。



## 题解

### replace + 正则

使用原生方法，正则替换。

```js
function replaceSpace(str)
{
    // write code here
    return str.replace(/\s/g, '%20');
}
```

**String.prototype.replace(regexp|substr, newSubstr|function)**

**replace()** 方法返回一个由替换值（`replacement`）替换一些或所有匹配的模式（`pattern`）后的新字符串。模式可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp)，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。

原字符串不会改变。

### 遍历

不用原生方法，遍历str，替换掉空格。

考虑如果从前往后替换，会导致字符移动次数过多，因此，选择从后向前替换。

那么替换后的字符串长度如何计算呢？这就需要先进行一次遍历，获取空格的个数。那么 newLen = len + 2*count。

由于js中的字符串不能像c++一样根据索引赋值，可以用一个数组存新的字符，然后用join方法连接。（如果是c++这种，空间复杂度会更低）

```js
function replaceSpace(str)
{
    const len = str.length;
    let ret = [];
    let count = 0;

    for (let i = 0; i < len; i++) {
        if (str[i] === ' ') {
            count++;
        }
    }

    for (let i = len - 1; i >= 0; i--) {
        if (str[i] === ' ') {
            ret[i + 2 * count] = '0';
            ret[i + 2 * count - 1] = '2';
            ret[i + 2 * count - 2] = '%';
            count--;
        } else {
            ret[i + 2 * count] = str[i];
        }
    }
    
    return ret.join('');
}
```



## 参考链接

[牛客网讨论](https://www.nowcoder.com/questionTerminal/4060ac7e3e404ad1a894ef3e17650423)

[String.prototype.*replace*() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

