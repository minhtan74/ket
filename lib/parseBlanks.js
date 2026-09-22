// Helper dùng chung cho Part 4 / Part 5 (Open Cloze) / Part 7: tách một đoạn
// text có marker {{n}} thành mảng các đoạn text thường + vị trí chỗ trống.
// Khác bản PHP (nối chuỗi HTML thủ công rồi echo ra), ở đây ta trả về dữ liệu
// thuần để React tự render + tự escape (an toàn hơn, không cần dangerouslySetInnerHTML).
//
// Ví dụ: "I {{0}} you." -> [
//   { type: 'text', value: 'I ' },
//   { type: 'blank', number: 0 },
//   { type: 'text', value: ' you.' },
// ]
export function splitByBlanks(rawText) {
  const text = rawText || '';
  const parts = [];
  const regex = /\{\{(\d+)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'blank', number: parseInt(match[1], 10) });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts;
}

// Tách một đoạn text thường (không marker) thành các dòng để chèn <br/>
// giữa các dòng, thay cho nl2br() của PHP.
export function splitLines(text) {
  return text.split('\n');
}
