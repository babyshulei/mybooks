# 基础语法

## 代码注释

```dart
// 单行注释

/*
 * 多行注释
 */

/**
 * 文档注释
 */

/// 使用三个斜杠开头
/// 这是Dart特有的文档注释
```

## 内置数据类型



![数据类型](.\images\data-type.png)



> 在Dart中，所有能够使用变量引用的都是对象，每个对象都是一个类的实例。数字、函数和 `null` 也都是对象。所有的对象都继承于Object类。

要注意，没有初始化的变量默认值为 `null`。数值类型变量的默认值也是 `null`。

数值类型`num`有两个具体子类，分别为`int`和`double`，其中`int`为整数值，范围是`-2^53`至`2^53`之间；`double`则是64位的双精度浮点数。



## 变量与常量

### 定义变量

Dart中定义变量有两种方式，一种是静态类型语言常用的方式，显式指定变量类型，另一种则是动态语言的常用方式，不指定类型，由vm自动推断。

```dart
// 1.通过显式指定类型来定义变量
String name = "张三";
num age = 18;

// 2.使用关键字var，不指定类型
var address = "深南大道";
var id = 100;

/* 使用var定义变量，即使未显式指定类型，一旦赋值后类型就被固定
 * 因此使用var定义的变量不能改变数据类型
 */
var number = 19;
// 以下代码错误，无法运行，number变量已确定为int类型
number = "2019";
```

如想动态改变变量的数据类型，应当使用`dynamic`或`Object`来定义变量。

```dart
// dynamic声明变量
dynamic var1 = "hello";
var1 = 19;
print(var1);    // 19

// Object声明变量
Object var2 = 20;
var2 = "Alice";
print(var2);    // Alice
```

### 定义常量

Dart中定义常量也有两种方式，一种使用`final`关键字，同Java中的用法， 一个 final 变量只能赋值一次；另一种是Dart的方式，使用`const`关键字定义。

```dart
// 1.使用final关键字定义常量
final height = 10;

// 2.使用const关键字定义常量
const pi = 3.14;
```

需要注意，`final`定义的常量是运行时常量，而`const`常量则是编译时常量，也就是说`final`定义常量时，其值可以是一个变量，而`const`定义的常量，其值必须是一个字面常量值。

```dart
final time = new DateTime.now(); // 正确
const time = new DateTime.now(); // 错误


const list = const[1,2,3];       // 正确
const list = [1,2,3];            // 错误
```

## 内置类型的常用操作

### 数值类型

```dart
// String 转 int
var one = int.parse('1');

// String 转 double
var onePointOne = double.parse('1.1');

// int 转 String
String oneAsStr = 1.toString();

// double 转 String
String piAsStr = 3.14159.toStringAsFixed(2); // 保留两位 '3.14'

// Dart也支持整数位操作，<<、 >>、&、|
print((3 << 1) == 6);  // 0011 << 1 == 0110
print((3 >> 1) == 1);  // 0011 >> 1 == 0001
print((3 | 4)  == 7);  // 0011 | 0100 == 0111
```

### 字符串

> 值得一提的是，Dart中提供的字符串`插值表达式`使字符串格式化变得异常方便。

```dart
// 1.Dart可以使用单引号或双引号来创建字符串
var s1 = "hello";
var s2 = 'world';

// 2.类似Python，Dart可以使用三引号来创建包含多行的字符串
var multiLine1 = """你可以像这样，创建一个
包含了多行的字符串内容
""";

var multiLine2 = '''你也可以使用三个单引号，创建一个
包含了多行的字符串内容
''';

// 3.类似Python，还可以在字符串字面值的前面加上`r`来创建原始字符串，则该字符串中特殊字符可以不用转义
var path = r'D:\workspace\code';

// 4.Dart支持使用"+"操作符拼接字符串
var greet = "hello" + " world";

// 5.Dart提供了插值表达式"${}"，也可以用于拼接字符串
var name = "王五";
var aStr = "hello,${name}";
print(aStr);    // hello,王五

// 当仅取变量值时，可以省略花括号
var aStr2 = "hello,$name"; // hello,王五

// 当拼接的是一个表达式时，则不能省略花括号
var str1 = "link";
var str2 = "click ${str1.toUpperCase()}";
print(str2);   // click LINK

// 6. 与Java不同，Dart使用"=="来比较字符串的内容
print("hello" == "world");
```

