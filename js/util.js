/* Hàm dùng chung cho mọi trang. Nạp đầu tiên (trước store.js).
     shuffle      Fisher-Yates; rand bắt buộc (đề: seededRandom, flashcard và
                  luyện từ nhanh: Math.random — cố ý ngẫu nhiên mỗi lần)
     each / on    duyệt phần tử / gắn sự kiện theo selector
     setPressed   aria-pressed cho nút công tắc
     Pref         tùy chọn bật/tắt lưu ở khóa riêng (không đụng jpd.progress.v1)
     wordKey, isKatakanaWord, vtLabel, vtMeaning   — từ vựng */
(function () {
  'use strict';

  window.shuffle = function (a, rand) {
    for (var n = a.length - 1; n > 0; n--) {
      var j = Math.floor(rand() * (n + 1)), t = a[n];
      a[n] = a[j]; a[j] = t;
    }
    return a;
  };

  window.each = function (root, sel, fn) {
    Array.prototype.forEach.call(root.querySelectorAll(sel), fn);
  };
  window.on = function (root, sel, ev, fn) {
    window.each(root, sel, function (el) {
      el.addEventListener(ev, function (e) { fn(el, e); });
    });
  };
  window.setPressed = function (el, pressed) {
    if (el) el.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  };

  window.Pref = {
    get: function (k) { try { return localStorage.getItem(k) === '1'; } catch (e) { return false; } },
    set: function (k, val) { try { localStorage.setItem(k, val ? '1' : '0'); } catch (e) {} },
    toggle: function (k) { var v = !this.get(k); this.set(k, v); return v; }
  };
  window.VOCAB_KATA_KEY = 'jpd.vocab.kataOnly';   // trang từ vựng + #/all/vocab
  window.FLASH_KATA_KEY = 'jpd.flash.kataOnly';   // flashcard từ vựng

  /* Khóa "đã thuộc" của một từ (giữ nguyên định dạng cũ: w|k). */
  window.wordKey = function (w) { return w.w + '|' + (w.k || ''); };

  /* Từ katakana. Trước khi xét: bỏ ngoặc ví dụ （例：…） và hậu tố
     （する）／［する］／します. Tính là katakana khi phần còn lại chỉ gồm
     katakana, ー, ・, ～ và chữ Latin của từ mượn (ICカード, Tシャツ), có ít
     nhất một chữ katakana. Có kanji, hiragana hay chữ số thì không tính
     (100円ショップ, マッサージ器). */
  var KATA = /^[ァ-ヺ・ー～〜A-Za-zＡ-Ｚａ-ｚ]+$/;
  function kataCore(text) {
    return String(text || '')
      .replace(/（例[：:][^）]*）/g, '')
      .replace(/(（する）|［する］)$/, '')
      .replace(/します$/, '')
      .trim();
  }
  window.isKatakanaWord = function (w) {
    var s = kataCore(w && w.w);
    return KATA.test(s) && /[ァ-ヺ]/.test(s);
  };

  /* Nhóm động từ (trường vt: 'I' | 'II' | 'III'). */
  window.vtLabel = function (w) { return w && w.vt ? 'Động từ nhóm ' + w.vt : ''; };
  /* Nghĩa kèm nhãn: "Động từ nhóm I · đi" (đã escape). */
  window.vtMeaning = function (w, m) {
    var text = esc(m === undefined ? w.m : m);
    return w && w.vt ? '<span class="vt">' + esc(window.vtLabel(w)) + '</span> · ' + text : text;
  };
})();
