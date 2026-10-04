/* Official lesson tests (when a lesson supplies `exam`) and the legacy
   generated vocabulary drill.  No source-backed `exam` means the drill stays
   the default, so lessons never render a blank test page. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function shuffle(a) {
    for (var n = a.length - 1; n > 0; n--) {
      var j = Math.floor(Math.random() * (n + 1)), t = a[n];
      a[n] = a[j]; a[j] = t;
    }
    return a;
  }

  /* A lesson can carry two separate official-style tests:
       examVocab   — ことばテスト (từ vựng, thường 30 câu)
       examGrammar — 文法テスト  (ngữ pháp, thường 30 câu)
     plus the older combined `exam` array, still shown when present.
     Routes: quiz (chooser) · quiz/tuvung · quiz/nguphap · quiz/de · quiz/vocab (drill) */
  var TESTS = [
    { sub: 'tuvung', key: 'examVocab', store: ':exam-vocab', title: 'Bài kiểm tra từ vựng', jp: 'ことばテスト' },
    { sub: 'nguphap', key: 'examGrammar', store: ':exam-grammar', title: 'Bài kiểm tra ngữ pháp', jp: '文法テスト' },
    { sub: 'de', key: 'exam', store: ':exam', title: 'Đề luyện tập tổng hợp', jp: '' }
  ];
  function hasItems(a) { return Array.isArray(a) && a.length > 0; }
  /* examVocab / examGrammar may be one test (array of items) or several
     tests (array of arrays). Always returns a list of item arrays. */
  function testsOf(lesson, key) {
    var v = lesson[key];
    if (!hasItems(v)) return [];
    return Array.isArray(v[0]) ? v.filter(hasItems) : [v];
  }

  window.Views.quiz = function (root, lesson, meta, sub) {
    var avail = TESTS.filter(function (t) { return testsOf(lesson, t.key).length; });
    var parts = String(sub || '').split('/');
    var picked = avail.filter(function (t) { return t.sub === parts[0]; })[0];
    if (picked) {
      var list = testsOf(lesson, picked.key);
      var idx = Math.max(1, Math.min(list.length, parseInt(parts[1], 10) || 1));
      runExamSession(root, lesson, picked, list[idx - 1], idx, list.length);
      return;
    }
    if (avail.length && sub !== 'vocab') { renderChooser(root, lesson, avail); return; }
    runQuizSession(root, {
      pool: lesson.vocab || [], storeId: lesson.id,
      title: (avail.length ? 'Luyện từ vựng nhanh — ' : 'Kiểm tra ') + 'bài ' + esc(lesson.n || ''),
      intro: avail.length ? 'Ôn nhanh từ vựng của bài. Đây không phải đề kiểm tra chính thức.' : '',
      afterAction: avail.length ? { label: '← Chọn đề kiểm tra', attr: 'data-nav="quiz"' } : { label: 'Xem lại từ vựng', attr: 'data-nav="vocab"' }
    });
  };

  function storeKey(lesson, test, idx) { return lesson.id + test.store + (idx > 1 ? ':' + idx : ''); }

  function renderChooser(root, lesson, avail) {
    root.innerHTML = '<div class="quiz-wrap"><h1>Kiểm tra bài ' + esc(lesson.n || '') + '</h1>' +
      '<p class="sub">Chọn bài kiểm tra. Mỗi câu 1 điểm.</p>' +
      avail.map(function (t) {
        var list = testsOf(lesson, t.key);
        return '<h2 class="exam-group">' + esc(t.title) + (t.jp ? ' <span class="jp">' + esc(t.jp) + '</span>' : '') + '</h2><div class="exam-pick">' +
          list.map(function (items, i) {
            var n = flattenExam(items).length, best = Store.bestScore(storeKey(lesson, t, i + 1));
            return '<button class="exam-card" data-nav="quiz/' + t.sub + '/' + (i + 1) + '">' +
              '<span class="exam-card-title">' + (list.length > 1 ? 'Đề ' + (i + 1) : esc(t.title)) + '</span>' +
              '<span class="exam-card-meta">' + n + ' câu' + (best !== null ? ' · cao nhất ' + Math.round(best * n) + '/' + n : '') + '</span></button>';
          }).join('') + '</div>';
      }).join('') +
      '<div class="toolbar"><button class="btn" data-nav="quiz/vocab">Luyện từ vựng nhanh</button></div></div>';
  }

  /* exam item shapes:
       {sec, t:'mcq', q, opt, ans}
       {sec, t:'fill', q, acc:[accepted answer, ...]}
       {sec, t:'reading', passage, qs:[{q,opt,ans}]}
     optional on mcq/fill: pic (emoji hoặc mô tả hình), box ([từ trong khung]),
     hint (dạng cần chia, vd 'て形'). */
  function runExamSession(root, lesson, test, items, idx, total) {
    var questions = flattenExam(items);
    var storeId = storeKey(lesson, test, idx);
    var label = test.title + (total > 1 ? ' — Đề ' + idx : '');
    setup();

    function setup() {
      var best = Store.bestScore(storeId), secs = sectionNames(questions);
      root.innerHTML = '<div class="quiz-wrap"><h1>' + esc(label) + ' · bài ' + esc(lesson.n || '') + '</h1>' +
        '<p class="sub">' + questions.length + ' câu · ' + questions.length + ' điểm · làm theo từng phần, nộp bài để xem kết quả.' +
        (best !== null ? ' Điểm cao nhất: <b>' + Math.round(best * questions.length) + '/' + questions.length + '</b>.' : '') + '</p>' +
        '<div class="exam-sections">' + secs.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
        '<button class="btn primary" id="qstart">Bắt đầu làm bài</button>' +
        '<div class="toolbar"><button class="btn" data-nav="quiz">← Chọn bài khác</button></div></div>';
      root.querySelector('#qstart').addEventListener('click', start);
    }

    function start() {
      var idx = 0, answers = [];
      render();
      function render() {
        var q = questions[idx];
        var body = q.opt ? '<div class="opts">' + q.opt.map(function (o, i) {
          return '<button class="opt" data-i="' + i + '" aria-pressed="' + (answers[idx] === i) + '">' + esc(o) + '</button>';
        }).join('') + '</div>' : '<div class="fill-answer"><input id="qfill" autocomplete="off" value="' + esc(answers[idx] || '') + '" placeholder="Nhập đáp án"></div>';
        root.innerHTML = '<div class="quiz-wrap"><div class="qbar"><i style="width:' + (idx / questions.length * 100) + '%"></i></div>' +
          '<div class="qprompt"><div class="lead">' + esc(q.sec || label) + ' · Câu ' + (idx + 1) + '/' + questions.length + '</div>' +
          (q.passage ? '<div class="passage jp">' + esc(q.passage) + '</div>' : '') +
          (q.box ? '<div class="word-box jp">' + q.box.map(function (w) { return '<span>' + esc(w) + '</span>'; }).join('') + '</div>' : '') +
          (q.pic ? '<div class="q-pic">' + esc(q.pic) + '</div>' : '') +
          '<div class="q jp' + (String(q.q).length > 14 ? ' long' : '') + '">' + esc(q.q) + '</div>' +
          (q.hint ? '<div class="q-hint">→ <span class="jp">' + esc(q.hint) + '</span></div>' : '') + '</div>' + body +
          '<div class="flash-controls"><button class="btn" id="qprev"' + (idx ? '' : ' disabled') + '>← Trước</button><button class="btn primary" id="qnext">' +
          (idx + 1 === questions.length ? 'Nộp bài' : 'Tiếp →') + '</button></div></div>';
        Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (b) {
          b.addEventListener('click', function () { answers[idx] = parseInt(b.getAttribute('data-i'), 10); render(); });
        });
        var fill = root.querySelector('#qfill');
        if (fill) {
          fill.focus();
          fill.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) root.querySelector('#qnext').click(); });
        }
        root.querySelector('#qprev').addEventListener('click', function () { if (fill) answers[idx] = fill.value; idx--; render(); });
        root.querySelector('#qnext').addEventListener('click', function () {
          if (fill) answers[idx] = fill.value;
          if (idx + 1 === questions.length) finish(); else { idx++; render(); }
        });
      }
      function finish() {
        var correct = 0, wrong = [];
        questions.forEach(function (q, i) {
          var ok = q.opt ? answers[i] === q.ans : matchesFill(answers[i], q.acc || q.ans);
          if (ok) correct++; else wrong.push({ q: q, answer: answers[i] });
        });
        Store.addScore(storeId, correct, questions.length);
        root.innerHTML = '<div class="quiz-wrap score"><div class="big">' + correct + '<small>/' + questions.length + '</small></div><p class="sub">' + esc(label) + ' · đúng ' + Math.round(correct / questions.length * 100) + '%.</p>' +
          '<div class="flash-controls"><button class="btn primary" id="qagain">Làm lại</button><button class="btn" data-nav="quiz">Chọn bài khác</button></div>' + review(wrong) + '</div>';
        root.querySelector('#qagain').addEventListener('click', setup);
      }
    }
  }

  function flattenExam(exam) {
    var out = [];
    (exam || []).forEach(function (item) {
      if (item.t === 'reading') (item.qs || []).forEach(function (q) { out.push({ sec: item.sec, passage: item.passage, q: q.q, opt: q.opt, ans: q.ans }); });
      else if (item.q) out.push(item);
    });
    return out;
  }
  function sectionNames(qs) { var seen = {}; return qs.map(function (q) { return q.sec || 'Đề kiểm tra'; }).filter(function (s) { if (seen[s]) return false; seen[s] = 1; return true; }); }
  function matchesFill(value, ans) { var norm = function (x) { return String(x || '').normalize('NFKC').trim().replace(/[\s。．.]+/g, '').toLowerCase(); }; return (Array.isArray(ans) ? ans : [ans]).some(function (x) { return norm(x) === norm(value); }); }
  function review(wrong) {
    if (!wrong.length) return '';
    return '<div class="review"><h2>Câu sai (' + wrong.length + ')</h2>' + wrong.map(function (x) {
      var accepted = x.q.acc || x.q.ans;
      var right = x.q.opt ? x.q.opt[x.q.ans] : (Array.isArray(accepted) ? accepted.join(' / ') : accepted);
      var yours = x.q.opt && x.answer !== undefined ? x.q.opt[x.answer] : (x.answer || 'Chưa trả lời');
      var label = (x.q.pic ? x.q.pic + ' ' : '') + x.q.q + (x.q.hint ? ' → ' + x.q.hint : '');
      return '<div class="row exam-review"><span class="jp">' + esc(label) + '</span><span><span class="yours">Bạn chọn: ' + esc(yours) + '</span><br><span class="right">Đúng: ' + esc(right) + '</span></span></div>';
    }).join('') + '</div>';
  }

  /* The original generated vocabulary drill. It also backs lessons without a
     verified official `exam`, and pooled multi-lesson practice via study.js. */
  window.runQuizSession = runQuizSession;
  function runQuizSession(root, opts) {
    var pool = opts.pool || [];
    if (pool.length < 4) { root.innerHTML = '<div class="empty">Chưa đủ từ để tạo đề kiểm tra (cần ít nhất 4 từ).</div>'; return; }
    setup();
    function setup() {
      var best = Store.bestScore(opts.storeId);
      root.innerHTML = '<div class="quiz-wrap"><h1>' + opts.title + '</h1><p class="sub">' + (opts.intro || 'Chọn nghĩa đúng. Sai ở đâu sẽ được liệt kê lại ở cuối để ôn.') + (best !== null ? ' Điểm cao nhất của bạn: <b>' + Math.round(best * 100) + '%</b>.' : '') + '</p>' +
        '<div class="toolbar"><button class="btn" data-n="10">10 câu</button><button class="btn" data-n="20">20 câu</button><button class="btn" data-n="0">Toàn bộ (' + pool.length + ' câu)</button></div><div class="toolbar"><button class="btn" data-mode="jp2vi" aria-pressed="true">Nhật → Việt</button><button class="btn" data-mode="vi2jp">Việt → Nhật</button><button class="btn" data-mode="mix">Trộn cả hai</button></div><button class="btn primary" id="qstart">Bắt đầu</button></div>';
      var n = 10, mode = 'jp2vi';
      Array.prototype.forEach.call(root.querySelectorAll('[data-n]'), function (b, i, all) { if (!i) b.setAttribute('aria-pressed', 'true'); b.addEventListener('click', function () { n = parseInt(b.getAttribute('data-n'), 10); Array.prototype.forEach.call(all, function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); }); });
      Array.prototype.forEach.call(root.querySelectorAll('[data-mode]'), function (b, i, all) { b.addEventListener('click', function () { mode = b.getAttribute('data-mode'); Array.prototype.forEach.call(all, function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); }); });
      root.querySelector('#qstart').addEventListener('click', function () { start(n === 0 ? pool.length : Math.min(n, pool.length), mode); });
    }
    function start(count, mode) {
      var questions = shuffle(pool.slice()).slice(0, count).map(function (w) { var dir = mode === 'mix' ? (Math.random() < .5 ? 'jp2vi' : 'vi2jp') : mode; return { word: w, dir: dir, options: makeOptions(w, dir) }; });
      var idx = 0, correct = 0, wrong = []; render();
      function makeOptions(w, dir) { var field = dir === 'jp2vi' ? 'm' : 'w', others = shuffle(pool.filter(function (o) { return o !== w && o[field] !== w[field]; })), seen = {}, out = [w]; seen[w[field]] = 1; for (var i = 0; i < others.length && out.length < 4; i++) if (!seen[others[i][field]]) { seen[others[i][field]] = 1; out.push(others[i]); } return shuffle(out); }
      function render() {
        if (idx >= questions.length) return finish(); var q = questions[idx], w = q.word;
        var prompt = q.dir === 'jp2vi' ? '<div class="q jp">' + esc(w.w) + '</div>' + (w.k ? '<div class="kana jp" style="color:var(--ink-faint)">' + esc(w.k) + '</div>' : '') : '<div class="q vi">' + esc(w.m) + '</div>';
        root.innerHTML = '<div class="quiz-wrap"><div class="qbar"><i style="width:' + (idx / questions.length * 100) + '%"></i></div><div class="qprompt"><div class="lead">Câu ' + (idx + 1) + '/' + questions.length + ' · ' + (q.dir === 'jp2vi' ? 'Từ này nghĩa là gì?' : 'Từ tiếng Nhật nào có nghĩa này?') + '</div>' + prompt + '</div><div class="opts">' + q.options.map(function (o, i) { var label = q.dir === 'jp2vi' ? esc(o.m) : '<span class="jp">' + esc(o.w) + '</span>' + (o.k ? ' <span style="color:var(--ink-faint);font-size:13px">' + esc(o.k) + '</span>' : ''); return '<button class="opt" data-i="' + i + '">' + label + '</button>'; }).join('') + '</div></div>';
        Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (b) { b.addEventListener('click', function () { answer(parseInt(b.getAttribute('data-i'), 10)); }); });
      }
      function answer(chosen) { var q = questions[idx], picked = q.options[chosen], ok = picked === q.word; if (ok) correct++; else wrong.push({ q: q, picked: picked }); Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (b, i) { b.disabled = true; if (q.options[i] === q.word) b.classList.add('correct'); else if (i === chosen) b.classList.add('wrong'); }); setTimeout(function () { if (!document.body.contains(root)) return; idx++; render(); }, ok ? 420 : 1150); }
      function finish() { Store.addScore(opts.storeId, correct, questions.length); var pct = Math.round(correct / questions.length * 100); root.innerHTML = '<div class="quiz-wrap score"><div class="big">' + pct + '<small>%</small></div><p class="sub">Đúng ' + correct + '/' + questions.length + ' câu.</p><div class="flash-controls"><button class="btn primary" id="qagain">Làm lại</button>' + (opts.afterAction ? '<button class="btn" ' + opts.afterAction.attr + '>' + esc(opts.afterAction.label) + '</button>' : '') + '</div>' + (wrong.length ? '<div class="review"><h2>Câu sai (' + wrong.length + ')</h2>' + wrong.map(function (x) { return '<div class="row"><span class="jp">' + esc(x.q.word.w) + (x.q.word.k ? ' <span style="font-size:13px;color:var(--ink-faint)">' + esc(x.q.word.k) + '</span>' : '') + '</span><span><span class="yours">Bạn chọn: ' + esc(x.q.dir === 'jp2vi' ? x.picked.m : x.picked.w) + '</span><br><span class="right">Đúng: ' + esc(x.q.dir === 'jp2vi' ? x.q.word.m : x.q.word.w) + '</span></span></div>'; }).join('') + '</div>' : '') + '</div>'; root.querySelector('#qagain').addEventListener('click', setup); }
    }
  }
})();