### 布尔类型

> Dart中的布尔类型仅有`false`、`true`两个值，不能使用0、非0或者`null`、非`null`来表达`false`和`true`。注意，布尔类型的默认值为`null`

```dart
bool flags;
print(flags);    // null
```

### 列表

Dart中列表操作与JavaScript中的数组相似。

```dart
// 创建列表
var list = [1, 2, 3];
// 下标从0开始。使用length可以访问list的长度
print(list[0]);
print(list.length);

// 可以使用add添加元素
list.add(5);

// 可在list字面量前添加const关键字，定义一个不可改变的 列表（编译时常量）
var constantList = const [1, 2, 3];
constantList[1] = 1;     // 报错
```

### 映射

又称为关联数组，相当于Java中的`HashMap`

```dart
// 1.通过字面量创建Map
var gifts = {
  'first' : 'partridge',
  'second': 'turtledoves',
  'fifth' : 'golden rings'
};

// 2.使用Map类的构造函数创建对象
var pic = new Map();
// 往Map中添加键值对
pic['first'] = 'partridge';
pic['second'] = 'turtledoves';
pic['fifth'] = 'golden rings';

// 3.获取Map的长度
print(pic.length);

// 4.查找Map
pirnt(pic["first"]);
print(pic["four"]);    // 键不存在则返回 null
```

## 函数

> 在Dart中，函数（或方法） 也是对象，它的类型是 `Function`。 这意味着，函数可以赋值给变量，也可以当做其他函数的参数。

### 定义函数

Dart中定义函数，基本上与Java类似

```dart
String greet(String name){
    return "hello,$name";
}
```

在Dart中，类型是可选，可以省略显式的类型，但仍然建议显式指定类型。

```dart
greet(name){
    return "hello,$name";
}
```

要注意，函数也是对象，所有函数都有返回值。当没有指定返回值的时候，函数会返回`null`。当然，如果你强行使用`void`来修饰函数，则函数真的没有返回值，这种情况就另当别论了。

### 函数的参数

Dart中支持两种可选参数

- 命名可选参数
- 位置可选参数

在Java中通常使用方法重载来实现同名方法的不同参数调用，Dart中则可以通过可选参数来实现相同效果。

#### 命名可选参数

先来看一下`命名参数`，它使用花括号来定义参数列表

```dart
// 定义一个函数，参数列表用花括号包裹
enableFlags({bool bold, bool hidden}) {
    // do something
}

// 调用方式，传参时使用"参数名:值"的形式
enableFlags(hidden:true,bold:false);
```

如果在定义函数时，给参数列表中的参数设置默认值，则该参数就是可选的，函数调用时可以忽略该参数，使用默认的值。

```dart
// 定义add函数
add({int x, int y=1, int z=0}){
    print(x + y + z;
}

// 调用
add(x:18);              // 19
add(x:18, y:2, z:10);   // 30
```

这里需要注意一下，SDK 1.21之前的版本中，命名参数不能使用`=`号来设置默认值，而SDK 1.21之后，只能使用`=`号来设置默认值。因此，请检查并升级SDK版本。

#### 位置可选参数

`位置可选参数`使用中括号来定义参数列表，中括号中的参数是可选的

```dart
// 定义add函数
add(int x, [int y, int z]){
    int result = x;
    if (y !=  null){
        result = result + y;
    }

    if (z !=  null){
        result = result + z;
    }
    print(result);
}

// 调用
add(18);           // 18
add(18,12);        // 30
add(18, 12, 15);   // 45
```

