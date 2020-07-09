# 二叉搜索树的后序遍历序列

## 题目

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。



## 题解

二叉搜索树：左子节点始终小于或等于根节点，右子节点始终大于或等于根节点。

后序遍历：左右根。

思路：

由于是二叉搜索树，所以有 左 < 根 < 右 的规律。

后序遍历是 左右根，所以最后一个值为根节点，从前向后遍历数组，第一个大于根节点的应该为右子树的起始索引。如果满足二叉搜索树的话，左子树全小于根节点，右子树全大于根节点，否则返回false。

```js
function VerifySquenceOfBST(sequence)
{
    if (!sequence.length) {
        return false;
    }
    
    return verifyBST(sequence, 0, sequence.length - 1);
    
    function verifyBST(arr, start, end) {
        if (start >= end) return true;
        const root = arr[end];
        let index = end - 1; // 右子树起始索引
        
        for(let i = start; i <= end; i++) {
            if (index === end - 1) {
                if (arr[i] > root) {
                    index = i;
                }
            } else if (arr[i] < root) {
                return false;
            }
        }
        
        return verifyBST(arr, start, index - 1) && verifyBST(arr, index, end - 1);
    }
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/practice/a861533d45854474ac791d90e447bafd?tpId=13&&tqId=11176&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

