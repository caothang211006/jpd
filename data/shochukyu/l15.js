/* 第15課 気になるニュース
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-15', n: 15, jp: '気になるニュース', vi: 'Tin tức đáng chú ý',

  vocab: [
    { g: '話読聞書', w: '自信', k: 'じしん', m: 'Tự tin' },
    { g: '話読聞書', w: '知り合い', k: 'しりあい', m: 'Người quen' },
    { g: '話読聞書', w: '大成功', k: 'だいせいこう', m: 'Đại thành công' },
    { g: '話読聞書', w: 'ポスター', k: '', m: 'Áp phích quảng cáo' },
    { g: '話読聞書', w: '積極的（な）', k: 'せっきょくてき', m: 'Tích cực' },

    { g: '発表の準備', w: '原因', k: 'げんいん', m: 'Nguyên nhân' },
    { g: '発表の準備', w: '食料品', k: 'しょくりょうひん', m: 'Thực phẩm' },
    { g: '発表の準備', w: '増加（する）', k: 'ぞうか', m: 'Tăng, gia tăng' },
    { g: '発表の準備', w: '問題', k: 'もんだい', m: 'Vấn đề' },
    { g: '発表の準備', w: 'レコード', k: '', m: 'Máy ghi âm, đĩa nhạc' },
    { g: '発表の準備', w: '貿易', k: 'ぼうえき', m: 'Thương mại' },
    { g: '発表の準備', w: '事情', k: 'じじょう', m: 'Tình hình' },
    { g: '発表の準備', w: '温暖（な）', k: 'おんだん', m: 'Ấm áp' },
    { g: '発表の準備', w: '英会話', k: 'えいかいわ', m: 'Hội thoại tiếng Anh' },
    { g: '発表の準備', w: '女性', k: 'じょせい', m: 'Phụ nữ' },
    { g: '発表の準備', w: '男性', k: 'だんせい', m: 'Nam giới' },
    { g: '発表の準備', w: '地球', k: 'ちきゅう', m: 'Trái đất' },
    { g: '発表の準備', w: '直接', k: 'ちょくせつ', m: 'Trực tiếp' },
    { g: '発表の準備', w: '輸入（する）', k: 'ゆにゅう', m: 'Nhập khẩu' },
    { g: '発表の準備', w: '洋服', k: 'ようふく', m: 'Quần áo Âu' },
    { g: '発表の準備', w: '理由', k: 'りゆう', m: 'Lý do' },
    { g: '発表の準備', w: 'グラフ', k: '', m: 'Biểu đồ' },
    { g: '発表の準備', w: '～化（例：温暖化）', k: '～か（れい：おんだんか）', m: 'Trở nên… (ví dụ: trở nên ấm lên)' },
    { g: '発表の準備', w: '～倍（例：２倍）', k: '～ばい（れい：にばい）', m: 'Gấp… (ví dụ: gấp 2 lần)' },
    { g: '発表の準備', w: '下がる', k: 'さがる', m: 'Giảm xuống' },
    { g: '発表の準備', w: '飼う', k: 'かう', m: 'Nuôi (con vật)' },
    { g: '発表の準備', w: '咲く', k: 'さく', m: 'Nở (hoa)' },
    { g: '発表の準備', w: 'アンケート（する）', k: '', m: 'Điều tra, khảo sát' },
    { g: '発表の準備', w: 'インタビュー（する）', k: '', m: 'Phỏng vấn' },
    { g: '発表の準備', w: '発表（する）', k: 'はっぴょう', m: 'Phát biểu' },
    { g: '発表の準備', w: '来日（する）', k: 'らいにち', m: 'Đến Nhật Bản' },
    { g: '発表の準備', w: '流行（する）', k: 'りゅうこう', m: 'Lưu hành, lan rộng' },
    { g: '発表の準備', w: '過ごす', k: 'すごす', m: 'Trải qua' },
    { g: '発表の準備', w: '比べる', k: 'くらべる', m: 'So sánh' },
    { g: '発表の準備', w: '汚い', k: 'きたない', m: 'Bẩn' },
    { g: '発表の準備', w: 'ほとんど', k: '', m: 'Hầu hết' },

    { g: 'みんなの前で発表', w: 'クッキー', k: '', m: 'Bánh quy' },
    { g: 'みんなの前で発表', w: '輸出（する）', k: 'ゆしゅつ', m: 'Xuất khẩu' },
    { g: 'みんなの前で発表', w: 'インフルエンザ', k: '', m: 'Cảm cúm' },
    { g: 'みんなの前で発表', w: '円高', k: 'えんだか', m: 'Đồng yên lên giá' },
    { g: 'みんなの前で発表', w: '気温', k: 'きおん', m: 'Nhiệt độ' },
    { g: 'みんなの前で発表', w: '立入禁止', k: 'たちいりきんし', m: 'Cấm vào, cấm lại gần' },
    { g: 'みんなの前で発表', w: '南極', k: 'なんきょく', m: 'Nam Cực' },
    { g: 'みんなの前で発表', w: '北極', k: 'ほっきょく', m: 'Bắc Cực' },
    { g: 'みんなの前で発表', w: 'ダウンロード（する）', k: '', m: 'Tải xuống' },
    { g: 'みんなの前で発表', w: '進む', k: 'すすむ', m: 'Tiến triển' },
    { g: 'みんなの前で発表', w: '溶ける', k: 'とける', m: 'Tan' },
    { g: 'みんなの前で発表', w: '減る', k: 'へる', m: 'Giảm' },
    { g: 'みんなの前で発表', w: '欠席（する）', k: 'けっせき', m: 'Vắng mặt' },
    { g: 'みんなの前で発表', w: '危険（な）', k: 'きけん', m: 'Nguy hiểm' },
    { g: 'みんなの前で発表', w: '大変', k: 'たいへん', m: 'Vất vả, rất là' },
    { g: 'みんなの前で発表', w: 'しかし', k: '', m: 'Tuy nhiên, nhưng' },
    { g: 'みんなの前で発表', w: 'どんどん', k: '', m: 'Dần dần' },
    { g: 'みんなの前で発表', w: '～によると', k: '', m: 'Theo… thì…' },

    { g: 'もう一度聞こう', w: 'いろんな', k: '', m: 'Nhiều loại' },
    { g: 'もう一度聞こう', w: '約', k: 'やく', m: 'Gần, xấp xỉ' },
    { g: 'もう一度聞こう', w: '（お）礼', k: '（お）れい', m: 'Cảm tạ, lễ tạ ơn' }
  ],

  grammar: [
    {
      pat: 'イＡ／ナＡがっています',
      desc: 'Diễn tả cảm xúc, trạng thái tâm lý của người thứ ba (không dùng cho bản thân người nói): イA bỏ い + がっています; ナA + がっています.',
      ex: [
        { jp: '彼は結婚のニュースを知って、うれしがっています。', vi: 'Anh ấy biết tin cưới và có vẻ đang rất vui.' },
        { jp: 'みんな、この問題を不安がっています。', vi: 'Mọi người đều đang lo lắng về vấn đề này.' }
      ]
    },
    {
      pat: '～からです',
      desc: 'Nêu lý do khi trả lời câu hỏi “どうして／なぜ”: “là vì ~”.',
      ex: [
        { jp: 'なぜ発表のテーマにしたかというと、興味があったからです。', vi: 'Sở dĩ tôi chọn chủ đề này để phát biểu là vì tôi có sự quan tâm tới nó.' },
        { jp: '輸入が増えたのは、円高だからです。', vi: 'Nhập khẩu tăng lên là vì đồng yên lên giá.' }
      ]
    },
    {
      pat: '～んだって',
      desc: 'Thuật lại thông tin nghe được từ người khác một cách thân mật, khẩu ngữ: “nghe nói là ~ đấy”.',
      ex: [
        { jp: 'あのニュース、大成功だったんだって。', vi: 'Nghe nói tin đó là một thành công lớn đấy.' },
        { jp: '来月、円高がもっと進むんだって。', vi: 'Nghe nói tháng sau đồng yên còn lên giá hơn nữa đấy.' }
      ]
    },
    {
      pat: 'Ｖるのはどうですか',
      desc: 'Đưa ra đề xuất về cách làm, hướng thực hiện cho một việc chung: “làm theo cách ~ thì sao?”.',
      ex: [
        { jp: 'アンケートをとってみるのはどうですか。', vi: 'Chúng ta thử làm khảo sát xem sao?' },
        { jp: '知り合いにインタビューするのはどうですか。', vi: 'Chúng ta phỏng vấn người quen thì sao nhỉ?' }
      ]
    },
    {
      pat: '～だけじゃなくて、～も～',
      desc: 'Diễn tả sự bổ sung thêm thông tin: “không chỉ ~ mà… cũng…”.',
      ex: [
        { jp: '女性だけじゃなくて、男性も育児休暇をとります。', vi: 'Không chỉ phụ nữ mà nam giới cũng nghỉ phép chăm con.' },
        { jp: '日本だけじゃなくて、世界中で気温が上がっています。', vi: 'Không chỉ Nhật Bản mà khắp thế giới nhiệt độ cũng đang tăng lên.' }
      ]
    },
    {
      pat: '～ないと、～',
      desc: 'Diễn tả một điều kiện cần thiết, nếu không làm sẽ dẫn đến kết quả không mong muốn: “nếu không ~ thì…”.',
      ex: [
        { jp: '早く準備を始めないと、発表に間に合いません。', vi: 'Nếu không bắt đầu chuẩn bị sớm thì sẽ không kịp buổi phát biểu.' },
        { jp: '温暖化を止めないと、大変なことになります。', vi: 'Nếu không ngăn chặn hiện tượng nóng lên toàn cầu thì sẽ dẫn đến hậu quả nghiêm trọng.' }
      ]
    },
    {
      pat: 'Ｖてきました／Ｖていきます',
      desc: 'Diễn tả sự thay đổi theo thời gian: てきました cho biết một xu hướng đã diễn ra tính đến hiện tại, ていきます cho biết xu hướng sẽ tiếp tục diễn ra từ hiện tại về sau.',
      ex: [
        { jp: '輸入する食料品が増えてきました。', vi: 'Thực phẩm nhập khẩu đã tăng dần lên (cho tới bây giờ).' },
        { jp: 'これからも気温は上がっていくでしょう。', vi: 'Từ giờ về sau, nhiệt độ chắc sẽ tiếp tục tăng dần lên.' }
      ]
    },
    {
      pat: '～ために、～（nguyên nhân）',
      desc: 'Nêu nguyên nhân khách quan dẫn đến một kết quả (khác với ために mục đích ở bài 4): “do ~ nên…”.',
      ex: [
        { jp: '円高のために、輸出が減りました。', vi: 'Do đồng yên lên giá nên xuất khẩu đã giảm.' },
        { jp: '温暖化のために、氷が溶けています。', vi: 'Do hiện tượng nóng lên toàn cầu nên băng đang tan.' }
      ]
    }
  ],

  kanji: []
});
