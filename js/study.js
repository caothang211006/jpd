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
        '<h1>Ôn từ vựng / kanji nhiều bài</h1>' +
        '<p class="sub">Chọn các bài muốn gộp từ vựng hoặc kanji, rồi học flashcard hoặc luyện nghĩa từ. ' +
          'Muốn làm đề kiểm tra gộp nhiều bài: <button class="btn btn-sm" data-nav="all-quiz">Đề kiểm tra gộp</button></p>' +
        '<div class="toolbar">' +
          '<button class="btn" data-mode="vocab" aria-pressed="' + (mode === 'vocab') + '">Từ vựng</button>' +
          '<button class="btn" data-mode="kanji" aria-pressed="' + (mode === 'kanji') + '">Kanji &amp; từ ghép</button>' +
          '<span class="count">' + selectedCount + '/' + list.length + ' bài đã chọn</span>' +
        '</div>' +
        '<div class="st-range"><span>Ôn từ đầu đến:</span><select id="stRange"><option value="">— chọn bài —</option>' +
          list.map(function (x, i) {
            return '<option value="' + i + '">' + bookLabel(x.book) + ' · Bài ' + esc(x.lesson.n) + ' ' + esc(x.lesson.jp) + '</option>';
          }).join('') +
        '</select><span class="note">(chọn tất cả các bài từ bài 1 sách đỏ đến bài này)</span></div>' +
        order.map(function (book) {
          return '<div class="book-head">' +
                   '<span class="book-dot ' + book.tone + '"></span>' +
                   '<h2>' + esc(book.name) + '</h2>' +
                   '<span class="note">' +
                     '<button class="btn btn-sm" data-pickall="' + esc(book.id) + '">Chọn hết</button> ' +
                     '<button class="btn btn-sm" data-pickclear="' + esc(book.id) + '">Bỏ chọn</button>' +
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
        '<div class="flash-controls st-actions">' +
          '<button class="btn primary" id="stFlash" ' + (selectedCount ? '' : 'disabled') + '>Học flashcard</button>' +
          '<button class="btn" id="stQuiz" ' + (selectedCount && mode === 'vocab' ? '' : 'disabled') + '>Luyện nghĩa từ (trắc nghiệm)</button>' +
        '</div>';

      on(root, '[data-mode]', 'click', function (b) { mode = b.getAttribute('data-mode'); render(); });
      on(root, '[data-pick]', 'change', function (b) {
        var id = b.getAttribute('data-pick');
        if (b.checked) checked[id] = true; else delete checked[id];
        render();
      });
      on(root, '#stRange', 'change', function (sel) {
        if (sel.value === '') return;
        var upto = parseInt(sel.value, 10);
        checked = {};
        list.forEach(function (x, i) { if (i <= upto) checked[x.lesson.id] = true; });
        render();
      });
      on(root, '[data-pickall]', 'click', function (b) {
        byBook[b.getAttribute('data-pickall')].forEach(function (l) { checked[l.id] = true; });
        render();
      });
      on(root, '[data-pickclear]', 'click', function (b) {
        byBook[b.getAttribute('data-pickclear')].forEach(function (l) { delete checked[l.id]; });
        render();
      });
      on(root, '#stFlash', 'click', function () { launch('flash'); });
      on(root, '#stQuiz', 'click', function () { launch('quiz'); });
    }

    function launch(kind) {
      var eligibleIds = {};
      eligibleFor(mode).forEach(function (x) { eligibleIds[x.lesson.id] = true; });
      var ids = Object.keys(checked).filter(function (id) { return eligibleIds[id]; });
      if (!ids.length) return;

      root.innerHTML = '<div class="empty">Đang tải ' + ids.length + ' bài…</div>';
      loadLessons(ids, function (lessons) { afterLoad(lessons, kind); });
    }

    function afterLoad(lessons, kind) {
      // giữ thứ tự các bài như lúc chọn (không theo thứ tự tải xong)
      var byId = {};
      lessons.forEach(function (l) { byId[l.id] = l; });
      var ordered = Object.keys(checked).map(function (id) { return byId[id]; }).filter(Boolean);
      var label = ordered.map(function (l) { return lessonShort(l.id); }).join(', ');

      if (!ordered.length) { render(); return; }

      var deck = [];
      ordered.forEach(function (l) {
        var meta = JPD.meta(l.id).lesson;
        var bk = JPD.meta(l.id).book;
        var bookName = bk.tone === 'red' ? 'Sách đỏ 初級' : bk.tone === 'gold' ? 'Sách vàng 初中級' : bk.name;
        var tagPrefix = bookName + ' · Bài ' + meta.n;
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
            '<br><button class="btn empty-action" data-nav="study">← Chọn lại</button></div>';
          return;
        }
        window.runQuizSession(root, {
          pool: deck,
          storeId: 'pool:' + ordered.map(function (l) { return l.id; }).sort().join(','),
          title: 'Luyện nghĩa từ gộp — ' + esc(label),
          afterAction: { label: '← Chọn lại các bài', attr: 'data-nav="study"' }
        });
      } else {
        window.runFlashSession(root, { source: deck, heading: label, backNav: 'study' });
      }
    }

    render();
  };
})();
