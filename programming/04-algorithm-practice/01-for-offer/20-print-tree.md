# 从上往下打印二叉树

## 题目

从上往下打印出二叉树的每个节点，同层节点从左至右打印。



## 题解

思路一：

按行打印

```js
function PrintFromTopToBottom(root)
{
    const res = [];
    
    printLine([root]);
    
    function printLine(line) {
        if (!line.length) return;
        const nextLine = [];
        for(let i = 0; i < line.length; i++) {
            if (line[i]) {
                res.push(line[i].val);
                if (line[i].left) nextLine.push(line[i].left);
                if (line[i].right) nextLine.push(line[i].right);
            }
        }
        return printLine(nextLine);
    }
    return res;
}
```



思路二：

规律：每一次打印一个结点的时候，如果该结点有子节点，则把该结点的子节点放到队列的尾部。接下来取出队列头部结点，进行打印流程。

```js
function PrintFromTopToBottom(root)
{
    const queue = [ root ];
    const res = [];
    
    while(queue.length) {
        const print = queue.shift();
        if (print) {
            res.push(print.val);
            if (print.left) {
                queue.push(print.left);
            }
            if (print.right) {
                queue.push(print.right);
            }
        }
    }
    
    return res;
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/practice/7fe2212963db4790b57431d9ed259701?tpId=13&&tqId=11175&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)