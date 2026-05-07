/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rice: "#F8F3EA",
        paper: "#FFFDF7",
        sand: "#F3E9DA",
        cinnabar: "#B91C1C",
        palace: "#8F1515",
        oxblood: "#7F1D1D",
        inkgreen: "#0F5C4A",
        pine: "#06483B",
        forest: "#14532D",
        gilt: "#D9A45B",
        bronze: "#B8822E",
        ink: "#2D2926",
        muted: "#6B6258",
        soft: "#78716C",
        warmline: "#E8DCC8",
        line: "#DDD0BD",
        verify: "#B45309",
        accessible: "#0F766E"
      },
      boxShadow: {
        soft: "0 16px 38px rgba(69, 45, 22, 0.10)",
        lift: "0 24px 54px rgba(69, 45, 22, 0.16)"
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "Microsoft YaHei", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
