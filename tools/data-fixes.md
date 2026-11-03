# Thay đổi data đã làm

Mỗi dòng: file | vị trí | trước -> sau | lý do. Vị trí "TV" = examVocab, "NP" = examGrammar, đánh số đề và câu theo thứ tự trong file (trước khi xáo).

## Lỗi đề đã liệt kê

- data/shochukyu/l07.js | NP1 câu 25 | q "社長はもう＿＿＿。（尊敬語（そんけいご）で）" -> "社長はもう＿＿＿。［尊敬語（そんけいご）で］" | ngoặc （ lồng trong （ làm công cụ bỏ furigana để lại "で）"; đổi sang ［］, nội dung giữ nguyên. Bản dịch giữ nguyên, bỏ trCheck.
- data/shochukyu/l06.js | TV4 câu 15 | (lần 1: vá trong js/quiz.js — đã gỡ ở lần 2, xem mục "Lần 2"). Bỏ trCheck.
- data/shochukyu/l04.js | TV5 câu 8 | xóa tr "Trung tâm (VD: trung tâm cư dân) — viết bằng katakana" | câu là đề viết từ bằng tiếng Việt, không phải câu cần dịch; khi trả lời app hiện dòng "Từ: センター". Bỏ trCheck.
- data/shochukyu/l11.js | TV2 câu 20 | (lần 1: vá trong js/quiz.js — đã gỡ ở lần 2, xem mục "Lần 2"). Bỏ trCheck.

## Soát 25 câu trCheck

Đã sửa bản dịch (và bỏ trCheck):
- data/shochukyu/l05.js | TV1 câu 18 | "…làm gãy cái ghế…" -> "Vừa ngồi lên ghế thì tôi đã làm hỏng cái ghế mất rồi." | 壊す = làm hỏng/vỡ, không riêng "gãy".
- data/shochukyu/l06.js | NP4 câu 3 | "Hôm nay là Chủ nhật nên…" -> "Hôm nay lại là Chủ nhật nên đường đông nhỉ." | ～し nêu lý do kèm ý "lại còn".
- data/shochukyu/l07.js | NP5 câu 1 | "Thầy có biết là thầy giáo đã viết…" -> "Anh/chị có biết chuyện thầy đã viết cuốn sách này không ạ?" | ご存じ là kính ngữ cho người nghe, không phải cho 先生.
- data/shochukyu/l07.js | NP5 câu 27 | "Thái hành boa-rô thành sợi nhỏ…" -> "Thái nhỏ hành lá rồi cho vào canh miso." | ネギ cho vào canh miso là hành lá; 細く切る = thái nhỏ.
- data/shochukyu/l08.js | TV4 câu 13 | "…người hàng xóm giúp đỡ." -> "…người dân sống gần đó giúp đỡ." | lạc trên núi, 近所の人 = người ở gần đó.
- data/shochukyu/l12.js | TV5 câu 12 | "…dùng dụng cụ kéo giãn cổ để kéo giãn cổ." -> "Khi bị đau cổ, tôi kéo giãn cổ bằng dụng cụ giãn cổ (neck stretcher)." | câu lặp.
- data/shochukyu/l14.js | NP5 câu 12 | "…hay là mình chọn món…nhỉ." -> "Khi tặng quà, chắc mình sẽ chọn món mà người nhận sẽ thích." | V-ようかな = tự nhủ ý định.

Bản dịch đúng, chỉ bỏ trCheck: l03 TV2 câu 19, l04 NP1 câu 11, l04 NP2 câu 4, l07 NP1 câu 25, l06 TV4 câu 15, l10 TV2 câu 17, l10 NP4 câu 30, l11 TV2 câu 20, l13 NP4 câu 25, l13 NP5 câu 28, l14 TV5 câu 17, l15 NP4 câu 11.

## Soát 30 câu ngẫu nhiên có tr

Chọn bằng seed cố định 20261017 trong 1965 câu có tr không đánh trCheck. 29/30 đúng. Sửa 1:
- data/shochukyu/l11.js | NP4 câu 1 | "Từ khi đến Nhật, ngày nào tôi cũng xem…" -> "Từ khi đến Nhật, tôi đã bắt đầu xem tin tức Nhật Bản mỗi ngày." | ～ようになりました = thay đổi thói quen, bản cũ mất ý này.

## l09 (KHÔNG sửa — chỉ nhận định)

