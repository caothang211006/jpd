/* Kiểm tra thứ tự đề có cố định không.
   Nạp js/quiz.js và mọi file data, xếp mọi đề bằng chính hàm của app
   (orderExam: mulberry32 + Fisher-Yates theo seed của đề), rồi in mã băm
   SHA-256 của toàn bộ thứ tự câu và thứ tự đáp án.

     node tools/order-check.js            in mã băm + vài dòng đầu
     node tools/order-check.js --dump     in toàn bộ thứ tự (để so sánh)

   Chạy nhiều lần, ở nhiều máy: mã băm phải giống hệt nhau. Không cần thư viện. */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');

var ROOT = path.join(__dirname, '..');
var lessons = [], books = [];
var sandbox = { console: console };
sandbox.window = sandbox;
sandbox.JPD = {
  book: function (b) { books.push(b); },
  lesson: function (l) { lessons.push(l); },
  meta: function () { return null; }
};
vm.createContext(sandbox);
function run(file) { vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox, { filename: file }); }

run('data/manifest.js');
books.forEach(function (b) { b.lessons.forEach(function (l) { if (l.file) run(l.file); }); });
run('js/util.js');
run('js/quiz.js');

var O = sandbox.JPDOrder, T = sandbox.EXAM_TYPES;
var lines = [];
lessons.forEach(function (lesson) {
  T.forEach(function (t) {
    var v = lesson[t.key];
    if (!Array.isArray(v) || !v.length) return;
    var list = Array.isArray(v[0]) ? v.filter(function (x) { return Array.isArray(x) && x.length; }) : [v];   // giống testsOf()
    list.forEach(function (items, i) {
      var idx = i + 1;
      var storeId = lesson.id + t.store + (idx > 1 ? ':' + idx : '');   // giống storeKey() trong quiz.js
      var flat = O.flattenExam(items, lesson);
      flat.forEach(function (q, n) { q._n = n + 1; });
      var ordered = O.orderExam(flat, storeId);
      lines.push(storeId + ' ' + ordered.map(function (q) {
        return q._n + (q.opt ? '[' + q.ans + ':' + q.opt.join('/') + ']' : '');
      }).join(' '));
    });
  });
});

var text = lines.join('\n');
var hash = crypto.createHash('sha256').update(text).digest('hex');
if (process.argv.indexOf('--dump') >= 0) { console.log(text); }
else {
  console.log('đề: ' + lines.length + ' · sha256: ' + hash);
  lines.slice(0, 3).forEach(function (l) { console.log('  ' + l.replace(/\[[^\]]*\]/g, '').slice(0, 110)); });
}
