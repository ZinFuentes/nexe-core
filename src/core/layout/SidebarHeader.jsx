import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function SidebarHeader({
  centreName = "Jacint Verdaguer",
  isCollapsed,
  onToggle
}) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = dateTime.toLocaleTimeString("ca-ES", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className={`relative w-full bg-white ${isCollapsed ? "h-[52px]" : "h-[64px]"}`}>
      {!isCollapsed && (
        <div className="absolute top-2 left-3 select-none leading-tight max-w-[180px]">
          <div className="text-[13px] font-medium tracking-tight text-slate-800 truncate">
            {centreName}
          </div>
          <div className="mt-1 text-[10px] font-semibold tracking-widest text-slate-400 tabular-nums">
            · {formattedTime} h
          </div>
        </div>
      )}

      <button
        onClick={onToggle}
        type="button"
        aria-label="Toggle sidebar"
        className="absolute top-2 right-2 p-1 rounded-md outline-none text-slate-300 hover:text-slate-500 transition-colors"
      >
        <Menu size={16} />
      </button>
    </div>
  );
}

