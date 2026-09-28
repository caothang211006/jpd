/* Kanji of one lesson: readings, meaning, example words, mark-as-known.
   Known state shares the bucket lesson.id + ':kanji' with the flashcards. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function kanjiKey(k) {
    var readings = [k.on, k.kun].filter(Boolean).join(' ・ ');
    return window.wordKey({ w: k.c, k: readings });
  }
  function compoundKey(x) { return window.wordKey({ w: x.jp, k: x.k }); }

  window.Views.kanji = function (root, lesson) {
    var list = lesson.kanji || [];
    if (!list.length) {
      root.innerHTML = '<div class="empty">Bài này không có kanji mới.</div>';
      return;
    }

    var store = lesson.id + ':kanji';
    var deckSize = window.buildKanjiDeck(lesson).length;

    root.innerHTML =
      '<div class="toolbar">' +
        '<button class="btn primary" id="kflash">Học flashcard kanji</button>' +
        '<button class="btn" id="kreset">Bỏ đánh dấu</button>' +
        '<span class="count" id="kcount"></span>' +
      '</div><div class="kgrid" id="kbody"></div>';

    var body = root.querySelector('#kbody');
    var count = root.querySelector('#kcount');

    function draw() {
      count.textContent = list.length + ' chữ · ' + deckSize + ' thẻ · đã thuộc ' + Store.knownCount(store);

      body.innerHTML = list.map(function (k) {
        var kk = kanjiKey(k);
        var isKnown = Store.isKnown(store, kk);
        var words = (k.w || []).map(function (w) {
          var wk = compoundKey(w);
          return '<div class="kword' + (Store.isKnown(store, wk) ? ' known' : '') + '" data-k="' + esc(wk) +
                 '" title="Bấm để đánh dấu / bỏ đánh dấu">' +
                 esc(w.jp) + (w.k ? '（' + esc(w.k) + '）' : '') +
                 ' <span class="vi">' + esc(w.vi) + '</span></div>';
        }).join('');
        return '<div class="kcard' + (isKnown ? ' known' : '') + '">' +
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
      }).join('');
    }

    body.addEventListener('click', function (e) {
      var el = e.target.closest('.kmark, .kword');
      if (!el || !body.contains(el)) return;
      Store.toggleKnown(store, el.getAttribute('data-k'));
      draw();
    });

    root.querySelector('#kflash').addEventListener('click', function () {
      location.hash = '#/l/' + lesson.id + '/flash/kanji';
    });
    root.querySelector('#kreset').addEventListener('click', function () {
      if (confirm('Bỏ đánh dấu tất cả kanji và từ ghép đã thuộc trong bài này?')) {
        Store.clearKnown(store);
        draw();
      }
    });

    draw();
  };
})();
