# 猜字谜

## 题目

外国友人仿照中国字谜设计了一个英文版猜字谜小游戏，请你来猜猜看吧。

字谜的谜面 puzzle 按字符串形式给出，如果一个单词 word 符合下面两个条件，那么它就可以算作谜底：

- 单词 word 中包含谜面 puzzle 的第一个字母。
- 单词 word 中的每一个字母都可以在谜面 puzzle 中找到。
  例如，如果字谜的谜面是 "abcdefg"，那么可以作为谜底的单词有 "faced", "cabbage", 和 "baggage"；而 "beefed"（不含字母 "a"）以及 "based"（其中的 "s" 没有出现在谜面中）。

返回一个答案数组 answer，数组中的每个元素 answer[i] 是在给出的单词列表 words 中可以作为字谜迷面 puzzles[i] 所对应的谜底的单词数目。

示例：

```
输入：
words = ["aaaa","asas","able","ability","actt","actor","access"], 
puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
输出：[1,1,3,2,4,0]
解释：
1 个单词可以作为 "aboveyz" 的谜底 : "aaaa" 
1 个单词可以作为 "abrodyz" 的谜底 : "aaaa"
3 个单词可以作为 "abslute" 的谜底 : "aaaa", "asas", "able"
2 个单词可以作为 "absoryz" 的谜底 : "aaaa", "asas"
4 个单词可以作为 "actresz" 的谜底 : "aaaa", "asas", "actt", "access"
没有单词可以作为 "gaswxyz" 的谜底，因为列表中的单词都不含字母 'g'。
```


提示：

- 1 <= words.length <= 10^5
- 4 <= words[i].length <= 50
- 1 <= puzzles.length <= 10^4
- puzzles[i].length == 7
- `words[i][j]`, `puzzles[i][j]` 都是小写英文字母。
- 每个 puzzles[i] 所包含的字符都不重复。

## 题解

好家伙，直接超时。元宵灯谜好难，看题解T T。

### 题解一：二进制状态压缩

首先理解字谜规则：

字谜为7位且不重复，谜底需满足包含字谜首字母，以及其他字母均在字谜中。

因此，可以设计一个解决字谜问题的算法流程：

- 首先，查找都是在单词列表`words`中进行，所以，需要建一个单词的集合，存放在某一「数据结构」中，便于后续操作中的快速查找；
- 然后，遍历字谜数组`puzzles`，计算每一个`puzzle`对应的谜底个数，返回谜底数组。
  - 根据规则，每一个字谜的谜面可以有多种解法，首字母必须要有，后面的可能有可能没有。那么谜底的个数就等于所有解法对应的单词总和。遍历所有解法，获取每个解法对应的单词数，累加得到单个字谜对应的谜底数。

单词集的数据结构设计：

因为字谜是小写字母，范围是有限的26，单词的有效信息在于字母，而不用考虑字母个数。可以考虑使用一个长度为26的二进制数来映射不同的字母集。从而建立一个单词map，key为字母集，value为该字母集对应的单词个数。

解法的遍历：

由于字谜是7位不重复的，且首字母必须有，那么可以对其他6位进行有无的排列组合，利用位运算，从（1 ~ 1<<6）遍历，生成对应的字母集，获取对应的单词数，累加即可。

细节：

因为字谜只有7位，所以如果单词超过7种字母，可以直接舍弃。

```js
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
var findNumOfValidWords = function(words, puzzles) {
    const wordsMap = new Map();
    const ret = [];

    // 生成单词集
    for(const word of words) {
        let mask = 0;
        for(const ch of word) {
            mask |= (1 << (ch.charCodeAt() - 'a'.charCodeAt()));
        }
        if (countOne(mask) <= 7) {
            wordsMap.set(mask, (wordsMap.get(mask) || 0) + 1);
        }
    }

    // 遍历字谜列表
    for(const puzzle of puzzles) {
        let count = 0;

        // 遍历所有可能的解法。字谜后6位字母的排列组合。
        for(let choose = 0; choose < (1 << 6); choose++) {
            let mask = 0;
            for(let i = 0; i < 6; i++) {
                if (choose & (1 << i)) {
                    mask |= (1 << (puzzle[i + 1].charCodeAt() - 'a'.charCodeAt()));
                }
            }
            mask |= (1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
            if (wordsMap.get(mask)) {
                // 解法累加
                count += wordsMap.get(mask);
            }
        }
        ret.push(count);
    }

    return ret;

    function countOne(n) {
        const str = n.toString(2);
        let count = 0;
        for(const ch of str) {
            if (ch === '1') {
                count++;
            }
        }
        return count;
    }
};
```

复杂度：

- 时间复杂度：`O(m|w|+n(2^|p|))` ，其中 m 和 n 分别是数组 words 和 puzzles 的长度，`|w|`是word 的最大长度 50，`|p|` 是 puzzle 的最大长度 7。时间复杂度分为三部分：
  - 计算所有word 对应的二进制表示的时间复杂度为 `O(m|w|)`；
  - 计算所有 puzzle 对应的二进制表示的时间复杂度为 `O(n|p|)`；
  - 枚举 puzzle 的子集的时间复杂度为`O(n*(|p|−1)*2^(|p|−1))`。

  由于 `|p|-1` 与 `|p|` 同阶，因此写成 `O(|p|)` 更加简洁。并且由于第三部分的时间复杂度在渐进意义下严格大于第二部分，因此总时间复杂度即为第一部分与第三部分之和  `O(m|w|+n(2^|p|))` 。

- 空间复杂度：`O(m)`，即为哈希映射需要使用的空间，其中最多只包含 m 个键值对。



## 参考链接

[1178. 猜字谜](https://leetcode-cn.com/problems/number-of-valid-words-for-each-puzzle/)

