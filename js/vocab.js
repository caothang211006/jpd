/* Word list: search, group headings, mark-as-known. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function key(w) { return w.w + '|' + (w.k || ''); }
  window.wordKey = key;

  window.Views.vocab = function (root, lesson) {
    var hideKnown = false;
    var query = '';

    root.innerHTML =
      '<div class="toolbar">' +
        '<input type="search" id="vq" placeholder="Tìm từ, cách đọc hoặc nghĩa tiếng Việt…">' +
        '<button class="btn" id="vhide" aria-pressed="false">Ẩn từ đã thuộc</button>' +
        '<button class="btn" id="vreset">Bỏ đánh dấu</button>' +
        '<span class="count" id="vcount"></span>' +
      '</div><div id="vbody"></div>';

    var body = root.querySelector('#vbody');
    var count = root.querySelector('#vcount');

    function matches(w) {
      if (!query) return true;
      var q = query.toLowerCase();
      return (w.w && w.w.toLowerCase().indexOf(q) >= 0) ||
             (w.k && w.k.toLowerCase().indexOf(q) >= 0) ||
             (w.m && w.m.toLowerCase().indexOf(q) >= 0);
    }

    function draw() {
      var list = lesson.vocab.filter(function (w) {
        if (!matches(w)) return false;
        if (hideKnown && Store.isKnown(lesson.id, key(w))) return false;
        return true;
      });

      var known = Store.knownCount(lesson.id);
      count.textContent = 'Đã thuộc ' + known + '/' + lesson.vocab.length + ' từ';

      if (!list.length) {
        body.innerHTML = '<div class="empty">Không có từ nào khớp.</div>';
        return;
      }

      // bucket into consecutive groups, then emit one .wlist per group
      var groups = [];
      list.forEach(function (w) {
        var name = w.g || '';
        var last = groups[groups.length - 1];
        if (!last || last.name !== name) groups.push({ name: name, words: [w] });
        else last.words.push(w);
      });

      body.innerHTML = groups.map(function (g) {
        return (g.name ? '<div class="vocab-group jp">' + esc(g.name) + '</div>' : '') +
               '<div class="wlist">' + g.words.map(row).join('') + '</div>';
      }).join('');

      Array.prototype.forEach.call(body.querySelectorAll('.mark'), function (btn) {
        btn.addEventListener('click', function () {
          Store.toggleKnown(lesson.id, btn.getAttribute('data-k'));
          draw();
        });
      });
    }

    function row(w) {
      var k = key(w);
      var isKnown = Store.isKnown(lesson.id, k);
      return '<div class="word' + (isKnown ? ' known' : '') + '">' +
               '<div class="jp-main jp">' + esc(w.w) +
                 (w.k ? '<span class="kana">' + esc(w.k) + '</span>' : '') +
               '</div>' +
               '<div class="mean">' + esc(w.m) + '</div>' +
               '<button class="mark" data-k="' + esc(k) + '" title="Đánh dấu đã thuộc">✓</button>' +
             '</div>';
    }

    root.querySelector('#vq').addEventListener('input', function (e) {
      query = e.target.value.trim();
      draw();
    });
    root.querySelector('#vhide').addEventListener('click', function (e) {
      hideKnown = !hideKnown;
      e.target.setAttribute('aria-pressed', hideKnown ? 'true' : 'false');
      draw();
    });
    root.querySelector('#vreset').addEventListener('click', function () {
      if (confirm('Bỏ đánh dấu tất cả từ đã thuộc trong bài này?')) {
        Store.clearKnown(lesson.id);
        draw();
      }
    });

    draw();
  };
})();
