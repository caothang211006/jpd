/* Router, topbar, trang chủ. Hash routing để chạy được từ file://.
     #/                       trang chủ
     #/l/<id>/<tab>[/...]     một bài, một tab (vocab|flash|grammar|kanji|quiz)
     #/all/<tab>              chọn bài theo sách cho một tab (browse.js)
     #/mix/<type>/<de>/<per>/<id,id,...>   đề kiểm tra gộp nhiều bài
     #/study                  ôn từ vựng / kanji nhiều bài (flashcard, luyện nghĩa) */
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
  window.TAB_LABEL = TAB_LABEL;

  /* --------------------------------------------------------------- theme */
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('jpd.theme'); } catch (e) {}
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  document.getElementById('themeToggle').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    if (!cur) {
      cur = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('jpd.theme', next); } catch (e) {}
  });

  /* ---------------------------------------------------------------- util */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  window.esc = esc;

  /* Escape, rồi đổi 漢字（かな） thành <ruby> để cách đọc nằm trên đầu chữ. */
  window.furi = function (s) {
    return esc(s).replace(/([㐀-鿿豈-﫿々〆ヵヶ]+)（([ぁ-ゖァ-ヺー]+)）/g,
                          '<ruby>$1<rt>$2</rt></ruby>');
  };

  /* "Đỏ 3" / "Vàng 12" và "Sách đỏ" / "Sách vàng" */
  window.bookShort = function (book) { return book.tone === 'red' ? 'Đỏ' : 'Vàng'; };
  window.bookLabel = function (book) { return book.tone === 'red' ? 'Sách đỏ' : 'Sách vàng'; };
  /* "Vàng 4" theo id bài; '' nếu không có trong manifest. */
  window.lessonShort = function (id) {
    var m = JPD.meta(id);
    return m ? bookShort(m.book) + ' ' + m.lesson.n : '';
  };

  function go(hash) { location.hash = hash; }
  window.go = go;

  var current = { lessonId: null, tab: null };

  /* ----------------------------------------------------------- data-nav */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-nav]') : null;
    if (!el) return;
    var nav = el.getAttribute('data-nav');
    if (nav === 'home') { go('#/'); return; }
    if (nav === 'study') {
      // Phiên gộp giữ URL ở #/study; đặt lại cùng hash không bắn hashchange.
      if (location.hash.replace(/^#/, '') === '/study') renderStudy();
      else go('#/study');
      return;
    }
    if (nav.indexOf('all-') === 0) { go('#/all/' + nav.slice(4)); return; }
    var tab = nav.split('/')[0];
    if (!TAB_LABEL[tab]) return;
    if (current.lessonId) go('#/l/' + current.lessonId + '/' + nav);
    else go('#/all/' + tab);
  });

  /* Topbar luôn hiện; tab của trang hiện tại sáng (aria-current). */
  function setActiveTab(active) {
    tabs.hidden = false;
    Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-nav') === active ? 'true' : 'false');
    });
  }

  function leaveLesson(activeTab) {
    current.lessonId = null;
    current.tab = activeTab;
    setActiveTab(activeTab);
    lessonBar.hidden = true;
  }

  /* ---------------------------------------------------------------- home */
  function renderHome() {
    leaveLesson(null);
    if (!JPD.books.length) {
      view.innerHTML = '<div class="empty">Đang tải dữ liệu…</div>';
      return;
    }

    var h = '<h1>Học tiếng Nhật theo giáo trình できる日本語</h1>' +
            '<p class="sub">Chọn một bài để xem từ vựng, ngữ pháp, kanji và làm bài kiểm tra. ' +
            'Tiến độ được lưu tự động trên máy bạn.</p>' +
            '<div class="cta-row">' +
              cta('study', 'Ôn từ vựng / kanji nhiều bài',
                  'Gộp từ vựng hoặc kanji của nhiều bài thành một bộ flashcard hoặc bài luyện nghĩa từ') +
              cta('all-quiz', 'Đề kiểm tra gộp nhiều bài',
                  'Gộp câu hỏi kiểm tra (từ vựng / ngữ pháp) của nhiều bài thành một đề') +
            '</div>';

    JPD.books.forEach(function (book) {
      var ready = book.lessons.filter(function (l) { return l.file; }).length;
      h += '<div class="book-head"><span class="book-dot ' + book.tone + '"></span>' +
             '<h2>' + esc(book.name) + '</h2>' +
             '<span class="note">' + ready + '/' + book.lessons.length + ' bài đã có nội dung</span></div>' +
           '<div class="grid">' + book.lessons.map(function (l) { return homeCard(book, l); }).join('') + '</div>';
    });
    view.innerHTML = h;

    Array.prototype.forEach.call(view.querySelectorAll('[data-lesson]'), function (btn) {
      if (btn.getAttribute('data-empty') === '1') return;
      btn.addEventListener('click', function () { go('#/l/' + btn.getAttribute('data-lesson') + '/vocab'); });
    });
  }

  function cta(nav, title, sub) {
    return '<button class="study-cta" data-nav="' + nav + '"><span>' +
             '<span class="study-cta-title">' + title + '</span>' +
             '<span class="study-cta-sub">' + sub + '</span>' +
           '</span></button>';
  }

  function homeCard(book, l) {
    var known = Store.knownCount(l.id);
    var pct = l.words ? Math.min(100, Math.round(known / l.words * 100)) : 0;
    var h = '<button class="lesson-card ' + book.tone + '"' + (l.file ? '' : ' data-empty="1"') + ' data-lesson="' + esc(l.id) + '">' +
              '<div class="num">Bài ' + esc(l.n) + '</div>' +
              '<div class="title jp">' + esc(l.jp) + '</div>' +
              '<div class="vi">' + esc(l.vi) + '</div>';
    if (l.file) {
      h += '<div class="meta"><span>' + (l.words || 0) + ' từ</span>' +
             '<span>' + (l.grammar || 0) + ' mẫu ngữ pháp</span>' +
             (l.kanji ? '<span>' + l.kanji + ' kanji</span>' : '') + '</div>' +
           '<div class="bar"><i style="width:' + pct + '%"></i></div>';   // độ rộng tính lúc chạy
    } else {
      h += '<div class="meta"><span>Chưa có nội dung</span></div>';
    }
    return h + '</button>';
  }

  /* -------------------------------------------------------------- lesson */
  function renderLesson(id, tab, sub) {
    var m = JPD.meta(id);
    if (!m) { go('#/'); return; }

    current.lessonId = id;
    current.tab = tab;
    setActiveTab(tab);
    lessonBar.hidden = false;
    crumb.innerHTML = esc(bookLabel(m.book)) + ' · Bài ' + esc(m.lesson.n) +
      ' <span class="jp">' + esc(m.lesson.jp) + '</span> · ' + esc(m.lesson.vi);

    view.innerHTML = '<div class="empty">Đang tải bài học…</div>';
    JPD.load(id, function (lesson) {
      if (current.lessonId !== id || current.tab !== tab) return;  // đã chuyển trang
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

  /* ------------------------------------------------- all lessons by book */
  function renderAll(tab) {
    leaveLesson(tab);
    window.Views.browse(view, tab);
  }

  /* --------------------------------------------------- merged exam */
  function renderMix(parts) {
    leaveLesson('quiz');
    var spec = {
      type: parts[1],
      de: Math.max(1, parseInt(parts[2], 10) || 1),
      per: Math.max(0, parseInt(parts[3], 10) || 0),
      ids: String(parts[4] || '').split(',').filter(Boolean)
    };
    var token = current.tab = 'mix:' + parts.slice(1).join('/');
    if (!spec.ids.length) { go('#/all/quiz'); return; }
    view.innerHTML = '<div class="empty">Đang tải ' + spec.ids.length + ' bài…</div>';
    loadLessons(spec.ids, function (lessons) {
      if (current.tab !== token) return;
      window.runMixedExam(view, spec, lessons);
    });
  }

  /* Tải nhiều bài, trả về theo thứ tự manifest. */
  function loadLessons(ids, cb) {
    var got = {}, left = ids.length;
    ids.forEach(function (id) {
      JPD.load(id, function (l) {
        if (l) got[id] = l;
        if (--left === 0) {
          var ordered = [];
          JPD.books.forEach(function (b) { b.lessons.forEach(function (x) { if (got[x.id]) ordered.push(got[x.id]); }); });
          cb(ordered);
        }
      });
    });
  }
  window.loadLessons = loadLessons;

  /* --------------------------------------------------------------- study */
  function renderStudy() {
    leaveLesson('flash');
    view.innerHTML = '';
    window.Views.study(view);
  }

  /* -------------------------------------------------------------- router */
  function route() {
    var parts = location.hash.replace(/^#/, '').split('/').filter(Boolean);
    window.scrollTo(0, 0);

    if (parts[0] === 'l' && parts[1]) {
      renderLesson(parts[1], TAB_LABEL[parts[2]] ? parts[2] : 'vocab', parts.slice(3).join('/') || undefined);
    } else if (parts[0] === 'study') {
      renderStudy();
    } else if (parts[0] === 'all' && TAB_LABEL[parts[1]]) {
      renderAll(parts[1]);           // #/all/<tab>/all vẫn dẫn về cùng trang
    } else if (parts[0] === 'mix') {
      renderMix(parts);
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', route);

  window.App = {
    // manifest.js là thẻ <script> cuối cùng, nên đây mới là lần render đầu:
    // gọi route() sớm hơn sẽ thấy danh mục rỗng và đẩy link trực tiếp về '#/'.
    onManifest: route
  };
})();
