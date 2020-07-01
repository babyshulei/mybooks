# 重建二叉树

> 2020.03.22 @wsl

## 题目

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。



## 题解

### 递归

思路：

前序遍历：根，左，右；中序遍历：左，根，右。

前序遍历第一个节点是根节点，只要找到根节点在中序遍历中的位置，那么中序遍历根节点左侧是左子树，右侧是右子树，由此可知左子树和右子树分别有多少个节点。

由于树中的节点数量与遍历方式无关，通过中序遍历得知左子树和右子树的节点数量之后，可以根据节点数量得到前序遍历中的左子树和右子树的分界，因此可以进一步得到左子树和右子树各自的前序遍历和中序遍历，可以通过递归的方式，重建左子树和右子树，然后重建整个二叉树。

```js
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    let preIdx = 0;
    let map = {};

    inorder.forEach((val, idx) => {
        map[val] = idx;
    });

    return helper(0, inorder.length);

    function helper(left, right) {
        if (left === right) {
            return null;
        }

        const val = preorder[preIdx];
        const root = new TreeNode(val);
        const inIdx = map[val];

        preIdx++;
        root.left = helper(left, inIdx);
        root.right = helper(inIdx + 1, right);

        return root;
    }
};
```

### 递归解法2

前序遍历第一个节点是根节点，只要找到根节点在中序遍历中的位置，那么中序遍历根节点左侧是左子树，右侧是右子树，由此可知左子树和右子树分别有多少个节点。

所以构建二叉树的问题本质上就是：

1. 找到各个子树的根节点 `root`
2. 构建该根节点的左子树
3. 构建该根节点的右子树

```js
var buildTree = function(preorder, inorder) {
    if (inorder.length === 0) {
        return null;
    }

    const val = preorder[0];
    const root = new TreeNode(val);
    const mid = inorder.indexOf(val);

    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

    return root;
};
```

构建左右子树的时候为什么preorder以mid+1做分割？

1. 我们在 `inorder` 中找到 `mid` 为根节点的下标
2. 由于中序遍历特性，`mid` 左侧都为左子树节点，所以左子树的节点有 `mid` 个
3. 那么同样的，由于前序遍历的特性，`preorder` 第一个元素（根节点）后跟着的就是它的左子树节点，一共有 `mid` 个，所以切了 `[1:mid+1]` 出来



## 参考链接

[leetcode-重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

[leetcode-从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

[牛客网-重建二叉树](https://www.nowcoder.com/questionTerminal/8a19cbe657394eeaac2f6ea9b0f6fcf6)

