// 立即执行函数会将函数名作为只读变量
function test() {
  test = 223;
  console.log(test);
}

test(); // 223

(function test() {
  test = 223;
  console.log(test);
})(); // [Function: test]
