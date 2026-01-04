import { MoreHorizontal } from "lucide-react";

export default function SidebarFooter({
  userName = "Usuari",
  userRole = "Docent",
  userPhoto = null,
  isCollapsed
}) {
  const initial = userName ? userName[0].toUpperCase() : "U";

  return (
    <button
      type="button"
      className={`
        flex w-full items-center rounded-md outline-none
        transition-colors duration-150
        ${isCollapsed ? "justify-center p-1" : "gap-2 px-2 py-1.5 hover:bg-slate-50"}
      `}
      aria-label="User menu"
    >
      {/* Avatar */}
      <div className="h-[26px] w-[26px] rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 border border-slate-100">
        {userPhoto ? (
          <img src={userPhoto} alt={userName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-[11px] font-bold text-slate-600">{initial}</span>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="flex flex-col items-start min-w-0 text-left">
            <div className="text-[13px] font-medium leading-tight truncate text-slate-900 w-full">
              {userName}
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight truncate w-full">
              {userRole}
            </div>
          </div>

          <MoreHorizontal size={15} className="ml-auto text-slate-300" />
        </>
      )}
    </button>
  );
}
