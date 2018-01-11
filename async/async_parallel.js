/**
 * Created by GXD on 2018/1/9.
 * parallel 是多个函数并行执行，不需要等其他函数先执行。
 */
var async = require('async')

/*
 * 例子一
 * 所有函数同时执行，等所有函数执行完了，就执行callback()
 *
 * 执行结果：
 * 关羽开始执行了
 张飞开始执行了
 刘备开始执行了
 执行过程出错 null
 程序执行完毕 [ '刘备执行完了', '关关羽执行完了', '张飞执行完了' ]
 */

async.parallel([
  function (cb) {
    setTimeout(function () {
      console.log('刘备开始执行了')
      cb(null, '刘备执行完了')
    }, 1000)
  },
  function (cb) {
    console.log('关羽开始执行了')
    cb(null, '关关羽执行完了')
  },
  function (cb) {
    console.log('张飞开始执行了')
    cb(null, '张飞执行完了')
  }
], function (err, results) {
  console.log('执行过程出错：', err)
  console.log('程序执行完毕：', results)
})


/*
* 例子二
* 如果执行过程中出错了
* 这个例子好像看不出来啥，得需要在实际使用中再看看到底是怎样的结果
*
* 执行结果：
* 刘备开始执行了
 关羽开始执行了
 执行过程出错： 关关羽执行出错了
 程序执行完毕： [ '刘备执行完了', undefined ]
 张飞开始执行了
* */

async.parallel([
  function (cb) {
      console.log('刘备开始执行了')
      cb(null, '刘备执行完了')
  },
  function (cb) {
    console.log('关羽开始执行了')
    cb('关关羽执行出错了')
  },
  function (cb) {
    console.log('张飞开始执行了')
    cb(null, '张飞执行完了')
  }
], function (err, results) {
  console.log('执行过程出错：', err)
  console.log('程序执行完毕：', results)
})


/*
* 例子三
* 同样也可以用json的形式
*
* 执行结果：刘备开始执行了
 关羽开始执行了
 张飞开始执行了
 执行过程出错： null
 程序执行完毕： { '刘备': '刘备执行完了', '关羽': '关关羽执行完了', '张飞': '张飞执行完了' }
* */

async.parallel({
  '刘备': function (cb) {
    console.log('刘备开始执行了')
    cb(null, '刘备执行完了')
  },
  '关羽': function (cb) {
    console.log('关羽开始执行了')
    cb(null, '关关羽执行完了')
  },
  '张飞': function (cb) {
    console.log('张飞开始执行了')
    cb(null, '张飞执行完了')
  }
}, function (err, results) {
  console.log('执行过程出错：', err)
  console.log('程序执行完毕：', results)
})