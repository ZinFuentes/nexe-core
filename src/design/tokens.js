export const TOKENS = {
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    scale: {
      display: { size: 32, weight: 700, lineHeight: 1.2, letterSpacing: "-0.04em" },
      h1: { size: 24, weight: 600, lineHeight: 1.3, letterSpacing: "-0.02em" },
      h2: { size: 20, weight: 600, lineHeight: 1.4, letterSpacing: "-0.01em" },
      h3: { size: 18, weight: 600, lineHeight: 1.4, letterSpacing: "0" },
      body: { size: 14, weight: 500, lineHeight: 1.5, letterSpacing: "0" },
      small: { size: 13, weight: 500, lineHeight: 1.5, letterSpacing: "0" },
      caption: { size: 10, weight: 600, lineHeight: 1, letterSpacing: "0.18em" }
    }
  },

  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceHover: "rgba(241, 245, 249, 0.6)",
    border: "#F1F5F9",
    borderStrong: "#E2E8F0",

    text: {
      primary: "#0F172A",
      secondary: "#475569",
      tertiary: "#94A3B8",
      disabled: "#CBD5E1"
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

  shell: {
    sidebar: {
      // Layout widths (match: expanded ~240px, collapsed = w-14)
      width: 240,
      collapsedWidth: 56,

      // Header block (matches h-12)
      headerHeight: 56,

      // Unified vertical rhythm (recommended: NavItem h-10)
      itemHeightPrimary: 40,
      itemHeightSecondary: 40,

      // Icon sizes (match what you're actually using)
      iconSizePrimary: 18,
      iconSizeSecondary: 18,

      // Collapsed inner column (sidebar 56px -> inner 48px centered)
      collapsedItemWidth: 56,   // w-12
      collapsedIconSlot: 56,    // w-12

      // Footer
      footerAvatarSize: 20,
      footerPadding: 6,         // equivalent to p-1.5 (6px)

      // Horizontal padding in expanded state (keep coherent with your px-2 etc.)
      paddingX: 8
    }
  },

  spacing: {
    contentMaxWidth: 1200,
    contentPadding: 48,
    sectionGap: 40,
    cardPadding: 24,
    cardGap: 16
  },

  radius: {
    sm: 4,
    md: 6,
    lg: 10,
    full: 9999
  },

  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
  },

  motion: {
    durationMs: 200,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  }
};
