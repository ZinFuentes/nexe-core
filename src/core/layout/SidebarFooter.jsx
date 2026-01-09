import { Mail, MoreHorizontal } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function SidebarFooter({ isCollapsed }) {
  const { user } = useAuth();

  const email = (user?.email || "").trim();
  const name = (user?.name || "").trim();
  const surname = (user?.surname || "").trim();
  const cargo = (user?.cargo || "").trim();

  const fullName = `${name} ${surname}`.trim() || email || "Usuari";
  const displayCargo = cargo || "Sense càrrec";

  return (
    <button
      type="button"
      className={`
        flex w-full items-center rounded-md outline-none
        transition-colors duration-150
        ${isCollapsed ? "justify-center p-1" : "gap-2 px-2 py-1.5 hover:bg-slate-50"}
      `}
      aria-label="User menu"
      title={email || fullName}
    >
      <div className="h-[26px] w-[26px] rounded-full bg-slate-100 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 text-slate-600">
        <Mail size={16} />
      </div>

      {!isCollapsed && (
        <>
          <div className="flex flex-col items-start min-w-0 text-left">
            <div className="text-[13px] font-medium leading-tight truncate text-slate-900 w-full">
              {fullName}
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight truncate w-full">
              {displayCargo}
            </div>
          </div>

          <MoreHorizontal size={15} className="ml-auto text-slate-300" />
        </>
      )}
    </button>
  );
}
