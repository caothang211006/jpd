/* 第８課 ありがとう
   Từ vựng: trang ことば trong sách (ảnh người dùng gửi), nghĩa dịch lại theo ngữ cảnh.
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-8', n: 8, jp: 'ありがとう', vi: 'Cảm ơn',

  vocab: [
    { g: 'うれしい出来事', w: 'お巡りさん', k: 'おまわりさん', m: 'Chú cảnh sát' },
    { g: 'うれしい出来事', w: 'クッキー', k: '', m: 'Bánh quy (cookie)' },
    { g: 'うれしい出来事', w: '（お）団子', k: '（お）だんご', m: 'Bánh dango (bánh viên xiên que)' },
    { g: 'うれしい出来事', w: '肉じゃが', k: 'にくじゃが', m: 'Món thịt hầm khoai tây' },
    { g: 'うれしい出来事', w: '湖', k: 'みずうみ', m: 'Hồ' },
    { g: 'うれしい出来事', w: '～さん（例：駅員さん）', k: '～さん（れい：えきいんさん）', m: 'Anh/chị ~ (gọi người theo nghề; ví dụ: anh nhân viên nhà ga)' },
    { g: 'うれしい出来事', w: '送る', k: 'おくる', m: 'Đưa, tiễn (車でうちまで送る。— Đưa về nhà bằng xe hơi.)' },
    { g: 'うれしい出来事', w: '連れて行く', k: 'つれていく', m: 'Dẫn đi' },
    { g: 'うれしい出来事', w: '捕る', k: 'とる', m: 'Bắt' },
    { g: 'うれしい出来事', w: '直す', k: 'なおす', m: 'Sửa, chữa' },
    { g: 'うれしい出来事', w: '拾う', k: 'ひろう', m: 'Nhặt' },
    { g: 'うれしい出来事', w: '譲る', k: 'ゆずる', m: 'Nhường' },
    { g: 'うれしい出来事', w: '助ける', k: 'たすける', m: 'Giúp đỡ, cứu' },
    { g: 'うれしい出来事', w: '届ける', k: 'とどける', m: 'Mang đến, giao nộp' },
    { g: 'うれしい出来事', w: '迎えに来る', k: 'むかえにくる', m: 'Đến đón' },
    { g: 'うれしい出来事', w: 'そんなに', k: '', m: 'Đến mức đó, như thế' },
    { g: 'うれしい出来事', w: 'ふーん', k: '', m: 'Ừm, hừm (thán từ)' },

    { g: 'お世話になりました', w: '鏡', k: 'かがみ', m: 'Gương' },
    { g: 'お世話になりました', w: '花瓶', k: 'かびん', m: 'Bình hoa' },
    { g: 'お世話になりました', w: '教授', k: 'きょうじゅ', m: 'Giáo sư' },
    { g: 'お世話になりました', w: '近所', k: 'きんじょ', m: 'Hàng xóm, khu lân cận' },
    { g: 'お世話になりました', w: 'この間', k: 'このあいだ', m: 'Hôm trước, mới đây' },
    { g: 'お世話になりました', w: '資料', k: 'しりょう', m: 'Tài liệu' },
    { g: 'お世話になりました', w: '（お）茶碗', k: '（お）ちゃわん', m: 'Bát cơm' },
    { g: 'お世話になりました', w: '机', k: 'つくえ', m: 'Bàn học, bàn làm việc' },
    { g: 'お世話になりました', w: '人形', k: 'にんぎょう', m: 'Búp bê' },
    { g: 'お世話になりました', w: '部長', k: 'ぶちょう', m: 'Trưởng bộ phận' },
    { g: 'お世話になりました', w: '本棚', k: 'ほんだな', m: 'Giá sách' },
    { g: 'お世話になりました', w: '（お）礼', k: '（お）れい', m: 'Lời cảm ơn, quà cảm ơn' },
    { g: 'お世話になりました', w: '～先（例：アルバイト先）', k: '～さき（れい：アルバイトさき）', m: 'Nơi ~ (ví dụ: nơi làm thêm)' },
    { g: 'お世話になりました', w: 'いただく', k: '', m: 'Nhận (khiêm nhường ngữ của もらう)' },
    { g: 'お世話になりました', w: 'くださる', k: '', m: 'Cho (tôn kính ngữ của くれる)' },
    { g: 'お世話になりました', w: 'うれしい', k: '', m: 'Vui mừng' },
    { g: 'お世話になりました', w: '気持ちいい', k: 'きもちいい', m: 'Dễ chịu, sảng khoái' },
    { g: 'お世話になりました', w: '素敵（な）', k: 'すてき（な）', m: 'Tuyệt vời, đẹp' },
    { g: 'お世話になりました', w: 'どういたしまして', k: '', m: 'Không có gì' }
  ],

  grammar: [
    {
      pat: 'Ｖている間に、～',
      desc: 'Diễn tả một việc xảy ra trong khoảng thời gian một hành động khác đang tiếp diễn: “trong lúc đang ~, thì…”.',
      ex: [
        { jp: '友達を待っている間に、雨が降ってきました。', vi: 'Trong lúc đang đợi bạn thì trời đổ mưa.' },
        { jp: '料理をしている間に、電話が鳴りました。', vi: 'Trong lúc đang nấu ăn thì điện thoại reo.' }
      ]
    },
    {
      pat: 'イＡくします ／ ナＡ・Ｎにします',
      desc: 'Chủ động làm cho sự vật/tình huống trở nên như thế nào: イA bỏ い + く + します; ナA/N + に + します.',
      ex: [
        { jp: '部屋を明るくしました。', vi: 'Tôi đã làm cho căn phòng sáng sủa lên.' },
        { jp: 'コーヒーを甘くしました。', vi: 'Tôi đã pha cà phê ngọt lên.' },
        { jp: '花瓶をきれいにしました。', vi: 'Tôi đã làm cho lọ hoa trở nên đẹp.' }
      ]
    },
    {
      pat: 'Ｖてあげます',
      desc: 'Làm gì đó giúp cho người khác (chủ thể là “tôi” hoặc người ngang/dưới), mang sắc thái ban ơn nên cần dùng cẩn thận với người trên.',
      ex: [
        { jp: '私は近所の人に道を教えてあげました。', vi: 'Tôi đã chỉ đường giúp người hàng xóm.' },
        { jp: '友達に本を貸してあげました。', vi: 'Tôi đã cho bạn mượn sách.' }
      ]
    },
    {
      pat: 'Ｖてもらいます ／ Ｖていただきます',
      desc: 'Nhận được một hành động giúp đỡ từ người khác. いただきます là dạng khiêm nhường của もらいます, dùng khi người giúp là người trên.',
      ex: [
        { jp: '駅員に道を教えてもらいました。', vi: 'Tôi đã được nhân viên nhà ga chỉ đường cho.' },
        { jp: '先生に資料をコピーしていただきました。', vi: 'Tôi đã được thầy/cô photo tài liệu giúp cho.' }
      ]
    },
    {
      pat: 'Ｖてくれます ／ Ｖてくださいます',
      desc: 'Người khác làm gì đó cho “tôi” (hoặc người trong nhóm của tôi) một cách tự nguyện. くださいます là dạng kính ngữ của くれます, dùng khi người làm ơn là người trên.',
      ex: [
        { jp: '近所の人が駅まで送ってくれました。', vi: 'Người hàng xóm đã đưa tôi ra tận ga.' },
        { jp: '教授が資料を貸してくださいました。', vi: 'Giáo sư đã cho tôi mượn tài liệu.' }
      ]
    },
    {
      pat: 'いただきます ／ くださいます（nhận đồ vật）',
      desc: 'Khi dùng trực tiếp với danh từ (không phải sau Ｖて), いただきます nghĩa là “nhận được” (khiêm nhường của もらいます) còn くださいます nghĩa là “cho” (kính ngữ của くれます).',
      ex: [
        { jp: '先生から花瓶をいただきました。', vi: 'Tôi đã nhận được lọ hoa từ thầy/cô.' },
        { jp: '部長がおみやげをくださいました。', vi: 'Trưởng phòng đã cho tôi quà.' }
      ]
    }
  ],

  kanji: []
});
