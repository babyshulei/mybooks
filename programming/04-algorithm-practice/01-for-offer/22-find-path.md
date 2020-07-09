# 二叉树中和为某一值的路径

## 题目

输入一颗二叉树的根节点和一个整数，按字典序打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。



## 题解

递归

```js
function FindPath(root, expectNumber)
{
    let pathSet = [];
    getPath(root, expectNumber, []);
    
    return pathSet;
    
    function getPath(node, num, path) {
        if (!node || node.val > num) {
            return;
        }
        
        path.push(node.val);
        
        if (node.val === num && !node.left && !node.right) {
                pathSet.push(path);
        } else if (node.val < num) {
            getPath(node.left, num - node.val, [ ...path ]);
            getPath(node.right, num - node.val, [ ...path ]);
        }
    }
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/practice/b736e784e3e34731af99065031301bca?tpId=13&&tqId=11177&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