给`位置可选参数`设置默认值

```dart
// 定义add函数
add(int x, [int y=0, int z=0]){
    print(x + y + z);
}
```

最后需要注意一下`命名可选参数`与`位置可选参数`的区别，前者中的参数与顺序无关，无需按顺序传参，且传参数时需使用冒号；后者与顺序相关，传参必须依照顺序。

### 匿名函数

> 大部分函数都有名字，但我们也可以创建没有名字的函数，称为匿名函数，也被称为lambda表达式或者闭包。

```dart
// 定义匿名函数，并将其赋值给一个变量func，注意，函数体最后的花括号处必须有分号结束。
var func = (x,y){
    return x + y;
};

print(func(10,11));    // 21
```

### 箭头函数

> Dart中的箭头函数与JavaScript中的基本相同。当函数体中只包含一个语句时，我们就可以使用`=>`箭头语法进行缩写。注意，箭头函数仅仅只是一个简洁表达的语法糖。

普通函数

```dart
add(num x, num y){
    return x + y;
}

print(add(18,12));    // 30
```

箭头函数

```dart
// 与上面的普通函数完全等价
add(num x, num y) => x + y;

print(add(18,12));    // 30
```

箭头函数省略了花括号的表达，箭头后面跟一个表达式，函数的返回值也就是这个表达式的值。另外，箭头函数也可以与匿名函数结合，形成匿名箭头函数。

```dart
var func = (num x, num y) => x + y;
```

## 运算符

Dart语言中的运算符与Java中的绝大多数相同。

### 算术运算符

`+`、`-`、`*`、`/`、`%`同Java语言

Dart中又多出了一个整除运算符`~/`，与普通除号的区别是将相除后的结果取整返回。

### 类型判定运算符

以下是Dart增加的类型相关的运算符。

| 操作符 | 解释                            |
| ------ | ------------------------------- |
| `as`   | 用于类型转换                    |
| `is`   | 如果对象是指定的类型就返回 True |
| `is!`  | 如果对象不是指定的类型返回 True |

当 `obj` 实现了 `T` 的接口时， `obj is T` 才是 true。类似于Java中的`instanceof`。

Dart中使用 `as` 操作符把对象转换为特定的类型，如无法转换则会抛出异常，因此在转换前最好使用`is`运算符进行检测。

```dart
// 将p转换为Person类型再操作
(p as Person).name = 'Bruce';
```

### 条件表达式

Dart中也支持三目表达式 `condition ? expr1 : expr2`

除此外，Dart还增加了非空条件判断符`??` `expr1 ?? expr2` 上述运算表示，如果expr1的值不等于`null`，则返回其值； 否则执行表达式expr2并返回其结果。

```dart
var str1 =  "Hello";
var str2 =  "world";
var result = str1 ?? str2.toUpperCase();
```

### 级联运算符

> 我们通常使用`.`操作符调用对象的方法，这在Dart中也是支持的，但是Dart另外增加了一种级联运算符`..`，用两个点表示。

`级联运算符`可以在同一个对象上连续调用多个方法以及访问成员变量。 使用它可以避免创建临时变量， 写出更流畅的代码。

假如类Person有三个方法，`setName`、`setAge`、`save`，则可如下调用

```dart
new Person()..setName("Bob")..setAge(20)..save();
```

使用`级联运算符`调用方法，无需该方法返回对象本身即可连续的流式的调用该对象的其他方法。

### 条件成员访问符

> 在Java中很容易碰到恼人的空指针错误，因此在方法调用前需要进行对象的非空判断，这样的判断语句使代码变得冗长，可读性差，不整洁。Dart中则发明了一个新的运算符用于处理此类情况。

条件成员访问符`?.`，它和`.`类似，但是运算符左边的对象不能为`null`，否则返回`null`，若对象不为`null`，则返回对象本身。

