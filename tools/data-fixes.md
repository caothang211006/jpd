# Thay đổi data đã làm

Mỗi dòng: file | vị trí | trước -> sau | lý do. Vị trí "TV" = examVocab, "NP" = examGrammar, đánh số đề và câu theo thứ tự trong file (trước khi xáo).

## Lỗi đề đã liệt kê

- data/shochukyu/l07.js | NP1 câu 25 | q "社長はもう＿＿＿。（尊敬語（そんけいご）で）" -> "社長はもう＿＿＿。［尊敬語（そんけいご）で］" | ngoặc （ lồng trong （ làm công cụ bỏ furigana để lại "で）"; đổi sang ［］, nội dung giữ nguyên. Bản dịch giữ nguyên, bỏ trCheck.
- data/shochukyu/l06.js | TV4 câu 15 | không đổi data | câu có 2 chỗ trống, phần Dịch chỉ điền chỗ đầu. Sửa ở js/quiz.js (filledSentence điền mọi chỗ ＿). Bỏ trCheck.
- data/shochukyu/l04.js | TV5 câu 8 | xóa tr "Trung tâm (VD: trung tâm cư dân) — viết bằng katakana" | câu là đề viết từ bằng tiếng Việt, không phải câu cần dịch; khi trả lời app hiện dòng "Từ: センター". Bỏ trCheck.
- data/shochukyu/l11.js | TV2 câu 20 | không đổi data | đáp án "～代" điền vào câu thành "食事～代". Sửa ở js/quiz.js (bỏ ～ đầu đáp án khi điền) -> "食事代". Bỏ trCheck.

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
