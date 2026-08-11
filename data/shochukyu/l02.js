/* 第２課 楽しいショッピング
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-2', n: 2, jp: '楽しいショッピング', vi: 'Mua sắm vui vẻ',

  vocab: [
    { g: '話読聞書', w: '恥ずかしい', k: 'はずかしい', m: 'Xấu hổ' },
    { g: '話読聞書', w: '次', k: 'つぎ', m: 'Tiếp theo' },
    { g: '話読聞書', w: 'うれしい', k: '', m: 'Vui mừng' },

    { g: '上手に買い物', w: '画面', k: 'がめん', m: 'Màn hình' },
    { g: '上手に買い物', w: '腕時計', k: 'うでどけい', m: 'Đồng hồ đeo tay' },
    { g: '上手に買い物', w: 'セーター', k: '', m: 'Áo len' },
    { g: '上手に買い物', w: 'スーツケース', k: '', m: 'Va li' },
    { g: '上手に買い物', w: 'コート', k: '', m: 'Áo khoác' },
    { g: '上手に買い物', w: '棚', k: 'たな', m: 'Cái giá' },
    { g: '上手に買い物', w: '指輪', k: 'ゆびわ', m: 'Cái nhẫn' },
    { g: '上手に買い物', w: 'サイズ', k: '', m: 'Kích cỡ' },
    { g: '上手に買い物', w: '数字', k: 'すうじ', m: 'Số' },
    { g: '上手に買い物', w: 'ヒール', k: '', m: 'Gót giày' },
    { g: '上手に買い物', w: 'ボタン', k: '', m: 'Khuy' },
    { g: '上手に買い物', w: 'ジーンズ', k: '', m: 'Quần bò' },
    { g: '上手に買い物', w: '売り場', k: 'うりば', m: 'Nơi bán hàng' },
    { g: '上手に買い物', w: '動く', k: 'うごく', m: 'Cử động, di chuyển' },
    { g: '上手に買い物', w: '説明（する）', k: 'せつめい', m: 'Giải thích' },
    { g: '上手に買い物', w: '配達（する）', k: 'はいたつ', m: 'Chuyển hàng' },
    { g: '上手に買い物', w: '重い', k: 'おもい', m: 'Nặng' },
    { g: '上手に買い物', w: '軽い', k: 'かるい', m: 'Nhẹ' },
    { g: '上手に買い物', w: 'ちょうどいい', k: '', m: 'Vừa vặn' },
    { g: '上手に買い物', w: '丈夫（な）', k: 'じょうぶ', m: 'Bền, chắc' },
    { g: '上手に買い物', w: 'もっと', k: '', m: 'Hơn, thêm' },
    { g: '上手に買い物', w: 'ちょっと', k: '', m: 'Một chút, một ít' },
    { g: '上手に買い物', w: 'いかがですか', k: '', m: 'Như thế nào ạ' },
    { g: '上手に買い物', w: 'かしこまりました', k: '', m: 'Tôi đã hiểu rồi ạ' },

    { g: '一緒に食事', w: '壁', k: 'かべ', m: 'Bức tường' },
    { g: '一緒に食事', w: 'カレンダー', k: '', m: 'Lịch' },
    { g: '一緒に食事', w: '世界地図', k: 'せかいちず', m: 'Bản đồ thế giới' },
    { g: '一緒に食事', w: '最新', k: 'さいしん', m: 'Gần đây, mới nhất' },
    { g: '一緒に食事', w: '飲み放題', k: 'のみほうだい', m: 'Uống thoải mái (buffet)' },
    { g: '一緒に食事', w: '期間限定', k: 'きかんげんてい', m: 'Chỉ có trong một khoảng thời gian' },
    { g: '一緒に食事', w: 'セット', k: '', m: 'Bộ, set' },
    { g: '一緒に食事', w: 'フロアガイド', k: '', m: 'Bảng hướng dẫn các tầng' },
    { g: '一緒に食事', w: '意味', k: 'いみ', m: 'Ý nghĩa' },
    { g: '一緒に食事', w: '営業中', k: 'えいぎょうちゅう', m: 'Đang hoạt động, đang mở cửa' },
    { g: '一緒に食事', w: '大盛り', k: 'おおもり', m: 'Đĩa to (nhiều)' },
    { g: '一緒に食事', w: 'おかわり', k: '', m: 'Thêm (cơm, súp miso…)' },
    { g: '一緒に食事', w: '送料', k: 'そうりょう', m: 'Tiền vận chuyển' },
    { g: '一緒に食事', w: 'タイムサービス', k: '', m: 'Khuyến mãi theo giờ' },
    { g: '一緒に食事', w: '定休日', k: 'ていきゅうび', m: 'Ngày nghỉ định kỳ' },
    { g: '一緒に食事', w: '本日', k: 'ほんじつ', m: 'Ngày hôm nay' },
    { g: '一緒に食事', w: '半額', k: 'はんがく', m: 'Một nửa số tiền' },
    { g: '一緒に食事', w: 'レディースデー', k: '', m: 'Ngày Phụ nữ' },
    { g: '一緒に食事', w: '量', k: 'りょう', m: 'Lượng' },
    { g: '一緒に食事', w: '親子丼', k: 'おやこどん', m: 'Món Oyakodon (cơm thịt gà với trứng)' },
    { g: '一緒に食事', w: '牛丼', k: 'ぎゅうどん', m: 'Món Gyudon (cơm thịt bò)' },
    { g: '一緒に食事', w: 'サンドイッチ', k: '', m: 'Bánh sandwich' },
    { g: '一緒に食事', w: 'ソース', k: '', m: 'Nước sốt' },
    { g: '一緒に食事', w: '～券（例：割引券）', k: '～けん（れい：わりびきけん）', m: 'Phiếu ~ (ví dụ: phiếu giảm giá)' },
    { g: '一緒に食事', w: 'かける', k: '', m: 'Treo' },
    { g: '一緒に食事', w: '貼る', k: 'はる', m: 'Dán' },
    { g: '一緒に食事', w: 'かける', k: '', m: 'Cho… vào (nước sốt, gia vị)' },
    { g: '一緒に食事', w: '注文（する）', k: 'ちゅうもん', m: 'Đặt hàng, đặt món' },
    { g: '一緒に食事', w: '割引（する）', k: 'わりびき', m: 'Chiết khấu, giảm giá' },
    { g: '一緒に食事', w: '両替（する）', k: 'りょうがえ', m: 'Đổi tiền' },
    { g: '一緒に食事', w: '得（な）', k: 'とく', m: 'Rẻ, có lợi' },
    { g: '一緒に食事', w: '特別（な）', k: 'とくべつ', m: 'Đặc biệt' },
    { g: '一緒に食事', w: 'どういう', k: '', m: 'Như thế nào' },
    { g: '一緒に食事', w: 'もう', k: '', m: 'Thêm' },
    { g: '一緒に食事', w: 'もう一杯', k: 'もういっぱい', m: 'Thêm một bát / một chén' },

    { g: 'もう一度聞こう', w: '大変', k: 'たいへん', m: 'Vất vả, rất là' },
    { g: 'もう一度聞こう', w: 'デザート', k: '', m: 'Đồ tráng miệng' }
  ],

  grammar: [
    {
      pat: 'Ｖるようになります（能力の変化）',
      desc: 'Diễn tả sự thay đổi dần dần theo thời gian: từ trạng thái không làm được/không xảy ra sang làm được/xảy ra. Phủ định là Ｖなくなります.',
      ex: [
        { jp: '日本語で説明できるようになりました。', vi: 'Tôi đã trở nên có thể giải thích bằng tiếng Nhật.' },
        { jp: '一人で買い物に行くようになりました。', vi: 'Tôi đã trở nên thường tự mình đi mua sắm.' },
        { jp: '甘いものを食べなくなりました。', vi: 'Tôi đã không còn ăn đồ ngọt nữa.' }
      ]
    },
    {
      pat: 'Ａそうです（様態）',
      desc: 'Diễn tả ấn tượng, vẻ ngoài nhìn thấy được: “trông có vẻ…”. イA bỏ い + そうです (いい→よさそうです); ナA + そうです.',
      ex: [
        { jp: 'このセーターは軽そうです。', vi: 'Cái áo len này trông có vẻ nhẹ.' },
        { jp: 'このスーツケースは丈夫そうです。', vi: 'Cái va li này trông có vẻ chắc chắn.' },
        { jp: 'このコートは高そうですね。', vi: 'Cái áo khoác này trông có vẻ đắt nhỉ.' }
      ]
    },
    {
      pat: 'Ｖてみます',
      desc: 'Thử làm gì đó để xem kết quả ra sao: “thử làm ~ xem”.',
      ex: [
        { jp: 'このコートを着てみてもいいですか。', vi: 'Tôi thử mặc cái áo khoác này được không ạ?' },
        { jp: '一度、店員に聞いてみます。', vi: 'Tôi sẽ thử hỏi nhân viên bán hàng một lần xem sao.' },
        { jp: '新しいレストランに行ってみました。', vi: 'Tôi đã thử đến một nhà hàng mới.' }
      ]
    },
    {
      pat: 'Ｖてもらえませんか',
      desc: 'Nhờ vả đối phương làm gì đó một cách lịch sự: “bạn có thể làm giúp tôi ~ được không?”.',
      ex: [
        { jp: 'もう少し大きいサイズを見せてもらえませんか。', vi: 'Anh/chị cho tôi xem thử cỡ to hơn một chút được không ạ?' },
        { jp: 'この漢字の読み方を教えてもらえませんか。', vi: 'Bạn chỉ giúp tôi cách đọc chữ Hán này được không?' },
        { jp: '配達してもらえませんか。', vi: 'Anh/chị chuyển hàng giúp tôi được không ạ?' }
      ]
    },
    {
      pat: 'Ｖやすいです ／ Ｖにくいです',
      desc: 'Diễn tả tính chất dễ hay khó khi thực hiện một hành động: dễ ~ / khó ~.',
      ex: [
        { jp: 'このかばんは軽くて、持ちやすいです。', vi: 'Cái túi này nhẹ nên dễ mang.' },
        { jp: 'このヒールは高くて、歩きにくいです。', vi: 'Đôi gót này cao nên khó đi.' },
        { jp: 'この靴は大きくて、はきにくいです。', vi: 'Đôi giày này to nên khó đi vào.' }
      ]
    },
    {
      pat: 'Ａすぎます',
      desc: 'Diễn tả mức độ quá mức: “quá ~”. イA bỏ い、ナA bỏ な + すぎます.',
      ex: [
        { jp: 'このスーツケースは大きすぎます。', vi: 'Cái va li này to quá.' },
        { jp: 'このセーターは私には派手すぎます。', vi: 'Cái áo len này lòe loẹt quá đối với tôi.' },
        { jp: 'この店は静かすぎて、ちょっと恥ずかしいです。', vi: 'Cửa hàng này yên tĩnh quá nên tôi hơi thấy xấu hổ.' }
      ]
    },
    {
      pat: 'Ｖてあります',
      desc: 'Diễn tả trạng thái do ai đó cố ý chuẩn bị/thực hiện trước, kết quả còn tồn tại đến bây giờ. Khác với ～ています (chỉ diễn biến hành động), Ｖてあります nhấn mạnh trạng thái đã được sắp đặt sẵn.',
      ex: [
        { jp: 'メニューに値段が書いてあります。', vi: 'Giá tiền đã được ghi sẵn trên thực đơn.' },
        { jp: '壁にカレンダーがかけてあります。', vi: 'Trên tường có treo sẵn lịch.' },
        { jp: 'テーブルの上にセットのメニューが置いてあります。', vi: 'Trên bàn có để sẵn thực đơn set.' }
      ]
    },
    {
      pat: '～と読みます／～と書いてあります／どういう意味ですか・～という意味です',
      desc: 'Cụm mẫu câu dùng khi hỏi cách đọc, nội dung chữ viết và ý nghĩa của một từ, rất hữu ích khi đọc thực đơn hay biển hiệu.',
      ex: [
        { jp: 'これは何と読みますか。', vi: 'Cái này đọc là gì vậy?' },
        { jp: 'ここに「本日限定」と書いてあります。', vi: 'Ở đây có ghi là “chỉ có hôm nay”.' },
        { jp: '「得」ってどういう意味ですか。', vi: 'Chữ “得” có nghĩa là gì vậy?' },
        { jp: 'それは「安い」という意味です。', vi: 'Đó có nghĩa là “rẻ”.' }
      ]
    }
  ],

  kanji: []
});
