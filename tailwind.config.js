/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        secondary: "#2E5077",
        accent: "#4A90D9",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
        "bg-primary": "#F3F4F6",
        "bg-card": "#FFFFFF",
        "text-primary": "#1F2937",
        "text-secondary": "#6B7280",
      },
    },
  },
  plugins: [],
}
