// search
var str = 'hello world';
console.log(str.search('o')); // 4
console.log(str.search(/o/)); // 4


// match
var str = 'hello world';
console.log(str.match('o')); // [ 'o', index: 4, input: 'hello world', groups: undefined ]
console.log(str.match(/o/)); // [ 'o', index: 4, input: 'hello world', groups: undefined ]
console.log(str.match(/o/g)); // [ 'o', 'o' ]


// matchAll
var str = 'hello world';
var res = str.matchAll(/o/g);
for (const v of res) {
  console.log(v);
}

// let res1 = str.matchAll(/o/);
// for (const v of res1) {
//   console.log(v);
// }

var res2 = [ ...str.matchAll(/o/g) ];
console.log(res2);


// split
var date1 = '2001-10-12';
var date2 = '2021/11/02';

console.log(date1.split('-'), date2.split('-'));
// [ '2001', '10', '12' ] [ '2021/11/02' ]
console.log(date1.split(/[-/]/g), date2.split(/[-/]/g));
// [ '2001', '10', '12' ] [ '2021', '11', '02' ]

// replace
var str = '(010)99999999 (020)8888888';
// $n
var newStr = str.replace(/\((\d{3,4})\)(\d{7,8})/g, '$1-$2');

console.log(newStr);

// $`, $', $&
var str = '%aaaa=%bbbb';
var newStr = str.replace(/\w{4}/g, "$` $& $', ");
console.log(newStr);
// %% aaaa =%bbbb, =%%aaaa=% bbbb ,

// callback
var str = `
  hola
  <h1>测试</h1>
  中间内容
  <h2>标题二</h2>
  有趣吗
`;
var reg = /<(h[1-6])>(.*?)<\/\1>/ig;
// 入参：p0为匹配的字符串，p1,p2...为匹配的原子组
// offset为匹配到的子串在原字符串中的偏移量，string为原字符串
var result = str.replace(reg, (v, p1, p2, offset, string) => {
  return `<span>${p2}</span>`;
});

console.log(result);
