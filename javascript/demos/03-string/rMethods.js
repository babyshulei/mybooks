// test
var str = '021-39489999';
var reg = /\d{3,4}-\d{7,8}/;

console.log(reg.test(str)); // true

// exec
var str = '021-39489999 010-88883333';
var reg = /\d{3,4}-\d{7,8}/;
var regg = /\d{3,4}-\d{7,8}/g;

console.log('normal:', reg.exec(str));
// normal: [ '021-39489999',
//   index: 0,
//   input: '021-39489999 010-88883333',
//   groups: undefined ]

while(res = regg.exec(str)) {
    console.log('global:', res[0])
}
// global: 021-39489999
// global: 010-88883333
