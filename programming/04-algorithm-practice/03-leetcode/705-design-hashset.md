# 设计哈希集合

## 题目

不使用任何内建的哈希表库设计一个哈希集合（HashSet）。

实现 MyHashSet 类：

- void add(key) 向哈希集合中插入值 key 。
- bool contains(key) 返回哈希集合中是否存在这个值 key 。
- void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。

示例：

```
输入：
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
输出：
[null, null, null, true, false, null, true, null, false]

解释：
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // 返回 True
myHashSet.contains(3); // 返回 False ，（未找到）
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // 返回 True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // 返回 False ，（已移除）
```

**提示：**

- `0 <= key <= 106`
- 最多调用 `104` 次 `add`、`remove` 和 `contains` 。



## 题解

### 题解一

用数组建立hashset

```js
/**
 * Initialize your data structure here.
 */
var MyHashSet = function() {
    this.hashset = [];
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    this.hashset[key] = true;
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    if (this.hashset[key]) {
        this.hashset[key] = undefined;
    }
};

/**
 * Returns true if this set contains the specified element 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    if (this.hashset[key]) {
        return true;
    }
    return false;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
```

复杂度：

- 时间复杂度：O(1)
- 空间复杂度：O(n)



### 题解二

实现hashset需要解决：

- 哈希函数：将集合中的元素映射到一个固定范围的整数值，并将元素存储到整数值对应的地址上。
- 冲突处理：不同元素可能会映射到相同整数值，此时需要进行冲突处理。有以下几种策略：
  - 链地址法：为每个哈希值维护一个链表
  - 开放地址法：当哈希值h冲突时，根据某种策略，从h出发找到下一个不冲突的位置
  - 再哈希法：当发现哈希冲突后，使用另一个哈希函数产生新的地址

- 扩容：当哈希元素过多时，冲突的概率将越来越大，查询效率也会越来越低，此时需要开辟一块更大的空间，来缓解冲突。

链地址法实现：

```js
/**
 * Initialize your data structure here.
 */
var MyHashSet = function() {
    this.BASE = 769;
    this.hashset = new Array(this.BASE).fill(0).map(() => new Array());
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    const h = this.hash(key);
    for (let element of this.hashset[h]) {
        if (element === key) {
            return;
        }
    }
    this.hashset[h].push(key);
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    const h = this.hash(key);
    for (let i = 0; i < this.hashset[h].length; i++) {
        if (this.hashset[h][i] === key) {
            this.hashset[h].splice(i, 1);
            return;
        }
    }
};

/**
 * Returns true if this set contains the specified element 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    const h = this.hash(key);
    for (let element of this.hashset[h]) {
        if (element === key) {
            return true;
        }
    }
    return false;
};

MyHashSet.prototype.hash = function(key) {
    return key % this.BASE;
}
```

复杂度：

- 时间复杂度：O(n/b)。n为哈希表中元素数量，b为链表数量。
- 空间复杂度：O(n+b)。

## 参考链接

[705. 设计哈希集合](https://leetcode-cn.com/problems/design-hashset/)