```dart
// list1默认值为null
List list1;
print(list1?.length);  // null

List list2 = [];
print(list2?.length);  // 0
```

## 分支与循环

### 条件分支

Dart中的条件分支基本与Java相同

`if`条件分支

```dart
if(i < 0){
  print('i < 0');
}else if(i == 0){
  print('i = 0');
} else {
  print('i > 0');
}
```

`switch`条件分支

```dart
// 在switch的case中可以使用整数、字符串、枚举类型和编译时常量
String command = 'OPEN';
switch (command) {
  case 'CLOSED':
    break;
  case 'OPEN':
    break;
  default:
    print('Default');
}
```

### 循环语句

#### 基本循环

Dart中的基本循环语句与Java相同

```dart
// for循环
for(int i = 0; i < 9; i++) {
  print(i);
}

// while循环
while(true){
  //do something
}

// do-while循环
do{
  //do something
} while(true);
```

#### 特有循环

```dart
var myList = ['Java','JavaScript','Dart'];

// for...in...循环，类似Java中的增强for
for (var it in myList ){
    print(it);
}

// forEach循环。其参数为一个Function对象，这里传入一个匿名函数
myList.forEach((var it){
    print(it);
});

// 可以使用匿名箭头函数简写
myList.forEach((it) => print(it));
```

使用循环遍历Map

```dart
var myMap = {
'zhangsan':'201901',
'lisi':'201902',
'wangwu':'201902'
};

// forEach遍历Map
myMap.forEach((k, v) =>  print("$k : $v"));

// 根据键获取值来遍历。通过keys返回Map中所有键的集合
for(var k in myMap.keys){
    print("$k : ${myMap[k]}");
}
```

## 类和对象

### 类的定义

```dart
// Dart中定义一个类
class Person {
  String name;
  int age;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}
```

Dart中的类与Java中的相似，不同的是，Dart中没有`private`、`public`这些成员访问修饰符。如果是类私有的成员，不希望外面访问，只需要在成员变量之前加上一个下划线`_`变为私有即可。

以上代码，在Dart中还有一种简化写法，可以自动在构造方法中对成员变量初始化。

```dart
// Dart中定义一个类
class  Person {
    String name;
    int age;

    // 在构造方法中初始化成员变量时，可使用如下写法简化
    Person(this.name, this.age);

    // 如需处理其他变量时，也可单独对其操作
    // Person(this.name, this.age, String address){
    //     print(address);
    // }
    // 注意，构造方法不能重载，以上注释掉
}
```

另外还需要注意一点，Dart中没有构造方法的重载，不能写两个同名的构造方法。

### Getters 和 Setters方法

在Java中，一般不会直接在类的外部去访问类成员，通常使用setter和getter方法来操作类的成员变量。而在Dart语言中，所有类中都包含隐式的getter方法，对于非`final`修饰的成员，类中还包含隐式的setter方法。这就意味着，在Dart中，你可以直接在类外部通过`.`操作符访问类成员。这一特点使得Dart语法更加简洁，不会写出满屏的setXXX、getXXX方法。

当然，很多时候我们调用setter和getter方法并不仅仅是为了赋值和访问，而是为了一些额外的处理，这时候我们只需要使用`set`与`get`关键字实现setter和getter方法即可。

```dart
class  Person {
    String userName;

    Person(this.userName);

    // 方法名前加get关键字
    String get name{
        return  "user:"  +  this.userName;
    }

    // 方法名前加set关键字
    set name(String name){
        // do something
        this.userName = name;
    }
}

void  main() {
    var p = new Person("zhangsan");
    print(p.name);   // user:zhangsan
    p.name = "Jack";
    print(p.name);   // user:Jack
}
```

