/* 第１２課 病気・けが
   Từ vựng: New words list (tài liệu của lớp).
   Ngữ pháp: 学習項目 trong syllabus chính thức của giáo trình (dekirunihongo.jp),
   vì lớp chưa phát bản tóm tắt ngữ pháp cho bài này.
   Kanji: tự tổng hợp từ các chữ xuất hiện lần đầu trong từ vựng của bài. */
JPD.lesson({
  id: 'shokyu-12', n: 12, jp: '病気・けが', vi: 'Ốm đau & chấn thương',

  vocab: [
    { g: '体の調子', w: 'けが', k: '', m: 'Vết thương' },
    { g: '体の調子', w: '食欲', k: 'しょくよく', m: 'Sự thèm ăn, sự ngon miệng' },
    { g: '体の調子', w: '調子', k: 'ちょうし', m: 'Tình trạng (sức khỏe, máy móc)' },
    { g: '体の調子', w: '熱', k: 'ねつ', m: 'Nhiệt độ / Sốt' },
    { g: '体の調子', w: '病気', k: 'びょうき', m: 'Bệnh, ốm' },
    { g: '体の調子', w: 'のど', k: '', m: 'Họng' },
    { g: '体の調子', w: '歯', k: 'は', m: 'Răng' },
    { g: '体の調子', w: '飲み会', k: 'のみかい', m: 'Bữa nhậu' },
    { g: '体の調子', w: '～度', k: '～ど', m: '～ độ' },
    { g: '体の調子', w: '治ります［治る］', k: 'なおります', m: 'Khỏi (bệnh)' },
    { g: '体の調子', w: '悪い', k: 'わるい', m: 'Xấu, tồi' },
    { g: '体の調子', w: '気持ちが悪い', k: 'きもちがわるい', m: 'Khó chịu (trong người)' },
    { g: '体の調子', w: '大丈夫（な）', k: 'だいじょうぶ（な）', m: 'Ổn, không sao' },
    { g: '体の調子', w: '早く', k: 'はやく', m: 'Sớm' },
    { g: '体の調子', w: 'おかげさまで', k: '', m: 'Ơn trời, nhờ trời' },
    { g: '体の調子', w: 'お大事に', k: 'おだいじに', m: 'Chúc chóng khỏe nhé! (nói với người ốm)' },
    { g: '体の調子', w: 'それはいけませんね', k: '', m: 'Thế thì gay go quá nhỉ! (chia sẻ)' },

    { g: 'アドバイス', w: 'アドバイス', k: '', m: 'Lời khuyên' },
    { g: 'アドバイス', w: 'シャワー', k: '', m: 'Vòi hoa sen' },
    { g: 'アドバイス', w: '睡眠', k: 'すいみん', m: 'Giấc ngủ, việc ngủ' },
    { g: 'アドバイス', w: '歯医者', k: 'はいしゃ', m: 'Nha sĩ' },
    { g: 'アドバイス', w: 'やけど', k: '', m: 'Bỏng, vết bỏng' },
    { g: 'アドバイス', w: 'こと', k: '', m: 'Việc' },
    { g: 'アドバイス', w: 'もの', k: '', m: 'Vật, đồ vật' },
    { g: 'アドバイス', w: '以上', k: 'いじょう', m: 'Trên, hơn' },
    { g: 'アドバイス', w: '出します［出す］', k: 'だします', m: 'Lấy ra, đưa ra; nói (声を出します)' },
    { g: 'アドバイス', w: '塗ります［塗る］', k: 'ぬります', m: 'Bôi, sơn' },
    { g: 'アドバイス', w: '浴びます［浴びる］', k: 'あびます', m: 'Tắm (vòi sen)' },
    { g: 'アドバイス', w: '出かけます［出かける］', k: 'でかけます', m: 'Đi ra ngoài' },
    { g: 'アドバイス', w: '運動します［運動する］', k: 'うんどうします', m: 'Tập thể dục' },
    { g: 'アドバイス', w: '固い', k: 'かたい', m: 'Cứng' },
    { g: 'アドバイス', w: '柔らかい', k: 'やわらかい', m: 'Mềm' },
    { g: 'アドバイス', w: '体にいい', k: 'からだにいい', m: 'Tốt cho sức khỏe' },
    { g: 'アドバイス', w: '自分で', k: 'じぶんで', m: 'Tự mình' },
    { g: 'アドバイス', w: 'できるだけ', k: '', m: 'Cố gắng hết sức, càng nhiều càng tốt' },
    { g: 'アドバイス', w: 'ゆっくり', k: '', m: 'Thong thả, từ từ' },

    { g: '病院で', w: '薬剤師', k: 'やくざいし', m: 'Dược sĩ' },
    { g: '病院で', w: '上着', k: 'うわぎ', m: 'Áo khoác' },
    { g: '病院で', w: 'コンタクトレンズ', k: '', m: 'Kính áp tròng' },
    { g: '病院で', w: '説明書', k: 'せつめいしょ', m: 'Sách hướng dẫn' },
    { g: '病院で', w: '（お）風呂', k: '（お）ふろ', m: 'Bồn tắm' },
    { g: '病院で', w: '保険証', k: 'ほけんしょう', m: 'Thẻ bảo hiểm' },
    { g: '病院で', w: '待合室', k: 'まちあいしつ', m: 'Phòng chờ' },
    { g: '病院で', w: '薬局', k: 'やっきょく', m: 'Hiệu thuốc' },
    { g: '病院で', w: '出します［出す］', k: 'だします', m: 'Xuất trình, nộp' },
    { g: '病院で', w: '脱ぎます［脱ぐ］', k: 'ぬぎます', m: 'Cởi' },
    { g: '病院で', w: '走ります［走る］', k: 'はしります', m: 'Chạy' },
    { g: '病院で', w: '待ちます［待つ］', k: 'まちます', m: 'Đợi, chờ' },
    { g: '病院で', w: '磨きます［磨く］', k: 'みがきます', m: 'Đánh (răng)' },
    { g: '病院で', w: '横になります［横になる］', k: 'よこになります', m: 'Nằm' },
    { g: '病院で', w: '準備します［準備する］', k: 'じゅんびします', m: 'Chuẩn bị' },
    { g: '病院で', w: 'かゆい', k: '', m: 'Ngứa' }
  ],

  grammar: [
    {
      pat: 'どうしたんですか',
      desc: 'Hỏi thăm khi thấy đối phương có vẻ khác thường: “Bạn bị làm sao thế?”. Là dạng hỏi của mẫu 〜んです.',
      ex: [
        { jp: 'どうしたんですか。', vi: 'Bạn bị làm sao thế?' },
        { jp: '顔色が悪いですよ。どうしたんですか。', vi: 'Sắc mặt bạn không tốt. Có chuyện gì thế?' }
      ]
    },
    {
      pat: '〜んです',
      desc: 'Dùng để giải thích lý do, tình huống, hoặc nhấn mạnh thông tin liên quan tới hoàn cảnh trước mắt. Động từ/イA giữ thể thường; ナA và N thêm な: 元気なんです、病気なんです.',
      ex: [
        { jp: '頭が痛いんです。', vi: '(Là vì) tôi bị đau đầu.' },
        { jp: '昨日から熱があるんです。', vi: 'Từ hôm qua tôi bị sốt.' },
        { jp: 'ちょっと調子が悪いんです。', vi: 'Tôi thấy trong người hơi khó chịu.' }
      ]
    },
    {
      pat: 'V-たほうがいいです',
      desc: 'Đưa ra lời khuyên: “nên làm ~”. Động từ chia thể た.',
      ex: [
        { jp: '早く寝たほうがいいですよ。', vi: 'Bạn nên đi ngủ sớm đấy.' },
        { jp: '病院へ行ったほうがいいですよ。', vi: 'Bạn nên đi bệnh viện thì hơn.' },
        { jp: '柔らかいものを食べたほうがいいです。', vi: 'Bạn nên ăn đồ mềm.' }
      ]
    },
    {
      pat: 'V-ないほうがいいです',
      desc: 'Lời khuyên phủ định: “không nên làm ~”. Động từ chia thể ない.',
      ex: [
        { jp: '今日はお風呂に入らないほうがいいです。', vi: 'Hôm nay bạn không nên tắm bồn.' },
        { jp: '運動しないほうがいいですよ。', vi: 'Bạn không nên vận động đâu.' },
        { jp: '固いものを食べないほうがいいです。', vi: 'Bạn không nên ăn đồ cứng.' }
      ]
    },
    {
      pat: 'Cách nói triệu chứng: 〜が痛いです／熱があります',
      desc: 'Mẫu câu thường dùng khi tả triệu chứng ở phòng khám hoặc với bạn bè.',
      ex: [
        { jp: 'のどが痛いです。', vi: 'Tôi bị đau họng.' },
        { jp: '熱が３８度あります。', vi: 'Tôi sốt 38 độ.' },
        { jp: '食欲がありません。', vi: 'Tôi không thấy thèm ăn.' },
        { jp: '気持ちが悪いです。', vi: 'Tôi thấy khó chịu trong người.' }
      ]
    },
    {
      pat: 'お大事に ／ それはいけませんね',
      desc: 'Hai câu giao tiếp cố định khi phản ứng với người đang ốm.',
      ex: [
        { jp: 'お大事に。', vi: 'Chúc bạn chóng khỏe.' },
        { jp: 'それはいけませんね。', vi: 'Thế thì gay go quá nhỉ.' },
        { jp: 'おかげさまで、もう治りました。', vi: 'Nhờ trời, tôi đã khỏi rồi.' }
      ]
    }
  ],

  // Đề xác nhận chính thức chưa có nguồn công khai để đối chiếu.
  exam: [],

  kanji: [
    { c: '欲', m: 'DỤC — muốn, ham muốn', on: 'ヨク', kun: 'ほ・しい',
      w: [{ jp: '食欲', k: 'しょくよく', vi: 'sự thèm ăn, sự ngon miệng' }] },
    { c: '調', m: 'ĐIỀU — điều tra; điều chỉnh', on: 'チョウ', kun: 'しら・べる',
      w: [{ jp: '調子', k: 'ちょうし', vi: 'tình trạng (sức khỏe, máy móc)' }] },
    { c: '歯', m: 'XỈ — răng', on: 'シ', kun: 'は',
      w: [{ jp: '歯', k: 'は', vi: 'răng' }, { jp: '歯医者', k: 'はいしゃ', vi: 'nha sĩ' }] },
    { c: '治', m: 'TRỊ — chữa trị; cai trị', on: 'ジ、チ', kun: 'なお・る、なお・す',
      w: [{ jp: '治ります', k: 'なおります', vi: 'khỏi (bệnh)' }] },
    { c: '悪', m: 'ÁC — xấu, tồi', on: 'アク', kun: 'わる・い',
      w: [{ jp: '悪い', k: 'わるい', vi: 'xấu, tồi' }, { jp: '気持ちが悪い', k: 'きもちがわるい', vi: 'khó chịu (trong người)' }] },
    { c: '丈', m: 'TRƯỢNG — trượng; khỏe chắc (丈夫)', on: 'ジョウ', kun: '',
      w: [{ jp: '大丈夫（な）', k: 'だいじょうぶ（な）', vi: 'ổn, không sao' }] },
    { c: '夫', m: 'PHU — chồng; người đàn ông', on: 'フ、フウ', kun: 'おっと',
      w: [{ jp: '大丈夫（な）', k: 'だいじょうぶ（な）', vi: 'ổn, không sao' }] },
    { c: '睡', m: 'THỤY — ngủ', on: 'スイ', kun: '',
      w: [{ jp: '睡眠', k: 'すいみん', vi: 'giấc ngủ, việc ngủ' }] },
    { c: '眠', m: 'MIÊN — ngủ', on: 'ミン', kun: 'ねむ・る、ねむ・い',
      w: [{ jp: '睡眠', k: 'すいみん', vi: 'giấc ngủ, việc ngủ' }] },
    { c: '医', m: 'Y — y học, chữa bệnh', on: 'イ', kun: '',
      w: [{ jp: '歯医者', k: 'はいしゃ', vi: 'nha sĩ' }] },
    { c: '者', m: 'GIẢ — người, kẻ', on: 'シャ', kun: 'もの',
      w: [{ jp: '歯医者', k: 'はいしゃ', vi: 'nha sĩ' }] },
    { c: '以', m: 'DĨ — lấy, từ (以上)', on: 'イ', kun: '',
      w: [{ jp: '以上', k: 'いじょう', vi: 'trên, hơn' }] },
    { c: '塗', m: 'ĐỒ — bôi, quét (sơn)', on: 'ト', kun: 'ぬ・る',
      w: [{ jp: '塗ります', k: 'ぬります', vi: 'bôi, sơn' }] },
    { c: '浴', m: 'DỤC — tắm', on: 'ヨク', kun: 'あ・びる',
      w: [{ jp: '浴びます', k: 'あびます', vi: 'tắm (vòi sen)' }] },
    { c: '運', m: 'VẬN — vận chuyển; vận may', on: 'ウン', kun: 'はこ・ぶ',
      w: [{ jp: '運動します', k: 'うんどうします', vi: 'tập thể dục' }] },
    { c: '固', m: 'CỐ — cứng, chắc', on: 'コ', kun: 'かた・い',
      w: [{ jp: '固い', k: 'かたい', vi: 'cứng' }] },
    { c: '柔', m: 'NHU — mềm, nhu', on: 'ジュウ', kun: 'やわ・らかい',
      w: [{ jp: '柔らかい', k: 'やわらかい', vi: 'mềm' }] },
    { c: '薬', m: 'DƯỢC — thuốc', on: 'ヤク', kun: 'くすり',
      w: [{ jp: '薬剤師', k: 'やくざいし', vi: 'dược sĩ' }, { jp: '薬局', k: 'やっきょく', vi: 'hiệu thuốc' }] },
    { c: '剤', m: 'TỄ — thuốc, dược tễ', on: 'ザイ', kun: '',
      w: [{ jp: '薬剤師', k: 'やくざいし', vi: 'dược sĩ' }] },
    { c: '説', m: 'THUYẾT — giải thích, thuyết', on: 'セツ', kun: 'と・く',
      w: [{ jp: '説明書', k: 'せつめいしょ', vi: 'sách hướng dẫn' }] },
    { c: '呂', m: 'LỮ — lữ; bồn tắm (風呂)', on: 'ロ、リョ', kun: '',
      w: [{ jp: '（お）風呂', k: '（お）ふろ', vi: 'bồn tắm' }] },
    { c: '保', m: 'BẢO — bảo vệ, giữ', on: 'ホ', kun: 'たも・つ',
      w: [{ jp: '保険証', k: 'ほけんしょう', vi: 'thẻ bảo hiểm' }] },
    { c: '険', m: 'HIỂM — hiểm, nguy hiểm', on: 'ケン', kun: 'けわ・しい',
      w: [{ jp: '保険証', k: 'ほけんしょう', vi: 'thẻ bảo hiểm' }] },
    { c: '証', m: 'CHỨNG — chứng nhận', on: 'ショウ', kun: '',
      w: [{ jp: '保険証', k: 'ほけんしょう', vi: 'thẻ bảo hiểm' }] },
    { c: '待', m: 'ĐÃI — đợi', on: 'タイ', kun: 'ま・つ',
      w: [{ jp: '待合室', k: 'まちあいしつ', vi: 'phòng chờ' }, { jp: '待ちます', k: 'まちます', vi: 'đợi, chờ' }] },
    { c: '室', m: 'THẤT — phòng', on: 'シツ', kun: '',
      w: [{ jp: '待合室', k: 'まちあいしつ', vi: 'phòng chờ' }] },
    { c: '脱', m: 'THOÁT — cởi; thoát', on: 'ダツ', kun: 'ぬ・ぐ',
      w: [{ jp: '脱ぎます', k: 'ぬぎます', vi: 'cởi' }] },
    { c: '走', m: 'TẨU — chạy', on: 'ソウ', kun: 'はし・る',
      w: [{ jp: '走ります', k: 'はしります', vi: 'chạy' }] },
    { c: '磨', m: 'MA — mài; đánh (răng)', on: 'マ', kun: 'みが・く',
      w: [{ jp: '磨きます', k: 'みがきます', vi: 'đánh (răng)' }] },
    { c: '準', m: 'CHUẨN — chuẩn', on: 'ジュン', kun: '',
      w: [{ jp: '準備します', k: 'じゅんびします', vi: 'chuẩn bị' }] },
    { c: '備', m: 'BỊ — chuẩn bị, trang bị', on: 'ビ', kun: 'そな・える',
      w: [{ jp: '準備します', k: 'じゅんびします', vi: 'chuẩn bị' }] }
  ]
});
