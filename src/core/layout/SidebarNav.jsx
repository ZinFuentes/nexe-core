import { NavLink } from "react-router-dom";
import { NAV } from "../../config/navigation";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function NavItem({ to, label, Icon, isDashboard }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "group flex w-full items-center gap-3 rounded-md px-3",
          isDashboard ? "py-2.5" : "py-2",
          "text-left transition-colors",
          "hover:bg-surfaceHover",
          isActive ? "bg-surfaceHover" : ""
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            strokeWidth={isActive ? 2.25 : 1.75}
            className={cx(
              "shrink-0 transition-colors",
              isActive ? "text-text-primary" : "text-text-tertiary group-hover:text-text-secondary"
            )}
          />
          <span
            className={cx(
              "truncate",
              isDashboard ? "text-[14px]" : "text-[13px]",
              isActive ? "font-semibold text-text-primary" : "font-medium text-text-secondary"
            )}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function SidebarNav() {
  const dashboards = NAV.slice(0, 2);
  const repos = NAV.slice(2);

  return (
    <div className="flex h-full flex-col py-3">
      <div className="space-y-1">
        {dashboards.map((i) => (
          <NavItem
            key={i.key}
            to={i.path}
            label={i.label}
            Icon={i.icon}
            isDashboard
          />
        ))}
      </div>

      <div className="mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
        Repositoris
      </div>

      <div className="mt-2 space-y-1">
        {repos.map((i) => (
          <NavItem
            key={i.key}
            to={i.path}
            label={i.label}
            Icon={i.icon}
          />
        ))}
      </div>
    </div>
  );
}
