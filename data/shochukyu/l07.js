/* 第７課 西川さんの家へ
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-7', n: 7, jp: '西川さんの家', vi: 'Nhà anh Nishikawa',

  vocab: [
    { g: '話読聞書', w: '相手', k: 'あいて', m: 'Đối phương' },
    { g: '話読聞書', w: '習慣', k: 'しゅうかん', m: 'Tập quán, thói quen' },
    { g: '話読聞書', w: '違い', k: 'ちがい', m: 'Sự khác, sai khác' },
    { g: '話読聞書', w: '驚く', k: 'おどろく', m: 'Ngạc nhiên' },
    { g: '話読聞書', w: '失礼（な）', k: 'しつれい', m: 'Vô lễ' },
    { g: '話読聞書', w: 'もう一度', k: 'もういちど', m: 'Thêm một lần nữa' },

    { g: '初めての訪問', w: '会議', k: 'かいぎ', m: 'Buổi họp' },
    { g: '初めての訪問', w: '課長', k: 'かちょう', m: 'Trưởng phòng' },
    { g: '初めての訪問', w: '社長', k: 'しゃちょう', m: 'Giám đốc' },
    { g: '初めての訪問', w: 'ご存じ', k: 'ごぞんじ', m: 'Biết (kính ngữ)' },
    { g: '初めての訪問', w: 'どなた', k: '', m: 'Vị nào, ai' },
    { g: '初めての訪問', w: 'ミステリー', k: '', m: 'Huyền bí, bí ẩn' },
    { g: '初めての訪問', w: '出身', k: 'しゅっしん', m: 'Xuất thân' },
    { g: '初めての訪問', w: '頃', k: 'ごろ', m: 'Khoảng (thời gian)' },
    { g: '初めての訪問', w: 'いらっしゃる', k: '', m: 'Đi, đến, ở (kính ngữ)' },
    { g: '初めての訪問', w: 'おっしゃる', k: '', m: 'Nói (kính ngữ)' },
    { g: '初めての訪問', w: 'ご覧になる', k: 'ごらんになる', m: 'Xem, nhìn (kính ngữ)' },
    { g: '初めての訪問', w: 'なさる', k: '', m: 'Làm (kính ngữ)' },
    { g: '初めての訪問', w: '召し上がる', k: 'めしあがる', m: 'Ăn, uống (kính ngữ)' },
    { g: '初めての訪問', w: '出席（する）', k: 'しゅっせき', m: 'Có mặt, tham dự' },
    { g: '初めての訪問', w: '退院（する）', k: 'たいいん', m: 'Xuất viện' },

    { g: '一緒に作りましょう', w: 'このくらい', k: '', m: 'Khoảng như thế này' },
    { g: '一緒に作りましょう', w: '皮', k: 'かわ', m: 'Vỏ, da' },
    { g: '一緒に作りましょう', w: 'キャベツ', k: '', m: 'Bắp cải' },
    { g: '一緒に作りましょう', w: 'ジャガイモ', k: '', m: 'Khoai tây' },
    { g: '一緒に作りましょう', w: '大根', k: 'だいこん', m: 'Củ cải' },
    { g: '一緒に作りましょう', w: 'タマネギ', k: '', m: 'Hành tây' },
    { g: '一緒に作りましょう', w: 'ニンジン', k: '', m: 'Cà rốt' },
    { g: '一緒に作りましょう', w: 'ネギ', k: '', m: 'Hành' },
    { g: '一緒に作りましょう', w: '半分', k: 'はんぶん', m: 'Một nửa' },
    { g: '一緒に作りましょう', w: 'カップ', k: '', m: 'Cái chén, cốc' },
    { g: '一緒に作りましょう', w: 'クリーム', k: '', m: 'Kem' },
    { g: '一緒に作りましょう', w: 'ゼリー', k: '', m: 'Thạch' },
    { g: '一緒に作りましょう', w: 'ソース', k: '', m: 'Nước sốt' },
    { g: '一緒に作りましょう', w: 'パスタ', k: '', m: 'Mỳ Ý' },
    { g: '一緒に作りましょう', w: '味', k: 'あじ', m: 'Vị' },
    { g: '一緒に作りましょう', w: 'はちみつ', k: '', m: 'Mật ong' },
    { g: '一緒に作りましょう', w: 'みそ汁', k: 'みそしる', m: 'Canh tương' },
    { g: '一緒に作りましょう', w: '火', k: 'ひ', m: 'Lửa' },
    { g: '一緒に作りましょう', w: '強火', k: 'つよび', m: 'Lửa to' },
    { g: '一緒に作りましょう', w: '弱火', k: 'よわび', m: 'Lửa nhỏ' },
    { g: '一緒に作りましょう', w: 'ルー', k: '', m: 'Nước sốt kiểu Pháp (roux)' },
    { g: '一緒に作りましょう', w: 'グラム', k: '', m: 'Gram' },
    { g: '一緒に作りましょう', w: 'できあがり', k: '', m: 'Hoàn thành, xong' },
    { g: '一緒に作りましょう', w: 'むく', k: '', m: 'Bóc, gọt' },
    { g: '一緒に作りましょう', w: '焼く', k: 'やく', m: 'Nướng' },
    { g: '一緒に作りましょう', w: '沸かす', k: 'わかす', m: 'Đun sôi' },
    { g: '一緒に作りましょう', w: '冷やす', k: 'ひやす', m: 'Làm lạnh' },
    { g: '一緒に作りましょう', w: '煮る', k: 'にる', m: 'Ninh nhừ' },
    { g: '一緒に作りましょう', w: 'ゆでる', k: '', m: 'Luộc' },
    { g: '一緒に作りましょう', w: '変わる', k: 'かわる', m: 'Thay đổi' },
    { g: '一緒に作りましょう', w: '沸騰（する）', k: 'ふっとう', m: 'Sôi' },
    { g: '一緒に作りましょう', w: '炒める', k: 'いためる', m: 'Xào' },
    { g: '一緒に作りましょう', w: '厚い', k: 'あつい', m: 'Dày' },
    { g: '一緒に作りましょう', w: '薄い', k: 'うすい', m: 'Mỏng, nhạt' },
    { g: '一緒に作りましょう', w: '濃い', k: 'こい', m: 'Đậm' },
    { g: '一緒に作りましょう', w: '細かい', k: 'こまかい', m: 'Nhỏ vụn, chi tiết' },
    { g: '一緒に作りましょう', w: '細い', k: 'ほそい', m: 'Thon, mảnh' },
    { g: '一緒に作りましょう', w: '弱い', k: 'よわい', m: 'Yếu' },
    { g: '一緒に作りましょう', w: 'まず', k: '', m: 'Trước tiên' },
    { g: '一緒に作りましょう', w: '次に', k: 'つぎに', m: 'Tiếp theo' },
    { g: '一緒に作りましょう', w: '最後に', k: 'さいごに', m: 'Cuối cùng' },

    { g: 'もう一度聞こう', w: '調味料', k: 'ちょうみりょう', m: 'Gia vị' },
    { g: 'もう一度聞こう', w: '鍋', k: 'なべ', m: 'Nồi, lẩu' },
    { g: 'もう一度聞こう', w: '肉じゃが', k: 'にくじゃが', m: 'Món thịt hầm khoai tây' },
    { g: 'もう一度聞こう', w: '遠慮（する）', k: 'えんりょ', m: 'Giữ ý, làm khách' },
    { g: 'もう一度聞こう', w: 'もちろん', k: '', m: 'Tất nhiên' },
    { g: 'もう一度聞こう', w: 'だいたい', k: '', m: 'Đại loại, đại khái' },
    { g: 'もう一度聞こう', w: 'お邪魔します', k: 'おじゃまします', m: 'Xin phép được làm phiền (khi vào nhà người khác)' },
    { g: 'もう一度聞こう', w: 'よくいらっしゃいました', k: '', m: 'Chào mừng anh (chị) đã tới' }
  ],

  grammar: [
    {
      pat: 'Ｖてあります（hoàn thành）',
      desc: 'Diễn tả trạng thái đã được ai đó chuẩn bị/hoàn thành từ trước, kết quả còn giữ nguyên đến hiện tại - rất hữu ích khi mô tả bếp đã chuẩn bị sẵn nguyên liệu.',
      ex: [
        { jp: '野菜はもう切ってあります。', vi: 'Rau đã được thái sẵn rồi.' },
        { jp: 'テーブルにお皿が並べてあります。', vi: 'Đĩa đã được xếp sẵn trên bàn.' }
      ]
    },
    {
      pat: '尊敬語（いらっしゃる・おっしゃる・召し上がる…）',
      desc: 'Nhóm động từ kính ngữ đặc biệt (không theo quy tắc おＶになります), dùng để nói về hành động của người trên/khách: いらっしゃる(đi/đến/ở), おっしゃる(nói), ご覧になる(xem), なさる(làm), 召し上がる(ăn/uống).',
      ex: [
        { jp: '社長は今、会議室にいらっしゃいます。', vi: 'Giám đốc bây giờ đang ở trong phòng họp ạ.' },
        { jp: 'コーヒーを召し上がりますか。', vi: 'Anh/chị dùng cà phê ạ?' },
        { jp: 'これは課長がおっしゃったことです。', vi: 'Đây là điều trưởng phòng đã nói ạ.' }
      ]
    },
    {
      pat: 'おＶになります',
      desc: 'Cấu trúc kính ngữ tổng quát dùng cho động từ chưa có dạng đặc biệt: お + thân Vます + になります.',
      ex: [
        { jp: '先生はもうお帰りになりました。', vi: 'Thầy/cô đã về rồi ạ.' },
        { jp: 'この本、もうお読みになりましたか。', vi: 'Cuốn sách này thầy/cô đã đọc chưa ạ?' }
      ]
    },
    {
      pat: 'おＶします ／ ごＮします',
      desc: 'Khiêm nhường ngữ (謙譲語): dùng để hạ thấp hành động của bản thân khi nói với người trên, thể hiện sự tôn trọng đối phương.',
      ex: [
        { jp: '私がお持ちします。', vi: 'Để tôi mang giúp ạ.' },
        { jp: '私からご説明します。', vi: 'Để tôi giải thích ạ.' }
      ]
    },
    {
      pat: 'イＡくＶ ／ ナＡ・ＮにＶ（cách dùng phó từ của tính từ）',
      desc: 'Chuyển tính từ thành phó từ để bổ nghĩa cho động từ đứng sau: イA bỏ い + く; ナA/N + に.',
      ex: [
        { jp: '野菜を細かく切ります。', vi: 'Thái rau nhỏ vụn.' },
        { jp: 'スープを熱くします。', vi: 'Làm cho súp nóng lên.' },
        { jp: '部屋をきれいにします。', vi: 'Làm cho căn phòng sạch sẽ.' }
      ]
    }
  ],

  kanji: []
});
