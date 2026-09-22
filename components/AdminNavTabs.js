// Thanh tab điều hướng giữa các khu Admin. Tương đương
// app/views/partials/admin_nav_tabs.php. Không có tab cho Part 5 (Open Cloze)
// vì bản gốc cũng không có Admin cho Part 5.

const ADMIN_NAV_TABS = [
  { key: 'admin1', label: 'Part 1', href: '/admin/part1' },
  { key: 'admin4', label: 'Part 4', href: '/admin/part4' },
  { key: 'admin6', label: 'Part 6', href: '/admin/part6' },
  { key: 'admin7', label: 'Part 7', href: '/admin/part7' },
  { key: 'adminListening1', label: 'Listening 1', href: '/admin/listening/part1' },
  { key: 'adminListening3', label: 'Listening 3', href: '/admin/listening/part3' },
];

export default function AdminNavTabs({ active }) {
  return (
    <nav className="tab-bar tab-bar-admin">
      <span className="tab-bar-admin-badge">ADMIN</span>
      {ADMIN_NAV_TABS.map((tab) => (
        <a
          key={tab.key}
          href={tab.href}
          className={`tab-bar-item${active === tab.key ? ' active' : ''}`}
        >
          {tab.label}
        </a>
      ))}
      <a href="/" className="tab-bar-item tab-bar-home-link">
        &larr; Trang chủ
      </a>
    </nav>
  );
}
