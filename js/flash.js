/* Flashcard engine. Click or press Space to flip, arrows to move, Enter to
   mark known.

   Card shapes on the front/back:
     kind 'vocab'    front: word only; back: reading + meaning
     kind 'kanji'    front: the character ALONE — no reading, so it tests
                             recognition honestly
                      back:  ON/KUN readings + meaning
     kind 'compound' front: compound word only; back: reading + meaning + tag

   Every card carries its own .store (a Store bucket id) and .key (via
   wordKey). That is what makes pooled multi-lesson sessions possible: a
   card's "known" state always writes back to the lesson it actually came
   from, never to some synthetic pooled bucket, so studying bài 8+9 together
   and studying bài 8 alone stay in sync.

   Thứ tự thẻ xáo bằng Math.random mỗi lần (cố ý, khác với đề kiểm tra). */
(function () {
  'use strict';
  var activeKeyHandler = null;
  window.Views = window.Views || {};

  /* ------------------------------------------------------------- decks */

  function compoundCard(x, tag, store) {
    return { kind: 'compound', w: x.jp, k: x.k, m: x.vi, hv: x.hv || '', vi: x.vi, tag: tag, store: store };
  }

  function buildKanjiDeck(lesson) {
    var out = [], seen = {};
    var store = lesson.id + ':kanji';
    function addOnce(x, tag) {
      var id = x.jp + '|' + (x.k || '');
      if (seen[id]) return;            // 映画 sits under both 映 and 画
      seen[id] = 1;
      out.push(compoundCard(x, tag, store));
    }
    (lesson.kanji || []).forEach(function (k) {
      var parts = String(k.m || '').split(/\s*[—–]\s*/);
      out.push({
        kind: 'kanji', w: k.c, k: [k.on, k.kun].filter(Boolean).join(' ・ '), m: k.m,
        hv: parts[0] || '', vi: parts.slice(1).join(' — '), store: store
      });
      (k.w || []).forEach(function (x) { addOnce(x, 'từ ghép của ' + k.c); });
    });
    // Chỉ từ mục 読める vào flashcard; từ 見て、わかる (chỉ cần nhận ra khi
    // nhìn) vẫn hiện trên trang kanji nhưng không thành thẻ.
    (lesson.yomeru || []).forEach(function (x) {
      if (x.src !== '見て、わかる') addOnce(x, x.src || '読める');
    });
    return out;
  }

  /* Nghĩa dạng "Lạc (道に迷う。— Lạc đường.)": câu ví dụ tiếng Nhật lên mặt
     trước, phần dịch ở mặt sau. */
  var EXAMPLE_IN_MEANING = /^(.*?)\s*\(([^()]*[぀-ヿ㐀-鿿][^()]*?)\s*—\s*([^()]*)\)\s*$/;

  function buildVocabDeck(lesson) {
    return (lesson.vocab || []).map(function (w) {
      var m = String(w.m || ''), exJp = '', exVi = '';
      var mm = m.match(EXAMPLE_IN_MEANING);
      if (mm) { m = mm[1]; exJp = mm[2]; exVi = mm[3]; }
      return {
        kind: 'vocab', w: w.w, k: w.k, m: m, ex: exJp, exVi: exVi,
        hv: w.hv || '', vt: w.vt || '', store: lesson.id
      };
    });
  }

  window.buildKanjiDeck = buildKanjiDeck;
  window.buildVocabDeck = buildVocabDeck;
  window.runFlashSession = runFlashSession;

  window.Views.flash = function (root, lesson, meta, sub) {
    var hasKanji = (lesson.kanji || []).length > 0;
    var mode = (sub === 'kanji' && hasKanji) ? 'kanji' : 'vocab';
    runFlashSession(root, {
      initialKey: mode,
      modes: hasKanji ? [
        { key: 'vocab', label: 'Từ vựng', build: function () { return buildVocabDeck(lesson); } },
        { key: 'kanji', label: 'Kanji & từ ghép', build: function () { return buildKanjiDeck(lesson); } }
      ] : null,
      source: mode === 'kanji' ? buildKanjiDeck(lesson) : buildVocabDeck(lesson)
    });
  };

  /* ------------------------------------------------------------ faces */

  var FLIP_HINT = '<div class="hint">Bấm thẻ hoặc phím Space để lật</div>';
  var KEY_HINT = '<div class="hint">Enter: đã thuộc · W: cần lưu ý · X: loại ra · ← →: chuyển thẻ</div>';

  function labelled(label, html) { return '<div class="kv-label">' + label + '</div>' + html; }
  function hanviet(hv) { return '<div class="mean-big hanviet">' + esc(hv) + '</div>'; }
  function tagHtml(w) { return w.tag ? '<div class="card-tag">' + esc(w.tag) + '</div>' : ''; }

  /* Kanji glyphs deliberately hide their reading on the recognition side —
     that's the whole point of a kanji drill — and surface it opposite the
     meaning instead. */
  function kanjiFaces(w, view) {
    var vi = (view.showVi && w.vi) ? labelled('Nghĩa tiếng Việt', '<div class="mean-big">' + esc(w.vi) + '</div>') : '';
    return {
      jp: '<div class="big jp kanji-solo">' + esc(w.w) + '</div>' + FLIP_HINT,
      vi: (w.k ? '<div class="onkun jp">' + esc(w.k) + '</div>' : '') +
          (w.hv ? labelled('Âm Hán Việt', hanviet(w.hv)) : '') + vi + KEY_HINT
    };
  }

  function vocabFaces(w, view) {
    // kanji nằm cùng mặt với hiragana, có thể ẩn bằng nút; tắt "Hiện kanji"
    // thì ẩn luôn âm Hán Việt
    var hasKanji = w.k && w.k !== w.w;
    var hv = (w.hv && view.showKanji) ? labelled('Âm Hán Việt', hanviet(w.hv)) + '<div class="kv-label">Nghĩa tiếng Việt</div>' : '';
    return {
      jp: '<div class="big jp">' + esc(w.k || w.w) + '</div>' +
          (hasKanji && view.showKanji ? '<div class="kana jp">' + esc(w.w) + '</div>' : '') +
          (w.ex ? '<div class="card-ex">' + esc(w.ex) + '</div>' : '') + FLIP_HINT,
      vi: hv + '<div class="mean-big">' + vtMeaning(w) + '</div>' +
          (w.exVi ? '<div class="card-ex-vi">VD: ' + esc(w.exVi) + '</div>' : '') + tagHtml(w) + KEY_HINT
    };
  }

  /* Từ ghép: Âm Hán Việt (VD 試験 → THÍ NGHIỆM) và nghĩa tiếng Việt thật (kỳ thi), tách 2 phần */
  function compoundFaces(w, view) {
    var vi = view.showVi ? (w.hv ? '<div class="kv-label">Nghĩa tiếng Việt</div>' : '') +
                           '<div class="mean-big">' + esc(w.m) + '</div>' : '';
    return {
      jp: '<div class="big jp">' + esc(w.w) + '</div>' + FLIP_HINT,
      vi: (w.k ? '<div class="kana jp">' + esc(w.k) + '</div>' : '') +
          (w.hv ? labelled('Âm Hán Việt', hanviet(w.hv)) : '') + vi + tagHtml(w) + KEY_HINT
    };
  }

  function faces(w, view) {
    if (w.kind === 'kanji') return kanjiFaces(w, view);
    if (w.kind === 'vocab') return vocabFaces(w, view);
    return compoundFaces(w, view);
  }

  /* ----------------------------------------------------------- layout */

  function sessionHtml(opts, modes) {
    function btn(id, label, pressed, title) {
      return '<button class="btn" id="' + id + '"' +
             (pressed === undefined ? '' : ' aria-pressed="' + pressed + '"') +
             (title ? ' title="' + title + '"' : '') + '>' + label + '</button>';
    }
    var heading = opts.heading ?
      '<div class="toolbar">' +
        (opts.backNav ? '<button class="btn" data-nav="' + esc(opts.backNav) + '">← Chọn lại các bài</button>' : '') +
        '<span class="count">' + esc(opts.heading) + '</span>' +
      '</div>' : '';
    var modeBar = modes ?
      '<div class="toolbar">' + modes.map(function (m) {
        return '<button class="btn" data-mode="' + esc(m.key) + '" aria-pressed="false">' + esc(m.label) + '</button>';
      }).join('') + '</div>' : '';
    return '<div class="flash-wrap">' + heading + modeBar +
      '<div class="toolbar">' +
        btn('fdir', 'Nhật → Việt') +
        btn('fskip', 'Bỏ qua thẻ đã thuộc', true) +
        btn('fshuffle', 'Xáo lại') +
        btn('fshowvi', 'Hiện tiếng Việt', true) +
        btn('fshowkanji', 'Hiện kanji', true) +
        btn('fonlywatch', 'Chỉ học từ cần lưu ý', false) +
        btn('fcompound', 'Chỉ từ ghép (ẩn kanji gốc)', false, 'Bỏ các thẻ kanji gốc, chỉ học từ ghép') +
        btn('fkata', 'Chỉ katakana', false) +
        btn('flockedbtn', 'Từ đã loại ra', false) +
      '</div>' +
      '<div id="flocked"></div>' +
      '<div class="flash-progress" id="fprog"></div>' +
      '<div class="card" id="fcard"><div class="card-inner">' +
        '<div class="card-face front" id="ffront"></div>' +
        '<div class="card-face back" id="fback"></div>' +
      '</div></div>' +
      '<div class="flash-controls">' +
        btn('fprev', '← Trước') +
        '<button class="btn primary" id="fknown">✓ Đánh dấu thuộc</button>' +
        btn('fnext', 'Sau →') +
      '</div>' +
      '<div class="flash-controls flash-controls-2">' +
        btn('fwatch', '☆ Cần lưu ý', false) +
        btn('fexclude', '⛔ Loại ra (đã nắm chắc)', false,
            'Loại từ này ra: luôn tính là đã thuộc, không bị mất khi bấm Bỏ đánh dấu tất cả') +
      '</div>' +
    '</div>';
  }

  function lockedHtml(list) {
    if (!list.length) return '<div class="empty">Chưa có từ nào bị loại ra.</div>';
    return '<div class="locked-list">' + list.map(function (w, n) {
      return '<div class="locked-row">' +
        '<span class="jp locked-w">' + esc(w.w) + '</span>' +
        '<span class="locked-k jp">' + esc(w.k && w.k !== w.w ? w.k : '') + '</span>' +
        '<span class="locked-m">' + esc(w.m) + '</span>' +
        '<button class="btn" data-restore="' + n + '">↩ Khôi phục</button>' +
      '</div>';
    }).join('') + '</div>';
  }

  var MSG_NO_KATA = 'Không có từ katakana trong bộ thẻ này. Tắt “Chỉ katakana” để học toàn bộ.';
  var MSG_WATCH_DONE = 'Chưa có từ nào trong danh sách cần lưu ý (hoặc đã thuộc hết). ' +
                       'Tắt “Chỉ học từ cần lưu ý” để quay lại toàn bộ thẻ.';
  var MSG_ALL_KNOWN = 'Bạn đã đánh dấu thuộc hết thẻ của phần này. Tắt “Bỏ qua thẻ đã thuộc” để ôn lại, ' +
                      'hoặc mở “Từ đã loại ra” để khôi phục từng từ.';

  var CONFIRM_RESET = 'Bỏ đánh dấu tất cả thẻ đã thuộc của phần này?\n' +
                      '(Từ đã “Loại ra” vẫn được giữ là đã thuộc.)';

  /* ---------------------------------------------------------- session */

  /* opts:
       source        initial array of cards (each: kind, w, k, m, store[, tag])
       modes         optional [{key,label,build()}] to switch between decks
                      (e.g. per-lesson vocab vs kanji); omit to lock to `source`
       initialKey    which entry of `modes` starts active
       heading, backNav   thanh tiêu đề cho phiên gộp nhiều bài (#/study)
  */
  function runFlashSession(root, opts) {
    var modes = opts.modes;
    var source = opts.source || [];
    var activeKey = opts.initialKey;

    var deck = [];
    var i = 0;
    var flipped = false;
    var jpFirst = true;
    var skipKnown = true;
    var view = { showVi: true, showKanji: true };
    var onlyWatch = false;
    var compoundOnly = false;   // kanji deck: ẩn chữ gốc, chỉ giữ từ ghép
    var showLocked = false;     // panel quản lý từ đã loại ra
    var kataOnly = Pref.get(FLASH_KATA_KEY);   // thẻ từ vựng: chỉ giữ từ katakana

    function isKnown(w) { return Store.isKnown(w.store, wordKey(w)); }
    function isWatch(w) { return Store.isWatch(w.store, wordKey(w)); }
    function isLocked(w) { return Store.isLocked(w.store, wordKey(w)); }

    function activeSource() {
      return source.filter(function (w) {
        if (compoundOnly && w.kind === 'kanji') return false;
        return !(kataOnly && w.kind === 'vocab' && !isKatakanaWord(w));
      });
    }

    function build() {
      deck = shuffle(activeSource().filter(function (w) {
        if (onlyWatch && !isWatch(w)) return false;
        return !(skipKnown && isKnown(w));
      }), Math.random);
      i = 0;
      flipped = false;
    }

    /* Bỏ thẻ đang xem khỏi bộ thẻ hiện tại (đã thuộc / gỡ lưu ý / loại ra). */
    function dropCurrent() {
      deck.splice(i, 1);
      if (i >= deck.length) i = 0;
      flipped = false;
    }

    root.innerHTML = sessionHtml(opts, modes);

    var card = root.querySelector('#fcard');
    var front = root.querySelector('#ffront');
    var back = root.querySelector('#fback');
    var prog = root.querySelector('#fprog');
    function $(id) { return root.querySelector('#' + id); }
    var backTimer = null;

    function renderLocked() {
      var box = $('flocked'), list = activeSource().filter(isLocked), lb = $('flockedbtn');
      lb.textContent = 'Từ đã loại ra (' + list.length + ')';
      setPressed(lb, showLocked);
      if (!showLocked) { box.innerHTML = ''; return; }
      box.innerHTML = lockedHtml(list);
      on(box, '[data-restore]', 'click', function (b) {
        var w = list[+b.getAttribute('data-restore')];
        Store.toggleLocked(w.store, wordKey(w));   // gỡ khóa
        Store.unmark(w.store, wordKey(w));         // đảm bảo quay lại bộ thẻ
        build();
        draw();
      });
    }

    /* Nút chỉ hiện khi bộ thẻ có loại thẻ liên quan; cập nhật trạng thái công tắc. */
    function drawToolbar() {
      var hasVocab = source.some(function (x) { return x.kind === 'vocab'; });
      var hasKan = source.some(function (x) { return x.kind !== 'vocab'; });
      var hasKanjiCard = source.some(function (x) { return x.kind === 'kanji'; });
      $('fshowkanji').hidden = !hasVocab;
      $('fshowvi').hidden = !hasKan;
      $('fcompound').hidden = !hasKanjiCard;
      setPressed($('fcompound'), compoundOnly);
      $('fkata').hidden = !hasVocab;
      setPressed($('fkata'), kataOnly);
      renderLocked();
      each(root, '[data-mode]', function (b) { setPressed(b, b.getAttribute('data-mode') === activeKey); });
      $('fonlywatch').textContent = 'Chỉ học từ cần lưu ý (' + activeSource().filter(isWatch).length + ')';
      setPressed($('fonlywatch'), onlyWatch);
      return hasVocab;
    }

    function setCardButtons(enabled) {
      ['fknown', 'fwatch', 'fexclude'].forEach(function (id) { $(id).disabled = !enabled; });
    }

    function drawEmpty(hasVocab) {
      var any = activeSource().length, msg;
      if (!any) msg = kataOnly && hasVocab ? MSG_NO_KATA : 'Không có thẻ nào ở đây.';
      else msg = onlyWatch ? MSG_WATCH_DONE : MSG_ALL_KNOWN;
      prog.innerHTML = '<div class="empty">' + (any ? '<b>Xong rồi!</b><br>' : '') + msg + '</div>' +
        (any && !onlyWatch ? '<div class="toolbar toolbar-center">' +
          '<button class="btn" id="freset">Bỏ đánh dấu tất cả</button></div>' : '');
      on(prog, '#freset', 'click', function () {
        if (!confirm(CONFIRM_RESET)) return;
        activeSource().forEach(function (w) { Store.unmark(w.store, wordKey(w)); });
        build();
        draw();
      });
    }

    function drawCard() {
      var w = deck[i];
      prog.textContent = (i + 1) + ' / ' + deck.length +
        ' · đã thuộc ' + activeSource().filter(isKnown).length + '/' + activeSource().length;

      var f = faces(w, view);
      var wasFlipped = card.classList.contains('flipped');
      front.innerHTML = jpFirst ? f.jp : f.vi;
      /* Đang lật về mặt trước: mặt sau vẫn còn thấy trong lúc thẻ xoay,
         nên chỉ đổi nội dung mặt sau khi animation lật xong (tránh lộ nghĩa thẻ kế). */
      clearTimeout(backTimer);
      if (wasFlipped && !flipped) {
        backTimer = setTimeout(function () { back.innerHTML = jpFirst ? f.vi : f.jp; }, 480);
      } else {
        back.innerHTML = jpFirst ? f.vi : f.jp;
      }
      card.classList.toggle('flipped', flipped);

      var watched = isWatch(w), locked = isLocked(w);
      $('fknown').textContent = isKnown(w) ? '✓ Đã thuộc' : '✓ Đánh dấu thuộc';
      $('fwatch').textContent = watched ? '★ Đang cần lưu ý' : '☆ Cần lưu ý';
      setPressed($('fwatch'), watched);
      $('fexclude').textContent = locked ? '↩ Bỏ loại ra' : '⛔ Loại ra (đã nắm chắc)';
      setPressed($('fexclude'), locked);
    }

    function draw() {
      var hasVocab = drawToolbar();
      card.hidden = !deck.length;
      setCardButtons(deck.length > 0);
      if (deck.length) drawCard(); else drawEmpty(hasVocab);
    }

    function move(d) {
      if (!deck.length) return;
      i = (i + d + deck.length) % deck.length;
      flipped = false;
      draw();
    }

    /* Công tắc: đổi biến trạng thái, có thể xáo lại bộ thẻ, rồi vẽ lại. */
    function toggle(id, flip, rebuild) {
      on(root, '#' + id, 'click', function (el) {
        flip(el);
        if (rebuild) build();
        draw();
      });
    }

    card.addEventListener('click', function () { flipped = !flipped; draw(); });
    // e.detail === 0: click do bàn phím (Enter/Space trên nút đang focus) — bỏ qua, phím tắt đã xử lý riêng
    on(root, '#fprev', 'click', function (el, e) { if (e.detail === 0) return; el.blur(); move(-1); });
    on(root, '#fnext', 'click', function (el, e) { if (e.detail === 0) return; el.blur(); move(1); });
    on(root, '#fknown', 'click', function () {
      if (!deck.length) return;
      Store.toggleKnown(deck[i].store, wordKey(deck[i]));
      if (skipKnown) dropCurrent();
      draw();
    });
    on(root, '#fwatch', 'click', function () {
      if (!deck.length) return;
      var w = deck[i];
      Store.toggleWatch(w.store, wordKey(w));
      if (onlyWatch && !isWatch(w)) dropCurrent();      // vừa gỡ khỏi list đang học
      draw();
    });
    on(root, '#fexclude', 'click', function () {
      if (!deck.length) return;
      var nowLocked = Store.toggleLocked(deck[i].store, wordKey(deck[i]));
      if (nowLocked && (skipKnown || onlyWatch)) dropCurrent();   // loại ra: bỏ khỏi bộ thẻ hiện tại
      draw();
    });

    toggle('fcompound', function () { compoundOnly = !compoundOnly; }, true);
    toggle('fkata', function () { kataOnly = !kataOnly; Pref.set(FLASH_KATA_KEY, kataOnly); }, true);
    toggle('flockedbtn', function () { showLocked = !showLocked; });
    toggle('fonlywatch', function () { onlyWatch = !onlyWatch; }, true);
    toggle('fdir', function (el) {
      jpFirst = !jpFirst;
      el.textContent = jpFirst ? 'Nhật → Việt' : 'Việt → Nhật';
      flipped = false;
    });
    toggle('fskip', function (el) { skipKnown = !skipKnown; setPressed(el, skipKnown); }, true);
    toggle('fshuffle', function () {}, true);
    toggle('fshowvi', function (el) { view.showVi = !view.showVi; setPressed(el, view.showVi); });
    toggle('fshowkanji', function (el) { view.showKanji = !view.showKanji; setPressed(el, view.showKanji); });
    on(root, '[data-mode]', 'click', function (b) {
      activeKey = b.getAttribute('data-mode');
      source = modes.filter(function (x) { return x.key === activeKey; })[0].build();
      build();
      draw();
    });

    function onKey(e) {
      if (!document.body.contains(root) || !$('fknown')) {   // #view dùng chung: đã sang trang khác
        document.removeEventListener('keydown', onKey);
        if (activeKeyHandler === onKey) activeKeyHandler = null;
        return;
      }
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === ' ') {
        if (tag === 'BUTTON') return;
        e.preventDefault(); flipped = !flipped; draw();
      }
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'w' || e.key === 'W') $('fwatch').click();
      else if (e.key === 'x' || e.key === 'X') $('fexclude').click();
      else if (e.key === 'Enter') {
        e.preventDefault(); e.stopPropagation();
        if (e.repeat || e.isComposing || e.keyCode === 229) return;
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        $('fknown').click();
      }
    }
    if (activeKeyHandler) document.removeEventListener('keydown', activeKeyHandler);
    activeKeyHandler = onKey;
    document.addEventListener('keydown', onKey);

    build();
    draw();
  }
})();
