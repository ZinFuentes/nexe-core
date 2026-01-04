import React from "react";
import { ChevronRight, Circle } from "lucide-react";

const DESIGN = {
  height: { primary: "h-[32px]", secondary: "h-[28px]" },
  text: {
    inactive: "text-slate-600 font-medium",
    active: "text-slate-950 font-semibold",
    hover: "group-hover:text-slate-900"
  },
  icon: {
    sizePrimary: 18,
    sizeSecondary: 16,
    opacityInactive: 0.7,
    strokeActive: 2,
    strokeInactive: 1.5
  }
};

export default function NavItem({ item, isActive, isCollapsed, emphasis = "normal", onClick }) {
  if (!item) return null;

  const isPrimary = emphasis === "primary";
  const Icon = item.icon || Circle;

  const containerHeight = isPrimary ? DESIGN.height.primary : DESIGN.height.secondary;
  const iconSize = isPrimary ? DESIGN.icon.sizePrimary : DESIGN.icon.sizeSecondary;
  const textSize = isPrimary ? "text-[14px]" : "text-[13px]";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        group relative flex items-center w-full cursor-pointer
        transition-all duration-75 rounded-md outline-none
        ${isCollapsed ? "px-0" : "px-2"}
        ${containerHeight}
      `}
      title={isCollapsed ? item.label : ""}
    >
      <div
        className={`
          absolute inset-0 rounded-md transition-all duration-75
          ${isActive ? "bg-slate-100/80 opacity-100" : "opacity-0 group-hover:bg-slate-100/60 group-hover:opacity-100"}
        `}
      />

      <div className="relative z-10 flex items-center w-full h-full min-w-0 overflow-hidden">
        <Icon
          size={iconSize}
          strokeWidth={isActive ? DESIGN.icon.strokeActive : DESIGN.icon.strokeInactive}
          className={`shrink-0 transition-all duration-200 ${isCollapsed ? "mx-auto" : "mr-2.5"}`}
          style={{ color: item.color, opacity: isActive ? 1 : DESIGN.icon.opacityInactive }}
        />

        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span
              className={`
                truncate leading-none transition-all duration-200
                group-hover:translate-x-0.5
                ${textSize}
                ${isActive ? DESIGN.text.active : `${DESIGN.text.inactive} ${DESIGN.text.hover}`}
              `}
            >
              {item.label}
            </span>

            {isPrimary && (
              <ChevronRight
                size={14}
                className={`
                  transition-opacity duration-150
                  ${isActive ? "text-slate-400 opacity-80" : "opacity-0 group-hover:opacity-30"}
                `}
              />
            )}
          </div>
        )}
      </div>
    </button>
  );
}
