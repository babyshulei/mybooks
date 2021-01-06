/**
 * 选择排序
 */
function selectionSort(a) {
    const length = a.length;

    for (let i = 0; i < length; i++) {
        let index = i;
        for (let j = i; j < length; j++) {
            // 遍历未排序数组，得到最小值索引
            if (a[j] < a[index]) {
                index = j;
            }
        }
        // 交换最小值到已排序数组末尾
        [a[i], a[index]] = [a[index], a[i]];
    }
}

let arr = [1, 4, 8, 5, 3, 2, 4, 7, 10, 3, 9];

selectionSort(arr);

console.log(arr);
