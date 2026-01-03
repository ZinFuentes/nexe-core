import { MoreHorizontal } from "lucide-react";

export default function SidebarFooter({ userName, userRole }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left
                 hover:bg-surfaceHover transition-colors"
    >
      <div className="h-8 w-8 rounded-full bg-borderStrong/40 flex items-center justify-center text-[12px] font-medium text-text-secondary">
        {userName?.[0] ?? "U"}
      </div>

      <div className="flex flex-col items-start min-w-0">
        <div className="text-[13px] font-medium leading-tight truncate">
          {userName}
        </div>
        <div className="text-[11px] text-text-tertiary leading-tight truncate">
          {userRole}
        </div>
      </div>

      <MoreHorizontal
        size={16}
        strokeWidth={1.75}
        className="ml-auto text-text-tertiary"
      />
    </button>
  );
}