> 注意，在创建对象时，`new`关键字并不是必须的，可以省略不写。在写Flutter界面时，不建议写`new`关键字实例化对象，因为Flutter框架中没有类似的xml语言来描述UI界面，界面也是使用Dart语言来写，在使用Dart写UI时，要保持代码的简洁和结构化，省略`new`会更友好。

### 构造方法

如果没有定义构造方法，则会有一个默认的无参构造方法，并且会调用超类的无参构造方法。

#### 命名构造方法

上面已经说过，Dart类中两个同名构造方法不能重载，但是Dart语言为类新增了一种称为`命名构造方法`的东西。

```dart
class  Person {
    String userName;
    int age;

    Person(this.userName, this.age);

    // 命名构造方法
    Person.fromData(Map data) {
        this.userName = data['name'];
        this.age = data['age'];
    }
}

void  main() {
    // 使用命名构造方法创建对象
    var p = new Person.fromData({
        "name":"Bob",
        "age":19
    });
    print(p.userName);
}
```

使用命名构造方法可以为一个类实现多个构造方法，也可以更清晰的表明意图。

#### 常量构造方法

如果想提供一个状态永远不变的对象，在Dart中，我们可以创建一个编译时常量对象，节省开销。

```dart
class  ConstPoint {
    final num x;
    final num y;

    // 使用const修构造方法
    const ConstPoint(this.x, this.y);

    // 编译时常量对象，需使用const来创建对象
    static final ConstPoint origin = const  ConstPoint(0, 0);
}

void  main() {
    print(ConstPoint.origin.x);
    print(ConstPoint.origin.y);
}
```

#### 工厂构造方法

当我们需要创建一个新的对象或者从缓存中取一个对象时，工厂构造方法就派上了用场。

```dart
class  Logger {
    final String name;

    // 创建一个静态Map做为缓存
    static final Map<String, Logger> _cache =  <String, Logger>{};

    // 定义一个命名构造方法，用下划线"_"修饰，将构造方法私有化
    Logger._internal(this.name);

    // 使用关键字factory修饰类同名构造方法
    factory Logger(String name) {
        if (_cache.containsKey(name)) {
            return _cache[name];
        } else {
            // 调用命名构造方法创建新对象
            final logger= new  Logger._internal(name);
            _cache[name] = logger; // 存入缓存
            return logger;
        }
    }
}

void  main() {
    var uiLog = new Logger('UI');
    var eventLog = new Logger('event');
}
```

#### 构造方法重定向

有时候一个构造方法会调动类中的其他构造方法来实例化，这时候可以使用构造方法重定向，

```dart
class Point {
  num x;
  num y;

  // 同名构造方法
  Point(this.x, this.y);

  // 命名构造方法重定向到同名构造方法，中间使用一个冒号
  Point.alongXAxis(num x) : this(x, 0);
}
```

### 类的初始化列表

熟悉C++的朋友应该对初始化列表很了解了，Java中是没有这个特性的。



```dart
class  Point {
    final  num x;
    final  num y;
    final  num distance;

    Point(x, y)
        : x = x,
          y = y,
          distance =  sqrt(x * x + y * y){
             print("这是构造方法");
          }
}

void  main() {
    var p =  new  Point(2, 3);
    print(p.distance);
}
```

```
// 普通构造方法
类名() {
}

// 带初始化列表的构造方法
类名():赋值语句 {
}
```

- 初始化列表位于构造方法的小括号与大括号之间，在初始化列表之前需添加一个冒号。
- 初始化列表是由逗号分隔的一些赋值语句组成。
- 它适合用来初始化 `final`修饰的变量
- 初始化列表的调用是在构造方法之前，也就是在类完成实例化之前，因此初始化列表中是不能访问 `this`的

### 运算符重载

这个特性，又很类似于C++中的运算符重载，在Java中是没用这种概念的。

