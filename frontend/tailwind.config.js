/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Wireframe color palette
        'w-bg': '#f5f5f0',
        'w-surface': '#ffffff',
        'w-surface2': '#f0f0eb',
        'w-border': '#d8d8d0',
        'w-border2': '#c0c0b8',
        'w-text': '#1a1a2e',
        'w-text-mid': '#666660',
        'w-text-dim': '#999990',
        'w-accent': '#2563eb',
        'w-accent2': '#10b981',
        'w-accent3': '#f59e0b',
        'w-accent4': '#8b5cf6',
        'w-red': '#ef4444',
        'w-sidebar': '#1e293b',
        'whatsapp': '#25d366',
        // Keep existing colors for compatibility
        primary: "#2563eb",
        sidebar: "#1e293b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
}