// Thanh tab điều hướng nhanh giữa các Part (dùng chung cho mọi trang làm bài
// và trang kết quả). Tương đương app/views/partials/nav_tabs.php.
// Cách dùng: <NavTabs active="part1" />

const NAV_TABS = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'part1', label: 'Part 1', href: '/ket/reading/part1?id=1' },
  { key: 'part4', label: 'Part 4', href: '/ket/reading/part4?id=1' },
  { key: 'part5', label: 'Part 5', href: '/ket/reading/part5?id=1' },
  { key: 'part6', label: 'Part 6', href: '/ket/reading/part6?id=1' },
  { key: 'part7', label: 'Part 7', href: '/ket/reading/part7' },
  { key: 'listening1', label: 'Listening 1', href: '/ket/listening/part1' },
];

export default function NavTabs({ active }) {
  return (
    <nav className="tab-bar">
      {NAV_TABS.map((tab) => (
        <a
          key={tab.key}
          href={tab.href}
          className={`tab-bar-item${active === tab.key ? ' active' : ''}`}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
