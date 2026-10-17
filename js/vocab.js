/* Word list: search, group headings, mark-as-known. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  function key(w) { return w.w + '|' + (w.k || ''); }
  window.wordKey = key;

  /* Từ katakana: trường w chỉ gồm katakana, ー, ・ và ～.
     Từ lẫn kanji/hiragana (テレビ番組, カット（する）) không tính. */
  var KATA = /^[\u30A1-\u30FA\u30FB\u30FC\uFF5E\u301C]+$/;
  window.isKatakanaWord = function (w) { return KATA.test(String(w && w.w || '')); };

  /* Nhóm động từ (trường vt trong data: 'I' | 'II' | 'III'). */
  window.vtLabel = function (w) { return w && w.vt ? 'Động từ nhóm ' + w.vt : ''; };
  /* Nghĩa kèm nhãn: "Động từ nhóm I · đi" (đã escape). */
  window.vtMeaning = function (w, m) {
    var text = esc(m === undefined ? w.m : m);
    return w && w.vt ? '<span class="vt">' + esc(window.vtLabel(w)) + '</span> · ' + text : text;
  };

  /* Tùy chọn lưu trên máy (khóa riêng, không đụng tới jpd.progress.v1). */
  window.Pref = {
    get: function (k) { try { return localStorage.getItem(k) === '1'; } catch (e) { return false; } },
    set: function (k, on) { try { localStorage.setItem(k, on ? '1' : '0'); } catch (e) {} }
  };
  var KATA_KEY = 'jpd.vocab.kataOnly';
  window.VOCAB_KATA_KEY = KATA_KEY;

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
        if (Pref.get(KATA_KEY) && !isKatakanaWord(w)) return false;
        return true;
      });

      var known = Store.knownCount(lesson.id);
      count.textContent = 'Đã thuộc ' + known + '/' + lesson.vocab.length + ' từ';

      if (!list.length) {
        body.innerHTML = '<div class="empty">' + (Pref.get(KATA_KEY) && !query ? 'Bài này không có từ katakana.' : 'Không có từ nào khớp.') + '</div>';
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
               '<div class="mean">' + (w.hv ? '<span class="hv">' + esc(w.hv) + '</span> ' : '') + vtMeaning(w) + '</div>' +
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
    var kb = root.querySelector('#vkata');
    if (kb) kb.addEventListener('click', function () {
      Pref.set(KATA_KEY, !Pref.get(KATA_KEY));
      kb.setAttribute('aria-pressed', String(Pref.get(KATA_KEY)));
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