Năm câu trCheck của l09 giữ nguyên, kể cả dấu trCheck:
- NP1 câu 29 マニュアルを見れば、すぐわかりますよ — vế sau không phải ý chí/nhờ vả. Đúng.
- NP2 câu 3 静かなら、ここで勉強してもいいですよ — なら + cho phép. Đúng.
- NP3 câu 27 明日晴れれば、ピクニックに行きましょう; NP4 câu 30 仕事が早く終われば、飲みに行きましょう; NP5 câu 27 洗濯物が乾けば、しまってください — vế ば dùng động từ không ý chí (晴れる・終わる・乾く), chủ ngữ khác vế sau, nên vế sau ý chí/nhờ vả vẫn chấp nhận được. Văn nói tự nhiên hơn với たら (晴れたら・終わったら・乾いたら). Bản dịch cả 5 câu đúng nghĩa.
- Đề xuất nếu muốn sửa: đổi đáp án sang たら hoặc thêm why nói rõ quy tắc trên. Chờ quyết định.

## Nhóm động từ

- Thêm trường `vt` vào 433 từ vựng ở 28 file (cả l09, vì đây là trường mới, không đổi nội dung bài). Chi tiết: tools/verb-check.md.

Kiểm tra: so từng bài cũ/mới bằng Node — ngoài các dòng trên và trường `vt`, data không đổi gì.

## Lần 2

Đưa 2 chỗ vá trong code về data. Thêm trường `full` (câu đã điền đáp án, có furigana); explain() dùng `full` khi có, còn lại như cũ (điền chỗ trống đầu). Không đổi q, opt, ans nên thứ tự đề và mã băm order-check không đổi.
- data/shochukyu/l06.js | TV4 câu 15 | thêm full: "このホテルには朝食付きのプランと朝食なしのプランがあります。" | câu 2 chỗ trống, điền cả hai.
- data/shochukyu/l11.js | TV2 câu 20 | thêm full: "…食事代がたくさんかかりました。" ("食事～代" -> "食事代") | bỏ ký hiệu ～. Lựa chọn "～代" trong khung giữ nguyên như sách.

Nhóm động từ:
- data/shochukyu/l09.js | vocab 焦げる | thêm vtCheck: true | data không có dạng chia nào để đối chiếu nhóm II.
- data/shochukyu/l11.js | vocab 折れる | thêm vtCheck: true | như trên.

## Lần 3 — kanji bài 1–5 từ ảnh (kanji_1-5.zip)

Ảnh: 14 ảnh sổ kanji sách vàng — 第1課 tr.7 (3 ảnh trùng), tr.8, tr.9; 第2課 tr.17, 18, 19; 第3課 tr.27, 28, 29; 第4課 tr.39, 40, 41. Không có trang của bài 5.
Kết quả: KHÔNG thêm chữ nào. 44 chữ chính (số 1–44) đều đã có trong data bài 1–4 với cùng chữ và bài; bài 5 (chữ 45–54) có sẵn từ trước, không có ảnh để đối chiếu.
Mục 読める／見て、わかる trên ảnh là từ, không phải bảng kanji → không thêm (theo yêu cầu chỉ thêm kanji).

Chênh lệch ảnh ↔ data (KHÔNG ghi đè, chờ xác nhận):
- 仕: On ảnh có thêm ジ. 事: On ảnh có thêm ズ. 教: Kun ảnh có thêm おそ・わる. 転: Kun ảnh có thêm ころ・がす、ころ・がる、ころ・げる. 留: Kun ảnh có thêm と・まる.
- 品: từ ghép ảnh ghi スポーツ用品, data ghi 用品. 引: Kun ảnh có thêm ひ・ける. 切: Kun ảnh có thêm き・れる. 開: Kun ảnh có thêm ひら・ける. 閉: Kun ảnh có thêm と・ざす、と・じる.
- 明: dòng cách đọc in rất nhỏ; đọc được あか・す、あか・らむ、あか・り、あか・るむ、あき・らか、あ・くる (data chưa có) — chờ xác nhận.
- Data có thêm từ ghép không có trên trang: 験→受験, 民→区民.
- Bài 1–4: data lưu các chữ của mục 読める／見て、わかる thành mục kanji riêng (bài 1: 可 給 履 歴 書; bài 2: 払 返 無 価 税 込; bài 3: 専 門 就 職 必 着; bài 4: 申 込 参 加 他 費 在 勤). Chữ thuộc 見て、わかる (bài 2: 価 税 込; bài 3: 必 着; bài 4: 費 在 勤) vì vậy đang có trong trang kanji và flashcard kanji — trái quy tắc đã chốt; chưa sửa (cần xóa/chuyển mục cũ). Ô tìm kanji (js/search.js) bỏ qua các chữ này.
- Từ ghép kanji bài 1–4 chưa có trường hv (bài 5–15 có); ảnh không ghi Hán Việt nên không bổ sung.
