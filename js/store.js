/* Progress lives in localStorage so the app keeps working from file:// with no
   server and no account. Everything is namespaced under one key. */
(function () {
  'use strict';

  var KEY = 'jpd.progress.v1';
  var data = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      /* private mode or quota - progress just won't persist */
    }
  }

  function bucket(lessonId) {
    if (!data[lessonId]) data[lessonId] = { known: {}, scores: [] };
    if (!data[lessonId].known) data[lessonId].known = {};
    if (!data[lessonId].watch) data[lessonId].watch = {};     // từ cần lưu ý
    if (!data[lessonId].locked) data[lessonId].locked = {};   // đã loại ra: luôn tính là đã thuộc, reset không xóa
    if (!data[lessonId].scores) data[lessonId].scores = [];
    return data[lessonId];
  }

  window.Store = {
    /* locked (loại ra) luôn được tính là đã thuộc, kể cả sau khi bấm reset */
    isKnown: function (lessonId, wordKey) {
      var b = bucket(lessonId);
      return !!(b.known[wordKey] || b.locked[wordKey]);
    },
    toggleKnown: function (lessonId, wordKey) {
      var b = bucket(lessonId);
      if (b.locked[wordKey]) return true;     // đã loại ra thì không bỏ đánh dấu bằng nút thường
      if (b.known[wordKey]) delete b.known[wordKey];
      else b.known[wordKey] = 1;
      save();
      return !!b.known[wordKey];
    },
    /* Bỏ đánh dấu thuộc của đúng 1 từ (không đụng tới từ đã loại ra) */
    unmark: function (lessonId, wordKey) {
      var b = bucket(lessonId);
      if (b.known[wordKey]) { delete b.known[wordKey]; save(); }
    },
    knownCount: function (lessonId) {
      var b = bucket(lessonId), all = {}, k;
      for (k in b.known) all[k] = 1;
      for (k in b.locked) all[k] = 1;
      return Object.keys(all).length;
    },
    /* Reset chỉ xóa dấu "đã thuộc" thường; từ đã loại ra vẫn giữ nguyên */
    clearKnown: function (lessonId) {
      bucket(lessonId).known = {};
      save();
    },

    /* ---- danh sách từ cần lưu ý ---- */
    isWatch: function (lessonId, wordKey) {
      return !!bucket(lessonId).watch[wordKey];
    },
    toggleWatch: function (lessonId, wordKey) {
      var b = bucket(lessonId);
      if (b.watch[wordKey]) delete b.watch[wordKey];
      else b.watch[wordKey] = 1;
      save();
      return !!b.watch[wordKey];
    },
    watchCount: function (lessonId) {
      return Object.keys(bucket(lessonId).watch).length;
    },

    /* ---- loại từ ra: gỡ khỏi danh sách lưu ý + đánh dấu thuộc vĩnh viễn ---- */
    isLocked: function (lessonId, wordKey) {
      return !!bucket(lessonId).locked[wordKey];
    },
    toggleLocked: function (lessonId, wordKey) {
      var b = bucket(lessonId);
      if (b.locked[wordKey]) {
        delete b.locked[wordKey];
      } else {
        b.locked[wordKey] = 1;
        delete b.watch[wordKey];
      }
      save();
      return !!b.locked[wordKey];
    },
    addScore: function (lessonId, correct, total) {
      var b = bucket(lessonId);
      b.scores.push({ c: correct, t: total, at: Date.now() });
      if (b.scores.length > 30) b.scores = b.scores.slice(-30);
      save();
    },
    bestScore: function (lessonId) {
      var s = bucket(lessonId).scores, best = null;
      for (var i = 0; i < s.length; i++) {
        var pct = s[i].t ? s[i].c / s[i].t : 0;
        if (best === null || pct > best) best = pct;
      }
      return best;
    },
    resetAll: function () {
      data = {};
      save();
    }
  };
})();