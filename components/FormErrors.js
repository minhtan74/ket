// Khối hiển thị lỗi validate trên các form admin. Tương đương khối
// <div class="flash-error"> lặp qua $errors của PHP.
export default function FormErrors({ errors }) {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="flash-error">
      {errors.map((error, i) => (
        <p key={i}>{error}</p>
      ))}
    </div>
  );
}
