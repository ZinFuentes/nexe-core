import { ChevronRight, Circle } from "lucide-react";


export default function NavItem({ item, isActive, isCollapsed, emphasis = "normal", onClick }) {
  if (!item) return null;

  const isPrimary = emphasis === "primary";
  const Icon = item.icon || Circle;

  return (
    <button
      onClick={onClick}
      type="button"
      className={[
        "group relative w-full outline-none rounded-md transition-colors duration-75",
        "h-9",
        isCollapsed ? "px-0" : "px-2",
      ].join(" ")}
      title={isCollapsed ? item.label : ""}
    >
      <div
        className={[
          "absolute inset-0 rounded-md transition-opacity duration-75",
          isActive ? "bg-slate-100/80 opacity-100" : "opacity-0 group-hover:bg-slate-100/60 group-hover:opacity-100",
        ].join(" ")}
      />

      <div className="relative z-10 flex h-full w-full items-center">
        <span className={[
          "shrink-0 flex items-center justify-center",
          isCollapsed ? "w-14" : "w-10",
        ].join(" ")}>
          <Icon
            size={18}
            strokeWidth={isActive ? 2 : 1.5}
            className="transition-opacity duration-150"
            style={{ color: item.color, opacity: isActive ? 1 : 0.72 }}
          />
        </span>

        {!isCollapsed && (
          <div className="flex min-w-0 flex-1 items-center justify-between">
            <span
              className={[
                "min-w-0 truncate leading-none transition-transform duration-150 group-hover:translate-x-0.5",
                isActive ? "text-slate-950 font-semibold" : "text-slate-600 font-medium group-hover:text-slate-900",
                "text-[14px]",
              ].join(" ")}
            >
              {item.label}
            </span>

            {isPrimary && (
              <ChevronRight
                size={14}
                className={[
                  "shrink-0 transition-opacity duration-150",
                  isActive ? "text-slate-400 opacity-80" : "opacity-0 group-hover:opacity-30",
                ].join(" ")}
                aria-hidden
              />
            )}
          </div>
        )}
      </div>
    </button>
  );
}
