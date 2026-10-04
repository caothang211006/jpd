/* 第６課 旅行に行こう
   Từ vựng: trang ことば trong sách (ảnh người dùng gửi), nghĩa dịch lại theo ngữ cảnh.
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-6', n: 6, jp: '旅行に行こう', vi: 'Cùng đi du lịch',

  vocab: [
    { g: '旅行の計画', w: '大人', k: 'おとな', m: 'Người lớn' },
    { g: '旅行の計画', w: 'カニ', k: '', m: 'Cua' },
    { g: '旅行の計画', w: '着物', k: 'きもの', m: 'Kimono' },
    { g: '旅行の計画', w: 'こっち', k: '', m: 'Phía này, bên này' },
    { g: '旅行の計画', w: 'そっち', k: '', m: 'Phía đó, bên đó' },
    { g: '旅行の計画', w: '最後', k: 'さいご', m: 'Cuối cùng, sau cùng' },
    { g: '旅行の計画', w: '市内', k: 'しない', m: 'Trong thành phố' },
    { g: '旅行の計画', w: 'ショッピングセンター', k: '', m: 'Trung tâm mua sắm (shopping center)' },
    { g: '旅行の計画', w: '宿泊', k: 'しゅくはく', m: 'Lưu trú, nghỉ trọ' },
    { g: '旅行の計画', w: '水族館', k: 'すいぞくかん', m: 'Thủy cung' },
    { g: '旅行の計画', w: 'スノーボード', k: '', m: 'Trượt ván tuyết (snowboard)' },
    { g: '旅行の計画', w: '代金', k: 'だいきん', m: 'Tiền thanh toán, chi phí' },
    { g: '旅行の計画', w: '朝食', k: 'ちょうしょく', m: 'Bữa sáng' },
    { g: '旅行の計画', w: '夕食', k: 'ゆうしょく', m: 'Bữa tối' },
    { g: '旅行の計画', w: '登山', k: 'とざん', m: 'Leo núi' },
    { g: '旅行の計画', w: '内容', k: 'ないよう', m: 'Nội dung' },
    { g: '旅行の計画', w: 'なし', k: '', m: 'Không có' },
    { g: '旅行の計画', w: '値段', k: 'ねだん', m: 'Giá cả' },
    { g: '旅行の計画', w: '船', k: 'ふね', m: 'Thuyền, tàu thủy' },
    { g: '旅行の計画', w: 'プラン', k: '', m: 'Kế hoạch, gói dịch vụ (plan)' },
    { g: '旅行の計画', w: '雰囲気', k: 'ふんいき', m: 'Bầu không khí' },
    { g: '旅行の計画', w: '街', k: 'まち', m: 'Phố, khu phố' },
    { g: '旅行の計画', w: '虫', k: 'むし', m: 'Côn trùng, sâu bọ' },
    { g: '旅行の計画', w: '旅館', k: 'りょかん', m: 'Nhà trọ kiểu Nhật' },
    { g: '旅行の計画', w: '～付き（例：朝食付き）', k: '～つき（れい：ちょうしょくつき）', m: 'Kèm ~ (ví dụ: kèm bữa sáng)' },
    { g: '旅行の計画', w: '～泊～日（例：２泊３日）', k: '～はく～か（れい：にはくみっか）', m: '~ đêm ~ ngày (ví dụ: 2 đêm 3 ngày)' },
    { g: '旅行の計画', w: '～費（例：交通費）', k: '～ひ（れい：こうつうひ）', m: 'Phí ~ (ví dụ: phí đi lại)' },
    { g: '旅行の計画', w: 'どっち', k: '', m: 'Bên nào, cái nào' },
    { g: '旅行の計画', w: '待ち合わせる', k: 'まちあわせる', m: 'Hẹn gặp' },
    { g: '旅行の計画', w: 'ガイド（する）', k: '', m: 'Hướng dẫn (guide)' },
    { g: '旅行の計画', w: '観光（する）', k: 'かんこう（する）', m: 'Tham quan, du lịch' },
    { g: '旅行の計画', w: 'キャンプ（する）', k: '', m: 'Cắm trại (camp)' },
    { g: '旅行の計画', w: '出発（する）', k: 'しゅっぱつ（する）', m: 'Xuất phát, khởi hành' },
    { g: '旅行の計画', w: 'チェックイン（する）', k: '', m: 'Làm thủ tục nhận phòng (check-in)' },
    { g: '旅行の計画', w: 'レンタル（する）', k: '', m: 'Thuê (rental)' },
    { g: '旅行の計画', w: '珍しい', k: 'めずらしい', m: 'Hiếm, lạ' },
    { g: '旅行の計画', w: '伝統的（な）', k: 'でんとうてき（な）', m: 'Mang tính truyền thống' },
    { g: '旅行の計画', w: 'それに', k: '', m: 'Hơn nữa, thêm vào đó' },

    { g: '旅行の準備', w: 'イルカ', k: '', m: 'Cá heo' },
    { g: '旅行の準備', w: 'ガイドブック', k: '', m: 'Sách hướng dẫn du lịch (guidebook)' },
    { g: '旅行の準備', w: 'ショー', k: '', m: 'Buổi biểu diễn (show)' },
    { g: '旅行の準備', w: '手袋', k: 'てぶくろ', m: 'Găng tay' },
    { g: '旅行の準備', w: '年末', k: 'ねんまつ', m: 'Cuối năm' },
    { g: '旅行の準備', w: 'マフラー', k: '', m: 'Khăn quàng cổ (muffler)' },
    { g: '旅行の準備', w: '～中（例：旅行中）', k: '～ちゅう（れい：りょこうちゅう）', m: 'Đang ~ (ví dụ: đang đi du lịch)' },
    { g: '旅行の準備', w: '取る', k: 'とる', m: 'Lấy, xin (nghỉ) (休みを取る。— Xin nghỉ phép.)' },
    { g: '旅行の準備', w: 'なくなる', k: '', m: 'Hết (席がなくなる。— Hết chỗ ngồi.)' },
    { g: '旅行の準備', w: '伝える', k: 'つたえる', m: 'Truyền đạt, nhắn lại' },
    { g: '旅行の準備', w: 'ぬれる', k: '', m: 'Bị ướt' },
    { g: '旅行の準備', w: 'コピー（する）', k: '', m: 'Sao chụp, photo (copy)' },
    { g: '旅行の準備', w: '到着（する）', k: 'とうちゃく（する）', m: 'Đến nơi' },
    { g: '旅行の準備', w: '用意（する）', k: 'ようい（する）', m: 'Chuẩn bị' },
    { g: '旅行の準備', w: 'お願いします', k: 'おねがいします', m: 'Nhờ anh/chị, xin vui lòng' }
  ],

  grammar: [
    {
      pat: 'Ｖましょうか',
      desc: 'Đề xuất, rủ rê đối phương cùng làm gì, hoặc hỏi ý kiến đối phương về việc mình định làm: “chúng ta cùng làm ~ nhé?”.',
      ex: [
        { jp: '冬休みはどこへ旅行に行きましょうか。', vi: 'Kỳ nghỉ đông chúng ta đi du lịch ở đâu nhỉ?' },
        { jp: '旅館を予約しましょうか。', vi: 'Để tôi đặt nhà khách trước nhé?' }
      ]
    },
    {
      pat: '～し、～（liệt kê・lý do）',
      desc: 'Liệt kê nhiều lý do/đặc điểm cho cùng một kết luận, mang sắc thái “vừa ~ lại vừa ~”.',
      ex: [
        { jp: 'この観光地は自然もきれいだし、食べ物もおいしいです。', vi: 'Nơi tham quan này vừa có thiên nhiên đẹp, lại vừa có đồ ăn ngon.' },
        { jp: '飛行機は速いし、楽ですから、飛行機で行きましょう。', vi: 'Máy bay vừa nhanh vừa thoải mái nên chúng ta đi bằng máy bay nhé.' }
      ]
    },
    {
      pat: '～のは～です（câu nhấn mạnh）',
      desc: 'Cấu trúc nhấn mạnh một bộ phận của câu bằng cách danh từ hóa phần còn lại với の, rồi đặt phần cần nhấn mạnh sau です.',
      ex: [
        { jp: '私が行きたいのは北海道です。', vi: 'Nơi tôi muốn đi là Hokkaido.' },
        { jp: 'このツアーでいちばん楽しみなのは水族館です。', vi: 'Điều tôi mong chờ nhất trong tour này là thủy cung.' }
      ]
    },
    {
      pat: '～そうです（dự đoán）',
      desc: 'Đưa ra dự đoán dựa trên thông tin đã biết (khác với様態 dựa trên hình ảnh nhìn thấy): “nghe nói/có vẻ sẽ ~”.',
      ex: [
        { jp: '来週は雨が降りそうです。', vi: 'Có vẻ tuần sau trời sẽ mưa.' },
        { jp: 'このツアーは人気がありそうです。', vi: 'Tour này có vẻ sẽ được nhiều người thích.' }
      ]
    },
    {
      pat: 'Ｖておきます（chuẩn bị trước）',
      desc: 'Diễn tả việc chủ động làm trước để chuẩn bị cho việc sau: “làm ~ sẵn/trước”.',
      ex: [
        { jp: '旅行の前にガイドブックを買っておきます。', vi: 'Trước chuyến đi tôi sẽ mua sẵn sách hướng dẫn.' },
        { jp: '旅館は早めに予約しておいたほうがいいです。', vi: 'Nên đặt trước nhà khách sớm một chút thì tốt hơn.' }
      ]
    }
  ],

  kanji: []
});
