import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";

function DockRow({ isActive, isCollapsed, icon, label }) {
  return (
    <button
      type="button"
      className={[
        "group relative w-full rounded-md outline-none transition-colors duration-75",
        "h-9",
        isCollapsed ? "px-0" : "px-2",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 rounded-md transition-opacity duration-75",
          isActive
            ? "bg-slate-100/80 opacity-100"
            : "opacity-0 group-hover:bg-slate-100/60 group-hover:opacity-100",
        ].join(" ")}
      />

      <div className="relative z-10 flex h-full w-full items-center">
        <span
          className={[
            "shrink-0 flex items-center justify-center",
            isCollapsed ? "w-14" : "w-10",
          ].join(" ")}
        >
          {icon}
        </span>

        {!isCollapsed && (
          <span className="truncate text-[13px] font-medium text-slate-900">
            {label}
          </span>
        )}
      </div>
    </button>
  );
}

export default function SidebarFooter({ isCollapsed, configPath = "/config" }) {
  return (
    <NavLink to={configPath} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <DockRow
          isActive={isActive}
          isCollapsed={isCollapsed}
          label="Configuració"
          icon={<Settings size={18} className="text-slate-600" />}
        />
      )}
    </NavLink>
  );
}
