# 树的子结构

## 题目

输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）



## 题解

递归判断

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    let result = false;
    
    if (pRoot1 && pRoot2) {
        if (pRoot1.val === pRoot2.val) {
            result = compare(pRoot1, pRoot2);
        }
        if (!result) {
            result = HasSubtree(pRoot1.left, pRoot2);
        }
        if (!result) {
            result = HasSubtree(pRoot1.right, pRoot2);
        }
    }
    
    return result;
    
    function compare(r1, r2) {
        if (!r2) {
            return true;
        } else if (!r1) {
            return false;
        } else if (r1.val !== r2.val) {
            return false;
        }
        return compare(r1.left, r2.left) && compare(r1.right, r2.right);
    }
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/practice/6e196c44c7004d15b1610b9afca8bd88?tpId=13&&tqId=11170&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

