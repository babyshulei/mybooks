const { off } = require('process');
const readline = require('readline');

// 原子组 match 非全局匹配
const str = `<h1>测试</h1><p></p>`;
const reg = /<(h[1-6]+)>[\s\S]*<\/\1>/i;
console.log(str.match(reg));

// 原子组 match 全局匹配
const str1 = `hola<h1>测试</h1><p></p><h2>标题二</h2><p>lalala</p>`;
const reg1 = /<(h[1-6]+)>[\s\S]*<\/(\1)>/ig;
console.log(str1.match(reg1));

// 邮箱验证
/*
const regEmail = /^[\w-]+@([\w-]+\.)+(com|org|cn|net)$/i;
const getEmail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

getEmail.question('请输入邮箱：', (email) => {
  if (regEmail.test(email)) {
    console.log('输入邮箱正确');
  } else {
    console.log('输入邮箱错误');
  }
  getEmail.close();
});
*/

// 替换操作
const strRep = `
  hola
  <h1>测试</h1>
  中间内容
  <h2>标题二</h2>
  有趣吗
`;
const regRep = /<(h[1-6])>([\s\S]*)<\/\1>/ig;
// 方案一：传入字符串直接替换
// const result = strRep.replace(regRep, '<p>$2</p>');
// console.log(result);

// 方案二：也可以使用函数
// 入参：p0为匹配的字符串，p1,p2...为匹配的原子组
// offset为匹配到的子串在原字符串中的偏移量，string为原字符串
const result = strRep.replace(regRep, (p0, p1, p2, offset, string) => `<p>${p2}</p>`);
console.log(result);

// 匹配网站
const webStr = `
  开始 https://www.test.com
  http://another.test.cn
  第三个 https://www.example.com小意思
`;
const webReg = /(?:https?):\/\/((?:\w+\.)+(?:com|cn|org))/ig;
let webArr = [];
console.log(webStr.match(webReg));
while(res = webReg.exec(webStr)) {
  webArr.push(res[1]);
}
console.log(webArr);
