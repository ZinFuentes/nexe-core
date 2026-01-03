import {
  LayoutDashboard,
  UserCircle,
  BookOpen,
  Users,
  FileText,
  Settings
} from "lucide-react";

export const NAV = [
  { key: "school", label: "L'escola, avui", icon: LayoutDashboard, colorClass: "text-module-school", path: "/school" },
  { key: "me", label: "El meu espai", icon: UserCircle, colorClass: "text-module-me", path: "/me" },

  { key: "knowledge", label: "Sabers", icon: BookOpen, colorClass: "text-module-knowledge", path: "/knowledge" },
  { key: "people", label: "Persones", icon: Users, colorClass: "text-module-people", path: "/people" },
  { key: "papers", label: "Papers", icon: FileText, colorClass: "text-module-papers", path: "/papers" },
  { key: "management", label: "Gestió", icon: Settings, colorClass: "text-module-management", path: "/management" },
];
