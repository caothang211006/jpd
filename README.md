# JPD — web học tiếng Nhật できる日本語

Mở bằng cách **double-click `index.html`**. Không cần cài gì, không cần internet.
Tiến độ (từ đã thuộc, điểm quiz) lưu trong localStorage của trình duyệt.

## Đang có gì

Giáo trình của lớp là **できる日本語 初級** ("sách đỏ", 15 bài) — sau đó là
**できる日本語 初中級** ("sách vàng", 15 bài).

| Bài | Từ vựng | Ngữ pháp | Kanji |
|-----|---------|----------|-------|
| 1 はじめまして | 47 | 9 | 36 |
| 2 買い物・食事 | 77 | 9 | 30 |
| 3 スケジュール | 78 | 10 | 47 |
| 4 私の国・町 | 68 | 8 | 39 |
| 5 休みの日 | 59 | 8 | 39 |
| 6 一緒に！ | 55 | 14 | 25 |
| 7 友達の家で | 69 | 9 | 33 |
| 8 大切な人 | 81 | 9 | 12 |
| 9 好きなこと | 61 | 7 | 10 |
| 10 バスツアー | 69 | 10 | 9 |
| 11 私の生活 | 49 | 6 | 10 |
| 12 病気・けが | 52 | 6 | 31 |
| 13 私のおすすめ | 40 | 7 | 23 |
| 14 国の習慣 | 62 | 7 | 30 |
| 15 テレビ・雑誌から | 48 | 6 | 28 |

Toàn bộ 15 bài của sách đỏ đã có nội dung đầy đủ (từ vựng + ngữ pháp + kanji).
Kanji bài 8–11 lấy nguyên từ slide của lớp; các bài còn lại (1–7, 12–15) không
có danh sách kanji trong giáo trình gốc nên được tự tổng hợp: mỗi bài gồm các
chữ kanji **xuất hiện lần đầu** trong từ vựng của chính bài đó (chữ đã dạy ở
slide bài 8–11 hoặc đã gặp ở bài trước thì không lặp lại), kèm âm On/Kun, âm
Hán–Việt và từ ghép lấy từ chính từ vựng của bài.

Sách vàng (**できる日本語 初中級**) cũng đã có nội dung đầy đủ cho cả 15 bài
(từ vựng + ngữ pháp). Giáo trình gốc của sách vàng không có danh sách kanji
riêng theo bài (khác với sách đỏ chỉ có ở bài 8–11), nên mảng `kanji` của mọi
bài sách vàng đều để trống.

| Bài | Từ vựng | Ngữ pháp | Kanji |
|-----|---------|----------|-------|
| 1 新しい一歩 | 50 | 5 | — |
| 2 楽しいショッピング | 64 | 8 | — |
| 3 私の目標 | 64 | 7 | — |
| 4 住んでいる町 | 49 | 8 | — |
| 5 大変な１日 | 53 | 6 | — |
| 6 旅行に行こう | 62 | 5 | — |
| 7 西川さんの家 | 70 | 5 | — |
| 8 ありがとう | 34 | 6 | — |
| 9 アルバイト先で | 87 | 9 | — |
| 10 旅行に行って | 88 | 7 | — |
| 11 地域社会の中で | 45 | 6 | — |
| 12 私の健康法 | 59 | 5 | — |
| 13 親の気持ち・子の気持ち | 44 | 10 | — |
| 14 イベント・行事 | 89 | 6 | — |
| 15 気になるニュース | 57 | 8 | — |

Tab Flashcard có 2 bộ thẻ: **Từ vựng** và **Kanji & từ ghép**.

- Thẻ **từ vựng**: mặt trước là từ + cách đọc hiragana/katakana (cỡ lớn, rõ),
  mặt sau là nghĩa.
- Thẻ **kanji** (chữ Hán đơn lẻ): mặt trước **chỉ hiện chữ**, không có cách đọc
  — để việc nhận mặt chữ được kiểm tra thật. Cách đọc On/Kun dồn sang mặt sau
  cùng nghĩa Hán–Việt.
