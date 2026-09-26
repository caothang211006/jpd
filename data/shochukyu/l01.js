/* 第１課 新しい一歩
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-1', n: 1, jp: '新しい一歩', vi: 'Bước đi mới',

  vocab: [
    { g: 'アルバイトを探す', w: '方', k: 'かた', m: 'Người (cách nói lịch sự)' },
    { g: 'アルバイトを探す', w: '者', k: 'もの', m: 'Người (cách nói khiêm nhường)' },
    { g: 'アルバイトを探す', w: 'チラシ', k: '', m: 'Tờ rơi' },
    { g: 'アルバイトを探す', w: 'ホームページ', k: '', m: 'Homepage (Trang web)' },
    { g: 'アルバイトを探す', w: '学生証', k: 'がくせいしょう', m: 'Thẻ sinh viên' },
    { g: 'アルバイトを探す', w: '資格外活動許可書', k: 'しかくがいかつどうきょかしょ', m: 'Giấy phép hoạt động làm thêm ngoài tư cách lưu trú' },
    { g: 'アルバイトを探す', w: '面接', k: 'めんせつ', m: 'Phỏng vấn' },
    { g: 'アルバイトを探す', w: '履歴書', k: 'りれきしょ', m: 'Sơ yếu lý lịch' },
    { g: 'アルバイトを探す', w: '半年', k: 'はんとし', m: 'Nửa năm' },
    { g: 'アルバイトを探す', w: '（お）刺身', k: '（お）さしみ', m: 'Món Sashimi' },
    { g: 'アルバイトを探す', w: '日常会話', k: 'にちじょうかいわ', m: 'Hội thoại hàng ngày' },
    { g: 'アルバイトを探す', w: '問い合わせ', k: 'といあわせ', m: 'Sự hỏi thăm, liên hệ hỏi' },
    { g: 'アルバイトを探す', w: '希望（する）', k: 'きぼう', m: 'Nguyện vọng, mong muốn' },
    { g: 'アルバイトを探す', w: '募集（する）', k: 'ぼしゅう', m: 'Tuyển dụng' },
    { g: 'アルバイトを探す', w: '思い出す', k: 'おもいだす', m: 'Nhớ ra' },
    { g: 'アルバイトを探す', w: '入力（する）', k: 'にゅうりょく', m: 'Nhập (dữ liệu) vào' },
    { g: 'アルバイトを探す', w: 'それでは', k: '', m: 'Vậy thì (cách nói lịch sự)' },
    { g: 'アルバイトを探す', w: 'では', k: '', m: 'Vậy thì' },
    { g: 'アルバイトを探す', w: 'いらっしゃいます', k: '', m: 'Đến, ở, đi (kính ngữ)' },
    { g: 'アルバイトを探す', w: '申します', k: 'もうします', m: 'Được gọi là, xin tự giới thiệu là (khiêm nhường)' },
    { g: 'アルバイトを探す', w: '参ります', k: 'まいります', m: 'Đến, đi (khiêm nhường)' },
    { g: 'アルバイトを探す', w: '少々お待ちください', k: 'しょうしょうおまちください', m: 'Xin chờ một chút' },
    { g: 'アルバイトを探す', w: 'お先に失礼します', k: 'おさきにしつれいします', m: 'Xin phép đi trước / về trước' },
    { g: 'アルバイトを探す', w: 'こちらへどうぞ', k: '', m: 'Xin mời đi lối này' },
    { g: 'アルバイトを探す', w: '失礼します', k: 'しつれいします', m: 'Xin phép / xin lỗi (khi vào, ra)' },
    { g: 'アルバイトを探す', w: 'よろしくお願いいたします', k: '', m: 'Rất mong nhận được sự giúp đỡ, chỉ bảo (thể lịch sự)' },

    { g: '新しい友達', w: '楽器', k: 'がっき', m: 'Nhạc cụ' },
    { g: '新しい友達', w: '建物', k: 'たてもの', m: 'Tòa nhà' },
    { g: '新しい友達', w: '歴史', k: 'れきし', m: 'Lịch sử' },
    { g: '新しい友達', w: '意見', k: 'いけん', m: 'Ý kiến' },
    { g: '新しい友達', w: 'お年寄り', k: 'おとしより', m: 'Người già' },
    { g: '新しい友達', w: '言葉', k: 'ことば', m: 'Từ vựng, ngôn ngữ' },
    { g: '新しい友達', w: '自分', k: 'じぶん', m: 'Bản thân' },
    { g: '新しい友達', w: '話', k: 'はなし', m: 'Câu chuyện' },
    { g: '新しい友達', w: '野外ライブ', k: 'やがいライブ', m: 'Buổi biểu diễn nhạc sống ngoài trời' },
    { g: '新しい友達', w: '～個', k: '～こ', m: '~ cái (đơn vị đếm đồ vật)' },
    { g: '新しい友達', w: '聞き取る', k: 'ききとる', m: 'Nghe (và bắt được nội dung)' },
    { g: '新しい友達', w: '覚える', k: 'おぼえる', m: 'Nhớ, ghi nhớ' },
    { g: '新しい友達', w: '応援（する）', k: 'おうえん', m: 'Cổ vũ, ủng hộ' },
    { g: '新しい友達', w: 'サイクリング（する）', k: '', m: 'Đi xe đạp (dạo chơi)' },
    { g: '新しい友達', w: '遅い', k: 'おそい', m: 'Chậm' },
    { g: '新しい友達', w: '速い', k: 'はやい', m: 'Nhanh' },
    { g: '新しい友達', w: 'つまらない', k: '', m: 'Chán' },
    { g: '新しい友達', w: '得意（な）', k: 'とくい', m: 'Giỏi, sở trường' },
    { g: '新しい友達', w: '苦手（な）', k: 'にがて', m: 'Kém, sợ (không giỏi)' },
    { g: '新しい友達', w: '無理（な）', k: 'むり', m: 'Không thể, quá sức' },
    { g: '新しい友達', w: '朝早く', k: 'あさはやく', m: 'Sáng sớm' },

    { g: 'もう一度聞こう', w: '字幕', k: 'じまく', m: 'Phụ đề' },
    { g: 'もう一度聞こう', w: '大好き（な）', k: 'だいすき', m: 'Rất thích' },
    { g: 'もう一度聞こう', w: 'まず', k: '', m: 'Trước tiên' }
  ],

  grammar: [
    {
      pat: 'いらっしゃいます／申します／参ります',
      desc: 'Ba động từ kính ngữ - khiêm nhường cơ bản, rất hay dùng khi tự giới thiệu bản thân hoặc trong phỏng vấn xin việc. いらっしゃいます là kính ngữ của 来ます/行きます/います (dùng cho đối phương); 申します là khiêm nhường ngữ của 言います (dùng khi nói tên mình); 参ります là khiêm nhường ngữ của 来ます/行きます (dùng khi nói về hành động của mình).',
      ex: [
        { jp: '初めまして。グエンと申します。', vi: 'Rất vui được gặp anh/chị. Tôi tên là Nguyễn ạ.' },
        { jp: '明日、９時に会社へ参ります。', vi: 'Ngày mai tôi sẽ đến công ty lúc 9 giờ.' },
        { jp: '田中様はいらっしゃいますか。', vi: 'Anh Tanaka có ở đó không ạ?' }
      ]
    },
    {
      pat: '～ので、～',
      desc: 'Nêu lý do một cách lịch sự, khách quan hơn so với ～から。 Hay dùng trong hội thoại trang trọng như phỏng vấn, xin phép.',
      ex: [
        { jp: '日本語が少し話せますので、大丈夫です。', vi: 'Vì tôi có thể nói được một chút tiếng Nhật nên không sao ạ.' },
        { jp: 'アルバイトは初めてですので、いろいろ教えてください。', vi: 'Vì đây là lần đầu tôi đi làm thêm nên xin hãy chỉ bảo cho tôi nhiều điều ạ.' },
        { jp: '今日は用事がありますので、お先に失礼します。', vi: 'Hôm nay tôi có việc bận nên xin phép về trước ạ.' }
      ]
    },
    {
      pat: 'Động từ khả năng（可能動詞）',
      desc: 'Thể hiện khả năng làm được việc gì. Nhóm 1: đổi đuôi u → e + ます (話す→話せます); Nhóm 2: bỏ ます, thêm られます (食べます→食べられます); Nhóm 3: します→できます、来ます→来られます。',
      ex: [
        { jp: '日常会話ができます。', vi: 'Tôi có thể giao tiếp hội thoại hàng ngày.' },
        { jp: '私は漢字が少し読めます。', vi: 'Tôi có thể đọc được một chút chữ Hán.' },
        { jp: '土曜日と日曜日は働けます。', vi: 'Thứ bảy và chủ nhật tôi có thể làm việc được.' }
      ]
    },
    {
      pat: '～なら',
      desc: 'Nêu điều kiện dựa trên một chủ đề đối phương vừa nói tới: “nếu là ~ thì…”. Hay dùng để đưa ra gợi ý, lời khuyên liên quan tới chủ đề đó.',
      ex: [
        { jp: 'アルバイトを探しているなら、このホームページがいいですよ。', vi: 'Nếu bạn đang tìm việc làm thêm thì trang web này tốt đấy.' },
        { jp: '面接ならスーツを着たほうがいいです。', vi: 'Nếu là phỏng vấn thì nên mặc comple.' },
        { jp: 'その時間なら、私も行けます。', vi: 'Nếu là giờ đó thì tôi cũng có thể đi được.' }
      ]
    },
    {
      pat: '～のが／～のは Ａ',
      desc: 'Danh từ hóa một mệnh đề bằng の, dùng làm chủ ngữ (のが) hoặc chủ đề (のは) cho câu có tính từ, để nói về sở thích, sự dễ/khó của một hành động.',
      ex: [
        { jp: '新しい人と話すのが好きです。', vi: 'Tôi thích nói chuyện với người mới.' },
        { jp: '朝早く起きるのは苦手です。', vi: 'Việc dậy sớm buổi sáng thì tôi kém (không giỏi).' },
        { jp: '楽器を演奏するのが得意です。', vi: 'Tôi có sở trường chơi nhạc cụ.' }
      ]
    }
  ],

    kanji: [
    { c: '仕', m: 'SĨ — làm việc, phụng sự', on: 'シ', kun: 'つか・える',
      w: [{ jp: '仕事', k: 'しごと', vi: 'công việc' }] },
    { c: '事', m: 'SỰ — việc, sự việc', on: 'ジ', kun: 'こと',
      w: [{ jp: '仕事', k: 'しごと', vi: 'công việc' }, { jp: '事故', k: 'じこ', vi: 'tai nạn, sự cố' },
          { jp: '事務所', k: 'じむしょ', vi: 'văn phòng' }, { jp: '大事', k: 'だいじ', vi: 'quan trọng' },
          { jp: '行事', k: 'ぎょうじ', vi: 'sự kiện, hoạt động' }] },
    { c: '働', m: 'ĐỘNG — làm việc, lao động', on: 'ドウ', kun: 'はたら・く',
      w: [{ jp: '働く', k: 'はたらく', vi: 'làm việc' }] },
    { c: '教', m: 'GIÁO — dạy', on: 'キョウ', kun: 'おし・える',
      w: [{ jp: '教える', k: 'おしえる', vi: 'dạy' }, { jp: '教室', k: 'きょうしつ', vi: 'phòng học' }] },
    { c: '泳', m: 'VỊNH — bơi', on: 'エイ', kun: 'およ・ぐ',
      w: [{ jp: '水泳', k: 'すいえい', vi: 'môn bơi lội' }, { jp: '泳ぐ', k: 'およぐ', vi: 'bơi' }] },
    { c: '英', m: 'ANH — (nước) Anh, ưu tú', on: 'エイ', kun: '',
      w: [{ jp: '英語', k: 'えいご', vi: 'tiếng Anh' }] },
    { c: '運', m: 'VẬN — vận chuyển, vận may', on: 'ウン', kun: 'はこ・ぶ',
      w: [{ jp: '運転', k: 'うんてん', vi: 'lái xe' }, { jp: '運ぶ', k: 'はこぶ', vi: 'vận chuyển, mang đi' }] },
    { c: '転', m: 'CHUYỂN — xoay, lăn, chuyển', on: 'テン', kun: 'ころ・ぶ',
      w: [{ jp: '運転', k: 'うんてん', vi: 'lái xe' }, { jp: '自転車', k: 'じてんしゃ', vi: 'xe đạp' },
          { jp: '転ぶ', k: 'ころぶ', vi: 'ngã, té' }] },
    { c: '方', m: 'PHƯƠNG — phía, cách, người (kính ngữ)', on: 'ホウ', kun: 'かた',
      w: [{ jp: 'この方', k: 'このかた', vi: 'vị này (kính ngữ)' }, { jp: '読み方', k: 'よみかた', vi: 'cách đọc' },
          { jp: '夕方', k: 'ゆうがた', vi: 'buổi chiều tối' }, { jp: '方法', k: 'ほうほう', vi: 'phương pháp' },
          { jp: '行方', k: 'ゆくえ', vi: 'tung tích, nơi đến' }] },
    { c: '留', m: 'LƯU — lưu lại, ở lại', on: 'リュウ、ル', kun: 'と・める',
      w: [{ jp: '留学', k: 'りゅうがく', vi: 'du học' }, { jp: '留守', k: 'るす', vi: 'vắng nhà' }] },
    { c: '可', m: 'KHẢ — được, đúng, khả thi', on: 'カ', kun: '',
      w: [{ jp: '可', k: 'か', vi: 'được, đúng, khả thi' }, { jp: '不可', k: 'ふか', vi: 'không được, sai, không khả thi' }] },
    { c: '給', m: 'CẤP — cấp, phát', on: 'キュウ', kun: '',
      w: [{ jp: '時給', k: 'じきゅう', vi: 'lương theo giờ' }] },
    { c: '履', m: 'LÝ — thực hiện, mang (giày)', on: 'リ', kun: 'は・く',
      w: [{ jp: '履歴書', k: 'りれきしょ', vi: 'sơ yếu lý lịch' }] },
    { c: '歴', m: 'LỊCH — trải qua, lịch sử', on: 'レキ', kun: '',
      w: [{ jp: '履歴書', k: 'りれきしょ', vi: 'sơ yếu lý lịch' }] },
    { c: '書', m: 'THƯ — viết, sách', on: 'ショ', kun: 'か・く',
      w: [{ jp: '履歴書', k: 'りれきしょ', vi: 'sơ yếu lý lịch' }] }
  ]
});
