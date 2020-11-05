/**
 * 参考：https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie-qing-an-shun-xu-yue-du/hui-su-suan-fa-xiang-jie-xiu-ding-ban
 * 全排列问题
 * 输入一组不重复的数字，返回它们的全排列
 * @param {Array} arr：不重复数列表
 */
// function permute(arr) {
//     // 全排列记录
//     let routeList = [];
//     let path = [];
//     backtrack(arr, path);
//     return routeList;

//     function backtrack(from, path) {
//         // 触发结束条件
//         if (!from.length) {
//             routeList.push(path);
//             return;
//         }

//         for(let i = 0; i < from.length; i += 1) {
//             const [ tmp ] = from.splice(i, 1);
//             path.push(tmp);
//             backtrack([ ...from ], [ ...path ]);

//             path.pop(tmp);
//             from.splice(i, 0, tmp);
//         }
//     }
// }
// 改进，不再每次都复制
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

const routes = permute([1, 2, 3]);
console.log(routes);

/**
 * N 皇后问题
 * 给你一个 N×N 的棋盘，让你放置 N 个皇后，使得它们不能互相攻击。
 */
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

function deepCloneArr(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push([ ...arr[i] ]);
    }
    return res;
}

const haha = queen(10);
console.log(haha, haha.length);