- Thẻ **từ ghép** (đi kèm mỗi chữ kanji, ví dụ 大家 dưới chữ 家): coi như từ
  vựng bình thường — mặt trước có kana, mặt sau là nghĩa, kèm ghi chú "từ ghép
  của [chữ]".

Bài 8 ra 41 thẻ từ 12 chữ (chữ đơn + từ ghép, đã loại trùng — 映画 nằm dưới cả
映 và 画 nhưng chỉ hiện một lần). Hai bộ thẻ đếm tiến độ riêng, nên đánh dấu
thuộc kanji không ảnh hưởng số từ vựng.

### Ôn tập nhiều bài cùng lúc

Nút **"Ôn tập nhiều bài cùng lúc"** trên trang chủ (`#/study`) cho chọn nhiều
bài rồi gộp thành một bộ flashcard hoặc một đề kiểm tra duy nhất — dùng để ôn
trước khi thi, không phải học từng bài riêng lẻ. Đánh dấu "đã thuộc" trong
phiên gộp vẫn ghi lại đúng vào tiến độ của bài gốc chứa từ đó, nên số liệu ở
trang chủ và ở từng bài luôn khớp với những gì đã ôn gộp.

## Nguồn dữ liệu

### Sách đỏ (できる日本語 初級)

- **Từ vựng**: `New words list - Dekiru Nihongo Beginner.pdf` của lớp. File PDF này
  dùng font Adobe-Japan1 mà `pdftotext` không đọc được, nên phần chữ Nhật lẫn dấu
  tiếng Việt đều ra ký tự rác. Bản đã giải mã nằm ở `reference/tu-vung-15-bai.txt`
  — **có đủ cả 15 bài**, kể cả 12–14.
- **Ngữ pháp bài 8–11**: file `TOM-TAT-NGU-PHAP-BAI-*.pdf` / `ngữ pháp *.pdf` của lớp.
- **Ngữ pháp bài 1–7, 12–15**: cột 学習項目 trong syllabus chính thức
  (`reference/syllabus-sach-do.txt`, tải từ dekirunihongo.jp) — vì lớp chưa phát
  bản tóm tắt cho các bài này. Ví dụ minh hoạ do soạn thêm.
- **Kanji bài 8–11**: các file `KANJI-BAI-*.pptx` / `Slot * Kanji bai *.pptx`
  (âm On/Kun, âm Hán–Việt, từ ghép lấy nguyên từ slide).
- **Kanji bài 1–7, 12–15**: giáo trình sách đỏ không có danh sách kanji riêng
  cho các bài này (slide của lớp chỉ có bài 8–11), nên danh sách được tự tổng
  hợp từ từ vựng: mỗi bài lấy các chữ kanji xuất hiện lần đầu trong từ vựng
  của bài (bỏ qua chữ đã nằm trong slide bài 8–11 hoặc đã gặp ở bài trước).
  Âm On/Kun rút gọn theo KANJIDIC2 (chỉ giữ các âm thông dụng), âm Hán–Việt
  soạn tay, từ ghép minh hoạ lấy nguyên từ từ vựng của chính bài đó.

### Sách vàng (できる日本語 初中級)

- **Từ vựng**: danh sách dịch tiếng Việt chính thức của nhà xuất bản ALC cho
  『できる日本語 初中級 本冊』(`7012019_4n.pdf`, tải từ trang download chính thức
  của ALC — cdn2.alc.co.jp), bản text đã trích xuất nằm ở
  `reference/tu-vung-shochukyu-15-bai.txt`. File này liệt kê từ vựng theo từng
  スモールトピック (ST) trong mỗi bài: khối từ tiếng Nhật kèm cách đọc trước, rồi
  đến đoạn dịch tiếng Việt theo đúng thứ tự của khối từ đó — phải ghép vị trí
  thứ N của khối từ với vị trí thứ N của đoạn dịch. Một số câu ví dụ minh hoạ
  đi kèm từ (ví dụ 「自分の店を開く。」 ngay dưới 開く) cũng được dịch thành một
  cụm riêng trong đoạn văn, nên khi ghép cặp phải bỏ qua các cặp câu ví dụ đó
  để không làm lệch vị trí các từ thật phía sau — bài 1–2 và một vài chỗ khác
  có từ ghép đôi không rõ ràng (ví dụ かける xuất hiện 2 lần với 2 nghĩa khác
  nhau, hay いっぱい/もう一杯 gộp chung một dòng furigana) đã được đối chiếu lại
  bằng ngữ nghĩa tiếng Nhật để ghép đúng.
