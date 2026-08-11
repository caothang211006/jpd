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
    if (!data[lessonId].scores) data[lessonId].scores = [];
    return data[lessonId];
  }

  window.Store = {
    isKnown: function (lessonId, wordKey) {
      return !!bucket(lessonId).known[wordKey];
    },
    toggleKnown: function (lessonId, wordKey) {
      var b = bucket(lessonId);
      if (b.known[wordKey]) delete b.known[wordKey];
      else b.known[wordKey] = 1;
      save();
      return !!b.known[wordKey];
    },
    knownCount: function (lessonId) {
      return Object.keys(bucket(lessonId).known).length;
    },
    clearKnown: function (lessonId) {
      bucket(lessonId).known = {};
      save();
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
