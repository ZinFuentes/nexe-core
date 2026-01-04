export default function SidebarLayout({ sidebar, children }) {
  return (
    <div className="h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      <div className="flex h-full w-full overflow-hidden">
        <div className="flex-shrink-0 bg-white border-r border-slate-200">
          {sidebar}
        </div>

        <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
