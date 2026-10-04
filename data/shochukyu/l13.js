/* 第13課 親の気持ち・子の気持ち
   Từ vựng: trang ことば trong sách (ảnh người dùng gửi), nghĩa dịch lại theo ngữ cảnh.
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-13', n: 13, jp: '親の気持ち・子の気持ち', vi: 'Lòng cha mẹ, lòng con cái',

  vocab: [
    { g: '町で見かけた子どもたち', w: '男の子', k: 'おとこのこ', m: 'Bé trai' },
    { g: '町で見かけた子どもたち', w: '親', k: 'おや', m: 'Bố mẹ' },
    { g: '町で見かけた子どもたち', w: '父親', k: 'ちちおや', m: 'Bố' },
    { g: '町で見かけた子どもたち', w: '母親', k: 'ははおや', m: 'Mẹ' },
    { g: '町で見かけた子どもたち', w: '家事', k: 'かじ', m: 'Việc nhà' },
    { g: '町で見かけた子どもたち', w: 'ゲームセンター', k: '', m: 'Khu trò chơi điện tử (game center)' },
    { g: '町で見かけた子どもたち', w: 'コーチ', k: '', m: 'Huấn luyện viên (coach)' },
    { g: '町で見かけた子どもたち', w: '頃', k: 'ころ', m: 'Hồi, thời (khi)' },
    { g: '町で見かけた子どもたち', w: '塾', k: 'じゅく', m: 'Lớp học thêm' },
    { g: '町で見かけた子どもたち', w: '数学', k: 'すうがく', m: 'Toán học' },
    { g: '町で見かけた子どもたち', w: '～キロ', k: '', m: '~ ký, ~ cây số (kilo)' },
    { g: '町で見かけた子どもたち', w: '～ずつ（例：20個ずつ）', k: '～ずつ（れい：にじゅっこずつ）', m: 'Mỗi ~ (ví dụ: mỗi lần 20 cái)' },
    { g: '町で見かけた子どもたち', w: '騒ぐ', k: 'さわぐ', m: 'Làm ồn' },
    { g: '町で見かけた子どもたち', w: '世話（する）', k: 'せわ（する）', m: 'Chăm sóc' },
    { g: '町で見かけた子どもたち', w: '偉い', k: 'えらい', m: 'Giỏi, đáng khen' },
    { g: '町で見かけた子どもたち', w: '自由（な）', k: 'じゆう（な）', m: 'Tự do' },
    { g: '町で見かけた子どもたち', w: '必ず', k: 'かならず', m: 'Nhất định' },
    { g: '町で見かけた子どもたち', w: 'やっぱり', k: '', m: 'Quả là, rốt cuộc vẫn' },
    { g: '町で見かけた子どもたち', w: '遅くまで', k: 'おそくまで', m: 'Đến khuya' },

    { g: '思い出すと', w: '海外', k: 'かいがい', m: 'Nước ngoài' },
    { g: '思い出すと', w: '教育', k: 'きょういく', m: 'Giáo dục' },
    { g: '思い出すと', w: '曲', k: 'きょく', m: 'Bản nhạc, bài hát' },
    { g: '思い出すと', w: '化粧品', k: 'けしょうひん', m: 'Mỹ phẩm' },
    { g: '思い出すと', w: '手伝い', k: 'てつだい', m: 'Sự giúp đỡ' },
    { g: '思い出すと', w: '習い事', k: 'ならいごと', m: 'Môn học năng khiếu (ngoài giờ)' },
    { g: '思い出すと', w: '～会（例：発表会）', k: '～かい（れい：はっぴょうかい）', m: 'Buổi ~ (ví dụ: buổi biểu diễn, buổi báo cáo)' },
    { g: '思い出すと', w: '叱る', k: 'しかる', m: 'Mắng' },
    { g: '思い出すと', w: '泣く', k: 'なく', m: 'Khóc' },
    { g: '思い出すと', w: '残す', k: 'のこす', m: 'Để lại, bỏ thừa' },
    { g: '思い出すと', w: 'やる', k: '', m: 'Làm (宿題をやる。— Làm bài tập.)' },
    { g: '思い出すと', w: '褒める', k: 'ほめる', m: 'Khen' },
    { g: '思い出すと', w: 'やめる', k: '', m: 'Bỏ, thôi' },
    { g: '思い出すと', w: '発表（する）', k: 'はっぴょう（する）', m: 'Phát biểu, trình bày' },
    { g: '思い出すと', w: '厳しい', k: 'きびしい', m: 'Nghiêm khắc' },
    { g: '思い出すと', w: '嫌（な）', k: 'いや（な）', m: 'Ghét, khó chịu' },
    { g: '思い出すと', w: '熱心（な）', k: 'ねっしん（な）', m: 'Nhiệt tình, chăm chỉ' },
    { g: '思い出すと', w: '何でも', k: 'なんでも', m: 'Bất cứ thứ gì' }
  ],

  grammar: [
    {
      pat: 'Ｖのを見ました／Ｖていました（thói quen quá khứ）',
      desc: 'Ｖのを見ました dùng khi kể lại việc mình đã nhìn thấy ai đó làm gì; Ｖていました diễn tả một thói quen, tình trạng lặp lại trong quá khứ (nay không còn nữa).',
      ex: [
        { jp: '子どもが公園で騒いでいるのを見ました。', vi: 'Tôi đã nhìn thấy bọn trẻ đang ồn ào ở công viên.' },
        { jp: '子どものころ、よくこの公園で遊んでいました。', vi: 'Hồi còn nhỏ, tôi thường hay chơi ở công viên này.' }
      ]
    },
    {
      pat: 'ＮばかりＶています／Ｖてばかりいます',
      desc: 'Diễn tả việc chỉ toàn làm một việc gì đó, mang sắc thái hơi phê phán: “suốt ngày chỉ ~ thôi”.',
      ex: [
        { jp: 'あの子はゲームばかりしています。', vi: 'Đứa trẻ đó suốt ngày chỉ chơi game.' },
        { jp: '最近、子どもは塾のことで悩んでばかりいます。', vi: 'Gần đây con tôi suốt ngày chỉ trăn trở về chuyện học thêm.' }
      ]
    },
    {
      pat: '［～個・～時間…］しか～ない',
      desc: 'Nhấn mạnh số lượng ít hơn mức mong đợi: “chỉ có ~ mà thôi”.',
      ex: [
        { jp: '子どもは野菜を少ししか食べません。', vi: 'Con tôi chỉ ăn một chút rau thôi.' },
        { jp: '一日に１時間しか遊べません。', vi: 'Một ngày chỉ được chơi có 1 tiếng thôi.' }
      ]
    },
    {
      pat: 'Ｖたらどうですか',
      desc: 'Đưa ra lời khuyên, đề xuất cho đối phương: “bạn thử làm ~ xem sao?”.',
      ex: [
        { jp: 'もう少し子どもの話を聞いたらどうですか。', vi: 'Bạn thử lắng nghe con nói nhiều hơn một chút xem sao?' },
        { jp: '塾を変えてみたらどうですか。', vi: 'Bạn thử đổi lớp học thêm khác xem sao?' }
      ]
    },
    {
      pat: 'Ｖないで、～',
      desc: 'Diễn tả việc không làm A rồi làm B ngay sau đó, hoặc kết quả của việc không làm A.',
      ex: [
        { jp: '子どもを叱らないで、優しく話しました。', vi: 'Tôi đã không mắng con mà nói chuyện nhẹ nhàng.' },
        { jp: '朝ご飯を食べないで、学校へ行きました。', vi: 'Con tôi đã không ăn sáng mà đi học luôn.' }
      ]
    },
    {
      pat: '～らしいです（nghe nói）',
      desc: 'Truyền đạt lại thông tin nghe được từ người khác hoặc phương tiện truyền thông, độ tin cậy không cao bằng そうです: “nghe nói là ~”.',
      ex: [
        { jp: '海外では子どもをあまり叱らないらしいです。', vi: 'Nghe nói ở nước ngoài người ta ít mắng con.' },
        { jp: 'あの塾は厳しいらしいです。', vi: 'Nghe nói lớp học thêm đó nghiêm khắc lắm.' }
      ]
    },
    {
      pat: 'Ｖて、～ ／ Ｖないで、～（trạng thái đi kèm）',
      desc: 'Diễn tả một trạng thái đi kèm khi thực hiện hành động chính: “~ rồi mới…” hoặc “không ~ mà…”.',
      ex: [
        { jp: '窓を開けて、寝ました。', vi: 'Tôi mở cửa sổ rồi mới đi ngủ.' },
        { jp: '傘を持たないで、出かけました。', vi: 'Tôi đã ra ngoài mà không mang theo ô.' }
      ]
    },
    {
      pat: 'Ｖのに～ ／ Ｎに～',
      desc: 'Diễn tả mục đích sử dụng: “để dùng cho việc ~”. Ｖ ở thể từ điển, danh từ đứng trực tiếp trước に.',
      ex: [
        { jp: 'このお金は子どもの塾代に使います。', vi: 'Số tiền này tôi dùng cho tiền học thêm của con.' },
        { jp: '子どもを育てるのにお金がかかります。', vi: 'Việc nuôi dạy con thì tốn tiền.' }
      ]
    },
    {
      pat: '使役動詞（thể sai khiến）',
      desc: 'Diễn tả việc “bắt/cho phép” ai đó làm gì: Nhóm 1 đổi u→a+せる; Nhóm 2 bỏ る+させる; Nhóm 3 します→させる、来ます→来させる。',
      ex: [
        { jp: '親は子どもに毎日、宿題をさせます。', vi: 'Bố mẹ bắt con làm bài tập mỗi ngày.' },
        { jp: '子どもを自由に遊ばせたいです。', vi: 'Tôi muốn cho con chơi tự do.' }
      ]
    },
    {
      pat: '使役受身／Ｖせてくれます・Ｖせてもらいます',
      desc: 'Thể bị động của thể sai khiến (bị/phải làm gì theo ý người khác), và Ｖせてくれます／もらいます diễn tả việc được ai đó cho phép làm gì.',
      ex: [
        { jp: '子どものころ、よくピアノを習わせられました。', vi: 'Hồi nhỏ tôi hay bị/phải học đàn piano.' },
        { jp: '親は好きなことをやらせてくれました。', vi: 'Bố mẹ đã cho tôi làm điều mình thích.' }
      ]
    }
  ],

  kanji: []
});
