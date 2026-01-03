// src/design/tokens.js
export const TOKENS = {
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    scale: {
      display: { size: 32, weight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      h1: { size: 24, weight: 600, lineHeight: 1.3, letterSpacing: "0" },
      h2: { size: 20, weight: 600, lineHeight: 1.4, letterSpacing: "0" },
      h3: { size: 18, weight: 500, lineHeight: 1.4, letterSpacing: "0" },
      body: { size: 16, weight: 400, lineHeight: 1.6, letterSpacing: "0" },
      small: { size: 14, weight: 400, lineHeight: 1.5, letterSpacing: "0" },
      caption: { size: 13, weight: 400, lineHeight: 1.4, letterSpacing: "0" }
    }
  },

  colors: {
    background: "#FAFAF9",
    surface: "#FFFFFF",
    surfaceHover: "#F5F5F4",
    border: "#E7E5E4",
    borderStrong: "#D6D3D1",

    text: {
      primary: "#1C1917",
      secondary: "#57534E",
      tertiary: "#78716C",
      disabled: "#A8A29E"
    },

    module: {
      school: "#4F46E5",
      me: "#7C3AED",
      knowledge: "#0EA5E9",
      people: "#10B981",
      papers: "#F59E0B",
      management: "#8B5CF6",
      config: "#64748B",
      admin: "#DC2626",
      support: "#3B82F6"
    }
  },

  spacing: {
    sidebarWidth: 280,
    sidebarPadding: 24,
    sidebarItemHeight: 44,
    sidebarItemGap: 8,
    sidebarSectionGap: 32,

    contentMaxWidth: 1200,
    contentPadding: 48,
    sectionGap: 40,
    cardPadding: 24,
    cardGap: 16
  },

  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    full: 9999
  },

  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
    md: "0 2px 4px rgba(0, 0, 0, 0.06)",
    lg: "0 4px 8px rgba(0, 0, 0, 0.08)"
  },

  motion: {
    durationMs: 150,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  }
};
