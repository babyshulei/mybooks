/**
 * 走台阶问题：
 * 有n个台阶，每次可以跨1个或者2个台阶，请问走n个台阶有多少种走法？
 * @param {Number} n 
 */
function stairSolution(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;
    return stairSolution(n - 1) + stairSolution(n - 2);
}

/**
 * 优化：添加map
 */
let stairMap = {};
function stairSolution2(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    if (stairMap[n] === undefined) {
        stairMap[n] = stairSolution2(n - 1) + stairSolution2(n - 2);
    }

    return stairMap[n];
}

/**
 * 改造为非递归
 */
function stairSolution3(n) {
    let map = {
        1: 1,
        2: 2,
    };

    for (let i = 3; i <= n; i++) {
        let pre = map[i - 1];
        let prepre = map[i - 2];
        map[i] = pre + prepre;
    }

    return map[n];
}

/**
 * 改造为非递归，优化，不用map
 */
function stairSolution4(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    let result;
    let pre = 2;
    let prepre = 1;

    for (let i = 3; i <= n; i++) {
        result = pre + prepre;
        prepre = pre;
        pre = result;
    }

    return result;
}

console.log(stairSolution(5)); // 8
console.log(stairSolution2(5)); // 8
console.log(stairSolution3(5)); // 8
console.log(stairSolution4(5)); // 8
