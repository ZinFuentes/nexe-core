export default function NavItem({ item, isActive, isCollapsed, onClick, emphasis = "normal" }) {
  const isPrimary = emphasis === "primary";

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center group relative outline-none focus:outline-none
        ${isCollapsed ? "justify-center px-0" : "px-2"}
        ${isPrimary ? "mb-1" : "mb-0.5"}
      `}
      title={isCollapsed ? item.label : ""}
    >
      <div
        className={`flex items-center w-full rounded-md transition-colors duration-200
          ${isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"}
          ${
            isActive
              ? "text-slate-900"
              : isPrimary
                ? "text-slate-700 hover:text-slate-900"
                : "text-slate-500 hover:text-slate-700"
          }
          hover:bg-slate-100/70
        `}
      >
        <div
          className={`transition-colors
            ${
              isActive
                ? "text-slate-900"
                : isPrimary
                  ? "text-slate-600 group-hover:text-slate-800"
                  : "text-slate-400 group-hover:text-slate-600"
            }
          `}
        >
          <item.icon size={18} strokeWidth={isPrimary ? 2 : 1.5} />
        </div>

        {!isCollapsed && (
          <span
            className={`ml-3 truncate
              ${isPrimary ? "text-[14.5px]" : "text-[13.5px]"}
              font-medium tracking-tight
            `}
          >
            {item.label}
          </span>
        )}
      </div>
    </button>
  );
}
