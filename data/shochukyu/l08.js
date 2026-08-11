/* 第８課 ありがとう
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-8', n: 8, jp: 'ありがとう', vi: 'Cảm ơn',

  vocab: [
    { g: '話読聞書', w: '明るい', k: 'あかるい', m: 'Sáng sủa' },
    { g: '話読聞書', w: 'うれしい', k: '', m: 'Vui mừng' },

    { g: 'うれしい出来事', w: '（お）団子', k: '（お）だんご', m: 'Bánh dango (viên bột)' },
    { g: 'うれしい出来事', w: '肉じゃが', k: 'にくじゃが', m: 'Món thịt hầm khoai tây' },
    { g: 'うれしい出来事', w: '湖', k: 'みずうみ', m: 'Hồ nước' },
    { g: 'うれしい出来事', w: '運転手', k: 'うんてんしゅ', m: 'Lái xe' },
    { g: 'うれしい出来事', w: '駅員', k: 'えきいん', m: 'Nhân viên nhà ga' },
    { g: 'うれしい出来事', w: 'お巡りさん', k: 'おまわりさん', m: 'Cán bộ tuần tra' },
    { g: 'うれしい出来事', w: '～さん（例：駅員さん）', k: '', m: 'Nhân viên…, cán bộ… (ví dụ: nhân viên nhà ga)' },
    { g: 'うれしい出来事', w: '送る', k: 'おくる', m: 'Đưa, tiễn' },
    { g: 'うれしい出来事', w: '直す', k: 'なおす', m: 'Sửa chữa' },
    { g: 'うれしい出来事', w: '譲る', k: 'ゆずる', m: 'Nhường' },
    { g: 'うれしい出来事', w: '連れて行く', k: 'つれていく', m: 'Đưa đi' },
    { g: 'うれしい出来事', w: '教える', k: 'おしえる', m: 'Dạy, chỉ' },
    { g: 'うれしい出来事', w: '拾う', k: 'ひろう', m: 'Nhặt' },
    { g: 'うれしい出来事', w: '届ける', k: 'とどける', m: 'Gửi đến' },
    { g: 'うれしい出来事', w: '迎えに来る', k: 'むかえにくる', m: 'Đến đón' },
    { g: 'うれしい出来事', w: '捕る', k: 'とる', m: 'Tóm, bắt' },
    { g: 'うれしい出来事', w: 'そんなに', k: '', m: 'Đến mức như thế' },

    { g: 'お世話になりました', w: '花瓶', k: 'かびん', m: 'Lọ hoa' },
    { g: 'お世話になりました', w: '茶碗', k: 'ちゃわん', m: 'Cái bát' },
    { g: 'お世話になりました', w: '机', k: 'つくえ', m: 'Cái bàn' },
    { g: 'お世話になりました', w: '本棚', k: 'ほんだな', m: 'Giá sách' },
    { g: 'お世話になりました', w: '近所', k: 'きんじょ', m: 'Hàng xóm' },
    { g: 'お世話になりました', w: '～先（例：アルバイト先）', k: '～さき（れい：アルバイトさき）', m: 'Nơi… (ví dụ: nơi làm thêm)' },
    { g: 'お世話になりました', w: '教授', k: 'きょうじゅ', m: 'Giáo sư' },
    { g: 'お世話になりました', w: '部長', k: 'ぶちょう', m: 'Trưởng phòng (bộ phận)' },
    { g: 'お世話になりました', w: '資料', k: 'しりょう', m: 'Tài liệu' },
    { g: 'お世話になりました', w: 'いただく', k: '', m: 'Nhận được (khiêm nhường)' },
    { g: 'お世話になりました', w: 'くださる', k: '', m: 'Cho (kính ngữ)' },

    { g: 'もう一度聞こう', w: 'どういたしまして', k: '', m: 'Không có chi' },
    { g: 'もう一度聞こう', w: 'チヂミ', k: '', m: 'Món Chijimi (bánh kếp Hàn Quốc)' },
    { g: 'もう一度聞こう', w: '飾る', k: 'かざる', m: 'Trang trí' },
    { g: 'もう一度聞こう', w: '乾杯', k: 'かんぱい', m: 'Cạn chén, chúc mừng' }
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
