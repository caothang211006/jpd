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

  function go(hash) { location.hash = hash; }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-nav]') : null;
    if (!el) return;
    var nav = el.getAttribute('data-nav');
    if (nav === 'home') { go('#/'); return; }
    if (nav === 'study') { go('#/study'); return; }
    if (TAB_LABEL[nav] && current.lessonId) { go('#/l/' + current.lessonId + '/' + nav); }
  });

  var current = { lessonId: null, tab: null };

  /* ---------------------------------------------------------------- home */
  function renderHome() {
    current.lessonId = null;
    tabs.hidden = true;
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

  /* --------------------------------------------------------------- study */
  function renderStudy() {
    current.lessonId = null;
    tabs.hidden = true;
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
      renderLesson(parts[1], TAB_LABEL[parts[2]] ? parts[2] : 'vocab', parts[3]);
    } else if (parts[0] === 'study') {
      renderStudy();
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
