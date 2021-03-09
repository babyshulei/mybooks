# 删除字符串中的所有相邻重复项

## 题目

给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

在 S 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

示例：

```
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```

提示：

- 1 <= S.length <= 20000
- S 仅由小写英文字母组成。



## 题解

### 题解一

暴力移除法：按照描述一遍遍删除重复项，返回最终结果。

```js
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
    let result = S;
    let ret;

    while(ret = remove(result)) {
        result = ret.str;
        if (!ret.flag) {
            break;
        }
    }

    return result;

    function remove(s) {
        let arr = s.split('');
        let i = 0;
        let flag = false;
        while (i < arr.length - 1) {
            if (arr[i] === arr[i + 1]) {
                flag = true;
                arr.splice(i, 2);
            } else {
                i++;
            }
        }
        return {
            flag,
            str: arr.join(''),
        };
    }
};
```

复杂度：

- 时间复杂度：O(n<sup>2</sup>)
- 空间复杂度：O(n)

### 题解二：栈

通过栈存储返回数组，如果当前字符和栈顶字符相同，则删除，否则入栈即可。

```js
var removeDuplicates = function(S) {
    const stack = [];

    for (const ch of S) {
        if (ch === stack[stack.length - 1]) {
            stack.pop();
        } else {
            stack.push(ch);
        }
    }

    return stack.join('');
};
```

复杂度：

- 时间复杂度：O(n)
- 空间复杂度：O(n)



## 参考链接

[1047. 删除字符串中的所有相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

