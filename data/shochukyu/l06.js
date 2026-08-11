/* 第６課 旅行に行こう
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-6', n: 6, jp: '旅行に行こう', vi: 'Cùng đi du lịch',

  vocab: [
    { g: '話読聞書', w: '自然', k: 'しぜん', m: 'Tự nhiên' },
    { g: '話読聞書', w: 'ラベンダー畑', k: 'ラベンダーばたけ', m: 'Ruộng bậc thang' },
    { g: '話読聞書', w: '湿原', k: 'しつげん', m: 'Đồng hoang' },
    { g: '話読聞書', w: '牧場', k: 'ぼくじょう', m: 'Đồng cỏ' },
    { g: '話読聞書', w: 'ジャガイモ', k: '', m: 'Khoai tây' },
    { g: '話読聞書', w: 'トウモロコシ', k: '', m: 'Ngô' },
    { g: '話読聞書', w: 'ウニ', k: '', m: 'Nhím biển' },
    { g: '話読聞書', w: '乗馬', k: 'じょうば', m: 'Cưỡi ngựa' },
    { g: '話読聞書', w: 'カヌー', k: '', m: 'Ca nô' },
    { g: '話読聞書', w: '楽しむ', k: 'たのしむ', m: 'Tận hưởng, vui vẻ' },

    { g: '旅行の計画', w: 'カニ', k: '', m: 'Cua' },
    { g: '旅行の計画', w: '着物', k: 'きもの', m: 'Kimono' },
    { g: '旅行の計画', w: 'ショッピングセンター', k: '', m: 'Trung tâm mua sắm' },
    { g: '旅行の計画', w: '水族館', k: 'すいぞくかん', m: 'Thủy cung' },
    { g: '旅行の計画', w: 'スノーボード', k: '', m: 'Ván trượt tuyết' },
    { g: '旅行の計画', w: '船', k: 'ふね', m: 'Thuyền' },
    { g: '旅行の計画', w: '雰囲気', k: 'ふんいき', m: 'Không khí' },
    { g: '旅行の計画', w: '街', k: 'まち', m: 'Phố' },
    { g: '旅行の計画', w: 'こっち', k: '', m: 'Phía đằng này' },
    { g: '旅行の計画', w: 'そっち', k: '', m: 'Phía đằng kia' },
    { g: '旅行の計画', w: '市内', k: 'しない', m: 'Trong thành phố' },
    { g: '旅行の計画', w: '最後', k: 'さいご', m: 'Cuối cùng' },
    { g: '旅行の計画', w: '旅館', k: 'りょかん', m: 'Nhà khách (kiểu Nhật)' },
    { g: '旅行の計画', w: '朝食', k: 'ちょうしょく', m: 'Bữa sáng' },
    { g: '旅行の計画', w: '夕食', k: 'ゆうしょく', m: 'Bữa tối' },
    { g: '旅行の計画', w: '観光地', k: 'かんこうち', m: 'Nơi tham quan' },
    { g: '旅行の計画', w: '登山', k: 'とざん', m: 'Leo núi' },
    { g: '旅行の計画', w: '虫', k: 'むし', m: 'Con sâu, côn trùng' },
    { g: '旅行の計画', w: '宿泊', k: 'しゅくはく', m: 'Ở, trú lại' },
    { g: '旅行の計画', w: '代金', k: 'だいきん', m: 'Tiền, phí' },
    { g: '旅行の計画', w: '内容', k: 'ないよう', m: 'Nội dung' },
    { g: '旅行の計画', w: 'なし', k: '', m: 'Không có' },
    { g: '旅行の計画', w: '値段', k: 'ねだん', m: 'Giá cả' },
    { g: '旅行の計画', w: '大人', k: 'おとな', m: 'Người lớn' },
    { g: '旅行の計画', w: '～付き（例：朝食付き）', k: '～つき（れい：ちょうしょくつき）', m: 'Kèm theo… (ví dụ: kèm theo bữa sáng)' },
    { g: '旅行の計画', w: '～泊～日（例：２泊３日）', k: '～はく～にち（れい：にはくみっか）', m: '…ngày…đêm (ví dụ: 3 ngày 2 đêm)' },
    { g: '旅行の計画', w: '～費（例：交通費）', k: '～ひ（れい：こうつうひ）', m: 'Lệ phí… (ví dụ: lệ phí giao thông)' },
    { g: '旅行の計画', w: '待ち合わせる', k: 'まちあわせる', m: 'Hẹn gặp' },
    { g: '旅行の計画', w: 'ガイド（する）', k: '', m: 'Hướng dẫn' },
    { g: '旅行の計画', w: '観光（する）', k: 'かんこう', m: 'Tham quan' },
    { g: '旅行の計画', w: '出発（する）', k: 'しゅっぱつ', m: 'Xuất phát' },
    { g: '旅行の計画', w: 'キャンプ（する）', k: '', m: 'Cắm trại' },
    { g: '旅行の計画', w: '珍しい', k: 'めずらしい', m: 'Hiếm có' },
    { g: '旅行の計画', w: '伝統的（な）', k: 'でんとうてき', m: 'Truyền thống' },
    { g: '旅行の計画', w: 'それに', k: '', m: 'Hơn thế nữa' },

    { g: '旅行の準備', w: 'どっち', k: '', m: 'Bên nào, cái nào' },
    { g: '旅行の準備', w: 'イルカ', k: '', m: 'Cá heo' },
    { g: '旅行の準備', w: 'ショー', k: '', m: 'Buổi biểu diễn' },
    { g: '旅行の準備', w: '手袋', k: 'てぶくろ', m: 'Găng tay, bao tay' },
    { g: '旅行の準備', w: 'マフラー', k: '', m: 'Khăn choàng cổ' },
    { g: '旅行の準備', w: '年末', k: 'ねんまつ', m: 'Cuối năm' },
    { g: '旅行の準備', w: 'ガイドブック', k: '', m: 'Sách hướng dẫn' },
    { g: '旅行の準備', w: 'パーク', k: '', m: 'Công viên' },
    { g: '旅行の準備', w: '早割', k: 'はやわり', m: 'Khuyến mãi đặt sớm' },
    { g: '旅行の準備', w: '～中（例：旅行中）', k: '～ちゅう（れい：りょこうちゅう）', m: 'Trong khi… (ví dụ: trong khi đi du lịch)' },
    { g: '旅行の準備', w: '取る', k: 'とる', m: 'Lấy' },
    { g: '旅行の準備', w: 'ぬれる', k: '', m: 'Ướt' },
    { g: '旅行の準備', w: '用意（する）', k: 'ようい', m: 'Chuẩn bị' },
    { g: '旅行の準備', w: '伝える', k: 'つたえる', m: 'Truyền đạt' },
    { g: '旅行の準備', w: 'コピー（する）', k: '', m: 'Photo' },
    { g: '旅行の準備', w: 'お願いします', k: 'おねがいします', m: 'Nhờ vả' },

    { g: 'もう一度聞こう', w: 'あとで', k: '', m: 'Sau khi…' }
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
