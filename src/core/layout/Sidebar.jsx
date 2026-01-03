export default function Sidebar({ header, center, footer }) {
  return (
    <aside
      className="flex h-full flex-col border-r border-border bg-surface"
      style={{ width: 280 }}
    >
      <div className="px-6" style={{ height: "20%" }}>
        {header}
      </div>

      <div className="flex-1 px-6" style={{ height: "60%" }}>
        {center}
      </div>

      <div className="px-6" style={{ height: "15%" }}>
        {footer}
      </div>
    </aside>
  );
}
