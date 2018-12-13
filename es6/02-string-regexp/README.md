# 2 字符串和正则表达式

> 2018-11-19 @wsl

## 1. 更好的Unicode支持

在ES6以前，JavaScript字符串一直基于16位字符编码（UTF-16）进行构建。

UTF-16中，字符串的字符有两种，一种是由一个编码单元16位表示的BMP（Basic Multilingual Plane，基本多文种平面）字符，另一种是由两个编码单元32位表示的辅助平面（supplementary plane）字符。

 

### 1.1 codePointAt()方法

ES6 新增了完全支持UTF-16的 codePointAt() 方法。

对于BMP字符集中的字符，codePointAt() 方法的返回与charCodeAt()方法的相同。非BMP的，位置0处的返回不同。

```javascript
let text = "𠮷";
console.log(text.codePointAt(0)); // 134071
```

检测一个字符占用的编码单元数量，可以调用字符的codePointAt()方法：

 ```javascript
function is32Bit(c) {
	return c.codePointAt(0) > 0xFFFF
}
 ```

 

### 1.2 String.fromCodePoint()方法

与codePointAt()方法相反，该方法根据指定的码位生成一个字符。相当于 String.fromCharCode()的完整版。

```javascript
console.log(String.fromCodePoint(134071)); // 𠮷
```

ES5和ES6对比

| ES5                   | ES6                    | 作用                                           |
| --------------------- | ---------------------- | ---------------------------------------------- |
| charCodeAt()          | codePointAt()          | 返回与字符串中给定位置对应的码位，即一个整数值 |
| String.fromCharCode() | String.fromCodePoint() | 根据指定的码位生成一个字符                     |

 

### 1.3 normalize()方法

提供Unicode的标准化形式。这个方法接受一个可选的字符串参数，指明应用以下的某种Unicode标准化形式：

- NFC，默认参数，表示“标准等价合成”（Normalization      Form Canonical Composition），以标准等价的方式分解，然后以标准等价方式重组。
- NFD，表示“标准等价分解”（Normalization      Form Canonical Decomposition），以标准等价方式分解。
- NFKC，表示“兼容等价合成”（Normalization      Form Compatibility Composition），以兼容等价方式分解，以标准等价方式重组。
- NFKD，表示“兼容等价分解”（Normalization      Form Compatibility Decomposition），以兼容等价方式分解。

 

### 1.4 正则表达式 u 修饰符

正则表达式可以完成简单的字符串操作，但默认将字符串中的每一个字符按照16位编码单元处理。为解决这个问题，ES6给正则表达式定义了一个支持Unicode的 u 修饰符。

当一个正则表达式添加了u修饰符时，它就从编码单元操作模式切换为字符模式。

例子： 

```javascript
let text = "𠮷";
console.log(text.length); // 2
console.log(/^.$/.test(text)); // false
console.log(/^.$/u.test(text)); // true
```

- 计算码位数量

  ES6不支持字符串码位数量的检测，可以通过u修饰符利用正则表达式获取码位数量。

  例子：

  ```javascript
  function codePointLength(text) {
  	let result = text.match(/[\s\S]/gu);
  	return result ? result.length : 0;
  }
  
  console.log(codePointLength("𠮷bc")); // 3
  console.log(codePointLength("abc")); // 3
  ```

  > 注：这种方法运行效率很低，可以使用字符串迭代器解决效率低的问题。

- 检测u修饰符支持

  ```javascript
  function hasRegExpU() {
  	try {
  		var pattern = new RegExp(".", "u");
  		return true;
  	} catch (e) {
  		return false;
  	}
  }
  ```



## 2. 其他字符串变更

### 2.1 子串识别

一直使用 indexOf() 识别子串，ES6提供了以下3个类似的方法可以达到相同效果：

- includes() 方法

  如果在字符串中检测到指定文本则返回 true，否则返回 false。

- startsWith() 方法

  如果在字符串的起始部分检测到指定文本则返回 true，否则返回 false。

- endsWith() 方法

  如果在字符串的结束部分检测到指定文本则返回 true，否则返回 false。

以上3个方法都接受两个参数：第一个参数指定要搜索的文本；第二个参数是可选的，指定一个开始搜索的位置的索引值。例子：

```javascript
let msg="Hello world!";

console.log(msg.startsWith("Hello")); // true
console.log(msg.endsWith("!")); // true
console.log(msg.includes("o")); // true

console.log(msg.startsWith("o")); // false
console.log(msg.endsWith("world!")); // true
console.log(msg.includes("x")); // false

console.log(msg.startsWith("o", 4)); // true
console.log(msg.endsWith("o", 8)); // true
console.log(msg.includes("o", 8)); // false
```

