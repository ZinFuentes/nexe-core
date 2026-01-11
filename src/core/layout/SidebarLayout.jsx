// =======================================================
// SidebarLayout — FINAL
// - Evita dobles bg/border: la sidebar ya se pinta a sí misma.
// =======================================================

export default function SidebarLayout({ sidebar, children }) {
  return (
    <div className="h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      <div className="flex h-full w-full overflow-hidden">
        <div className="shrink-0 h-full">{sidebar}</div>
        <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