- **Ngữ pháp**: cột 学習項目 trong syllabus chính thức
  (`reference/syllabus-sach-vang.txt`, tải từ dekirunihongo.jp) — lớp chưa có
  tài liệu tóm tắt ngữ pháp riêng cho sách vàng nên toàn bộ desc/ví dụ đều do
  soạn thêm, giống cách đã làm với bài 12–15 của sách đỏ. Bảng trong file PDF
  gốc bị xáo cột khi trích xuất text (cột 学習項目 thường in sớm hơn cột ST một
  vài dòng), nên các mẫu ngữ pháp được gán vào bài dựa trên việc đối chiếu với
  câu できること (mô tả kỹ năng) của từng ST — chỗ nào vị trí trong bảng không
  khớp ngữ nghĩa rõ ràng thì ưu tiên xếp theo chủ đề của bài thay vì theo đúng
  vị trí dòng.
- **Kanji**: giáo trình sách vàng không có danh sách kanji riêng theo bài
  (khác sách đỏ có slide kanji cho bài 8–11), nên mảng `kanji` để trống ở toàn
  bộ 15 bài — không phải thiếu sót.

## Thêm nội dung cho một bài mới

1. Tạo `data/shokyu/lNN.js` (hoặc `data/shochukyu/lNN.js`) theo mẫu:

```js
JPD.lesson({
  id: 'shokyu-15', n: 15, jp: 'テレビ・雑誌から', vi: 'Từ TV & tạp chí',
  vocab: [
    { g: 'Tên nhóm', w: '言葉', k: 'ことば', m: 'Nghĩa tiếng Việt' }
  ],
  grammar: [
    { pat: 'Mẫu câu', desc: 'Giải thích',
      ex: [{ jp: 'Câu ví dụ。', vi: 'Dịch' }] }
  ],
  kanji: [
    { c: '漢', m: 'HÁN', on: 'カン', kun: '',
      w: [{ jp: '漢字', k: 'かんじ', vi: 'chữ Hán' }] }
  ]
});
```

`g` (nhóm), `k` (cách đọc) và `kanji` có thể để trống.

2. Trong `data/manifest.js`, điền `file` cho bài đó và cập nhật `words` /
   `grammar` / `kanji` (chỉ dùng để hiện trên thẻ ở trang chủ).

Không cần sửa code — thẻ sẽ tự sáng lên.

## Cấu trúc

```
index.html          shell + thẻ <script>
css/style.css       toàn bộ giao diện, có sáng/tối
js/store.js         tiến độ trong localStorage
js/data.js          nạp bài theo yêu cầu (dùng <script> vì file:// chặn fetch)
js/app.js           router theo hash + trang chủ
js/vocab.js         danh sách từ, tìm kiếm, đánh dấu đã thuộc
js/flash.js         flashcard (Space lật, ← →, Enter đánh dấu)
js/grammar.js       tra ngữ pháp
js/kanji.js         kanji theo bài
js/quiz.js          trắc nghiệm + xem lại câu sai
data/manifest.js    danh mục 2 quyển × 15 bài
data/shokyu/*.js    nội dung từng bài (sách đỏ)
data/shochukyu/*.js nội dung từng bài (sách vàng)
reference/*.txt     text đã giải mã từ PDF gốc, để đối chiếu
```
