/* Bài kiểm tra.
     - Đề chính thức của từng bài (examVocab / examGrammar / exam cũ).
     - Đề gộp câu hỏi kiểm tra của nhiều bài (#/mix/...).
     - Luyện nghĩa từ nhanh (runQuizSession) cho bài chưa có đề và cho #/study.

   Hình dạng câu hỏi trong data:
     {sec, t:'mcq',  q, opt, ans}
     {sec, t:'fill', q, acc:[đáp án chấp nhận, ...]}
     {sec, t:'reading', passage, qs:[{q, opt, ans}]}
   Trường tùy chọn: pic, box, hint, g (chỉ số mẫu ngữ pháp), why (giải thích),
   tr (bản dịch câu đã điền đáp án), trCheck (bản dịch cần người kiểm tra),
   full (câu đã điền đáp án, chỉ ghi khi không tự điền được). */
(function () {
  'use strict';
  window.Views = window.Views || {};

  var TESTS = [
    { sub: 'tuvung',  key: 'examVocab',   store: ':exam-vocab',   title: 'Bài kiểm tra từ vựng',  jp: 'ことばテスト' },
    { sub: 'nguphap', key: 'examGrammar', store: ':exam-grammar', title: 'Bài kiểm tra ngữ pháp', jp: '文法テスト' },
    { sub: 'de',      key: 'exam',        store: ':exam',         title: 'Đề luyện tập tổng hợp', jp: '' }
  ];

  /* ------------------------------------------------------------ helpers */

  function each(root, sel, fn) { Array.prototype.forEach.call(root.querySelectorAll(sel), fn); }
  function hasItems(a) { return Array.isArray(a) && a.length > 0; }

  /* Số ngẫu nhiên có seed: cùng seed → cùng dãy số, nên thứ tự đề cố định.
     Chỉ dùng phép tính số nguyên 32-bit (Math.imul, >>>), không dùng
     Math.random, Date hay sort() ngẫu nhiên, nên mọi máy, mọi trình duyệt
     cho cùng một thứ tự. Kiểm tra: node tools/order-check.js */
  function seededRandom(seedText) {
    var h = 1779033703 ^ seedText.length;
    for (var i = 0; i < seedText.length; i++) {
      h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    var a = h >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* Fisher-Yates. rand bắt buộc: đề dùng seededRandom; luyện từ nhanh
     (không phải đề) truyền Math.random để mỗi lần ra bộ từ khác. */
  function shuffle(a, rand) {
    for (var n = a.length - 1; n > 0; n--) {
      var j = Math.floor(rand() * (n + 1)), t = a[n];
      a[n] = a[j]; a[j] = t;
    }
    return a;
  }

  /* examVocab / examGrammar có thể là 1 đề (mảng câu) hoặc nhiều đề (mảng các mảng). */
  function testsOf(lesson, key) {
    var v = lesson[key];
    if (!hasItems(v)) return [];
    return Array.isArray(v[0]) ? v.filter(hasItems) : [v];
  }
  window.examTestsOf = function (lesson) {
    return TESTS.map(function (t) { return { test: t, list: testsOf(lesson, t.key) }; })
                .filter(function (x) { return x.list.length; });
  };
  window.EXAM_TYPES = TESTS;

  function storeKey(lesson, test, idx) { return lesson.id + test.store + (idx > 1 ? ':' + idx : ''); }

  function lessonTag(lesson) {
    var m = JPD.meta(lesson.id);
    return m ? (m.book.tone === 'red' ? 'Đỏ ' : 'Vàng ') + m.lesson.n : '';
  }

  /* Trải phẳng đề: mỗi câu biết bài gốc (_lesson) và nhóm (_group). Các câu
     cùng một đoạn văn có chung _group để luôn đi cùng nhau. */
  function flattenExam(items, lesson, groupPrefix) {
    var out = [];
    (items || []).forEach(function (item, i) {
      var group = (groupPrefix || '') + i;
      if (item.t === 'reading') {
        (item.qs || []).forEach(function (q) {
          var c = copy(q);
          c.sec = item.sec; c.passage = item.passage;
          c._lesson = lesson; c._group = group;
          out.push(c);
        });
      } else if (item.q) {
        var c = copy(item);
        c._lesson = lesson; c._group = group;
        out.push(c);
      }
    });
    return out;
  }
  function copy(o) { var c = {}; for (var k in o) c[k] = o[k]; return c; }

  function unitsOf(questions) {
    var units = [], byGroup = {};
    questions.forEach(function (q) {
      if (!byGroup[q._group]) { byGroup[q._group] = []; units.push(byGroup[q._group]); }
      byGroup[q._group].push(q);
    });
    return units;
  }

  /* Thứ tự cố định nhưng đã xáo: xáo các nhóm câu trong từng phần (giữ thứ
     tự các phần), rồi xáo lựa chọn. Thử lại với muối khác nếu thứ tự vẫn
     trùng thứ tự gốc hoặc vẫn đi theo thứ tự mẫu ngữ pháp. */
  function orderExam(questions, seedKey) {
    var secs = [], bySec = {};
    unitsOf(questions).forEach(function (u) {
      var s = u[0].sec || '';
      if (!bySec[s]) { bySec[s] = []; secs.push(s); }
      bySec[s].push(u);
    });
    var out = [];
    secs.forEach(function (s) {
      var units = bySec[s], picked = units;
      for (var salt = 0; salt < 40; salt++) {
        picked = shuffle(units.slice(), seededRandom(seedKey + '|' + s + '|' + salt));
        if (units.length < 3 || (!sameOrder(picked, units) && !followsGrammar(picked))) break;
      }
      picked.forEach(function (u) { u.forEach(function (q) { out.push(q); }); });
    });
    return out.map(function (q, i) { return shuffleOptions(q, seedKey + '|opt|' + i); });
  }
  function sameOrder(a, b) { return a.every(function (x, i) { return x === b[i]; }); }
  function followsGrammar(units) {
    var g = units.map(function (u) { return u[0].g; }).filter(function (x) { return typeof x === 'number' && x >= 0; });
    if (g.length < 3 || g.every(function (x) { return x === g[0]; })) return false;  // một mẫu duy nhất: không xét
    for (var i = 1; i < g.length; i++) if (g[i] < g[i - 1]) return false;
    return true;
  }
  function shuffleOptions(q, seed) {
    if (!q.opt) return q;
    var order = shuffle(q.opt.map(function (_, i) { return i; }), seededRandom(seed));
    var c = copy(q);
    c.opt = order.map(function (i) { return q.opt[i]; });
    c.ans = order.indexOf(q.ans);
    return c;
  }

  window.JPDOrder = { seededRandom: seededRandom, shuffle: shuffle, flattenExam: flattenExam, orderExam: orderExam };

  function isRight(q, a) { return q.opt ? a === q.ans : matchesFill(a, q.acc || q.ans); }
  function rightText(q) {
    if (q.opt) return q.opt[q.ans];
    var acc = q.acc || q.ans;
    return Array.isArray(acc) ? acc.join(' / ') : acc;
  }
  function matchesFill(value, ans) {
    var norm = function (x) {
      return String(x || '').normalize('NFKC').trim().replace(/[\s。．.]+/g, '').toLowerCase();
    };
    return (Array.isArray(ans) ? ans : [ans]).some(function (x) { return norm(x) === norm(value); });
  }
  function sectionNames(qs) {
    var seen = {};
    return qs.map(function (q) { return q.sec || 'Đề kiểm tra'; })
             .filter(function (s) { if (seen[s]) return false; seen[s] = 1; return true; });
  }

  /* Giải thích sau khi trả lời (theo bài gốc của câu):
       Mẫu: …   Lý do: …   Dịch: 「câu đã điền đáp án」→ bản dịch */
  function explain(q) {
    var L = q._lesson || {}, lines = [];
    if (typeof q.g === 'number' && q.g >= 0 && L.grammar && L.grammar[q.g]) {
      lines.push('<b>Mẫu:</b> <span class="jp">' + esc(L.grammar[q.g].pat) + '</span>');
    }
    if (q.why) lines.push('<b>Lý do:</b> ' + furi(q.why));
    if (!lines.length) {
      var word = vocabFor(q, L);
      if (word) {
        lines.push('<b>Từ:</b> <span class="jp">' + esc(word.w) + (word.k ? '（' + esc(word.k) + '）' : '') + '</span>' +
                   (word.hv ? ' · ' + esc(word.hv) : '') + ' — ' + esc(word.m));
      }
    }
    if (q.tr) {
      var full = filledSentence(q);
      lines.push('<b>Dịch:</b> <span class="jp">「' + furi(full) + '」</span> → ' + esc(q.tr) +
                 (q.trCheck ? ' <span class="tr-check">(bản dịch cần kiểm tra)</span>' : ''));
    }
    return lines.length ? '<div class="q-explain">' + lines.map(function (l) { return '<div>' + l + '</div>'; }).join('') + '</div>' : '';
  }
  /* Câu đã điền đáp án. Câu đặc biệt (2 chỗ trống, đáp án có ～) ghi sẵn
     câu đầy đủ trong data (trường full); câu thường: điền đáp án vào chỗ
     trống, bỏ phần chỉ dẫn cuối câu như ［尊敬語で］ hay （gợi ý: …）. */
  function filledSentence(q) {
    if (q.full) return q.full;
    var s = String(q.q || '').replace(/\s*(［[^］]*］|（gợi ý[^）]*）)\s*$/, '');
    return /＿/.test(s) ? s.replace(/＿+/, rightText(q).split(' / ')[0]) : s;
  }
  function vocabFor(q, L) {
    if (!L.vocab) return null;
    var right = q.opt ? q.opt[q.ans] : (q.acc || [])[0];
    var key = String(right || '').replace(/（[^）]*）/g, '').trim();
    if (!key) return null;
    return L.vocab.filter(function (w) {
      var base = String(w.w).replace(/（[^）]*）|［[^］]*］|～/g, '').trim();
      return base === key || w.w === key || w.k === key || String(w.k).replace(/（[^）]*）/g, '') === key;
    })[0] || null;
  }

  /* --------------------------------------------------- per-lesson view */

  window.Views.quiz = function (root, lesson, meta, sub) {
    var avail = TESTS.filter(function (t) { return testsOf(lesson, t.key).length; });
    var parts = String(sub || '').split('/');
    var picked = avail.filter(function (t) { return t.sub === parts[0]; })[0];
    if (picked) {
      var list = testsOf(lesson, picked.key);
      var idx = Math.max(1, Math.min(list.length, parseInt(parts[1], 10) || 1));
      var storeId = storeKey(lesson, picked, idx);
      runExamSession(root, {
        title: picked.title + (list.length > 1 ? ' — Đề ' + idx : '') + ' · bài ' + (lesson.n || ''),
        label: picked.title + (list.length > 1 ? ' — Đề ' + idx : ''),
        questions: orderExam(flattenExam(list[idx - 1], lesson), storeId),
        storeId: storeId,
        backNav: 'quiz'
      });
      return;
    }
    if (avail.length && sub !== 'vocab') { renderChooser(root, lesson, avail); return; }
    runQuizSession(root, {
      pool: lesson.vocab || [], storeId: lesson.id,
      title: (avail.length ? 'Luyện từ vựng nhanh — ' : 'Kiểm tra ') + 'bài ' + esc(lesson.n || ''),
      intro: avail.length ? 'Ôn nhanh từ vựng của bài. Đây không phải đề kiểm tra chính thức.' : '',
      afterAction: avail.length ? { label: '← Chọn đề kiểm tra', attr: 'data-nav="quiz"' }
                                : { label: 'Xem lại từ vựng', attr: 'data-nav="vocab"' }
    });
  };

  function renderChooser(root, lesson, avail) {
    root.innerHTML = '<div class="quiz-wrap"><h1>Kiểm tra bài ' + esc(lesson.n || '') + '</h1>' +
      '<p class="sub">Chọn bài kiểm tra. Mỗi câu 1 điểm.</p>' +
      avail.map(function (t) {
        var list = testsOf(lesson, t.key);
        return '<h2 class="exam-group">' + esc(t.title) + (t.jp ? ' <span class="jp">' + esc(t.jp) + '</span>' : '') + '</h2>' +
          '<div class="exam-pick">' + list.map(function (items, i) {
            var n = flattenExam(items, lesson).length, best = Store.bestScore(storeKey(lesson, t, i + 1));
            return '<button class="exam-card" data-nav="quiz/' + t.sub + '/' + (i + 1) + '">' +
              '<span class="exam-card-title">' + (list.length > 1 ? 'Đề ' + (i + 1) : esc(t.title)) + '</span>' +
              '<span class="exam-card-meta">' + n + ' câu' + (best !== null ? ' · cao nhất ' + Math.round(best * n) + '/' + n : '') + '</span>' +
            '</button>';
          }).join('') + '</div>';
      }).join('') +
      '<div class="toolbar"><button class="btn" data-nav="quiz/vocab">Luyện từ vựng nhanh</button></div></div>';
  }

  /* ------------------------------------------------- merged exam (#/mix) */

  /* spec = {type: 'tuvung'|'nguphap'|'de', de: số đề, per: số câu mỗi bài (0 = tất cả), ids: [...]}.
     Điểm lưu ở storeId riêng 'mix:<type>:<de>:<per>:<ids đã sắp xếp>' — không
     ghi vào điểm của từng bài, vì đề gộp có thể chỉ lấy một phần câu của mỗi bài. */
  window.runMixedExam = function (root, spec, lessons) {
    var test = TESTS.filter(function (t) { return t.sub === spec.type; })[0];
    var ids = lessons.map(function (l) { return l.id; }).sort();
    var storeId = 'mix:' + spec.type + ':' + spec.de + ':' + (spec.per || 0) + ':' + ids.join(',');
    var questions = [];
    lessons.forEach(function (l) {
      var list = testsOf(l, test.key);
      if (!list.length) return;
      var items = list[Math.min(spec.de, list.length) - 1];
      var qs = flattenExam(items, l, l.id + '#');
      if (spec.per) {
        var units = shuffle(unitsOf(qs), seededRandom(storeId + '|pick|' + l.id)), picked = [], count = 0;
        units.forEach(function (u) { if (count < spec.per) { picked.push(u); count += u.length; } });
        var keep = {};
        picked.forEach(function (u) { keep[u[0]._group] = 1; });
        qs = qs.filter(function (q) { return keep[q._group]; });
      }
      questions = questions.concat(qs);
    });
    if (!questions.length) {
      root.innerHTML = '<div class="empty">Các bài đã chọn chưa có đề loại này.<br>' +
        '<button class="btn" data-nav="all-quiz" style="margin-top:12px">← Chọn lại</button></div>';
      return;
    }
    var tags = lessons.map(lessonTag).join(', ');
    runExamSession(root, {
      title: 'Đề gộp — ' + test.title.replace('Bài kiểm tra ', '') + ' · ' + tags,
      label: 'Đề gộp',
      questions: orderExam(questions, storeId),
      storeId: storeId,
      backNav: 'all-quiz',
      mixed: true
    });
  };

  /* ------------------------------------------------------ exam session */

  /* opts = {title, label, questions, storeId, backNav, mixed, retry}
     retry: phiên "Làm lại câu sai" — vào thẳng câu đầu, không lưu điểm, để
     điểm của đề (và của đề gộp) không bị đổi bởi phiên chỉ có câu sai. */
  function runExamSession(root, opts) {
    var questions = opts.questions;
    if (opts.retry) start(); else setup();

    function setup() {
      var best = Store.bestScore(opts.storeId), n = questions.length;
      root.innerHTML = '<div class="quiz-wrap"><h1>' + esc(opts.title) + '</h1>' +
        '<p class="sub">' + n + ' câu · ' + n + ' điểm · chọn đáp án là biết đúng sai ngay.' +
        (best !== null ? ' Điểm cao nhất: <b>' + Math.round(best * n) + '/' + n + '</b>.' : '') + '</p>' +
        '<div class="exam-sections">' + sectionNames(questions).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
        '<button class="btn primary" id="qstart">Bắt đầu làm bài</button>' +
        '<div class="toolbar"><button class="btn" data-nav="' + opts.backNav + '">← Chọn bài khác</button></div></div>';
      root.querySelector('#qstart').addEventListener('click', start);
    }

    function start() {
      var idx = 0, answers = [], done = [];
      render();

      function score() {
        return done.reduce(function (n, d, i) { return n + (d && isRight(questions[i], answers[i]) ? 1 : 0); }, 0);
      }

      function answerHtml(q, checked, a) {
        if (q.opt) {
          return '<div class="opts">' + q.opt.map(function (o, i) {
            var cls = 'opt';
            if (checked) { if (i === q.ans) cls += ' correct'; else if (i === a) cls += ' wrong'; }
            return '<button class="' + cls + '" data-i="' + i + '"' + (checked ? ' disabled' : '') + '>' + furi(o) + '</button>';
          }).join('') + '</div>';
        }
        return '<div class="fill-answer"><input id="qfill" autocomplete="off" autocapitalize="off" value="' + esc(a || '') +
               '" placeholder="Nhập đáp án"' + (checked ? ' disabled' : '') + '>' +
               (checked ? '' : '<button class="btn primary" id="qcheck">Kiểm tra</button>') + '</div>';
      }

      function feedbackHtml(q, a) {
        var ok = isRight(q, a);
        return '<div class="q-feedback ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✓ Đúng' : '✗ Sai') +
               (ok && q.opt ? '' : ' — Đáp án: <span class="jp">' + furi(rightText(q)) + '</span>') + '</div>' + explain(q);
      }

      function promptHtml(q) {
        var lead = (opts.mixed ? lessonTag(q._lesson) + ' · ' : '') + (q.sec || opts.label) +
                   ' · Câu ' + (idx + 1) + '/' + questions.length + ' · Đúng ' + score();
        var plain = String(q.q).replace(/（[^）]*）/g, '');
        return '<div class="qprompt"><div class="lead">' + esc(lead) + '</div>' +
          (q.passage ? '<div class="passage jp">' + furi(q.passage) + '</div>' : '') +
          (q.box ? '<div class="word-box jp">' + q.box.map(function (w) { return '<span>' + furi(w) + '</span>'; }).join('') + '</div>' : '') +
          (q.pic ? '<div class="q-pic">' + esc(q.pic) + '</div>' : '') +
          '<div class="q jp' + (plain.length > 14 ? ' long' : '') + '">' + furi(q.q) + '</div>' +
          (q.hint ? '<div class="q-hint">→ <span class="jp">' + esc(q.hint) + '</span></div>' : '') + '</div>';
      }

      function navGrid() {
        var h = '<div class="qnav"><div class="qnav-head"><span>Bảng câu hỏi · đã làm ' + done.filter(Boolean).length + '/' + questions.length + '</span>' +
          '<button class="btn btn-sm" id="qfinish">Nộp bài</button></div><div class="qnav-grid">';
        var lastSec = null;
        questions.forEach(function (q, i) {
          if (q.sec !== lastSec) { lastSec = q.sec; h += '<div class="qnav-sec">' + esc(String(q.sec || '').split('.')[0]) + '</div>'; }
          var cls = 'qnav-b' + (i === idx ? ' cur' : '') + (done[i] ? (isRight(q, answers[i]) ? ' ok' : ' bad') : '');
          h += '<button class="' + cls + '" data-jumpq="' + i + '">' + (i + 1) + '</button>';
        });
        return h + '</div></div>';
      }

      function render() {
        var q = questions[idx], checked = done[idx], a = answers[idx];
        root.innerHTML = '<div class="quiz-wrap"><div class="qbar"><i style="width:' + (idx / questions.length * 100) + '%"></i></div>' +
          promptHtml(q) + answerHtml(q, checked, a) + (checked ? feedbackHtml(q, a) : '') +
          '<div class="flash-controls"><button class="btn" id="qprev"' + (idx ? '' : ' disabled') + '>← Trước</button>' +
          '<button class="btn primary" id="qnext">' + (idx + 1 === questions.length ? 'Nộp bài' : 'Tiếp →') + '</button></div>' +
          navGrid() + '</div>';

        each(root, '.opt', function (b) {
          b.addEventListener('click', function () { choose(parseInt(b.getAttribute('data-i'), 10)); });
        });
        var fill = root.querySelector('#qfill');
        if (fill && !checked) {
          fill.focus();
          root.querySelector('#qcheck').addEventListener('click', check);
        }
        // e.detail === 0: click sinh ra từ bàn phím — phím tắt đã xử lý riêng
        root.querySelector('#qprev').addEventListener('click', function (e) { if (e.detail === 0) return; idx--; render(); });
        root.querySelector('#qnext').addEventListener('click', function (e) { if (e.detail === 0) return; next(); });
        each(root, '[data-jumpq]', function (b) {
          b.addEventListener('click', function () { idx = parseInt(b.getAttribute('data-jumpq'), 10); render(); });
        });
        root.querySelector('#qfinish').addEventListener('click', submit);
      }

      function choose(i) {
        if (done[idx]) return;
        answers[idx] = i; done[idx] = true; render();
      }
      function check() {
        var fill = root.querySelector('#qfill');
        if (done[idx] || !fill) return;
        answers[idx] = fill.value; done[idx] = true; render();
      }
      function next() {
        if (idx + 1 < questions.length) { idx++; render(); } else submit();
      }
      function submit() {
        var left = questions.length - done.filter(Boolean).length;
        if (left && !confirm('Còn ' + left + ' câu chưa làm (tính là sai). Nộp bài?')) return;
        finish();
      }

      /* Phím tắt: Enter = kiểm tra / sang câu tiếp; 1–9 = chọn đáp án */
      function onKey(e) {
        if (!document.body.contains(root) || !root.querySelector('#qnext')) {
          document.removeEventListener('keydown', onKey); return;
        }
        if (e.isComposing || e.keyCode === 229) return;   // đang gõ IME
        var q = questions[idx];
        if (e.key === 'Enter') {
          e.preventDefault(); e.stopPropagation();
          if (e.repeat) return;
          if (!done[idx] && !q.opt) check(); else next();
        } else if (q.opt && !done[idx] && /^[1-9]$/.test(e.key) && e.target.tagName !== 'INPUT') {
          var n = parseInt(e.key, 10) - 1;
          if (n < q.opt.length) choose(n);
        }
      }
      if (window.__examKey) document.removeEventListener('keydown', window.__examKey);
      window.__examKey = onKey;
      document.addEventListener('keydown', onKey);

      function finish() {
        var correct = 0, wrong = [];
        questions.forEach(function (q, i) {
          if (isRight(q, answers[i])) correct++; else wrong.push({ q: q, answer: answers[i] });
        });
        if (!opts.retry) Store.addScore(opts.storeId, correct, questions.length);
        root.innerHTML = '<div class="quiz-wrap score"><div class="big">' + correct + '<small>/' + questions.length + '</small></div>' +
          '<p class="sub">' + esc(opts.label) + ' · đúng ' + Math.round(correct / questions.length * 100) + '%.' +
          (opts.retry ? ' Phiên làm lại câu sai không lưu điểm.' : '') + '</p>' +
          '<div class="flash-controls">' +
          (wrong.length ? '<button class="btn primary" id="qretry">Làm lại câu sai (' + wrong.length + ')</button>' : '') +
          '<button class="btn' + (wrong.length ? '' : ' primary') + '" id="qagain">' + (opts.retry ? 'Làm lại cả đề' : 'Làm lại') + '</button>' +
          '<button class="btn" data-nav="' + opts.backNav + '">Chọn bài khác</button></div>' + review(wrong, opts.mixed) + '</div>';
        root.querySelector('#qagain').addEventListener('click', function () {
          if (opts.retry) runExamSession(root, opts.parent); else setup();
        });
        var rb = root.querySelector('#qretry');
        if (rb) rb.addEventListener('click', function () {
          runExamSession(root, {
            title: opts.title, label: 'Làm lại câu sai · ' + (opts.parent || opts).label,
            questions: wrong.map(function (x) { return x.q; }),   // giữ thứ tự cố định của đề
            storeId: opts.storeId, backNav: opts.backNav, mixed: opts.mixed,
            retry: true, parent: opts.parent || opts
          });
        });
      }
    }
  }

  function review(wrong, mixed) {
    if (!wrong.length) return '';
    return '<div class="review"><h2>Câu sai (' + wrong.length + ')</h2>' + wrong.map(function (x) {
      var q = x.q;
      var yours = q.opt && x.answer !== undefined ? q.opt[x.answer] : (x.answer || 'Chưa trả lời');
      var label = (mixed ? lessonTag(q._lesson) + ' · ' : '') + (q.pic ? q.pic + ' ' : '') + q.q + (q.hint ? ' → ' + q.hint : '');
      return '<div class="row exam-review"><span class="jp">' + furi(label) + '</span><span>' +
             '<span class="yours">Bạn chọn: ' + furi(yours) + '</span><br>' +
             '<span class="right">Đúng: ' + furi(rightText(q)) + '</span></span></div>';
    }).join('') + '</div>';
  }

  /* ---------------------------------------------- vocabulary drill (cũ) */

  /* Trắc nghiệm nghĩa từ, sinh từ danh sách từ vựng. Dùng cho bài chưa có đề
     chính thức và cho trang ôn từ vựng nhiều bài (#/study). */
  window.runQuizSession = runQuizSession;
  function runQuizSession(root, opts) {
    var pool = opts.pool || [];
    if (pool.length < 4) {
      root.innerHTML = '<div class="empty">Chưa đủ từ để tạo đề kiểm tra (cần ít nhất 4 từ).</div>';
      return;
    }
    setup();

    function setup() {
      var best = Store.bestScore(opts.storeId);
      root.innerHTML = '<div class="quiz-wrap"><h1>' + opts.title + '</h1>' +
        '<p class="sub">' + (opts.intro || 'Chọn nghĩa đúng. Sai ở đâu sẽ được liệt kê lại ở cuối để ôn.') +
        (best !== null ? ' Điểm cao nhất của bạn: <b>' + Math.round(best * 100) + '%</b>.' : '') + '</p>' +
        '<div class="toolbar"><button class="btn" data-n="10">10 câu</button><button class="btn" data-n="20">20 câu</button>' +
        '<button class="btn" data-n="0">Toàn bộ (' + pool.length + ' câu)</button></div>' +
        '<div class="toolbar"><button class="btn" data-mode="jp2vi" aria-pressed="true">Nhật → Việt</button>' +
        '<button class="btn" data-mode="vi2jp">Việt → Nhật</button><button class="btn" data-mode="mix">Trộn cả hai</button></div>' +
        '<button class="btn primary" id="qstart">Bắt đầu</button></div>';
      var n = 10, mode = 'jp2vi';
      pressGroup('[data-n]', true, function (b) { n = parseInt(b.getAttribute('data-n'), 10); });
      pressGroup('[data-mode]', false, function (b) { mode = b.getAttribute('data-mode'); });
      root.querySelector('#qstart').addEventListener('click', function () {
        start(n === 0 ? pool.length : Math.min(n, pool.length), mode);
      });
    }
    function pressGroup(sel, pressFirst, onPick) {
      var all = root.querySelectorAll(sel);
      Array.prototype.forEach.call(all, function (b, i) {
        if (pressFirst && !i) b.setAttribute('aria-pressed', 'true');
        b.addEventListener('click', function () {
          onPick(b);
          Array.prototype.forEach.call(all, function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
        });
      });
    }

    /* retryOf: danh sách câu sai của lượt trước → làm lại đúng các câu đó
       (cùng chiều hỏi, đáp án xếp lại), không lưu điểm. */
    function start(count, mode, retryOf) {
      var questions = retryOf ? retryOf.map(function (q) { return { word: q.word, dir: q.dir, options: makeOptions(q.word, q.dir) }; })
        : shuffle(pool.slice(), Math.random).slice(0, count).map(function (w) {
          var dir = mode === 'mix' ? (Math.random() < 0.5 ? 'jp2vi' : 'vi2jp') : mode;
          return { word: w, dir: dir, options: makeOptions(w, dir) };
        });
      var idx = 0, correct = 0, wrong = [];
      render();

      function makeOptions(w, dir) {
        var field = dir === 'jp2vi' ? 'm' : 'w';
        var others = shuffle(pool.filter(function (o) { return o !== w && o[field] !== w[field]; }), Math.random);
        var seen = {}, out = [w];
        seen[w[field]] = 1;
        for (var i = 0; i < others.length && out.length < 4; i++) {
          if (!seen[others[i][field]]) { seen[others[i][field]] = 1; out.push(others[i]); }
        }
        return shuffle(out, Math.random);
      }
      function optionLabel(o, dir) {
        return dir === 'jp2vi' ? esc(o.m)
          : '<span class="jp">' + esc(o.w) + '</span>' + (o.k ? ' <span class="opt-kana">' + esc(o.k) + '</span>' : '');
      }
      function render() {
        if (idx >= questions.length) return finish();
        var q = questions[idx], w = q.word;
        var prompt = q.dir === 'jp2vi'
          ? '<div class="q jp">' + esc(w.w) + '</div>' + (w.k ? '<div class="kana jp q-kana">' + esc(w.k) + '</div>' : '')
          : '<div class="q vi">' + vtMeaning(w) + '</div>';
        root.innerHTML = '<div class="quiz-wrap"><div class="qbar"><i style="width:' + (idx / questions.length * 100) + '%"></i></div>' +
          '<div class="qprompt"><div class="lead">Câu ' + (idx + 1) + '/' + questions.length + ' · ' +
          (q.dir === 'jp2vi' ? 'Từ này nghĩa là gì?' : 'Từ tiếng Nhật nào có nghĩa này?') + '</div>' + prompt + '</div>' +
          '<div class="opts">' + q.options.map(function (o, i) {
            return '<button class="opt" data-i="' + i + '">' + optionLabel(o, q.dir) + '</button>';
          }).join('') + '</div></div>';
        each(root, '.opt', function (b) {
          b.addEventListener('click', function () { answer(parseInt(b.getAttribute('data-i'), 10)); });
        });
      }
      function answer(chosen) {
        var q = questions[idx], picked = q.options[chosen], ok = picked === q.word;
        if (ok) correct++; else wrong.push({ q: q, picked: picked });
        each(root, '.opt', function (b, i) {
          b.disabled = true;
          if (q.options[i] === q.word) b.classList.add('correct');
          else if (i === chosen) b.classList.add('wrong');
        });
        setTimeout(function () { if (!document.body.contains(root)) return; idx++; render(); }, ok ? 420 : 1150);
      }
      function finish() {
        if (!retryOf) Store.addScore(opts.storeId, correct, questions.length);
        var pct = Math.round(correct / questions.length * 100);
        root.innerHTML = '<div class="quiz-wrap score"><div class="big">' + pct + '<small>%</small></div>' +
          '<p class="sub">Đúng ' + correct + '/' + questions.length + ' câu.' + (retryOf ? ' Phiên làm lại câu sai không lưu điểm.' : '') + '</p>' +
          '<div class="flash-controls">' +
          (wrong.length ? '<button class="btn primary" id="qretry">Làm lại câu sai (' + wrong.length + ')</button>' : '') +
          '<button class="btn' + (wrong.length ? '' : ' primary') + '" id="qagain">Làm lại</button>' +
          (opts.afterAction ? '<button class="btn" ' + opts.afterAction.attr + '>' + esc(opts.afterAction.label) + '</button>' : '') + '</div>' +
          drillReview(wrong) + '</div>';
        root.querySelector('#qagain').addEventListener('click', setup);
        var rb = root.querySelector('#qretry');
        if (rb) rb.addEventListener('click', function () { start(0, mode, wrong.map(function (x) { return x.q; })); });
      }
      function drillReview(list) {
        if (!list.length) return '';
        return '<div class="review"><h2>Câu sai (' + list.length + ')</h2>' + list.map(function (x) {
          var w = x.q.word, jp = x.q.dir === 'jp2vi';
          return '<div class="row"><span class="jp">' + esc(w.w) + (w.k ? ' <span class="opt-kana">' + esc(w.k) + '</span>' : '') + '</span>' +
            '<span><span class="yours">Bạn chọn: ' + esc(jp ? x.picked.m : x.picked.w) + '</span><br>' +
            '<span class="right">Đúng: ' + (jp ? vtMeaning(w) : esc(w.w)) + '</span></span></div>';
        }).join('') + '</div>';
      }
    }
  }
})();
