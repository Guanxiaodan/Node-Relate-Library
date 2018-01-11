/**
 * Created by GXD on 2018/1/11.
 * auto 用来处理复杂的情况， 比如有的需要并行执行，有的需要依次执行
 * 与前面的几个不一样，auto里的函数只能放在对象中。
 */
var async = require('async')

/*
 * 例子一
 * 我们实现这样一种流程：
 * 程序1，程序2，并行执行；程序3需要程序1和程序2的执行结果，程序4需要程序3的执行结果
 *
 * 问：程序三如何接受上面两个程序传出的结果呢？
 * 答：看下面的张飞喽，要谁就把谁放在数组中，然后在自己的result参数中获取到结果，result是个对象。
 *
 * 从执行结果可以看出来，只要接受了参数，就会接收到上面的所有函数传下来的值。
 *
 * 执行结果:
 * 刘备开始执行
 关羽开始执行
 张飞开始执行
 上面的哥哥们传的结果： { '刘备': [ '我是刘备', '你应该叫我大哥' ], '关羽': '我是关羽' }
 赵云开始执行
 上面的三位兄弟说： { '刘备': [ '我是刘备', '你应该叫我大哥' ], '关羽': '我是关羽', '张飞': '我是张飞' }
 执行出现错误：  null
 执行完毕： { '刘备': [ '我是刘备', '你应该叫我大哥' ],
 '关羽': '我是关羽',
 '张飞': '我是张飞',
 '赵云': { '张飞传给我的': '我是张飞', '姓名': '赵子龙' } }
 * */

async.auto({
  '刘备': function(callback) {
    console.log('刘备开始执行');
    callback(null, '我是刘备', '你应该叫我大哥');
  },
  '关羽': function(callback) {
    console.log('关羽开始执行');
    callback(null, '我是关羽');
  },
  '张飞': ['刘备', '关羽', function(results, callback) {
    console.log('张飞开始执行');
    console.log('上面的哥哥们传的结果：', results);
    callback(null, '我是张飞');
  }],
  '赵云': ['张飞', function(results, callback) {
    console.log('赵云开始执行');
    console.log('上面的三位兄弟说：', results);
    callback(null, {'张飞传给我的':results['张飞'], '姓名':'赵子龙'});
  }]
}, function(err, results) {
  console.log('执行出现错误： ', err);
  console.log('执行完毕：', results);
});
