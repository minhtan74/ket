'use client';

// Nút Xoá có confirm() trước khi submit form (form dùng Server Action).
// Tương đương onsubmit="return confirm(...)" của các form Admin trong bản PHP.
export default function DeleteButton({ message = 'Xoá mục này?' }) {
  return (
    <button
      type="submit"
      className="btn-delete"
      onClick={(e) => {
        if (!confirm(message)) {
          e.preventDefault();
        }
      }}
    >
      Xoá
    </button>
  );
}
