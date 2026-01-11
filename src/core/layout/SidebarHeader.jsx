import React, { useMemo } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import brandNexe from "../../assets/brand-nexe.png";

function getGreeting(now = new Date()) {
  const h = now.getHours();
  if (h >= 6 && h < 12) return "Bon dia";
  if (h >= 12 && h < 20) return "Bona tarda";
  return "Bona nit";
}

export default function SidebarHeader({ isCollapsed, onToggle }) {
  const { user } = useAuth();

  const greeting = useMemo(() => getGreeting(new Date()), []);
  const name = (user?.name || "").trim();
  const email = (user?.email || "").trim();
  const displayName = name || (email ? email.split("@")[0] : "");

  const Brand = (
    <img
      src={brandNexe}
      alt="NEXE"
      className="h-[26px] w-[26px] object-contain"
      draggable="false"
    />
  );

  return (
    <div className="w-full bg-white">
      <div className="h-14 flex items-center">
        <div className={["w-full", isCollapsed ? "px-0" : "px-2"].join(" ")}>
          <div className="h-9 flex items-center rounded-md">
            {/* LEFT SLOT */}
            <div
              className={[
                "shrink-0 h-9 flex items-center justify-center",
                isCollapsed ? "w-14" : "w-10",
              ].join(" ")}
            >
              {isCollapsed ? (
                <button
                  type="button"
                  onClick={onToggle}
                  aria-label="Obrir sidebar"
                  title="Obrir"
                  className="group h-9 w-full flex items-center justify-center rounded-md hover:bg-slate-100"
                >
                  <span className="block group-hover:hidden">{Brand}</span>
                  <span className="hidden group-hover:block text-slate-700">
                    <Menu size={20} />
                  </span>
                </button>
              ) : (
                Brand
              )}
            </div>

            {/* CENTER */}
            {!isCollapsed && (
              <div className="min-w-0 flex-1 px-2">
                <div className="truncate text-[12px] font-semibold leading-tight text-slate-900">
                  {greeting}
                  {displayName ? `, ${displayName}` : ""}
                </div>
                <div className="truncate text-[10px] font-medium leading-tight text-slate-400">
                  {displayName ? "Sessió activa" : "Sessió no iniciada"}
                </div>
              </div>
            )}

            {/* RIGHT SLOT */}
            {!isCollapsed && (
              <button
                type="button"
                onClick={onToggle}
                aria-label="Tancar sidebar"
                title="Tancar"
                className="shrink-0 h-9 w-10 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              >
                <Menu size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
