/**
 * 冒泡排序
 * 返回由小到大的数组
 */
function bubbleSort(arr) {
    const length = arr.length;

    if (length <= 1) {
        return arr;
    }

    for (let i = 0; i < length; i++) {
        // 提前退出冒泡循环的标志位
        let flag = false;
        for (let j = 0; j < length - i - 1; j++) {
            // 冒泡交换
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
        // 没有数据交换，提前退出
        if (!flag) break;
    }

    return arr;
}

let testArr = [1, 4, 8, 5, 3, 2, 4, 7, 10, 3, 9];

bubbleSort(testArr);

console.log(testArr);
