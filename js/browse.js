/* Trang chọn bài theo sách cho một tab (#/all/<tab>).
   Hai khối Sách đỏ / Sách vàng, mỗi khối mở/đóng được.
     - Từ vựng, Ngữ pháp, Kanji: bấm một bài để mở nội dung ngay tại chỗ
       (chỉ tải bài đó, khi bấm).
     - Flashcard, Kiểm tra: bấm một bài để vào bài.
     - Kiểm tra: thêm phần chọn nhiều bài để gộp câu hỏi kiểm tra thành một đề. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  var INLINE = { vocab: 1, grammar: 1, kanji: 1 };
  var openBooks = {};          // book id -> true (giữ trạng thái khi quay lại trang)
  var openLessons = {};        // tab + '|' + lesson id -> true
  var mix = { type: 'nguphap', de: 1, per: 0, picked: {} };

  function amount(tab, l) {
    if (!l.file) return 0;
    if (tab === 'grammar') return l.grammar || 0;
    if (tab === 'kanji') return l.kanji || 0;
    if (tab === 'quiz') return l.tests || 0;
    return l.words || 0;
  }
  function amountText(tab, l) {
    var n = amount(tab, l);
    if (!n) {
      if (!l.file) return 'chưa có nội dung';
      if (tab === 'quiz') return 'chưa có đề (chỉ có luyện từ nhanh)';
      return 'chưa có';
    }
    return n + (tab === 'grammar' ? ' mẫu' : tab === 'kanji' ? ' kanji' : tab === 'quiz' ? ' đề' : ' từ');
  }
  function hasType(l, type) { return (' ' + (l.testTypes || '') + ' ').indexOf(' ' + type + ' ') >= 0; }

  window.Views.browse = function (root, tab) {
    var books = JPD.books || [];
    if (!Object.keys(openBooks).length && books[0]) openBooks[books[0].id] = true;

    function render() {
      root.innerHTML =
        '<h1>' + esc(TAB_LABEL[tab]) + ' — chọn bài</h1>' +
        intro() +
        (tab === 'quiz' ? mixPanel() : '') +
        books.map(bookBlock).join('');
      bind();
      // nội dung bài đang mở: tải lại (đã có trong bộ nhớ thì tức thì)
      Array.prototype.forEach.call(root.querySelectorAll('.bl-body[data-load]'), loadInto);
    }

    function intro() {
      if (tab === 'flash') {
        return '<p class="sub">Chọn một bài để học flashcard. Muốn gộp nhiều bài: ' +
               '<button class="btn btn-sm" data-nav="study">Ôn từ vựng / kanji nhiều bài</button></p>';
      }
      if (tab === 'quiz') return '<p class="sub">Bấm tên bài để làm đề của bài đó, hoặc tích chọn nhiều bài để làm đề gộp.</p>';
      if (tab === 'vocab') {
        return '<p class="sub">Bấm một bài để xem nội dung ngay tại đây.</p>' +
          '<div class="toolbar"><button class="btn" id="bkata" aria-pressed="' + Pref.get(VOCAB_KATA_KEY) + '">Chỉ katakana</button>' +
          '<span class="note">Áp dụng cho mọi bài đang mở và trang từ vựng của từng bài.</span></div>';
      }
      return '<p class="sub">Bấm một bài để xem nội dung ngay tại đây.</p>';
    }

    function bookBlock(book) {
      var open = !!openBooks[book.id];
      var total = book.lessons.filter(function (l) { return amount(tab, l); }).length;
      return '<section class="book-block">' +
        '<button class="book-toggle" data-book="' + esc(book.id) + '" aria-expanded="' + open + '">' +
          '<span class="book-dot ' + book.tone + '"></span>' +
          '<span class="bt-name">' + esc(bookLabel(book)) + ' <span class="jp">' + esc(book.name.split(' — ')[0]) + '</span></span>' +
          '<span class="bt-count">' + (total ? total + '/' + book.lessons.length + ' bài có nội dung' : 'chưa có') + '</span>' +
          '<span class="bt-caret">' + (open ? '▾' : '▸') + '</span>' +
        '</button>' +
        (open ? '<div class="book-lessons">' + book.lessons.map(function (l) { return lessonRow(book, l); }).join('') + '</div>' : '') +
      '</section>';
    }

    function lessonRow(book, l) {
      var n = amount(tab, l), key = tab + '|' + l.id, open = INLINE[tab] && openLessons[key];
      var check = '';
      if (tab === 'quiz') {
        var ok = hasType(l, mix.type);
        check = '<input type="checkbox" class="bl-check" data-pick="' + esc(l.id) + '"' +
                (ok ? '' : ' disabled') + (ok && mix.picked[l.id] ? ' checked' : '') +
                ' title="Chọn bài này vào đề gộp">';
      }
      return '<div class="bl-row' + (n ? '' : ' bl-none') + (open ? ' open' : '') + '">' +
          '<div class="bl-head">' + check +
            '<button class="bl-open" data-row="' + esc(l.id) + '"' + (n || tab === 'quiz' && l.file ? '' : ' disabled') + '>' +
              '<span class="bl-num">Bài ' + esc(l.n) + '</span>' +
              '<span class="bl-title jp">' + esc(l.jp) + '</span>' +
              '<span class="bl-vi">' + esc(l.vi) + '</span>' +
              '<span class="bl-meta">' + esc(amountText(tab, l)) + '</span>' +
              (INLINE[tab] && n ? '<span class="bl-caret">' + (open ? '▾' : '▸') + '</span>' : '') +
            '</button>' +
          '</div>' +
          (open ? '<div class="bl-body" data-load="' + esc(l.id) + '"><div class="empty">Đang tải…</div></div>' : '') +
        '</div>';
    }

    /* ---- đề gộp ---- */
    function mixPanel() {
      var ids = pickedIds();
      return '<div class="mix-panel">' +
        '<h2>Đề kiểm tra gộp nhiều bài</h2>' +
        '<div class="mix-row"><span>Loại đề:</span>' + EXAM_TYPES.map(function (t) {
          return '<button class="btn btn-sm" data-mixtype="' + t.sub + '" aria-pressed="' + (mix.type === t.sub) + '">' +
                 esc(t.title.replace('Bài kiểm tra ', '').replace('Đề luyện tập ', '')) + '</button>';
        }).join('') + '</div>' +
        '<div class="mix-row"><label>Đề số <select id="mixDe">' + [1, 2, 3, 4, 5].map(function (n) {
            return '<option' + (mix.de === n ? ' selected' : '') + '>' + n + '</option>';
          }).join('') + '</select></label>' +
          '<label>Số câu mỗi bài <select id="mixPer">' + [[0, 'Tất cả'], [10, '10'], [5, '5']].map(function (o) {
            return '<option value="' + o[0] + '"' + (mix.per === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
          }).join('') + '</select></label>' +
          '<label>Chọn từ đầu đến <select id="mixUpto"><option value="">—</option>' + eligible().map(function (x, i) {
            return '<option value="' + i + '">' + esc(bookShort(x.book) + ' ' + x.l.n) + '</option>';
          }).join('') + '</select></label></div>' +
        '<div class="mix-row"><span class="note">Đã chọn ' + ids.length + ' bài' +
          (ids.length ? ': ' + esc(ids.map(tagOf).join(', ')) : '') + '</span>' +
          '<button class="btn btn-sm" id="mixClear"' + (ids.length ? '' : ' disabled') + '>Bỏ chọn</button>' +
          '<button class="btn primary" id="mixGo"' + (ids.length ? '' : ' disabled') + '>Làm đề gộp</button></div>' +
        '<p class="note">Đề số N lấy đề N của mỗi bài (bài có ít đề hơn thì lấy đề cuối). Điểm đề gộp lưu riêng, không ảnh hưởng điểm từng bài.</p>' +
      '</div>';
    }
    function eligible() {
      var out = [];
      books.forEach(function (b) { b.lessons.forEach(function (l) { if (hasType(l, mix.type)) out.push({ book: b, l: l }); }); });
      return out;
    }
    function pickedIds() {
      return eligible().filter(function (x) { return mix.picked[x.l.id]; }).map(function (x) { return x.l.id; });
    }
    function tagOf(id) { var m = JPD.meta(id); return bookShort(m.book) + ' ' + m.lesson.n; }

    /* ---- sự kiện ---- */
    function on(sel, ev, fn) { Array.prototype.forEach.call(root.querySelectorAll(sel), function (el) { el.addEventListener(ev, function (e) { fn(el, e); }); }); }

    function bind() {
      on('[data-book]', 'click', function (el) {
        var id = el.getAttribute('data-book');
        if (openBooks[id]) delete openBooks[id]; else openBooks[id] = true;
        render();
      });
      on('[data-row]', 'click', function (el) {
        var id = el.getAttribute('data-row');
        if (!INLINE[tab]) { go('#/l/' + id + '/' + tab); return; }
        var key = tab + '|' + id;
        if (openLessons[key]) delete openLessons[key]; else openLessons[key] = true;
        render();
      });
      on('#bkata', 'click', function () { Pref.set(VOCAB_KATA_KEY, !Pref.get(VOCAB_KATA_KEY)); render(); });
      if (tab !== 'quiz') return;
      on('[data-pick]', 'change', function (el) {
        var id = el.getAttribute('data-pick');
        if (el.checked) mix.picked[id] = true; else delete mix.picked[id];
        render();
      });
      on('[data-mixtype]', 'click', function (el) { mix.type = el.getAttribute('data-mixtype'); render(); });
      on('#mixDe', 'change', function (el) { mix.de = parseInt(el.value, 10); });
      on('#mixPer', 'change', function (el) { mix.per = parseInt(el.value, 10); });
      on('#mixUpto', 'change', function (el) {
        if (el.value === '') return;
        var upto = parseInt(el.value, 10);
        mix.picked = {};
        eligible().forEach(function (x, i) { if (i <= upto) { mix.picked[x.l.id] = true; openBooks[x.book.id] = true; } });
        render();
      });
      on('#mixClear', 'click', function () { mix.picked = {}; render(); });
      on('#mixGo', 'click', function () {
        go('#/mix/' + mix.type + '/' + mix.de + '/' + mix.per + '/' + pickedIds().join(','));
      });
    }

    function loadInto(box) {
      var id = box.getAttribute('data-load');
      JPD.load(id, function (lesson) {
        if (!document.body.contains(box)) return;          // đã đóng / đã chuyển trang
        if (!lesson) { box.innerHTML = '<div class="empty">Chưa có nội dung.</div>'; return; }
        box.innerHTML = '<div class="bl-actions"><button class="btn btn-sm" data-golesson="' + esc(id) + '">Mở bài này</button></div><div class="bl-content"></div>';
        box.querySelector('[data-golesson]').addEventListener('click', function () { go('#/l/' + id + '/' + tab); });
        window.Views[tab](box.querySelector('.bl-content'), lesson, JPD.meta(id).lesson, tab === 'vocab' ? 'inline' : undefined);
      });
    }

    render();
  };
})();
