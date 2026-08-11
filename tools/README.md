# Giải mã PDF tiếng Nhật bị lỗi font

Các PDF của lớp (`New words list`, `TOM-TAT-NGU-PHAP-*`, syllabus…) nhúng font
theo bộ **Adobe-Japan1**. `pdftotext` không tra được bộ này nên nó xuất thẳng số
CID ra thay vì Unicode — kết quả là chữ Nhật biến thành ký tự Hy Lạp/Cyrillic
lung tung, còn dấu tiếng Việt thì mất sạch.

`decode.ps1` sửa lại việc đó:

1. Đảo ngược các đoạn bị `pdftotext` xuất theo thứ tự thị giác (bidi).
2. Tra CID → Unicode bằng bảng `Adobe-Japan1-cidToUnicode.txt` (dòng thứ N ứng
   với CID N-1) → chữ Nhật đúng.
3. Thay các glyph tiếng Việt bị map nhầm, theo bảng `viet-subs.tsv`.

Bước 3 phải xét ngữ cảnh: vài codepoint sai trùng với kana thật (`ー` trường âm,
`っ` tsu nhỏ…), nên chỉ đổi khi ký tự đó nằm trong một từ hệ Latin.

## Cách dùng

```bash
pdftotext -enc UTF-8 "tai-lieu.pdf" raw.txt
```

```bash
powershell -ExecutionPolicy Bypass -File tools/decode.ps1 -In raw.txt -Out sach.txt
```

Thêm `-layout` cho `pdftotext` nếu muốn giữ bố cục cột; bỏ đi thì text ra theo
thứ tự đọc, dễ tách từ vựng hơn.

## Khi gặp PDF mới còn chữ lạ

Mỗi PDF nhúng font hơi khác nhau nên có thể còn vài glyph chưa có trong bảng.
Tìm chúng bằng cách xem những ký tự không phải ASCII mà lại nằm cạnh chữ Latin,
đoán ký tự đúng từ ngữ cảnh, rồi thêm một dòng vào `viet-subs.tsv`:

```
<codepoint hex>	<ký tự đúng>
```

Ví dụ `8375	ẳ` — glyph này ban đầu bị đoán nhầm là `ò`, làm "thẳng" thành "thòng".

Một vài ký tự không tự sửa được vì chúng rơi trúng chữ ASCII thường dùng
(ví dụ `ĩ` ra thành `b`, nên "Ầm ĩ" thành "Ầm b") — chỗ đó phải sửa tay.
