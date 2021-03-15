# 验证二叉树的前序序列化

## 题目

序列化二叉树的一种方法是使用前序遍历。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #。

         _9_
        /   \
       3     2
      / \   / \
     4   1  #  6
    / \ / \   / \
    # # # #   # #
例如，上面的二叉树可以被序列化为字符串 "9,3,4,#,#,1,#,#,2,#,6,#,#"，其中 # 代表一个空节点。

给定一串以逗号分隔的序列，验证它是否是正确的二叉树的前序序列化。编写一个在不重构树的条件下的可行算法。

每个以逗号分隔的字符或为一个整数或为一个表示 null 指针的 '#' 。

你可以认为输入格式总是有效的，例如它永远不会包含两个连续的逗号，比如 "1,,3" 。

示例 1:

```
输入: "9,3,4,#,#,1,#,#,2,#,6,#,#"
输出: true
```


示例 2:

```
输入: "1,#"
输出: false
```

示例 3:

```
输入: "9,#,#,1"
输出: false
```



## 题解

### 题解一：栈

可以定义“槽位”为当前二叉树正等待被填充的节点。那么有：

- 遇到空节点，消耗一个槽位；
- 遇到非空节点，消耗一个槽位，又新增2个槽位。

使用栈来维护槽位的变化。栈中的元素，代表了对应节点处剩余的槽位数量。

代码如下：

```js
/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function(preorder) {
    const n = preorder.length;
    const stack = [1];
    let i = 0;

    while (i < n) {
        if (!stack.length) {
            return false;
        }
        if (preorder[i] === ',') {
            i++;
        } else if (preorder[i] === '#') {
            stack[stack.length - 1]--;
            if (stack[stack.length - 1] === 0) {
                stack.pop();
            }
            i++;
        } else {
            while(i < n && preorder[i] !== ',') {
                i++;
            }
            stack[stack.length - 1]--;
            if (stack[stack.length - 1] === 0) {
                stack.pop();
            }
            stack.push(2);
        }
    }

    return stack.length === 0;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(n)

#### 优化：计数

可以用一个计数器来代替栈，空间复杂度降为O(1)。

```js
var isValidSerialization = function(preorder) {
    const n = preorder.length;
    let slots = 1;
    let i = 0;

    while (i < n) {
        if (!slots) {
            return false;
        }
        if (preorder[i] === ',') {
            i++;
        } else if (preorder[i] === '#') {
            slots--;
            i++;
        } else {
            while(i < n && preorder[i] !== ',') {
                i++;
            }
            slots++;
        }
    }

    return slots === 0;
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(1)



## 参考链接

[331. 验证二叉树的前序序列化](https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/)

