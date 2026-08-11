/* Multiple-choice quiz. Distractors are drawn from the same pool so the
   wrong choices stay plausible instead of being obviously unrelated words. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function shuffle(a) {
    for (var n = a.length - 1; n > 0; n--) {
      var j = Math.floor(Math.random() * (n + 1));
      var t = a[n]; a[n] = a[j]; a[j] = t;
    }
    return a;
  }

  window.Views.quiz = function (root, lesson) {
    runQuizSession(root, {
      pool: lesson.vocab || [],
      storeId: lesson.id,
      title: 'Kiểm tra bài ' + esc(lesson.n || ''),
      afterAction: { label: 'Xem lại từ vựng', attr: 'data-nav="vocab"' }
    });
  };

  /* opts:
       pool         array of {w,k,m}
       storeId      Store bucket for best-score tracking
       title        heading shown on the setup screen
       afterAction  optional { label, attr } — extra button on the score screen,
                    `attr` is raw HTML attributes (e.g. a data-nav hook) */
  window.runQuizSession = runQuizSession;

  function runQuizSession(root, opts) {
    var pool = opts.pool || [];
    if (pool.length < 4) {
      root.innerHTML = '<div class="empty">Chưa đủ từ để tạo đề kiểm tra (cần ít nhất 4 từ).</div>';
      return;
    }

    setup();

    /* ------------------------------------------------------------ setup */
    function setup() {
      var best = Store.bestScore(opts.storeId);
      root.innerHTML =
        '<div class="quiz-wrap">' +
          '<h1>' + opts.title + '</h1>' +
          '<p class="sub">Chọn nghĩa đúng. Sai ở đâu sẽ được liệt kê lại ở cuối để ôn.' +
            (best !== null ? ' Điểm cao nhất của bạn: <b>' + Math.round(best * 100) + '%</b>.' : '') +
          '</p>' +
          '<div class="toolbar">' +
            '<button class="btn" data-n="10">10 câu</button>' +
            '<button class="btn" data-n="20">20 câu</button>' +
            '<button class="btn" data-n="0">Toàn bộ (' + pool.length + ' câu)</button>' +
          '</div>' +
          '<div class="toolbar">' +
            '<button class="btn" data-mode="jp2vi" aria-pressed="true">Nhật → Việt</button>' +
            '<button class="btn" data-mode="vi2jp" aria-pressed="false">Việt → Nhật</button>' +
            '<button class="btn" data-mode="mix" aria-pressed="false">Trộn cả hai</button>' +
          '</div>' +
          '<button class="btn primary" id="qstart">Bắt đầu</button>' +
        '</div>';

      var n = 10, mode = 'jp2vi';

      Array.prototype.forEach.call(root.querySelectorAll('[data-n]'), function (b, idx, all) {
        if (idx === 0) b.setAttribute('aria-pressed', 'true');
        b.addEventListener('click', function () {
          n = parseInt(b.getAttribute('data-n'), 10);
          Array.prototype.forEach.call(all, function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
        });
      });
      Array.prototype.forEach.call(root.querySelectorAll('[data-mode]'), function (b, idx, all) {
        b.addEventListener('click', function () {
          mode = b.getAttribute('data-mode');
          Array.prototype.forEach.call(all, function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
        });
      });
      root.querySelector('#qstart').addEventListener('click', function () {
        start(n === 0 ? pool.length : Math.min(n, pool.length), mode);
      });
    }

    /* ----------------------------------------------------------- session */
    function start(count, mode) {
      var picked = shuffle(pool.slice()).slice(0, count);
      var questions = picked.map(function (w) {
        var dir = mode === 'mix' ? (Math.random() < 0.5 ? 'jp2vi' : 'vi2jp') : mode;
        return { word: w, dir: dir, options: makeOptions(w, dir) };
      });

      var idx = 0, correct = 0, wrong = [];
      render();

      function makeOptions(w, dir) {
        var field = dir === 'jp2vi' ? 'm' : 'w';
        var others = pool.filter(function (o) { return o !== w && o[field] !== w[field]; });
        shuffle(others);

        var seen = {}, opts = [w];
        seen[w[field]] = 1;
        for (var i = 0; i < others.length && opts.length < 4; i++) {
          if (seen[others[i][field]]) continue;
          seen[others[i][field]] = 1;
          opts.push(others[i]);
        }
        return shuffle(opts);
      }

      function render() {
        if (idx >= questions.length) return finish();

        var q = questions[idx];
        var w = q.word;
        var promptText = q.dir === 'jp2vi'
          ? '<div class="q jp">' + esc(w.w) + '</div>' +
            (w.k ? '<div class="kana jp" style="color:var(--ink-faint)">' + esc(w.k) + '</div>' : '')
          : '<div class="q vi">' + esc(w.m) + '</div>';

        root.innerHTML =
          '<div class="quiz-wrap">' +
            '<div class="qbar"><i style="width:' + (idx / questions.length * 100) + '%"></i></div>' +
            '<div class="qprompt">' +
              '<div class="lead">Câu ' + (idx + 1) + '/' + questions.length +
                ' · ' + (q.dir === 'jp2vi' ? 'Từ này nghĩa là gì?' : 'Từ tiếng Nhật nào có nghĩa này?') +
              '</div>' + promptText +
            '</div>' +
            '<div class="opts">' + q.options.map(function (o, i) {
              var label = q.dir === 'jp2vi'
                ? esc(o.m)
                : '<span class="jp">' + esc(o.w) + '</span>' +
                  (o.k ? ' <span style="color:var(--ink-faint);font-size:13px">' + esc(o.k) + '</span>' : '');
              return '<button class="opt" data-i="' + i + '">' + label + '</button>';
            }).join('') + '</div>' +
          '</div>';

        Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (btn) {
          btn.addEventListener('click', function () { answer(parseInt(btn.getAttribute('data-i'), 10)); });
        });
      }

      function answer(chosen) {
        var q = questions[idx];
        var picked = q.options[chosen];
        var ok = picked === q.word;

        if (ok) correct++;
        else wrong.push({ q: q, picked: picked });

        Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (btn, i) {
          btn.disabled = true;
          if (q.options[i] === q.word) btn.classList.add('correct');
          else if (i === chosen) btn.classList.add('wrong');
        });

        setTimeout(function () {
          if (!document.body.contains(root)) return;
          idx++;
          render();
        }, ok ? 420 : 1150);
      }

      function finish() {
        Store.addScore(opts.storeId, correct, questions.length);
        var pct = Math.round(correct / questions.length * 100);

        root.innerHTML =
          '<div class="quiz-wrap score">' +
            '<div class="big">' + pct + '<small>%</small></div>' +
            '<p class="sub">Đúng ' + correct + '/' + questions.length + ' câu.</p>' +
            '<div class="flash-controls">' +
              '<button class="btn primary" id="qagain">Làm lại</button>' +
              (opts.afterAction ? '<button class="btn" ' + opts.afterAction.attr + '>' +
                esc(opts.afterAction.label) + '</button>' : '') +
            '</div>' +
            (wrong.length ? '<div class="review"><h2>Câu sai (' + wrong.length + ')</h2>' +
              wrong.map(function (x) {
                return '<div class="row">' +
                    '<span class="jp">' + esc(x.q.word.w) +
                      (x.q.word.k ? ' <span style="font-size:13px;color:var(--ink-faint)">' +
                        esc(x.q.word.k) + '</span>' : '') + '</span>' +
                    '<span>' +
                      '<span class="yours">Bạn chọn: ' +
                        esc(x.q.dir === 'jp2vi' ? x.picked.m : x.picked.w) + '</span><br>' +
                      '<span class="right">Đúng: ' +
                        esc(x.q.dir === 'jp2vi' ? x.q.word.m : x.q.word.w) + '</span>' +
                    '</span>' +
                  '</div>';
              }).join('') + '</div>' : '') +
          '</div>';

        root.querySelector('#qagain').addEventListener('click', setup);
      }
    }
  }
})();
