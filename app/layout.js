import './globals.css';

export const metadata = {
  title: 'KET Practice',
  description: 'Luyện thi Cambridge KET (A2 Key) — Reading & Writing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
