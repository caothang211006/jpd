/* Word list: search, group headings, mark-as-known, "Chỉ katakana". */
(function () {
  'use strict';
  window.Views = window.Views || {};

  var KATA_KEY = window.VOCAB_KATA_KEY;

  function matches(w, query) {
    if (!query) return true;
    var q = query.toLowerCase();
    return [w.w, w.k, w.m].some(function (s) { return s && s.toLowerCase().indexOf(q) >= 0; });
  }

  /* Gom các từ liên tiếp cùng nhóm (trường g) thành một khối. */
  function groupsOf(list) {
    var groups = [];
    list.forEach(function (w) {
      var name = w.g || '';
      var last = groups[groups.length - 1];
      if (!last || last.name !== name) groups.push({ name: name, words: [w] });
      else last.words.push(w);
    });
    return groups;
  }

  function rowHtml(w, isKnown) {
    var k = wordKey(w);
    return '<div class="word' + (isKnown ? ' known' : '') + '">' +
             '<div class="jp-main jp">' + esc(w.w) +
               (w.k ? '<span class="kana">' + esc(w.k) + '</span>' : '') +
             '</div>' +
             '<div class="mean">' + (w.hv ? '<span class="hv">' + esc(w.hv) + '</span> ' : '') +
               vtMeaning(w) + '</div>' +
             '<button class="mark" data-k="' + esc(k) + '" title="Đánh dấu đã thuộc">✓</button>' +
           '</div>';
  }

  /* sub === 'inline': hiện trong trang chọn bài (#/all/vocab); công tắc
     "Chỉ katakana" đã có ở đầu trang đó nên không vẽ lại ở đây. */
  window.Views.vocab = function (root, lesson, meta, sub) {
    var hideKnown = false;
    var query = '';
    var inline = sub === 'inline';

    root.innerHTML =
      '<div class="toolbar">' +
        '<input type="search" id="vq" placeholder="Tìm từ, cách đọc hoặc nghĩa tiếng Việt…">' +
        '<button class="btn" id="vhide" aria-pressed="false">Ẩn từ đã thuộc</button>' +
        (inline ? '' : '<button class="btn" id="vkata" aria-pressed="' + Pref.get(KATA_KEY) + '">Chỉ katakana</button>') +
        '<button class="btn" id="vreset">Bỏ đánh dấu</button>' +
        '<span class="count" id="vcount"></span>' +
      '</div><div id="vbody"></div>';

    var body = root.querySelector('#vbody');
    var count = root.querySelector('#vcount');

    function isKnown(w) { return Store.isKnown(lesson.id, wordKey(w)); }

    function draw() {
      var kataOnly = Pref.get(KATA_KEY);
      var list = lesson.vocab.filter(function (w) {
        return matches(w, query) && !(hideKnown && isKnown(w)) && !(kataOnly && !isKatakanaWord(w));
      });

      count.textContent = 'Đã thuộc ' + Store.knownCount(lesson.id) + '/' + lesson.vocab.length + ' từ';

      if (!list.length) {
        var msg = kataOnly && !query ? 'Bài này không có từ katakana.' : 'Không có từ nào khớp.';
        body.innerHTML = '<div class="empty">' + msg + '</div>';
        return;
      }

      body.innerHTML = groupsOf(list).map(function (g) {
        return (g.name ? '<div class="vocab-group jp">' + esc(g.name) + '</div>' : '') +
               '<div class="wlist">' + g.words.map(function (w) { return rowHtml(w, isKnown(w)); }).join('') + '</div>';
      }).join('');

      on(body, '.mark', 'click', function (btn) {
        Store.toggleKnown(lesson.id, btn.getAttribute('data-k'));
        draw();
      });
    }

    on(root, '#vq', 'input', function (el) { query = el.value.trim(); draw(); });
    on(root, '#vhide', 'click', function (el) { hideKnown = !hideKnown; setPressed(el, hideKnown); draw(); });
    on(root, '#vkata', 'click', function (el) { setPressed(el, Pref.toggle(KATA_KEY)); draw(); });
    on(root, '#vreset', 'click', function () {
      if (confirm('Bỏ đánh dấu tất cả từ đã thuộc trong bài này?')) {
        Store.clearKnown(lesson.id);
        draw();
      }
    });

    draw();
  };
})();
