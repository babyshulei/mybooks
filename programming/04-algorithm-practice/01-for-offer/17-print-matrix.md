# 顺时针打印矩阵

## 题目

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.



## 题解

可以将一圈看做一个循环，递归遍历。

```js
function printMatrix(matrix)
{
    // write code here
    let ret = [];
    
    getOuter(matrix);
    
    return ret;
    
    function getOuter(arr) {
        if (!arr.length || !arr[0].length) return;
        // 向右
        ret = ret.concat(arr.shift());
        // 向下
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length) {
                ret.push(arr[i].pop());
            }
        }
        // 向左
        if (arr.length && arr[0].length) {
            const tmp = arr.pop();
            ret = ret.concat(tmp.reverse());
        }
        // 向上
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].length) {
                ret.push(arr[i].shift());
            }
        }
        getOuter(arr);
    }
}
```



## 参考链接

[牛客网](https://www.nowcoder.com/practice/9b4c81a02cd34f76be2659fa0d54342a?tpId=13&&tqId=11172&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

