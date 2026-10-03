# NOTES — bối cảnh & quy tắc làm việc (đọc file này đầu mỗi session)

## Bối cảnh
- Repo: https://github.com/caothang211006/jpd (nhánh main). Thư mục làm việc trên máy: `C:\Users\Dell\Downloads\jpd-main\jpd-git`.
- Claude chỉ sửa file trong `jpd-git`. Claude KHÔNG push được; người dùng tự chạy: `git add .` → `git commit -m "..."` → `git push`. Git chạy qua Claude trong thư mục này bị lỗi khóa file: Claude KHÔNG chạy bất kỳ lệnh git nào (kể cả `git status`), vì nó để lại `.git/index.lock` mà Claude không xóa được.
- Người dùng gửi ảnh vocab / kanji / ngữ pháp của từng unit; Claude nhập vào data đúng cấu trúc dưới đây.
- Claude không xem/nghe được video YouTube và không lấy được phụ đề. Nguồn ngữ pháp từ playlist "Dekiru N4" (HÀO TT, PLGHw6vGdBH8OfSg64YkFYdvzbBxNaEf3C): người dùng dán transcript hoặc ghi lại mẫu ngữ pháp.

## File
- `data/shochukyu/lNN.js` (sơ-trung cấp), `data/shokyu/lNN.js` (sơ cấp), `data/manifest.js` (số `words` / `grammar` / `kanji` mỗi bài, phải cập nhật khi thêm nội dung).
- Code: `js/flash.js`, `js/kanji.js`, `js/grammar.js`, `js/quiz.js`, `css/style.css`.

## Cấu trúc data
- vocab: `{g, w, k, m}` (nhóm, từ, cách đọc, nghĩa). Không có trường ví dụ riêng; câu ví dụ gộp vào `m`.
- grammar: `{pat, desc, ex:[{jp, ro, vi}]}`.
  - `desc`: dòng thường = đoạn văn; dòng bắt đầu bằng `•` = danh sách; ` → ` được tô màu.
  - `ex.jp` có furigana trong （）, `ro` = romaji, `vi` = nghĩa.
  - Mục cuối `pat: 'Tóm tắt'` (ex: []) hiện màu vàng. Mẫu trình bày: shochukyu bài 01.
- kanji: `{c, m, on, kun, w:[{jp, k, vi}]}`. `m` dạng `HÁN VIỆT — nghĩa tiếng Việt` (flashcard tách 2 phần). Mỗi chữ kèm từ ghép; từ ghép trùng ở nhiều chữ chỉ hiện một thẻ.
- Đề kiểm tra: 2 mảng riêng `examVocab` (ことばテスト) và `examGrammar` (文法テスト). Mảng `exam` cũ (shokyu 12-15) vẫn chạy, hiện thành "Đề luyện tập tổng hợp".
  - Mỗi câu: `{sec, t:'mcq', q, opt, ans}` | `{sec, t:'fill', q, acc:[...]}` | `{sec, t:'reading', passage, qs:[...]}`.
  - Trường thêm (tùy chọn): `pic` (emoji/mô tả thay cho hình), `box` (mảng từ trong khung), `hint` (dạng cần chia, VD `'て形'`).
  - `acc` so khớp bỏ khoảng trắng, dấu 。, và đồng nhất chữ full-width/half-width; nên ghi cả bản kanji lẫn hiragana nếu chấp nhận cả hai.
  - Route: `#/l/<id>/quiz` (chọn bài) · `quiz/tuvung` · `quiz/nguphap` · `quiz/de` (đề cũ) · `quiz/vocab` (luyện nhanh).

## Quy tắc sửa data
- Nhập theo ảnh người dùng gửi, KHÔNG so sánh hay báo khác biệt với dữ liệu cũ.
- Không chép nguyên bản dịch; dịch lại đúng ngữ cảnh.
- Động từ する: giữ する gắn với từ và cách đọc, không đưa vào nghĩa tiếng Việt. VD `w:'案内（する）', k:'あんない（する）'`.
- Phân biệt danh từ và động từ gần nghĩa (専門 ≠ 専攻する).
- Katakana: xác định từ gốc (thường tiếng Anh), viết nghĩa tiếng Việt theo từ gốc.
- Không bịa nội dung thi thật. Bài 12-15: `exam: []`; vocab/grammar bài 12-15 chờ tài liệu giáo viên.

## Quy tắc code
- Flashcard từ vựng: mặt trước kana, mặt sau kanji + nghĩa. Thẻ kanji: mặt trước chỉ chữ; mặt sau = ON/KUN + Âm Hán Việt + Nghĩa tiếng Việt (2 phần tách riêng, có nhãn). Thẻ từ ghép giữ nguyên.
- Trạng thái "đã thuộc" ghi về đúng bài gốc của thẻ (store).
- Mỗi phiên flashcard chỉ một listener bàn phím (`activeKeyHandler`).
- Tab kanji và tab vocab dùng cùng cơ chế đánh dấu thuộc (cùng bucket với flashcard).
- Trang kiểm tra ưu tiên chế độ thi thật; quiz từ vựng cũ ở `#/l/<id>/quiz/vocab`.
- Khi lật flashcard về mặt trước, mặt sau chỉ đổi nội dung sau ~480ms (tránh lộ nghĩa thẻ kế).

## Đề kiểm tra (làm cho mỗi unit)
- Làm RIÊNG 2 bài: **từ vựng 30 câu** và **ngữ pháp 30 câu**, không gộp. Điểm mặc định 1 điểm/câu (tổng 30), chưa chốt cách khác.
- Theo dạng đề mẫu của trường:
  - Từ vựng (ことばテスト): nhìn hình/nghĩa viết từ; chọn từ trong khung điền câu; đọc (hiragana ↔ kanji).
  - Ngữ pháp (文法テスト): chọn đáp án đúng; viết lại từ theo dạng cho sẵn; chọn từ trong khung rồi chia dạng.
- App đã tách 2 đề (xem Cấu trúc data). Câu nhìn hình dùng `pic` (emoji hoặc mô tả ngắn).

## Tình trạng
- Đã sửa trên máy (cần người dùng push nếu chưa): flashcard kanji Hán Việt/Việt, sửa lỗi lộ nghĩa khi lật, ngữ pháp shochukyu bài 01 (9 mục + romaji), giao diện trang ngữ pháp mới. Các phần giao diện chưa được mở trang kiểm tra.
- Đã làm (session 2): tách đề từ vựng / ngữ pháp (`js/quiz.js`, `css/style.css`); sửa lỗi mở link trực tiếp bài sách vàng bị đá về trang chủ (`js/data.js`). Đã chạy thử trên trình duyệt ảo.
- Chưa làm: ngữ pháp bài 3 theo video (app hiện có 7 mẫu theo syllabus: Nにします, Vすぎ, Vたら, ようと思っています, つもり, 疑問詞か, かどうか); nhập các unit tiếp theo từ ảnh + soạn 2 đề 30 câu cho mỗi unit.
