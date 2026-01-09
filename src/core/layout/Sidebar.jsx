import React, { useState } from "react";

export default function Sidebar({ header, center, footer }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => setIsCollapsed((v) => !v);

  return (
    <aside
      className={`
        flex flex-col h-full bg-white border-r border-slate-200
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        overflow-hidden
        ${isCollapsed ? "w-[68px]" : "w-[220px]"}
      `}
    >
      {/* Zona Branding */}
      <div className="flex-shrink-0">
        {header && React.cloneElement(header, { isCollapsed, onToggle: toggle })}
      </div>

      {/* Zona Navegación */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {center && React.cloneElement(center, { isCollapsed })}
      </div>

      {/* Zona Usuario */}
      <div
        className={`
          flex-shrink-0 border-t border-slate-100/60 bg-white
          ${isCollapsed ? "p-1" : "p-1.5"}
        `}
      >
        {footer && React.cloneElement(footer, { isCollapsed })}
      </div>
    </aside>
  );
}
