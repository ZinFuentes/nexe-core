export default function SidebarFooter({ userName, userRole }) {
  return (
    <div className="flex h-full items-end py-6">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md border border-border bg-surface px-3 py-3 hover:bg-surfaceHover"
      >
        <div className="h-10 w-10 rounded-full bg-borderStrong" />
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{userName}</div>
          <div className="text-[13px] text-text-secondary">{userRole}</div>
        </div>
      </button>
    </div>
  );
}
