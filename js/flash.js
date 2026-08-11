/* Flashcard engine. Click or press Space to flip, arrows to move, Enter to
   mark known.

   Card shapes on the front/back:
     kind 'vocab'    front: word + kana (kana styled large, easy to read)
                      back:  meaning
     kind 'kanji'    front: the character ALONE — no reading, so it tests
                             recognition honestly
                      back:  ON/KUN readings + meaning
     kind 'compound' front: compound word + kana (same as vocab)
                      back:  meaning + which kanji it belongs to

   Every card carries its own .store (a Store bucket id) and .key (via
   wordKey). That is what makes pooled multi-lesson sessions possible: a
   card's "known" state always writes back to the lesson it actually came
   from, never to some synthetic pooled bucket, so studying bài 8+9 together
   and studying bài 8 alone stay in sync. */
(function () {
  'use strict';
  window.Views = window.Views || {};

  window.buildKanjiDeck = buildKanjiDeck;
  window.runFlashSession = runFlashSession;

  function buildKanjiDeck(lesson) {
    var out = [], seen = {};
    var store = lesson.id + ':kanji';
    (lesson.kanji || []).forEach(function (k) {
      var readings = [k.on, k.kun].filter(Boolean).join(' ・ ');
      out.push({ kind: 'kanji', w: k.c, k: readings, m: k.m, store: store });
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

    function setSource(list) {
      source = list;
      build();
    }

    function build() {
      deck = source.filter(function (w) {
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
      return source.filter(function (w) { return Store.isKnown(w.store, wordKey(w)); }).length;
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
        '</div>' +
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
      '</div>';

    var card = root.querySelector('#fcard');
    var front = root.querySelector('#ffront');
    var back = root.querySelector('#fback');
    var prog = root.querySelector('#fprog');

    /* Builds the two faces for one card. Kanji glyphs deliberately hide
       their reading on the recognition side — that's the whole point of a
       kanji drill — and surface it opposite the meaning instead. */
    function faces(w) {
      var jpSide, viSide;

      if (w.kind === 'kanji') {
        jpSide =
          '<div class="big jp kanji-solo">' + esc(w.w) + '</div>' +
          '<div class="hint">Bấm thẻ hoặc phím Space để lật</div>';
        viSide =
          (w.k ? '<div class="onkun jp">' + esc(w.k) + '</div>' : '') +
          '<div class="mean-big">' + esc(w.m) + '</div>' +
          '<div class="hint">Enter: đánh dấu đã thuộc · ← →: chuyển thẻ</div>';
      } else {
        jpSide =
          '<div class="big jp">' + esc(w.w) + '</div>' +
          (w.k ? '<div class="kana jp">' + esc(w.k) + '</div>' : '') +
          '<div class="hint">Bấm thẻ hoặc phím Space để lật</div>';
        viSide =
          '<div class="mean-big">' + esc(w.m) + '</div>' +
          (w.tag ? '<div class="card-tag">' + esc(w.tag) + '</div>' : '') +
          '<div class="hint">Enter: đánh dấu đã thuộc · ← →: chuyển thẻ</div>';
      }
      return { jp: jpSide, vi: viSide };
    }

    function draw() {
      if (modes) {
        Array.prototype.forEach.call(root.querySelectorAll('[data-mode]'), function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-mode') === activeKey ? 'true' : 'false');
        });
      }

      if (!deck.length) {
        card.style.display = 'none';
        root.querySelector('#fknown').disabled = true;
        prog.innerHTML = '<div class="empty"><b>Xong rồi!</b><br>' +
          (source.length ? 'Bạn đã đánh dấu thuộc hết thẻ của phần này. Tắt “Bỏ qua thẻ đã thuộc” để ôn lại.'
                          : 'Không có thẻ nào ở đây.') +
          '</div>';
        return;
      }
      card.style.display = '';
      root.querySelector('#fknown').disabled = false;

      var w = deck[i];
      var known = Store.isKnown(w.store, wordKey(w));

      prog.textContent = (i + 1) + ' / ' + deck.length +
        ' · đã thuộc ' + knownInSource() + '/' + source.length;

      var f = faces(w);
      front.innerHTML = jpFirst ? f.jp : f.vi;
      back.innerHTML = jpFirst ? f.vi : f.jp;

      card.classList.toggle('flipped', flipped);
      root.querySelector('#fknown').textContent = known ? '✓ Đã thuộc' : '✓ Đánh dấu thuộc';
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
        return;
      }
      if (e.target.tagName === 'INPUT') return;
      if (e.key === ' ') { e.preventDefault(); flipped = !flipped; draw(); }
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'Enter') root.querySelector('#fknown').click();
    }
    document.addEventListener('keydown', onKey);

    build();
    draw();
  }
})();
