/* Picker for pooling several lessons into one flashcard or quiz session.
   Cards keep their originating lesson as `.store` (see flash.js), so marking
   something known here writes back to that lesson's own progress — studying
   bài 8+9 together and studying bài 8 alone stay in sync. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function readyLessons() {
    var out = [];
    (JPD.books || []).forEach(function (book) {
      book.lessons.forEach(function (l) {
        if (l.file) out.push({ book: book, lesson: l });
      });
    });
    return out;
  }

  window.Views.study = function (root) {
    var all = readyLessons();
    var mode = 'vocab';                 // 'vocab' | 'kanji'
    var checked = {};                   // lesson id -> true

    if (!all.length) {
      root.innerHTML = '<div class="empty">Chưa có bài nào có nội dung để ôn tập.</div>';
      return;
    }

    function kanjiCount(l) { return l.lesson.kanji || 0; }
    function eligibleFor(m) { return m === 'kanji' ? all.filter(kanjiCount) : all; }

    function render() {
      var list = eligibleFor(mode);
      var selectedCount = list.filter(function (x) { return checked[x.lesson.id]; }).length;

      var byBook = {};
      var order = [];
      list.forEach(function (x) {
        if (!byBook[x.book.id]) { byBook[x.book.id] = []; order.push(x.book); }
        byBook[x.book.id].push(x.lesson);
      });

      root.innerHTML =
        '<h1>Ôn tập nhiều bài cùng lúc</h1>' +
        '<p class="sub">Chọn các bài muốn gộp lại, rồi học flashcard hoặc làm bài kiểm tra trên toàn bộ.</p>' +
        '<div class="toolbar">' +
          '<button class="btn" data-mode="vocab" aria-pressed="' + (mode === 'vocab') + '">Từ vựng</button>' +
          '<button class="btn" data-mode="kanji" aria-pressed="' + (mode === 'kanji') + '">Kanji &amp; từ ghép</button>' +
          '<span class="count">' + selectedCount + '/' + list.length + ' bài đã chọn</span>' +
        '</div>' +
        order.map(function (book) {
          return '<div class="book-head">' +
                   '<span class="book-dot ' + book.tone + '"></span>' +
                   '<h2>' + esc(book.name) + '</h2>' +
                   '<span class="note">' +
                     '<button class="btn" data-pickall="' + esc(book.id) + '" style="padding:4px 10px;font-size:12.5px">Chọn hết</button> ' +
                     '<button class="btn" data-pickclear="' + esc(book.id) + '" style="padding:4px 10px;font-size:12.5px">Bỏ chọn</button>' +
                   '</span>' +
                 '</div>' +
                 '<div class="picker-list">' +
                   byBook[book.id].map(function (l) {
                     var on = !!checked[l.id];
                     return '<label class="picker-item' + (on ? ' picked' : '') + '">' +
                              '<input type="checkbox" data-pick="' + esc(l.id) + '"' + (on ? ' checked' : '') + '>' +
                              '<span class="picker-num">Bài ' + esc(l.n) + '</span>' +
                              '<span class="picker-title jp">' + esc(l.jp) + '</span>' +
                              '<span class="picker-vi">' + esc(l.vi) + '</span>' +
                            '</label>';
                   }).join('') +
                 '</div>';
        }).join('') +
        '<div class="flash-controls" style="margin-top:22px">' +
          '<button class="btn primary" id="stFlash" ' + (selectedCount ? '' : 'disabled') + '>Học flashcard</button>' +
          '<button class="btn" id="stQuiz" ' + (selectedCount && mode === 'vocab' ? '' : 'disabled') + '>Làm bài kiểm tra</button>' +
        '</div>';

      Array.prototype.forEach.call(root.querySelectorAll('[data-mode]'), function (b) {
        b.addEventListener('click', function () { mode = b.getAttribute('data-mode'); render(); });
      });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pick]'), function (b) {
        b.addEventListener('change', function () {
          var id = b.getAttribute('data-pick');
          if (b.checked) checked[id] = true; else delete checked[id];
          render();
        });
      });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pickall]'), function (b) {
        b.addEventListener('click', function () {
          byBook[b.getAttribute('data-pickall')].forEach(function (l) { checked[l.id] = true; });
          render();
        });
      });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pickclear]'), function (b) {
        b.addEventListener('click', function () {
          byBook[b.getAttribute('data-pickclear')].forEach(function (l) { delete checked[l.id]; });
          render();
        });
      });

      var flashBtn = root.querySelector('#stFlash');
      var quizBtn = root.querySelector('#stQuiz');
      if (flashBtn) flashBtn.addEventListener('click', function () { launch('flash'); });
      if (quizBtn) quizBtn.addEventListener('click', function () { launch('quiz'); });
    }

    function launch(kind) {
      var eligibleIds = {};
      eligibleFor(mode).forEach(function (x) { eligibleIds[x.lesson.id] = true; });
      var ids = Object.keys(checked).filter(function (id) { return eligibleIds[id]; });
      if (!ids.length) return;

      root.innerHTML = '<div class="empty">Đang tải ' + ids.length + ' bài…</div>';

      var lessons = [];
      var left = ids.length;
      ids.forEach(function (id) {
        JPD.load(id, function (data) {
          if (data) lessons.push(data);
          if (--left === 0) afterLoad(lessons, kind);
        });
      });
    }

    function afterLoad(lessons, kind) {
      // keep manifest order rather than load-finish order
      var byId = {};
      lessons.forEach(function (l) { byId[l.id] = l; });
      var ordered = Object.keys(checked).map(function (id) { return byId[id]; }).filter(Boolean);

      if (!ordered.length) { render(); return; }

      var deck = [];
      ordered.forEach(function (l) {
        var meta = JPD.meta(l.id).lesson;
        var tagPrefix = 'Bài ' + meta.n;
        if (mode === 'kanji') {
          window.buildKanjiDeck(l).forEach(function (c) {
            c.tag = tagPrefix + (c.tag ? ' · ' + c.tag : '');
            deck.push(c);
          });
        } else {
          window.buildVocabDeck(l).forEach(function (c) {
            c.tag = tagPrefix;
            deck.push(c);
          });
        }
      });

      if (kind === 'quiz') {
        if (deck.length < 4) {
          root.innerHTML = '<div class="empty">Cần chọn nhiều từ hơn (ít nhất 4) để tạo bài kiểm tra. ' +
            '<br><button class="btn" data-nav="study" style="margin-top:12px">← Chọn lại</button></div>';
          return;
        }
        var label = ordered.map(function (l) { return 'Bài ' + JPD.meta(l.id).lesson.n; }).join(', ');
        window.runQuizSession(root, {
          pool: deck,
          storeId: 'pool:' + ordered.map(function (l) { return l.id; }).sort().join(','),
          title: 'Kiểm tra gộp — ' + esc(label),
          afterAction: { label: '← Chọn lại các bài', attr: 'data-nav="study"' }
        });
      } else {
        var heading = ordered.map(function (l) { return 'Bài ' + JPD.meta(l.id).lesson.n; }).join(', ');
        window.runFlashSession(root, { source: deck, heading: heading, backNav: 'study' });
      }
    }

    render();
  };
})();
