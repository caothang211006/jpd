/* Router + home screen. Routes are hash-based so the app works from file://.
     #/            all books and lessons
     #/l/<id>/<tab>   one lesson, one tab (vocab|flash|grammar|kanji|quiz) */
(function () {
  'use strict';

  var view = document.getElementById('view');
  var tabs = document.getElementById('tabs');
  var lessonBar = document.getElementById('lessonBar');
  var crumb = document.getElementById('lessonCrumb');

  var TAB_LABEL = {
    vocab: 'Từ vựng', flash: 'Flashcard', grammar: 'Ngữ pháp',
    kanji: 'Kanji', quiz: 'Kiểm tra'
  };

  /* --------------------------------------------------------------- theme */
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('jpd.theme'); } catch (e) {}
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  document.getElementById('themeToggle').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    if (!cur) {
      cur = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
    }
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('jpd.theme', next); } catch (e) {}
  });

  /* ---------------------------------------------------------------- util */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  window.esc = esc;
  /* Escape, then turn 漢字（かな） into <ruby>漢字<rt>かな</rt></ruby> so the
     reading sits above the kanji instead of cluttering the line. */
  window.furi = function (s) {
    return esc(s).replace(/([\u3400-\u9fff\uf900-\ufaff々〆ヵヶ]+)（([\u3041-\u3096\u30a1-\u30faー]+)）/g, '<ruby>$1<rt>$2</rt></ruby>');
  };

  function go(hash) { location.hash = hash; }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-nav]') : null;
    if (!el) return;
    var nav = el.getAttribute('data-nav');
    if (nav === 'home') { go('#/'); return; }
    if (nav === 'study') {
      // Pooled flashcard/quiz sessions keep the URL at #/study. Setting the
      // same hash does not fire hashchange, so restore the picker directly.
      if (location.hash.replace(/^#/, '') === '/study') renderStudy();
      else go('#/study');
      return;
    }
    var navParts = nav.split('/');
    if (TAB_LABEL[navParts[0]] && current.lessonId) {
      go('#/l/' + current.lessonId + '/' + nav);
    } else if (TAB_LABEL[navParts[0]]) {
      // Ở trang chủ / trang ôn tập: từ vựng, ngữ pháp, kanji → chọn bài hoặc xem tất cả;
      // flashcard, kiểm tra → trang ôn nhiều bài.
      if (navParts[0] === 'flash' || navParts[0] === 'quiz') { go('#/study'); return; }
      go('#/all/' + nav);
    }
  });

  var current = { lessonId: null, tab: null };

  /* ---------------------------------------------------------------- home */
  function showGlobalTabs(active) {
    tabs.hidden = false;
    Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-nav') === active ? 'true' : 'false');
    });
  }

  function renderHome() {
    current.lessonId = null;
    showGlobalTabs(null);
    lessonBar.hidden = true;

    if (!JPD.books.length) {
      view.innerHTML = '<div class="empty">Đang tải dữ liệu…</div>';
      return;
    }

    var h = '<h1>Học tiếng Nhật theo giáo trình できる日本語</h1>' +
            '<p class="sub">Chọn một bài để xem từ vựng, ngữ pháp, kanji và làm bài kiểm tra. ' +
            'Tiến độ được lưu tự động trên máy bạn.</p>' +
            '<button class="study-cta" data-nav="study">' +
              '<span class="study-cta-icon">🔀</span>' +
              '<span>' +
                '<span class="study-cta-title">Ôn tập nhiều bài cùng lúc</span>' +
                '<span class="study-cta-sub">Gộp từ vựng hoặc kanji của nhiều bài vào một bộ flashcard / bài kiểm tra</span>' +
              '</span>' +
            '</button>';

    JPD.books.forEach(function (book) {
      var ready = book.lessons.filter(function (l) { return l.file; }).length;
      h += '<div class="book-head">' +
             '<span class="book-dot ' + book.tone + '"></span>' +
             '<h2>' + esc(book.name) + '</h2>' +
             '<span class="note">' + ready + '/' + book.lessons.length + ' bài đã có nội dung</span>' +
           '</div>';
      h += '<div class="grid">';
      book.lessons.forEach(function (l) {
        var known = Store.knownCount(l.id);
        var pct = l.words ? Math.min(100, Math.round(known / l.words * 100)) : 0;
        var disabled = l.file ? '' : ' data-empty="1"';
        h += '<button class="lesson-card ' + book.tone + '"' + disabled +
             ' data-lesson="' + esc(l.id) + '">' +
               '<div class="num">Bài ' + esc(l.n) + '</div>' +
               '<div class="title jp">' + esc(l.jp) + '</div>' +
               '<div class="vi">' + esc(l.vi) + '</div>';
        if (l.file) {
          h += '<div class="meta">' +
                 '<span>' + (l.words || 0) + ' từ</span>' +
                 '<span>' + (l.grammar || 0) + ' mẫu ngữ pháp</span>' +
                 (l.kanji ? '<span>' + l.kanji + ' kanji</span>' : '') +
               '</div>' +
               '<div class="bar"><i style="width:' + pct + '%"></i></div>';
        } else {
          h += '<div class="meta"><span>Chưa có nội dung</span></div>';
        }
        h += '</button>';
      });
      h += '</div>';
    });

    view.innerHTML = h;

    Array.prototype.forEach.call(view.querySelectorAll('[data-lesson]'), function (btn) {
      if (btn.getAttribute('data-empty') === '1') return;
      btn.addEventListener('click', function () {
        go('#/l/' + btn.getAttribute('data-lesson') + '/vocab');
      });
    });
  }

  /* -------------------------------------------------------------- lesson */
  function renderLesson(id, tab, sub) {
    var m = JPD.meta(id);
    if (!m) { go('#/'); return; }

    current.lessonId = id;
    current.tab = tab;

    tabs.hidden = false;
    lessonBar.hidden = false;
    crumb.innerHTML = 'Bài ' + esc(m.lesson.n) +
      ' <span class="jp">' + esc(m.lesson.jp) + '</span> · ' + esc(m.lesson.vi);

    Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-nav') === tab ? 'true' : 'false');
    });

    view.innerHTML = '<div class="empty">Đang tải bài học…</div>';

    JPD.load(id, function (lesson) {
      if (current.lessonId !== id || current.tab !== tab) return;  // navigated away
      if (!lesson) {
        view.innerHTML = '<div class="empty"><b>Chưa có nội dung cho bài này.</b><br>' +
          'Thêm file dữ liệu vào thư mục <code>data/</code> rồi khai báo trong ' +
          '<code>data/manifest.js</code> là bài sẽ tự hiện ra.</div>';
        return;
      }
      var fn = window.Views && window.Views[tab];
      if (!fn) { go('#/l/' + id + '/vocab'); return; }
      fn(view, lesson, m.lesson, sub);
    });
  }

  /* ----------------------------------------------- all lessons, one tab */
  // #/all/<tab>      chọn bài (cả 2 sách) để mở tab đó
  // #/all/<tab>/all  hiện dữ liệu của tất cả các bài liên tiếp
  function renderAll(tab, sub) {
    current.lessonId = null;
    current.tab = 'all:' + tab + ':' + (sub || '');
    var token = current.tab;
    showGlobalTabs(tab);
    lessonBar.hidden = true;
    var books = JPD.books || [];
    if (sub !== 'all') {
      var h = '<h1>' + esc(TAB_LABEL[tab]) + ' — chọn bài</h1>' +
        '<p class="sub">Chọn một bài, hoặc xem dữ liệu của tất cả các bài cùng lúc.</p>' +
        '<div class="toolbar"><button class="btn primary" data-allgo="1">Xem tất cả các bài</button></div>';
      books.forEach(function (book) {
        h += '<div class="book-head"><span class="book-dot ' + book.tone + '"></span><h2>' + esc(book.name) + '</h2></div><div class="grid">';
        book.lessons.forEach(function (l) {
          var n = tab === 'kanji' ? (l.kanji || 0) : tab === 'grammar' ? (l.grammar || 0) : (l.words || 0);
          var unit = tab === 'kanji' ? ' kanji' : tab === 'grammar' ? ' mẫu' : ' từ';
          h += '<button class="lesson-card ' + book.tone + '"' + (l.file ? '' : ' disabled') + ' data-golesson="' + esc(l.id) + '">' +
               '<div class="num">Bài ' + esc(l.n) + '</div><div class="title jp">' + esc(l.jp) + '</div>' +
               '<div class="vi">' + esc(l.vi) + '</div><div class="meta"><span>' + n + unit + '</span></div></button>';
        });
        h += '</div>';
      });
      view.innerHTML = h;
      Array.prototype.forEach.call(view.querySelectorAll('[data-golesson]'), function (b) {
        b.addEventListener('click', function () { go('#/l/' + b.getAttribute('data-golesson') + '/' + tab); });
      });
      view.querySelector('[data-allgo]').addEventListener('click', function () { go('#/all/' + tab + '/all'); });
      return;
    }
    var list = [];
    books.forEach(function (book) { book.lessons.forEach(function (l) { if (l.file) list.push({ book: book, l: l }); }); });
    view.innerHTML = '<h1>' + esc(TAB_LABEL[tab]) + ' — tất cả các bài</h1><div class="toolbar" id="alljump"></div>' +
      list.map(function (x, i) {
        return '<section class="all-sec" id="all-' + i + '"><div class="book-head"><span class="book-dot ' + x.book.tone + '"></span>' +
          '<h2>' + (x.book.tone === 'red' ? 'Sách đỏ' : 'Sách vàng') + ' · Bài ' + esc(x.l.n) + ' <span class="jp">' + esc(x.l.jp) + '</span></h2>' +
          '<span class="note"><button class="btn" data-golesson="' + esc(x.l.id) + '" style="padding:4px 10px;font-size:12.5px">Mở bài</button></span></div>' +
          '<div class="all-body"><div class="empty">Đang tải…</div></div></section>';
      }).join('');
    view.querySelector('#alljump').innerHTML = list.map(function (x, i) {
      return '<a class="btn" href="javascript:void 0" data-jump="' + i + '" style="padding:4px 9px;font-size:12.5px">' + (x.book.tone === 'red' ? 'Đỏ ' : 'Vàng ') + x.l.n + '</a>';
    }).join('');
    Array.prototype.forEach.call(view.querySelectorAll('[data-jump]'), function (a) {
      a.addEventListener('click', function () { var el = document.getElementById('all-' + a.getAttribute('data-jump')); if (el) el.scrollIntoView(); });
    });
    Array.prototype.forEach.call(view.querySelectorAll('[data-golesson]'), function (b) {
      b.addEventListener('click', function () { go('#/l/' + b.getAttribute('data-golesson') + '/' + tab); });
    });
    var secs = view.querySelectorAll('.all-body');
    list.forEach(function (x, i) {
      JPD.load(x.l.id, function (lesson) {
        if (current.tab !== token) return;
        var box = secs[i];
        if (!lesson) { box.innerHTML = '<div class="empty">Chưa có nội dung.</div>'; return; }
        window.Views[tab](box, lesson, x.l);
      });
    });
  }

  /* --------------------------------------------------------------- study */
  function renderStudy() {
    current.lessonId = null;
    showGlobalTabs(null);
    lessonBar.hidden = true;
    view.innerHTML = '';
    if (window.Views && window.Views.study) window.Views.study(view);
    else view.innerHTML = '<div class="empty">Đang tải…</div>';
  }

  /* -------------------------------------------------------------- router */
  function route() {
    var h = location.hash.replace(/^#/, '');
    var parts = h.split('/').filter(Boolean);
    window.scrollTo(0, 0);

    if (parts[0] === 'l' && parts[1]) {
      renderLesson(parts[1], TAB_LABEL[parts[2]] ? parts[2] : 'vocab', parts.slice(3).join('/') || undefined);
    } else if (parts[0] === 'study') {
      renderStudy();
    } else if (parts[0] === 'all' && TAB_LABEL[parts[1]]) {
      renderAll(parts[1], parts[2]);
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', route);

  window.App = {
    onManifest: function () {
      // manifest.js is the last <script> tag, so this is the actual first
      // render. Calling route() here (not at load) matters: a plain script
      // tag runs synchronously in document order, so if route() ran at the
      // bottom of this file it would fire before manifest.js had registered
      // any books, see an empty catalogue, and bounce a direct lesson link
      // like #/l/shokyu-8/vocab straight back to '#/'.
      route();
    },
    refreshHome: renderHome
  };
})();
