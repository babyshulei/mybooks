// 断言
// (?=exp) 零宽先行断言
var lessons = `
  js： 300元，200次；
  python：200.00元，100次；
  java：400元，300次；
`;
var reg = /(\d+)(.00)*(?=元)/g;

lessons = lessons.replace(reg, (v, ...args) => {
  args[1] = args[1] || '.00';
  return args.slice(0, 2).join('');
});

console.log(lessons);
// js： 300.00元，200次；
// python：200.00元，100次；
// java：400.00元，300次；


// (?<=exp) 零宽后行断言
var tels = `
  小红：13039480002
  小明：18822228889
`;
var reg = /(?<=\d{7})\d{4}/g;
tels = tels.replace(reg, '*'.repeat(4));

console.log(tels);
// 小红：1303948****
// 小明：1882222****


// (?!exp) 零宽负向先行断言
var user1 = 'hello';
var user2 = 'atesth';
// 用户名中不能含test
var reg = /^(?!.*test.*)[a-z]{5,6}$/;

console.log(reg.test(user1), reg.test(user2)); // true false


// (?<!exp) 零宽负向后行断言
var str = 'sdkfjk112kdj';
var reg = /(?<!\d+)[a-z]+/;

console.log(reg.exec(str));
// [ 'sdkfjk', index: 0, input: 'sdkfjk112kdj', groups: undefined ]
