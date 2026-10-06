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
          return '<li><div class="ex jp">' + furi(e.jp) + '</div>' +
                 (e.ro ? '<div class="ro">' + esc(e.ro) + '</div>' : '') +
                 '<div class="tr"><span class="arr">→</span> ' + esc(e.vi) + '</div></li>';
        }).join('');
        var summary = g.pat === 'Tóm tắt';
        var num = summary ? '<span class="gnum gnum-sum">★</span>'
                          : '<span class="gnum">' + (items.indexOf(g) + 1) + '</span>';
        return '<div class="gitem' + (summary ? ' gsummary' : '') + '">' +
                 '<div class="ghead">' + num + '<div class="pat jp">' + esc(g.pat) + '</div></div>' +
                 '<div class="desc">' + descHtml(g.desc) + '</div>' +
                 (ex ? '<div class="glabel">Ví dụ</div><ul class="gex">' + ex + '</ul>' : '') +
               '</div>';
      }).join('');
    }

    /* desc: dòng thường → đoạn văn; dòng bắt đầu bằng "•" → danh sách. */
    function descHtml(desc) {
      var out = '', bullets = [];
      function flush() {
        if (bullets.length) out += '<ul class="glist">' + bullets.join('') + '</ul>';
        bullets = [];
      }
      String(desc || '').split('\n').forEach(function (line) {
        line = line.trim();
        if (!line) return;
        if (line.charAt(0) === '•') {
          bullets.push('<li>' + arrows(line.replace(/^•\s*/, '')) + '</li>');
        } else {
          flush();
          out += '<p>' + arrows(line) + '</p>';
        }
      });
      flush();
      return out;
    }
    function arrows(t) {
      return furi(t).replace(/ → /g, ' <span class="arr">→</span> ');
    }

    root.querySelector('#gq').addEventListener('input', function (e) { draw(e.target.value.trim()); });
    draw('');
  };
})();
