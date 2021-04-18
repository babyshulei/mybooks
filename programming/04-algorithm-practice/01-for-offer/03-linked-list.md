# 从尾到头打印链表

## 题目

输入一个链表，按链表从尾到头的顺序返回一个ArrayList。



## 题解

只要理解链表的概念，就可以做啦。

从头遍历链表，调用数组的unshift方法，将val添加到数组的开头。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    let arr = [];
    let value = head;

    while (value !== null) {
        arr.unshift(value.val);
        value = value.next;
    }
    
    return arr;
}
```

还有一种方案就是遍历链表，push到数组的结尾，然后reverse反转。

c/c++，还可以用栈的结构来做：利用栈的后入先出的特点，将值推入栈中，然后再从栈顶依次取值。

递归的思路：每访问到一个节点时，先递归输出它后面的节点，再输出该节点自身。

```js
function printListFromTailToHead(head)
{
    let arr = [];

    function add(head) {
        let node = head;

        if (node !== null) {
            add(node.next);
            arr.push(node.val);
        }

        return arr;
    }
    
    return add(head);
}
```



## 参考链接

[Array.prototype.unshift() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

[牛客网讨论](https://www.nowcoder.com/questionTerminal/d0267f7f55b3412ba93bd35cfa8e8035)

