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
   and studying bài 8 alone stay in sync. */
(function () {
  'use strict';
  var activeKeyHandler = null;
  window.Views = window.Views || {};

  window.buildKanjiDeck = buildKanjiDeck;
  window.runFlashSession = runFlashSession;

  function buildKanjiDeck(lesson) {
    var out = [], seen = {};
    var store = lesson.id + ':kanji';
    (lesson.kanji || []).forEach(function (k) {
      var readings = [k.on, k.kun].filter(Boolean).join(' ・ ');
      var parts = String(k.m || '').split(/\s*[—–]\s*/);
      out.push({ kind: 'kanji', w: k.c, k: readings, m: k.m, hv: parts[0] || '', vi: parts.slice(1).join(' — '), store: store });
      (k.w || []).forEach(function (x) {
        var id = x.jp + '|' + (x.k || '');
        if (seen[id]) return;          // 映画 sits under both 映 and 画
        seen[id] = 1;
        out.push({ kind: 'compound', w: x.jp, k: x.k, m: x.vi, tag: 'từ ghép của ' + k.c, store: store });
      });
    });
    return out;
  }

  function buildVocabDeck(lesson) {
    var store = lesson.id;
    return (lesson.vocab || []).map(function (w) {
      return { kind: 'vocab', w: w.w, k: w.k, m: w.m, store: store };
    });
  }
  window.buildVocabDeck = buildVocabDeck;

  window.Views.flash = function (root, lesson, meta, sub) {
    var hasKanji = (lesson.kanji || []).length > 0;
    var mode = (sub === 'kanji' && hasKanji) ? 'kanji' : 'vocab';

    var modeSwitch = hasKanji ? [
      { key: 'vocab', label: 'Từ vựng', build: function () { return buildVocabDeck(lesson); } },
      { key: 'kanji', label: 'Kanji & từ ghép', build: function () { return buildKanjiDeck(lesson); } }
    ] : null;

    runFlashSession(root, {
      initialKey: mode,
      modes: modeSwitch,
      source: mode === 'kanji' ? buildKanjiDeck(lesson) : buildVocabDeck(lesson)
    });
  };

  /* opts:
       source        initial array of cards (each: kind, w, k, m, store[, tag])
       modes         optional [{key,label,build()}] to switch between decks
                      (e.g. per-lesson vocab vs kanji); omit to lock to `source`
       initialKey    which entry of `modes` starts active
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
    var showVi = true;
    var showKanji = true;
    var onlyWatch = false;
    var compoundOnly = false;   // kanji deck: ẩn chữ gốc, chỉ giữ từ ghép
    var showLocked = false;     // panel quản lý từ đã loại ra

    function setSource(list) {
      source = list;
      build();
    }

    function activeSource() {
      return compoundOnly ? source.filter(function (w) { return w.kind !== 'kanji'; }) : source;
    }

    function build() {
      deck = activeSource().filter(function (w) {
        if (onlyWatch && !Store.isWatch(w.store, wordKey(w))) return false;
        return !(skipKnown && Store.isKnown(w.store, wordKey(w)));
      });
      shuffle(deck);
      i = 0;
      flipped = false;
    }

    function shuffle(a) {
      for (var n = a.length - 1; n > 0; n--) {
        var j = Math.floor(Math.random() * (n + 1));
        var t = a[n]; a[n] = a[j]; a[j] = t;
      }
      return a;
    }

    function knownInSource() {
      return activeSource().filter(function (w) { return Store.isKnown(w.store, wordKey(w)); }).length;
    }

    function lockedInSource() {
      return activeSource().filter(function (w) { return Store.isLocked(w.store, wordKey(w)); });
    }

    function watchInSource() {
      return activeSource().filter(function (w) { return Store.isWatch(w.store, wordKey(w)); }).length;
    }

    root.innerHTML =
      '<div class="flash-wrap">' +
        (opts.heading ?
          '<div class="toolbar">' +
            (opts.backNav ? '<button class="btn" data-nav="' + esc(opts.backNav) + '">← Chọn lại các bài</button>' : '') +
            '<span class="count">' + esc(opts.heading) + '</span>' +
          '</div>' : '') +
        (modes ?
          '<div class="toolbar">' +
            modes.map(function (m) {
              return '<button class="btn" data-mode="' + esc(m.key) + '">' + esc(m.label) + '</button>';
            }).join('') +
          '</div>' : '') +
        '<div class="toolbar">' +
          '<button class="btn" id="fdir">Nhật → Việt</button>' +
          '<button class="btn" id="fskip" aria-pressed="true">Bỏ qua thẻ đã thuộc</button>' +
          '<button class="btn" id="fshuffle">Xáo lại</button>' +
          '<button class="btn" id="fshowvi" aria-pressed="true">Hiện tiếng Việt</button>' +
          '<button class="btn" id="fshowkanji" aria-pressed="true">Hiện kanji</button>' +
          '<button class="btn" id="fonlywatch" aria-pressed="false">Chỉ học từ cần lưu ý</button>' +
          '<button class="btn" id="fcompound" aria-pressed="false" title="Bỏ các thẻ kanji gốc, chỉ học từ ghép">Chỉ từ ghép (ẩn kanji gốc)</button>' +
          '<button class="btn" id="flockedbtn" aria-pressed="false">Từ đã loại ra</button>' +
        '</div>' +
        '<div id="flocked"></div>' +
        '<div class="flash-progress" id="fprog"></div>' +
        '<div class="card" id="fcard"><div class="card-inner">' +
          '<div class="card-face front" id="ffront"></div>' +
          '<div class="card-face back" id="fback"></div>' +
        '</div></div>' +
        '<div class="flash-controls">' +
          '<button class="btn" id="fprev">← Trước</button>' +
          '<button class="btn primary" id="fknown">✓ Đánh dấu thuộc</button>' +
          '<button class="btn" id="fnext">Sau →</button>' +
        '</div>' +
        '<div class="flash-controls flash-controls-2">' +
          '<button class="btn" id="fwatch">☆ Cần lưu ý</button>' +
          '<button class="btn" id="fexclude" title="Loại từ này ra: luôn tính là đã thuộc, không bị mất khi bấm Bỏ đánh dấu tất cả">⛔ Loại ra (đã nắm chắc)</button>' +
        '</div>' +
      '</div>';

    var card = root.querySelector('#fcard');
    var front = root.querySelector('#ffront');
    var back = root.querySelector('#fback');
    var prog = root.querySelector('#fprog');
    var backTimer = null;

    /* Builds the two faces for one card. Kanji glyphs deliberately hide
       their reading on the recognition side — that's the whole point of a
       kanji drill — and surface it opposite the meaning instead. */
    function faces(w) {
      var jpSide, viSide;
      var flip = '<div class="hint">Bấm thẻ hoặc phím Space để lật</div>';
      var hint = '<div class="hint">Enter: đã thuộc · W: cần lưu ý · X: loại ra · ← →: chuyển thẻ</div>';
      var mean = showVi ? '<div class="mean-big">' + esc(w.m) + '</div>' : '';
      var tag = w.tag ? '<div class="card-tag">' + esc(w.tag) + '</div>' : '';

      if (w.kind === 'kanji') {
        jpSide = '<div class="big jp kanji-solo">' + esc(w.w) + '</div>' + flip;
        var hvBlock = w.hv ? '<div class="kv-label">Âm Hán Việt</div><div class="mean-big hanviet">' + esc(w.hv) + '</div>' : '';
        var viBlock = (showVi && w.vi) ? '<div class="kv-label">Nghĩa tiếng Việt</div><div class="mean-big">' + esc(w.vi) + '</div>' : '';
        viSide = (w.k ? '<div class="onkun jp">' + esc(w.k) + '</div>' : '') + hvBlock + viBlock + hint;
      } else if (w.kind === 'vocab') {
        // kanji nằm cùng mặt với hiragana, có thể ẩn bằng nút
        var hasKanji = w.k && w.k !== w.w;
        jpSide =
          '<div class="big jp">' + esc(w.k || w.w) + '</div>' +
          (hasKanji && showKanji ? '<div class="kana jp">' + esc(w.w) + '</div>' : '') +
          flip;
        viSide = '<div class="mean-big">' + esc(w.m) + '</div>' + tag + hint;
      } else { // compound
        jpSide = '<div class="big jp">' + esc(w.w) + '</div>' + flip;
        viSide = (w.k ? '<div class="kana jp">' + esc(w.k) + '</div>' : '') + mean + tag + hint;
      }
      return { jp: jpSide, vi: viSide };
    }

    function renderLocked() {
      var box = root.querySelector('#flocked');
      var list = lockedInSource();
      var lb = root.querySelector('#flockedbtn');
      lb.textContent = 'Từ đã loại ra (' + list.length + ')';
      lb.setAttribute('aria-pressed', showLocked ? 'true' : 'false');
      if (!showLocked) { box.innerHTML = ''; return; }
      if (!list.length) {
        box.innerHTML = '<div class="empty">Chưa có từ nào bị loại ra.</div>';
        return;
      }
      box.innerHTML = '<div class="locked-list">' + list.map(function (w, n) {
        return '<div class="locked-row">' +
          '<span class="jp locked-w">' + esc(w.w) + '</span>' +
          '<span class="locked-k jp">' + esc(w.k && w.k !== w.w ? w.k : '') + '</span>' +
          '<span class="locked-m">' + esc(w.m) + '</span>' +
          '<button class="btn" data-restore="' + n + '">↩ Khôi phục</button>' +
        '</div>';
      }).join('') + '</div>';
      Array.prototype.forEach.call(box.querySelectorAll('[data-restore]'), function (b) {
        b.addEventListener('click', function () {
          var w = list[+b.getAttribute('data-restore')];
          Store.toggleLocked(w.store, wordKey(w));   // gỡ khóa
          Store.unmark(w.store, wordKey(w));         // đảm bảo quay lại bộ thẻ
          build();
          draw();
        });
      });
    }

    function draw() {
      var hasVocab = source.some(function (x) { return x.kind === 'vocab'; });
      var hasKan = source.some(function (x) { return x.kind !== 'vocab'; });
      root.querySelector('#fshowkanji').style.display = hasVocab ? '' : 'none';
      root.querySelector('#fshowvi').style.display = hasKan ? '' : 'none';
      var hasKanjiCard = source.some(function (x) { return x.kind === 'kanji'; });
      var cb = root.querySelector('#fcompound');
      cb.style.display = hasKanjiCard ? '' : 'none';
      cb.setAttribute('aria-pressed', compoundOnly ? 'true' : 'false');
      renderLocked();

      if (modes) {
        Array.prototype.forEach.call(root.querySelectorAll('[data-mode]'), function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-mode') === activeKey ? 'true' : 'false');
        });
      }

      var wc = watchInSource();
      var wbtn = root.querySelector('#fonlywatch');
      wbtn.textContent = 'Chỉ học từ cần lưu ý (' + wc + ')';
      wbtn.setAttribute('aria-pressed', onlyWatch ? 'true' : 'false');

      if (!deck.length) {
        card.style.display = 'none';
        root.querySelector('#fknown').disabled = true;
        root.querySelector('#fwatch').disabled = true;
        root.querySelector('#fexclude').disabled = true;
        var emptyMsg;
        if (!activeSource().length) emptyMsg = 'Không có thẻ nào ở đây.';
        else if (onlyWatch) emptyMsg = 'Chưa có từ nào trong danh sách cần lưu ý (hoặc đã thuộc hết). Tắt “Chỉ học từ cần lưu ý” để quay lại toàn bộ thẻ.';
        else emptyMsg = 'Bạn đã đánh dấu thuộc hết thẻ của phần này. Tắt “Bỏ qua thẻ đã thuộc” để ôn lại, hoặc mở “Từ đã loại ra” để khôi phục từng từ.';
        prog.innerHTML = '<div class="empty"><b>Xong rồi!</b><br>' + emptyMsg + '</div>' +
          (activeSource().length && !onlyWatch ? '<div class="toolbar" style="justify-content:center"><button class="btn" id="freset">Bỏ đánh dấu tất cả</button></div>' : '');
        var rb = prog.querySelector('#freset');
        if (rb) rb.addEventListener('click', function () {
          if (!confirm('Bỏ đánh dấu tất cả thẻ đã thuộc của phần này?\n(Từ đã “Loại ra” vẫn được giữ là đã thuộc.)')) return;
          activeSource().forEach(function (w) { Store.unmark(w.store, wordKey(w)); });
          build();
          draw();
        });
        return;
      }
      card.style.display = '';
      root.querySelector('#fknown').disabled = false;
      root.querySelector('#fwatch').disabled = false;
      root.querySelector('#fexclude').disabled = false;

      var w = deck[i];
      var known = Store.isKnown(w.store, wordKey(w));
      var watched = Store.isWatch(w.store, wordKey(w));
      var locked = Store.isLocked(w.store, wordKey(w));

      prog.textContent = (i + 1) + ' / ' + deck.length +
        ' · đã thuộc ' + knownInSource() + '/' + activeSource().length;

      var f = faces(w);
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
      root.querySelector('#fknown').textContent = known ? '✓ Đã thuộc' : '✓ Đánh dấu thuộc';
      var wb = root.querySelector('#fwatch');
      wb.textContent = watched ? '★ Đang cần lưu ý' : '☆ Cần lưu ý';
      wb.setAttribute('aria-pressed', watched ? 'true' : 'false');
      var xb = root.querySelector('#fexclude');
      xb.textContent = locked ? '↩ Bỏ loại ra' : '⛔ Loại ra (đã nắm chắc)';
      xb.setAttribute('aria-pressed', locked ? 'true' : 'false');
    }

    function move(d) {
      if (!deck.length) return;
      i = (i + d + deck.length) % deck.length;
      flipped = false;
      draw();
    }

    card.addEventListener('click', function () { flipped = !flipped; draw(); });
    root.querySelector('#fprev').addEventListener('click', function () { move(-1); });
    root.querySelector('#fnext').addEventListener('click', function () { move(1); });
    root.querySelector('#fknown').addEventListener('click', function () {
      if (!deck.length) return;
      var w = deck[i];
      Store.toggleKnown(w.store, wordKey(w));
      if (skipKnown) {
        deck.splice(i, 1);
        if (i >= deck.length) i = 0;
        flipped = false;
      }
      draw();
    });
    root.querySelector('#fwatch').addEventListener('click', function () {
      if (!deck.length) return;
      var w = deck[i];
      Store.toggleWatch(w.store, wordKey(w));
      if (onlyWatch && !Store.isWatch(w.store, wordKey(w))) {   // vừa gỡ khỏi list đang học
        deck.splice(i, 1);
        if (i >= deck.length) i = 0;
        flipped = false;
      }
      draw();
    });
    root.querySelector('#fexclude').addEventListener('click', function () {
      if (!deck.length) return;
      var w = deck[i];
      var nowLocked = Store.toggleLocked(w.store, wordKey(w));
      if (nowLocked && (skipKnown || onlyWatch)) {   // loại ra: bỏ khỏi bộ thẻ hiện tại
        deck.splice(i, 1);
        if (i >= deck.length) i = 0;
        flipped = false;
      }
      draw();
    });
    root.querySelector('#fcompound').addEventListener('click', function () {
      compoundOnly = !compoundOnly;
      build();
      draw();
    });
    root.querySelector('#flockedbtn').addEventListener('click', function () {
      showLocked = !showLocked;
      draw();
    });
    root.querySelector('#fonlywatch').addEventListener('click', function () {
      onlyWatch = !onlyWatch;
      build();
      draw();
    });
    root.querySelector('#fdir').addEventListener('click', function (e) {
      jpFirst = !jpFirst;
      e.target.textContent = jpFirst ? 'Nhật → Việt' : 'Việt → Nhật';
      flipped = false;
      draw();
    });
    root.querySelector('#fskip').addEventListener('click', function (e) {
      skipKnown = !skipKnown;
      e.target.setAttribute('aria-pressed', skipKnown ? 'true' : 'false');
      build();
      draw();
    });
    root.querySelector('#fshuffle').addEventListener('click', function () {
      build();
      draw();
    });
    root.querySelector('#fshowvi').addEventListener('click', function (e) {
      showVi = !showVi;
      e.target.setAttribute('aria-pressed', showVi ? 'true' : 'false');
      draw();
    });
    root.querySelector('#fshowkanji').addEventListener('click', function (e) {
      showKanji = !showKanji;
      e.target.setAttribute('aria-pressed', showKanji ? 'true' : 'false');
      draw();
    });
    if (modes) {
      Array.prototype.forEach.call(root.querySelectorAll('[data-mode]'), function (b) {
        b.addEventListener('click', function () {
          activeKey = b.getAttribute('data-mode');
          var m = modes.filter(function (x) { return x.key === activeKey; })[0];
          setSource(m.build());
          draw();
        });
      });
    }

    function onKey(e) {
      if (!document.body.contains(root)) {
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
      else if (e.key === 'w' || e.key === 'W') root.querySelector('#fwatch').click();
      else if (e.key === 'x' || e.key === 'X') root.querySelector('#fexclude').click();
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (e.repeat) return;
        root.querySelector('#fknown').click();
      }
    }
    if (activeKeyHandler) document.removeEventListener('keydown', activeKeyHandler);
    activeKeyHandler = onKey;
    document.addEventListener('keydown', onKey);

    build();
    draw();
  }
})();