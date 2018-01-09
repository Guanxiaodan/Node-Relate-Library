/**
 * Created by GXD on 2018/1/9.
 * series实现的是函数一个执行完了再执行下一个，但是各个函数之间没有数据依赖
 * 其实就是同步执行
 *
 * 注意：本文提到的callback()就是指数组后面的那个函数（其实函数里面的cb()就是它），比如例子一里面的
 * function (err, values) {
  console.log('我就是cb', values)
  }
 *
 * 当所有的函数执行完后（没有出错），则会把每个函数传给其回调函数的结果合并为一个数组，传给series最后的那个callback。
 *
 *  问：如果一个函数里面有异步程序，那后面的函数什么时候执行呢？是等前一个函数的异步执行完了再执行还是不等异步执行完就可以执行了？？
 * 答：其实上一个函数有没有执行完的标志是有没有看到cb()，如果遇到了cb()，后面的函数就认为前面的函数已经执行完了，就开始执行自己了
 * 下面的例子一、例子二可以用来对比参考
 *
 * 问：如果执行过程中出现错误了怎么办？？
 * 答：如果cb(err)了，那么后面的函数都不会继续执行，而是直接跳到最后执行callback()
 */
var async = require('async')

/*
* 例子一：
* 在第一个函数里，由于有异步程序，所以异步程序在一边先执行着，cb()也执行自己的。
* 第二个函数看到已经到cb()了，所以就认为第一个函数执行完了，其实这个时候第一个函数的异步还没执行完。
* 第三个函数同理第二个函数。第三个函数执行到了cb()，
* 看到上面所有函数的cb（）都有了，所以就就执行callback(),打印了"我就是cb [ '第一个函数执行完毕', '第二个函数执行完毕', '第三个函数执行完毕' ]"
* 然后上面的哪些函数里面的异步函数才一步一步执行完，一个个打印出来
* 总的来说还是上面那句话，
* series是一个函数执行完了再执行下一个函数没错，但是什么时候才是本函数执行完了？那就是见到cb()的时候就表示我这个函数执行完了
* 就是这么简单！
* 执行结果：
* 我就是cb [ '第一个函数执行完毕', '第二个函数执行完毕', '第三个函数执行完毕' ]
 执行的第一个函数
 执行第二个函数
 执行三个函数
 *  */

async.series([
  function (cb) {
    setTimeout(function () {
      console.log('执行的第一个函数')
    }, 2000)
    cb(null, '第一个函数执行完毕')
  },
  function (cb) {
    setTimeout(function () {
      console.log('执行第二个函数')
    }, 2000)
    cb(null, '第二个函数执行完毕')
  },
  function (cb) {
    setTimeout(function () {
      console.log('执行三个函数')
    }, 2000)
    cb(null, '第三个函数执行完毕')
  }
], function (err, values) {
  console.log('我就是cb', values)
})


/*
* 例子二
* 对比例子一
* 这个例子吧cb放在了异步函数里面，所以才会出现我们希望的那种场景，一个一个接着打印
* 执行结果：
* 执行的第一个函数
 执行第二个函数
 执行三个函数
 我就是cb [ '第一个函数执行完毕', '第二个函数执行完毕', '第三个函数执行完毕' ]
* */

async.series([
  function (cb) {
    setTimeout(function () {
      console.log('执行的第一个函数')
      cb(null, '第一个函数执行完毕')
    }, 4000)
  },
  function (cb) {
    setTimeout(function () {
      console.log('执行第二个函数')
      cb(null, '第二个函数执行完毕')
    }, 4000)
  },
  function (cb) {
    setTimeout(function () {
      console.log('执行三个函数')
      cb(null, '第三个函数执行完毕')
    }, 4000)
  }
], function (err, values) {
  console.log('我就是cb', values)
})


/*
* 例子三
* 如果执行中间需要报错
* 可以看到后面的两个函数都没有执行
* 执行结果：
* 0
 1
 2
 出错了 i等于三了，我需要报错
 我就是cb [ undefined ]
 4
* */

async.series([
  function (cb) {
    for(var i=0; i<5; i++) {
      if(i === 3) {
        cb('i等于三了，我需要报错')
      } else {
        console.log(i)
      }
    }
  },
  function (cb) {
    console.log('我是关羽')
    cb('关羽执行完了')
  },
  function (cb) {
    console.log('我是张飞')
    cb('张飞执行完了')
  }
], function (err, values) {
  console.log('出错了', err)
  console.log('我就是cb', values)
})


/*
* 例子四
* 这是改成了用json的形式来给callback()
* 有时候这样可能更方便
* 执行结果：
* 我就是cb { '刘备': '刘玄德', '关羽': '关云长', '张飞': '张翼德' }
* */

async.series({
  '刘备': function (cb) {
    cb(null, '刘玄德')
  },
  '关羽': function (cb) {
    cb(null, '关云长')
  },
  '张飞': function (cb) {
    cb(null, '张翼德')
  },
}, function (err, values) {
  console.log('我就是cb', values)
})