这三个方法返回的都是布尔值，简化了子串匹配的方法，但如果需要在一个字符串中寻找另一个子串的实际位置，还需要用 indexOf() 方法或 lastIndexOf() 方法。

> 对于 startsWith()、endsWith() 及 includes() 这三个方法，如果没有按照要求传入一个字符串，而是传入一个正则表达式，则会触发一个错误产生；而 indexOf() 和 lastIndexOf() 方法，它们会把传入的正则表达式转化为一个字符串并搜索它。



### 2.2 repeat() 方法

ES6 还为字符串新增了一个 repeat() 方法，该方法接受一个 number 类型的参数，表示该字符串的重复次数，返回值是当前字符串重复一定次数后的新字符串。

例子：

```javascript
console.log("x".repeat(3)); // xxx
console.log("y".repeat(4.8)); // yyyy
console.log("hello".repeat(2)); // hellohello
console.log("abc".repeat(3)); // abcabcabc
```



## 3. 其他正则表达式语法变更

### 3.1 正则表达式 y 修饰符

它会影响正则表达式搜索过程中的 sticky 属性，当在字符串中开始字符匹配时，它会通知搜索从正则表达式的 lastIndex 属性开始进行，如果在指定位置没能成功匹配，则停止继续匹配。

例子：

```javascript
let text = "hello1 hello2 hello3",
    pattern = /hello\d\s?/,
    result = pattern.exec(text),
    globalPattern = /hello\d\s?/g,
    globalResult = globalPattern.exec(text),
    stickyPattern = /hello\d\s?/y,
    stickyResult = stickyPattern.exec(text);

console.log(result[0]); // "hello1 "
console.log(globalResult[0]); // "hello1 "
console.log(stickyResult[0]); // "hello1 "

pattern.lastIndex = 1;
globalPattern.lastIndex = 1;
stickyPattern.lastIndex = 1;

result = pattern.exec(text);
globalResult = globalPattern.exec(text);
stickyResult = stickyPattern.exec(text);

console.log(result[0]); // "hello1 "
console.log(globalResult[0]); // "hello2 "
console.log(stickyResult[0]); // Uncaught TypeError: Cannot read property '0' of null
```

第一组返回的结果都是"hello1 "，随后，3种模式的 lastIndex 属性都被更改为1，此时正则表达式应该从字符串的第二个字符 "e" 开始匹配。没有修饰符的表达式自动忽略这个变化，仍然匹配"hello1 "；使用了 g 修饰符的表达式，从第二个字符开始搜索继续向后成功匹配 "hello2 "；使用了 y 修饰符的粘滞正则表达式，由于从第二个字符开始匹配不到相应的字符串，就此终止，返回 null。

当执行操作时，y 修饰符会把上次匹配后面一个字符的索引保存在 lastIndex 中；如果该操作匹配的结果为空，则 lastIndex 会被重置为0。g 修饰符的行为与此相同。例子：

```javascript
let text = "hello1 hello2 hello3",
    pattern = /hello\d\s?/,
    result = pattern.exec(text),
    globalPattern = /hello\d\s?/g,
    globalResult = globalPattern.exec(text),
    stickyPattern = /hello\d\s?/y,
    stickyResult = stickyPattern.exec(text);

console.log(result[0]); // "hello1 "
console.log(globalResult[0]); // "hello1 "
console.log(stickyResult[0]); // "hello1 "

console.log(pattern.lastIndex); // 0
console.log(globalPattern.lastIndex); // 7
console.log(stickyPattern.lastIndex); // 7

result = pattern.exec(text);
globalResult = globalPattern.exec(text);
stickyResult = stickyPattern.exec(text);

console.log(result[0]); // "hello1 "
console.log(globalResult[0]); // "hello2 "
console.log(stickyResult[0]); // "hello2 "

console.log(pattern.lastIndex); // 0
console.log(globalPattern.lastIndex); // 14
console.log(stickyPattern.lastIndex); // 14
```

> 关于 y 修饰符还需要注意，只有调用 exec() 和 test() 这些正则表达式对象的方法才会涉及 lastIndex 属性；调用字符串的方法，例如 match()，则不会触发粘滞行为。
>
> 其次，如果使用^字符来匹配字符串开端，只会从字符串的起始位置或多行模式的首行进行匹配。当 lastIndex 为 0 时，如果正则表达式中含有^，则是否使用粘滞正则表达式并无差别；如果 lastIndex 的值在单行模式下不为0，或者在多行模式下不对应行首，则粘滞正则表达式永远不会匹配成功。

检测 y 修饰符是否存在，与检测其他正则表达式修饰符类似，可以通过属性名来检测。也可以检查 sticky 属性，如下例：

```javascript
let pattern = /hello\d/y;
console.log(pattern.sticky);
```

