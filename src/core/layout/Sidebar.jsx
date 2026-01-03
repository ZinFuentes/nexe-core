import { useState } from "react";

export default function Sidebar({ header, center, footer }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={[
        "relative h-full shrink-0 border-r border-border bg-surface",
        collapsed ? "w-[72px]" : "w-[240px]",
      ].join(" ")}
    >
      <div className="grid h-full" style={{ gridTemplateRows: "84px 1fr 72px" }}>
        <div className={collapsed ? "px-3 py-3" : "px-5 py-3"}>
          {header}
        </div>

        <div className={collapsed ? "min-h-0 px-2 py-2 overflow-y-auto" : "min-h-0 px-5 py-2 overflow-y-auto"}>
          {center}
        </div>

        <div className={collapsed ? "px-3 py-3 border-t border-border" : "px-5 py-3 border-t border-border"}>
          {footer}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={[
          "absolute right-2 top-3 z-50",
          "flex h-8 w-8 items-center justify-center rounded-full",
          "border border-border bg-surface shadow-sm",
          "text-text-tertiary hover:text-text-secondary hover:bg-surfaceHover/60",
        ].join(" ")}
        title={collapsed ? "Obrir" : "Tancar"}
      >
        <span className="text-[18px] leading-none">{collapsed ? "›" : "‹"}</span>
      </button>
    </aside>
  );
}
