# Number

## 浮点数

JavaScript Number 采用的是 IEEE 754 定义的 64 位双精度浮点型来表示。

从高到低，64位被分成3段，分别是:

- 符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
- 指数位E：中间的 11 位存储指数（exponent），用来表示次方数
- 尾数位M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零

指数位有 11 位，取值范围是 0 到 2047。当指数位 e=0 或者 e=2017 时，根据有效数字位 f 是否为 0 ，具有不同的特殊含义。

计算公式：

![latex expression](.\images\float-cal.png)



## 参考链接

[JavaScript 浮点数陷阱及解法· Issue #9 · camsong/blog · GitHub](https://github.com/camsong/blog/issues/9)

