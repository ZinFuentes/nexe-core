import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { NAVIGATION_CONFIG } from "../config/navigation";

export default function SidebarNav({ isCollapsed }) {
  const dashboards = NAVIGATION_CONFIG?.dashboards || [];
  const repositories = NAVIGATION_CONFIG?.repositories || [];

  const sections = [
    { key: "dashboards", title: "Dashboards", items: dashboards },
    { key: "repositories", title: "Repositoris", items: repositories },
  ].filter((s) => (s.items || []).length > 0);

  return (
    <nav className="w-full px-0">
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <div key={section.key} className="flex flex-col gap-1">
            {!isCollapsed ? (
              <div className="px-2 pt-1 text-[10px] font-semibold tracking-widest text-slate-400">
                {section.title.toUpperCase()}
              </div>
            ) : null}

            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.key || item.path}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <NavItem
                      item={item}
                      isCollapsed={isCollapsed}
                      isActive={isActive}
                      emphasis={section.key === "repositories" ? "primary" : "normal"}
                    />
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
