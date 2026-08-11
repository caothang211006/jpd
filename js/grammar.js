/* Grammar reference for one lesson. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  window.Views.grammar = function (root, lesson) {
    var items = lesson.grammar || [];
    if (!items.length) {
      root.innerHTML = '<div class="empty">Bài này chưa có phần ngữ pháp.</div>';
      return;
    }

    root.innerHTML =
      '<div class="toolbar">' +
        '<input type="search" id="gq" placeholder="Tìm mẫu ngữ pháp…">' +
        '<span class="count">' + items.length + ' mẫu</span>' +
      '</div><div id="gbody"></div>';

    var body = root.querySelector('#gbody');

    function draw(q) {
      q = (q || '').toLowerCase();
      var list = items.filter(function (g) {
        if (!q) return true;
        return (g.pat + ' ' + g.desc).toLowerCase().indexOf(q) >= 0;
      });

      if (!list.length) {
        body.innerHTML = '<div class="empty">Không tìm thấy mẫu nào.</div>';
        return;
      }

      body.innerHTML = list.map(function (g) {
        var ex = (g.ex || []).map(function (e) {
          return '<li><div class="ex jp">' + esc(e.jp) + '</div>' +
                 '<div class="tr">' + esc(e.vi) + '</div></li>';
        }).join('');
        return '<div class="gitem">' +
                 '<div class="pat jp">' + esc(g.pat) + '</div>' +
                 '<div class="desc">' + esc(g.desc) + '</div>' +
                 (ex ? '<ul>' + ex + '</ul>' : '') +
               '</div>';
      }).join('');
    }

    root.querySelector('#gq').addEventListener('input', function (e) { draw(e.target.value.trim()); });
    draw('');
  };
})();
