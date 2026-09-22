// Thông báo "Đã lưu / Đã xoá" sau khi redirect, đọc từ ?msg=. Dùng chung cho
// mọi trang admin index. Tương đương các đoạn if ($message === 'saved') của PHP.
export default function AdminFlash({ msg, messages }) {
  if (!msg) return null;
  const text = messages?.[msg];
  if (!text) return null;
  return <p className="flash-success">{text}</p>;
}
