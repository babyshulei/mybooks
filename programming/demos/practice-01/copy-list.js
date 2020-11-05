/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function Clone(pHead) {

}


// 以下代码的输出？
let test = (function (a) {
    this.a = a;
    return function(b) {
        console.log(this.a + b);
    };
})((function (a) {
    return a;
})(1, 2));

test(4);
