function flat(arr, depth = 1) {
    let newArr = [];

    flatArr(arr, 0);

    return newArr;

    function flatArr(el, dep) {
        if (Array.isArray(el)) {
            if (dep < depth) {
                dep++;
                for (let i = 0; i < el.length; i++) {
                    flatArr(el[i], dep);
                }
            } else {
                newArr.push(el);
            }
        } else {
            newArr.push(el);
        }
    }
}

const arr = flat([1, 2, [3, 4, 5], [6, [7, 8]]], 3);

console.log(arr);