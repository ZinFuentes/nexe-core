function NavItem({ label, colorClass }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left hover:bg-surfaceHover"
    >
      <span className={`h-2 w-2 rounded-full ${colorClass}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default function SidebarNav() {
  return (
    <div className="flex h-full flex-col py-6">
      <div className="space-y-2">
        <NavItem label="L'escola, avui" colorClass="bg-module-school" />
        <NavItem label="El meu espai" colorClass="bg-module-me" />
      </div>

      <div className="mt-8 text-[13px] text-text-tertiary">REPOSITORIS</div>

      <div className="mt-2 space-y-2">
        <NavItem label="Sabers" colorClass="bg-module-knowledge" />
        <NavItem label="Persones" colorClass="bg-module-people" />
        <NavItem label="Papers" colorClass="bg-module-papers" />
        <NavItem label="Gestió" colorClass="bg-module-management" />
      </div>
    </div>
  );
}