```dart
class Point {
  int x;
  int y;

  Point(this.x, this.y);

  // 使用operator关键字，为该类重载"+"运算符
  Point operator +(Point p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  // 为该类重载"-"运算符
  Point operator -(Point p) {
    return new Point(this.x - p.x, this.y - p.y);
  }
}

void main(){
   var p1 = new Point(1,5);
   var p2 = new Point(7,10);

   // 重载运算符后，类可以使用“+”、“-” 运算符操作
   var p3 = p1 + p2;
   var p4 = p2 - p1;

   print("${p3.x}, ${p3.y}");
   print("${p4.x}, ${p4.y}");
}
```

打印结果：

```
8, 15
6, 5
```

Dart中允许重载的运算符如下：

- `+`  、 `–`  、 `*`  、 `~/` 、 `/`  、 `%`  、 `^`   
- `<`  、 `>`  、 `<=` 、 `>=` 、 `==` 、 `[]` 、 `[]=` 
- `&`  、 `~`  、 `<<` 、 `>>` 、 `|` 


### 类的继承

Dart中的继承，与Java中相似，可以使用关键字`extends`继承父类，使用关键字`super`引用父类

```dart
class Father {
    myFunction(){
        // do something
    }
}

class Son extends Father {

    @override
    myFunction(){
        super.myFunction();
        // do something
    }
}
```

我们知道，Java中的类仅支持单继承，而Dart中的类也只支持单继承。但是Dart可以使用一种被称为混入的方式来达到多继承的效果，这需要使用`with`关键字。

```dart
// 首先定义三个父类
class Father1 {
    a(){
      print("this is a func");
    }

    common(){
        print("common Father1");
    }
}

class Father2 {
    b(){
      print("this is b func");
    }

    common(){
        print("common Father2");
    }
}

class Father3 {
    c(){
      print("this is c func");
    }

    common(){
        print("common Father3");
    }
}

//定义子类
class Son extends Father1 with Father2,Father3{

}

void main() {
  var obj = new Son();
  obj.common();
  obj.a();
  obj.b();
  obj.c();
}
```

打印结果：

```
common Father3
this is a func
this is b func
this is c func
```

要注意，以上继承写法中，也可以直接使用`with`，等价于如下写法

```dart
class Son with Father1,Father2,Father3{

}
```

### 接口抽象

#### 抽象类

Dart语言没有提供 `interface` 关键字来定义接口，但是Dart语言中保留了抽象类，同Java，使用 `abstract` 关键字来修饰抽象类。而Dart中的抽象类，实际上就相当于Java中的接口。

```dart
abstract class Base {
    // 省略函数体即可定义抽象方法，不需加关键字
    func1();
    func2();
}
```

> 注意，抽象类是不能被实例化的，子类继承抽象类时，必须实现全部抽象方法。

#### 隐式接口

在Dart中，每个类都隐式的定义了一个包含所有实例成员的接口， 并且该类实现了这个接口。

因此，如果我们想实现某个接口，但又不想继承，则可以使用这种隐式接口机制。我们需要用到关键字`implements`。

```dart
class People {
  void greet(){
    print("Hello");
  }
}

class Student implements People{
  @override
  void greet(){
    print("Hi,I'm Alice.");
  }
}

greet(People p){
  p.greet();
}

void main() {
  greet(new Student());
}
```

## 泛型

Dart中也支持泛型，用法与Java中类似。

```dart
// 泛型
var names = new List<String>();
names.add("zhangsan")

var maps = new Map<int, String>();
maps[1]="value";

// 字面量写法
var infos = <String>['Seth', 'Kathy', 'Lars'];

var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots'
};
```

## 异常处理

如果关心具体异常，针对不同异常进行不同处理，可以使用`try...on`处理异常，`finally`是可选的，用于最后的处理。

```dart
  try {
      // 使除数为0
      print(11~/0);
  } on IntegerDivisionByZeroException {
      print("除数为0");
  } on Exception {
      print("Exception");
  } finally {
      print("finally");
  }
```

