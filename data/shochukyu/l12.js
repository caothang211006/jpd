/* 第12課 私の健康法
   Từ vựng: trang ことば trong sách (ảnh người dùng gửi), nghĩa dịch lại theo ngữ cảnh.
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-12', n: 12, jp: '私の健康法', vi: 'Cách giữ sức khỏe của tôi',

  vocab: [
    { g: '体調不良', w: '胃', k: 'い', m: 'Dạ dày' },
    { g: '体調不良', w: '痛み', k: 'いたみ', m: 'Cơn đau' },
    { g: '体調不良', w: 'うがい', k: '', m: 'Súc miệng' },
    { g: '体調不良', w: '元気', k: 'げんき', m: 'Khỏe mạnh' },
    { g: '体調不良', w: '氷', k: 'こおり', m: 'Đá (nước đá)' },
    { g: '体調不良', w: '湿布', k: 'しっぷ', m: 'Miếng dán giảm đau' },
    { g: '体調不良', w: 'ジム', k: '', m: 'Phòng tập thể dục (gym)' },
    { g: '体調不良', w: '疲れ', k: 'つかれ', m: 'Sự mệt mỏi' },
    { g: '体調不良', w: 'ドレッシング', k: '', m: 'Nước sốt salad (dressing)' },
    { g: '体調不良', w: '様子', k: 'ようす', m: 'Tình trạng, dáng vẻ' },
    { g: '体調不良', w: '～金（例：入会金）', k: '～きん（れい：にゅうかいきん）', m: 'Tiền ~ (ví dụ: phí nhập hội)' },
    { g: '体調不良', w: 'さす', k: '', m: 'Che (ô) (傘をさす。— Che ô.)' },
    { g: '体調不良', w: '酔う', k: 'よう', m: 'Say' },
    { g: '体調不良', w: '取れる', k: 'とれる', m: 'Hết, khỏi (mệt, đau)' },
    { g: '体調不良', w: 'アドバイス（する）', k: '', m: 'Khuyên, lời khuyên (advice)' },
    { g: '体調不良', w: '入会（する）', k: 'にゅうかい（する）', m: 'Gia nhập hội' },
    { g: '体調不良', w: 'ガンガン', k: '', m: 'Đau như búa bổ (đầu)' },
    { g: '体調不良', w: 'パンパン', k: '', m: 'Căng cứng (cơ bắp, bụng)' },
    { g: '体調不良', w: 'フラフラ', k: '', m: 'Choáng váng, loạng choạng' },
    { g: '体調不良', w: 'ムカムカ', k: '', m: 'Buồn nôn, nôn nao' },

    { g: '毎日、元気に！', w: '栄養', k: 'えいよう', m: 'Dinh dưỡng' },
    { g: '毎日、元気に！', w: '肩', k: 'かた', m: 'Vai' },
    { g: '毎日、元気に！', w: '首', k: 'くび', m: 'Cổ' },
    { g: '毎日、元気に！', w: 'カロリー', k: '', m: 'Calo (calorie)' },
    { g: '毎日、元気に！', w: '健康', k: 'けんこう', m: 'Sức khỏe' },
    { g: '毎日、元気に！', w: 'この頃', k: 'このごろ', m: 'Dạo này' },
    { g: '毎日、元気に！', w: 'ジューサー', k: '', m: 'Máy ép trái cây (juicer)' },
    { g: '毎日、元気に！', w: 'ショウガ', k: '', m: 'Gừng' },
    { g: '毎日、元気に！', w: 'ストレス', k: '', m: 'Căng thẳng (stress)' },
    { g: '毎日、元気に！', w: '体脂肪', k: 'たいしぼう', m: 'Mỡ cơ thể' },
    { g: '毎日、元気に！', w: 'ネックストレッチャー', k: '', m: 'Dụng cụ kéo giãn cổ (neck stretcher)' },
    { g: '毎日、元気に！', w: 'バランス', k: '', m: 'Sự cân bằng (balance)' },
    { g: '毎日、元気に！', w: 'ビタミンC', k: '', m: 'Vitamin C' },
    { g: '毎日、元気に！', w: 'ヘルスケア', k: '', m: 'Chăm sóc sức khỏe (health care)' },
    { g: '毎日、元気に！', w: 'マッサージ器', k: 'マッサージき', m: 'Máy mát-xa (massage)' },
    { g: '毎日、元気に！', w: '～計（例：温度計）', k: '～けい（れい：おんどけい）', m: 'Dụng cụ đo ~ (ví dụ: nhiệt kế)' },
    { g: '毎日、元気に！', w: '～不足（例：運動不足）', k: '～ぶそく（れい：うんどうぶそく）', m: 'Thiếu ~ (ví dụ: thiếu vận động)' },
    { g: '毎日、元気に！', w: '～率（例：出席率）', k: '～りつ（れい：しゅっせきりつ）', m: 'Tỉ lệ ~ (ví dụ: tỉ lệ đi học)' },
    { g: '毎日、元気に！', w: '動かす', k: 'うごかす', m: 'Cử động, di chuyển' },
    { g: '毎日、元気に！', w: 'こる', k: '', m: 'Mỏi, cứng (vai)' },
    { g: '毎日、元気に！', w: 'たまる', k: '', m: 'Tích tụ, dồn lại' },
    { g: '毎日、元気に！', w: '取る', k: 'とる', m: 'Làm hết, xua tan (疲れを取る。— Xua tan mệt mỏi.)' },
    { g: '毎日、元気に！', w: '眠る', k: 'ねむる', m: 'Ngủ' },
    { g: '毎日、元気に！', w: '測る', k: 'はかる', m: 'Đo' },
    { g: '毎日、元気に！', w: '太る', k: 'ふとる', m: 'Béo lên' },
    { g: '毎日、元気に！', w: '痩せる', k: 'やせる', m: 'Gầy đi' },
    { g: '毎日、元気に！', w: '冷える', k: 'ひえる', m: 'Bị lạnh' },
    { g: '毎日、元気に！', w: '計算（する）', k: 'けいさん（する）', m: 'Tính toán' },
    { g: '毎日、元気に！', w: 'ダイエット（する）', k: '', m: 'Ăn kiêng, giảm cân (diet)' },
    { g: '毎日、元気に！', w: 'マッサージ（する）', k: '', m: 'Mát-xa (massage)' }
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
