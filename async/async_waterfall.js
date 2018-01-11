/**
 * Created by GXD on 2018/1/11.
 * waterfall 实现的是函数按顺序执行，且后一个函数依赖前一个函数传出的值
 * waterfall 不能用json的形式
 */
var async = require('async')

/*
* 例子一
* 上一个函数的值传给下一个，最后callback()获得的结果是最后一个函数传出来的值
*
* 执行结果：
* 刘备开始执行了
 这是上一个函数传的值: 关羽，我是你大哥刘备
 关羽开始执行了
 这是上一个函数传的值: 张飞，我是你二哥关羽
 张飞开始执行了
 执行程序出错了： null
 程序执行完毕： 我是三弟张飞
* */

async.waterfall([
  function (cb) {
    console.log('刘备开始执行了')
    cb(null, '关羽，我是你大哥刘备')
  },
  function (n, cb) {
    console.log('这是上一个函数传的值:', n);
    console.log('关羽开始执行了')
    cb(null, '张飞，我是你二哥关羽')
  },
  function (n, cb) {
    console.log('这是上一个函数传的值:', n);
    console.log('张飞开始执行了')
    cb(null, '我是三弟张飞')
  }
], function (err, results) {
  console.log('执行程序出错了：', err);
  console.log('程序执行完毕：', results);
})