/* 第13課 親の気持ち・子の気持ち
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-13', n: 13, jp: '親の気持ち・子の気持ち', vi: 'Lòng cha mẹ, lòng con cái',

  vocab: [
    { g: '話読聞書', w: '自然', k: 'しぜん', m: 'Tự nhiên' },
    { g: '話読聞書', w: '釣る', k: 'つる', m: 'Câu (cá)' },
    { g: '話読聞書', w: '不利（な）', k: 'ふり', m: 'Bất lợi' },
    { g: '話読聞書', w: '手に入れる', k: 'てにいれる', m: 'Có được, có trong tay' },

    { g: '町で見かけた子どもたち', w: '親', k: 'おや', m: 'Bố mẹ' },
    { g: '町で見かけた子どもたち', w: '父親', k: 'ちちおや', m: 'Bố' },
    { g: '町で見かけた子どもたち', w: '母親', k: 'ははおや', m: 'Mẹ' },
    { g: '町で見かけた子どもたち', w: '子ども', k: 'こども', m: 'Con trẻ' },
    { g: '町で見かけた子どもたち', w: '近所の子ども', k: 'きんじょのこども', m: 'Con hàng xóm' },
    { g: '町で見かけた子どもたち', w: '家事', k: 'かじ', m: 'Việc nhà' },
    { g: '町で見かけた子どもたち', w: 'コーチ', k: '', m: 'Huấn luyện viên' },
    { g: '町で見かけた子どもたち', w: '塾', k: 'じゅく', m: 'Trường học thêm' },
    { g: '町で見かけた子どもたち', w: '数学', k: 'すうがく', m: 'Toán học' },
    { g: '町で見かけた子どもたち', w: 'ゲームセンター', k: '', m: 'Trung tâm game' },
    { g: '町で見かけた子どもたち', w: '頃', k: 'ころ', m: 'Khoảng (thời gian)' },
    { g: '町で見かけた子どもたち', w: '～キロ', k: '', m: 'Kilogram' },
    { g: '町で見かけた子どもたち', w: '～ずつ', k: '', m: 'Từng cái một' },
    { g: '町で見かけた子どもたち', w: '騒ぐ', k: 'さわぐ', m: 'Ồn ào, ầm ĩ' },
    { g: '町で見かけた子どもたち', w: '世話（する）', k: 'せわ', m: 'Chăm sóc' },
    { g: '町で見かけた子どもたち', w: 'えらい', k: '', m: 'To lớn, vĩ đại, tài giỏi' },
    { g: '町で見かけた子どもたち', w: 'この間', k: 'このあいだ', m: 'Mới đây' },
    { g: '町で見かけた子どもたち', w: '必ず', k: 'かならず', m: 'Chắc chắn' },
    { g: '町で見かけた子どもたち', w: 'やっぱり', k: '', m: 'Quả thực là' },
    { g: '町で見かけた子どもたち', w: '夜遅く', k: 'よるおそく', m: 'Buổi tối muộn' },

    { g: '思い出すと', w: 'うち', k: '', m: 'Bên trong, nhà mình' },
    { g: '思い出すと', w: 'うちの親', k: 'うちのおや', m: 'Bố mẹ nhà tôi' },
    { g: '思い出すと', w: '海外', k: 'かいがい', m: 'Nước ngoài' },
    { g: '思い出すと', w: '曲', k: 'きょく', m: 'Ca khúc' },
    { g: '思い出すと', w: '教育', k: 'きょういく', m: 'Giáo dục' },
    { g: '思い出すと', w: '化粧品', k: 'けしょうひん', m: 'Mỹ phẩm' },
    { g: '思い出すと', w: 'けんか（する）', k: '', m: 'Đánh nhau, cãi nhau' },
    { g: '思い出すと', w: '泣く', k: 'なく', m: 'Khóc' },
    { g: '思い出すと', w: '残す', k: 'のこす', m: 'Để lại' },
    { g: '思い出すと', w: 'やる', k: '', m: 'Làm' },
    { g: '思い出すと', w: '厳しい', k: 'きびしい', m: 'Nghiêm khắc' },
    { g: '思い出すと', w: 'うれしい', k: '', m: 'Vui mừng' },
    { g: '思い出すと', w: '熱心（な）', k: 'ねっしん', m: 'Nhiệt tình' },
    { g: '思い出すと', w: '何でも', k: 'なんでも', m: 'Bất kể cái gì' },

    { g: 'もう一度聞こう', w: '僕', k: 'ぼく', m: 'Tôi (nam giới dùng)' },
    { g: 'もう一度聞こう', w: '祖母', k: 'そぼ', m: 'Bà' },
    { g: 'もう一度聞こう', w: 'おもちゃ', k: '', m: 'Đồ chơi' },
    { g: 'もう一度聞こう', w: '役に立つ', k: 'やくにたつ', m: 'Có ích' },
    { g: 'もう一度聞こう', w: 'ちゃんと', k: '', m: 'Nghiêm túc, cẩn thận' },
    { g: 'もう一度聞こう', w: '仕方がない', k: 'しかたがない', m: 'Không còn cách nào khác' }
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
