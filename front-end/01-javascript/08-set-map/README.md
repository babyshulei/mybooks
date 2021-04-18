# Set集合与Map集合

## Set 集合

size, add(), delete(), clear(), has(), forEach()

```javascript
// 创建Set集合
let set = new Set();

// 向Set集合添加元素
set.add(4);
set.add(4); // Set集合会自动去重，所以这个add会被忽略
set.add('3'); // Set 集合所存值不会进行强制类型转换，所以这个add会生效

// 获取Set集合的元素数量
console.log(set.size);

// 检测Set集合中是否存在某个值
console.log(set.has('4'));

// 移除Set集合中的某一个元素
set.delete(4);

// 移除Set集合中的所有元素
set.clear();

// 将数组转换为Set集合
let set2 = new Set([1, 2, 2, 3]);
// 将Set集合转换为数组
let array = [...set2]; // 这种方法可以过滤掉原数组的重复值

// 遍历Set集合
set2.forEach(function(value, key, ownerSet) {
    // value：Set集合中下一次索引的位置
    // key：与第一个参数一样的值。为了和数组、Map集合的forEach方法对齐。即Set集合的 key=value
    // ownerSet：被遍历的Set集合本身
});
```

## Week Set 集合

Set类型可以被看做是一个强引用的Set集合。当初始对象被清除后，Set集合仍然会保留这个引用，并可以使用展开运算符将其取出（类似深拷贝）。

ES6引入了另一个类型： Weak Set集合（弱引用 Set 集合）。Weak Set集合只存储对象的**弱引用**，并且不可以存储原始值；集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存。

add(), delete(), has()

```javascript
// 创建WeakSet集合
let set = new WeakSet();
let key = {};

// 向集合中添加对象引用
set.add(key);

// 判断集合中是否存在某对象的引用
set.has(key);

// 删除集合中的对象引用
set.delete(key);
```

> 注意，WeakSet构造函数**不接受任何原始值**，如果添加元素为原始值，程序会抛出错误。

WeakSet集合还有如下特点：

- 在WeakSet实例中，向add()方法传入非对象参数，程序会抛出错误；向has()方法和delete()方法传入非对象参数，会返回false。
- WeakSet集合不可迭代，不能被用于for-of循环。
- WeakSet集合不暴露任何迭代器（如keys()方法 和values()方法），所以无法通过程序本身来检测其中的内容。
- WeakSet集合不支持 forEach() 方法。
- WeakSet集合不支持size属性。

## Map 集合

Map类型是一种储存着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型。

键名的等价性通过Object.is()方法实现，so，5和'5'是不一样滴。

size, set(), get(), delete(), clear(), has(), forEach()

```js
// 创建Map集合
let map = new Map();

// 添加新的元素：set(key, value)方法
map.set('name', 'John');
map.set('age', 20);

// 获取键对应的值：get(key)方法
// 如果键名不存在，会返回undefined
console.log(map.get('name'));

// 删除元素：delete(key)方法
map.delete('age');

// 删除所有元素：clear()方法
map.clear();

// 判断集合中是否存在某键值对：has(key)方法
console.log(map.has('age'));

// 获取Map集合的元素个数：size属性
console.log(map.size);

// 批量添加数据：创建时传入一个数组，数组元素为[key, value]组合
let map2 = new Map([['a', 1], ['b', 3]]);

// 遍历Map集合：forEach方法
// 遍历过程中，会按照键值对插入Map集合的顺序，将相应信息传入forEach方法的回调函数
// 在数组中，会按照数值型索引值的顺序依次传入回调函数
map2.forEach(function (value, key, ownerMap) {
    // value：Map集合中下一次索引的位置
    // key：值对应的键名
    // ownerMap：被遍历的Map集合本身
});
```

## Weak Map 集合

Weak Map 是弱引用Map集合，也用于存储对象的弱引用。

Weak Map集合中的键名必须是一个非null类型的对象，如果使用非对象键名会报错，键名对应的值则可以是任意类型。

集合中保存的是这些对象的弱引用，如果在弱引用之外不存在其他的强引用，引擎的垃圾回收机制会自动回收这个对象，同时也会移除Weak Map集合中的键值对。

只有集合的键名遵从这个规则，键名对应的值如果是一个对象，则保持的是对象的强引用，不会触发垃圾回收机制。

Weak Map集合最大的用途是保存Web页面中的Dom元素。

例子：

set(), get(), delete(), has()

```javascript
// 初始化一个Weak Map集合
let map = new WeakMap();
let element = document.querySelector('.element');

// 添加数据：set(key, value)方法
map.set(element, 'original');

// 获取数据：get(key)方法
console.log(map.get(element));

// 移除element元素
element.parentNode.removeChild(element);
element = null;
// 此时集合为空

// 初始化WeakMap集合时，批量添加数据
let key1 = {}, key2 = {};
let map2 = new WeakMap([[key1, 1], [key2, 2]]);

// 检测给定的键在集合中是否存在：has(key)
console.log(map2.has(key1));

// 移除指定的键值对：delete(key)
map2.delete(key1);

// Weak Map集合和 Weak Set集合一样，不支持键名枚举，所以没有size属性，不支持forEach()、clear()方法。
```

