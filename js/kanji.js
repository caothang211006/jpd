/* Kanji of one lesson: readings, meaning, example words, mark-as-known.
   Known state shares the bucket lesson.id + ':kanji' with the flashcards. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function kanjiKey(k) {
    var readings = [k.on, k.kun].filter(Boolean).join(' ・ ');
    return wordKey({ w: k.c, k: readings });
  }
  function compoundKey(x) { return wordKey({ w: x.jp, k: x.k }); }

  /* Một từ bấm được (từ ghép dưới chữ kanji, hoặc từ mục 読める／見て、わかる). */
  function kwordHtml(w, known, src) {
    return '<div class="kword' + (known ? ' known' : '') + '" data-k="' + esc(compoundKey(w)) + '"' +
             ' title="Bấm để đánh dấu / bỏ đánh dấu">' +
             esc(w.jp) + (w.k ? '（' + esc(w.k) + '）' : '') +
             (w.hv ? ' <span class="hv">' + esc(w.hv) + '</span>' : '') +
             ' <span class="vi">' + esc(w.vi) + '</span>' +
             (src ? ' <span class="note">· ' + esc(src) + '</span>' : '') +
           '</div>';
  }

  function kcardHtml(k, isKnown) {
    var words = (k.w || []).map(function (w) { return kwordHtml(w, isKnown(compoundKey(w))); }).join('');
    var kk = kanjiKey(k);
    return '<div class="kcard' + (isKnown(kk) ? ' known' : '') + '">' +
             '<div class="glyph jp">' + esc(k.c) + '</div>' +
             '<div>' +
               '<div class="mean">' + esc(k.m) + '</div>' +
               '<div class="readings">' +
                 (k.on ? '<b>ON</b> ' + esc(k.on) + '<br>' : '') +
                 (k.kun ? '<b>KUN</b> ' + esc(k.kun) : '') +
               '</div>' +
               (words ? '<div class="words">' + words + '</div>' : '') +
             '</div>' +
             '<button class="mark kmark" data-k="' + esc(kk) + '" title="Đánh dấu đã thuộc">✓</button>' +
           '</div>';
  }

  window.Views.kanji = function (root, lesson) {
    var list = lesson.kanji || [];
    if (!list.length) {
      root.innerHTML = '<div class="empty">Bài này không có kanji mới.</div>';
      return;
    }

    var store = lesson.id + ':kanji';
    var deckSize = buildKanjiDeck(lesson).length;
    var yomeru = lesson.yomeru || [];
    function isKnown(key) { return Store.isKnown(store, key); }

    root.innerHTML =
      '<div class="toolbar">' +
        '<button class="btn primary" id="kflash">Học flashcard kanji</button>' +
        '<button class="btn" id="kreset">Bỏ đánh dấu</button>' +
        '<span class="count" id="kcount"></span>' +
      '</div><div class="kgrid" id="kbody"></div>' +
      (yomeru.length ? '<h2 class="ksec-title">読める・見て、わかる ' +
        '<span class="note">(từ đọc được trong bài)</span></h2><div class="words yomeru" id="kyomeru"></div>' : '');

    var body = root.querySelector('#kbody');
    var count = root.querySelector('#kcount');

    function draw() {
      count.textContent = list.length + ' chữ · ' + deckSize + ' thẻ · đã thuộc ' + Store.knownCount(store);
      body.innerHTML = list.map(function (k) { return kcardHtml(k, isKnown); }).join('');
      var yb = root.querySelector('#kyomeru');
      if (yb) yb.innerHTML = lesson.yomeru.map(function (w) { return kwordHtml(w, isKnown(compoundKey(w)), w.src); }).join('');
    }

    root.addEventListener('click', function (e) {
      var el = e.target.closest('#kyomeru .kword');
      if (!el) return;
      Store.toggleKnown(store, el.getAttribute('data-k'));
      draw();
    });
    body.addEventListener('click', function (e) {
      var el = e.target.closest('.kmark, .kword');
      if (!el || !body.contains(el)) return;
      Store.toggleKnown(store, el.getAttribute('data-k'));
      draw();
    });

    on(root, '#kflash', 'click', function () {
      location.hash = '#/l/' + lesson.id + '/flash/kanji';
    });
    on(root, '#kreset', 'click', function () {
      if (confirm('Bỏ đánh dấu tất cả kanji và từ ghép đã thuộc trong bài này?')) {
        Store.clearKnown(store);
        draw();
      }
    });

    draw();
  };
})();
