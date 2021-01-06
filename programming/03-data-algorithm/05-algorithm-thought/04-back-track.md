# 回溯算法

## 思路

**解决一个回溯问题，实际上就是一个决策树的遍历过程**。只需要思考 3 个问题：

1、路径：也就是已经做出的选择。

2、选择列表：也就是你当前可以做的选择。

3、结束条件：也就是到达决策树底层，无法再做选择的条件。

伪代码：

```python
result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return

    for 选择 in 选择列表:
        做选择
        backtrack(路径, 选择列表)
        撤销选择
```

**其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」**。

## 全排列问题

我们知道，n 个不重复的数， 全排列共有 n! 个。

PS：**为了简单清晰起见，这次讨论的全排列问题不包含重复的数字**。 

如何穷举全排列？比方说给三个数 `[1,2,3]`，我们的思路一般是：

先固定第一位为 1，然后第二位可以是 2，那么第三位只能是 3；然后可以把第二位变成 3，第三位就只能是 2 了；然后就只能变化第一位，变成 2，然后再穷举后两位……

其实这就是回溯算法，可以直接画出如下这棵回溯树：

![img](.\images\track-tree.jpg)

只要从根遍历这棵树，记录路径上的数字，其实就是所有的全排列。**我们不妨把这棵树称为回溯算法的「决策树」**。

**为啥说这是决策树呢，因为你在每个节点上其实都在做决策**。比如说你站在下图的红色节点上：

![img](.\images\track-tree-1.jpg)



你现在就在做决策，可以选择 1 那条树枝，也可以选择 3 那条树枝。为啥只能在 1 和 3 之中选择呢？因为 2 这个树枝在你身后，这个选择你之前做过了，而全排列是不允许重复使用数字的。

其中：`[2]` **就是「路径」，记录你已经做过的选择；**`[1,3]` **就是「选择列表」，表示你当前可以做出的选择；「结束条件」就是遍历到树的底层，在这里就是选择列表为空的时候**。

明白了这几个名词，**可以把「路径」和「选择」列表作为决策树上每个节点的属性**，比如下图列出了几个节点的属性：

![img](.\images\track-tree-2.jpg)

**我们定义的** **backtrack** **函数其实就像一个指针，在这棵树上游走，同时要正确维护每个节点的属性，每当走到树的底层，其「路径」就是一个全排列**。

「路径」和「选择」是每个节点的属性，函数在树上游走要正确维护节点的属性，那么就要在这两个特殊时间点搞点动作：

![img](.\images\track-tree-3.jpg)

所以回溯算法核心框架：

```python
for 选择 in 选择列表:
    # 做选择
    将该选择从选择列表移除
    路径.add(选择)
    backtrack(路径, 选择列表)
    # 撤销选择
    路径.remove(选择)
    将该选择再加入选择列表
```

**我们只要在递归之前做出选择，在递归之后撤销刚才的选择**，就能正确得到每个节点的选择列表和路径。

实现代码：

```js
function permute(arr) {
    // 全排列记录
    let routeList = [];
    let path = [];
    backtrack(arr, path);
    return routeList;

    function backtrack(from, path) {
        // 触发结束条件
        if (!from.length) {
            routeList.push([ ...path]);
            return;
        }

        for(let i = 0; i < from.length; i += 1) {
            const [ tmp ] = from.splice(i, 1);
            // 做选择
            path.push(tmp);
            // 进入下一层决策树
            backtrack(from, path);
            // 取消选择
            path.pop(tmp);
            from.splice(i, 0, tmp);
        }
    }
}
```

至此，我们就通过全排列问题详解了回溯算法的底层原理。有更好的方法通过交换元素达到目的，但是难理解一些（todo）。

必须说明的是，不管怎么优化，都符合回溯框架，而且时间复杂度都不可能低于 O(N!)，因为穷举整棵决策树是无法避免的。**这也是回溯算法的一个特点，不像动态规划存在重叠子问题可以优化，回溯算法就是纯暴力穷举，复杂度一般都很高**。

## N皇后问题

给你一个 N×N 的棋盘，让你放置 N 个皇后，使得它们不能互相攻击。

PS：皇后可以攻击同一行、同一列、左上左下右上右下四个方向的任意单位。

代码实现：

```js
function queen(n) {
    let board = new Array(n).fill(undefined).map(() => new Array(n).fill('*'));
    let res = [];
    setQueen(board, 0);
    return res;

    // 路径：board 中小于 row 的那些行都已经成功放置了皇后
	// 选择列表：第 row 行的所有列都是放置皇后的选择
	// 结束条件：row 超过 board 的最后一行
    function setQueen(board, row) {
        if (row === n) {
            res.push(deepCloneArr(board));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (canSet(board, row, col)) {
                // 做选择
                board[row][col] = 'Q';
                // 进入下一行决策
                setQueen(board, row + 1);
                // 撤销选择
                board[row][col] = '*';
            }
        }
    }

    /* 是否可以在 board[row][col] 放置皇后？ */
    function canSet(board, row, col) {
        // 检查列是否有皇后冲突
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') {
                return false;
            }
        }
        // 检查左上是否有皇后冲突
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        // 检查右上是否有皇后冲突
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        return true;
    }
}

// 深拷贝棋盘
function deepCloneArr(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push([ ...arr[i] ]);
    }
    return res;
}
```

**有的时候，我们并不想得到所有合法的答案，只想要一个答案，怎么办呢**？

其实特别简单，只要稍微修改一下回溯算法的代码即可：

```c++
// 函数找到一个答案后就返回 true
bool backtrack(vector<string>& board, int row) {
    // 触发结束条件
    if (row == board.size()) {
        res.push_back(board);
        return true;
    }
    ...
    for (int col = 0; col < n; col++) {
        ...
        board[row][col] = 'Q';
        
        if (backtrack(board, row + 1))
            return true;
        
        board[row][col] = '.';
    }

    return false;
}
```

这样修改后，只要找到一个答案，for 循环的后续递归穷举都会被阻断。

## 总结

回溯算法就是个多叉树的遍历问题，关键就是在前序遍历和后序遍历的位置做一些操作，算法框架如下：

```python
def backtrack(...):
    for 选择 in 选择列表:
        做选择
        backtrack(...)
        撤销选择
```

**写 backtrack 函数时，需要维护走过的「路径」和当前可以做的「选择列表」，当触发「结束条件」时，将「路径」记入结果集**。



## 参考链接

[回溯算法](https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie-qing-an-shun-xu-yue-du/hui-su-suan-fa-xiang-jie-xiu-ding-ban)

