import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { NAVIGATION_CONFIG } from "../config/navigation";

export default function SidebarNav({ isCollapsed }) {
  return (
    <nav className="flex flex-col h-full">
      {/* Aire bajo la marca */}
      <div className={`${isCollapsed ? "h-4" : "h-12"}`} />

      {/* DASHBOARDS */}
      <div className="px-3 space-y-1">
        {NAVIGATION_CONFIG.dashboards.map((item) => (
          <NavLink key={item.key} to={item.path} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <NavItem
                item={item}
                isActive={isActive}
                isCollapsed={isCollapsed}
                emphasis="primary"
              />
            )}
          </NavLink>
        ))}
      </div>

      {/* Separación por espacio, no por línea */}
      <div className={`${isCollapsed ? "h-4" : "h-6"}`} />

      {/* ARXIU / REPOS */}
      <div className="px-3 flex-1">
          {!isCollapsed && (
            <div className="px-1 mb-3 text-[11px] font-semibold text-slate-500 uppercase tracking-widest opacity-80">
              REPOSITORIS
            </div>
          )}

        <div className="space-y-1">
          {NAVIGATION_CONFIG.repositories.map((item) => (
            <NavLink key={item.key} to={item.path} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <NavItem
                  item={item}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                  emphasis="normal"
                />
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
