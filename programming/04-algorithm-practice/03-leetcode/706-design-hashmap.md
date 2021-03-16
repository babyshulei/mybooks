# 设计哈希映射

## 题目

不使用任何内建的哈希表库设计一个哈希映射（HashMap）。

实现 MyHashMap 类：

- MyHashMap() 用空映射初始化对象
- void put(int key, int value) 向 HashMap 插入一个键值对 (key, value) 。如果 key 已经存在于映射中，则更新其对应的值 value 。
- int get(int key) 返回特定的 key 所映射的 value ；如果映射中不包含 key 的映射，返回 -1 。
- void remove(key) 如果映射中存在 key 的映射，则移除 key 和它所对应的 value 。

示例：

```
输入：
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
输出：
[null, null, null, 1, -1, null, 1, null, -1]

解释：
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // myHashMap 现在为 [[1,1]]
myHashMap.put(2, 2); // myHashMap 现在为 [[1,1], [2,2]]
myHashMap.get(1);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,2]]
myHashMap.get(3);    // 返回 -1（未找到），myHashMap 现在为 [[1,1], [2,2]]
myHashMap.put(2, 1); // myHashMap 现在为 [[1,1], [2,1]]（更新已有的值）
myHashMap.get(2);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,1]]
myHashMap.remove(2); // 删除键为 2 的数据，myHashMap 现在为 [[1,1]]
myHashMap.get(2);    // 返回 -1（未找到），myHashMap 现在为 [[1,1]]
```


提示：

- 0 <= key, value <= 106
- 最多调用 104 次 put、get 和 remove 方法



## 题解

### 题解一

使用对象创建哈希map

```js
/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {
    this.map = {};
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    this.map[key] = value;
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    if (this.map[key] !== undefined) {
        return this.map[key];
    }
    return -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    if (this.map[key] !== undefined) {
        delete this.map[key];
    }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
```

### 题解二

链地址法：

```js
var MyHashMap = function() {
    this.BASE = 769;
    this.map = new Array(this.BASE).fill(0).map(() => new Array());
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    const h = this.hash(key);
    for (let element of this.map[h]) {
        if (element[0] === key) {
            element[1] = value;
            return;
        }
    }
    this.map[h].push([key, value]);
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    const h = this.hash(key);
    for (let element of this.map[h]) {
        if (element[0] === key) {
            return element[1];
        }
    }
    return -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    const h = this.hash(key);
    for (let i = 0; i < this.map[h].length; i++) {
        if (this.map[h][i][0] === key) {
            this.map[h].splice(i, 1);
            return;
        }
    }
};

MyHashMap.prototype.hash = function(key) {
    return key % this.BASE;
};
```

复杂度：

- 时间复杂度：O(n/b)。n为哈希表中元素数量，b为链表数量。
- 空间复杂度：O(n+b)。

## 参考链接

[706. 设计哈希映射](https://leetcode-cn.com/problems/design-hashmap/)

