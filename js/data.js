/* Lesson content is delivered as plain <script> files rather than JSON,
   because fetch() on a file:// page is blocked by the browser. Each lesson
   file calls JPD.lesson({...}); the loader injects the tag and waits. */
(function () {
  'use strict';

  var books = [];
  var lessons = {};          // id -> lesson data, once loaded
  var pending = {};          // id -> [callbacks] while a script is in flight

  window.JPD = {
    books: books,

    /* Called by data/manifest.js */
    book: function (b) {
      books.push(b);
      if (window.App && window.App.onManifest) window.App.onManifest();
    },

    /* Called by each data/<book>/lNN.js */
    lesson: function (l) {
      lessons[l.id] = l;
      var waiting = pending[l.id] || [];
      delete pending[l.id];
      for (var i = 0; i < waiting.length; i++) waiting[i](l);
    },

    get: function (id) {
      return lessons[id] || null;
    },

    /* Finds the manifest entry (title, file, counts) without loading content */
    meta: function (id) {
      for (var i = 0; i < books.length; i++) {
        var ls = books[i].lessons;
        for (var j = 0; j < ls.length; j++) {
          if (ls[j].id === id) {
            return { book: books[i], lesson: ls[j] };
          }
        }
      }
      return null;
    },

    load: function (id, cb) {
      if (lessons[id]) { cb(lessons[id]); return; }

      var m = this.meta(id);
      if (!m || !m.lesson.file) { cb(null); return; }

      if (pending[id]) { pending[id].push(cb); return; }
      pending[id] = [cb];

      var s = document.createElement('script');
      s.src = m.lesson.file;
      s.onerror = function () {
        var waiting = pending[id] || [];
        delete pending[id];
        for (var i = 0; i < waiting.length; i++) waiting[i](null);
      };
      document.head.appendChild(s);
    }
  };
})();
