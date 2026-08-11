/* Catalogue of both textbooks.
   `file` points at the lesson's content script; leave it null and the card
   shows up greyed out as "chưa có nội dung" until a file is added. */
(function () {

  JPD.book({
    id: 'shokyu',
    name: 'できる日本語 初級 — Sách đỏ',
    tone: 'red',
    lessons: [
      { id: 'shokyu-1',  n: 1,  jp: 'はじめまして',   vi: 'Làm quen',
        file: 'data/shokyu/l01.js', words: 47, grammar: 9, kanji: 36 },
      { id: 'shokyu-2',  n: 2,  jp: '買い物・食事',   vi: 'Mua sắm & ăn uống',
        file: 'data/shokyu/l02.js', words: 77, grammar: 9, kanji: 30 },
      { id: 'shokyu-3',  n: 3,  jp: 'スケジュール',   vi: 'Lịch trình',
        file: 'data/shokyu/l03.js', words: 78, grammar: 10, kanji: 47 },
      { id: 'shokyu-4',  n: 4,  jp: '私の国・町',     vi: 'Đất nước & thành phố của tôi',
        file: 'data/shokyu/l04.js', words: 68, grammar: 8, kanji: 39 },
      { id: 'shokyu-5',  n: 5,  jp: '休みの日',       vi: 'Ngày nghỉ',
        file: 'data/shokyu/l05.js', words: 59, grammar: 8, kanji: 39 },
      { id: 'shokyu-6',  n: 6,  jp: '一緒に！',       vi: 'Cùng nhau!',
        file: 'data/shokyu/l06.js', words: 55, grammar: 14, kanji: 25 },
      { id: 'shokyu-7',  n: 7,  jp: '友達の家で',     vi: 'Ở nhà bạn',
        file: 'data/shokyu/l07.js', words: 69, grammar: 9, kanji: 33 },
      { id: 'shokyu-8',  n: 8,  jp: '大切な人',       vi: 'Người quan trọng',
        file: 'data/shokyu/l08.js', words: 81, grammar: 9, kanji: 12 },
      { id: 'shokyu-9',  n: 9,  jp: '好きなこと',     vi: 'Điều mình thích',
        file: 'data/shokyu/l09.js', words: 61, grammar: 7, kanji: 10 },
      { id: 'shokyu-10', n: 10, jp: 'バスツアー',     vi: 'Tour xe buýt',
        file: 'data/shokyu/l10.js', words: 69, grammar: 10, kanji: 9 },
      { id: 'shokyu-11', n: 11, jp: '私の生活',       vi: 'Cuộc sống của tôi',
        file: 'data/shokyu/l11.js', words: 49, grammar: 6, kanji: 10 },
      { id: 'shokyu-12', n: 12, jp: '病気・けが',     vi: 'Ốm đau & chấn thương',
        file: 'data/shokyu/l12.js', words: 52, grammar: 6, kanji: 31 },
      { id: 'shokyu-13', n: 13, jp: '私のおすすめ',   vi: 'Gợi ý của tôi',
        file: 'data/shokyu/l13.js', words: 40, grammar: 7, kanji: 23 },
      { id: 'shokyu-14', n: 14, jp: '国の習慣',       vi: 'Phong tục của đất nước',
        file: 'data/shokyu/l14.js', words: 62, grammar: 7, kanji: 30 },
      { id: 'shokyu-15', n: 15, jp: 'テレビ・雑誌から', vi: 'Từ TV & tạp chí',
        file: 'data/shokyu/l15.js', words: 48, grammar: 6, kanji: 28 }
    ]
  });

  JPD.book({
    id: 'shochukyu',
    name: 'できる日本語 初中級 — Sách vàng',
    tone: 'gold',
    lessons: [
      { id: 'shochukyu-1',  n: 1,  jp: '新しい一歩',           vi: 'Bước đi mới',
        file: 'data/shochukyu/l01.js', words: 50, grammar: 5, kanji: 0 },
      { id: 'shochukyu-2',  n: 2,  jp: '楽しいショッピング',   vi: 'Mua sắm vui vẻ',
        file: 'data/shochukyu/l02.js', words: 64, grammar: 8, kanji: 0 },
      { id: 'shochukyu-3',  n: 3,  jp: '私の目標',             vi: 'Mục tiêu của tôi',
        file: 'data/shochukyu/l03.js', words: 64, grammar: 7, kanji: 0 },
      { id: 'shochukyu-4',  n: 4,  jp: '住んでいる町',         vi: 'Thành phố đang sống',
        file: 'data/shochukyu/l04.js', words: 49, grammar: 8, kanji: 0 },
      { id: 'shochukyu-5',  n: 5,  jp: '大変な１日',           vi: 'Một ngày vất vả',
        file: 'data/shochukyu/l05.js', words: 53, grammar: 6, kanji: 0 },
      { id: 'shochukyu-6',  n: 6,  jp: '旅行に行こう',         vi: 'Cùng đi du lịch',
        file: 'data/shochukyu/l06.js', words: 62, grammar: 5, kanji: 0 },
      { id: 'shochukyu-7',  n: 7,  jp: '西川さんの家',         vi: 'Nhà anh Nishikawa',
        file: 'data/shochukyu/l07.js', words: 70, grammar: 5, kanji: 0 },
      { id: 'shochukyu-8',  n: 8,  jp: 'ありがとう',           vi: 'Cảm ơn',
        file: 'data/shochukyu/l08.js', words: 34, grammar: 6, kanji: 0 },
      { id: 'shochukyu-9',  n: 9,  jp: 'アルバイト先で',       vi: 'Ở nơi làm thêm',
        file: 'data/shochukyu/l09.js', words: 87, grammar: 9, kanji: 0 },
      { id: 'shochukyu-10', n: 10, jp: '旅行に行って',         vi: 'Đi du lịch về',
        file: 'data/shochukyu/l10.js', words: 88, grammar: 7, kanji: 0 },
      { id: 'shochukyu-11', n: 11, jp: '地域社会の中で',       vi: 'Trong cộng đồng địa phương',
        file: 'data/shochukyu/l11.js', words: 45, grammar: 6, kanji: 0 },
      { id: 'shochukyu-12', n: 12, jp: '私の健康法',           vi: 'Cách giữ sức khỏe của tôi',
        file: 'data/shochukyu/l12.js', words: 59, grammar: 5, kanji: 0 },
      { id: 'shochukyu-13', n: 13, jp: '親の気持ち・子の気持ち', vi: 'Lòng cha mẹ, lòng con cái',
        file: 'data/shochukyu/l13.js', words: 44, grammar: 10, kanji: 0 },
      { id: 'shochukyu-14', n: 14, jp: 'イベント・行事',       vi: 'Sự kiện & lễ hội',
        file: 'data/shochukyu/l14.js', words: 89, grammar: 6, kanji: 0 },
      { id: 'shochukyu-15', n: 15, jp: '気になるニュース',     vi: 'Tin tức đáng chú ý',
        file: 'data/shochukyu/l15.js', words: 57, grammar: 8, kanji: 0 }
    ]
  });

})();