不关心具体异常，只想捕获，避免异常继续传递，则可以使用`try...catch` 处理

```dart
  try {
      print(11~/0);
  } catch(e){
      // 打印报错信息
      print(e);
  }finally {
      print("finally");
  }
```

如果想获取更多异常信息，可以使用两个参数的`catch`，第二个参数是异常的调用栈信息

```dart
  try {
      print(11~/0);
  } catch(e,s){
      print(s);
  }
```

如果你既想针对不同异常进行不同处理，还想打印调用栈信息，那就将两种结合起来使用

```dart
  try {
      print(11~/0);
  } on IntegerDivisionByZeroException catch(e,s){
      print(s);
  } on Exception catch(e,s){
      print(s);
  }
```

## 库与导入

Dart使用`import`语句用来导入一个库，后面跟一个字符串形式的Uri来指定表示要引用的库。

```dart
// 指定dart:前缀，表示导入标准库，如dart:io
import 'dart:math';

// 也可以用相对路径或绝对路径来引用dart文件
import 'lib/student/student.dart';

// 指定package:前缀，表示导入包管理系统中的库
import 'package:utils/utils.dart';
```

导入库时，可以使用`as`关键字来给库起别名，避免命名空间冲突。

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// 使用lib1中的Element
Element element1 = new Element();
// 使用lib2中的Element
lib2.Element element2 = new lib2.Element(); 
```

使用`show`和`hide`关键字控制库中成员的可见性。

```dart
// 仅导入foo，屏蔽库中其他成员
import 'package:lib1/lib1.dart' show foo;

// 屏蔽foo，库中其他成员都可见
import 'package:lib2/lib2.dart' hide foo;
```

为了减少 APP 的启动时间，加载很少使用的功能，我们还可以延迟导入库。使用 `deferred as`关键字延迟导入。

```dart
import 'package:deferred/hello.dart' deferred as hello;

// 当需要使用时，再通过库标识符调用 loadLibrary函数加载
hello.loadLibrary();
```

## 异步编程

Dart与JavaScript一样，是一个单线程模型。但这并不意味着Dart中不能进行异步编程，只是这种异步编程区别于传统的多线程异步方式。

Dart中的所有代码都只在一个线程上运行，但Dart代码可以运行在多个**isolate**上。**isolate**可以看做一个微小的线程，**isolate**由虚拟机调度，**isolate**之间没有共享内存，因此它们之间没有竞争，不需要锁，不用担心死锁，因此开销小，性能高。由于没有共享内存，所以它们之间唯一的通信只能通过Port进行，而且Dart中的消息传递也总是异步的。

Dart中两种方式可以使用`Future`对象来进行异步编程

- 使用 `async` 和 `await`关键字
- 使用 Future API

使用`async`和`await`编写代码非常简单，而且编写的代码看起来有点像同步代码，实际上是异步的。

```dart
// 导入io库，调用sleep函数
import 'dart:io';

// 模拟耗时操作，调用sleep函数睡眠2秒
doTask() async{
  await sleep(const Duration(seconds:2));
  return "Ok";
}

// 定义一个函数用于包装
test() async {
  var r = await doTask();
  print(r);
}

void main(){
  print("main start");
  test();
  print("main end");
}
```

运行结果：

```
main start
main end
Ok
```

在函数签名中加入`async`关键字，表示该函数异步执行，`await`表示等待异步结果执行完成返回`Future`对象。但有一点需要注意，`await`只能在`async`函数中出现，因此往往需要再定义一个`async`函数，用于包装。上述代码中`test`函数就是用于包装。



## 参考链接

[Dart语言 45分钟快速入门（上）](https://github.com/arcticfox1919/learn-dart/blob/master/45分钟快速入门（上）.md)

[Dart语言 45分钟快速入门（下）](https://github.com/arcticfox1919/learn-dart/blob/master/45分钟快速入门（下）.md)

