import React, { useState } from "react";

export default function Sidebar({ header, center, footer }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => setIsCollapsed((v) => !v);

  return (
    <aside
      className={[
        "flex flex-col",
        "h-[calc(100vh-12px)]",
        "my-1.5",
        "bg-white",
        "border-r border-slate-200",
        "overflow-hidden",
        isCollapsed ? "w-14" : "w-[240px]",
        "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
      ].join(" ")}
    >
      <div className="shrink-0">
        {header && React.cloneElement(header, { isCollapsed, onToggle: toggle })}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-0 pt-2">
        {center && React.cloneElement(center, { isCollapsed })}
      </div>

      <div className="shrink-0 border-t border-slate-200 px-0 py-1.5">
        {footer && React.cloneElement(footer, { isCollapsed })}
      </div>
    </aside>
  );
}
