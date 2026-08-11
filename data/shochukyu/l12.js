/* 第12課 私の健康法
   Từ vựng: reference/tu-vung-shochukyu-15-bai.txt (bản dịch tiếng Việt chính thức của ALC).
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-12', n: 12, jp: '私の健康法', vi: 'Cách giữ sức khỏe của tôi',

  vocab: [
    { g: '話読聞書', w: 'インスタント', k: '', m: 'Ăn liền, tức thời' },
    { g: '話読聞書', w: '食品', k: 'しょくひん', m: 'Thực phẩm' },
    { g: '話読聞書', w: '冷凍（する）', k: 'れいとう', m: 'Đông lạnh' },
    { g: '話読聞書', w: '残す', k: 'のこす', m: 'Để lại' },
    { g: '話読聞書', w: '残る', k: 'のこる', m: 'Còn lại' },

    { g: '体調不良', w: 'おにぎり', k: '', m: 'Cơm nắm' },
    { g: '体調不良', w: '元気', k: 'げんき', m: 'Khỏe mạnh' },
    { g: '体調不良', w: '元気がない', k: 'げんきがない', m: 'Không khỏe' },
    { g: '体調不良', w: '胃', k: 'い', m: 'Dạ dày' },
    { g: '体調不良', w: '痛み', k: 'いたみ', m: 'Vết đau, chỗ đau' },
    { g: '体調不良', w: '疲れ', k: 'つかれ', m: 'Sự mệt mỏi' },
    { g: '体調不良', w: '湿布', k: 'しっぷ', m: 'Miếng dán giảm đau' },
    { g: '体調不良', w: 'うがい', k: '', m: 'Súc miệng' },
    { g: '体調不良', w: 'ジム', k: '', m: 'Phòng tập thể hình' },
    { g: '体調不良', w: '氷', k: 'こおり', m: 'Đá' },
    { g: '体調不良', w: 'ドレッシング', k: '', m: 'Nước sốt (salad dressing)' },
    { g: '体調不良', w: '～金（例：入会金）', k: '～きん（れい：にゅうかいきん）', m: 'Lệ phí… (ví dụ: lệ phí hội viên)' },
    { g: '体調不良', w: '酔う', k: 'よう', m: 'Say' },
    { g: '体調不良', w: '取れる', k: 'とれる', m: 'Hết (đau, mệt)' },
    { g: '体調不良', w: '入会（する）', k: 'にゅうかい', m: 'Tham gia hội' },
    { g: '体調不良', w: 'さす', k: '', m: 'Giương (ô, dù)' },
    { g: '体調不良', w: 'ガンガン', k: '', m: 'Ong ong (đau đầu dữ dội)' },
    { g: '体調不良', w: 'パンパン', k: '', m: 'Rắn chắc, căng cứng' },
    { g: '体調不良', w: 'フラフラ', k: '', m: 'Lảy bảy, run rẩy (mệt mỏi)' },
    { g: '体調不良', w: 'ムカムカ', k: '', m: 'Nôn nao, buồn nôn' },

    { g: '毎日、元気に！', w: '肩', k: 'かた', m: 'Vai' },
    { g: '毎日、元気に！', w: '首', k: 'くび', m: 'Cổ' },
    { g: '毎日、元気に！', w: 'カロリー', k: '', m: 'Calo' },
    { g: '毎日、元気に！', w: 'ジューサー', k: '', m: 'Máy ép nước hoa quả' },
    { g: '毎日、元気に！', w: '体脂肪計', k: 'たいしぼうけい', m: 'Máy đo lượng mỡ trong cơ thể' },
    { g: '毎日、元気に！', w: '体脂肪率', k: 'たいしぼうりつ', m: 'Tỉ lệ mỡ trong cơ thể' },
    { g: '毎日、元気に！', w: 'ネックストレッチ', k: '', m: 'Máy mát xa cổ' },
    { g: '毎日、元気に！', w: 'マッサージ器', k: 'マッサージき', m: 'Máy mát xa' },
    { g: '毎日、元気に！', w: '万歩計', k: 'まんぽけい', m: 'Máy đo số bước đi bộ' },
    { g: '毎日、元気に！', w: 'ストレス', k: '', m: 'Sự căng thẳng' },
    { g: '毎日、元気に！', w: '虫歯', k: 'むしば', m: 'Răng sâu' },
    { g: '毎日、元気に！', w: 'ビタミンＣ', k: '', m: 'Vitamin C' },
    { g: '毎日、元気に！', w: '方法', k: 'ほうほう', m: 'Phương pháp' },
    { g: '毎日、元気に！', w: '健康', k: 'けんこう', m: 'Sức khỏe' },
    { g: '毎日、元気に！', w: '栄養', k: 'えいよう', m: 'Dinh dưỡng' },
    { g: '毎日、元気に！', w: 'ショウガ', k: '', m: 'Gừng' },
    { g: '毎日、元気に！', w: 'バランス', k: '', m: 'Sự cân bằng' },
    { g: '毎日、元気に！', w: '～不足（例：運動不足）', k: '～ぶそく（れい：うんどうぶそく）', m: 'Thiếu… (ví dụ: thiếu vận động)' },
    { g: '毎日、元気に！', w: '取る', k: 'とる', m: 'Lấy, làm hết (mệt)' },
    { g: '毎日、元気に！', w: '測る', k: 'はかる', m: 'Đo' },
    { g: '毎日、元気に！', w: '計算（する）', k: 'けいさん', m: 'Tính toán' },
    { g: '毎日、元気に！', w: 'マッサージ（する）', k: '', m: 'Mát xa' },
    { g: '毎日、元気に！', w: 'たまる', k: '', m: 'Tích lại' },
    { g: '毎日、元気に！', w: 'やせる', k: '', m: 'Gầy' },
    { g: '毎日、元気に！', w: 'こる', k: '', m: 'Đông cứng (vai, cơ)' },
    { g: '毎日、元気に！', w: '動かす', k: 'うごかす', m: 'Làm di chuyển, hoạt động' },
    { g: '毎日、元気に！', w: '眠る', k: 'ねむる', m: 'Ngủ' },
    { g: '毎日、元気に！', w: '冷える', k: 'ひえる', m: 'Lạnh' },
    { g: '毎日、元気に！', w: 'このごろ', k: '', m: 'Gần đây' },

    { g: 'もう一度聞こう', w: 'ふーん', k: '', m: 'Thế à' },
    { g: 'もう一度聞こう', w: 'グレープフルーツ', k: '', m: 'Bưởi' },
    { g: 'もう一度聞こう', w: '二日酔い', k: 'ふつかよい', m: 'Say rượu qua đêm' },
    { g: 'もう一度聞こう', w: '温める', k: 'あたためる', m: 'Làm ấm' },
    { g: 'もう一度聞こう', w: '気をつける', k: 'きをつける', m: 'Chú ý, cẩn thận' }
  ],

  grammar: [
    {
      pat: 'Ｖながら、～（đồng thời）',
      desc: 'Diễn tả việc thực hiện đồng thời một hành động khác trong lúc làm gì đó, thường dùng để mô tả thói quen: “vừa ~ vừa…”.',
      ex: [
        { jp: 'テレビを見ながら、ストレッチをします。', vi: 'Tôi vừa xem tivi vừa tập giãn cơ.' },
        { jp: '音楽を聞きながら、マッサージをします。', vi: 'Tôi vừa nghe nhạc vừa mát xa.' }
      ]
    },
    {
      pat: '［～個・～時間・～杯…］も～',
      desc: 'Nhấn mạnh số lượng nhiều hơn mức bình thường: “tận ~ những…”.',
      ex: [
        { jp: '毎日、水を２リットルも飲みます。', vi: 'Mỗi ngày tôi uống tận 2 lít nước.' },
        { jp: '昨日は10時間も寝ました。', vi: 'Hôm qua tôi đã ngủ tận 10 tiếng.' }
      ]
    },
    {
      pat: 'Ｖやすいです／Ｖにくいです（xu hướng・tính chất）',
      desc: 'Ở bài 2, mẫu này diễn tả sự dễ/khó thao tác; ở bài này dùng để nói về xu hướng, tính chất dễ xảy ra của cơ thể/sự vật: “dễ bị ~ / khó bị ~”.',
      ex: [
        { jp: '疲れやすい体質です。', vi: 'Tôi có thể chất dễ bị mệt.' },
        { jp: '虫歯になりにくい食べ物を選びます。', vi: 'Tôi chọn những món ăn khó bị sâu răng.' }
      ]
    },
    {
      pat: 'Ｖるようにしています／Ｖないようにしています',
      desc: 'Diễn tả một nỗ lực, thói quen mà bản thân cố gắng duy trì đều đặn: “tôi cố gắng luôn ~ / cố gắng không ~”.',
      ex: [
        { jp: '毎朝、野菜を食べるようにしています。', vi: 'Mỗi sáng tôi cố gắng luôn ăn rau.' },
        { jp: '夜遅くまで起きないようにしています。', vi: 'Tôi cố gắng không thức khuya.' }
      ]
    },
    {
      pat: 'Ｖることにします／Ｖないことにします',
      desc: 'Diễn tả một quyết định của bản thân (mang tính chủ động, đưa ra tại thời điểm nói): “tôi quyết định sẽ ~ / sẽ không ~”.',
      ex: [
        { jp: '今日からジムに通うことにします。', vi: 'Từ hôm nay tôi quyết định sẽ đi tập gym.' },
        { jp: 'お酒はもう飲まないことにします。', vi: 'Tôi quyết định sẽ không uống rượu nữa.' }
      ]
    }
  ],

  kanji: []
});
