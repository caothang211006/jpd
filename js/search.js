/* Tìm từ vựng / kanji trong TẤT CẢ các bài, dùng ở #/all/vocab và #/all/kanji.
   Từ khóa chỉ giữ trong bộ nhớ trang (không localStorage, không đổi URL).
   Không ghi gì vào Store: kết quả chỉ để xem, bấm nhãn bài thì mở bài đó.

   Quy tắc khớp: chuẩn hóa NFKC (full-width/half-width), chữ thường, bỏ dấu
   tiếng Việt (đ → d), katakana → hiragana, gộp khoảng trắng; khớp một phần.
   Từ vựng: từ, cách đọc, nghĩa. Kanji: chữ, On, Kun, nghĩa (gồm Hán Việt).
   Sắp xếp: khớp nguyên trường lên trước, rồi theo thứ tự bài trong manifest. */
(function () {
  'use strict';

  var LIMIT = 200;              // số kết quả tối đa hiện ra một lần
  var query = { vocab: '', kanji: '' };
  var index = null;             // { vocab: [...], kanji: [...] } sau khi nạp hết bài
  var loading = false, waiting = [];

  /* Chữ của mục 見て、わかる ở bài 1–4 đang nằm trong danh sách kanji của data
     (chưa tách); theo quy tắc đã chốt, tìm kanji không hiện chúng như một kanji. */
  var SEE_ONLY = {
    'shochukyu-2': '価税込',
    'shochukyu-3': '必着',
    'shochukyu-4': '費在勤'
  };

  function norm(s) {
    s = String(s == null ? '' : s).normalize('NFKC').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').normalize('NFC');
    s = s.replace(/[ァ-ヶ]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); });
    return s.replace(/\s+/g, ' ').trim();
  }

  function lessonIds() {
    var ids = [];
    JPD.books.forEach(function (b) { b.lessons.forEach(function (l) { if (l.file) ids.push(l.id); }); });
    return ids;
  }

  function buildIndex(lessons) {
    var vocab = [], kanji = [], order = 0;
    lessons.forEach(function (lesson) {
      var meta = JPD.meta(lesson.id), skip = SEE_ONLY[lesson.id] || '';
      (lesson.vocab || []).forEach(function (w) {
        vocab.push({ order: order++, meta: meta, item: w, fields: [w.w, w.k, w.m].map(norm) });
      });
      (lesson.kanji || []).forEach(function (k) {
        if (skip.indexOf(k.c) >= 0) return;
        kanji.push({ order: order++, meta: meta, item: k, fields: [k.c, k.on, k.kun, k.m].map(norm) });
      });
    });
    return { vocab: vocab, kanji: kanji };
  }

  function ensureIndex(cb) {
    if (index) { cb(); return; }
    waiting.push(cb);
    if (loading) return;
    loading = true;
    loadLessons(lessonIds(), function (lessons) {
      index = buildIndex(lessons);
      loading = false;
      var list = waiting; waiting = [];
      list.forEach(function (fn) { fn(); });
    });
  }

  function find(tab, q, kataOnly) {
    var nq = norm(q);
    if (!nq) return [];
    var hits = [];
    index[tab].forEach(function (x) {
      if (kataOnly && !isKatakanaWord(x.item)) return;
      var exact = false, hit = false;
      x.fields.forEach(function (f) {
        if (!f) return;
        if (f === nq) exact = true;
        if (f.indexOf(nq) >= 0) hit = true;
      });
      if (hit) hits.push({ x: x, exact: exact });
    });
    hits.sort(function (a, b) { return (b.exact - a.exact) || (a.x.order - b.x.order); });
    return hits.map(function (h) { return h.x; });
  }

  /* ------------------------------------------------------------ hiển thị */

  function lessonButton(meta) {
    return '<button class="btn btn-sm sr-lesson" data-golesson="' + esc(meta.lesson.id) + '">' +
      esc(bookLabel(meta.book)) + ' · Bài ' + esc(meta.lesson.n) + '</button>';
  }

  function vocabRow(x) {
    var w = x.item;
    return '<div class="word sr-row">' +
      '<div class="jp-main jp">' + esc(w.w) + (w.k ? '<span class="kana">' + esc(w.k) + '</span>' : '') + '</div>' +
      '<div class="mean">' + (w.hv ? '<span class="hv">' + esc(w.hv) + '</span> ' : '') + vtMeaning(w) + '</div>' +
      lessonButton(x.meta) +
    '</div>';
  }

  function kanjiRow(x) {
    var k = x.item;
    var words = (k.w || []).map(function (w) {
      return '<span class="kword">' + esc(w.jp) + (w.k ? '（' + esc(w.k) + '）' : '') +
        (w.hv ? ' <span class="hv">' + esc(w.hv) + '</span>' : '') +
        ' <span class="vi">' + esc(w.vi) + '</span></span>';
    }).join('');
    return '<div class="kcard sr-kcard">' +
      '<div class="glyph jp">' + esc(k.c) + '</div>' +
      '<div>' +
        '<div class="mean">' + esc(k.m) + '</div>' +
        '<div class="readings">' + (k.on ? '<b>ON</b> ' + esc(k.on) + '<br>' : '') +
          (k.kun ? '<b>KUN</b> ' + esc(k.kun) : '') + '</div>' +
        (words ? '<div class="words">' + words + '</div>' : '') +
        '<div class="sr-actions">' + lessonButton(x.meta) + '</div>' +
      '</div>' +
    '</div>';
  }

  /* Gắn ô tìm kiếm vào trang chọn bài.
     box: phần tử chứa kết quả; books: phần tử danh sách bài (ẩn khi đang tìm). */
  function mount(root, tab, opts) {
    var input = root.querySelector('#bsearch');
    var clear = root.querySelector('#bsearchClear');
    var box = root.querySelector('#bsearchResults');
    var books = root.querySelector('#bbooks');
    var timer = null;

    function show() {
      var q = query[tab].trim();
      clear.hidden = !q;
      books.hidden = !!q;
      box.hidden = !q;
      if (!q) { box.innerHTML = ''; return; }
      if (!index) box.innerHTML = '<div class="empty">Đang tải dữ liệu các bài…</div>';
      ensureIndex(function () {
        if (query[tab].trim() !== q || !document.body.contains(box)) return;   // đã gõ tiếp / đã rời trang
        var hits = find(tab, q, tab === 'vocab' && opts.kataOnly());
        if (!hits.length) {
          box.innerHTML = '<div class="empty">Không tìm thấy ' + (tab === 'kanji' ? 'kanji' : 'từ') +
            ' nào khớp với “' + esc(q) + '”.</div>';
          return;
        }
        var shown = hits.slice(0, LIMIT);
        box.innerHTML = '<p class="note sr-count">' + hits.length + ' kết quả' +
            (hits.length > LIMIT ? ' (hiện ' + LIMIT + ' kết quả đầu, gõ thêm để thu hẹp)' : '') + '</p>' +
          (tab === 'kanji'
            ? '<div class="kgrid">' + shown.map(kanjiRow).join('') + '</div>'
            : '<div class="wlist">' + shown.map(vocabRow).join('') + '</div>');
        on(box, '[data-golesson]', 'click', function (b) { go('#/l/' + b.getAttribute('data-golesson') + '/' + tab); });
      });
    }

    function reset() { query[tab] = ''; input.value = ''; show(); input.focus(); }

    input.value = query[tab];
    input.addEventListener('input', function () {
      query[tab] = input.value;
      clearTimeout(timer);
      timer = setTimeout(show, 150);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); clearTimeout(timer); reset(); }
    });
    clear.addEventListener('click', reset);
    show();
  }

  window.Search = { mount: mount, norm: norm, hasQuery: function (tab) { return !!query[tab]; } };
})();
