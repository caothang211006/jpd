/* 第11課 地域社会の中で
   Từ vựng: trang ことば trong sách (ảnh người dùng gửi), nghĩa dịch lại theo ngữ cảnh.
   Ngữ pháp: cột 学習項目 trong syllabus chính thức (reference/syllabus-sach-vang.txt).
   Kanji: sách giáo trình không có danh sách kanji riêng cho bài này. */
JPD.lesson({
  id: 'shochukyu-11', n: 11, jp: '地域社会の中で', vi: 'Trong cộng đồng địa phương',

  vocab: [
    { g: '慣れてくると', w: '彼女', k: 'かのじょ', m: 'Cô ấy; bạn gái' },
    { g: '慣れてくると', w: '彼', k: 'かれ', m: 'Anh ấy; bạn trai (国の彼女／彼に会いたい。— Muốn gặp bạn gái/bạn trai ở quê.)' },
    { g: '慣れてくると', w: '記者', k: 'きしゃ', m: 'Phóng viên' },
    { g: '慣れてくると', w: '興味', k: 'きょうみ', m: 'Sự quan tâm, hứng thú' },
    { g: '慣れてくると', w: '敬語', k: 'けいご', m: 'Kính ngữ' },
    { g: '慣れてくると', w: 'こと', k: '', m: 'Chuyện, việc (将来のこと — chuyện tương lai)' },
    { g: '慣れてくると', w: '地域', k: 'ちいき', m: 'Khu vực, địa phương' },
    { g: '慣れてくると', w: '違い', k: 'ちがい', m: 'Sự khác biệt' },
    { g: '慣れてくると', w: '物価', k: 'ぶっか', m: 'Vật giá' },
    { g: '慣れてくると', w: '文化', k: 'ぶんか', m: 'Văn hóa' },
    { g: '慣れてくると', w: 'ボランティア', k: '', m: 'Tình nguyện viên (volunteer)' },
    { g: '慣れてくると', w: '無理', k: 'むり', m: 'Quá sức, không thể' },
    { g: '慣れてくると', w: '～代（例：食事代）', k: '～だい（れい：しょくじだい）', m: 'Tiền ~ (ví dụ: tiền ăn)' },
    { g: '慣れてくると', w: '持つ', k: 'もつ', m: 'Có, mang (興味を持つ。— Có hứng thú.)' },
    { g: '慣れてくると', w: '学ぶ', k: 'まなぶ', m: 'Học' },
    { g: '慣れてくると', w: '折れる', k: 'おれる', m: 'Bị gãy' },
    { g: '慣れてくると', w: '答える', k: 'こたえる', m: 'Trả lời' },
    { g: '慣れてくると', w: '育てる', k: 'そだてる', m: 'Nuôi dạy, trồng' },
    { g: '慣れてくると', w: 'インタビュー（する）', k: '', m: 'Phỏng vấn (interview)' },
    { g: '慣れてくると', w: '外食（する）', k: 'がいしょく（する）', m: 'Ăn ngoài' },
    { g: '慣れてくると', w: '研究（する）', k: 'けんきゅう（する）', m: 'Nghiên cứu' },
    { g: '慣れてくると', w: '故障（する）', k: 'こしょう（する）', m: 'Hỏng hóc' },
    { g: '慣れてくると', w: '節約（する）', k: 'せつやく（する）', m: 'Tiết kiệm' },
    { g: '慣れてくると', w: 'あんまり', k: '', m: 'Không… lắm (đi với phủ định)' },
    { g: '慣れてくると', w: 'だいたい', k: '', m: 'Đại khái, phần lớn' },

    { g: 'スポーツチームに入って', w: '運転手', k: 'うんてんしゅ', m: 'Tài xế' },
    { g: 'スポーツチームに入って', w: '駅前', k: 'えきまえ', m: 'Trước nhà ga' },
    { g: 'スポーツチームに入って', w: '具合', k: 'ぐあい', m: 'Tình trạng (sức khỏe, máy móc)' },
    { g: 'スポーツチームに入って', w: '今夜', k: 'こんや', m: 'Tối nay' },
    { g: 'スポーツチームに入って', w: '打つ', k: 'うつ', m: 'Đánh' },
    { g: 'スポーツチームに入って', w: '回る', k: 'まわる', m: 'Quay, đi vòng quanh' },
    { g: 'スポーツチームに入って', w: '諦める', k: 'あきらめる', m: 'Từ bỏ' },
    { g: 'スポーツチームに入って', w: '投げる', k: 'なげる', m: 'Ném' },
    { g: 'スポーツチームに入って', w: '出張（する）', k: 'しゅっちょう（する）', m: 'Đi công tác' }
  ],

  grammar: [
    {
      pat: '受身（無生物主語）',
      desc: 'Thể bị động khi chủ ngữ là vật vô tri (không phải người), thường dùng để giới thiệu, mô tả sự vật một cách khách quan: “~ được làm bởi…”.',
      ex: [
        { jp: 'この祭りは毎年地域で行われています。', vi: 'Lễ hội này được tổ chức ở địa phương hàng năm.' },
        { jp: 'この店は近所の人によく利用されています。', vi: 'Cửa hàng này thường được người hàng xóm sử dụng.' }
      ]
    },
    {
      pat: 'Ｖるようになります／Ｖなくなります',
      desc: 'Diễn tả sự thay đổi thói quen theo thời gian: trở nên làm ~ / trở nên không còn làm ~ nữa.',
      ex: [
        { jp: '最近、あまり外食しなくなりました。', vi: 'Gần đây tôi đã không còn hay ăn ngoài nữa.' },
        { jp: '近所の人とよく話すようになりました。', vi: 'Tôi đã trở nên hay nói chuyện với hàng xóm.' }
      ]
    },
    {
      pat: 'Ｖたばかりです',
      desc: 'Diễn tả một việc vừa mới xảy ra xong: “vừa mới ~ xong”.',
      ex: [
        { jp: 'このチームに入ったばかりです。', vi: 'Tôi vừa mới vào đội này.' },
        { jp: '日本に来たばかりのころは、敬語がわかりませんでした。', vi: 'Hồi tôi vừa mới đến Nhật, tôi chưa hiểu về kính ngữ.' }
      ]
    },
    {
      pat: 'Ｖながら、～',
      desc: 'Diễn tả hai hành động diễn ra đồng thời bởi cùng một chủ thể: “vừa ~ vừa…”.',
      ex: [
        { jp: '走りながら、体の具合をチェックしています。', vi: 'Tôi vừa chạy vừa kiểm tra tình trạng sức khỏe.' },
        { jp: '働きながら、日本語を学んでいます。', vi: 'Tôi vừa đi làm vừa học tiếng Nhật.' }
      ]
    },
    {
      pat: '～と言っていました',
      desc: 'Thuật lại lời nói của người khác (câu gián tiếp): “~ đã nói là…”.',
      ex: [
        { jp: 'コーチは今夜練習があると言っていました。', vi: 'Huấn luyện viên đã nói là tối nay có buổi tập.' },
        { jp: '近所の人は物価が高くなったと言っていました。', vi: 'Người hàng xóm đã nói là giá cả đã trở nên đắt hơn.' }
      ]
    },
    {
      pat: 'Thể mệnh lệnh（命令形）／禁止形',
      desc: 'Thể mệnh lệnh (dùng đuôi え/ろ đối với động từ) và thể cấm đoán (Vる+な), thường dùng khi huấn luyện viên hô hào hoặc ra lệnh gấp gáp.',
      ex: [
        { jp: '頑張れ！あきらめるな！', vi: 'Cố lên! Đừng bỏ cuộc!' },
        { jp: 'もっと投げろ！', vi: 'Ném mạnh hơn nữa đi!' }
      ]
    }
  ],

  kanji: []
});