如果 JavaScript 引擎支持粘滞修饰符，则 sticky 属性为 true，否则为false。这个属性是只读的，由该修饰符的存在性所决定。

y 修饰符作为一个新增的语法变更，可以使用以下方法来检测引擎对它的支持程度。

```javascript
function hasRegExpY() {
	try {
		var pattern = new RegExp(".", "y");
		return true;
	} catch (e) {
		return false;
	}
}
```



### 3.2 正则表达式的复制

ES5中，通过给RegExp构造函数传递正则表达式作为参数来复制这个正则表达式。如：

```javascript
var re1 = /ab/i,
	re2 = new RegExp(re1);
```

若给RegExp构造函数提供第二个参数，为正则表达式指定一个修饰符，则ES5会抛出错误。

ES6修改了此行为，第一个参数为正则表达式时，可以通过第二个参数修改其修饰符。

```javascript
let re1 = /ab/i,
	re2 = new RegExp(re1, "g"); // 在ES5中抛出错误，在ES6中正常运行

console.log(re1.toString()); // "/ab/i"
console.log(re2.toString()); // "/ab/g"
```



### 3.3 flags属性

在ES5中，可以通过 source 属性获取正则表达式的文本，但如果要获取使用的修饰符，需要如下代码格式化toString()方法输出的文本：

```javascript
function getFlags(re) {
	var text = re.toString();
	return text.substring(text.lastIndexOf('/') + 1, text.length);
}

// toString() 的返回值为 "/ab/g"
var re = /ab/g;

console.log(getFlags(re)); // g
```

ES6新增了一个flags属性，它与source属性都是只读的原型属性访问器，返回所有应用于当前正则表达式的修饰符字符串。即有：

```javascript
let re = /ab/g;
console.log(re.source); // ab
console.log(re.flags); // g
```



## 4. 模板字面量

DSL（Domain Specific Language，领域专用语言）

GPL（General Purpose Language，通用编程语言）

### 4.1 基础语法

用反撇号（`）进行字符串赋值。字符串内部使用反撇号需要转义（\）。在模板字面量中，不需要转义单、双引号。

```javascript
let message = `\`Hello\` world!`;

console.log(message); // `Hello` world!
console.log(typeof message); // string
console.log(message.length); // 14
```

### 4.2 多行字符串

在ES6之前的版本中，通常都依靠数组或字符串拼接的方法来创建多行字符串。ES6中的模板字面量的语法简单，极大地简化了多行字符串的创建过程。如果你需要在字符串中添加新的一行，只需在代码中直接换行，此处的换行将同步出现在结果中。

反撇号中的所有空白符都属于字符串的一部分，所以要小心缩进。

```javascript
let message = `Multiline
			string`;

console.log(message);	// "Multiline
						//			string"
console.log(message.length); // 19
```

也可以在模板字面量中显式地使用\n来指明应当插入新行的位置。

```javascript
let message = `Multiline\nstring`;
console.log(message);	// "Multiline
						// string"
console.log(message.length); // 16
```



### 4.3 字符串占位符

在一个模板字面量中，你可以把任何合法的JavaScript表达式嵌入到占位符中并将其作为字符串的一部分输出到结果中。

占位符由一个左侧的 ${ 和右侧的 } 符号组成，中间可以包含任意的 JavaScript 表达式。例如：

```javascript
let name = 'Sarah';
let message = `Hello, ${name}!`;

console.log(message); // Hello, Sarah!
```

既然所有的占位符都是 JavaScript 表达式，就可以嵌入除变量外的其他内容，如运算式、函数调用，等等。例如：

```javascript
let count = 5;
let price = 0.8;
let message = `${count} items cost $${(count * price).toFixed(2)}.`

console.log(message); // 5 items cost $4.00.
```

模板字面量本身也是 JavaScript 表达式，所以可以在一个模板字面量里面嵌入另一个。例如：

```javascript
let name = 'Sarah';
let message = `Hello, ${
  `my name is ${name}`
}.`;

console.log(message); // Hello, my name is Sarah.
```





## 附录

### 1. test(), exec(), match(), replace()

| 用法                              | 说明                                                   | 返回值                               |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------ |
| pattern.test(str)                 | 判断 str 是否包含匹配结果                              | 包含返回 true，不包含返回false。     |
| pattern.exec(str)                 | 根据 pattern 对 str 进行正则匹配                       | 返回匹配结果数组,如匹配不到返回 null |
| str.match(pattern)                | 根据 pattern 对 str 进行正则匹配                       | 返回匹配结果数组,如匹配不到返回 null |
| str.replace(pattern, replacement) | 根据 pattern 进行正则匹配,把匹配结果替换为 replacement | 一个新的字符串                       |

