/**
 * 插入排序
 */
function insertionSort(a) {
    const length = a.length;
    if (length <= 1) {
        return a;
    }
    for (let i = 1; i < length; i++) {
        let value = a[i];
        let j;
        // 查找插入的位置
        for (j = i - 1; j >= 0; j--) {
            if (value < a[j]) {
                a[j + 1] = a[j]; // 数据移动
            } else {
                break;
            }
        }
        a[j + 1] = value; // 插入数据
    }
    return a;
}

let arr = [1, 4, 8, 5, 3, 2, 4, 7, 10, 3, 9];

insertionSort(arr);

console.log(arr);
