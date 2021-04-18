# 用两个栈实现队列

## 题目

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。



## 题解

有两个栈，那么可以一个作为入栈，一个作为出栈。

如果添加元素到stack1里，那么在删除元素时，可以将stack1的元素弹出到stack2中，stack2的栈顶就是最先入的元素，弹出stack2的栈顶元素即可。

可以观察到删除的规律：如果stack2不为空，那么stack2的栈顶元素始终是队首；如果stack2为空，那么将stack1的元素逐个弹出到stack2中，最后得到的stack2的栈顶元素就是队首。

代码如下：

```js
var stack1 = [];
var stack2 = [];

function push(node)
{
    stack1.push(node);
}
function pop()
{
    if (!stack2.length) {
        while (stack1.length) {
            stack2.push(stack1.pop());
        }
    }
    
    return stack2.pop();
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/questionTerminal/54275ddae22f475981afa2244dd448c6)

[leetcode](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

