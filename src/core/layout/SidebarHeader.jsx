export default function SidebarHeader({ greeting, centreName, isCollapsed }) {
  if (isCollapsed) {
    return (
      <div className="flex items-start justify-center pt-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-[13px] font-medium text-text-primary">
          N
        </div>
      </div>
    );
  }

  return (
    <div className="pl-2 border-l-2 border-text-primary/80 leading-tight">
      <div className="text-[13px] font-medium text-text-primary">
        {greeting}
      </div>
      <div className="mt-0.5 text-[11px] font-normal text-text-tertiary">
        {centreName}
      </div>
    </div>
  );
}
