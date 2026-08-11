/* Kanji of one lesson: readings, meaning, example words. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  window.Views.kanji = function (root, lesson) {
    var list = lesson.kanji || [];
    if (!list.length) {
      root.innerHTML = '<div class="empty">Bài này không có kanji mới.</div>';
      return;
    }

    var cards = window.buildKanjiDeck(lesson).length;

    root.innerHTML =
      '<div class="toolbar">' +
        '<button class="btn primary" id="kflash">Học flashcard kanji</button>' +
        '<span class="count">' + list.length + ' chữ · ' + cards + ' thẻ</span>' +
      '</div>' +
      '<div class="kgrid">' + list.map(function (k) {
        var words = (k.w || []).map(function (w) {
          return esc(w.jp) + (w.k ? '（' + esc(w.k) + '）' : '') +
                 ' <span style="color:var(--ink-faint)">' + esc(w.vi) + '</span>';
        }).join('<br>');
        return '<div class="kcard">' +
                 '<div class="glyph jp">' + esc(k.c) + '</div>' +
                 '<div>' +
                   '<div class="mean">' + esc(k.m) + '</div>' +
                   '<div class="readings">' +
                     (k.on ? '<b>ON</b> ' + esc(k.on) + '<br>' : '') +
                     (k.kun ? '<b>KUN</b> ' + esc(k.kun) : '') +
                   '</div>' +
                   (words ? '<div class="words">' + words + '</div>' : '') +
                 '</div>' +
               '</div>';
      }).join('') + '</div>';

    root.querySelector('#kflash').addEventListener('click', function () {
      location.hash = '#/l/' + lesson.id + '/flash/kanji';
    });
  };
})();
